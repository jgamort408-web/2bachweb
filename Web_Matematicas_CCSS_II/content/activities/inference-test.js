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
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Extraer conclusiones acerca de una población a partir de los resultados obtenidos en una muestra.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "c",
        "text": "Garantizar que una muestra seleccionada no tenga ningún tipo de riesgo o error.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "d",
        "text": "Reducir el tamaño de la población estudiada al mínimo posible.",
        "feedback": "Esa opción no describe correctamente la situación."
      }
    ],
    "correct": "b",
    "hint": "Piensa en la dirección de la inferencia: de muestra a población.",
    "explanation": "La definición exacta del bloque 1 indica: «La inferencia estadística se ocupa de extraer conclusiones acerca de una población a partir de los resultados obtenidos en una muestra»."
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
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Debe coincidir exactamente con el 10% de la población total.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "c",
        "text": "Debe ser lo más grande posible independientemente del coste o tiempo.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "d",
        "text": "Una muestra muy grande puede seguir dando resultados sesgados si está mal seleccionada.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
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
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "b",
        "text": "Incluir la opinión de la mayoría para facilitar la respuesta.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "c",
        "text": "Hacerlas sutilmente persuasivas para probar una hipótesis concreta.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "d",
        "text": "Evitar preguntas sobre temas económicos o de impuestos.",
        "feedback": "Esa opción no describe correctamente la situación."
      }
    ],
    "correct": "a",
    "hint": "Una pregunta no debe sugerir la respuesta deseada.",
    "explanation": "El apartado de 'Encuesta' subraya que «hay que escoger adecuadamente las preguntas de las que constará, y formularlas de una manera objetiva e imparcial», dando ejemplos de preguntas sesgadas vs correctas."
  },
  {
    "id": "q-t09-original-04",
    "topicId": "t09",
    "sourceIndex": 4,
    "prompt": "¿Qué característica permite un diseño probabilístico bien documentado?",
    "options": [
      {
        "id": "a",
        "text": "Ofrecen la ventaja de que su coste es inferior a otros métodos.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "La elección de los elementos de la muestra se realiza según el juicio del investigador.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "c",
        "text": "Calcular probabilidades de inclusión y, bajo los supuestos adecuados, estimar incertidumbre por selección.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "d",
        "text": "Reducen el tiempo necesario de investigación en comparación con métodos no probabilísticos.",
        "feedback": "Esa opción no describe correctamente la situación."
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
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Estrictamente igual para todos los estratos.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "c",
        "text": "No queda determinada por el mecanismo de selección; no se conocen probabilidades de inclusión para todas las unidades.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "d",
        "text": "Cálculada mediante un salto sistemático.",
        "feedback": "Esa opción no describe correctamente la situación."
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
    "prompt": "En el muestreo aleatorio simple, ¿cuál es el paso inmediatamente posterior a la enumeración de todos los elementos del marco muestral?",
    "options": [
      {
        "id": "a",
        "text": "Seleccionar, uno a uno, n papeles de la urna.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Introducir en una urna papeles numerados del 1 al N (total de la población).",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "c",
        "text": "Dividir a la población en estratos excluyentes.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "d",
        "text": "Elegir un número al azar para determinar el intervalo o salto.",
        "feedback": "Esa opción no describe correctamente la situación."
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
    "prompt": "En una población de N=1000 personas se desea extraer una muestra sistemática de n=20. Si el primer número al azar escogido es el 8, ¿cuál será el TERCER elemento seleccionado?",
    "options": [
      {
        "id": "a",
        "text": "58",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "158",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "c",
        "text": "108",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "d",
        "text": "28",
        "feedback": "Esa opción no describe correctamente la situación."
      }
    ],
    "correct": "c",
    "hint": "Calcula el salto y cuenta el inicio como primer elemento.",
    "explanation": "El intervalo es 1000/20 = 50. El primero es 8. El segundo es 8+50 = 58. El tercero es 58+50 = 108."
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
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Que las unidades de cada estrato sean relativamente homogéneas respecto de esa variable, con diferencias entre estratos.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "c",
        "text": "Son completamente al azar y no guardan relación de homogeneidad ni heterogeneidad.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "d",
        "text": "Los integrantes son heterogéneos y los estratos también son heterogéneos entre sí.",
        "feedback": "Esa opción no describe correctamente la situación."
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
        "text": "Homogéneos internamente y heterogéneos entre sí.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Grupos naturales de unidades, como centros o zonas, mediante el mecanismo aleatorio del diseño.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "c",
        "text": "Incompatibles con la realización de encuestas poblacionales.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "d",
        "text": "Subgrupos donde un elemento puede pertenecer a varios conglomerados a la vez.",
        "feedback": "Esa opción no describe correctamente la situación."
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
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Permite que un elemento pertenezca a varios subgrupos.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "c",
        "text": "Disminuye el error muestral a cero.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "d",
        "text": "Puede reducir desplazamientos al concentrar el trabajo de campo en grupos seleccionados.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
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
    "prompt": "Una empresa entrevista exclusivamente a las personas que salen de un centro comercial específico para evaluar la experiencia en ese mismo centro. ¿Qué tipo de muestreo está usando?",
    "options": [
      {
        "id": "a",
        "text": "Muestreo estratificado.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Muestreo de bola de nieve.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "c",
        "text": "Muestreo por conveniencia.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "d",
        "text": "Muestreo aleatorio simple.",
        "feedback": "Esa opción no describe correctamente la situación."
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
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "En confiar en la experiencia y criterio del encuestador para seleccionar los elementos de la muestra.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "c",
        "text": "En someter a juicio legal la validez de la encuesta antes de lanzarla.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "d",
        "text": "En contactar primero a una persona que cumpla el perfil y pedirle referencias de otras iguales.",
        "feedback": "Esa opción no describe correctamente la situación."
      }
    ],
    "correct": "b",
    "hint": "¿Quién decide qué casos cumplen el perfil?",
    "explanation": "Se define como: «En este caso, se confía en la experiencia del encuestador para seleccionar los elementos de la muestra» determinando él qué casos cumplen los requisitos."
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
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Muestreo aleatorio simple.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "c",
        "text": "Muestreo estratificado.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "d",
        "text": "Muestreo por conglomerados.",
        "feedback": "Esa opción no describe correctamente la situación."
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
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Entrevista a toda la población hasta separar las cuotas a posteriori.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "c",
        "text": "Selecciona —haciendo a veces un muestreo por juicio— cada uno de los elementos hasta completar las cuotas.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "d",
        "text": "Solo selecciona individuos mediante el método de bola de nieve.",
        "feedback": "Esa opción no describe correctamente la situación."
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
    "prompt": "¿Cuándo se recomienda especialmente el 'Muestreo de bola de nieve' (o por referidos)?",
    "options": [
      {
        "id": "a",
        "text": "Cuando se dispone del listado completo del marco muestral de la ciudad.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Cuando la población de interés es muy pequeña y/o resulta difícil contactar con ella.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "c",
        "text": "Cuando se busca la máxima representatividad matemática y el menor margen de error.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "d",
        "text": "Cuando se necesita reducir los tiempos de desplazamiento encuestando manzanas de edificios completas.",
        "feedback": "Esa opción no describe correctamente la situación."
      }
    ],
    "correct": "b",
    "hint": "Una persona contactada recomienda a otra.",
    "explanation": "El texto especifica que el muestreo de bola de nieve «se utiliza cuando la población de interés es muy pequeña y/o resulta difícil contactar con ella»."
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
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Porque en las ciencias sociales las matemáticas puras no aplican.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "c",
        "text": "Porque a veces no hay un marco de muestreo adecuado o el acceso al grupo hace inviable un sorteo práctico.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "d",
        "text": "Porque los métodos no probabilísticos estiman mejor el error muestral en poblaciones pequeñas.",
        "feedback": "Esa opción no describe correctamente la situación."
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
    "prompt": "¿Cómo definen los apuntes el concepto de 'Población'?",
    "options": [
      {
        "id": "a",
        "text": "El número total de elementos que han sido extraídos para realizar una encuesta.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "El proceso riguroso que se sigue para la extracción de individuos.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "c",
        "text": "La parte de los ciudadanos totales sobre los que se ha logrado medir una característica real.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "d",
        "text": "El conjunto total de individuos susceptibles de poseer la información buscada.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
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
    "prompt": "Tanto en los estratos como en los conglomerados, el texto especifica que al formar los subgrupos en la población, estos deben ser...",
    "options": [
      {
        "id": "a",
        "text": "Excluyentes y exhaustivos.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "b",
        "text": "Numéricamente idénticos en tamaño (N constante).",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "c",
        "text": "Seleccionados exclusivamente por métodos no probabilísticos.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "d",
        "text": "Completamente homogéneos tanto interna como externamente.",
        "feedback": "Esa opción no describe correctamente la situación."
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
    "prompt": "Una vez que se han definido correctamente los estratos en una población, ¿cuál es el método estándar indicado para extraer los individuos concretos dentro de cada estrato?",
    "options": [
      {
        "id": "a",
        "text": "Seleccionar a los individuos por juicio del investigador.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Extraer una muestra aleatoria simple de cada uno de ellos.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "c",
        "text": "Aplicar el método de bola de nieve en cada estrato.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "d",
        "text": "Encuestar absolutamente a todos los miembros de ese estrato.",
        "feedback": "Esa opción no describe correctamente la situación."
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
    "prompt": "Según el texto introductorio, si extraemos una mala elección de muestra (Apunte 2), ¿qué consecuencia directa tiene sobre el estudio?",
    "options": [
      {
        "id": "a",
        "text": "El tiempo de desplazamiento del encuestador aumentará drásticamente.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "b",
        "text": "Nos obligará a utilizar obligatoriamente métodos por conglomerados.",
        "feedback": "Esa opción no describe correctamente la situación."
      },
      {
        "id": "c",
        "text": "Puede conducir a resultados erróneos o inexactos.",
        "feedback": "Esa es la opción prevista en el diseño revisado."
      },
      {
        "id": "d",
        "text": "La población total N cambiará automáticamente sus parámetros estadísticos.",
        "feedback": "Esa opción no describe correctamente la situación."
      }
    ],
    "correct": "c",
    "hint": "Una mala selección puede sesgar el resultado.",
    "explanation": "Una selección inadecuada puede producir sesgo o resultados imprecisos. Aumentar el número de observaciones no repara por sí solo ese problema."
  }
];
