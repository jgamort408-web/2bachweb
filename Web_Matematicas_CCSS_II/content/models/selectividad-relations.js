/**
 * Relaciones de ejercicios de Selectividad (P09): criterios, selección aleatoria reproducible y exportación a LaTeX.
 * Sin DOM ni red: lo usan la página selectividad/relaciones.html y las pruebas.
 *
 * Los ejercicios proceden de content/selectividad/ejercicios.json (scripts/build-selectividad.mjs). La salida para
 * Overleaf reproduce la estructura del banco Selectividad_LaTeX (main.tex, tex/, config/, catalogo/, selecciones/,
 * enunciados/, soluciones/ y recursos/), con solo los ejercicios elegidos, de modo que compila igual que el banco.
 */

export const MAX_EXERCISES = 30;
export const DEFAULT_TITLE = 'Relación de ejercicios de Selectividad';

/** Semilla de 32 bits a partir de cualquier texto (FNV-1a). */
export function seedFrom(text) {
  let hash = 0x811c9dc5;
  for (const char of String(text)) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

/** Generador pseudoaleatorio mulberry32: misma semilla, misma secuencia en cualquier navegador. */
export function mulberry32(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Ejercicios que cumplen los criterios.
 * - topics: temas principales admitidos (vacío: todos).
 * - tags: etiquetas; tagMode 'any' (alguna) o 'all' (todas). Vacío: sin filtro de contenido.
 * - includeOutside: incluir lo que ya no entra en la PAU (contraste de hipótesis).
 * - onlyWithSolution + solutionIds: solo ejercicios cuya solución está publicada.
 */
export function filterExercises(exercises, { topics = [], tags = [], tagMode = 'any', includeOutside = false,
  onlyWithSolution = false, solutionIds = new Set() } = {}) {
  return exercises.filter(exercise =>
    (!topics.length || topics.includes(exercise.topicId))
    && (!tags.length || (tagMode === 'all' ? tags.every(tag => exercise.tags.includes(tag)) : tags.some(tag => exercise.tags.includes(tag))))
    && (includeOutside || !exercise.outside)
    && (!onlyWithSolution || solutionIds.has(exercise.id)));
}

/**
 * Elige n ejercicios distintos con la semilla dada. El resultado no depende del orden de entrada: se baraja la
 * lista ordenada por ID. Después se ordena por tema y año (más reciente primero), como en una relación de clase.
 */
export function pickExercises(candidates, n, seed, topicOrder = []) {
  const pool = [...candidates].sort((a, b) => a.id.localeCompare(b.id));
  const random = mulberry32(typeof seed === 'number' ? seed : seedFrom(seed));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const rank = topic => (topicOrder.includes(topic) ? topicOrder.indexOf(topic) : 99);
  return pool.slice(0, Math.max(0, Math.min(n, pool.length)))
    .sort((a, b) => rank(a.topicId) - rank(b.topicId) || a.topicId.localeCompare(b.topicId)
      || b.year.localeCompare(a.year) || a.id.localeCompare(b.id));
}

const PARAMS = { topics: 'temas', tags: 'etiquetas', tagMode: 'modo', count: 'n', seed: 'semilla',
  includeOutside: 'contraste', onlyWithSolution: 'resueltos', withSolutions: 'soluciones', title: 'titulo' };

/** Criterios ⇄ parámetros de la dirección: un enlace reproduce la misma relación. */
export function criteriaToParams(criteria) {
  const params = new URLSearchParams();
  if (criteria.topics?.length) params.set(PARAMS.topics, criteria.topics.join(','));
  if (criteria.tags?.length) params.set(PARAMS.tags, criteria.tags.join(','));
  if (criteria.tagMode === 'all') params.set(PARAMS.tagMode, 'todas');
  params.set(PARAMS.count, String(criteria.count));
  params.set(PARAMS.seed, String(criteria.seed));
  for (const key of ['includeOutside', 'onlyWithSolution', 'withSolutions']) if (criteria[key]) params.set(PARAMS[key], '1');
  if (criteria.title && criteria.title !== DEFAULT_TITLE) params.set(PARAMS.title, criteria.title);
  return params;
}

export function paramsToCriteria(params, { defaultSeed } = {}) {
  const list = key => (params.get(PARAMS[key]) ?? '').split(',').map(value => value.trim()).filter(Boolean);
  const count = Number.parseInt(params.get(PARAMS.count) ?? '', 10);
  return {
    topics: list('topics'), tags: list('tags'),
    tagMode: params.get(PARAMS.tagMode) === 'todas' ? 'all' : 'any',
    count: Number.isFinite(count) ? Math.min(MAX_EXERCISES, Math.max(1, count)) : 6,
    seed: (params.get(PARAMS.seed) ?? '').trim() || defaultSeed,
    includeOutside: params.get(PARAMS.includeOutside) === '1',
    onlyWithSolution: params.get(PARAMS.onlyWithSolution) === '1',
    withSolutions: params.get(PARAMS.withSolutions) === '1',
    title: (params.get(PARAMS.title) ?? '').trim() || DEFAULT_TITLE
  };
}

/** Texto plano seguro dentro de un documento LaTeX (título, procedencia). */
// El punto medio va como orden: con la codificación T1 del banco, XeTeX lo imprimiría como «ů».
export function escapeLatex(text) {
  return String(text).replace(/[\\{}$&#%_^~·]/g, char => ({
    '\\': '\\textbackslash{}', '{': '\\{', '}': '\\}', $: '\\$', '&': '\\&', '#': '\\#', '%': '\\%', _: '\\_',
    '^': '\\textasciicircum{}', '~': '\\textasciitilde{}', '·': '\\textperiodcentered{}'
  })[char]);
}

const figurePattern = /\\includegraphics(\[[^\]]*\])?\{(?:recursos\/)?figuras\/([a-z0-9-]+)\.pdf\}/g;

/** Figuras PDF que cita una solución (para incluirlas en el proyecto de Overleaf). */
export function figuresIn(latex) {
  return [...latex.matchAll(figurePattern)].map(match => match[2]);
}

function origin(exercise) {
  return `${exercise.origin} · ${exercise.place} · ${exercise.points} puntos en el examen original`;
}

/**
 * Documento LaTeX autónomo (un solo archivo). Las figuras de las soluciones no caben en un archivo: se sustituyen por
 * un aviso que remite al proyecto para Overleaf.
 */
export function standaloneTex({ title = DEFAULT_TITLE, subtitle = '', exercises, solutions = {}, withSolutions = false, preamble }) {
  const noFigure = '\\fbox{\\parbox{0.8\\linewidth}{\\small Figura incluida en el proyecto para Overleaf (.zip).}}';
  const lines = [
    '% Relación generada con la web de Matemáticas Aplicadas a las CCSS II a partir del banco de Selectividad.',
    '% Compilador recomendado: pdfLaTeX.',
    '\\documentclass[11pt,a4paper]{article}',
    preamble.replace(/\\hypersetup\{[^\n]*\}/, `\\hypersetup{pdftitle={${escapeLatex(title)}}}`).trim(),
    '\\begin{document}',
    '\\begin{center}',
    `  {\\Large\\bfseries ${escapeLatex(title)}}\\par`,
    '  \\smallskip',
    '  {\\small Matemáticas Aplicadas a las Ciencias Sociales II \\textperiodcentered{} Ejercicios de Selectividad de Andalucía}\\par',
    subtitle ? `  {\\small ${escapeLatex(subtitle)}}\\par` : '',
    '\\end{center}',
    ''
  ];
  exercises.forEach((exercise, index) => {
    lines.push(`\\section*{Ejercicio ${index + 1}}`,
      `{\\small ${escapeLatex(origin(exercise))}. Referencia: ${exercise.id}.\\par}`,
      '\\medskip', exercise.latex.trim(), '');
  });
  if (withSolutions) {
    lines.push('\\newpage', '\\section*{Soluciones}', '');
    exercises.forEach((exercise, index) => {
      const solution = solutions[exercise.id];
      lines.push(`\\subsection*{Ejercicio ${index + 1}}`,
        solution ? solution.latex.replace(figurePattern, noFigure).trim() : '\\emph{Solución no disponible todavía.}', '');
    });
  }
  lines.push('\\end{document}', '');
  return lines.filter(line => line !== null).join('\n').replace(/\n{3,}/g, '\n\n');
}

/**
 * Proyecto para Overleaf con la estructura del banco. `assets` contiene main.tex, tex/paquetes.tex, tex/comandos.tex
 * y config/opciones.tex del banco; `figures` (nombre → bytes) las figuras PDF de las soluciones incluidas.
 */
export function overleafFiles({ title = DEFAULT_TITLE, seedNote = '', exercises, solutions = {}, withSolutions = false, assets, figures = {} }) {
  const files = new Map();
  for (const name of ['main.tex', 'tex/paquetes.tex', 'tex/comandos.tex', 'config/opciones.tex']) {
    if (typeof assets[name] !== 'string') throw new Error('Falta el archivo del banco ' + name);
    files.set(name, assets[name]);
  }
  const included = withSolutions ? exercises.filter(exercise => solutions[exercise.id]) : [];
  files.set('config/seleccion.tex', [
    `% Relación generada con la web${seedNote ? ' (' + seedNote + ')' : ''}. Compilar main.tex con pdfLaTeX.`,
    `\\providecommand{\\ModoSalida}{${withSolutions ? 'enunciados-y-soluciones' : 'enunciados'}}`,
    `\\providecommand{\\TituloSeleccion}{${escapeLatex(title)}}`,
    '\\input{selecciones/relacion}', ''
  ].join('\n'));
  files.set('selecciones/relacion.tex', `\\providecommand{\\ListaEjercicios}{${exercises.map(exercise => exercise.id).join(',')}}\n`);
  files.set('catalogo/registro.tex', ['% Solo los ejercicios de esta relación.', ...exercises.map(exercise =>
    `\\RegistrarEjercicio{${exercise.id}}{enunciados/${exercise.id}.tex}{soluciones/${exercise.id}.tex}{${exercise.id}: ${escapeLatex(exercise.title)}}{cotejada}{${included.includes(exercise) ? 'validada' : 'no_redactada'}}`), ''].join('\n'));
  for (const exercise of exercises) files.set(`enunciados/${exercise.id}.tex`, exercise.latex);
  for (const exercise of included) {
    const latex = solutions[exercise.id].latex;
    files.set(`soluciones/${exercise.id}.tex`, latex);
    for (const name of figuresIn(latex)) {
      if (!figures[name]) throw new Error('Falta la figura ' + name);
      files.set(`recursos/figuras/${name}.pdf`, figures[name]);
    }
  }
  files.set('LEEME.txt', [
    title, '',
    'Proyecto LaTeX con la estructura del banco de Selectividad.',
    'En Overleaf: New Project > Upload Project, elegir este .zip y compilar main.tex con pdfLaTeX.',
    'Sin Overleaf: pdflatex main.tex en esta carpeta.', ''
  ].join('\r\n'));
  return files;
}

// --- ZIP sin compresión (método «stored»): suficiente para unos pocos archivos de texto y figuras pequeñas. ---
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

export function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

/** Empaqueta un Map ruta → texto|Uint8Array en un .zip (UTF-8 en los nombres, fecha fija para que sea reproducible). */
export function zipFiles(files) {
  const encoder = new TextEncoder();
  const entries = [...files].map(([name, content]) => {
    const data = typeof content === 'string' ? encoder.encode(content) : new Uint8Array(content);
    return { name: encoder.encode(name), data, crc: crc32(data) };
  });
  const DOS_TIME = 0, DOS_DATE = (2026 - 1980) << 9 | 1 << 5 | 1; // 1-1-2026 00:00
  const chunks = [], central = [];
  let offset = 0;
  for (const entry of entries) {
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true); local.setUint16(4, 20, true); local.setUint16(6, 0x0800, true);
    local.setUint16(8, 0, true); local.setUint16(10, DOS_TIME, true); local.setUint16(12, DOS_DATE, true);
    local.setUint32(14, entry.crc, true); local.setUint32(18, entry.data.length, true); local.setUint32(22, entry.data.length, true);
    local.setUint16(26, entry.name.length, true); local.setUint16(28, 0, true);
    chunks.push(new Uint8Array(local.buffer), entry.name, entry.data);
    const header = new DataView(new ArrayBuffer(46));
    header.setUint32(0, 0x02014b50, true); header.setUint16(4, 20, true); header.setUint16(6, 20, true);
    header.setUint16(8, 0x0800, true); header.setUint16(10, 0, true); header.setUint16(12, DOS_TIME, true);
    header.setUint16(14, DOS_DATE, true); header.setUint32(16, entry.crc, true);
    header.setUint32(20, entry.data.length, true); header.setUint32(24, entry.data.length, true);
    header.setUint16(28, entry.name.length, true); header.setUint32(42, offset, true);
    central.push(new Uint8Array(header.buffer), entry.name);
    offset += 30 + entry.name.length + entry.data.length;
  }
  const centralSize = central.reduce((sum, chunk) => sum + chunk.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true); end.setUint16(8, entries.length, true); end.setUint16(10, entries.length, true);
  end.setUint32(12, centralSize, true); end.setUint32(16, offset, true);
  const parts = [...chunks, ...central, new Uint8Array(end.buffer)];
  const out = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
  let position = 0;
  for (const part of parts) { out.set(part, position); position += part.length; }
  return out;
}
