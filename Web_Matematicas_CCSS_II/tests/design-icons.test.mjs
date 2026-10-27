import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const sprite = fs.readFileSync(new URL('../assets/icons/sprite.svg', import.meta.url), 'utf8');
const symbols = [...sprite.matchAll(/<symbol id="([\w-]+)" viewBox="([^"]+)">([\s\S]*?)<\/symbol>/g)]
  .map(([, id, viewBox, body]) => ({ id, viewBox, body }));

// Iconos de rol decididos en la ronda 3 (docs/diseno/DECISIONES_DISENO.md) y los de interfaz de la ronda 4.
const required = ['definicion', 'metodo', 'ejemplo', 'error', 'practica', 'objetivo', 'resumen', 'selectividad', 'ampliacion',
  'inicio', 'test', 'tarjetas', 'juegos', 'pdf', 'buscar', 'menu', 'cerrar', 'flecha', 'atras', 'luna', 'sol', 'acierto', 'fallo', 'pista', 'sonido'];

test('el sprite contiene todos los iconos acordados, una sola vez cada uno', () => {
  const ids = symbols.map(s => s.id);
  assert.deepEqual(required.map(name => 'mc-' + name).filter(id => !ids.includes(id)), []);
  assert.equal(new Set(ids).size, ids.length);
});

test('cada icono usa la rejilla de 24 px y toma el color del texto', () => {
  for (const { id, viewBox, body } of symbols) {
    assert.equal(viewBox, '0 0 24 24', id);
    assert.match(body, /stroke="currentColor"/, id);
    assert.doesNotMatch(body, /(fill|stroke)="#/, id + ' no debe fijar colores');
  }
});

test('el sprite es SVG estático sin scripts ni recursos externos', () => {
  assert.doesNotMatch(sprite, /<script|href="http|xlink:href="http|on\w+=/i);
});
