# T06 · Lote 06 · Matrices I y II

20 de octubre de 2026 · Entrega 166 · Lote cerrado; T06 continúa abierta.

## Dos exámenes distintos y dos soluciones elaboradas

- F014: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Matrices I.zip`.
- F015: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Matrices II.zip`.

Cada ZIP contiene un único examen, un logo y seis imágenes geométricas que no se utilizan en estos ejercicios. **No contienen solucionarios** y no constituyen una pareja examen/soluciones entre sí. Se han elaborado dos solucionarios nuevos, identificados expresamente como tales en sus primeras páginas y en las procedencias; sus resultados se contrastan con los datos de cada examen.

Los ZIP y las entradas `main.tex` permanecen intactos y se verifican por SHA-256. Copias de inspección: `../../tmp/pdfs/lote-166/originales/`. Copias revisadas y procedencia: `../content/latex/matrices-i/` y `../content/latex/matrices-ii/`. Cada logo se copia de su propio ZIP y se verifica contra él. Las imágenes ajenas a estos ejercicios permanecen en los originales.

En ambos exámenes se conservan 55 minutos, calculadora, ejercicios de 5+2,5+2,5=10 puntos y apartados 3+2 del ejercicio 1. En el ejercicio 2 se eligen **cuatro de cinco** operaciones. El solucionario muestra las cinco para consulta, pero no amplía el requisito de evaluación ni inventa puntuaciones individuales. No se añaden tiempos por ejercicio, ausentes en los originales. Se conserva el exponente 2025 de F014.

## F014 · Matrices I

### Ejercicio 1

AB=[[-2,0],[6,-1]], y M=AB-C=[[-3,-2],[4,2]], de determinante 2. Su inversa es [[1,1],[-2,-3/2]]. Se comprueban los dos productos MM^-1 y M^-1M, ambos identidad, y se contrasta la inversa por reducción y adjunta.

Para MX=C^t, se multiplica a la izquierda, conservando el orden. C es simétrica y resulta X=[[3,-1],[-5,1/2]]. El residuo de MX-C^t es exactamente nulo.

### Ejercicio 2

- A+BC: no definida, suma de dimensiones 2x2 y 2x1.
- AC+BD^t: columna (4,-9).
- B²+CD: [[-2,6],[-10,6]].
- |5A|: -75; el factor para orden 2 es 5², no 5.
- |D^t|: no definido por ser rectangular, distinto de determinante cero.

### Ejercicio 3

N=I3-A es estrictamente triangular superior. N² tiene como único elemento no nulo el 35 de la posición (1,3); N³ es cero. Por ello N^2025 es la matriz nula. Se comprueban multiplicación exacta y exponenciación binaria independiente; no se actualiza el exponente al año actual.

## F015 · Matrices II

### Ejercicio 1

El determinante de A es -12. La inversa es [[1/4,1/6,7/12],[0,1/3,-1/3],[1/4,-1/6,-1/12]]. Se contrasta por adjunta y reducción racional y se verifican las dos identidades de producto. X=(1,1,0)^t satisface AX=(2,3,0)^t exactamente y es única.

### Ejercicio 2

- AC+BD^t: columna (-3,6).
- A+BC: no definida, suma de dimensiones distintas.
- B²+CD: [[4,0],[-5,6]].
- |5A|: 25.
- |C|: no definido, columna rectangular.

### Ejercicio 3

Se respeta el signo de la coordenada -b. La igualdad equivale a 2a+b=3 y 3a-2b=0. Se obtiene a=6/7, b=9/7. Sustituir en ambos productos originales da (3,27/7)^t. La matriz del sistema de parámetros tiene determinante -7, por lo que la pareja es única.

## Verificación técnica y visual

- Cuatro PDF: cada examen tiene una página y cada solucionario tres. Se inspeccionaron las ocho páginas renderizadas: matrices, signos, fracciones, exponentes, texto de autoría, elección de operaciones, cabeceras y pies, sin recortes ni solapamientos.
- Recompilación sin conexión con idénticas huellas para los cuatro documentos.
- Cada PDF declara título e idioma es-ES y permite extraer texto; numeración, fuentes incrustadas, ausencia de cifrado, errores de glifos, referencias y desbordamientos comprobados. Los exámenes incrustan 12 fuentes cada uno y los solucionarios 14 cada uno.
- Informes independientes `pdf/matrices-i-build.json` y `pdf/matrices-ii-build.json`. El módulo `../scripts/pdf_math_matrices.py` implementa el contraste exacto de productos, dimensiones, determinantes por permutaciones, inversas por reducción/adjunta, potencias y parámetros.
- PL II supera de nuevo su verificación tras incorporar el módulo de matrices.
- 77 archivos unitarios, 341 pruebas superadas, cero fallos: `../../tmp/tanda-06-166-unit-tests.log`.
- Chrome verifica catálogo, fórmulas y entrega HTTP de los dieciséis PDF desde raíz y subcarpeta: `../../tmp/tanda-06-166-browser.log`.

## Reproducción

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-matrices-i.json --engine RUTA/tectonic.exe --python RUTA/python.exe --cached
node scripts/build-pdfs.mjs --config config/pdf-build-matrices-ii.json --engine RUTA/tectonic.exe --python RUTA/python.exe --cached
python scripts/update-pdf-inventory.py
```

Motor y dependencias: [piloto](auditoria-pdf-recuperacion-t1.md). Las dos configuraciones tienen carpetas temporales e informes distintos. Tras cambiar contenido hay que repetir la revisión visual completa.

## Estado y siguiente lote

14 de 30 paquetes originales revisados y 16 pendientes. Se generan 16 PDF en ocho parejas examen/soluciones: el número de PDF ya no coincide con el de paquetes, porque F014 y F015 aportan un examen cada uno y se han creado sus soluciones. Catálogo de 964 entidades; las dos nuevas parejas dependen de t04 y cada solución de su examen. El registro `pdf/registro-paquetes.json` mantiene la distinción entre fuente y documentos.

T06 continúa abierta; T04 necesita servicio administrativo real y T07 la biblioteca con filtros. Accesibilidad semántica de PDF y lector de pantalla pendientes de T13. No se modifica el diseño web ni MathJax; la ocultación de enlaces estáticos no protege los archivos. M19, información de costes de frutos rojos, mantiene su carencia documentada.

- [x] Lote 07: F016, Matrices III. Lote de un paquete para cerrar el bloque sin mezclar materias.
- [x] Inspeccionar examen y soluciones disponibles; contrastar álgebra y conservar condiciones de evaluación.
- [x] Compilar, revisar todas las páginas y actualizar procedencia, catálogo e inventario.

Lote 07 completado en entrega 167: [auditoría Matrices III](auditoria-pdf-matrices-iii.md). Estado vigente: quince paquetes revisados, quince pendientes y dieciocho PDF.
