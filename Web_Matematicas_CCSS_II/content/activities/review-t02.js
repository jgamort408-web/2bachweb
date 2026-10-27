// Seis preguntas transversales originales; no son variantes numéricas.
const tex = String.raw;
const q = (n, lessons, prompt, choices, explanation, hint) => ({
  id: 'review-t02-' + n, topicId: 't02', lessonId: 't02-review',
  lessonIds: lessons.map(n => 't02-e0' + n), prompt, correct: 'right',
  options: choices.map(([text, feedback], i) => ({id: i ? 'wrong-' + i : 'right', text, feedback})),
  explanation, hint, source: 'Elaboración propia: repaso integrado del guion 2.1–2.9'
});
export const representationReviewQuestions = [
  q('01', [3,7,8], tex`Si \(F(u)=(u^2-1)/(u-1)\) y \(g(x)=-2F(3-x)+4\), ¿corta g el eje X?`, [
    ['No: el único cero de la expresión simplificada queda excluido.', 'La transformación lleva el hueco a (2,0).'],
    ['Sí, en (2,0).', 'La expresión original no está definida en x=2.'],
    ['Sí, en (1,0).', 'La abscisa del hueco también cambia con la transformación.'],
    ['No, porque x=2 es una asíntota vertical.', 'El límite es finito: hay un hueco, no una vertical.']],
    tex`Se exige \(3-x\ne1\), luego \(x\ne2\). Para esos x, \(g(x)=-2(4-x)+4=2x-4\). Su único cero algebraico sería 2, que no pertenece al dominio. El límite en 2 vale 0.`, 'Conserva la restricción original después de simplificar.'),
  q('02', [1,5], tex`Para \(h(x)=\ln(4-x)-\ln x\), ¿cuál es su dominio y su cero?`, [
    [tex`Dominio (0,4); único cero x=2.`, 'Ambos argumentos deben ser positivos.'],
    ['Dominio ℝ excepto 0 y 4; cero x=2.', 'Un argumento negativo tampoco admite logaritmo real.'],
    ['Dominio (0,+∞); cero x=4.', 'Falta la condición 4−x>0 y en 4 hay un logaritmo de cero.'],
    ['Dominio (0,4); no hay cero porque decrece.', 'Una función decreciente sí puede cruzar el eje X.']],
    tex`x>0 y 4−x>0 dan (0,4). Igualar los logaritmos da 4−x=x y x=2. Además \(h\prime(x)=-1/(4-x)-1/x<0\), así que no hay otro cero.`, 'Intersecta las dos condiciones antes de resolver la ecuación.'),
  q('03', [4,5,9], tex`En un modelo continuo \(A(t)=2-8(1/2)^t\), con t≥0 en horas, ¿cuándo se cumple A(t)≥1 por primera vez?`, [
    ['En t=3 horas.', 'A(3)=1 y A es creciente.'],
    ['En t=2 horas.', 'A(2)=0, todavía menor que 1.'],
    ['Nunca, porque 2 es una asíntota.', 'No alcanzar 2 no impide alcanzar 1.'],
    ['En t=4 horas, por ser el primer entero posterior al umbral.', 'El umbral 3 está incluido: la desigualdad no es estricta.']],
    tex`A(t)≥1 equivale a \((1/2)^t\le1/8=(1/2)^3\). Como la potencia decrece, t≥3. La primera hora admisible es 3 y no hace falta esperar a 4.`, 'El sentido de la comparación cambia porque la base está entre 0 y 1.'),
  q('04', [6,9], tex`Sea \(B(q)=-q^2+8q\) para 0≤q≤3 y \(B(q)=-2q^2+14q-9\) para 3<q≤6. Si q es divisible, ¿dónde está el máximo absoluto?`, [
    ['En q=3,5, con B=15,5.', 'Este candidato pertenece a su tramo y supera los extremos y la unión.'],
    ['En q=4, con B=16.', 'Se ha usado la fórmula del primer tramo fuera de su intervalo.'],
    ['En q=3, con B=15.', 'La función sigue creciendo a la derecha de la unión hasta 3,5.'],
    ['En q=6, con B=3.', 'Es el extremo de mayor abscisa, pero no el mayor beneficio.']],
    tex`La raíz 4 de 8−2q queda fuera del primer tramo. En el segundo, 14−4q=0 da 3,5. Comparamos B(0)=0, B(3)=15, B(3,5)=15,5 y B(6)=3.`, 'Cada derivada solo es válida en el intervalo de su rama.'),
  q('05', [1,3], tex`Si \(r(x)=1/(x-1)\) tiene derivada negativa en su dominio, ¿es estrictamente decreciente en todo \(\mathbb R\setminus\{1\}\)?`, [
    ['No; lo es en cada uno de los intervalos separados por 1.', 'El dominio no es un intervalo; comparar ramas requiere cuidado.'],
    ['Sí, porque r′<0 en todos sus puntos.', 'El criterio de monotonía se aplica a intervalos.'],
    ['No; es creciente en (1,+∞).', 'En esa rama la derivada también es negativa.'],
    ['No; tiene un mínimo en x=1.', 'x=1 no pertenece al dominio y no puede ser un extremo.']],
    tex`Es decreciente en (−∞,1) y (1,+∞). Pero 0<2 y r(0)=−1<1=r(2), lo que contradice el decrecimiento en todo el dominio.`, 'Busca dos puntos situados a distintos lados de la asíntota.'),
  q('06', [2,8], tex`Para \(p(x)=(x+1)^2(x-2)\), se refleja la gráfica respecto a X: g=−p. ¿Qué ocurre en (−1,0)?`, [
    ['Es un mínimo local y la gráfica toca X sin cruzarlo.', 'La raíz doble conserva su multiplicidad; la reflexión intercambia máximo y mínimo.'],
    ['Es un máximo local y cruza X.', 'La reflexión cambia el tipo de extremo; una raíz doble no cambia el signo.'],
    ['Es un mínimo local y cruza X.', 'A ambos lados cercanos de −1, g es positiva.'],
    ['La raíz pasa a x=1.', 'Reflejar respecto a X cambia las alturas, no las abscisas.']],
    tex`Cerca de −1, \(g(x)=(x+1)^2(2-x)\ge0\), con igualdad solo en −1. Por tanto es mínimo local sin cambio de signo. La otra raíz, x=2, es simple y sí cruza X.`, 'Distingue reflexión vertical y horizontal; comprueba el signo a ambos lados.')
];
