import {rationalTex} from './barrow.js';
const tex=String.raw;
export const areaFamilies={
 cap:{f:x=>1-x*x,g:x=>0,primitive:x=>x-x**3/3,roots:[-1,1],fTex:'1-x^2',gTex:'0'},
 crossing:{f:x=>x*x,g:x=>x,primitive:x=>x**3/3-x*x/2,roots:[0,1],fTex:'x^2',gTex:'x'},
 below:{f:x=>x*x-2,g:x=>-1,primitive:x=>x**3/3-x,roots:[-1,1],fTex:'x^2-2',gTex:'-1'},
 parallel:{f:x=>x+1,g:x=>x-1,primitive:x=>2*x,roots:[],fTex:'x+1',gTex:'x-1'}
};
const clean=n=>Math.abs(n)<1e-12?0:n;
export const areaTex=n=>rationalTex(Math.round(n*6),6);
/** Polinomios de grado ≤2 con cortes enteros: valores exactos racionales en sextos. */
export function areaModel(kind,a,b,k=1,swap=false){
 if(!Object.hasOwn(areaFamilies,kind)||![a,b].every(x=>[-2,-1,0,1,2].includes(x))||![1,2,3].includes(k)||typeof swap!=='boolean')throw new RangeError('Configuración de áreas no válida');
 const base=areaFamilies[kind],sign=swap?-1:1,low=Math.min(a,b),high=Math.max(a,b);
 const f=x=>k*(swap?base.g(x):base.f(x)),g=x=>k*(swap?base.f(x):base.g(x)),primitive=x=>sign*k*base.primitive(x);
 const cuts=[low,...base.roots.filter(x=>x>low&&x<high),high],segments=[];
 if(low!==high)for(let i=0;i<cuts.length-1;i++){
  const left=cuts[i],right=cuts[i+1],contribution=clean(primitive(right)-primitive(left)),top=f((left+right)/2)>g((left+right)/2)?'f':'g';
  segments.push({left,right,top,contribution,area:Math.abs(contribution)});
 }
 const area=clean(segments.reduce((s,t)=>s+t.area,0)),integral=clean(primitive(b)-primitive(a));
 const scaled=expression=>k===1?expression:tex`${k}\left(${expression}\right)`;
 return {kind,a,b,k,swap,low,high,f,g,fTex:scaled(swap?base.gTex:base.fTex),gTex:scaled(swap?base.fTex:base.gTex),roots:base.roots.filter(x=>x>=low&&x<=high),segments,area,integral};
}
export function generateAreaQuestions(seed=1){
 let state=Number(seed)>>>0;
 const pick=items=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return items[Math.floor(state/4294967296*items.length)];};
 const requests=[['cap',-1,1],['cap',-2,2],['crossing',-1,2],['below',-1,1],['parallel',-2,1],['crossing',2,-1]];
 return requests.map(([kind,a,b],index)=>{
  const m=areaModel(kind,a,b,pick([1,2,3]),pick([false,true]));
  const wrong=[{value:Math.abs(m.integral),feedback:'El valor absoluto de la integral total puede cancelar regiones. Suma las áreas de todos los tramos.'},{value:-m.area,feedback:'El área geométrica no es negativa; no depende de la orientación ni del nombre de las curvas.'},{value:m.area/2,feedback:'Cada región se integra una vez; no se divide el resultado por dos.'},...[1,2,3].map(n=>({value:m.area+n,feedback:'Revisa los puntos de corte y las evaluaciones de cada tramo.'}))];
  const options=[{id:'correct',value:m.area,text:tex`\(${areaTex(m.area)}\)`,feedback:'Has sumado las distancias verticales entre las curvas.'}];
  for(const o of wrong){if(options.every(v=>Math.abs(v.value-o.value)>1e-8))options.push({...o,id:'wrong-'+options.length,text:tex`\(${areaTex(o.value)}\)`});if(options.length===4)break;}
  // Los distractores /2 pueden ser doceavos; representarlos sin redondear a sextos.
  for(const o of options)o.text=tex`\(${rationalTex(Math.round(o.value*12),12)}\)`;
  const pieces=m.segments.map(t=>tex`En [${t.left}, ${t.right}], ${t.top} está arriba: área \(${areaTex(t.area)}\).`).join(' ');
  return {id:'area-generated-'+index,model:m,prompt:tex`Halla el área geométrica entre \(f(x)=${m.fTex}\) y \(g(x)=${m.gTex}\), limitada por las rectas x=${a} y x=${b}.`,correct:'correct',options,hint:'Ordena los límites, resuelve f=g y usa superior menos inferior en cada tramo.',explanation:tex`${pieces} Área total: \(${areaTex(m.area)}\) unidades cuadradas. La integral orientada de f−g sería \(${areaTex(m.integral)}\); no es la definición de área.`};
 });
}
