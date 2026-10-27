export const scalingFamilies = {
  parabola: { label: 'Parábola desplazada', tex: '(x-1)^2', value: x => (x-1)**2, derivative: x => 2*(x-1), samples: [0,1,2,3] },
  reciprocal: { label: 'Racional desplazada', tex: '\\frac1{x-1}', value: x => x===1 ? NaN : 1/(x-1), derivative: x => x===1 ? NaN : -1/(x-1)**2, samples: [-1,0,2,3] },
  logarithm: { label: 'Logaritmo natural', tex: '\\ln x', value: x => x>0 ? Math.log(x) : NaN, derivative: x => x>0 ? 1/x : NaN, samples: [0.25,0.5,1,2] },
};

export function scalingModel(kind, vertical, horizontal) {
  if (!Object.hasOwn(scalingFamilies,kind) || ![vertical,horizontal].every(Number.isFinite) || vertical===0 || horizontal===0) throw new RangeError('Familia válida y factores finitos no nulos requeridos');
  const family=scalingFamilies[kind];
  return {...family,kind,vertical,horizontal,
    value:x=>vertical*family.value(horizontal*x),
    derivative:x=>vertical*horizontal*family.derivative(horizontal*x),
    point:u=>[u/horizontal,vertical*family.value(u)],
    inDomain:x=>kind==='reciprocal'?horizontal*x!==1:kind==='logarithm'?horizontal*x>0:true,
    verticalAsymptote:kind==='reciprocal'?1/horizontal:kind==='logarithm'?0:null,
    extremum:kind==='parabola'?{x:1/horizontal,y:0,type:vertical>0?'mínimo':'máximo'}:null,
  };
}

export function scaleInterval(lower,upper,lowerClosed,upperClosed,factor) {
  if (!Number.isFinite(factor) || factor===0) throw new RangeError('Factor finito no nulo requerido');
  return factor>0 ? {lower:lower*factor,upper:upper*factor,lowerClosed,upperClosed}
    : {lower:upper*factor,upper:lower*factor,lowerClosed:upperClosed,upperClosed:lowerClosed};
}
