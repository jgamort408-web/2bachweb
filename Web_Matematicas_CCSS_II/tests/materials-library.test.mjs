import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { render } from '../scripts/build-materials.mjs';

const page = fs.readFileSync(new URL('../materiales/index.html', import.meta.url), 'utf8');
const { resources } = JSON.parse(fs.readFileSync(new URL('../config/resources.json', import.meta.url), 'utf8'));
const study = resources.filter(resource => resource.kind === 'study');

test('la página Para imprimir está al día con config/resources.json', () => {
  assert.equal(render(page), page, 'Ejecuta: npm run build:materials');
});

test('nueve hojas resumen, el PDF conjunto y la relación de integrales, cada uno con su descarga', () => {
  assert.equal(study.filter(item => item.tags.includes('hoja-resumen') && item.topicId).length, 9);
  assert.equal(study.length, 11);
  const cards = [...page.matchAll(/<li class="mc-library__item" data-content-id="resource:([^"]+)"[\s\S]*?<\/li>/g)];
  assert.deepEqual(cards.map(card => card[1]).sort(), study.map(item => item.id).sort());
  for (const [card, id] of cards) {
    const resource = study.find(item => item.id === id);
    assert.ok(card.includes(`href="../${resource.path}"`) && card.includes(' download'), id);
    assert.ok(fs.existsSync(new URL('../' + resource.path, import.meta.url)), id + ': falta el PDF');
    assert.equal(resource.reviewStatus, 'reviewed');
  }
});

test('las soluciones de la relación guiada no se publican', () => {
  assert.equal(fs.existsSync(new URL('../materiales/pdf/relacion-integrales-guiada-soluciones.pdf', import.meta.url)), false);
  assert.ok(!resources.some(item => /soluciones/.test(item.id) && item.kind === 'study'));
});
