import {approximationReadings} from '../../../content/models/binomial-normal-approximation.js';
import {normalCDF,normalPDF} from '../../../content/models/normal-distribution.js';
import {updateMath} from '../core/math.js';
const fmt=x=>Number.isFinite(x)?x.toLocaleString('es-ES',{maximumSignificantDigits:7}):'−∞';
const NS='http://www.w3.org/2000/svg';
function el(tag,attrs={},text){const e=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;return e;}
function draw(host,m,cdf=false,small=false){
  const left=small?-4:Math.min(-.5,m.mu-4*m.sigma),right=small?4:Math.max(m.n+.5,m.mu+4*m.sigma);
  const mu=small?0:m.mu,sigma=small?1:m.sigma;
  const ymax=cdf?1:1.12*Math.max(normalPDF(mu,mu,sigma),...(small?[0]:m.pmf));
  const X=x=>54+(x-left)*572/(right-left),Y=y=>266-y*212/ymax;
  const svg=el('svg',{viewBox:'0 0 680 320',role:'img','aria-labelledby':host.id+'-title '+host.id+'-desc'});
  svg.append(el('title',{id:host.id+'-title'},(small?'Normal estándar: ':'Comparación: ')+(cdf?'acumuladas':'masa binomial y densidad normal')),
    el('desc',{id:host.id+'-desc'},small?'Normal de media cero y desviación uno.':cdf?'Línea escalonada: binomial. Curva discontinua: normal. Los puntos comparan P(X ≤ K) y F normal(K + 0,5), independientemente del modo.':'Barras de ancho uno: probabilidades binomiales. Barras intensas: valores seleccionados. Región rayada: aproximación normal con corrección de continuidad. Las colas fuera de la ventana no se dibujan.'));
  const pattern=el('pattern',{id:host.id+'-hatch',patternUnits:'userSpaceOnUse',width:8,height:8});
  pattern.append(el('path',{d:'M0 8L8 0',stroke:'currentColor'}));const defs=el('defs');defs.append(pattern);svg.append(defs);
  for(let i=0;i<=4;i++){
    const x=left+(right-left)*i/4,y=ymax*i/4;
    svg.append(el('text',{x:X(x),y:291,'text-anchor':'middle'},x.toFixed(1)),el('text',{x:48,y:Y(y)+4,'text-anchor':'end'},y.toFixed(2)),el('path',{d:'M54 '+Y(y)+'H626',stroke:'currentColor',opacity:.15}));
  }
  const path=points=>points.map(([x,y],i)=>(i?'L':'M')+X(x)+' '+Y(y)).join(' ');
  if(!small&&!cdf){
    const a=Math.max(left,m.lower),b=m.upper;
    const pts=[[a,0],...Array.from({length:201},(_,i)=>{const x=a+(b-a)*i/200;return[x,normalPDF(x,mu,sigma)];}),[b,0]];
    svg.append(el('path',{d:path(pts)+'Z',fill:'url(#'+host.id+'-hatch)'}));
    m.pmf.forEach((v,k)=>svg.append(el('rect',{x:X(k-.5),y:Y(v),width:X(k+.5)-X(k-.5),height:Y(0)-Y(v),fill:'currentColor','fill-opacity':k>=m.lo&&k<=m.hi?.28:.05,stroke:'currentColor','stroke-width':.6})));
  }
  if(!small&&cdf){
    let sum=0,pts=[[left,0]];
    m.pmf.forEach((v,k)=>{pts.push([k,sum]);sum+=v;pts.push([k,sum]);});pts.push([right,Math.min(1,sum)]);
    svg.append(el('path',{d:path(pts),fill:'none',stroke:'currentColor','stroke-width':2}));
    const exact=m.pmf.slice(0,m.K+1).reduce((a,b)=>a+b,0);
    svg.append(el('circle',{cx:X(m.K),cy:Y(exact),r:4,fill:'currentColor'}),el('circle',{cx:X(m.K+.5),cy:Y(normalCDF(m.K+.5,mu,sigma)),r:6,fill:'none',stroke:'currentColor'}));
  }
  const pts=Array.from({length:501},(_,i)=>{const x=left+(right-left)*i/500;return[x,cdf?normalCDF(x,mu,sigma):normalPDF(x,mu,sigma)];});
  svg.append(el('path',{d:path(pts),fill:'none',stroke:'currentColor','stroke-width':2.5,'stroke-dasharray':small?'none':'6 3','data-approx-curve':''}),el('path',{d:'M54 54V266H626',fill:'none',stroke:'currentColor'}));
  host.replaceChildren(svg);
}
const root=document.querySelector('[data-approx-explorer]');
if(root){
  const controls=root.querySelector('[data-approx-controls]'),result=root.querySelector('[data-approx-results]');
  const inputs=Object.fromEntries([...controls.querySelectorAll('input')].map(e=>[e.name,e]));
  let busy=false,requested=false;
  async function render(){
    if(busy){requested=true;return;}busy=true;
    try{do{
      requested=false;const n=Number(inputs.n.value);let clamped=false;
      for(const name of ['K','A','B']){const old=Number(inputs[name].value);inputs[name].max=n;inputs[name].value=Math.min(n,old);clamped ||= old>n;}
      const m=approximationReadings(Object.fromEntries(Object.entries(inputs).map(([k,e])=>[k,Number(e.value)])));
      for(const [name,e]of Object.entries(inputs)){const value=name==='mode'?(m.mode?'Intervalo A ≤ X ≤ B':'Acumulada X ≤ K'):fmt(Number(e.value));controls.querySelector('[data-value="'+name+'"]').textContent=value;e.setAttribute('aria-valuetext',value);}
      draw(document.getElementById('approx-mass'),m);draw(document.getElementById('approx-cdf'),m,true);
      draw(document.getElementById('approx-small-pdf'),m,false,true);draw(document.getElementById('approx-small-cdf'),m,true,true);
      root.querySelector('[data-approx-status]').textContent=(m.adequate?'Se cumple la orientación np ≥ 5 y n(1−p) ≥ 5; no garantiza precisión en todas las colas.':'No se cumple la orientación: utiliza el cálculo binomial.')+(clamped?' Se han ajustado los límites al nuevo n.':'')+(m.mode&&m.A>m.B?' A supera a B: se utiliza el intervalo ordenado.':'')+(m.mode&&m.A===m.B?' Un solo valor entero tiene probabilidad positiva; su intervalo corregido tiene ancho uno.':'');
      await updateMath(result,()=>{
        const p=document.createElement('p');p.textContent='Media: '+fmt(m.mu)+'. Desviación típica: '+fmt(m.sigma)+'. np: '+fmt(m.mu)+'. n(1−p): '+fmt(m.n*(1-m.p))+'.';
        const values=document.createElement('p');values.textContent='Probabilidad binomial por suma: '+fmt(m.exact)+'. Aproximación normal: '+fmt(m.approximate)+'. Error absoluto: '+fmt(m.error)+'. Calculado antes de redondear.';
        const formula=document.createElement('p');formula.textContent=m.mode?'\\[P('+m.lo+'\\le X\\le '+m.hi+')\\approx\\Phi\\left(\\frac{'+m.upper+'-np}{\\sigma}\\right)-\\Phi\\left(\\frac{'+m.lower+'-np}{\\sigma}\\right).\\]':'\\[P(X\\le '+m.K+')\\approx\\Phi\\left(\\frac{'+m.upper+'-np}{\\sigma}\\right).\\]';
        const z=document.createElement('p');z.textContent='Límites tipificados: '+fmt(m.zlo)+' y '+fmt(m.zhi)+'.';
        result.replaceChildren(p,values,formula,z);result.dataset.exact=m.exact;result.dataset.approximate=m.approximate;
      });
    }while(requested);controls.hidden=false;root.querySelector('[data-approx-loading]').hidden=true;
    }finally{busy=false;}
  }
  Object.values(inputs).forEach(e=>e.addEventListener('input',()=>render().catch(console.error)));
  render().catch(console.error);
}
