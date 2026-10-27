import {rouchePresets,roucheDetails,parameterRows,generatedRoucheRows} from '../../../content/models/rouche-frobenius.js';
import {matrixTex} from '../../../content/models/system-notation.js';
import {linearTex} from '../../../content/models/linear-systems.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeRoucheExplorer(){
 const root=document.querySelector('[data-rouche-explorer]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 let rows=structuredClone(rouchePresets.unique.rows);
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of items){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Ejemplo','rouchePreset',[...Object.entries(rouchePresets).map(([key,p])=>[key,p.label]),['parameter','Familia con parámetro']]);
 const custom=el('option','Sistema editado');custom.value='custom';custom.disabled=true;preset.append(custom);
 const count=select('Ecuaciones','roucheRows',[[2,'2'],[3,'3']]),unknowns=select('Incógnitas','roucheCols',[[2,'2'],[3,'3']]);
 const parameter=select('Valor del parámetro','roucheParameter',[-3,-2,-1,0,1,2,3].map(v=>[v,String(v)]));parameter.value='1';
 const variant=select('Tipo de variante 2×2','roucheVariant',[['SCD','SCD'],['SCI','SCI'],['SI','SI']]);
 const generate=el('button','Generar variante');generate.type='button';generate.dataset.roucheGenerate='';controls.append(generate);
 const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Matriz ampliada editable; desplazamiento horizontal');
 const status=el('p');status.dataset.roucheStatus='';status.setAttribute('role','status');
 const output=el('div');output.dataset.roucheOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','Edita enteros entre −9 y 9. Las filas son ecuaciones y las primeras columnas corresponden a x, y, z; la última es B. El parámetro solo se activa en su familia y ofrece siete muestras enteras. Generar una variante crea un sistema 2×2 del tipo elegido. No se guardan los cambios.'),grid,status,output);
 function proof(label,detail){
  const section=el('section');section.append(el('h3','Justificación del rango de '+label));
  if(detail.rank===0)section.append(el('p','Todas las entradas son cero, por lo que el rango es 0.'));
  else{
   const w=detail.witness;
   section.append(el('p','Menor no nulo: filas '+w.rows.join(', ')+', columnas '+w.cols.join(', ')+'.'),el('p',tex`\[\det ${matrixTex(w.matrix)}=${w.value}\ne0.\]`));
   if(detail.rank===detail.limit)section.append(el('p','No caben menores de orden superior por las dimensiones de esta matriz.'));
   else for(const level of detail.levels.filter(l=>l.order>detail.rank))section.append(el('p','Se han comprobado los '+level.minors.length+' menores de orden '+level.order+': todos son cero.'));
  }
  return section;
 }
 function render(){
  const m=roucheDetails(rows),snapshot=JSON.stringify(rows),isParameter=preset.value==='parameter',value=parameter.value;
  return updateMath(output,()=>{
   output.dataset.snapshot=snapshot;output.dataset.kind=m.kind;output.dataset.r=m.r;output.dataset.s=m.s;output.dataset.free=m.free===null?'none':m.free;
   output.replaceChildren(el('h3','Compara las dos matrices'),el('p',tex`\[\begin{cases}${rowsFrom(m).join(tex`\\`)}\end{cases}\]`),
    el('p',tex`\[A=${matrixTex(m.a)},\qquad (A|B)=${matrixTex(m.augmented,true)}.\]`),
    el('p',tex`Hay \(m=${m.m}\) ecuaciones y \(n=${m.n}\) incógnitas. \(\operatorname{rg}(A)=${m.r}\), \(\operatorname{rg}(A|B)=${m.s}\).`),
    el('h3','Clasificación: '+m.kind),
    el('p',m.kind==='SI'?'Los rangos son distintos: el sistema es incompatible. No procede contar parámetros libres.':m.kind==='SCD'?'Los rangos coinciden y son iguales al número de incógnitas: hay una única solución.':'Los rangos coinciden y son menores que el número de incógnitas: hay infinitas soluciones, con '+m.free+' parámetro(s) libre(s).'),
    proof('A',m.coefficients),proof('(A|B)',m.complete));
   if(isParameter)output.append(el('p','Muestra del parámetro: '+value+'. Para toda la familia real, el determinante es λ²−1: SCD si λ no es 1 ni −1; SCI si λ=1 y SI si λ=−1. La demostración está en el ejemplo 6.'));
   output.append(el('p','El rango de la ampliada nunca es menor que el de A y solo puede aumentarlo en uno. Clasificar no sustituye a describir todas las soluciones.'));
  });
 }
 const rowsFrom=m=>m.augmented.map(row=>linearTex(row.slice(0,-1))+'='+row.at(-1));
 function build(){
  count.value=rows.length;unknowns.value=rows[0].length-1;parameter.disabled=preset.value!=='parameter';
  const table=el('table'),head=el('thead'),tr=el('tr');
  for(const title of ['Ecuación',...['x','y','z'].slice(0,rows[0].length-1),'B']){const th=el('th',title);th.scope='col';tr.append(th);}head.append(tr);
  const body=el('tbody');rows.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);
   row.forEach((v,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-9;input.max=9;input.step=1;input.value=v;input.dataset.roucheEntry='';input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label','Ecuación '+(i+1)+', '+(j===row.length-1?'término independiente':'coeficiente de '+['x','y','z'][j]));td.append(input);tr.append(td);});
   body.append(tr);});
  table.append(el('caption','Coeficientes y términos independientes en la misma fila'),head,body);grid.replaceChildren(table);status.textContent='';render();
 }
 grid.addEventListener('change',e=>{
  const field=e.target;if(!field.matches('[data-rouche-entry]'))return;const v=field.valueAsNumber;
  if(!Number.isInteger(v)||Math.abs(v)>9){field.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −9 y 9. Se conserva el último valor válido.';return;}
  field.removeAttribute('aria-invalid');rows[Number(field.dataset.row)][Number(field.dataset.col)]=v;preset.value='custom';parameter.disabled=true;
  status.textContent=grid.querySelector('[aria-invalid]')?'Quedan entradas inválidas; se usan sus últimos valores válidos.':'Sistema actualizado.';render();
 });
 preset.addEventListener('change',()=>{if(preset.value==='custom')return;rows=preset.value==='parameter'?parameterRows(Number(parameter.value)):structuredClone(rouchePresets[preset.value].rows);build();});
 parameter.addEventListener('change',()=>{rows=parameterRows(Number(parameter.value));build();});
 for(const s of [count,unknowns])s.addEventListener('change',()=>{
  const m=Number(count.value),n=Number(unknowns.value),old=rows;rows=Array.from({length:m},(_,i)=>[...Array.from({length:n},(_,j)=>j<old[0].length-1?(old[i]?.[j]??0):0),old[i]?.at(-1)??0]);preset.value='custom';build();
 });
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;rows=generatedRoucheRows(seed,variant.value);preset.value='custom';build();});
 build();
}
