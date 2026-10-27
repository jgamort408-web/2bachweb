const tex=String.raw;
const q=(id,prompt,choices,explanation,hint)=>({
  id:'scale-'+id,lessonId:'t02-e08',topicId:'t02',prompt,correct:'right',
  options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'right',text,feedback})),
  explanation,hint,source:'Guion 2.8, T2.5 y ampliaciones propias',
});
export const scalingQuestions=[
  q('01',tex`¿Qué transformación produce \(g(x)=3f(x)\)?`,[
    ['Escala vertical de factor 3.','Multiplica por 3 las alturas y conserva las abscisas.'],
    ['Escala horizontal de factor 3.','El factor está fuera de f: actúa sobre sus valores.'],
    ['Traslación vertical de 3 unidades.','Eso correspondería a f(x)+3.'],
    ['Reflexión respecto al eje Y.','Una reflexión horizontal se escribe f(−x).']],
    tex`Cada punto (u,v) pasa a (u,3v). Las distancias al eje X se multiplican por 3.`, 'Distingue multiplicar una altura de sumarle una cantidad.'),
  q('02',tex`¿Qué ocurre en \(g(x)=f(2x)\)?`,[
    ['Las distancias al eje Y se reducen a la mitad.','El mismo argumento u se obtiene en x=u/2.'],
    ['Las distancias al eje Y se duplican.','El factor horizontal es 1/2, no 2.'],
    ['Las alturas se duplican.','Eso sería 2f(x).'],
    ['La curva se mueve 2 unidades a la derecha.','Una escala cambia distancias, no suma una cantidad a todas las entradas.']],
    tex`Resolver 2x=u da x=u/2. Por tanto (u,v) pasa a (u/2,v).`, 'Busca qué entrada produce el mismo argumento original.'),
  q('03',tex`Si P=(4,−3) está en f, ¿cuál es su imagen en \(g(x)=-2f(-x/2)\)?`,[
    ['(−8,6).','Se divide 4 entre −1/2 y se multiplica −3 por −2.'],
    ['(−2,6).','La abscisa se divide por el factor interior.'],
    ['(8,6).','El factor interior negativo invierte el lado del eje Y.'],
    ['(−8,−6).','El factor exterior negativo también refleja la altura.']],
    tex`La regla es (u,v)→(u/b,av). Aquí a=−2, b=−1/2: (4/(−1/2),(−2)(−3))=(−8,6).`, 'Identifica por separado a y b.'),
  q('04',tex`Si el dominio de f es [1,5), ¿cuál es el de \(g(x)=f(-2x)\)?`,[
    [tex`\((-5/2,-1/2]\)`, 'Al dividir por un número negativo se invierte el orden.'],
    [tex`\([-1/2,-5/2)\)`, 'Los extremos deben escribirse de menor a mayor.'],
    [tex`\([-2,10)\)`, 'No se multiplican las entradas por −2.'],
    [tex`\([-5/2,-1/2)\)`, 'Se han intercambiado incorrectamente las inclusiones.']],
    tex`\(1\le-2x<5\) equivale a \(-5/2<x\le-1/2\). El extremo 1 incluido pasa al extremo derecho incluido.`, 'Resuelve la doble desigualdad, invirtiendo sus signos al dividir por −2.'),
  q('05',tex`Si f tiene mínimo absoluto (2,−1), ¿qué extremo correspondiente tiene \(g(x)=-3f(x)\)?`,[
    ['Máximo absoluto (2,3).','El factor negativo invierte el orden de las alturas.'],
    ['Mínimo absoluto (2,3).','Un mínimo se convierte en máximo al reflejar verticalmente.'],
    ['Máximo absoluto (−6,3).','Las abscisas no cambian con un factor solo exterior.'],
    ['Máximo absoluto (2,−3).','−3 multiplicado por −1 da 3.']],
    tex`f(x)≥−1 implica −3f(x)≤3, con igualdad en x=2.`, 'Multiplica la desigualdad del mínimo por −3.'),
  q('06',tex`¿Qué dominio y monotonía tiene \(g(x)=\ln(-2x)\)?`,[
    ['Dominio (−∞,0); decrece.','El argumento debe ser positivo; la reflexión horizontal invierte el crecimiento.'],
    ['Dominio (0,+∞); crece.','Ese es el caso de ln(2x), sin el signo negativo.'],
    ['Dominio (−∞,0); crece.','Su derivada es 1/x, negativa en ese dominio.'],
    ['Dominio todos los reales; decrece.','El logaritmo no acepta cualquier argumento.']],
    tex`−2x>0 exige x<0. Por la cadena, g′(x)=(−2)/(−2x)=1/x<0.`, 'Establece primero el dominio; después interpreta el signo de la derivada.'),
];
export const scalingCards=[
  {id:'fc-scale-01',front:tex`¿Qué punto corresponde a (u,v) en \(g(x)=a f(bx)\)?`,back:'Para a y b no nulos, (u/b,av). La abscisa se divide por b y la ordenada se multiplica por a.'},
  {id:'fc-scale-02',front:'¿Qué efecto tiene el factor exterior a?',back:'Multiplica las distancias al eje X por |a|: si |a|>1 hay expansión vertical; si 0<|a|<1, contracción. Si a<0, además refleja respecto a X.'},
  {id:'fc-scale-03',front:'¿Qué efecto tiene el factor interior b?',back:'Multiplica las distancias al eje Y por 1/|b|: si |b|>1 hay contracción horizontal; si 0<|b|<1, expansión. Si b<0, además refleja respecto a Y.'},
  {id:'fc-scale-04',front:'¿Cómo cambian dominio y recorrido bajo a f(bx)?',back:'El dominio reúne u/b para u del dominio original; el recorrido reúne av para v del recorrido original. Un factor negativo invierte el orden de los extremos, conservando la inclusión de cada punto.'},
  {id:'fc-scale-05',front:'¿Cómo cambian extremos y asíntotas?',back:'Los extremos se trasladan a (u/b,av); si a<0 se intercambian máximos y mínimos. La vertical x=c pasa a x=c/b; la horizontal y=L pasa a y=aL. Con b<0 se intercambian los extremos del eje x hacia los que se aproximan.'},
  {id:'fc-scale-06',front:tex`¿Cómo cambia la derivada en \(g(x)=a f(bx)\)?`,back:tex`\(g′(x)=ab f′(bx)\), donde exista la derivada. La pendiente correspondiente se multiplica por ab. Para a,b no nulos, los ceros pasan de u a u/b.`},
].map(card=>({...card,topicId:'t02',lessonId:'t02-e08'}));
