import {cramerPresets,cramerDetails,generatedCramer} from '../../../content/models/cramer.js';
import {matrixTex} from '../../../content/models/system-notation.js';
import {fractionTex,rationalMatrixTex} from '../../../content/models/matrix-inverse.js';
import {linearTex} from '../../../content/models/linear-systems.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeCramerExplorer(){
 const root=document.querySelector('[data-cramer-explorer]');if(!root)return;
 const el=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
 let system=structuredClone(cramerPresets.integer);
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of items){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Ejemplo','cramerPreset',Object.entries(cramerPresets).map(([k,p])=>[k,p.label]));
 const custom=el('option','Sistema editado');custom.value='custom';custom.disabled=true;preset.append(custom);
 const size=select('Orden de A','cramerSize',[[2,'2'],[3,'3']]);
 const kind=select('Tipo de variante','cramerKind',[['SCD','Aplicable (SCD)'],['SCI','No aplicable (SCI)'],['SI','No aplicable (SI)']]);
 const generate=el('button','Generar variante');generate.type='button';generate.dataset.cramerGenerate='';controls.append(generate);
 const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor del sistema; desplazamiento horizontal');
 const status=el('p');status.dataset.cramerStatus='';status.setAttribute('role','status');
 const output=el('div');output.dataset.cramerOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','Edita enteros entre −9 y 9. A es cuadrada de orden 2 o 3 y B es una columna. Cada matriz auxiliar sustituye una sola columna de la A original por B. Si el determinante de A es cero, se bloquean los cocientes y se comparan los rangos. Las soluciones se conservan como fracciones exactas. No se guardan los cambios.'),grid,status,output);

 function render(){
  const m=cramerDetails(system.a,system.b),names=['x','y','z'],snapshot=JSON.stringify({a:m.a,b:m.b});
  return updateMath(output,()=>{
   output.dataset.snapshot=snapshot;output.dataset.kind=m.ranks.kind;output.dataset.det=m.det;output.dataset.solution=JSON.stringify(m.solution);
   output.dataset.numerators=JSON.stringify(m.replacements.map(r=>r.expansion.value));
   output.replaceChildren(el('h3','1. Comprueba el determinante de A'),
    el('p',tex`\[\begin{cases}${m.a.map((row,i)=>linearTex(row)+'='+m.b[i]).join(tex`\\`)}\end{cases}\]`),
    el('p',tex`\[A=${matrixTex(m.a)},\quad B=${matrixTex(m.b.map(v=>[v]))},\quad \Delta=\det(A)=${m.det}.\]`),
    el('p',m.applicable?'Δ≠0: se puede aplicar Cramer y la solución es única.':'Δ=0: no se puede aplicar Cramer. No se divide entre cero; los determinantes auxiliares se muestran para estudiar los límites del método.'));
   output.append(el('h3','2. Sustituye una columna cada vez'));
   for(const r of m.replacements){
    output.append(el('p','Para '+names[r.col]+', sustituye la columna '+(r.col+1)+' por B. Conserva las demás columnas de la A original.'),
     el('p',tex`\[A_{${names[r.col]}}=${matrixTex(r.matrix)},\qquad \Delta_{${names[r.col]}}=${r.expansion.value}.\]`));
   }
   const detail=el('details');detail.append(el('summary','Ver el cálculo de los determinantes'),el('p','Desarrollo por la primera fila: entrada por cofactor, sumando todos los términos. El cofactor incluye el signo de su posición.'));
   for(const item of [{label:'\\Delta',expansion:m.original},...m.replacements.map(r=>({label:'\\Delta_{'+names[r.col]+'}',expansion:r.expansion}))]){
    detail.append(el('p',tex`\[${item.label}=${item.expansion.terms.map(t=>tex`(${t.entry})(${t.cofactor})`).join('+')}=${item.expansion.value}.\]`));
   }
   output.append(detail);
   if(!m.applicable){
    output.append(el('h3','3. Clasifica por rangos'),el('p',tex`\(\operatorname{rg}(A)=${m.ranks.r},\quad \operatorname{rg}(A|B)=${m.ranks.s}\).`),
     el('p',m.ranks.kind==='SCI'?'Es SCI: tiene infinitas soluciones. Para parametrizarlas utiliza Gauss.':'Es SI: los rangos son distintos y no tiene solución.'),
     el('p',m.replacements.every(r=>r.expansion.value===0)?'Todos los determinantes auxiliares son cero. Eso no decide por sí solo la compatibilidad: aquí la conclusión procede de los rangos.':'Un determinante auxiliar no nulo con Δ=0 demuestra incompatibilidad; aquí también se comprueba comparando rangos.'));
    return;
   }
   output.append(el('h3','3. Divide cada numerador entre Δ'));
   m.solution.forEach((v,j)=>output.append(el('p',tex`\[${names[j]}=\frac{\Delta_{${names[j]}}}{\Delta}=\frac{${m.replacements[j].expansion.value}}{${m.det}}=${fractionTex(v)}.\]`)));
   output.append(el('h3','4. Comprueba en las ecuaciones originales'),el('p',tex`\[X=${rationalMatrixTex(m.solution.map(v=>[v]))},\qquad AX=${rationalMatrixTex(m.product.map(v=>[v]))}=B.\]`));
   m.a.forEach((row,i)=>output.append(el('p',tex`Ecuación ${i+1}: \(${row.map((v,j)=>tex`(${v})\left(${fractionTex(m.solution[j])}\right)`).join('+')}=${fractionTex(m.product[i])}=${m.b[i]}\).`)));
   output.append(el('p','Todas las igualdades se cumplen exactamente. Un numerador cero da una coordenada cero; no impide la solución única cuando Δ≠0.'));
  });
 }
 function build(){
  size.value=system.a.length;status.textContent='';
  const table=el('table'),head=el('thead'),tr=el('tr');
  for(const title of ['Ecuación',...['x','y','z'].slice(0,system.a.length),'B']){const th=el('th',title);th.scope='col';tr.append(th);}head.append(tr);
  const body=el('tbody');system.a.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);
   [...row,system.b[i]].forEach((v,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-9;input.max=9;input.step=1;input.value=v;input.dataset.cramerEntry='';input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label','Ecuación '+(i+1)+', '+(j===row.length?'término independiente':'coeficiente de '+['x','y','z'][j]));td.append(input);tr.append(td);});body.append(tr);
  });
  table.append(el('caption','Coeficientes de A y última columna B'),head,body);grid.replaceChildren(table);render();
 }
 grid.addEventListener('change',e=>{
  const field=e.target;if(!field.matches('[data-cramer-entry]'))return;const value=field.valueAsNumber;
  if(!Number.isInteger(value)||Math.abs(value)>9){field.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −9 y 9. Se conserva el último valor válido.';return;}
  field.removeAttribute('aria-invalid');const i=Number(field.dataset.row),j=Number(field.dataset.col);
  if(j===system.a.length)system.b[i]=value;else system.a[i][j]=value;
  preset.value='custom';status.textContent=grid.querySelector('[aria-invalid]')?'Quedan entradas inválidas; se conservan sus últimos valores válidos.':'Sistema actualizado.';render();
 });
 preset.addEventListener('change',()=>{if(preset.value==='custom')return;system=structuredClone(cramerPresets[preset.value]);build();});
 size.addEventListener('change',()=>{const n=Number(size.value),old=system;system={a:Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>old.a[i]?.[j]??0)),b:Array.from({length:n},(_,i)=>old.b[i]??0)};preset.value='custom';build();});
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;system=generatedCramer(seed,Number(size.value),kind.value);preset.value='custom';build();});
 build();
}
