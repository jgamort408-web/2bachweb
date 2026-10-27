const tex = String.raw;
const make = (id, prompt, choices, explanation, hint, source = 'Elaboración propia sobre el guion 2.2') => ({
  id: 'poly-' + id, lessonId: 't02-e02', topicId: 't02', prompt, correct: 'right',
  options: choices.map(([text, feedback], i) => ({ id: i ? 'wrong-' + i : 'right', text, feedback })), explanation, hint, source,
});
export const polynomialQuestions = [
  make('01', tex`¿Qué grado y coeficiente principal tiene \(P(x)=4-2x^5+3x^2\)?`, [
    ['Grado 5 y coeficiente principal −2.', 'Ordena mentalmente por potencias de x.'], ['Grado 2 y coeficiente principal 3.', 'El término escrito al final no tiene por qué ser el de mayor grado.'],
    ['Grado 5 y coeficiente principal 4.', '4 es el término independiente.'], ['Grado −2 y coeficiente principal 5.', 'El grado es el exponente, no el coeficiente.']],
    tex`La potencia mayor es \(x^5\); su coeficiente es −2. El término independiente es 4.`, 'Identifica la potencia mayor con coeficiente no nulo.'),
  make('02', tex`¿Cuáles son, en ese orden, los límites de \(-2x^4+5x-1\) cuando \(x\to-\infty\) y cuando \(x\to+\infty\)?`, [
    [tex`\((-\infty,-\infty)\)`, 'La potencia es par y el coeficiente principal es negativo.'], [tex`\((+\infty,+\infty)\)`, 'Falta tener en cuenta el signo −2.'],
    [tex`\((+\infty,-\infty)\)`, 'Este patrón corresponde a grado impar con coeficiente negativo.'], [tex`\((-\infty,+\infty)\)`, 'Este patrón corresponde a grado impar con coeficiente positivo.']],
    tex`En ambos extremos, \(x^4\to+\infty\) y \(-2x^4\to-\infty\). Los términos de menor grado no cambian ese comportamiento.`, 'Separa paridad del grado y signo del coeficiente.'),
  make('03', tex`En \(p(x)=(x+1)^2(x-2)\), ¿qué ocurre en \(x=-1\)?`, [
    ['Toca el eje X y permanece por debajo a ambos lados cercanos.', 'La raíz es doble y el factor x−2 es negativo cerca de −1.'], ['Cruza de negativo a positivo.', 'La multiplicidad par no cambia el signo.'],
    ['Tiene una asíntota vertical.', 'Todo polinomio es continuo en −1.'], ['No pertenece al dominio.', 'El dominio de este polinomio es todo R.']],
    tex`Cerca de −1, \((x+1)^2>0\) salvo en la raíz, y \(x-2<0\). Por tanto \(p<0\) en ambos lados y \(p(-1)=0\).`, 'Estudia los signos de los dos factores cerca de la raíz.'),
  make('04', tex`¿Cuáles son los extremos relativos de \(p(x)=x^3-3x-2\)?`, [
    ['Máximo en (−1,0) y mínimo en (1,−4).', 'La derivada cambia de + a − y después de − a +.'], ['Máximo en (1,−4) y mínimo en (−1,0).', 'Se han intercambiado las clasificaciones.'],
    ['Máximos en (−1,0) y (2,0).', 'Los ceros de p no son necesariamente ceros de su derivada.'], ['Solo un mínimo en (0,−2).', 'En 0 la derivada vale −3, no cero.']],
    tex`\(p\prime(x)=3(x-1)(x+1)\) tiene signos +, −, +. Sustituir en p da \(p(-1)=0\) y \(p(1)=-4\).`, 'Obtén primero las abscisas con la derivada y luego las ordenadas con p.'),
  make('05', tex`El beneficio \(B(q)=-2q^2+24q-40\), en cientos de euros, se modela para \(0\leq q\leq10\) toneladas. ¿Cuál es el máximo?`, [
    ['3200 euros al producir 6 toneladas.', 'B(6)=32 cientos de euros.'], ['32 euros al producir 6 toneladas.', 'Falta convertir los cientos de euros.'],
    ['Cero euros al producir 10 toneladas.', 'En 10 hay equilibrio, pero en 6 el beneficio es mayor.'], ['600 euros al producir 32 toneladas.', 'Intercambia variables y además sale del dominio.']],
    tex`\(B\prime(q)=-4q+24=0\) en q=6. Comparamos \(B(0)=-40\), \(B(6)=32\) y \(B(10)=0\). El mayor es 32, equivalente a 3200 euros.`,
    'Revisa el punto crítico, los dos extremos del intervalo y las unidades.', 'Elaboración propia; criterio de comparación de T2.6 y contexto de T2.9'),
  make('06', '¿Qué afirmación sobre las raíces reales de un polinomio no nulo de grado 4 es correcta?', [
    ['Puede no tener ninguna y no puede tener más de cuatro raíces reales distintas.', 'El grado es una cota, no una promesa de cuatro cortes.'], ['Siempre tiene cuatro raíces reales distintas.', 'x⁴+1 no tiene raíces reales.'],
    ['Tiene necesariamente una raíz real por ser de grado par.', 'La garantía de al menos una raíz real corresponde al grado impar.'], ['Cada raíz es un extremo relativo.', 'Una raíz simple puede atravesar el eje sin ser un extremo.']],
    tex`\(x^4+1>0\) para todo real: no tiene ceros reales. Un polinomio de grado 4 tiene como máximo cuatro raíces reales distintas.`, 'Distingue número máximo de raíces y número real de raíces.'),
];
export const polynomialCards = [
  { id: 'fc-poly-01', front: '¿Qué determina el grado de un polinomio?', back: 'El mayor exponente con coeficiente no nulo, después de simplificar. Una constante no nula tiene grado 0; en este curso no se asigna grado al polinomio nulo.' },
  { id: 'fc-poly-02', front: '¿Cómo se comporta en los infinitos un polinomio de grado par positivo?', back: 'Sus dos extremos van en el mismo sentido: ambos a +∞ si el coeficiente principal es positivo y ambos a −∞ si es negativo.' },
  { id: 'fc-poly-03', front: '¿Y un polinomio de grado impar?', back: 'Los extremos van en sentidos opuestos. Con coeficiente principal positivo: −∞ a la izquierda y +∞ a la derecha. Con coeficiente negativo: al revés.' },
  { id: 'fc-poly-04', front: '¿Cómo influye la multiplicidad de una raíz real en el signo?', back: tex`Si \(P(x)=(x-a)^mQ(x)\) y \(Q(a)\ne0\), el signo cambia al atravesar a cuando m es impar; no cambia cuando m es par. En ambos casos \(P(a)=0\).` },
  { id: 'fc-poly-05', front: '¿Cuántos extremos relativos puede tener un polinomio de grado n≥1?', back: 'Como máximo n−1: su derivada tiene grado n−1. Puede tener menos; una raíz de la derivada no garantiza un extremo.' },
  { id: 'fc-poly-06', front: '¿Qué debes añadir al interpretar un polinomio en un problema económico?', back: 'El dominio permitido, las unidades de las variables y la comparación de candidatos y extremos del intervalo. Un máximo de la expresión fuera del dominio no es una solución válida del modelo.' },
].map(card => ({ ...card, topicId: 't02', lessonId: 't02-e02' }));
