
import {normalPDF, normalCDF, normalReadings} from '../../../content/models/normal-distribution.js';
import {updateMath} from '../core/math.js';
const NS='http://www.w3.org/2000/svg';
const fmt=(value,digits=4)=>value.toLocaleString('es-ES',{minimumFractionDigits:digits,maximumFractionDigits:digits,useGrouping:false});
const texNumber=(value,digits=4)=>fmt(value,digits).replace(',','{,}');
const probability=value=>value>0 && value<.00005 ? '< 0,0001' : value<1 && value>.99995 ? '> 0,9999' : fmt(value);
function node(tag,attrs={},value) {
  const n=document.createElementNS(NS,tag);
  for(const [key,v] of Object.entries(attrs)) n.setAttribute(key,v);
  if(value!==undefined)n.textContent=value;
  return n;
}
const path=points=>points.map(([x,y],i)=>(i?'L':'M')+x.toFixed(3)+' '+y.toFixed(3)).join(' ');
function draw(host,m,type,small=false) {
  const id=host.id, pdf=type==='pdf', W=680,H=320,pad=54;
  const X=x=>pad+(x+12)*(W-2*pad)/24;
  const Y=y=>H-pad-y*(H-2*pad)/(pdf?.85:1);
  const svg=node('svg',{viewBox:'0 0 680 320',role:'img','aria-labelledby':id+'-title '+id+'-desc'});
  const description=pdf
    ? 'Densidad de media '+fmt(m.mu,1)+' y desviación '+fmt(m.sigma,1)+'. Región rayada entre '+fmt(m.lo,1)+' y '+fmt(m.hi,1)+', probabilidad aproximada '+probability(m.interval)+'.'
    : 'Acumulada de media '+fmt(m.mu,1)+' y desviación '+fmt(m.sigma,1)+'. Punto k='+fmt(m.k,1)+'; su altura F(k) es aproximadamente '+probability(m.Fk)+'. No se representa un área de probabilidad bajo esta curva.';
  svg.append(node('title',{id:id+'-title'},pdf?'Densidad normal f(x)':'Distribución acumulada F(x)'),node('desc',{id:id+'-desc'},description));
  const defs=node('defs'),pattern=node('pattern',{id:id+'-hatch',patternUnits:'userSpaceOnUse',width:8,height:8});
  pattern.append(node('path',{d:'M-2 2L2 -2M0 8L8 0M6 10L10 6',stroke:'currentColor','stroke-width':1}));
  defs.append(pattern);svg.append(defs);
  for(const x of [-12,-6,0,6,12]){
    svg.append(node('line',{x1:X(x),y1:pad,x2:X(x),y2:H-pad,stroke:'currentColor',opacity:.15}));
    svg.append(node('text',{x:X(x),y:H-pad+24,'text-anchor':'middle'},String(x)));
  }
  for(const y of pdf?[0,.2,.4,.6,.8]:[0,.25,.5,.75,1]){
    svg.append(node('line',{x1:pad,y1:Y(y),x2:W-pad,y2:Y(y),stroke:'currentColor',opacity:.15}));
    svg.append(node('text',{x:pad-8,y:Y(y)+5,'text-anchor':'end'},fmt(y,2)));
  }
  svg.append(node('path',{d:'M54 54V266H626',stroke:'currentColor',fill:'none'}),node('text',{x:642,y:288},'x'));
  if(pdf){
    const points=[[X(m.lo),Y(0)],...Array.from({length:261},(_,i)=>{const x=m.lo+(m.hi-m.lo)*i/260;return[X(x),Y(normalPDF(x,m.mu,m.sigma))];}),[X(m.hi),Y(0)]];
    svg.append(node('path',{d:path(points)+' Z',fill:'url(#'+id+'-hatch)','data-normal-area':''}));
    for(const [x,dash] of [[m.mu,'7 3'],[m.mu-m.sigma,'2 4'],[m.mu+m.sigma,'2 4']]){
      svg.append(node('line',{x1:X(x),x2:X(x),y1:pad,y2:H-pad,stroke:'currentColor','stroke-dasharray':dash,'data-normal-mark':x}));
    }
    if(!small)svg.append(node('line',{x1:X(m.k),x2:X(m.k),y1:pad,y2:H-pad,stroke:'currentColor','stroke-dasharray':'10 3 2 3'}));
  }else{
    svg.append(node('path',{d:'M'+X(m.k)+' '+Y(0)+'V'+Y(m.Fk)+'H'+pad,fill:'none',stroke:'currentColor','stroke-dasharray':'4 4'}));
    svg.append(node('circle',{cx:X(m.k),cy:Y(m.Fk),r:5,fill:'currentColor','data-normal-point':''}));
  }
  const values=Array.from({length:521},(_,i)=>{const x=-12+24*i/520;return[X(x),Y(pdf?normalPDF(x,m.mu,m.sigma):normalCDF(x,m.mu,m.sigma))];});
  svg.append(node('path',{d:path(values),fill:'none',stroke:'currentColor','stroke-width':2.5,'data-normal-curve':type}));
  svg.append(node('text',{x:pad,y:28},pdf?'Densidad f(x) · eje vertical 0–0,85':'Acumulada F(x) · eje vertical 0–1'));
  host.replaceChildren(svg);
}
const root=document.querySelector('[data-normal-explorer]');
if(root){
  const controls=root.querySelector('[data-normal-controls]'),result=root.querySelector('[data-normal-readouts]');
  const inputs=Object.fromEntries([...controls.querySelectorAll('input')].map(el=>[el.name,el]));
  let busy=false, requested=false;
  async function render(){
    if(busy){requested=true;return;}
    busy=true;
    try{
      do{
        requested=false;
        const m=normalReadings(Object.fromEntries(Object.entries(inputs).map(([key,el])=>[key,Number(el.value)])));
        for(const [key,el] of Object.entries(inputs)){
          const value=fmt(Number(el.value),1);
          controls.querySelector('[data-value="'+key+'"]').textContent=value;
          el.setAttribute('aria-valuetext',value);
        }
        draw(document.getElementById('normal-pdf'),m,'pdf');
        draw(document.getElementById('normal-cdf'),m,'cdf');
        const small=normalReadings({...m,a:m.mu-m.sigma,b:m.mu+m.sigma,k:m.mu+.8*m.sigma});
        draw(document.getElementById('normal-pdf-small'),small,'pdf',true);
        draw(document.getElementById('normal-cdf-small'),small,'cdf',true);
        root.querySelector('[data-normal-summary]').textContent=
          'Media '+fmt(m.mu,1)+', desviación '+fmt(m.sigma,1)+'. Entre '+fmt(m.lo,1)+' y '+fmt(m.hi,1)+': '+probability(m.interval)+'. F(k): '+probability(m.Fk)+'. '+
          (m.reversed?'a supera a b: se muestra el intervalo entre b y a.':m.a===m.b?'Los extremos coinciden: probabilidad del intervalo igual a cero.':'');
        await updateMath(result,()=>{
          const p=document.createElement('p');
          p.textContent='Acumulada aproximada F(k): '+probability(m.Fk)+'. Probabilidad aproximada entre '+fmt(m.lo,1)+' y '+fmt(m.hi,1)+': '+probability(m.interval)+'.';
          const z=document.createElement('p');
          z.textContent='\\[z_k='+texNumber(m.zk,3)+',\\qquad z_{\\mathrm{inf}}='+texNumber(m.za,3)+',\\qquad z_{\\mathrm{sup}}='+texNumber(m.zb,3)+'.\\]';
          const relation=document.createElement('p');
          relation.textContent='\\[F(k)=\\Phi(z_k),\\qquad P('+texNumber(m.lo,1)+'\\le X\\le '+texNumber(m.hi,1)+')=\\Phi(z_{\\mathrm{sup}})-\\Phi(z_{\\mathrm{inf}}).\\]';
          result.replaceChildren(p,z,relation);
          for(const key of ['Fk','interval','za','zb','zk'])result.dataset[key.toLowerCase()]=m[key];
        });
      }while(requested);
      controls.hidden=false;
      for(const notice of document.querySelectorAll('[data-normal-loading]'))notice.hidden=true;
    }finally{busy=false;}
  }
  for(const el of Object.values(inputs))el.addEventListener('input',()=>{render().catch(console.error);});
  render().catch(console.error);
}
