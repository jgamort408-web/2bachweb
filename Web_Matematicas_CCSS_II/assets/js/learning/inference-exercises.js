const controls=document.querySelector('[data-inference-exercise-controls]');
if(controls){
  const select=controls.querySelector('[data-inference-exercise-select]');
  const status=controls.querySelector('[data-inference-exercise-status]');
  const exercises=[...document.querySelectorAll('[data-inference-exercise]')];
  const show=value=>{
    exercises.forEach(article=>{article.hidden=value!=='all'&&article.dataset.inferenceExercise!==value;});
    status.textContent=value==='all'?'Se muestran los 27 enunciados. Abre solo las soluciones que necesites.':'Ejercicio '+value+' de '+exercises.length+'. Abre la resolución cuando la necesites.';
  };
  controls.hidden=false;
  const fromHash=()=>{
    if(location.hash==='#ejercicios')return 'all';
    const match=location.hash.match(/^#ejercicio-(\d{2})$/);
    return match&&exercises.some(article=>article.dataset.inferenceExercise===String(Number(match[1])))?String(Number(match[1])):'1';
  };
  select.value=fromHash();
  show(select.value);
  select.addEventListener('change',()=>{
    show(select.value);
    history.replaceState(null,'',select.value==='all'?'#ejercicios':'#ejercicio-'+select.value.padStart(2,'0'));
  });
  addEventListener('hashchange',()=>{select.value=fromHash();show(select.value);});
}
