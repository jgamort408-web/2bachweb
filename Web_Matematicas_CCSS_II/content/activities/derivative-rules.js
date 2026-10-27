// Elaboración docente y adaptaciones: docs/procedencia-contenidos.md, entrega 05.
function q(id, lessonId, prompt, correct, options, explanation, hint, source = 'Elaboración propia a partir del guion 1.13–1.15') {
  return { id, lessonId, prompt, correct, options: options.map(([id, text, feedback]) => ({ id, text, feedback })), explanation, hint, source };
}
export const ruleQuestions = [
  q('tan-001', 't01-e13', '¿Cuál es la tangente a \\(f(x)=x^2\\) en x=1?', 'tangent',
    [['tangent', '\\(y=2x-1\\)', 'Pasa por (1,1) y tiene pendiente 2.'], ['origin', '\\(y=2x\\)', 'Tiene la pendiente correcta, pero no pasa por (1,1).'], ['point', '\\(y=x\\)', 'Pasa por el punto, pero su pendiente no es la derivada.'], ['normal', '\\(y=-x/2+3/2\\)', 'Esta es la normal, de pendiente −1/2.']],
    'La derivada en 1 es 2 y el punto es (1,1). La ecuación \\(y-1=2(x-1)\\) se reduce a \\(y=2x-1\\).', 'Necesitas tanto el punto como la pendiente.'),
  q('tan-002', 't01-e13', 'Si f(0)=3 y su derivada en 0 es cero, ¿cuál es la recta normal?', 'vertical',
    [['vertical', '\\(x=0\\)', 'La tangente es horizontal y la normal vertical.'], ['horizontal', '\\(y=3\\)', 'Esa es la tangente.'], ['minus', '\\(y=-x+3\\)', 'La pendiente normal no se obtiene cambiando cero por −1.'], ['none', 'No existe normal porque no se puede dividir por cero.', 'No tiene pendiente finita, pero la recta vertical sí existe.']],
    'La tangente es y=3. Su perpendicular por (0,3) es x=0. No hay que calcular −1/0.', 'Piensa en la perpendicular a una recta horizontal.'),
  q('tan-003', 't01-e13', 'En el examen, usando a=1 y b=−2, ¿cuáles son tangente y normal en x=2?', 'pair',
    [['pair', 'Tangente y=x−2; normal y=−x+2.', 'Ambas pasan por (2,0) y sus pendientes multiplican −1.'], ['reverse', 'Tangente y=−x+2; normal y=x−2.', 'Has intercambiado las pendientes.'], ['shift', 'Tangente y=x+2; normal y=−x−2.', 'Ninguna pasa por el punto (2,0).'], ['parallel', 'Tangente y=x−2; normal y=x+2.', 'Dos rectas con pendiente 1 son paralelas, no perpendiculares.']],
    'La rama es \\((x-2)/(x-1)\\). Da f(2)=0 y pendiente tangente 1; la normal tiene pendiente −1.', 'Usa la rama válida cerca de 2 y los parámetros del apartado 1(a).', 'Examen Límites y Derivadas.zip :: main.tex, 1(b–c), con parámetros de 1(a)'),
  q('table-001', 't01-e14', '¿Cuál es la derivada de \\(3^x\\)?', 'exponential',
    [['exponential', '\\(3^x\\ln3\\)', 'La variable aparece en el exponente.'], ['power', '\\(x3^{x-1}\\)', 'La regla de la potencia no corresponde a una base constante y exponente variable.'], ['cube', '\\(3x^2\\)', 'Esta es la derivada de x³.'], ['same', '\\(3^x\\)', 'Solo la base e tiene ln(base)=1.']],
    'Para una base constante A positiva, la derivada de A elevado a x es \\(A^x\\ln A\\). Con A=3 queda \\(3^x\\ln3\\).', 'Distingue 3 elevado a x de x elevado a 3.'),
  q('table-002', 't01-e14', 'Deriva \\(\\ln(2x+1)\\) e indica dónde es válida la derivada de esa función.', 'chain',
    [['chain', '\\(2/(2x+1)\\), para x>−1/2.', 'Se incluye la derivada interior y se conserva el dominio del logaritmo.'], ['missing', '\\(1/(2x+1)\\), para x>−1/2.', 'Falta multiplicar por la derivada de 2x+1.'], ['domain', '\\(2/(2x+1)\\), para todo x≠−1/2.', 'La expresión racional existe en más puntos que el logaritmo original.'], ['linear', '\\(2\\), para todo x.', 'Se ha derivado solo el interior, omitiendo el logaritmo.']],
    'La derivada interior es 2 y el logaritmo aporta el inverso de 2x+1. La función original exige \\(2x+1>0\\), es decir, x>−1/2.', 'Comprueba el argumento del logaritmo antes de derivar.'),
  q('table-003', 't01-e14', '¿Dónde tiene derivada finita la función \\(\\sqrt{x}\\)?', 'positive',
    [['positive', 'En x>0; su derivada es 1/(2√x).', 'En 0 el cociente incremental derecho diverge.'], ['nonnegative', 'En x≥0, incluida una derivada cero en 0.', 'La continuidad en el origen no implica una derivada finita allí.'], ['all', 'En todos los reales.', 'La raíz cuadrada real no está definida para x negativo.'], ['none', 'En ningún punto, por contener una raíz.', 'Las raíces sí se pueden derivar en el interior adecuado de su dominio.']],
    'Para x>0 se aplica la potencia de exponente 1/2. En 0, el cociente derecho es \\(1/\\sqrt{h}\\), que tiende a más infinito.', 'Separa el dominio de la función del de su derivada finita.'),
  q('rules-001', 't01-e15', 'Deriva \\(x^2e^x\\).', 'product',
    [['product', '\\(e^x(2x+x^2)\\)', 'La regla del producto suma dos contribuciones.'], ['multiply', '\\(2xe^x\\)', 'Has omitido el término que deriva el segundo factor.'], ['second', '\\(x^2e^x\\)', 'Has omitido el término que deriva el primer factor.'], ['sum', '\\(2x+e^x\\)', 'Esta sería la derivada de una suma, no del producto.']],
    'Con u=x² y v=e elevado a x, se obtiene \\(u\\prime v+uv\\prime\\). Los términos son \\(2xe^x\\) y \\(x^2e^x\\).', 'Conserva el factor que no estás derivando en cada término.'),
  q('rules-002', 't01-e15', 'Para x>0, ¿cuál es la derivada de \\((\\ln x)/x\\)?', 'quotient',
    [['quotient', '\\((1-\\ln x)/x^2\\)', 'El numerador es (1/x)x−(ln x)·1.'], ['reverse', '\\((\\ln x-1)/x^2\\)', 'Se ha invertido el orden de la resta.'], ['divide', '\\(1/x\\)', 'No se dividen las derivadas del numerador y denominador.'], ['denominator', '\\((1-\\ln x)/x\\)', 'El denominador debe quedar al cuadrado.']],
    'Aplicamos \\((u\\prime v-uv\\prime)/v^2\\). El numerador se simplifica a \\(1-\\ln x\\), y el denominador es x².', 'Escribe por separado u, v y sus derivadas.'),
  q('rules-003', 't01-e15', 'En el ejercicio del examen \\(f(x)=(x^3-4)/(x^2+4)^2\\), ¿cuánto vale su derivada en 1?', 'value',
    [['value', '\\(27/125\\)', 'El numerador simplificado vale 27 y el denominador 5³.'], ['missing', '\\(3/25\\)', 'Este resultado omite la derivada del denominador.'], ['sign', '\\(-27/125\\)', 'Revisa el orden de la resta del cociente.'], ['square', '\\(27/25\\)', 'Después de simplificar el denominador queda elevado a 3.']],
    'La derivada tiene numerador \\(-x^4+12x^2+16x\\) y denominador \\((x^2+4)^3\\). En 1, valen 27 y 125, respectivamente.', 'Usa el resultado del ejemplo resuelto y sustituye al final.', 'Examen Límites y Derivadas.zip :: main.tex, 2(c); ampliación con evaluación en 1'),
];
export const ruleCards = [
  { id: 'fc-tan-01', front: '¿Qué dos datos necesitas para escribir la tangente?', back: 'El punto (a,f(a)) y la pendiente f′(a). La ecuación es \\(y-f(a)=f\\prime(a)(x-a)\\), si la derivada existe y es finita.' },
  { id: 'fc-tan-02', front: '¿Qué pendiente tiene la normal si la tangente tiene pendiente m≠0?', back: 'La pendiente normal es −1/m. Ambas rectas pasan por el mismo punto de la curva.' },
  { id: 'fc-tan-03', front: '¿Cuál es la normal cuando la tangente es horizontal?', back: 'La recta vertical x=a. No tiene pendiente real finita y no se debe dividir por cero.' },
  { id: 'fc-table-01', front: '¿En qué se diferencian las derivadas de x³ y 3ˣ?', back: 'La primera es \\(3x^2\\); la segunda, \\(3^x\\ln3\\). Hay que identificar si varía la base o el exponente.' },
  { id: 'fc-table-02', front: '¿Ser continua la raíz cuadrada en 0 garantiza una derivada finita?', back: 'No. La derivada \\(1/(2\\sqrt{x})\\) vale para x>0. En 0, el cociente incremental derecho diverge.' },
  { id: 'fc-table-03', front: '¿Qué factor aparece al derivar una función con argumento u(x)?', back: 'La derivada interior u′(x). Por ejemplo, la derivada de e elevado a 3x es \\(3e^{3x}\\).' },
  { id: 'fc-rules-01', front: '¿Cómo se deriva un producto uv?', back: '\\((uv)\\prime=u\\prime v+uv\\prime\\). Se deriva un factor cada vez y se suman los dos términos.' },
  { id: 'fc-rules-02', front: '¿Cómo se deriva un cociente u/v?', back: '\\((u/v)\\prime=(u\\prime v-uv\\prime)/v^2\\), con v distinto de cero y ambas funciones derivables.' },
  { id: 'fc-rules-03', front: '¿Cancelar un factor permite derivar en un punto excluido del dominio original?', back: 'No. La derivada de la expresión simplificada solo corresponde a la función original donde esta existe.' },
];
