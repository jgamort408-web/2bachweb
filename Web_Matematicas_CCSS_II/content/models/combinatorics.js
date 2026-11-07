// Recuentos de la calculadora de Combinatoria (apoyo). Fuente: Página web existente/Combinatoria.txt.
// Se calcula con BigInt: el original usaba coma flotante y, por ejemplo, VR(19,19) salía con cifras falsas.

export const MAX_N = 20;

export const COUNT_TYPES = Object.freeze({
  variations: 'Variaciones sin repetición',
  variationsWithRepetition: 'Variaciones con repetición',
  permutations: 'Permutaciones',
  permutationsWithRepetition: 'Permutaciones con repetición',
  combinations: 'Combinaciones'
});

export function factorial(n) {
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) result *= i;
  return result;
}

/** Producto descendente n·(n−1)···(n−r+1), con r factores. */
export function fallingProduct(n, r) {
  let result = 1n;
  for (let i = 0; i < r; i++) result *= BigInt(n - i);
  return result;
}

export const variations = (n, r) => fallingProduct(n, r);
export const variationsWithRepetition = (n, r) => BigInt(n) ** BigInt(r);
export const permutations = n => factorial(n);
export const combinations = (n, r) => fallingProduct(n, r) / factorial(r);
export function permutationsWithRepetition(n, repeats) {
  return factorial(n) / repeats.reduce((product, k) => product * factorial(k), 1n);
}

/** Entero con espacio fino como separador de millares (norma española), en LaTeX. */
export function texInteger(value) {
  const digits = String(value);
  return digits.length <= 4 ? digits : digits.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
}

/** Mismo formato en texto plano, con espacio fino de no separación. */
export function plainInteger(value) {
  const digits = String(value);
  return digits.length <= 4 ? digits : digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function integerIn(value, min, max, name) {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`${name} debe ser un número entero entre ${min} y ${max}.`);
  }
  return value;
}

/** Lee «2, 3, 2» como lista de repeticiones (enteros ≥ 2). */
export function parseRepeats(text) {
  const parts = String(text ?? '').split(/[,;\s]+/).filter(Boolean);
  if (!parts.length) throw new RangeError('Indica cuántas veces se repite cada elemento, por ejemplo 2, 3, 2.');
  return parts.map(part => {
    const value = Number(part);
    if (!Number.isInteger(value) || value < 2) throw new RangeError('Cada repetición debe ser un entero mayor o igual que 2; los elementos que aparecen una vez no se escriben.');
    return value;
  });
}

/**
 * Resultado con desarrollo para la calculadora.
 * Devuelve { type, value (BigInt), formula (LaTeX), steps: [{ label, tex }] }.
 */
export function count({ type, n, r, repeats }) {
  integerIn(n, 1, MAX_N, 'n');
  const N = texInteger;
  const step = (label, tex) => ({ label, tex });
  if (type === 'variations' || type === 'combinations') {
    integerIn(r, 1, n, 'r');
    const factors = Array.from({ length: r }, (_, i) => n - i).join('\\cdot ');
    const falling = fallingProduct(n, r);
    if (type === 'variations') {
      const value = variations(n, r);
      return { type, value, formula: `V(${n},${r})=\\dfrac{${n}!}{${n - r}!}=${factors}=${N(value)}`,
        steps: [step('Fórmula', 'V(n,r)=\\dfrac{n!}{(n-r)!}'), step('Sustitución', `V(${n},${r})=\\dfrac{${n}!}{${n - r}!}`),
          step(`Producto de ${r} factores`, `${factors}=${N(value)}`)] };
    }
    const value = combinations(n, r);
    return { type, value, formula: `C(${n},${r})=\\dbinom{${n}}{${r}}=\\dfrac{${n}!}{${r}!\\cdot ${n - r}!}=\\dfrac{${factors}}{${r}!}=\\dfrac{${N(falling)}}{${N(factorial(r))}}=${N(value)}`,
      steps: [step('Fórmula', 'C(n,r)=\\dbinom{n}{r}=\\dfrac{n!}{r!\\,(n-r)!}'), step('Sustitución', `C(${n},${r})=\\dfrac{${n}!}{${r}!\\cdot ${n - r}!}`),
        step(`Numerador (${r} factores)`, `${factors}=${N(falling)}`), step('Denominador', `${r}!=${N(factorial(r))}`),
        step('División', `\\dfrac{${N(falling)}}{${N(factorial(r))}}=${N(value)}`)] };
  }
  if (type === 'variationsWithRepetition') {
    integerIn(r, 1, MAX_N, 'r');
    const value = variationsWithRepetition(n, r);
    return { type, value, formula: `VR(${n},${r})=${n}^{${r}}=${N(value)}`,
      steps: [step('Fórmula', 'VR(n,r)=n^r'), step('Sustitución', `VR(${n},${r})=${n}^{${r}}`), step('Potencia', `${n}^{${r}}=${N(value)}`)] };
  }
  if (type === 'permutations') {
    const value = permutations(n);
    const factors = Array.from({ length: n }, (_, i) => n - i).join('\\cdot ');
    return { type, value, formula: `P_{${n}}=${n}!=${N(value)}`,
      steps: [step('Fórmula', 'P_n=n!'), step('Producto', `P_{${n}}=${factors}`), step('Resultado', `${n}!=${N(value)}`)] };
  }
  if (type === 'permutationsWithRepetition') {
    const list = Array.isArray(repeats) ? repeats : parseRepeats(repeats);
    const total = list.reduce((sum, k) => sum + k, 0);
    if (total > n) throw new RangeError(`Las repeticiones suman ${total} y no pueden superar n = ${n}.`);
    const denominator = list.reduce((product, k) => product * factorial(k), 1n);
    const value = permutationsWithRepetition(n, list);
    const shown = list.map(k => k + '!').join('\\cdot ');
    return { type, value, formula: `P_{${n}}^{(${list.join(',')})}=\\dfrac{${n}!}{${shown}}=\\dfrac{${N(factorial(n))}}{${N(denominator)}}=${N(value)}`,
      steps: [step('Fórmula', 'P_n^{(a,b,\\ldots)}=\\dfrac{n!}{a!\\cdot b!\\cdots}'), step('Numerador', `${n}!=${N(factorial(n))}`),
        step('Denominador', `${shown}=${N(denominator)}`), step('División', `\\dfrac{${N(factorial(n))}}{${N(denominator)}}=${N(value)}`)] };
  }
  throw new RangeError('Tipo de recuento desconocido.');
}
