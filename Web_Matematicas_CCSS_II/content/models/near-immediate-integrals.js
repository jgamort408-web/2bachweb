const tex=String.raw;
const gcd=(a,b)=>b?gcd(b,a%b):a;
export function fraction(n,d=1){
 if(!Number.isInteger(n)||!Number.isInteger(d)||d===0)throw new RangeError('Fracción no válida');
 if(d<0){n=-n;d=-d;}const g=gcd(Math.abs(n),d);n/=g;d/=g;
 return d===1?String(n):tex`${n<0?'-':''}\frac{${Math.abs(n)}}{${d}}`;
}
const plus=n=>n<0?String(n):'+'+n;
/** Se conservan integrando, primitiva y función interior numéricos para verificación independiente. */
export function generateNearImmediateModels(seed=1){
 let state=Number(seed)>>>0;
 const pick=items=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return items[Math.floor(state/4294967296*items.length)];};
 const a=pick([-4,-3,-2,2,3,4]),b=pick([-3,-1,1,3]),c=pick([-7,-5,5,7]),d=pick([1,2,3,4,5]),n=pick([2,3,4]),p=pick([-3,-2,2,3,4]),base=pick([2,3]);
 const linear=tex`${a}x${plus(b)}`,quadratic=tex`x^2+${d}`;
 const lin=x=>a*x+b,quad=x=>x*x+d;
 const models=[
 {kind:'linear-power',u:linear,up:String(a),inner:lin,innerDerivative:()=>a,outer:t=>t**n,f:tex`${c}(${linear})^{${n}}`,B:tex`\frac{(${linear})^{${n+1}}}{${n+1}}`,baseValue:x=>lin(x)**(n+1)/(n+1),integrand:x=>c*lin(x)**n,numerator:c,denominator:a,domain:'En ℝ',points:[-.7,.2,.8,1.4]},
 {kind:'quadratic-power',u:quadratic,up:'2x',inner:quad,innerDerivative:x=>2*x,outer:t=>t**p,f:tex`${c}x(${quadratic})^{${p}}`,B:tex`\frac{(${quadratic})^{${p+1}}}{${p+1}}`,baseValue:x=>quad(x)**(p+1)/(p+1),integrand:x=>c*x*quad(x)**p,numerator:c,denominator:2,domain:'En ℝ',points:[-1.1,-.3,0,.6,1.4]},
 {kind:'quadratic-log',u:quadratic,up:'2x',inner:quad,innerDerivative:x=>2*x,outer:t=>1/t,f:tex`\frac{${c}x}{${quadratic}}`,B:tex`\ln(${quadratic})`,baseValue:x=>Math.log(quad(x)),integrand:x=>c*x/quad(x),numerator:c,denominator:2,domain:'En ℝ: el denominador es siempre positivo',points:[-1.1,-.3,0,.6,1.4]},
 {kind:'linear-log',u:linear,up:String(a),inner:lin,innerDerivative:()=>a,outer:t=>1/t,f:tex`\frac{${c}}{${linear}}`,B:tex`\ln|${linear}|`,baseValue:x=>Math.log(Math.abs(lin(x))),integrand:x=>c/lin(x),numerator:c,denominator:a,domain:tex`En cada intervalo que no contenga \(x=${fraction(-b,a)}\)`,excluded:-b/a,points:[-b/a-1.2,-b/a-.4,-b/a+.4,-b/a+1.2]},
 {kind:'linear-exp',u:linear,up:String(a),inner:lin,innerDerivative:()=>a,outer:Math.exp,f:tex`${c}e^{${linear}}`,B:tex`e^{${linear}}`,baseValue:x=>Math.exp(lin(x)),integrand:x=>c*Math.exp(lin(x)),numerator:c,denominator:a,domain:'En ℝ',points:[-.7,-.2,.3,.8]},
 {kind:'quadratic-base',u:quadratic,up:'2x',inner:quad,innerDerivative:x=>2*x,outer:t=>base**t,f:tex`${c}x\cdot ${base}^{${quadratic}}`,B:tex`\frac{${base}^{${quadratic}}}{\ln ${base}}`,baseValue:x=>base**quad(x)/Math.log(base),integrand:x=>c*x*base**quad(x),numerator:c,denominator:2,domain:'En ℝ',points:[-.9,-.2,0,.3,.8]}
 ];
 return models.map(m=>{
  const factor=m.numerator/m.denominator,factorTex=fraction(m.numerator,m.denominator);
  const F=tex`${factorTex}\left(${m.B}\right)`,value=x=>factor*m.baseValue(x);
  return {...m,factor,factorTex,F,value,options:[
   {id:'correct',formula:F,value,feedback:'El factor constante compensa exactamente la derivada interior.'},
   {id:'missing',formula:m.B,value:m.baseValue,feedback:tex`Falta el ajuste \(${factorTex}\). La derivada interior no coincide con el factor del enunciado.`},
   {id:'opposite',formula:tex`-\left(${F}\right)`,value:x=>-value(x),feedback:'El signo de toda la derivada quedaría cambiado.'},
   {id:'variable',formula:tex`\left(${F}\right)+x`,value:x=>value(x)+x,feedback:'Añadir x añade 1 a la derivada. La constante C no puede reemplazarse por x.'}
  ]};
 });
}
export function generateNearImmediateQuestions(seed){
 return generateNearImmediateModels(seed).map(m=>({id:'near-generated-'+m.kind,prompt:tex`${m.domain}, calcula \(\int ${m.f}\,dx\).`,steps:[tex`Función interior: \(u(x)=${m.u}\).`,tex`Derivada interior: \(u'(x)=${m.up}\).`],correct:'correct',options:m.options.map(o=>({id:o.id,text:tex`\(${o.formula}+C\)`,feedback:o.feedback})),hint:tex`El ajuste es \(\lambda=${m.factorTex}\). Multiplica la primitiva del patrón por esta constante.`,explanation:tex`Por la regla de la cadena, \(\left(${m.F}+C\right)'=${m.f}\). El factor \(${m.factorTex}\) ajusta u′; la constante C deriva a cero.`}));
}
