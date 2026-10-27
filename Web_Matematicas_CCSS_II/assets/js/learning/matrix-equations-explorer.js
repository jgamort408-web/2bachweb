import {matrixTex,resizeMatrix} from '../../../content/models/matrix-basics.js';
import {transpose} from '../../../content/models/matrix-symmetry.js';
import {parseMatrixInteger} from '../../../content/models/matrix-operations.js';
import {equationPresets,solveMatrixEquation,generatedEquation} from '../../../content/models/matrix-equations.js';
import {rationalMatrixTex} from '../../../content/models/matrix-inverse.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeMatrixEquationsExplorer(){
 const root=document.querySelector('[data-matrix-equations]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 let a=equationPresets.left.a.map(r=>[...r]),b=equationPresets.left.b.map(r=>[...r]),k=0;
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of items){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Ejemplo','eqPreset',Object.entries(equationPresets).map(([key,p])=>[key,p.label]));
 const custom=el('option','Datos personalizados');custom.value='custom';custom.disabled=true;preset.append(custom);
 const side=select('Ecuación','eqSide',[['left','AX + kX = B'],['right','XA + kX = B']]);
 const size=select('Orden de A','eqSize',[[2,'2'],[3,'3']]),width=select('Columnas de B (izquierda) o filas de B (derecha)','eqWidth',[[1,'1'],[2,'2'],[3,'3']]);
 const label=el('label','Escalar k '),scalar=el('input');scalar.type='number';scalar.min=-3;scalar.max=3;scalar.step=1;scalar.value=0;scalar.dataset.eqScalar='';label.append(scalar);controls.append(label);
 const generate=el('button','Generar otra pareja');generate.type='button';generate.dataset.eqGenerate='';controls.append(generate);
 const grids=el('div');grids.dataset.eqGrids='';
 const status=el('p');status.dataset.eqStatus='';status.setAttribute('role','status');
 const output=el('div');output.dataset.eqOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','A admite enteros de −6 a 6; B de −9 a 9; k de −3 a 3. Con k=0 se obtienen AX=B o XA=B. Al cambiar de lado se traspone B para mantener las dimensiones; se plantea otra ecuación. Cambiar tamaño conserva casillas comunes y añade ceros.'),grids,status,output);
 function build(){
  size.value=a.length;width.value=side.value==='left'?b[0].length:b.length;grids.replaceChildren();
  for(const [name,matrix,bound]of [['A',a,6],['B',b,9]]){
   const region=el('div');region.className='table-scroll';region.tabIndex=0;region.setAttribute('role','region');region.setAttribute('aria-label','Editor de '+name+'; desplazamiento horizontal');
   const table=el('table'),head=el('thead'),tr=el('tr');tr.append(el('th','Fila'));
   for(let j=1;j<=matrix[0].length;j++){const th=el('th',String(j));th.scope='col';tr.append(th);}head.append(tr);const body=el('tbody');
   matrix.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);row.forEach((v,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-bound;input.max=bound;input.step=1;input.value=v;input.dataset.eqEntry=name;input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label',`${name}, fila ${i+1}, columna ${j+1}`);td.append(input);tr.append(td);});body.append(tr);});
   table.append(el('caption','Matriz '+name),head,body);region.append(table);grids.append(region);
  }
 }
 function render(){
  const direction=side.value,scalarValue=k,m=solveMatrixEquation(a,b,{side:direction,k}),snapshot=JSON.stringify({a,b,k,side:direction}),rhs=b.map(r=>[...r]);
  return updateMath(output,()=>{
   output.replaceChildren();output.dataset.status=m.status;output.dataset.snapshot=snapshot;output.dataset.det=m.det??'';
   const original=direction==='left'?tex`AX+(${scalarValue})X=B`:tex`XA+(${scalarValue})X=B`;
   output.append(el('p',tex`Ecuación original: \(${original}\).`),el('p',`Dimensiones de X: ${rhs.length} × ${rhs[0].length}, igual que B.`));
   if(m.status==='incompatible'){output.append(el('p',m.reason));return;}
   output.append(el('p',tex`Agrupamos con \(M=A+kI\): \[M=${matrixTex(m.coefficient)},\qquad\det(M)=${m.det}.\]`));
   if(m.status==='singular'){output.append(el('p',m.reason),el('p','Que A tenga inversa no basta: hay que comprobar A+kI. No se divide entre el determinante cero ni se concluye automáticamente que no hay solución.'));return;}
   output.append(el('p',direction==='left'?tex`\(MX=B\). Multiplicamos por \(M^{-1}\) a la izquierda: \(X=M^{-1}B\).`:tex`\(XM=B\). Multiplicamos por \(M^{-1}\) a la derecha: \(X=BM^{-1}\).`),el('p',tex`\[M^{-1}=${rationalMatrixTex(m.inverse)}.\]`));
   const solution=el('div');solution.dataset.eqSolution='';solution.append(el('p',tex`Solución única: \[X=${rationalMatrixTex(m.solution)}.\]`));output.append(solution);
   const check=el('details');check.dataset.eqCheck='';check.append(el('summary','Comprobar en la ecuación original'));
   check.append(el('p',tex`Sustituimos X, respetando el orden y el término con k: \[${direction==='left'?'AX':'XA'}+(${scalarValue})X=${rationalMatrixTex(m.check)}=${matrixTex(rhs)}=B.\]`),el('p',m.verified?'La igualdad se cumple en todas las entradas, con fracciones exactas.':'La comprobación no coincide.'));output.append(check);
  });
 }
 grids.addEventListener('change',e=>{const input=e.target;if(!input.matches('[data-eq-entry]'))return;const name=input.dataset.eqEntry,bound=name==='A'?6:9,v=parseMatrixInteger(input.value,-bound,bound);if(v===null){input.setAttribute('aria-invalid','true');status.textContent=`Introduce un entero entre −${bound} y ${bound}; se conserva el último valor válido.`;return;}input.removeAttribute('aria-invalid');(name==='A'?a:b)[Number(input.dataset.row)][Number(input.dataset.col)]=v;preset.value='custom';status.textContent=root.querySelector('[aria-invalid]')?'Quedan entradas inválidas; se mantienen los últimos valores válidos.':'Datos actualizados.';render();});
 scalar.addEventListener('change',()=>{const v=parseMatrixInteger(scalar.value,-3,3);if(v===null){scalar.setAttribute('aria-invalid','true');status.textContent='Introduce k entero entre −3 y 3; se conserva el último valor válido.';return;}scalar.removeAttribute('aria-invalid');k=v;preset.value='custom';status.textContent='Escalar actualizado.';render();});
 side.addEventListener('change',()=>{b=transpose(b);preset.value='custom';build();status.textContent='B se ha traspuesto: se ha planteado otra ecuación.';render();});
 for(const s of [size,width])s.addEventListener('change',()=>{const n=Number(size.value),q=Number(width.value);a=resizeMatrix(a,n,n);b=resizeMatrix(b,side.value==='left'?n:q,side.value==='left'?q:n);preset.value='custom';build();status.textContent='Dimensiones actualizadas.';render();});
 preset.addEventListener('change',()=>{const p=equationPresets[preset.value];a=p.a.map(r=>[...r]);b=p.b.map(r=>[...r]);side.value=p.side;k=p.k;scalar.value=k;scalar.removeAttribute('aria-invalid');build();status.textContent='Ejemplo cargado.';render();});
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;({a,b}=generatedEquation(seed,a.length,Number(width.value),side.value));preset.value='custom';build();status.textContent='Nueva pareja; se conservan lado y escalar. Puede resultar singular.';render();});
 build();render();
}
