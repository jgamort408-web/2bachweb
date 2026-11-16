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

// Precisiones editoriales P03C2: se conservan los IDs y las respuestas correctas de origen.
const editorialFixes = {
  "1": {
    "explanation": "La inferencia utiliza información de una muestra para estudiar la población, con un diseño, un modelo y una incertidumbre que deben explicarse."
  },
  "3": {
    "explanation": "Una redacción neutral evita inducir una respuesta. No elimina por sí sola los sesgos de selección ni garantiza que todas las personas respondan."
  },
  "4": {
    "options": {
      "0": "Reducir siempre el coste frente a cualquier diseño no probabilístico.",
      "1": "Elegir cada unidad sólo según el juicio personal del investigador.",
      "3": "Reducir siempre el tiempo frente a cualquier diseño no probabilístico."
    }
  },
  "5": {
    "options": {
      "3": "Calculada mediante un salto sistemático."
    }
  },
  "6": {
    "question": "En el procedimiento de sorteo con urna descrito en la lección, ¿qué se prepara después de enumerar las unidades y antes de extraer la muestra?"
  },
  "7": {
    "explanation": "El salto es \\(N/n=1000/20=50\\). El inicio \\(8\\) es el primer elemento: el segundo es \\(8+50=58\\) y el tercero es \\(8+2\\cdot50=108\\). Sumar tres saltos daría el cuarto, \\(158\\).",
    "question": "En una población de \\(N=1000\\) personas se desea extraer una muestra sistemática de \\(n=20\\). Si el inicio aleatorio es \\(8\\), ¿cuál será el tercer elemento seleccionado?"
  },
  "9": {
    "options": {
      "0": "Personas individuales sorteadas directamente de un único listado general.",
      "2": "Personas accesibles que aceptan ser entrevistadas.",
      "3": "Personas elegidas por el encuestador hasta completar cuotas individuales."
    }
  },
  "11": {
    "question": "Una empresa elige a personas por su facilidad de acceso a la salida de un centro comercial, sin sorteo ni cuotas, para entrevistarlas. ¿Qué tipo de muestreo está usando?"
  },
  "12": {
    "options": {
      "2": "En sortear las unidades a partir de un listado completo de la población."
    },
    "explanation": "En el muestreo por juicio se eligen casos según el criterio del investigador. Esa elección no constituye por sí sola un sorteo ni permite conocer todas las probabilidades de inclusión."
  },
  "15": {
    "question": "¿En qué situación puede ser útil el muestreo de bola de nieve o por referidos?",
    "options": {
      "1": "Cuando es difícil localizar a la población de interés y los primeros contactos pueden remitir a otras personas."
    },
    "explanation": "Las personas contactadas remiten a otras del colectivo. Puede facilitar el acceso a poblaciones difíciles de localizar, pero las redes de contactos pueden introducir sesgo; no garantiza representatividad ni un margen muestral probabilístico."
  },
  "17": {
    "question": "¿Qué es la población objetivo de un estudio estadístico?",
    "options": {
      "3": "El conjunto de unidades de interés sobre el que se quiere obtener información o extraer conclusiones."
    }
  },
  "18": {
    "question": "Cuando los estratos o conglomerados forman una partición de la población objetivo, ¿qué deben cumplir los grupos?"
  },
  "19": {
    "question": "En el procedimiento estratificado descrito en la lección, ¿cómo se seleccionan las unidades dentro de cada estrato?"
  },
  "20": {
    "question": "Si la selección de una muestra es inadecuada, ¿qué puede ocurrir con las conclusiones del estudio?"
  }
};
for (const [n, fix] of Object.entries(editorialFixes)) {
  fixes[n] = { ...fixes[n], ...fix, options: { ...fixes[n]?.options, ...fix.options } };
}
const feedback = [
  [
    "Las herramientas informáticas pueden ayudar, pero no son el objetivo de la inferencia.",
    "La inferencia pasa de la información muestral a conclusiones sobre la población, bajo supuestos.",
    "El muestreo y la medición tienen incertidumbre; la inferencia no los elimina.",
    "El estudio no reduce la población: selecciona observaciones para conocerla."
  ],
  [
    "Un gran tamaño no corrige automáticamente la selección sesgada.",
    "No existe una regla universal que exija observar el 10 % de la población.",
    "El tamaño se planifica según precisión, diseño y recursos; más no siempre es la única prioridad.",
    "Una muestra grande puede conservar sesgos de cobertura, selección o respuesta."
  ],
  [
    "Una formulación neutral evita sugerir la respuesta que se desea obtener.",
    "Introducir la supuesta opinión mayoritaria puede influir en la respuesta.",
    "Persuadir modifica la medición: no es una redacción neutral.",
    "El tema económico no impide preguntar; importan la claridad y la neutralidad."
  ],
  [
    "Un diseño probabilístico no garantiza menor coste en todos los estudios.",
    "La elección sólo por criterio personal corresponde al juicio, no al sorteo probabilístico.",
    "Con probabilidades de inclusión conocidas se puede estudiar la incertidumbre de selección bajo el diseño.",
    "El tiempo depende del trabajo de campo; no hay una reducción universal."
  ],
  [
    "Probabilidades conocidas y positivas caracterizan el diseño probabilístico, no el caso preguntado.",
    "La igualdad entre estratos no define un muestreo no probabilístico.",
    "Sin mecanismo probabilístico documentado no se conocen las probabilidades de inclusión de todas las unidades.",
    "El salto no describe todos estos métodos; un sistemático con inicio aleatorio puede ser probabilístico."
  ],
  [
    "Extraer las papeletas viene después de preparar la urna numerada.",
    "Primero se prepara una papeleta identificable por unidad; después se hace la extracción prevista.",
    "Dividir en estratos es otro procedimiento, no el siguiente paso de esta urna.",
    "Aquí no se selecciona con salto; además, el intervalo sistemático se calcula a partir del diseño."
  ],
  [
    "58 es el segundo elemento: 8 más un salto de 50.",
    "158 es el cuarto elemento: 8 más tres saltos de 50.",
    "El inicio ya es el primero: el tercero es 8 más dos saltos de 50, es decir, 108.",
    "28 suma el tamaño de muestra al inicio; el salto es 1000/20, no 20."
  ],
  [
    "Para esta finalidad se busca reducir variación dentro de cada estrato, no invertir ese criterio.",
    "La homogeneidad interna respecto de la variable y las diferencias entre estratos pueden mejorar la precisión.",
    "Sortear unidades no hace que cualquier agrupación tenga esa propiedad.",
    "Una gran heterogeneidad interna no es la propiedad que se busca aquí para ganar precisión."
  ],
  [
    "Sortear directamente personas del listado general se parece al muestreo aleatorio simple de individuos.",
    "En conglomerados se seleccionan primero grupos naturales; después se estudian todas o algunas de sus unidades.",
    "Elegir personas accesibles es conveniencia, no selección aleatoria de grupos.",
    "Completar cuotas individuales no equivale a sortear conglomerados."
  ],
  [
    "Un diseño probabilístico por conglomerados sigue necesitando un mecanismo de selección aleatoria.",
    "En la partición básica, cada unidad pertenece a un grupo; el solapamiento no es la ventaja preguntada.",
    "Agrupar no elimina la incertidumbre ni garantiza error nulo.",
    "Concentrar visitas en los grupos seleccionados puede reducir desplazamientos."
  ],
  [
    "No se han definido estratos ni un sorteo dentro de ellos.",
    "No hay una cadena en la que las personas remitan a nuevos contactos.",
    "Se eligen personas accesibles por comodidad de acceso, sin sorteo ni cuotas.",
    "La facilidad de acceso no hace equiprobables todas las muestras de la población objetivo."
  ],
  [
    "Fijar cantidades por grupos describe cuotas, no necesariamente la selección por juicio.",
    "El investigador elige casos según su experiencia y criterio.",
    "Un sorteo sobre un marco completo es una selección probabilística distinta.",
    "Pedir referencias para localizar nuevos contactos caracteriza la bola de nieve."
  ],
  [
    "El sistemático se organiza mediante inicio e intervalo de selección, no por esta semejanza entre grupos.",
    "El muestreo simple no exige fijar cuotas por grupos.",
    "Ambos organizan unidades por grupos, pero las cuotas no garantizan selección aleatoria dentro de ellos.",
    "Los conglomerados se seleccionan como grupos; aquí se fijan cantidades de personas por grupo."
  ],
  [
    "Sortear dentro de grupos definidos podría formar parte de un diseño estratificado, pero no define las cuotas no probabilísticas.",
    "No es necesario observar a toda la población para completar cantidades por grupos.",
    "El encuestador elige unidades hasta alcanzar las cantidades fijadas, sin que haya necesariamente sorteo.",
    "Las cuotas no obligan a utilizar cadenas de contactos."
  ],
  [
    "Con un marco completo pueden ser viables sorteos directos; no es la razón específica para usar referidos.",
    "Los contactos iniciales pueden ayudar a localizar a otras personas del colectivo difícil de acceder.",
    "Las cadenas de contactos no garantizan representatividad ni el menor error muestral.",
    "Concentrar encuestas en manzanas de edificios se aproxima al trabajo por conglomerados."
  ],
  [
    "Los diseños probabilísticos sí permiten inferencia bajo sus supuestos y condiciones.",
    "Las ciencias sociales también emplean modelos y métodos matemáticos; no es una razón válida.",
    "La falta de un marco o las dificultades de acceso pueden hacer necesario otro procedimiento, con sus límites.",
    "Sin probabilidades de inclusión conocidas no se obtiene automáticamente una mejor estimación del error de muestreo."
  ],
  [
    "El número de observaciones corresponde al tamaño de la muestra, no al conjunto objetivo.",
    "El procedimiento de selección es el diseño de muestreo, no la población.",
    "Las personas finalmente medidas pertenecen a la muestra observada; no definen por sí solas la población objetivo.",
    "La población es el conjunto de unidades sobre el que se formula la pregunta de investigación."
  ],
  [
    "Excluyentes evita duplicar unidades entre grupos y exhaustivos evita dejar unidades fuera.",
    "Una partición puede contener grupos de tamaños diferentes.",
    "La condición de partición no impone que la selección sea no probabilística.",
    "La homogeneidad no sustituye las condiciones de pertenencia única y cobertura de toda la población."
  ],
  [
    "La elección por juicio no es el sorteo dentro de cada estrato que describe esta lección.",
    "La lección aplica un muestreo aleatorio simple dentro de cada estrato definido.",
    "La bola de nieve no es el método descrito para seleccionar dentro de los estratos.",
    "Observar todos los miembros sería un censo de ese estrato, no la extracción muestral descrita."
  ],
  [
    "El tiempo de desplazamiento no se deduce necesariamente de una selección inadecuada.",
    "Una mala selección no obliga a cambiar automáticamente al método de conglomerados.",
    "La selección inadecuada puede introducir sesgo y comprometer las conclusiones, aunque haya muchos datos.",
    "Seleccionar la muestra no cambia por sí mismo los parámetros de la población."
  ]
];
if (feedback.length !== original.length || feedback.some(row => row.length !== 4 || row.some(text => !text.trim()) || new Set(row).size !== 4)) throw new Error("Retroalimentación incompleta o repetida en el test de Inferencia.");

const questions = original.map((q,i) => {
  const n=i+1, fix=fixes[n] || {}, options=q.options.map((text,j)=>({id:String.fromCharCode(97+j),text:fix.options?.[j] || text,feedback:feedback[i][j]}));
  return {id:'q-t09-original-'+String(n).padStart(2,'0'),topicId:'t09',sourceIndex:n,prompt:fix.question || q.question,options,correct:options[q.correct].id,hint:hints[i],explanation:fix.explanation || q.explanation};
});
fs.writeFileSync(destination, '// Banco revisado de Página web existente/5. Inferencia Estadística/7. Tipo test.txt.\n// Regenerar con scripts/build-inference-test.mjs; cambios en el generador.\nexport const inferenceQuestions = '+JSON.stringify(questions,null,2)+';\n');
const escape = text => String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const entries = questions.map((q,i)=>`<details id="pregunta-${i+1}"><summary>${i+1}. ${escape(q.prompt)}</summary><ol type="A">${q.options.map(o=>`<li>${escape(o.text)}</li>`).join('')}</ol><p><strong>Respuesta: ${q.correct.toUpperCase()}.</strong> ${escape(q.explanation)}</p></details>`).join('\n');
fs.writeFileSync(readingDestination,`<!DOCTYPE html>\n<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preguntas de Inferencia · Matemáticas CCSS II</title><link rel="stylesheet" href="../assets/css/main.css"><script type="module" src="../assets/js/app.js"></script></head><body data-page-id="tests"><a class="skip-link" href="#main-content">Saltar al contenido</a><div id="site-header"></div><main id="main-content" class="page-main"><h1>Preguntas de Inferencia: lectura</h1><p class="lead">Las 20 preguntas originales revisadas sobre conceptos y muestreo, en orden y con solución desplegable. Puedes leerlas sin activar la corrección automática.</p><p><a href="index.html?tema=t09">Abrir el test autocorregible</a> · <a href="../libro/temas/09-inferencia-estadistica/index.html">Volver al tema 9</a></p>${entries}</main><div id="site-footer"></div></body></html>\n`);
// Reading copies use the same visibility IDs as the interactive bank.
const readingHTML = fs.readFileSync(readingDestination, 'utf8')
  .replace('<head>', '<head><script src="../assets/js/core/content-gate.js"></script>')
  .replace('data-page-id="tests"', 'data-page-id="t09-questions"')
  .replace(/<details id="pregunta-(\d+)">/g, (_, n) =>
    '<details id="pregunta-' + n + '" data-content-id="question:' + questions[Number(n) - 1].id + '">');
fs.writeFileSync(readingDestination, readingHTML, 'utf8');
console.log('Generadas '+questions.length+' preguntas originales revisadas.');
