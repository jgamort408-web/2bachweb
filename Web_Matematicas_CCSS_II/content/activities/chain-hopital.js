// Procedencia: docs/procedencia-contenidos.md, entrega 06.
function q(id, lessonId, prompt, correct, options, explanation, hint, source = 'Elaboración propia a partir del guion 1.16–1.18') {
  return { id, lessonId, prompt, correct, options: options.map(([id, text, feedback]) => ({ id, text, feedback })), explanation, hint, source };
}
export const advancedQuestions = [
  q('chain-001', 't01-e16', 'Deriva \\(e^{3x^2-x+2}\\).', 'chain',
    [['chain', '\\((6x-1)e^{3x^2-x+2}\\)', 'Se conserva la exponencial y se multiplica por la derivada interior.'], ['missing', '\\(e^{3x^2-x+2}\\)', 'Falta la derivada del exponente.'], ['interior', '\\(6x-1\\)', 'Has derivado solo el interior.'], ['exponent', '\\(e^{6x-1}\\)', 'No se deriva el exponente dentro de una exponencial nueva.']],
    'La exterior es la exponencial; el interior es un polinomio cuya derivada es 6x−1. La cadena multiplica ambos factores.', 'Identifica la derivada de cada capa.', 'Examen Límites y Derivadas.zip :: main.tex, 2(d)'),
  q('chain-002', 't01-e16', 'Deriva \\(\\ln(1+e^{x^2})\\).', 'layers',
    [['layers', '\\(2xe^{x^2}/(1+e^{x^2})\\)', 'Incluye las contribuciones del logaritmo, la exponencial y el cuadrado.'], ['missing', '\\(e^{x^2}/(1+e^{x^2})\\)', 'Falta el factor 2x.'], ['outer', '\\(1/(1+e^{x^2})\\)', 'Solo has derivado la capa exterior.'], ['cancel', '\\(2x\\)', 'No se puede cancelar la exponencial con una suma.']],
    'El logaritmo aporta el inverso de su argumento. La derivada del argumento es \\(2xe^{x^2}\\). La función está definida para todo x real.', 'Escribe la secuencia: cuadrado, exponencial, suma y logaritmo.'),
  q('chain-003', 't01-e16', '¿Cuál es el dominio de \\(x^2/\\sqrt{1+2\\ln x}\\)?', 'strict',
    [['strict', '\\(x>e^{-1/2}\\)', 'El argumento de la raíz debe ser estrictamente positivo porque está en el denominador.'], ['positive', '\\(x>0\\)', 'Esto permite el logaritmo, pero no garantiza una raíz positiva en el denominador.'], ['closed', '\\(x\\ge e^{-1/2}\\)', 'En el extremo el denominador vale cero.'], ['all', 'Todos los reales.', 'El logaritmo y el denominador imponen restricciones.']],
    'Se exige x>0 y \\(1+2\\ln x>0\\). Al despejar resulta \\(x>e^{-1/2}\\).', 'Comprueba primero el logaritmo y después la raíz del denominador.', 'Examen Límites y Derivadas.zip :: main.tex, 2(f); pregunta sobre dominio'),
  q('theorem-001', 't01-e17', 'Si una función no es continua en un punto interior a, ¿qué puedes concluir?', 'notdiff',
    [['notdiff', 'No es derivable en a.', 'Es la contraposición del teorema.'], ['diff', 'Puede tener una derivada finita en a.', 'Una derivada finita garantizaría continuidad.'], ['zero', 'Su derivada en a es cero.', 'No tener derivada no equivale a tener derivada cero.'], ['onlyjump', 'Solo se puede concluir si la discontinuidad es un salto.', 'El teorema también descarta derivabilidad en otros tipos de discontinuidad.']],
    'Si fuera derivable, sería continua. Como no lo es, tampoco puede ser derivable en ese punto.', 'Invierte y niega las dos proposiciones de la implicación.'),
  q('theorem-002', 't01-e17', 'Sea f(x)=x² si x≠0 y f(0)=1. ¿Qué sucede en 0?', 'isolated',
    [['isolated', 'Discontinuidad evitable y ausencia de derivada.', 'El límite es 0 y no coincide con el valor 1.'], ['smooth', 'Es derivable y su derivada es 0.', 'No puedes ignorar el valor puntual al formar el cociente incremental.'], ['corner', 'Es continua con una esquina.', 'El valor de la función no coincide con el límite.'], ['jump', 'Tiene un salto entre laterales.', 'Ambos límites laterales valen 0; la discontinuidad se debe al punto aislado.']],
    'El cociente incremental real es \\(h-1/h\\). No tiene límite finito; además, la falta de continuidad ya permitía descartar la derivabilidad.', 'Compara f(0) con los valores cercanos.'),
  q('theorem-003', 't01-e17', 'Si f es derivable en a, ¿qué está garantizado?', 'function',
    [['function', 'Que f sea continua en a.', 'Este es el teorema estudiado.'], ['derivative', 'Que f′ sea continua en a.', 'La derivada puede no ser continua aunque f sea derivable.'], ['positive', 'Que f′(a) sea positiva.', 'Una derivada puede ser negativa o cero.'], ['maximum', 'Que f tenga un máximo en a.', 'La derivabilidad no implica un extremo.']],
    'El teorema se refiere a la continuidad de la función f. No afirma continuidad de su función derivada ni un signo concreto.', 'Distingue f de f′.'),
  q('hopital-001', 't01-e18', 'Al calcular el límite de x/(x+1) cuando x tiende a 0, ¿qué método y resultado son correctos?', 'substitute',
    [['substitute', 'Sustituir directamente: el límite es 0.', 'Se obtiene 0/1, sin indeterminación.'], ['derive', 'Aplicar L’Hôpital: el límite es 1.', 'No se cumple la condición de forma indeterminada.'], ['none', 'No existe porque el numerador tiende a cero.', 'Un numerador que tiende a cero no impide un límite finito.'], ['infinity', 'El límite es infinito.', 'El denominador tiende a 1, no a cero.']],
    'L’Hôpital no es aplicable aquí. La continuidad del cociente permite sustituir y obtener 0.', 'Clasifica la forma antes de derivar.'),
  q('hopital-002', 't01-e18', 'Calcula \\(\\lim_{x\\to0}(e^x-1-x)/x^2\\).', 'half',
    [['half', '\\(1/2\\)', 'Tras dos aplicaciones justificadas se obtiene el límite de e elevado a x dividido por 2.'], ['zero', '0', 'La forma 0/0 no vale cero.'], ['one', '1', 'La segunda derivada del denominador es 2.'], ['none', 'No existe.', 'Los dos laterales conducen a 1/2.']],
    'La primera aplicación da \\((e^x-1)/(2x)\\), aún de forma 0/0. La segunda da \\(e^x/2\\), con límite 1/2. Las derivadas de los denominadores son no nulas en los entornos requeridos.', 'Repite solo después de comprobar la nueva forma.'),
  q('hopital-003', 't01-e18', 'En el límite del examen, \\((1-1/x^2)^x\\) cuando x tiende a más infinito, el logaritmo de la expresión tiende a 0. ¿Cuál es el límite de la expresión original?', 'one',
    [['one', '1', 'Hay que volver del logaritmo mediante la exponencial.'], ['zero', '0', 'Ese es el límite del logaritmo, no de la potencia.'], ['e', '\\(e\\)', 'Este resultado correspondería a un logaritmo con límite 1.'], ['infinity', '\\(+\\infty\\)', 'El exponente creciente por sí solo no determina el límite.']],
    'Para x>1 la base es positiva. Como el logaritmo tiende a 0, la expresión original tiende a \\(e^0=1\\).', 'Recuerda qué función deshace el logaritmo.', 'Examen Límites y Derivadas.zip :: main.tex, 3(d)'),
];
export const advancedCards = [
  { id: 'fc-chain-01', front: '¿Cómo se deriva F(g(x))?', back: '\\(F\\prime(g(x))g\\prime(x)\\), si g es derivable y F es derivable en el valor de g correspondiente.' },
  { id: 'fc-chain-02', front: '¿Por qué sin²x y sin(x²) se derivan de modo distinto?', back: 'En la primera la exterior es el cuadrado: deriva a 2 sin x cos x. En la segunda la exterior es el seno: deriva a 2x cos(x²), en radianes.' },
  { id: 'fc-chain-03', front: '¿Qué exige una raíz cuadrada en un denominador?', back: 'Que su radicando sea estrictamente positivo; cero haría nulo el denominador. Comprueba además cualquier logaritmo o restricción interior.' },
  { id: 'fc-theorem-01', front: '¿Por qué derivable implica continua?', back: 'El incremento de f es el cociente incremental multiplicado por h. Si el cociente tiene límite finito y h tiende a cero, el incremento tiende a cero.' },
  { id: 'fc-theorem-02', front: '¿Qué permite descartar inmediatamente la derivabilidad?', back: 'Una discontinuidad en el punto. La continuidad, en cambio, no basta para garantizar derivabilidad.' },
  { id: 'fc-theorem-03', front: '¿El teorema garantiza continuidad de f o de f′?', back: 'Garantiza continuidad de f. Una función derivable puede tener una derivada que no sea continua.' },
  { id: 'fc-hopital-01', front: '¿Qué se revisa antes de usar L’Hôpital?', back: 'Forma 0/0 o infinito/infinito, dominio, derivabilidad cerca del límite, denominador y su derivada no nulos allí, y existencia del límite del cociente de derivadas.' },
  { id: 'fc-hopital-02', front: '¿L’Hôpital calcula la derivada de un cociente?', back: 'No. Se derivan numerador y denominador por separado para formar otro cociente. La regla iguala límites bajo hipótesis, no las funciones.' },
  { id: 'fc-hopital-03', front: 'Si ln Y tiende a L, ¿cómo recuperas el límite de Y?', back: 'Con base positiva y L finito, Y tiende a exp(L). Si L=0, la potencia original tiende a 1.' },
];
