import {matrixTex,resizeMatrix} from '../../../content/models/matrix-basics.js';
import {matrixOperation,operationSession,parseMatrixInteger,operationLabels} from '../../../content/models/matrix-operations.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeMatrixOperationsExplorer(){
 const root=document.querySelector('[data-matrix-operations]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 const matrices={a:[[2,-1],[0,3]],b:[[4,2],[-2,1]]};let alpha=2,beta=-1;
 const controls=el('div');controls.className='actions';
 const opLabel=el('label','Operación '),op=el('select');op.dataset.operation='';
 for(const [id,label]of Object.entries(operationLabels)){const item=el('option',label);item.value=id;op.append(item);}opLabel.append(op);controls.append(opLabel);
 function scalar(label,attr,value){
  const wrap=el('label',label+' '),input=el('input');input.type='number';input.min=-5;input.max=5;input.step=1;input.value=value;input.dataset[attr]='';wrap.append(input);controls.append(wrap);return {wrap,input};
 }
 const first=scalar('Escalar α','alpha',alpha),second=scalar('Escalar β','beta',beta);
 const random=el('button','Generar otros datos');random.type='button';random.dataset.generateOperations='';controls.append(random);
 const note=el('p','Edita enteros de −20 a 20 y escalares de −5 a 5. Puedes elegir entre una y tres filas y columnas para cada matriz. Cambiar el tamaño conserva las casillas comunes y añade ceros; no se guarda el trabajo.');
 const panels=el('div'),status=el('p'),output=el('div');status.dataset.operationsStatus='';status.setAttribute('role','status');output.dataset.operationsOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,note,panels,status,output);const editors={};
 for(const id of ['a','b']){
  const panel=el('fieldset');panel.dataset.editor=id;panel.append(el('legend','Matriz '+id.toUpperCase()));const dims=el('div');dims.className='actions';
  const selectors={};
  for(const dim of ['rows','cols']){const label=el('label',(dim==='rows'?'Filas':'Columnas')+' de '+id.toUpperCase()+' '),select=el('select');select.dataset.matrix=id;select.dataset.dimension=dim;for(const n of [1,2,3]){const option=el('option',String(n));option.value=n;select.append(option);}select.value=2;label.append(select);dims.append(label);selectors[dim]=select;}
  const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor de '+id.toUpperCase()+', desplazamiento horizontal');grid.dataset.operationsGrid=id;panel.append(dims,grid);panels.append(panel);editors[id]={panel,grid,...selectors};
  for(const select of Object.values(selectors))select.addEventListener('change',()=>{matrices[id]=resizeMatrix(matrices[id],Number(selectors.rows.value),Number(selectors.cols.value));build(id);status.textContent='Tamaño actualizado; las casillas nuevas valen cero.';render();});
 }
 function build(id){
  const {grid}=editors[id],matrix=matrices[id],table=el('table'),caption=el('caption','Elementos de '+id.toUpperCase()),head=el('thead'),tr=el('tr');tr.append(el('th','Fila'));
  for(let j=0;j<matrix[0].length;j++){const th=el('th',String(j+1));th.scope='col';tr.append(th);}head.append(tr);const body=el('tbody');
  matrix.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);row.forEach((v,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-20;input.max=20;input.step=1;input.value=v;input.dataset.cell=id;input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label',`${id.toUpperCase()}, fila ${i+1}, columna ${j+1}`);td.append(input);tr.append(td);});body.append(tr);});table.append(caption,head,body);grid.replaceChildren(table);
 }
 function render(){
  if(root.querySelector('[aria-invalid="true"]'))status.textContent='Hay entradas inválidas; se conservan sus últimos valores válidos. Revisa las casillas señaladas.';
  const mode=op.value,useA=mode==='scale'||mode==='combine',useB=mode==='combine';
  first.wrap.hidden=!useA;second.wrap.hidden=!useB;editors.b.panel.hidden=mode==='scale';
  const a=matrices.a.map(r=>[...r]),b=matrices.b.map(r=>[...r]),model=matrixOperation(a,b,mode,alpha,beta);
  return updateMath(output,()=>{
   output.replaceChildren();output.dataset.compatible=model.compatible;
   if(!model.compatible){output.append(el('p',model.reason),el('p',tex`\[A=${matrixTex(a)},\qquad B=${matrixTex(b)}\]`));return;}
   const operation=mode==='add'?'A+B':mode==='subtract'?'A-B':mode==='scale'?tex`(${alpha})A`:tex`(${alpha})A+(${beta})B`;
   output.append(el('p',tex`\[R=${operation}=${matrixTex(model.result)}\]`),el('p',tex`El resultado tiene orden \(${model.rows}\times${model.cols}\).`));
   if(mode==='scale')output.append(el('p','Solo interviene A. El escalar multiplica todas sus entradas y conserva su orden.'));
   else output.append(el('p','Se combinan las mismas posiciones. En una aplicación, comprueba además etiquetas y unidades compatibles.'));
   const details=el('details'),summary=el('summary','Ver el cálculo de cada elemento');details.dataset.operationsSteps='';details.append(summary);
   const list=el('ol');
   for(const s of model.steps){
    const expression=mode==='add'?tex`(${s.a})+(${s.b})`:mode==='subtract'?tex`(${s.a})-(${s.b})`:mode==='scale'?tex`(${alpha})(${s.a})`:tex`(${alpha})(${s.a})+(${beta})(${s.b})`;
    list.append(el('li',tex`\(r_{${s.row}${s.col}}=${expression}=${s.value}\).`));
   }details.append(list);output.append(details);
  });
 }
 root.addEventListener('change',event=>{
  const input=event.target;
  if(input.matches('[data-cell]')){
   const v=parseMatrixInteger(input.value);
   if(v===null){input.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −20 y 20. Se conserva el último valor válido en el cálculo.';return;}
   input.removeAttribute('aria-invalid');matrices[input.dataset.cell][Number(input.dataset.row)][Number(input.dataset.col)]=v;status.textContent='Entrada actualizada.';render();
  }else if(input===first.input||input===second.input){
   const v=parseMatrixInteger(input.value,-5,5);if(v===null){input.setAttribute('aria-invalid','true');status.textContent='Introduce un escalar entero entre −5 y 5. Se conserva el último valor válido.';return;}
   input.removeAttribute('aria-invalid');if(input===first.input)alpha=v;else beta=v;status.textContent='Escalar actualizado.';render();
  }
 });
 op.addEventListener('change',()=>render());
 random.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0],next=operationSession(seed,matrices.a.length,matrices.a[0].length,matrices.b.length,matrices.b[0].length);root.dataset.seed=seed;matrices.a=next.a;matrices.b=next.b;build('a');build('b');status.textContent='Nuevos datos; se conservan dimensiones, operación y escalares.';render();});
 build('a');build('b');render();
}
