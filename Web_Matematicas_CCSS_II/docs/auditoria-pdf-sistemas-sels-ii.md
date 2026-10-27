# T06 · Lote 03 · Sistemas de ecuaciones II

20 de octubre de 2026 · Entrega 163 · Lote cerrado; T06 continúa abierta.

## Procedencia y conciliación

F027: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - SELs II (SOLUCIONES).zip`.

F028: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - SELs II.zip`.

Cada ZIP contiene un único `main.tex`, el logo y seis imágenes geométricas no utilizadas. Se conservan íntegros los originales. Las copias de inspección están en `../../tmp/pdfs/lote-163/originales/` y las revisadas en `../content/latex/sistemas-sels-ii/`. El logo procede de F028, sin modificación; su huella se comprueba contra la entrada ZIP. Las imágenes ajenas a estos ejercicios permanecen en el original.

Examen y soluciones coinciden en los tres ejercicios, matrices, cifras y resultados. Se conservan 10 puntos (2+4+2,5+1,5), tiempos 9+23+23=55 minutos, permiso de calculadora y pista del primer ejercicio. No hay errores de resultado que sustituir. Se revisa la redacción y se amplían comprobaciones y justificaciones. `provenance.json` registra fuentes, huellas, datos preservados y respuestas.

## Revisión matemática

| Apartado | Comprobación |
|---|---|
| 1 | Sistema triangular: (13/6,2/3,1). Sustitución en las tres ecuaciones y eliminación racional exacta independiente. Determinante 6, solución única. |
| 2 | S=20, M=70, L=60. Se verifican 150 envíos, ingresos 2 450 y S=2(M-L), con cantidades enteras no negativas. La diferencia conserva el orden medianos menos grandes del original. |
| 3(a) | det(A)=5-lambda. SCD para lambda distinto de 5. Para lambda=5, rangos 2 y 3 y contradicción explícita 0=-2; no hay caso SCI. |
| 3(b) | Para lambda=0, (21/5,-4/5,-2/5), sustituido y contrastado por eliminación exacta. |

El contraste de determinante por permutaciones y rangos por eliminación racional incluye 79 valores enteros y fraccionarios del parámetro, el caso singular y valores próximos a 5 por ambos lados. La clasificación general se demuestra algebraicamente en el documento; las muestras no sustituyen esa demostración. La función `check_sels_ii` de `../scripts/pdf_math_systems.py` contiene el contraste independiente.

## Revisión técnica y visual

- Examen: una página A4. Soluciones: cuatro páginas A4.
- Inspección visual de las cinco páginas renderizadas: logo, cabeceras, numeración, matrices, fracciones y pasos, sin recortes ni solapamientos.
- Títulos, idioma es-ES, texto extraíble, ausencia de cifrado y errores de glifos, referencias o desbordamiento comprobados.
- Fuentes incrustadas: 9 en el examen y 12 en las soluciones.
- Recompilación sin conexión: las dos huellas SHA-256 son idénticas. Informe `pdf/sistemas-sels-ii-build.json`.
- La pareja SELs I supera de nuevo su comprobación matemática, de originales, logo y archivos PDF tras ampliar el verificador.
- 77 archivos unitarios: 341 pruebas superadas, cero fallos; `../../tmp/tanda-06-163-unit-tests.log`.
- Chrome comprueba catálogo, fórmulas y entrega HTTP de los ocho PDF, tipo application/pdf y firma PDF, desde raíz y subcarpeta; `../../tmp/tanda-06-163-browser.log`.

## Recompilar y mantener el registro

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-sistemas-sels-ii.json --engine RUTA/tectonic.exe --python RUTA/python.exe --cached
python scripts/update-pdf-inventory.py
```

Motor, caché y dependencias: [piloto](auditoria-pdf-recuperacion-t1.md). Después de cualquier cambio de contenido hay que repetir la revisión visual completa.

El nuevo registro `pdf/registro-paquetes.json` enumera los 30 ZIP con ID, ruta, huella y estado. Para los revisados vincula procedencia, informe y recursos; contrasta los archivos contra sus huellas y exige registros editoriales revisados. La revisión visual se acredita en las auditorías, no se deduce de que un archivo exista. Los paquetes restantes conservan estado pendiente.

## Estado y siguiente lote

Ocho PDF revisados, cuatro parejas y 956 entidades en el catálogo. Tema principal t05; etiquetas de sistemas, matrices, parámetros y logística. Acumulado: 8 de 30 paquetes revisados; 22 pendientes. T06 continúa abierta.

La biblioteca con búsqueda y filtros sigue pendiente de T07 y la administración central de T04. Los PDF no están etiquetados semánticamente; su accesibilidad con lector de pantalla sigue pendiente de T13. La ocultación estática no protege los archivos.

- [x] Lote 04: F019/F021, Programación Lineal 1; conciliar enunciados, soluciones, regiones factibles y variantes.
- [x] Verificar planteamientos, vértices y óptimos mediante métodos independientes.
- [x] Compilar y revisar todas las páginas antes de registrar la pareja.

Lote 04 completado en entrega 164: [auditoría PL I](auditoria-pdf-programacion-lineal-i.md). Recuento vigente: diez paquetes revisados, veinte pendientes.
