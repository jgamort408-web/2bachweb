import {parameterFamilies,parameterSystemDetails,generatedParameterSample} from '../../../content/models/parameter-systems.js';
import {affineTex} from '../../../content/models/gauss.js';
import {fraction,fractionTex} from '../../../content/models/matrix-inverse.js';
import {augmentedTex,equivalentSystemTex,operationTex} from '../../../content/models/equivalent-systems.js';
import {updateMath} from '../core/math.js';
const tex=String.raw,names=['x','y','z'];
export function initializeParameterSystemsExplorer(){
 const root=document.querySelector('[data-parameter-system-explorer]');if(!root)return;
 const el=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
 let id='symmetric',twice=0,seed=null;
 const controls=el('div');controls.className='actions';
 function select(label,key,options){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of options){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const family=select('Familia','parameterSystemFamily',Object.entries(parameterFamilies).map(([key,f])=>[key,f.label]));
 const value=select('Valor de λ','parameterSystemValue',Array.from({length:13},(_,i)=>[i-6,String((i-6)/2).replace('.',',')]));
 value.value='0';
 const generate=el('button','Generar variante equivalente');generate.type='button';generate.dataset.parameterSystemGenerate='';controls.append(generate);
 const critical=el('div');critical.className='actions';critical.setAttribute('aria-label','Valores críticos de la familia');
 const output=el('div');output.dataset.parameterSystemOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','La discusión algebraica cubre todos los valores reales. El selector comprueba trece muestras entre −3 y 3, separadas por 1/2. Una variante cambia la muestra y reordena ecuaciones o cambia sus signos, conservando las soluciones. No se guarda el estado.'),critical,output);
 function render(){
  const m=parameterSystemDetails(id,twice,seed),f=parameterFamilies[id],g=m.gauss;
  return updateMath(output,()=>{
   output.dataset.family=m.id;output.dataset.twice=m.twice;output.dataset.kind=g.kind;output.dataset.free=g.kind==='SI'?'none':g.free.length;
   output.dataset.snapshot=JSON.stringify(m.rows);output.dataset.case=m.caseIndex;
   output.replaceChildren(el('h3','1. Discusión de la familia completa'),el('p',tex`\[${f.system}\]`),el('p',f.reason));
   const region=el('div');region.className='table-scroll';region.tabIndex=0;region.setAttribute('role','region');region.setAttribute('aria-label','Tabla de casos; desplazamiento horizontal');
   const table=el('table'),head=el('thead'),tr=el('tr');
   for(const title of ['Valores de λ','Rangos A / ampliada','Tipo','Soluciones','Muestra actual']){const th=el('th',title);th.scope='col';tr.append(th);}head.append(tr);
   const body=el('tbody');f.cases.forEach((c,i)=>{const row=el('tr'),th=el('th',c.condition);th.scope='row';row.dataset.parameterCase=i;if(i===m.caseIndex)row.setAttribute('aria-current','true');row.append(th,el('td',c.r+' / '+c.s),el('td',c.kind),el('td',c.solution),el('td',i===m.caseIndex?'Sí':'—'));body.append(row);});
   table.append(el('caption','Casos disjuntos que cubren todos los valores reales de λ'),head,body);region.append(table);output.append(region,el('h3','2. Sustituye el valor elegido'),el('p',tex`\(\lambda=${fractionTex(fraction(m.twice,2))}\).`));
   if(m.scale!==1)output.append(el('p','Para calcular exactamente esta muestra, multiplicamos todas las ecuaciones por 2. Es una operación reversible que elimina los denominadores.'));
   if(m.seed!==null)output.append(el('p','Variante equivalente: '+m.order.map((source,i)=>'nueva fila '+(i+1)+' = '+m.signs[i]+' × fila '+(source+1)+' de la muestra actual antes de reordenar').join('; ')+'.'));
   output.append(el('p',tex`\[${equivalentSystemTex(m.rows.map(row=>row.map(v=>fraction(v))))}\]`),el('p',m.det===null?'La matriz original es rectangular: usamos rangos, sin determinante ordinario.':tex`Determinante de A en la familia original, antes de escalar o reordenar: \(\det(A)=${fractionTex(m.det)}\).`),
    el('h3','3. Comprueba la muestra mediante Gauss'),el('p',tex`\(\operatorname{rg}(A)=${g.r},\quad \operatorname{rg}(A|B)=${g.s},\quad n=${g.n}\). Sistema ${g.kind}.`));
   const details=el('details');details.append(el('summary','Ver operaciones de la muestra'),el('p',tex`\[${augmentedTex(m.rows.map(row=>row.map(v=>fraction(v))))}\]`));
   if(!g.echelon.steps.length)details.append(el('p','La matriz ya está escalonada con pivotes normalizados.'));
   g.echelon.steps.forEach(s=>details.append(el('p',tex`\[${operationTex({kind:s.type,target:s.target-1,source:s.source-1,scalar:s.factor})}\qquad ${augmentedTex(s.matrix)}\]`)));output.append(details);
   if(g.kind==='SI'){output.append(el('p','La reducción produce una contradicción. No hay solución para este valor de λ. Las fórmulas del caso general no se aplican aquí.'));return;}
   output.append(el('h3','4. Resuelve y comprueba'));
   if(g.free.length)output.append(el('p',tex`Variables libres: \(${g.free.map((j,k)=>names[j]+'=t_{'+(k+1)+'}').join(',\\quad ')}\). Estos parámetros son reales independientes; λ ya está fijado.`));
   output.append(el('p',tex`\[${names.slice(0,g.n).map((v,j)=>v+'='+affineTex(g.expressions[j])).join(',\\qquad ')}.\]`));
   // Verify in the original, unpermuted system after clearing denominators.
   m.scaled.forEach((row,i)=>output.append(el('p',tex`Ecuación original ${i+1}${m.scale===2?' (multiplicada por 2)':''}: \(${row.slice(0,-1).map((v,j)=>tex`(${v})\left(${affineTex(g.expressions[j])}\right)`).join('+')}=${row.at(-1)}\).`)));
   output.append(el('p','La solución o familia cumple las ecuaciones de la muestra. La justificación algebraica de arriba, no una colección de pruebas numéricas, sustenta la discusión para todos los valores reales.'));
  });
 }
 function criticalButtons(){
  critical.replaceChildren();parameterFamilies[id].critical.forEach(k=>{const b=el('button','Probar λ='+k);b.type='button';b.dataset.parameterCritical=2*k;b.addEventListener('click',()=>{twice=2*k;value.value=twice;seed=null;render();});critical.append(b);});
 }
 family.addEventListener('change',()=>{id=family.value;twice=0;value.value='0';seed=null;criticalButtons();render();});
 value.addEventListener('change',()=>{twice=Number(value.value);seed=null;render();});
 generate.addEventListener('click',()=>{seed=crypto.getRandomValues(new Uint32Array(1))[0];const m=generatedParameterSample(seed,id);twice=m.twice;value.value=twice;root.dataset.seed=seed;render();});
 criticalButtons();render();
}
