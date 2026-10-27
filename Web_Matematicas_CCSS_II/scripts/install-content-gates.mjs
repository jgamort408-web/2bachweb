// Idempotent migration of catalogued HTML and widget entry points. Originals are never visited.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => JSON.parse(fs.readFileSync(path.join(root, 'config', name + '.json'), 'utf8'));
function target(relative) {
  const full = path.resolve(root, relative);
  if (path.relative(root, full).startsWith('..') || path.isAbsolute(path.relative(root, full))) throw new Error('Ruta fuera del proyecto');
  return full;
}
let htmlCount = 0, widgetCount = 0;
for (const relative of new Set([...read('pages').map(p => p.path), ...read('widgets').map(w => w.path)])) {
  const full = target(relative);
  let text = fs.readFileSync(full, 'utf8');
  if (text.includes('content-gate.js')) continue;
  const gate = path.relative(path.dirname(full), target('assets/js/core/content-gate.js')).replaceAll('\\', '/');
  text = text.replace('<head>', '<head>\n  <script src="' + gate + '"></script>');
  fs.writeFileSync(full, text, 'utf8'); htmlCount++;
}
for (const widget of read('widgets')) {
  const full = target(path.posix.join(path.posix.dirname(widget.path), 'widget.js'));
  let text = fs.readFileSync(full, 'utf8');
  if (text.includes('const widgetAccess = await initializeWidget')) continue;
  text = text.replace(/import\s*\{\s*initializeWidget\s*\}/, 'import { initializeWidget, canStartWidgetSession }');
  const call = /initializeWidget\(document\.body\.dataset\.widgetId\);/;
  if (!call.test(text)) throw new Error('Entrada de widget inesperada: ' + widget.id);
  text = text.replace(call, 'const widgetAccess = await initializeWidget(document.body.dataset.widgetId);\nif (widgetAccess) {');
  text = text.replace(/((?:async )?function (?:start|restart)\([^)]*\)\s*\{)/g,
    '$1\n if (!canStartWidgetSession()) return;');
  fs.writeFileSync(full, text.trimEnd() + '\n}\n', 'utf8'); widgetCount++;
}
console.log('HTML con puerta de disponibilidad añadida: ' + htmlCount + '; widgets adaptados: ' + widgetCount);
