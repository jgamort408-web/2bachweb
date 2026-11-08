# S002 · 2019 · A3/A4 y B1-B4

Fecha:2026-11-07. Estado: cerrado.

Seis ejercicios restantes de EXA-0001. Sin incidencias matemáticas directas en el registro; convocatoria/tipo de carpeta y modelo no acreditado se conservan. No se modifican enunciados, categorías ni fuentes.

- [x] Revisar visualmente ambas páginas, criterios y tabla normal; proteger los 1448 archivos anteriores.
- [x] Redactar teoría, desarrollo, comprobación e interpretación de los seis ejercicios.
- [x] Comprobación separada de probabilidades, inversa y ecuación matricial, continuidad/derivabilidad y cálculos de inferencia.
- [x] Revisión didáctica y cotejo de todos los apartados con los criterios.
- [x] Compilar e inspeccionar el borrador completo antes de validar.
- [x] Validar las seis soluciones, regenerar índice y superar las pruebas.
- [x] Revisar los PDF finales y recompilar el ZIP aislado.

## Diario

`S002 · plan` — Tres pasadas del mismo autor, sin atribuir revisión independiente. Especial atención a las desigualdades estrictas y al percentil de confianza95.5%, al orden de factores matriciales y a la discontinuidad en el estudio de inflexión.

## Tres pasadas y criterios

Redacción de los seis ejercicios y todos sus apartados; comprobación matemática separada y revisión didáctica del mismo autor, sin revisor independiente. Borrador de nueve páginas inspeccionado íntegro.

- A3:probabilidad total y Bayes, contrastados con tabla conjunta exacta.
- A4:proporción, percentil, intervalo y tamaño mínimo cubren los criterios; error estricto preservado, n2914 contrastado con n2913.
- B1:simetría, determinante/cofactores/inversa y ecuación; inversa contrastada por eliminación de Gauss y ambos productos identidad; residuo matricial nulo.
- B2:continuidad, derivadas laterales, monotonía, curvatura y ausencia de inflexión. Se distingue el parámetro a=-1 de a=-2 y se preserva el dominio real completo.
- B3:unión, condicionada y diferencia, con probabilidades conjuntas no negativas que suman1.
- B4:media, percentil, extremos del intervalo y tamaño mínimo. Para confianza95.5% se usa z=2.004654462, no2; n114 produce error1.502025 y n115 error1.495480. Con el percentil conservador de tabla2.01 también resulta115. Los criterios no aportan una respuesta numérica distinta.

[Comprobaciones reproducibles](S002_verificacion_matematica.json); script incluido:scripts/verificaciones/s002.py. La maquetación inicial desbordaba una línea del texto de comprobación de A4; se reorganizó como fórmula aparte y el borrador recompiló sin ese aviso.

`S002 · test/build` — 22 pruebas superadas; seis soluciones nuevas validadas; ocho acumuladas y632 pendientes. Todos los640 enunciados, las634 soluciones restantes y los168 PDF anteriores protegidos permanecen intactos. Sólo cambian estado de solución y observaciones de los seis registros. Índice actualizado para contar soluciones validadas sin presentar respuestas. PDF finales inspeccionados; ZIP aislado pendiente.

## Cierre

Seis soluciones nuevas validadas; ocho acumuladas,632 pendientes. Tres pasadas del mismo autor; no se atribuye revisión independiente. ZIP aislado: dos modos idénticos, soluciones S001 idénticas y main L084 por texto y renderizado;215 fuentes originales verificadas. [Control](S002_control.json) · [Preguntas](../../output/pdf/s002-2019-resto-enunciados.pdf) · [Preguntas y soluciones](../../output/pdf/s002-2019-resto-con-soluciones.pdf) · [ZIP](../../dist/Selectividad_Overleaf.zip). Examen completo: entrada l001-con-soluciones.tex compilada con las ocho soluciones y sin avisos de pendiente. Siguiente:S003, ocho ejercicios de EXA-0002.
