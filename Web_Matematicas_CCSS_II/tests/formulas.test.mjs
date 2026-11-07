import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { render } from '../scripts/build-formulas.mjs';

const page = fs.readFileSync(new URL('../herramientas/formulario.html', import.meta.url), 'utf8');
const { formulas } = JSON.parse(fs.readFileSync(new URL('../config/formulas.json', import.meta.url), 'utf8'));
const pages = JSON.parse(fs.readFileSync(new URL('../config/pages.json', import.meta.url), 'utf8'));
const pageList = Array.isArray(pages) ? pages : pages.pages;

test('el formulario está al día con config/formulas.json y con las lecciones', () => {
  // render() también falla si una fórmula ya no aparece literalmente en su lección.
  assert.equal(render(page), page, 'Ejecuta: npm run build:formulas');
});

test('cada tema del libro tiene fórmulas y cada fórmula enlaza a su lección', () => {
  for (const topic of ['t01', 't02', 't03', 't04', 't05', 't06', 't07', 't08', 't09']) {
    assert.ok(page.includes(`id="formulas-${topic}"`), topic);
  }
  assert.equal((page.match(/data-formula-entry/g) || []).length, formulas.length);
  for (const formula of formulas) {
    const lesson = pageList.find(item => item.id === formula.page);
    assert.ok(page.includes(`data-content-id="page:${lesson.id}"`), formula.name);
    assert.ok(page.includes(`href="../${lesson.path}"`), formula.name);
  }
});

test('una fórmula que no está en su lección hace fallar el generador', () => {
  const broken = structuredClone({ formulas });
  broken.formulas[0].tex += 'x';
  assert.throws(() => render(page, broken), /no aparece en/);
});
