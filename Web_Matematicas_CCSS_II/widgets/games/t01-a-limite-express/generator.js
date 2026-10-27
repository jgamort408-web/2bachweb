/** Nueve familias: parámetros controlados y respuestas verificables sin eval. */
function fraction(numerator, denominator) {
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const divisor = gcd(Math.abs(numerator), denominator);
  return numerator / divisor + '/' + denominator / divisor;
}
function optionText(value) {
  if (['No existe', 'Ninguna'].includes(value)) return value;
  const text = String(value);
  const parts = text.match(/^(-?\d+)\/(\d+)$/);
  return '\\(' + (parts ? '\\frac{' + parts[1] + '}{' + parts[2] + '}' : text.replace('∞', '\\infty')) + '\\)';
}
export function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}
export function generateQuestion(random, index = 0) {
  const integer = (min, max) => min + Math.floor(random() * (max - min + 1));
  const a = integer(-5, 5), slope = integer(1, 5), b = integer(-5, 5);
  const family = index % 9;
  const parameters = { a, slope, b };
  const difference = (point) => point < 0 ? 'x+' + -point : 'x-' + point;
  const signed = (value) => value < 0 ? '-' + -value : '+' + value;
  let answer, prompt, explanation, hint, values;
  const linear = slope + 'x' + (b < 0 ? '-' + -b : '+' + b);
  if (family === 0) {
    answer = slope * a + b;
    prompt = 'Calcula \\(\\lim_{x\\to ' + a + '}(' + linear + ')\\).';
    explanation = 'Es un polinomio continuo. Sustituye x por ' + a + ': \\(' + slope + '\\cdot(' + a + ') + (' + b + ') = ' + answer + '\\).';
    hint = 'Sustituye el valor al que se acerca x en el polinomio.';
    values = [answer, answer + 1, answer - 1, answer + 2];
  } else if (family === 1) {
    const right = random() < 0.5 ? a : a + integer(1, 4);
    parameters.right = right;
    answer = a === right ? String(a) : 'No existe';
    prompt = 'Los límites laterales de una función en un punto valen ' + a + ' y ' + right + '. ¿Cuál es el límite bilateral?';
    explanation = a === right ? 'Los laterales coinciden: el límite es ' + a + '.' : 'Los laterales difieren. No existe el límite bilateral y no se promedian los resultados.';
    hint = 'Compara los dos límites laterales.';
    values = a === right ? [String(a), 'No existe', String(a + 1), String(a - 1)] : ['No existe', String(a), String(right), String((a + right) / 2)];
  } else if (family === 2) {
    // Excluimos a=0 para que el reto sea una diferencia de cuadrados reconocible.
    const point = a === 0 ? 1 : a;
    answer = 2 * point;
    const factor = point < 0 ? 'x+' + -point : 'x-' + point;
    prompt = 'Calcula \\(\\lim_{x\\to ' + point + '}\\dfrac{x^2-' + point ** 2 + '}{' + factor + '}\\).';
    explanation = 'Factoriza el numerador y cancela el factor del denominador solo para x distinto de ' + point + '. Queda \\(x + (' + point + ')\\), cuyo límite es \\(' + answer + '\\).';
    hint = 'Usa la identidad de la diferencia de cuadrados.';
    values = [answer, 0, point, 'No existe'];
  } else if (family === 3) {
    const numerator = a || 1, pole = b, power = integer(1, 2), side = random() < 0.5 ? -1 : 1;
    Object.assign(parameters, { numerator, pole, power, side });
    const sign = Math.sign(numerator) * side ** power;
    answer = sign > 0 ? '+∞' : '-∞';
    const exponent = power === 2 ? '^2' : '';
    prompt = 'Calcula \\(\\lim_{x\\to ' + pole + '^' + (side < 0 ? '-' : '+') + '}\\frac{' + numerator + '}{(' + difference(pole) + ')' + exponent + '}\\).';
    hint = 'Estudia el signo del denominador por ese lado y recuerda si la potencia es par o impar.';
    explanation = 'El numerador es ' + (numerator > 0 ? 'positivo' : 'negativo') +
      '. El denominador se acerca a cero con signo ' + (side ** power > 0 ? 'positivo' : 'negativo') +
      '. El límite es \\(' + (sign > 0 ? '+' : '-') + '\\infty\\).';
    values = [answer, sign > 0 ? '-∞' : '+∞', 0, 'No existe'];
  } else if (family === 4) {
    const horizontal = a || 1, denominatorLead = integer(1, 5), denominatorConstant = integer(1, 5);
    const direction = random() < 0.5 ? -1 : 1;
    Object.assign(parameters, { horizontal, denominatorLead, denominatorConstant, direction });
    answer = horizontal;
    prompt = 'Calcula \\(\\lim_{x\\to ' + (direction < 0 ? '-' : '+') + '\\infty}\\frac{' +
      horizontal * denominatorLead + 'x^2' + signed(b) + '}{' + denominatorLead + 'x^2+' + denominatorConstant + '}\\).';
    hint = 'Numerador y denominador tienen el mismo grado. Divide por x².';
    explanation = 'Después de dividir por x², los términos constantes originales quedan divididos por x² y tienden a cero. El cociente de coeficientes es \\(' +
      '\\frac{' + (horizontal * denominatorLead) + '}{' + denominatorLead + '} = ' + horizontal + '\\).';
    values = [answer, answer + 1, answer - 1, '+∞'];
  } else if (family === 5) {
    const leading = a || 1, degree = integer(2, 5), direction = random() < 0.5 ? -1 : 1;
    Object.assign(parameters, { leading, degree, direction });
    const sign = Math.sign(leading) * direction ** degree;
    answer = sign > 0 ? '+∞' : '-∞';
    prompt = 'Calcula \\(\\lim_{x\\to ' + (direction < 0 ? '-' : '+') + '\\infty}(' +
      leading + 'x^{' + degree + '}+' + slope + 'x' + signed(b) + ')\\).';
    hint = 'Domina la mayor potencia. Combina el signo del coeficiente y la paridad del grado.';
    explanation = 'El grado ' + degree + ' es ' + (degree % 2 ? 'impar' : 'par') +
      ' y su coeficiente es ' + leading + '. En el extremo solicitado, el término dominante tiene signo ' +
      (sign > 0 ? 'positivo' : 'negativo') + ' y crece sin cota en valor absoluto.';
    values = [answer, sign > 0 ? '-∞' : '+∞', 0, 'No existe'];
  } else if (family === 6) {
    const numerator = a || 1, pole = b, shift = slope;
    Object.assign(parameters, { numerator, pole, shift });
    answer = 'x=' + pole;
    prompt = '¿Cuál es la asíntota vertical de \\(f(x)=\\frac{' + numerator + '}{' + difference(pole) + '}+' + shift + '\\)?';
    hint = 'El numerador de la fracción es distinto de cero. Busca dónde se anula su denominador.';
    explanation = 'Al acercarse x a ' + pole + ', la fracción crece sin cota en valor absoluto. Sumar ' +
      shift + ' no cambia ese comportamiento: la asíntota vertical es \\(x=' + pole + '\\).';
    values = [answer, 'y=' + pole, 'x=' + (pole + 1), 'Ninguna'];
  } else if (family === 7) {
    const k = integer(1, 5), point = k * k;
    Object.assign(parameters, { k, point });
    answer = fraction(1, 2 * k);
    prompt = 'Calcula \\(\\lim_{x\\to ' + point + '}\\frac{\\sqrt{x}-' + k + '}{x-' + point + '}\\).';
    hint = 'Multiplica numerador y denominador por el conjugado de la diferencia de raíces.';
    explanation = 'Para x distinto de ' + point + ', racionalizar da \\(1/(\\sqrt{x}+' + k +
      ')\\). El límite es \\(1/(' + k + '+' + k + ')=\\frac1{' + 2 * k + '}\\).';
    values = [answer, fraction(1, k), 2 * k, 0];
  } else {
    const point = integer(2, 5), differenceCoefficient = integer(1, point - 1);
    const first = integer(differenceCoefficient + 1, differenceCoefficient + 5);
    const second = first - differenceCoefficient, constant = differenceCoefficient * point;
    Object.assign(parameters, { point, differenceCoefficient, first, second, constant });
    answer = fraction(differenceCoefficient, point);
    prompt = 'Calcula \\(\\lim_{x\\to ' + point + '}\\left(\\frac{' + first + '}{x-' + point +
      '}-\\frac{' + second + 'x+' + constant + '}{x^2-' + point + 'x}\\right)\\).';
    hint = 'Factoriza el segundo denominador. Al reunir las fracciones, resta todo el segundo numerador.';
    explanation = 'Fuera de x=0 y x=' + point + ', el numerador común es \\(' + differenceCoefficient +
      '(x-' + point + ')\\). Tras cancelar queda \\(' + differenceCoefficient + '/x\\), cuyo límite es \\(\\frac{' +
      differenceCoefficient + '}{' + point + '}\\).';
    values = [answer, 0, 1, 'No existe'];
  }
  return {
    id: 'generated-' + index,
    family, parameters, answer,
    prompt, explanation, hint, correct: 'answer-0',
    options: values.map((value, i) => ({
      id: 'answer-' + i, value,
      text: optionText(value),
      feedback: i === 0 ? 'Correcto.' : 'Ese resultado no cumple el procedimiento. ' + hint,
    })),
  };
}
export function generateSession(seed) {
  const random = seededRandom(seed);
  return Array.from({ length: 10 }, (_, i) => generateQuestion(random, i));
}
