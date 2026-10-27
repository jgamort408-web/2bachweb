import {primitiveModel} from '../../../content/models/antiderivatives.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializePrimitiveExplorer(){
 const root=document.querySelector('[data-primitive-explorer]');if(!root)return;
 const $=s=>root.querySelector(s),result=$('[data-primitive-result]');
 const text=(tag,content)=>{const n=document.createElement(tag);n.textContent=content;return n;};
 const update=()=>{
  const kind=$('[data-primitive-family]').value,c=Number($('[data-primitive-c]').value),a=Number($('[data-primitive-a]').value),b=Number($('[data-primitive-b]').value),others=$('[data-primitive-others]').checked;
  const m=primitiveModel(kind,c,a,b),signed=c===0?'':c>0?'+'+c:String(c);
  $('[data-primitive-c-value]').value=String(c);
  return updateMath(result,()=>{
   result.dataset.selection=[kind,c,a,b,others].join(':');result.replaceChildren();
   result.append(text('p',tex`\[F_C(x)=${m.family.baseTex}${signed},\qquad F_C'(x)=${m.family.integrandTex}.\]`));
   const summary=text('p',tex`En x=${a}: \(F_C(${a})=${m.pointValue}\), pero la pendiente es siempre \(F_C'(${a})=${m.slope}\), cualquiera que sea C. Para cumplir F(${a})=${b} se necesita C=${m.requiredC}. ${m.matches?'La curva actual cumple el dato.':'La curva actual todavía no cumple el dato.'}`);summary.className='key-idea';result.append(summary);
   const figure=document.createElement('figure');figure.className='primitive-figure';
   const NS='http://www.w3.org/2000/svg';const node=(tag,attrs={},content)=>{const n=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(content!==undefined)n.textContent=content;return n;};
   const px=x=>280+110*x,py=y=>200-16*y;
   const svg=node('svg',{viewBox:'0 0 560 410',role:'img','aria-labelledby':'primitive-title primitive-desc'});
   svg.append(node('title',{id:'primitive-title'},'Familia de primitivas y condición inicial'),node('desc',{id:'primitive-desc'},`Curva actual continua, C=${c}. Punto circular (${a},${m.pointValue}); condición marcada por un cuadrado (${a},${b}). Pendiente ${m.slope}. ${others?'Se muestran tres curvas de referencia dibujadas a trazos.':''} Ventana x entre −2 y 2, y entre −10 y 10.`));
   const defs=node('defs'),clip=node('clipPath',{id:'primitive-clip'});clip.append(node('rect',{x:60,y:40,width:440,height:320}));defs.append(clip);svg.append(defs);
   for(const x of [-2,-1,0,1,2]){svg.append(node('path',{d:`M${px(x)} 40V360`,stroke:'#ddd'}),node('text',{x:px(x),y:383,'text-anchor':'middle'},x));}
   for(const y of [-10,-5,0,5,10]){svg.append(node('path',{d:`M60 ${py(y)}H500`,stroke:'#ddd'}),node('text',{x:50,y:py(y)+5,'text-anchor':'end'},y));}
   svg.append(node('path',{d:'M60 200H500M280 40V360',stroke:'#222',fill:'none'}),node('text',{x:515,y:205},'x'),node('text',{x:285,y:26},'y'));
   const plot=node('g',{'clip-path':'url(#primitive-clip)'});
   const curve=(constant,reference)=>{
    const d=Array.from({length:401},(_,i)=>{const x=-2+i/100;return (i?'L':'M')+px(x).toFixed(2)+' '+py(m.family.value(x)+constant).toFixed(2);}).join(' ');
    plot.append(node('path',{d,fill:'none',stroke:reference?'#666':'#124caf','stroke-width':reference?1.5:3,...(reference?{'stroke-dasharray':'6 5'}:{}),'data-primitive-curve':reference?'reference':'current'}));
   };
   if(others)for(const constant of [-3,0,3])curve(constant,true);curve(c,false);
   plot.append(node('path',{d:`M${px(a-.4)} ${py(m.pointValue-.4*m.slope)}L${px(a+.4)} ${py(m.pointValue+.4*m.slope)}`,stroke:'#222','stroke-width':2,'data-primitive-tangent':''}),node('rect',{x:px(a)-6,y:py(b)-6,width:12,height:12,fill:'none',stroke:'#9a3500','stroke-width':2,'data-primitive-target':''}),node('circle',{cx:px(a),cy:py(m.pointValue),r:4,fill:'#124caf','data-primitive-point':''}));svg.append(plot);figure.append(svg,text('figcaption','El trazo continuo representa la curva elegida; los trazos discontinuos corresponden a C=−3, 0 y 3 cuando están visibles. Círculo: punto de la curva. Cuadrado: dato exigido. El segmento marca la tangente. Las curvas continúan fuera del recuadro.'));result.append(figure);
   const scroll=document.createElement('div');scroll.className='table-scroll';scroll.tabIndex=0;scroll.setAttribute('role','region');scroll.setAttribute('aria-label','Tabla de primitivas; desplazamiento horizontal');
   const table=document.createElement('table');table.append(text('caption','Valores y pendientes de la primitiva actual'));
   const head=document.createElement('thead'),hr=document.createElement('tr');for(const label of ['x',tex`\(F_0(x)\)`,tex`\(F_C(x)\)`,'Pendiente f(x)']){const th=text('th',label);th.scope='col';hr.append(th);}head.append(hr);table.append(head);
   const body=document.createElement('tbody');for(const x of [-1,0,1]){const row=document.createElement('tr');const th=text('th',String(x));th.scope='row';row.append(th,...[m.family.value(x),m.value(x),m.family.derivative(x)].map(n=>text('td',String(n))));body.append(row);}table.append(body);scroll.append(table);result.append(scroll);
   $('[data-primitive-status]').textContent=`C=${c}. Pendiente en ${a}: ${m.slope}. ${m.matches?'Condición cumplida.':'Para cumplir el dato, C debe ser '+m.requiredC+'.'}`;
  });
 };
 root.addEventListener('change',e=>{if(!e.target.matches('[data-primitive-c]'))update();});$('[data-primitive-c]').addEventListener('input',update);
 $('[data-primitive-fit]').addEventListener('click',()=>{const m=primitiveModel($('[data-primitive-family]').value,Number($('[data-primitive-c]').value),Number($('[data-primitive-a]').value),Number($('[data-primitive-b]').value));$('[data-primitive-c]').value=m.requiredC;update();});update();
}
