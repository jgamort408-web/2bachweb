import {areaModel,areaTex,generateAreaQuestions} from '../../../content/models/integral-applications.js';
import {updateMath} from '../core/math.js';
import {mountQuiz} from './quiz.js';
const tex=String.raw,NS='http://www.w3.org/2000/svg';
const text=(tag,value)=>{const el=document.createElement(tag);el.textContent=value;return el;};
const node=(tag,attrs={},value)=>{const el=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))el.setAttribute(k,v);if(value!==undefined)el.textContent=value;return el;};
function graph(m,show){
 const figure=document.createElement('figure');figure.className='area-figure';
 const values=Array.from({length:81},(_,i)=>-2+i/20).flatMap(x=>[m.f(x),m.g(x)]),min=Math.min(0,...values)-1,max=Math.max(0,...values)+1;
 const px=x=>300+110*x,py=y=>350-(y-min)*300/(max-min);
 const svg=node('svg',{viewBox:'0 0 600 410',role:'img','aria-labelledby':'area-title area-desc'});
 svg.append(node('title',{id:'area-title'},'Área entre dos curvas'),node('desc',{id:'area-desc'},'f se dibuja con trazo continuo; g con guiones. '+m.segments.map(s=>'De '+s.left+' a '+s.right+' está arriba '+s.top+'.').join(' ')+' El área se obtiene sumando todos los tramos. La tabla siguiente contiene sus valores exactos.'));
 const defs=node('defs');
 for(const [name,color,d]of [['f','#dbeafe','M0 3H8'],['g','#ffedd5','M0 8L8 0']]){
  const pattern=node('pattern',{id:'area-'+name,patternUnits:'userSpaceOnUse',width:8,height:8});
  pattern.append(node('rect',{width:8,height:8,fill:color}),node('path',{d,stroke:'#555','stroke-width':.8}));defs.append(pattern);
 }svg.append(defs);
 for(let x=-2;x<=2;x++)svg.append(node('path',{d:`M${px(x)} 50V350`,stroke:'#ddd'}),node('text',{x:px(x),y:375,'text-anchor':'middle'},x));
 for(let i=0;i<=4;i++){const y=min+(max-min)*i/4;svg.append(node('path',{d:`M80 ${py(y)}H520`,stroke:'#ddd'}),node('text',{x:70,y:py(y)+5,'text-anchor':'end'},Number(y.toFixed(2)).toLocaleString('es-ES')));}
 if(show)for(const s of m.segments){
  const xs=Array.from({length:61},(_,i)=>s.left+(s.right-s.left)*i/60);
  const path=xs.map((x,i)=>(i?'L':'M')+px(x)+' '+py(m.f(x))).join(' ')+xs.reverse().map(x=>'L'+px(x)+' '+py(m.g(x))).join(' ')+'Z';
  svg.append(node('path',{d:path,fill:'url(#area-'+s.top+')',stroke:'none','data-area-region':s.top}));
 }
 svg.append(node('path',{d:`M80 ${py(0)}H520M300 50V350`,stroke:'#222',fill:'none'}),node('text',{x:540,y:py(0)+5},'x'),node('text',{x:308,y:35},'y'));
 for(const [name,fn,color,dash]of [['f',m.f,'#124caf','none'],['g',m.g,'#9b3417','7 5']]){
  const d=Array.from({length:121},(_,i)=>{const x=-2+i/30;return(i?'L':'M')+px(x)+' '+py(fn(x));}).join(' ');
  svg.append(node('path',{d,fill:'none',stroke:color,'stroke-width':3,'stroke-dasharray':dash,'data-area-curve':name}));
 }
 for(const x of [...new Set([m.low,m.high])])svg.append(node('path',{d:`M${px(x)} 50V350`,stroke:'#333','stroke-dasharray':'2 4','data-area-boundary':x}));
 for(const x of m.roots)svg.append(node('circle',{cx:px(x),cy:py(m.f(x)),r:5,fill:'white',stroke:'#111','stroke-width':2,'data-area-intersection':x}));
 figure.append(svg,text('figcaption','Trazo continuo: f. Trazo de guiones: g. Rayado horizontal: f arriba; inclinado: g arriba. Círculos: puntos de corte dentro del intervalo. La escala vertical se ajusta al cambiar las funciones; los límites del recinto son las líneas punteadas.'));return figure;
}
export function initializeAreaExplorer(){
 const practice=document.querySelector('[data-area-practice]');if(practice)mountQuiz(practice,()=>generateAreaQuestions(crypto.getRandomValues(new Uint32Array(1))[0]));
 const root=document.querySelector('[data-area-explorer]');if(!root)return;const $=s=>root.querySelector(s),result=$('[data-area-result]');
 const update=()=>{
  const kind=$('[data-area-family]').value,a=Number($('[data-area-a]').value),b=Number($('[data-area-b]').value),k=Number($('[data-area-k]').value),swap=$('[data-area-swap]').checked,show=$('[data-area-shading]').checked,m=areaModel(kind,a,b,k,swap);
  updateMath(result,()=>{
   result.replaceChildren();result.dataset.selection=[kind,a,b,k,swap,show].join(':');result.dataset.area=m.area;result.dataset.integral=m.integral;
   result.append(text('p',tex`\(f(x)=${m.fTex},\qquad g(x)=${m.gTex}\).`));
   result.append(text('p',tex`\[A=\int_{${m.low}}^{${m.high}}|f(x)-g(x)|dx=${areaTex(m.area)}.\]`));
   const summary=text('p',tex`La integral orientada es \(\int_{${a}}^{${b}}(f-g)dx=${areaTex(m.integral)}\). ${a===b?'Los extremos coinciden: no hay anchura y el área es cero.':a>b?'Para el área se ordenan los límites de menor a mayor.':'El área suma aportaciones no negativas.'}`);summary.className='key-idea';result.append(summary,graph(m,show));
   if(m.segments.length){
    const region=document.createElement('div');region.className='table-scroll';region.tabIndex=0;region.setAttribute('role','region');region.setAttribute('aria-label','Área por tramos; desplazamiento horizontal');
    const table=document.createElement('table');table.innerHTML='<caption>Tramos en orden creciente y valores exactos</caption><thead><tr><th scope="col">Tramo</th><th scope="col">Superior</th><th scope="col">Integrando del área</th><th scope="col">Área</th></tr></thead><tbody></tbody>';
    for(const s of m.segments){const row=document.createElement('tr'),th=text('th',`[${s.left}, ${s.right}]`);th.scope='row';row.append(th,text('td',s.top),text('td',s.top==='f'?'f−g':'g−f'),text('td',tex`\(${areaTex(s.area)}\)`));table.tBodies[0].append(row);}region.append(table);result.append(region);
   }
   $('[data-area-status]').textContent='Área '+m.area.toLocaleString('es-ES',{maximumFractionDigits:6})+' unidades cuadradas; '+m.segments.length+' tramos. Valores exactos en las fórmulas y tabla.';
  });
 };
 root.addEventListener('change',update);
 $('[data-area-reverse]').addEventListener('click',()=>{const a=$('[data-area-a]').value;$('[data-area-a]').value=$('[data-area-b]').value;$('[data-area-b]').value=a;update();});update();
}
