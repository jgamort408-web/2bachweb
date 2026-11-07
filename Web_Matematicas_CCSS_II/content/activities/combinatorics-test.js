// Fuente: Página web existente/Combinatoria.txt, juego «El Reto del Probabilista» (diez preguntas).
// Se conservan enunciados, alternativas y respuestas; se precisan la equiprobabilidad (preguntas 5 y 9) y la
// lectura de «combinaciones» de una cerradura (pregunta 2). Las cifras usan espacio fino para los millares.
// Correspondencia y correcciones: docs/auditoria-reutilizacion-combinatoria.md.
const wrong = 'Esa cifra corresponde a otro recuento.';
const q = (index, item) => ({ id: 'q-combinatorics-original-' + String(index).padStart(2, '0'), topicId: 'combinatorics', lessonId: 'combinatorics', sourceIndex: index, ...item });

export const combinatoricsQuestions = [
  q(1, {
    category: 'Variaciones sin repetición',
    prompt: '¿De cuántas formas pueden elegirse presidente, vicepresidente y secretario de un grupo de 10 personas?',
    options: [
      { id: 'a', text: '720', feedback: 'Correcto: tres cargos distintos para tres personas distintas.' },
      { id: 'b', text: '5040', feedback: wrong + ' Es V(10,4): habría cuatro cargos.' },
      { id: 'c', text: '90', feedback: wrong + ' Es V(10,2): solo se cubrirían dos cargos.' },
      { id: 'd', text: '3 628 800', feedback: wrong + ' Es 10!: ordenaría a las diez personas.' }
    ],
    correct: 'a',
    hint: 'Los cargos son distintos y nadie puede ocupar dos: ¿importa el orden?, ¿hay repetición?',
    explanation: '\\(V(10,3)=10\\cdot9\\cdot8=720\\). El orden importa porque los cargos son distintos, y no hay repetición.'
  }),
  q(2, {
    category: 'Variaciones con repetición',
    prompt: 'Una cerradura tiene 3 diales con los dígitos del 0 al 9. ¿Cuántas claves distintas hay?',
    options: [
      { id: 'a', text: '1000', feedback: 'Correcto: cada dial admite los diez dígitos.' },
      { id: 'b', text: '720', feedback: wrong + ' Es V(10,3): exigiría que los tres dígitos fueran distintos.' },
      { id: 'c', text: '30', feedback: 'Las opciones de cada dial se multiplican, no se suman ni se multiplican por el número de diales.' },
      { id: 'd', text: '100', feedback: wrong + ' Es 10²: correspondería a dos diales.' }
    ],
    correct: 'a',
    hint: 'Una clave como 7-7-2 es válida y es distinta de 2-7-7.',
    explanation: '\\(VR(10,3)=10^3=1000\\). Aunque coloquialmente se hable de «combinaciones» de una cerradura, el orden de los dígitos importa y se pueden repetir.'
  }),
  q(3, {
    category: 'Combinaciones',
    prompt: 'Se reparte una mano de 5 cartas de una baraja de 52. ¿Cuántas manos distintas existen?',
    options: [
      { id: 'a', text: '2 598 960', feedback: 'Correcto: una mano es un grupo de cartas, sin orden.' },
      { id: 'b', text: '311 875 200', feedback: wrong + ' Es V(52,5): contaría cada orden de reparto como una mano distinta.' },
      { id: 'c', text: '52', feedback: 'Ese es el número de cartas de la baraja, no el de manos.' },
      { id: 'd', text: '120', feedback: wrong + ' Es 5!: las formas de ordenar una mano ya elegida.' }
    ],
    correct: 'a',
    hint: 'Recibir las mismas cinco cartas en otro orden da la misma mano.',
    explanation: '\\(C(52,5)=\\dfrac{52!}{5!\\cdot47!}=2\\,598\\,960\\). El orden de las cartas en la mano no importa: \\(V(52,5)\\) cuenta cada mano \\(5!=120\\) veces.'
  }),
  q(4, {
    category: 'Permutaciones',
    prompt: '¿De cuántas formas pueden ordenarse 7 libros distintos en una estantería?',
    options: [
      { id: 'a', text: '5040', feedback: 'Correcto: se ordenan los siete libros.' },
      { id: 'b', text: '720', feedback: wrong + ' Es 6!: faltaría un libro.' },
      { id: 'c', text: '49', feedback: 'Es 7²; en una ordenación las opciones disminuyen en cada posición.' },
      { id: 'd', text: '2520', feedback: wrong + ' Es 7!/2: se dividiría como si dos libros fueran iguales.' }
    ],
    correct: 'a',
    hint: 'Se colocan todos los libros y el orden importa.',
    explanation: '\\(P_7=7!=5040\\). Se usan todos los elementos y el orden importa.'
  }),
  q(5, {
    category: 'Probabilidad',
    prompt: 'Se lanza una moneda equilibrada 3 veces. ¿Cuál es la probabilidad de obtener exactamente 2 caras?',
    options: [
      { id: 'a', text: '\\(\\frac{3}{8}\\)', feedback: 'Correcto: 3 secuencias favorables de 8 igual de probables.' },
      { id: 'b', text: '\\(\\frac{1}{2}\\)', feedback: 'La mitad de las secuencias no tiene exactamente dos caras: cuenta las favorables.' },
      { id: 'c', text: '\\(\\frac{1}{4}\\)', feedback: 'Hay tres secuencias favorables (C es cara y X, cruz): CCX, CXC y XCC.' },
      { id: 'd', text: '\\(\\frac{3}{4}\\)', feedback: 'Ese valor incluiría secuencias con una o con tres caras.' }
    ],
    correct: 'a',
    hint: 'Cuenta las secuencias de tres lanzamientos y elige en qué dos lanzamientos sale cara.',
    explanation: 'Casos posibles: \\(VR(2,3)=2^3=8\\) secuencias igual de probables. Favorables: \\(C(3,2)=3\\) (las posiciones de las dos caras). Luego \\(P=\\tfrac{3}{8}\\).'
  }),
  q(6, {
    category: 'Variaciones sin repetición',
    prompt: 'Un fotógrafo quiere fotografiar en fila a 4 personas de un grupo de 9. ¿Cuántas fotos distintas puede hacer?',
    options: [
      { id: 'a', text: '3024', feedback: 'Correcto: se eligen 4 personas y su orden en la fila.' },
      { id: 'b', text: '126', feedback: wrong + ' Es C(9,4): olvida que el orden de la fila cambia la foto.' },
      { id: 'c', text: '362 880', feedback: wrong + ' Es 9!: pondría a las nueve personas en la fila.' },
      { id: 'd', text: '3 628 800', feedback: wrong + ' Es 10!: no corresponde a este grupo.' }
    ],
    correct: 'a',
    hint: 'Elegir y colocar 4 de 9: cada posición de la fila cuenta.',
    explanation: '\\(V(9,4)=9\\cdot8\\cdot7\\cdot6=3024\\). La posición en la fila importa.'
  }),
  q(7, {
    category: 'Combinaciones',
    prompt: '¿Cuántos subconjuntos de 3 vocales pueden formarse con las 5 vocales del español?',
    options: [
      { id: 'a', text: '10', feedback: 'Correcto: un subconjunto no tiene orden.' },
      { id: 'b', text: '60', feedback: wrong + ' Es V(5,3): contaría {a, e, i} y {i, e, a} como distintos.' },
      { id: 'c', text: '20', feedback: 'Es el doble del resultado: revisa la división entre 3!.' },
      { id: 'd', text: '120', feedback: wrong + ' Es 5!: ordenaría las cinco vocales.' }
    ],
    correct: 'a',
    hint: 'En un conjunto, {a, e, i} y {i, e, a} son el mismo.',
    explanation: '\\(C(5,3)=\\dfrac{5!}{3!\\cdot2!}=10\\). Los subconjuntos no tienen orden.'
  }),
  q(8, {
    category: 'Variaciones con repetición',
    prompt: '¿Cuántas señales de 2 banderas colocadas en orden pueden hacerse con 4 colores si se puede repetir color?',
    options: [
      { id: 'a', text: '16', feedback: 'Correcto: 4 opciones para cada bandera.' },
      { id: 'b', text: '12', feedback: wrong + ' Es V(4,2): no permite repetir color.' },
      { id: 'c', text: '6', feedback: wrong + ' Es C(4,2): sin orden y sin repetición.' },
      { id: 'd', text: '8', feedback: 'Las opciones de cada bandera se multiplican: 4·4, no 4·2.' }
    ],
    correct: 'a',
    hint: 'Cada bandera tiene 4 colores posibles, independientemente de la otra.',
    explanation: '\\(VR(4,2)=4^2=16\\). Cada posición tiene 4 opciones independientes.'
  }),
  q(9, {
    category: 'Probabilidad',
    prompt: 'Se forma al azar una ordenación de las letras A, B, C y D, sin repetir y con todas las ordenaciones igual de probables. ¿Cuál es la probabilidad de que empiece por A?',
    options: [
      { id: 'a', text: '\\(\\frac{1}{4}\\)', feedback: 'Correcto: 6 ordenaciones favorables de 24.' },
      { id: 'b', text: '\\(\\frac{1}{24}\\)', feedback: 'Esa sería la probabilidad de una ordenación concreta, no de todas las que empiezan por A.' },
      { id: 'c', text: '\\(\\frac{1}{3}\\)', feedback: 'Hay cuatro letras posibles para la primera posición, no tres.' },
      { id: 'd', text: '\\(\\frac{3}{4}\\)', feedback: 'Esa es la probabilidad de que no empiece por A.' }
    ],
    correct: 'a',
    hint: 'Fija la A en la primera posición y ordena las otras tres.',
    explanation: 'Casos posibles: \\(P_4=24\\). Favorables (A fija): \\(P_3=6\\). Luego \\(P=\\tfrac{6}{24}=\\tfrac{1}{4}\\).'
  }),
  q(10, {
    category: 'Permutaciones',
    prompt: '¿Cuántas ordenaciones distintas tienen las letras de la palabra ANNA?',
    options: [
      { id: 'a', text: '6', feedback: 'Correcto: se descuentan las repeticiones de la A y de la N.' },
      { id: 'b', text: '24', feedback: wrong + ' Es 4!: trataría las dos A y las dos N como letras distintas.' },
      { id: 'c', text: '12', feedback: 'Solo se ha descontado una de las dos letras repetidas.' },
      { id: 'd', text: '4', feedback: 'Hay más: AANN, ANAN, ANNA, NAAN, NANA y NNAA.' }
    ],
    correct: 'a',
    hint: 'Hay 4 letras: la A aparece 2 veces y la N, otras 2.',
    explanation: '\\(P_4^{(2,2)}=\\dfrac{4!}{2!\\cdot2!}=\\dfrac{24}{4}=6\\): AANN, ANAN, ANNA, NAAN, NANA y NNAA.'
  })
];
