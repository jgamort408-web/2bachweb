const ns='http://www.w3.org/2000/svg';
function node(tag,attrs={},text){const el=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))el.setAttribute(k,String(v));if(text!==undefined)el.textContent=text;return el;}
/** La gráfica es un apoyo: tabla y controles HTML aportan los mismos datos y acciones. */
export function drawAreaGraph(container,r,{selected=[],reveal=false,disabled=false,onToggle=()=>{}}={}){
 const w=640,height=300,left=48,right=600,top=22,bottom=254;
 const samples=Array.from({length:201},(_,i)=>r.a+(r.b-r.a)*i/200),max=Math.max(1,...samples.map(x=>Math.abs(r.value(x))))*1.12;
 const X=x=>left+(x-r.a)/(r.b-r.a)*(right-left),Y=y=>(top+bottom)/2-y/max*(bottom-top)/2;
 const svg=node('svg',{viewBox:`0 0 ${w} ${height}`,role:'group','aria-label':'Gráfica de la función en el intervalo. Los puntos interiores se pueden seleccionar; hay casillas equivalentes debajo.'});
 const defs=node('defs');
 for(const [id,rotate]of [['positive',45],['negative',-45]]){const pat=node('pattern',{id:'area-'+id,width:8,height:8,patternUnits:'userSpaceOnUse',patternTransform:'rotate('+rotate+')'});pat.append(node('line',{x1:0,y1:0,x2:0,y2:8,stroke:'currentColor','stroke-width':id==='positive'?1:2}));defs.append(pat);}svg.append(defs);
 if(reveal)for(const t of r.segments){
  const xs=Array.from({length:81},(_,i)=>t.a+(t.b-t.a)*i/80),d=`M ${X(t.a)} ${Y(0)} `+xs.map(x=>`L ${X(x)} ${Y(r.value(x))}`).join(' ')+` L ${X(t.b)} ${Y(0)} Z`;
  svg.append(node('path',{d,fill:'url(#area-'+(t.sign>0?'positive':'negative')+')',opacity:.35,'data-region':t.sign>0?'positive':'negative'}));
 }
 svg.append(node('line',{x1:left,y1:Y(0),x2:right+10,y2:Y(0),stroke:'currentColor'}),node('text',{x:right+15,y:Y(0)+5},'x'));
 // Escala vertical en el borde izquierdo; no se confunde con el eje y si x=0 está fuera.
 for(const y of [-max/1.12,0,max/1.12])svg.append(node('text',{x:left-5,y:Y(y)+4,'text-anchor':'end','font-size':12},String(Math.round(y*100)/100)));
 for(let x=r.a;x<=r.b;x++)svg.append(node('line',{x1:X(x),y1:Y(0)-4,x2:X(x),y2:Y(0)+4,stroke:'currentColor'}),node('text',{x:X(x),y:bottom+22,'text-anchor':'middle'},String(x)));
 svg.append(node('path',{d:samples.map((x,i)=>`${i?'L':'M'} ${X(x)} ${Y(r.value(x))}`).join(' '),fill:'none',stroke:'currentColor','stroke-width':2.5}));
 if(reveal)for(const x of r.cuts)svg.append(node('line',{x1:X(x),x2:X(x),y1:top,y2:bottom,stroke:'currentColor','stroke-dasharray':'5 4'}));
 for(const x of r.candidates){
  const chosen=selected.includes(x),g=node('g',{'data-cut':x,role:'button',tabindex:disabled?-1:0,'aria-label':'Corte en x='+x,'aria-pressed':chosen,'aria-disabled':disabled});
  g.append(node('circle',{cx:X(x),cy:Y(0),r:13,fill:chosen?'currentColor':'white',stroke:'currentColor','stroke-width':2}));
  if(chosen)g.append(node('path',{d:`M ${X(x)-5} ${Y(0)} l 4 4 l 6 -8`,fill:'none',stroke:'white','stroke-width':2}));
  const toggle=()=>{if(!disabled)onToggle(x);};g.addEventListener('click',toggle);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});svg.append(g);
 }
 container.replaceChildren(svg);
}
