const tex=String.raw;
const question=(n,prompt,choices,explanation,hint)=>({id:'primitive-'+n,topicId:'t03',lessonId:'t03-e01',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source:'Guion 3.1; adaptación T3.1, T3.3 y T3.10; ejemplos propios'});
export const primitiveQuestions=[
 question('01',tex`¿Qué igualdad comprueba que F es una primitiva de f en un intervalo?`,[
 [tex`\(F'(x)=f(x)\) en todos los puntos del intervalo.`, 'Es la definición de primitiva.'],[tex`\(f'(x)=F(x)\).`,'El orden está invertido.'],['F(0)=f(0).','Una coincidencia de valores no compara derivadas.'],['F y f tienen la misma gráfica.','La primitiva y su derivada suelen ser funciones distintas.']],
 'Se deriva la función propuesta F y se compara con f en todo el intervalo, respetando el dominio.','Pregunta qué función se deriva para recuperar el integrando.'),
 question('02',tex`¿Cuál es la familia de todas las primitivas de \(f(x)=6x^2\) en ℝ?`,[
 [tex`\(2x^3+C\), con C constante real.`, 'Al derivar se obtiene 6x².'],[tex`\(6x^3+C\).`, 'Su derivada es 18x².'],[tex`\(3x^2+C\).`, 'Su derivada es 6x.'],[tex`\(2x^3+Cx\).`, 'Su derivada añade C; no sirve para cualquier C.']],
 tex`\((2x^3+C)'=6x^2\). Cada valor de C da una primitiva, y todas se obtienen así en este intervalo.`, 'Deriva las propuestas, incluido el término con C.'),
 question('03','Si F y G son primitivas de la misma función en un intervalo, ¿qué ocurre con F−G?',[
 ['Es constante en ese intervalo.','Su derivada vale cero en todo el intervalo.'],['Siempre vale cero.','Pueden ser distintas: x² y x²+3 derivan a 2x.'],['Siempre vale x.','La derivada de x es 1, no 0.'],['Puede ser cualquier función de x.','Una función variable no tiene necesariamente derivada cero.']],
 tex`\((F-G)'=f-f=0\). Una función con derivada cero en un intervalo es constante allí.`, 'La palabra intervalo importa para la conclusión global.'),
 question('04',tex`Si \(F(x)=x^2+C\) y F(1)=4, ¿qué primitiva se elige?`,[
 [tex`\(F(x)=x^2+3\).`, '1+C=4 da C=3.'],[tex`\(F(x)=x^2+4\).`, 'Daría F(1)=5.'],[tex`\(F(x)=x^2-3\).`, 'Daría F(1)=−2.'],[tex`\(F(x)=x^2+3x\).`, 'C es una constante, no un coeficiente de x.']],
 'Se sustituye la condición en la familia: 1+C=4. La elegida cumple tanto F′=2x como F(1)=4.', 'No confundas el valor de F en un punto con el de la constante.'),
 question('05',tex`Un coste marginal es \(K'(q)=2q+5\) para q>0 y K(0)=40 €. ¿Qué coste total continuo en q=0 encaja?`,[
 [tex`\(K(q)=q^2+5q+40\) €.`, 'Su derivada y su coste inicial coinciden con los datos.'],[tex`\(K(q)=2q+45\) €.`, 'Su derivada es 2 y su valor inicial es 45.'],[tex`\(K(q)=q^2+5q\) €.`, 'Omitir el coste fijo daría K(0)=0.'],[tex`\(K(q)=q^2+40q+5\) €.`, 'Intercambia el coste fijo y el coeficiente lineal.']],
 tex`Todas las primitivas en q>0 son \(q^2+5q+C\); la continuidad en cero y K(0)=40 fijan C=40.`, 'Deriva y comprueba el dato inicial por separado.'),
 question('06',tex`Para \(f(x)=1/x\) en \(\mathbb R\setminus\{0\}\), ¿puede haber distintas constantes en x<0 y x>0?`,[
 ['Sí: los dos intervalos del dominio están separados.','La conclusión de constante única se aplica en cada intervalo.'],['No: siempre se exige una única constante para todo el dominio.','Eso impondría una relación que la derivada no exige entre intervalos separados.'],['No hay primitivas porque cero está excluido.','Existen en cada intervalo, usando ln|x|.'],['Hay que asignar un valor en cero para integrar.','1/x no está definida allí; no hay que inventar una extensión.']],
 tex`Se puede tomar \(\ln|x|+C_-\) en x<0 y \(\ln|x|+C_+\) en x>0. Su derivada es 1/x en el dominio, aunque las constantes difieran.`, 'La propiedad se enuncia para un intervalo, no para cualquier conjunto separado.')
];
export const primitiveCards=[
 {id:'fc-primitive-01',front:'¿Qué es una primitiva de f?',back:tex`Una función F cuya derivada es f en el intervalo estudiado: \(F'=f\).`},
 {id:'fc-primitive-02',front:'¿Qué representa una integral indefinida?',back:tex`La familia de primitivas: \(\int f(x)\,dx=F(x)+C\). No es un único número.`},
 {id:'fc-primitive-03',front:'¿Por qué se añade C?',back:'La derivada de una constante es cero. En un mismo intervalo, dos primitivas de f difieren en una constante; sus gráficas son traslaciones verticales.'},
 {id:'fc-primitive-04',front:'¿Cómo compruebas una primitiva propuesta?',back:'Derívala y compara con el integrando en todo el intervalo. Comprobar un único valor no basta. Respeta el dominio.'},
 {id:'fc-primitive-05',front:'¿Cómo se elige una primitiva particular?',back:tex`Una condición F(a)=b fija \(C=b-F_0(a)\) si \(F=F_0+C\). Comprueba también la derivada.`},
 {id:'fc-primitive-06',front:'¿La misma C sirve necesariamente en intervalos separados?',back:'No. La familia usa una constante independiente por intervalo del dominio si no se imponen relaciones adicionales. Por ejemplo, para 1/x se pueden elegir constantes distintas a cada lado de cero.'}
].map(c=>({...c,topicId:'t03',lessonId:'t03-e01'}));
