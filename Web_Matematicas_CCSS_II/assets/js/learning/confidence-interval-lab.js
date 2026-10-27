import {meanConfidenceInterval} from '../../../content/models/confidence-interval.js';

const root=document.querySelector('[data-ci-lab]');
if(root){
 root.hidden=false;
 const controls={mean:root.querySelector('[name="mean"]'),sigma:root.querySelector('[name="sigma"]'),n:root.querySelector('[name="n"]'),confidence:root.querySelector('[name="confidence"]')};
 const format=(value,digits=2)=>value.toLocaleString('es-ES',{minimumFractionDigits:digits,maximumFractionDigits:digits});
 function update(){
  const result=meanConfidenceInterval({mean:Number(controls.mean.value),sigma:Number(controls.sigma.value),n:Number(controls.n.value),confidence:Number(controls.confidence.value)});
  for(const [key,value] of Object.entries({mean:result.mean,sigma:result.sigma,n:result.n})) root.querySelector('[data-ci-value="'+key+'"]').textContent=String(value);
  root.querySelector('[data-ci-value="confidence"]').textContent=result.confidence+' %';
  root.querySelector('[data-ci-margin]').textContent=format(result.margin);
  root.querySelector('[data-ci-interval]').textContent='['+format(result.lower)+'; '+format(result.upper)+']';
  root.querySelector('[data-ci-width]').textContent=format(result.width);
  const band=root.querySelector('[data-ci-band]'), point=root.querySelector('[data-ci-point]'), left=root.querySelector('[data-ci-left]'), right=root.querySelector('[data-ci-right]'), center=root.querySelector('[data-ci-center]');
  band.setAttribute('x',result.lower);band.setAttribute('width',result.width);point.setAttribute('cx',result.mean);
  left.setAttribute('x1',result.lower);left.setAttribute('x2',result.lower);right.setAttribute('x1',result.upper);right.setAttribute('x2',result.upper);center.setAttribute('x1',result.mean);center.setAttribute('x2',result.mean);
  root.querySelector('[data-ci-desc]').textContent='Intervalo de '+format(result.lower)+' a '+format(result.upper)+', centrado en '+format(result.mean)+'. Margen '+format(result.margin)+'. Anchura '+format(result.width)+'.';
 }
 for(const control of Object.values(controls))control.addEventListener(control.tagName==='SELECT'?'change':'input',update);
 update();
}
