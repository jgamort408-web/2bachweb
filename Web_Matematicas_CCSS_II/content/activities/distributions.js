// Preguntas del tema 8 (distribuciones de probabilidad), seis por lección, y lección de referencia de las 19 tarjetas originales.
// Los datos proceden de los ejemplos de las lecciones 8.1–8.4; tests/discrete-distributions.test.mjs contrasta los binomiales.
const tex = String.raw;
const q = (lesson, n, prompt, choices, explanation, hint, source = 'Elaboración propia; lección ' + lesson.replace('t08-e0', '8.')) => ({
  id: 'dist-' + lesson.slice(-2) + '-' + n, topicId: 't08', lessonId: lesson, prompt, correct: 'correct',
  options: choices.map(([text, feedback], i) => ({ id: i ? 'wrong-' + i : 'correct', text, feedback })),
  explanation, hint, source,
});

export const distributionQuestions = [
  // 8.1 · Variable aleatoria
  q('t08-e01', '01', '¿Qué es una variable aleatoria?', [
    ['Una función que asigna un número real a cada resultado del espacio muestral.', tex`\(X:E\to\mathbb R\).`],
    ['Uno de los resultados posibles del experimento.', 'El resultado es «salir cara»; la variable le asigna un número.'],
    ['La probabilidad de un suceso.', 'La probabilidad se calcula después, sobre los valores de X.'],
    ['El conjunto de todos los resultados posibles.', 'Ese es el espacio muestral E.']],
    'Resultados distintos pueden recibir el mismo valor: en dos monedas, CX y XC dan X=1 caras.',
    'Piensa en qué asocia X a cada resultado.', 'Definición del material original; lección 8.1'),
  q('t08-e01', '02', 'Una moneda decide un premio de 0,50 € o de 1,50 €, cada uno con probabilidad 1/2. ¿Qué tipo de variable es el importe?', [
    ['Discreta, aunque sus valores no sean enteros.', 'Toma solo dos valores que se pueden enumerar.'],
    ['Continua, porque tiene decimales.', 'Los decimales no deciden el tipo; lo decide el conjunto de valores posibles.'],
    ['Continua, porque el dinero es una magnitud.', 'Aquí solo hay dos importes posibles.'],
    ['No es una variable aleatoria.', 'Asigna un número a cada resultado de la moneda.']],
    'Una variable es discreta si sus valores posibles forman un conjunto finito o numerable, sean enteros o no.',
    'Cuenta cuántos valores puede tomar.'),
  q('t08-e01', '03', 'Se lanzan dos monedas equilibradas y X cuenta las caras. ¿Cuánto vale P(X=1)?', [
    ['1/2', 'CX y XC dan una cara: 2 de los 4 resultados equiprobables.'],
    ['1/3', 'Los valores 0, 1 y 2 no son equiprobables.'],
    ['1/4', 'Esa es la probabilidad de cada resultado ordenado, no del valor 1.'],
    ['3/4', 'Esa es P(X≤1).']],
    'Se suman las probabilidades de los resultados que dan el valor: P(X=1)=1/4+1/4=1/2.',
    'Escribe los cuatro resultados ordenados.'),
  q('t08-e01', '04', 'X toma los valores 0, 1 y 2. ¿Qué lista de probabilidades forma una distribución?', [
    ['0,2; 0,5; 0,3', 'Todas están entre 0 y 1 y suman 1.'],
    ['0,5; 0,6; 0', 'Suman 1,1.'],
    ['−0,1; 0,6; 0,5', 'Una probabilidad no puede ser negativa.'],
    ['0,3; 0,3; 0,3', 'Suman 0,9.']],
    'Una distribución discreta finita exige 0≤pᵢ≤1 y que las probabilidades sumen 1.',
    'Comprueba las dos condiciones.'),
  q('t08-e01', '05', '¿Cuál es la varianza del resultado de un dado equilibrado?', [
    [tex`\(\dfrac{35}{12}\approx2{,}92\)`, tex`\(\frac{91}{6}-\left(\frac72\right)^2=\frac{35}{12}\).`],
    [tex`\(\dfrac72=3{,}5\)`, 'Esa es la media.'],
    [tex`\(\dfrac{91}{6}\approx15{,}17\)`, 'Esa es la media de los cuadrados; falta restar μ².'],
    [tex`\(\approx1{,}71\)`, 'Esa es la desviación típica, la raíz de la varianza.']],
    'σ² = Σxᵢ²pᵢ − μ² = 91/6 − 49/4 = 35/12. Conviene redondear al final.',
    'Calcula primero la media y la media de los cuadrados.', 'Ejemplo del dado del material original; lección 8.1'),
  q('t08-e01', '06', tex`La espera X tiene densidad \(f(x)=\tfrac12\) en [0, 2] y 0 fuera. ¿Cuánto vale \(P(X=1)\)?`, [
    ['0', 'Un punto tiene anchura cero: área cero.'],
    ['0,5', 'Es la altura f(1), no una probabilidad.'],
    ['1', 'La probabilidad total del intervalo es 1, no la de un punto.'],
    ['0,25', 'No hay ningún intervalo de anchura 0,5 en la pregunta.']],
    'Con densidad, las probabilidades son áreas. P(0,5≤X≤1,5)=1·½=0,5, pero P(X=1)=0.',
    'Distingue altura y área.'),

  // 8.2 · Distribución binomial
  q('t08-e02', '01', tex`Si \(X\sim B(5;0{,}8)\), ¿cuánto vale \(P(X=3)\)?`, [
    ['0,2048', tex`\(\binom53(0{,}8)^3(0{,}2)^2=10\cdot0{,}512\cdot0{,}04\).`],
    ['0,02048', tex`Falta el factor \(\binom53=10\): hay diez secuencias con tres aciertos.`],
    ['0,512', 'Es solo (0,8)³.'],
    ['0,94208', 'Esa es P(X≥3), «al menos tres».']],
    'Se multiplica la probabilidad de una secuencia concreta por el número de secuencias con tres éxitos.',
    'Usa la fórmula de P(X=k).', 'Ejemplo del baloncesto del material original; lección 8.2'),
  q('t08-e02', '02', '¿Qué recuento se puede modelizar con una distribución binomial?', [
    ['El número de caras en diez lanzamientos de una moneda equilibrada.', 'n fijo, ensayos independientes y p=0,5 constante.'],
    ['El número de oros al sacar cinco cartas sin reemplazamiento.', 'Sin reemplazamiento, la probabilidad cambia de una extracción a otra.'],
    ['El número de lanzamientos de un dado hasta obtener el primer 6.', 'El número de ensayos no está fijado de antemano.'],
    ['El tiempo de espera hasta el autobús.', 'No es un recuento de éxitos.']],
    'Hacen falta n ensayos fijados, dos resultados, independencia y la misma probabilidad de éxito en cada ensayo.',
    'Revisa las cuatro condiciones.'),
  q('t08-e02', '03', tex`Para \(X\sim B(1000;0{,}02)\), ¿cuáles son la media y la desviación típica?`, [
    ['μ=20 y σ≈4,43', tex`\(\sigma=\sqrt{1000\cdot0{,}02\cdot0{,}98}=\sqrt{19{,}6}\).`],
    ['μ=20 y σ=19,6', '19,6 es la varianza npq; falta la raíz.'],
    ['μ=980 y σ≈4,43', '980 es el número esperado de piezas correctas.'],
    ['μ=0,02 y σ=0,98', 'Esos son p y q.']],
    'μ=np=20 piezas defectuosas como promedio del modelo, no en cada lote.',
    'Aplica μ=np y σ=√(npq).', 'Control de calidad del material original; lección 8.2'),
  q('t08-e02', '04', 'En una binomial, ¿cuál es el suceso contrario de «al menos 3 éxitos»?', [
    ['X≤2', 'Al menos 3 es X≥3; su contrario es como máximo 2.'],
    ['X≤3', 'X=3 pertenece a «al menos 3».'],
    ['X<2', 'Faltaría X=2.'],
    ['X>3', 'Eso es «más de 3».']],
    'Por eso P(X≥3)=1−P(X≤2)=1−F(2).',
    'Escribe los valores enteros de cada suceso.'),
  q('t08-e02', '05', tex`Si \(X\sim B(5;0{,}8)\), ¿cuánto vale \(P(X\ge1)\)?`, [
    ['0,99968', tex`\(1-P(X=0)=1-(0{,}2)^5\).`],
    ['0,8', 'Es la probabilidad de acertar un tiro concreto.'],
    ['0,00032', 'Esa es P(X=0), fallar los cinco.'],
    ['0,32768', 'Esa es P(X=5), acertar los cinco.']],
    'El contrario de «al menos uno» es «ninguno»: basta un término.',
    'Usa el suceso contrario.', 'Ampliación con los datos del baloncesto; lección 8.2'),
  q('t08-e02', '06', tex`Con la acumulada \(F(k)=P(X\le k)\), ¿cómo se calcula \(P(2\le X\le4)\)?`, [
    ['F(4) − F(1)', 'Se quitan X=0 y X=1, que no están en el intervalo.'],
    ['F(4) − F(2)', 'Eso eliminaría también X=2, que sí está incluido.'],
    ['F(4) − F(3)', 'Eso es solo P(X=4).'],
    ['1 − F(1)', 'Eso es P(X≥2), sin el tope en 4.']],
    'En una variable entera, P(a≤X≤b)=F(b)−F(a−1). Con B(5;0,8): 0,67232−0,00672=0,66560.',
    'Decide qué valores hay que restar.', 'Ampliación con los datos del baloncesto; lección 8.2'),

  // 8.3 · Distribución normal
  q('t08-e03', '01', tex`Si \(X\sim N(100,15)\), ¿cuánto vale aproximadamente \(P(X<85)\)?`, [
    ['0,1587', tex`z=(85−100)/15=−1 y \(\Phi(-1)=1-\Phi(1)\).`],
    ['0,8413', 'Esa es Φ(1), la cola izquierda de z=1.'],
    ['0,5', '85 no es la media.'],
    ['0,3413', 'Es el área entre la media y z=1.']],
    'Se tipifica y se usa la simetría: Φ(−1)=1−0,8413=0,1587.',
    'Tipifica y dibuja la cola.', 'Ejemplo de la lección 8.3'),
  q('t08-e03', '02', tex`Si \(X\sim N(100,15)\), ¿cuánto vale aproximadamente \(P(X>130)\)?`, [
    ['0,0228', tex`\(1-\Phi(2)=1-0{,}9772\).`],
    ['0,9772', 'Esa es P(X≤130); se pide la cola derecha.'],
    ['0,0456', 'Esa es la suma de las dos colas más allá de ±2.'],
    ['0,4772', 'Es el área entre la media y z=2.']],
    'La tabla acumula por la izquierda, así que para la cola derecha se resta de 1.',
    'z=(130−100)/15.', 'Ejemplo de la lección 8.3'),
  q('t08-e03', '03', tex`Con \(X\sim N(100,15)\), ¿cuál es la puntuación tipificada de x=115?`, [
    ['z=1', '(115−100)/15=1.'],
    ['z=15', 'Esa es la diferencia con la media, sin dividir por σ.'],
    ['z=−1', 'El signo es positivo: 115 está por encima de la media.'],
    ['z≈7,67', 'Se ha dividido 115 entre 15 sin restar la media.']],
    tex`\(z=\dfrac{x-\mu}{\sigma}\) mide cuántas desviaciones típicas se separa x de la media.`,
    'Resta la media y divide por la desviación típica.'),
  q('t08-e03', '04', tex`En este tema, ¿qué representa el segundo parámetro de \(N(\mu,\sigma)\)?`, [
    ['La desviación típica.', 'Por eso N(100,15) tiene σ=15.'],
    ['La varianza.', 'Otros textos escriben N(μ,σ²); aquí no.'],
    ['La media.', 'La media es el primer parámetro.'],
    ['La probabilidad total.', 'El área total siempre es 1.']],
    'Conviene comprobar la convención de cada texto o calculadora antes de tipificar.',
    'Fíjate en la notación de la lección.'),
  q('t08-e03', '05', tex`Si \(X\sim N(100,15)\), ¿cuánto vale \(P(X=100)\)?`, [
    ['0', 'En un modelo con densidad, un punto tiene área cero.'],
    ['0,5', 'Esa es P(X≤100).'],
    ['La altura de la densidad en 100.', 'La altura no es una probabilidad.'],
    ['1', 'La variable no toma siempre el valor 100.']],
    'Por eso P(X<a)=P(X≤a) en una normal: incluir o excluir un extremo no cambia la probabilidad.',
    'Recuerda la diferencia entre altura y área.'),
  q('t08-e03', '06', 'En una normal, ¿qué probabilidad aproximada hay entre μ−σ y μ+σ?', [
    ['68,27 %', 'Aproximadamente dos de cada tres valores.'],
    ['95,45 %', 'Eso corresponde a μ±2σ.'],
    ['99,73 %', 'Eso corresponde a μ±3σ.'],
    ['50 %', 'El 50 % queda a cada lado de la media, no a una desviación.']],
    'Regla empírica: 68,27 %, 95,45 % y 99,73 % para una, dos y tres desviaciones.',
    'Recuerda la regla empírica.'),

  // 8.4 · Aproximación binomial-normal
  q('t08-e04', '01', tex`¿Qué normal aproxima \(X\sim\operatorname{Bin}(100;0{,}5)\)?`, [
    ['N(50, 5)', tex`\(\mu=np=50\) y \(\sigma=\sqrt{np(1-p)}=5\).`],
    ['N(50, 25)', '25 es la varianza; el segundo parámetro es la desviación típica.'],
    ['N(0,5; 0,5)', 'p no es la media del recuento.'],
    ['N(100, 50)', 'n no es la media.']],
    'Se conservan la media y la desviación típica de la binomial.',
    'Calcula np y √(np(1−p)).', 'Ejemplo de la lección 8.4'),
  q('t08-e04', '02', tex`Con la corrección de continuidad, \(P(X\le55)\) se aproxima por:`, [
    ['P(Y ≤ 55,5)', 'Se incluye completa la celda de X=55.'],
    ['P(Y ≤ 55)', 'Se pierde la mitad de la celda de 55.'],
    ['P(Y ≤ 54,5)', 'Eso correspondería a X≤54, es decir, X<55.'],
    ['P(Y ≥ 55,5)', 'Es la cola contraria.']],
    'Con Bin(100; 0,5): Φ(1,1)≈0,864334, frente al valor binomial 0,864373.',
    'Cada valor entero k ocupa la celda de k−0,5 a k+0,5.', 'Ejemplo de la lección 8.4'),
  q('t08-e04', '03', tex`Con la corrección de continuidad, \(P(X\ge60)\) se aproxima por:`, [
    ['P(Y ≥ 59,5)', 'Se incluye completa la celda de X=60.'],
    ['P(Y ≥ 60,5)', 'Eso correspondería a «más de 60».'],
    ['P(Y ≥ 60)', 'Se pierde la mitad de la celda de 60.'],
    ['P(Y ≤ 59,5)', 'Es la cola contraria.']],
    'Con Bin(100; 0,5): 1−Φ(1,9)≈0,028717.',
    'Decide si 60 está incluido.', 'Ejemplo de la lección 8.4'),
  q('t08-e04', '04', tex`¿Cómo se aproxima \(P(X=50)\) con la normal?`, [
    ['P(49,5 ≤ Y ≤ 50,5)', 'La masa de X=50 se reparte en su celda.'],
    ['P(Y = 50)', 'En una normal vale 0.'],
    ['La altura de la densidad normal en 50.', 'Es una altura, no una probabilidad.'],
    ['P(Y ≤ 50,5)', 'Eso aproxima P(X≤50).']],
    'Con Bin(100; 0,5): Φ(0,1)−Φ(−0,1)≈0,079656, frente al valor exacto 0,079589.',
    'Un punto tiene probabilidad cero en un modelo continuo.', 'Ejemplo de la lección 8.4'),
  q('t08-e04', '05', '¿Qué orientación usa el tema para aceptar la aproximación normal de una binomial?', [
    ['np ≥ 5 y n(1−p) ≥ 5', 'Se piden las dos condiciones.'],
    ['n ≥ 30', 'Un n grande no basta si p está muy cerca de 0 o de 1.'],
    ['p = 0,5', 'No es necesario que p valga 0,5.'],
    ['Solo np ≥ 5', 'También hace falta n(1−p) ≥ 5.']],
    'Es una orientación práctica: no garantiza un error pequeño en colas muy poco probables.',
    'Hay una condición para los éxitos y otra para los fracasos.'),
  q('t08-e04', '06', '¿Es adecuada la aproximación normal para n=100 y p=0,01?', [
    ['No: np=1 es menor que 5.', 'Falla la orientación aunque n sea grande.'],
    ['Sí: n=100 es grande.', 'El tamaño de n no basta.'],
    ['Sí: n(1−p)=99 es mayor que 5.', 'También debe cumplirse np≥5.'],
    ['No, porque p no es 0,5.', 'El motivo no es ese: p puede ser distinto de 0,5.']],
    'Conviene recurrir al cálculo binomial directo.',
    'Calcula np.', 'Ejemplo de la lección 8.4'),
];

// Lección donde se explica cada tarjeta original del tema 8 (conservan su categoría de la fuente).
export function distributionCardLesson(id) {
  const n = Number(/^fc-t08-original-(\d+)$/.exec(id)?.[1]);
  if (!n) return undefined;
  return n <= 3 ? 't08-e01' : n <= 7 ? 't08-e02' : n <= 15 ? 't08-e03' : 't08-e04';
}
