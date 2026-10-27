const tex=String.raw;
export function rationalTex(n,d=1){
 if(!Number.isInteger(n)||!Number.isInteger(d)||d===0)throw new RangeError('Fracción no válida');
 if(d<0){n=-n;d=-d;}let a=Math.abs(n),b=d;while(b){[a,b]=[b,a%b];}n/=a;d/=a;
 return d===1?String(n):tex`${n<0?'-':''}\frac{${Math.abs(n)}}{${d}}`;
}
export const barrowFamilies={
 linear:{label:'2x+1',f:tex`2x+1`,F:tex`x^2+x`,value:x=>2*x+1,primitive:x=>x*x+x,at:x=>String(x*x+x)},
 quadratic:{label:'x²−1',f:tex`x^2-1`,F:tex`\frac{x^3}{3}-x`,value:x=>x*x-1,primitive:x=>x**3/3-x,at:x=>rationalTex(x**3-3*x,3)},
 reciprocal:{label:'1/x',f:tex`\frac1x`,F:tex`\ln|x|`,value:x=>1/x,primitive:x=>Math.log(Math.abs(x)),at:x=>Math.abs(x)===1?'0':tex`\ln ${Math.abs(x)}`}
};
/** El laboratorio solo admite los extremos y las constantes de sus controles. */
export function barrowModel(kind,a,b,c=0){
 if(!Object.hasOwn(barrowFamilies,kind)||![a,b].every(x=>[-2,-1,0,1,2].includes(x))||![-3,0,3].includes(c))throw new RangeError('Configuración no válida');
 const family=barrowFamilies[kind];
 if(kind==='reciprocal'&&(a===0||b===0||Math.sign(a)!==Math.sign(b)))return {valid:false,reason:'El intervalo toca o atraviesa x=0, donde 1/x no está definida. No apliques Barrow ni compenses los dos lados. El estudio de integrales impropias requiere límites separados.'};
 const fa=family.primitive(a)+c,fb=family.primitive(b)+c;
 return {valid:true,family,a,b,c,fa,fb,value:family.primitive(b)-family.primitive(a),atA:family.at(a),atB:family.at(b)};
}
/** Seis familias; cada tramo usado está libre de singularidades. */
export function generateBarrowModels(seed=1){
 let state=Number(seed)>>>0;
 const pick=items=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return items[Math.floor(state/4294967296*items.length)];};
 const k=pick([2,3,4,5]),a=pick([1,2,3]),b=a+pick([1,2,3]),p=pick([2,3,4]),r=pick([2,3,4]),s=pick([1,2,3]);
 return [
  {kind:'power',a,b,f:tex`${k}x^${p-1}`,F:tex`\frac{${k}}{${p}}x^${p}`,integrand:x=>k*x**(p-1),primitive:x=>k/p*x**p,at:x=>rationalTex(k*x**p,p)},
  {kind:'reversed',a:-a,b:-b,f:tex`${k}x`,F:tex`\frac{${k}}2x^2`,integrand:x=>k*x,primitive:x=>k*x*x/2,at:x=>rationalTex(k*x*x,2)},
  {kind:'log',a,b,f:tex`\frac{${k}}{x+${s}}`,F:tex`${k}\ln|x+${s}|`,integrand:x=>k/(x+s),primitive:x=>k*Math.log(x+s),at:x=>tex`${k}\ln ${x+s}`},
  {kind:'exp',a:0,b:s,f:tex`${k}e^x`,F:tex`${k}e^x`,integrand:x=>k*Math.exp(x),primitive:x=>k*Math.exp(x),at:x=>x===0?String(k):tex`${k}e^{${x}}`},
  {kind:'piecewise',a:-a,b:s,cut:0,f:tex`\begin{cases}-${k},&x<0\\${r},&x\ge0\end{cases}`,integrand:x=>x<0?-k:r,primitive:x=>x<0?-k*x:r*x,at:x=>String(x<0?-k*x:r*x),
   reason:tex`Separa en cero: \(\int_{-${a}}^0(-${k})dx+\int_0^{${s}}${r}dx=${-k*a}+${r*s}\). No se está afirmando que exista una primitiva derivable en el salto.`},
  {kind:'crossing',a:-a,b:a,f:tex`${k}x+${r}`,F:tex`\frac{${k}}2x^2+${r}x`,integrand:x=>k*x+r,primitive:x=>k*x*x/2+r*x,at:x=>rationalTex(k*x*x+2*r*x,2),
   reason:'Se pide la integral con signo. Una primitiva válida en todo el intervalo permite evaluarla directamente, aunque el integrando cambie de signo.'}
 ].map(m=>{
  const fa=m.primitive(m.a),fb=m.primitive(m.b),value=fb-fa,exact=tex`\left(${m.at(m.b)}\right)-\left(${m.at(m.a)}\right)`;
  const candidates=[
   {value:fa-fb,text:tex`\left(${m.at(m.a)}\right)-\left(${m.at(m.b)}\right)`,feedback:'Has invertido el orden: extremo superior menos inferior.'},
   {value:fb,text:m.at(m.b),feedback:'Falta restar la evaluación inferior; en los tramos, falta su aportación.'},
   {value:fb+fa,text:tex`\left(${m.at(m.b)}\right)+\left(${m.at(m.a)}\right)`,feedback:'Se ha perdido un signo al combinar las evaluaciones.'},
   ...[1,2,3].map(offset=>({value:value+offset,text:tex`${exact}+${offset}`,feedback:'No se añade una constante al valor de la integral definida.'}))
  ];
  const options=[{id:'correct',value,text:exact,feedback:'Orden y sustitución correctos.'}];
  for(const option of candidates){if(options.every(o=>Math.abs(o.value-option.value)>1e-8))options.push({...option,id:'wrong-'+options.length});if(options.length===4)break;}
  return {...m,fa,fb,value,exact,options};
 });
}
export function generateBarrowQuestions(seed){
 return generateBarrowModels(seed).map(m=>({
  id:'barrow-generated-'+m.kind,prompt:tex`Calcula exactamente \(\int_{${m.a}}^{${m.b}}${m.f}\,dx\). Elige una expresión igual a su valor.`,
  correct:'correct',options:m.options.map(o=>({id:o.id,text:tex`\(${o.text}\)`,feedback:o.feedback})),
  hint:m.kind==='piecewise'?'Separa en cero y suma las dos integrales con su signo.':'Halla una primitiva, evalúa ambos extremos y resta en el orden escrito.',
  explanation:tex`${m.kind==='piecewise'?m.reason:tex`Una primitiva es \(F(x)=${m.F}\). ${m.reason||''}`} El resultado exacto es \(${m.exact}\). Los paréntesis conservan todos los signos.`
 }));
}
