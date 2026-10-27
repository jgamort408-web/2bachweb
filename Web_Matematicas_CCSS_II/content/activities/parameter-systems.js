const tex=String.raw;
const q=(n,prompt,choices,explanation,hint)=>({id:'parameter-system-'+n,topicId:'t05',lessonId:'t05-e11',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source:'Elaboración a partir del guion 5.11, T5.9 y tarjetas locales 20–21 del tema 5'});
export const parameterSystemQuestions=[
 q('01',tex`Al resolver aparece \((\lambda-1)y=\lambda-1\). ¿Cuál es el siguiente paso correcto?`,[
 [tex`Separar \(\lambda=1\) y \(\lambda\ne1\) antes de dividir.`,'El factor solo se puede cancelar si no es cero.'],['Cancelar siempre y concluir y=1.','En λ=1 la igualdad es 0=0 y no obliga a y=1.'],['Concluir que λ debe valer 1.','La igualdad también puede cumplirse para otros valores.'],['Cambiar λ por el parámetro libre y.','λ es un dato de la familia, no una incógnita del sistema.']],
 'Para λ≠1, y=1. Para λ=1, esta ecuación no añade restricciones y hay que revisar las demás.','Comprueba cuándo se anula el divisor.'),
 q('02',tex`Para \(\lambda x+y=2,\ x+\lambda y=2\), ¿qué valores hay que estudiar por separado?`,[
 [tex`\(\lambda=-1\) y \(\lambda=1\).`,'El determinante es (λ−1)(λ+1).'],[tex`Solo \(\lambda=1\).`,'También se anula en −1.'],[tex`Solo \(\lambda=0\).`,'El determinante en cero es −1, no cero.'],['Ninguno, porque el término independiente vale 2.','B no evita que A sea singular.']],
 'Las raíces de λ²−1 son −1 y 1. El caso general excluye ambos valores.','Factoriza el determinante.'),
 q('03',tex`En la familia \(\lambda x+y=2,\ x+\lambda y=2\), ¿qué sucede en \(\lambda=-1\)?`,[
 ['Es SI: al sumar las ecuaciones resulta 0=4.','Los rangos de A y de la ampliada son 1 y 2.'],['Es SCI porque el determinante es cero.','El determinante cero no decide la compatibilidad.'],['Es SCD con x=y=0.','El vector cero no satisface términos independientes iguales a 2.'],['Es SCD con x=y=1.','−1+1 no es 2.']],
 'Las ecuaciones son −x+y=2 y x−y=2, que no pueden cumplirse simultáneamente.','Suma las dos ecuaciones del caso especial.'),
 q('04',tex`En esa familia, para \(\lambda=1\), la fórmula general \(x=y=2/(\lambda+1)\) da (1,1). ¿Por qué no basta?`,[
 ['Es una solución particular; el caso especial tiene la familia (2−t,t).','Las dos ecuaciones se reducen a x+y=2.'],['Porque (1,1) no es solución.','Sí cumple x+y=2.'],['Porque una fórmula definida siempre garantiza unicidad.','La fórmula fue deducida bajo condiciones que excluían λ=1.'],['Porque todo sistema singular es incompatible.','Este caso es compatible indeterminado.']],
 'Al llegar al valor excluido hay que resolver de nuevo. (1,1) pertenece a la familia, pero no la describe completa.','Distingue una solución de todas las soluciones.'),
 q('05',tex`En \(x+y+z=1,\ 2x+2y+(\lambda+1)z=2\), ¿qué cambia al pasar a \(\lambda=1\)?`,[
 ['Sigue siendo SCI, pero pasa de una variable libre a dos.','La segunda ecuación se vuelve dependiente de la primera.'],['Se vuelve SI.','Con λ=1 ambas ecuaciones son compatibles.'],['Se vuelve SCD.','Solo queda una ecuación para tres incógnitas.'],['Se decide por el determinante de A, que es 2×3.','No hay determinante ordinario de una matriz rectangular.']],
 'La operación F₂−2F₁ da (λ−1)z=0. Fuera de 1 obliga a z=0; en 1 desaparece esa condición.','Mira el rango y cuenta n−r.'),
 q('06','Se han probado diez valores de λ y en todos el sistema es SCD. ¿Qué permite concluir una discusión completa?',[
 ['Es necesario justificar algebraicamente todos los casos, incluidos los valores críticos.','Las muestras pueden omitir algún valor excepcional.'],['Que es SCD para todo λ real.','Diez valores no cubren todos los reales.'],['Que λ solo puede tomar esos diez valores.','Las muestras del explorador no restringen el parámetro de la familia.'],['Que basta con presentar las soluciones aproximadas de esas muestras.','Faltan la partición exhaustiva y la justificación de rangos.']],
 'Una discusión debe cubrir todos los valores permitidos sin solapamientos y con una conclusión justificada para cada caso.','Distingue exploración numérica y demostración.')
];
export const parameterSystemCards=[
 {id:'fc-parameter-system-01',front:'¿Qué significa discutir un sistema con parámetro?',back:'Clasificarlo según todos los valores permitidos del parámetro y resolver los casos compatibles cuando se pida, separando los valores que cambian las condiciones.'},
 {id:'fc-parameter-system-02',front:'¿Cómo localizar valores críticos?',back:'En el caso cuadrado, estudiar los ceros del determinante si no es idénticamente nulo. En matrices rectangulares o siempre singulares, estudiar pivotes y menores relevantes.'},
 {id:'fc-parameter-system-03',front:'¿Cuándo se puede dividir por λ−a?',back:tex`Solo después de imponer \(\lambda\ne a\). El caso \(\lambda=a\) se sustituye y estudia aparte. Cancelar sin esa condición puede perder soluciones o contradicciones.`},
 {id:'fc-parameter-system-04',front:'¿Qué hacer en cada valor especial?',back:'Sustituirlo en el sistema original o en una transformación válida para todos los valores, comparar rangos y resolver por Gauss si es compatible. Determinante cero no equivale a SI.'},
 {id:'fc-parameter-system-05',front:'¿Es lo mismo λ que un parámetro libre t?',back:'No. λ selecciona qué sistema estudiamos. Una vez fijado λ, t recorre soluciones de ese sistema si es SCI. Conviene usar símbolos distintos.'},
 {id:'fc-parameter-system-06',front:'¿Cómo presentar la conclusión?',back:'Con casos disjuntos que cubran todos los valores reales permitidos: condición, rangos, SCD/SCI/SI y solución o familia cuando corresponda. Las muestras numéricas sirven de comprobación, no de demostración general.'}
].map(c=>({...c,topicId:'t05',lessonId:'t05-e11'}));
