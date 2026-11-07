import test from 'node:test';
import assert from 'node:assert/strict';
import { flashcards } from '../content/activities/catalog.js';

// P06 · Apartados de la página Tarjetas: categoría de la fuente (temas 6–9 y apoyo), lección (temas 1–5)
// o repaso del tema. Ninguna tarjeta mezcla categoría y lección.
test('cada tarjeta tiene un único apartado', () => {
  for (const card of flashcards) {
    assert.ok(!(card.category && card.lessonId), card.id + ': categoría y lección a la vez');
    if (['t06', 't07', 't08', 't09', 'bivariate'].includes(card.topicId)) assert.ok(card.category, card.id + ': sin categoría');
  }
});

test('las tarjetas del tema 1 siguen el orden de sus 18 lecciones y el repaso queda aparte', () => {
  const t01 = flashcards.filter(card => card.topicId === 't01');
  const review = t01.filter(card => card.id.startsWith('fc-review-'));
  assert.equal(review.length, 5);
  assert.ok(review.every(card => !card.lessonId));
  const lessons = t01.filter(card => card.lessonId).map(card => Number(card.lessonId.slice(-2)));
  assert.equal(lessons.length, t01.length - review.length);
  assert.deepEqual([...new Set(lessons)], Array.from({ length: 18 }, (_, i) => i + 1));
  assert.deepEqual(lessons, [...lessons].sort((a, b) => a - b));
});
