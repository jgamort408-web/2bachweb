// Contrato editorial independiente de los datos que valida.
// Al ampliar un banco, actualizar aquí su ámbito y documentar la entrega.
export const expectedQuestionsByTopic = Object.freeze({
  t01: 60, t02: 60, t03: 60, t04: 72, t05: 66, t07: 60, t09: 20,
});
export const expectedCardsByTopic = Object.freeze({
  t01: 61, t02: 54, t03: 48, t04: 72, t05: 66,
  t06: 19, t07: 16, bivariate: 20, t08: 19, t09: 30,
});
export const expectedCatalog = Object.freeze({
  questions: Object.values(expectedQuestionsByTopic).reduce((sum, n) => sum + n, 0),
  cards: Object.values(expectedCardsByTopic).reduce((sum, n) => sum + n, 0),
});
