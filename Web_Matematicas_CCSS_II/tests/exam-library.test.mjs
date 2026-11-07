import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { render } from '../scripts/build-exams.mjs';

const page = fs.readFileSync(new URL('../examenes/index.html', import.meta.url), 'utf8');
const { resources } = JSON.parse(fs.readFileSync(new URL('../config/resources.json', import.meta.url), 'utf8'));
const exams = resources.filter(resource => resource.kind === 'exam');

test('la biblioteca de exámenes está al día con config/resources.json', () => {
  assert.equal(render(page), page, 'Ejecuta: node scripts/build-exams.mjs');
});

test('cada examen tiene una tarjeta con su enlace y el de sus soluciones', () => {
  const cards = [...page.matchAll(/<li class="mc-library__item" data-content-id="resource:([^"]+)"[\s\S]*?<\/li>/g)];
  assert.deepEqual(cards.map(card => card[1]).sort(), exams.map(exam => exam.id).sort());
  for (const [card, id] of cards) {
    const exam = exams.find(item => item.id === id);
    const solution = resources.find(item => item.kind === 'solution' && item.examId === id);
    assert.ok(card.includes(`href="../${exam.path}"`), id + ': falta el enlace al examen');
    assert.ok(solution && card.includes(`href="../${solution.path}"`), id + ': falta el enlace a las soluciones');
  }
});

test('las etiquetas editoriales no se muestran al alumnado', () => {
  const visible = page.replace(/data-search="[^"]*"/g, '');
  for (const word of ['revisado', 'por-aclarar', 'por aclarar', 'anexo']) assert.ok(!visible.toLowerCase().includes(word), word);
});
