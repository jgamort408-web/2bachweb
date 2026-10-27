import {matrixTex,resizeMatrix} from '../../../content/models/matrix-basics.js';
import {parseMatrixInteger} from '../../../content/models/matrix-operations.js';
import {determinantDetails,determinantPresets,generatedDeterminantMatrix} from '../../../content/models/determinants.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeDeterminantsExplorer(){
 const root=document.querySelector('[data-determinants]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 let matrix=determinantPresets.two.matrix.map(r=>[...r]);
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of items){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Ejemplo','detPreset',Object.entries(determinantPresets).map(([k,p])=>[k,p.label]));
 const custom=el('option','Datos personalizados');custom.value='custom';custom.disabled=true;preset.append(custom);
 const rows=select('Filas','detRows',[[1,'1'],[2,'2'],[3,'3']]),cols=select('Columnas','detCols',[[1,'1'],[2,'2'],[3,'3']]);
 const generate=el('button','Generar otra matriz');generate.type='button';generate.dataset.generateDet='';controls.append(generate);
 const note=el('p','Edita enteros de −9 a 9 y entre una y tres filas y columnas. Al cambiar dimensiones se conservan casillas comunes y se añaden ceros. Los resultados se calculan sin redondeo con estos valores.');
 const grid=el('div');grid.className='table-scroll';grid.dataset.detGrid='';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor de A, desplazamiento horizontal');
 const status=el('p');status.dataset.detStatus='';status.setAttribute('role','status');
 const termLabel=el('label','Producto que quieres seguir '),term=el('select');term.dataset.detTerm='';termLabel.append(term);
 const output=el('div');output.dataset.detOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,note,grid,status,termLabel,output);
 function build(){
  rows.value=matrix.length;cols.value=matrix[0].length;
  const table=el('table'),head=el('thead'),tr=el('tr');tr.append(el('th','Fila'));
  for(let j=1;j<=matrix[0].length;j++){const th=el('th',String(j));th.scope='col';tr.append(th);}head.append(tr);const body=el('tbody');
  matrix.forEach((row,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);row.forEach((v,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-9;input.max=9;input.step=1;input.value=v;input.dataset.detEntry='';input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label',`A, fila ${i+1}, columna ${j+1}`);td.append(input);tr.append(td);});body.append(tr);});
  table.append(el('caption','Elementos de A'),head,body);grid.replaceChildren(table);
 }
 function render(){
  if(root.querySelector('[aria-invalid="true"]'))status.textContent='Hay entradas inválidas; se conservan sus últimos valores válidos.';
  const a=matrix.map(r=>[...r]),m=determinantDetails(a),previous=term.value;term.replaceChildren();termLabel.hidden=!m.defined;
  m.terms.forEach((t,i)=>{const o=el('option',`Producto ${i+1}: grupo que se ${t.sign===1?'suma':'resta'}`);o.value=i;term.append(o);});if([...term.options].some(o=>o.value===previous))term.value=previous;
  const selected=m.terms[Number(term.value)];
  grid.querySelectorAll('input').forEach(input=>input.classList.toggle('det-selected',!!selected&&selected.positions.some(p=>p.row===Number(input.dataset.row)+1&&p.col===Number(input.dataset.col)+1)));
  return updateMath(output,()=>{
   output.replaceChildren();output.dataset.defined=m.defined;output.dataset.value=m.defined?m.value:'';output.dataset.invertible=m.defined?m.invertible:'';
   output.append(el('p',tex`\[A=${matrixTex(a)}\]`),el('p',`Orden: ${m.rows}×${m.cols}.`));
   if(!m.defined){output.append(el('p',m.reason));return;}
   const bars=matrixTex(a).replaceAll('pmatrix','vmatrix');
   output.append(el('p',tex`\[\det(A)=${bars}=${m.value}\]`));
   output.append(el('p',m.rows===1?'En orden 1, el determinante es la única entrada.':m.rows===2?'Orden 2: producto de la diagonal principal menos producto de la secundaria.':'Orden 3: regla de Sarrus. Tres productos forman el grupo que se suma y otros tres el grupo que se resta.'));
   const detail=el('div');detail.dataset.detDetail='';
   detail.append(el('p',`Producto seleccionado: posiciones ${selected.positions.map(p=>`(${p.row}, ${p.col})`).join(', ')}. Pertenece al grupo que se ${selected.sign===1?'suma':'resta'}.`));
   const expression=t=>t.factors.map(f=>`(${f})`).join(tex`\cdot`);
   detail.append(el('p',tex`\[${expression(selected)}=${selected.product}\]`));output.append(detail);
   const details=el('details');details.dataset.detSteps='';details.append(el('summary','Ver todos los productos y la resta final'));
   const list=el('ol');for(const t of m.terms)list.append(el('li',tex`Grupo que se ${t.sign===1?'suma':'resta'}: \(${expression(t)}=${t.product}\).`));details.append(list);
   if(m.rows>1)details.append(el('p',tex`\[P=${m.positiveSum},\quad Q=${m.negativeSum},\quad \det(A)=P-Q=${m.positiveSum}-(${m.negativeSum})=${m.value}.\]`),el('p','Los nombres de los grupos indican la operación exterior. Sus productos pueden ser negativos: conserva los paréntesis al restar Q.'));
   output.append(details);
   const verdict=el('p',m.invertible?'El determinante es distinto de cero: A tiene inversa. Su signo, positivo o negativo, no cambia esta conclusión.':'El determinante es cero: A no tiene inversa. Esto no significa necesariamente que todas sus entradas sean cero.');verdict.dataset.detVerdict='';output.append(verdict);
   output.append(el('p',m.invertible?`Su rango es ${m.rows}. En un sistema cuadrado Av=b hay una única solución para cada b.`:`Su rango es menor que ${m.rows}. Un sistema Av=b puede no tener solución o tener infinitas; el determinante solo no decide cuál de esos casos ocurre.`));
  });
 }
 grid.addEventListener('change',event=>{const input=event.target;if(!input.matches('[data-det-entry]'))return;const v=parseMatrixInteger(input.value,-9,9);
  if(v===null){input.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −9 y 9. Se conserva el último valor válido.';return;}
  input.removeAttribute('aria-invalid');matrix[Number(input.dataset.row)][Number(input.dataset.col)]=v;preset.value='custom';status.textContent='Entrada actualizada.';render();
 });
 for(const s of [rows,cols])s.addEventListener('change',()=>{matrix=resizeMatrix(matrix,Number(rows.value),Number(cols.value));preset.value='custom';build();status.textContent='Tamaño actualizado; las casillas nuevas valen cero.';render();});
 preset.addEventListener('change',()=>{matrix=determinantPresets[preset.value].matrix.map(r=>[...r]);build();status.textContent='Ejemplo cargado.';render();});
 term.addEventListener('change',render);
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;matrix=generatedDeterminantMatrix(seed,matrix.length,matrix[0].length);preset.value='custom';build();status.textContent='Nueva matriz; se conservan sus dimensiones.';render();});
 build();render();
}
