# Reutilización del «Laboratorio de integrales»

Actualizado: 12 de noviembre de 2026 · Material aportado por el docente en «A Incluir».

## Fuente

- [integrales_2_bachillerato_16_9.html](<../../A Incluir/integrales_2_bachillerato_16_9.html>): presentación 16:9 de 15 diapositivas con teoría, visualizaciones en canvas, ejemplos, «problemas tipo PAU», un taller numérico y un generador de test. Original de solo lectura.
- Criterio: el de los demás bloques ([criterio de reutilización](criterio-reutilizacion-html-estadistica-pl-inferencia.md)). Se integra lo que añade algo al tema 3, que ya tiene sus ocho lecciones revisadas, y se corrige o se descarta lo demás con su motivo.

## Qué se ha incluido

| Diapositiva | Destino | Qué aporta |
|---|---|---|
| 1–2. Intuición y suma de Riemann (rectángulos con extremo izquierdo, punto medio o derecho para x² en [0, 2]) | [3.5, sección 6 «Sumas de Riemann con una curva»](../libro/temas/03-integrales/05-integral-definida.html#riemann) | El explorador de 3.5 solo usa puntos medios y funciones rectas por tramos. El nuevo compara las tres reglas con una curva, de 1 a 100 rectángulos. Se añade f(x)=4−x², decreciente, para mostrar que el sentido del error depende de la monotonía. Tabla estática legible sin JavaScript. Modelo en [riemann-sums.js](../content/models/riemann-sums.js). |
| 8. Cambio de variable: \(\int 2x\cos(x^2)\,dx\) | [3.3, «Una función interior cuadrática»](../libro/temas/03-integrales/03-integrales-casi-inmediatas.html) | Los ejemplos de 3.3 tenían funciones interiores lineales; este aplica el patrón \(u'\cos u\) de la tabla de la lección con u=x², y el ajuste ½ si falta el 2. |
| 14 (reto final) y 12 C. \(\int_0^1 x e^{x^2}dx\) y \(\int_0^1 2x e^{x^2}dx\) | [3.7, «Una primitiva casi inmediata y los límites»](../libro/temas/03-integrales/07-regla-de-barrow.html) | Barrow con una primitiva casi inmediata y los dos caminos para los límites: volver a x o cambiarlos con la variable. |
| 12 D. \(\int_1^e\ln x\,dx\) | [3.4, ampliación de integración por partes](../libro/temas/03-integrales/04-metodos-de-integracion.html) | Segundo ejemplo de la ampliación: el factor 1 implícito. |

Todas las cuentas se han comprobado: ½(e−1) ≈ 0,859141; [x ln x − x] de 1 a e = 1; las sumas de la tabla, contra las fórmulas cerradas de Σi² (prueba `riemann-sums.test.mjs`). Prueba de navegador: 168.

## Qué ya estaba en la web

| Diapositiva | Dónde está |
|---|---|
| 1. Acumulación (velocidad × tiempo) | 3.5, sección 1, y 3.8, «Recuperar cantidades a partir de tasas». |
| 3. Primitivas y la constante C | 3.1, con su explorador de familias de primitivas. |
| 4. Tabla de inmediatas (potencias, 1/x, eˣ, aˣ, sen, cos, f′/f, f′e^f, f′fⁿ) | 3.2 y 3.3. |
| 5. Nueve ejercicios fijos de inmediatas | 3.2–3.4 generan ejercicios nuevos en cada sesión y comprueban cada opción derivando. |
| 6. Barrow con un deslizador | 3.7, con su laboratorio de dos extremos y constante. |
| 7. Propiedades y área con signo | 3.5, secciones 2 y 3, y el explorador de signo y orientación. |
| 9. Partes con \(\int xe^x dx\) | 3.4, ampliación «Integración por partes: un primer ejemplo» (mismo ejemplo). |
| 10. Fracción racional con dos factores lineales | 3.4, ampliación «Descomposición elemental de una fracción». |
| 11. Área entre y=2x e y=x² (4/3) | 3.8, «Recinto entre una recta y una parábola»: el mismo procedimiento con y=x e y=x² (área 1/6), y el explorador de qué curva queda arriba. |
| 12 A y B. \(\int_0^1(3x^2+2x)dx\) y área entre y=x e y=x² | A: 3.7 tiene polinomios con Barrow equivalentes. B: es el ejemplo «Recinto entre una recta y una parábola» de 3.8 (área 1/6). |
| 14. Método antes y después de integrar | 3.4, «Una ruta para decidir», y la comprobación derivando, presente en todas las lecciones. |

## Qué no se ha incluido y por qué

- **Fila de \(\arctan x\), \(\arcsin x\) y \(\sec^2 x\) de la tabla.** Las orientaciones de la PAU 2025-2026 (B1 y B2) piden primitivas inmediatas simples y compuestas de funciones polinómicas, racionales, irracionales, exponenciales y logarítmicas. Las trigonométricas inversas quedan fuera; la web ya trata seno y coseno como en el temario.
- **Etiqueta «problemas tipo PAU / Selectividad».** Son ejercicios originales del autor sin convocatoria. Siguiendo el mismo criterio que con Combinatoria, no se presentan como de la PAU; los ejercicios reales están en el [banco de Selectividad](../selectividad/index.html). Se han reutilizado C y D como ejemplos.
- **Taller libre (diapositiva 13).** Integra cualquier función con la regla de Simpson. No se incluye por tres motivos:
  - carga math.js y MathJax desde un CDN externo, y la web sirve todo desde su propia carpeta, sin terceros;
  - la integración numérica no forma parte de los saberes;
  - su «paso a paso» solo describe el método numérico, no una primitiva.

  Si el docente lo quiere como herramienta, habría que hacerla con un analizador de expresiones propio.
- **Previsualización de LaTeX (diapositiva 5).** No corrige nada y el alumnado no escribe LaTeX en la prueba.
- **Generador de test (diapositiva 15).** Duplica las prácticas generadas de 3.2–3.4, que además verifican cada opción derivando. Tiene errores de presentación con coeficientes negativos y unitarios:
  - un signo doble, por ejemplo \(-\frac{-3}{2}\cos(2x)\);
  - un «−−1» en un distractor de partes;
  - coeficientes «1x²».

  Mezcla trigonometría y partes en niveles que no corresponden al bloque B1 y no es reproducible (usa `Math.random`). No se publica como juego.
- **Formato de presentación.** Diapositivas 16:9 con tema oscuro propio, dibujos en canvas sin texto alternativo y dependencias externas. No se publica tal cual: el contenido aprovechable se ha llevado a las lecciones con el diseño, la accesibilidad y la notación de la web (coma decimal; la presentación usaba punto en «2.666667»). El archivo sigue en «A Incluir» por si el docente quiere usarlo en clase con proyector.

## Pendiente

- Revisión del docente de los cuatro añadidos.
- Si interesa, una herramienta de integración numérica sin dependencias externas.
