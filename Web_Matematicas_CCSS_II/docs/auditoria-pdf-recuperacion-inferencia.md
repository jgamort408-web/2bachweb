# Auditoría PDF · Recuperación de Inferencia y repaso

21 de octubre de 2026 · Entrega 172 · T06, lote 12 cerrado.

## Fuente y conservación

F009: `Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Resuelto Recuperación.zip`. Copia revisada: `content/latex/recuperacion-inferencia/`. ZIP, main.tex y logo registrados por SHA-256 en provenance.json. Las seis imágenes geométricas sin uso se conservan dentro del ZIP original.

Se preservan los nueve ejercicios, sus 23 apartados, todos los datos, 55 minutos, calculadora y puntuaciones. Los 0,5 puntos de expresión están incluidos en cada ejercicio. El material combina Inferencia, Probabilidad, Programación Lineal, Análisis y Matrices: no se descartan bloques por el título del lote.

Las soluciones proceden del original y se revisan; el apartado 6(b), que estaba sin resolver, se identifica como completado en esta edición.

## Correcciones y carencias

| Identificador | Hallazgo | Tratamiento en copia revisada |
|---|---|---|
| M04 | Pacientes: suma 137 y media 8,5625 incorrectas | Suma 144, media 9; IC al 97,5 % ≈ (7,87929864;10,12070136) min; con tabla (7,88;10,12) |
| M05 | Frambuesas: suma 109 y media 10,9 incorrectas | Suma 110, media 11; IC al 97 % ≈ (8,94127150;13,05872850) euros |
| M23 | Nueve ejercicios de 2,5 suman 22,5; no hay selección ni conversión de nota | Carencia abierta. Se conserva todo y se advierte al docente en examen y soluciones; no se inventa elección ni nota sobre 10 |
| M24 | Extremos de 4x³−3x+4 con ordenadas 4 y 2 | Máximo (−1/2,5), mínimo (1/2,3); signo del cubo corregido |
| M25 | Recinto y mínimo de 6(b) sin solución | Gráfico, vértices (1,3), (3,2), (4,4), (2,7); valores 5,8,12,11; mínimo único 5 en (1,3) |
| M26 | Decimales erróneos o redondeo prematuro de llaves | Ambas 118/267≈0,4419; alguna 238/267≈0,8914; exactamente una 40/89≈0,4494 |

También se corrige la notación intermedia de la regla del cociente, sin atribuir error a la fórmula final correcta del original. Se completa el dominio de la función logarítmica y se verifica la naturaleza del extremo al resolver los parámetros.

## Inferencia y modelos

- Convención explícita N(μ,σ), con desviación típica como segundo parámetro. La varianza se declara por separado; la media de diez precios tiene desviación 3/√10 y varianza 9/10.
- Se distingue el cuantil sin redondear del de tabla; los intervalos se centran en los datos correctos. Se explica la cobertura frecuentista sin asignar probabilidades posteriores a la media fija.
- Para pacientes, E≤0,3 al 90 %: n mínimo 121, con 120 incumple. Para precios, E<1,5 al 97 %: n mínimo 19, con 18 incumple. La desigualdad estricta se conserva.
- En estrellas de mar se respetan extremos redondeados: media 7,02 cm, margen 0,98 cm; con n=49 el margen de tabla es 0,84 cm. Aumentar confianza aumenta el margen a n y σ fijos.
- El procedimiento de muestreo de pacientes no se especifica en el original. La solución explicita independencia y muestreo aleatorio como hipótesis del método; no inventa un procedimiento efectivamente realizado. Queda como precisión editorial pendiente del enunciado.
- Llaves: muestreo sin reemplazamiento, no ensayos independientes. Refrescos: selección uniforme entre latas; año histórico 2021 conservado y su complemento interpretado con precisión.
- El modelo de cadenas de montaje se formula sin resolver, como se pide; no se añaden horas enteras ni límites diarios.

## Verificación matemática independiente

`../scripts/pdf_math_recovery.py`:

- Sumas exactas con fracciones, cuantiles por bisección y cuadratura gaussiana independiente de NormalDist; extremos y minimalidad de n contrastados.
- Enumeración de las 4005 parejas de llaves y de las 30000 latas; contraste con combinatoria y probabilidades condicionadas.
- Recorte exacto de un polígono por semiplanos, distinto del cálculo manual de intersecciones; cuatro vértices y 44 puntos de arista verificados.
- Parámetros, signos, extremos, primitiva y condición F(2)=10 comprobados. Derivadas contrastadas por diferenciación automática en diez puntos; área 32/3 por Simpson independiente.
- Matrices verificadas con AX=B, BY=A, XY=YX=I e inversas por reducción. No se conmutan productos arbitrariamente.
- Puntuaciones de todos los apartados y ausencia de regla de selección verificadas.

## PDF, catálogo y pruebas

- Dos PDF: cinco páginas de examen y diez de soluciones; **quince páginas revisadas visualmente**. Gráfico, tablas, encabezados, texto y fórmulas sin recortes ni solapamientos.
- Compilación sin conexión con Tectonic 0.17.0 y recompilación idéntica en ambos SHA-256: `../../tmp/pdfs/lote-172/hashes-before.json`.
- A4, títulos, idioma es-ES, texto extraíble, fuentes incrustadas y ausencia de cifrado/desbordamientos/glifos incorrectos comprobados. Las notas editoriales y correcciones se exigen también en la extracción de texto.
- Informe de construcción: `pdf/recuperacion-inferencia-build.json`. Configuración: `../config/pdf-build-recuperacion-inferencia.json`.
- 77 archivos, **341 pruebas superadas**, cero fallos: `../../tmp/tanda-06-172-unit-tests.log`.
- Chrome verifica catálogo, fórmulas y entrega HTTP de los 34 PDF desde raíz y subcarpeta: `../../tmp/tanda-06-172-browser.log`.
- Probabilidad I mantiene sus verificaciones al ampliar el proceso: `../../tmp/pdfs/lote-172/regression-probabilidad.json`.
- Pareja vinculada a t09 por su bloque de Inferencia y etiquetada además para Probabilidad, Programación Lineal, Análisis y Matrices. Solución dependiente de su examen. Catálogo: **982 entidades** (145 páginas, 398 preguntas, 405 tarjetas y 34 PDF).
- El inventario obtiene su fecha de la revisión más reciente, en lugar de una fecha fija; reconstrucción y huellas verificadas.

## Estado y siguiente lote

23 de 30 paquetes revisados; siete pendientes. 34 PDF en 17 parejas. Registro individual: `pdf/registro-paquetes.json`.

T06 sigue abierta. T04 necesita servicio central; T07, biblioteca con filtros. La puntuación M23 y la precisión del muestreo requieren revisión docente antes de usar F009 como examen formal. Los PDF no tienen etiquetado semántico completo y la validación con lector de pantalla queda pendiente de T13. Diseño web y MathJax sin cambios; no se activan cuentas ni historial del alumnado.

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-recuperacion-inferencia.json --python RUTA/python.exe --cached
python scripts/update-pdf-inventory.py
```

- [x] Revisar F009 y M04/M05, conservar todos los bloques y completar 6(b).
- [x] Compilar, inspeccionar quince páginas y actualizar catálogo, inventario y diario.
- [x] Lote 13: F011/F012, cerrado en entrega 173; M27/M28 aplicadas a las copias.
- [ ] Lote 14: F010/F013; conciliar recopilaciones con el lote anterior sin perder variantes.
- [ ] Lote 15: F004/F005.
- [ ] Lote 16: F001 y su incidencia M01; cerrar T06 únicamente al conciliar los 30 paquetes.
