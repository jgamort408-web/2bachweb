const tex=String.raw;
const q=(n,prompt,choices,explanation,hint)=>({id:'homogeneous-'+n,topicId:'t05',lessonId:'t05-e10',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source:'Elaboración a partir del guion 5.10, T5.7 y tarjetas locales 17–19 del tema 5'});
export const homogeneousQuestions=[
 q('01','¿Qué caracteriza a un sistema lineal homogéneo?',[
 ['Todos sus términos independientes son cero al escribirlo como AX=B.','Su forma matricial es AX=0.'],['Todos sus coeficientes son cero.','Los coeficientes pueden ser no nulos.'],['Tiene el mismo número de ecuaciones que de incógnitas.','También puede ser rectangular.'],['Todas sus soluciones tienen las coordenadas iguales.','Esa propiedad no forma parte de la definición.']],
 'Se ordenan las ecuaciones, dejando las incógnitas a la izquierda. La columna B debe ser nula.','Mira los términos independientes.'),
 q('02','¿Qué afirmación es cierta para cualquier sistema lineal homogéneo sobre los reales?',[
 ['Siempre admite la solución trivial y nunca es incompatible.','A·0=0 para cualquier matriz A.'],['Siempre tiene infinitas soluciones.','Una matriz de rango igual al número de incógnitas solo admite X=0.'],['Nunca tiene solución única.','Sí puede ser SCD.'],['Siempre tiene determinante cero.','Puede tener determinante no nulo o ser rectangular.']],
 'Sustituir todas las incógnitas por cero satisface todas las ecuaciones. Por tanto, solo puede ser SCD o SCI.','Comprueba qué pasa con el vector cero.'),
 q('03',tex`En un sistema homogéneo de tres incógnitas, \(\operatorname{rg}(A)=2\). ¿Qué ocurre?`,[
 ['Es SCI y tiene una variable libre.','Los rangos de A y de la ampliada coinciden; n−r=1.'],['Es SI porque el rango es menor que tres.','El vector cero siempre es solución.'],['Solo tiene la solución trivial.','Falta un pivote para que sea única.'],['Tiene exactamente dos soluciones.','Si hay una no trivial, hay infinitas sobre los reales.']],
 'rg(A)=rg(A|0)=2<3. Se necesita un parámetro real para describir la familia.','Cuenta incógnitas menos rango.'),
 q('04','Para un sistema homogéneo cuadrado, ¿cuándo hay soluciones no triviales?',[
 ['Cuando det(A)=0.','Entonces el rango es menor que el número de incógnitas.'],['Cuando det(A)≠0.','En ese caso la única solución es la trivial.'],['Solo cuando todos los coeficientes son cero.','También hay matrices no nulas de rango insuficiente.'],['Cuando el determinante es negativo.','Lo relevante es que se anule, no su signo.']],
 'La equivalencia con el determinante se aplica a matrices cuadradas. Para rectangulares se usa el rango.','Relaciona determinante nulo con falta de pivotes.'),
 q('05',tex`Para \(x+y=0,\ 2x+2y=0\), ¿cuál es una solución no trivial?`,[
 [tex`\((-2,2)\).`,'−2+2=0 y −4+4=0, con coordenadas no todas nulas.'],[tex`\((0,0)\).`,'Es solución, pero es la trivial.'],[tex`\((2,2)\).`,'La primera ecuación da 4, no cero.'],[tex`\((0,2)\).`,'Tener una coordenada cero no basta para ser solución.']],
 'La familia completa es (−t,t), t real. Para t=2 se obtiene (−2,2). No trivial significa que al menos una coordenada es distinta de cero.','Sustituye la pareja en ambas ecuaciones.'),
 q('06','Un sistema homogéneo tiene dos ecuaciones y tres incógnitas reales. ¿Qué se puede asegurar?',[
 ['Tiene infinitas soluciones.','Su rango es como máximo 2, menor que 3, y siempre es compatible.'],['Puede ser incompatible.','Eso no puede ocurrir si B=0.'],['Solo tiene la solución trivial.','No puede haber un pivote por cada una de las tres incógnitas.'],['Se decide calculando el determinante de su matriz 2×3.','Una matriz rectangular no tiene determinante ordinario.']],
 'En un sistema homogéneo, m<n implica rango≤m<n y, por tanto, SCI. Para sistemas no homogéneos, menos ecuaciones no garantiza compatibilidad.','Usa a la vez B=0 y la cota del rango.')
];
export const homogeneousCards=[
 {id:'fc-homogeneous-01',front:'¿Qué es un sistema homogéneo?',back:'Un sistema lineal AX=0: todos los términos independientes son cero, aunque los coeficientes de A no lo sean.'},
 {id:'fc-homogeneous-02',front:'¿Qué es la solución trivial?',back:'El vector con todas las coordenadas cero. Siempre satisface AX=0. No trivial significa que al menos una coordenada es distinta de cero.'},
 {id:'fc-homogeneous-03',front:'¿Qué tipos puede tener un sistema homogéneo?',back:tex`Siempre es compatible: \(\operatorname{rg}(A|0)=\operatorname{rg}(A)=r\). Si r=n, es SCD; si r<n, SCI. Nunca SI.`},
 {id:'fc-homogeneous-04',front:'¿Qué dice el determinante en el caso cuadrado?',back:tex`Si \(\det(A)\ne0\), solo hay solución trivial. Si \(\det(A)=0\), hay soluciones no triviales e infinitas soluciones. Esta prueba no se aplica directamente a A rectangular.`},
 {id:'fc-homogeneous-05',front:'¿Cuántos parámetros libres tiene la familia?',back:tex`\(n-r\), donde n es el número de incógnitas y r el rango de A. Si hay menos ecuaciones que incógnitas, necesariamente queda alguna variable libre.`},
 {id:'fc-homogeneous-06',front:'¿Por qué una solución no trivial produce infinitas?',back:tex`Si \(Av=0\), entonces \(A(\lambda v)=\lambda Av=0\) para todo real \(\lambda\). Si \(v\ne0\), esos múltiplos dan infinitas soluciones distintas. Puede haber más de una dirección independiente.`}
].map(c=>({...c,topicId:'t05',lessonId:'t05-e10'}));
