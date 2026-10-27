// Repaso transversal: seis preguntas base, no variantes del generador.
function q(id, lessonIds, prompt, correct, options, explanation, hint, source) {
  return { id, lessonId: 't01-review', lessonIds, prompt, correct,
    options: options.map(([id,text,feedback])=>({id,text,feedback})), explanation, hint, source };
}
export const reviewQuestions = [
  q('review-001',['t01-e04','t01-e10'],'Sea \\(f(x)=(x-2)^2\\) si \\(x<2\\), y \\(f(x)=1/(x-1)\\) si \\(x\\geq2\\). ¿Hay una asíntota vertical en \\(x=1\\)?','no',
    [['no','No: cerca de 1 se usa el polinomio y el límite es 1.','La rama racional no se aplica cerca de 1.'],['yes','Sí: aparece x−1 en un denominador.','Comprueba primero dónde se usa ese denominador.'],['jump','Sí: cualquier salto es una asíntota vertical.','Un salto entre límites finitos no es una divergencia infinita.'],['undefined','No se puede estudiar porque f(1) no está definida.','La primera rama incluye x=1.']],
    'En un entorno de 1, \\(f(x)=(x-2)^2\\). Por continuidad del polinomio, el límite es 1. En \\(x=2\\) hay un salto de 0 a 1, pero tampoco una asíntota vertical.',
    'Elige la rama válida cerca del punto antes de buscar ceros de denominadores.',
    'Elaboración propia sobre el error M01 del inventario; función adaptada'),
  q('review-002',['t01-e11','t01-e17'],'¿Qué hipótesis permite concluir que una función es estrictamente creciente en todo un intervalo abierto I?','interval',
    [['interval','Es derivable y \\(f\\prime(x)>0\\) en todos los puntos de I.','La condición se exige en el intervalo completo.'],['point','Su derivada es positiva en un solo punto de I.','Un dato puntual no describe todo el intervalo.'],['value','La función es positiva en I.','El signo de la función no es el de su derivada.'],['continuous','La función es continua en I.','Una función continua puede decrecer o cambiar de sentido.']],
    'La positividad de la derivada en todo I garantiza crecimiento estricto. No basta saber el signo de f ni el de una única derivada puntual.',
    'Distingue un dato local en un punto de una condición sobre el intervalo.',
    'Adaptación corregida de 03_Tests_2Bach_CC_Sociales.md, T1.5; incidencia M09'),
  q('review-003',['t01-e01','t01-e05'],'La distancia \\(D(t)=100/(t^2+1)\\), para \\(t\\geq0\\), tiende a cero. ¿Qué permite afirmar este modelo?','asymptotic',
    [['asymptotic','La distancia se aproxima a cero, pero no es cero en ningún tiempo finito.','El numerador es positivo y el denominador finito también.'],['land','El objeto llega necesariamente a distancia cero en alguna hora finita.','Un límite no garantiza que el valor se alcance.'],['two','La distancia es cero a las dos horas.','D(2)=100/5=20, no cero.'],['impossible','No puede tener límite cero porque D(t)>0.','Una función positiva puede aproximarse a cero.']],
    '\\(D(0)=100\\) y \\(D(2)=20\\), en miles de kilómetros. Para cada t finito admisible, \\(D(t)>0\\). El límite cero describe aproximación asintótica; no proporciona un instante de aterrizaje.',
    'Comprueba si el numerador puede anularse para un tiempo finito.',
    'Examen Límites y Derivadas.zip, main.tex, 4; contraste con Ejercicios repaso.zip, EXAMEN 1, 4; M13'),
  q('review-004',['t01-e10','t01-e12'],'Sea \\(f(x)=a/(x-1)\\) si \\(x<0\\), y \\(f(x)=x^2-bx-1\\) si \\(x\\geq0\\). ¿Qué parámetros la hacen derivable en 0?','both',
    [['both','\\(a=1,\\ b=1\\).','La continuidad exige \\(a=1\\) y las pendientes son \\(-a\\) y \\(-b\\).'],['wrongsource','\\(a=1,\\ b=-1\\).','Ese resultado corresponde a otra rama: \\(a(x-1)\\), no \\(a/(x-1)\\).'],['negative','\\(a=-1,\\ b=-1\\).','El límite izquierdo sería 1, pero \\(f(0)=-1\\).'],['any','\\(a=1\\) y cualquier b.','La continuidad no basta; falta igualar las derivadas laterales.']],
    'Continuidad: \\(-a=-1\\), luego \\(a=1\\). La derivada de la rama racional es \\(-a/(x-1)^2\\) y tiende a \\(-1\\). La rama derecha tiene pendiente \\(-b\\) en 0; por tanto \\(b=1\\).',
    'Respeta la fracción del enunciado y comprueba continuidad antes de derivabilidad.',
    'Subida de nota T1 General.zip, main.tex, 1(a); M06, solución recalculada desde el enunciado'),
  q('review-005',['t01-e13','t01-e15'],'En un examen, la rama para \\(x>1\\) es \\(f(x)=2x^2+b\\). Este apartado fija \\(b=-2\\). ¿Cuál es la tangente en \\(x=2\\)?','tangent',
    [['tangent','\\(y=8x-10\\).','El punto es \\((2,6)\\) y la pendiente es 8.'],['old','\\(y=8x-3\\).','Este resultado usaría \\(b=5\\), un parámetro distinto del indicado aquí.'],['vertical','\\(x=2\\).','Esa vertical no tiene la pendiente tangente 8.'],['point','\\(y=6x-4\\).','El valor \\(f(2)=6\\) no es la pendiente.']],
    'Con el b de este apartado, \\(f(2)=6\\) y \\(f\\prime(2)=8\\). La ecuación \\(y-6=8(x-2)\\) da \\(y=8x-10\\). Hay que respetar los parámetros que fija cada apartado.',
    'Calcula por separado el punto y la pendiente usando b=−2.',
    'Recuperación T1.zip, main.tex, 1(b); contraste con incidencia M08'),
  q('review-006',['t01-e09','t01-e18'],'Para calcular \\(\\lim_{x\\to0^+}x\\ln x\\), ¿qué procedimiento es válido?','transform',
    [['transform','Escribir \\(\\ln x\\) dividido por \\(1/x\\) y aplicar L’Hôpital; el límite es 0.','Se transforma en una forma \\(-\\infty/+\\infty\\) con las hipótesis adecuadas.'],['product','Derivar directamente cada factor y multiplicar; el límite es 1.','L’Hôpital no se aplica a un producto de ese modo.'],['substitute','Sustituir \\(\\ln0\\) y multiplicar por cero.','El logaritmo no está definido en 0.'],['infinite','Concluir \\(-\\infty\\) porque \\(\\ln x\\) tiende a \\(-\\infty\\).','También varía el factor x: la forma inicial es indeterminada.']],
    'En \\(x>0\\), \\(\\ln x\\) dividido por \\(1/x\\) equivale al producto. El cociente de derivadas es \\(-x\\), con límite 0. Cerca del origen los valores del producto son negativos.',
    'Convierte la forma 0·∞ en un cociente antes de elegir la regla.',
    'Guion 1.9 y 1.18; elaboración propia sobre el ejemplo desarrollado'),
];

// Conceptos detectados al contrastar las 24 entradas del mazo original.
export const reviewCards = [
  {id:'fc-review-01',front:'¿Qué define una asíntota horizontal?',back:'La recta \\(y=L\\), con L finito, cuando \\(\\lim_{x\\to+\\infty}f(x)=L\\) o \\(\\lim_{x\\to-\\infty}f(x)=L\\). Los dos extremos pueden tener asíntotas distintas.'},
  {id:'fc-review-02',front:'¿Cuáles son las siete formas indeterminadas habituales?',back:'\\(0/0,\\ \\infty/\\infty,\\ \\infty-\\infty,\\ 0\\cdot\\infty,\\ 1^\\infty,\\ 0^0,\\ \\infty^0\\). Describen límites de partes; no son resultados ni operaciones con números infinitos. Hay que transformar o estudiar la expresión.'},
  {id:'fc-review-03',front:'¿Cómo distingues discontinuidad evitable, salto finito e infinita?',back:'Evitable: límite finito, pero valor ausente o distinto. Salto finito: laterales finitos distintos. Infinita: algún lateral diverge a infinito. También existen otros comportamientos, como la oscilación sin límite.'},
  {id:'fc-review-04',front:'¿Qué mide la tasa de variación media entre a y b?',back:'\\(\\dfrac{f(b)-f(a)}{b-a}\\), con \\(a\\ne b\\). Es la pendiente de la secante y el cambio medio de la salida por unidad de entrada; no es necesariamente la derivada en a o en b.'},
  {id:'fc-review-05',front:'¿Qué permite concluir el signo de la derivada en todo un intervalo abierto?',back:'Si f es derivable y \\(f\\prime(x)>0\\) en todo el intervalo, es estrictamente creciente; si \\(f\\prime(x)<0\\), estrictamente decreciente. Un signo en un único punto no basta para describir todo el intervalo.'},
];
