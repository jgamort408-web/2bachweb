# Criterio de reutilización · Programación lineal, estadística e inferencia

Instrucción del usuario: 7 de octubre de 2026.

## Regla de trabajo

Usar como base todo lo ya creado en los HTML originales. Conservar explicaciones, ejemplos, ejercicios, tarjetas, tests, gráficos y actividades que contengan; adaptar su integración técnica a la web actual sin sustituirlos por contenido nuevo.

**Si falta contenido, dejar el apartado sin desarrollar o indicar qué hay que mejorar. No completar los huecos con contenido inventado ni ampliar bancos para alcanzar cuotas.** Este criterio prevalece sobre las metas generales de cobertura, número de ejercicios o preguntas del prompt y del plan para estos bloques.

Se permiten correcciones justificadas y documentadas de errores del material existente y adaptaciones necesarias de navegación, accesibilidad y carga de fórmulas. Si una actividad original no puede integrarse todavía, registrar su ruta y el problema pendiente; no eliminarla ni sustituirla silenciosamente.

Los originales son documentos HTML completos guardados como archivos TXT. Están en `../../Página web existente/`. No modificarlos: trabajar sobre copias integradas. La estadística comprende aquí el apoyo bidimensional y el tema de distribuciones, además de inferencia.

## Estado y alcance de esta revisión

Se han localizado y leído la estructura HTML y encabezados de **33 archivos** de estos cuatro bloques y consultado el inventario inicial. Las comprobaciones de la tabla son tareas de revisión; **no son una certificación de errores ni una auditoría matemática y funcional completa**.

Las incidencias M10–M12 ya estaban documentadas en `../../INVENTARIO_Y_DIAGNOSTICO_MATERIALES.md`. Las cifras de bancos proceden de ese inventario y no equivalen a contenido ya migrado. La importación avanza por archivos. En las entregas 71–76 se adaptan los siete archivos de programación lineal: Presentación, Inecuaciones, Sistemas de inecuaciones, Programación Lineal, El método gráfico, los seis Ejercicios Resueltos y las 19 Flashcards; en las entregas 77–84 se integran los ocho archivos de estadística bidimensional: presentación, La variable bidimensional, La nube de puntos, covarianza, Pearson, regresión lineal, nueve ejercicios resueltos y 20 flashcards originales. En las entregas 85–91 se integran los siete originales de Distribuciones: presentación, cuatro lecciones, 21 ejercicios resueltos y 19 tarjetas. Los once originales de Inferencia también están integrados; sus carencias de cobertura permanecen documentadas en la auditoría del bloque. [Estado, correspondencias y correcciones de Distribuciones](auditoria-reutilizacion-distribuciones.md).

## Procedimiento por archivo

1. Leer el HTML completo, sus datos y sus scripts; registrar su correspondencia con las páginas actuales.
2. Integrar todo el contenido válido de la fuente conservando su procedencia.
3. Comprobar fórmulas, cálculos, actividades y dependencias. Documentar correcciones.
4. Clasificar cada apartado: **reutilizado y verificado**, **pendiente de revisión**, **mejora necesaria** o **sin contenido original**.
5. Para el último caso, conservar el espacio en blanco o añadir una nota breve «Pendiente de contenido»; describir lo que falta en la documentación editorial. No darlo por completado.
6. Mantener los mecanismos comunes de MathJax, navegación y preferencias, sin abordar aún el rediseño visual.

## 1. Programación Lineal

Destino previsto desde la raíz web: `Tema 6: libro/temas/06-programacion-lineal/`.

| HTML original (guardado como TXT) | Qué revisar o mejorar al integrarlo |
|---|---|
| [0. Presentación.txt](<../../Página web existente/1. Programación Lineal/0. Presentación.txt>) | Integrado el itinerario en el índice del tema 6; duplicación con Inicio.txt confirmada por SHA-256. Fechas y navegación adaptadas. |
| [1. Inecuaciones.txt](<../../Página web existente/1. Programación Lineal/1. Inecuaciones.txt>) | Teoría y gráfico integrados en 6.1, con corrección de frontera/punto de prueba. Práctica interactiva pendiente; ver auditoría por bloque. |
| [2. Sistemas de inecuaciones.txt](<../../Página web existente/1. Programación Lineal/2. Sistemas de inecuaciones.txt>) | Integrado en 6.2; gráfico y condiciones de extremos corregidos (M10). Sin inventar actividades; carencias en la auditoría por bloque. |
| [3. Programación Lineal.txt](<../../Página web existente/1. Programación Lineal/3. Programación Lineal.txt>) | Integrado en 6.3; no negatividad contextual corregida (M10). Diagrama y esquema conservados; carencias documentadas. |
| [4. El método gráfico.txt](<../../Página web existente/1. Programación Lineal/4. El método gráfico.txt>) | Integrado en 6.4: datos originales conservados, región y ambas tablas corregidas; máximo de 450 € con 9 mesas. Ejemplos de ausencia de óptimo/óptimo múltiple y práctica interactiva pendientes. Véase auditoría. |
| [5. Ejercicios Resueltos.txt](<../../Página web existente/1. Programación Lineal/5. Ejercicios Resueltos.txt>) | Seis ejercicios y 23 pasos integrados en 6.5; datos conservados, precisión/dominio/resaltado corregidos y GeoGebra con carga a petición. Carencias y límites en la auditoría por archivo. |
| [6. Flashcards.txt](<../../Página web existente/1. Programación Lineal/6. Flashcards.txt>) | Integradas las 19 tarjetas y sus cinco categorías originales en el visor común. Corregidas igualdad/dominio, región, hipótesis de óptimos y soluciones enteras. Sin ampliar el mazo; véase correspondencia uno a uno. |

## 2. Estadística Bidimensional

Destino previsto desde la raíz web: `Apoyo: libro/apoyos/estadistica-bidimensional.html`.

| HTML original (guardado como TXT) | Qué revisar o mejorar al integrarlo |
|---|---|
| [0. Presentación.txt](<../../Página web existente/2. Estadística Bidimensional/0. Presentación.txt>) | Integrados presentación, repaso, esquema y tabla de 43 alumnos. Frecuencias conservadas; categoría Aprobado y significado de N precisados. Carencias en la auditoría de estadística bidimensional. |
| [1. La variable bidimensional.txt](<../../Página web existente/2. Estadística Bidimensional/1. La variable bidimensional.txt>) | Integradas serie simple, tabla de 50 familias, dos marginales y medias verificadas (2 y 1,22). Definición conciliada; N<20 precisado como orientación. Carencias documentadas. |
| [2. La nube de puntos.txt](<../../Página web existente/2. Estadística Bidimensional/2. La nube de puntos.txt>) | Integrados cuatro diagramas y centro de gravedad; puntos conservados y correcciones trazadas en la auditoría. |
| [3. La covarianza.txt](<../../Página web existente/2. Estadística Bidimensional/3. La covarianza.txt>) | Integrados definición, fórmula, signos e interpretación; cambio de unidades 0,15→15 corregido. Carencias registradas en la auditoría. |
| [4. Coeficiente de correlación de Pearson.txt](<../../Página web existente/2. Estadística Bidimensional/4. Coeficiente de correlación de Pearson.txt>) | Integrados fórmula, escala, tres ejemplos e interpretación causal. Requisitos precisados y cifra empírica sin fuente retirada. Carencias documentadas. |
| [5. Regresión lineal.txt](<../../Página web existente/2. Estadística Bidimensional/5. Regresión lineal.txt>) | Integrados mínimos cuadrados, ecuación, ejemplo de predicción estático y R². Geometría e interpretación corregidas; no había controles interactivos. |
| [6. Ejercicios resueltos.txt](<../../Página web existente/2. Estadística Bidimensional/6. Ejercicios resueltos.txt>) | Nueve ejercicios y 32 pasos integrados. Tablas y pares conservados; corregidos covarianza/Pearson del ejercicio 2 e interpretaciones de ajuste y escala. |
| [7. Flashcards.txt](<../../Página web existente/2. Estadística Bidimensional/7. Flashcards.txt>) | Integradas las 20 tarjetas y sus cuatro categorías en el visor común. Revisados covarianza próxima a cero, requisitos de Pearson, residuos, R² y orientación de coeficientes; fuente preservada. |

## 4. Distribuciones

Destino previsto desde la raíz web: `Tema 8: libro/temas/08-distribuciones-de-probabilidad/`.

| HTML original (guardado como TXT) | Qué revisar o mejorar al integrarlo |
|---|---|
| [0. Presentación.txt](<../../Página web existente/4. Distribuciones/0. Presentación.txt>) | Presentación integrada en el índice del tema 8: cinco bloques y cinco objetivos, navegación local y pendientes explícitos. Precisados Bernoulli, parámetros de la normal y condiciones de aproximación. |
| [1. Variable aleatoria.txt](<../../Página web existente/4. Distribuciones/1. Variable aleatoria.txt>) | Integrados en 8.1 definición, distribución discreta finita, parámetros y dado. Probabilidades verificadas; media 3,5 y varianza exacta 35/12≈2,92. Carencias señaladas; estado parcial. |
| [2. Distribución Binomial.txt](<../../Página web existente/4. Distribuciones/2. Distribución Binomial.txt>) | Integrados en 8.2 teoría y dos ejemplos desplegables. Condiciones, soporte, factores y extremos precisados; cálculos verificados. El laboratorio original no tiene simulador ni parámetros editables. |
| [3. Distribución Normal.txt](<../../Página web existente/4. Distribuciones/3. Distribución Normal.txt>) | Integrados teoría, cinco controles y cuatro gráficos en 8.3. Corregidos escalas, recorte silencioso y banda de CDF; cálculos y límites verificados. Notación con σ como desviación típica. |
| [4. Aproximación de la Binomial por la Normal.txt](<../../Página web existente/4. Distribuciones/4. Aproximación de la Binomial por la Normal.txt>) | Integrados comparador, seis controles y cuatro gráficos en 8.4; corrección de continuidad, colas, condiciones y límites revisados. |
| [5. Ejercicios Resueltos.txt](<../../Página web existente/4. Distribuciones/5. Ejercicios Resueltos.txt>) | Integrados los 21 ejercicios en el índice del tema 8. Se corrigieron seis cifras finales y un producto intermedio; soluciones desplegables y contenido disponible sin JavaScript. |
| [6. Flashcards.txt](<../../Página web existente/4. Distribuciones/6. Flashcards.txt>) | Integradas las 19 tarjetas en cinco categorías en el visor común. Corregidas definiciones, condiciones binomiales, lectura de tablas y corrección de continuidad. |

## 5. Inferencia Estadística

Destino previsto desde la raíz web: `Tema 9: libro/temas/09-inferencia-estadistica/`.

| HTML original (guardado como TXT) | Qué revisar o mejorar al integrarlo |
|---|---|
| [0. Presentación.txt](<../../Página web existente/5. Inferencia Estadística/0. Presentación.txt>) | Integrada en el índice y reorganizada para 9.1: población/muestra, parámetro/estadístico, sentido de la inferencia, cuatro técnicas y ficha didáctica. Se corrigen alcance de cada método y supuestos del margen. Ambas páginas siguen parciales. |
| [1. Distribuciones muestrales.txt](<../../Página web existente/5. Inferencia Estadística/1. Distribuciones muestrales.txt>) | Integrado en 9.4: medias, proporciones, sumas y tabla. El TCL se formula con independencia y varianza finita; n≥30 no se presenta como garantía universal (M11). |
| [2. Estimación.txt](<../../Página web existente/5. Inferencia Estadística/2. Estimación.txt>) | Integrado en 9.5: estimación puntual, confianza, tabla y fórmula para la media. Corregidos el 99 % a 2,576, interpretación de cobertura y supuestos de la desviación conocida. |
| [2.1. Distribución de la media muestral.txt](<../../Página web existente/5. Inferencia Estadística/2.1. Distribución de la media muestral.txt>) | Integrado en 9.4: café y «Operación Bombilla». Normalidad exacta, probabilidades sin redondeo intermedio y conclusión del lote corregidas. Componente de tres etapas con teclado y soluciones sin JavaScript. |
| [2.2. Distribución de la proporción muestral.txt](<../../Página web existente/5. Inferencia Estadística/2.2. Distribución de la proporción muestral.txt>) | Integrado en 9.4: comercio y «Lanzamiento Premium». Independencia y aproximación precisadas; probabilidades normales comparadas con binomial exacta y corrección de continuidad. |
| [3. Error y tamaño muestral.txt](<../../Página web existente/5. Inferencia Estadística/3. Error y tamaño muestral.txt>) | Integrado en 9.8: margen, tamaño mínimo y redondeo; se precisan cobertura, desviación conocida y límites del diseño. Calculadora con datos introducidos, sin inventar un ejercicio completo. |
| [4. Ejercicios resueltos.txt](<../../Página web existente/5. Inferencia Estadística/4. Ejercicios resueltos.txt>) | Integrados 27/27 en colección propia, mismo orden e identificadores. Soluciones y fórmulas revisadas; dos preguntas reformuladas para evitar confundir proporción con media y margen con error observado. |
| [5. Flashcards.txt](<../../Página web existente/5. Inferencia Estadística/5. Flashcards.txt>) | Integradas las 30 tarjetas originales en ocho categorías y en el visor común; revisadas notación, aproximaciones, cobertura, muestreo, fórmulas y carga de LaTeX (M12). |
| [6. Tipos de muestreo.txt](<../../Página web existente/5. Inferencia Estadística/6. Tipos de muestreo.txt>) | Integradas en 9.3 las cuatro técnicas probabilísticas y cuatro no probabilísticas con sus ejemplos; precisados alcance, error muestral, costes y generalización. 9.2 organiza ahora el marco, la selección y la respuesta con estado parcial; 9.3 conserva el catálogo de técnicas. |
| [7. Tipo test.txt](<../../Página web existente/5. Inferencia Estadística/7. Tipo test.txt>) | Integradas las 20 preguntas en el visor común, con respuestas, pistas y justificación revisadas. Se corrigen afirmaciones absolutas sobre tamaño, extrapolación, homogeneidad y costes. |
| [8. Intervalos de confianza.txt](<../../Página web existente/5. Inferencia Estadística/8. Intervalos de confianza.txt>) | Integrada en 9.7 la explicación y el laboratorio de cuatro controles. Se precisan cobertura, desviación conocida y alcance determinista de la figura; valor crítico del 99 % corregido. |

## Huecos de cobertura

Los once originales de Inferencia están revisados e integrados en las entregas 92–102: presentación, técnicas de muestreo, distribuciones muestrales, estimación, media y proporción muestral, error y tamaño muestral, 27 ejercicios resueltos, 30 tarjetas, test de 20 preguntas e intervalos de confianza. Esto no completa automáticamente los nueve epígrafes: algunos originales cubren varios apartados y otros dejan huecos. [Auditoría de Inferencia](auditoria-reutilizacion-inferencia.md).

Al migrar, registrar por página qué procede de cada archivo y cuáles son los huecos reales. No publicar contenido nuevo para rellenarlos. Los mínimos generales de ejercicios y preguntas quedan como indicadores, no como una orden de generación para estos bloques.

Los materiales originales de probabilidad permanecen igualmente conservados. Esta actualización no desarrolla ni sustituye sus páginas.

## Seguimiento por bloque

- [x] Programación lineal: siete HTML integrados, cobertura conciliada y pendientes documentados en entregas 71–76. El estado pedagógico global continúa parcial.
- [x] Estadística bidimensional: ocho HTML integrados en entregas 77–84; apoyo parcial por carencias documentadas.
- [x] Distribuciones: integrar los siete HTML, gráficos y bancos existentes. Las lecciones siguen parciales por carencias documentadas.
- [x] Inferencia: revisar e integrar los once HTML, aventuras, laboratorio, bancos y test; mantener las carencias editoriales documentadas.
- [ ] Verificar originales frente a copias y registrar mejoras concretas por página.

Estado de estadística bidimensional por archivo: [auditoría y correspondencias](auditoria-reutilizacion-estadistica-bidimensional.md). Presentación, variable bidimensional, nube de puntos, covarianza, Pearson, regresión, nueve ejercicios y 20 flashcards integrados. Las carencias documentadas mantienen el apoyo parcial.

Distribuciones: presentación integrada en la entrega 85, Variable aleatoria en la 86, Binomial en la 87, Normal en la 88, Aproximación en la 89, Ejercicios Resueltos en la 90 y Flashcards en la 91. [Correspondencia y mejoras](auditoria-reutilizacion-distribuciones.md).


La entrega 105 desarrolla 9.6 desde el guion y datos ya integrados del ejercicio de estaturas. El cálculo central del 95 % se identifica como elaboración didáctica nueva; no se atribuye al original. 9.9 permanece vacío.


La entrega 106 desarrolla 9.9 con la ficha ilustrativa de la presentación. Se señalan los datos ausentes y se evita presentar el ±2 % como margen verificado para el diseño estratificado. Los nueve epígrafes tienen ya contenido parcial; falta ampliar y revisar, no rellenar un hueco vacío.

