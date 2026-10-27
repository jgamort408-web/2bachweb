import {renderMath} from '../core/math.js';

// Componente insertable: cada raíz controla solo sus propias etapas y no persiste respuestas.
for(const root of document.querySelectorAll('[data-step-adventure]')){
  const stages=[...root.querySelectorAll('[data-stage]')];
  let current=0;
  const show=index=>{
    current=index;
    stages.forEach((stage,i)=>{stage.hidden=i!==index;stage.dataset.active=String(i===index);});
    stages[index]?.querySelector('h3')?.focus();
    root.querySelector('[data-adventure-progress]').textContent=index<3?'Paso '+(index+1)+' de 3':'Aventura completada';
    renderMath(stages[index]);
  };
  stages.slice(0,3).forEach((stage,index)=>{
    const feedback=stage.querySelector('[data-feedback]'),next=stage.querySelector('[data-next]');
    stage.querySelectorAll('[data-answer]').forEach(button=>button.addEventListener('click',()=>{
      const correct=button.dataset.answer==='correct';
      feedback.textContent=correct?stage.dataset.success:button.dataset.hint;
      feedback.hidden=false;
      if(correct){
        stage.querySelectorAll('[data-answer]').forEach(choice=>choice.disabled=true);
        next.hidden=false;
        next.focus();
      }
    }));
    next.addEventListener('click',()=>show(index+1));
  });
  root.querySelector('[data-restart]').addEventListener('click',()=>{
    stages.slice(0,3).forEach(stage=>{
      stage.querySelectorAll('[data-answer]').forEach(choice=>choice.disabled=false);
      stage.querySelector('[data-feedback]').textContent='';
      stage.querySelector('[data-feedback]').hidden=true;
      stage.querySelector('[data-next]').hidden=true;
    });
    show(0);
  });
  root.querySelectorAll('[data-adventure-controls]').forEach(controls=>controls.hidden=false);
  root.querySelectorAll('[data-adventure-fallback]').forEach(fallback=>fallback.hidden=true);
  show(0);
}
