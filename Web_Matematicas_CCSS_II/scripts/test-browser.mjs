/**
 * Ejecuta las pruebas de navegador (tests/*-browser.cjs) una tras otra.
 *
 *   node scripts/test-browser.mjs                    todas
 *   node scripts/test-browser.mjs probability gauss  solo las que contienen esas palabras
 *
 * Arranca scripts/serve.mjs en el puerto 4173 si no hay ya un servidor, y usa Chrome
 * instalado en el sistema salvo que CHROME_PATH indique otro ejecutable. Si no se
 * encuentra Chrome, Playwright usa su propio Chromium (npx playwright install chromium).
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = 'http://127.0.0.1:4173/';
const filters = process.argv.slice(2).map(value => value.toLowerCase());
const timeoutMs = Number(process.env.BROWSER_TEST_TIMEOUT || 600000);

const chromeCandidates = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium'
];
const env = { ...process.env };
env.CHROME_PATH ??= chromeCandidates.find(candidate => fs.existsSync(candidate));
if (!env.CHROME_PATH) delete env.CHROME_PATH;

const files = fs.readdirSync(path.join(root, 'tests'))
  .filter(name => name.endsWith('-browser.cjs'))
  .filter(name => !filters.length || filters.some(filter => name.toLowerCase().includes(filter)))
  .sort((a, b) => (Number(a.match(/-(\d+)-browser/)?.[1]) || 0) - (Number(b.match(/-(\d+)-browser/)?.[1]) || 0) || a.localeCompare(b));
if (!files.length) throw new Error('Ninguna prueba de navegador coincide con: ' + filters.join(' '));

async function serverUp() {
  try { return (await fetch(base, { signal: AbortSignal.timeout(2000) })).ok; } catch { return false; }
}

let server = null;
if (!(await serverUp())) {
  server = spawn(process.execPath, ['scripts/serve.mjs'], { cwd: root, stdio: 'ignore', windowsHide: true });
  for (let attempt = 0; attempt < 50 && !(await serverUp()); attempt++) await new Promise(done => setTimeout(done, 200));
  if (!(await serverUp())) { server.kill(); throw new Error('No se pudo arrancar el servidor local en ' + base); }
}

/** Termina la prueba y los Chrome que haya lanzado (en Windows, kill() no alcanza a los hijos). */
function killTree(child) {
  if (process.platform === 'win32') spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true });
  else child.kill('SIGKILL');
}

function run(file) {
  return new Promise(resolve => {
    const started = Date.now();
    const child = spawn(process.execPath, ['tests/' + file], { cwd: root, env, windowsHide: true });
    let output = '';
    child.stdout.on('data', chunk => { output += chunk; });
    child.stderr.on('data', chunk => { output += chunk; });
    let timedOut = false;
    const timer = setTimeout(() => { timedOut = true; output += '\nTiempo agotado.'; killTree(child); }, timeoutMs);
    // «exit» y no «close»: un Chrome huérfano puede mantener abiertas las tuberías de salida.
    child.on('exit', code => {
      clearTimeout(timer);
      resolve({ file, ok: code === 0 && !timedOut, seconds: (Date.now() - started) / 1000, output });
    });
  });
}

const failed = [];
try {
  console.log(`${files.length} pruebas de navegador · Chrome: ${env.CHROME_PATH ?? 'Chromium de Playwright'}`);
  for (const file of files) {
    const result = await run(file);
    console.log(`${result.ok ? '✔' : '✖'} ${file} (${result.seconds.toFixed(1)} s)`);
    if (!result.ok) { failed.push(file); console.log(result.output.trim().split('\n').slice(-15).join('\n')); }
  }
} finally {
  server?.kill();
}
console.log(`${files.length - failed.length} superadas · ${failed.length} fallidas`);
if (failed.length) { console.log('Fallidas: ' + failed.join(', ')); process.exitCode = 1; }
