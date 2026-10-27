import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const workspace = path.resolve(root, '..');
const args = process.argv.slice(2);
const engineAt = args.indexOf('--engine');
const pythonAt = args.indexOf('--python');
const engine = engineAt >= 0 ? args[engineAt + 1] : process.env.TECTONIC_BIN
  ?? path.join(workspace, 'tools/tectonic-0.17.0/tectonic.exe');
const python = pythonAt >= 0 ? args[pythonAt + 1] : process.env.PYTHON_BIN ?? 'python';
const configAt = args.indexOf('--config');
const configPath = projectFile(configAt >= 0 ? args[configAt + 1] : 'config/pdf-build.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
if (config.schemaVersion !== 1) throw new Error('Versión de construcción PDF no compatible');
const checksum = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function projectFile(relative) {
  const resolved = path.resolve(root, relative);
  if (path.relative(root, resolved).startsWith('..') || path.isAbsolute(path.relative(root, resolved))) throw new Error('Ruta fuera del proyecto');
  return resolved;
}
const version = spawnSync(engine, ['--version'], { encoding: 'utf8', windowsHide: true });
if (version.status !== 0 || !version.stdout.trim().endsWith(config.engineVersion)) throw new Error('Se requiere Tectonic ' + config.engineVersion);
const staging = path.join(workspace, 'tmp/pdfs/build-' + (config.batchId ?? '160'));
fs.mkdirSync(staging, { recursive: true });
const sourceRelative = config.sourceDirectory ?? 'content/latex/recuperacion-t1';
const sourceDir = projectFile(sourceRelative);
const inputs = fs.readdirSync(sourceDir).filter(name => /\.(tex|png|json)$/.test(name))
  .map(name => ({ path: sourceRelative + '/' + name, sha256: checksum(path.join(sourceDir, name)) }));
for (const document of config.documents) {
  const source = projectFile(document.source), output = projectFile(document.output);
  if (!source.endsWith('.tex') || !output.endsWith('.pdf')) throw new Error('Extensiones de construcción inválidas');
  const options = ['--untrusted', '-Z', 'deterministic-mode', '--keep-logs', '--keep-intermediates',
    '--outdir', staging, ...(args.includes('--cached') ? ['--only-cached'] : []), source];
  const compiled = spawnSync(engine, options, {
    cwd: sourceDir, encoding: 'utf8', windowsHide: true, timeout: 240000,
    env: { ...process.env, TECTONIC_CACHE_DIR: process.env.TECTONIC_CACHE_DIR ?? path.join(workspace, 'tools/tectonic-cache'),
      FONTCONFIG_FILE: projectFile('config/pdf-fonts.conf'),
      SOURCE_DATE_EPOCH: String(Date.parse(config.releaseDate + 'T00:00:00Z') / 1000) }
  });
  fs.writeFileSync(path.join(staging, document.id + '.console.log'), (compiled.stdout ?? '') + (compiled.stderr ?? ''), 'utf8');
  if (compiled.status !== 0) throw new Error('Falló ' + document.id + ': ' + (compiled.error?.message ?? compiled.stderr));
  const log = fs.readFileSync(path.join(staging, document.id + '.log'), 'utf8');
  if (/Overfull \\[hv]box|Missing character|undefined references|LaTeX Error:|Package .* Error:/i.test(log)) {
    throw new Error('Incidencia de maquetación o referencias en ' + document.id + '; revisar su log');
  }
  console.log('Compilado: ' + document.id);
}
const technicalReport = path.join(staging, 'technical-report.json');
const checked = spawnSync(python, [projectFile('scripts/check-pdfs.py'), '--directory', staging, '--report', technicalReport, '--config', configPath],
  { encoding: 'utf8', windowsHide: true, timeout: 60000 });
if (checked.status !== 0) throw new Error('Verificación PDF fallida: ' + (checked.error?.message ?? checked.stderr));
// Publish only after both compiles and all technical/mathematical checks succeed.
for (const document of config.documents) {
  const output = projectFile(document.output);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.copyFileSync(path.join(staging, document.id + '.pdf'), output);
}
const report = {
  ...JSON.parse(fs.readFileSync(technicalReport, 'utf8')),
  edition: config.edition, releaseDate: config.releaseDate,
  engine: version.stdout.trim(), engineSha256: checksum(engine), inputs
};
const reportPath = projectFile(config.report ?? 'docs/pdf/recuperacion-t1-build.json');
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
console.log('Pareja PDF publicada en output/pdf; revisión visual obligatoria antes de marcarla revisada.');
