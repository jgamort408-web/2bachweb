const tex = String.raw;
const q = (id, prompt, choices, explanation, hint) => ({
  id: 'piece-' + id, lessonId: 't02-e06', topicId: 't02', prompt, correct: 'right',
  options: choices.map(([text, feedback], i) => ({ id: i ? 'wrong-' + i : 'right', text, feedback })),
  explanation, hint, source: 'Guion 2.6, T2.8 y ejemplos de elaboración propia',
});
export const piecewiseQuestions = [
  q('01', tex`¿Qué expresión representa \(|x|\) en todos los reales?`, [
    [tex`\(-x\) si x<0; \(x\) si x≥0.`, 'El resultado es la distancia a cero y nunca es negativo.'],
    ['x para todo x.', 'Si x es negativo, hay que cambiar su signo.'],
    ['−x para todo x.', 'Si x es positivo, eso daría una distancia negativa.'],
    [tex`\(x^2\) para todo x.`, 'Por ejemplo, |2|=2, pero 2²=4.']],
    tex`Para x<0, −x es positivo; para x≥0, x ya es no negativo. En 0 ambas expresiones valen 0.`, 'Interpreta el valor absoluto como distancia al origen.'),
  q('02', tex`Sea \(f(x)=x^2\) si x<1 y \(f(x)=2x-1\) si x≥1. ¿Qué valor y qué rama corresponden a x=1?`, [
    ['1, usando la rama 2x−1.', 'La condición x≥1 incluye el punto de unión.'],
    ['1, usando obligatoriamente la rama x².', 'El valor coincide, pero esa rama no incluye x=1.'],
    ['2.', 'Hay que restar 1 después de multiplicar.'],
    ['No está definida en 1.', 'El signo ≥ sí incluye 1.']],
    tex`Se elige primero la condición: 1≥1. Después se calcula \(2\cdot1-1=1\). La coincidencia con el otro polinomio no cambia qué rama define el punto.`,
    'Busca el intervalo que contiene la igualdad.'),
  q('03', tex`Para la misma f, los límites laterales en 1 valen 1 y las derivadas laterales valen 2. ¿Qué ocurre en 1?`, [
    ['Es continua y derivable.', 'El valor coincide con el límite y las dos derivadas coinciden.'],
    ['Es continua, pero no derivable porque cambia la fórmula.', 'Cambiar de expresión no impide una unión suave.'],
    ['Tiene un salto.', 'Los límites laterales coinciden.'],
    ['Tiene un mínimo relativo.', 'La derivada es positiva a ambos lados cerca de 1.']],
    tex`f(1)=1, ambos límites son 1 y \(f\prime_-(1)=f\prime_+(1)=2\). No hay esquina.`, 'Comprueba continuidad y después derivabilidad.'),
  q('04', tex`¿Dónde tiene su mínimo \(g(x)=|x-1|-2\)?`, [
    ['En (1,−2); es continua, pero no derivable allí.', 'Las pendientes cambian de −1 a 1 en el vértice.'],
    ['En (−1,−2).', 'x−1 desplaza el vértice hacia la derecha.'],
    ['En (1,0).', 'El desplazamiento vertical es −2.'],
    ['No tiene mínimo porque la derivada no existe en 1.', 'Un extremo puede estar en un punto no derivable.']],
    tex`\(|x-1|\ge0\), así que g(x)≥−2, con igualdad solo en 1. Las derivadas laterales son −1 y 1.`, 'Haz cero la expresión dentro del valor absoluto.'),
  q('05', 'Una tarifa hipotética cobra 2 €/unidad por las primeras 10 unidades y 3 €/unidad solo por el exceso. ¿Cuánto cuestan 12 unidades?', [
    ['26 €.', 'Las primeras 10 cuestan 20 € y las otras 2 cuestan 6 €.'],
    ['36 €.', 'Eso aplicaría 3 € a todas las unidades, no solo al exceso.'],
    ['24 €.', 'Las dos últimas unidades ya no cuestan 2 € cada una.'],
    ['56 €.', 'No se cobran las 12 unidades otra vez después de pagar el primer tramo.']],
    tex`\(T(12)=20+3(12-10)=26\) €. La segunda rama conserva el coste acumulado del primer tramo.`, 'Separa la cantidad en 10 unidades iniciales y 2 adicionales.'),
  q('06', tex`Dos ramas se acercan a 1 en x=a, pero se define f(a)=3. ¿Qué cambio consigue continuidad en a?`, [
    ['Definir f(a)=1.', 'El valor debe coincidir con el límite común.'],
    ['Definir f(a)=0.', '0 no coincide con el límite.'],
    ['Ninguno: los límites ya coinciden.', 'También debe coincidir el valor en el punto.'],
    ['Cambiar solo la derivada en a.', 'No puedes asignar una derivada para corregir un valor discontinuo.']],
    tex`Hay una discontinuidad evitable: \(\lim_{x\to a}f(x)=1\ne f(a)\). Redefinir el valor como 1 restaura la continuidad.`,
    'Compara los dos límites laterales con el valor puntual.'),
];
export const piecewiseCards = [
  { id: 'fc-piece-01', front: '¿Cómo se evalúa una función a trozos?', back: 'Localiza primero el intervalo que contiene x, comprobando < o ≤, y después sustituye en su expresión. El dominio reúne los intervalos permitidos, respetando además las restricciones de cada fórmula.' },
  { id: 'fc-piece-02', front: '¿Qué indican un círculo vacío y uno relleno en una gráfica?', back: 'Vacío: ese extremo no se incluye en esa rama. Relleno: la función toma ese valor. Dos ramas pueden terminar en el mismo punto; si está incluido, se dibuja relleno.' },
  { id: 'fc-piece-03', front: '¿Qué tres valores comparas para la continuidad en una unión?', back: tex`\(\lim_{x\to a^-}f(x)\), \(\lim_{x\to a^+}f(x)\) y f(a). Para continuidad en un punto interior del dominio, los tres deben existir como números reales y coincidir.` },
  { id: 'fc-piece-04', front: '¿Cómo compruebas derivabilidad en una unión?', back: 'Primero comprueba continuidad. Después compara las derivadas laterales: deben existir, ser finitas e iguales. Si la función es discontinua, las pendientes de las fórmulas por separado no bastan para afirmar derivabilidad.' },
  { id: 'fc-piece-05', front: tex`¿Cómo escribes \(|x-a|\) por tramos?`, back: tex`Es a−x si x<a y x−a si x≥a. Mide la distancia a a. Tiene vértice (a,0), es continua y presenta pendientes −1 y 1 a ambos lados.` },
  { id: 'fc-piece-06', front: '¿Qué conserva la segunda rama de una tarifa progresiva?', back: 'El coste acumulado hasta el umbral, más el nuevo precio multiplicado solo por el exceso. Aplicar el nuevo precio a toda la cantidad describe una tarifa distinta y puede introducir un salto.' },
].map(card => ({ ...card, topicId: 't02', lessonId: 't02-e06' }));
