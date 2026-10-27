# Auditoría de contenidos del tema 5

11 de octubre de 2026 · Entrega 66.

## Resultado y criterio

Once epígrafes desarrollados, **66 preguntas base**, **66 tarjetas** y **16 problemas o bloques resueltos inventariados**. Es una selección conservadora: se cuenta cada bloque una vez, aunque incluya varios casos o métodos. Las muestras, semillas y preguntas reutilizadas no aumentan el inventario.

El tema sigue **parcial**: queda la revisión global con lectores de pantalla y pronunciación matemática. Esta auditoría verifica cobertura de contenido; no certifica accesibilidad completa ni cierra la biblioteca PDF.

## Fuentes revisadas

- `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 5.1–5.11.
- `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T5.1–T5.10.
- `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, 22 conceptos del tema 5.
- `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, 5A–5C.
- Lecciones, bancos y verificaciones de las entregas 55–65; [procedencia](procedencia-contenidos.md).

El repaso es elaboración propia sobre los contenidos desarrollados. Originales conservados; no se han compilado nuevos paquetes LaTeX en esta entrega.

## Inventario conservador

Las primeras doce filas seleccionan ejemplos existentes distintos. Los ejemplos de entradas repetidos en 5.1 no se suman al inventario; el bloque de repaso que compara tres métodos se cuenta una sola vez.

| Nº | Ubicación y problema | Resultado o comprobación |
|---|---|---|
| 1 | [5.1: Ordenar e identificar](../libro/temas/05-sistemas-de-ecuaciones/01-sistemas-de-ecuaciones-lineales.html#ejemplos) | x+2y=8; coeficientes (1,2), término independiente 8. |
| 2 | [5.2: Recta vertical](../libro/temas/05-sistemas-de-ecuaciones/02-solucion-de-un-sistema-de-ecuaciones.html#ejemplos) | x=2,y=−1 da (2,−1); x=2,3x=6 deja y libre. |
| 3 | [5.3: Identidad dentro de un SCD](../libro/temas/05-sistemas-de-ecuaciones/03-clasificacion-de-sistemas-de-ecuaciones-segun-sus-soluciones.html#ejemplos) | x=2,y=−1,0=0 sigue siendo SCD; añadir x+y=2 da SI. |
| 4 | [5.4: Cambiar el orden de incógnitas](../libro/temas/05-sistemas-de-ecuaciones/04-notacion-matricial-de-un-sistema-de-ecuaciones.html#ejemplos) | Se permutan conjuntamente columnas de A y entradas de X; x=1,y=2. |
| 5 | [5.5: Transformaciones que pierden información](../libro/temas/05-sistemas-de-ecuaciones/05-sistemas-equivalentes.html#ejemplos) | Multiplicar por cero o reemplazar ambas filas por dependientes no conserva el conjunto solución. |
| 6 | [5.6: Tres ecuaciones y dos incógnitas](../libro/temas/05-sistemas-de-ecuaciones/06-teorema-de-rouche-frobenius.html#ejemplos) | Rangos 2/2 y n=2: SCD con (1,2); tercera fila dependiente. |
| 7 | [5.7: Solución fraccionaria exacta](../libro/temas/05-sistemas-de-ecuaciones/07-resolucion-de-sistemas-matriz-inversa.html#ejemplos) | (2/3,−1/3); redondear a (0,67; −0,33) no satisface las ecuaciones. |
| 8 | [5.8: Sistema rectangular y columnas sin pivote](../libro/temas/05-sistemas-de-ecuaciones/08-resolucion-de-sistemas-metodo-de-gauss.html#ejemplos) | (2−t,1+t,t); en la segunda familia, (s,2−t,t). |
| 9 | [5.9: Determinantes cero sin compatibilidad](../libro/temas/05-sistemas-de-ecuaciones/09-resolucion-de-sistemas-regla-de-cramer.html#ejemplos) | Ejemplo 3×3 con Δ y auxiliares nulos, pero 0=1: SI, rangos 1/2. |
| 10 | [5.10: Matriz nula](../libro/temas/05-sistemas-de-ecuaciones/10-sistemas-homogeneos.html#ejemplos) | Cualquier terna real; tres variables libres y soluciones no triviales con coordenadas cero. |
| 11 | [5.11: Rectangular siempre SCI](../libro/temas/05-sistemas-de-ecuaciones/11-discusion-de-sistemas-con-parametros.html#ejemplos) | En λ=1, dos variables libres; fuera, una. |
| 12 | [5.11: Mezcla con precio variable](../libro/temas/05-sistemas-de-ecuaciones/11-discusion-de-sistemas-con-parametros.html#practica) | SI en λ=1; fuera, SCD. Factibilidad no negativa solo para λ≥3/2. |
| 13 | [Repaso: Recaudación y comparación de métodos](../libro/temas/05-sistemas-de-ecuaciones/index.html#repaso-modelo) | (50,40); con 601 €, solución real fraccionaria no válida como número de entradas. |
| 14 | [Repaso: Inventario y nueva condición](../libro/temas/05-sistemas-de-ecuaciones/index.html#repaso-familia) | (10−2t,t+2,t), seis repartos enteros; tercera ecuación con 34 redundante, con 35 incompatible. |
| 15 | [Repaso: Dos discusiones con la misma A](../libro/temas/05-sistemas-de-ecuaciones/index.html#repaso-parametro) | det=(λ−1)²; en λ=1, primera familia SI y segunda SCI. |
| 16 | [Repaso: Cambios con dos condiciones conservadas](../libro/temas/05-sistemas-de-ecuaciones/index.html#repaso-homogeneo) | s(−2,−1,3), s∈[−2,6] para cantidades finales no negativas. |

## Cobertura del guion y las fuentes

Cada epígrafe dispone de seis preguntas y seis tarjetas en `../content/activities/`.

| Epígrafe | Banco y cobertura | Conceptos fuente relacionados |
|---|---|---|
| 5.1 | `linear-systems.js`: linealidad, coeficientes, solución simultánea y modelización. | Tarjeta 1. |
| 5.2 | `system-solutions.js`: solución, geometría, verticales, familias, exactitud y ventana de gráfica. | T5.10; tarjeta 22. |
| 5.3 | `system-classification.js`: SCD/SCI/SI, identidades, contradicciones y dimensiones insuficientes para clasificar. | T5.1–T5.2; tarjetas 2–4. |
| 5.4 | `system-notation.js`: AX=B, ampliada, dimensiones, coeficientes cero y orden. | T5.8; tarjetas 5–6. |
| 5.5 | `equivalent-systems.js`: equivalencia y operaciones reversibles sobre toda la ampliada. | T5.5; tarjetas 7–8. |
| 5.6 | `rouche-frobenius.js`: rangos, número de incógnitas, variables libres y parámetros. | T5.3–T5.4; tarjetas 9–12. |
| 5.7 | `inverse-systems.js`: condiciones, lado de la inversa, cálculo y comprobación. | Tarjetas 13–14. |
| 5.8 | `gauss.js`: pivotes, escalonamiento, sustitución, contradicciones y familias. | T5.5; tarjeta 15. |
| 5.9 | `cramer.js`: columnas auxiliares, cocientes, límites, elección del método y comprobación. | T5.6; tarjeta 16. |
| 5.10 | `homogeneous-systems.js`: AX=0, trivial/no trivial, rango y determinante. | T5.7; tarjetas 17–19. |
| 5.11 | `parameter-systems.js`: valores críticos, particiones, separación antes de dividir y casos compatibles. | T5.9; tarjetas 20–21. |

Los 22 conceptos previstos aparecen en las 66 tarjetas. La recomendación de tamaño de mazo no se interpreta como obligación de añadir duplicados. Los diez tests fuente están desarrollados mediante preguntas con explicación y distractores; las ampliaciones se corresponden con el guion.

### Precisiones y corrección encontrada

- En 5.1 se sustituye una frase ambigua sobre «intercambiar ambas ecuaciones» por una aclaración: intercambiar su orden sí conserva el sistema; las unidades se interpretan por separado. Se alinea con 5.5 y T5.5.
- Las restricciones enteras o no negativas del contexto se distinguen de la clasificación sobre los reales.
- Una fila 0=0 no demuestra por sí sola SCI. El número de variables libres se calcula solo después de comprobar compatibilidad.
- Se compara el rango con el número de incógnitas, no de ecuaciones.
- Inversa y Cramer exigen A cuadrada e invertible. Determinante cero, incluso con todos los auxiliares nulos en orden 3, no garantiza SCI.
- Un sistema homogéneo nunca es SI. No trivial significa vector distinto de cero, no todas sus coordenadas distintas de cero.
- La discusión algebraica cubre todos los valores; las muestras numéricas no sustituyen una demostración.
- Los bloques con contexto presupuestario o de inventario no desarrollan todavía programación lineal.

## Selección del test de repaso

`../content/activities/review-t05.js` referencia, en orden: `linear-system-04`, `system-solution-05`, `classification-05`, `notation-05`, `equivalence-05`, `rouche-02`, `inverse-system-02`, `gauss-05`, `cramer-06`, `homogeneous-06` y `parameter-system-06`.

Una pregunta de cada epígrafe, con el mismo identificador, opciones, pista y explicación que en el banco. El repaso no modifica los totales 66/66 ni los globales 318/301.

## Variantes, acceso y límites

Las lecciones ofrecen nueve exploradores, un taller de operaciones por filas y entrenamiento de clasificación con variantes. Conservan los límites descritos en sus entregas. El repaso añade cuatro bloques resueltos y once decisiones, no un generador nuevo.

Pistas y soluciones usan controles nativos; el test permite teclado, reintentos y resumen sin reloj. Las preferencias de lectura son compartidas; las respuestas duran la visita. Las once lecciones enlazan al repaso y cada bloque ofrece refuerzos. Diseño provisional y servicio LaTeX conservados.

## Lista de cierre

- [x] Once epígrafes con teoría, ejemplos, práctica y navegación.
- [x] Al menos doce problemas desarrollados: dieciséis bloques inventariados.
- [x] 66 preguntas base distintas, con explicación y variantes en las actividades.
- [x] 22 conceptos fuente cubiertos en 66 tarjetas.
- [x] Cuatro bloques de síntesis y once preguntas reutilizadas.
- [x] Verificación final del recorrido, fórmulas, lectura móvil y enlaces de esta entrega.
- [x] Widget 5A: Clasificador de sistemas (entrega 67).
- [x] Widget 5B: Gauss paso a paso (entrega 68).
- [x] Widget 5C: Elige el método.
- [x] Recorrido conjunto de los tres juegos con refuerzos.
- [ ] Lectores de pantalla y pronunciación matemática.

Biblioteca PDF, administración central, traducción, voz y cuentas futuras siguen en sus fases globales. Se mantiene el [criterio de reutilizar todos los HTML iniciales de programación lineal y bloques estadísticos](criterio-reutilizacion-html-estadistica-pl-inferencia.md), dejando huecos y mejoras señalados.

Evidencia: [verificación de la entrega 66](verificacion-entrega-66.md). Siguiente desarrollo: programación lineal desde los HTML originales, según el criterio de reutilización.

## Actualización · Entrega 67 · Clasificador de sistemas

Disponible [Clasificador de sistemas](../laboratorios/juegos/t05-a-clasificador-de-sistemas.html), insertado y como página independiente. Doce retos por sesión: tres de ecuaciones, tres de matrices escalonadas, tres de rectas y tres de rangos. La clasificación se calcula por Gauss exacto y la corrección muestra siempre el criterio de Rouché–Frobenius.

Se adapta el arrastre del plan a opciones seleccionables por ratón, pantalla táctil o teclado. Dos intentos, pistas gratuitas y solución explicada tras dos errores permiten continuar sin reloj. Las rectas tienen trazos diferentes, descripción textual y ecuaciones exactas; las variantes incluyen verticales y coincidencia. No se utiliza solo una imagen para decidir.

Las variantes no aumentan el banco 66/66 ni los dieciséis problemas inventariados. Las respuestas y puntuaciones duran la visita; se conservan solo las preferencias de lectura. Quedan los otros dos juegos, el recorrido conjunto y la revisión global de accesibilidad.

Evidencia: [entrega 67](verificacion-entrega-67.md). Siguiente: Gauss paso a paso.

## Actualización · Entrega 68 · Gauss paso a paso

Disponible [Gauss paso a paso](../laboratorios/juegos/t05-b-gauss-paso-a-paso.html), independiente e insertable. Seis familias: eliminación en dos incógnitas, pivote inicial cero, sistema rectangular, contradicción, tres incógnitas y homogéneo.

Las operaciones válidas se aplican a toda la ampliada y conservan equivalencia. Se comprueba estructuralmente que los pivotes avanzan y que las filas nulas están al final; no se compara con una secuencia única ni se exige que los pivotes sean uno. Incluye historial, deshacer y reinicio.

La pista prepara una posible operación, sin ejecutarla. La ruta resuelta comienza en el sistema inicial y activa asistencia sin puntos para ese reto; se puede consultar de nuevo. Al cerrar se explican rangos y soluciones o familias y se comprueban en las ecuaciones originales.

No se aplica el bonus opcional de «menos operaciones» del plan fuente: se registran los pasos sin penalizar rutas alternativas ni afirmar que la ruta de ejemplo sea mínima. El objetivo principal es justificar equivalencia y clasificación. La solución se presenta después; introducir manualmente las coordenadas no es una fase de este widget.

Límites: 30 pasos en la ruta; factor racional con numerador ±9 y denominador hasta 9 tras simplificar; fracciones de la matriz acotadas a un millón. Las entradas rechazadas conservan el último estado. Las variantes no elevan los bancos 66/66 ni los dieciséis bloques inventariados.

Evidencia: [entrega 68](verificacion-entrega-68.md). Siguiente: Elige el método; después, recorrido conjunto. El cierre global sigue pendiente.


## Actualización · Entrega 69

Disponible [Elige el método](../laboratorios/juegos/t05-c-elige-el-metodo.html): comparación justificada de estrategias para seis familias. El caso 4 × 4 es una decisión sobre el método, con comprobación de la reducción; no amplía los editores del libro. Los casos homogéneos, rectangulares y con parámetro enseñan cuándo no sirven Cramer o la inversa ordinaria.

Se aceptan todas las estrategias válidas ofrecidas; la eficiencia se explica sin convertir la preferencia por una ruta en una condición matemática. Se conservan 66 preguntas, 66 tarjetas y dieciséis bloques resueltos inventariados. Las variantes no aumentan estos recuentos.

Evidencia: [entrega 69](verificacion-entrega-69.md). Siguiente: recorrido conjunto de clasificación, operaciones y elección del método. Sigue pendiente la revisión global con lectores de pantalla y pronunciación matemática.


## Actualización · Entrega 70

El [recorrido conjunto](../libro/temas/05-sistemas-de-ecuaciones/index.html#ruta-juegos) conecta los tres juegos con contenidos previos, refuerzos y retorno al repaso. Invitaciones desde 5.6, 5.8 y 5.11; navegación anterior/siguiente en los anfitriones y retorno desde los widgets independientes.

Comprobadas las once lecciones, el test 66/66, las 66 tarjetas, una respuesta puntuada en cada juego, conservación de selecciones y matriz al ampliar, navegación en subcarpeta y lectura móvil. No cambia el inventario ni los modelos. Evidencia: [entrega 70](verificacion-entrega-70.md).

El tema conserva estado parcial por la revisión global con lectores de pantalla y pronunciación matemática. La próxima fase de contenido será programación lineal, reutilizando los HTML originales y señalando huecos y mejoras.
