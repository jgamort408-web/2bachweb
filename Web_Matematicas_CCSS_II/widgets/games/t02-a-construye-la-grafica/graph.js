import { valueAt, facts } from './generator.js';
const NS='http://www.w3.org/2000/svg';
const node=(tag,attrs={},text)=>{const n=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;return n;};
const px=x=>220+30*x,py=y=>170-17*y;
/** Cada rama se dibuja por separado. Ventana común: x [-6,6], y [-8,8]. */
export function graphSegments(model){
  const ranges=model.family==='rational'?[[-6,model.h-.015],[model.h+.015,6]]:[[-6,6]];
  return ranges.map(([left,right])=>Array.from({length:601},(_,i)=>{const x=left+(right-left)*i/600;return [x,valueAt(model,x)];}));
}
export function drawGraph(model,id,label){
  const svg=node('svg',{viewBox:'0 0 440 340',role:'img','aria-labelledby':id+'-title '+id+'-desc'});
  svg.append(node('title',{id:id+'-title'},label),node('desc',{id:id+'-desc'},Object.values(facts(model)).join(' ')+' Ventana x de −6 a 6; y de −8 a 8. Las ramas continúan fuera del recuadro.'));
  const defs=node('defs'),clip=node('clipPath',{id:id+'-clip'});clip.append(node('rect',{x:40,y:34,width:360,height:272}));defs.append(clip);svg.append(defs);
  for(let x=-6;x<=6;x+=2){svg.append(node('line',{x1:px(x),x2:px(x),y1:34,y2:306,class:'grid-line'}),node('text',{x:px(x),y:327,'text-anchor':'middle'},x));}
  for(let y=-8;y<=8;y+=2){svg.append(node('line',{x1:40,x2:400,y1:py(y),y2:py(y),class:'grid-line'}),node('text',{x:32,y:py(y)+5,'text-anchor':'end'},y));}
  svg.append(node('line',{x1:40,x2:400,y1:170,y2:170,class:'axis'}),node('line',{x1:220,x2:220,y1:34,y2:306,class:'axis'}),node('text',{x:416,y:175},'x'),node('text',{x:224,y:22},'y'));
  const plot=node('g',{'clip-path':`url(#${id}-clip)`});
  if(model.family==='rational')plot.append(node('line',{x1:px(model.h),x2:px(model.h),y1:34,y2:306,class:'asymptote'}));
  if(model.family!=='quadratic')plot.append(node('line',{x1:40,x2:400,y1:py(model.k),y2:py(model.k),class:'asymptote'}));
  for(const segment of graphSegments(model))plot.append(node('path',{d:segment.map(([x,y],i)=>(i?'L':'M')+px(x).toFixed(2)+' '+py(y).toFixed(2)).join(' '),class:'function-curve'}));
  if(model.family==='quadratic')plot.append(node('circle',{cx:px(model.h),cy:py(model.k),r:4,class:'vertex'}));
  svg.append(plot);return svg;
}
