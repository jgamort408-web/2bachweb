/** Gráfica y tabla equivalentes; la animación nunca interviene en la corrección. */
export function mountLimitGraph(root, data) {
  const {a,left,right,point,leftSlope,rightSlope}=data;
  let step=0,interval;
  const distances=[1,.5,.25,.125,.0625];
  const px=x=>220+60*(x-a),py=y=>155-20*y;
  const fmt=value=>value.toLocaleString('es-ES',{maximumFractionDigits:4});
  const path=(x1,y1,x2,y2)=>'M'+px(x1)+' '+py(y1)+'L'+px(x2)+' '+py(y2);
  root.innerHTML='<figure><svg viewBox="0 0 440 320" role="img" aria-labelledby="limit-title limit-desc">'+
    '<title id="limit-title">Lectura de límites laterales</title><desc id="limit-desc"></desc>'+
    '<path data-grid stroke="#e1e4e8" fill="none"/><path data-axes stroke="#8792a2" fill="none"/>'+
    '<path data-left stroke="#1746a2" stroke-width="3" fill="none"/><path data-right stroke="#1746a2" stroke-width="3" fill="none"/>'+
    '<circle data-hole-left r="5" fill="white" stroke="#1746a2" stroke-width="2"/><circle data-hole-right r="5" fill="white" stroke="#1746a2" stroke-width="2"/>'+
    '<circle data-value r="5" fill="#172033"/><circle data-moving-left r="5" fill="#754000"/><rect data-moving-right width="9" height="9" fill="#754000"/>'+
    '<g data-ticks font-size="12"></g></svg><figcaption>Círculos vacíos: extremos de las ramas. Punto negro: valor puntual. Círculo y cuadrado marrones: aproximaciones por ambos lados.</figcaption></figure>'+
    '<div class="actions"><button type="button" data-step>Acercar puntos</button><button type="button" data-animate>Animar aproximación</button></div>'+
    '<p data-distance aria-live="off"></p><table><caption>Valores de la misma gráfica</caption><thead><tr><th scope="col">Posición</th><th scope="col">x</th><th scope="col">f(x)</th></tr></thead><tbody>'+
    '<tr><th scope="row">Izquierda</th><td data-lx></td><td data-ly></td></tr><tr><th scope="row">Punto</th><td>'+a+'</td><td>'+point+'</td></tr>'+
    '<tr><th scope="row">Derecha</th><td data-rx></td><td data-ry></td></tr></tbody></table>';
  const $=selector=>root.querySelector(selector);
  $('[data-left]').setAttribute('d',path(a-3,left-3*leftSlope,a,left));
  $('[data-right]').setAttribute('d',path(a,right,a+3,right+3*rightSlope));
  $('[data-axes]').setAttribute('d',path(a-3,0,a+3,0)+' '+path(0,-6,0,6));
  $('[data-grid]').setAttribute('d',[-4,-2,2,4].map(y=>path(a-3,y,a+3,y)).join(' '));
  for(const [selector,y] of [['[data-hole-left]',left],['[data-hole-right]',right],['[data-value]',point]]){
    $(selector).setAttribute('cx',px(a));$(selector).setAttribute('cy',py(y));
  }
  for(const [x,y,text] of [...[-2,-1,0,1,2].map(d=>[px(a+d),300,a+d]),...[-4,-2,0,2,4].map(y=>[20,py(y),y])]){
    const label=document.createElementNS('http://www.w3.org/2000/svg','text');
    label.setAttribute('x',x);label.setAttribute('y',y);label.setAttribute('text-anchor','middle');label.textContent=text;$('[data-ticks]').append(label);
  }
  const render=()=>{
    const d=distances[step],lx=a-d,rx=a+d,ly=left-leftSlope*d,ry=right+rightSlope*d;
    for(const [key,value] of Object.entries({lx,rx,ly,ry}))$('[data-'+key+']').textContent=fmt(value);
    $('[data-moving-left]').setAttribute('cx',px(lx));$('[data-moving-left]').setAttribute('cy',py(ly));
    $('[data-moving-right]').setAttribute('x',px(rx)-4.5);$('[data-moving-right]').setAttribute('y',py(ry)-4.5);
    $('[data-distance]').textContent='Distancia al punto '+a+': '+fmt(d)+'.';
    $('#limit-desc').textContent='En x='+a+', la rama izquierda termina en un círculo vacío a altura '+left+' y la derecha a altura '+right+'. El punto relleno está a altura '+point+'. La tabla ofrece los valores de aproximación.';
    $('[data-step]').textContent=step===distances.length-1?'Reiniciar aproximación':'Acercar puntos';
  };
  const advance=()=>{step=(step+1)%distances.length;render();};
  const stop=()=>{clearInterval(interval);interval=undefined;$('[data-animate]').textContent='Animar aproximación';};
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const preference=()=>{if(reduced.matches)stop();$('[data-animate]').disabled=reduced.matches;};
  $('[data-step]').addEventListener('click',()=>{stop();advance();});
  $('[data-animate]').addEventListener('click',()=>{
    if(interval)stop();else if(!reduced.matches){interval=setInterval(advance,600);$('[data-animate]').textContent='Detener animación';}
  });
  reduced.addEventListener('change',preference);preference();render();
  return {stop,destroy(){stop();reduced.removeEventListener('change',preference);root.replaceChildren();}};
}
