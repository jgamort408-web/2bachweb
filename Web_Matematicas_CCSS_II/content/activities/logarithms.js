const tex = String.raw;
const q = (id, prompt, choices, explanation, hint) => ({
  id: 'log-' + id, lessonId: 't02-e05', topicId: 't02', prompt, correct: 'right',
  options: choices.map(([text, feedback], i) => ({ id: i ? 'wrong-' + i : 'right', text, feedback })),
  explanation, hint, source: 'Guion 2.5; T2.3 adaptada en log-01; ampliaciones propias',
});
export const logarithmicQuestions = [
  q('01', tex`¿Cuál es el dominio real de \(f(x)=\ln x\)?`, [
    [tex`\((0,+\infty)\)`, 'El argumento del logaritmo debe ser estrictamente positivo.'],
    [tex`\([0,+\infty)\)`, 'ln(0) no existe como número real.'],
    [tex`\(\mathbb R\)`, 'No admite argumentos negativos ni cero.'],
    [tex`\(\mathbb R\setminus\{0\}\)`, 'También están excluidos todos los negativos.']],
    tex`\(\ln x=y\) equivale a \(e^y=x\); una exponencial siempre es positiva.`, 'Piensa qué valores puede tomar una exponencial.'),
  q('02', tex`¿Cuánto vale \(\log_{1/2}4\)?`, [
    ['−2.', 'Elevar 1/2 a −2 da 4.'], ['2.', 'Elevar 1/2 a 2 da 1/4.'],
    ['−4.', 'Elevar 1/2 a −4 da 16.'], ['No existe porque la base es menor que 1.', 'Una base entre 0 y 1 sí es válida.']],
    tex`\((1/2)^{-2}=4\), por tanto \(\log_{1/2}4=-2\).`, 'Convierte el logaritmo en una potencia.'),
  q('03', tex`¿Qué dominio y asíntota vertical tiene \(g(x)=\log_2(x-1)-1\)?`, [
    [tex`Dominio \((1,+\infty)\); vertical x=1.`, 'El argumento x−1 debe ser positivo.'],
    [tex`Dominio \((0,+\infty)\); vertical x=0.`, 'El desplazamiento dentro del argumento mueve el dominio.'],
    [tex`Dominio \([1,+\infty)\); vertical x=1.`, 'El punto 1 está excluido.'],
    [tex`Dominio \((1,+\infty)\); horizontal y=−1.`, 'Restar 1 no convierte la asíntota vertical en horizontal.']],
    tex`x−1>0 exige x>1. Al acercarse a 1 por la derecha, g tiende a −∞.`, 'Resuelve la desigualdad del argumento antes de estudiar límites.'),
  q('04', tex`¿Qué solución real tiene \(\log_2(x-1)+\log_2(x-3)=3\)?`, [
    ['Solo x=5.', 'Satisface x>3 y convierte el producto de argumentos en 8.'],
    ['x=5 y x=−1.', '−1 surge al resolver la ecuación cuadrática, pero sus argumentos son negativos.'],
    ['Solo x=−1.', 'Los logaritmos originales no existen en −1.'],
    ['x=4.', 'En 4 la suma es log₂3, no 3.']],
    tex`El dominio exige x>3. \((x-1)(x-3)=8\) da \(x^2-4x-5=0\), con candidatos 5 y −1; solo 5 es admisible.`,
    'Fija primero el dominio de cada logaritmo; después suma usando el producto.'),
  q('05', 'Una cantidad crece un 5 % al final de cada año. ¿En qué año completo alcanza o supera por primera vez el doble?', [
    ['En el año 15.', 'El umbral continuo está entre 14 y 15 años.'],
    ['En el año 14.', 'Con 14 periodos, el factor aún es menor que 2.'],
    ['En el año 20.', 'Eso corresponde a sumar un 5 % del valor inicial cada año.'],
    ['En el año 2.', 'Duplicar la cantidad no significa esperar dos periodos.']],
    tex`\(1{,}05^t\ge2\) exige \(t\ge\ln2/\ln1{,}05\approx14{,}207\). Como contamos años completos, el primero es 15.`,
    'Aplica logaritmos y elige el primer entero que cumple la desigualdad.'),
  q('06', tex`Para \(A(q)=100\ln(1+q)\), q≥0, ¿qué significan \(A\prime(q)>0\) y \(A\prime\prime(q)<0\)?`, [
    ['El índice aumenta, pero cada incremento igual de q aporta menos puntos adicionales.', 'La función crece y su pendiente disminuye.'],
    ['El índice disminuye.', 'Una segunda derivada negativa no implica una primera derivada negativa.'],
    ['El índice tiene un máximo en q=0.', 'Aumenta para todo q≥0.'],
    ['Cada incremento igual de q aporta los mismos puntos.', 'Eso describiría un modelo lineal.']],
    tex`\(A\prime(q)=100/(1+q)>0\) y \(A\prime\prime(q)=-100/(1+q)^2<0\). Hay rendimientos marginales decrecientes, sin máximo en este dominio.`,
    'Distingue el signo de la pendiente de cómo cambia esa pendiente.'),
];
export const logarithmicCards = [
  { id: 'fc-log-01', front: tex`¿Qué significa \(\log_a x=y\)?`, back: tex`Significa \(a^y=x\), con a>0, a≠1 y x>0. El logaritmo devuelve un exponente; es la inversa de la exponencial de la misma base.` },
  { id: 'fc-log-02', front: tex`¿Qué dominio, recorrido y cortes tiene \(\log_a x\)?`, back: tex`Dominio \((0,+\infty)\), recorrido \(\mathbb R\), corte con X en (1,0). No corta Y porque x=0 está excluido. Tiene asíntota vertical x=0.` },
  { id: 'fc-log-03', front: '¿Cómo depende la monotonía del logaritmo de su base?', back: 'Crece si a>1 y decrece si 0<a<1. En x=1 vale 0. Para a>1, es negativo entre 0 y 1 y positivo por encima de 1; con base menor que 1 se invierten esos signos.' },
  { id: 'fc-log-04', front: '¿Qué condiciones acompañan a las propiedades de los logaritmos?', back: tex`Para u,v>0 y una misma base válida: \(\log_a(uv)=\log_a u+\log_a v\), \(\log_a(u/v)=\log_a u-\log_a v\) y \(\log_a(u^r)=r\log_a u\). No hay una regla análoga que separe una suma u+v.` },
  { id: 'fc-log-05', front: tex`¿Cómo se calcula un logaritmo de base a con ln?`, back: tex`\(\log_a x=\ln x/\ln a\), para x>0 y a>0, a≠1. ln usa base e; en esta lección log sin subíndice usa base 10.` },
  { id: 'fc-log-06', front: '¿Cómo resuelves una ecuación logarítmica sin aceptar soluciones falsas?', back: 'Exige que cada argumento original sea positivo; aplica propiedades y resuelve; comprueba los candidatos en el dominio y en la ecuación inicial. Un producto positivo no garantiza que sus dos factores sean positivos.' },
].map(card => ({ ...card, topicId: 't02', lessonId: 't02-e05' }));
