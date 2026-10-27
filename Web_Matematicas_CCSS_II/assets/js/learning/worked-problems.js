import { renderMath } from '../core/math.js';

// Progressive enhancement: source exercises and solutions remain readable without this module.
for (const root of document.querySelectorAll('[data-worked-problems]')) {
  const select = root.querySelector('[data-exercise-select]');
  const problems = [...root.querySelectorAll('[data-exercise]')];
  const status = root.querySelector('[data-exercise-status]');
  if (!select || !problems.length) continue;
  function show(value) {
    if (value !== 'all' && !problems.some(p => p.dataset.exercise === value)) return;
    select.value = value;
    for (const problem of problems) {
      problem.hidden = value !== 'all' && problem.dataset.exercise !== value;
      if (!problem.hidden) renderMath(problem);
    }
    status.textContent = value === 'all' ? 'Se muestran los ' + problems.length + ' ejercicios.' : 'Ejercicio ' + value + ' de ' + problems.length + '.';
  }
  function fromHash() {
    const target = document.getElementById(location.hash.slice(1));
    const problem = target?.closest('[data-exercise]');
    if (!problem || !root.contains(problem)) return false;
    show(problem.dataset.exercise);
    return true;
  }
  root.querySelector('[data-exercise-controls]').hidden = false;
  if (!fromHash()) show(problems[0].dataset.exercise);
  select.addEventListener('change', () => show(select.value));
  window.addEventListener('hashchange', fromHash);
  for (const detail of root.querySelectorAll('details[data-solution]')) {
    detail.addEventListener('toggle', () => { if (detail.open) renderMath(detail); });
  }
}
// Selection and solutions are not persisted; reading preferences use the shared service.
