import {notationPresets,notationModel} from '../../../content/models/system-notation.js';
import {variables,systemTex,resizeSystem,generateSystem} from '../../../content/models/linear-systems.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeSystemNotationExplorer(){
 const root=document.querySelector('[data-notation-explorer]');if(!root)return;
 const el=(tag,text)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;return node;};
 let system=structuredClone(notationPresets.square);
 const controls=el('div');controls.className='actions';
 function select(label,key,items){
  const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';
  for(const [value,text]of items){const o=el('option',text);o.value=value;s.append(o);}
  wrap.append(s);controls.append(wrap);return s;
 }
 const preset=select('Ejemplo','notationPreset',Object.entries(notationPresets).map(([key,p])=>[key,p.label]));
 const custom=el('option','Sistema editado');custom.value='custom';custom.disabled=true;preset.append(custom);
 const rows=select('Ecuaciones','notationRows',[[2,'2'],[3,'3']]),cols=select('Incógnitas','notationCols',[[2,'2'],[3,'3']]);
 const order=select('Orden de las columnas','notationOrder',[['normal','x, y (y z si aparece)'],['reverse','Orden inverso']]);
 const generate=el('button','Generar otro sistema');generate.type='button';generate.dataset.notationGenerate='';controls.append(generate);
 const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Tabla editable del sistema; desplazamiento horizontal');
 const candidates=el('fieldset'),status=el('p'),output=el('div');status.dataset.notationStatus='';status.setAttribute('role','status');output.dataset.notationOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','Edita enteros entre −99 y 99. La tabla de entrada mantiene el orden x, y, z. El selector reordena conjuntamente A y X en la salida, conservando B y el sistema. Las variantes admiten alguna solución, pero los valores de prueba iniciales son cero. No se guardan los cambios.'),grid,candidates,status,output);
 function input(value,key,i,j){
  const field=el('input');field.type='number';field.min=-99;field.max=99;field.step=1;field.value=value;field.dataset.notationInput=key;field.dataset.row=i;if(j!==undefined)field.dataset.col=j;
  field.setAttribute('aria-label',key==='a'?'Coeficiente de '+variables[j]+', ecuación '+(i+1):key==='b'?'Término independiente, ecuación '+(i+1):'Valor de '+variables[i]);
  field.addEventListener('change',()=>{
   const v=field.valueAsNumber;
   if(!Number.isInteger(v)||v < -99||v>99){field.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −99 y 99. Se conserva el último valor válido.';return;}
   field.removeAttribute('aria-invalid');if(key==='a')system.a[i][j]=v;else system[key][i]=v;
   if(key!=='values')preset.value='custom';
   status.textContent=root.querySelector('[aria-invalid="true"]')?'Quedan casillas inválidas: se usan sus últimos valores válidos.':'Valor actualizado.';render();
  });return field;
 }
 function render(){
  const s=structuredClone(system),indices=s.values.map((_,i)=>i);if(order.value==='reverse')indices.reverse();
  const m=notationModel(s,indices);
  return updateMath(output,()=>{
   output.dataset.snapshot=JSON.stringify({system:s,order:indices});output.dataset.satisfied=String(m.satisfied);
   output.replaceChildren(el('h3','Del sistema a las matrices'),el('p',tex`\[\begin{gathered}${systemTex(s)}\end{gathered}\]`),
    el('p','Orden elegido para X: '+m.names.join(', ')+'. Filas: '+m.rows+' ecuaciones. Columnas de A: '+m.cols+' incógnitas.'),
    el('p',tex`\[A=${m.aTex},\qquad X=${m.xTex},\qquad B=${m.bTex}.\]`),
    el('p',tex`Dimensiones: \(A:${m.rows}\times${m.cols}\), \(X:${m.cols}\times1\), \(B:${m.rows}\times1\), \((A|B):${m.rows}\times${m.cols+1}\).`),
    el('p',tex`\[(A|B)=${m.augmentedTex}.\]`),
    el('h3','Lee el producto fila por columna'),el('p',tex`\[AX=${m.symbolicProductTex}=${m.bTex}=B.\]`),
    el('p','Cada componente de esta igualdad reproduce una ecuación. Los ceros se conservan para mostrar las posiciones. La barra de la ampliada separa datos: no es una división.'),
    el('h3','Comprueba los valores de prueba'),
    el('p',tex`\[X_0=${m.valueTex},\qquad AX_0=${m.productTex}${m.satisfied?'=':tex`\ne`}${m.bTex}=B.\]`),
    el('p',m.satisfied?'Los valores de prueba cumplen todas las ecuaciones: AX₀=B.':'Los valores de prueba no cumplen todas las ecuaciones: AX₀ no coincide con B.'),
    el('p','Esta escritura y la comprobación de una tupla no resuelven ni clasifican por sí solas el sistema.'));
  });
 }
 function build(){
  rows.value=system.a.length;cols.value=system.values.length;status.textContent='';
  order.options[0].textContent=variables.slice(0,system.values.length).join(', ');
  order.options[1].textContent=variables.slice(0,system.values.length).reverse().join(', ');
  const table=el('table'),head=el('thead'),hr=el('tr');
  for(const title of ['Ecuación',...variables.slice(0,system.values.length),'Término independiente']){const th=el('th',title);th.scope='col';hr.append(th);}head.append(hr);
  const body=el('tbody');
  system.a.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);
   row.forEach((v,j)=>{const td=el('td');td.append(input(v,'a',i,j));tr.append(td);});
   const td=el('td');td.append(input(system.b[i],'b',i));tr.append(td);body.append(tr);
  });
  table.append(el('caption','Una incógnita ausente ocupa su columna con coeficiente 0.'),head,body);grid.replaceChildren(table);
  candidates.replaceChildren(el('legend','Valores de prueba (no cambian las ecuaciones)'));
  system.values.forEach((v,j)=>{const label=el('label',variables[j]+' = ');label.append(input(v,'values',j));candidates.append(label);});render();
 }
 preset.addEventListener('change',()=>{if(preset.value==='custom')return;system=structuredClone(notationPresets[preset.value]);build();});
 for(const s of [rows,cols])s.addEventListener('change',()=>{system=resizeSystem(system,Number(rows.value),Number(cols.value));preset.value='custom';build();});
 order.addEventListener('change',render);
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0],s=generateSystem(seed,Number(rows.value),Number(cols.value));root.dataset.seed=seed;system={a:s.a,b:s.b,values:s.values};preset.value='custom';build();});
 build();
}
