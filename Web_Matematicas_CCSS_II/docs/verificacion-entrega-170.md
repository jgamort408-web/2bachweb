# Verificación · Entrega 170

Entrega 170, lote 10. Trabajo técnico del 20 de octubre; cierre documental el 21 de octubre de 2026.

- F003 → `content/latex/distribuciones-i/`; F002 → `content/latex/distribuciones-ii/`.
- ZIP, main.tex y logo registrados por SHA-256 en cada provenance.json. Soluciones originales revisadas; no son solucionarios atribuidos a otra fuente.
- Preservados: 55 minutos, calculadora, 4+4+2 puntos; 0,5 de expresión incluidos, no adicionales.
- M02: (0,2)^8 = 0,00000256; P(X≥6)=0,00123136. Corregida potencia y suma final sin redondeos intermedios.
- M03: 85+20·0,85=102. Conservado el resultado aproximado, corregida la cadena aritmética; cuantil sin redondeo ≈101,99731.
- N(μ,σ) se interpreta con desviación típica como en las soluciones originales. Aproximaciones de tabla identificadas, sin presentarlas como resultados exactos.
- Colas binomiales contrastadas mediante coeficientes combinatorios y convolución exacta; normal mediante cuadratura de Simpson independiente. Corrección de continuidad contrastada mediante erfc.
- Cuatro PDF, ocho páginas revisadas visualmente: dos exámenes de una página y dos soluciones de tres. Sin recortes ni fórmulas rotas; A4, idioma, títulos, texto extraíble y fuentes incrustadas verificados.
- Recompilación sin conexión con las cuatro huellas idénticas: `../../tmp/pdfs/lote-170/hashes-before.json`. Informes `pdf/distribuciones-i-build.json` y `pdf/distribuciones-ii-build.json`.
- 341 pruebas pasan. Chrome comprueba 28 PDF y catálogo de 976 entidades desde raíz/subcarpeta. Logs: `../../tmp/tanda-06-170-unit-tests.log` y `../../tmp/tanda-06-170-browser.log`.
- Regresión de Límites y Derivadas superada: `../../tmp/pdfs/lote-170/regression-limites.json`.

20 de 30 paquetes revisados; 10 pendientes. Biblioteca T07 y servicio central T04 pendientes. PDF sin etiquetado semántico completo; validación con lector de pantalla pendiente T13. Diseño web y MathJax sin cambios.

- [x] F002/F003 revisados, compilados, inspeccionados y registrados.
- [ ] Siguiente lote: F017/F018, Probabilidad.
