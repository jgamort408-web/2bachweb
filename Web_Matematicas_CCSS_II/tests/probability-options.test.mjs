import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { probabilityQuestions } from '../content/activities/probability-test.js';

function numericOption(text) {
  let value = text.replace(/\\[()]/g, '').replace(/\{,\}/g, '.').replace(/\\,/g, '').trim().replace(/\.$/, '');
  value = value.split('=')[0].trim();
  const percent = /\\%$/.test(value);
  value = value.replace(/\\%$/, '').trim();
  const atom = '(?:\\{([+-]?\\d+(?:\\.\\d+)?)\\}|([+-]?\\d))';
  const fraction = value.match(new RegExp('^\\\\frac\\s*' + atom + '\\s*' + atom + '$'));
  let result;
  if (fraction) result = Number(fraction[1] ?? fraction[2]) / Number(fraction[3] ?? fraction[4]);
  else if (/^[+-]?\d+(?:\.\d+)?(?:\/[+-]?\d+(?:\.\d+)?)?$/.test(value)) {
    const [n, d = '1'] = value.split('/');
    result = Number(n) / Number(d);
  } else return null;
  return Number.isFinite(result) ? result / (percent ? 100 : 1) : null;
}

test('Probabilidad: se conservan enunciados, tres alternativas, solución, pistas y explicaciones previas', () => {
  const core = probabilityQuestions.map(q => ({
    id: q.id, prompt: q.prompt, table: q.table, options: q.options.filter(o => o.id !== 'd'),
    correct: q.correct, hint: q.hint, explanation: q.explanation,
  }));
  assert.equal(crypto.createHash('sha256').update(JSON.stringify(core)).digest('hex'),
    '60f9d53bf76a63d93efd7d5419ccfc80df3894191ff3b7d1913d969f52ad8c92');
});

test('Probabilidad: cuatro alternativas distintas y sin equivalencias numéricas', () => {
  let numericQuestions = 0;
  for (const q of probabilityQuestions) {
    assert.equal(q.options.length, 4, q.id);
    assert.equal(new Set(q.options.map(o => o.id)).size, 4, q.id);
    const extra = q.options.find(o => o.id === 'd');
    assert.ok(extra?.text && extra.feedback, q.id);
    assert.notEqual(q.correct, 'd', q.id);
    const values = q.options.map(o => numericOption(o.text));
    if (values.every(v => v !== null)) {
      numericQuestions++;
      assert.equal(new Set(values.map(v => v.toFixed(12))).size, 4, q.id + ': equivalencia numérica');
    }
  }
  assert.ok(numericQuestions >= 35, 'Se deben comprobar suficientes preguntas numéricas: ' + numericQuestions);
  assert.equal(probabilityQuestions.find(q => q.id === 'q-t07-base-36').sourceFile,
    '4. Tablas de contingencia y diagramas de árboles.txt');
});
