export const repeatedRootPolynomial = {
  value: x => x ** 3 - 3 * x - 2,
  derivative: x => 3 * x * x - 3,
  roots: [-1, 2],
  extrema: [{ x: -1, y: 0 }, { x: 1, y: -4 }],
};
export const benefitModel = {
  value: q => -2 * q * q + 24 * q - 40,
  derivative: q => -4 * q + 24,
  domain: [0, 10],
};

function polynomialTex(coefficients) {
  return coefficients.map((coefficient, degree) => ({ coefficient, degree })).reverse()
    .filter(term => term.coefficient !== 0).map(({ coefficient: c, degree: n }, i) => {
      const sign = c < 0 ? '-' : i ? '+' : '';
      const magnitude = Math.abs(c) === 1 && n ? '' : String(Math.abs(c));
      return sign + magnitude + (n ? n === 1 ? 'x' : 'x^{' + n + '}' : '');
    }).join('') || '0';
}

/** Seis ejercicios procedurales; todos los patrones de infinitos aparecen. */
export function generatePolynomialEnds(seed) {
  let state = seed >>> 0;
  const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
  const integer = (min, max) => min + Math.floor(random() * (max - min + 1));
  const patterns = [[1, 1], [-1, -1], [-1, 1], [1, -1]];
  const infinity = sign => sign > 0 ? '+\\infty' : '-\\infty';
  return Array.from({ length: 6 }, (_, index) => {
    const degree = index + 1;
    const sign = index < 4 ? [1, 1, -1, -1][index] : integer(0, 1) ? 1 : -1;
    const leading = sign * integer(1, 4);
    const coefficients = Array(degree + 1).fill(0);
    coefficients[degree] = leading; coefficients[0] = integer(-5, 5);
    if (degree > 1) coefficients[1] = integer(-5, 5);
    const left = sign * (degree % 2 ? -1 : 1), right = sign;
    return {
      id: 'poly-ends-' + (seed >>> 0) + '-' + index,
      prompt: 'Para \\(P(x)=' + polynomialTex(coefficients) + '\\), elige los límites cuando \\(x\\to-\\infty\\) y \\(x\\to+\\infty\\), en ese orden.',
      parameters: { degree, leading, coefficients, left, right },
      correct: 'pattern-' + patterns.findIndex(pair => pair[0] === left && pair[1] === right),
      options: patterns.map(([a, b], i) => ({ id: 'pattern-' + i, text: '\\(' + infinity(a) + ',\\ ' + infinity(b) + '\\)', feedback: a === left && b === right ? 'Coincide con el término de mayor grado.' : 'Revisa la paridad y el signo del coeficiente principal; el primer límite corresponde a la izquierda.' })),
      hint: 'El grado es ' + degree + ' y el coeficiente principal es ' + leading + '. Ignora los términos de menor grado para este cálculo.',
      explanation: 'El término dominante es \\(' + polynomialTex(coefficients.map((c, n) => n === degree ? c : 0)) + '\\). El grado es ' + (degree % 2 ? 'impar' : 'par') + ': los límites son \\(' + infinity(left) + '\\) y \\(' + infinity(right) + '\\), respectivamente.',
    };
  });
}
