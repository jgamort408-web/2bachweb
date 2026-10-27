import {gaussPresets,gaussDetails,generatedGauss,affineTex} from '../../../content/models/gauss.js';
import {fraction} from '../../../content/models/matrix-inverse.js';
import {augmentedTex,equivalentSystemTex,operationTex} from '../../../content/models/equivalent-systems.js';
import {updateMath} from '../core/math.js';
const tex=String.raw,names=['x','y','z'];
export function initializeGaussExplorer(){
 const root=document.querySelector('[data-gauss-explorer]');if(!root)return;
 const el=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
 let rows=structuredClone(gaussPresets.unique.rows),model,index=0;
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of items){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Ejemplo','gaussPreset',Object.entries(gaussPresets).map(([k,p])=>[k,p.label]));
 const custom=el('option','Sistema editado');custom.value='custom';custom.disabled=true;preset.append(custom);
 const count=select('Ecuaciones','gaussRows',[[2,'2'],[3,'3']]),unknowns=select('Incógnitas','gaussCols',[[2,'2'],[3,'3']]);
 function button(text,key,parent){const b=el('button',text);b.type='button';b.dataset[key]='';parent.append(b);return b;}
 const generate=button('Generar variante','gaussGenerate',controls);
 const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor de matriz ampliada; desplazamiento horizontal');
 const status=el('p');status.dataset.gaussStatus='';status.setAttribute('role','status');
 const navigation=el('div');navigation.className='actions';
 const first=button('Volver al inicio','gaussFirst',navigation),previous=button('Paso anterior','gaussPrevious',navigation),next=button('Paso siguiente','gaussNext',navigation),last=button('Ver resolución completa','gaussLast',navigation);
 const progress=el('p');progress.dataset.gaussProgress='';progress.setAttribute('role','status');
 const output=el('div');output.dataset.gaussOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','Edita enteros entre −9 y 9. Recorre las operaciones sin prisa: se actúa siempre sobre la fila completa, incluido el término independiente. El cálculo conserva fracciones exactas. Al editar se vuelve al inicio; no se guardan respuestas ni cambios.'),grid,status,navigation,progress,output);
 function render(){
  const current=index?model.echelon.steps[index-1].matrix:rows.map(r=>r.map(v=>fraction(v)));
  first.disabled=previous.disabled=index===0;next.disabled=last.disabled=index===model.echelon.steps.length;
  progress.textContent='Paso '+index+' de '+model.echelon.steps.length+(index===0?' · Matriz inicial':' · Operaciones elementales');
  return updateMath(output,()=>{
   output.dataset.snapshot=JSON.stringify(rows);output.dataset.step=index;output.dataset.kind=model.kind;
   output.replaceChildren(el('h3',index?'Operación '+index:'Matriz ampliada inicial'));
   if(index){
    const step=model.echelon.steps[index-1],op={kind:step.type,target:step.target-1,source:step.source-1,scalar:step.factor};
    output.append(el('p',tex`\[${operationTex(op)}\]`),el('p',step.type==='swap'?'Intercambiamos filas para colocar un pivote no nulo.':step.type==='scale'?'Dividimos la fila por su pivote no nulo para dejarlo en uno.':'Sumamos un múltiplo de la fila del pivote para anular la entrada inferior.'));
   }
   output.append(el('p',tex`\[${augmentedTex(current)}\]`),el('p',tex`\[${equivalentSystemTex(current)}\]`));
   if(index<model.echelon.steps.length){output.append(el('p','Anticipa la siguiente operación antes de avanzar. Las matrices intermedias representan sistemas equivalentes.'));return;}
   const history=el('details');history.append(el('summary','Ver todas las operaciones'));
   if(!model.echelon.steps.length)history.append(el('p','La matriz ya está escalonada y sus pivotes están normalizados.'));
   model.echelon.steps.forEach((s,i)=>history.append(el('p',tex`Paso ${i+1}: \[${operationTex({kind:s.type,target:s.target-1,source:s.source-1,scalar:s.factor})}\qquad ${augmentedTex(s.matrix)}\]`)));
   output.append(history,el('h3','Clasifica el sistema'),el('p',tex`\(\operatorname{rg}(A)=${model.r},\quad\operatorname{rg}(A|B)=${model.s},\quad n=${model.n}\). Sistema ${model.kind}.`));
   if(model.kind==='SI'){
    output.append(el('p','Aparece una fila con todos los coeficientes nulos y término independiente no nulo: una igualdad imposible (al normalizar, 0=1). No hay solución. Un pivote en la columna B señala la contradicción; no corresponde a una incógnita.'));return;
   }
   output.append(el('h3','Sustituye desde la última ecuación'));
   if(model.free.length)output.append(el('p',tex`Variables libres: \(${model.free.map((j,k)=>names[j]+'=t_{'+(k+1)+'}').join(',\\quad ')}\), con ${model.free.length===1?'un parámetro real':'parámetros reales independientes'}.`));
   else output.append(el('p','Cada incógnita tiene pivote: la solución es única.'));
   model.backSteps.forEach(step=>{
    const row=model.echelon.matrix[step.row],j=step.variable;
    output.append(el('p',tex`Fila ${step.row+1}: \(${names[j]}=${affineTex([row[model.n]])}${row.slice(j+1,model.n).map((v,k)=>v.numerator?tex`-\left(${affineTex([v])}\right)\left(${affineTex(model.expressions[j+1+k])}\right)`:'').join('')}=${affineTex(step.expression)}\).`));
   });
   output.append(el('h3','Conjunto solución'),el('p',tex`\[${names.slice(0,model.n).map((v,j)=>v+'='+affineTex(model.expressions[j])).join(',\\qquad ')}.\]`),el('h3','Comprueba en las ecuaciones originales'));
   rows.forEach((row,i)=>output.append(el('p',tex`Ecuación ${i+1}: \(${row.slice(0,-1).map((v,j)=>tex`(${v})\left(${affineTex(model.expressions[j])}\right)`).join('+')}=${affineTex(model.checks[i])}=${row.at(-1)}\).`)));
   output.append(el('p',model.kind==='SCI'?'Las igualdades se cumplen para todos los valores reales de los parámetros: esta familia describe todas las soluciones.':'Todas las ecuaciones se cumplen exactamente.'));
  });
 }
 function reset(){model=gaussDetails(rows);index=0;render();}
 function build(){
  count.value=rows.length;unknowns.value=rows[0].length-1;status.textContent='';
  const table=el('table'),head=el('thead'),tr=el('tr');
  for(const label of ['Ecuación',...names.slice(0,rows[0].length-1),'B']){const th=el('th',label);th.scope='col';tr.append(th);}head.append(tr);
  const body=el('tbody');
  rows.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);
   row.forEach((v,j)=>{const td=el('td'),field=el('input');field.type='number';field.min=-9;field.max=9;field.step=1;field.value=v;field.dataset.gaussEntry='';field.dataset.row=i;field.dataset.col=j;field.setAttribute('aria-label','Ecuación '+(i+1)+', '+(j===row.length-1?'término independiente':'coeficiente de '+names[j]));td.append(field);tr.append(td);});body.append(tr);
  });
  table.append(el('caption','Coeficientes y última columna B'),head,body);grid.replaceChildren(table);reset();
 }
 grid.addEventListener('change',e=>{
  const f=e.target;if(!f.matches('[data-gauss-entry]'))return;
  const v=f.valueAsNumber;if(!Number.isInteger(v)||Math.abs(v)>9){f.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −9 y 9. Se conserva el último valor válido.';return;}
  f.removeAttribute('aria-invalid');rows[Number(f.dataset.row)][Number(f.dataset.col)]=v;preset.value='custom';
  status.textContent=grid.querySelector('[aria-invalid]')?'Quedan entradas inválidas; se conservan sus últimos valores válidos.':'Sistema actualizado. Recorre de nuevo sus pasos.';reset();
 });
 preset.addEventListener('change',()=>{if(preset.value==='custom')return;rows=structuredClone(gaussPresets[preset.value].rows);build();});
 function resize(){const m=Number(count.value),n=Number(unknowns.value),old=rows;rows=Array.from({length:m},(_,i)=>[...Array.from({length:n},(_,j)=>j<old[0].length-1?(old[i]?.[j]??0):0),old[i]?.at(-1)??0]);preset.value='custom';build();}
 count.addEventListener('change',resize);unknowns.addEventListener('change',resize);
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;rows=generatedGauss(seed,Number(count.value),Number(unknowns.value));preset.value='custom';build();});
 first.addEventListener('click',()=>{index=0;render();});previous.addEventListener('click',()=>{index=Math.max(0,index-1);render();});next.addEventListener('click',()=>{index=Math.min(model.echelon.steps.length,index+1);render();});last.addEventListener('click',()=>{index=model.echelon.steps.length;render();});
 build();
}
