# Incidencias de contenido

## Incidencias heredadas

Las incidencias **M01–M12** están en el apartado 3 de ../../INVENTARIO_Y_DIAGNOSTICO_MATERIALES.md. La revisión de los 30 paquetes LaTeX/PDF queda cerrada en la entrega 176 con carencias originales explícitas; el estado individual vigente consta en docs/pdf/registro-paquetes.json. Los originales se conservan. La tabla distingue las adaptaciones ya aplicadas a la web; no da por corregidos los archivos fuente.

## Identificadores conciliados en la entrega 157

M13 queda reservado al paso logarítmico de F029. La incidencia del cohete, llamada M13 en el registro de la entrega 07, se identifica desde ahora como **M14**. Las referencias históricas deben interpretarse con esta equivalencia. Son dos problemas distintos y M13 queda corregida en copia LaTeX/PDF en la entrega 161; M14 queda corregida en copia LaTeX/PDF en la entrega 169.

## Adaptaciones comprobadas en la entrega 07

| Incidencia | Aplicación concreta | Alcance pendiente |
|---|---|---|
| M01: denominador de una rama fuera de su intervalo | review-001 obliga a elegir la rama válida; alrededor de 1 rige un polinomio y no hay asíntota vertical | Cerrada en copia LaTeX/PDF F001, entrega 176; rama válida, asíntotas y monotonía global corregidas |
| M06: discrepancia entre enunciado y solución | Practicar, problema 1 y review-004 conservan a/(x−1): a=1, b=1 | Cerrada en copia revisada y PDF F029/F030, entrega 161; originales conservados |
| M08: vertical mal identificada como tangente | Practicar, problema 2 y review-005 obtienen y=8x−10 con los datos del apartado; se explica punto y pendiente | Cerrada en copia revisada y PDF de F023, entrega 160; ZIP original conservado |
| M09: signo de derivada en un punto | review-002 y fc-review-05 exigen signo en todo el intervalo abierto | Aplicar la revisión al banco general cuando se migren todas sus preguntas |
| M14: llegada en tiempo finito (antes M13 en la entrega 07) | Practicar, problema 3 y review-003 muestran D(t)>0 para todo t finito admisible | Cerrada en copia revisada y PDF de F008, entrega 169; ZIP original conservado |

Los problemas nuevos se contrastan con cocientes incrementales o evaluaciones independientes en tests/continuity-repair.test.mjs. Las seis preguntas se recorren con autocorrección en navegador; véase [verificacion-entrega-07.md](verificacion-entrega-07.md).

## M13 · Paso logarítmico y dominio de una primitiva

- **Fuente:** F029, Subida de nota T1 General Soluciones.zip, primer documento, ejercicio 3.
- **Problema:** se escribe \(\int1/(1-x)\,dx=x\) y la respuesta no contempla el dominio a ambos lados de 1.
- **Corrección:** \(\int1/(1-x)\,dx=-\ln|1-x|+C\). Para \(h=x^2+e^{2x}-1/(1-x)\), una primitiva es \(x^3/3+e^{2x}/2+\ln|1-x|+C\), por intervalos sin cruzar 1.
- **Comprobación:** derivar cada término recupera \(h\); \((\ln|1-x|)'=-1/(1-x)\).
- **Estado:** aplicado al ejemplo de la lección 3.4; corregido también en copia LaTeX y PDF F029/F030, entrega 161. El inventario principal conserva este identificador.

## M14 · Límite asintótico y tiempo finito

- **Fuente:** Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Límites y Derivadas.zip, main.tex, comentario de solución de 4(b).
- **Problema:** de D(t)=100/(t²+1) → 0 se deduce que el cohete aterriza. El modelo nunca alcanza cero en tiempo finito.
- **Corrección prevista:** explicar la aproximación asintótica; no deducir un instante de aterrizaje.
- **Comprobación:** para t ≥ 0 finito, numerador y denominador son positivos.
- **Estado:** aplicado a la adaptación web en la entrega 07 y corregido en copia LaTeX/PDF de F008 en la entrega 169. ZIP original conservado. Véase [auditoría](auditoria-pdf-limites-derivadas.md).

La lección 1.1 incorpora la distinción general entre aproximarse a cero y alcanzarlo.

## M15 · Monotonía y curvatura en un dominio desconectado

F023, ejercicio 2(a): g(x)=1/(x+3) decrece en cada rama, pero no globalmente en su dominio. Contraejemplo: -4<-2 y g(-4)=-1<1=g(-2). La discontinuidad en -3 tampoco es un punto de inflexión. Corregida y comprobada en la copia LaTeX revisada y su PDF, entrega 160. Original intacto. Véase la [auditoría](auditoria-pdf-recuperacion-t1.md).

## M16 · Crecimiento en un dominio desconectado de F029

Para g=x/(x+3), g'>0 implica crecimiento en cada rama; no en todo el dominio conjuntamente. Contraejemplo -4<-2, pero g(-4)=4>g(-2)=-2. La discontinuidad en -3 no constituye punto de inflexión. Corregida en copia revisada y PDF, entrega 161. [Auditoría](auditoria-pdf-subida-nota-t1-general.md). Es distinta de M15, referida a 1/(x+3).

## M07 · Frontera estricta en las misiones

F019 modeliza «superar 2 millones» con >= en vez de >. En F019/F021 queda corregida en copia LaTeX y PDF, entrega 164: 2x+y>20, segmento inferior excluido y cantidades enteras diferenciadas. El máximo (4,16) sigue siendo válido. F020/F022 revisados en la entrega 165: la formulación de misiones conserva la condición estricta. Incidencia atendida en las dos parejas revisadas, sin modificar originales. [Auditoría](auditoria-pdf-programacion-lineal-i.md).

## M17 · Correspondencia y puntuación de PL I

F019 cambia el orden de los tres ejercicios y les asigna 4, 2 y 4 puntos. F021 pide un obligatorio de 5 puntos y solo uno entre dos optativos, también de 5 puntos. La copia revisada sigue F021: orden 1 recinto, 2 misiones, 3 baterías y máximo de 10 puntos, incluidos 0,5 de expresión en cada ejercicio realizado. Originales conservados; pareja PDF revisada en entrega 164.

## M18 · Ejercicio de misiones sustituido por frutos rojos

F022 pide formular sin resolver el problema de misiones en su ejercicio 2; F020 incluye en su lugar una formulación de frutos rojos. En copia revisada y PDF, entrega 165, se redacta la formulación fiel al examen y se conserva la variante en un anexo no evaluable, con sus datos y sin resolver. Se mantienen tres obligatorios y puntos 4+3+3. [Auditoría](auditoria-pdf-programacion-lineal-ii.md).

## M19 · Beneficio neto no determinado por precios de venta

La variante de frutos rojos de F020 denomina beneficio a 2,40x+1,80y, aunque solo aporta precios de venta. El anexo revisado identifica esa función como ingreso. Para beneficio neto faltan costes o márgenes, o una hipótesis explícita. Carencia conservada y señalada; pendiente mejorar el enunciado original. No se inventan datos ni se resuelve el modelo.

## M20 · Corte eléctrico no determinado únicamente por temperatura

F007, ejercicio 4(c): la curva térmica indica calentamiento desde 1, máximo en 6 y recuperación del régimen a las 11, pero no define el estado eléctrico. La respuesta de corte de 1 a 6, cinco horas, exige suponer que inicio del calentamiento y del enfriamiento coinciden con pérdida y retorno de energía. La copia revisada explica esa interpretación y la limita expresamente; pendiente explicitar esa hipótesis en el enunciado para una evaluación inequívoca. No se deduce que el retorno sea a las 11 solo por recuperarse la temperatura. [Auditoría](auditoria-pdf-funciones.md).

## M02/M03 · Distribuciones, cierre de entrega 170

Corregidas en copias LaTeX/PDF F002/F003; ZIP originales intactos. M02: (0,2)^8=0,00000256 y cola desde seis=0,00123136. M03: 85+20·0,85=102; cuantil sin redondeo ≈101,99731. [Auditoría](auditoria-pdf-distribuciones.md).

## M21 · Redondeo de Bayes en F018

- Fuente: Probabilidad.zip, ejercicio 3(b). 343/469=49/67≈0,731343…; el original escribe 0,7314.
- Estado: corregida a 0,7313 en copia LaTeX/PDF, entrega 171. ZIP conservado. Verificación por recuento de estudiantes y probabilidad total.

## M22 · Mecanismo de selección en secaderos

- Fuente: F018, ejercicio 4. «Elegido un jamón al azar de uno de los secaderos» admite lecturas distintas.
- Interpretación de la solución original conservada: selección uniforme entre todos los jamones, usando las proporciones 2/3 y 1/3. Seleccionar primero el secadero uniformemente sería otro modelo.
- Estado: interpretación explicitada en el solucionario revisado de la entrega 171; mejora de redacción del enunciado original sigue pendiente. No se alteran datos ni se atribuye precisión inexistente al original. La variante F017 se interpreta igualmente conforme a sus proporciones 0,6 y 0,4.
- [Auditoría y comprobaciones](auditoria-pdf-probabilidad.md).

## M04/M05 · F009, sumas y centros de intervalos

- Estado: corregidas en copia LaTeX/PDF, entrega 172; ZIP original intacto. Pacientes: suma 144, media 9, IC97,5 %≈(7,87929864;10,12070136). Frambuesas: suma 110, media 11, IC97 %≈(8,94127150;13,05872850).
- Convención N(μ,σ) explícita con varianza aparte. El cambio de notación no modifica los datos. [Auditoría](auditoria-pdf-recuperacion-inferencia.md).

## M23 · F009, regla de evaluación ausente

- Nueve ejercicios de 2,5 puntos suman 22,5; no se indica elección ni conversión, aunque se conservan los 55 minutos del original.
- Estado: **abierta como carencia del original**. Examen y soluciones advierten al docente; se conservan todos los ejercicios. No se inventa una selección o calificación sobre 10.

## M24 · F009, ordenadas de extremos incorrectas

- Ejercicio 7(b): para 4x³−3x+4, f(−1/2)=5 y f(1/2)=3; no 4 y 2. El cubo del argumento negativo mantiene su signo.
- Estado: corregida en copia LaTeX/PDF, entrega 172; máximo (−1/2,5), mínimo (1/2,3), intervalos de monotonía comprobados por separado.

## M25 · F009, solución gráfica ausente

- Ejercicio 6(b): el original sustituye la solución por una oferta de ayuda. La copia incorpora gráfico, vértices y tabla del objetivo, identificados como elaboración de esta edición.
- Estado: completada en entrega 172. Vértices (1,3), (3,2), (4,4), (2,7); mínimo único 5 en (1,3). Recorte por semiplanos exacto independiente.

## M26 · F009, decimales de llaves

- Ejercicio 4: 118/267≈0,4419 para ambas válidas; 238/267≈0,8914 para alguna; 40/89≈0,4494 para exactamente una. El original indica 0,440 y resta un complemento ya redondeado para obtener 0,892.
- Estado: corregida en copia LaTeX/PDF, entrega 172. Enumeración de las 4005 parejas y combinatoria sin reemplazamiento coincidentes.

Precisión editorial adicional de F009: el enunciado de pacientes no documenta el muestreo aleatorio e independiente requerido. Se explicita como hipótesis del método en las soluciones; su confirmación y la redacción del enunciado siguen pendientes de revisión docente.

## M27 · F012, suma e intervalo de electrodomésticos

- Los nueve precios suman 1620, no 1630. La media es 180 euros. El original también da 245,32 y una conclusión (115,78;246,44) incoherentes.
- Estado: corregida en copia LaTeX/PDF F012, entrega 173. IC95 % con cuantil sin redondear ≈(114,66786718;245,33213282); con tabla 1,96, a dos decimales (114,67;245,33). Se conservan todos los datos.
- F010 cotejado y corregido en entrega 174; F013 no contiene este ejercicio.

## M28 · F011/F012, precisión del diseño muestral

- La solución afirma de forma absoluta que el diseño probabilístico es más preciso. Se precisa que permite inferencia y estimación del error según el diseño; no garantiza mayor precisión o ausencia de sesgo en cualquier situación.
- Estado: matizada en ambas copias LaTeX/PDF, entrega 173. Se distinguen afijación y selección aleatoria; se explican marco, no respuesta y medición, sin cuantificar mejoras no deducibles.
- [Auditoría y comprobaciones](auditoria-pdf-inferencia-i-ii.md). Alcance ampliado a F010 tras cotejo en entrega 174; F013 no contiene el ejercicio de universidad.

## M29 · F013, margen de gasto

- 2,17·6/7=1,86; el valor intermedio 1,8609 del original es incorrecto. Sin redondear el cuantil, el margen es 1,86007747 euros.
- Estado: corregida en copia LaTeX/PDF, entrega 174; se mantiene el resultado final original a dos decimales.

## M30 · F013, precisión del intervalo y tamaño inferido

- Extremos (24,47;26,43): con tabla 1,96 y valores exactos se obtiene n=144. Si son extremos redondeados, también son compatibles 143 y 145; no hay unicidad.
- Estado: explicación incorporada a la copia revisada, entrega 174. La convención del enunciado permanece pendiente de precisión para exigir una respuesta única. No se modifica silenciosamente el enunciado.

## M31 · F010, regla de evaluación ausente

- Cinco ejercicios 4+4+4+4+2 suman 18, sin selección ni conversión de nota; se conservan los 55 minutos.
- Estado: **abierta como carencia del original**, señalada en examen y soluciones, entrega 174. No se inventa nota sobre 10 ni se elimina contenido.
- [Auditoría y verificaciones](auditoria-pdf-inferencia-recopilaciones.md).

## M32 · F004, raíces de temperatura y duración

- Examen 2, ejercicio 4: 16−(t−6)²>0 equivale a 2<t<10, ocho horas. Se corrigen las raíces 3,1/8,9 y duración aproximada 5,8 del original.
- Estado: corregida en copia LaTeX/PDF, entrega 175. Con las reglas añadidas por la solución original, sí se supera el criterio de vacunas de más de seis horas positivas. No se aplica fuera del modelo del ejercicio.

## M33 · F004, criterios de conservación ausentes

- El enunciado pregunta por sueros y vacunas sin dar umbrales. Solo la solución añade umbral 20 para sueros y más de seis horas sobre cero para vacunas.
- Estado: carencia del enunciado abierta; la solución revisada explicita procedencia y respuesta condicional, entrega 175. Son reglas del material, no criterios sanitarios generales. M20 también se aplica aquí: la curva no identifica de forma única el estado eléctrico.

## M34 · F004, límite sin tendencia

- Examen 1, 3(d): falta la tendencia en (1−1/x²)^x. La edición adopta x→+∞, compatible con el resultado 1 de la solución, y lo declara en el enunciado.
- Estado: aclarada como adaptación editorial en entrega 175; no se atribuye a un dato explícito del original.

## M35 · F004, continuidad y derivada en extremo

- Examen 2, ejercicio 2: no hay «salto suave» en x=2; la función es continua con derivadas laterales 4/3 y −4/9. En 0 la derivada derecha es cero.
- Estado: corregida en copia LaTeX/PDF, entrega 175; gráficos elaborados y dominio [0,∞) explícito.

## M36 · F005, puntuación del anexo comentado

- Rótulo de 1 punto frente a apartados 0,75+0,75+0,5+0,5=2,5.
- Estado: conservado fuera de evaluación, sin ponderación nueva, entrega 175. Solucionario del anexo elaborado. No se altera el examen activo de 10 puntos.

[Auditoría F004/F005](auditoria-pdf-repaso-y-final.md). También queda señalada la ausencia de unidad de distancia en el enunciado del cohete de F004; la escala original del solucionario se identifica como tal.

## M01 · Cierre completo de F001

- En la rama racional x≥2 no existe aproximación a 1; en torno a 1 rige el polinomio, sin asíntota vertical. Para a=4 hay salto en 2 y no monotonía global: f(3/2)=1/4<f(2)=1.
- Estado: corregida en copia LaTeX/PDF, entrega 176. Continuidad con a=5 y falta de derivabilidad confirmadas. ZIP original intacto.

## M37 · F001, vértices inviables y óptimo de tartas

- El óptimo original (17,46) consume 109 kg de bizcocho frente a 100 disponibles. (50,0) incumple la crema y (0,40) no es vértice.
- Estado: corregida en copia revisada, entrega 176. Vértices (0,0),(40,0),(20,40),(8,46),(0,46); máximo único 680 euros en (20,40). Comprobación continua y entera independientes.

## M38 · F001, suma de desfases e intervalo

- Los diez datos suman 30,9, no 31,9; media 3,09. IC97 %≈(1,71751434;4,46248566) min, o (1,72;4,46) con dos decimales.
- Estado: corregida en copia revisada, entrega 176; muestra mínima estricta 62 confirmada. Se precisa que el tamaño entero es no decreciente con confianza y puede permanecer constante en aumentos pequeños.
- [Auditoría F001](auditoria-pdf-subida-nota-curso.md) y [cierre T06 con carencias pendientes](cierre-t06-latex-pdf.md).
