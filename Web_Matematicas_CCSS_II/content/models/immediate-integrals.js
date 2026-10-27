const tex=String.raw;
/** Generador reproducible. Las funciones numéricas permiten contrastar cada opción derivando. */
export function generateImmediateModels(seed=1){
 let state=Number(seed)>>>0;
 const pick=items=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return items[Math.floor(state/4294967296*items.length)];};
 const k=()=>pick([-4,-3,-2,-1,1,2,3,4]);
 const coefficient=k(),n=pick([-3,-2,2,3,4]),r=k(),e=k(),a=pick([2,3,4,5]),b=k(),s=pick([2,4,6,8]),u=k(),v=k();
 return [
 {kind:'power',f:tex`${coefficient*(n+1)}x^{${n}}`,F:tex`${coefficient}x^{${n+1}}`,value:x=>coefficient*x**(n+1),integrand:x=>coefficient*(n+1)*x**n,rule:tex`Aumenta el exponente en uno y divide entre ${n+1}.`},
 {kind:'reciprocal',f:tex`\frac{${r}}{x}`,F:tex`${r}\ln x`,value:x=>r*Math.log(x),integrand:x=>r/x,rule:tex`Aquí x>0, así que \(\ln|x|=\ln x\). La potencia −1 usa el logaritmo.`},
 {kind:'exponential',f:tex`${e}e^x`,F:tex`${e}e^x`,value:x=>e*Math.exp(x),integrand:x=>e*Math.exp(x),rule:tex`La derivada de \(e^x\) es \(e^x\); conserva el coeficiente.`},
 {kind:'base',f:tex`${b}\cdot ${a}^x`,F:tex`\frac{${b}\cdot ${a}^x}{\ln ${a}}`,value:x=>b*a**x/Math.log(a),integrand:x=>b*a**x,rule:tex`Divide entre \(\ln ${a}\), que aparecerá al derivar.`},
 {kind:'root',f:tex`\frac{${s}}{\sqrt{x}}`,F:tex`${2*s}\sqrt{x}`,value:x=>2*s*Math.sqrt(x),integrand:x=>s/Math.sqrt(x),rule:tex`Reescribe como \(${s}x^{-1/2}\). Al integrar, divide entre 1/2.`},
 {kind:'sum',f:tex`${2*u}x${v>0?'+':''}${v}`,F:tex`${u}x^2${v>0?'+':''}${v}x`,value:x=>u*x*x+v*x,integrand:x=>2*u*x+v,rule:'Integra cada sumando: el término constante se multiplica por x.'}
 ].map(m=>({...m,options:[
 {id:'correct',formula:m.F,value:m.value,feedback:'La derivada coincide con el integrando.'},
 {id:'double',formula:tex`2\left(${m.F}\right)`,value:x=>2*m.value(x),feedback:'Esta propuesta deriva al doble del integrando.'},
 {id:'opposite',formula:tex`-\left(${m.F}\right)`,value:x=>-m.value(x),feedback:'Esta propuesta cambia el signo de todo el integrando.'},
 {id:'extra',formula:tex`\left(${m.F}\right)+x`,value:x=>m.value(x)+x,feedback:'El término x añade 1 a la derivada; no es una constante de integración.'}
 ]}));
}
export function generateImmediateQuestions(seed){
 return generateImmediateModels(seed).map(m=>({id:'immediate-generated-'+m.kind,prompt:tex`En x>0, calcula \(\int\left(${m.f}\right)\,dx\).`,correct:'correct',options:m.options.map(o=>({id:o.id,text:tex`\(${o.formula}+C\)`,feedback:o.feedback})),hint:m.rule,explanation:tex`${m.rule} Comprobación: \(\left(${m.F}+C\right)'=${m.f}\). C es constante.`}));
}
