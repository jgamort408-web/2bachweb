import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { questions, flashcards } from '../content/activities/catalog.js';
import { expectedCatalog, expectedQuestionsByTopic, expectedCardsByTopic } from './helpers/catalog-expectations.mjs';

function byTopic(items) {
  const result = {};
  for (const item of items) result[item.topicId] = (result[item.topicId] ?? 0) + 1;
  return result;
}

test('catálogo: cobertura editorial por ámbito e identificadores únicos', () => {
  assert.deepEqual(byTopic(questions), expectedQuestionsByTopic);
  assert.deepEqual(byTopic(flashcards), expectedCardsByTopic);
  assert.equal(questions.length, expectedCatalog.questions);
  assert.equal(flashcards.length, expectedCatalog.cards);
  assert.equal(new Set(questions.map(item => item.id)).size, questions.length);
  assert.equal(new Set(flashcards.map(item => item.id)).size, flashcards.length);
});

test('catálogo: cuatro alternativas, solución única y ayuda completa', () => {
  for (const q of questions) {
    assert.equal(q.options.length, 4, q.id);
    assert.equal(new Set(q.options.map(o => o.id)).size, 4, q.id);
    assert.equal(new Set(q.options.map(o => o.text.trim())).size, 4, q.id);
    assert.equal(q.options.filter(o => o.id === q.correct).length, 1, q.id);
    assert.ok(q.prompt && q.hint && q.explanation, q.id);
    assert.ok(q.options.every(o => o.text && o.feedback), q.id);
  }
});

test('catálogo: referencias existentes y tarjetas legibles', () => {
  const pages = JSON.parse(fs.readFileSync(new URL('../config/pages.json', import.meta.url), 'utf8'));
  const ids = new Set(pages.map(page => page.id));
  const scopes = JSON.parse(fs.readFileSync(new URL('../config/study-scopes.json', import.meta.url), 'utf8'));
  for (const [id, scope] of Object.entries(scopes)) {
    const target = pages.find(page => page.id === scope.pageId);
    assert.ok(target, id + ': página de repaso');
    const html = fs.readFileSync(new URL('../' + target.path, import.meta.url), 'utf8');
    assert.ok(html.includes('id="' + scope.fragment + '"'), id + ': apartado del repaso');
  }
  for (const item of [...questions, ...flashcards]) {
    assert.ok(ids.has(item.topicId), item.id + ': tema o apoyo');
    if (item.lessonId) assert.ok(ids.has(item.lessonId) || Object.hasOwn(scopes, item.lessonId), item.id + ': epígrafe o repaso');
  }
  for (const card of flashcards) assert.ok(card.front?.trim() && card.back?.trim(), card.id);
});
