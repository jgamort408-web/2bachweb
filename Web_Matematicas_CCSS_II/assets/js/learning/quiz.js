import { updateMath } from '../core/math.js';
import { getContentContext, visibleActivities } from '../content/runtime.js';

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Sesión en memoria. source puede generar otro banco al reiniciar. */
export async function mountQuiz(root, source) {
  let context;
  try { context = await getContentContext(); }
  catch { root.textContent = 'No se ha podido comprobar la disponibilidad de las preguntas.'; return; }
  const progress = document.createElement('p');
  progress.dataset.contentRole = 'activity-progress';
  const questionBox = document.createElement('div');
  const feedback = document.createElement('div');
  feedback.className = 'feedback';
  feedback.dataset.contentRole = 'feedback';
  feedback.setAttribute('role', 'status');
  const actions = document.createElement('div');
  actions.className = 'actions';
  const check = document.createElement('button'), hint = document.createElement('button'), next = document.createElement('button');
  check.textContent = 'Comprobar'; hint.textContent = 'Ver pista'; next.textContent = 'Siguiente pregunta';
  for (const button of [check, hint, next]) button.type = 'button';
  actions.append(check, hint, next);
  root.replaceChildren(progress, questionBox, feedback, actions);
  let questions, index, attempts, firstTry, completed, busy = false;

  async function showQuestion() {
    busy = true; attempts = 0;
    next.hidden = true; check.hidden = hint.hidden = false;
    check.disabled = hint.disabled = true;
    await updateMath(feedback, () => feedback.replaceChildren());
    const item = questions[index];
    progress.textContent = 'Pregunta ' + (index + 1) + ' de ' + questions.length + ' · Sin límite de tiempo';
    await updateMath(questionBox, () => {
      const fieldset = document.createElement('fieldset'), legend = document.createElement('legend');
      legend.dataset.contentRole = 'question';
      legend.textContent = item.prompt; fieldset.append(legend);
      if (item.table) {
        const scroll = document.createElement('div'), table = document.createElement('table'), caption = document.createElement('caption');
        scroll.className = 'math-scroll'; scroll.tabIndex = 0;
        caption.textContent = item.table.caption; table.append(caption);
        const thead = document.createElement('thead'), headerRow = document.createElement('tr');
        for (const text of item.table.headers) { const cell = document.createElement('th'); cell.scope = 'col'; cell.textContent = text; headerRow.append(cell); }
        thead.append(headerRow); table.append(thead);
        const tbody = document.createElement('tbody');
        for (const row of item.table.rows) {
          const tr = document.createElement('tr'), heading = document.createElement('th');
          heading.scope = 'row'; heading.textContent = row[0]; tr.append(heading);
          for (const value of row.slice(1)) { const cell = document.createElement('td'); cell.textContent = String(value); tr.append(cell); }
          tbody.append(tr);
        }
        table.append(tbody); scroll.append(table); fieldset.append(scroll);
      }
      if (item.steps?.length) {
        const steps = document.createElement('ol');
        steps.dataset.contentRole = 'worked-steps';
        for (const step of item.steps) {
          const line = document.createElement('li');
          line.textContent = step;
          steps.append(line);
        }
        fieldset.append(steps);
      }
      for (const option of shuffle(item.options)) {
        const label = document.createElement('label'), input = document.createElement('input'), text = document.createElement('span');
        text.dataset.contentRole = 'answer-option';
        label.className = 'answer-option';
        input.type = 'radio'; input.name = 'answer-' + item.id; input.value = option.id;
        text.textContent = option.text;
        label.append(input, text); fieldset.append(label);
      }
      questionBox.replaceChildren(fieldset);
    });
    check.disabled = hint.disabled = false; busy = false;
  }
  function restart() {
    const candidate = typeof source === 'function' ? source() : source;
    questions = visibleActivities(context, 'question', candidate);
    if (!questions.length) {
      document.dispatchEvent(new CustomEvent('learning:session-blocked'));
      progress.textContent = 'Todavía no hay preguntas disponibles en este bloque.';
      actions.hidden = true;
      return updateMath(questionBox, () => { questionBox.replaceChildren(); feedback.replaceChildren(); });
    }
    actions.hidden = false;
    document.dispatchEvent(new CustomEvent('learning:session-start'));
    index = 0; firstTry = 0; completed = false;
    next.textContent = 'Siguiente pregunta';
    return showQuestion();
  }
  check.addEventListener('click', async () => {
    if (busy) return;
    const selected = questionBox.querySelector('input:checked');
    if (!selected) {
      await updateMath(feedback, () => { feedback.textContent = 'Selecciona una respuesta antes de comprobar.'; });
      return;
    }
    busy = true;
    const item = questions[index], correct = selected.value === item.correct;
    attempts++;
    if (correct && attempts === 1) firstTry++;
    const done = correct || attempts >= 2;
    const option = item.options.find((option) => option.id === selected.value);
    const answer = item.options.find((option) => option.id === item.correct);
    await updateMath(feedback, () => {
      feedback.textContent = (correct ? 'Correcta. ' : 'Revisa tu respuesta. ') + option.feedback + ' ' +
        (done ? 'Solución: ' + answer.text + '. ' + item.explanation : 'Puedes intentarlo una vez más o consultar la pista.');
    });
    if (done) {
      questionBox.querySelector('fieldset').disabled = true;
      check.disabled = hint.disabled = true; next.hidden = false;
      next.textContent = index === questions.length - 1 ? 'Ver resumen' : 'Siguiente pregunta';
      next.focus();
    }
    busy = false;
  });
  hint.addEventListener('click', () => {
    if (!busy) updateMath(feedback, () => { feedback.textContent = 'Pista: ' + questions[index].hint; });
  });
  next.addEventListener('click', async () => {
    if (busy) return;
    if (completed) { await restart(); questionBox.querySelector('input')?.focus(); return; }
    if (++index < questions.length) {
      await showQuestion(); questionBox.querySelector('input')?.focus();
    } else {
      busy = true; completed = true; progress.textContent = 'Sesión terminada';
      await updateMath(questionBox, () => {
        const summary = document.createElement('p');
        summary.textContent = firstTry + ' de ' + questions.length + ' respuestas correctas al primer intento. Este resumen pertenece solo a esta sesión; no se guarda un historial.';
        questionBox.replaceChildren(summary);
      });
      await updateMath(feedback, () => feedback.replaceChildren());
      check.hidden = hint.hidden = true; next.textContent = 'Empezar otra sesión'; next.focus(); busy = false;
    }
  });
  restart();
}
