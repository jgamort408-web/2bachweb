# Auditoría de contenidos del tema 3

Auditoría inicial: 1 de octubre de 2026 · Entrega 33. Actualizada al 5 de octubre · Entrega 37.

## Resultado y criterio

Ocho lecciones desarrolladas, **60 preguntas base**, **48 tarjetas** y **20 problemas o bloques resueltos inventariados**. El inventario es conservador: cada bloque integrado cuenta una vez, aunque contenga varias partes. No se cuentan semillas, variantes ni configuraciones como problemas nuevos.

El tema mantiene el estado **parcial**: sus tres videojuegos y variantes están desarrollados y el recorrido conjunto está verificado; queda la revisión global con lectores de pantalla y pronunciación matemática.

## Fuentes

- `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 3.1–3.8.
- `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T3.1–T3.10.
- `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, 18 conceptos.
- `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, tres juegos previstos.
- ZIP locales y revisiones descritos en [procedencia-contenidos.md](procedencia-contenidos.md), entregas 28, 31 y 32.

No se ha recompilado LaTeX. La corrección M13 del ejemplo F029 se conserva en la web y sigue pendiente en una copia revisada del examen. Las partes ampliadas (integración por partes, límites impropios y otros desarrollos opcionales) mantienen su identificación; no se infiere un currículo autonómico.

## Inventario conservador de problemas con desarrollo

| Nº | Problema y ubicación | Resultado de contraste |
|---|---|---|
| 1 | [Primitiva con F(1)=5](../libro/temas/03-integrales/01-integral-indefinida.html#ejemplos) | F=x³−2x²+2x+4. |
| 2 | [Coste desde el marginal](../libro/temas/03-integrales/01-integral-indefinida.html#ejemplos) | K=q²+5q+40; K(3)=64 €. |
| 3 | [Potencia compuesta](../libro/temas/03-integrales/03-integrales-casi-inmediatas.html#ejemplos) | Integral de (3x−2)⁴: (3x−2)⁵/15+C. |
| 4 | [Cociente logarítmico](../libro/temas/03-integrales/03-integrales-casi-inmediatas.html#ejemplos) | Integral de 5x/(x²+4): (5/2)ln(x²+4)+C. |
| 5 | [Exponencial de interior decreciente](../libro/temas/03-integrales/03-integrales-casi-inmediatas.html#ejemplos) | Integral de e^(2−3x): −e^(2−3x)/3+C. |
| 6 | [División algebraica](../libro/temas/03-integrales/04-metodos-de-integracion.html#algebra) | (x²+1)/(x+1): x²/2−x+2ln\|x+1\|+C, x≠−1. |
| 7 | [Ejemplo local F029 y M13](../libro/temas/03-integrales/04-metodos-de-integracion.html#ejemplo-fuente) | x²+e^(2x)−1/(1−x): x³/3+e^(2x)/2+ln\|1−x\|+C por intervalos. |
| 8 | [División y condición inicial](../libro/temas/03-integrales/04-metodos-de-integracion.html#practica) | F=x²/2+5ln(x+2)−5ln2 en x>−2; F(0)=0. |
| 9 | [Acumulación con origen en 1](../libro/temas/03-integrales/06-teorema-fundamental-del-calculo.html#ejemplos) | A=x²+3x−4; A′=2x+3; A(1)=0. |
| 10 | [Depósito con tasa neta](../libro/temas/03-integrales/06-teorema-fundamental-del-calculo.html#ejemplos) | V=10+t²−4t en [0,4]; mínimo 6 litros en t=2. |
| 11 | [Barrow con límite negativo](../libro/temas/03-integrales/07-regla-de-barrow.html#ejemplos) | Integral de 3x²−2x+1 entre −1 y 2: 9. |
| 12 | [Área logarítmica del examen local](../libro/temas/03-integrales/07-regla-de-barrow.html#ejemplos) | Integral de 1/(x+3) entre 2 y 4: ln(7/5). |
| 13 | [Recinto local de una parábola](../libro/temas/03-integrales/08-aplicaciones-de-la-integral.html#ejemplos) | h=−x²+2x+3, cortes −1 y 3, área 32/3. |
| 14 | [Curva con tres regiones](../libro/temas/03-integrales/08-aplicaciones-de-la-integral.html#ejemplos) | x²−1 en [−2,2]: integral 4/3; área 4. |
| 15 | [Recinto entre recta y parábola](../libro/temas/03-integrales/08-aplicaciones-de-la-integral.html#ejemplos) | x y x², recinto [0,1]: área 1/6. |
| 16 | [Cambio de orden entre curvas](../libro/temas/03-integrales/08-aplicaciones-de-la-integral.html#ejemplos) | x² y x en [−1,2]: área 11/6 e integral de su diferencia 3/2. |
| 17 | [Compatibilidad y expresiones equivalentes](../libro/temas/03-integrales/index.html#repaso-primitivas) | Datos de F incompatibles; 2ln(x²+1)=ln((x²+1)²). |
| 18 | [Métodos, límites y propiedades](../libro/temas/03-integrales/index.html#repaso-metodos) | Tres resultados: ln2, e y 1. Cambio de límites junto con la variable. |
| 19 | [Almacén por tramos](../libro/temas/03-integrales/index.html#repaso-almacen) | Q(5)=19 kg; máximo 24 kg en 2 h; variación neta −1 kg y total 9 kg. |
| 20 | [Comparación de áreas](../libro/temas/03-integrales/index.html#repaso-areas) | Sumando común: área 4/3 conservada; contacto sin cruce: 2/3; parámetro k=1 y área 1. |

## Cobertura de guion, test y tarjetas

Los archivos citados están en `../content/activities/`. Cada una de las ocho lecciones conserva seis preguntas y seis tarjetas; `review-t03.js` añade doce preguntas transversales al tema sin modificar los bancos individuales. Total: 48+12=60. La trazabilidad `lessonIds` de esos doce ítems abarca los ocho epígrafes.

| Epígrafe | Contenido y banco | Fuentes base cubiertas |
|---|---|---|
| 3.1 | `antiderivatives.js`: primitivas, C, dato inicial y dominios separados. | T3.1, T3.3, T3.9, T3.10; tarjetas 1–3 y 18. |
| 3.2 | `immediate-integrals.js`: tabla, linealidad, potencia, logaritmo y comprobación. | T3.2, T3.8; tarjetas 4–6. |
| 3.3 | `near-immediate-integrals.js`: función interior, ajuste constante, dominio. | Tarjeta 7; ampliación de los patrones de T3.2/T3.8. |
| 3.4 | `integration-methods.js`: álgebra, dominio, cambio completo y comprobación. | Métodos del guion; conexión con tarjetas 7 y 18. |
| 3.5 | `definite-integrals.js`: signo, orientación, aditividad, linealidad y área. | T3.4, T3.6; tarjetas 8–10 y 13–14. |
| 3.6 | `fundamental-calculus.js`: acumulación, pendiente, continuidad, crecimiento. | Tarjeta 11 y conexión entre primitivas y definida. |
| 3.7 | `barrow.js`: extremos, constantes, dominio, tramos e integral frente a área. | T3.5; tarjeta 12 y refuerzo de 13–14. |
| 3.8 | `integral-applications.js`: cortes, orden, áreas, tasas y unidades. | T3.7; tarjetas 15–17. |
| Repaso | `review-t03.js`: compatibilidad, equivalencia, límites transformados, derivada de producto, propiedades combinadas, tasa por tramos, invariancia del área, contacto y parámetro. | Síntesis trazada a los ocho epígrafes. |

Las 48 tarjetas distribuyen los 18 conceptos originales con explicaciones y restricciones. No se añaden tarjetas solo para elevar el contador. La palabra intervalo se conserva para la constante; a<b se explicita al formular áreas. El cambio de signo obliga a revisar el área, pero no a fraccionar una integral con signo que tenga una primitiva global válida.

Los doce ítems nuevos no se contabilizan como variantes numéricas de una misma pregunta. Las decisiones distintas se enumeran arriba; en el almacén se separan cantidad final, máximo de la acumulación y variación total. Tienen cuatro opciones únicas, distractores comentados, pista y solución.

## Variantes e interacción existentes

- 3.1: familia de primitivas y ajuste al dato.
- 3.2–3.4: sesiones generadas de primitivas y transformaciones.
- 3.5: integral/área y aproximaciones por puntos medios.
- 3.6: acumulación y secantes, continuidad y salto.
- 3.7: laboratorio de extremos y constante; retos de Barrow.
- 3.8: áreas entre curvas, cambio de orden y retos variables.
- Repaso: cuatro bloques desplegables y doce decisiones; sin tiempo límite ni persistencia personal.

Las variantes de lección no sustituyen los videojuegos independientes previstos.

## Verificación y pendientes

Las entregas 25–32 verifican los modelos de cada lección. Esta entrega añade pruebas de los cuatro bloques, comparación por derivadas e integración numérica independiente, dominio y argumentos analíticos. El criterio de integral cero para una función continua no negativa se justifica en el texto; un muestreo no se presenta como demostración.

- [x] Ocho lecciones con teoría, ejemplos, práctica y navegación.
- [x] Al menos doce problemas desarrollados: veinte filas inventariadas.
- [x] 60 preguntas base, identificadores y enunciados únicos.
- [x] Cobertura de los 18 conceptos originales de tarjetas en 48 tarjetas.
- [x] Variantes de cálculo y exploradores de las lecciones.
- [x] Repaso integrado y navegación de ida y vuelta por las ocho lecciones.
- [x] Widget Parejas de primitivas (entrega 34).
- [x] Widget Método correcto (entrega 35).
- [x] Widget Área por tramos (entrega 36).
- [x] Variantes de los tres juegos, verificadas en sus entregas.
- [x] Recorrido integrado de los tres juegos y las lecciones (entrega 37).
- [ ] Lectores de pantalla y pronunciación matemática.

La comprobación de teclado y texto ampliado no certifica accesibilidad completa. Biblioteca PDF, administración central, voz, traducción y futura extensión de cuentas continúan en sus fases globales.

## Actualización · Entrega 34 · 5 de octubre de 2026

Disponible [Parejas de primitivas](../laboratorios/juegos/t03-a-parejas-de-primitivas.html), para reforzar 3.1–3.3: diez parejas en dos tableros con pistas, corrección y variables numéricas. Las familias incluyen la constante; una opción sin ella se explica como primitiva particular. Las variantes no aumentan las 60 preguntas base ni las 48 tarjetas. Verificación y límites en [verificacion-entrega-34.md](verificacion-entrega-34.md). Quedan Método correcto, Área por tramos, recorrido conjunto y revisión con lectores de pantalla.

## Actualización · Entrega 35 · 5 de octubre de 2026

Disponible [Método correcto](../laboratorios/juegos/t03-b-metodo-correcto.html), para reforzar 3.2–3.4. Ocho retos y dieciséis decisiones por sesión; tabla, cadena al revés, simplificación y dos ampliaciones por partes. Las categorías describen la ruta propuesta sin afirmar que sea la única posible. Se mantienen 60 preguntas base, 48 tarjetas y veinte problemas/bloques inventariados. Véase [verificacion-entrega-35.md](verificacion-entrega-35.md). Quedan Área por tramos, recorrido conjunto y revisión con lectores de pantalla.

## Actualización · Entrega 36 · 5 de octubre de 2026

Disponible [Área por tramos](../laboratorios/juegos/t03-c-area-por-tramos.html), como refuerzo de 3.5, 3.7 y 3.8. Seis curvas por sesión: uno, dos y tres cruces, contacto, raíz en un extremo y signo constante. Se pide la partición mínima por cambios de signo, después integrales parciales y finalmente integral/área. Hay gráfica seleccionable, casillas equivalentes y tabla de apoyo. Verificación: [verificacion-entrega-36.md](verificacion-entrega-36.md).

Los tres juegos y sus variantes están implementados. No se cambia el inventario de veinte problemas/bloques ni los bancos 60/48. Queda revisar conjuntamente la ruta de lecciones, repaso y juegos y la accesibilidad global.

## Actualización · Entrega 37 · 5 de octubre de 2026

Recorrido conjunto verificado: ocho lecciones, repaso integrado, 60 preguntas, 48 tarjetas y los tres juegos, tanto insertados como independientes. La orientación relaciona los juegos con 3.1–3.3, 3.4 y 3.7–3.8; las páginas anfitrionas permiten pasar entre ellos y volver al repaso. Se comprueba corrección inicial y conservación de respuestas al modificar las preferencias, en móvil y subcarpeta.

El inventario de veinte problemas/bloques, 60 preguntas y 48 tarjetas se conserva. Las 122 pruebas acumuladas pasan. El cierre global sigue pendiente por lectores de pantalla y pronunciación matemática; no se anuncia una certificación de accesibilidad. Evidencias: [verificacion-entrega-37.md](verificacion-entrega-37.md).
