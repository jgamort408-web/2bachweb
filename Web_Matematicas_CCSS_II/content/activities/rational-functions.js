const tex = String.raw;
const q = (id, prompt, choices, explanation, hint) => ({
  id: 'rational-' + id, lessonId: 't02-e03', topicId: 't02', prompt, correct: 'right',
  options: choices.map(([text, feedback], i) => ({ id: i ? 'wrong-' + i : 'right', text, feedback })),
  explanation, hint, source: 'Elaboración propia sobre el guion 2.3 y el criterio de asíntota de T2.7',
});
export const rationalQuestions = [
  q('01', tex`¿Cuál es el dominio de \(f(x)=(x^2-1)/(x^2-x-2)\)?`, [
    [tex`\(\mathbb R\setminus\{-1,2\}\)`, 'Se excluyen ambos ceros del denominador original.'],
    [tex`\(\mathbb R\setminus\{2\}\)`, 'Cancelar x+1 no recupera el punto −1.'],
    [tex`\(\mathbb R\setminus\{-1,1\}\)`, 'Son los ceros del numerador, no los del denominador.'],
    [tex`\(\mathbb R\)`, 'El denominador puede anularse.']],
    tex`\(x^2-x-2=(x+1)(x-2)\). El dominio excluye −1 y 2, aunque la expresión se simplifique a \((x-1)/(x-2)\).`,
    'Factoriza el denominador antes de simplificar.'),
  q('02', tex`¿Qué representa el punto excluido \(x=-1\) de \(f(x)=(x^2-1)/(x^2-x-2)\)?`, [
    [tex`Un hueco en \((-1,2/3)\).`, 'El límite se calcula con la expresión simplificada.'],
    ['Una asíntota vertical x=−1.', 'El límite no es infinito.'], ['Un corte con X en (−1,0).', '−1 no pertenece al dominio.'],
    [tex`Un punto relleno en \((-1,2/3)\).`, 'El límite no redefine automáticamente el valor de la función.']],
    tex`Para x admisible, \(f(x)=(x-1)/(x-2)\). Al acercarse a −1, el límite es \((-2)/(-3)=2/3\), pero f(−1) no existe.`,
    'Conserva la exclusión del dominio y calcula el límite.'),
  q('03', tex`Para la misma f, ¿cuáles son los límites en \(2^-\) y \(2^+\), en ese orden?`, [
    [tex`\(-\infty,\ +\infty\)`, 'El numerador reducido es positivo y el denominador cambia de signo.'],
    [tex`\(+\infty,\ -\infty\)`, 'Se han intercambiado los signos del denominador.'],
    ['1 y 1.', '1 es el límite en los infinitos, no en 2.'], ['0 y 0.', 'El numerador reducido tiende a 1, no a cero.']],
    tex`\(f(x)=1+1/(x-2)\). Cerca de 2, la fracción diverge a −∞ por la izquierda y a +∞ por la derecha; x=2 es asíntota vertical.`,
    'Sustituye mentalmente x=1,99 y x=2,01 para comprobar los signos.'),
  q('04', tex`¿Qué asíntota oblicua tiene \(g(x)=x^2/(x-1)\)?`, [
    [tex`\(y=x+1\)`, 'La diferencia con esa recta es 1/(x−1).'], [tex`\(y=x\)`, 'La diferencia tiende a 1, no a 0.'],
    [tex`\(y=1\)`, 'Los grados no son iguales; no hay asíntota horizontal.'], [tex`\(x=1\)`, 'Esa es vertical, no oblicua.']],
    tex`Dividiendo, \(g(x)=x+1+1/(x-1)\). Como \(1/(x-1)\to0\) en ambos infinitos, la oblicua es y=x+1.`,
    'Divide el numerador por el denominador e interpreta el resto.'),
  q('05', tex`Para \(g(x)=x^2/(x-1)\), con \(g\prime(x)=x(x-2)/(x-1)^2\), ¿cuáles son sus extremos relativos?`, [
    ['Máximo (0,0) y mínimo (2,4).', 'La derivada cambia de + a − en 0 y de − a + en 2.'],
    ['Mínimo (0,0) y máximo (2,4).', 'Se han invertido los cambios de signo.'], ['Un extremo en x=1.', 'x=1 queda fuera del dominio.'],
    ['Ninguno, porque es una función racional.', 'Una función racional sí puede tener extremos.']],
    tex`El denominador de la derivada es positivo en el dominio. El signo del numerador es +, −, −, + en los intervalos separados por 0, 1 y 2. \(g(0)=0\) y \(g(2)=4\).`,
    'Separa la recta por los ceros de la derivada y por el punto excluido.'),
  q('06', '¿Puede una función racional cruzar su asíntota horizontal?', [
    [tex`Sí: \(h(x)=x/(x^2+1)\) cruza y=0 en x=0.`, 'La asíntota describe los infinitos, no prohíbe coincidencias finitas.'],
    ['No: una asíntota nunca se toca.', 'Es una interpretación incorrecta de la definición por límites.'],
    ['Solo si tiene un hueco en el cruce.', 'El ejemplo está definido y es continuo en 0.'],
    ['Solo si la recta también es una asíntota vertical.', 'Una recta horizontal no puede ser vertical.']],
    tex`\(\lim_{x\to\pm\infty}x/(x^2+1)=0\), y \(h(0)=0\). Como el denominador es positivo, h cambia de negativo a positivo al pasar por 0.`,
    'La definición de asíntota horizontal se refiere a x tendiendo a infinito.'),
];
export const rationalCards = [
  { id: 'fc-rational-01', front: '¿Qué dominio se conserva al simplificar una función racional?', back: 'El original: todos los reales salvo los ceros del denominador original. Cancelar un factor no incorpora al dominio sus raíces excluidas.' },
  { id: 'fc-rational-02', front: '¿Cómo distingues un hueco de una asíntota vertical?', back: 'En un punto excluido, un límite finito da un hueco. Si algún límite lateral es infinito, hay asíntota vertical. Simplifica y estudia los factores que quedan; no basta con que inicialmente aparezca 0/0.' },
  { id: 'fc-rational-03', front: '¿Qué asíntota horizontal tiene P/Q según sus grados?', back: 'Para polinomios no nulos: si grado P < grado Q, y=0; si son iguales, y=cociente de coeficientes principales. Si grado P > grado Q, no hay asíntota horizontal.' },
  { id: 'fc-rational-04', front: '¿Cuándo aparece una asíntota oblicua en una racional?', back: tex`Si el grado del numerador supera en uno al del denominador. La división da \(P/Q=mx+b+R/Q\), con grado R menor que grado Q; \(R/Q\to0\). La recta es y=mx+b, con m distinto de 0.` },
  { id: 'fc-rational-05', front: '¿Qué puntos separan la tabla de monotonía de una racional?', back: 'Los ceros de su derivada y los puntos excluidos del dominio, incluso los huecos. Un punto que no pertenece a la función no puede ser un extremo de ella.' },
  { id: 'fc-rational-06', front: '¿Cancelar un factor basta para descartar una asíntota vertical?', back: tex`No. En \((x-a)/(x-a)^2\) queda \(1/(x-a)\), que diverge. Compara las multiplicidades y calcula los límites; si el denominador conserva un factor sin cancelar, puede seguir habiendo un polo.` },
].map(card => ({ ...card, topicId: 't02', lessonId: 't02-e03' }));
