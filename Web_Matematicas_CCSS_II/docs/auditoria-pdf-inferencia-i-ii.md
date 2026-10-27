# Auditoría PDF · Inferencia I y II

22 de octubre de 2026 · Entrega 173 · T06, lote 13 cerrado.

## Fuentes y conservación

- F011 → `content/latex/inferencia-i/`; F012 → `content/latex/inferencia-ii/`.
- Cada provenance.json registra ZIP, main.tex y logo mediante SHA-256. Los originales no se modifican; las imágenes geométricas no utilizadas permanecen en sus ZIP.
- Las soluciones originales se revisan y amplían. Los exámenes son distintos y se conservan por separado. El ejercicio de universidad es idéntico y permanece en cada pareja para que sea autónoma.
- Preservados: tres ejercicios, seis apartados, 4+4+2=10 puntos; 55 minutos, calculadora y tiempos orientativos originales 20+20+10. Los cinco minutos restantes no se reasignan como una regla nueva. Los 0,5 puntos de expresión están incluidos.
- F010/F013 aún no se dan por revisados por compartir ejercicios: se conciliarán en el lote siguiente.

## Resultados y correcciones

| Parte | Inferencia I · F011 | Inferencia II · F012 |
|---|---|---|
| Proporción observada | 90/250=0,36 | 410/500=0,82 |
| Intervalo de proporción sin redondeo previo | (0,29412069;0,42587931), confianza 97 % | (0,78632510;0,85367490), confianza 95 % |
| Tamaño planificado de proporción | 612, confianza 99 %, margen ≤0,05 | 435, confianza 97 %, margen <0,04 |
| Media e intervalo al 95 % | 60 g; (58,82402161;61,17597839) g | 180 euros; (114,66786718;245,33213282) euros |
| Tamaño para media al 99 % | 60, margen <1 g | 27, margen ≤50 euros |
| Afijación | 240: 96,44,60,40 | 240: 96,44,60,40 |

**M27, F012:** los nueve precios suman 1620 y la media es 180. El original escribe suma 1630, división errónea 1630/9=180 y extremos finales incoherentes. La copia conserva los datos y recalcula. Con cuantil de tabla 1,96, el intervalo es (114,66666667;245,33333333), o (114,67;245,33) euros a dos decimales. Se distinguen estas cifras de las calculadas con el cuantil no redondeado.

**M28, F011/F012:** se matiza la afirmación absoluta de que el muestreo probabilístico siempre es más preciso. Permite fundamentar la inferencia y estimar el error con métodos del diseño; no garantiza ausencia de sesgo ni mayor precisión en cualquier estudio. Importan marco, no respuesta, medición, tamaño y variabilidad. Se diferencia la afijación de la selección aleatoria dentro de cada estrato.

Se recalculan productos y cuadrados intermedios sin redondeo prematuro. Los cuatro tamaños finales originales se mantienen; se comprueba que el entero anterior incumple la cota. Se conservan las desigualdades estrictas: para n>q se usa floor(q)+1, mientras que para n≥q se usa ceil(q).

## Hipótesis y alcance didáctico

- Se mantiene el intervalo normal aproximado de proporciones del original, identificado como Wald. Los recuentos éxito/fracaso son 90/160 y 410/90. No se presenta como un método exacto universal.
- Los tamaños de proporción usan la estimación anterior, como pide el enunciado. Son tamaños planificados bajo esa estimación, sin garantía uniforme para toda proporción desconocida. Se explica la diferencia entre puntos porcentuales y error relativo.
- Se explicita independencia aproximada y se señala que falta el tamaño poblacional para evaluar una eventual corrección por población finita; no se inventa ese dato.
- Para las medias se usa la normalidad poblacional y desviación conocida: normalidad exacta de la media bajo el modelo, incluso con n=9. Convención N(μ,σ) consistente, con desviación típica como segundo parámetro.
- La confianza se interpreta como cobertura del procedimiento en muestreo repetido, sin atribuir una probabilidad posterior al parámetro fijo.
- La afijación suma 12000 personas y fracción 1/50. No hay redondeos ni datos ausentes que inventar. Se propone un sorteo dentro de cada listado como ejemplo, sin atribuirlo a un estudio realmente efectuado.

## Verificación

- `../scripts/pdf_math_inference.py` contrasta cuantiles mediante cuadratura gaussiana y bisección independiente de NormalDist, varianza de Bernoulli, intervalos, cotas y minimalidad de tamaños. Verifica suma 1620, media 180 y afijación por recuento de un patrón finito independiente de la fórmula impresa.
- Cuatro PDF: dos exámenes de dos páginas y dos soluciones de tres; **diez páginas inspeccionadas visualmente**. Encabezados, tablas, fórmulas y paginación sin recortes ni solapamientos.
- Compilación con Tectonic 0.17.0 sin conexión y recompilación idéntica en los cuatro SHA-256: `../../tmp/pdfs/lote-173/hashes-before.json`.
- A4, idioma es-ES, títulos, texto extraíble, fuentes incrustadas y ausencia de cifrado, desbordamientos y glifos incorrectos comprobados. M27/M28 se verifican también mediante texto requerido.
- Informes: `pdf/inferencia-i-build.json` y `pdf/inferencia-ii-build.json`.
- 77 archivos, **341 pruebas superadas**, cero fallos: `../../tmp/tanda-06-173-unit-tests.log`.
- Chrome comprueba catálogo, fórmulas y los 38 PDF desde raíz/subcarpeta: `../../tmp/tanda-06-173-browser.log`.
- F009 mantiene sus comprobaciones al ampliar el proceso: `../../tmp/pdfs/lote-173/regression-recuperacion.json`.
- Catálogo: **986 entidades** = 145 páginas + 398 preguntas + 405 tarjetas + 38 PDF. Nuevos recursos en t09, etiquetados y con dependencias examen/solución.

## Estado y reproducción

25 de 30 paquetes revisados, cinco pendientes; 38 PDF en 19 parejas. Registro: `pdf/registro-paquetes.json`.

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-inferencia-i.json --python RUTA/python.exe --cached
node scripts/build-pdfs.mjs --config config/pdf-build-inferencia-ii.json --python RUTA/python.exe --cached
python scripts/update-pdf-inventory.py
```

T06 sigue abierta; T04 necesita servicio central y T07 la biblioteca. M23 de F009 conserva su carencia de evaluación. El etiquetado semántico y lector de pantalla de PDF quedan pendientes T13. Diseño web y MathJax sin cambios; cuentas e historial del alumnado inactivos.

- [x] F011/F012 revisados, compilados y registrados; M27/M28 aplicadas a estas copias.
- [x] Lote 14: F010/F013, cerrado en entrega 174 con puntuación propia y carencias explícitas.
- [ ] Lotes 15/16: F004/F005 y F001, incluida M01. No cerrar T06 hasta conciliar los 30 paquetes.
