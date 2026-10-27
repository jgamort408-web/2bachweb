import {matrixTex,resizeMatrix} from '../../../content/models/matrix-basics.js';
import {parseMatrixInteger} from '../../../content/models/matrix-operations.js';
import {rankPresets,rankDetails,generatedRankMatrix} from '../../../content/models/matrix-rank.js';
import {rationalMatrixTex,fractionTex} from '../../../content/models/matrix-inverse.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeMatrixRankExplorer(){
 const root=document.querySelector('[data-matrix-rank]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 let matrix=rankPresets.dependent.matrix.map(r=>[...r]),model;
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of items){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Ejemplo','rankPreset',Object.entries(rankPresets).map(([k,p])=>[k,p.label]));
 const custom=el('option','Datos personalizados');custom.value='custom';custom.disabled=true;preset.append(custom);
 const rows=select('Filas','rankRows',[[1,'1'],[2,'2'],[3,'3']]),cols=select('Columnas','rankCols',[[1,'1'],[2,'2'],[3,'3'],[4,'4']]);
 const order=select('Orden del menor','rankOrder',[]),minor=select('Filas y columnas del menor','rankMinor',[]);
 const generate=el('button','Generar otra matriz');generate.type='button';generate.dataset.rankGenerate='';controls.append(generate);
 const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Editor de A; desplazamiento horizontal');grid.dataset.rankGrid='';
 const status=el('p');status.dataset.rankStatus='';status.setAttribute('role','status');
 const output=el('div');output.dataset.rankOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','Edita con enteros de −9 a 9. Puedes usar de 1 a 3 filas y de 1 a 4 columnas. Cambiar las dimensiones conserva las casillas comunes y añade ceros. El rango también existe para matrices rectangulares.'),grid,status,output);
 function minorOptions(preferWitness=false){
  const list=model.levels[Number(order.value)-1].minors,old=Number(minor.value);minor.replaceChildren();
  list.forEach((m,k)=>{const o=el('option',`Filas ${m.rows.join(', ')}; columnas ${m.cols.join(', ')}`);o.value=k;minor.append(o);});
  const witness=list.findIndex(m=>m.value!==0);minor.value=preferWitness&&witness>=0?witness:old<list.length?old:0;
 }
 function rebuildModel(preferWitness=false){
  model=rankDetails(matrix);const old=Number(order.value);order.replaceChildren();
  for(let k=1;k<=model.limit;k++){const o=el('option',String(k));o.value=k;order.append(o);}
  order.value=preferWitness?Math.max(1,model.rank):Math.max(1,Math.min(old,model.limit));minorOptions(preferWitness);
 }
 function build(){
  rows.value=matrix.length;cols.value=matrix[0].length;
  const table=el('table'),head=el('thead'),tr=el('tr');tr.append(el('th','Fila'));
  for(let j=1;j<=matrix[0].length;j++){const th=el('th',String(j));th.scope='col';tr.append(th);}head.append(tr);const body=el('tbody');
  matrix.forEach((r,i)=>{const tr=el('tr'),th=el('th',String(i+1));th.scope='row';tr.append(th);r.forEach((v,j)=>{const td=el('td'),input=el('input');input.type='number';input.min=-9;input.max=9;input.step=1;input.value=v;input.dataset.rankEntry='';input.dataset.row=i;input.dataset.col=j;input.setAttribute('aria-label',`A, fila ${i+1}, columna ${j+1}`);td.append(input);tr.append(td);});body.append(tr);});
  table.append(el('caption','Matriz A'),head,body);grid.replaceChildren(table);rebuildModel(true);
 }
 function render(){
  const m=model,k=Number(order.value),choice=Number(minor.value),selected=m.levels[k-1].minors[choice],snapshot=JSON.stringify(matrix);
  grid.querySelectorAll('td').forEach(td=>{const input=td.firstChild;td.classList.toggle('rank-selected',selected.rows.includes(Number(input.dataset.row)+1)&&selected.cols.includes(Number(input.dataset.col)+1));});
  return updateMath(output,()=>{
   output.replaceChildren();output.dataset.rank=m.rank;output.dataset.order=k;output.dataset.minor=choice;output.dataset.matrix=snapshot;
   output.append(el('p',tex`A tiene ${m.rows} filas y ${m.cols} columnas. \(\operatorname{rg}(A)=${m.rank}\), con máximo posible ${m.limit}.`));
   const detail=el('div');detail.dataset.rankDetail='';
   detail.append(el('p',`Menor de orden ${k}: filas ${selected.rows.join(', ')} y columnas ${selected.cols.join(', ')}. Las casillas incluidas tienen contorno.`),el('p',tex`Submatriz: \[${matrixTex(selected.matrix)}.\]`),el('p',tex`Su determinante es \(${selected.value}\).`),el('p',selected.value!==0?`Este menor prueba que el rango es al menos ${k}. Para fijar el rango exacto, también hay que descartar órdenes superiores.`:'Este menor nulo no basta para fijar el rango. Puede haber otro menor del mismo orden que no sea cero.'));
   output.append(detail);
   const proof=el('div');proof.dataset.rankProof='';proof.append(el('h3','Por qué ese rango es exacto'));
   if(m.rank===0)proof.append(el('p','Todos los menores de orden 1 son cero: todas las entradas son cero y el rango es 0.'));
   else{const w=m.witness;proof.append(el('p',tex`Hay un menor de orden ${m.rank} no nulo: filas ${w.rows.join(', ')}, columnas ${w.cols.join(', ')}, determinante \(${w.value}\).`));
    if(m.rank===m.limit)proof.append(el('p','No puede haber un menor de orden superior por las dimensiones de A.'));
    else for(const l of m.levels.filter(l=>l.order>m.rank))proof.append(el('p',`Menores de orden ${l.order} revisados: ${l.minors.length}. Todos son cero.`));
   }
   output.append(proof);
   const reduction=el('details');reduction.dataset.rankReduction='';reduction.append(el('summary','Ver reducción por filas y pivotes'));
   if(!m.echelon.steps.length)reduction.append(el('p','La matriz ya está escalonada con pivotes normalizados; no hacen falta operaciones.'));
   m.echelon.steps.forEach((s,i)=>{
    const operation=s.type==='swap'?tex`F_{${s.target}}\leftrightarrow F_{${s.source}}`:s.type==='scale'?tex`F_{${s.target}}\leftarrow (${fractionTex(s.factor)})F_{${s.target}}`:tex`F_{${s.target}}\leftarrow F_{${s.target}}+(${fractionTex(s.factor)})F_{${s.source}}`;
    reduction.append(el('p',tex`Paso ${i+1}: \(${operation}\).\[${rationalMatrixTex(s.matrix)}\]`));
   });
   reduction.append(el('p',tex`Forma escalonada final: \[${rationalMatrixTex(m.echelon.matrix)}\]`),el('p',`Número de filas no nulas: ${m.echelon.rank}. Número de pivotes: ${m.echelon.rank}. Coincide con el rango obtenido por menores.`));
   if(m.echelon.pivots.length)reduction.append(el('p',`Posiciones de los pivotes en la forma escalonada: ${m.echelon.pivots.map(p=>`(${p.row}, ${p.col})`).join(', ')}.`));
   output.append(reduction);
  });
 }
 grid.addEventListener('change',e=>{const input=e.target;if(!input.matches('[data-rank-entry]'))return;const v=parseMatrixInteger(input.value,-9,9);if(v===null){input.setAttribute('aria-invalid','true');status.textContent='Introduce un entero entre −9 y 9; se conserva el último valor válido.';return;}input.removeAttribute('aria-invalid');matrix[Number(input.dataset.row)][Number(input.dataset.col)]=v;preset.value='custom';status.textContent=grid.querySelector('[aria-invalid]')?'Quedan entradas inválidas; se conservan sus últimos valores válidos.':'Matriz actualizada.';rebuildModel();render();});
 order.addEventListener('change',()=>{minorOptions();render();});minor.addEventListener('change',render);
 preset.addEventListener('change',()=>{matrix=rankPresets[preset.value].matrix.map(r=>[...r]);build();status.textContent='Ejemplo cargado.';render();});
 for(const s of [rows,cols])s.addEventListener('change',()=>{matrix=resizeMatrix(matrix,Number(rows.value),Number(cols.value));preset.value='custom';build();status.textContent='Dimensiones actualizadas.';render();});
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;matrix=generatedRankMatrix(seed,matrix.length,matrix[0].length);preset.value='custom';build();status.textContent='Nueva variante.';render();});
 build();render();
}
