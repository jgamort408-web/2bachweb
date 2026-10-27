import {matrixTex,resizeMatrix,generatedMatrix} from '../../../content/models/matrix-basics.js';
import {parseMatrixInteger} from '../../../content/models/matrix-operations.js';
import {multiplyMatrices,productPresets} from '../../../content/models/matrix-product.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeMatrixProductExplorer(){
 const root=document.querySelector('[data-matrix-product]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 const clone=a=>a.map(r=>[...r]);const matrices={a:clone(productPresets.rectangular.a),b:clone(productPresets.rectangular.b)};
 const controls=el('div');controls.className='actions';
 function selector(label,attr,items){const wrap=el('label',label+' '),s=el('select');s.dataset[attr]='';for(const [value,text]of items){const o=el('option',text);o.value=value;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=selector('Ejemplo','productPreset',Object.entries(productPresets).map(([key,v])=>[key,v.label]));
 const custom=el('option','Datos personalizados');custom.value='custom';custom.disabled=true;preset.append(custom);
 const order=selector('Orden de los factores','productOrder',[['ab','AB'],['ba','BA']]);
 const random=el('button','Generar otros datos');random.type='button';random.dataset.generateProduct='';controls.append(random);
 const note=el('p','Edita enteros de −20 a 20. Cada matriz admite entre una y tres filas y columnas. Cambiar dimensiones conserva casillas comunes y añade ceros. No se guarda el trabajo.');
 const panels=el('div'),status=el('p'),output=el('div');status.dataset.productStatus='';status.setAttribute('role','status');output.dataset.productOutput='';output.setAttribute('aria-live','polite');
 const cellLabel=el('label','Elemento del resultado '),cell=el('select');cell.dataset.productCell='';cellLabel.append(cell);
 root.replaceChildren(controls,note,panels,status,cellLabel,output);const editors={};
 for(const id of ['a','b']){
  const panel=el('fieldset');panel.dataset.editor=id;panel.append(el('legend','Matriz '+id.toUpperCase()));const dims=el('div');dims.className='actions';const selectors={};
  for(const dim of ['rows','cols']){
   const label=el('label',(dim==='rows'?'Filas':'Columnas')+' de '+id.toUpperCase()+' '),select=el('select');select.dataset.matrix=id;select.dataset.dimension=dim;
   for(const n of [1,2,3]){const option=el('option',String(n));option.value=n;select.append(option);}label.append(select);dims.append(label);selectors[dim]=select;
   select.addEventListener('change',()=>{matrices[id]=resizeMatrix(matrices[id],Number(selectors.rows.value),Number(selectors.cols.value));preset.value='custom';build(id);status.textContent='Tamaño actualizado; las casillas nuevas valen cero.';render();});
  }
  const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor de '+id.toUpperCase()+', desplazamiento horizontal');grid.dataset.productGrid=id;panel.append(dims,grid);panels.append(panel);editors[id]={grid,...selectors};
 }
 function build(id){
  const matrix=matrices[id],{grid,rows,cols}=editors[id];rows.value=matrix.length;cols.value=matrix[0].length;
  const table=el('table'),caption=el('caption','Elementos de '+id.toUpperCase()),head=el('thead'),tr=el('tr');tr.append(el('th','Fila'));
  for(let j=0;j<matrix[0].length;j++){const th=el('th',String(j+1));th.scope='col';tr.append(th);}head.append(tr);const body=el('tbody');
  matrix.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);row.forEach((v,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-20;input.max=20;input.step=1;input.value=v;input.dataset.cell=id;input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label',`${id.toUpperCase()}, fila ${i+1}, columna ${j+1}`);td.append(input);tr.append(td);});body.append(tr);});table.append(caption,head,body);grid.replaceChildren(table);
 }
 function render(){
  if(root.querySelector('[aria-invalid="true"]'))status.textContent='Hay entradas inválidas; se conservan sus últimos valores válidos. Revisa las casillas señaladas.';
  const first=order.value==='ab'?'a':'b',second=first==='a'?'b':'a',a=clone(matrices[first]),b=clone(matrices[second]),m=multiplyMatrices(a,b),name=order.value.toUpperCase();
  const previous=cell.value;cell.replaceChildren();cellLabel.hidden=!m.compatible;
  if(m.compatible){for(const s of m.steps){const o=el('option',`Fila ${s.row}, columna ${s.col}`);o.value=`${s.row},${s.col}`;cell.append(o);}if([...cell.options].some(o=>o.value===previous))cell.value=previous;}
  const selected=m.steps.find(s=>`${s.row},${s.col}`===cell.value);
  root.querySelectorAll('[data-cell]').forEach(input=>input.classList.toggle('product-selected',!!selected&&((input.dataset.cell===first&&Number(input.dataset.row)===selected.row-1)||(input.dataset.cell===second&&Number(input.dataset.col)===selected.col-1))));
  return updateMath(output,()=>{
   output.replaceChildren();output.dataset.compatible=m.compatible;
   output.append(el('p',tex`\(${first.toUpperCase()}:\ ${m.orderA.rows}\times${m.orderA.cols},\quad ${second.toUpperCase()}:\ ${m.orderB.rows}\times${m.orderB.cols}\).`));
   if(!m.compatible){output.append(el('p',m.reason));return;}
   output.append(el('p',tex`\[C=${name}=${matrixTex(a)}${matrixTex(b)}=${matrixTex(m.result)}\]`),el('p',tex`El resultado tiene orden \(${m.rows}\times${m.cols}\). Se suman ${m.orderA.cols} productos en cada casilla.`));
   const detail=el('div');detail.dataset.productDetail='';
   detail.append(el('p',`Casilla (${selected.row}, ${selected.col}): fila ${selected.row} de ${first.toUpperCase()} y columna ${selected.col} de ${second.toUpperCase()}. Están señaladas en los editores.`));
   const expression=s=>s.terms.map(t=>tex`(${t.left})\cdot(${t.right})`).join('+');
   detail.append(el('p',tex`\[c_{${selected.row}${selected.col}}=${expression(selected)}=${selected.value}\]`));output.append(detail);
   const details=el('details');details.dataset.productSteps='';details.append(el('summary','Ver todos los cálculos'));const list=el('ol');
   for(const s of m.steps)list.append(el('li',tex`\(c_{${s.row}${s.col}}=${expression(s)}=${s.value}\).`));details.append(list);output.append(details);
   if(preset.value==='sales')output.append(el('p','AB expresa ingresos: filas Norte y Sur; una columna en euros. BA no está definido. Los precios siguen el orden cuadernos, carpetas y bolígrafos.'));
  });
 }
 root.addEventListener('change',event=>{
  const input=event.target;if(!input.matches('[data-cell]'))return;const n=parseMatrixInteger(input.value);
  if(n===null){input.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −20 y 20. Se conserva el último valor válido en el cálculo.';return;}
  input.removeAttribute('aria-invalid');matrices[input.dataset.cell][Number(input.dataset.row)][Number(input.dataset.col)]=n;preset.value='custom';status.textContent='Entrada actualizada.';render();
 });
 preset.addEventListener('change',()=>{const p=productPresets[preset.value];if(!p)return;matrices.a=clone(p.a);matrices.b=clone(p.b);order.value='ab';build('a');build('b');status.textContent='Ejemplo cargado.';render();});
 order.addEventListener('change',()=>{status.textContent='Orden cambiado. Comprueba de nuevo las dimensiones.';render();});
 cell.addEventListener('change',render);
 random.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;matrices.a=generatedMatrix(matrices.a.length,matrices.a[0].length,seed);matrices.b=generatedMatrix(matrices.b.length,matrices.b[0].length,(seed+2654435761)>>>0);preset.value='custom';build('a');build('b');status.textContent='Nuevos datos; se conservan dimensiones y orden de factores.';render();});
 build('a');build('b');render();
}
