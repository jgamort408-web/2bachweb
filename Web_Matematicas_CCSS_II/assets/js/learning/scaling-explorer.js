import { scalingModel, scalingFamilies } from '../../../content/models/scaling.js';
import { updateMath } from '../core/math.js';

export function initializeScalingExplorer() {
  const root=document.querySelector('[data-scaling-explorer]');
  if(!root)return;
  const result=root.querySelector('[data-scaling-result]');
  const format=v=>(v===0?0:v).toLocaleString('es-ES',{maximumFractionDigits:4});
  const tex=v=>v===0.5?'\\frac12':String(v);
  const update=()=>{
    const kind=root.querySelector('[data-scale-family]').value;
    const a=Number(root.querySelector('[data-scale-vertical]').value);
    const b=Number(root.querySelector('[data-scale-horizontal]').value);
    const showOriginal=root.querySelector('[data-scale-original]').checked;
    const m=scalingModel(kind,a,b),original=scalingFamilies[kind];
    updateMath(result,()=>{
      const argument=(b===1?'x':tex(b)+'x');
      const inside=kind==='parabola'?'('+argument+'-1)^2':kind==='reciprocal'?'\\frac1{'+argument+'-1}':'\\ln('+argument+')';
      const formula=document.createElement('p');formula.textContent='\\[f(x)='+original.tex+',\\qquad g(x)='+tex(a)+'\\cdot '+inside+'.\\]';
      const domain=kind==='parabola'?'\\mathbb R':kind==='reciprocal'?'\\mathbb R\\setminus\\{'+tex(1/b)+'\\}':b>0?'(0,+\\infty)':'(-\\infty,0)';
      const range=kind==='parabola'?(a>0?'[0,+\\infty)':'(-\\infty,0]'):kind==='reciprocal'?'\\mathbb R\\setminus\\{0\\}':'\\mathbb R';
      const description=document.createElement('p');description.className='key-idea';
      description.textContent='Escala vertical '+format(Math.abs(a))+'; escala horizontal '+format(1/Math.abs(b))+'. '+(a<0?'Reflexión respecto a X. ':'')+(b<0?'Reflexión respecto a Y. ':'')+'Dominio de g: \\('+domain+'\\). Recorrido: \\('+range+'\\). '+(m.extremum?'Tiene '+m.extremum.type+' en ('+format(m.extremum.x)+', 0).':'Asíntota vertical x='+format(m.verticalAsymptote)+'. '+(kind==='reciprocal'?'Horizontal y=0.':''));
      const mapped=m.point(2),pointText=document.createElement('p');
      pointText.textContent='P=(2, '+format(original.value(2))+') pasa a Q=('+format(mapped[0])+', '+format(mapped[1])+'). La primera coordenada se divide por b; la segunda se multiplica por a.';
      const figure=document.createElement('figure');figure.className='scaling-figure';
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      const node=(tag,attrs,text)=>{const el=document.createElementNS(svg.namespaceURI,tag);for(const [key,value]of Object.entries(attrs))el.setAttribute(key,String(value));if(text!==undefined)el.textContent=text;return el;};
      for(const [key,value]of Object.entries({viewBox:'0 0 560 360',width:560,height:360,role:'img','aria-labelledby':'scale-title scale-desc'}))svg.setAttribute(key,value);
      svg.append(node('title',{id:'scale-title'},original.label+': escala y reflexión'));
      svg.append(node('desc',{id:'scale-desc'},(showOriginal?'Original a trazos y transformada continua. ':'Solo la transformada. ')+'El punto P pasa a Q dividiendo la abscisa por '+format(b)+' y multiplicando la ordenada por '+format(a)+'. La tabla ofrece las coordenadas.'));
      const px=x=>280+40*x,py=y=>180-24*y;
      const defs=node('defs',{}),clip=node('clipPath',{id:'scale-clip'});clip.append(node('rect',{x:30,y:20,width:500,height:310}));defs.append(clip);svg.append(defs);
      svg.append(node('path',{d:'M30 180H530M280 20V330',stroke:'#202020',fill:'none'}));
      for(const x of [-6,-4,-2,2,4,6]){svg.append(node('path',{d:'M'+px(x)+' 176v8',stroke:'#202020'}));svg.append(node('text',{x:px(x)-8,y:201,fill:'#202020','font-size':14},x));}
      for(const y of [-4,-2,2,4,6]){svg.append(node('path',{d:'M276 '+py(y)+'h8',stroke:'#202020'}));svg.append(node('text',{x:289,y:py(y)+5,fill:'#202020','font-size':14},y));}
      const group=node('g',{'clip-path':'url(#scale-clip)'});
      if(m.verticalAsymptote!==null)group.append(node('path',{'data-scale-asymptote':'vertical',d:'M'+px(m.verticalAsymptote)+' 20V330',stroke:'#754000','stroke-dasharray':'2 5',fill:'none'}));
      if(kind==='reciprocal')group.append(node('path',{'data-scale-asymptote':'horizontal',d:'M30 180H530',stroke:'#754000','stroke-dasharray':'2 5',fill:'none'}));
      const draw=(factor,value,role)=>{
        const pole=1/factor;
        const intervals=kind==='reciprocal'?[[-6,pole-0.01],[pole+0.01,6]]:[[-6,6]];
        const points=[];
        for(const [start,end]of intervals)for(let i=0;i<=400;i++){
          const x=kind==='logarithm'?Math.sign(factor)*2**(-12+(Math.log2(6)+12)*i/400):start+(end-start)*i/400;
          points.push((i?'L':'M')+px(x).toFixed(3)+' '+py(value(x)).toFixed(3));
        }
        const attrs={'data-scale-curve':role,d:points.join(' '),fill:'none',stroke:role==='original'?'#555555':'#1746a2','stroke-width':role==='original'?2:3};
        if(role==='original')attrs['stroke-dasharray']='9 5';group.append(node('path',attrs));
      };
      if(showOriginal)draw(1,original.value,'original');draw(b,m.value,'transformed');
      if(showOriginal){group.append(node('path',{d:'M'+px(2)+' '+py(original.value(2))+'L'+px(mapped[0])+' '+py(mapped[1]),stroke:'#555555','stroke-dasharray':'3 4',fill:'none'}));group.append(node('circle',{'data-scale-original-point':'',cx:px(2),cy:py(original.value(2)),r:5,fill:'white',stroke:'#555555','stroke-width':2}));}
      group.append(node('rect',{'data-scale-point':'',x:px(mapped[0])-4,y:py(mapped[1])-4,width:8,height:8,fill:'#1746a2'}));svg.append(group);
      svg.append(node('text',{x:537,y:173,fill:'#202020','font-size':16},'x'));svg.append(node('text',{x:289,y:17,fill:'#202020','font-size':16},'y'));
      const caption=document.createElement('figcaption');caption.dataset.contentRole='caption';caption.textContent='Curva a trazos: original; continua: transformada. Círculo P y cuadrado Q: puntos correspondientes. Rectas de puntos: asíntotas de g. Las curvas continúan fuera del marco. Escalas fijas: 40 unidades de dibujo por unidad de x y 24 por unidad de y. Con a=b=1 coinciden ambas curvas.';figure.append(svg,caption);
      const scroll=document.createElement('div');scroll.className='table-scroll';scroll.tabIndex=0;scroll.setAttribute('role','region');scroll.setAttribute('aria-label','Tabla de puntos originales y transformados; desplazamiento horizontal disponible');
      const table=document.createElement('table'),cap=document.createElement('caption');cap.textContent='De (u,f(u)) a (u/b,a·f(u)); cifras hasta cuatro decimales';table.append(cap);
      const head=table.createTHead().insertRow();for(const label of ['u','f(u)','u/b','g(u/b)']){const th=document.createElement('th');th.scope='col';th.textContent=label;head.append(th);}
      const body=table.createTBody();for(const u of original.samples){const row=body.insertRow();for(const v of [u,original.value(u),...m.point(u)])row.insertCell().textContent=format(v);}
      scroll.append(table);result.replaceChildren(formula,description,pointText,figure,scroll);result.dataset.selection=[kind,a,b,Number(showOriginal)].join(':');
      root.querySelector('[data-scaling-status]').textContent=original.label+'. Factor exterior '+format(a)+', interior '+format(b)+'. '+(showOriginal?'Original visible.':'Original oculta.');
    });
  };
  root.addEventListener('change',update);update();
}
