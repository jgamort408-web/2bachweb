export const translationFamilies = {
  square: { label: 'Parábola', tex: 'x^2', value: x => x * x, samples: [-1, 0, 1, 2] },
  absolute: { label: 'Valor absoluto', tex: '|x|', value: x => Math.abs(x), samples: [-1, 0, 1, 2] },
  reciprocal: { label: 'Inversa', tex: '1/x', value: x => x === 0 ? NaN : 1 / x, samples: [-2, -1, 1, 2] },
  logarithm: { label: 'Logaritmo natural', tex: '\\ln x', value: x => x > 0 ? Math.log(x) : NaN, samples: [0.5, 1, 2, 4] },
};

export function translationModel(kind, a, k) {
  if (!Object.hasOwn(translationFamilies, kind) || ![a, k].every(Number.isFinite)) throw new RangeError('Familia válida y desplazamientos finitos requeridos');
  const family = translationFamilies[kind];
  return { ...family, kind, a, k,
    value: x => family.value(x - a) + k,
    point: u => [u + a, family.value(u) + k],
    inDomain: x => kind === 'reciprocal' ? x !== a : kind === 'logarithm' ? x > a : true,
    vertical: ['reciprocal', 'logarithm'].includes(kind) ? a : null,
    horizontal: kind === 'reciprocal' ? k : null,
    minimum: ['square', 'absolute'].includes(kind) ? [a, k] : null,
  };
}

export function translatedLine(m, b, a, k) {
  return { slope: m, intercept: b + k - m * a };
}
