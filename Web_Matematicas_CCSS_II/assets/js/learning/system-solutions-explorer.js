import {solutionPresets,classifyLines,parseCoordinate,checkPoint,solutionPoint,linesTex,solutionTex,generatedLines,clipLine} from '../../../content/models/system-solutions.js';
import {fraction,fractionTex} from '../../../content/models/matrix-inverse.js';
import {updateMath} from '../core/math.js';
const tex=String.raw,numeric=f=>f.numerator/f.denominator;
export function initializeSystemSolutionsExplorer(){
 const root=document.querySelector('[data-solution-explorer]');if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 let lines=structuredClone(solutionPresets.crossing.lines),point=[fraction(0),fraction(0)],range=6;
 const controls=el('div');controls.className='actions';
 function select(label,key,items){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [value,text]of items){const o=el('option',text);o.value=value;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Caso','solutionPreset',Object.entries(solutionPresets).map(([id,p])=>[id,p.label]));
 const custom=el('option','Variante generada');custom.value='custom';custom.disabled=true;preset.append(custom);
 const viewport=select('Ventana de ambos ejes','solutionWindow',[6,12,24].map(v=>[v,'De −'+v+' a '+v]));
 const generate=el('button','Generar otro caso del mismo tipo');generate.type='button';generate.dataset.solutionGenerate='';controls.append(generate);
 const candidates=el('fieldset');candidates.dataset.solutionCandidates='';candidates.append(el('legend','Punto que quieres comprobar'));
 const status=el('p');status.dataset.solutionStatus='';status.setAttribute('role','status');
 const fields=['x','y'].map((v,i)=>{const label=el('label',v+' = '),input=el('input');input.type='text';input.value='0';input.dataset.coordinate=v;input.setAttribute('aria-label','Coordenada '+v);label.append(input);candidates.append(label);
  input.addEventListener('change',()=>{const value=parseCoordinate(input.value);if(!value){input.setAttribute('aria-invalid','true');status.textContent='Escribe un entero, decimal de hasta tres cifras decimales o fracción; denominador no nulo de valor absoluto hasta 1000 y coordenada entre −99 y 99. Se conserva el último punto válido.';return;}input.removeAttribute('aria-invalid');point[i]=value;status.textContent=candidates.querySelector('[aria-invalid]')?'Quedan coordenadas inválidas; se usan sus últimos valores válidos.':'Punto actualizado.';render();});return input;});
 const actions=el('div');actions.className='actions';
 const parameterLabel=el('label','Parámetro t (solo si coinciden) '),parameter=el('input');parameter.type='range';parameter.min=-9;parameter.max=9;parameter.step=1;parameter.value=0;parameter.dataset.solutionParameter='';parameter.setAttribute('aria-label','Parámetro t');parameterLabel.append(parameter);
 const use=el('button','Usar un punto solución');use.type='button';use.dataset.solutionUse='';actions.append(use,parameterLabel);
 const figure=el('figure');figure.dataset.solutionFigure='';
 const output=el('div');output.dataset.solutionOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','Las dos ecuaciones representan rectas: ninguna tiene ambos coeficientes cero. R1 es continua y R2 discontinua. La escala es la misma en ambos ejes. Escribe coordenadas como 2, −1,5 o 1/3. Se admiten valores entre −99 y 99; la gráfica muestra solo la ventana seleccionada.'),candidates,actions,status,figure,output);
 function writePoint(p){point=p;fields.forEach((input,i)=>{input.value=point[i].denominator===1?String(point[i].numerator):point[i].numerator+'/'+point[i].denominator;input.removeAttribute('aria-invalid');});status.textContent='Punto solución cargado; comprueba las dos sustituciones.';}
 function draw(m,checks){
  const svg=(tag,attrs={})=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,v);return n;};
  const chart=svg('svg',{viewBox:'0 0 480 480',role:'img','aria-labelledby':'solution-title solution-desc'}),title=svg('title',{id:'solution-title'}),desc=svg('desc',{id:'solution-desc'});
  title.textContent='Dos rectas y un punto de prueba';
  desc.textContent=({unique:'Las rectas tienen un único punto común.',infinite:'Las dos rectas coinciden.',none:'Las rectas son paralelas distintas.'}[m.kind])+` Ventana: de −${range} a ${range} en cada eje. Punto de prueba: (${point.map(numeric).join(', ')}); cumple ${checks.filter(c=>c.satisfied).length} ecuaciones. La solución exacta y las sustituciones se explican debajo.`;
  chart.append(title,desc);
  const px=x=>240+200*x/range,py=y=>240-200*y/range;
  for(const t of [-range,-range/2,0,range/2,range]){
   chart.append(svg('path',{d:`M${px(t)} 40V440M40 ${py(t)}H440`,stroke:'currentColor','stroke-opacity':t===0?1:.18,fill:'none'}));
   const x=svg('text',{x:px(t),y:462,'text-anchor':'middle',fill:'currentColor'});x.textContent=t;chart.append(x);
   const y=svg('text',{x:32,y:py(t)+5,'text-anchor':'end',fill:'currentColor'});y.textContent=t;chart.append(y);
  }
  const xLabel=svg('text',{x:465,y:240,fill:'currentColor'}),yLabel=svg('text',{x:244,y:22,fill:'currentColor'});xLabel.textContent='x';yLabel.textContent='y';chart.append(xLabel,yLabel);
  lines.forEach((line,i)=>{const segment=clipLine(line,range);if(segment.length!==2)return;
   const path=svg('path',{d:`M${px(segment[0][0])} ${py(segment[0][1])}L${px(segment[1][0])} ${py(segment[1][1])}`,stroke:i?'#8c3a00':'#1746a2','stroke-width':i?3:5,fill:'none','data-solution-line':i+1});if(i)path.setAttribute('stroke-dasharray','10 6');chart.append(path);
  });
  const inside=p=>p.every(f=>Math.abs(numeric(f))<=range);
  if(m.kind==='unique'&&inside(m.point))chart.append(svg('rect',{x:px(numeric(m.point[0]))-6,y:py(numeric(m.point[1]))-6,width:12,height:12,fill:'currentColor','data-intersection':''}));
  if(inside(point))chart.append(svg('circle',{cx:px(numeric(point[0])),cy:py(numeric(point[1])),r:7,fill:'var(--color-background, white)',stroke:'currentColor','stroke-width':2,'data-candidate-point':''}));
  figure.replaceChildren(chart,el('figcaption','R1: trazo continuo. R2: trazo discontinuo. Cuadrado: intersección única, si existe y está en la ventana. Círculo hueco: punto de prueba. Las rectas continúan fuera del dibujo.'));
 }
 function render(){
  const a=structuredClone(lines),p=structuredClone(point),m=classifyLines(a),checks=checkPoint(a,p),windowSize=range;
  use.disabled=m.kind==='none';parameter.disabled=m.kind!=='infinite';draw(m,checks);
  return updateMath(output,()=>{
   output.dataset.kind=m.kind;output.dataset.count=checks.filter(c=>c.satisfied).length;output.dataset.snapshot=JSON.stringify({lines:a,point:p,range:windowSize});
   output.replaceChildren(el('p',tex`\[\text{R1 y R2:}\quad ${linesTex(a)}\]`),el('p',{unique:'Una única solución: las rectas se cortan en un punto.',infinite:'Infinitas soluciones: ambas ecuaciones describen la misma recta.',none:'Sin solución: rectas paralelas distintas, sin puntos comunes.'}[m.kind]),el('p',tex`\[${solutionTex(a)}.\]`));
   if(m.kind==='unique'&&m.point.some(f=>Math.abs(numeric(f))>windowSize))output.append(el('p','La intersección está fuera de esta ventana. Amplía la escala; no confundas no verla con que no exista.'));
   if(m.kind==='infinite')output.append(el('p','t puede ser cualquier número real; el deslizador solo muestra algunos enteros. Usa un punto solución o mueve t para comprobar otros puntos de la misma recta.'));
   if(p.some(f=>Math.abs(numeric(f))>windowSize))output.append(el('p','El punto de prueba está fuera de la ventana, pero la comprobación algebraica sigue siendo válida.'));
   const list=el('ol');checks.forEach((r,i)=>list.append(el('li',tex`\[(${a[i][0]})\cdot\left(${fractionTex(p[0])}\right)+(${a[i][1]})\cdot\left(${fractionTex(p[1])}\right)=${fractionTex(r.left)}${r.satisfied?'=':tex`\ne`}${r.right}.\] ${r.satisfied?'Cumple esta ecuación.':'No cumple esta ecuación.'}`)));output.append(list,el('p',`El punto cumple ${checks.filter(c=>c.satisfied).length} de 2 ecuaciones. ${checks.every(c=>c.satisfied)?'Es solución.':'No es solución.'} La comprobación usa fracciones exactas, no una tolerancia gráfica.`));
  });
 }
 function reset(){point=[fraction(0),fraction(0)];fields.forEach(f=>{f.value='0';f.removeAttribute('aria-invalid');});parameter.value=0;status.textContent='';render();}
 preset.addEventListener('change',()=>{if(preset.value==='custom')return;lines=structuredClone(solutionPresets[preset.value].lines);reset();});
 viewport.addEventListener('change',()=>{range=Number(viewport.value);render();});
 generate.addEventListener('click',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;lines=generatedLines(seed,classifyLines(lines).kind);preset.value='custom';reset();});
 use.addEventListener('click',()=>{const p=solutionPoint(lines,Number(parameter.value));if(p){writePoint(p);render();}});
 parameter.addEventListener('input',()=>{if(classifyLines(lines).kind==='infinite'){writePoint(solutionPoint(lines,Number(parameter.value)));render();}});
 render();
}
