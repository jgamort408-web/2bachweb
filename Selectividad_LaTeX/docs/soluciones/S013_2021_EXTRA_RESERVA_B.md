# S013 · EXA-0012 · Curso 2020–2021

Estado: cerrado. Tres pasadas del mismo autor (Codex), sin atribuir segundo revisor.

## Trabajo secuencial

- [x] Cotejar las dos páginas de examen, los criterios y la tabla normal.
- [x] Redactar los ocho ejercicios por ID, conservando preguntas y categorías.
- [x] Comprobar resultados por métodos separados y revisar hipótesis.
- [x] Cotejar todos los apartados y figuras con los criterios asociados.
- [x] Validar los ocho fragmentos tras revisar el borrador completo.
- [x] Revisar ambos PDF finales, superar las pruebas y comprobar el ZIP extraído.

## Fuentes e identificación

Examen `SRC-3B7891337E9E`, criterios `SRC-68337B3AAB18`, tabla `SRC-A79F7E613F7F`. Sólo está confirmado en cabecera el curso 2020–2021. Extraordinaria, reserva B y Modelo-6 proceden de nombres; se conservan los límites y campos vacíos de modelo existentes.

| ID (prefijo SEL-D0012-) | Desarrollo y comprobación |
|---|---|
| BA-E01 | Inversión estricta, lado excluido y vértices del cierre; máximo único (4,16), F=8.8, por cota global y enumeración entera. |
| BA-E02 | Potencias para n≥1, caso n=0 separado; det B=-1 y solución (7,-13,-3). |
| BB-E03 | b=1/2, a=3/2 para derivabilidad, mínimo en x=1 para a<0; gráfico y área 25/12 con a=0. |
| BB-E04 | Signos y extremos en 10 y 20; primitiva e hipótesis continua para fijar la constante con el valor inicial. |
| BC-E05 | Intersección 0.3332, total no defectuoso 0.9824 y Bayes 4455/9824, contrastados como fracciones exactas. |
| BC-E06 | Independencia, al menos un contagio y Bayes 72/73; cuatro hojas verificadas. |
| BD-E07 | IC al 94%; tamaño 2679 con confianza 97% y cota inclusiva. |
| BD-E08 | IC al 97%; tamaño 121 con confianza 94% y cota estricta. |

## Hipótesis y fronteras explícitas

E1 exige superar dos millones, no alcanzarlos. Se mantienen excluidos el lado 2x+y=20 y sus dos vértices. El óptimo sí pertenece al recinto. El máximo se prueba por una cota alcanzada, sin aplicar automáticamente un teorema de compacidad a una región no cerrada. Se distingue el modelo entero del continuo.

E4 prescribe la derivada sólo en (0,24). La fórmula con K=50 corresponde a la interpretación continua habitual en [0,24]. Sin continuidad en los extremos, c(0)=50 no determina K ni c(24). La solución y las observaciones individuales declaran este límite.

E7 cambia confianza 94 a 97 y permite igualdad en el error máximo. E8 cambia 97 a 94 y exige error estrictamente menor. Las 28 incidencias históricas mantienen su estado; no se cierra ninguna automáticamente.

## Diario

`S013 · feat` — Ocho borradores didácticos y dos figuras vectoriales; selección modular por ID sin cambiar la selección predeterminada.

`S013 · check` — [Comprobador reproducible](../../scripts/verificaciones/s013.py) y [evidencia matemática](S013_verificacion_matematica.json): cálculo exacto, enumeración, Simpson y cuantiles separados por erfc y bisección. No se atribuye revisión por una segunda persona.

`S013 · test/build` — 22 pruebas superadas. Ocho soluciones nuevas validadas;96 acumuladas y544 pendientes. Los640 enunciados,632 soluciones restantes y190 PDF anteriores permanecen idénticos. PDF finales revisados, sin desbordamientos.

## Cierre

Ocho soluciones nuevas;96 validadas y544 pendientes. ZIP extraído: ambos modos y S012 idénticos byte a byte; main L084 por texto y renderizado.215 fuentes originales verificadas. [Control](S013_control.json) · [Verificación matemática](S013_verificacion_matematica.json) · [Preguntas](../../output/pdf/s013-2021-extra-reserva-b-enunciados.pdf) · [Preguntas y soluciones](../../output/pdf/s013-2021-extra-reserva-b-con-soluciones.pdf) · [ZIP](../../dist/Selectividad_Overleaf.zip). Siguiente:S014, EXA-0013.

Cierre registrado el 8 de noviembre de 2026. Compilación local del ZIP extraído; el servicio remoto de Overleaf no se ha probado.
