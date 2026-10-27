import { renderMath } from '../core/math.js';

const select = document.querySelector('[data-exercise-select]');
const problems = [...document.querySelectorAll('[data-exercise]')];
const status = document.querySelector('[data-exercise-status]');

function show(value) {
  for (const problem of problems) problem.hidden = value !== 'all' && problem.dataset.exercise !== value;
  status.textContent = value === 'all' ? 'Se muestran los seis problemas.' : 'Problema ' + value + ' de 6.';
  // Reuse the shared serialized renderer, including after rapidly changing selection.
  for (const problem of problems) if (!problem.hidden) renderMath(problem);
}
function fromHash() {
  const match = location.hash.match(/^#ejercicio-([1-6])$/);
  if (!match) return false;
  select.value = match[1];
  show(select.value);
  return true;
}
if (select) {
  document.querySelector('[data-exercise-controls]').hidden = false;
  if (!fromHash()) { select.value = '1'; show('1'); }
  select.addEventListener('change', () => show(select.value));
  window.addEventListener('hashchange', fromHash);
  for (const problem of problems) problem.querySelector('details').addEventListener('toggle', () => {
    if (problem.querySelector('details').open) renderMath(problem);
  });
}
// No answers, selection or progress are stored.
