import { translationModel, translationFamilies } from '../../../content/models/translations.js';
import { updateMath } from '../core/math.js';

export function initializeTranslationExplorer() {
  const root = document.querySelector('[data-translation-explorer]');
  if (!root) return;
  const result = root.querySelector('[data-translation-result]');
  const format = v => v.toLocaleString('es-ES', { maximumFractionDigits: 4 });
  const update = () => {
    const kind = root.querySelector('[data-shift-family]').value;
    const a = Number(root.querySelector('[data-shift-horizontal]').value);
    const k = Number(root.querySelector('[data-shift-vertical]').value);
    const showOriginal = root.querySelector('[data-show-original]').checked;
    const model = translationModel(kind, a, k), original = translationFamilies[kind];
    updateMath(result, () => {
      const t = '(x' + (a < 0 ? '+' + -a : a > 0 ? '-' + a : '') + ')';
      const transformed = kind === 'square' ? t + '^2' : kind === 'absolute' ? '\\left|' + t + '\\right|' : kind === 'reciprocal' ? '\\frac1{' + t + '}' : '\\ln' + t;
      const formula = document.createElement('p');
      formula.textContent = '\\[f(x)=' + original.tex + ',\\qquad g(x)=' + transformed + (k > 0 ? '+' + k : k < 0 ? k : '') + '.\\]';
      const description = document.createElement('p'); description.className = 'key-idea';
      const domain = kind === 'reciprocal' ? '\\mathbb R\\setminus\\{' + a + '\\}' : kind === 'logarithm' ? '(' + a + ',+\\infty)' : '\\mathbb R';
      const range = model.minimum ? '[' + k + ',+\\infty)' : kind === 'reciprocal' ? '\\mathbb R\\setminus\\{' + k + '\\}' : '\\mathbb R';
      description.textContent = 'Traslación: ' + a + ' en horizontal y ' + k + ' en vertical. Dominio de g: \\(' + domain + '\\). Recorrido: \\(' + range + '\\). ' + (model.minimum ? 'Mínimo en (' + a + ', ' + k + ').' : 'Asíntota vertical x=' + a + '.' + (kind === 'reciprocal' ? ' Horizontal y=' + k + '.' : ' No tiene asíntota horizontal.'));
      const mapped = model.point(1);
      const pointText = document.createElement('p');
      pointText.textContent = 'Punto de referencia: P=(1, ' + format(original.value(1)) + ') pasa a Q=(' + format(mapped[0]) + ', ' + format(mapped[1]) + '). Las dos coordenadas cambian sumando a y k, respectivamente.';
      const figure = document.createElement('figure'); figure.className = 'translation-figure';
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const node = (tag, attrs, text) => {
        const el = document.createElementNS(svg.namespaceURI, tag);
        for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
        if (text !== undefined) el.textContent = text;
        return el;
      };
      for (const [key,value] of Object.entries({viewBox:'0 0 560 360',width:560,height:360,role:'img','aria-labelledby':'shift-title shift-desc'})) svg.setAttribute(key,value);
      svg.append(node('title',{id:'shift-title'},original.label+': original y trasladada'));
      svg.append(node('desc',{id:'shift-desc'},(showOriginal?'La original aparece a trazos; la trasladada, continua. ':'Solo se muestra la trasladada. ')+'El cuadrado Q es el punto trasladado del círculo P: desplazamiento horizontal '+a+' y vertical '+k+'. La tabla proporciona las coordenadas.'));
      const px=x=>280+40*x,py=y=>180-24*y;
      const defs=node('defs',{}),clip=node('clipPath',{id:'shift-clip'});clip.append(node('rect',{x:30,y:20,width:500,height:310}));defs.append(clip);svg.append(defs);
      svg.append(node('path',{d:'M30 180H530M280 20V330',stroke:'#202020',fill:'none'}));
      for(const x of [-6,-4,-2,2,4,6]) {svg.append(node('path',{d:'M'+px(x)+' 176v8',stroke:'#202020'}));svg.append(node('text',{x:px(x)-8,y:201,fill:'#202020','font-size':14},x));}
      for(const y of [-4,-2,2,4,6]) {svg.append(node('path',{d:'M276 '+py(y)+'h8',stroke:'#202020'}));svg.append(node('text',{x:289,y:py(y)+5,fill:'#202020','font-size':14},y));}
      const group=node('g',{'clip-path':'url(#shift-clip)'});
      if(model.vertical!==null) group.append(node('path',{'data-shift-asymptote':'vertical',d:'M'+px(a)+' 20V330',stroke:'#754000','stroke-dasharray':'2 5',fill:'none'}));
      if(model.horizontal!==null) group.append(node('path',{'data-shift-asymptote':'horizontal',d:'M30 '+py(k)+'H530',stroke:'#754000','stroke-dasharray':'2 5',fill:'none'}));
      const draw = (shift, value, role) => {
        // Separar ramas de la inversa; muestrear el logaritmo solo dentro del dominio.
        const intervals = kind === 'reciprocal' ? [[-6,shift-0.01],[shift+0.01,6]] : [[-6,6]];
        const points=[];
        for(const [start,end] of intervals) for(let i=0;i<=400;i++) {
          const x=kind==='logarithm' ? shift+2**(-12+(Math.log2(6-shift)+12)*i/400) : start+(end-start)*i/400;
          points.push((i?'L':'M')+px(x).toFixed(3)+' '+py(value(x)).toFixed(3));
        }
        const attrs={'data-shift-curve':role,d:points.join(' '),fill:'none',stroke:role==='original'?'#555555':'#1746a2','stroke-width':role==='original'?2:3};
        if(role==='original')attrs['stroke-dasharray']='9 5';
        group.append(node('path',attrs));
      };
      if(showOriginal) draw(0,original.value,'original');
      draw(a,model.value,'translated');
      if(showOriginal) {
        group.append(node('path',{d:'M'+px(1)+' '+py(original.value(1))+'L'+px(mapped[0])+' '+py(mapped[1]),stroke:'#555555','stroke-dasharray':'3 4',fill:'none'}));
        group.append(node('circle',{'data-shift-original-point':'',cx:px(1),cy:py(original.value(1)),r:5,fill:'white',stroke:'#555555','stroke-width':2}));
      }
      group.append(node('rect',{'data-shift-point':'',x:px(mapped[0])-4,y:py(mapped[1])-4,width:8,height:8,fill:'#1746a2'}));svg.append(group);
      svg.append(node('text',{x:537,y:173,fill:'#202020','font-size':16},'x'));svg.append(node('text',{x:289,y:17,fill:'#202020','font-size':16},'y'));
      const caption=document.createElement('figcaption');caption.dataset.contentRole='caption';caption.textContent='Curva continua: g trasladada; curva a trazos: f original cuando está activada. Círculo: P; cuadrado: Q. Si a=k=0, las curvas coinciden. Rectas de puntos: asíntotas de g; segmento entre marcadores: desplazamiento. Ventana x de −6 a 6; las curvas continúan fuera del marco. Escala horizontal 40 y vertical 24 unidades de dibujo.';
      figure.append(svg,caption);
      const scroll=document.createElement('div');scroll.className='table-scroll';scroll.tabIndex=0;scroll.setAttribute('role','region');scroll.setAttribute('aria-label','Tabla de puntos originales y trasladados; desplazamiento horizontal disponible');
      const table=document.createElement('table'),cap=document.createElement('caption');cap.textContent='Cada punto (u,f(u)) se convierte en (u+a,f(u)+k); cifras hasta cuatro decimales';table.append(cap);
      const head=table.createTHead().insertRow();for(const label of ['u','f(u)','u+a','g(u+a)']){const th=document.createElement('th');th.scope='col';th.textContent=label;head.append(th);}
      const body=table.createTBody();for(const u of original.samples){const row=body.insertRow();for(const v of [u,original.value(u),...model.point(u)])row.insertCell().textContent=format(v);}
      scroll.append(table);result.replaceChildren(formula,description,pointText,figure,scroll);result.dataset.selection=[kind,a,k,Number(showOriginal)].join(':');
      root.querySelector('[data-translation-status]').textContent=original.label+'. Desplazamiento horizontal '+a+', vertical '+k+'. '+(showOriginal?'Original visible.':'Original oculta.');
    });
  };
  root.addEventListener('change',update);update();
}
