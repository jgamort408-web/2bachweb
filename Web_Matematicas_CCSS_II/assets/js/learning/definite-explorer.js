import {definiteModel} from '../../../content/models/definite-integrals.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
const fmt=x=>x.toLocaleString('es-ES',{maximumFractionDigits:6,useGrouping:false});
const mathNumber=x=>fmt(x).replace(',','{,}');
const text=(tag,value)=>{const n=document.createElement(tag);n.textContent=value;return n;};
const NS='http://www.w3.org/2000/svg';
const node=(tag,attrs={},value)=>{const n=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(value!==undefined)n.textContent=value;return n;};
function graph(m,showRectangles){
 const px=x=>285+75*x,py=y=>200-45*y;
 const figure=document.createElement('figure');figure.className='definite-figure';
 const svg=node('svg',{viewBox:'0 0 600 480',role:'img','aria-labelledby':'definite-title definite-desc'});
 svg.append(node('title',{id:'definite-title'},'Integral y regiones con signo'),node('desc',{id:'definite-desc'},`${m.family.label}, límites a=${m.a}, b=${m.b}. Región superior ${fmt(m.positive)}, inferior ${fmt(m.negative)}; integral ${fmt(m.integral)} y área geométrica ${fmt(m.area)}. ${m.orientation===0?'Los límites coinciden.':m.orientation>0?'Orientación hacia la derecha.':'Orientación hacia la izquierda.'} ${showRectangles?m.rectangles.length+' rectángulos de punto medio.':''}`));
 const defs=node('defs');
 for(const [name,color,path]of [['positive','#dbeafe','M0 3H8'],['negative','#ffedd5','M-2 2L2 -2M0 8L8 0M6 10L10 6']]){
  const pattern=node('pattern',{id:'definite-'+name,patternUnits:'userSpaceOnUse',width:8,height:8});pattern.append(node('rect',{width:8,height:8,fill:color}),node('path',{d:path,stroke:'#555','stroke-width':.8}));defs.append(pattern);
 }
 const marker=node('marker',{id:'definite-arrow',viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:7,markerHeight:7,orient:'auto-start-reverse'});marker.append(node('path',{d:'M0 0L10 5L0 10Z',fill:'#222'}));defs.append(marker);svg.append(defs);
 for(let x=-3;x<=3;x++)svg.append(node('path',{d:`M${px(x)} 65V380`,stroke:'#ddd'}),node('text',{x:px(x),y:403,'text-anchor':'middle'},x));
 for(let y=-4;y<=3;y++)svg.append(node('path',{d:`M60 ${py(y)}H510`,stroke:'#ddd'}),node('text',{x:49,y:py(y)+5,'text-anchor':'end'},y));
 for(const s of m.segments){if(!s.area)continue;svg.append(node('path',{d:`M${px(s.left)} ${py(0)}L${px(s.left)} ${py(s.yLeft)}L${px(s.right)} ${py(s.yRight)}L${px(s.right)} ${py(0)}Z`,fill:`url(#definite-${s.contribution>0?'positive':'negative'})`,stroke:'#666','data-definite-region':s.contribution>0?'positive':'negative'}));}
 if(showRectangles)for(const r of m.rectangles)svg.append(node('rect',{x:px(r.left),y:Math.min(py(0),py(r.height)),width:px(r.right)-px(r.left),height:Math.abs(py(r.height)-py(0)),fill:'none',stroke:'#222','stroke-width':1.5,'stroke-dasharray':'4 3','data-definite-rectangle':'','data-midpoint':r.mid}));
 svg.append(node('path',{d:'M60 200H510M285 65V380',stroke:'#222',fill:'none','stroke-width':1.5}),node('text',{x:528,y:205},'x'),node('text',{x:292,y:48},'y'));
 const d=Array.from({length:121},(_,i)=>{const x=-3+i/20;return (i?'L':'M')+px(x)+' '+py(m.family.value(x));}).join(' ');
 svg.append(node('path',{d,fill:'none',stroke:'#124caf','stroke-width':3,'data-definite-curve':''}));
 for(const x of [...new Set([m.a,m.b])])svg.append(node('path',{d:`M${px(x)} 60V380`,stroke:'#333','stroke-dasharray':'2 5'}));
 if(m.a===m.b){svg.append(node('text',{x:px(m.a),y:427,'text-anchor':'middle'},'a=b='+m.a),node('circle',{cx:px(m.a),cy:450,r:4,fill:'#222'}));}
 else {for(const [label,x]of [['a',m.a],['b',m.b]])svg.append(node('text',{x:px(x),y:427,'text-anchor':'middle'},label+'='+x));svg.append(node('path',{d:`M${px(m.a)} 450H${px(m.b)}`,stroke:'#222','stroke-width':2,'marker-end':'url(#definite-arrow)','data-definite-direction':m.orientation}));}
 figure.append(svg,text('figcaption','Rayado horizontal: región sobre el eje. Rayado inclinado: región bajo el eje. Curva continua: función. Contornos discontinuos: rectángulos cuando están activados. La flecha inferior va de a hacia b; las áreas rayadas no cambian al invertirla.'));return figure;
}
function table(m){
 const scroll=document.createElement('div');scroll.className='table-scroll';scroll.tabIndex=0;scroll.setAttribute('role','region');scroll.setAttribute('aria-label','Áreas por tramos de izquierda a derecha; desplazamiento horizontal');
 const t=document.createElement('table');t.append(text('caption','Tramos ordenados de izquierda a derecha, con independencia de la orientación elegida'));
 const head=document.createElement('thead'),hr=document.createElement('tr');for(const label of ['Intervalo','Posición','Área geométrica','Aporte de izquierda a derecha']){const th=text('th',label);th.scope='col';hr.append(th);}head.append(hr);t.append(head);
 const body=document.createElement('tbody');for(const s of m.segments){const row=document.createElement('tr'),th=text('th',`[${s.left}, ${s.right}]`);th.scope='row';row.append(th,text('td',s.contribution>0?'Sobre el eje':s.contribution<0?'Bajo el eje':'En el eje'),text('td',fmt(s.area)),text('td',fmt(s.contribution)));body.append(row);}t.append(body);scroll.append(t);return scroll;
}
export function initializeDefiniteExplorer(){
 const root=document.querySelector('[data-definite-explorer]');if(!root)return;
 const $=s=>root.querySelector(s),result=$('[data-definite-result]');
 const update=()=>{
  const kind=$('[data-definite-family]').value,a=Number($('[data-definite-a]').value),b=Number($('[data-definite-b]').value),n=Number($('[data-definite-n]').value),show=$('[data-definite-rectangles]').checked;
  const m=definiteModel(kind,a,b,n);
  return updateMath(result,()=>{
   result.dataset.selection=[kind,a,b,n,show].join(':');for(const key of ['integral','area','positive','negative','approximation','error'])result.dataset[key]=m[key];result.replaceChildren();
   result.append(text('p',tex`\[\int_{${a}}^{${b}}(${m.family.tex})\,dx=${mathNumber(m.integral)},\qquad A_{\mathrm{geom}}=${mathNumber(m.area)}.\]`));
   const summary=text('p',`Entre ${m.low} y ${m.high}, de izquierda a derecha: área superior ${fmt(m.positive)} y área inferior ${fmt(m.negative)}. ${m.orientation<0?'Has invertido la orientación: se cambia el signo de la diferencia de áreas.':m.orientation===0?'Los límites coinciden: no hay intervalo con anchura y ambos resultados valen cero.':'La integral resta el área inferior del área superior.'}`);summary.className='key-idea';result.append(summary,graph(m,show));
   if(m.segments.length)result.append(table(m));
   const approximation=text('p',tex`Puntos medios: \(S_{${n}}=${mathNumber(m.approximation)}\). Error absoluto respecto al valor exacto: \(${mathNumber(m.error)}\). ${m.orientation<0?'Los rectángulos se construyen en el intervalo ordenado y se invierte el signo de su suma.':''} ${m.orientation===0?'No se dibujan rectángulos porque la anchura es cero.':'Los decimales se muestran con hasta seis cifras.'}`);result.append(approximation);
   $('[data-definite-status]').textContent=`Integral ${fmt(m.integral)}; área geométrica ${fmt(m.area)}; aproximación ${fmt(m.approximation)}; error ${fmt(m.error)}.`;
  });
 };
 root.addEventListener('change',update);
 $('[data-definite-swap]').addEventListener('click',()=>{const a=$('[data-definite-a]').value;$('[data-definite-a]').value=$('[data-definite-b]').value;$('[data-definite-b]').value=a;update();});update();
}
