/**
 * Comprueba y repara los enlaces locales de los HTML del sitio.
 *
 * Las páginas usan rutas relativas (../../../assets/...) para funcionar tanto en la raíz
 * como en la subcarpeta de GitHub Pages. Al copiar una página a otra profundidad esas
 * rutas dejan de apuntar a su destino; este script las detecta y, con --fix, recalcula
 * el prefijo correcto.
 *
 *   node scripts/local-links.mjs          informe; termina con código 1 si hay enlaces rotos
 *   node scripts/local-links.mjs --fix    reescribe los enlaces reparables y vuelve a comprobar
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const siteRoot = fileURLToPath(new URL('../', import.meta.url));
const SKIP_DIRS = new Set(['node_modules', 'output', 'vendor', 'docs', 'content', 'tests', 'scripts']);
const ATTRIBUTE = /\b(href|src|data-project-path)\s*=\s*(["'])(.*?)\2/g;
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|$)/i;

export function listHtmlFiles(dir = siteRoot) {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { if (!SKIP_DIRS.has(entry.name)) found.push(...listHtmlFiles(full)); }
    else if (entry.name.endsWith('.html')) found.push(full);
  }
  return found.sort();
}

const toPosix = value => value.split(path.sep).join('/');
const exists = target => fs.existsSync(target)
  && (fs.statSync(target).isFile() || fs.existsSync(path.join(target, 'index.html')));

function splitUrl(url) {
  const at = url.search(/[?#]/);
  return at < 0 ? [url, ''] : [url.slice(0, at), url.slice(at)];
}

/** Índice de nombres de archivo que aparecen una sola vez en el sitio (excepto index.html). */
function uniqueBasenames(root) {
  const counts = new Map();
  const walk = dir => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else counts.set(entry.name, [...(counts.get(entry.name) ?? []), full]);
    }
  };
  walk(root);
  return new Map([...counts].filter(([name, files]) => files.length === 1 && name !== 'index.html')
    .map(([name, files]) => [name, files[0]]));
}

/** Devuelve la ruta relativa correcta para un enlace roto, o null si no hay un destino inequívoco. */
function repair(root, fileDir, linkPath, basenames) {
  const fromRoot = linkPath.replace(/^(?:\.\.?\/)+/, '');
  let target = fromRoot && exists(path.join(root, fromRoot)) ? path.join(root, fromRoot) : null;
  let how = 'desde la raíz';
  if (!target && basenames.has(path.posix.basename(linkPath))) {
    target = basenames.get(path.posix.basename(linkPath));
    how = 'por nombre único';
  }
  if (!target) return null;
  let relative = toPosix(path.relative(fileDir, target)) || '.';
  if (linkPath.endsWith('/') && !relative.endsWith('/')) relative += '/';
  return { relative, how };
}

export function checkLocalLinks({ fix = false, root = siteRoot } = {}) {
  const basenames = uniqueBasenames(root);
  const broken = [], fixed = [];
  for (const file of listHtmlFiles(root)) {
    const fileDir = path.dirname(file), page = toPosix(path.relative(root, file));
    const original = fs.readFileSync(file, 'utf8');
    const updated = original.replace(ATTRIBUTE, (match, attribute, quote, url) => {
      if (EXTERNAL.test(url) || url.includes('${') || url.includes('{{')) return match;
      if (url.startsWith('/')) { broken.push({ page, attribute, url, reason: 'ruta absoluta: falla en la subcarpeta de GitHub Pages' }); return match; }
      const [linkPath, suffix] = splitUrl(url);
      // data-project-path se resuelve siempre desde la raíz del proyecto (assets/js/shared/components.js).
      const base = attribute === 'data-project-path' ? root : fileDir;
      if (!linkPath || exists(path.resolve(base, decodeURIComponent(linkPath)))) return match;
      const repaired = attribute === 'data-project-path' ? null : repair(root, fileDir, decodeURIComponent(linkPath), basenames);
      if (!repaired) { broken.push({ page, attribute, url, reason: 'destino inexistente' }); return match; }
      if (!fix) { broken.push({ page, attribute, url, reason: `reparable con --fix → ${repaired.relative}${suffix}` }); return match; }
      fixed.push({ page, attribute, url, to: repaired.relative + suffix, how: repaired.how });
      return `${attribute}=${quote}${repaired.relative}${suffix}${quote}`;
    });
    if (fix && updated !== original) fs.writeFileSync(file, updated, 'utf8');
  }
  return { broken, fixed };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const fix = process.argv.includes('--fix');
  const { broken, fixed } = checkLocalLinks({ fix });
  for (const item of fixed) console.log(`Reparado (${item.how}) ${item.page}: ${item.url} → ${item.to}`);
  for (const item of broken) console.log(`${item.page}: ${item.attribute}="${item.url}" · ${item.reason}`);
  console.log(`${listHtmlFiles().length} páginas · ${fixed.length} enlaces reparados · ${broken.length} pendientes`);
  if (broken.length) process.exitCode = 1;
}
