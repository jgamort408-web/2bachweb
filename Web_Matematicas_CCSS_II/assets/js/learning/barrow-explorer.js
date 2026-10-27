import {barrowModel,generateBarrowQuestions} from '../../../content/models/barrow.js';
import {updateMath} from '../core/math.js';
import {mountQuiz} from './quiz.js';
const tex=String.raw;
const format=n=>(Math.abs(n)<1e-12?0:n).toLocaleString('es-ES',{maximumFractionDigits:6});
export function initializeBarrowExplorer(){
 const practice=document.querySelector('[data-barrow-practice]');
 if(practice)mountQuiz(practice,()=>generateBarrowQuestions(crypto.getRandomValues(new Uint32Array(1))[0]));
 const root=document.querySelector('[data-barrow-explorer]');if(!root)return;
 const family=root.querySelector('[data-barrow-family]'),a=root.querySelector('[data-barrow-a]'),b=root.querySelector('[data-barrow-b]'),c=root.querySelector('[data-barrow-c]'),result=root.querySelector('[data-barrow-result]'),status=root.querySelector('[data-barrow-status]');
 const render=()=>{
  const kind=family.value,lo=Number(a.value),hi=Number(b.value),constant=Number(c.value),m=barrowModel(kind,lo,hi,constant);
  updateMath(result,()=>{
   result.replaceChildren();result.dataset.selection=[kind,lo,hi,constant].join(':');result.dataset.valid=String(m.valid);delete result.dataset.value;
   if(!m.valid){const p=document.createElement('p');p.className='key-idea';p.textContent=m.reason;result.append(p);status.textContent='No se calcula: revisa el dominio y elige dos extremos del mismo lado de cero.';return;}
   result.dataset.value=String(m.value);
   const p=document.createElement('p');p.textContent=tex`\(f(x)=${m.family.f},\quad F_C(x)=${m.family.F}+(${constant})\). La misma constante se usa en los dos extremos.`;result.append(p);
   const region=document.createElement('div');region.className='table-scroll';region.tabIndex=0;region.setAttribute('role','region');region.setAttribute('aria-label','Evaluación de extremos; desplázate horizontalmente si es necesario');
   const table=document.createElement('table');table.innerHTML='<caption>Evaluaciones de la misma primitiva (decimales redondeados a seis decimales)</caption><thead><tr><th scope="col">Extremo</th><th scope="col">Valor exacto</th><th scope="col">Aproximación</th></tr></thead><tbody></tbody>';
   for(const [label,expression,value] of [[tex`Superior b=${hi}`,m.atB,m.fb],[tex`Inferior a=${lo}`,m.atA,m.fa]]){
    const row=document.createElement('tr'),head=document.createElement('th');head.scope='row';head.textContent=label;row.append(head);
    for(const text of [tex`\(${expression}+(${constant})\)`,format(value)]){const cell=document.createElement('td');cell.textContent=text;row.append(cell);}table.tBodies[0].append(row);
   }region.append(table);result.append(region);
   const evaluation=document.createElement('p');evaluation.textContent=tex`\[\int_{${lo}}^{${hi}}${m.family.f}\,dx=\left[${m.atB}+(${constant})\right]-\left[${m.atA}+(${constant})\right].\]`;result.append(evaluation);
   const explanation=document.createElement('p');explanation.className='key-idea';explanation.textContent=tex`Se cancelan las constantes: \(\left(${m.atB}\right)-\left(${m.atA}\right)\). Valor aproximado: ${format(m.value)}.`;result.append(explanation);
   status.textContent=(lo===hi?'Extremos iguales: resultado cero. ':lo>hi?'Orientación invertida: se conserva el orden F(b)−F(a). ':'Intervalo válido. ')+'Cambiar C no cambia la integral. Valor aproximado: '+format(m.value)+'.';
  });
 };
 for(const control of [family,a,b,c])control.addEventListener('change',render);
 root.querySelector('[data-barrow-swap]').addEventListener('click',()=>{const previous=a.value;a.value=b.value;b.value=previous;render();});
 render();
}
