import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const css = fs.readFileSync(new URL('../assets/css/tokens.css', import.meta.url), 'utf8');

/** Variables de color de un bloque CSS que empieza en `selector {`. */
function colorsOf(selector, from = 0) {
  const start = css.indexOf(selector + ' {', from);
  assert.ok(start >= 0, 'Falta el bloque ' + selector);
  const body = css.slice(start, css.indexOf('}', start));
  return Object.fromEntries([...body.matchAll(/--(mc-[\w-]+):\s*(#[0-9A-Fa-f]{6})\s*;/g)].map(m => [m[1], m[2].toUpperCase()]));
}

const light = colorsOf(':root');
const darkMedia = colorsOf(':root:not([data-theme="light"])', css.indexOf('@media (prefers-color-scheme: dark)'));
const dark = colorsOf(':root[data-theme="dark"]');

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// [primer plano, fondo, mínimo]. 4.5 para texto normal; 3 para iconos, bordes de foco y marcas gráficas.
const pairs = [
  ['text', 'bg', 4.5], ['text', 'paper', 4.5], ['text', 'paper-2', 4.5],
  ['text-2', 'bg', 4.5], ['text-2', 'paper', 4.5], ['text-2', 'paper-2', 4.5], ['text-3', 'paper', 4.5],
  ['link', 'bg', 4.5], ['link', 'paper', 4.5], ['link-hover', 'paper', 4.5],
  ['on-action', 'action', 4.5], ['on-action', 'action-hover', 4.5],
  ['focus', 'bg', 3], ['focus', 'paper', 3],
  ...['analisis', 'algebra', 'azar'].flatMap(b => [
    [b + '-dark', b + '-tint', 4.5], [b + '-dark', 'paper', 4.5], [b, 'paper', 3], [b, 'bg', 3]
  ]),
  ...['theory', 'method', 'example'].flatMap(r => [
    [r + '-title', r + '-bg', 4.5], ['text', r + '-bg', 4.5], [r + '-title', r + '-pill', 3]
  ]),
  ['error-title', 'error-bg', 4.5], ['error-text', 'error-bg', 4.5], ['error-title', 'error-pill', 3],
  ['summary-title', 'summary-pill', 3], ['summary-title', 'paper', 4.5],
  ['exam-title', 'exam-pill', 3], ['exam-title', 'paper', 4.5],
  ['extension-title', 'extension-pill', 3], ['extension-title', 'paper', 4.5],
  ['correct-text', 'correct-bg', 4.5], ['wrong-text', 'wrong-bg', 4.5],
  ['correct-mark', 'paper', 3], ['wrong-mark', 'paper', 3],
  ['readout-text', 'readout-bg', 4.5], ['readout-muted', 'readout-bg', 4.5]
];

test('el modo oscuro automático y el elegido en el selector usan los mismos colores', () => {
  assert.deepEqual(darkMedia, dark);
});

test('claro y oscuro definen el mismo conjunto de colores', () => {
  const missing = Object.keys(light).filter(name => !(name in dark) && !name.startsWith('mc-accent'));
  assert.deepEqual(missing, []);
});

for (const [mode, colors] of [['claro', light], ['oscuro', dark]]) {
  test('contraste WCAG 2.2 AA de las parejas de uso en modo ' + mode, () => {
    const failures = pairs.flatMap(([fg, bg, min]) => {
      const a = colors['mc-' + fg], b = colors['mc-' + bg];
      assert.ok(a && b, `Falta --mc-${fg} o --mc-${bg} en modo ${mode}`);
      const ratio = contrast(a, b);
      return ratio >= min ? [] : [`${fg} sobre ${bg}: ${ratio.toFixed(2)} < ${min}`];
    });
    assert.deepEqual(failures, []);
  });
}
