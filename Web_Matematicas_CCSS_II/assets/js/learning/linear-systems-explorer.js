import {systemPresets,variables,systemTex,evaluateSystem,resizeSystem,generateSystem} from '../../../content/models/linear-systems.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeLinearSystemsExplorer(){
 const root=document.querySelector('[data-system-explorer]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 let system=structuredClone(systemPresets.tickets);
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [value,text]of items){const o=el('option',text);o.value=value;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Ejemplo','systemPreset',Object.entries(systemPresets).map(([key,p])=>[key,p.label]));
 const custom=el('option','Sistema editado');custom.value='custom';custom.disabled=true;preset.append(custom);
 const rows=select('Ecuaciones','systemRows',[[2,'2'],[3,'3']]),cols=select('Incógnitas','systemCols',[[2,'2'],[3,'3']]);
 const generate=el('button','Generar otro sistema');generate.type='button';generate.dataset.systemGenerate='';controls.append(generate);
 const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Coeficientes y términos independientes; desplazamiento horizontal');grid.dataset.systemGrid='';
 const candidates=el('fieldset');candidates.dataset.systemCandidates='';
 const status=el('p');status.dataset.systemStatus='';status.setAttribute('role','status');
 const output=el('div');output.dataset.systemOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','Edita enteros entre −99 y 99. Elige valores para las incógnitas y comprueba todas las filas. Se conserva el orden x, y, z. Una variante generada admite al menos una solución, pero no tiene por qué ser única; empieza con valores de prueba cero. No se guardan los cambios.'),grid,candidates,status,output);
 function input(value,label,key,i,j){
  const field=el('input');field.type='number';field.min=-99;field.max=99;field.step=1;field.value=value;field.dataset.systemInput=key;field.dataset.row=i;if(j!==undefined)field.dataset.col=j;field.setAttribute('aria-label',label);
  field.addEventListener('change',()=>{
   const v=field.valueAsNumber;
   if(!Number.isInteger(v)||v < -99||v>99){field.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −99 y 99. El cálculo conserva el último valor válido.';return;}
   field.removeAttribute('aria-invalid');if(key==='a')system.a[i][j]=v;else system[key][i]=v;
   if(key!=='values')preset.value='custom';
   status.textContent=root.querySelector('[aria-invalid="true"]')?'Quedan casillas inválidas; se usan sus últimos valores válidos.':'Valor actualizado.';render();
  });return field;
 }
 function render(){
  const s=structuredClone(system),m=evaluateSystem(s);
  return updateMath(output,()=>{
   output.dataset.snapshot=JSON.stringify(s);output.dataset.satisfied=String(m.satisfied);output.dataset.count=m.count;
   output.replaceChildren(el('p',tex`Sistema con ${m.rows} ecuaciones y ${m.cols} incógnitas: \[${systemTex(s)}\]`),el('p',tex`Valores de prueba, en el orden ${variables.slice(0,m.cols).join(', ')}: \((${s.values.join(',')})\).`));
   const list=el('ol');
   m.checks.forEach((r,i)=>{
    const item=el('li'),terms=s.a[i].map((v,j)=>tex`(${v})\cdot(${s.values[j]})`).join('+');
    item.append(el('p',tex`\[(${i+1})\quad ${terms}=${r.left}${r.satisfied?'=':tex`\ne`}${r.right}.\]`),el('p',r.satisfied?'Esta ecuación sí se cumple.':`Esta ecuación no se cumple: lado izquierdo menos lado derecho = ${r.residual}.`));
    if(s.a[i].every(v=>v===0))item.append(el('p',s.b[i]===0?'La fila 0=0 no impone restricciones, pero hay que comprobar las demás.':'La fila 0='+s.b[i]+' es imposible para cualquier elección de valores.'));list.append(item);
   });output.append(list,el('p',`Se cumplen ${m.count} de ${m.rows} ecuaciones. ${m.satisfied?'La tupla es solución del sistema.':'La tupla no es solución del sistema.'}`),el('p','Comprobar estos valores no enumera todas las soluciones ni decide, por sí solo, cuántas hay.'));
  });
 }
 function build(){
  rows.value=system.a.length;cols.value=system.values.length;status.textContent='';
  const table=el('table'),head=el('thead'),hr=el('tr');hr.append(el('th','Ecuación'));
  for(const name of [...variables.slice(0,system.values.length).map(v=>'Coeficiente de '+v),'Término independiente']){const th=el('th',name);th.scope='col';hr.append(th);}head.append(hr);
  const body=el('tbody');system.a.forEach((row,i)=>{
   const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);
   row.forEach((v,j)=>{const td=el('td');td.append(input(v,`Coeficiente de ${variables[j]}, ecuación ${i+1}`,'a',i,j));tr.append(td);});
   const td=el('td');td.append(input(system.b[i],`Término independiente, ecuación ${i+1}`,'b',i));tr.append(td);body.append(tr);
  });table.append(el('caption','Cada fila escribe los coeficientes en el mismo orden; una incógnita ausente tiene coeficiente 0.'),head,body);grid.replaceChildren(table);
  candidates.replaceChildren(el('legend','Valores que quieres comprobar'));
  system.values.forEach((v,j)=>{const label=el('label',variables[j]+' = ');label.append(input(v,`Valor de ${variables[j]}`,'values',j));candidates.append(label);});render();
 }
 preset.addEventListener('change',()=>{if(preset.value==='custom')return;system=structuredClone(systemPresets[preset.value]);build();});
 for(const select of [rows,cols])select.addEventListener('change',()=>{system=resizeSystem(system,Number(rows.value),Number(cols.value));preset.value='custom';build();});
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0],s=generateSystem(seed,Number(rows.value),Number(cols.value));root.dataset.seed=seed;system={a:s.a,b:s.b,values:s.values};preset.value='custom';build();});
 build();
}
