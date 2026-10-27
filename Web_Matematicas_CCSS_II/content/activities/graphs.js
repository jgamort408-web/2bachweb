
const tex=String.raw;
const q=(n,prompt,choices,explanation,hint)=>({id:'graph-'+n,topicId:'t04',lessonId:'t04-e12',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source:'Elaboración propia; guion 4.12 y test T4.8'});
export const graphQuestions=[
 q('01','En un grafo simple no dirigido, ¿qué cumple siempre su matriz de adyacencia?',[
 ['Es simétrica y tiene diagonal cero.','Cada arista aparece en ambos sentidos y no hay lazos.'],
 ['Toda entrada de la diagonal vale 1.','Sin lazos, ninguna conexión une un vértice consigo mismo.'],
 ['Tiene que ser invertible.','La invertibilidad no define la adyacencia; una red vacía tiene matriz nula.'],
 ['La suma de cada fila es siempre 2.','El grado depende de los vecinos de ese vértice.']],
 'En el mismo orden de vértices, aᵢⱼ=aⱼᵢ. La ausencia de lazos hace que aᵢᵢ=0.','Piensa cómo se anota una arista A—B.'),
 q('02','En una red dirigida, usamos filas de origen y columnas de destino. ¿Qué significa a₂₃=1?',[
 ['Existe un arco del vértice 2 al 3.','La fila indica de dónde sales.'],
 ['Existe un arco del 3 al 2 necesariamente.','Ese arco se consultaría en a₃₂.'],
 ['Hay tres recorridos de dos pasos.','Una entrada de A indica una conexión directa, no ese recuento.'],
 ['El vértice 2 tiene grado de salida 3.','Para saberlo hay que sumar toda la fila 2.']],
 'El sentido se lee de la fila a la columna. El arco inverso puede existir o no.','Lee primero la fila y después la columna.'),
 q('03','Un grafo simple no dirigido tiene grados 1, 2, 2, 1. ¿Cuántas aristas tiene?',[
 ['3','La suma 6 cuenta cada arista en dos extremos.'],
 ['6','Estás contando cada arista dos veces.'],
 ['4','Ese es el número de vértices.'],
 ['2','No basta con mirar el grado mayor.']],
 'La suma de grados es 6=2|E|, así que hay 3 aristas.','Cada arista aporta uno al grado de cada extremo.'),
 q('04','En la cadena A—B—C—D, ¿cuántos recorridos de exactamente dos pasos van de B a B?',[
 ['2: B→A→B y B→C→B.','Se permite repetir B y volver por la misma arista.'],
 ['0, porque no hay lazos.','Dos pasos de ida y vuelta no necesitan un lazo.'],
 ['1, porque solo cuenta quedarse en B.','Quedarse es un recorrido de cero pasos, no de dos.'],
 ['3, porque la red tiene tres aristas.','La arista C—D no permite regresar a B en dos pasos.']],
 'La entrada de fila B y columna B de A² vale 2. Aquí coincide con el grado de B.','Elige un vecino de B y vuelve.'),
 q('05',tex`Si \((A^2)_{14}=0\), ¿qué puedes concluir?`,[
 ['No hay recorridos de exactamente dos pasos del vértice 1 al 4.','La potencia fija una longitud concreta.'],
 ['No hay ninguna ruta entre esos vértices.','Puede haber recorridos de tres pasos u otra longitud.'],
 ['La distancia física entre ambos es cero.','La matriz binaria no contiene distancias físicas.'],
 ['Hay un único recorrido de longitud cero entre ellos.','Son vértices distintos: A⁰ tiene cero en esa posición.']],
 'La cadena A—B—C—D da un contraejemplo a la desconexión: de A a D hay un recorrido de tres pasos, aunque no de dos.','Distingue «exactamente dos» de «cualquier longitud».'),
 q('06','D es un vértice aislado. ¿Cuánto vale la entrada (D,D) de A⁰?',[
 ['1, por el recorrido de cero pasos que permanece en D.','A⁰ es la identidad, incluso con un vértice aislado.'],
 ['0, porque D está aislado.','Eso vale para sus recorridos de longitud positiva, no para cero pasos.'],
 ['El número total de aristas.','A⁰ no cuenta aristas.'],
 ['No existe A⁰ si A no es invertible.','La potencia de exponente cero está definida para toda matriz cuadrada.']],
 'A⁰=I cuenta un recorrido vacío en cada vértice. No indica que D tenga un lazo.','Recuerda la potencia de exponente cero.')
];
export const graphCards=[
 {id:'fc-graph-01',front:'¿Qué representan los vértices y las aristas?',back:'Los vértices representan los elementos de una red y las aristas, conexiones sin orientación. Los arcos de una red dirigida sí tienen sentido. Aquí no hay lazos ni conexiones múltiples.'},
 {id:'fc-graph-02',front:'¿Cómo construyes la matriz de adyacencia?',back:'Fija el mismo orden de vértices en filas y columnas. Escribe 1 si existe conexión de la fila de origen a la columna de destino y 0 si no existe. Sin lazos, la diagonal es cero.'},
 {id:'fc-graph-03',front:'¿Cómo reconoces la simetría y cuentas aristas?',back:'En un grafo simple no dirigido, A es simétrica. Las sumas de las filas son los grados y su suma es el doble del número de aristas. En redes dirigidas no se divide entre dos el número total de unos.'},
 {id:'fc-graph-04',front:'¿Qué cuenta una entrada de Aᵏ?',back:'Recorridos de exactamente k pasos del vértice de la fila al de la columna. Se pueden repetir vértices y conexiones. No cuenta solo caminos sin repetición, ni recorridos de hasta k pasos.'},
 {id:'fc-graph-05',front:'¿Qué indican las diagonales de A, A² y A⁰?',back:'Sin lazos, la de A es cero. En un grafo simple no dirigido, la de A² contiene los grados, por las idas y vueltas. A⁰=I tiene unos por los recorridos de cero pasos, no por lazos.'},
 {id:'fc-graph-06',front:'¿Qué significa un cero en Aᵏ? ¿Y una fila en una red dirigida?',back:'El cero descarta esa longitud concreta, no todas las rutas. En una red dirigida, la suma de la fila es el grado de salida y la suma de la columna el grado de entrada.'}
].map(c=>({...c,topicId:'t04',lessonId:'t04-e12'}));
