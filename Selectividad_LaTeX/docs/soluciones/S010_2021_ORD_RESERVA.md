# S010 · EXA-0009 · Curso 2020–2021

Estado: en curso. Autor: Codex; las pasadas separadas no constituyen una revisión por una segunda persona.

## Trabajo secuencial

- [x] Cotejar las dos páginas de examen, los criterios y la tabla normal asociados.
- [x] Redactar los ocho ejercicios por su ID, conservando íntegros enunciados y categorías.
- [x] Comprobar resultados mediante fracciones, sustituciones, enumeración de muestras y cálculo separado del cuantil.
- [x] Revisar los apartados y la distribución de puntos de los criterios oficiales.
- [x] Validar los ocho fragmentos tras revisar el borrador completo.
- [ ] Revisar ambos PDF finales, ejecutar las pruebas y comprobar el ZIP extraído.

## Fuentes y alcance

Examen `SRC-83FBE1FE77CE`, criterios `SRC-7A85CF151DD7`, tabla `SRC-556C571128A9`. Lectura y huellas: `tmp/pdfs/selectividad-s010/control-antes.json`. El curso está impreso; ordinaria/reserva y Modelo-3 proceden del nombre de archivo, sin convertirlo en un modelo confirmado. Se mantienen las limitaciones de identificación del catálogo.

| ID (prefijo SEL-D0009-) | Desarrollo y comprobación |
|---|---|
| BA-E01 | Modelo de surtidos sin resolver el apartado a; región distinta en b, cuatro vértices factibles y mínimo único 2 en (0,2). Figura vectorial. |
| BA-E02 | Dimensiones, determinante 300 y solución columna (1,3,1), comprobada por producto. |
| BB-E03 | Continuidad con a=-2 y b=16; no derivable en -2; monotonía, extremos interiores y unilaterales diferenciados; área 64/3. |
| BB-E04 | Producto, cadena y cociente, dominio real del logaritmo; primitiva con constante -5. Derivadas contrastadas numéricamente. |
| BC-E05 | Cuatro regiones disjuntas, unión, condicionada, complemento e independencia sin redondear. |
| BC-E06 | Probabilidad total, Bayes y una intersección; cuatro hojas verificadas. |
| BD-E07 | Afijación proporcional: 1230 personas. Enumeración exhaustiva de muestras bajo las dos convenciones de reemplazamiento. |
| BD-E08 | IC normal aproximado para proporción; amplitud completa, cota 70.068208889 y mínimo 71; verificación de 70 y 71. |

## Hipótesis que no se deben ocultar

E7b no especifica reemplazamiento y los criterios no proporcionan un resultado numérico que lo aclare. Sin reemplazamiento, las tres muestras no ordenadas dan media 3 y varianza 2/3; con reemplazamiento, los nueve pares ordenados dan media 3 y varianza 4/3. La solución explicita ambas y no atribuye una desviación única al enunciado. Se registra en las observaciones individuales sin cambiar los originales ni cerrar automáticamente ninguna de las 28 incidencias del CSV.

E1a pide expresamente formular sin resolver. E8b limita la amplitud, no el error: se exige un ancho como máximo 0.2, conservando la estimación piloto 0.24.

## Diario

`S010 · feat` — Ocho borradores didácticos por ID y selección modular del examen completo, sin alterar la selección predeterminada.

`S010 · check` — Comprobaciones reproducibles en [s010.py](../../scripts/verificaciones/s010.py), con [resultados](S010_verificacion_matematica.json). El cuantil se contrasta por bisección de erfc, separado de NormalDist. La comprobación numérica de derivadas complementa la revisión algebraica, sin sustituirla.

`S010 · test/build` — 22 pruebas superadas. Ocho soluciones nuevas validadas;72 acumuladas y568 pendientes. Los640 enunciados,632 soluciones restantes y184 PDF anteriores permanecen idénticos. PDF finales revisados, sin desbordamientos.
