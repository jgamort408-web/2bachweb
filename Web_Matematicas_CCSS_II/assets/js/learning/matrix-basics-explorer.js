import {presets,classifyMatrix,resizeMatrix,generatedMatrix,matrixTex,typeLabels} from '../../../content/models/matrix-basics.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeMatrixBasicsExplorer(){
 const root=document.querySelector('[data-matrix-explorer]');if(!root)return;
 const $=s=>root.querySelector(s),el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 let matrix=presets.data.map(row=>[...row]),selected=[0,0];
 const controls=el('div');controls.className='actions';
 function select(label,attr,items){const wrap=el('label',label+' '),input=el('select');input.setAttribute(attr,'');for(const [value,text]of items){const option=el('option',text);option.value=value;input.append(option);}wrap.append(input);controls.append(wrap);return input;}
 const preset=select('Ejemplo','data-matrix-preset',[['custom','Personalizada'],['data','Datos de ventas'],['row','Fila'],['column','Columna'],['square','Cuadrada'],['zero','Nula rectangular'],['diagonal','Diagonal'],['scalar','Escalar'],['identity','Identidad']]);
 const rows=select('Filas','data-matrix-rows',[1,2,3,4].map(n=>[n,n])),cols=select('Columnas','data-matrix-cols',[1,2,3,4].map(n=>[n,n]));
 const random=el('button','Generar otros valores');random.type='button';random.dataset.matrixGenerate='';controls.append(random);
 const note=el('p','Edita enteros entre −99 y 99. Al cambiar el orden se conservan las casillas comunes y las nuevas empiezan en cero. La clasificación puede tener varias etiquetas a la vez. Los cambios no se guardan.');
 const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor de matriz, desplazamiento horizontal');grid.dataset.matrixGrid='';
 const status=el('p');status.setAttribute('role','status');status.dataset.matrixStatus='';
 const output=el('div');output.dataset.matrixOutput='';output.setAttribute('aria-live','polite');root.replaceChildren(controls,note,grid,status,output);
 function render(){
  const a=matrix.map(row=>[...row]),[i,j]=selected,m=classifyMatrix(a);
  for(const cell of grid.querySelectorAll('input')){const active=Number(cell.dataset.row)===i&&Number(cell.dataset.col)===j;cell.closest('td').classList.toggle('matrix-selected',active);}
  return updateMath(output,()=>{
   output.replaceChildren(el('p',tex`\[A=${matrixTex(a)}\]`),el('p',tex`Orden: \(${m.rows}\times${m.cols}\). ${m.count} elementos. Casilla seleccionada: \(a_{${i+1}${j+1}}=${a[i][j]}\), fila ${i+1}, columna ${j+1}.`));
   const list=el('ul');for(const [key,label]of Object.entries(typeLabels))if(m[key]){const item=el('li',label);item.dataset.matrixType=key;list.append(item);}output.append(el('p','Tipos que cumple esta matriz:'),list);
   output.append(el('p',m.square?(m.diagonal?(m.scalar?(m.identity?'Los elementos diagonales son 1; fuera de la diagonal son 0.':'Fuera de la diagonal hay ceros y todos los elementos diagonales son iguales.'):'Fuera de la diagonal hay ceros, pero los elementos diagonales no son todos iguales.'):'Es cuadrada, pero hay elementos no nulos fuera de la diagonal.'):'Al no ser cuadrada, no se clasifica como diagonal, escalar ni identidad en este curso.'));
  });
 }
 function build(){
  rows.value=matrix.length;cols.value=matrix[0].length;selected=[Math.min(selected[0],matrix.length-1),Math.min(selected[1],matrix[0].length-1)];status.textContent='';
  const table=el('table'),caption=el('caption','Elementos de A: filas horizontales y columnas verticales'),head=el('thead'),hr=el('tr');hr.append(el('th','Fila'));
  for(let j=0;j<matrix[0].length;j++){const th=el('th',String(j+1));th.scope='col';hr.append(th);}head.append(hr);
  const body=el('tbody');matrix.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);row.forEach((value,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-99;input.max=99;input.step=1;input.value=value;input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label',`Elemento a, fila ${i+1}, columna ${j+1}`);td.append(input);tr.append(td);});body.append(tr);});table.append(caption,head,body);grid.replaceChildren(table);render();
 }
 grid.addEventListener('focusin',e=>{if(e.target.matches('input')){selected=[Number(e.target.dataset.row),Number(e.target.dataset.col)];render();}});
 grid.addEventListener('change',e=>{
  const input=e.target;if(!input.matches('input'))return;
  const value=input.valueAsNumber;
  if(!Number.isInteger(value)||value < -99||value>99){input.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −99 y 99. La matriz calculada conserva el último valor válido de esa casilla.';return;}
  input.removeAttribute('aria-invalid');preset.value='custom';matrix[Number(input.dataset.row)][Number(input.dataset.col)]=value;
  status.textContent=grid.querySelector('[aria-invalid="true"]')?'Quedan casillas inválidas: la matriz calculada conserva sus últimos valores válidos.':'Valor actualizado.';render();
 });
 preset.addEventListener('change',()=>{if(preset.value==='custom')return;matrix=presets[preset.value].map(row=>[...row]);selected=[0,0];build();});
 for(const control of [rows,cols])control.addEventListener('change',()=>{preset.value='custom';matrix=resizeMatrix(matrix,Number(rows.value),Number(cols.value));build();});
 random.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;preset.value='custom';matrix=generatedMatrix(matrix.length,matrix[0].length,seed);build();});
 preset.value='data';build();
}
