import { mountQuiz } from './quiz.js';
import { generatePolynomialEnds, repeatedRootPolynomial } from '../../../content/models/polynomials.js';

export function initializePolynomialPractice() {
  const practice = document.querySelector('[data-polynomial-practice]');
  if (practice) mountQuiz(practice, () => generatePolynomialEnds(crypto.getRandomValues(new Uint32Array(1))[0]));
  const curve = document.querySelector('[data-polynomial-curve]');
  if (curve) {
    const points = [];
    for (let i = 0; i <= 380; i++) {
      const x = -2.25 + 4.75 * i / 380;
      points.push((i ? 'L' : 'M') + (260 + 100 * x).toFixed(3) + ' ' + (150 - 20 * repeatedRootPolynomial.value(x)).toFixed(3));
    }
    curve.setAttribute('d', points.join(' '));
  }
}
