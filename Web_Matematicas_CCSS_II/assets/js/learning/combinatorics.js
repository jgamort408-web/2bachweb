import { updateMath } from '../core/math.js';
import { count, plainInteger } from '../../../content/models/combinatorics.js';

// Apoyo de Combinatoria: demostración de V(5,3) y calculadora. Mejora progresiva: sin JavaScript, la página
// conserva las fórmulas, los ejemplos y la lista de ordenaciones. Nada se guarda.

const slotsDemo = document.querySelector('[data-variation-demo]');
if (slotsDemo) {
  const letters = [...slotsDemo.querySelectorAll('[data-letter]')];
  const slots = [...slotsDemo.querySelectorAll('[data-slot]')];
  const status = slotsDemo.querySelector('[data-demo-status]');
  const clear = slotsDemo.querySelector('[data-demo-clear]');
  const chosen = [];
  const remaining = () => 5 - chosen.length;
  function render() {
    slots.forEach((slot, i) => {
      slot.textContent = chosen[i] ?? '?';
      slot.dataset.filled = String(Boolean(chosen[i]));
    });
    for (const button of letters) {
      button.disabled = chosen.includes(button.dataset.letter) || chosen.length === slots.length;
      button.setAttribute('aria-pressed', String(chosen.includes(button.dataset.letter)));
    }
    clear.disabled = !chosen.length;
    const choices = [5, 4, 3].slice(0, chosen.length);
    const text = !chosen.length
      ? 'Elige la letra de la primera posición: hay 5 opciones.'
      : chosen.length < slots.length
        ? `Ordenación parcial ${chosen.join('')}. Para la posición ${chosen.length + 1} quedan ${remaining()} letras.`
        : `Ordenación completa ${chosen.join('')}. Ha habido ${choices.join(', ')} opciones en cada posición: \\(V(5,3)=5\\cdot4\\cdot3=60\\) ordenaciones posibles.`;
    updateMath(status, () => { status.textContent = text; });
  }
  for (const button of letters) {
    button.addEventListener('click', () => {
      if (chosen.length < slots.length && !chosen.includes(button.dataset.letter)) { chosen.push(button.dataset.letter); render(); }
    });
  }
  clear.addEventListener('click', () => { chosen.length = 0; render(); letters[0].focus(); });
  slotsDemo.hidden = false;
  render();
}

const form = document.querySelector('[data-combinatorics-calculator]');
if (form) {
  const type = form.elements.type, rField = form.querySelector('[data-field="r"]'), repeatsField = form.querySelector('[data-field="repeats"]');
  const nLabel = form.querySelector('[data-n-label]');
  const output = form.querySelector('[data-calculator-output]');
  function updateFields() {
    const kind = type.value;
    rField.hidden = kind === 'permutations' || kind === 'permutationsWithRepetition';
    repeatsField.hidden = kind !== 'permutationsWithRepetition';
    form.elements.r.disabled = rField.hidden;
    form.elements.repeats.disabled = repeatsField.hidden;
    nLabel.textContent = kind.startsWith('permutations') ? 'n (número total de elementos que se ordenan)' : 'n (elementos disponibles)';
  }
  type.addEventListener('change', updateFields);
  form.addEventListener('submit', event => {
    event.preventDefault();
    let result;
    try {
      result = count({ type: type.value, n: Number(form.elements.n.value), r: Number(form.elements.r.value), repeats: form.elements.repeats.value });
    } catch (error) {
      updateMath(output, () => { output.textContent = 'Revisa los datos. ' + error.message; output.dataset.state = 'error'; });
      return;
    }
    updateMath(output, () => {
      output.dataset.state = 'result';
      const main = document.createElement('p'), formula = document.createElement('p'), list = document.createElement('ol');
      main.className = 'mc-calculator__value';
      main.textContent = 'Resultado: ' + plainInteger(result.value);
      formula.className = 'math-scroll'; formula.tabIndex = 0;
      formula.textContent = '\\[' + result.formula + '\\]';
      for (const step of result.steps) {
        const item = document.createElement('li'), label = document.createElement('strong'), math = document.createElement('div');
        label.textContent = step.label + ': ';
        math.className = 'math-scroll'; math.textContent = '\\(' + step.tex + '\\)';
        item.append(label, math); list.append(item);
      }
      output.replaceChildren(main, formula, list);
    });
  });
  updateFields();
  form.hidden = false;
}
