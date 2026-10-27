import {valueAt,invariants,description,identity} from './model.js';
const NS='http://www.w3.org/2000/svg';
const node=(tag,attrs={},text)=>{const n=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;return n;};
const px=x=>260+21*x,py=y=>230-19*y;
export function segments(family,s){
 const pole=family==='rational'?invariants(family,s)[1]:null;
 let ranges=[[-10,10]];
 if(pole!==null&&pole>=-10&&pole<=10)ranges=[[-10,pole-.01],[pole+.01,10]].filter(([l,r])=>l<r);
 return ranges.map(([l,r])=>Array.from({length:801},(_,i)=>{const x=l+(r-l)*i/800;return [x,valueAt(family,s,x)];}).filter(([,y])=>Number.isFinite(y)));
}
export function draw(family,current,target,showOriginal){
 const svg=node('svg',{viewBox:'0 0 520 460',role:'img','aria-labelledby':'transform-title transform-desc'});
 svg.append(node('title',{id:'transform-title'},'Compara tu gráfica con el objetivo'),node('desc',{id:'transform-desc'},'Actual: '+description(family,current)+' Objetivo: '+description(family,target)+' Ventana de −10 a 10 en ambos ejes.'));
 const defs=node('defs'),clip=node('clipPath',{id:'transform-clip'});clip.append(node('rect',{x:50,y:40,width:420,height:380}));defs.append(clip);svg.append(defs);
 for(let x=-10;x<=10;x+=2){svg.append(node('line',{x1:px(x),x2:px(x),y1:40,y2:420,class:'grid-line'}),node('text',{x:px(x),y:444,'text-anchor':'middle'},x));}
 for(let y=-10;y<=10;y+=2){svg.append(node('line',{x1:50,x2:470,y1:py(y),y2:py(y),class:'grid-line'}),node('text',{x:42,y:py(y)+5,'text-anchor':'end'},y));}
 svg.append(node('line',{x1:50,x2:470,y1:230,y2:230,class:'axis'}),node('line',{x1:260,x2:260,y1:40,y2:420,class:'axis'}),node('text',{x:486,y:235},'x'),node('text',{x:264,y:26},'y'));
 const group=node('g',{'clip-path':'url(#transform-clip)'});
 for(const [kind,s]of [...(showOriginal?[['original',identity()]]:[]),['target',target],['current',current]]){
  for(const branch of segments(family,s))group.append(node('path',{d:branch.map(([x,y],i)=>(i?'L':'M')+px(x).toFixed(3)+' '+py(y).toFixed(3)).join(' '),class:'curve '+kind,'data-curve':kind}));
  if(family==='rational'){
   const[,h,k]=invariants(family,s);
   group.append(node('line',{x1:px(h),x2:px(h),y1:40,y2:420,class:'asymptote '+kind}),node('line',{x1:50,x2:470,y1:py(k),y2:py(k),class:'asymptote '+kind}));
  }
 }
 svg.append(group);return svg;
}
