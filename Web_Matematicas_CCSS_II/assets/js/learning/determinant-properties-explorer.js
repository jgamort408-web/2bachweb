import {matrixTex,resizeMatrix} from '../../../content/models/matrix-basics.js';
import {parseMatrixInteger} from '../../../content/models/matrix-operations.js';
import {transformDeterminant,propertyPresets,generatedPropertyMatrix} from '../../../content/models/determinant-properties.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeDeterminantPropertiesExplorer(){
 const root=document.querySelector('[data-det-properties]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 let matrix=propertyPresets.elimination.matrix.map(r=>[...r]),scalar=-2;
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of items){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return {wrap,input:s};}
 const preset=select('Ejemplo','propertyPreset',Object.entries(propertyPresets).map(([k,p])=>[k,p.label])).input;
 const custom=el('option','Datos personalizados');custom.value='custom';custom.disabled=true;preset.append(custom);
 const size=select('Orden','propertySize',[[2,'2'],[3,'3']]).input;
 const operation=select('Operación','propertyOperation',[['add','Sumar un múltiplo a otra'],['swap','Intercambiar dos'],['scale','Multiplicar una por k'],['scaleAll','Multiplicar toda A por k'],['transpose','Trasponer A']]).input;
 const axis=select('Aplicar a','propertyAxis',[['rows','Filas'],['cols','Columnas']]);
 const target=select('Posición destino','propertyTarget',[]),source=select('Posición de origen','propertySource',[]);
 const factorLabel=el('label','Factor k '),factorInput=el('input');factorInput.type='number';factorInput.min=-3;factorInput.max=3;factorInput.step=1;factorInput.value=scalar;factorInput.dataset.propertyFactor='';factorLabel.append(factorInput);controls.append(factorLabel);
 const generate=el('button','Generar otra base');generate.type='button';generate.dataset.generateProperty='';controls.append(generate);
 const note=el('p','Edita la base A con enteros de −9 a 9. El factor k admite enteros de −3 a 3. Cada operación se aplica a A; los cambios de operación no acumulan transformaciones. Cambiar el orden conserva las casillas comunes y añade ceros.');
 const grid=el('div');grid.className='table-scroll';grid.dataset.propertyGrid='';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor de A, desplazamiento horizontal');
 const status=el('p');status.dataset.propertyStatus='';status.setAttribute('role','status');
 const output=el('div');output.dataset.propertyOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,note,grid,status,output);
 function build(){
  size.value=matrix.length;
  for(const [select,fallback]of [[target.input,1],[source.input,0]]){const previous=select.value;select.replaceChildren();for(let i=0;i<matrix.length;i++){const o=el('option',String(i+1));o.value=i;select.append(o);}select.value=previous!==''&&Number(previous)<matrix.length?previous:fallback;}
  const table=el('table'),head=el('thead'),tr=el('tr');tr.append(el('th','Fila'));
  for(let j=1;j<=matrix.length;j++){const th=el('th',String(j));th.scope='col';tr.append(th);}head.append(tr);const body=el('tbody');
  matrix.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);row.forEach((v,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-9;input.max=9;input.step=1;input.value=v;input.dataset.propertyEntry='';input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label',`A, fila ${i+1}, columna ${j+1}`);td.append(input);tr.append(td);});body.append(tr);});
  table.append(el('caption','Matriz de partida A'),head,body);grid.replaceChildren(table);
 }
 function render(){
  if(root.querySelector('[aria-invalid="true"]'))status.textContent='Hay entradas inválidas; se conservan sus últimos valores válidos.';
  const mode=operation.value,whole=mode==='scaleAll'||mode==='transpose';
  axis.wrap.hidden=whole;target.wrap.hidden=whole;source.wrap.hidden=whole||mode==='scale';factorLabel.hidden=mode==='swap'||mode==='transpose';
  const a=matrix.map(r=>[...r]),dest=Number(target.input.value),origin=Number(source.input.value),m=transformDeterminant(a,{operation:mode,axis:axis.input.value,target:dest,source:origin,scalar}),letter=axis.input.value==='rows'?'F':'C';
  return updateMath(output,()=>{
   output.replaceChildren();output.dataset.valid=m.valid;output.dataset.before=m.valid?m.before:'';output.dataset.after=m.valid?m.after:'';
   if(!m.valid){output.append(el('p',m.reason));return;}
   const change=mode==='add'?tex`${letter}_{${dest+1}}\leftarrow ${letter}_{${dest+1}}+(${scalar})${letter}_{${origin+1}}`:mode==='swap'?tex`${letter}_{${dest+1}}\leftrightarrow ${letter}_{${origin+1}}`:mode==='scale'?tex`${letter}_{${dest+1}}\leftarrow(${scalar})${letter}_{${dest+1}}`:mode==='scaleAll'?tex`B=(${scalar})A`:tex`B=A^T`;
   output.append(el('p',tex`Operación: \(${change}\).`),el('p',tex`\[A=${matrixTex(a)},\qquad B=${matrixTex(m.result)}\]`));
   const relation=mode==='swap'?tex`\det(B)=-\det(A)`:mode==='scale'?tex`\det(B)=k\det(A)`:mode==='scaleAll'?tex`\det(B)=k^{${a.length}}\det(A)`:tex`\det(B)=\det(A)`;
   output.append(el('p',tex`Regla: \(${relation}\).`),el('p',tex`\[\det(A)=${m.before},\qquad\det(B)=${m.after}.\]`));
   const check=el('p',tex`Comprobación: el factor es \(${m.factor}\), y \((${m.factor})(${m.before})=${m.expected}\).`);check.dataset.propertyCheck='';output.append(check);
   output.append(el('p',mode==='add'?'Se sustituye únicamente el destino; el origen se conserva. Sumar un múltiplo de otra fila o columna no cambia el determinante.':mode==='swap'?'Se intercambian dos posiciones distintas. El determinante cambia de signo; si era cero, sigue siendo cero.':mode==='scale'?'Solo se multiplica una fila o columna: el factor sale una vez. Si k=0, la matriz resultante tiene una fila o columna nula.':mode==='scaleAll'?`El factor afecta a las ${a.length} filas: sale ${a.length} veces. No es la regla de multiplicar una sola fila.`:'Intercambiar filas por columnas mediante trasposición conserva el determinante.'));
   if(m.before===0)output.append(el('p','La base es singular. La comprobación usa una igualdad de productos, sin dividir por su determinante cero.'));
   const details=el('details');details.dataset.propertyChanges='';details.append(el('summary','Ver entradas que han cambiado'));const list=el('ul');let count=0;
   a.forEach((row,i)=>row.forEach((v,j)=>{if(v!==m.result[i][j]){count++;list.append(el('li',`Posición (${i+1}, ${j+1}): ${v} → ${m.result[i][j]}.`));}}));
   details.append(count?list:el('p','No cambia ninguna entrada con esta base y estos parámetros. La regla sigue siendo válida.'));output.append(details);
  });
 }
 grid.addEventListener('change',event=>{const input=event.target;if(!input.matches('[data-property-entry]'))return;const v=parseMatrixInteger(input.value,-9,9);
  if(v===null){input.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −9 y 9. Se conserva el último valor válido.';return;}
  input.removeAttribute('aria-invalid');matrix[Number(input.dataset.row)][Number(input.dataset.col)]=v;preset.value='custom';status.textContent='Base actualizada.';render();
 });
 factorInput.addEventListener('change',()=>{const v=parseMatrixInteger(factorInput.value,-3,3);if(v===null){factorInput.setAttribute('aria-invalid','true');status.textContent='Introduce un factor entero entre −3 y 3. Se conserva el último valor válido.';return;}factorInput.removeAttribute('aria-invalid');scalar=v;status.textContent='Factor actualizado.';render();});
 for(const s of [operation,axis.input,target.input,source.input])s.addEventListener('change',render);
 size.addEventListener('change',()=>{matrix=resizeMatrix(matrix,Number(size.value),Number(size.value));preset.value='custom';build();status.textContent='Orden actualizado.';render();});
 preset.addEventListener('change',()=>{matrix=propertyPresets[preset.value].matrix.map(r=>[...r]);build();status.textContent='Base cargada; se conserva la operación.';render();});
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;matrix=generatedPropertyMatrix(seed,matrix.length);preset.value='custom';build();status.textContent='Nueva base; se conserva la operación.';render();});
 build();render();
}
