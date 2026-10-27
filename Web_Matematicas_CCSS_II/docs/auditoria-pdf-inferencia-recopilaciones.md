# Auditoría PDF · Inferencia, recopilación y examen general

22 de octubre de 2026 · Entrega 174 · T06, lote 14 cerrado.

## Fuentes y correspondencias

- F010 → `content/latex/inferencia-recopilacion/`; F013 → `content/latex/inferencia-general/`.
- Cada provenance.json identifica ZIP, main.tex y logo mediante SHA-256; los originales no se modifican. Imágenes geométricas no utilizadas conservadas en los ZIP.
- Ocho coincidencias de enunciado contrastadas contra los originales F011/F012, ignorando únicamente espacios, puntuación de apartados y rótulos de tiempo. No se confunden las soluciones originales erróneas con las copias revisadas.

| Fuente y ejercicio | Correspondencia | Puntos propios conservados |
|---|---|---|
| F010 1, accidentes | F011 1 | 4: 2,5+1,5 |
| F010 2, red social | F012 1 | 4: 2,5+1,5 |
| F010 3, ciruelas | F011 2 | 4: 2,5+1,5 |
| F010 4, electrodomésticos | F012 2 | 4: 2,5+1,5 |
| F010 5, universidad | F011/F012 3 | 2: 1+1 |
| F013 1,2,3 | Accidentes, red social, ciruelas anteriores | Cada uno 2,5: 1,5+1 |
| F013 4, gasto | Ejercicio propio | 2,5: 1,5+1 |

Se conservan 55 minutos, calculadora y los 0,5 puntos de expresión incluidos en cada ejercicio. F010 no contiene los tiempos orientativos de F011/F012: no se trasladan a esta versión. F013 no añade optatividad y suma 10 puntos.

## Correcciones y carencias

- **M27 extendida a F010:** suma de los nueve precios 1620, media 180 e IC95 %≈(114,66786718;245,33213282) euros. Se corrigen la suma 1630, media 181,11 e intervalo desplazado del original. Datos intactos. F013 no contiene este ejercicio.
- **M28 extendida a F010:** precisión muestral matizada; diseño probabilístico permite fundamentar inferencia y error del diseño, sin garantizar mayor precisión universal. Afijación 96/44/60/40, total 240. F013 no contiene el ejercicio de universidad.
- **M29, F013:** 2,17·6/7=1,86, no 1,8609. El margen con cuantil sin redondear es 1,86007747 euros; el resultado final original 1,86 se mantiene a dos decimales.
- **M30, F013:** media impresa 25,45 y margen impreso 0,98. Con tabla 1,96 y extremos tratados como exactos resulta n=144. Si los extremos están redondeados a céntimos, n=143,144,145 son compatibles. La copia explica la ambigüedad; la precisión del enunciado sigue pendiente si se quiere respuesta única. No se sustituye la media de la segunda muestra por la primera.
- **M31, F010:** cinco ejercicios suman 18 puntos nominales sin regla de selección o conversión de nota. Carencia abierta y señalada en ambos PDF. No se descartan ejercicios ni se inventa nota sobre 10.

Las soluciones compartidas conservan la revisión del lote 13: cuantiles independientes, interpretación de cobertura, normalidad exacta de medias bajo población normal, aproximación Wald para proporciones, independencia, puntos porcentuales y cotas estrictas/no estrictas. Los tamaños planificados de proporción no se presentan como garantías uniformes para todo parámetro desconocido.

## Verificación

- `../scripts/pdf_math_inference_collections.py` vuelve a leer los ZIP y contrasta las ocho correspondencias. Ejecuta las verificaciones independientes de Inferencia I/II para los problemas comunes, sin atribuirles puntuación ni procedencia incorrectas.
- Para gasto, aritmética racional verifica el n=144 de tabla y E=1,86. Cuantiles por cuadratura/bisección y enumeración de tamaños 1–10000 identifican 143,144,145; se contrasta además la condición sobre semiamplitud 0,975<E<0,985. Para tamaños mayores la semiamplitud es menor que ese rango.
- Cuatro PDF: recopilación con tres páginas de examen y cinco de soluciones; general con dos de examen y cuatro de soluciones. **Catorce páginas revisadas visualmente**, sin recortes, solapamientos ni fórmulas rotas.
- Recompilación sin conexión con Tectonic 0.17.0 idéntica en los cuatro SHA-256: `../../tmp/pdfs/lote-174/hashes-before.json`.
- A4, títulos, idioma, fuentes incrustadas, texto extraíble, ausencia de cifrado y desbordamientos comprobados; notas y correcciones requeridas también en texto extraído.
- Informes: `pdf/inferencia-recopilacion-build.json` y `pdf/inferencia-general-build.json`.
- **341 pruebas superadas**, cero fallos: `../../tmp/tanda-06-174-unit-tests.log`.
- Chrome verifica catálogo, fórmulas y los 42 PDF desde raíz/subcarpeta: `../../tmp/tanda-06-174-browser.log`.
- Inferencia II mantiene sus comprobaciones: `../../tmp/pdfs/lote-174/regression-inferencia-ii.json`.
- Catálogo de **990 entidades**: 145 páginas, 398 preguntas, 405 tarjetas y 42 PDF. Parejas vinculadas a t09; cada solución depende de su examen. Etiquetas específicas señalan puntuación por aclarar y precisión de extremos.

## Estado y reproducción

27 de 30 paquetes revisados, tres pendientes; 42 PDF en 21 parejas. Registro: `pdf/registro-paquetes.json`.

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-inferencia-recopilacion.json --python RUTA/python.exe --cached
node scripts/build-pdfs.mjs --config config/pdf-build-inferencia-general.json --python RUTA/python.exe --cached
python scripts/update-pdf-inventory.py
```

T06 sigue abierta; M23/M31 conservan sus carencias de evaluación y M30 necesita convención de redondeo para respuesta única. T04 requiere servicio real; T07, biblioteca con filtros. Accesibilidad semántica de PDF y lector de pantalla pendientes de T13. Diseño web y MathJax sin cambios; cuentas e historial del alumnado inactivos.

- [x] Conciliar F010/F013, revisar cálculos, compilar y comprobar catorce páginas.
- [x] Registrar procedencia, catálogo, inventario y diario.
- [x] Lote 15: F004/F005, cerrado en entrega 175.
- [ ] Lote 16: F001 y M01; cerrar T06 solo con los 30 paquetes conciliados.
