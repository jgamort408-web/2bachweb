import {letter,connections} from './generator.js';
const svg=(tag,attrs={})=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,v);return n;};
/** SVG sin estado académico: mover nodos no modifica las conexiones. */
export function createNetworkGraph(container,{size,directed,interactive,onConnect,onSelect}){
 let matrix,selected=null,disabled=false,drag;
 const points=Array.from({length:size},(_,i)=>({x:180+108*Math.cos(-Math.PI/2+i*2*Math.PI/size),y:150+108*Math.sin(-Math.PI/2+i*2*Math.PI/size)}));
 const chart=svg('svg',{viewBox:'0 0 360 300',role:'group','aria-label':interactive?'Editor de red: selecciona origen y destino':'Red de referencia'});
 const defs=svg('defs'),marker=svg('marker',{id:'network-arrow',viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:6,markerHeight:6,orient:'auto'});
 marker.append(svg('path',{d:'M 0 0 L 10 5 L 0 10 z',fill:'currentColor'}));defs.append(marker);
 const edges=svg('g',{'aria-hidden':'true'}),nodes=svg('g'),description=svg('desc');
 chart.append(description,defs,edges,nodes);container.replaceChildren(chart);
 function select(i){if(!interactive||disabled)return;if(selected===null){selected=i;onSelect('Origen '+letter(i)+'. Selecciona otro vértice; pulsa Escape para cancelar.');}else if(selected===i){selected=null;onSelect('Selección cancelada. No se permiten lazos.');}else{const from=selected;selected=null;onConnect(from,i);}draw();}
 function move(i,x,y){points[i]={x:Math.max(25,Math.min(335,x)),y:Math.max(25,Math.min(275,y))};draw();}
 function location(e){const rect=chart.getBoundingClientRect();return {x:(e.clientX-rect.left)*360/rect.width,y:(e.clientY-rect.top)*300/rect.height};}
 const buttons=points.map((_,i)=>{
  let ignoreDragClick=false;
  const node=svg('g',{role:interactive?'button':'img',tabindex:0,'aria-label':'Vértice '+letter(i),'data-node':i});
  node.append(svg('circle',{r:19,fill:'var(--network-surface, white)',stroke:'currentColor','stroke-width':2}),svg('text',{'text-anchor':'middle',y:6,fill:'currentColor','aria-hidden':'true'}));node.lastChild.textContent=letter(i);
  node.addEventListener('keydown',e=>{
   if(disabled)return;
   const delta={ArrowLeft:[-10,0],ArrowRight:[10,0],ArrowUp:[0,-10],ArrowDown:[0,10]}[e.key];
   if(delta){e.preventDefault();move(i,points[i].x+delta[0],points[i].y+delta[1]);}
   else if(e.key==='Enter'||e.key===' '){e.preventDefault();select(i);}
   else if(e.key==='Escape'){selected=null;onSelect('Selección cancelada.');draw();}
  });
  node.addEventListener('pointerdown',e=>{if(disabled||e.button!==0)return;e.preventDefault();node.focus();drag={i,start:location(e),moved:false};node.setPointerCapture(e.pointerId);});
  node.addEventListener('pointermove',e=>{if(!drag||drag.i!==i)return;const p=location(e);if(Math.hypot(p.x-drag.start.x,p.y-drag.start.y)>5)drag.moved=true;if(drag.moved)move(i,p.x,p.y);});
  node.addEventListener('pointerup',e=>{if(!drag||drag.i!==i)return;const moved=drag.moved;drag=null;if(node.hasPointerCapture(e.pointerId))node.releasePointerCapture(e.pointerId);ignoreDragClick=moved;});
  node.addEventListener('pointercancel',()=>{drag=null;ignoreDragClick=false;});
  node.addEventListener('click',()=>{if(ignoreDragClick){ignoreDragClick=false;return;}select(i);});
  nodes.append(node);return node;
 });
 function draw(){
  if(!matrix)return;
  description.textContent=connections(matrix,directed).join('; ')||'No hay conexiones.';
  edges.replaceChildren();
  matrix.forEach((row,i)=>row.forEach((v,j)=>{
   if(!v||(!directed&&i>j))return;
   const p=points[i],q=points[j],dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);
   if(d<1)return;
   const curve=directed&&matrix[j][i]?24:0;
   const path=svg('path',{d:`M ${p.x+dx/d*21} ${p.y+dy/d*21} Q ${(p.x+q.x)/2-dy/d*curve} ${(p.y+q.y)/2+dx/d*curve} ${q.x-dx/d*24} ${q.y-dy/d*24}`,fill:'none',stroke:'currentColor','stroke-width':2});
   if(directed)path.setAttribute('marker-end','url(#network-arrow)');edges.append(path);
  }));
  buttons.forEach((b,i)=>{b.setAttribute('transform',`translate(${points[i].x},${points[i].y})`);if(interactive){b.setAttribute('aria-pressed',String(i===selected));b.setAttribute('aria-disabled',String(disabled));}b.firstChild.setAttribute('stroke-width',selected===i?5:2);});
 }
 return {update(a){matrix=a;draw();},lock(value){disabled=value;if(value)selected=null;draw();}};
}
