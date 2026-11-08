# S011 · EXA-0010 · Extraordinaria 2020–2021

Estado: cerrado. Tres pasadas del mismo autor (Codex), sin atribuir segundo revisor.

## Trabajo secuencial

- [x] Cotejar las tres páginas del examen, los criterios y la tabla normal externa.
- [x] Redactar los ocho ejercicios por ID, sin modificar preguntas ni categorías.
- [x] Comprobar resultados con cálculo separado y revisar las hipótesis.
- [x] Cotejar todos los apartados con los criterios oficiales asociados.
- [x] Validar los ocho fragmentos tras revisar el borrador completo.
- [x] Revisar ambos PDF finales, superar las pruebas y comprobar el ZIP extraído.

## Fuentes y límites de identificación

Examen `SRC-CC4942CDBF40`, criterios `SRC-24D2A513C464`, tabla `SRC-32F4C8A72FBC`. La convocatoria extraordinaria y el curso 2020–2021 están impresos; titular/julio proceden del nombre y no confirman una fecha completa. Modelo-5 sólo figura en el nombre de los criterios; el campo de modelo se conserva vacío. La tercera página del examen es una tabla normal, no un ejercicio adicional.

| ID (prefijo SEL-D0010-) | Resolución y comprobación |
|---|---|
| BA-E01 | Determinante -8-a, cofactores e inversa; producto igual a identidad y columna solución (1/3,-2/3,1/3). |
| BA-E02 | Todas las intersecciones y desigualdades: triángulo, restricción redundante, extremos únicos y exclusión de 47/3. Figura vectorial. |
| BB-E03 | Salto en cero, monotonía respetando el salto y mínimo -1. Integral por ramas contrastada con Simpson, diferenciada del área geométrica. |
| BB-E04 | Continuidad en ambas uniones y derivadas laterales distintas; comparación de todos los candidatos y máximo 5825 personas a los 8.3 meses. |
| BC-E05 | Cuatro hojas, probabilidad total, Bayes y distinción entre intersección y condicionadas. |
| BC-E06 | Complemento, inclusión-exclusión y condicionada; cuatro regiones y marginales verificados. |
| BD-E07 | IC para proporción al 99.5%; desigualdad estricta. Mínimo 783 con cuantil preciso, 785 si se usa 2.81 tabulado. |
| BD-E08 | Desviación conocida y normalidad exacta de la media; suma 127.2, media 10.6, IC al 97% y tamaño mínimo 53. |

## Discrepancias que se conservan explícitas

E3c pide una integral definida. La rúbrica menciona integral indefinida y área; no se cambia la pregunta para adaptarla. Se calcula la integral con signo y se distingue el área geométrica, ya que la rama cuadrática es negativa entre 0 y 2.

E7b: el cuantil preciso 2.807033768 da cota estricta 782.901016973 y mínimo 783. El cuantil 2.81 leído sin interpolación da cota 784.556496 y mínimo tabulado 785. Se explican los dos procedimientos, sin atribuir un resultado numérico a criterios que no lo fijan. Ambos límites quedan registrados en las observaciones del ID correspondiente.

Las 28 incidencias históricas mantienen sus estados; no se cierra ninguna automáticamente. Los contextos de COVID-19 y Brexit son los de las preguntas originales y no se presentan como datos actuales.

## Diario

`S011 · feat` — Ocho soluciones didácticas por ID y selección modular del examen, sin alterar la selección predeterminada.

`S011 · check` — [Comprobador reproducible](../../scripts/verificaciones/s011.py) y [evidencia matemática](S011_verificacion_matematica.json): fracciones, enumeración de fronteras, integración numérica separada y cuantiles contrastados con erfc por bisección. No constituye una revisión por una segunda persona.

`S011 · test/build` — 22 pruebas superadas. Ocho soluciones nuevas validadas;80 acumuladas y560 pendientes. Los640 enunciados,632 soluciones restantes y186 PDF anteriores permanecen idénticos. PDF finales revisados, sin desbordamientos.

## Cierre

Ocho soluciones nuevas;80 validadas y560 pendientes. ZIP extraído: ambos modos y S010 idénticos byte a byte; main L084 por texto y renderizado.215 fuentes originales verificadas. [Control](S011_control.json) · [Verificación matemática](S011_verificacion_matematica.json) · [Preguntas](../../output/pdf/s011-2021-extraordinaria-enunciados.pdf) · [Preguntas y soluciones](../../output/pdf/s011-2021-extraordinaria-con-soluciones.pdf) · [ZIP](../../dist/Selectividad_Overleaf.zip). Siguiente:S012, EXA-0011.

Cierre registrado el 8 de noviembre de 2026. Compilación local del ZIP extraído; el servicio remoto de Overleaf no se ha probado.
