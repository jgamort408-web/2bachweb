import { joiningModel } from '../../../content/models/piecewise.js';
import { updateMath } from '../core/math.js';

export function initializePiecewiseExplorer() {
  const root = document.querySelector('[data-piecewise-explorer]');
  if (!root) return;
  const result = root.querySelector('[data-piecewise-result]');
  const format = v => v.toLocaleString('es-ES', { maximumFractionDigits: 4 });
  const update = () => {
    const kind = root.querySelector('[data-joining-case]').value;
    const a = Number(root.querySelector('[data-joining-point]').value);
    const m = joiningModel(kind, a);
    updateMath(result, () => {
      const t = '(x' + (a < 0 ? '+' + -a : a > 0 ? '-' + a : '') + ')';
      const left = kind === 'corner' ? '-' + t + '-1' : kind === 'jump' ? t + '+1' : '(' + t + '+1)^2';
      const right = kind === 'corner' ? t + '-1' : kind === 'jump' ? t + '+3' : '2' + t + '+1';
      const formula = document.createElement('p');
      formula.textContent = '\\[f(x)=\\begin{cases}' + left + ',&x<' + a + ',\\\\' + (m.point === null ? '' : m.point + ',&x=' + a + ',\\\\') + right + ',&x>' + a + '.\\end{cases}\\]';
      const diagnosis = m.differentiable ? 'Continua y derivable en la unión.' : m.continuous ? 'Continua, con esquina: no es derivable en la unión.' : kind === 'jump' ? 'Discontinuidad de salto: los límites laterales no coinciden.' : kind === 'hole' ? 'El punto está fuera del dominio. Se puede extender con continuidad asignándole el límite común.' : 'Discontinuidad evitable: el valor no coincide con el límite común.';
      const description = document.createElement('p'); description.className = 'key-idea';
      description.textContent = diagnosis + ' Dominio: ' + (kind === 'hole' ? 'todos los reales salvo ' + a + '.' : 'todos los reales.') + (m.point === null ? ' f(' + a + ') no está definida.' : ' f(' + a + ')=' + m.point + '.');
      const limits = document.createElement('p');
      limits.textContent = '\\[\\lim_{x\\to ' + a + '^-}f(x)=' + m.leftLimit + ',\\qquad\\lim_{x\\to ' + a + '^+}f(x)=' + m.rightLimit + '.\\]';
      const derivative = document.createElement('p');
      derivative.textContent = m.continuous ? 'Derivadas laterales: izquierda ' + m.leftSlope + ', derecha ' + m.rightSlope + '. ' + (m.differentiable ? 'Coinciden: f′(' + a + ')=' + m.leftSlope + '.' : 'Son distintas: hay una esquina.') : 'No hay derivada en la unión. Las pendientes de las ramas no sustituyen a los cocientes incrementales calculados con el valor real del punto.';
      const figure = document.createElement('figure'); figure.className = 'piecewise-figure';
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const node = (tag, attrs, text) => {
        const el = document.createElementNS(svg.namespaceURI, tag);
        for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
        if (text !== undefined) el.textContent = text;
        return el;
      };
      for (const [key,value] of Object.entries({ viewBox:'0 0 560 360',width:560,height:360,role:'img','aria-labelledby':'piece-title piece-desc' })) svg.setAttribute(key,value);
      svg.append(node('title',{id:'piece-title'},m.label + ' en x=' + a));
      svg.append(node('desc',{id:'piece-desc'},'La rama izquierda llega a la altura ' + m.leftLimit + ' y la derecha a ' + m.rightLimit + '. ' + (m.point === null ? 'El punto de unión está excluido.' : 'El único valor incluido en la unión es ' + m.point + '.') + ' ' + diagnosis));
      const px = x => 280 + 75 * (x - a), py = y => 260 - 28 * y;
      const defs = node('defs',{}),clip = node('clipPath',{id:'piece-clip'});
      clip.append(node('rect',{x:35,y:20,width:490,height:310}));defs.append(clip);svg.append(defs);
      svg.append(node('path',{d:'M35 260H525M'+px(0)+' 20V330',stroke:'#202020',fill:'none'}));
      svg.append(node('path',{d:'M280 20V330',stroke:'#754000','stroke-dasharray':'4 5',fill:'none'}));
      for(const x of [a-3,a-2,a-1,a,a+1,a+2,a+3]) {
        svg.append(node('path',{d:'M'+px(x)+' 256v8',stroke:'#202020'}));
        svg.append(node('text',{x:px(x)-6,y:284,fill:'#202020','font-size':14},x));
      }
      for(const y of [-2,2,4,6,8]) {
        svg.append(node('path',{d:'M'+(px(0)-4)+' '+py(y)+'h8',stroke:'#202020'}));
        svg.append(node('text',{x:px(0)+8,y:py(y)+5,fill:'#202020','font-size':14},y));
      }
      const group=node('g',{'clip-path':'url(#piece-clip)'});
      for(const [side,start,end,fn,color] of [['left',-3,0,m.left,'#1746a2'],['right',0,3,m.right,'#17663d']]) {
        const points=Array.from({length:201},(_,i)=>{const t=start+(end-start)*i/200;return (i?'L':'M')+px(a+t).toFixed(3)+' '+py(fn(t)).toFixed(3);});
        group.append(node('path',{'data-piece-curve':side,d:points.join(' '),fill:'none',stroke:color,'stroke-width':3}));
      }
      // Los extremos abiertos se dibujan primero; el valor incluido, si existe, los cubre.
      for(const y of new Set([m.leftLimit,m.rightLimit])) group.append(node('circle',{'data-piece-open':y,cx:px(a),cy:py(y),r:6,fill:'white',stroke:'#202020','stroke-width':2}));
      if(m.point!==null) group.append(node('circle',{'data-piece-value':'',cx:px(a),cy:py(m.point),r:6,fill:'#202020'}));
      svg.append(group);
      svg.append(node('text',{x:534,y:253,fill:'#202020','font-size':16},'x'));
      svg.append(node('text',{x:px(0)+9,y:17,fill:'#202020','font-size':16},'y'));
      const caption=document.createElement('figcaption');caption.dataset.contentRole='caption';
      caption.textContent='Línea discontinua: posición x='+a+', no una asíntota. Círculo vacío: extremo excluido; relleno: valor de la función. Las ramas continúan fuera del marco. Escalas: 75 unidades de dibujo por unidad de x y 28 por unidad de y.';
      figure.append(svg,caption);
      const scroll=document.createElement('div');scroll.className='table-scroll';scroll.tabIndex=0;scroll.setAttribute('role','region');scroll.setAttribute('aria-label','Tabla de aproximaciones; desplázate horizontalmente para consultar todas las columnas');
      const table=document.createElement('table'),cap=document.createElement('caption');cap.textContent='Aproximaciones a la unión por ambos lados';table.append(cap);
      const head=table.createTHead().insertRow();
      for(const label of ['Distancia','x izquierda','f(x)','x derecha','f(x)']) {const th=document.createElement('th');th.scope='col';th.textContent=label;head.append(th);}
      const body=table.createTBody();
      for(const d of [0.5,0.1,0.01]) {const row=body.insertRow();for(const v of [d,a-d,m.value(a-d),a+d,m.value(a+d)]) row.insertCell().textContent=format(v);}
      scroll.append(table);result.replaceChildren(formula,description,limits,derivative,figure,scroll);result.dataset.selection=kind+':'+a;
      root.querySelector('[data-piecewise-status]').textContent=m.label+' en x='+a+'. '+diagnosis;
    });
  };
  root.addEventListener('change',update);update();
}
