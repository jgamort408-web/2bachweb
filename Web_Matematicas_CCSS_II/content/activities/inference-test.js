// Banco revisado de Página web existente/5. Inferencia Estadística/7. Tipo test.txt.
// Regenerar con scripts/build-inference-test.mjs; cambios en el generador.
export const inferenceQuestions = [
  {
    "id": "q-t09-original-01",
    "topicId": "t09",
    "sourceIndex": 1,
    "prompt": "¿Cuál es el propósito principal de la inferencia estadística según los apuntes?",
    "options": [
      {
        "id": "a",
        "text": "Diseñar herramientas informáticas para realizar encuestas.",
        "feedback": "Las herramientas informáticas pueden ayudar, pero no son el objetivo de la inferencia."
      },
      {
        "id": "b",
        "text": "Extraer conclusiones acerca de una población a partir de los resultados obtenidos en una muestra.",
        "feedback": "La inferencia pasa de la información muestral a conclusiones sobre la población, bajo supuestos."
      },
      {
        "id": "c",
        "text": "Garantizar que una muestra seleccionada no tenga ningún tipo de riesgo o error.",
        "feedback": "El muestreo y la medición tienen incertidumbre; la inferencia no los elimina."
      },
      {
        "id": "d",
        "text": "Reducir el tamaño de la población estudiada al mínimo posible.",
        "feedback": "El estudio no reduce la población: selecciona observaciones para conocerla."
      }
    ],
    "correct": "b",
    "hint": "Piensa en la dirección de la inferencia: de muestra a población.",
    "explanation": "La inferencia utiliza información de una muestra para estudiar la población, con un diseño, un modelo y una incertidumbre que deben explicarse."
  },
  {
    "id": "q-t09-original-02",
    "topicId": "t09",
    "sourceIndex": 2,
    "prompt": "¿Qué relación hay entre tamaño de muestra y calidad de la selección?",
    "options": [
      {
        "id": "a",
        "text": "Una cantidad muy elevada de datos siempre garantiza una mayor certeza absoluta.",
        "feedback": "Un gran tamaño no corrige automáticamente la selección sesgada."
      },
      {
        "id": "b",
        "text": "Debe coincidir exactamente con el 10% de la población total.",
        "feedback": "No existe una regla universal que exija observar el 10 % de la población."
      },
      {
        "id": "c",
        "text": "Debe ser lo más grande posible independientemente del coste o tiempo.",
        "feedback": "El tamaño se planifica según precisión, diseño y recursos; más no siempre es la única prioridad."
      },
      {
        "id": "d",
        "text": "Una muestra muy grande puede seguir dando resultados sesgados si está mal seleccionada.",
        "feedback": "Una muestra grande puede conservar sesgos de cobertura, selección o respuesta."
      }
    ],
    "correct": "d",
    "hint": "Distingue tamaño de muestra de calidad de selección.",
    "explanation": "Aumentar el tamaño reduce cierta variabilidad por azar bajo el diseño, pero no elimina sesgos de cobertura o selección."
  },
  {
    "id": "q-t09-original-03",
    "topicId": "t09",
    "sourceIndex": 3,
    "prompt": "A la hora de redactar una encuesta, ¿cuál es el requisito fundamental para las preguntas (según la sección 'Muestreo')?",
    "options": [
      {
        "id": "a",
        "text": "Formularlas de una manera objetiva e imparcial.",
        "feedback": "Una formulación neutral evita sugerir la respuesta que se desea obtener."
      },
      {
        "id": "b",
        "text": "Incluir la opinión de la mayoría para facilitar la respuesta.",
        "feedback": "Introducir la supuesta opinión mayoritaria puede influir en la respuesta."
      },
      {
        "id": "c",
        "text": "Hacerlas sutilmente persuasivas para probar una hipótesis concreta.",
        "feedback": "Persuadir modifica la medición: no es una redacción neutral."
      },
      {
        "id": "d",
        "text": "Evitar preguntas sobre temas económicos o de impuestos.",
        "feedback": "El tema económico no impide preguntar; importan la claridad y la neutralidad."
      }
    ],
    "correct": "a",
    "hint": "Una pregunta no debe sugerir la respuesta deseada.",
    "explanation": "Una redacción neutral evita inducir una respuesta. No elimina por sí sola los sesgos de selección ni garantiza que todas las personas respondan."
  },
  {
    "id": "q-t09-original-04",
    "topicId": "t09",
    "sourceIndex": 4,
    "prompt": "¿Qué característica permite un diseño probabilístico bien documentado?",
    "options": [
      {
        "id": "a",
        "text": "Reducir siempre el coste frente a cualquier diseño no probabilístico.",
        "feedback": "Un diseño probabilístico no garantiza menor coste en todos los estudios."
      },
      {
        "id": "b",
        "text": "Elegir cada unidad sólo según el juicio personal del investigador.",
        "feedback": "La elección sólo por criterio personal corresponde al juicio, no al sorteo probabilístico."
      },
      {
        "id": "c",
        "text": "Calcular probabilidades de inclusión y, bajo los supuestos adecuados, estimar incertidumbre por selección.",
        "feedback": "Con probabilidades de inclusión conocidas se puede estudiar la incertidumbre de selección bajo el diseño."
      },
      {
        "id": "d",
        "text": "Reducir siempre el tiempo frente a cualquier diseño no probabilístico.",
        "feedback": "El tiempo depende del trabajo de campo; no hay una reducción universal."
      }
    ],
    "correct": "c",
    "hint": "Busca el mecanismo que permite conocer probabilidades de inclusión.",
    "explanation": "Con probabilidades de inclusión conocidas se puede analizar el error de muestreo del diseño; extrapolar requiere también revisar cobertura, respuesta y medición."
  },
  {
    "id": "q-t09-original-05",
    "topicId": "t09",
    "sourceIndex": 5,
    "prompt": "En las técnicas de muestreo NO probabilísticas, la probabilidad de ser elegido de cada elemento de la población es...",
    "options": [
      {
        "id": "a",
        "text": "Conocida y no nula.",
        "feedback": "Probabilidades conocidas y positivas caracterizan el diseño probabilístico, no el caso preguntado."
      },
      {
        "id": "b",
        "text": "Estrictamente igual para todos los estratos.",
        "feedback": "La igualdad entre estratos no define un muestreo no probabilístico."
      },
      {
        "id": "c",
        "text": "No queda determinada por el mecanismo de selección; no se conocen probabilidades de inclusión para todas las unidades.",
        "feedback": "Sin mecanismo probabilístico documentado no se conocen las probabilidades de inclusión de todas las unidades."
      },
      {
        "id": "d",
        "text": "Calculada mediante un salto sistemático.",
        "feedback": "El salto no describe todos estos métodos; un sistemático con inicio aleatorio puede ser probabilístico."
      }
    ],
    "correct": "c",
    "hint": "Pregúntate si se conoce la probabilidad de inclusión de cada unidad.",
    "explanation": "Sin un mecanismo probabilístico conocido, no se conocen las probabilidades de inclusión. No significa que sea imposible asignar probabilidades en otro modelo explícito."
  },
  {
    "id": "q-t09-original-06",
    "topicId": "t09",
    "sourceIndex": 6,
    "prompt": "En el procedimiento de sorteo con urna descrito en la lección, ¿qué se prepara después de enumerar las unidades y antes de extraer la muestra?",
    "options": [
      {
        "id": "a",
        "text": "Seleccionar, uno a uno, n papeles de la urna.",
        "feedback": "Extraer las papeletas viene después de preparar la urna numerada."
      },
      {
        "id": "b",
        "text": "Introducir en una urna papeles numerados del 1 al N (total de la población).",
        "feedback": "Primero se prepara una papeleta identificable por unidad; después se hace la extracción prevista."
      },
      {
        "id": "c",
        "text": "Dividir a la población en estratos excluyentes.",
        "feedback": "Dividir en estratos es otro procedimiento, no el siguiente paso de esta urna."
      },
      {
        "id": "d",
        "text": "Elegir un número al azar para determinar el intervalo o salto.",
        "feedback": "Aquí no se selecciona con salto; además, el intervalo sistemático se calcula a partir del diseño."
      }
    ],
    "correct": "b",
    "hint": "Ordena las acciones de la urna antes de sacar papeletas.",
    "explanation": "Según los pasos del ejemplo: 1º Se enumeran. 2º En una urna se introducen papeles numerados del 1 al N. 3º Se seleccionan n papeles."
  },
  {
    "id": "q-t09-original-07",
    "topicId": "t09",
    "sourceIndex": 7,
    "prompt": "En una población de \\(N=1000\\) personas se desea extraer una muestra sistemática de \\(n=20\\). Si el inicio aleatorio es \\(8\\), ¿cuál será el tercer elemento seleccionado?",
    "options": [
      {
        "id": "a",
        "text": "58",
        "feedback": "58 es el segundo elemento: 8 más un salto de 50."
      },
      {
        "id": "b",
        "text": "158",
        "feedback": "158 es el cuarto elemento: 8 más tres saltos de 50."
      },
      {
        "id": "c",
        "text": "108",
        "feedback": "El inicio ya es el primero: el tercero es 8 más dos saltos de 50, es decir, 108."
      },
      {
        "id": "d",
        "text": "28",
        "feedback": "28 suma el tamaño de muestra al inicio; el salto es 1000/20, no 20."
      }
    ],
    "correct": "c",
    "hint": "Calcula el salto y cuenta el inicio como primer elemento.",
    "explanation": "El salto es \\(N/n=1000/20=50\\). El inicio \\(8\\) es el primer elemento: el segundo es \\(8+50=58\\) y el tercero es \\(8+2\\cdot50=108\\). Sumar tres saltos daría el cuarto, \\(158\\)."
  },
  {
    "id": "q-t09-original-08",
    "topicId": "t09",
    "sourceIndex": 8,
    "prompt": "En el diseño estratificado, ¿qué característica de los estratos puede mejorar la precisión para una variable de interés?",
    "options": [
      {
        "id": "a",
        "text": "Sus integrantes son heterogéneos entre sí, pero los estratos son homogéneos entre ellos.",
        "feedback": "Para esta finalidad se busca reducir variación dentro de cada estrato, no invertir ese criterio."
      },
      {
        "id": "b",
        "text": "Que las unidades de cada estrato sean relativamente homogéneas respecto de esa variable, con diferencias entre estratos.",
        "feedback": "La homogeneidad interna respecto de la variable y las diferencias entre estratos pueden mejorar la precisión."
      },
      {
        "id": "c",
        "text": "Son completamente al azar y no guardan relación de homogeneidad ni heterogeneidad.",
        "feedback": "Sortear unidades no hace que cualquier agrupación tenga esa propiedad."
      },
      {
        "id": "d",
        "text": "Los integrantes son heterogéneos y los estratos también son heterogéneos entre sí.",
        "feedback": "Una gran heterogeneidad interna no es la propiedad que se busca aquí para ganar precisión."
      }
    ],
    "correct": "b",
    "hint": "Piensa en qué agrupación puede reducir variación dentro de cada estrato.",
    "explanation": "Es un objetivo de diseño, no una propiedad automática de cualquier partición. La selección dentro de cada estrato debe seguir el procedimiento indicado."
  },
  {
    "id": "q-t09-original-09",
    "topicId": "t09",
    "sourceIndex": 9,
    "prompt": "En el muestreo por conglomerados, ¿qué se selecciona primero?",
    "options": [
      {
        "id": "a",
        "text": "Personas individuales sorteadas directamente de un único listado general.",
        "feedback": "Sortear directamente personas del listado general se parece al muestreo aleatorio simple de individuos."
      },
      {
        "id": "b",
        "text": "Grupos naturales de unidades, como centros o zonas, mediante el mecanismo aleatorio del diseño.",
        "feedback": "En conglomerados se seleccionan primero grupos naturales; después se estudian todas o algunas de sus unidades."
      },
      {
        "id": "c",
        "text": "Personas accesibles que aceptan ser entrevistadas.",
        "feedback": "Elegir personas accesibles es conveniencia, no selección aleatoria de grupos."
      },
      {
        "id": "d",
        "text": "Personas elegidas por el encuestador hasta completar cuotas individuales.",
        "feedback": "Completar cuotas individuales no equivale a sortear conglomerados."
      }
    ],
    "correct": "b",
    "hint": "En este diseño, primero se eligen grupos.",
    "explanation": "La selección comienza por grupos. Pueden estudiarse todas sus unidades o hacerse otra selección dentro de ellos; no se exige heterogeneidad interna perfecta."
  },
  {
    "id": "q-t09-original-10",
    "topicId": "t09",
    "sourceIndex": 10,
    "prompt": "¿Qué ventaja práctica puede aportar el muestreo por conglomerados?",
    "options": [
      {
        "id": "a",
        "text": "Elimina por completo la necesidad de azar.",
        "feedback": "Un diseño probabilístico por conglomerados sigue necesitando un mecanismo de selección aleatoria."
      },
      {
        "id": "b",
        "text": "Permite que un elemento pertenezca a varios subgrupos.",
        "feedback": "En la partición básica, cada unidad pertenece a un grupo; el solapamiento no es la ventaja preguntada."
      },
      {
        "id": "c",
        "text": "Disminuye el error muestral a cero.",
        "feedback": "Agrupar no elimina la incertidumbre ni garantiza error nulo."
      },
      {
        "id": "d",
        "text": "Puede reducir desplazamientos al concentrar el trabajo de campo en grupos seleccionados.",
        "feedback": "Concentrar visitas en los grupos seleccionados puede reducir desplazamientos."
      }
    ],
    "correct": "d",
    "hint": "Imagina el recorrido del equipo de campo.",
    "explanation": "Concentrar visitas puede ahorrar desplazamientos, aunque ni el menor coste ni una mayor precisión están garantizados en todos los estudios."
  },
  {
    "id": "q-t09-original-11",
    "topicId": "t09",
    "sourceIndex": 11,
    "prompt": "Una empresa elige a personas por su facilidad de acceso a la salida de un centro comercial, sin sorteo ni cuotas, para entrevistarlas. ¿Qué tipo de muestreo está usando?",
    "options": [
      {
        "id": "a",
        "text": "Muestreo estratificado.",
        "feedback": "No se han definido estratos ni un sorteo dentro de ellos."
      },
      {
        "id": "b",
        "text": "Muestreo de bola de nieve.",
        "feedback": "No hay una cadena en la que las personas remitan a nuevos contactos."
      },
      {
        "id": "c",
        "text": "Muestreo por conveniencia.",
        "feedback": "Se eligen personas accesibles por comodidad de acceso, sin sorteo ni cuotas."
      },
      {
        "id": "d",
        "text": "Muestreo aleatorio simple.",
        "feedback": "La facilidad de acceso no hace equiprobables todas las muestras de la población objetivo."
      }
    ],
    "correct": "c",
    "hint": "La selección se hace entre las personas accesibles al salir.",
    "explanation": "Entrevistar a quienes salen de un centro comercial es selección por accesibilidad. No representa automáticamente a todas las personas que compran allí o a quienes no respondieron."
  },
  {
    "id": "q-t09-original-12",
    "topicId": "t09",
    "sourceIndex": 12,
    "prompt": "¿En qué consiste el 'Muestreo por juicio'?",
    "options": [
      {
        "id": "a",
        "text": "En establecer cuotas proporcionales estrictas por género y edad.",
        "feedback": "Fijar cantidades por grupos describe cuotas, no necesariamente la selección por juicio."
      },
      {
        "id": "b",
        "text": "En confiar en la experiencia y criterio del encuestador para seleccionar los elementos de la muestra.",
        "feedback": "El investigador elige casos según su experiencia y criterio."
      },
      {
        "id": "c",
        "text": "En sortear las unidades a partir de un listado completo de la población.",
        "feedback": "Un sorteo sobre un marco completo es una selección probabilística distinta."
      },
      {
        "id": "d",
        "text": "En contactar primero a una persona que cumpla el perfil y pedirle referencias de otras iguales.",
        "feedback": "Pedir referencias para localizar nuevos contactos caracteriza la bola de nieve."
      }
    ],
    "correct": "b",
    "hint": "¿Quién decide qué casos cumplen el perfil?",
    "explanation": "En el muestreo por juicio se eligen casos según el criterio del investigador. Esa elección no constituye por sí sola un sorteo ni permite conocer todas las probabilidades de inclusión."
  },
  {
    "id": "q-t09-original-13",
    "topicId": "t09",
    "sourceIndex": 13,
    "prompt": "¿A qué método se parece la organización en grupos del muestreo por cuotas, aunque la elección dentro de ellos no sea necesariamente aleatoria?",
    "options": [
      {
        "id": "a",
        "text": "Muestreo sistemático.",
        "feedback": "El sistemático se organiza mediante inicio e intervalo de selección, no por esta semejanza entre grupos."
      },
      {
        "id": "b",
        "text": "Muestreo aleatorio simple.",
        "feedback": "El muestreo simple no exige fijar cuotas por grupos."
      },
      {
        "id": "c",
        "text": "Muestreo estratificado.",
        "feedback": "Ambos organizan unidades por grupos, pero las cuotas no garantizan selección aleatoria dentro de ellos."
      },
      {
        "id": "d",
        "text": "Muestreo por conglomerados.",
        "feedback": "Los conglomerados se seleccionan como grupos; aquí se fijan cantidades de personas por grupo."
      }
    ],
    "correct": "c",
    "hint": "Las cuotas fijan cantidades por grupos, aunque no sortean necesariamente.",
    "explanation": "Las cuotas fijan cantidades por grupos, como una asignación entre estratos; sin sorteo dentro de ellos no equivalen a un diseño estratificado probabilístico."
  },
  {
    "id": "q-t09-original-14",
    "topicId": "t09",
    "sourceIndex": 14,
    "prompt": "En un muestreo por cuotas, ¿cómo procede generalmente el encuestador para llegar a la cantidad exigida por estrato?",
    "options": [
      {
        "id": "a",
        "text": "Pide al ordenador que genere números aleatorios estrictos.",
        "feedback": "Sortear dentro de grupos definidos podría formar parte de un diseño estratificado, pero no define las cuotas no probabilísticas."
      },
      {
        "id": "b",
        "text": "Entrevista a toda la población hasta separar las cuotas a posteriori.",
        "feedback": "No es necesario observar a toda la población para completar cantidades por grupos."
      },
      {
        "id": "c",
        "text": "Selecciona —haciendo a veces un muestreo por juicio— cada uno de los elementos hasta completar las cuotas.",
        "feedback": "El encuestador elige unidades hasta alcanzar las cantidades fijadas, sin que haya necesariamente sorteo."
      },
      {
        "id": "d",
        "text": "Solo selecciona individuos mediante el método de bola de nieve.",
        "feedback": "Las cuotas no obligan a utilizar cadenas de contactos."
      }
    ],
    "correct": "c",
    "hint": "Piensa cómo se elige a la siguiente persona de cada cuota.",
    "explanation": "El apunte dice: «El encuestador selecciona —haciendo, a veces, un muestreo por juicio— cada uno de los elementos hasta completar las cuotas»."
  },
  {
    "id": "q-t09-original-15",
    "topicId": "t09",
    "sourceIndex": 15,
    "prompt": "¿En qué situación puede ser útil el muestreo de bola de nieve o por referidos?",
    "options": [
      {
        "id": "a",
        "text": "Cuando se dispone del listado completo del marco muestral de la ciudad.",
        "feedback": "Con un marco completo pueden ser viables sorteos directos; no es la razón específica para usar referidos."
      },
      {
        "id": "b",
        "text": "Cuando es difícil localizar a la población de interés y los primeros contactos pueden remitir a otras personas.",
        "feedback": "Los contactos iniciales pueden ayudar a localizar a otras personas del colectivo difícil de acceder."
      },
      {
        "id": "c",
        "text": "Cuando se busca la máxima representatividad matemática y el menor margen de error.",
        "feedback": "Las cadenas de contactos no garantizan representatividad ni el menor error muestral."
      },
      {
        "id": "d",
        "text": "Cuando se necesita reducir los tiempos de desplazamiento encuestando manzanas de edificios completas.",
        "feedback": "Concentrar encuestas en manzanas de edificios se aproxima al trabajo por conglomerados."
      }
    ],
    "correct": "b",
    "hint": "Una persona contactada recomienda a otra.",
    "explanation": "Las personas contactadas remiten a otras del colectivo. Puede facilitar el acceso a poblaciones difíciles de localizar, pero las redes de contactos pueden introducir sesgo; no garantiza representatividad ni un margen muestral probabilístico."
  },
  {
    "id": "q-t09-original-16",
    "topicId": "t09",
    "sourceIndex": 16,
    "prompt": "¿Por qué puede recurrirse a un muestreo no probabilístico?",
    "options": [
      {
        "id": "a",
        "text": "Porque los probabilísticos no permiten extrapolar a la población.",
        "feedback": "Los diseños probabilísticos sí permiten inferencia bajo sus supuestos y condiciones."
      },
      {
        "id": "b",
        "text": "Porque en las ciencias sociales las matemáticas puras no aplican.",
        "feedback": "Las ciencias sociales también emplean modelos y métodos matemáticos; no es una razón válida."
      },
      {
        "id": "c",
        "text": "Porque a veces no hay un marco de muestreo adecuado o el acceso al grupo hace inviable un sorteo práctico.",
        "feedback": "La falta de un marco o las dificultades de acceso pueden hacer necesario otro procedimiento, con sus límites."
      },
      {
        "id": "d",
        "text": "Porque los métodos no probabilísticos estiman mejor el error muestral en poblaciones pequeñas.",
        "feedback": "Sin probabilidades de inclusión conocidas no se obtiene automáticamente una mejor estimación del error de muestreo."
      }
    ],
    "correct": "c",
    "hint": "Considera la disponibilidad de un marco y la dificultad de acceso.",
    "explanation": "La factibilidad depende del marco y del acceso. Los costes y tiempos pueden influir, pero no son siempre mayores en todo diseño probabilístico; hay que explicar los límites de inferencia."
  },
  {
    "id": "q-t09-original-17",
    "topicId": "t09",
    "sourceIndex": 17,
    "prompt": "¿Qué es la población objetivo de un estudio estadístico?",
    "options": [
      {
        "id": "a",
        "text": "El número total de elementos que han sido extraídos para realizar una encuesta.",
        "feedback": "El número de observaciones corresponde al tamaño de la muestra, no al conjunto objetivo."
      },
      {
        "id": "b",
        "text": "El proceso riguroso que se sigue para la extracción de individuos.",
        "feedback": "El procedimiento de selección es el diseño de muestreo, no la población."
      },
      {
        "id": "c",
        "text": "La parte de los ciudadanos totales sobre los que se ha logrado medir una característica real.",
        "feedback": "Las personas finalmente medidas pertenecen a la muestra observada; no definen por sí solas la población objetivo."
      },
      {
        "id": "d",
        "text": "El conjunto de unidades de interés sobre el que se quiere obtener información o extraer conclusiones.",
        "feedback": "La población es el conjunto de unidades sobre el que se formula la pregunta de investigación."
      }
    ],
    "correct": "d",
    "hint": "Población es el conjunto al que se refiere la pregunta de investigación.",
    "explanation": "La población es el conjunto de unidades sobre el que se quiere responder una pregunta. No tiene por qué estar formado solo por personas."
  },
  {
    "id": "q-t09-original-18",
    "topicId": "t09",
    "sourceIndex": 18,
    "prompt": "Cuando los estratos o conglomerados forman una partición de la población objetivo, ¿qué deben cumplir los grupos?",
    "options": [
      {
        "id": "a",
        "text": "Excluyentes y exhaustivos.",
        "feedback": "Excluyentes evita duplicar unidades entre grupos y exhaustivos evita dejar unidades fuera."
      },
      {
        "id": "b",
        "text": "Numéricamente idénticos en tamaño (N constante).",
        "feedback": "Una partición puede contener grupos de tamaños diferentes."
      },
      {
        "id": "c",
        "text": "Seleccionados exclusivamente por métodos no probabilísticos.",
        "feedback": "La condición de partición no impone que la selección sea no probabilística."
      },
      {
        "id": "d",
        "text": "Completamente homogéneos tanto interna como externamente.",
        "feedback": "La homogeneidad no sustituye las condiciones de pertenencia única y cobertura de toda la población."
      }
    ],
    "correct": "a",
    "hint": "Ninguna unidad debe quedar fuera ni contarse en dos grupos.",
    "explanation": "Si se usan estratos o conglomerados como partición, los grupos deben ser excluyentes y exhaustivos respecto de la población objetivo: cada unidad pertenece a uno y ninguna queda fuera."
  },
  {
    "id": "q-t09-original-19",
    "topicId": "t09",
    "sourceIndex": 19,
    "prompt": "En el procedimiento estratificado descrito en la lección, ¿cómo se seleccionan las unidades dentro de cada estrato?",
    "options": [
      {
        "id": "a",
        "text": "Seleccionar a los individuos por juicio del investigador.",
        "feedback": "La elección por juicio no es el sorteo dentro de cada estrato que describe esta lección."
      },
      {
        "id": "b",
        "text": "Extraer una muestra aleatoria simple de cada uno de ellos.",
        "feedback": "La lección aplica un muestreo aleatorio simple dentro de cada estrato definido."
      },
      {
        "id": "c",
        "text": "Aplicar el método de bola de nieve en cada estrato.",
        "feedback": "La bola de nieve no es el método descrito para seleccionar dentro de los estratos."
      },
      {
        "id": "d",
        "text": "Encuestar absolutamente a todos los miembros de ese estrato.",
        "feedback": "Observar todos los miembros sería un censo de ese estrato, no la extracción muestral descrita."
      }
    ],
    "correct": "b",
    "hint": "Recuerda cómo se selecciona dentro de cada estrato probabilístico.",
    "explanation": "El último párrafo de muestreo estratificado afirma: «Una vez que se definen los estratos, se procede a extraer una muestra aleatoria simple de cada uno de ellos»."
  },
  {
    "id": "q-t09-original-20",
    "topicId": "t09",
    "sourceIndex": 20,
    "prompt": "Si la selección de una muestra es inadecuada, ¿qué puede ocurrir con las conclusiones del estudio?",
    "options": [
      {
        "id": "a",
        "text": "El tiempo de desplazamiento del encuestador aumentará drásticamente.",
        "feedback": "El tiempo de desplazamiento no se deduce necesariamente de una selección inadecuada."
      },
      {
        "id": "b",
        "text": "Nos obligará a utilizar obligatoriamente métodos por conglomerados.",
        "feedback": "Una mala selección no obliga a cambiar automáticamente al método de conglomerados."
      },
      {
        "id": "c",
        "text": "Puede conducir a resultados erróneos o inexactos.",
        "feedback": "La selección inadecuada puede introducir sesgo y comprometer las conclusiones, aunque haya muchos datos."
      },
      {
        "id": "d",
        "text": "La población total N cambiará automáticamente sus parámetros estadísticos.",
        "feedback": "Seleccionar la muestra no cambia por sí mismo los parámetros de la población."
      }
    ],
    "correct": "c",
    "hint": "Una mala selección puede sesgar el resultado.",
    "explanation": "Una selección inadecuada puede producir sesgo o resultados imprecisos. Aumentar el número de observaciones no repara por sí solo ese problema."
  }
];
