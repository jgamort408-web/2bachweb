import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { count, factorial, combinations, variations, variationsWithRepetition, permutationsWithRepetition, parseRepeats, texInteger, plainInteger } from '../content/models/combinatorics.js';
import { combinatoricsQuestions } from '../content/activities/combinatorics-test.js';
import { questionsForScope } from '../content/activities/catalog.js';

test('combinatoria: resultados de los ejemplos y ejercicios del original', () => {
  assert.equal(variations(8, 3), 336n);
  assert.equal(variationsWithRepetition(10, 4), 10000n);
  assert.equal(factorial(6), 720n);
  assert.equal(permutationsWithRepetition(10, [3, 2, 2]), 151200n);
  assert.equal(permutationsWithRepetition(10, [2, 2, 2]), 453600n);
  assert.equal(combinations(10, 3), 120n);
  assert.equal(combinations(40, 5), 658008n);
  assert.equal(combinations(10, 5), 252n);
  assert.equal(variations(15, 3), 2730n);
  assert.equal(combinations(20, 4), 4845n);
  assert.equal(variationsWithRepetition(27, 6), 387420489n);
  assert.equal(permutationsWithRepetition(12, [2, 2, 2, 2]), 29937600n);
  assert.equal(combinations(50, 6), 15890700n);
  assert.equal(combinations(7, 3) * combinations(5, 2), 350n);
  assert.equal(combinations(12, 5), 792n);
  assert.equal(combinations(52, 5), 2598960n);
});

test('combinatoria: enteros exactos donde la coma flotante falla', () => {
  assert.equal(count({ type: 'variationsWithRepetition', n: 19, r: 19 }).value, 1978419655660313589123979n);
  assert.notEqual(String(19 ** 19), '1978419655660313589123979');
  assert.equal(count({ type: 'permutations', n: 20 }).value, 2432902008176640000n);
});

test('combinatoria: desarrollo, formato español y datos inválidos', () => {
  const result = count({ type: 'combinations', n: 10, r: 3 });
  assert.equal(result.formula, 'C(10,3)=\\dbinom{10}{3}=\\dfrac{10!}{3!\\cdot 7!}=\\dfrac{10\\cdot 9\\cdot 8}{3!}=\\dfrac{720}{6}=120');
  assert.equal(count({ type: 'permutationsWithRepetition', n: 10, repeats: '3, 2, 2' }).formula,
    'P_{10}^{(3,2,2)}=\\dfrac{10!}{3!\\cdot 2!\\cdot 2!}=\\dfrac{3\\,628\\,800}{24}=151\\,200');
  assert.equal(texInteger(6561), '6561');
  assert.equal(texInteger(10000), '10\\,000');
  assert.equal(plainInteger(2598960n), '2 598 960');
  assert.deepEqual(parseRepeats('2;3 2'), [2, 3, 2]);
  assert.throws(() => count({ type: 'variations', n: 5, r: 6 }), /entre 1 y 5/);
  assert.throws(() => count({ type: 'combinations', n: 21, r: 2 }), /entre 1 y 20/);
  assert.throws(() => count({ type: 'permutationsWithRepetition', n: 4, repeats: '3, 2' }), /no pueden superar/);
  assert.throws(() => parseRepeats('1, 2'), /mayor o igual que 2/);
  assert.throws(() => parseRepeats(''), /Indica/);
});

test('combinatoria: diez preguntas del juego original, en el visor común y en la página', () => {
  assert.equal(combinatoricsQuestions.length, 10);
  assert.deepEqual(combinatoricsQuestions.map(q => q.sourceIndex), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual(questionsForScope('combinatorics').map(q => q.id), combinatoricsQuestions.map(q => q.id));
  // La alternativa correcta del original conserva su valor.
  const answers = combinatoricsQuestions.map(q => q.options.find(o => o.id === q.correct).text);
  assert.deepEqual(answers, ['720', '1000', '2 598 960', '5040', '\\(\\frac{3}{8}\\)', '3024', '10', '16', '\\(\\frac{1}{4}\\)', '6']);
  const html = fs.readFileSync(new URL('../libro/apoyos/combinatoria.html', import.meta.url), 'utf8');
  assert.match(html, /data-quiz="combinatorics"/);
  assert.equal((html.match(/data-exercise="\d"/g) || []).length, 6);
});
