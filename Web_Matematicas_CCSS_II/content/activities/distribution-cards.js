// Fuente: Página web existente/4. Distribuciones/6. Flashcards.txt.
// 19 conceptos originales, revisados en docs/auditoria-reutilizacion-distribuciones.md.
export const distributionCards = [
  {category:'Conceptos',front:'¿Qué es una variable aleatoria discreta?',back:'Toma valores en un conjunto finito o numerable. Pueden ser números no enteros; por ejemplo, el número de hijos es un recuento entero.'},
  {category:'Conceptos',front:'¿Qué es una variable aleatoria continua?',back:'En el modelo estudiado, puede tomar valores en un intervalo de números reales. La altura, el tiempo y el peso se suelen modelizar como variables continuas.'},
  {category:'Conceptos',front:'¿Qué diferencia hay entre masa de probabilidad y densidad?',back:'En una variable discreta se asigna masa \\(P(X=k)\\) a cada valor. En un modelo continuo, la probabilidad de un intervalo es el área bajo la densidad; la probabilidad de un punto aislado es cero.'},
  {category:'Binomial',front:'¿Cuándo puede modelizarse un recuento con \\(B(n,p)\\)?',back:'Hay \\(n\\) ensayos fijos e independientes; cada uno tiene dos resultados y la misma probabilidad \\(p\\) de éxito. \\(X\\) cuenta los éxitos.'},
  {category:'Binomial',front:'¿Cuál es la fórmula de \\(P(X=k)\\) para una binomial?',back:'\\[P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k},\\quad k=0,\\ldots,n.\\]'},
  {category:'Binomial',front:'¿Qué cuenta el número combinatorio \\(\\binom{n}{k}\\)?',back:'Cuenta las formas de elegir qué \\(k\\) de los \\(n\\) ensayos son éxitos, sin importar el orden de elección: \\(\\binom{n}{k}=n!/[k!(n-k)!]\\).'},
  {category:'Binomial',front:'¿Cuáles son la media y la desviación típica de \\(B(n,p)\\)?',back:'\\[\\mu=np,\\qquad \\sigma=\\sqrt{np(1-p)}.\\] La varianza es \\(np(1-p)\\).'},
  {category:'Normal',front:'¿Cómo se describe \\(N(\\mu,\\sigma)\\) en este tema?',back:'Es una distribución continua cuya densidad tiene forma de campana, simétrica respecto de \\(\\mu\\). En esta notación, \\(\\sigma>0\\) es la desviación típica.'},
  {category:'Normal',front:'¿Qué es la normal estándar \\(Z\\sim N(0,1)\\)?',back:'Tiene media cero y desviación típica uno. Su acumulada \\(\\Phi(z)=P(Z\\le z)\\) permite calcular probabilidades después de tipificar.'},
  {category:'Normal',front:'¿Qué representa el área bajo la densidad normal?',back:'El área total es uno. El área entre dos valores es su probabilidad; la curva es simétrica respecto de la media.'},
  {category:'Tipificación',front:'¿Cómo se tipifica una variable \\(X\\sim N(\\mu,\\sigma)\\)?',back:'\\[Z=\\frac{X-\\mu}{\\sigma}\\sim N(0,1),\\qquad \\sigma>0.\\]'},
  {category:'Tipificación',front:'¿Cómo se obtiene \\(P(Z\\le k)\\)?',back:'Es \\(\\Phi(k)\\). Si la tabla solo ofrece valores positivos y \\(k<0\\), se usa la simetría \\(\\Phi(k)=1-\\Phi(-k)\\).'},
  {category:'Tipificación',front:'¿Cómo se calcula \\(P(Z>k)\\)?',back:'Por complemento: \\(P(Z>k)=1-\\Phi(k)\\). En una normal, usar \\(>\\) o \\(\\ge\\) da la misma probabilidad.'},
  {category:'Tipificación',front:'Para \\(k>0\\), ¿cómo se calcula \\(P(Z\\le-k)\\)?',back:'Por simetría: \\(P(Z\\le-k)=\\Phi(-k)=1-\\Phi(k)=P(Z\\ge k)\\).'},
  {category:'Tipificación',front:'¿Cómo se calcula \\(P(a<Z<b)\\)?',back:'Para \\(a<b\\), \\(P(a<Z<b)=\\Phi(b)-\\Phi(a)\\). En la normal, incluir o excluir los extremos no cambia el resultado.'},
  {category:'Aproximación',front:'¿Qué idea expresa la aproximación de De Moivre–Laplace?',back:'Una binomial puede aproximarse por una normal con la misma media y desviación típica cuando los éxitos y los fracasos esperados son suficientemente numerosos; se comprueba el error de la probabilidad concreta.'},
  {category:'Aproximación',front:'¿Qué orientación usa este tema para aproximar una binomial?',back:'Comprobar \\(np\\ge5\\) y \\(n(1-p)\\ge5\\). Es una orientación práctica, no una garantía de precisión para todas las colas e intervalos.'},
  {category:'Aproximación',front:'¿Qué parámetros tiene la normal aproximante de \\(B(n,p)\\)?',back:'\\[\\mu=np,\\qquad \\sigma=\\sqrt{np(1-p)}.\\] El segundo parámetro es la desviación típica en la convención de este tema.'},
  {category:'Aproximación',front:'¿Cómo se aplica la corrección de continuidad?',back:'Si \\(Y\\) es la normal aproximante: \\(P(X=k)\\approx P(k-0{,}5<Y<k+0{,}5)\\) y \\(P(X\\le k)\\approx P(Y\\le k+0{,}5)\\). Los extremos abiertos o cerrados dan lo mismo para \\(Y\\).'}
].map((card,index)=>({...card,id:'fc-t08-original-'+String(index+1).padStart(2,'0'),topicId:'t08',sourceIndex:index+1}));
