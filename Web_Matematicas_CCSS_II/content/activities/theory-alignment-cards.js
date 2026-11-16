// Ampliación editorial TEO-26C. Definiciones contrastadas con las lecciones enlazadas.
// Las tarjetas originales se conservan; estos identificadores son estables.
export const theoryAlignmentCards = [
  {
    "id": "fc-teoria-densidad",
    "topicId": "t08",
    "sourceLessonId": "t08-e01",
    "category": "Conceptos de la teoría",
    "front": "¿Qué es una densidad de probabilidad?",
    "back": "Es una función no negativa con área total uno. Para \\(a\\le b\\), en una variable con densidad, \\(P(a\\le X\\le b)=\\int_a^b f(x)\\,dx\\). La altura f(x) no es la probabilidad de un punto: \\(P(X=x)=0\\)."
  },
  {
    "id": "fc-teoria-acumulada",
    "topicId": "t08",
    "sourceLessonId": "t08-e01",
    "category": "Conceptos de la teoría",
    "front": "¿Qué expresa la función de distribución acumulada?",
    "back": "\\(F(x)=P(X\\le x)\\): la probabilidad acumulada hasta x incluido. En una discreta se suman las masas hasta x; si existe densidad, se integra desde menos infinito hasta x."
  },
  {
    "id": "fc-teoria-cuantil",
    "topicId": "t08",
    "sourceLessonId": "t08-e03",
    "category": "Conceptos de la teoría",
    "front": "¿Qué es el cuantil normal de orden r?",
    "back": "Para \\(0<r<1\\), es el valor x que deja probabilidad r a su izquierda. Si \\(X\\sim N(\\mu,\\sigma)\\), con \\(\\sigma>0\\), entonces \\(x=\\mu+\\sigma z_r\\), donde \\(\\Phi(z_r)=r\\). Una cola superior requiere usar el complemento."
  },
  {
    "id": "fc-teoria-estimador",
    "topicId": "t09",
    "sourceLessonId": "t09-e05",
    "category": "Conceptos de la teoría",
    "front": "¿Qué es un estimador?",
    "back": "Es un estadístico utilizado para estimar un parámetro poblacional. Es una función de los datos muestrales que no depende de parámetros desconocidos; antes de observar la muestra es aleatorio. No es el valor concreto ya calculado."
  },
  {
    "id": "fc-teoria-estimacion",
    "topicId": "t09",
    "sourceLessonId": "t09-e05",
    "category": "Conceptos de la teoría",
    "front": "¿Qué es una estimación?",
    "back": "Es el valor concreto que toma un estimador al aplicar su regla a los datos observados. Dos muestras pueden producir estimaciones diferentes del mismo parámetro."
  },
  {
    "id": "fc-teoria-insesgado",
    "topicId": "t09",
    "sourceLessonId": "t09-e05",
    "category": "Conceptos de la teoría",
    "front": "¿Cuándo es insesgado un estimador?",
    "back": "Cuando su esperanza coincide con el parámetro que estima, bajo el modelo de muestreo. No significa que cada estimación sea exacta; se refiere al promedio teórico entre muestras."
  },
  {
    "id": "fc-teoria-wald",
    "topicId": "t09",
    "sourceLessonId": "t09-e07",
    "category": "Conceptos de la teoría",
    "front": "¿Qué es el intervalo de Wald para una proporción?",
    "back": "Es el intervalo normal aproximado \\(\\widehat p\\pm z_{\\alpha/2}\\sqrt{\\widehat p(1-\\widehat p)/n}\\). Requiere un diseño y un modelo adecuados y suficientes éxitos y fracasos; los recuentos de al menos diez son una orientación, no garantía de cobertura. Puede funcionar mal cerca de 0 o 1."
  },
  {
    "id": "fc-teoria-se-proporcion",
    "topicId": "t09",
    "sourceLessonId": "t09-e07",
    "category": "Conceptos de la teoría",
    "front": "¿Qué mide el error estándar estimado de una proporción?",
    "back": "\\(\\sqrt{\\widehat p(1-\\widehat p)/n}\\) estima la desviación de la proporción muestral bajo observaciones independientes con probabilidad común. Sustituye la proporción poblacional desconocida por la observada; no es el margen de confianza, que incorpora un valor crítico."
  },
  {
    "id": "fc-teoria-caracteristico",
    "topicId": "t09",
    "sourceLessonId": "t09-e06",
    "category": "Conceptos de la teoría",
    "front": "¿Qué es un intervalo característico?",
    "back": "Es un intervalo de valores de una variable aleatoria con una probabilidad fijada bajo una distribución conocida. No es un intervalo de confianza para un parámetro desconocido. El intervalo de una observación y el de una media muestral tienen distinta dispersión."
  },
  {
    "id": "fc-teoria-ficha-encuesta",
    "topicId": "t09",
    "sourceLessonId": "t09-e09",
    "category": "Conceptos de la teoría",
    "front": "¿Qué documenta la ficha técnica de una encuesta?",
    "back": "Describe la población, el marco, el método de selección, las fechas, la pregunta y las respuestas válidas, y explica los cálculos y sus supuestos. Un margen muestral no resume errores de cobertura, falta de respuesta ni sesgos de medición."
  },
  {
    "id": "fc-teoria-media-marginal",
    "topicId": "bivariate",
    "sourceLessonId": "bivariate",
    "category": "Conceptos de la teoría",
    "front": "¿Cómo se obtiene una media marginal?",
    "back": "Es la media de una de las variables por separado, ponderada por sus frecuencias marginales. Para X, \\(\\bar x=\\sum_i x_i n_{i\\cdot}/N\\), con N positivo. No se promedian etiquetas cualitativas sin un significado numérico."
  },
  {
    "id": "fc-teoria-varianza-marginal",
    "topicId": "bivariate",
    "sourceLessonId": "bivariate",
    "category": "Conceptos de la teoría",
    "front": "¿Qué mide la varianza marginal descriptiva?",
    "back": "Para \\(N>0\\), es la media ponderada de las desviaciones cuadráticas de una variable respecto de su media marginal. Se divide por \\(N\\), no por \\(N-1\\). Sus unidades están al cuadrado; su raíz no negativa es la desviación típica marginal."
  },
  {
    "id": "fc-teoria-regresion-x",
    "topicId": "bivariate",
    "sourceLessonId": "bivariate",
    "category": "Conceptos de la teoría",
    "front": "¿Qué ajusta la regresión de X sobre Y?",
    "back": "Estima X a partir de Y mediante mínimos cuadrados con término independiente: \\(\\widehat x-\\bar x=(S_{xy}/S_y^2)(y-\\bar y)\\), con \\(S_y^2>0\\). Minimiza los residuos cuadrados en X. En general no se obtiene despejando la recta de Y sobre X."
  },
  {
    "id": "fc-teoria-multiplicativo",
    "topicId": "combinatorics",
    "sourceLessonId": "combinatorics",
    "category": "Conceptos de la teoría",
    "front": "¿Cuándo se aplica el principio multiplicativo?",
    "back": "Si cada elección de una etapa tiene el número de continuaciones indicado en la siguiente, el total es el producto de esos números. Si las ramas tienen distintas continuaciones, se cuentan por separado y se suman casos disjuntos. Esta regla de recuento no exige independencia probabilística."
  },
  {
    "id": "fc-teoria-combinacion-repeticion",
    "topicId": "combinatorics",
    "sourceLessonId": "combinatorics",
    "category": "Ampliación opcional",
    "front": "¿Qué cuentan las combinaciones con repetición?",
    "back": "Ampliación opcional: elecciones de r unidades entre n tipos, sin orden, con repetición y disponibilidad suficiente. Para enteros \\(n\\ge1\\), \\(r\\ge0\\), \\(CR(n,r)=\\binom{n+r-1}{r}\\). Los límites por tipo requieren otro recuento. Contar estas elecciones no garantiza que sean equiprobables."
  }
];
