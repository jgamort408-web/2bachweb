import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateSession } from '../widgets/games/t01-a-limite-express/generator.js';
import { questions as limitQuestions, flashcards, questionsForScope, cardsForScope } from '../content/activities/catalog.js';

function numericValue(value) {
  if (typeof value === 'number') return value;
  const fraction = String(value).match(/^(-?\d+)\/(\d+)$/);
  if (fraction) return Number(fraction[1]) / Number(fraction[2]);
  if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
  return value;
}
test('1000 semillas: opciones únicas y soluciones matemáticas de cada familia', () => {
  for (let seed = 0; seed < 1000; seed++) {
    const questions = generateSession(seed);
    assert.equal(questions.length, 10);
    for (const item of questions) {
      assert.equal(new Set(item.options.map((option) => option.text)).size, 4);
      assert.equal(new Set(item.options.map((option) => numericValue(option.value))).size, 4);
      assert.equal(item.options.filter((option) => option.id === item.correct).length, 1);
      const answer = String(item.options.find((option) => option.id === item.correct).value);
      assert.equal(answer, String(item.answer));
      if (item.family === 0) {
        const { a, slope, b } = item.parameters;
        assert.equal(Number(answer), slope * a + b);
      } else if (item.family === 2) {
        const a = item.parameters.a || 1;
        // Evaluación independiente del cociente a ambos lados del punto excluido.
        for (const delta of [-0.0001, 0.0001]) {
          const x = a + delta;
          const value = (x * x - a * a) / (x - a);
          assert.ok(Math.abs(value - Number(answer)) < 0.00011);
        }
      } else if (item.family === 1) {
        const numbers = item.prompt.match(/valen (-?\d+) y (-?\d+)/);
        const left = Number(numbers[1]), right = Number(numbers[2]);
        assert.equal(answer, left === right ? String(left) : 'No existe');
      } else if (item.family === 3) {
        const { numerator, pole, power, side } = item.parameters;
        const near = pole + side * 0.000001, closer = pole + side * 0.0000001;
        const first = numerator / (near - pole) ** power;
        const second = numerator / (closer - pole) ** power;
        assert.ok(Math.abs(second) > Math.abs(first) * 5);
        assert.equal(answer, second > 0 ? '+∞' : '-∞');
      } else if (item.family === 4) {
        const { horizontal, denominatorLead, denominatorConstant, b, direction } = item.parameters;
        const x = direction * 10000000;
        const numeric = (horizontal * denominatorLead * x * x + b) / (denominatorLead * x * x + denominatorConstant);
        assert.ok(Math.abs(numeric - Number(answer)) < 1e-9);
      } else if (item.family === 5) {
        const { leading, degree, direction, slope, b } = item.parameters;
        const x = direction * 1000000;
        const value = leading * x ** degree + slope * x + b;
        assert.ok(Math.abs(value) > 1e10);
        assert.equal(answer, value > 0 ? '+∞' : '-∞');
      } else if (item.family === 6) {
        const { numerator, pole, shift } = item.parameters;
        assert.notEqual(numerator, 0);
        assert.equal(answer, 'x=' + pole);
        for (const delta of [-1e-7, 1e-7]) {
          assert.ok(Math.abs(numerator / delta + shift) > 1e6);
        }
      } else if (item.family === 7) {
        const { k, point } = item.parameters;
        for (const delta of [-0.0001, 0.0001]) {
          const x = point + delta;
          const quotient = (Math.sqrt(x) - k) / (x - point);
          assert.ok(Math.abs(quotient - numericValue(answer)) < 0.000013);
        }
      } else if (item.family === 8) {
        const { point, first, second, constant, differenceCoefficient } = item.parameters;
        // Comparar con las dos fracciones originales antes de simplificar.
        for (const delta of [-0.25, 0.25, -0.001, 0.001]) {
          const x = point + delta;
          const original = first / (x - point) - (second * x + constant) / (x * x - point * x);
          assert.ok(Math.abs(original - differenceCoefficient / x) < 1e-7);
          if (Math.abs(delta) < 0.01) assert.ok(Math.abs(original - numericValue(answer)) < 0.0003);
        }
      }
    }
    assert.deepEqual(questions, generateSession(seed));
  }
});
test('cobertura de los dieciocho epígrafes y nueve familias', () => {
  assert.equal(new Set(generateSession(42).map((q) => q.family)).size, 9);
  for (let i = 1; i <= 18; i++) {
    assert.equal(questionsForScope('t01-e' + String(i).padStart(2, '0')).length, 3);
  }
  assert.equal(questionsForScope('all-limits').length, 60);
  assert.equal(questionsForScope('review-t01').length, 6);
  assert.equal(questionsForScope('desconocido').length, 0);
  assert.equal(cardsForScope('t01').length, 61);
  assert.equal(new Set(flashcards.map((card) => card.id)).size, flashcards.length);
});
test('banco inicial: IDs y respuestas únicas', () => {
  assert.equal(new Set(limitQuestions.map((q) => q.id)).size, limitQuestions.length);
  for (const q of limitQuestions) {
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((o) => o.id)).size, 4);
    assert.equal(q.options.filter((o) => o.id === q.correct).length, 1);
    assert.ok(q.explanation && q.hint && q.options.every((o) => o.feedback));
  }
});
