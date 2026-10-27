import {profitModel} from '../../../content/models/optimization.js';
import {updateMath} from '../core/math.js';

export function initializeOptimizationExplorer(){
  const root=document.querySelector('[data-optimization-explorer]');if(!root)return;
  const result=root.querySelector('[data-optimization-result]');
  const quantity=root.querySelector('[data-opt-quantity]');
  const format=v=>(v===0?0:v).toLocaleString('es-ES',{maximumFractionDigits:2});
  const update=()=>{
    const price=Number(root.querySelector('[data-opt-price]').value),fixed=Number(root.querySelector('[data-opt-fixed]').value),capacity=Number(root.querySelector('[data-opt-capacity]').value),mode=root.querySelector('[data-opt-mode]').value;
    const m=profitModel(price,fixed,capacity,mode);
    quantity.max=capacity;quantity.step=mode==='integer'?'1':'0.5';
    const q=Math.min(capacity,Math.max(0,mode==='integer'?Math.round(Number(quantity.value)):Number(quantity.value)));
    quantity.value=q;root.querySelector('[data-opt-current]').textContent=format(q)+' t';
    updateMath(result,()=>{
      const formula=document.createElement('p');formula.textContent='\\[p(q)='+price+'-q,\\quad C(q)=10q+'+fixed+',\\quad B(q)=-q^2+'+m.margin+'q-'+fixed+'.\\]';
      const domain=document.createElement('p');domain.textContent='Dominio factible: '+(mode==='integer'?'q=0,1,…,'+capacity+' toneladas enteras.':'0≤q≤'+capacity+' toneladas, cantidad divisible.')+' Punto estacionario del modelo continuo: q='+format(m.stationary)+' t. '+(m.stationary>capacity?'Queda fuera de la capacidad.':mode==='integer'&&!Number.isInteger(m.stationary)?'No es entero: hay que comparar sus vecinos.':'Pertenece al dominio factible.');
      const summary=document.createElement('p');summary.className='key-idea';summary.dataset.optSummary='';
      summary.textContent='Máximo factible: '+format(m.bestValue)+' € con q='+m.best.map(format).join(' o ')+' t. '+(m.best.length>1?'Hay empate entre ambas cantidades. ':m.best[0]===capacity?'La capacidad limita el resultado. ':'')+(m.bestValue<0?'El máximo sigue siendo una pérdida; el coste fijo se paga también con q=0.':'');
      const choice=document.createElement('p');choice.dataset.optChoice='';choice.textContent='Tu elección: '+format(q)+' t. Ingreso '+format(m.revenue(q))+' €, coste '+format(m.cost(q))+' €, beneficio '+format(m.value(q))+' €. Diferencia respecto al máximo: '+format(m.bestValue-m.value(q))+' €.';
      const figure=document.createElement('figure');figure.className='optimization-figure';
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      const node=(tag,attrs,text)=>{const el=document.createElementNS(svg.namespaceURI,tag);for(const [key,value]of Object.entries(attrs))el.setAttribute(key,String(value));if(text!==undefined)el.textContent=text;return el;};
      for(const [key,value]of Object.entries({viewBox:'0 0 560 370',width:560,height:370,role:'img','aria-labelledby':'opt-title opt-desc'}))svg.setAttribute(key,value);
      svg.append(node('title',{id:'opt-title'},'Beneficio y capacidad de producción'));
      svg.append(node('desc',{id:'opt-desc'},'Parábola cóncava. La zona a la derecha de '+capacity+' toneladas queda fuera de la capacidad. '+summary.textContent+' '+choice.textContent));
      const px=x=>50+16*x,py=y=>190-0.28*y;
      const defs=node('defs',{}),clip=node('clipPath',{id:'opt-clip'});clip.append(node('rect',{x:45,y:20,width:490,height:320}));defs.append(clip);svg.append(defs);
      svg.append(node('rect',{x:px(capacity),y:20,width:px(30)-px(capacity),height:320,fill:'#f1f1f1'}));
      svg.append(node('path',{d:'M45 190H535M50 20V340',stroke:'#202020',fill:'none'}));
      svg.append(node('path',{'data-opt-boundary':'',d:'M'+px(capacity)+' 20V340',stroke:'#754000','stroke-dasharray':'3 5',fill:'none'}));
      for(const x of [0,5,10,15,20,25,30]){svg.append(node('path',{d:'M'+px(x)+' 186v8',stroke:'#202020'}));svg.append(node('text',{x:px(x)-7,y:211,fill:'#202020','font-size':13},x));}
      for(const y of [-500,-300,-100,100,300,500]){svg.append(node('path',{d:'M46 '+py(y)+'h8',stroke:'#202020'}));svg.append(node('text',{x:3,y:py(y)+4,fill:'#202020','font-size':12},y));}
      const group=node('g',{'clip-path':'url(#opt-clip)'});
      const draw=(start,end,role)=>{const points=[];for(let i=0;i<=300;i++){const x=start+(end-start)*i/300;points.push((i?'L':'M')+px(x).toFixed(3)+' '+py(m.value(x)).toFixed(3));}const attrs={'data-opt-curve':role,d:points.join(' '),stroke:role==='feasible'?'#1746a2':'#666666','stroke-width':role==='feasible'?3:2,fill:'none'};if(role!=='feasible'||mode==='integer')attrs['stroke-dasharray']='6 5';group.append(node('path',attrs));};
      draw(0,capacity,'feasible');draw(capacity,30,'excluded');
      if(mode==='integer')for(let x=0;x<=capacity;x++)group.append(node('circle',{'data-opt-integer':x,cx:px(x),cy:py(m.value(x)),r:3,fill:'#1746a2'}));
      group.append(node('circle',{'data-opt-selected':'',cx:px(q),cy:py(m.value(q)),r:7,fill:'none',stroke:'#754000','stroke-width':2}));
      for(const x of m.best)group.append(node('rect',{'data-opt-best':x,x:px(x)-4,y:py(m.value(x))-4,width:8,height:8,fill:'#1746a2'}));svg.append(group);
      svg.append(node('text',{x:420,y:360,fill:'#202020','font-size':14},'q (toneladas)'));svg.append(node('text',{x:61,y:17,fill:'#202020','font-size':14},'B (€)'));
      const caption=document.createElement('figcaption');caption.dataset.contentRole='caption';caption.textContent='Límite vertical: capacidad '+capacity+' t. Zona sombreada y prolongación a trazos: cantidades excluidas. Cuadrados: máximos factibles; círculo grande: tu elección. '+(mode==='integer'?'Solo los puntos enteros son admisibles; la curva a trazos sirve de referencia. ':'La curva continua es el beneficio para cantidades divisibles. ')+'Escalas fijas: 16 unidades de dibujo por tonelada y 0,28 por euro.';figure.append(svg,caption);
      const scroll=document.createElement('div');scroll.className='table-scroll';scroll.tabIndex=0;scroll.setAttribute('role','region');scroll.setAttribute('aria-label','Tabla de candidatos; desplazamiento horizontal disponible');
      const table=document.createElement('table'),cap=document.createElement('caption');cap.textContent='Candidatos admisibles comparados; el mayor valor determina el máximo';table.append(cap);
      const head=table.createTHead().insertRow();for(const label of ['q (t)','B(q) (€)','Motivo y resultado']){const th=document.createElement('th');th.scope='col';th.textContent=label;head.append(th);}
      const body=table.createTBody();for(const point of m.candidates){const row=body.insertRow();row.dataset.candidate=point.q;row.insertCell().textContent=format(point.q);row.insertCell().textContent=format(point.value);row.insertCell().textContent=(point.q===0?'Frontera inicial':point.q===capacity?'Frontera de capacidad':mode==='integer'?'Entero cercano al vértice':'Punto estacionario')+(m.best.includes(point.q)?' · Máximo':'');}
      scroll.append(table);result.replaceChildren(formula,domain,summary,choice,figure,scroll);result.dataset.selection=[price,fixed,capacity,mode].join(':');result.dataset.quantity=q;
      root.querySelector('[data-optimization-status]').textContent='Actualizado. '+summary.textContent+' Tu elección: '+format(q)+' t, beneficio '+format(m.value(q))+' €.';
    });
  };
  root.addEventListener('change',event=>{if(event.target!==quantity)update();});quantity.addEventListener('input',update);update();
}
