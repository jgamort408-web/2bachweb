import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { render, termId } from '../scripts/build-glossary.mjs';

const page = fs.readFileSync(new URL('../herramientas/glosario.html', import.meta.url), 'utf8');
const { terms } = JSON.parse(fs.readFileSync(new URL('../config/glossary.json', import.meta.url), 'utf8'));

test('el glosario está al día con config/glossary.json y las tarjetas', async () => {
  // render() también falla si falta una tarjeta o una página, o si un término se repite.
  assert.equal(await render(page), page, 'Ejecuta: npm run build:glossary');
});

test('cada término tiene entrada, ancla y enlace a su lección', () => {
  for (const { term } of terms) {
    assert.ok(page.includes(`id="${termId(term)}"`), term);
  }
  assert.equal((page.match(/data-glossary-entry/g) || []).length, terms.length);
});

test('skin.js enlaza los términos con el mismo identificador que el generador', () => {
  const skin = fs.readFileSync(new URL('../assets/js/core/skin.js', import.meta.url), 'utf8');
  const expression = skin.match(/'#termino-' \+ (term\.[^;]+);/)[1];
  const browserId = new Function('term', 'return ' + expression);
  for (const { term } of terms) assert.equal('termino-' + browserId(term), termId(term), term);
});
