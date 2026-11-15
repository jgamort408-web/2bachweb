import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { nextPosition, previousPosition, deckState } from '../assets/js/learning/slides.js';

test('presentaciones: los pasos se muestran antes de cambiar de diapositiva y se deshacen en orden inverso', () => {
  const slides = [{ steps: 0 }, { steps: 2 }, { steps: 1 }];
  const forward = [{ index: 0, revealed: 0 }];
  for (let i = 0; i < 6; i++) forward.push(nextPosition(slides, forward.at(-1).index, forward.at(-1).revealed));
  assert.deepEqual(forward.map(p => `${p.index}:${p.revealed}`), ['0:0', '1:0', '1:1', '1:2', '2:0', '2:1', '2:1']);
  // Retroceder: la diapositiva anterior aparece completa y después se ocultan sus pasos.
  const back = [{ index: 2, revealed: 0 }];
  for (let i = 0; i < 5; i++) back.push(previousPosition(slides, back.at(-1).index, back.at(-1).revealed));
  assert.deepEqual(back.map(p => `${p.index}:${p.revealed}`), ['2:0', '1:2', '1:1', '1:0', '0:0', '0:0']);
  assert.equal(deckState(slides, 0, 0).atStart, true);
  assert.equal(deckState(slides, 2, 1).atEnd, true);
  assert.equal(deckState(slides, 2, 0).atEnd, false);
});

// Mapa de presentation.js (nombre → [módulo, función]); se lee como texto porque el módulo arranca la página.
const explorerMap = new Map();
const presentation = fs.readFileSync(new URL('../assets/js/learning/presentation.js', import.meta.url), 'utf8');
for (const [, name, file, start] of presentation.matchAll(/^\s*'?([\w-]+)'?: \['\.\/([\w-]+\.js)'(?:, '(\w+)')?\]/gm)) {
  const source = fs.readFileSync(new URL('../assets/js/learning/' + file, import.meta.url), 'utf8');
  // Raíz: el atributo …-explorer o …-lab si lo hay; si no, el primero que busca el módulo.
  const roots = [...source.matchAll(/querySelector(?:All)?\('\[(data-[\w-]+)\]'\)/g)].map(match => match[1]);
  explorerMap.set(name, { file, start, source, root: roots.find(root => /-(explorer|lab)$/.test(root)) ?? roots[0] });
}

test('presentaciones: cada explorador del mapa existe y exporta la función que lo inicia', () => {
  assert.ok(explorerMap.size >= 20);
  for (const [name, { file, start, source }] of explorerMap) {
    if (start) assert.match(source, new RegExp(`export (async )?function ${start}\\b`), `${name}: ${file}`);
  }
});

test('presentaciones: cada tema publicado tiene diapositivas con título, id único, catálogo y enlace desde el tema', () => {
  const pages = JSON.parse(fs.readFileSync(new URL('../config/pages.json', import.meta.url)));
  const decks = pages.filter(page => page.path.endsWith('/presentacion.html'));
  assert.ok(decks.length >= 1);
  for (const deck of decks) {
    const html = fs.readFileSync(new URL('../' + deck.path, import.meta.url), 'utf8');
    const topic = pages.find(page => page.id === deck.parentId);
    assert.equal(topic.kind, 'topic');
    assert.match(fs.readFileSync(new URL('../' + topic.path, import.meta.url), 'utf8'), /href="presentacion\.html"/);
    assert.match(html, /assets\/css\/slides\.css/);
    assert.match(html, /assets\/js\/learning\/presentation\.js/);
    const slides = [...html.matchAll(/<section class="mc-slide[^"]*" id="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g)];
    assert.ok(slides.length >= 15 && slides.length <= 30, deck.path + ': ' + slides.length + ' diapositivas');
    const ids = slides.map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length);
    for (const [, id, body] of slides) {
      assert.match(body, /<h2>/, id);
      // Un título con fórmulas necesita data-title para el índice.
      const h2 = body.match(/<h2>([\s\S]*?)<\/h2>/)[1];
      if (h2.includes('\(')) assert.match(html, new RegExp(`id="${id}" data-title="[^"]+"`), id);
    }
    // Los exploradores declarados están en el mapa de presentation.js y su raíz está en la página.
    const explorers = html.match(/data-explorers="([^"]*)"/)[1].split(/\s+/).filter(Boolean);
    for (const name of explorers) {
      assert.ok(explorerMap.has(name), `${deck.path}: explorador desconocido ${name}`);
      const { root } = explorerMap.get(name);
      if (root) assert.ok(html.includes(root), `${deck.path}: falta ${root} para ${name}`);
    }
  }
});
