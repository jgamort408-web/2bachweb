# T06 · Lote 02 · Sistemas de ecuaciones I

20 de octubre de 2026 · Entrega 162 · Lote cerrado; T06 continúa abierta.

## Fuentes conservadas

F025: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - SELs I (SOLUCIONES).zip`.

F026: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - SELs I.zip`.

Ambos ZIP incluyen un único `main.tex`, un logo y seis imágenes de figuras geométricas ajenas a estos ejercicios. Los ZIP y sus entradas se conservan y se verifican por SHA-256. Solo se copia el logo realmente utilizado, obtenido de F026 y comprobado contra su entrada original. Las imágenes no utilizadas permanecen dentro de sus ZIP.

Copias de inspección: `../../tmp/pdfs/lote-162/originales/`. Copias revisadas: `../content/latex/sistemas-sels-i/`. `provenance.json` registra procedencia, huellas, respuestas, datos preservados y aclaraciones. El estilo de impresión continúa el de los lotes anteriores; no se modifica el diseño web.

## Correspondencia y revisión

Los tres ejercicios y sus resultados coinciden entre examen y soluciones originales. No hay documentos concatenados ni resultados matemáticos que sustituir. Se conservan los 10 puntos (2+4+2,5+1,5), los tiempos 9+23+23=55 minutos, permiso de calculadora y pista del primer ejercicio. Se amplían los pasos y comprobaciones en el solucionario.

| Ejercicio | Contraste independiente |
|---|---|
| 1, sistema triangular | (2,-1/2,2). Sustitución de las tres coordenadas y eliminación racional exacta. Determinante 4, solución única. |
| 2, tabletas | A=180, B=120, C=100. Se cumplen total 400, recaudación 36 400 y A+B=3C; cantidades enteras no negativas. Eliminación exacta independiente del desarrollo impreso. |
| 3(a), parámetro | det(A)=lambda-1. Para lambda distinto de 1, SCD. Para lambda=1, rangos 2 y 3 y fila contradictoria 0=-6; no existe caso SCI. Determinante por permutaciones y rangos por eliminación racional en 79 valores enteros y fraccionarios, incluidos ambos lados próximos a 1. Los ensayos refuerzan la comprobación; la discusión general se justifica algebraicamente en el PDF. |
| 3(b), lambda=0 | (22,-7,-13), contrastado con las tres ecuaciones y eliminación exacta. |

### Aclaración económica

El enunciado original dice «coste por unidad» y lo relaciona con recaudación. El examen conserva esa redacción; el solucionario declara la interpretación de esos importes como precios unitarios de venta. Sin esa interpretación faltarían precios de venta para plantear la recaudación. No se modifican cifras ni se introducen márgenes. Esta aclaración queda registrada, sin presentar como error un resultado que es correcto bajo el modelo utilizado.

## Verificación de archivos y páginas

- Examen de una página y soluciones de cuatro, todas A4.
- Cinco páginas renderizadas y revisadas visualmente: cabeceras, logo, numeración, matrices, sistemas y pasos; sin cortes ni solapamientos.
- Títulos, idioma es-ES, texto extraíble, fuentes incrustadas (8 y 12 respectivamente), ausencia de cifrado, referencias rotas y desbordamientos comprobados.
- Recompilación sin conexión con idénticas huellas SHA-256; informe `pdf/sistemas-sels-i-build.json`.
- Verificación de regresión de las dos parejas anteriores, incluidos originales y logo. El lector de procedencia admite la clave histórica `file` del piloto y la clave `path` del lote actual.
- 77 archivos unitarios: 341 pruebas superadas y cero fallos. Registro `../../tmp/tanda-06-162-unit-tests.log`.
- Chrome: catálogo y entrega HTTP de los seis PDF, tipo application/pdf y firma PDF, desde raíz y subcarpeta. Registro `../../tmp/tanda-06-162-browser.log`.

El módulo `../scripts/pdf_math_systems.py` contiene el contraste racional independiente y `../scripts/check-pdfs.py` lo ejecuta junto con las verificaciones de archivo. Tras modificar contenido hay que repetir la inspección visual completa.

## Reproducción

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-sistemas-sels-i.json --engine RUTA/tectonic.exe --python RUTA/python.exe --cached
```

Motor, caché y dependencias: [piloto de compilación](auditoria-pdf-recuperacion-t1.md). El proceso valida antes de copiar los dos PDF finales a `output/pdf/`.

## Estado y siguiente lote

Seis PDF revisados, tres parejas dependientes y 954 entidades en el catálogo. Tema principal t05; etiquetas de sistemas, matrices, parámetros y modelización. La biblioteca de búsqueda y filtros sigue pendiente de T07; la administración central de T04. Los PDF no están etiquetados semánticamente ni se acredita todavía lectura accesible con lector de pantalla (T13). Ocultar enlaces estáticos no protege los archivos.

Acumulado: 6 de 30 paquetes revisados, 24 pendientes.

- [x] Lote 03: F027/F028, SELs II; conciliar matrices y problema de logística.
- [x] Comprobar álgebra, parámetros y datos mediante métodos independientes.
- [x] Compilar, revisar cada página, registrar parejas y actualizar inventario.

Lote 03 completado en entrega 163: [auditoría SELs II](auditoria-pdf-sistemas-sels-ii.md). Estado vigente: ocho paquetes revisados, 22 pendientes.
