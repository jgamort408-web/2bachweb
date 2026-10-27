const tex = String.raw;
const q = (id, prompt, choices, explanation, hint) => ({
  id: 'shift-' + id, lessonId: 't02-e07', topicId: 't02', prompt, correct: 'right',
  options: choices.map(([text, feedback], i) => ({ id: i ? 'wrong-' + i : 'right', text, feedback })),
  explanation, hint, source: 'Guion 2.7, T2.4 y ampliaciones propias',
});
export const translationQuestions = [
  q('01', tex`La gráfica de \(g(x)=f(x-2)\) se obtiene trasladando la de f…`, [
    ['2 unidades a la derecha.', 'El mismo argumento u aparece ahora cuando x=u+2.'],
    ['2 unidades a la izquierda.', 'Para recuperar u, hay que resolver x−2=u.'],
    ['2 unidades hacia arriba.', 'Eso sería f(x)+2.'],
    ['2 unidades hacia abajo.', 'Eso sería f(x)−2.']],
    tex`Si f(u)=v, entonces g(u+2)=f(u)=v. El punto (u,v) pasa a (u+2,v).`, 'Busca qué x hace que x−2 sea igual al argumento original.'),
  q('02', tex`El punto (−1,3) está en f. ¿A qué punto se traslada en \(g(x)=f(x+2)-4\)?`, [
    ['(−3,−1).', 'Se mueve 2 a la izquierda y 4 hacia abajo.'],
    ['(1,−1).', 'El signo dentro del argumento se ha interpretado al revés.'],
    ['(−3,7).', 'Se resta 4 a la altura, no se suma.'],
    ['(1,7).', 'Ambos desplazamientos tienen el sentido invertido.']],
    tex`Aquí a=−2 y k=−4. Así, (u,v) pasa a (u−2,v−4); para (−1,3), resulta (−3,−1).`, 'Escribe primero la transformación como f(x−a)+k.'),
  q('03', tex`Si el dominio de f es [−1,4), ¿cuál es el dominio de \(g(x)=f(x-3)+2\)?`, [
    ['[2,7).', 'Se suma 3 a los extremos y se conserva su inclusión.'],
    ['[−4,1).', 'Ese sería el desplazamiento horizontal contrario.'],
    ['[4,9).', 'El +2 vertical no modifica las entradas admitidas.'],
    ['(2,7].', 'Una traslación no cambia qué extremos están incluidos.']],
    tex`\(-1\le x-3<4\) equivale a \(2\le x<7\). El desplazamiento vertical afecta al recorrido, no al dominio.`, 'Impón que x−3 pertenezca al dominio original.'),
  q('04', tex`¿Qué vértice y recorrido tiene \(g(x)=(x-2)^2-3\)?`, [
    [tex`Vértice (2,−3); recorrido \([-3,+\infty)\).`, 'La parábola básica se traslada 2 a la derecha y 3 hacia abajo.'],
    [tex`Vértice (−2,−3); recorrido \([-3,+\infty)\).`, 'x−2 mueve el vértice a x=2.'],
    [tex`Vértice (2,3); recorrido \([3,+\infty)\).`, 'El desplazamiento vertical es −3.'],
    [tex`Vértice (2,−3); recorrido \(\mathbb R\).`, 'Sigue existiendo un valor mínimo.']],
    tex`\((x-2)^2\ge0\), con igualdad en x=2. Por eso el mínimo es −3 y se alcanza.`, 'Haz cero el cuadrado y mira qué queda.'),
  q('05', tex`¿Qué asíntotas tiene \(g(x)=1/(x+2)+1\)?`, [
    ['Vertical x=−2 y horizontal y=1.', 'Son las traslaciones de x=0 e y=0.'],
    ['Vertical x=2 y horizontal y=1.', 'El denominador se anula en −2.'],
    ['Vertical x=−2 y horizontal y=−1.', 'La suma exterior desplaza hacia arriba.'],
    ['Vertical x=0 y horizontal y=0.', 'Esas son las asíntotas de la función original.']],
    tex`Se traslada 1/x dos unidades a la izquierda y una arriba. El dominio excluye −2 y el recorrido excluye 1.`, 'Resuelve x+2=0 y calcula el límite cuando x crece sin cota.'),
  q('06', tex`Si f(1)=0 y \(g(x)=f(x-2)+3\), ¿qué podemos asegurar sobre x=3?`, [
    ['g(3)=3; no es un cero de g.', 'El antiguo cero se traslada al punto (3,3).'],
    ['g(3)=0, porque se trasladan los ceros.', 'Al subir la curva, el punto deja de estar sobre el eje X.'],
    ['g(3)=−3.', 'El desplazamiento vertical es positivo.'],
    ['No se puede conocer g(3).', 'El argumento es 3−2=1 y f(1) sí se conoce.']],
    tex`g(3)=f(1)+3=3. Para buscar ceros hay que resolver f(x−2)=−3, no f(x−2)=0.`, 'Distingue trasladar un punto de conservar que esté sobre un eje.'),
];
export const translationCards = [
  { id: 'fc-shift-01', front: tex`¿Cómo se mueve la gráfica en \(g(x)=f(x-a)+k\)?`, back: 'Cada punto (u,v) pasa a (u+a,v+k). a>0 desplaza a la derecha; a<0, a la izquierda. k>0 sube; k<0 baja. La forma se conserva.' },
  { id: 'fc-shift-02', front: '¿Por qué f(x−a) con a>0 se mueve a la derecha?', back: 'Porque x−a=u se resuelve como x=u+a: el mismo valor original se obtiene en una entrada mayor en a unidades.' },
  { id: 'fc-shift-03', front: '¿Cómo cambian dominio y recorrido al trasladar?', back: 'Se suma a a cada elemento del dominio y k a cada elemento del recorrido. Se conservan extremos abiertos o cerrados y se trasladan los puntos excluidos.' },
  { id: 'fc-shift-04', front: '¿Qué sucede con mínimos, máximos y esquinas?', back: 'Sus coordenadas se trasladan como las de cualquier punto. Se conserva el tipo de extremo y la existencia de una esquina. Los intervalos de monotonía se desplazan horizontalmente en a unidades.' },
  { id: 'fc-shift-05', front: '¿Cómo se trasladan las asíntotas?', back: tex`Una vertical x=c pasa a x=c+a; una horizontal y=L, a y=L+k. Una oblicua y=mx+b pasa a y=mx+(b+k−ma).` },
  { id: 'fc-shift-06', front: '¿Los antiguos cortes con los ejes siguen siendo cortes después de trasladar?', back: tex`No necesariamente. Los nuevos ceros cumplen f(x−a)=−k. El corte con Y es (0,f(−a)+k), solo si −a pertenece al dominio original.` },
].map(card => ({ ...card, topicId: 't02', lessonId: 't02-e07' }));
