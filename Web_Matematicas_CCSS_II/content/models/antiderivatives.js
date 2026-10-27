export const primitiveFamilies={
 linear:{label:'f(x)=2x',integrandTex:'2x',baseTex:'x^2',value:x=>x*x,derivative:x=>2*x},
 quadratic:{label:'f(x)=6x²',integrandTex:'6x^2',baseTex:'2x^3',value:x=>2*x*x*x,derivative:x=>6*x*x},
 constant:{label:'f(x)=3',integrandTex:'3',baseTex:'3x',value:x=>3*x,derivative:()=>3}
};
export function primitiveModel(kind,c,a,b){
 const f=primitiveFamilies[kind];
 if(!f||!Number.isInteger(c)||c< -6||c>6||![-1,0,1].includes(a)||![-2,0,2].includes(b))throw new RangeError('Selección de primitiva no admitida');
 return {family:f,c,a,b,value:x=>f.value(x)+c,slope:f.derivative(a),pointValue:f.value(a)+c,requiredC:b-f.value(a),matches:f.value(a)+c===b};
}
