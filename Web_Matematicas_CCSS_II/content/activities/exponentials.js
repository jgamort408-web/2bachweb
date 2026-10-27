const tex = String.raw;
const q = (id, prompt, choices, explanation, hint) => ({
  id: 'exp-' + id, lessonId: 't02-e04', topicId: 't02', prompt, correct: 'right',
  options: choices.map(([text, feedback], i) => ({ id: i ? 'wrong-' + i : 'right', text, feedback })),
  explanation, hint, source: 'Guion 2.4, pregunta T2.2 y ampliaciones de elaboración propia',
});
export const exponentialQuestions = [
  q('01', tex`¿Qué afirmación describe \(f(x)=2^x\)?`, [
    ['Es creciente y siempre positiva.', 'La base es mayor que 1 y las potencias son positivas.'],
    ['Es decreciente.', 'Con base 2, al aumentar x aumenta la potencia.'],
    ['Es negativa cuando x<0.', 'Un exponente negativo da un recíproco positivo.'],
    ['Tiene asíntota vertical x=0.', 'Está definida en 0: f(0)=1.']],
    tex`Su dominio es \(\mathbb R\), su recorrido es \((0,+\infty)\) y crece. Se acerca a y=0 cuando x tiende a −∞.`,
    'Compara los valores para x=−1, 0 y 1.'),
  q('02', tex`¿Qué ocurre con \(g(x)=(1/2)^x\) cuando x tiende a +∞?`, [
    ['Tiende a 0 sin alcanzarlo.', 'Cada incremento de una unidad divide el valor entre 2.'],
    ['Tiende a −∞.', 'Las potencias de una base positiva siguen siendo positivas.'],
    ['Tiende a +∞.', 'Eso ocurre para esta función cuando x tiende a −∞.'],
    ['Llega a 0 en x=2.', 'En 2 vale 1/4.']],
    tex`La base está entre 0 y 1: g decrece, \(g(x)>0\) y \(\lim_{x\to+\infty}g(x)=0\).`,
    'Calcula 1/2, 1/4 y 1/8.'),
  q('03', tex`¿Cuál es el recorrido de \(h(x)=2-4(1/2)^x\)?`, [
    [tex`\((-\infty,2)\)`, 'Se resta de 2 una cantidad siempre positiva.'],
    [tex`\((2,+\infty)\)`, 'El coeficiente de la potencia es negativo.'],
    [tex`\((-\infty,2]\)`, '2 es un límite; nunca se alcanza.'],
    [tex`\((0,+\infty)\)`, 'La transformación cambia el recorrido de la exponencial básica.']],
    tex`Como \(4(1/2)^x>0\), siempre h(x)<2. Los límites son −∞ a la izquierda y 2 a la derecha.`,
    'Piensa en el signo de la cantidad que se resta a 2.'),
  q('04', tex`¿Cómo varía \(h(x)=2-4(1/2)^x\)?`, [
    ['Crece en todos los reales.', 'El coeficiente negativo invierte la monotonía de (1/2)^x.'],
    ['Decrece porque la base es menor que 1.', 'También hay que considerar el signo del coeficiente.'],
    ['Tiene un máximo en x=0.', 'Su derivada es positiva, también en 0.'],
    ['Primero decrece y luego crece.', 'La derivada no cambia de signo.']],
    tex`\(h\prime(x)=-4(1/2)^x\ln(1/2)>0\): tanto −4 como el logaritmo son negativos.`,
    'Compara h(0)=−2 con h(1)=0 y h(2)=1.'),
  q('05', 'Un capital hipotético de 1000 € crece un 5 % anual compuesto, sin movimientos ni gastos. ¿Cuánto vale al terminar el tercer año?', [
    ['1157,63 € (redondeado a céntimos al final).', 'Se multiplica tres veces por 1,05.'],
    ['1150 €.', 'Eso suma 50 € cada año; no aplica crecimiento compuesto.'],
    ['150 €.', 'Eso omite el capital inicial y usa incrementos simples.'],
    ['1050 €.', 'Es el valor después de un año.']],
    tex`\(1000\cdot1{,}05^3=1157{,}625\). Cada 5 % se calcula sobre el valor del año anterior.`,
    'El factor anual es 1+0,05.'),
  q('06', 'Una máquina de 12000 € pierde cada año el 20 % de su valor anterior. ¿Qué modelo describe su valor tras t años completos?', [
    [tex`\(V(t)=12000\cdot0{,}8^t\)`, 'Conserva el 80 % en cada paso.'],
    [tex`\(V(t)=12000-2400t\)`, 'Esto resta siempre el 20 % del valor inicial.'],
    [tex`\(V(t)=12000\cdot0{,}2^t\)`, 'Esto conserva solo el 20 %; perdería el 80 %.'],
    [tex`\(V(t)=12000\cdot1{,}2^t\)`, 'Esto aumenta el valor un 20 %.']],
    tex`El factor es \(1-0{,}20=0{,}8\). En tres años: \(12000\cdot0{,}8^3=6144\) €. El modelo usa t=0,1,2,…`,
    'Distingue el porcentaje que pierde del que conserva.'),
];
export const exponentialCards = [
  { id: 'fc-exp-01', front: tex`¿Qué condiciones tiene la base de \(a^x\)?`, back: tex`\(a>0\) y \(a\ne1\) para una exponencial no constante definida en todos los reales. Con a=1 sería constante; una base negativa no admite todos los exponentes reales.` },
  { id: 'fc-exp-02', front: tex`¿Cómo es \(a^x\) si a>1?`, back: tex`Crece, es positiva, pasa por (0,1), tiene dominio \(\mathbb R\), recorrido \((0,+\infty)\) y asíntota y=0 cuando x tiende a −∞.` },
  { id: 'fc-exp-03', front: tex`¿Cómo es \(a^x\) si 0<a<1?`, back: 'Decrece, sigue siendo positiva y pasa por (0,1). Se acerca a y=0 cuando x tiende a +∞; hacia −∞ crece sin cota.' },
  { id: 'fc-exp-04', front: tex`¿Qué hacen C y k en \(C a^x+k\), con C≠0?`, back: tex`C escala verticalmente y, si es negativo, refleja la curva de \(a^x\) respecto a X; después k la desplaza verticalmente. Asíntota y=k, corte con Y (0,C+k). Recorrido por encima de k si C>0 y por debajo si C<0, sin incluir k.` },
  { id: 'fc-exp-05', front: tex`¿Cómo decides la monotonía de \(C a^x+k\)?`, back: tex`Por el signo de \(C\ln a\), porque \(f\prime(x)=C a^x\ln a\) y \(a^x>0\). Si es positivo, crece; si es negativo, decrece. No tiene extremos para C≠0 y a≠1.` },
  { id: 'fc-exp-06', front: '¿Cómo se convierte un porcentaje por periodo en una base exponencial?', back: tex`Expresa la tasa r como decimal y usa el factor 1+r: \(V(t)=V_0(1+r)^t\). Subir un 5 % da 1,05; bajar un 20 % da 0,8. El tiempo debe medirse en el mismo periodo que la tasa; el cambio absoluto no suele ser constante.` },
].map(card => ({ ...card, topicId: 't02', lessonId: 't02-e04' }));
