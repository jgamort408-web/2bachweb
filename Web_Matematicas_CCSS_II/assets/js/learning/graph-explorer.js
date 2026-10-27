import {matrixTex,resizeMatrix} from '../../../content/models/matrix-basics.js';
import {graphPresets,graphDetails,toggleEdge,convertGraph,generatedGraph} from '../../../content/models/graphs.js';
import {updateMath} from '../core/math.js';
const tex=String.raw,letter=i=>String.fromCharCode(65+i);
export function initializeGraphExplorer(){
 const root=document.querySelector('[data-graph-explorer]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 let matrix=graphPresets.path.matrix.map(r=>[...r]),directed=false,model;
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [v,t]of items){const o=el('option',t);o.value=v;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Red','graphPreset',Object.entries(graphPresets).map(([k,p])=>[k,p.label]));
 const custom=el('option','Red personalizada');custom.value='custom';custom.disabled=true;preset.append(custom);
 const size=select('Vértices','graphSize',[[2,'2'],[3,'3'],[4,'4']]),direction=select('Tipo','graphDirection',[['undirected','No dirigido'],['directed','Dirigido']]);
 const length=select('Número exacto de pasos','graphLength',Array.from({length:5},(_,k)=>[k,String(k)]));length.value=2;
 const from=select('Origen','graphFrom',[]),to=select('Destino','graphTo',[]),walk=select('Recorrido que se destaca','graphWalk',[]);
 const generate=el('button','Generar otra red');generate.type='button';generate.dataset.graphGenerate='';controls.append(generate);
 const grid=el('div');grid.className='table-scroll';grid.tabIndex=0;grid.setAttribute('role','region');grid.setAttribute('aria-label','Conexiones: fila de origen y columna de destino; desplazamiento horizontal');grid.dataset.graphGrid='';
 const figure=el('div');figure.dataset.graphFigure='';
 const status=el('p');status.dataset.graphStatus='';status.setAttribute('role','status');
 const output=el('div');output.dataset.graphOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','Activa conexiones en la tabla. En modo no dirigido se actualizan las dos casillas simétricas. No hay lazos ni conexiones múltiples. Un recorrido puede repetir vértices y conexiones; se cuentan exactamente los pasos elegidos.'),grid,figure,status,output);
 function build(){
  size.value=matrix.length;direction.value=directed?'directed':'undirected';
  for(const s of [from,to]){const old=Number(s.value);s.replaceChildren();matrix.forEach((_,i)=>{const o=el('option',letter(i));o.value=i;s.append(o);});s.value=Math.min(old,matrix.length-1);}
  const table=el('table'),head=el('thead'),tr=el('tr');tr.append(el('th','Desde / hacia'));
  matrix.forEach((_,j)=>{const th=el('th',letter(j));th.scope='col';tr.append(th);});head.append(tr);const body=el('tbody');
  matrix.forEach((r,i)=>{const tr=el('tr'),th=el('th',letter(i));th.scope='row';tr.append(th);r.forEach((v,j)=>{const td=el('td');if(i===j)td.textContent='0';else{const box=el('input');box.type='checkbox';box.dataset.graphEdge='';box.dataset.row=i;box.dataset.col=j;box.checked=Boolean(v);box.setAttribute('aria-label',`Conexión de ${letter(i)} a ${letter(j)}`);td.append(box);}tr.append(td);});body.append(tr);});
  table.append(el('caption','Conexión marcada = 1; sin marcar = 0. Diagonal fija en 0.'),head,body);grid.replaceChildren(table);
 }
 function draw(){
  const svg=(tag,attrs)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v]of Object.entries(attrs||{}))n.setAttribute(k,v);return n;};
  const chart=svg('svg',{viewBox:'0 0 360 300',role:'img','aria-labelledby':'graph-title graph-description'});
  const title=svg('title',{id:'graph-title'});title.textContent=directed?'Red dirigida con flechas':'Red no dirigida';
  const desc=svg('desc',{id:'graph-description'});const connections=[];
  matrix.forEach((r,i)=>r.forEach((v,j)=>{if(v&&(directed||i<j))connections.push(letter(i)+(directed?' hacia ':' con ')+letter(j));}));
  const route=model.walks[Number(walk.value)];desc.textContent=(connections.length?'Conexiones: '+connections.join('; '):'No hay conexiones.')+(route?' Recorrido destacado: '+route.map(letter).join(' → ')+'.':' No hay recorrido de la longitud elegida.');
  chart.append(title,desc);
  const defs=svg('defs'),marker=svg('marker',{id:'graph-arrow',viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:6,markerHeight:6,orient:'auto-start-reverse'});marker.append(svg('path',{d:'M 0 0 L 10 5 L 0 10 z',fill:'currentColor'}));defs.append(marker);chart.append(defs);
  const points=matrix.map((_,i)=>{const angle=-Math.PI/2+i*2*Math.PI/matrix.length;return {x:180+112*Math.cos(angle),y:150+112*Math.sin(angle)};});
  const marked=new Set();if(route)for(let i=1;i<route.length;i++){marked.add(route[i-1]+','+route[i]);if(!directed)marked.add(route[i]+','+route[i-1]);}
  matrix.forEach((r,i)=>r.forEach((v,j)=>{if(!v||(!directed&&i>j))return;const p=points[i],q=points[j],dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy),nx=-dy/d,ny=dx/d,curve=directed&&matrix[j][i]?20:0;
   const x1=p.x+dx/d*20,y1=p.y+dy/d*20,x2=q.x-dx/d*22,y2=q.y-dy/d*22;
   const path=svg('path',{d:`M ${x1} ${y1} Q ${(p.x+q.x)/2+nx*curve} ${(p.y+q.y)/2+ny*curve} ${x2} ${y2}`,fill:'none',stroke:'currentColor','stroke-width':marked.has(i+','+j)?4:1.5});
   if(marked.has(i+','+j))path.setAttribute('stroke-dasharray','6 3');if(directed)path.setAttribute('marker-end','url(#graph-arrow)');chart.append(path);
  }));
  points.forEach((p,i)=>{chart.append(svg('circle',{cx:p.x,cy:p.y,r:18,fill:'var(--color-background)',stroke:'currentColor','stroke-width':2}));const label=svg('text',{x:p.x,y:p.y+5,'text-anchor':'middle',fill:'currentColor'});label.textContent=letter(i);chart.append(label);});
  figure.replaceChildren(chart);
 }
 function render(recompute=true){
  if(recompute){model=graphDetails(matrix,{directed,length:Number(length.value),from:Number(from.value),to:Number(to.value)});const old=Number(walk.value);walk.replaceChildren();model.walks.forEach((path,i)=>{const o=el('option',path.map(letter).join(' → '));o.value=i;walk.append(o);});if(!model.walks.length){const o=el('option','No hay recorridos de esa longitud');o.value=0;walk.append(o);}walk.disabled=!model.walks.length;walk.value=old<model.walks.length?old:0;}
  const a=matrix.map(r=>[...r]),m=model,n=Number(length.value),origin=Number(from.value),target=Number(to.value),isDirected=directed,choice=walk.value,path=m.walks[Number(choice)],snapshot=JSON.stringify({a,directed,n,origin,target});
  grid.querySelectorAll('[data-graph-edge]').forEach(box=>box.checked=Boolean(a[Number(box.dataset.row)][Number(box.dataset.col)]));draw();
  return updateMath(output,()=>{
   output.replaceChildren();output.dataset.count=m.count;output.dataset.snapshot=snapshot;output.dataset.walk=choice;
   output.append(el('p',tex`Orden de vértices: ${a.map((_,i)=>letter(i)).join(', ')}. La fila es el origen y la columna el destino.\[A=${matrixTex(a)},\qquad A^{${n}}=${matrixTex(m.power)}.\]`));
   output.append(el('p',`De ${letter(origin)} a ${letter(target)}, recorridos de exactamente ${n} pasos: ${m.count}.`));
   if(n===0)output.append(el('p','A⁰=I: el único recorrido de cero pasos permanece en el mismo vértice. No representa una conexión directa.'));
   if(path)output.append(el('p','Recorrido destacado: '+path.map(letter).join(' → ')+'. Los trazos gruesos discontinuos señalan sus conexiones; la lista indica el orden y las repeticiones.'));
   else output.append(el('p','No hay recorridos de esa longitud entre esos vértices. Podría haberlos con otro número de pasos; este cero no prueba que estén desconectados.'));
   output.append(el('p',`Número de ${isDirected?'arcos dirigidos':'aristas'}: ${m.edges}.`));
   const list=el('ul');a.forEach((_,i)=>list.append(el('li',isDirected?`${letter(i)}: salidas ${m.out[i]}, entradas ${m.incoming[i]}.`:`${letter(i)}: grado ${m.out[i]}.`)));output.append(list);
   if(!isDirected)output.append(el('p',`Suma de grados: ${m.out.reduce((s,v)=>s+v,0)} = 2 × ${m.edges}. Cada arista se cuenta en sus dos extremos.`));
  });
 }
 grid.addEventListener('change',e=>{const box=e.target;if(!box.matches('[data-graph-edge]'))return;matrix=toggleEdge(matrix,Number(box.dataset.row),Number(box.dataset.col),directed);preset.value='custom';status.textContent='Conexión actualizada.';render();});
 for(const s of [length,from,to])s.addEventListener('change',()=>render());walk.addEventListener('change',()=>render(false));
 direction.addEventListener('change',()=>{directed=direction.value==='directed';matrix=convertGraph(matrix,directed);preset.value='custom';build();status.textContent=directed?'Cada conexión existente se conserva con su orientación; puedes modificar cada flecha por separado.':'Se unen ambos sentidos: basta una flecha previa para conservar la arista.';render();});
 size.addEventListener('change',()=>{matrix=resizeMatrix(matrix,Number(size.value),Number(size.value));preset.value='custom';build();status.textContent='Se conservan las conexiones de los vértices restantes; los nuevos comienzan aislados.';render();});
 preset.addEventListener('change',()=>{const p=graphPresets[preset.value];matrix=p.matrix.map(r=>[...r]);directed=p.directed;build();status.textContent='Red cargada.';render();});
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;matrix=generatedGraph(seed,matrix.length,directed);preset.value='custom';build();status.textContent='Nueva red con el mismo tamaño y tipo.';render();});
 build();to.value=Math.min(2,matrix.length-1);render();
}
