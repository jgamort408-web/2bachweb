/**
 * Banco de Selectividad en la web (P08). Lee en solo lectura ../Selectividad_LaTeX (CSV de datos, enunciados y
 * soluciones) y genera:
 *   - selectividad/index.html y una página por tema con las tarjetas de sus ejercicios (tema principal);
 *   - config/selectividad.json: temas, recuento por epígrafe (enlaces «Así cae en Selectividad») y soluciones
 *     publicables, que el catálogo registra para que el docente las active (ocultas de partida);
 *   - content/selectividad/soluciones.json: HTML de las soluciones validadas, que solo se insertan si están visibles;
 *   - assets/img/selectividad/*.png: figuras de las soluciones, convertidas desde sus PDF.
 *
 *   node scripts/build-selectividad.mjs          regenera todo
 *   node scripts/build-selectividad.mjs --check  termina con código 1 si algo no está al día (no convierte figuras)
 *   SELECTIVIDAD_LATEX_DIR=<carpeta> …           lee el banco desde otra copia (por ejemplo, git archive HEAD)
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { latexToHtml, plainText } from './lib/latex-html.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
// SELECTIVIDAD_LATEX_DIR permite generar desde otra copia del banco, por ejemplo una exportación de lo confirmado en Git
// (git archive) mientras la otra herramienta trabaja en la carpeta.
export const bankRoot = process.env.SELECTIVIDAD_LATEX_DIR ? path.resolve(process.env.SELECTIVIDAD_LATEX_DIR)
  : path.join(root, '..', 'Selectividad_LaTeX');
const figureDir = path.join(root, 'assets', 'img', 'selectividad');

// Nombres visibles de las etiquetas del banco (datos/tags.csv). Una etiqueta nueva sin nombre detiene la generación.
export const TAG_LABELS = {
  'amplitud-intervalo': 'Amplitud del intervalo', bayes: 'Teorema de Bayes', 'beneficio-maximo': 'Beneficio máximo',
  'compatibilidad-dimensiones': 'Dimensiones compatibles', complementario: 'Suceso contrario', continuidad: 'Continuidad',
  'cota-estricta': 'Desigualdad estricta', 'cota-no-estricta': 'Desigualdad no estricta', curvatura: 'Curvatura',
  derivabilidad: 'Derivabilidad', 'derivada-dada': 'A partir de la derivada', 'desviacion-conocida': 'Desviación típica conocida',
  'diferencia-sucesos': 'Diferencia de sucesos', 'distribucion-normal': 'Distribución normal',
  'ecuacion-matricial': 'Ecuación matricial', 'error-estimacion': 'Error de estimación',
  'experimento-compuesto': 'Experimento compuesto', 'extremos-relativos': 'Extremos relativos',
  'funcion-a-trozos': 'Función a trozos', 'funcion-exponencial': 'Función exponencial',
  'funcion-logaritmica': 'Función logarítmica', 'funcion-objetivo': 'Función objetivo',
  'funcion-polinomica': 'Función polinómica', 'funcion-racional': 'Función racional',
  incompatibilidad: 'Sucesos incompatibles', independencia: 'Independencia', inflexion: 'Puntos de inflexión',
  'integral-indefinida': 'Integral indefinida', 'interseccion-sucesos': 'Intersección de sucesos',
  'intervalo-confianza-media': 'Intervalo de confianza para la media',
  'intervalo-confianza-proporcion': 'Intervalo de confianza para la proporción', 'matriz-inversa': 'Matriz inversa',
  'matriz-simetrica': 'Matriz simétrica', 'matriz-traspuesta': 'Matriz traspuesta', 'maximo-minimo': 'Máximos y mínimos',
  'minimo-coste': 'Coste mínimo', monotonia: 'Monotonía', optimizacion: 'Optimización', paralelismo: 'Rectas paralelas',
  parametros: 'Parámetros', 'potencia-matriz': 'Potencias de matrices', 'primitiva-con-condicion': 'Primitiva con condición',
  'probabilidad-condicionada': 'Probabilidad condicionada', 'probabilidad-total': 'Probabilidad total',
  'producto-matrices': 'Producto de matrices', 'programacion-lineal': 'Programación lineal', 'recta-tangente': 'Recta tangente',
  'region-factible': 'Región factible', 'regla-cadena': 'Regla de la cadena', 'regla-producto': 'Derivada del producto',
  'reglas-derivacion': 'Reglas de derivación', 'representacion-grafica': 'Representación gráfica',
  restricciones: 'Restricciones', 'tamano-muestral': 'Tamaño muestral', 'union-sucesos': 'Unión de sucesos',
  'varianza-conocida': 'Varianza conocida', vertices: 'Vértices', 'viabilidad-punto': '¿Pertenece el punto a la región?',
  'estimacion-puntual': 'Estimación puntual', dominio: 'Dominio', 'integral-definida': 'Integral definida',
  'area-recinto': 'Área de un recinto', muestreo: 'Muestreo', 'muestra-proporcional': 'Afijación proporcional',
  'media-muestral': 'Media muestral', 'interpretacion-intervalo': 'Interpretar un intervalo',
  'formulacion-sin-resolver': 'Solo plantear', 'regla-cociente': 'Derivada del cociente',
  'extremos-absolutos': 'Extremos absolutos', 'desviacion-medias-muestrales': 'Desviación de las medias muestrales',
  'alcance-valor-objetivo': '¿Alcanza la función objetivo un valor?', 'comparacion-intervalos': 'Comparar intervalos',
  asintotas: 'Asíntotas', 'comparacion-error': 'Cómo cambia el error', 'probabilidad-media-muestral': 'Probabilidad de la media muestral',
  'interseccion-rectas': 'Corte de rectas', 'conversion-unidades': 'Cambio de unidades',
  'comparacion-tamano-muestral': 'Cómo cambia el tamaño muestral', 'muestreo-estratificado': 'Muestreo estratificado',
  'ingreso-maximo': 'Ingreso máximo', 'compatibilidad-sucesos': 'Sucesos compatibles',
  'contraste-hipotesis': 'Contraste de hipótesis', 'region-rechazo': 'Región de rechazo',
  'nivel-significacion': 'Nivel de significación', 'hipotesis-nula': 'Hipótesis nula',
  'contraste-unilateral-media': 'Contraste unilateral de la media', 'interpretacion-derivada': 'Interpretar la derivada',
  'comparacion-significacion': 'Comparar niveles de significación', 'signo-funcion': 'Signo de una función',
  'diferencia-simetrica': 'Solo uno de los dos sucesos', 'seleccion-sin-reposicion': 'Selección sin reemplazamiento',
  'clasificacion-discontinuidades': 'Tipos de discontinuidad',
  'contraste-unilateral-proporcion': 'Contraste unilateral de la proporción', 'espacio-muestral': 'Espacio muestral',
  'sucesos-elementales': 'Sucesos elementales', 'orden-extraccion': 'Orden de extracción', 'cortes-ejes': 'Cortes con los ejes',
  'varianza-medias-muestrales': 'Varianza de las medias muestrales', 'igualdad-matricial': 'Igualdad matricial',
  'interpretacion-matrices': 'Interpretar matrices', 'interpretacion-asintota': 'Interpretar una asíntota',
  'urna-dinamica': 'Urna que cambia', 'igualdad-derivadas': 'Derivadas iguales',
  'comparacion-reposicion': 'Con y sin reemplazamiento', 'despeje-matricial': 'Despejar una matriz',
  'contraste-bilateral-media': 'Contraste bilateral de la media', 'diagnostico-correcto': 'Diagnóstico correcto',
  'contraste-bilateral-proporcion': 'Contraste bilateral de la proporción', 'peritaje-correcto': 'Peritaje correcto',
  'recursos-sobrantes': 'Recursos sobrantes', 'region-aceptacion': 'Región de aceptación',
  'matriz-adyacencia': 'Matriz de adyacencia', 'extraccion-con-reposicion': 'Extracción con reemplazamiento',
  'sistemas-lineales': 'Sistemas lineales', 'clasificacion-sistemas': 'Clasificar un sistema',
  'efecto-tamano-muestral': 'Efecto del tamaño muestral', 'coste-maximo': 'Coste máximo'
};
// Texto alternativo de las figuras de las soluciones según el final de su nombre (recursos/figuras/sNNN-<tipo>.pdf).
const FIGURE_ALT = {
  'region-factible': 'Gráfica de la región factible', region: 'Gráfica del recinto', dieta: 'Gráfica de la región factible',
  baterias: 'Gráfica de la región factible', coste: 'Gráfica de la función de coste',
  tangente: 'Gráfica de la función con su recta tangente', trozos: 'Gráfica de la función definida a trozos',
  cubica: 'Gráfica de la función cúbica', parabola: 'Gráfica de la parábola'
};
// Saberes que ya no evalúa la PAU vigente (docs/formato-pau-vigente.md): se muestran con aviso.
export const OUT_OF_SYLLABUS_TAG = 'contraste-hipotesis';
const CONVOCATORIAS = { junio: 'Junio', septiembre: 'Septiembre', ordinaria: 'Ordinaria', extraordinaria: 'Extraordinaria' };
const TIPOS = { titular: 'Titular', suplente: 'Suplente', reserva: 'Reserva' };

const escape = text => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fold = text => text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
const readBank = file => fs.readFileSync(path.join(bankRoot, file), 'utf8').replace(/^﻿/, '');
const readJson = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

/** CSV con comillas dobles (RFC 4180), como el que escribe el módulo csv de Python. */
export function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(field); rows.push(row); row = []; field = '';
    } else field += char;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [header, ...body] = rows.filter(cells => cells.some(Boolean));
  return body.map(cells => Object.fromEntries(header.map((name, index) => [name, cells[index] ?? ''])));
}

const list = value => value ? value.split('|').filter(Boolean) : [];

function pngSize(file) {
  const bytes = fs.readFileSync(file);
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

/** Lee el banco, comprueba su coherencia y devuelve los ejercicios con su HTML. */
export function loadBank({ convertFigures = false } = {}) {
  const exercises = parseCsv(readBank('datos/ejercicios.csv'));
  const epigraphNames = Object.fromEntries(parseCsv(readBank('datos/epigrafes.csv')).map(row => [row.epigrafe_id, row.nombre]));
  const bankTags = new Set(parseCsv(readBank('datos/tags.csv')).map(row => row.tag));
  const pages = readJson('config/pages.json');
  const pageById = new Map(pages.map(page => [page.id, page]));
  const figures = new Set();
  const figureUse = new Map();
  const figure = (id, source, caption) => {
    // Las soluciones citan la figura como figuras/x.pdf o recursos/figuras/x.pdf; ambas están en recursos/figuras.
    const relative = source.replace(/^recursos\//, '');
    const name = path.basename(relative, '.pdf');
    if (!/^[a-z0-9-]+$/.test(name) || relative !== `figuras/${name}.pdf`) throw new Error(`${id}: figura inesperada ${source}`);
    const png = path.join(figureDir, name + '.png');
    if (convertFigures && !fs.existsSync(png)) {
      fs.mkdirSync(figureDir, { recursive: true });
      execFileSync('python', ['-I', path.join(root, 'scripts', 'render-pdf-figure.py'),
        path.join(bankRoot, 'recursos', relative), png], { stdio: 'inherit' });
    }
    if (!fs.existsSync(png)) throw new Error(`${id}: falta la figura convertida ${path.relative(root, png)} (node scripts/build-selectividad.mjs)`);
    const kind = Object.keys(FIGURE_ALT).find(suffix => name.endsWith('-' + suffix));
    if (!kind) throw new Error(`${id}: añade a FIGURE_ALT una descripción para la figura ${name}`);
    figures.add(name + '.png');
    if (!figureUse.has(id)) figureUse.set(id, []);
    figureUse.get(id).push(name);
    const { width, height } = pngSize(png);
    // Las soluciones describen cada figura en el texto contiguo (vértices, cortes, extremos): el texto
    // alternativo dice qué se representa y remite a esa descripción. Se convierte a escala 3 y se muestra a la mitad
    // (1.5 veces el tamaño del PDF): las figuras del banco son pequeñas y sus rótulos deben leerse.
    return `<figure class="mc-sel__figure"><img src="../assets/img/selectividad/${name}.png" alt="${FIGURE_ALT[kind]}, descrita en el texto de la solución" width="${Math.round(width / 2)}" height="${Math.round(height / 2)}" loading="lazy">${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
  };
  const result = exercises.map(row => {
    const id = row.ejercicio_id;
    if (!/^SEL-D\d{4}-[A-Z]{2}-E\d{2}$/.test(id)) throw new Error('ID inesperado: ' + id);
    if (row.estado_transcripcion !== 'cotejada') throw new Error(`${id}: enunciado no cotejado`);
    for (const tag of list(row.tags)) {
      if (!bankTags.has(tag)) throw new Error(`${id}: etiqueta fuera de tags.csv: ${tag}`);
      if (!TAG_LABELS[tag]) throw new Error(`Etiqueta sin nombre visible en build-selectividad.mjs: ${tag}`);
    }
    for (const epigraph of list(row.epigrafes)) if (!epigraphNames[epigraph]) throw new Error(`${id}: epígrafe desconocido ${epigraph}`);
    const statementSource = readBank(row.ruta_enunciado);
    const solutionSource = readBank(row.ruta_solucion);
    const validated = row.estado_solucion === 'validada';
    if (validated !== /^% ESTADO: validada/m.test(solutionSource)) throw new Error(`${id}: estado de la solución distinto en el CSV y en el .tex`);
    const statement = latexToHtml(statementSource, { id });
    const solution = validated ? latexToHtml(solutionSource, { id: id + ' (solución)', figure: (source, caption) => figure(id, source, caption) }) : null;
    return {
      id, row, statement, validated, statementSource, solutionSource: validated ? solutionSource : null,
      solutionFigures: figureUse.get(id) ?? [],
      topicId: row.tema_principal.toLowerCase(),
      secondary: list(row.temas_secundarios).map(topic => topic.toLowerCase()),
      epigraphs: list(row.epigrafes), tags: list(row.tags),
      solution,
      search: fold([row.titulo_descriptivo, id, plainText(statement), ...list(row.tags).map(tag => TAG_LABELS[tag])].join(' '))
    };
  });
  const topicIds = [...new Set(result.map(exercise => exercise.topicId))].sort();
  const topics = topicIds.map(topicId => {
    const topicPage = pageById.get(topicId);
    if (!topicPage) throw new Error('Tema sin página: ' + topicId);
    const slug = topicPage.path.split('/').at(-2);
    return { topicId, pageId: 'selectividad-' + topicId, path: `selectividad/${slug}.html`, title: topicPage.title,
      name: topicPage.title.replace(/^\d+\.\s*/, '') };
  });
  for (const topic of topics) {
    const page = pageById.get(topic.pageId);
    if (!page || page.path !== topic.path || page.topicId !== topic.topicId || page.parentId !== 'selectividad') {
      throw new Error(`Registra la página ${topic.pageId} en config/pages.json con path ${topic.path}, topicId ${topic.topicId} y parentId selectividad`);
    }
  }
  const lessonFor = epigraph => pageById.get(epigraph.toLowerCase().replace('.', '-e').replace(/-e(\d)$/, '-e0$1'));
  return { exercises: result, topics, epigraphNames, lessonFor, figures, pages };
}

function provenance(row) {
  const parts = [row.anio];
  if (row.convocatoria) parts.push(CONVOCATORIAS[row.convocatoria] ?? row.convocatoria);
  if (row.tipo_examen) parts.push(TIPOS[row.tipo_examen] + (row.reserva ? ' ' + row.reserva : ''));
  const place = [row.opcion && 'Opción ' + row.opcion, row.bloque && 'Bloque ' + row.bloque, 'Ejercicio ' + row.numero_original]
    .filter(Boolean).join(' · ');
  return { origin: parts.join(' · '), place, pending: !row.convocatoria || !row.tipo_examen };
}

function card(exercise, bank) {
  const { id, row } = exercise;
  const { origin, place, pending } = provenance(row);
  const outOfSyllabus = exercise.tags.includes(OUT_OF_SYLLABUS_TAG);
  const epigraphLinks = exercise.epigraphs.map(epigraph => {
    const lesson = bank.lessonFor(epigraph);
    const name = `${epigraph.slice(1).replace(/^0/, '')}. ${bank.epigraphNames[epigraph]}`;
    return lesson ? `<a href="../${lesson.path}">${escape(name)}</a>` : `<span>${escape(name)}</span>`;
  });
  return [
    `<li class="mc-sel__item" data-sel-card data-epigrafes="${exercise.epigraphs.join(' ')}" data-tags="${exercise.tags.join(' ')}" data-anio="${row.anio}" data-convocatoria="${row.convocatoria || 'sin-identificar'}" data-tipo="${row.tipo_examen || 'sin-identificar'}"${outOfSyllabus ? ' data-fuera-temario' : ''}${exercise.validated ? ' data-con-solucion' : ''} data-search="${escape(exercise.search)}">`,
    `  <article class="mc-sel" id="${id}" aria-labelledby="${id}-titulo">`,
    `    <p class="mc-sel__meta"><span class="mc-chip mc-chip--dot">${escape(origin)}</span>${pending ? ' <span class="mc-chip mc-chip--neutral">Convocatoria o tipo por identificar</span>' : ''}${outOfSyllabus ? ' <span class="mc-chip mc-chip--warning">Ya no entra en la PAU</span>' : ''}</p>`,
    `    <h3 id="${id}-titulo">${escape(row.titulo_descriptivo)}</h3>`,
    `    <p class="mc-sel__place">${escape(place)} · ${escape(row.puntuacion_original)} puntos en el examen original</p>`,
    `    <div class="mc-sel__statement">`,
    exercise.statement.split('\n').map(line => '      ' + line).join('\n'),
    '    </div>',
    `    <p class="mc-sel__epigraphs"><span class="mc-sel__label">Lecciones:</span> ${epigraphLinks.join(' ')}</p>`,
    exercise.tags.length ? `    <p class="mc-exam__tags"><span class="mc-visually-hidden">Contenidos: </span>${exercise.tags.map(tag => `<span>${escape(TAG_LABELS[tag])}</span>`).join(' ')}</p>` : '',
    exercise.validated ? `    <div class="mc-sel__solution" data-sel-solution="${id}" hidden></div>` : '',
    `    <p class="mc-sel__ref">Referencia: <span translate="no">${id}</span></p>`,
    '  </article>',
    '</li>'
  ].filter(line => line !== '').join('\n');
}

function filters(cards, bank) {
  const count = (values, key) => values.reduce((map, value) => map.set(value, (map.get(value) ?? 0) + 1), new Map());
  const epigraphs = count(cards.flatMap(exercise => exercise.epigraphs));
  const tags = count(cards.flatMap(exercise => exercise.tags));
  const years = [...new Set(cards.map(exercise => exercise.row.anio))].sort().reverse();
  const options = (entries, label) => entries.map(([value, n]) => `<option value="${escape(value)}">${escape(label(value))} (${n})</option>`).join('');
  const epigraphOrder = (a, b) => a.localeCompare(b, 'es', { numeric: true });
  const convocatorias = count(cards.map(exercise => exercise.row.convocatoria || 'sin-identificar'));
  const tipos = count(cards.map(exercise => exercise.row.tipo_examen || 'sin-identificar'));
  const outside = cards.filter(exercise => exercise.tags.includes(OUT_OF_SYLLABUS_TAG)).length;
  return [
    '<form class="mc-library__filters mc-sel__filters" data-sel-filters hidden aria-label="Buscar y filtrar ejercicios">',
    '  <label class="mc-field mc-sel__search">Buscar <input type="search" data-sel-search autocomplete="off" placeholder="Bayes, urna, beneficio…"></label>',
    '  <label class="mc-field">Lección <select data-sel-filter="epigrafes"><option value="">Todas</option>' +
      options([...epigraphs].sort(([a], [b]) => epigraphOrder(a, b)), value => `${value.slice(1).replace(/^0/, '')}. ${bank.epigraphNames[value]}`) + '</select></label>',
    '  <label class="mc-field">Contenido <select data-sel-filter="tags"><option value="">Todos</option>' +
      options([...tags].sort(([a], [b]) => TAG_LABELS[a].localeCompare(TAG_LABELS[b], 'es')), value => TAG_LABELS[value]) + '</select></label>',
    '  <label class="mc-field">Año <select data-sel-filter="anio"><option value="">Todos</option>' +
      options(years.map(year => [year, cards.filter(exercise => exercise.row.anio === year).length]), value => value) + '</select></label>',
    '  <label class="mc-field">Convocatoria <select data-sel-filter="convocatoria"><option value="">Todas</option>' +
      options([...convocatorias].sort(([a], [b]) => (a === 'sin-identificar') - (b === 'sin-identificar') || a.localeCompare(b)),
        value => CONVOCATORIAS[value] ?? 'Sin identificar') + '</select></label>',
    '  <label class="mc-field">Tipo de examen <select data-sel-filter="tipo"><option value="">Todos</option>' +
      options([...tipos].sort(([a], [b]) => (a === 'sin-identificar') - (b === 'sin-identificar') || a.localeCompare(b)),
        value => TIPOS[value] ?? 'Sin identificar') + '</select></label>',
    outside ? `  <label class="mc-sel__check"><input type="checkbox" data-sel-outside> Incluir lo que ya no entra en la PAU (${outside})</label>` : '',
    '  <label class="mc-sel__check" data-sel-solved-field hidden><input type="checkbox" data-sel-solved> Solo con la solución publicada</label>',
    '</form>',
    '<p class="mc-library__status" data-sel-status role="status" aria-live="polite"></p>'
  ].filter(Boolean).join('\n');
}

function page({ pageId, title, description, body, scripts = [], block }) {
  return [
    '<!DOCTYPE html>',
    '<html lang="es" data-skin="mc">',
    '<head>',
    '  <script src="../assets/js/core/content-gate.js"></script>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    `  <title>${escape(title)} · Matemáticas CCSS II</title>`,
    `  <meta name="description" content="${escape(description)}">`,
    '  <link rel="stylesheet" href="../assets/css/main.css">',
    '  <script type="module" src="../assets/js/app.js"></script>',
    ...scripts.map(src => `  <script type="module" src="${src}"></script>`),
    '</head>',
    `<body data-page-id="${pageId}" class="mc-skin"${block ? ` data-block="${block}"` : ''}>`,
    '  <!-- Generado por scripts/build-selectividad.mjs a partir de Selectividad_LaTeX: no editar a mano. -->',
    '  <a class="skip-link" href="#main-content">Saltar al contenido</a>',
    '  <div id="site-header"></div>',
    '  <main id="main-content" class="page-main mc-page">',
    body.split('\n').map(line => line ? '    ' + line : line).join('\n'),
    '  </main>',
    '  <div id="site-footer"></div>',
    '</body>',
    '</html>',
    ''
  ].join('\n');
}

function topicPage(topic, bank) {
  const cards = bank.exercises.filter(exercise => exercise.topicId === topic.topicId)
    .sort((a, b) => b.row.anio.localeCompare(a.row.anio) || a.id.localeCompare(b.id));
  const related = bank.exercises.filter(exercise => exercise.secondary.includes(topic.topicId))
    .sort((a, b) => b.row.anio.localeCompare(a.row.anio) || a.id.localeCompare(b.id));
  const byYear = Map.groupBy(cards, exercise => exercise.row.anio);
  const body = [
    `<h1>Selectividad: ${escape(topic.name)}</h1>`,
    `<p class="mc-lead">${cards.length} ${cards.length === 1 ? 'ejercicio' : 'ejercicios'} de exámenes de Selectividad de Andalucía (${cards.at(-1).row.anio === cards[0].row.anio ? cards[0].row.anio : `${[...byYear.keys()].at(-1)}–${[...byYear.keys()][0]}`}) cuyo tema principal es ${escape(topic.name.toLowerCase())}, con los enunciados transcritos y cotejados con los originales.</p>`,
    '<p>Las puntuaciones son las del examen original. La prueba actual tiene otra estructura: consulta las <a href="index.html#formato">claves del formato vigente</a>.</p>',
    filters(cards, bank),
    ...[...byYear].flatMap(([year, items]) => [
      `<section class="mc-library__block mc-sel__year" data-sel-group aria-labelledby="anio-${year}">`,
      `  <h2 id="anio-${year}">${year}</h2>`,
      '  <ol class="mc-sel__cards" role="list">',
      items.map(exercise => card(exercise, bank).split('\n').map(line => '    ' + line).join('\n')).join('\n'),
      '  </ol>',
      '</section>'
    ]),
    ...(related.length ? [
      '<section class="mc-sel__related" aria-labelledby="otros-temas">',
      `  <h2 id="otros-temas">También en ejercicios de otros temas</h2>`,
      `  <p>Estos ejercicios tienen otro tema principal, pero alguno de sus apartados trabaja ${escape(topic.name.toLowerCase())}.</p>`,
      '  <ul>',
      ...related.map(exercise => {
        const host = bank.topics.find(item => item.topicId === exercise.topicId);
        return `    <li><a href="${path.basename(host.path)}#${exercise.id}">${escape(exercise.row.titulo_descriptivo)}</a> <span class="mc-sel__muted">(${exercise.row.anio} · ${escape(host.name)})</span></li>`;
      }),
      '  </ul>',
      '</section>'
    ] : [])
  ].join('\n');
  return page({
    pageId: topic.pageId, title: `Selectividad: ${topic.name}`,
    description: `Ejercicios de Selectividad de ${topic.name} con filtros por lección, contenido, año y convocatoria.`,
    body, scripts: ['../assets/js/learning/selectividad.js'],
    block: ['analisis', 'algebra', 'azar'][Math.floor((Number(topic.topicId.slice(1)) - 1) / 3)]
  });
}

function indexPage(bank) {
  const total = bank.exercises.length;
  const years = bank.exercises.map(exercise => Number(exercise.row.anio));
  const pending = bank.exercises.filter(exercise => provenance(exercise.row).pending).length;
  const rows = bank.pages.filter(item => item.kind === 'topic').map(topicRecord => {
    const topic = bank.topics.find(item => item.topicId === topicRecord.id);
    const main = bank.exercises.filter(exercise => exercise.topicId === topicRecord.id).length;
    const also = bank.exercises.filter(exercise => exercise.secondary.includes(topicRecord.id)).length;
    const detail = [main ? `${main} ${main === 1 ? 'ejercicio' : 'ejercicios'}` : 'Sin ejercicios propios',
      also ? `aparece también en ${also} de otros temas` : ''].filter(Boolean).join('; ');
    return topic
      ? `<li><a class="mc-card mc-card--stack" href="${path.basename(topic.path)}"><span class="mc-card__title">${escape(topicRecord.title)}</span><span class="mc-card__meta">${detail}.</span></a></li>`
      : `<li><div class="mc-card mc-card--stack mc-sel__empty"><span class="mc-card__title">${escape(topicRecord.title)}</span><span class="mc-card__meta">${detail}.</span></div></li>`;
  });
  const body = [
    '<h1>Selectividad</h1>',
    `<p class="mc-lead">${total} ejercicios de los exámenes de Matemáticas Aplicadas a las Ciencias Sociales II de Andalucía (${Math.min(...years)}–${Math.max(...years)}), ordenados por tema. Cada tarjeta indica el año, la convocatoria y el ejercicio de origen, y enlaza con las lecciones que necesitas.</p>`,
    '<p>Para practicar con una selección al azar por temas y contenidos, en PDF o LaTeX, usa el <a href="relaciones.html">generador de relaciones</a>.</p>',
    '<section aria-labelledby="temas">',
    '  <h2 id="temas">Elige un tema</h2>',
    '  <ul class="mc-mode-list">',
    ...rows.map(row => '    ' + row),
    '  </ul>',
    '</section>',
    '<section aria-labelledby="formato" class="mc-sel__format">',
    '  <h2 id="formato">Cómo es la prueba actual</h2>',
    '  <p>Estos ejercicios proceden del formato anterior: dos opciones de cuatro ejercicios de 2.5 puntos. Según las orientaciones de la prueba de 2025-2026, el examen actual tiene <strong>4 ejercicios en 1 hora y 30 minutos</strong>:</p>',
    '  <ul>',
    '    <li><strong>Ejercicio 1 (3 puntos):</strong> matrices, sistemas de ecuaciones y programación lineal.</li>',
    '    <li><strong>Ejercicio 2 (3 puntos):</strong> derivadas y sus aplicaciones, representación de funciones e integrales.</li>',
    '    <li><strong>Ejercicios 3 y 4 (2 puntos cada uno):</strong> probabilidad, distribuciones binomial y normal, e inferencia.</li>',
    '  </ul>',
    '  <p>Algunos ejercicios permiten elegir entre los apartados a) y b). Se escribe con punto decimal (7.5) y se entrega la tabla de la distribución normal. El contraste de hipótesis ya no entra: esos ejercicios aparecen marcados y ocultos de partida.</p>',
    '</section>',
    '<section aria-labelledby="estado">',
    '  <h2 id="estado">Estado del banco</h2>',
    `  <p>Los enunciados están transcritos y cotejados con los exámenes originales. En ${pending} ejercicios aún falta confirmar la convocatoria o el tipo de examen (titular, suplente o reserva); se indica en su tarjeta. Las soluciones se publican poco a poco, cuando están revisadas.</p>`,
    '</section>'
  ].join('\n');
  return page({ pageId: 'selectividad', title: 'Selectividad', description: 'Banco de ejercicios de Selectividad por temas.', body });
}

// Archivos del banco que necesita un proyecto de Overleaf generado por la web (estructura de Selectividad_LaTeX).
const LATEX_ASSETS = ['main.tex', 'tex/paquetes.tex', 'tex/comandos.tex', 'config/opciones.tex'];

function relationsPage(bank) {
  const count = topicId => bank.exercises.filter(exercise => exercise.topicId === topicId && !exercise.tags.includes(OUT_OF_SYLLABUS_TAG)).length;
  const body = [
    '<h1>Generador de relaciones</h1>',
    '<p class="mc-lead">Elige temas, contenidos y el número de ejercicios: la web elige ejercicios de Selectividad al azar y prepara una relación para imprimir, guardar en PDF o descargar en LaTeX.</p>',
    '<noscript><p class="mc-rel__notice">El generador necesita JavaScript. Puedes consultar los ejercicios en las <a href="index.html">páginas de cada tema</a>.</p></noscript>',
    '<form class="mc-rel__form" data-rel-form hidden aria-labelledby="criterios">',
    '  <h2 id="criterios">Criterios</h2>',
    '  <fieldset class="mc-rel__topics">',
    '    <legend>Temas <span class="mc-rel__hint">(ninguno marcado: todos)</span></legend>',
    ...bank.topics.map(topic => `    <label class="mc-sel__check"><input type="checkbox" name="tema" value="${topic.topicId}"> <span>${escape(topic.name)} <span class="mc-sel__muted">(${count(topic.topicId)})</span></span></label>`),
    '  </fieldset>',
    '  <fieldset class="mc-rel__tags">',
    '    <legend>Contenidos <span class="mc-rel__hint">(ninguno marcado: todos)</span></legend>',
    '    <label class="mc-field mc-rel__tag-search">Buscar un contenido <input type="search" data-rel-tag-search autocomplete="off" placeholder="Bayes, matriz inversa…"></label>',
    '    <div class="mc-rel__tag-list" data-rel-tags></div>',
    '    <p class="mc-rel__mode"><label class="mc-sel__check"><input type="radio" name="modo" value="any" checked> Con alguno de los contenidos marcados</label>',
    '    <label class="mc-sel__check"><input type="radio" name="modo" value="all"> Con todos</label></p>',
    '  </fieldset>',
    '  <div class="mc-rel__row">',
    '    <label class="mc-field">Número de ejercicios <input type="number" name="n" min="1" max="30" value="6" inputmode="numeric"></label>',
    '    <label class="mc-field">Semilla <input type="text" name="semilla" autocomplete="off" spellcheck="false" aria-describedby="semilla-ayuda"></label>',
    '    <label class="mc-field mc-rel__title">Título <input type="text" name="titulo" autocomplete="off"></label>',
    '  </div>',
    '  <p class="mc-rel__hint" id="semilla-ayuda">Con la misma semilla y los mismos criterios sale la misma relación; el enlace de la página la reproduce.</p>',
    '  <p class="mc-rel__options"><label class="mc-sel__check"><input type="checkbox" name="contraste"> Incluir lo que ya no entra en la PAU (contraste de hipótesis)</label>',
    '  <label class="mc-sel__check" data-rel-solved-field hidden><input type="checkbox" name="resueltos"> Solo ejercicios con la solución publicada</label>',
    '  <label class="mc-sel__check" data-rel-solutions-field hidden><input type="checkbox" name="soluciones"> Añadir las soluciones publicadas al final</label></p>',
    '  <p class="mc-rel__actions"><button type="submit" class="mc-btn mc-btn--primary">Generar relación</button> <button type="button" class="mc-btn" data-rel-reroll>Otra selección</button></p>',
    '</form>',
    '<p class="mc-library__status" data-rel-status role="status" aria-live="polite"></p>',
    '<section class="mc-rel__output" data-rel-output hidden aria-labelledby="relacion-titulo">',
    '  <p class="mc-rel__downloads"><button type="button" class="mc-btn mc-btn--primary" data-rel-print>Imprimir o guardar en PDF</button> <button type="button" class="mc-btn" data-rel-tex>Descargar LaTeX (.tex)</button> <button type="button" class="mc-btn" data-rel-zip>Proyecto para Overleaf (.zip)</button></p>',
    '  <article class="mc-rel__sheet" data-rel-sheet></article>',
    '</section>'
  ].join('\n');
  return page({
    pageId: 'selectividad-relaciones', title: 'Generador de relaciones',
    description: 'Relaciones de ejercicios de Selectividad elegidos al azar por tema y contenido, en PDF y LaTeX.',
    body, scripts: ['../assets/js/learning/selectividad-relations.js']
  });
}

export function buildAll(bank) {
  const files = new Map();
  files.set('selectividad/index.html', indexPage(bank));
  for (const topic of bank.topics) files.set(topic.path, topicPage(topic, bank));
  const epigraphs = {};
  for (const exercise of bank.exercises) for (const epigraph of exercise.epigraphs) {
    const pageId = 'selectividad-' + exercise.topicId;
    const entry = (epigraphs[epigraph] ??= []);
    const target = entry.find(item => item.pageId === pageId);
    if (target) target.count++; else entry.push({ pageId, count: 1 });
  }
  for (const entry of Object.values(epigraphs)) entry.sort((a, b) => b.count - a.count || a.pageId.localeCompare(b.pageId));
  const config = {
    schemaVersion: 1,
    topics: bank.topics.map(({ topicId, pageId, path: pagePath, name }) => ({
      topicId, pageId, path: pagePath, name, exercises: bank.exercises.filter(exercise => exercise.topicId === topicId).length
    })),
    epigraphs: Object.fromEntries(Object.entries(epigraphs).sort(([a], [b]) => a.localeCompare(b, 'es', { numeric: true }))),
    solutions: bank.exercises.filter(exercise => exercise.validated).map(exercise => ({
      id: exercise.id, topicId: exercise.topicId, title: exercise.row.titulo_descriptivo
    }))
  };
  files.set('config/selectividad.json', JSON.stringify(config, null, 2) + '\n');
  const solutions = Object.fromEntries(bank.exercises.filter(exercise => exercise.validated).map(exercise => [exercise.id,
    { html: exercise.solution, latex: exercise.solutionSource }]));
  files.set('content/selectividad/soluciones.json', JSON.stringify({ schemaVersion: 2, solutions }, null, 1) + '\n');
  // Generador de relaciones (P09): enunciados en HTML y en LaTeX, y lo necesario para un proyecto de Overleaf.
  const tagsInUse = [...new Set(bank.exercises.flatMap(exercise => exercise.tags))].sort((a, b) => TAG_LABELS[a].localeCompare(TAG_LABELS[b], 'es'));
  files.set('content/selectividad/ejercicios.json', JSON.stringify({
    schemaVersion: 1,
    topics: bank.topics.map(({ topicId, pageId, name }) => ({ topicId, pageId, name })),
    tags: Object.fromEntries(tagsInUse.map(tag => [tag, TAG_LABELS[tag]])),
    exercises: bank.exercises.map(exercise => {
      const { origin, place } = provenance(exercise.row);
      return {
        id: exercise.id, topicId: exercise.topicId, title: exercise.row.titulo_descriptivo, year: exercise.row.anio,
        origin, place, points: exercise.row.puntuacion_original, tags: exercise.tags,
        outside: exercise.tags.includes(OUT_OF_SYLLABUS_TAG), html: exercise.statement, latex: exercise.statementSource
      };
    })
  }, null, 1) + '\n');
  for (const name of LATEX_ASSETS) files.set('content/selectividad/latex/' + name, readBank(name));
  for (const name of [...new Set(bank.exercises.flatMap(exercise => exercise.solutionFigures))].sort()) {
    files.set(`content/selectividad/latex/recursos/figuras/${name}.pdf`, fs.readFileSync(path.join(bankRoot, 'recursos', 'figuras', name + '.pdf')));
  }
  files.set('selectividad/relaciones.html', relationsPage(bank));
  return files;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const check = process.argv.includes('--check');
  const bank = loadBank({ convertFigures: !check });
  const files = buildAll(bank);
  const stale = [];
  for (const [file, content] of files) {
    const target = path.join(root, file);
    const current = fs.existsSync(target) ? fs.readFileSync(target) : null;
    if (current && current.equals(Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf8'))) continue;
    if (check) stale.push(file);
    else { fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, content); }
  }
  // Figuras PDF que ya no cita ninguna solución publicable.
  const latexFigures = path.join(root, 'content', 'selectividad', 'latex', 'recursos', 'figuras');
  const orphanPdf = fs.existsSync(latexFigures) ? fs.readdirSync(latexFigures)
    .filter(name => !files.has('content/selectividad/latex/recursos/figuras/' + name)) : [];
  if (!check) for (const name of orphanPdf) fs.rmSync(path.join(latexFigures, name));
  else stale.push(...orphanPdf);
  const orphanFigures = fs.existsSync(figureDir) ? fs.readdirSync(figureDir).filter(name => !bank.figures.has(name)) : [];
  if (check) {
    if (stale.length || orphanFigures.length) {
      console.error('El banco de Selectividad no está al día (node scripts/build-selectividad.mjs): ' + [...stale, ...orphanFigures].join(', '));
      process.exitCode = 1;
    } else console.log(`Banco de Selectividad al día: ${bank.exercises.length} ejercicios, ${files.size} archivos.`);
  } else {
    for (const name of orphanFigures) fs.rmSync(path.join(figureDir, name));
    console.log(`Banco de Selectividad generado: ${bank.exercises.length} ejercicios, ${bank.exercises.filter(e => e.validated).length} soluciones, ${bank.figures.size} figuras.`);
  }
}
