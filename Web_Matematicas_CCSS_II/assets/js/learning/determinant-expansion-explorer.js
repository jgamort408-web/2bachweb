import {matrixTex,resizeMatrix} from '../../../content/models/matrix-basics.js';
import {parseMatrixInteger} from '../../../content/models/matrix-operations.js';
import {expansionPresets,expandDeterminant,generatedExpansionMatrix} from '../../../content/models/determinant-expansion.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeDeterminantExpansionExplorer(){
 const root=document.querySelector('[data-det-expansion]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 let matrix=expansionPresets.three.matrix.map(r=>[...r]);
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of items){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Ejemplo','expPreset',Object.entries(expansionPresets).map(([k,p])=>[k,p.label]));
 const custom=el('option','Datos personalizados');custom.value='custom';custom.disabled=true;preset.append(custom);
 const size=select('Orden','expSize',[[2,'2'],[3,'3'],[4,'4']]);
 const axis=select('Desarrollar por','expAxis',[['rows','Fila'],['cols','Columna']]);
 const index=select('Número de fila o columna','expIndex',[]),term=select('Término que se explica','expTerm',[]);
 const generate=el('button','Generar otra matriz');generate.type='button';generate.dataset.expGenerate='';controls.append(generate);
 const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor de matriz; desplazamiento horizontal');grid.dataset.expGrid='';
 const status=el('p');status.dataset.expStatus='';status.setAttribute('role','status');
 const output=el('div');output.dataset.expOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','Introduce enteros entre −9 y 9. Cambiar el orden conserva las casillas comunes y añade ceros. Cada desarrollo usa la matriz actual; no se guardan intentos.'),grid,status,output);
 function build(){
  size.value=matrix.length;
  for(const s of [index,term]){const old=Number(s.value);s.replaceChildren();for(let k=0;k<matrix.length;k++){const o=el('option',String(k+1));o.value=k;s.append(o);}s.value=old<matrix.length?old:0;}
  const table=el('table'),head=el('thead'),tr=el('tr');tr.append(el('th','Fila'));
  for(let j=1;j<=matrix.length;j++){const th=el('th',String(j));th.scope='col';tr.append(th);}head.append(tr);const body=el('tbody');
  matrix.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);row.forEach((v,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-9;input.max=9;input.step=1;input.value=v;input.dataset.expEntry='';input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label',`A, fila ${i+1}, columna ${j+1}`);td.append(input);tr.append(td);});body.append(tr);});
  table.append(el('caption','Matriz A'),head,body);grid.replaceChildren(table);
 }
 function render(){
  const a=matrix.map(r=>[...r]),direction=axis.value,position=Number(index.value),choice=Number(term.value),m=expandDeterminant(a,direction,position),t=m.terms[choice];
  grid.querySelectorAll('td').forEach(td=>{const input=td.firstChild,i=Number(input.dataset.row),j=Number(input.dataset.col);td.classList.toggle('exp-retained',i!==t.row-1&&j!==t.col-1);});
  return updateMath(output,()=>{
   output.replaceChildren();output.dataset.value=m.value;output.dataset.axis=direction;output.dataset.index=position;output.dataset.term=choice;
   output.append(el('p',`Desarrollo por ${direction==='rows'?'fila':'columna'} ${position+1}. Hay ${m.nonzero} coeficientes distintos de cero; los demás no aportan al resultado.`));
   const detail=el('div');detail.dataset.expDetail='';
   detail.append(el('p',`Término ${choice+1}: posición (${t.row}, ${t.col}). Se elimina la fila ${t.row} y la columna ${t.col}. Las casillas que quedan llevan contorno en el editor.`));
   detail.append(el('p',tex`Submatriz restante: \[${matrixTex(t.minorMatrix)}\]`));
   detail.append(el('p',tex`Menor: \(M_{${t.row}${t.col}}=${t.minor}\). Signo de posición: \((-1)^{${t.row}+${t.col}}=${t.sign}\).`));
   detail.append(el('p',tex`Adjunto: \(C_{${t.row}${t.col}}=(${t.sign})(${t.minor})=${t.cofactor}\). Aportación: \((${t.entry})(${t.cofactor})=${t.product}\).`));
   if(t.entry===0)detail.append(el('p','El coeficiente es cero: su aportación es cero aunque su menor o adjunto puedan ser distintos de cero.'));
   if(a.length===4){const child=expandDeterminant(t.minorMatrix);detail.append(el('p',tex`Para calcular este menor 3×3, desarrollamos su primera fila: \[M_{${t.row}${t.col}}=${child.terms.map(x=>`(${x.entry})(${x.cofactor})`).join('+')}=${child.value}.\]`));}
   output.append(detail,el('p',tex`Suma de todos los términos de la línea elegida: \[\det(A)=${m.terms.map(x=>`(${x.entry})(${x.cofactor})`).join('+')}=${m.value}.\]`),el('p','Prueba otra fila o columna: cambia el desarrollo, pero no el determinante. Los signos de posición se calculan con la fila y la columna originales, no reiniciando la secuencia en cada línea.'));
  });
 }
 grid.addEventListener('change',e=>{const input=e.target;if(!input.matches('[data-exp-entry]'))return;const v=parseMatrixInteger(input.value,-9,9);if(v===null){input.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −9 y 9; se conserva el último valor válido.';return;}input.removeAttribute('aria-invalid');matrix[Number(input.dataset.row)][Number(input.dataset.col)]=v;preset.value='custom';status.textContent=grid.querySelector('[aria-invalid]')?'Quedan entradas inválidas; se conservan sus últimos valores válidos.':'Matriz actualizada.';render();});
 for(const s of [axis,index,term])s.addEventListener('change',render);
 preset.addEventListener('change',()=>{matrix=expansionPresets[preset.value].matrix.map(r=>[...r]);build();status.textContent='Ejemplo cargado.';render();});
 size.addEventListener('change',()=>{matrix=resizeMatrix(matrix,Number(size.value),Number(size.value));preset.value='custom';build();status.textContent='Orden actualizado.';render();});
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;matrix=generatedExpansionMatrix(seed,matrix.length);preset.value='custom';build();status.textContent='Nueva variante.';render();});
 build();render();
}
