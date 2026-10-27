import {homogeneousPresets,homogeneousDetails,generatedHomogeneous} from '../../../content/models/homogeneous-systems.js';
import {affineTex} from '../../../content/models/gauss.js';
import {fraction,fractionTex,rationalMatrixTex} from '../../../content/models/matrix-inverse.js';
import {augmentedTex,equivalentSystemTex,operationTex} from '../../../content/models/equivalent-systems.js';
import {updateMath} from '../core/math.js';
const tex=String.raw,names=['x','y','z'];
export function initializeHomogeneousExplorer(){
 const root=document.querySelector('[data-homogeneous-explorer]');if(!root)return;
 const el=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
 let a=structuredClone(homogeneousPresets.unique.a),model,parameters=[];
 const controls=el('div');controls.className='actions';
 function select(label,key,options){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of options){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Ejemplo','homogeneousPreset',Object.entries(homogeneousPresets).map(([k,p])=>[k,p.label]));
 const custom=el('option','Sistema editado');custom.value='custom';custom.disabled=true;preset.append(custom);
 const count=select('Ecuaciones','homogeneousRows',[[2,'2'],[3,'3']]),unknowns=select('Incógnitas','homogeneousCols',[[2,'2'],[3,'3']]);
 function button(text,key,parent){const b=el('button',text);b.type='button';b.dataset[key]='';parent.append(b);return b;}
 const generate=button('Generar variante','homogeneousGenerate',controls);
 const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor de coeficientes; desplazamiento horizontal');
 const status=el('p');status.dataset.homogeneousStatus='';status.setAttribute('role','status');
 const output=el('div');output.dataset.homogeneousOutput='';output.setAttribute('aria-live','polite');
 const samples=el('fieldset');samples.append(el('legend','Elige una solución de la familia'));
 const paramFields=el('div');paramFields.className='actions';
 const actions=el('div');actions.className='actions';
 const zero=button('Elegir la solución trivial','homogeneousZero',actions),nonzero=button('Elegir una solución no trivial','homogeneousNonzero',actions);
 const paramStatus=el('p');paramStatus.dataset.homogeneousParamStatus='';paramStatus.setAttribute('role','status');
 samples.append(el('p','La familia admite parámetros reales. Estos controles prueban valores enteros entre −5 y 5; no limitan el conjunto solución.'),paramFields,actions,paramStatus);
 const sample=el('div');sample.dataset.homogeneousSample='';sample.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','Edita coeficientes enteros entre −9 y 9. Todos los términos independientes permanecen en cero: el sistema siempre es homogéneo. Al cambiar la matriz se elige de nuevo la solución trivial. No se guardan cambios ni respuestas.'),grid,status,output,samples,sample);
 function renderSample(){
  const m=homogeneousDetails(a,parameters);
  return updateMath(sample,()=>{
   sample.dataset.parameters=JSON.stringify(m.parameters);sample.dataset.solution=JSON.stringify(m.solution);sample.dataset.trivial=String(m.trivial);
   sample.replaceChildren(el('h3',m.trivial?'Solución elegida: trivial':'Solución elegida: no trivial'),
    el('p',tex`\[X=${rationalMatrixTex(m.solution.map(v=>[v]))}.\]`));
   m.a.forEach((row,i)=>sample.append(el('p',tex`Ecuación ${i+1}: \(${row.map((v,j)=>tex`(${v})\left(${fractionTex(m.solution[j])}\right)`).join('+')}=${fractionTex(m.product[i])}\).`)));
   sample.append(el('p',m.trivial?'Todas las coordenadas son cero y todas las ecuaciones se cumplen.': 'Hay al menos una coordenada distinta de cero y todas las ecuaciones se cumplen exactamente.'));
  });
 }
 function buildParameters(){
  paramFields.replaceChildren();paramStatus.textContent='';nonzero.disabled=model.gauss.free.length===0;
  parameters.forEach((v,j)=>{const wrap=el('label','t'+(j+1)+' ('+names[model.gauss.free[j]]+') '),field=el('input');field.type='number';field.min=-5;field.max=5;field.step=1;field.value=v;field.dataset.homogeneousParameter=j;wrap.append(field);paramFields.append(wrap);});
  if(!parameters.length)paramFields.append(el('p','No hay variables libres: solo se puede elegir X=0.'));
 }
 function analyze(){
  model=homogeneousDetails(a);parameters=[...model.parameters];buildParameters();
  const current=model,g=current.gauss;
  updateMath(output,()=>{
   output.dataset.snapshot=JSON.stringify(current.a);output.dataset.kind=g.kind;output.dataset.free=g.free.length;
   output.replaceChildren(el('h3','1. Comprueba que el sistema es homogéneo'),el('p',tex`\[${equivalentSystemTex(current.a.map(row=>[...row,0].map(v=>fraction(v))))}\]`),
    el('p','El vector cero satisface todas las ecuaciones: el sistema nunca es incompatible.'),
    el('h3','2. Compara rango e incógnitas'),el('p',tex`\(\operatorname{rg}(A)=\operatorname{rg}(A|0)=${g.r},\quad n=${g.n}\). Sistema ${g.kind}.`),
    el('p',current.det===null?'A es rectangular: se usa el rango; no tiene un determinante ordinario.':tex`A es cuadrada y \(\det(A)=${current.det}\).`),
    el('p',g.kind==='SCD'?'El rango coincide con el número de incógnitas. Solo existe la solución trivial.':tex`El rango es menor que el número de incógnitas. Hay \(n-r=${g.n}-${g.r}=${g.free.length}\) ${g.free.length===1?'variable libre':'variables libres'} e infinitas soluciones.`));
   const detail=el('details');detail.append(el('summary','Ver reducción por Gauss'),el('p',tex`\[${augmentedTex(current.a.map(row=>[...row,0].map(v=>fraction(v))))}\]`));
   if(!g.echelon.steps.length)detail.append(el('p','La matriz ya está escalonada con pivotes normalizados.'));
   g.echelon.steps.forEach(s=>detail.append(el('p',tex`\[${operationTex({kind:s.type,target:s.target-1,source:s.source-1,scalar:s.factor})}\qquad ${augmentedTex(s.matrix)}\]`)));
   detail.append(el('p','La columna de términos independientes sigue siendo nula durante todas las operaciones.'));
   output.append(detail,el('h3','3. Describe todas las soluciones'));
   if(g.free.length)output.append(el('p',tex`Variables libres: \(${g.free.map((j,k)=>names[j]+'=t_{'+(k+1)+'}').join(',\\quad ')}\), ${g.free.length===1?'con un parámetro real':'con parámetros reales independientes'}.`));
   output.append(el('p',tex`\[${names.slice(0,g.n).map((v,j)=>v+'='+affineTex(g.expressions[j])).join(',\\qquad ')}.\]`));
   if(g.free.length)output.append(el('p','Todos los parámetros cero dan la solución trivial. Si al menos uno no es cero, se obtiene una solución no trivial. Sus múltiplos también son soluciones.'));
  });
  renderSample();
 }
 function build(){
  count.value=a.length;unknowns.value=a[0].length;status.textContent='';
  const table=el('table'),head=el('thead'),tr=el('tr');
  for(const title of ['Ecuación',...names.slice(0,a[0].length),'B (fijo)']){const th=el('th',title);th.scope='col';tr.append(th);}head.append(tr);
  const body=el('tbody');a.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);
   row.forEach((v,j)=>{const td=el('td'),field=el('input');field.type='number';field.min=-9;field.max=9;field.step=1;field.value=v;field.dataset.homogeneousEntry='';field.dataset.row=i;field.dataset.col=j;field.setAttribute('aria-label','Ecuación '+(i+1)+', coeficiente de '+names[j]);td.append(field);tr.append(td);});tr.append(el('td','0'));body.append(tr);});
  table.append(el('caption','Coeficientes editables y términos independientes nulos'),head,body);grid.replaceChildren(table);analyze();
 }
 grid.addEventListener('change',e=>{const f=e.target;if(!f.matches('[data-homogeneous-entry]'))return;const v=f.valueAsNumber;
  if(!Number.isInteger(v)||Math.abs(v)>9){f.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −9 y 9. Se conserva el último valor válido.';return;}
  f.removeAttribute('aria-invalid');a[Number(f.dataset.row)][Number(f.dataset.col)]=v;preset.value='custom';status.textContent=grid.querySelector('[aria-invalid]')?'Quedan entradas inválidas; se conservan sus últimos valores válidos.':'Sistema actualizado; parámetros reiniciados a cero.';analyze();
 });
 paramFields.addEventListener('change',e=>{const f=e.target;if(!f.matches('[data-homogeneous-parameter]'))return;const v=f.valueAsNumber;
  if(!Number.isInteger(v)||Math.abs(v)>5){f.setAttribute('aria-invalid','true');paramStatus.textContent='Introduce un entero entre −5 y 5. Se conserva el último valor válido.';return;}
  f.removeAttribute('aria-invalid');parameters[Number(f.dataset.homogeneousParameter)]=v;
  paramStatus.textContent=paramFields.querySelector('[aria-invalid]')?'Quedan parámetros inválidos; se conservan sus últimos valores válidos.':'Solución actualizada.';renderSample();
 });
 zero.addEventListener('click',()=>{parameters.fill(0);buildParameters();renderSample();});
 nonzero.addEventListener('click',()=>{if(!parameters.length)return;parameters.fill(0);parameters[0]=1;buildParameters();renderSample();});
 preset.addEventListener('change',()=>{if(preset.value==='custom')return;a=structuredClone(homogeneousPresets[preset.value].a);build();});
 function resize(){const m=Number(count.value),n=Number(unknowns.value),old=a;a=Array.from({length:m},(_,i)=>Array.from({length:n},(_,j)=>old[i]?.[j]??0));preset.value='custom';build();}
 count.addEventListener('change',resize);unknowns.addEventListener('change',resize);
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;a=generatedHomogeneous(seed,Number(count.value),Number(unknowns.value));preset.value='custom';build();});
 build();
}
