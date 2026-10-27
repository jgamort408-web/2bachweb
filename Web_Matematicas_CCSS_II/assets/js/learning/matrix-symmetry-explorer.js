import {matrixTex,resizeMatrix} from '../../../content/models/matrix-basics.js';
import {parseMatrixInteger} from '../../../content/models/matrix-operations.js';
import {inspectSymmetry,symmetryPresets,generatedSymmetryMatrix} from '../../../content/models/matrix-symmetry.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeMatrixSymmetryExplorer(){
 const root=document.querySelector('[data-matrix-symmetry]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 let matrix=symmetryPresets.symmetric.matrix.map(r=>[...r]);
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of items){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Ejemplo','symmetryPreset',Object.entries(symmetryPresets).map(([k,p])=>[k,p.label]));
 const custom=el('option','Datos personalizados');custom.value='custom';custom.disabled=true;preset.append(custom);
 const rows=select('Filas','symmetryRows',[[1,'1'],[2,'2'],[3,'3']]),cols=select('Columnas','symmetryCols',[[1,'1'],[2,'2'],[3,'3']]);
 const generate=el('button','Generar otra matriz');generate.type='button';generate.dataset.generateSymmetry='';controls.append(generate);
 const note=el('p','Edita enteros de −9 a 9, entre una y tres filas y columnas. Cambiar dimensiones conserva casillas comunes y añade ceros. La traspuesta intercambia posiciones sin cambiar los signos.');
 const grid=el('div');grid.className='table-scroll';grid.dataset.symmetryGrid='';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor de A, desplazamiento horizontal');
 const status=el('p');status.dataset.symmetryStatus='';status.setAttribute('role','status');
 const positionLabel=el('label','Posición que quieres seguir '),position=el('select');position.dataset.symmetryPosition='';positionLabel.append(position);
 const output=el('div');output.dataset.symmetryOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,note,grid,status,positionLabel,output);
 function build(){
  rows.value=matrix.length;cols.value=matrix[0].length;
  const table=el('table'),head=el('thead'),tr=el('tr');tr.append(el('th','Fila'));
  for(let j=1;j<=matrix[0].length;j++){const th=el('th',String(j));th.scope='col';tr.append(th);}head.append(tr);const body=el('tbody');
  matrix.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);row.forEach((v,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-9;input.max=9;input.step=1;input.value=v;input.dataset.symmetryEntry='';input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label',`A, fila ${i+1}, columna ${j+1}`);td.append(input);tr.append(td);});body.append(tr);});
  table.append(el('caption','Elementos de A'),head,body);grid.replaceChildren(table);
 }
 function render(){
  if(root.querySelector('[aria-invalid="true"]'))status.textContent='Hay entradas inválidas; se conservan sus últimos valores válidos.';
  const a=matrix.map(r=>[...r]),m=inspectSymmetry(a),previous=position.value;position.replaceChildren();
  for(let i=1;i<=m.rows;i++)for(let j=1;j<=m.cols;j++){const o=el('option',`Fila ${i}, columna ${j}`);o.value=`${i},${j}`;position.append(o);}
  if([...position.options].some(o=>o.value===previous))position.value=previous;
  const [i,j]=position.value.split(',').map(Number);
  grid.querySelectorAll('input').forEach(input=>input.classList.toggle('symmetry-selected',Number(input.dataset.row)===i-1&&Number(input.dataset.col)===j-1));
  return updateMath(output,()=>{
   output.replaceChildren();output.dataset.square=m.square;output.dataset.symmetric=m.symmetric;output.dataset.skew=m.skew;
   output.append(el('p',tex`\[A=${matrixTex(a)},\qquad A^T=${matrixTex(m.transposed)}\]`));
   output.append(el('p',`A tiene orden ${m.rows}×${m.cols}; su traspuesta tiene orden ${m.cols}×${m.rows}.`));
   const mapping=el('p',tex`El elemento \(a_{${i}${j}}=${a[i-1][j-1]}\) pasa a la fila ${j}, columna ${i} de \(A^T\): \((A^T)_{${j}${i}}=${m.transposed[j-1][i-1]}\). El valor se conserva.`);mapping.dataset.symmetryMapping='';output.append(mapping);
   if(!m.square){output.append(el('p','La matriz no es cuadrada. A y Aᵀ tienen órdenes distintos: no puede ser simétrica ni antisimétrica. Sí tiene traspuesta.'));return;}
   output.append(el('p',tex`\[-A=${matrixTex(m.opposite)}\]`));
   const verdict=el('p');verdict.dataset.symmetryVerdict='';
   verdict.textContent=m.symmetric&&m.skew?'Es simétrica y antisimétrica a la vez: es la matriz nula.':m.symmetric?'Es simétrica; no es antisimétrica.':m.skew?'Es antisimétrica; no es simétrica.':'No es simétrica ni antisimétrica.';
   output.append(verdict);
   for(const [name,match,witness]of [['Simetría',m.symmetric,m.symmetryWitness],['Antisimetría',m.skew,m.skewWitness]]){
    if(match)output.append(el('p',name+': todas las comparaciones cumplen la condición.'));
    else {const p=witness;output.append(el('p',name+`: falla, por ejemplo, la posición (${p.row}, ${p.col}). `+(name==='Simetría'?tex`\(a_{${p.row}${p.col}}=${p.a}\ne ${p.b}=a_{${p.col}${p.row}}\).`:tex`\(a_{${p.row}${p.col}}=${p.a}\ne ${p.b===0?0:-p.b}=-a_{${p.col}${p.row}}\).`)));}
   }
   const details=el('details');details.dataset.symmetryPairs='';details.append(el('summary','Ver todas las comparaciones'));const list=el('ul');
   for(const p of m.pairs)list.append(el('li',tex`Posiciones (${p.row}, ${p.col}) y (${p.col}, ${p.row}): \(${p.a}\) y \(${p.b}\). Iguales: ${p.symmetric?'sí':'no'}. Opuestos: ${p.skew?'sí':'no'}.`));
   details.append(list);output.append(details,el('p','En la diagonal se compara cada entrada consigo misma. Para ser opuesta a sí misma debe valer cero; esto es necesario, pero no basta sin revisar el resto.'));
  });
 }
 grid.addEventListener('change',event=>{const input=event.target;if(!input.matches('[data-symmetry-entry]'))return;const v=parseMatrixInteger(input.value,-9,9);
  if(v===null){input.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −9 y 9. Se conserva el último valor válido.';return;}
  input.removeAttribute('aria-invalid');matrix[Number(input.dataset.row)][Number(input.dataset.col)]=v;preset.value='custom';status.textContent='Entrada actualizada.';render();
 });
 for(const s of [rows,cols])s.addEventListener('change',()=>{matrix=resizeMatrix(matrix,Number(rows.value),Number(cols.value));preset.value='custom';build();status.textContent='Tamaño actualizado; se conservan posiciones comunes y se añaden ceros.';render();});
 preset.addEventListener('change',()=>{matrix=symmetryPresets[preset.value].matrix.map(r=>[...r]);build();status.textContent='Ejemplo cargado.';render();});
 position.addEventListener('change',render);
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;matrix=generatedSymmetryMatrix(seed,matrix.length,matrix[0].length);preset.value='custom';build();status.textContent='Nueva matriz; se conservan las dimensiones. Su clasificación puede cambiar.';render();});
 build();render();
}
