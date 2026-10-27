import {fraction,fractionTex} from './matrix-inverse.js';
import {linearTex} from './linear-systems.js';
const tex=String.raw;
export const solutionPresets={
 crossing:{label:'Un punto común',lines:[[1,1,5],[1,-1,1]]},
 parallel:{label:'Paralelas distintas',lines:[[1,1,5],[2,2,12]]},
 coincident:{label:'La misma recta',lines:[[1,1,5],[2,2,10]]},
 vertical:{label:'Vertical y horizontal',lines:[[1,0,2],[0,1,-1]]},
 fractional:{label:'Intersección fraccionaria',lines:[[2,1,1],[1,-1,0]]},
 outside:{label:'Intersección fuera de la ventana',lines:[[1,-1,0],[8,-9,18]]}
};
export function validateLines(lines){
 if(!Array.isArray(lines)||lines.length!==2||lines.some(r=>!Array.isArray(r)||r.length!==3||!r.every(Number.isSafeInteger)||Math.abs(r[0])>9||Math.abs(r[1])>9||Math.abs(r[2])>99||(r[0]===0&&r[1]===0)))throw new RangeError('Dos rectas no degeneradas, coeficientes hasta 9 y términos hasta 99.');
}
export function classifyLines(lines){
 validateLines(lines);const [[a,b,c],[d,e,f]]=lines,det=a*e-b*d;
 if(det!==0)return {kind:'unique',point:[fraction(c*e-b*f,det),fraction(a*f-c*d,det)]};
 return {kind:a*f===c*d&&b*f===c*e?'infinite':'none',point:null};
}
export function parseCoordinate(text){
 const s=String(text).trim().replace('−','-').replace(',','.');
 let n,d=1,m;
 if((m=/^([+-]?\d+)\/([+-]?\d+)$/.exec(s))){n=Number(m[1]);d=Number(m[2]);}
 else if(/^[+-]?(?:\d+(?:\.\d{1,3})?|\.\d{1,3})$/.test(s)){const decimals=s.includes('.')?s.split('.')[1].length:0;d=10**decimals;n=Math.round(Number(s)*d);}
 else return null;
 if(!Number.isSafeInteger(n)||!Number.isSafeInteger(d)||d===0||Math.abs(d)>1000||Math.abs(n/d)>99)return null;
 return fraction(n,d);
}
export function checkPoint(lines,point){
 validateLines(lines);
 if(!Array.isArray(point)||point.length!==2||point.some(f=>!f||!Number.isSafeInteger(f.numerator)||!Number.isSafeInteger(f.denominator)||f.denominator<=0||f.denominator>1000||Math.abs(f.numerator/f.denominator)>99))throw new RangeError('Dos coordenadas exactas dentro de los límites.');
 const [x,y]=point;
 return lines.map(([a,b,c])=>{const left=fraction(a*x.numerator*y.denominator+b*y.numerator*x.denominator,x.denominator*y.denominator);return {left,right:c,satisfied:left.numerator===c*left.denominator};});
}
export function solutionPoint(lines,t=0){
 if(!Number.isInteger(t)||Math.abs(t)>9)throw new RangeError('Parámetro entero de −9 a 9.');
 const m=classifyLines(lines);if(m.kind==='unique')return m.point;if(m.kind==='none')return null;
 const [a,b,c]=lines[0];return b!==0?[fraction(t),fraction(c-a*t,b)]:[fraction(c,a),fraction(t)];
}
export function linesTex(lines){validateLines(lines);return tex`\begin{cases}${lines.map(([a,b,c])=>linearTex([a,b])+'='+c).join(tex`\\`)}\end{cases}`;}
export function solutionTex(lines){
 const m=classifyLines(lines);if(m.kind==='none')return tex`S=\varnothing`;
 if(m.kind==='unique')return tex`S=\left\{\left(${m.point.map(fractionTex).join(',')}\right)\right\}`;
 const [a,b,c]=lines[0];
 return b!==0?tex`S=\left\{\left(t,\frac{${c}-(${a})t}{${b}}\right):t\in\mathbb{R}\right\}`:tex`S=\left\{\left(${fractionTex(fraction(c,a))},t\right):t\in\mathbb{R}\right\}`;
}
export function generatedLines(seed=1,kind='unique'){
 if(!['unique','infinite','none'].includes(kind))throw new RangeError('Tipo de intersección desconocido.');
 let state=Number(seed)>>>0;const next=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return (state>>>16)%7-3;};
 let a=next(),b=next();if(a===0&&b===0)a=1;
 const x=next(),y=next(),c=a*x+b*y;
 if(kind==='unique'){let d=next(),e=next();if(a*e-b*d===0){d=-b;e=a;}return [[a,b,c],[d,e,d*x+e*y]];}
 const k=[-2,-1,2,3][(state>>>8)%4];return [[a,b,c],[k*a,k*b,k*c+(kind==='none'?1:0)]];
}
/** Recorta ax+by=c al cuadrado visible; evita dividir por cero en verticales. */
export function clipLine([a,b,c],range){
 if(![6,12,24].includes(range)||!Number.isFinite(a+b+c)||(a===0&&b===0))throw new RangeError('Recta y ventana válidas requeridas.');
 const points=[],add=(x,y)=>{if(Math.abs(x)<=range+1e-9&&Math.abs(y)<=range+1e-9&&!points.some(p=>Math.hypot(p[0]-x,p[1]-y)<1e-8))points.push([Math.max(-range,Math.min(range,x)),Math.max(-range,Math.min(range,y))]);};
 if(b!==0)for(const x of [-range,range])add(x,(c-a*x)/b);
 if(a!==0)for(const y of [-range,range])add((c-b*y)/a,y);
 return points;
}
