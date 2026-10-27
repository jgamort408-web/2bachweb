import {matrixTex,resizeMatrix} from '../../../content/models/matrix-basics.js';
import {parseMatrixInteger} from '../../../content/models/matrix-operations.js';
import {inversePresets,inverseDetails,generatedInverseMatrix,rationalMatrixTex,fractionTex} from '../../../content/models/matrix-inverse.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeMatrixInverseExplorer(){
 const root=document.querySelector('[data-matrix-inverse]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 let matrix=inversePresets.two.matrix.map(r=>[...r]);
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of items){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Ejemplo','invPreset',Object.entries(inversePresets).map(([k,p])=>[k,p.label]));
 const custom=el('option','Datos personalizados');custom.value='custom';custom.disabled=true;preset.append(custom);
 const size=select('Orden','invSize',[[2,'2'],[3,'3']]);
 const row=select('Fila del adjunto que se explica','invRow',[]),col=select('Columna del adjunto que se explica','invCol',[]);
 const generate=el('button','Generar otra matriz');generate.type='button';generate.dataset.invGenerate='';controls.append(generate);
 const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor de A; desplazamiento horizontal');grid.dataset.invGrid='';
 const status=el('p');status.dataset.invStatus='';status.setAttribute('role','status');
 const output=el('div');output.dataset.invOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','Edita A con enteros de −9 a 9. Los resultados se expresan como fracciones exactas. Cambiar el orden conserva las casillas comunes y añade ceros. Una variante puede ser singular.'),grid,status,output);
 function build(){
  size.value=matrix.length;
  for(const s of [row,col]){const old=Number(s.value);s.replaceChildren();for(let k=0;k<matrix.length;k++){const o=el('option',String(k+1));o.value=k;s.append(o);}s.value=old<matrix.length?old:0;}
  const table=el('table'),head=el('thead'),tr=el('tr');tr.append(el('th','Fila'));
  for(let j=1;j<=matrix.length;j++){const th=el('th',String(j));th.scope='col';tr.append(th);}head.append(tr);const body=el('tbody');
  matrix.forEach((r,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);r.forEach((v,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-9;input.max=9;input.step=1;input.value=v;input.dataset.invEntry='';input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label',`A, fila ${i+1}, columna ${j+1}`);td.append(input);tr.append(td);});body.append(tr);});
  table.append(el('caption','Matriz A'),head,body);grid.replaceChildren(table);
 }
 function render(){
  const a=matrix.map(r=>[...r]),i=Number(row.value),j=Number(col.value),m=inverseDetails(a),t=m.terms[i][j];
  grid.querySelectorAll('td').forEach(td=>{const input=td.firstChild;td.classList.toggle('inv-retained',Number(input.dataset.row)!==i&&Number(input.dataset.col)!==j);});
  return updateMath(output,()=>{
   output.replaceChildren();output.dataset.det=m.det;output.dataset.invertible=m.invertible;output.dataset.row=i;output.dataset.col=j;output.dataset.matrix=JSON.stringify(a);
   output.append(el('p',tex`\(\det(A)=${m.det}\). ${m.invertible?'Existe una única inversa.':'A es singular: no tiene inversa. La adjunta sí está definida.'}`));
   const detail=el('div');detail.dataset.invDetail='';
   detail.append(el('p',`Adjunto C de posición (${i+1}, ${j+1}): eliminamos la fila ${i+1} y la columna ${j+1}. Las entradas que quedan tienen contorno.`),
    el('p',tex`Submatriz restante: \[${matrixTex(t.minorMatrix)}\]`),
    el('p',tex`\(M_{${i+1}${j+1}}=${t.minor}\), \((-1)^{${i+1}+${j+1}}=${t.sign}\), \(C_{${i+1}${j+1}}=${t.cofactor}\).`),
    el('p',tex`Al trasponer C, este ${t.cofactor} pasa a la posición (${j+1}, ${i+1}) de \(\operatorname{Adj}(A)\).`));
   if(m.invertible)detail.append(el('p',tex`En esa misma posición de la inversa: \((A^{-1})_{${j+1}${i+1}}=\frac{${t.cofactor}}{${m.det}}=${fractionTex(m.inverse[j][i])}\).`));
   output.append(detail,el('p',tex`Matriz de cofactores: \[C=${matrixTex(m.cofactors)}.\]`),el('p',tex`Adjunta, según nuestra convención: \[\operatorname{Adj}(A)=C^T=${matrixTex(m.adjugate)}.\]`));
   const checks=el('details');checks.dataset.invChecks='';checks.append(el('summary','Comprobar los productos en ambos órdenes'));
   checks.append(el('p',tex`\[A\operatorname{Adj}(A)=${matrixTex(m.left)},\]`),el('p',tex`\[\operatorname{Adj}(A)A=${matrixTex(m.right)}.\]`),el('p',tex`Ambos productos son \(\det(A)I=${m.det}I\).`));
   if(m.invertible){
    const inverse=el('div');inverse.dataset.invResult='';inverse.append(el('p',tex`Dividimos cada entrada de la adjunta entre el determinante: \[A^{-1}=${rationalMatrixTex(m.inverse)}.\]`));output.append(inverse);
    checks.append(el('p',tex`Al dividir los productos anteriores entre ${m.det}: \[AA^{-1}=${rationalMatrixTex(m.leftIdentity)}=I,\]`),el('p',tex`\[A^{-1}A=${rationalMatrixTex(m.rightIdentity)}=I.\]`));
   }else checks.append(el('p','Los productos dan la matriz cero, no la identidad. No podemos dividir entre el determinante cero para obtener una inversa. Esto no decide por sí solo cuántas soluciones tiene un sistema con A.'));
   output.append(checks);
  });
 }
 grid.addEventListener('change',e=>{const input=e.target;if(!input.matches('[data-inv-entry]'))return;const v=parseMatrixInteger(input.value,-9,9);if(v===null){input.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −9 y 9; se conserva el último valor válido.';return;}input.removeAttribute('aria-invalid');matrix[Number(input.dataset.row)][Number(input.dataset.col)]=v;preset.value='custom';status.textContent=grid.querySelector('[aria-invalid]')?'Quedan entradas inválidas; se mantienen sus últimos valores válidos.':'Matriz actualizada.';render();});
 for(const s of [row,col])s.addEventListener('change',render);
 preset.addEventListener('change',()=>{matrix=inversePresets[preset.value].matrix.map(r=>[...r]);build();status.textContent='Ejemplo cargado.';render();});
 size.addEventListener('change',()=>{matrix=resizeMatrix(matrix,Number(size.value),Number(size.value));preset.value='custom';build();status.textContent='Orden actualizado.';render();});
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;matrix=generatedInverseMatrix(seed,matrix.length);preset.value='custom';build();status.textContent='Nueva variante.';render();});
 build();render();
}
