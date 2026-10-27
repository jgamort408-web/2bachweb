import {inverseSystemPresets,inverseSystemDetails,generatedInverseSystem} from '../../../content/models/inverse-systems.js';
import {matrixTex} from '../../../content/models/system-notation.js';
import {fractionTex,rationalMatrixTex} from '../../../content/models/matrix-inverse.js';
import {linearTex} from '../../../content/models/linear-systems.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeInverseSystemsExplorer(){
 const root=document.querySelector('[data-inverse-system-explorer]');if(!root)return;
 const el=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
 let system=structuredClone(inverseSystemPresets.integer);
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of items){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Ejemplo','inverseSystemPreset',Object.entries(inverseSystemPresets).map(([k,p])=>[k,p.label]));
 const custom=el('option','Sistema editado');custom.value='custom';custom.disabled=true;preset.append(custom);
 const size=select('Orden de A','inverseSystemSize',[[2,'2'],[3,'3']]);
 const kind=select('Tipo de variante','inverseSystemKind',[['SCD','Con inversa (SCD)'],['SCI','Sin inversa (SCI)'],['SI','Sin inversa (SI)']]);
 const generate=el('button','Generar variante');generate.type='button';generate.dataset.inverseSystemGenerate='';controls.append(generate);
 const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor del sistema; desplazamiento horizontal');
 const status=el('p');status.dataset.inverseSystemStatus='';status.setAttribute('role','status');
 const output=el('div');output.dataset.inverseSystemOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','Edita enteros entre −9 y 9. A es cuadrada de orden 2 o 3 y B es una columna. Si el determinante es cero, no se calcula una inversa: se comparan los rangos. Las soluciones se conservan como fracciones exactas. No se guardan los cambios.'),grid,status,output);
 function render(){
  const m=inverseSystemDetails(system.a,system.b),snapshot=JSON.stringify({a:m.a,b:m.b});
  return updateMath(output,()=>{
   output.dataset.snapshot=snapshot;output.dataset.kind=m.ranks.kind;output.dataset.det=m.details.det;
   output.dataset.solution=JSON.stringify(m.solution);
   output.replaceChildren(el('h3','1. Comprueba si el método se puede aplicar'),el('p',tex`\[\begin{cases}${m.a.map((row,i)=>linearTex(row)+'='+m.b[i]).join(tex`\\`)}\end{cases}\]`),
    el('p',tex`\[A=${matrixTex(m.a)},\qquad B=${matrixTex(m.b.map(v=>[v]))},\qquad \det(A)=${m.details.det}.\]`));
   if(!m.details.invertible){
    output.append(el('p','A no tiene inversa. No se puede usar X=A⁻¹B.'),
     el('p',tex`\(\operatorname{rg}(A)=${m.ranks.r}\) y \(\operatorname{rg}(A|B)=${m.ranks.s}\).`),
     el('p',m.ranks.kind==='SCI'?'Es SCI: tiene infinitas soluciones. La ausencia de inversa no significa ausencia de soluciones.':'Es SI: los rangos son distintos y no tiene solución.'),
     el('p','Utiliza la comparación de rangos y las operaciones por filas para continuar. Este explorador no parametriza los casos singulares.'));
    return;
   }
   output.append(el('p','A es invertible: el sistema es SCD. Multiplicamos por su inversa a la izquierda.'),
    el('h3','2. Construye la inversa'),el('p',tex`\[A^{-1}=${rationalMatrixTex(m.details.inverse)}.\]`));
   const derivation=el('details');derivation.append(el('summary','Ver adjunta y división por el determinante'),
    el('p',tex`\[\operatorname{adj}(A)=${matrixTex(m.details.adjugate)},\qquad A^{-1}=\frac{1}{${m.details.det}}\operatorname{adj}(A).\]`),
    el('p','La adjunta es la traspuesta de la matriz de cofactores. Aquí se calcula con los menores de A, como en 4.9.'));
   output.append(derivation,el('h3','3. Multiplica por la columna B'),el('p',tex`\[X=A^{-1}B=${rationalMatrixTex(m.details.inverse)}${matrixTex(m.b.map(v=>[v]))}=${rationalMatrixTex(m.solution.map(v=>[v]))}.\]`));
   const list=el('ol');list.dataset.contentRole='worked-steps';
   m.details.inverse.forEach((row,i)=>list.append(el('li',tex`\(${['x','y','z'][i]}=${row.map((v,j)=>tex`\left(${fractionTex(v)}\right)(${m.b[j]})`).join('+')}=${fractionTex(m.solution[i])}\).`)));output.append(list);
   output.append(el('h3','4. Sustituye en el sistema original'),
    el('p',tex`\[AX=${matrixTex(m.a)}${rationalMatrixTex(m.solution.map(v=>[v]))}=${rationalMatrixTex(m.product.map(v=>[v]))}=B.\]`));
   m.a.forEach((row,i)=>output.append(el('p',tex`Ecuación ${i+1}: \(${row.map((v,j)=>tex`(${v})\left(${fractionTex(m.solution[j])}\right)`).join('+')}=${fractionTex(m.product[i])}=${m.b[i]}\).`)));
   output.append(el('p','Todas las igualdades se cumplen exactamente. La invertibilidad garantiza además que esta solución es única.'));
  });
 }
 function build(){
  size.value=system.a.length;status.textContent='';
  const table=el('table'),head=el('thead'),tr=el('tr');
  for(const title of ['Ecuación',...['x','y','z'].slice(0,system.a.length),'B']){const th=el('th',title);th.scope='col';tr.append(th);}head.append(tr);
  const body=el('tbody');system.a.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);
   [...row,system.b[i]].forEach((v,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-9;input.max=9;input.step=1;input.value=v;input.dataset.inverseSystemEntry='';input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label','Ecuación '+(i+1)+', '+(j===row.length?'término independiente':'coeficiente de '+['x','y','z'][j]));td.append(input);tr.append(td);});body.append(tr);
  });
  table.append(el('caption','Coeficientes de A y última columna B'),head,body);grid.replaceChildren(table);render();
 }
 grid.addEventListener('change',e=>{
  const field=e.target;if(!field.matches('[data-inverse-system-entry]'))return;const value=field.valueAsNumber;
  if(!Number.isInteger(value)||Math.abs(value)>9){field.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −9 y 9. Se conserva el último valor válido.';return;}
  field.removeAttribute('aria-invalid');const i=Number(field.dataset.row),j=Number(field.dataset.col);
  if(j===system.a.length)system.b[i]=value;else system.a[i][j]=value;
  preset.value='custom';status.textContent=grid.querySelector('[aria-invalid]')?'Quedan entradas inválidas; se conservan sus últimos valores válidos.':'Sistema actualizado.';render();
 });
 preset.addEventListener('change',()=>{if(preset.value==='custom')return;system=structuredClone(inverseSystemPresets[preset.value]);build();});
 size.addEventListener('change',()=>{const n=Number(size.value),old=system;system={a:Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>old.a[i]?.[j]??0)),b:Array.from({length:n},(_,i)=>old.b[i]??0)};preset.value='custom';build();});
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;system=generatedInverseSystem(seed,Number(size.value),kind.value);preset.value='custom';build();});
 build();
}
