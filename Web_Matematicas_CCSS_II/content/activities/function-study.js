// Guion 2.1; adaptación de T2.1 y T2.10 y elaboración propia.
const tex = String.raw;
function question(id, prompt, answers, explanation, hint, source = 'Elaboración propia sobre el guion 2.1') {
  return { id: 'study-' + id, lessonId: 't02-e01', topicId: 't02', prompt, correct: 'right',
    options: answers.map(([text, feedback], i) => ({ id: i ? 'wrong-' + i : 'right', text, feedback })), explanation, hint, source };
}
export const studyQuestions = [
  question('01', tex`¿Cuál es el dominio de \(h(x)=1/(x-3)\)?`, [
    [tex`\(\mathbb R\setminus\{3\}\)`, 'Solo se excluye el cero del denominador.'],
    [tex`\(\mathbb R\)`, 'La expresión no está definida en 3.'],
    [tex`\(\mathbb R\setminus\{0\}\)`, 'En 0 el denominador vale −3.'],
    [tex`\((3,+\infty)\)`, 'Los números menores que 3 también son admisibles.']],
    tex`La condición es \(x-3\ne0\), es decir, \(x\ne3\). Por ejemplo, \(h(0)=-1/3\) sí existe.`,
    'Empieza por las restricciones de la expresión, antes de derivar.', 'Adaptación de 03_Tests_2Bach_CC_Sociales.md, T2.1'),
  question('02', tex`¿Dónde corta \(g(x)=x^2-4x+3\) al eje Y?`, [
    [tex`\((0,3)\)`, 'Se sustituye x=0.'], [tex`\((3,0)\)`, 'Este es uno de los cortes con el eje X.'],
    [tex`\((1,0)\)`, 'Es el otro corte con el eje X.'], [tex`\((0,-1)\)`, '−1 es la ordenada del vértice, que tiene abscisa 2.']],
    tex`En el eje Y, \(x=0\). Como \(g(0)=3\), el corte es \((0,3)\). Resolver \(g(x)=0\) da los cortes con X.`,
    'En el eje vertical, ¿qué coordenada es cero?', 'Adaptación de 03_Tests_2Bach_CC_Sociales.md, T2.10'),
  question('03', tex`Para \(f(x)=x^3-3x\), ¿qué indica \(f\prime(x)=3(x-1)(x+1)\)?`, [
    ['Crece en (−∞,−1) y (1,+∞), y decrece en (−1,1).', 'La derivada es positiva fuera de las raíces y negativa entre ellas.'],
    ['Crece en todo su dominio.', 'En x=0 la derivada vale −3.'], ['Decrece fuera de [−1,1] y crece dentro.', 'Has invertido los signos de la derivada.'],
    ['Crece exactamente donde f(x)>0.', 'El signo de f indica posición respecto al eje, no crecimiento.']],
    tex`Los signos de \(f\prime\) son +, −, +. En −1 hay máximo relativo \((-1,2)\); en 1, mínimo relativo \((1,-2)\).`,
    'Prueba los signos en x=−2, x=0 y x=2.'),
  question('04', tex`¿Qué debes dibujar en \(x=1\) para \(r(x)=(x^2-1)/(x-1)\)?`, [
    ['Un hueco en (1,2).', 'El límite es 2, pero 1 sigue excluido del dominio.'], ['Una asíntota vertical x=1.', 'El límite es finito, no infinito.'],
    ['Un punto relleno en (1,2).', 'Simplificar no añade el punto excluido.'], ['Un máximo relativo en (1,2).', 'El punto no pertenece a la función.']],
    tex`Para \(x\ne1\), \(r(x)=x+1\). Así, \(\lim_{x\to1}r(x)=2\), pero \(r(1)\) no existe: es una discontinuidad evitable.`,
    'Conserva el dominio original después de cancelar factores.'),
  question('05', tex`Una función derivable cumple \(u\prime(a)=0\). ¿Basta para afirmar que tiene un extremo en a?`, [
    ['No; hay que estudiar el comportamiento a ambos lados.', 'Una tangente horizontal no garantiza un extremo.'],
    ['Sí, siempre es un máximo.', 'También podría ser un mínimo o no haber extremo.'], ['Sí, siempre es un mínimo.', 'El signo puede cambiar en el sentido contrario o no cambiar.'],
    ['Sí, siempre es un extremo absoluto.', 'Ni siquiera se garantiza un extremo relativo.']],
    tex`Por ejemplo, \(u(x)=x^3\) tiene \(u\prime(0)=0\), pero crece a ambos lados y no tiene extremo allí. Un cambio de + a − en la derivada indica máximo; de − a +, mínimo.`,
    'Piensa en una función que atraviesa el origen con tangente horizontal.'),
  question('06', tex`¿Son absolutos los extremos \((-1,2)\) y \((1,-2)\) de \(f(x)=x^3-3x\) en \(\mathbb R\)?`, [
    ['No: f no está acotada ni superior ni inferiormente.', 'En los extremos del dominio diverge a infinitos de distinto signo.'],
    ['Sí: toda raíz de la derivada da un extremo absoluto.', 'La información local no basta para comparar todo el dominio.'],
    ['Solo el máximo es absoluto.', 'f(3)=18 supera 2.'], ['Solo el mínimo es absoluto.', 'f(−3)=−18 es menor que −2.']],
    tex`\(\lim_{x\to-\infty}f(x)=-\infty\) y \(\lim_{x\to+\infty}f(x)=+\infty\). Los extremos son relativos, no absolutos en todo \(\mathbb R\).`,
    'Compara con f(3) y f(−3), fuera del tramo central.'),
];
export const studyCards = [
  { id: 'fc-study-01', front: '¿Cómo organizas el estudio de una función?', back: 'Dominio y restricciones → cortes, simetrías y signo → continuidad y límites → asíntotas → derivada, monotonía y extremos → curvatura si procede → tabla y gráfica coherente.' },
  { id: 'fc-study-02', front: '¿Cómo distingues cortes con los dos ejes?', back: tex`Eje X: resolver \(f(x)=0\) dentro del dominio. Eje Y: calcular \((0,f(0))\), solo si 0 pertenece al dominio.` },
  { id: 'fc-study-03', front: '¿Qué diferencia hay entre el signo de f y el de su derivada?', back: tex`\(f(x)>0\) sitúa la gráfica sobre el eje X. \(f\prime(x)>0\) en todo un intervalo garantiza crecimiento allí. Una función positiva también puede decrecer.` },
  { id: 'fc-study-04', front: '¿Toda raíz del denominador produce una asíntota vertical?', back: 'No. Hay que conservar las restricciones del dominio y calcular los límites laterales. Un límite finito puede corresponder a un hueco; una divergencia infinita por algún lado indica asíntota vertical.' },
  { id: 'fc-study-05', front: '¿Qué candidatos debes revisar al buscar extremos?', back: 'Puntos interiores del dominio donde la derivada es cero o no existe, además de los extremos incluidos del dominio o intervalo. Se clasifican por el comportamiento local; los absolutos requieren comparar valores en todo el conjunto considerado.' },
  { id: 'fc-study-06', front: '¿Qué simetrías básicas pueden ahorrar trabajo?', back: tex`Con dominio simétrico respecto a 0: \(f(-x)=f(x)\) indica simetría respecto al eje Y (par); \(f(-x)=-f(x)\), respecto al origen (impar). Si no se cumple ninguna, no impongas esas simetrías.` },
].map(card => ({ ...card, topicId: 't02', lessonId: 't02-e01' }));
