import {planSampleForMean} from '../../../content/models/sample-size.js';

const form=document.querySelector('[data-sample-size-form]');
if(form){
  form.hidden=false;
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const output=form.querySelector('[data-sample-size-output]');
    const confidence=Number(form.elements.confidence.value);
    const sigma=Number(form.elements.sigma.value);
    const targetMargin=Number(form.elements.targetMargin.value);
    try{
      const result=planSampleForMean({confidence,sigma,targetMargin});
      const decimal=new Intl.NumberFormat('es-ES',{maximumFractionDigits:4});
      output.textContent='Tamaño sin redondear: '+decimal.format(result.raw)+'. Muestra mínima: '+new Intl.NumberFormat('es-ES').format(result.n)+'. Margen calculado con ese tamaño: '+decimal.format(result.achievedMargin)+'. El resultado solo vale bajo los supuestos indicados.';
    }catch(error){output.textContent='Revisa los datos: elige un nivel válido, una desviación positiva y un margen objetivo positivo.';}
  });
}
