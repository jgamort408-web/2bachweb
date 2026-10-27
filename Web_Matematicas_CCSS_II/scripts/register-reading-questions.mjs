// Connect static reading copies to the bank IDs without changing their mathematical text.
import fs from 'node:fs';
import { probabilityQuestions } from '../content/activities/probability-test.js';
import { inferenceQuestions } from '../content/activities/inference-test.js';
const probabilityPath = new URL('../test/probabilidad-preguntas.html', import.meta.url);
let probability = fs.readFileSync(probabilityPath, 'utf8');
let index = 0;
probability = probability.replace(/<article(?:\s[^>]*)?>/g, () => {
  const question = probabilityQuestions[index++];
  if (!question) throw new Error('Hay más bloques de lectura que preguntas de Probabilidad');
  return '<article data-content-id="question:' + question.id + '">';
});
if (index !== probabilityQuestions.length) throw new Error('Faltan bloques de lectura de Probabilidad');
fs.writeFileSync(probabilityPath, probability, 'utf8');
const inferencePath = new URL('../test/inferencia-preguntas.html', import.meta.url);
let inference = fs.readFileSync(inferencePath, 'utf8');
index = 0;
inference = inference.replace(/<details id="pregunta-(\d+)"(?:\s[^>]*)?>/g, (_, number) => {
  const question = inferenceQuestions[Number(number) - 1];
  if (!question) throw new Error('Bloque de Inferencia sin pregunta correspondiente');
  index++;
  return '<details id="pregunta-' + number + '" data-content-id="question:' + question.id + '">';
}).replace('data-page-id="tests"', 'data-page-id="t09-questions"');
if (index !== inferenceQuestions.length) throw new Error('Faltan bloques de lectura de Inferencia');
fs.writeFileSync(inferencePath, inference, 'utf8');
console.log('Lecturas vinculadas: ' + probabilityQuestions.length + ' de Probabilidad y ' + inferenceQuestions.length + ' de Inferencia.');
