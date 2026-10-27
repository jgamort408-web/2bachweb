// Elaboración y adaptación docente; ver docs/procedencia-contenidos.md.
function q(id, lessonId, prompt, correct, options, explanation, hint, source = 'Elaboración propia a partir del guion 1.7–1.9') {
  return { id, lessonId, prompt, correct, options: options.map(([id, text, feedback]) => ({ id, text, feedback })), explanation, hint, source };
}
export const techniqueQuestions = [
  q('prop-001', 't01-e07', 'Si \\(f\\to3\\) y \\(g\\to2\\), ¿cuál es el límite de \\((f^2-g)/(f+g)\\)?', 'ratio',
    [['ratio', '\\(7/5\\)', 'El denominador tiene límite 5, distinto de cero.'], ['inverse', '\\(5/7\\)', 'Has invertido el cociente.'], ['seven', '7', 'Falta dividir por el límite del denominador.'], ['one', '1', 'Calcula por separado el numerador y el denominador.']],
    'El numerador tiende a \\(3^2-2=7\\) y el denominador a \\(3+2=5\\). La regla del cociente da \\(7/5\\).', 'Comprueba primero el límite del denominador.'),
  q('prop-002', 't01-e07', 'Si \\(f\\to L\\) y \\(g\\to M\\), con límites finitos, ¿qué condición adicional permite aplicar la regla \\(\\lim(f/g)=L/M\\)?', 'nonzero',
    [['nonzero', '\\(M\\ne0\\)', 'El denominador debe tener límite distinto de cero.'], ['positive', '\\(M>0\\) obligatoriamente', 'Un límite negativo no nulo también sirve.'], ['numerator', '\\(L\\ne0\\) obligatoriamente', 'El numerador puede tender a cero.'], ['equal', '\\(L=M\\)', 'Los límites no tienen que coincidir.']],
    'Se exige \\(M\\ne0\\). Si \\(M=0\\), esta regla no decide el resultado; hay que estudiar el cociente.', 'Distingue el papel del numerador y el denominador.'),
  q('prop-003', 't01-e07', 'Si \\(g(x)\\to L\\), ¿qué hipótesis basta para concluir \\(h(g(x))\\to h(L)\\)?', 'continuous',
    [['continuous', 'h es continua en L y g toma valores del dominio de h cerca del límite.', 'Estas condiciones permiten pasar el límite a través de h.'], ['defined', 'Solo que h(L) esté definido.', 'Estar definida no garantiza continuidad.'], ['zero', 'Solo que L sea cero.', 'El valor de L no elimina la necesidad de comprobar h.'], ['positive', 'Solo que g sea positiva.', 'El signo de g no asegura la continuidad de h.']],
    'La continuidad de la función exterior en L, junto con el dominio de la composición, justifica sustituir su argumento por el límite.', 'Piensa en una función exterior que tenga un salto en L.'),
  q('calc-001', 't01-e08', 'Calcula \\(\\lim_{x\\to2}(x^2+x-6)/(x-2)\\).', 'five',
    [['five', '5', 'El numerador es (x−2)(x+3).'], ['zero', '0', 'La forma 0/0 no es cero.'], ['two', '2', 'Después de cancelar queda x+3, no x.'], ['none', 'No existe.', 'El hueco no impide que haya un límite.']],
    'Para \\(x\\ne2\\), el cociente equivale a \\(x+3\\), cuyo límite es 5. El valor original en 2 sigue sin estar definido.', 'Factoriza el numerador y cancela un factor completo.'),
  q('calc-002', 't01-e08', 'Calcula \\(\\lim_{x\\to0}(1-\\sqrt{1-x^2})/x^2\\).', 'half',
    [['half', '\\(1/2\\)', 'Al racionalizar queda 1/(1+√(1−x²)).'], ['two', '2', 'Has invertido el resultado del cociente simplificado.'], ['zero', '0', 'La diferencia del numerador y el denominador tienden ambos a cero.'], ['none', 'No existe.', 'La racionalización da un límite finito por ambos lados.']],
    'Multiplica por \\(1+\\sqrt{1-x^2}\\). Para x distinto de cero, se cancela \\(x^2\\) y queda \\(1/(1+\\sqrt{1-x^2})\\), con límite \\(1/2\\).', 'Usa la identidad (a−b)(a+b)=a²−b².', 'Examen Límites y Derivadas.zip :: main.tex, 3(a); adaptación tipo test'),
  q('calc-003', 't01-e08', 'Sea \\(f(x)=(x^2-1)/(x-1)\\) si \\(x<1\\), y \\(f(x)=3-x\\) si \\(x\\ge1\\). ¿Cuál es su límite en 1?', 'two',
    [['two', '2', 'Los dos límites laterales coinciden.'], ['one', '1', 'Hay que evaluar las expresiones, no copiar el punto de aproximación.'], ['zero', '0', 'La rama izquierda se simplifica a x+1.'], ['none', 'No existe por el denominador de la primera rama.', 'Esa rama se usa para x<1 y puede tener límite aunque el cociente no se defina en 1.']],
    'Izquierda: el cociente equivale a \\(x+1\\) y tiende a 2. Derecha: \\(3-x\\) también tiende a 2. Por tanto, el límite bilateral es 2.', 'Estudia cada lado con su propia expresión.'),
  q('ind-001', 't01-e09', 'Calcula \\(\\lim_{x\\to4}\\big(7/(x-4)-(4x+12)/(x^2-4x)\\big)\\).', 'threequarters',
    [['threequarters', '\\(3/4\\)', 'El numerador común es 3x−12.'], ['zero', '0', 'Una diferencia de cantidades divergentes no vale necesariamente cero.'], ['sevenquarters', '\\(7/4\\)', 'No puedes omitir la segunda fracción.'], ['negative', '\\(-3/4\\)', 'Revisa 7x−(4x+12)=3x−12.']],
    'Para \\(x\\ne0,4\\), la diferencia equivale a \\(3(x-4)/(x(x-4))=3/x\\). El límite es \\(3/4\\).', 'Factoriza x²−4x y resta todo el segundo numerador.', 'Examen Límites y Derivadas.zip :: main.tex, 3(e); adaptación tipo test'),
  q('ind-002', 't01-e09', 'Calcula \\(\\lim_{x\\to+\\infty}(\\sqrt{x^2+3x}-x)\\).', 'threehalves',
    [['threehalves', '\\(3/2\\)', 'El conjugado elimina la diferencia de cantidades grandes.'], ['zero', '0', 'No puedes restar los infinitos como números iguales.'], ['infinity', '\\(+\\infty\\)', 'La diferencia puede tener límite finito aunque cada término diverja.'], ['three', '3', 'Después de racionalizar, el denominador normalizado tiende a 2, no a 1.']],
    'Para x positivo, racionaliza y divide por x: \\(3/(\\sqrt{1+3/x}+1)\\). El denominador tiende a 2 y el límite es \\(3/2\\).', 'Multiplica por el conjugado y usa que x es positivo cerca de más infinito.'),
  q('ind-003', 't01-e09', 'Cuando \\(x\\to+\\infty\\), ¿a qué tiende \\((e^{1/x})^x\\)?', 'e',
    [['e', '\\(e\\)', 'Las propiedades de potencias permiten simplificar exactamente.'], ['one', '1', 'Que la base tienda a 1 no basta si el exponente también varía.'], ['infinity', '\\(+\\infty\\)', 'No puedes considerar solo el crecimiento del exponente.'], ['zero', '0', 'La expresión es constantemente e para x positivo.']],
    'Como la base es positiva, \\((e^{1/x})^x=e^{(1/x)x}=e\\). La forma inicial \\(1^\\infty\\) no era un resultado.', 'Multiplica los exponentes antes de calcular el límite.'),
];
export const techniqueCards = [
  { id: 'fc-prop-01', front: '¿Qué exige la regla del cociente de límites finitos?', back: 'Que el límite del denominador sea distinto de cero. Puede ser positivo o negativo.' },
  { id: 'fc-prop-02', front: '¿Cuándo puedes usar \\(\\lim h(g(x))=h(L)\\) si \\(g\\to L\\)?', back: 'Si h es continua en L y la composición está definida cerca de la aproximación.' },
  { id: 'fc-prop-03', front: 'Si dos funciones no tienen límite, ¿su suma tampoco lo tiene?', back: 'No se puede concluir. Por ejemplo, 1/x y −1/x no tienen límite bilateral en 0, pero su suma tiene límite 0.' },
  { id: 'fc-calc-01', front: '¿Qué se cancela en una fracción algebraica?', back: 'Factores comunes de todo el numerador y denominador, cuando son distintos de cero. No se cancelan términos aislados de sumas.' },
  { id: 'fc-calc-02', front: '¿Por qué ayuda el conjugado de una diferencia de raíces?', back: 'Porque \\((a-b)(a+b)=a^2-b^2\\). Puede producir un factor cancelable sin las raíces originales.' },
  { id: 'fc-calc-03', front: '¿Simplificar un cociente añade el punto excluido al dominio?', back: 'No. La igualdad cerca del punto permite calcular el límite, pero no cambia el dominio de la expresión original.' },
  { id: 'fc-ind-01', front: '¿Cómo se resta una fracción al reducir a común denominador?', back: 'El signo menos afecta a todo el segundo numerador. Usa paréntesis: \\(7x-(4x+12)=3x-12\\).' },
  { id: 'fc-ind-02', front: '¿Qué puedes intentar ante \\(0\\cdot\\infty\\)?', back: 'Reescribir como cociente si los factores lo permiten en el entorno. Después se vuelve a clasificar la forma.' },
  { id: 'fc-ind-03', front: '¿Cómo estudiar una potencia de base positiva variable?', back: 'Puedes escribir \\(u^v=\\exp(v\\ln u)\\), estudiar el exponente y volver con la exponencial. También conviene buscar simplificaciones exactas.' },
];
