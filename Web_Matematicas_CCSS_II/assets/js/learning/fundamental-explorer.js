import {accumulationModel} from '../../../content/models/fundamental-calculus.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
const fmt=x=>x.toLocaleString('es-ES',{maximumFractionDigits:6,useGrouping:false});
const num=x=>fmt(x).replace(',','{,}');
const text=(tag,value)=>{const n=document.createElement(tag);n.textContent=value;return n;};
const node=(tag,attrs={},value)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(value!==undefined)n.textContent=value;return n;};
function graph(m,type,secants){
 const isF=type==='integrand',px=x=>285+75*x,py=isF?y=>280-25*y:y=>215-20*y;
 const id='fundamental-'+type,figure=document.createElement('figure');figure.className='fundamental-figure';
 const svg=node('svg',{viewBox:'0 0 600 455',role:'img','aria-labelledby':id+'-title '+id+'-desc'});
 const name=isF?'Integrando: altura f(x)':'Acumulación: pendiente de A';
 const description=isF?`${m.family.label}. Valor en x=${fmt(m.x)}: ${fmt(m.integrand)}. Región sombreada entre a=${m.a} y x=${fmt(m.x)}; acumulación orientada ${fmt(m.y)}.`:`A(x) es la integral desde ${m.a}. En x=${fmt(m.x)}, A vale ${fmt(m.y)}. ${m.slope===null?'No hay tangente: las pendientes laterales son distintas.':'Pendiente de la tangente '+fmt(m.slope)+'.'} Secantes izquierda ${fmt(m.leftSlope)}, derecha ${fmt(m.rightSlope)}.`;
 svg.append(node('title',{id:id+'-title'},name),node('desc',{id:id+'-desc'},description));
 const defs=node('defs');
 for(const [sign,color,path]of [['positive','#dbeafe','M0 3H8'],['negative','#ffedd5','M-2 2L2 -2M0 8L8 0M6 10L10 6']]){const p=node('pattern',{id:id+'-'+sign,patternUnits:'userSpaceOnUse',width:8,height:8});p.append(node('rect',{width:8,height:8,fill:color}),node('path',{d:path,stroke:'#555','stroke-width':.8}));defs.append(p);}
 svg.append(defs);
 const ticks=isF?[-4,-2,0,2,4,6,8]:[-8,-4,0,4,8];
 for(let x=-3;x<=3;x++)svg.append(node('path',{d:`M${px(x)} 55V380`,stroke:'#ddd'}),node('text',{x:px(x),y:401,'text-anchor':'middle'},x));
 for(const y of ticks)svg.append(node('path',{d:`M60 ${py(y)}H510`,stroke:'#ddd'}),node('text',{x:49,y:py(y)+5,'text-anchor':'end'},y));
 if(isF&&m.a!==m.x){
  const low=Math.min(m.a,m.x),high=Math.max(m.a,m.x),cuts=[low,...m.family.cuts.filter(t=>t>low&&t<high),high];
  for(let i=0;i<cuts.length-1;i++){
   const l=cuts[i],r=cuts[i+1],mid=(l+r)/2;
   const value=t=>m.kind==='jump'?m.family.value(mid):m.family.value(t);
   const points=Array.from({length:41},(_,j)=>{const t=l+(r-l)*j/40;return `L${px(t)} ${py(value(t))}`;}).join(' ');
   svg.append(node('path',{d:`M${px(l)} ${py(0)} ${points} L${px(r)} ${py(0)}Z`,fill:`url(#${id}-${value(mid)>=0?'positive':'negative'})`,stroke:'#777','stroke-width':.5}));
  }
 }
 svg.append(node('path',{d:`M60 ${py(0)}H510M285 55V380`,stroke:'#222',fill:'none'}),node('text',{x:528,y:py(0)+5},isF?'t':'x'),node('text',{x:292,y:35},isF?'f':'A'));
 const curve=(value,l=-3,r=3,attrs={})=>{const d=Array.from({length:241},(_,i)=>{const x=l+(r-l)*i/240;return (i?'L':'M')+px(x)+' '+py(value(x));}).join(' ');return node('path',{d,fill:'none',stroke:'#124caf','stroke-width':3,...attrs});};
 if(isF&&m.kind==='jump'){
  svg.append(curve(()=>-1,-3,0),curve(()=>1,0,3),node('circle',{cx:px(0),cy:py(-1),r:5,stroke:'#124caf','stroke-width':2,fill:'#fff','data-fundamental-hole':''}),node('circle',{cx:px(0),cy:py(1),r:5,fill:'#124caf'}));
 }else svg.append(curve(isF?m.family.value:m.accumulation));
 svg.append(node('path',{d:`M${px(m.x)} 55V380`,stroke:'#444','stroke-dasharray':'2 4'}));
 if(isF){
  svg.append(node('path',{d:`M${px(m.a)} 55V380`,stroke:'#777','stroke-dasharray':'5 5'}),node('text',{x:px(m.a),y:423,'text-anchor':'middle'},'a='+m.a),node('text',{x:px(m.x),y:445,'text-anchor':'middle'},'x='+fmt(m.x)));
 }else{
  const ay=py(0),ax=px(m.a);svg.append(node('path',{d:`M${ax} ${ay-7}L${ax+7} ${ay}L${ax} ${ay+7}L${ax-7} ${ay}Z`,fill:'#fff',stroke:'#222','stroke-width':2,'data-fundamental-origin':''}));
  if(m.slope!==null)svg.append(node('path',{d:`M${px(m.x-.65)} ${py(m.y-.65*m.slope)}L${px(m.x+.65)} ${py(m.y+.65*m.slope)}`,stroke:'#222','stroke-width':2,'data-fundamental-tangent':''}));
  if(secants){
   svg.append(node('path',{d:`M${px(m.x-m.h)} ${py(m.left)}L${px(m.x)} ${py(m.y)}`,stroke:'#a33b00','stroke-width':3,'stroke-dasharray':'5 4','data-fundamental-secant':'left'}),node('path',{d:`M${px(m.x)} ${py(m.y)}L${px(m.x+m.h)} ${py(m.right)}`,stroke:'#005f53','stroke-width':3,'stroke-dasharray':'2 3','data-fundamental-secant':'right'}));
   const lx=px(m.x-m.h),ly=py(m.left);svg.append(node('path',{d:`M${lx} ${ly-6}L${lx+6} ${ly+5}L${lx-6} ${ly+5}Z`,fill:'#a33b00'}),node('rect',{x:px(m.x+m.h)-5,y:py(m.right)-5,width:10,height:10,fill:'#005f53'}));
  }
  svg.append(node('text',{x:px(m.x),y:423,'text-anchor':'middle'},'x='+fmt(m.x)));
 }
 svg.append(node('circle',{cx:px(m.x),cy:py(isF?m.integrand:m.y),r:4,fill:'#124caf','data-fundamental-point':type}));
 figure.append(text('h3',name),svg,text('figcaption',isF?'El círculo marca f(x). El rayado horizontal indica regiones sobre el eje; el inclinado, bajo él. El sombreado localiza el tramo entre a y x: el valor de A respeta la orientación de a hacia x.':'El círculo marca (x,A(x)); el rombo, (a,0). Negro continuo: tangente cuando existe. Secante izquierda con trazos largos y triángulo; derecha con trazos cortos y cuadrado, cuando están activadas. La tabla permite distinguir valores aunque los puntos se superpongan al reducir h.'));
 return figure;
}
function table(m){
 const scroll=document.createElement('div');scroll.className='table-scroll';scroll.tabIndex=0;scroll.setAttribute('role','region');scroll.setAttribute('aria-label','Valores de acumulación e integrando; desplazamiento horizontal');
 const table=document.createElement('table');table.append(text('caption','Valores numéricos, redondeados a un máximo de seis decimales'));
 const head=document.createElement('thead'),hr=document.createElement('tr');for(const label of ['Punto','Abscisa','Acumulación A','Integrando f']){const th=text('th',label);th.scope='col';hr.append(th);}head.append(hr);table.append(head);
 const body=document.createElement('tbody');for(const [name,x]of [['x−h',m.x-m.h],['x',m.x],['x+h',m.x+m.h]]){const row=document.createElement('tr'),th=text('th',name);th.scope='row';row.append(th,text('td',fmt(x)),text('td',fmt(m.accumulation(x))),text('td',fmt(m.family.value(x))));body.append(row);}table.append(body);scroll.append(table);return scroll;
}
export function initializeFundamentalExplorer(){
 const root=document.querySelector('[data-fundamental-explorer]');if(!root)return;
 const $=s=>root.querySelector(s),result=$('[data-fundamental-result]');
 const update=()=>{
  const kind=$('[data-fundamental-family]').value,a=Number($('[data-fundamental-a]').value),x=Number($('[data-fundamental-x]').value),h=Number($('[data-fundamental-h]').value),secants=$('[data-fundamental-secants]').checked;
  const m=accumulationModel(kind,a,x,h);$('[data-fundamental-x-value]').value=fmt(x);
  return updateMath(result,()=>{
   result.dataset.selection=[kind,a,x,h,secants].join(':');for(const key of ['y','integrand','leftSlope','rightSlope'])result.dataset[key]=m[key];result.dataset.slope=m.slope===null?'undefined':m.slope;result.replaceChildren();
   result.append(text('p',tex`\[f(t)=${m.family.tex}\qquad A(x)=\int_{${a}}^x f(t)dt.\]`));
   const summary=text('p',tex`\(A(${num(x)})\approx${num(m.y)}\), mientras \(f(${num(x)})=${num(m.integrand)}\). ${m.slope===null?'En cero, f tiene un salto y A una esquina: A′(0) no existe.':tex`La pendiente de A es \(A'(${num(x)})=f(${num(x)})=${num(m.slope)}\).`} Cambiar a modifica A, pero no estas pendientes.`);summary.className='key-idea';result.append(summary);
   result.append(graph(m,'integrand',secants),graph(m,'accumulation',secants),table(m));
   result.append(text('p',tex`Secante izquierda: \(\frac{A(x)-A(x-h)}h\approx${num(m.leftSlope)}\). Secante derecha: \(\frac{A(x+h)-A(x)}h\approx${num(m.rightSlope)}\).`));
   result.append(text('p',m.slope===null?'Al reducir h, la secante izquierda conserva pendiente −1 y la derecha +1: no hay un límite común. El cociente simétrico daría 0 y no sirve para concluir que exista derivada.':'Al reducir h, ambas pendientes se aproximan a f(x). Los números se muestran redondeados; en algunos tramos rectos pueden coincidir ya con la pendiente exacta.'));
   $('[data-fundamental-status]').textContent=`Acumulación ${fmt(m.y)}; integrando ${fmt(m.integrand)}. ${m.slope===null?'La derivada no existe en este punto.':'Pendiente '+fmt(m.slope)+'.'} Secante izquierda ${fmt(m.leftSlope)} y derecha ${fmt(m.rightSlope)}.`;
  });
 };
 root.addEventListener('change',e=>{if(!e.target.matches('[data-fundamental-x]'))update();});$('[data-fundamental-x]').addEventListener('input',update);update();
}
