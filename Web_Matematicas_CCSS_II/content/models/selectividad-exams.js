/**
 * Exámenes de práctica con el formato de la PAU vigente (P10), a partir del banco de Selectividad.
 * Formato y reglas: docs/formato-pau-vigente.md (orientaciones 2025-2026 en «Instrucciones PEvAU/»).
 *
 *   Ejercicio 1 (3 puntos): matrices, sistemas y programación lineal; opción A o B.
 *   Ejercicio 2 (3 puntos): análisis (derivadas, representación, integrales); opción A o B.
 *   Ejercicios 3 y 4 (2 puntos cada uno): probabilidad e inferencia, obligatorios.
 *
 * Sin DOM ni red: lo usan selectividad/examenes.html y las pruebas.
 */
import { escapeLatex, figuresIn, mulberry32, seedFrom } from './selectividad-relations.js';

export const DEFAULT_EXAM_TITLE = 'Examen de práctica con el formato de la PAU';

/** Bloques del examen: puntos, temas admitidos y temas por defecto de cada hueco (a/b con opción, «único» sin ella). */
export const BLOCKS = Object.freeze([
  { exercise: 1, points: 3, topics: ['t04', 't05', 't06'], defaults: { a: ['t04', 't05'], b: ['t06'], single: ['t04', 't05', 't06'] }, choice: true },
  { exercise: 2, points: 3, topics: ['t01', 't02', 't03'], defaults: { a: ['t01'], b: ['t02', 't03'], single: ['t01', 't02', 't03'] }, choice: true },
  { exercise: 3, points: 2, topics: ['t07', 't08', 't09'], defaults: { single: ['t07'] }, choice: false },
  { exercise: 4, points: 2, topics: ['t07', 't08', 't09'], defaults: { single: ['t09'] }, choice: false }
]);

/** Huecos del examen según la opcionalidad de los ejercicios 1 y 2: «1a», «1b», «2a», «2b», «3», «4». */
export function slotsFor({ choice1 = true, choice2 = true } = {}) {
  const choices = { 1: choice1, 2: choice2 };
  return BLOCKS.flatMap(block => block.choice && choices[block.exercise]
    ? ['a', 'b'].map(side => ({ key: `${block.exercise}${side}`, number: block.exercise, option: side.toUpperCase(), points: block.points, block, defaults: block.defaults[side] }))
    : [{ key: String(block.exercise), number: block.exercise, option: null, points: block.points, block, defaults: block.defaults.single }]);
}

/** Parte obligatoria del examen: puntos de los ejercicios sin opción, sobre 10. Las orientaciones piden 40–50 %. */
export function obligatoryShare(options) {
  return slotsFor(options).filter(slot => !slot.option).reduce((sum, slot) => sum + slot.points, 0) / 10;
}

/**
 * Compone el examen. `slots` fija, por hueco, el tema (`topic`), un contenido (`tag`), una referencia concreta (`id`) y
 * cuántas veces se ha pedido otro ejercicio (`reroll`). El resto se elige al azar con la semilla: cada hueco tiene su
 * propia secuencia, de modo que cambiar un hueco no altera los demás salvo por las exclusiones.
 * Reglas: sin repetir ejercicio, preferentemente de exámenes de origen distintos, sin contraste de hipótesis.
 */
export function composeExam(exercises, { seed, choice1 = true, choice2 = true, slots = {} } = {}) {
  const byId = new Map(exercises.map(exercise => [exercise.id, exercise]));
  const usedIds = new Set(), usedExams = new Set();
  const warnings = [];
  const parts = slotsFor({ choice1, choice2 }).map(slot => {
    const wanted = slots[slot.key] ?? {};
    const topics = wanted.topic && slot.block.topics.includes(wanted.topic) ? [wanted.topic] : slot.defaults;
    const label = `Ejercicio ${slot.number}${slot.option ? ', opción ' + slot.option : ''}`;
    let exercise = null;
    if (wanted.id) {
      exercise = byId.get(wanted.id) ?? null;
      if (!exercise) warnings.push(`${label}: la referencia ${wanted.id} no existe o su tema no está disponible; se elige otro.`);
      else if (usedIds.has(exercise.id)) { warnings.push(`${label}: ${exercise.id} ya está en el examen; se elige otro.`); exercise = null; }
      else if (!slot.block.topics.includes(exercise.topicId)) warnings.push(`${label}: ${exercise.id} no es de los saberes de este ejercicio.`);
    }
    if (!exercise) {
      const pool = exercises.filter(item => topics.includes(item.topicId) && !item.outside && !usedIds.has(item.id)
        && (!wanted.tag || item.tags.includes(wanted.tag))).sort((a, b) => a.id.localeCompare(b.id));
      const fresh = pool.filter(item => !usedExams.has(item.exam));
      const candidates = fresh.length ? fresh : pool;
      if (!candidates.length) warnings.push(`${label}: ningún ejercicio cumple los criterios; quita el contenido o cambia el tema.`);
      else {
        if (!fresh.length) warnings.push(`${label}: solo quedan ejercicios de un examen de origen ya usado.`);
        const random = mulberry32(seedFrom(`${seed}|${slot.key}|${wanted.reroll ?? 0}`));
        exercise = candidates[Math.floor(random() * candidates.length)];
      }
    }
    if (exercise) { usedIds.add(exercise.id); usedExams.add(exercise.exam); }
    return { ...slot, label, topics, exercise };
  });
  const share = obligatoryShare({ choice1, choice2 });
  if (share < 0.4 - 1e-9 || share > 0.5 + 1e-9) {
    warnings.push(`La parte obligatoria es el ${Math.round(share * 100)} % del examen; las orientaciones piden entre el 40 % y el 50 %.`);
  }
  return { parts, warnings, obligatoryShare: share };
}

// --- Puntuaciones ---------------------------------------------------------------------------------------------

const HTML_MARK = /<strong>\((\d+(?:\.\d+)?) puntos?\)<\/strong>/g;
const LATEX_MARK = /\\textbf\{\((\d+(?:\.\d+)?) puntos?\)\}/g;
export const formatPoints = value => `${Number(value.toFixed(2))} ${value === 1 ? 'punto' : 'puntos'}`;

/** Reparte `target` puntos en proporción a `values`, en cuartos de punto y con el total exacto (restos mayores). */
export function distributeQuarters(values, target) {
  const total = values.reduce((sum, value) => sum + value, 0);
  const quarters = Math.round(target * 4);
  if (!values.length || total <= 0) return [];
  const exact = values.map(value => value / total * quarters);
  const result = exact.map(value => Math.max(1, Math.floor(value)));
  let missing = quarters - result.reduce((sum, value) => sum + value, 0);
  const order = exact.map((value, index) => ({ index, rest: value - Math.floor(value) }));
  for (const { index } of [...order].sort((a, b) => b.rest - a.rest || a.index - b.index)) {
    if (missing <= 0) break;
    result[index]++; missing--;
  }
  for (const { index } of [...order].sort((a, b) => a.rest - b.rest || b.index - a.index)) {
    if (missing >= 0) break;
    if (result[index] > 1) { result[index]--; missing++; }
  }
  return result.map(value => value / 4);
}

/**
 * Lleva las puntuaciones de los apartados del enunciado al valor del ejercicio en el examen (3 o 2 puntos).
 * Devuelve el HTML y el LaTeX reescritos y si la puntuación se ha adaptado.
 */
export function rescaleStatement(exercise, target) {
  const htmlMarks = [...exercise.html.matchAll(HTML_MARK)].map(match => Number(match[1]));
  const latexMarks = [...exercise.latex.matchAll(LATEX_MARK)].map(match => Number(match[1]));
  if (!htmlMarks.length || htmlMarks.join() !== latexMarks.join()) {
    return { html: exercise.html, latex: exercise.latex, adapted: false, marks: htmlMarks.length > 0 };
  }
  const values = distributeQuarters(htmlMarks, target);
  let i = 0, j = 0;
  return {
    html: exercise.html.replace(HTML_MARK, () => `<strong>(${formatPoints(values[i++])})</strong>`),
    latex: exercise.latex.replace(LATEX_MARK, () => `\\textbf{(${formatPoints(values[j++])})}`),
    adapted: values.some((value, index) => value !== htmlMarks[index]),
    marks: true
  };
}

// --- Tabla de la normal -----------------------------------------------------------------------------------------

/** Función de distribución de N(0, 1) con la serie de Marsaglia (2004): error del orden de 1e-15. */
export function standardNormalCDF(z) {
  if (z < -8) return 0;
  if (z > 8) return 1;
  let sum = z, term = z, previous = 0;
  const square = z * z;
  for (let i = 1; sum !== previous; i += 2) { previous = sum; term *= square / (i + 2); sum += term; }
  return 0.5 + sum * Math.exp(-0.5 * square - 0.91893853320467274178);
}

/**
 * Tabla P(Z ≤ z) calculada con el formato de la oficial: z de 0.0 a 4.0 por filas y centésimas por columnas, cuatro
 * decimales hasta 2.69 y cinco desde 2.70. El examen adjunta la tabla oficial (content/selectividad/tabla-normal.json),
 * que difiere de esta en la última cifra de 12 valores; esta solo sirve para comprobarla.
 */
export function normalTable() {
  return Array.from({ length: 41 }, (_, row) => ({
    z: (row / 10).toFixed(1),
    values: Array.from({ length: 10 }, (_, column) => {
      const z = row / 10 + column / 100;
      return standardNormalCDF(z).toFixed(row >= 27 ? 5 : 4);
    })
  }));
}

// --- Texto del examen ------------------------------------------------------------------------------------------

/** Instrucciones del modelo de 2025-2026, con la opcionalidad expresada como opción A o B (ver formato-pau-vigente.md). */
export function instructions({ choice1 = true, choice2 = true } = {}) {
  const any = choice1 || choice2;
  const which = choice1 && choice2 ? 'En los ejercicios 1 y 2' : `En el ejercicio ${choice1 ? 1 : 2}`;
  return [
    'Duración: 1 hora y 30 minutos.',
    'Esta prueba consta de 4 ejercicios.',
    any ? `${which} se da la posibilidad de elegir entre la opción A o la opción B. Responda sólo la opción que elija. En caso de responder a más opciones de las que deba realizar, sólo se corregirá la que aparezca en primer lugar.` : null,
    'En cada ejercicio, parte o apartado se indica la puntuación máxima asignada.',
    'Todos los resultados deben estar suficientemente justificados.',
    'Se permitirá el uso de calculadoras que no sean programables, gráficas ni con capacidad para almacenar o transmitir datos. Si obtiene resultados directamente con la calculadora, explique con detalle los pasos.',
    'La valoración de la corrección gramatical, léxica y ortográfica, así como la presentación del texto no será superior al 10 %.'
  ].filter(Boolean);
}

/** Agrupa los huecos por ejercicio para presentarlos: [{ number, points, choice, options: [hueco…] }]. */
export function examExercises(parts) {
  const groups = [];
  for (const part of parts) {
    const group = groups.find(item => item.number === part.number);
    if (group) group.options.push(part);
    else groups.push({ number: part.number, points: part.points, choice: Boolean(part.option), options: [part] });
  }
  return groups;
}

const originLine = (exercise, adapted) => `${exercise.origin} · ${exercise.place} · ${exercise.points} puntos en el original${adapted ? ', puntuación adaptada' : ''} · ${exercise.id}`;
export { originLine };

/** Documento LaTeX autónomo del examen (pdfLaTeX). Las figuras de las soluciones van en recursos/figuras (proyecto .zip). */
export function examTex({ title = DEFAULT_EXAM_TITLE, seedNote = '', parts, choice1 = true, choice2 = true, solutions = {},
  withSolutions = false, withTable = true, table = null, preamble, figuresAvailable = false }) {
  const noFigure = '\\fbox{\\parbox{0.8\\linewidth}{\\small Figura incluida en el proyecto para Overleaf (.zip).}}';
  const figurePattern = /\\includegraphics(\[[^\]]*\])?\{(?:recursos\/)?figuras\/([a-z0-9-]+)\.pdf\}/g;
  const lines = [
    '% Examen de práctica generado con la web de Matemáticas Aplicadas a las CCSS II (formato de la PAU 2025-2026).',
    seedNote ? `% ${seedNote}` : '',
    '% Compilador recomendado: pdfLaTeX.',
    '\\documentclass[11pt,a4paper]{article}',
    preamble.replace(/\\hypersetup\{[^\n]*\}/, `\\hypersetup{pdftitle={${escapeLatex(title)}}}`).trim(),
    '\\providecommand{\\ParteSeleccionable}[2]{#2}',
    '\\providecommand{\\ApartadoSeleccionable}[2]{#2}',
    '\\providecommand{\\ItemSeleccionable}[2]{\\item[#1)]#2}',
    '\\providecommand{\\ContextoParcial}[1]{}',
    '\\begin{document}',
    '\\begin{center}',
    `  {\\Large\\bfseries ${escapeLatex(title)}}\\par\\smallskip`,
    '  {\\large Matemáticas Aplicadas a las Ciencias Sociales II}\\par\\smallskip',
    '  {\\small Ejercicios de exámenes de Selectividad de Andalucía (2008\\textendash 2021) con la estructura de la prueba de 2025-2026}\\par',
    '\\end{center}',
    '\\noindent\\fbox{\\parbox{\\dimexpr\\linewidth-2\\fboxsep-2\\fboxrule\\relax}{\\small\\textbf{Instrucciones:}',
    '\\begin{enumerate}[label=\\alph*),nosep,leftmargin=2em]',
    ...instructions({ choice1, choice2 }).map(text => `\\item ${escapeLatex(text)}`),
    '\\end{enumerate}}}',
    ''
  ];
  for (const group of examExercises(parts)) {
    lines.push(`\\section*{EJERCICIO ${group.number} \\normalfont(${formatPoints(group.points)})}`);
    if (group.choice) lines.push('Elija sólo una de las opciones:', '');
    for (const part of group.options) {
      if (!part.exercise) { lines.push(`\\emph{${escapeLatex(part.label)}: sin ejercicio con estos criterios.}`, ''); continue; }
      const rescaled = rescaleStatement(part.exercise, part.points);
      if (part.option) lines.push(`\\subsection*{Opción ${part.option}}`);
      lines.push(`{\\footnotesize ${escapeLatex(originLine(part.exercise, rescaled.adapted))}\\par}`, '\\smallskip', rescaled.latex.trim(), '');
    }
  }
  if (withSolutions) {
    lines.push('\\newpage', '\\section*{Soluciones}',
      '{\\small Las puntuaciones que cite una solución son las del examen original.\\par}', '');
    for (const part of parts.filter(item => item.exercise)) {
      const solution = solutions[part.exercise.id];
      lines.push(`\\subsection*{${escapeLatex(part.label)}}`,
        solution ? (figuresAvailable ? solution.latex : solution.latex.replace(figurePattern, noFigure)).trim() : '\\emph{Solución no disponible todavía.}', '');
    }
  }
  if (withTable) {
    // Tabla oficial de la prueba (content/selectividad/tabla-normal.json), copiada tal cual del documento.
    if (!table) throw new Error('Falta la tabla de la normal');
    lines.push('\\newpage', '\\begin{center}', '{\\large\\bfseries Función de distribución de $Z\\sim N(0,1)$: $P(Z\\le z)$}\\par\\medskip',
      '{\\footnotesize\\setlength{\\tabcolsep}{3.2pt}\\renewcommand{\\arraystretch}{1.05}',
      '\\begin{tabular}{c|cccccccccc}', '$z$ & ' + Array.from({ length: 10 }, (_, c) => `0.0${c}`).join(' & ') + ' \\\\ \\hline',
      ...table.filas.map(row => `${row.z} & ${row.valores.join(' & ')} \\\\`),
      '\\end{tabular}}\\par\\medskip',
      '{\\footnotesize En el interior de la tabla se da la probabilidad de que la variable aleatoria $Z$ esté por debajo del valor $z$.}',
      '\\end{center}');
  }
  lines.push('\\end{document}', '');
  return lines.filter(line => line !== '' || true).join('\n').replace(/\n{3,}/g, '\n\n');
}

/** Proyecto para Overleaf: examen.tex con sus figuras en recursos/figuras (el preámbulo del banco las busca ahí). */
export function examFiles(options, figures = {}) {
  const files = new Map();
  const tex = examTex({ ...options, figuresAvailable: true });
  files.set('examen.tex', tex);
  if (options.withSolutions) {
    for (const part of options.parts.filter(item => item.exercise)) {
      const solution = options.solutions?.[part.exercise.id];
      for (const name of solution ? figuresIn(solution.latex) : []) {
        if (!figures[name]) throw new Error('Falta la figura ' + name);
        files.set(`recursos/figuras/${name}.pdf`, figures[name]);
      }
    }
  }
  files.set('LEEME.txt', [options.title ?? DEFAULT_EXAM_TITLE, '',
    'En Overleaf: New Project > Upload Project, elegir este .zip y compilar examen.tex con pdfLaTeX.',
    'Sin Overleaf: pdflatex examen.tex en esta carpeta.', ''].join('\r\n'));
  return files;
}

const EXAM_PARAMS = { seed: 'semilla', choice1: 'op1', choice2: 'op2', withTable: 'tabla', withSolutions: 'soluciones', title: 'titulo' };

/** Criterios del examen ⇄ dirección: un enlace reproduce el mismo examen, con los huecos fijados. */
export function examToParams(state) {
  const params = new URLSearchParams();
  params.set(EXAM_PARAMS.seed, String(state.seed));
  if (!state.choice1) params.set(EXAM_PARAMS.choice1, '0');
  if (!state.choice2) params.set(EXAM_PARAMS.choice2, '0');
  if (!state.withTable) params.set(EXAM_PARAMS.withTable, '0');
  if (state.withSolutions) params.set(EXAM_PARAMS.withSolutions, '1');
  if (state.title && state.title !== DEFAULT_EXAM_TITLE) params.set(EXAM_PARAMS.title, state.title);
  for (const [key, slot] of Object.entries(state.slots ?? {})) {
    if (slot.topic) params.set('tema' + key, slot.topic);
    if (slot.tag) params.set('contenido' + key, slot.tag);
    if (slot.id) params.set('ref' + key, slot.id);
    if (slot.reroll) params.set('otro' + key, String(slot.reroll));
  }
  return params;
}

export function paramsToExam(params, { defaultSeed } = {}) {
  const slots = {};
  for (const key of ['1', '1a', '1b', '2', '2a', '2b', '3', '4']) {
    const slot = {};
    const topic = params.get('tema' + key), tag = params.get('contenido' + key), id = params.get('ref' + key);
    const reroll = Number.parseInt(params.get('otro' + key) ?? '', 10);
    if (topic) slot.topic = topic;
    if (tag) slot.tag = tag;
    if (id) slot.id = id.trim().toUpperCase();
    if (Number.isSafeInteger(reroll) && reroll > 0) slot.reroll = reroll;
    if (Object.keys(slot).length) slots[key] = slot;
  }
  return {
    seed: (params.get(EXAM_PARAMS.seed) ?? '').trim() || defaultSeed,
    choice1: params.get(EXAM_PARAMS.choice1) !== '0', choice2: params.get(EXAM_PARAMS.choice2) !== '0',
    withTable: params.get(EXAM_PARAMS.withTable) !== '0', withSolutions: params.get(EXAM_PARAMS.withSolutions) === '1',
    title: (params.get(EXAM_PARAMS.title) ?? '').trim() || DEFAULT_EXAM_TITLE, slots
  };
}
