# Auditoría PDF · Probabilidad I y II

21 de octubre de 2026 · Entrega 171 · T06, lote 11 cerrado.

## Fuentes y alcance

- F018: `content/latex/probabilidad-i/`; F017: `content/latex/probabilidad-ii/`. Son variantes distintas; ninguna sustituye a la otra.
- Cada provenance.json identifica ZIP, main.tex y logo por SHA-256. Los ZIP originales permanecen intactos. Las seis imágenes geométricas ajenas al examen se conservan dentro de cada original, sin inventar su uso.
- Soluciones revisadas desde los entornos solution del original; separadas de los exámenes y ampliadas con tablas exactas de contingencia.
- Se conservan datos, 55 minutos, calculadora y optatividad: un obligatorio de 3 puntos y dos de tres opcionales de 3,5; total 10. Los 0,5 puntos de expresión de cada ejercicio están incluidos, sin sumarlos otra vez.
- Puntuaciones de apartados: obligatorio 1+1+0,5+0,5; diarios 1,75+1,75; alumnado y secaderos 2+1,5. No se detectan ejercicios adicionales comentados que incorporar en anexo.

## Matemáticas y decisiones editoriales

| Apartado | Probabilidad I · F018 | Probabilidad II · F017 |
|---|---|---|
| Intersección A y B; A complementario y B; A dado B | 3/20; 9/20; 1/4 | 3/20; 7/20; 3/10 |
| Independencia | Sí: producto 3/20 | No: producto 1/5 ≠ 3/20 |
| Ningún diario; A dado no B | 63/100; 8/29 | 11/20; 27/82 |
| Aprobar; mujer dado aprobar | 67/100; 49/67 | 71/100; 45/71 |
| No Reserva; secadero A dado Reserva | 17/30; 5/13 | 23/50; 1/3 |

- M21: F018 redondea 343/469 a 0,7314. Es 49/67≈0,731343…; corregido a **0,7313** con cuatro decimales. La copia explica el cambio.
- M22: la selección de jamón en F018 puede resultar ambigua. Las soluciones explicitan la selección uniforme entre todos los jamones, coherente con el modelo original. Elegir primero el secadero con probabilidad 1/2 sería otro modelo. No se inventan capacidades ni se altera silenciosamente el enunciado; su redacción original permanece en el examen y su mejora sigue señalada.
- Se preservan valores exactos y se redondea al final. Se aclaran sucesos condicionantes y denominadores positivos.
- `../scripts/pdf_math_probability.py` verifica los diez apartados por variante mediante enumeración equiprobable de átomos, listado de los 700/800 estudiantes y probabilidades conjuntas de las ramas. Contrasta probabilidad total con recuento directo y Bayes con condicionamiento por tabla.

## Verificación

- Dos exámenes de dos páginas y dos solucionarios de cuatro: **doce páginas inspeccionadas visualmente** después de ampliar el espaciado de las fracciones. Sin recortes, solapamientos ni glifos incorrectos; encabezados y paginación completos.
- Compilación sin conexión con Tectonic 0.17.0; recompilación idéntica en los cuatro archivos, contrastada con SHA-256 en `../../tmp/pdfs/lote-171/hashes-before.json`.
- A4, títulos, idioma es-ES, fuentes incrustadas, texto extraíble y ausencia de cifrado/desbordamientos comprobados. Informes: `pdf/probabilidad-i-build.json` y `pdf/probabilidad-ii-build.json`.
- 77 archivos, **341 pruebas superadas**, cero fallos: `../../tmp/tanda-06-171-unit-tests.log`.
- Chrome verifica catálogo, fórmulas y entrega HTTP de los 32 PDF desde raíz y subcarpeta: `../../tmp/tanda-06-171-browser.log`.
- La validación de Distribuciones I vuelve a pasar al ampliar el proceso: `../../tmp/pdfs/lote-171/regression-distribuciones.json`.
- Manifiesto: cuatro recursos con tema t07, etiquetas y dependencia de cada solución respecto a su examen. Catálogo total: **980 entidades** (145 páginas, 398 preguntas, 405 tarjetas, 32 PDF).

## Estado y reproducción

22 de los 30 paquetes revisados; 8 pendientes. 32 PDF en 16 parejas. Inventario individual: `pdf/registro-paquetes.json`.

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-probabilidad-i.json --python RUTA/python.exe --cached
node scripts/build-pdfs.mjs --config config/pdf-build-probabilidad-ii.json --python RUTA/python.exe --cached
python scripts/update-pdf-inventory.py
```

El motor portátil está descrito en la auditoría del piloto. Tras modificar contenido, repetir la inspección visual de las páginas finales.

T06 sigue abierta. T04 necesita servicio central y T07 la biblioteca con filtros. PDF sin etiquetado semántico completo; revisión con lector de pantalla pendiente T13. Diseño web y MathJax sin cambios; no se activan cuentas ni historial de alumnado.

- [x] F017/F018 conciliados y soluciones contrastadas.
- [x] Compilar, inspeccionar doce páginas y registrar procedencia, catálogo e inventario.
- [x] Lote 12: F009, revisado en entrega 172; carencia de evaluación M23 expresamente abierta.
