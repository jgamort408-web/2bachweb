// Fuente: Página web existente/3. Probabilidad/7. Flashcards.txt.
// Dieciséis tarjetas en el orden original; precisiones en docs/auditoria-reutilizacion-probabilidad.md.
export const probabilityCards = [
  {category:'Conceptos básicos',front:'Regla de Laplace',back:'Si los resultados elementales son equiprobables, \\(P(A)=\\frac{\\text{casos favorables}}{\\text{casos posibles}}\\). Sin equiprobabilidad, el cociente de casos no basta.'},
  {category:'Conceptos básicos',front:'¿Qué son sucesos incompatibles?',back:'No pueden ocurrir a la vez: \\(A\\cap B=\\varnothing\\), por lo que \\(P(A\\cap B)=0\\).'},
  {category:'Conceptos básicos',front:'¿Qué son sucesos independientes?',back:'Conocer uno no cambia la probabilidad del otro. Una condición equivalente es \\(P(A\\cap B)=P(A)P(B)\\).'},
  {category:'Conceptos básicos',front:'Suceso contrario \\(A^c\\)',back:'Contiene todos los resultados de \\(E\\) que no están en \\(A\\). Como \\(A\\) y \\(A^c\\) forman \\(E\\), \\(P(A^c)=1-P(A)\\).'},
  {category:'Operaciones',front:'Probabilidad de la unión \\(A\\cup B\\)',back:'\\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B)\\). Se resta el solape contado dos veces.'},
  {category:'Operaciones',front:'Primera ley de De Morgan',back:'\\((A\\cup B)^c=A^c\\cap B^c\\): «ni \\(A\\) ni \\(B\\)». Los dos sucesos iguales tienen la misma probabilidad.'},
  {category:'Operaciones',front:'Segunda ley de De Morgan',back:'\\((A\\cap B)^c=A^c\\cup B^c\\): «no ocurren ambos». Los dos sucesos iguales tienen la misma probabilidad.'},
  {category:'Operaciones',front:'Diferencia \\(A\\setminus B\\)',back:'Es «solo \\(A\\)»: \\(A\\setminus B=A\\cap B^c\\). Su probabilidad es \\(P(A)-P(A\\cap B)\\).'},
  {category:'Condicionada',front:'Probabilidad de \\(A\\) sabiendo \\(B\\)',back:'Si \\(P(B)>0\\), \\(P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}\\). El denominador es el suceso conocido \\(B\\).'},
  {category:'Condicionada',front:'Regla del producto para una intersección',back:'Si \\(P(A)>0\\), \\(P(A\\cap B)=P(A)P(B\\mid A)\\). En un árbol se multiplican las ramas de un camino.'},
  {category:'Teoremas clave',front:'Probabilidad total en un árbol',back:'Si los \\(A_i\\) forman una partición y \\(P(A_i)>0\\), \\(P(B)=\\sum_i P(A_i)P(B\\mid A_i)\\): suma de todos los caminos hacia \\(B\\).'},
  {category:'Teoremas clave',front:'Teorema de Bayes',back:'Con una partición y \\(P(B)>0\\), \\(P(A_i\\mid B)=\\frac{P(A_i)P(B\\mid A_i)}{P(B)}\\). El denominador reúne todos los caminos hacia el resultado observado.'},
  {category:'Trucos de lenguaje',front:'Traduce «al menos uno»',back:'Es el contrario de «ninguno»: \\(P(\\text{al menos uno})=1-P(\\text{ninguno})\\).'},
  {category:'Trucos de lenguaje',front:'Traduce «sabiendo que» o «dado que»',back:'Es una condición. En \\(P(A\\mid B)\\), lo sabido es \\(B\\), que determina el denominador \\(P(B)\\), siempre que sea positivo.'},
  {category:'Trucos de lenguaje',front:'Diferencia entre «\\(A\\) y \\(B\\)» y «\\(A\\) o \\(B\\)»',back:'«\\(A\\) y \\(B\\)» es la intersección \\(A\\cap B\\). «\\(A\\) o \\(B\\)» es la unión \\(A\\cup B\\), que incluye que ocurran ambos.'},
  {category:'Trucos de lenguaje',front:'¿Incompatibles e independientes significan lo mismo?',back:'No. Incompatibles: \\(A\\cap B=\\varnothing\\). Independientes: \\(P(A\\cap B)=P(A)P(B)\\). Con probabilidades positivas no pueden cumplir ambas condiciones.'}
].map((card,index)=>({...card,id:'fc-t07-original-'+String(index+1).padStart(2,'0'),topicId:'t07',sourceIndex:index+1}));

