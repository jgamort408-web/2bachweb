import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkLocalLinks } from '../scripts/local-links.mjs';

test('todos los enlaces locales de los HTML apuntan a archivos existentes', () => {
  const { broken } = checkLocalLinks();
  assert.deepEqual(broken.map(item => `${item.page}: ${item.url} (${item.reason})`), []);
});

test('una página copiada a otra profundidad recupera sus rutas con --fix', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'enlaces-'));
  try {
    const write = (file, text = '') => {
      fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
      fs.writeFileSync(path.join(root, file), text);
    };
    write('assets/css/main.css');
    write('libro/temas/07-probabilidad/02-algebra-de-sucesos.html');
    // Copiada desde libro/temas/07-probabilidad/ a libro/: conserva prefijos de tres niveles.
    write('libro/copia.html', [
      '<link rel="stylesheet" href="../../../assets/css/main.css">',
      '<a href="02-algebra-de-sucesos.html#demorgan">7.2</a>',
      '<a href="#resumen">Resumen</a> <a href="https://example.org/">Externo</a>',
      '<a href="no-existe.html">Roto</a>'
    ].join('\n'));

    const report = checkLocalLinks({ root });
    assert.equal(report.broken.length, 3);
    assert.equal(report.fixed.length, 0);

    const repaired = checkLocalLinks({ root, fix: true });
    assert.deepEqual(repaired.fixed.map(item => item.to),
      ['../assets/css/main.css', 'temas/07-probabilidad/02-algebra-de-sucesos.html#demorgan']);
    assert.deepEqual(repaired.broken.map(item => item.url), ['no-existe.html']);
    const html = fs.readFileSync(path.join(root, 'libro/copia.html'), 'utf8');
    assert.match(html, /href="\.\.\/assets\/css\/main\.css"/);
    assert.match(html, /href="#resumen"/);
    assert.match(html, /href="https:\/\/example\.org\/"/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
