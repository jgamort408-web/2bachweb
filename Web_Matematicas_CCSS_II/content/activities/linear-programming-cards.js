// Reutilización uno a uno de «Página web existente/1. Programación Lineal/6. Flashcards.txt».
// Correcciones y correspondencia en docs/auditoria-reutilizacion-programacion-lineal.md.
export const linearProgrammingCards = [
  {
    "id": "fc-pl-original-01",
    "topicId": "t06",
    "category": "Definiciones",
    "sourceIndex": 1,
    "front": "¿Qué es la función objetivo?",
    "back": "Es la función lineal \\(Z(x,y)=ax+by\\) que queremos maximizar (por ejemplo, beneficios) o minimizar (por ejemplo, costes), entre las decisiones factibles."
  },
  {
    "id": "fc-pl-original-02",
    "topicId": "t06",
    "category": "Definiciones",
    "sourceIndex": 2,
    "front": "¿Qué son las restricciones?",
    "back": "Son las condiciones lineales, expresadas mediante inecuaciones o igualdades, que limitan los valores admisibles de \\(x\\) e \\(y\\). Deben cumplirse simultáneamente."
  },
  {
    "id": "fc-pl-original-03",
    "topicId": "t06",
    "category": "Definiciones",
    "sourceIndex": 3,
    "front": "¿Cuándo se imponen restricciones de no negatividad?",
    "back": "Cuando las variables representan cantidades que no pueden ser negativas, como unidades producidas: \\(x\\ge0,\\ y\\ge0\\). Se justifican por el significado de las variables; no son una obligación universal."
  },
  {
    "id": "fc-pl-original-04",
    "topicId": "t06",
    "category": "Planteamiento",
    "sourceIndex": 4,
    "front": "Traduce: «Como mínimo 100 unidades en total», si x e y son unidades de dos productos.",
    "back": "\\(x+y\\ge100\\). «Como mínimo» incluye alcanzar exactamente 100."
  },
  {
    "id": "fc-pl-original-05",
    "topicId": "t06",
    "category": "Planteamiento",
    "sourceIndex": 5,
    "front": "Traduce: «Como máximo 500 euros en total», si x e y son dos importes en euros.",
    "back": "\\(x+y\\le500\\). Solo se suman así si ambas variables son importes en euros; si cuentan productos, hacen falta sus costes unitarios."
  },
  {
    "id": "fc-pl-original-06",
    "topicId": "t06",
    "category": "Planteamiento",
    "sourceIndex": 6,
    "front": "Traduce: «El doble de A que de B», con x cantidad de A e y cantidad de B.",
    "back": "\\(x=2y\\). Si hay 10 de B, hay exactamente 20 de A. La desigualdad \\(x\\ge2y\\) correspondería a «al menos el doble», no a «el doble»."
  },
  {
    "id": "fc-pl-original-07",
    "topicId": "t06",
    "category": "Planteamiento",
    "sourceIndex": 7,
    "front": "Traduce: «A no supera a B en más de 20», con x cantidad de A e y cantidad de B.",
    "back": "\\(x-y\\le20\\), o \\(x\\le y+20\\). La diferencia no supera 20; esto no exige que A sea mayor que B."
  },
  {
    "id": "fc-pl-original-08",
    "topicId": "t06",
    "category": "Planteamiento",
    "sourceIndex": 8,
    "front": "Traduce: «La mitad de A es al menos B», con x cantidad de A e y cantidad de B.",
    "back": "\\(\\frac{x}{2}\\ge y\\), equivalente a \\(x\\ge2y\\)."
  },
  {
    "id": "fc-pl-original-09",
    "topicId": "t06",
    "category": "Región Factible",
    "sourceIndex": 9,
    "front": "¿Qué es la región factible?",
    "back": "Es la intersección de todas las restricciones: el conjunto de decisiones que las cumplen simultáneamente. Puede ser vacía, acotada o no acotada; también puede reducirse a un segmento o a un punto. No siempre es un polígono acotado."
  },
  {
    "id": "fc-pl-original-10",
    "topicId": "t06",
    "category": "Región Factible",
    "sourceIndex": 10,
    "front": "¿Cómo se dibuja la recta frontera de una inecuación lineal?",
    "back": "Para \\(ax+by=c\\), con \\((a,b)\\ne(0,0)\\), calcula dos puntos distintos que la satisfagan. Puedes usar los cortes con los ejes si existen y son distintos. Si \\(b\\ne0\\), puedes despejar \\(y\\); si \\(b=0\\), la recta es vertical, \\(x=c/a\\)."
  },
  {
    "id": "fc-pl-original-11",
    "topicId": "t06",
    "category": "Región Factible",
    "sourceIndex": 11,
    "front": "¿Hacia dónde sombreo una inecuación?",
    "back": "Prueba un punto que no esté en la recta frontera. Puedes usar \\((0,0)\\) solo si queda fuera de ella. Si cumple, elige su semiplano; si no, el opuesto. Incluye la frontera para \\(\\le,\\ge\\) y exclúyela para \\(<,>\\)."
  },
  {
    "id": "fc-pl-original-12",
    "topicId": "t06",
    "category": "Región Factible",
    "sourceIndex": 12,
    "front": "¿Cómo hallo los vértices?",
    "back": "En el modelo continuo, resuelve los sistemas \\(2\\times2\\) de pares de rectas frontera no paralelas y comprueba cada cruce en todas las restricciones. Sólo los puntos factibles extremos son vértices. Si la región es un segmento, sus extremos son vértices; si es un único punto, ese punto también lo es."
  },
  {
    "id": "fc-pl-original-13",
    "topicId": "t06",
    "category": "Teoremas y Métodos",
    "sourceIndex": 13,
    "front": "Teorema fundamental de la programación lineal",
    "back": "En programación lineal continua, un óptimo único es un vértice de la región factible. En una región poligonal no vacía, cerrada y acotada, una función lineal alcanza máximo y mínimo en algún vértice; puede haber otros puntos óptimos. La garantía incluye segmentos y regiones reducidas a un punto."
  },
  {
    "id": "fc-pl-original-14",
    "topicId": "t06",
    "category": "Teoremas y Métodos",
    "sourceIndex": 14,
    "front": "Método analítico: evaluación de vértices",
    "back": "En una región poligonal continua, no vacía, cerrada y acotada, calcula sus vértices factibles y compara \\(Z=ax+by\\). Incluye los extremos si es un segmento o el punto único. Fuera de esas condiciones revisa existencia y acotación del objetivo. Si no hay vértices, su enumeración no permite decidir si hay óptimo."
  },
  {
    "id": "fc-pl-original-15",
    "topicId": "t06",
    "category": "Teoremas y Métodos",
    "sourceIndex": 15,
    "front": "Método gráfico: líneas de nivel",
    "back": "Si \\((a,b)\\ne(0,0)\\), las rectas \\(ax+by=k\\) son paralelas. En el modelo continuo se desplazan aumentando k para maximizar o disminuyéndolo para minimizar. El óptimo exige alcanzar una posición que toque la región. Una cota finita puede no alcanzarse si hay fronteras excluidas."
  },
  {
    "id": "fc-pl-original-16",
    "topicId": "t06",
    "category": "Casos Especiales",
    "sourceIndex": 16,
    "front": "¿Qué ocurre si la región no está acotada?",
    "back": "Se extiende indefinidamente en alguna dirección; «no acotada» no significa «abierta». Que exista máximo o mínimo depende de la función objetivo y de la región. No basta observar que la región es no acotada para decidirlo."
  },
  {
    "id": "fc-pl-original-17",
    "topicId": "t06",
    "category": "Casos Especiales",
    "sourceIndex": 17,
    "front": "¿Cuándo hay infinitas soluciones óptimas?",
    "back": "En el modelo continuo con región convexa, dos puntos factibles distintos que alcanzan el mismo óptimo hacen óptimo todo su segmento. Un lado paralelo a las líneas de nivel debe alcanzar el valor extremo; el paralelismo por sí solo no basta. Si el objetivo es constante, todo punto factible es óptimo, pero una región de un solo punto no da infinitas soluciones."
  },
  {
    "id": "fc-pl-original-18",
    "topicId": "t06",
    "category": "Casos Especiales",
    "sourceIndex": 18,
    "front": "¿Qué significa que el problema sea infactible?",
    "back": "Las restricciones no tienen ningún punto común. Por ejemplo, \\(x\\le5\\) y \\(x\\ge10\\) son incompatibles. La región factible es vacía y no existe solución óptima."
  },
  {
    "id": "fc-pl-original-19",
    "topicId": "t06",
    "category": "Casos Especiales",
    "sourceIndex": 19,
    "front": "¿Qué cambia si la solución debe ser entera?",
    "back": "Las cantidades de objetos indivisibles deben ser enteras. Si un óptimo continuo satisface la integridad, también resuelve el problema entero. Puede haber soluciones reales y ninguna entera admisible. Redondear o mirar sólo puntos cercanos no garantiza el óptimo: hay que justificar los candidatos enteros mediante una búsqueda completa o un método de programación entera."
  }
];
