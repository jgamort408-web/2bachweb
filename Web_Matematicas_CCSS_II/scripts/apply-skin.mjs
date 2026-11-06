/**
 * Marca páginas como migradas al nuevo diseño (fase 3, L08) sin tocar su contenido.
 *
 *   node scripts/apply-skin.mjs --block azar libro/temas/07-probabilidad/02-algebra-de-sucesos.html …
 *
 * Añade data-skin="mc" a <html>, class="mc-skin" y data-block a <body>, y a <main> la plantilla:
 * mc-lesson si la página tiene índice de apartados (nav … data-content-role="related-links"), o mc-page si no.
 * Las páginas ya migradas se dejan como están. Termina con código 1 si alguna no tiene la estructura esperada.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const blockAt = args.indexOf('--block');
const block = blockAt >= 0 ? args.splice(blockAt, 2)[1] : null;
if (!['analisis', 'algebra', 'azar', null].includes(block)) throw new Error('Bloque desconocido: ' + block);

let failed = 0;
for (const relative of args) {
  const file = path.resolve(root, relative);
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('data-skin="mc"')) { console.log('Ya migrada: ' + relative); continue; }
  const layout = /<nav [^>]*data-content-role="related-links"/.test(html) ? 'mc-lesson' : 'mc-page';
  const steps = [
    [/<html lang="es">/, '<html lang="es" data-skin="mc">'],
    [/<body data-page-id="([^"]+)">/, `<body data-page-id="$1" class="mc-skin"${block ? ` data-block="${block}"` : ''}>`],
    [/<main id="main-content" class="page-main">/, `<main id="main-content" class="page-main ${layout}">`]
  ];
  const missing = steps.filter(([pattern]) => !pattern.test(html));
  if (missing.length) { console.log('Estructura inesperada, sin cambios: ' + relative); failed++; continue; }
  for (const [pattern, replacement] of steps) html = html.replace(pattern, replacement);
  fs.writeFileSync(file, html, 'utf8');
  console.log(`Migrada (${layout}): ${relative}`);
}
if (failed) process.exitCode = 1;
