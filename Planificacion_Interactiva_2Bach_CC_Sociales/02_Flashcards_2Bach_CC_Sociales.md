# Sistema de flashcards
## Matemáticas Aplicadas a las Ciencias Sociales II — 2.º de Bachillerato

> Especificación de contenido y funcionamiento para una sección de tarjetas de memoria por tema.  
> Las fórmulas se escriben en LaTeX y deben renderizarse con KaTeX o MathJax.

---

# 0. Diseño general

## 0.1. Tipos de tarjetas
Cada mazo debe combinar cinco formatos:

1. **Definición** — “¿Qué significa…?”
2. **Fórmula** — “Completa / recuerda la expresión”.
3. **Interpretación** — “¿Qué nos dice matemáticamente?”
4. **Procedimiento** — “¿Qué pasos seguirías?”
5. **Error frecuente** — “¿Por qué esta afirmación es falsa?”

## 0.2. Mecánica de repaso
Después de revelar la respuesta:
- **No lo sabía**
- **Me costó**
- **Bien**
- **Muy fácil**

Usar repetición espaciada tipo Leitner o SM-2 simplificado.

Sugerencia de intervalos:
- No lo sabía → 5 min / mismo día.
- Me costó → 1 día.
- Bien → 3 días.
- Muy fácil → 7 días, luego crecimiento exponencial.

## 0.3. Estructura de datos
```js
{
  id: "t7-fc-014",
  topic: "probabilidad",
  subtopic: "bayes",
  front: "¿Qué calcula el teorema de Bayes?",
  backLatex: "P(A_i\\mid B)=\\frac{P(A_i)P(B\\mid A_i)}{P(B)}",
  note: "Permite actualizar una probabilidad a priori al observar B.",
  tags: ["formula", "interpretacion"],
  difficulty: 2
}
```

---

# 1. Tema 1 — Límites y derivadas
**Mazo recomendado: 24–30 tarjetas.**

| # | Anverso / concepto | Reverso esperado |
|---|---|---|
| 1 | ¿Qué expresa \(\lim_{x\to a}f(x)=L\)? | El valor al que se aproxima `f(x)` cuando `x` se aproxima a `a`. |
| 2 | Diferencia entre `f(a)` y el límite en `a` | El valor puntual puede existir o no y puede diferir del límite. |
| 3 | Condición para que exista un límite finito | Los límites laterales existen y coinciden. |
| 4 | ¿Qué es un límite lateral? | Aproximación solo por izquierda o derecha. |
| 5 | ¿Qué indica \(\lim_{x\to a}f(x)=\infty\)? | Crecimiento sin cota cerca de `a`; posible asíntota vertical. |
| 6 | Asíntota vertical | `x=a` si la función diverge a `±∞` al acercarse a `a` por algún lado. |
| 7 | Asíntota horizontal | `y=L` si `f(x)→L` cuando `x→±∞`. |
| 8 | Forma indeterminada | Forma que no determina por sí sola el valor del límite. |
| 9 | Indeterminaciones básicas | `0/0`, `∞/∞`, `∞−∞`, `0·∞`... |
| 10 | Continuidad en `x=a` | Existe `f(a)`, existe el límite y ambos coinciden. |
| 11 | Tipos básicos de discontinuidad | Evitable, salto, infinita. |
| 12 | Tasa de variación media | \(\frac{f(b)-f(a)}{b-a}\). |
| 13 | Definición de derivada | \(f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}h\). |
| 14 | Interpretación geométrica de `f'(a)` | Pendiente de la tangente. |
| 15 | Signo de la derivada | `f'>0` crecimiento; `f'<0` decrecimiento. |
| 16 | Derivabilidad vs continuidad | Derivable ⇒ continua; el recíproco no siempre. |
| 17 | Recta tangente | \(y-f(a)=f'(a)(x-a)\). |
| 18 | Recta normal | Pendiente \(-1/f'(a)\), si `f'(a)≠0`. |
| 19 | Regla del producto | \((fg)'=f'g+fg'\). |
| 20 | Regla del cociente | \((f/g)'=(f'g-fg')/g^2\). |
| 21 | Regla de la cadena | \((f\circ g)'=(f'\circ g)g'\). |
| 22 | ¿Cuándo usar L'Hôpital? | En `0/0` o `∞/∞`, bajo sus condiciones. |
| 23 | Error: derivar un cociente “arriba/abajo” | Es incorrecto; hay que usar la regla del cociente. |
| 24 | Error: responder “0/0” como límite | `0/0` es indeterminación, no resultado. |

---

# 2. Tema 2 — Representación de funciones
**Mazo recomendado: 20–24 tarjetas.**

| # | Concepto | Reverso esperado |
|---|---|---|
| 1 | Orden de estudio de una función | Dominio → cortes → continuidad/asíntotas → monotonía/extremos → gráfica. |
| 2 | Dominio de racional | Todos los reales salvo ceros del denominador. |
| 3 | Ceros de una función | Soluciones de `f(x)=0`. |
| 4 | Corte con eje Y | Punto `(0,f(0))` si `0` pertenece al dominio. |
| 5 | Comportamiento de polinomio en infinito | Lo determina el término de mayor grado. |
| 6 | Racional: asíntota vertical | Suele aparecer en ceros no cancelados del denominador. |
| 7 | Exponencial `a^x`, `a>1` | Creciente, positiva, asíntota `y=0`. |
| 8 | Exponencial `0<a<1` | Decreciente, positiva, asíntota `y=0`. |
| 9 | Dominio de `log_a x` | `(0,∞)`. |
| 10 | Asíntota del logaritmo | `x=0`. |
| 11 | Valor absoluto | Distancia a 0; se expresa por tramos. |
| 12 | `f(x)+k` | Traslación vertical `k`. |
| 13 | `f(x-a)` | Traslación horizontal `a` a la derecha. |
| 14 | `af(x)` | Escala vertical. |
| 15 | `f(bx)` | Escala horizontal por factor inverso `1/|b|`. |
| 16 | Punto crítico | Punto del dominio donde `f'=0` o `f'` no existe, según contexto. |
| 17 | Candidato a extremo absoluto en `[a,b]` | Críticos interiores y extremos del intervalo. |
| 18 | Optimización: primer paso | Definir variables y función objetivo. |
| 19 | Error frecuente en optimización | No comprobar el dominio real del problema. |
| 20 | Interpretación del máximo | Debe expresarse con unidades y significado contextual. |

---

# 3. Tema 3 — Integrales
**Mazo recomendado: 18–22 tarjetas.**

| # | Concepto | Reverso esperado |
|---|---|---|
| 1 | Primitiva | `F` tal que `F'=f`. |
| 2 | Integral indefinida | \(\int f(x)dx=F(x)+C\). |
| 3 | ¿Por qué aparece `+C`? | Todas las primitivas difieren en una constante. |
| 4 | Linealidad | \(\int(af+bg)=a\int f+b\int g\). |
| 5 | \(\int x^n dx\) | \(x^{n+1}/(n+1)+C\), `n≠−1`. |
| 6 | \(\int 1/x\,dx\) | \(\ln|x|+C\). |
| 7 | Integral “casi inmediata” | Aparece una función y, salvo factor, su derivada. |
| 8 | Integral definida | Acumulación/área con signo entre dos límites. |
| 9 | Cambio de límites | \(\int_a^b f=-\int_b^a f\). |
| 10 | Aditividad | \(\int_a^c f=\int_a^b f+\int_b^c f\). |
| 11 | Teorema fundamental | Relaciona derivación e integración. |
| 12 | Regla de Barrow | \(\int_a^b f=F(b)-F(a)\). |
| 13 | Integral y área | No coinciden si la función cambia de signo. |
| 14 | Área bajo eje X | Se toma positiva al calcular área geométrica. |
| 15 | Área entre dos curvas | \(\int(\text{superior}-\text{inferior})dx\). |
| 16 | Primer paso en área entre curvas | Hallar puntos de corte. |
| 17 | Error: olvidar dividir por tramos | Es necesario si cambia signo o cambia qué función está arriba. |
| 18 | Comprobación de una primitiva | Derivarla. |

---

# 4. Tema 4 — Matrices y determinantes
**Mazo recomendado: 24–28 tarjetas.**

| # | Concepto | Reverso esperado |
|---|---|---|
| 1 | Orden de una matriz | Número de filas × número de columnas. |
| 2 | Matriz identidad | Diagonal de 1 y resto 0. |
| 3 | Igualdad de matrices | Mismo orden y elementos correspondientes iguales. |
| 4 | Cuándo se suman matrices | Cuando tienen el mismo orden. |
| 5 | Condición para `AB` | Columnas de `A` = filas de `B`. |
| 6 | Orden de `AB` | Filas de `A` × columnas de `B`. |
| 7 | ¿Es conmutativo el producto? | En general, no. |
| 8 | Potencia `A^n` | Requiere matriz cuadrada. |
| 9 | Traspuesta | Intercambiar filas por columnas. |
| 10 | Matriz simétrica | `A=A^T`. |
| 11 | Matriz antisimétrica | `A^T=-A`. |
| 12 | Determinante 2×2 | \(ad-bc\). |
| 13 | `det(A)=0` | `A` no es invertible. |
| 14 | `det(AB)` | `det(A)det(B)`. |
| 15 | Efecto de intercambiar dos filas | Cambia el signo del determinante. |
| 16 | Matriz adjunta | Traspuesta de la matriz de cofactores, según convención. |
| 17 | Fórmula de la inversa | \(A^{-1}=\frac1{\det A}\operatorname{Adj}(A)\). |
| 18 | Rango | Máximo número de filas/columnas linealmente independientes. |
| 19 | Ecuación `AX=B` | Si existe inversa, `X=A^{-1}B`. |
| 20 | Error en ecuación matricial | No se puede cambiar libremente el orden de los factores. |
| 21 | Grafo | Conjunto de vértices y aristas. |
| 22 | Matriz de adyacencia | Registra conexiones entre vértices. |
| 23 | Diagonal en grafo simple sin lazos | Ceros. |
| 24 | Simetría de adyacencia en grafo no dirigido | La matriz es simétrica. |

---

# 5. Tema 5 — Sistemas de ecuaciones
**Mazo recomendado: 22–26 tarjetas.**

| # | Concepto | Reverso esperado |
|---|---|---|
| 1 | Sistema lineal | Conjunto de ecuaciones lineales que deben cumplirse simultáneamente. |
| 2 | SCD | Una única solución. |
| 3 | SCI | Infinitas soluciones. |
| 4 | SI | Ninguna solución. |
| 5 | Forma matricial | `AX=B`. |
| 6 | Matriz ampliada | `(A|B)`. |
| 7 | Sistemas equivalentes | Tienen el mismo conjunto de soluciones. |
| 8 | Operaciones elementales | Intercambiar filas, multiplicar por no nulo, sumar múltiplos. |
| 9 | Rouché-Frobenius: compatibilidad | `rg(A)=rg(A|B)`. |
| 10 | Condición SCD | Rangos iguales al nº de incógnitas. |
| 11 | Condición SCI | Rangos iguales y menores que nº de incógnitas. |
| 12 | Condición SI | Rangos distintos. |
| 13 | Método de la inversa | `X=A^{-1}B`. |
| 14 | Cuándo existe método de la inversa | `A` cuadrada e invertible. |
| 15 | Método de Gauss | Escalonar mediante operaciones elementales. |
| 16 | Regla de Cramer | Usa determinantes; requiere `det(A)≠0`. |
| 17 | Sistema homogéneo | `AX=0`. |
| 18 | Solución trivial | `X=0`. |
| 19 | Homogéneo con `det(A)≠0` | Solo solución trivial. |
| 20 | Parámetro | Puede cambiar rango y clasificación. |
| 21 | Error frecuente | Dividir por una expresión con parámetro sin separar el caso en que vale 0. |
| 22 | Interpretación 2×2 | Intersección de rectas. |

---

# 6. Tema 6 — Programación lineal
**Mazo recomendado: 18–22 tarjetas.**

| # | Concepto | Reverso esperado |
|---|---|---|
| 1 | Inecuación lineal en 2 variables | Define un semiplano. |
| 2 | Frontera | Recta asociada sustituyendo desigualdad por igualdad. |
| 3 | Región factible | Intersección de todas las restricciones. |
| 4 | No negatividad | `x≥0`, `y≥0` cuando las variables representan cantidades. |
| 5 | Variable de decisión | Magnitud que el modelo debe elegir. |
| 6 | Función objetivo | Expresión lineal que se maximiza o minimiza. |
| 7 | Vértice | Intersección de fronteras relevante de la región factible. |
| 8 | Teorema de los vértices | Si existe óptimo finito, se alcanza en algún vértice. |
| 9 | Procedimiento estándar | Modelar → representar → vértices → evaluar → interpretar. |
| 10 | Región vacía | No existe solución factible. |
| 11 | Región no acotada | Puede existir o no óptimo finito. |
| 12 | Óptimos múltiples | La función objetivo es paralela a un lado óptimo. |
| 13 | Error frecuente | Olvidar una restricción implícita del contexto. |
| 14 | Semiplano de prueba | Se decide sustituyendo un punto, normalmente `(0,0)` si no está en la frontera. |
| 15 | Máximo | Mayor valor de la función objetivo en la región. |
| 16 | Mínimo | Menor valor de la función objetivo en la región. |
| 17 | Interpretación | La solución final debe expresarse en unidades reales. |
| 18 | Restricción de recurso | Traduce disponibilidad máxima o mínima. |

---

# 7. Tema 7 — Probabilidad
**Mazo recomendado: 26–32 tarjetas.**

| # | Concepto | Reverso esperado |
|---|---|---|
| 1 | Experimento aleatorio | No se puede predecir con certeza el resultado individual. |
| 2 | Espacio muestral | Conjunto de resultados posibles. |
| 3 | Suceso | Subconjunto del espacio muestral. |
| 4 | Regla de Laplace | Favorables / posibles si son equiprobables. |
| 5 | Unión | Ocurre `A` o `B` o ambos. |
| 6 | Intersección | Ocurren ambos. |
| 7 | Complementario | No ocurre `A`. |
| 8 | Incompatibles | `A∩B=∅`. |
| 9 | Ley de De Morgan 1 | \((A\cup B)^c=A^c\cap B^c\). |
| 10 | Ley de De Morgan 2 | \((A\cap B)^c=A^c\cup B^c\). |
| 11 | Tabla de contingencia | Organiza frecuencias conjuntas y marginales. |
| 12 | Frecuencia relativa | Frecuencia absoluta / total. |
| 13 | Axioma `P(Ω)` | `1`. |
| 14 | Complementario | `P(A^c)=1-P(A)`. |
| 15 | Unión | `P(A∪B)=P(A)+P(B)-P(A∩B)`. |
| 16 | Probabilidad condicionada | \(P(A|B)=P(A∩B)/P(B)\). |
| 17 | Regla del producto | `P(A∩B)=P(B)P(A|B)`. |
| 18 | Independencia | `P(A∩B)=P(A)P(B)`. |
| 19 | Incompatible ≠ independiente | Sucesos incompatibles no triviales suelen ser dependientes. |
| 20 | Experimento compuesto | Consta de varias etapas. |
| 21 | Diagrama de árbol | Representa etapas y probabilidades condicionadas. |
| 22 | Probabilidad total | \(\sum P(A_i)P(B|A_i)\). |
| 23 | Bayes | Actualiza probabilidad de una causa al observar un efecto. |
| 24 | Fórmula de Bayes | \(P(A_i|B)=\frac{P(A_i)P(B|A_i)}{P(B)}\). |
| 25 | Error típico en Bayes | Confundir `P(A|B)` con `P(B|A)`. |
| 26 | “Al menos uno” | Suele ser eficiente usar el complementario de “ninguno”. |

---

# 8. Tema 8 — Distribuciones de probabilidad
**Mazo recomendado: 22–26 tarjetas.**

| # | Concepto | Reverso esperado |
|---|---|---|
| 1 | Variable aleatoria | Asigna un número a cada resultado del experimento. |
| 2 | Discreta | Toma valores aislados/contables. |
| 3 | Continua | Puede tomar cualquier valor de intervalos. |
| 4 | Distribución de probabilidad | Describe probabilidades de los valores de la variable. |
| 5 | Esperanza | Valor medio teórico a largo plazo. |
| 6 | Varianza | Medida de dispersión cuadrática. |
| 7 | Binomial: condiciones | `n` fijo, 2 resultados, independencia, `p` constante. |
| 8 | Notación binomial | `X~B(n,p)`. |
| 9 | Probabilidad binomial | \(\binom nk p^k(1-p)^{n-k}\). |
| 10 | Media binomial | `np`. |
| 11 | Varianza binomial | `np(1-p)`. |
| 12 | Desviación binomial | \(\sqrt{np(1-p)}\). |
| 13 | “Como máximo k” | `P(X≤k)`. |
| 14 | “Al menos k” | `P(X≥k)`. |
| 15 | Normal | Distribución continua simétrica en forma de campana. |
| 16 | Parámetros normal | `μ` y `σ`. |
| 17 | Tipificación | \(Z=(X-\mu)/\sigma\). |
| 18 | Normal estándar | `N(0,1)`. |
| 19 | Probabilidad en normal | Área bajo la curva. |
| 20 | Aproximación binomial-normal | Media `np`, desviación `√(np(1-p))`. |
| 21 | Corrección de continuidad | Ajustar en `±0.5`. |
| 22 | `P(X≤k)` aproximada | `P(Y≤k+0.5)`. |
| 23 | `P(X≥k)` aproximada | `P(Y≥k−0.5)`. |
| 24 | Condición práctica de aproximación | `np` y `n(1-p)` suficientemente grandes. |

---

# 9. Tema 9 — Inferencia estadística
**Mazo recomendado: 28–34 tarjetas.**

| # | Concepto | Reverso esperado |
|---|---|---|
| 1 | Población | Conjunto total de interés. |
| 2 | Muestra | Subconjunto observado de la población. |
| 3 | Parámetro | Medida numérica de la población. |
| 4 | Estadístico | Medida calculada sobre una muestra. |
| 5 | Inferencia | Usar una muestra para sacar conclusiones sobre la población. |
| 6 | Sesgo | Error sistemático del procedimiento. |
| 7 | Muestreo aleatorio simple | Todas las muestras de tamaño `n` tienen igual probabilidad. |
| 8 | Muestreo sistemático | Selección cada `k` elementos tras inicio aleatorio. |
| 9 | Muestreo estratificado | Se divide en estratos homogéneos y se muestrea dentro de ellos. |
| 10 | Conglomerados | Se seleccionan grupos naturales. |
| 11 | Media muestral | \(\bar X\). |
| 12 | Proporción muestral | \(\hat p\). |
| 13 | `E(\bar X)` | `μ`. |
| 14 | Error típico de la media | `σ/√n`. |
| 15 | Error típico de proporción | \(\sqrt{p(1-p)/n}\). |
| 16 | Teorema central del límite | Justifica aproximación normal de medias bajo condiciones adecuadas. |
| 17 | Estimación puntual | Un único valor como estimación del parámetro. |
| 18 | Intervalo de confianza | Rango construido mediante un procedimiento con nivel de confianza fijado. |
| 19 | Estructura IC | estimador ± valor crítico × error típico. |
| 20 | Valor crítico 95 % | Aproximadamente `1.96` para normal estándar. |
| 21 | Margen de error | Semiamplitud del intervalo. |
| 22 | IC media, `σ` conocida | \(\bar x\pm z_{\alpha/2}\sigma/\sqrt n\). |
| 23 | IC proporción | \(\hat p\pm z_{\alpha/2}\sqrt{\hat p(1-\hat p)/n}\). |
| 24 | Efecto de aumentar `n` | Disminuye el error. |
| 25 | Efecto de aumentar confianza | Aumenta la amplitud. |
| 26 | Tamaño para media | \(n=(z_{\alpha/2}\sigma/E)^2\), redondeando arriba. |
| 27 | Tamaño para proporción | \(n=z^2p(1-p)/E^2\), redondeando arriba. |
| 28 | Caso conservador proporción | Usar `p=0.5` si no se conoce y se busca máxima variabilidad. |
| 29 | Interpretación incorrecta del 95 % | No significa que el parámetro aleatorio tenga 95 % de probabilidad de estar en ese IC ya calculado. |
| 30 | Ficha técnica | Debe incluir población, muestra, muestreo, fechas, confianza/error, etc. |

---

# 10. Funciones recomendadas de la interfaz

- Filtro por tema/subtema.
- “Solo las que fallo”.
- “Repaso de 5 minutos”.
- “Modo examen oral”: el alumno debe pensar antes de revelar.
- Marcado con ⭐ de tarjetas difíciles.
- Estadísticas:
  - dominio por tema;
  - tarjetas maduras;
  - tarjetas pendientes;
  - tasa de olvido.

## 10.1. Regla didáctica importante
No mostrar 30 tarjetas nuevas seguidas. Mezclar:
- 60 % repaso;
- 30 % nuevas;
- 10 % difíciles/error frecuente.

## 10.2. Microfeedback
Tras cada autoevaluación, mostrar una recomendación:
> “Has marcado ‘Me costó’ tres veces en Bayes. Volverá a aparecer pronto y se enlazará con un minijuego del Tema 7.”
