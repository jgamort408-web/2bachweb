# TEO-25E · Lectura matemática con tecnologías de apoyo

Fecha de preparación: 14 de noviembre de 2026. **Estado: comprobación estructural superada; escucha con lector de pantalla pendiente.**

## Tandas

- [x] **25E1:** verificar la estructura matemática que Chrome expone a las tecnologías de apoyo.
- [x] **25E2:** preparar casos, criterios y ficha de registro para una escucha reproducible.
- [ ] **25E3:** ejecutar la escucha real con el lector utilizado por el centro y registrar sus resultados.
- [ ] **25E4:** corregir incidencias reproducibles, repetir los casos afectados y decidir el cierre según el alcance realmente probado.

## Resultado técnico de 25E1

Prueba: `node tests/math-assistive-structure-browser.cjs`. Casos: `tests/fixtures/math-reading-cases.json`. Documento de prueba servido sólo dentro del navegador automatizado; no añade páginas públicas a la web.

Entorno observado: Chrome 156.0.8078.48 en Windows, documento con idioma `es`. Seis fórmulas renderizadas sin errores, seis raíces MathML no ignoradas en el árbol de accesibilidad y SVG con `aria-hidden="true"`. La matriz tiene dos filas y seis celdas. Se comprueban las estructuras internas, no sólo que exista un elemento MathML en el DOM. Evidencia detallada temporal: `../tmp/teoria-25e/estructura-accesible.json`.

| Caso | Estructura expuesta comprobada |
|---|---|
| Fracción | Numerador y denominador (`MathMLFraction`) |
| Sumatorio binomial | Límites (`MathMLUnderOver`), combinatorio y exponentes |
| Integral definida | Límite inferior y superior (`MathMLSubSup`) |
| Intervalo de Wald | Fracciones, raíces, subíndices y extremos |
| Matriz | Tabla matemática, filas y celdas; dimensión 2 × 3 |
| Raíz binomial | Radical con su contenido agrupado |

No se ha comprobado la salida sonora de ningún lector. Que el SVG esté oculto y haya una raíz MathML por fórmula evita una duplicación estructural concreta en Chrome, pero no acredita ausencia de repetición sonora, pronunciación española o compatibilidad con otro navegador o lector. No se reemplaza la estructura matemática con etiquetas de texto plano.

## Preparación de la escucha

1. Registrar sistema, navegador, lector, versiones, voz e idioma realmente usados. Anotar también cualquier complemento matemático o configuración especial; si requiere instalación, seguir el procedimiento del centro.
2. Abrir las lecciones de la tabla siguiente en el sitio servido por HTTP. Mantener una configuración de referencia y repetir después los casos que cambien al ampliar texto o contraste.
3. Llegar al apartado con los enlaces de la lección y recorrerlo con el lector. Entrar y salir de la fórmula y explorar su estructura con los comandos propios de ese lector. Registrar los comandos utilizados; no presuponer que todos los lectores tienen los mismos.
4. Comprobar lectura del texto antes y después, acceso a la fórmula, límites y agrupaciones. En la expresión larga, alcanzar los dos extremos sin quedar atrapado. En la matriz, explorar filas y columnas e identificar cada valor.
5. Transcribir la salida escuchada o adjuntar una referencia a una grabación autorizada. Registrar repeticiones, omisiones, idioma incorrecto y obstáculos de teclado con pasos para reproducirlos.

Las descripciones siguientes son criterios de significado, **no una frase que deba pronunciarse literalmente**. Se aceptan formulaciones equivalentes que permitan reconstruir correctamente la expresión.

| Caso | Lección y apartado | Significado a reconocer | Escucha real |
|---|---|---|---|
| Fracción | [Abrir fuente](../libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html#densidad) | Una mitad: numerador uno, denominador dos. | Pendiente |
| Sumatorio binomial | [Abrir fuente](../libro/temas/08-distribuciones-de-probabilidad/02-distribucion-binomial.html#acumuladas) | Suma desde j igual a cero hasta k; número combinatorio n sobre j, por p elevado a j y por uno menos p elevado a n menos j. | Pendiente |
| Integral definida | [Abrir fuente](../libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html#densidad) | Integral desde a hasta b de f de x, diferencial de x. Distinguir límites e integrando. | Pendiente |
| Intervalo largo y proporciones | [Abrir fuente](../libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html#proporciones) | Intervalo aproximado para p: extremo inferior p estimada menos el margen y extremo superior p estimada más el margen. Reconocer alfa, subíndices, raíz, fracción y ambos extremos. | Pendiente |
| Matriz de dos filas y tres columnas | [Abrir fuente](../selectividad/04-matrices-y-determinantes.html#SEL-D0084-OA-E01) | Matriz de dos filas y tres columnas. Primera fila: 100, 150, 80. Segunda fila: 200, 250, 140. No pronunciar dólares literales. | Pendiente |
| Raíz y parámetros binomiales | [Abrir fuente](../libro/temas/08-distribuciones-de-probabilidad/02-distribucion-binomial.html#parametros) | Sigma es la raíz cuadrada de n por p por uno menos p; el producto completo está bajo la raíz. | Pendiente |

## Ficha por combinación de lector y navegador

- Evaluador y fecha: pendiente.
- Sistema y versión: pendiente.
- Lector y versión: pendiente.
- Navegador y versión: pendiente.
- Voz, idioma y complementos: pendiente.
- URL y revisión del repositorio probada: pendiente.
- Ajustes de lectura y tamaño de ventana: pendiente.

| Caso | Comandos utilizados | Salida escuchada / evidencia | Orden y contexto | Estructura y símbolos | Repeticiones u omisiones | Resultado |
|---|---|---|---|---|---|---|
| Fracción | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Sumatorio | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Integral | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Intervalo largo | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Matriz | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Raíz | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |

Resultados permitidos: superado, incidencia o no probado. Una celda vacía o «pendiente» no equivale a superado. Para cada incidencia, anotar URL, pasos, resultado esperado, resultado escuchado y configuración. Priorizar pérdida de términos, signos, límites, denominadores o celdas que alteren el significado.

## Criterio de cierre

TEO-25E sólo puede cerrarse al registrar escucha y navegación reales, corregir las incidencias del alcance elegido y repetir los casos afectados. El resultado se limita a las combinaciones de lector y navegador documentadas; no certifica todos los dispositivos ni conformidad global de la web. La lectura en voz alta de la propia página es otra funcionalidad y no sustituye esta validación.
