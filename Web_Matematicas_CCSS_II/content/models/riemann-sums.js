/**
 * Sumas de Riemann con una curva (3.5). Procede del «Laboratorio de integrales» (A Incluir/), que compara extremos
 * izquierdos, puntos medios y extremos derechos para f(x)=x² en [0, 2]. Se añade f(x)=4−x², decreciente, para ver que
 * el sentido del error depende de la monotonía y no de la regla.
 */
export const riemannFamilies = Object.freeze({
  increasing: { label: 'f(x)=x²', tex: 'x^2', integrand: 'x^2', value: x => x * x, exact: 8 / 3, exactTex: String.raw`\frac{8}{3}`, monotony: 'creciente', yMax: 4 },
  decreasing: { label: 'f(x)=4−x²', tex: '4-x^2', integrand: '(4-x^2)', value: x => 4 - x * x, exact: 16 / 3, exactTex: String.raw`\frac{16}{3}`, monotony: 'decreciente', yMax: 4 }
});
export const riemannRules = Object.freeze({
  left: { label: 'Extremo izquierdo', offset: 0 },
  mid: { label: 'Punto medio', offset: 0.5 },
  right: { label: 'Extremo derecho', offset: 1 }
});
export const RIEMANN_A = 0, RIEMANN_B = 2;

/** Suma de n rectángulos en [0, 2] con la regla elegida; valor exacto, error y si aproxima por defecto o por exceso. */
export function riemannModel(kind, rule, n) {
  const family = Object.hasOwn(riemannFamilies, kind) ? riemannFamilies[kind] : null;
  const chosen = Object.hasOwn(riemannRules, rule) ? riemannRules[rule] : null;
  if (!family || !chosen || !Number.isInteger(n) || n < 1 || n > 100) throw new RangeError('Configuración de suma no admitida');
  const width = (RIEMANN_B - RIEMANN_A) / n;
  const rectangles = Array.from({ length: n }, (_, i) => {
    const left = RIEMANN_A + i * width, x = left + chosen.offset * width, height = family.value(x);
    return { left, right: left + width, x, height, area: height * width };
  });
  const sum = rectangles.reduce((total, rectangle) => total + rectangle.area, 0);
  const difference = sum - family.exact;
  return {
    family, rule: chosen, kind, ruleKey: rule, n, width, rectangles, sum, exact: family.exact,
    error: Math.abs(difference), direction: Math.abs(difference) < 1e-12 ? 'exacta' : difference > 0 ? 'por exceso' : 'por defecto'
  };
}
