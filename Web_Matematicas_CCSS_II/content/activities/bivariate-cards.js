// Fuente: Página web existente/2. Estadística Bidimensional/7. Flashcards.txt.
// Correspondencia y correcciones: docs/auditoria-reutilizacion-estadistica-bidimensional.md.
export const bivariateCards = [
  {
    "id": "fc-bivariate-original-01",
    "topicId": "bivariate",
    "category": "Conceptos",
    "sourceIndex": 1,
    "front": "¿Qué es una variable bidimensional?",
    "back": "El estudio de dos características \\(X,Y\\) en cada individuo. Cada observación es un par \\((x_i,y_i)\\), cuyas dos medidas corresponden al mismo individuo."
  },
  {
    "id": "fc-bivariate-original-02",
    "topicId": "bivariate",
    "category": "Conceptos",
    "sourceIndex": 2,
    "front": "¿Qué es la nube de puntos?",
    "back": "Es la representación gráfica de los pares \\((x_i,y_i)\\). Ayuda a explorar patrones lineales, curvos o sin tendencia clara; su aspecto no demuestra por sí solo independencia ni causalidad."
  },
  {
    "id": "fc-bivariate-original-03",
    "topicId": "bivariate",
    "category": "Conceptos",
    "sourceIndex": 3,
    "front": "¿Qué son las distribuciones marginales?",
    "back": "Son las distribuciones de \\(X\\) y de \\(Y\\) por separado. En una tabla de doble entrada se obtienen sumando las frecuencias por filas y por columnas, respectivamente, si X ocupa las filas."
  },
  {
    "id": "fc-bivariate-original-04",
    "topicId": "bivariate",
    "category": "Conceptos",
    "sourceIndex": 4,
    "front": "¿Qué es el centro de gravedad?",
    "back": "Es el punto de medias \\((\\bar{x},\\bar{y})\\). Las rectas de regresión lineal por mínimos cuadrados con término independiente pasan por él, cuando están definidas."
  },
  {
    "id": "fc-bivariate-original-05",
    "topicId": "bivariate",
    "category": "Covarianza",
    "sourceIndex": 5,
    "front": "¿Qué mide la covarianza \\(S_{xy}\\)?",
    "back": "Resume la variación conjunta respecto a las medias. Su signo indica el sentido de la asociación lineal. Depende de las unidades y su magnitud no mide por sí sola la intensidad de la relación."
  },
  {
    "id": "fc-bivariate-original-06",
    "topicId": "bivariate",
    "category": "Covarianza",
    "sourceIndex": 6,
    "front": "¿Cuál es la fórmula de la covarianza?",
    "back": "Para \\(N>0\\) pares observados, usando el divisor descriptivo N: \\[S_{xy}=\\frac{1}{N}\\sum_{i=1}^{N}x_i y_i-\\bar{x}\\bar{y}.\\] Es la media de los productos menos el producto de las medias. Si se usa una tabla de frecuencias, hay que ponderar cada producto por su frecuencia."
  },
  {
    "id": "fc-bivariate-original-07",
    "topicId": "bivariate",
    "category": "Covarianza",
    "sourceIndex": 7,
    "front": "Si \\(S_{xy}>0\\)…",
    "back": "La asociación lineal observada tiene sentido positivo: valores mayores de X tienden a acompañarse de valores mayores de Y. Es una tendencia conjunta, no una regla para cada par ni una relación causal."
  },
  {
    "id": "fc-bivariate-original-08",
    "topicId": "bivariate",
    "category": "Covarianza",
    "sourceIndex": 8,
    "front": "Si \\(S_{xy}<0\\)…",
    "back": "La asociación lineal observada tiene sentido negativo: valores mayores de X tienden a acompañarse de valores menores de Y. No es una regla para cada par ni una relación causal."
  },
  {
    "id": "fc-bivariate-original-09",
    "topicId": "bivariate",
    "category": "Covarianza",
    "sourceIndex": 9,
    "front": "Si \\(S_{xy}\\approx0\\), ¿qué podemos concluir?",
    "back": "Una covarianza pequeña depende de las unidades: no basta para afirmar incorrelación. Si es exactamente cero y ambas desviaciones típicas son positivas, entonces \\(r=0\\): no hay asociación lineal, pero puede haber relación no lineal. No demuestra independencia."
  },
  {
    "id": "fc-bivariate-original-10",
    "topicId": "bivariate",
    "category": "Correlación",
    "sourceIndex": 10,
    "front": "¿Qué es el coeficiente de Pearson \\(r\\)?",
    "back": "Es la covarianza estandarizada. Su signo indica el sentido y \\(|r|\\) la intensidad de la asociación lineal. No tiene unidades y requiere que ambas desviaciones típicas sean positivas."
  },
  {
    "id": "fc-bivariate-original-11",
    "topicId": "bivariate",
    "category": "Correlación",
    "sourceIndex": 11,
    "front": "¿Cuál es la fórmula de Pearson \\(r\\)?",
    "back": "\\[r=\\frac{S_{xy}}{S_xS_y}.\\] Se requiere \\(S_x>0\\) y \\(S_y>0\\), y una convención coherente para covarianza y desviaciones. Si alguna variable es constante, esta fórmula no define r."
  },
  {
    "id": "fc-bivariate-original-12",
    "topicId": "bivariate",
    "category": "Correlación",
    "sourceIndex": 12,
    "front": "¿Qué valores puede tomar \\(r\\)?",
    "back": "Cuando está definido, \\(-1\\le r\\le1\\). Los extremos corresponden a una relación lineal exacta con ambas variables no constantes: negativa para −1 y positiva para +1."
  },
  {
    "id": "fc-bivariate-original-13",
    "topicId": "bivariate",
    "category": "Correlación",
    "sourceIndex": 13,
    "front": "¿Cómo se interpreta \\(|r|\\approx1\\)?",
    "back": "Como asociación lineal intensa: los puntos se aproximan a una recta. Conviene inspeccionar la nube y posibles valores atípicos; un coeficiente alto no garantiza la precisión de cada predicción."
  },
  {
    "id": "fc-bivariate-original-14",
    "topicId": "bivariate",
    "category": "Correlación",
    "sourceIndex": 14,
    "front": "¿Correlación implica causalidad?",
    "back": "No. Un valor de \\(|r|\\) alto no demuestra que X cause Y. La asociación puede estar relacionada con otras variables, con la selección de los datos o con el azar. Para establecer causalidad hace falta evidencia adicional."
  },
  {
    "id": "fc-bivariate-original-15",
    "topicId": "bivariate",
    "category": "Regresión",
    "sourceIndex": 15,
    "front": "¿Qué es la recta de regresión?",
    "back": "La recta de Y sobre X por mínimos cuadrados con término independiente minimiza la suma de los cuadrados de los residuos verticales. Requiere \\(S_x^2>0\\). Permite estimar Y a partir de X; una estimación no es un resultado garantizado."
  },
  {
    "id": "fc-bivariate-original-16",
    "topicId": "bivariate",
    "category": "Regresión",
    "sourceIndex": 16,
    "front": "¿Cuál es la recta de regresión de \\(Y\\) sobre \\(X\\)?",
    "back": "\\[\\widehat{y}-\\bar{y}=\\frac{S_{xy}}{S_x^2}(x-\\bar{x}).\\] Requiere \\(S_x^2>0\\). La pendiente es covarianza dividida por varianza de X; \\(\\widehat{y}\\) representa una estimación."
  },
  {
    "id": "fc-bivariate-original-17",
    "topicId": "bivariate",
    "category": "Regresión",
    "sourceIndex": 17,
    "front": "¿Qué son los residuos?",
    "back": "Son las diferencias con signo entre el valor observado y el estimado: \\(e_i=y_i-\\widehat{y}_i\\). Su valor absoluto es la distancia vertical a la recta. Mínimos cuadrados minimiza \\(\\sum_i e_i^2\\), la suma de sus cuadrados."
  },
  {
    "id": "fc-bivariate-original-18",
    "topicId": "bivariate",
    "category": "Regresión",
    "sourceIndex": 18,
    "front": "¿Qué mide el coeficiente de determinación \\(R^2\\)?",
    "back": "En regresión lineal simple por mínimos cuadrados con término independiente y ambas variables no constantes, \\(R^2=r^2\\). Es la proporción de variación observada de Y recogida por el ajuste; \\(100R^2\\) es su porcentaje. No mide la probabilidad de acertar una predicción ni demuestra causalidad."
  },
  {
    "id": "fc-bivariate-original-19",
    "topicId": "bivariate",
    "category": "Regresión",
    "sourceIndex": 19,
    "front": "Si \\(r=0{,}9\\), ¿es fiable la predicción?",
    "back": "En regresión lineal simple por mínimos cuadrados con término independiente: \\(R^2=0{,}9^2=0{,}81\\). El ajuste recoge el 81 % de la variación observada de Y. No significa un 81 % de certeza de una predicción. Hay que valorar los errores, el contexto y el rango observado de X."
  },
  {
    "id": "fc-bivariate-original-20",
    "topicId": "bivariate",
    "category": "Regresión",
    "sourceIndex": 20,
    "front": "¿Qué da el producto de los coeficientes de regresión?",
    "back": "Con varianzas positivas, los coeficientes de las rectas de mínimos cuadrados con término independiente cumplen \\(b_{yx}b_{xy}=r^2\\), donde \\(b_{yx}=S_{xy}/S_x^2\\) y \\(b_{xy}=S_{xy}/S_y^2\\). Se lee Y en función de X y X en función de Y, respectivamente; no se multiplican dos pendientes despejadas ambas como Y en función de X."
  }
];
