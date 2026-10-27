# Laboratorios y minijuegos autocorregibles
## Matemáticas Aplicadas a las Ciencias Sociales II — 2.º de Bachillerato

> Documento de especificación funcional y didáctica para implementar en **HTML + CSS + JavaScript** una sección de laboratorio interactivo en cada uno de los 9 temas.  
> Las expresiones matemáticas se plantean en **LaTeX** para renderizarse con **KaTeX** o **MathJax**.

---

# 0. Principios generales del laboratorio

## 0.1. Objetivo pedagógico
Los minijuegos no deben sustituir a los ejercicios desarrollados, sino cumplir cuatro funciones:

1. **Automatizar conocimientos básicos**: fórmulas, clasificación, reconocimiento de patrones y operaciones sencillas.
2. **Dar feedback inmediato** antes de que el error se consolide.
3. **Visualizar conceptos abstractos** mediante gráficas, diagramas, regiones, matrices, árboles o simulaciones.
4. **Aumentar la práctica deliberada** mediante sesiones breves de 3–8 minutos, con dificultad progresiva.

## 0.2. Bucle de juego común
Cada minijuego debería seguir este bucle:

1. Se presenta un reto breve.
2. El alumno responde mediante botón, selección, arrastre, input numérico o interacción gráfica.
3. Se valida en el cliente.
4. Aparece feedback en menos de 150 ms.
5. Si falla, se ofrece:
   - indicación concreta del error;
   - una pista opcional;
   - tras un segundo intento, solución razonada paso a paso.
6. Se actualizan puntos, racha, tiempo y progreso.
7. Se genera automáticamente un nuevo reto con parámetros distintos.

## 0.3. Gamificación recomendada
- **Puntuación base**: 100 puntos por acierto.
- **Bonus de rapidez**: hasta +50, decreciendo linealmente con el tiempo usado.
- **Racha**: multiplicador progresivo `×1.0`, `×1.1`, `×1.2`... con tope `×2`.
- **Combo conceptual**: bonus si se encadenan ejercicios de subtipos diferentes sin error.
- **Vidas**: evitar sistemas excesivamente punitivos. Mejor usar 3 “escudos de error” que solo rompen la racha.
- **Cuenta atrás**:
  - modo práctica: desactivable;
  - modo reto: 30–90 s según juego;
  - modo examen: tiempo global.
- **Estrellas**:
  - 1 estrella: 60 %;
  - 2 estrellas: 80 %;
  - 3 estrellas: 95 % + al menos una racha de 5.
- **Misiones**: “Consigue 5 límites sin usar pista”, “Resuelve 3 Bayes seguidos”, etc.
- **Progreso visible**: barra por competencias, no solo por puntos.

## 0.4. Feedback inmediato
Cada respuesta debe devolver uno de estos estados:

- **Correcta**: confirmación + una frase de justificación.
- **Casi correcta**: si hay error de signo, redondeo, intervalo abierto/cerrado o notación.
- **Incorrecta conceptual**: explicar qué regla se ha confundido.
- **Incorrecta procedimental**: señalar el paso donde suele producirse el error.
- **Sin respuesta**: pista mínima, no solución directa.

Ejemplo:

> ❌ No. Has marcado \(+\infty\), pero el denominador se acerca a \(0^-\).  
> Como el numerador es positivo, el cociente tiende a \(-\infty\).

## 0.5. Requisitos de accesibilidad
- Navegación completa por teclado.
- `aria-label` en controles.
- No depender solo del color para correcto/incorrecto.
- Modo **sin cuenta atrás**.
- Preferencia `prefers-reduced-motion`.
- Tamaño de fuente configurable.
- Botón “leer en voz alta” opcional.
- En gráficas: etiquetas, rejilla, valores y descripción textual.
- Contraste AA como mínimo.

## 0.6. Arquitectura técnica sugerida

### Render matemático
Preferible **KaTeX** por velocidad.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
```

### Estructura de un reto
```js
{
  id: "t1-lim-001",
  topic: "limites",
  level: 2,
  promptLatex: "\\lim_{x\\to 2}\\frac{x^2-4}{x-2}",
  type: "multipleChoice",
  optionsLatex: ["0", "2", "4", "\\infty"],
  correctIndex: 2,
  hint: "Factoriza el numerador.",
  explanationLatex: "\\frac{(x-2)(x+2)}{x-2}=x+2\\Rightarrow 4",
  tags: ["0/0", "factorizacion"]
}
```

### Estado de partida
```js
{
  score: 1250,
  streak: 6,
  shields: 2,
  correct: 14,
  wrong: 3,
  hintsUsed: 1,
  startedAt: 1712345678901
}
```

---

# 1. Tema 1 — Límites y derivadas

## Laboratorio 1A. «Límite Express»
**Conceptos**: límites laterales, infinito, indeterminaciones, asíntotas, cálculo de límites sencillos.

### Mecánica
- Aparece una expresión o una mini-gráfica.
- El alumno debe escoger el valor del límite entre 4 opciones.
- Tiempo por ronda: 20 s.
- 10 rondas.
- Cada 3 aciertos, aparece una ronda “jefe” con indeterminación.

### Tipos de reto
1. Sustitución directa.
2. `0/0` con factorización.
3. `∞/∞` racional.
4. Límite lateral.
5. Identificación de asíntota.
6. Límite leído desde gráfica.

### Generación automática
- Polinomios de grado 1–3 con raíces controladas.
- Cocientes que simplifican exactamente.
- Parámetros enteros pequeños `[-5,5]`.
- Evitar resultados numéricos excesivamente feos.

### Feedback
- Si se elige un infinito con signo incorrecto, mostrar análisis de signos.
- Si se responde “no existe” cuando los laterales coinciden, mostrar ambos límites.
- Si se detecta una indeterminación como respuesta, recordar: “una indeterminación no es el límite”.

### Dificultad
- Nivel 1: límites directos.
- Nivel 2: laterales y racionales.
- Nivel 3: indeterminaciones combinadas.
- Nivel 4: selección del método más eficiente.

### Visual
- Tarjeta central con LaTeX.
- Barra de tiempo circular.
- Indicador de racha.
- En modo gráfico, animar un punto acercándose a `x=a`.

---

## Laboratorio 1B. «Continuidad: repara la función»
**Conceptos**: continuidad, discontinuidades y funciones a trozos.

### Mecánica
Se muestra una función:

\[
f(x)=
\begin{cases}
ax+b,&x<2\\
5,&x=2\\
x^2-1,&x>2
\end{cases}
\]

El alumno debe:
1. calcular los límites laterales;
2. decidir si es continua;
3. si no lo es, ajustar `a`, `b` o el valor puntual para “repararla”.

### Interacción
- Inputs numéricos.
- Botón “probar”.
- Vista gráfica que se actualiza en tiempo real.

### Puntuación
- +50 por cada límite lateral correcto.
- +100 por diagnóstico.
- +150 por reparación correcta.
- Bonus +100 si se resuelve sin pista.

### Feedback
Mostrar los tres requisitos:
- existe `f(a)`;
- existe `\lim_{x\to a}f(x)`;
- coinciden.

---

## Laboratorio 1C. «Derivada Detective»
**Conceptos**: función derivada, reglas, regla de la cadena, derivadas laterales.

### Mecánica
- Se muestra una función y cuatro posibles derivadas.
- El alumno “investiga” cuál es correcta.
- Tras responder, debe seleccionar qué regla ha usado: potencia, producto, cociente o cadena.

### Variante avanzada
En vez de elegir la derivada, se muestran cuatro pasos de una derivación y hay que marcar el primer paso erróneo.

### Ejemplos
\[
f(x)=(3x^2-1)^5
\]
\[
f(x)=\frac{x^2+1}{x-3}
\]

### Feedback
El sistema etiqueta el error:
- “olvidaste multiplicar por la derivada interior”;
- “derivaste numerador y denominador por separado”;
- “error de signo en el cociente”.

---

## Laboratorio 1D. «Tangente Sprint»
**Conceptos**: pendiente, tangente, normal, interpretación geométrica.

### Mecánica
- Se genera `f(x)` y un punto `x=a`.
- El alumno calcula `f(a)`, `f'(a)` y monta la recta tangente.
- Después arrastra una recta en una gráfica hasta que coincida.
- Tiempo: 45 s.

### Validación
Comparar ecuaciones por equivalencia algebraica o usar campos para pendiente y ordenada.

### Jefe de nivel
Pedir la recta normal y distinguir casos de tangente horizontal.

---

# 2. Tema 2 — Representación de funciones

## Laboratorio 2A. «Construye la gráfica»
**Conceptos**: dominio, cortes, asíntotas, crecimiento y extremos.

### Mecánica
El alumno recibe una “ficha de análisis”:
- dominio;
- cortes;
- asíntotas;
- signo de `f'`;
- máximos y mínimos.

Debe escoger entre 4 gráficas o construir la correcta mediante puntos de control.

### Visual
Usar `<canvas>` o SVG. SVG facilita accesibilidad y manipulación.

### Feedback
Si la elección es incorrecta, resaltar el dato incompatible:
> “Esta gráfica cruza el eje `X` en \(x=1\), pero la ficha indica que no tiene ceros.”

---

## Laboratorio 2B. «Transforma la función»
**Conceptos**: traslaciones, expansión y contracción.

### Mecánica
Se parte de `y=f(x)`. El juego pide conseguir:
\[
g(x)=2f(x-3)+1
\]
El alumno usa botones:
- izquierda/derecha;
- arriba/abajo;
- estirar/comprimir;
- reflejar.

### Objetivo
Aplicar transformaciones en el orden correcto y observar cambios en tiempo real.

### Puntuación
Menos movimientos = mayor puntuación.

---

## Laboratorio 2C. «Optimiza»
**Conceptos**: modelización y extremos.

### Mecánica
Microhistorias:
- beneficio de una empresa;
- coste por unidad;
- dimensiones de un recinto;
- ingreso por precio.

El alumno:
1. identifica la función objetivo;
2. delimita el dominio;
3. localiza candidatos;
4. elige máximo/mínimo;
5. interpreta la solución.

### Feedback contextual
> “Matemáticamente \(x=-4\) es crítico, pero no es admisible porque representa una cantidad producida.”

---

# 3. Tema 3 — Integrales

## Laboratorio 3A. «Parejas de primitivas»
**Conceptos**: integral indefinida, inmediatas, constante de integración.

### Mecánica
Juego de emparejar:
- columna izquierda: integrandos;
- columna derecha: primitivas.

Ejemplo:
\[
6x^2 \leftrightarrow 2x^3+C
\]

### Trampa didáctica
Incluir respuestas sin `+C`.

### Puntuación
Combo por 5 parejas consecutivas.

---

## Laboratorio 3B. «Método correcto»
**Conceptos**: integrales inmediatas, casi inmediatas y elección de método.

### Mecánica
Se muestra una integral y 4 estrategias:
- inmediata;
- “cadena al revés”;
- simplificar primero;
- otro método del curso.

El alumno no resuelve al principio: **elige estrategia**. Después se desbloquea la resolución.

### Objetivo
Trabajar la decisión matemática antes del cálculo.

---

## Laboratorio 3C. «Área por tramos»
**Conceptos**: integral definida, Barrow, área geométrica.

### Mecánica
- Se dibuja una función que cruza el eje `X`.
- El alumno marca con clic los puntos donde debe partir el intervalo.
- Luego calcula cada integral.
- El sistema muestra zonas positivas y negativas.

### Feedback clave
Diferenciar:
\[
\int_a^b f(x)\,dx
\]
de
\[
\text{Área}=\int_a^b |f(x)|\,dx
\]

---

# 4. Tema 4 — Matrices y determinantes

## Laboratorio 4A. «Matrix Ops»
**Conceptos**: tipos, suma, producto, potencias.

### Mecánica
- Tablero con matrices 2×2 y 2×3.
- Arrastrar la operación correcta.
- Para productos, el alumno debe comprobar dimensiones antes de calcular.

### Feedback
> “No se puede calcular \(AB\): las columnas de \(A\) no coinciden con las filas de \(B\).”

### Reto rápido
Decidir en 5 s si una operación está definida.

---

## Laboratorio 4B. «La cámara del determinante»
**Conceptos**: determinantes, propiedades, inversa, rango.

### Mecánica
Estilo “escape room”:
- cada determinante correcto abre un candado;
- algunas salas se resuelven usando propiedades, no expansión directa;
- hay que decidir si la matriz es invertible.

### Jefe
Dada `A`, calcular `det(A)`, decidir si tiene inversa y hallar un elemento concreto de `A^{-1}`.

---

## Laboratorio 4C. «Redes y adyacencia»
**Conceptos**: grafos y matriz de adyacencia.

### Mecánica
- Mapa de ciudades/nodos.
- El alumno conecta nodos.
- Debe construir la matriz de adyacencia.
- En otra ronda, se da la matriz y debe reconstruir el grafo.

### Visual
SVG interactivo con nodos arrastrables.

---

# 5. Tema 5 — Sistemas de ecuaciones

## Laboratorio 5A. «Clasificador de sistemas»
**Conceptos**: SCD, SCI, SI, rangos.

### Mecánica
Se muestran:
- sistemas;
- matrices escalonadas;
- pares de rectas;
- valores de rango.

El alumno clasifica arrastrando a tres zonas: `SCD`, `SCI`, `SI`.

### Feedback
Mostrar siempre el criterio:
\[
rg(A)=rg(A|B)=n \Rightarrow SCD
\]
\[
rg(A)=rg(A|B)<n \Rightarrow SCI
\]
\[
rg(A)\ne rg(A|B)\Rightarrow SI
\]

---

## Laboratorio 5B. «Gauss paso a paso»
**Conceptos**: sistemas equivalentes y método de Gauss.

### Mecánica
El alumno elige operaciones por fila desde un menú:
- `F_i ↔ F_j`
- `F_i ← kF_i`
- `F_i ← F_i+kF_j`

El sistema permite varias rutas válidas.

### Evaluación
No comparar con una secuencia única: validar si cada operación mantiene equivalencia y si el estado final es correcto.

### Bonus
Resolver con el menor número de operaciones.

---

## Laboratorio 5C. «Elige el método»
**Conceptos**: inversa, Gauss, Cramer, sistemas homogéneos, parámetros.

### Mecánica
Se presenta un sistema y el alumno debe elegir el método más razonable.

Ejemplos:
- 2×2 con determinante sencillo → Cramer posible.
- 4×4 → Gauss preferible.
- `AX=B` con inversa ya dada → matriz inversa.

### Feedback
No solo “correcto/incorrecto”; explicar eficiencia.

---

# 6. Tema 6 — Programación lineal

## Laboratorio 6A. «Pinta la región factible»
**Conceptos**: inecuaciones y sistemas de inecuaciones.

### Mecánica
- Se muestran restricciones.
- El alumno selecciona el semiplano de cada una.
- La intersección se colorea progresivamente.
- Debe marcar los vértices.

### Validación
Comparar coordenadas con tolerancia configurable.

---

## Laboratorio 6B. «Cazador de vértices»
**Conceptos**: función objetivo y teorema de los vértices.

### Mecánica
Una región factible ya está dibujada.
- El alumno calcula `Z` en cada vértice.
- Arrastra una “línea de nivel” hasta maximizar/minimizar.
- El sistema muestra el último punto de contacto.

### Visual
Animación de la recta:
\[
ax+by=k
\]

---

## Laboratorio 6C. «Fábrica de modelos»
**Conceptos**: traducción de enunciados.

### Mecánica
Se da una historia y piezas arrastrables:
- variables;
- restricciones;
- no negatividad;
- función objetivo.

El alumno construye el modelo antes de resolverlo.

### Feedback
Detectar confusiones de unidades:
> “Has sumado horas y kilogramos en la misma restricción.”

---

# 7. Tema 7 — Probabilidad

## Laboratorio 7A. «Álgebra de sucesos»
**Conceptos**: unión, intersección, complementario, De Morgan.

### Mecánica
Diagramas de Venn interactivos.
El juego pide:
- “colorea \(A\cap B^c\)”;
- “representa ‘exactamente uno’”;
- “representa \((A\cup B)^c\)”.

### Feedback visual
Superponer la región correcta con transparencia.

---

## Laboratorio 7B. «Árbol de probabilidad»
**Conceptos**: experimentos compuestos, condicionada y total.

### Mecánica
- Árbol parcialmente vacío.
- El alumno arrastra probabilidades a ramas.
- Después calcula probabilidades de caminos y eventos.

### Puntuación
Se puntúa tanto el árbol como el resultado final.

---

## Laboratorio 7C. «Detective Bayes»
**Conceptos**: probabilidad total y Bayes.

### Mecánica
Casos narrativos breves:
- test diagnóstico;
- piezas defectuosas de varias fábricas;
- procedencia de clientes;
- filtros automáticos.

El alumno debe identificar:
1. probabilidades a priori;
2. verosimilitudes;
3. evidencia;
4. probabilidad posterior.

### Visual
Animación de 1000 iconos o barras proporcionales para combatir errores intuitivos.

---

# 8. Tema 8 — Distribuciones de probabilidad

## Laboratorio 8A. «Binomial Factory»
**Conceptos**: variable aleatoria, parámetros binomiales.

### Mecánica
El alumno recibe una situación y debe decidir si es binomial usando cuatro interruptores:
- número fijo de ensayos;
- dos resultados;
- independencia;
- probabilidad constante.

Si cumple, identifica `n` y `p` y calcula una probabilidad.

### Feedback
Explicar qué condición falla en los casos no binomiales.

---

## Laboratorio 8B. «Normal Slider»
**Conceptos**: normal, tipificación y áreas.

### Mecánica
- Curva normal interactiva.
- Deslizadores para `μ` y `σ`.
- El alumno mueve límites `a` y `b`.
- Se sombrean probabilidades.

### Retos
- hallar `P(X<k)`;
- hallar `P(a<X<b)`;
- hallar un percentil;
- recuperar `x` a partir de `z`.

### Visual
Mostrar simultáneamente la normal original y la estándar.

---

## Laboratorio 8C. «Corrección de continuidad»
**Conceptos**: aproximación binomial-normal.

### Mecánica
Se muestra una probabilidad binomial:
\[
P(X\le 12)
\]
y varias traducciones a normal:
- `P(Y≤12)`
- `P(Y≤12.5)`
- `P(Y<11.5)`
- etc.

El alumno elige la correcta antes de calcular.

### Objetivo
Automatizar:
- `X≤k → Y≤k+0.5`
- `X<k → Y≤k-0.5`
- `X≥k → Y≥k-0.5`
- `X>k → Y≥k+0.5`

---

# 9. Tema 9 — Inferencia estadística

## Laboratorio 9A. «Diseña la muestra»
**Conceptos**: muestreo y sesgos.

### Mecánica
Historias de investigación:
- encuesta escolar;
- intención de voto;
- satisfacción de clientes;
- estudio de salarios.

El alumno debe elegir:
- población;
- marco muestral;
- técnica de muestreo;
- tamaño;
- posibles sesgos.

### Modo simulación
Generar una población ficticia de 10 000 individuos y comparar muestras aleatorias y sesgadas.

### Visual
Histogramas o porcentajes lado a lado.

---

## Laboratorio 9B. «Constructor de intervalos»
**Conceptos**: distribución muestral, IC de media y proporción.

### Mecánica
El alumno recibe:
- `\bar x`, `σ`, `n`, confianza; o
- `\hat p`, `n`, confianza.

Debe construir el intervalo mediante bloques:
1. estimador;
2. valor crítico;
3. error típico;
4. margen de error;
5. extremos.

### Visual
Recta numérica con el intervalo y el estimador en el centro.

### Simulación clave
Generar 100 intervalos de confianza a partir de muestras simuladas y mostrar qué porcentaje contiene el parámetro real.

---

## Laboratorio 9C. «Auditor de encuestas»
**Conceptos**: ficha técnica, error, tamaño muestral e interpretación.

### Mecánica
Se presenta una ficha de encuesta con algunos datos correctos y otros problemáticos.

El alumno debe detectar:
- muestra insuficiente;
- muestreo sesgado;
- interpretación incorrecta del 95 %;
- margen de error incoherente;
- ausencia de información esencial.

### Jefe
Calcular tamaño mínimo:
\[
n=\left(\frac{z_{\alpha/2}\sigma}{E}\right)^2
\]
o, para proporciones,
\[
n=\frac{z_{\alpha/2}^2p(1-p)}{E^2}.
\]

---

# 10. Sistema común de dificultad

## Nivel 1 — Reconocimiento
- Respuesta múltiple.
- Números enteros.
- Sin presión de tiempo.

## Nivel 2 — Aplicación
- Cálculos de 1–3 pasos.
- Tiempo moderado.
- Pistas opcionales.

## Nivel 3 — Transferencia
- Datos contextualizados.
- Varias representaciones: tabla, fórmula, gráfica.
- Distractores basados en errores reales.

## Nivel 4 — Reto
- Problemas mixtos.
- Sin pista inicial.
- Cuenta atrás.
- Bonus por estrategia eficiente.

---

# 11. Analítica educativa útil

Registrar por alumno:
- porcentaje de aciertos por subtema;
- tiempo medio;
- número de pistas;
- errores recurrentes;
- racha máxima;
- nivel alcanzado;
- fecha de última práctica.

No guardar únicamente una nota global. La interfaz docente debería poder mostrar, por ejemplo:

> Límites laterales: 92 %  
> Indeterminaciones: 61 %  
> Regla de L'Hôpital: 78 %

---

# 12. Criterios de finalización por tema

Un laboratorio puede considerarse “dominado” cuando el alumno:
- supera el 80 % global;
- alcanza al menos 70 % en cada subcompetencia;
- resuelve 3 retos de nivel 3 consecutivos;
- no depende de pistas en las últimas 5 actividades.

La insignia debe reflejar **dominio**, no solo número de partidas.
