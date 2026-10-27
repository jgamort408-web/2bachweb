# Banco y mecánica de preguntas tipo test
## Matemáticas Aplicadas a las Ciencias Sociales II — 2.º de Bachillerato

> Especificación para una sección de test autocorregible por tema.  
> Incluye mecánica general y una muestra inicial de **10 preguntas por tema** (90 en total), con respuesta y feedback.  
> Todas las fórmulas deben renderizarse con KaTeX o MathJax.

---

# 0. Mecánica general

## 0.1. Formato recomendado
- 4 opciones.
- 1 correcta salvo que se indique expresamente “selección múltiple”.
- Orden aleatorio de opciones.
- Explicación inmediata tras responder.
- Botón “ver desarrollo” para preguntas de cálculo.
- Etiquetas por subtema y dificultad.

## 0.2. Modos
### Práctica
- Sin límite global.
- Feedback inmediato.
- Se puede reintentar una vez.

### Reto
- 10 preguntas.
- 8 minutos.
- Bonus por racha.

### Simulacro
- 20–30 preguntas.
- Sin feedback hasta el final.
- Mezcla de temas.

## 0.3. Puntuación
- Correcta al primer intento: 100.
- Correcta tras reintento: 60.
- Pista usada: máximo 50.
- Incorrecta: 0.
- No usar penalización negativa por defecto; puede activarse en “modo competitivo”.

## 0.4. Diseño de distractores
Los distractores deben proceder de errores reales:
- signo incorrecto;
- confusión de fórmula;
- olvido de `+C`;
- invertir condicionada;
- ignorar dominio;
- olvidar corrección de continuidad;
- no redondear tamaño muestral hacia arriba.

---

# 1. Tema 1 — Límites y derivadas

## T1.1
¿Cuál es el valor de
\[
\lim_{x\to 2}\frac{x^2-4}{x-2}?
\]
A. `0`  
B. `2`  
C. `4` ✅  
D. No existe  

**Feedback:** factoriza `x^2-4=(x-2)(x+2)` y simplifica.

## T1.2
Si
\[
\lim_{x\to a^-}f(x)=3,\qquad \lim_{x\to a^+}f(x)=5,
\]
entonces:
A. el límite vale 4  
B. el límite vale 3  
C. el límite vale 5  
D. el límite no existe ✅

**Feedback:** para que exista el límite bilateral, ambos laterales deben coincidir.

## T1.3
¿Cuál de las siguientes expresiones es una indeterminación?
A. `3/0`  
B. `0/0` ✅  
C. `0/4`  
D. `5/∞`

## T1.4
Una función es continua en `x=a` si:
A. solo existe `f(a)`  
B. solo existe el límite  
C. existe `f(a)`, existe el límite y son iguales ✅  
D. su derivada es 0

## T1.5
Si `f'(a)>0`, localmente la función:
A. decrece  
B. crece ✅  
C. es constante necesariamente  
D. no es continua

## T1.6
La derivada de
\[
f(x)=(2x-1)^4
\]
es:
A. `4(2x−1)^3`  
B. `8(2x−1)^3` ✅  
C. `8(2x−1)^4`  
D. `4(2x−1)^5`

**Feedback:** aplica regla de la cadena.

## T1.7
La pendiente de la tangente a `f` en `x=a` es:
A. `f(a)`  
B. `f'(a)` ✅  
C. `a`  
D. `1/f'(a)`

## T1.8
Si una función es derivable en `a`, entonces:
A. necesariamente es continua en `a` ✅  
B. necesariamente tiene máximo  
C. necesariamente `f'(a)=0`  
D. puede ser discontinua

## T1.9
La regla de L'Hôpital se aplica directamente, en su forma básica, a:
A. cualquier límite  
B. solo `∞−∞`  
C. `0/0` o `∞/∞` ✅  
D. límites laterales exclusivamente

## T1.10
La recta tangente a `f(x)=x^2` en `x=1` es:
A. `y=x+1`  
B. `y=2x−1` ✅  
C. `y=2x+1`  
D. `y=x−1`

---

# 2. Tema 2 — Representación de funciones

## T2.1
El dominio de
\[
f(x)=\frac{1}{x-3}
\]
es:
A. `R`  
B. `R\{0}`  
C. `R\{3}` ✅  
D. `(3,∞)`

## T2.2
La función `f(x)=2^x`:
A. es decreciente  
B. es creciente ✅  
C. toma valores negativos  
D. tiene asíntota vertical `x=0`

## T2.3
El dominio de `ln x` es:
A. `R`  
B. `[0,∞)`  
C. `(0,∞)` ✅  
D. `R\{0}`

## T2.4
La gráfica de `g(x)=f(x-2)` se obtiene desplazando la de `f`:
A. 2 a la izquierda  
B. 2 a la derecha ✅  
C. 2 arriba  
D. 2 abajo

## T2.5
`g(x)=3f(x)` produce:
A. escala horizontal  
B. escala vertical por 3 ✅  
C. traslación vertical  
D. reflexión horizontal

## T2.6
Para buscar un máximo absoluto de una función derivable en `[a,b]`, debemos considerar:
A. solo donde `f'=0`  
B. solo los extremos  
C. puntos críticos y extremos del intervalo ✅  
D. solo donde `f''=0`

## T2.7
Si una función racional tiene denominador 0 en `x=2` y el factor no se cancela, puede aparecer:
A. asíntota horizontal `y=2`  
B. asíntota vertical `x=2` ✅  
C. máximo absoluto  
D. corte con eje Y

## T2.8
`|x|` puede escribirse:
A. `x` para todo `x`  
B. `−x` para todo `x`  
C. `x` si `x≥0` y `−x` si `x<0` ✅  
D. `x^2`

## T2.9
En un problema de optimización, una solución crítica negativa que representa “número de unidades producidas”:
A. siempre se acepta  
B. debe descartarse por el contexto ✅  
C. es necesariamente máximo  
D. obliga a derivar otra vez

## T2.10
El corte con el eje Y de `f(x)=x^2−4x+3` es:
A. `(0,3)` ✅  
B. `(3,0)`  
C. `(1,0)`  
D. `(4,0)`

---

# 3. Tema 3 — Integrales

## T3.1
Una primitiva de `f(x)=6x^2` es:
A. `3x^2`  
B. `2x^3+C` ✅  
C. `6x^3+C`  
D. `x^6+C`

## T3.2
\[
\int x^3\,dx=
\]
A. `3x^2+C`  
B. `x^4/4+C` ✅  
C. `x^4+C`  
D. `4x^2+C`

## T3.3
La constante `C` aparece porque:
A. la derivada de una constante es 1  
B. todas las primitivas difieren en una constante ✅  
C. toda integral vale 0  
D. es una convención sin significado

## T3.4
\[
\int_a^b f(x)\,dx
\]
representa:
A. siempre el área geométrica positiva  
B. un área con signo/acumulación ✅  
C. la derivada media  
D. el máximo de `f`

## T3.5
La regla de Barrow establece:
A. `F(a)+F(b)`  
B. `F(b)−F(a)` ✅  
C. `f(b)−f(a)`  
D. `f(a)f(b)`

## T3.6
Si `f(x)<0` en `[a,b]`, entonces el área geométrica entre la curva y el eje X es:
A. \(\int_a^b f\)  
B. \(-\int_a^b f\) ✅  
C. 0  
D. `f(b)-f(a)`

## T3.7
Para hallar el área entre dos curvas, primero conviene:
A. derivarlas  
B. hallar sus puntos de corte ✅  
C. calcular sus máximos  
D. multiplicarlas

## T3.8
\[
\int \frac1x dx=
\]
A. `1/x^2+C`  
B. `ln|x|+C` ✅  
C. `e^x+C`  
D. `x ln x`

## T3.9
Si `F'=f`, entonces:
A. `F` es una primitiva de `f` ✅  
B. `f` es una integral definida  
C. `F=f` necesariamente  
D. `f` es constante

## T3.10
Una forma rápida de comprobar una integral indefinida es:
A. integrarla de nuevo  
B. derivar el resultado ✅  
C. hacer una gráfica solamente  
D. sustituir `x=0`

---

# 4. Tema 4 — Matrices y determinantes

## T4.1
Una matriz de 3 filas y 2 columnas tiene orden:
A. `2×3`  
B. `3×2` ✅  
C. `5×1`  
D. `3×3`

## T4.2
El producto `AB` existe si:
A. ambas son cuadradas  
B. tienen el mismo orden  
C. columnas de `A` = filas de `B` ✅  
D. filas de `A` = filas de `B`

## T4.3
En general:
A. `AB=BA`  
B. `AB≠BA` ✅  
C. `AB=0`  
D. `AB=A+B`

## T4.4
Para
\[
A=\begin{pmatrix}a&b\\c&d\end{pmatrix},
\]
\[
\det(A)=
\]
A. `ab−cd`  
B. `ad−bc` ✅  
C. `ac−bd`  
D. `a+b+c+d`

## T4.5
Si `det(A)=0`, entonces:
A. `A` tiene inversa  
B. `A` no tiene inversa ✅  
C. `A=0` necesariamente  
D. `A` es identidad

## T4.6
Una matriz simétrica cumple:
A. `A=-A`  
B. `A=A^T` ✅  
C. `det(A)=1`  
D. `A^2=I`

## T4.7
Si `AX=B` y `A` es invertible:
A. `X=BA^{-1}`  
B. `X=A^{-1}B` ✅  
C. `X=B/A`  
D. `X=AB^{-1}`

## T4.8
La matriz de adyacencia de un grafo no dirigido simple suele ser:
A. antisimétrica  
B. simétrica ✅  
C. diagonal  
D. identidad

## T4.9
El rango de una matriz mide:
A. el número de columnas solamente  
B. el máximo número de filas/columnas linealmente independientes ✅  
C. su determinante siempre  
D. su suma de elementos

## T4.10
Intercambiar dos filas de un determinante:
A. no cambia nada  
B. cambia su signo ✅  
C. lo duplica  
D. lo hace cero siempre

---

# 5. Tema 5 — Sistemas de ecuaciones

## T5.1
Un sistema con una única solución es:
A. SCI  
B. SCD ✅  
C. SI  
D. homogéneo necesariamente

## T5.2
Un sistema sin solución es:
A. compatible determinado  
B. compatible indeterminado  
C. incompatible ✅  
D. homogéneo

## T5.3
Rouché-Frobenius indica compatibilidad cuando:
A. `rg(A)>rg(A|B)`  
B. `rg(A)=rg(A|B)` ✅  
C. `det(A)=0` siempre  
D. `rg(A)=0`

## T5.4
Si
\[
rg(A)=rg(A|B)=n,
\]
donde `n` es el nº de incógnitas:
A. SI  
B. SCI  
C. SCD ✅  
D. no puede saberse

## T5.5
El método de Gauss se basa en:
A. derivar ecuaciones  
B. operaciones elementales que generan sistemas equivalentes ✅  
C. integrar términos  
D. calcular probabilidades

## T5.6
Cramer puede usarse directamente cuando:
A. `det(A)≠0` ✅  
B. `det(A)=0`  
C. hay más ecuaciones que incógnitas necesariamente  
D. el sistema es no lineal

## T5.7
Todo sistema homogéneo:
A. es incompatible  
B. tiene al menos la solución trivial ✅  
C. tiene infinitas soluciones  
D. tiene determinante 1

## T5.8
La forma matricial de un sistema es:
A. `A+B=X`  
B. `AX=B` ✅  
C. `A/X=B`  
D. `AB=X`

## T5.9
Al discutir un sistema con parámetro, es esencial:
A. sustituir siempre `λ=1`  
B. separar valores que anulan expresiones relevantes ✅  
C. usar solo Cramer  
D. evitar calcular rangos

## T5.10
Dos rectas coincidentes representan un sistema:
A. SI  
B. SCD  
C. SCI ✅  
D. imposible de clasificar

---

# 6. Tema 6 — Programación lineal

## T6.1
Una inecuación lineal con dos incógnitas determina:
A. un punto  
B. un semiplano ✅  
C. una parábola  
D. una circunferencia

## T6.2
La región factible es:
A. la unión de todas las restricciones  
B. la intersección de las restricciones ✅  
C. la función objetivo  
D. un único vértice

## T6.3
En programación lineal, la función objetivo:
A. siempre se minimiza  
B. siempre se maximiza  
C. se maximiza o minimiza según el problema ✅  
D. es una restricción

## T6.4
Si existe un óptimo finito en una región poligonal, se alcanza:
A. necesariamente en el centro  
B. en algún vértice ✅  
C. siempre en `(0,0)`  
D. en cualquier punto

## T6.5
Las restricciones `x≥0`, `y≥0` suelen indicar:
A. continuidad  
B. no negatividad de cantidades ✅  
C. derivabilidad  
D. simetría

## T6.6
Para hallar un vértice se resuelven:
A. dos funciones objetivo  
B. las ecuaciones de dos fronteras ✅  
C. dos derivadas  
D. dos integrales

## T6.7
Si no existe ningún punto que cumpla todas las restricciones:
A. hay infinitas soluciones  
B. la región factible es vacía ✅  
C. el máximo es 0  
D. la función objetivo es constante

## T6.8
En un problema real, lo primero debe ser:
A. dibujar cualquier región  
B. definir las variables de decisión ✅  
C. calcular derivadas  
D. usar Cramer

## T6.9
Si una función objetivo tiene el mismo valor en todo un lado óptimo:
A. hay múltiples soluciones óptimas ✅  
B. no hay solución  
C. el problema es no lineal  
D. falta una variable

## T6.10
La solución final debe:
A. darse solo como coordenadas  
B. interpretarse en el contexto y con unidades ✅  
C. redondearse siempre a 0  
D. ignorar restricciones implícitas

---

# 7. Tema 7 — Probabilidad

## T7.1
La regla de Laplace se aplica cuando:
A. los resultados elementales son equiprobables ✅  
B. hay dependencia  
C. el espacio es infinito necesariamente  
D. siempre

## T7.2
\[
P(A^c)=
\]
A. `P(A)`  
B. `1-P(A)` ✅  
C. `1+P(A)`  
D. `P(A)^2`

## T7.3
\[
P(A\cup B)=
\]
A. `P(A)+P(B)` siempre  
B. `P(A)+P(B)-P(A∩B)` ✅  
C. `P(A)P(B)`  
D. `P(A∩B)-P(A)`

## T7.4
\[
P(A|B)=
\]
A. `P(B|A)`  
B. \(\frac{P(A\cap B)}{P(B)}\) ✅  
C. `P(A)P(B)` siempre  
D. `P(A)+P(B)`

## T7.5
Si `A` y `B` son independientes:
A. `P(A∩B)=0`  
B. `P(A∩B)=P(A)P(B)` ✅  
C. `P(A|B)=0`  
D. son incompatibles

## T7.6
Dos sucesos incompatibles no triviales:
A. son necesariamente independientes  
B. no pueden ocurrir a la vez ✅  
C. tienen igual probabilidad  
D. son complementarios siempre

## T7.7
En un árbol de probabilidad, la probabilidad de un camino se obtiene:
A. sumando ramas  
B. multiplicando las probabilidades de sus ramas ✅  
C. restando  
D. dividiendo siempre por 2

## T7.8
La probabilidad total sirve para:
A. calcular la probabilidad de un efecto a partir de varias causas ✅  
B. derivar  
C. hallar una matriz inversa  
D. tipificar una normal

## T7.9
Bayes permite:
A. convertir una probabilidad posterior en derivada  
B. calcular la probabilidad de una causa dado un efecto ✅  
C. sumar sucesos incompatibles únicamente  
D. calcular combinaciones

## T7.10
“Al menos un éxito” suele calcularse eficientemente como:
A. `P(0 éxitos)`  
B. `1-P(0 éxitos)` ✅  
C. `P(1 éxito)`  
D. `P(n éxitos)`

---

# 8. Tema 8 — Distribuciones de probabilidad

## T8.1
Una variable aleatoria discreta:
A. puede tomar cualquier real necesariamente  
B. toma valores aislados/contables ✅  
C. no tiene probabilidades  
D. siempre es normal

## T8.2
Para que un experimento sea binomial debe haber:
A. probabilidad cambiante en cada ensayo  
B. dos resultados, independencia, `p` constante y `n` fijo ✅  
C. variable continua  
D. al menos tres resultados

## T8.3
Si `X~B(n,p)`, entonces:
A. `E(X)=p`  
B. `E(X)=np` ✅  
C. `E(X)=n/p`  
D. `E(X)=n(1-p)`

## T8.4
La varianza de una binomial es:
A. `np`  
B. `np(1-p)` ✅  
C. `√np`  
D. `p(1-p)`

## T8.5
La tipificación correcta es:
A. `Z=Xσ+μ`  
B. `Z=(X-μ)/σ` ✅  
C. `Z=(X+μ)/σ`  
D. `Z=X/μ`

## T8.6
La normal estándar tiene:
A. `μ=1`, `σ=0`  
B. `μ=0`, `σ=1` ✅  
C. `μ=1`, `σ=1`  
D. `μ=0`, `σ=0`

## T8.7
En una distribución normal, la probabilidad se interpreta como:
A. longitud de la curva  
B. área bajo la curva ✅  
C. pendiente  
D. ordenada máxima solamente

## T8.8
Para aproximar `B(n,p)` por una normal se usa:
A. `μ=p`, `σ=n`  
B. `μ=np`, `σ=\sqrt{np(1-p)}` ✅  
C. `μ=n`, `σ=p`  
D. `μ=0`, `σ=1`

## T8.9
Al aproximar
\[
P(X\le 12)
\]
con una normal, la corrección de continuidad da:
A. `P(Y≤11.5)`  
B. `P(Y≤12)`  
C. `P(Y≤12.5)` ✅  
D. `P(Y≥12.5)`

## T8.10
“Al menos 8” significa:
A. `P(X<8)`  
B. `P(X≤8)`  
C. `P(X≥8)` ✅  
D. `P(X=8)` solamente

---

# 9. Tema 9 — Inferencia estadística

## T9.1
Un parámetro es:
A. una medida de la muestra  
B. una medida de la población ✅  
C. un error de cálculo  
D. una gráfica

## T9.2
La media muestral se denota habitualmente:
A. `μ`  
B. `\bar X` ✅  
C. `σ`  
D. `p`

## T9.3
El error típico de la media, con `σ` conocida, es:
A. `σn`  
B. `σ/\sqrt n` ✅  
C. `σ/n^2`  
D. `n/σ`

## T9.4
Aumentar el tamaño muestral:
A. aumenta el error típico  
B. disminuye el error típico ✅  
C. no cambia nada  
D. vuelve sesgada cualquier muestra

## T9.5
Un intervalo de confianza tiene estructura:
A. estimador × error  
B. estimador ± valor crítico × error típico ✅  
C. parámetro ± muestra  
D. media ± varianza²

## T9.6
Para un IC normal bilateral del 95 %, el valor crítico aproximado es:
A. `0.95`  
B. `1.00`  
C. `1.96` ✅  
D. `2.58`

## T9.7
Si aumentamos el nivel de confianza manteniendo todo lo demás:
A. el intervalo suele ensancharse ✅  
B. se estrecha  
C. no cambia  
D. se vuelve asimétrico necesariamente

## T9.8
Al calcular el tamaño mínimo de muestra, si sale `384.16`:
A. `n=384`  
B. `n=385` ✅  
C. `n=384.16`  
D. `n=380`

## T9.9
Si no se conoce `p` al planificar el tamaño muestral para una proporción y se busca el caso más conservador, suele tomarse:
A. `p=0`  
B. `p=0.25`  
C. `p=0.5` ✅  
D. `p=1`

## T9.10
¿Cuál es una interpretación correcta de un procedimiento de IC del 95 %?
A. En repeticiones del muestreo, aproximadamente el 95 % de los intervalos construidos de ese modo contendrían el parámetro ✅  
B. El 95 % de la población está dentro del intervalo  
C. La media muestral tiene probabilidad 0.95 de ser correcta  
D. El parámetro cambia de una muestra a otra

---

# 10. Requisitos para ampliar el banco

Para una versión de producción conviene llegar, como mínimo, a:
- **60–80 ítems por tema**;
- 40 % nivel básico;
- 40 % nivel medio;
- 20 % nivel avanzado;
- al menos 3 variantes paramétricas por ítem de cálculo.

## 10.1. Ítems parametrizados
Ejemplo:

```js
function makeDerivativeQuestion() {
  const a = randInt(2, 5);
  const n = randInt(2, 5);
  return {
    promptLatex: `f(x)=(${a}x-1)^${n}`,
    correctLatex: `${n*a}(${a}x-1)^${n-1}`,
    misconception: "regla-cadena"
  };
}
```

## 10.2. Métricas por pregunta
Guardar:
- porcentaje de acierto;
- tiempo medio;
- distractor más elegido;
- uso de pista;
- número de exposiciones.

Una pregunta con 95 % de acierto en menos de 2 s probablemente es demasiado fácil; una con menos de 20 % puede estar mal calibrada o mal redactada.
