import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';

const sourcePath = new URL('../../Página web existente/5. Inferencia Estadística/7. Tipo test.txt', import.meta.url);
const destination = new URL('../content/activities/inference-test.js', import.meta.url);
const readingDestination = new URL('../test/inferencia-preguntas.html', import.meta.url);
const source = fs.readFileSync(sourcePath);
const hash = crypto.createHash('sha256').update(source).digest('hex');
if (hash !== '24f01ad2e6cd85f317f791ca963cd49ae69f2350a706025a8b4f00da25fbba21') throw new Error('La fuente original del test ha cambiado: revisar antes de importar.');
const match = source.toString('utf8').match(/const questions = (\[[\s\S]*?\n        \]);/);
if (!match) throw new Error('No se encuentra el banco original.');
const original = vm.runInNewContext(match[1], {}, {timeout:1000});
if (original.length !== 20 || original.some(q => q.options.length !== 4 || !Number.isInteger(q.correct) || q.correct < 0 || q.correct > 3)) throw new Error('El banco original no tiene la estructura esperada.');

const fixes = {
  2: {question:'¿Qué relación hay entre tamaño de muestra y calidad de la selección?',options:{3:'Una muestra muy grande puede seguir dando resultados sesgados si está mal seleccionada.'},explanation:'Aumentar el tamaño reduce cierta variabilidad por azar bajo el diseño, pero no elimina sesgos de cobertura o selección.'},
  4: {question:'¿Qué característica permite un diseño probabilístico bien documentado?',options:{2:'Calcular probabilidades de inclusión y, bajo los supuestos adecuados, estimar incertidumbre por selección.'},explanation:'Con probabilidades de inclusión conocidas se puede analizar el error de muestreo del diseño; extrapolar requiere también revisar cobertura, respuesta y medición.'},
  5: {options:{2:'No queda determinada por el mecanismo de selección; no se conocen probabilidades de inclusión para todas las unidades.'},explanation:'Sin un mecanismo probabilístico conocido, no se conocen las probabilidades de inclusión. No significa que sea imposible asignar probabilidades en otro modelo explícito.'},
  8: {question:'En el diseño estratificado, ¿qué característica de los estratos puede mejorar la precisión para una variable de interés?',options:{1:'Que las unidades de cada estrato sean relativamente homogéneas respecto de esa variable, con diferencias entre estratos.'},explanation:'Es un objetivo de diseño, no una propiedad automática de cualquier partición. La selección dentro de cada estrato debe seguir el procedimiento indicado.'},
  9: {question:'En el muestreo por conglomerados, ¿qué se selecciona primero?',options:{1:'Grupos naturales de unidades, como centros o zonas, mediante el mecanismo aleatorio del diseño.'},explanation:'La selección comienza por grupos. Pueden estudiarse todas sus unidades o hacerse otra selección dentro de ellos; no se exige heterogeneidad interna perfecta.'},
  10: {question:'¿Qué ventaja práctica puede aportar el muestreo por conglomerados?',options:{3:'Puede reducir desplazamientos al concentrar el trabajo de campo en grupos seleccionados.'},explanation:'Concentrar visitas puede ahorrar desplazamientos, aunque ni el menor coste ni una mayor precisión están garantizados en todos los estudios.'},
  11: {explanation:'Entrevistar a quienes salen de un centro comercial es selección por accesibilidad. No representa automáticamente a todas las personas que compran allí o a quienes no respondieron.'},
  13: {question:'¿A qué método se parece la organización en grupos del muestreo por cuotas, aunque la elección dentro de ellos no sea necesariamente aleatoria?',explanation:'Las cuotas fijan cantidades por grupos, como una asignación entre estratos; sin sorteo dentro de ellos no equivalen a un diseño estratificado probabilístico.'},
  16: {question:'¿Por qué puede recurrirse a un muestreo no probabilístico?',options:{2:'Porque a veces no hay un marco de muestreo adecuado o el acceso al grupo hace inviable un sorteo práctico.'},explanation:'La factibilidad depende del marco y del acceso. Los costes y tiempos pueden influir, pero no son siempre mayores en todo diseño probabilístico; hay que explicar los límites de inferencia.'},
  17: {explanation:'La población es el conjunto de unidades sobre el que se quiere responder una pregunta. No tiene por qué estar formado solo por personas.'},
  18: {explanation:'Si se usan estratos o conglomerados como partición, los grupos deben ser excluyentes y exhaustivos respecto de la población objetivo: cada unidad pertenece a uno y ninguna queda fuera.'},
  20: {explanation:'Una selección inadecuada puede producir sesgo o resultados imprecisos. Aumentar el número de observaciones no repara por sí solo ese problema.'}
};
const hints = [
 'Piensa en la dirección de la inferencia: de muestra a población.',
 'Distingue tamaño de muestra de calidad de selección.',
 'Una pregunta no debe sugerir la respuesta deseada.',
 'Busca el mecanismo que permite conocer probabilidades de inclusión.',
 'Pregúntate si se conoce la probabilidad de inclusión de cada unidad.',
 'Ordena las acciones de la urna antes de sacar papeletas.',
 'Calcula el salto y cuenta el inicio como primer elemento.',
 'Piensa en qué agrupación puede reducir variación dentro de cada estrato.',
 'En este diseño, primero se eligen grupos.',
 'Imagina el recorrido del equipo de campo.',
 'La selección se hace entre las personas accesibles al salir.',
 '¿Quién decide qué casos cumplen el perfil?',
 'Las cuotas fijan cantidades por grupos, aunque no sortean necesariamente.',
 'Piensa cómo se elige a la siguiente persona de cada cuota.',
 'Una persona contactada recomienda a otra.',
 'Considera la disponibilidad de un marco y la dificultad de acceso.',
 'Población es el conjunto al que se refiere la pregunta de investigación.',
 'Ninguna unidad debe quedar fuera ni contarse en dos grupos.',
 'Recuerda cómo se selecciona dentro de cada estrato probabilístico.',
 'Una mala selección puede sesgar el resultado.'
];
const questions = original.map((q,i) => {
  const n=i+1, fix=fixes[n] || {}, options=q.options.map((text,j)=>({id:String.fromCharCode(97+j),text:fix.options?.[j] || text,feedback:j===q.correct?'Esa es la opción prevista en el diseño revisado.':'Esa opción no describe correctamente la situación.'}));
  return {id:'q-t09-original-'+String(n).padStart(2,'0'),topicId:'t09',sourceIndex:n,prompt:fix.question || q.question,options,correct:options[q.correct].id,hint:hints[i],explanation:fix.explanation || q.explanation};
});
fs.writeFileSync(destination, '// Banco revisado de Página web existente/5. Inferencia Estadística/7. Tipo test.txt.\n// Regenerar con scripts/build-inference-test.mjs; cambios en el generador.\nexport const inferenceQuestions = '+JSON.stringify(questions,null,2)+';\n');
const escape = text => String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const entries = questions.map((q,i)=>`<details id="pregunta-${i+1}"><summary>${i+1}. ${escape(q.prompt)}</summary><ol type="A">${q.options.map(o=>`<li>${escape(o.text)}</li>`).join('')}</ol><p><strong>Respuesta: ${q.correct.toUpperCase()}.</strong> ${escape(q.explanation)}</p></details>`).join('\n');
fs.writeFileSync(readingDestination,`<!DOCTYPE html>\n<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preguntas de Inferencia · Matemáticas CCSS II</title><link rel="stylesheet" href="../assets/css/main.css"><script type="module" src="../assets/js/app.js"></script></head><body data-page-id="tests"><a class="skip-link" href="#main-content">Saltar al contenido</a><div id="site-header"></div><main id="main-content" class="page-main"><h1>Preguntas de Inferencia: lectura</h1><p class="lead">Las 20 preguntas originales revisadas, en orden y con solución desplegable. Puedes leerlas sin activar la corrección automática.</p><p><a href="index.html?tema=t09">Abrir el test autocorregible</a> · <a href="../libro/temas/09-inferencia-estadistica/index.html">Volver al tema 9</a></p>${entries}</main><div id="site-footer"></div></body></html>\n`);
// Reading copies use the same visibility IDs as the interactive bank.
const readingHTML = fs.readFileSync(readingDestination, 'utf8')
  .replace('<head>', '<head><script src="../assets/js/core/content-gate.js"></script>')
  .replace('data-page-id="tests"', 'data-page-id="t09-questions"')
  .replace(/<details id="pregunta-(\d+)">/g, (_, n) =>
    '<details id="pregunta-' + n + '" data-content-id="question:' + questions[Number(n) - 1].id + '">');
fs.writeFileSync(readingDestination, readingHTML, 'utf8');
console.log('Generadas '+questions.length+' preguntas originales revisadas.');
