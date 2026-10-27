// Respuestas por ID estable; procedencia y revisión en docs/procedencia-contenidos.md.
function q(id, prompt, correct, options, explanation, hint, lessonId) {
  return { id, prompt, correct, options: options.map(([id, text, feedback]) => ({ id, text, feedback })), explanation, hint, lessonId };
}
export const limitQuestions = [
  q('lim-001', 'Si \\(f(2)=9\\), pero los valores próximos de \\(f(x)\\) se acercan a 4 por ambos lados, ¿cuál es el límite en 2?', 'four',
    [['four', '4', 'El límite depende de los valores próximos.'], ['nine', '9', '9 es el valor puntual, no la altura a la que se acercan las ramas.'], ['none', 'No existe', 'Un valor puntual diferente no impide un límite.'], ['mean', '6,5', 'No se promedian valor puntual y límite.']],
    '\\(\\lim_{x\\to2}f(x)=4\\), mientras que \\(f(2)=9\\). Son informaciones distintas.', 'Piensa en el hueco y en el punto aislado.', 't01-e01'),
  q('lim-002', 'Para \\(g(x)=(x^2-4)/(x-2)\\), con \\(x\\ne2\\), ¿qué afirmación es correcta?', 'limit',
    [['limit', 'El límite en 2 es 4 y g(2) no está definido.', 'Correcto.'], ['value', 'El límite y g(2) valen 4.', 'Simplificar no añade el punto excluido al dominio.'], ['zero', 'El límite es 0.', 'La forma 0/0 no significa que el límite sea cero.'], ['none', 'No hay límite porque hay un hueco.', 'Un hueco puede tener límite finito.']],
    'Para \\(x\\ne2\\), \\(g(x)=x+2\\). El límite vale 4, pero el denominador original se anula en 2.', 'Factoriza una diferencia de cuadrados.', 't01-e01'),
  q('lim-003', '¿Qué significa \\(\\lim_{x\\to+\\infty}1/x=0\\)?', 'approach',
    [['approach', '1/x se acerca a 0 cuando x aumenta sin cota.', 'Correcto.'], ['equals', '1/x vale 0 para algún x positivo finito.', 'Para un x positivo finito, 1/x sigue siendo positivo.'], ['input', 'x se acerca a 0.', 'La flecha indica que x tiende a más infinito.'], ['number', 'Se sustituye infinito como un número real.', 'Infinito describe un comportamiento.']],
    'Cuanto mayor es \\(x>0\\), menor es \\(1/x\\). Se acerca a 0 sin valer 0 para ningún x positivo finito.', 'Separa qué hace x de qué hace 1/x.', 't01-e01'),
  q('lat-001', 'Si \\(\\lim_{x\\to a^-}f(x)=3\\) y \\(\\lim_{x\\to a^+}f(x)=5\\), el límite bilateral…', 'none',
    [['none', 'No existe.', 'Los laterales son distintos.'], ['mean', 'Vale 4.', 'No se promedian los laterales.'], ['left', 'Vale 3.', 'No basta el límite izquierdo.'], ['right', 'Vale 5.', 'No basta el límite derecho.']],
    'Para un límite bilateral finito, ambos laterales deben coincidir. Como 3 y 5 son distintos, no existe.', 'Compara los dos lados.', 't01-e02'),
  q('lat-002', 'Sea \\(f(x)=x+1\\) si \\(x<2\\), \\(f(2)=7\\) y \\(f(x)=5-x\\) si \\(x>2\\). ¿Cuál es el límite en 2?', 'three',
    [['three', '3', 'Las dos ramas se acercan a 3.'], ['seven', '7', '7 es solo el valor puntual.'], ['none', 'No existe.', 'Comprueba las dos ramas: sí coinciden.'], ['five', '5', 'En 5−x también hay que sustituir x.']],
    'Por la izquierda: \\(2+1=3\\). Por la derecha: \\(5-2=3\\). El límite vale 3, aunque \\(f(2)=7\\).', 'No utilices el punto aislado para calcular los laterales.', 't01-e02'),
  q('lat-003', '¿Cuánto vale \\(\\lim_{x\\to0^-}1/x\\)?', 'negative',
    [['negative', '\\(-\\infty\\)', 'El denominador es negativo y cercano a cero.'], ['positive', '\\(+\\infty\\)', 'Por la izquierda, x es negativo.'], ['zero', '0', 'Un denominador pequeño produce aquí un cociente grande en valor absoluto.'], ['one', '1', '1/x no se mantiene cerca de 1.']],
    'Con \\(x=-0{,}1;-0{,}01;-0{,}001\\), los valores son \\(-10,-100,-1000\\). El límite es \\(-\\infty\\).', 'Prueba con valores negativos cercanos a cero.', 't01-e02'),
];
export const decks = [
  { id: 'fc-lim-01', front: '¿Qué dice \\(\\lim_{x\\to a}f(x)=L\\)?', back: 'Los valores de f(x) se acercan tanto como queramos a L tomando x suficientemente cerca de a, con x distinto de a.' },
  { id: 'fc-lim-02', front: '¿Tienen que coincidir f(a) y el límite en a?', back: 'No. El valor puntual puede ser distinto o no estar definido, aunque el límite exista.' },
  { id: 'fc-lim-03', front: '¿Una tabla finita demuestra un límite?', back: 'No. Sugiere un comportamiento; hay que justificarlo con la expresión o información suficiente sobre la función.' },
  { id: 'fc-lim-04', front: '¿Qué representa un círculo vacío en (a,L)?', back: 'Ese punto no se incluye en esa rama. Si la curva se acerca a él por ambos lados, el límite puede ser L.' },
  { id: 'fc-lat-01', front: '¿Qué significa \\(x\\to a^-\\)?', back: 'Acercarse a a con valores \\(x<a\\). El signo no dice si los valores de la función son negativos.' },
  { id: 'fc-lat-02', front: '¿Cuándo existe un límite bilateral finito en un punto interior?', back: 'Cuando los límites laterales son finitos e iguales. Su valor común es el límite bilateral.' },
  { id: 'fc-lat-03', front: 'Los laterales valen 3 y 5. ¿El límite vale 4?', back: 'No. Los laterales no se promedian. Al ser diferentes, no hay límite bilateral.' },
  { id: 'fc-lat-04', front: '¿Qué diferencia hay entre los laterales de \\(1/x\\) y \\(1/x^2\\) en 0?', back: 'Para \\(1/x\\) son \\(-\\infty\\) y \\(+\\infty\\). Para \\(1/x^2\\), ambos son \\(+\\infty\\).' },
];
