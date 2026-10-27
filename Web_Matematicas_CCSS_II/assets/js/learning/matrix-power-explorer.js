import {matrixTex} from '../../../content/models/matrix-basics.js';
import {parseMatrixInteger} from '../../../content/models/matrix-operations.js';
import {matrixPower,powerPresets,generatedPowerMatrix} from '../../../content/models/matrix-power.js';
import {multiplyMatrices} from '../../../content/models/matrix-product.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeMatrixPowerExplorer(){
 const root=document.querySelector('[data-matrix-power]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 let matrix=powerPresets.accumulation.matrix.map(r=>[...r]);
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of items){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Ejemplo','powerPreset',Object.entries(powerPresets).map(([k,p])=>[k,p.label]));
 const custom=el('option','Datos personalizados');custom.value='custom';custom.disabled=true;preset.append(custom);
 const exponent=select('Exponente n','powerExponent',Array.from({length:7},(_,n)=>[n,String(n)]));exponent.value=3;
 const generate=el('button','Generar otra matriz');generate.type='button';generate.dataset.generatePower='';controls.append(generate);
 const note=el('p','Editor de matrices 2×2 con enteros de −3 a 3 y exponentes de 0 a 6. La teoría admite otros órdenes cuadrados y valores reales. No se guarda el trabajo.');
 const grid=el('div');grid.className='table-scroll';grid.dataset.powerGrid='';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor de la base A, desplazamiento horizontal');
 const status=el('p');status.dataset.powerStatus='';status.setAttribute('role','status');
 const output=el('div');output.dataset.powerOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,note,grid,status,output);
 function build(){
  const table=el('table'),head=el('thead'),tr=el('tr');tr.append(el('th','Fila'));
  for(let j=1;j<=2;j++){const th=el('th',String(j));th.scope='col';tr.append(th);}head.append(tr);const body=el('tbody');
  matrix.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);row.forEach((v,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-3;input.max=3;input.step=1;input.value=v;input.dataset.powerEntry='';input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label',`A, fila ${i+1}, columna ${j+1}`);td.append(input);tr.append(td);});body.append(tr);});
  table.append(el('caption','Elementos de A'),head,body);grid.replaceChildren(table);
 }
 function render(){
  if(root.querySelector('[aria-invalid="true"]'))status.textContent='Hay entradas inválidas; se conservan sus últimos valores válidos.';
  const a=matrix.map(r=>[...r]),n=Number(exponent.value),model=matrixPower(a,n),v0=[[10],[3]],vn=multiplyMatrices(model.result,v0).result;
  return updateMath(output,()=>{
   output.replaceChildren();output.dataset.exponent=n;
   output.append(el('p',tex`\[A=${matrixTex(a)},\qquad A^{${n}}=${matrixTex(model.result)}\]`));
   output.append(el('p',n===0?'Exponente cero: el resultado es la identidad 2×2, incluso si A es nula. No se eleva cada entrada a cero.':n===1?'Exponente uno: A¹=A.':'Cada nueva etapa multiplica la potencia anterior por A mediante fila por columna.'));
   const history=el('details');history.dataset.powerHistory='';history.append(el('summary','Ver las potencias desde cero'));const list=el('ol');list.start=0;
   for(const stage of model.stages)list.append(el('li',tex`\(A^{${stage.exponent}}=${matrixTex(stage.result)}\)`));history.append(list);output.append(history);
   if(n>0){
    const details=el('details');details.dataset.powerSteps='';details.append(el('summary','Ver el último producto fila por columna'));
    details.append(el('p',tex`\[A^{${n}}=A^{${n-1}}A=${matrixTex(model.stages[n-1].result)}${matrixTex(a)}\]`));
    const list=el('ol');
    for(const step of model.stages[n].steps){const expression=step.terms.map(t=>tex`(${t.left})\cdot(${t.right})`).join('+');list.append(el('li',tex`\(c_{${step.row}${step.col}}=${expression}=${step.value}\).`));}
    details.append(list);output.append(details);
   }
   const state=el('div');state.dataset.powerState='';state.append(el('h3','Aplicar la misma transformación varias veces'));
   state.append(el('p',tex`Partimos de \(v_0=${matrixTex(v0)}\) y usamos \(v_{k+1}=Av_k\). Después de ${n} pasos:`),el('p',tex`\[v_{${n}}=A^{${n}}v_0=${matrixTex(vn)}.\]`));
   if(preset.value==='accumulation')state.append(el('p',`La primera componente es una cantidad inicial de 10 unidades; la segunda representa un incremento constante de 3 unidades por paso. Tras ${n} pasos hay ${vn[0][0]} unidades. El incremento se mantiene en 3: no es otra cantidad que se acumule.`));
   else state.append(el('p','Estas dos componentes son un vector de prueba. No se atribuyen unidades ni una interpretación económica a una matriz arbitraria.'));
   output.append(state);
  });
 }
 grid.addEventListener('change',event=>{const input=event.target;if(!input.matches('[data-power-entry]'))return;const v=parseMatrixInteger(input.value,-3,3);
  if(v===null){input.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −3 y 3. Se conserva el último valor válido.';return;}
  input.removeAttribute('aria-invalid');matrix[Number(input.dataset.row)][Number(input.dataset.col)]=v;preset.value='custom';status.textContent='Base actualizada.';render();
 });
 exponent.addEventListener('change',()=>{status.textContent='Exponente actualizado.';render();});
 preset.addEventListener('change',()=>{matrix=powerPresets[preset.value].matrix.map(r=>[...r]);build();status.textContent='Ejemplo cargado; se conserva el exponente.';render();});
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;matrix=generatedPowerMatrix(seed);preset.value='custom';build();status.textContent='Nueva base; se conserva el exponente.';render();});
 build();render();
}
