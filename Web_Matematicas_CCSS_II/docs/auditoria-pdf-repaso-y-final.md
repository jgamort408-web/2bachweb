# Auditoría PDF · Repaso de Análisis y examen final

22 de octubre de 2026 · Entrega 175 · T06, lote 15 cerrado.

## Fuentes y alcance

- F004 → `content/latex/repaso-analisis/`: dos exámenes completos de 10 puntos cada uno, conservados en un PDF de enunciados y otro de soluciones con separación explícita.
- F005 → `content/latex/examen-final/`: cuatro ejercicios activos de 10 puntos y un ejercicio comentado conservado como anexo no evaluable, tanto en enunciados como en soluciones.
- ZIP y main.tex registrados por SHA-256. F004 no contiene imágenes ni logo: no se le atribuye uno ajeno. F005 conserva su logo referenciado; las demás imágenes permanecen en el ZIP original.
- El solucionario de F004 revisa los desarrollos existentes y elabora las gráficas que faltaban. El de F005 es **nuevo, elaborado en esta edición**: el original no contiene soluciones.
- F004 no especifica duración ni permiso de calculadora. Se conserva esa ausencia; no se trasladan los 55 minutos de otros exámenes. F005 sí conserva calculadora, 55 minutos y tiempos orientativos 30+10+5+10; se normaliza la errata «55'utos».
- Puntuaciones F004: 3,2+2,4+2,4+2 y 2+3+2+3, por separado. En derivadas y límites solo hay cuatro opciones para la instrucción de elegir cuatro; no se inventan más ni se fija un reparto individual que el original no precisa.

## Correcciones, ampliaciones y carencias

| Identificador | Fuente | Tratamiento |
|---|---|---|
| M32 | F004, examen 2, temperatura | 16−(t−6)²>0 equivale a 2<t<10: ocho horas, no unas 5,8. Cambia la conclusión condicional del original sobre vacunas |
| M33 | F004, mismo ejercicio | Los umbrales solo aparecen en la solución, no en el enunciado. La respuesta se condiciona a esas reglas del ejercicio; su incorporación al enunciado sigue pendiente |
| M34 | F004, examen 1, límite 3(d) | Falta la tendencia. La copia adopta x→+∞, compatible con el resultado 1 de la solución, y declara la aclaración en el enunciado. No se atribuye unicidad de esa tendencia al original |
| M35 | F004, examen 2, función a trozos | No hay «salto suave»: continuidad con punto angular en 2. Derivada derecha 0 en el extremo 0; no se afirma positividad en todo [0,2] |
| M36 | F005, ejercicio comentado | Rótulo de 1 punto frente a apartados que suman 2,5. Se conserva como anexo no evaluable; no modifica los 10 puntos activos |
| M20 aplicada a F004 | Temperatura | Los instantes de corte/restitución no se deducen de forma única de la curva. La duración de 10 h solo vale bajo la interpretación adicional del original |

Los criterios de sueros/vacunas se presentan exclusivamente como reglas matemáticas del material, no como normas sanitarias reales. Con los criterios que añade la solución original, el máximo 16 no alcanza 20 y las ocho horas positivas sí superan seis. Sin esos criterios, el enunciado no permite decidir daños.

El cohete conserva D(0)=100, D(2)=20 y límite cero. El enunciado no indica unidad de distancia: la escala «miles de kilómetros» se identifica como interpretación de la solución original. No se confunde límite cero con llegada en tiempo finito.

Las gráficas del cúbico, la función continua no derivable y la temperatura se elaboran e identifican como ampliaciones, sin atribuirlas al original.

## Solucionario nuevo F005

- Parámetros a=−1,b=1; máximo (1/2,9/4), cambio de curvatura en (1,2) con segunda derivada inexistente allí y esbozo consistente con las ramas.
- Área cerrada desde el cero válido −1 hasta 2, partiendo la integral en 1: **10/3+4 ln(3/2)≈4,95519377**. El cero 2 del polinomio extendido queda fuera de esa rama.
- Primitivas 2/5·√(5x²−7) y 1/3·ln|x³−6x+5|, con dominios e intervalos de constantes explícitos.
- Tangente a 1/x en 1: y=−x+2; asíntotas x=0 e y=0.
- Modelo de rentabilidad: continuo en [1,6], máximo R(5)=9; positivo exactamente en (2,6]. Se mantienen unidades del enunciado y su carácter de ejercicio.
- Anexo: v(t)=t³/3−5t²/2+6t+10; ganancia 2000 euros en 3000 acciones de t=2 a t=4. Para una compra seguida de una venta, máximo de 54000 comprando en 0 y vendiendo en 6, bajo el modelo sin costes no dados.

## Verificación

- `../scripts/pdf_math_analysis_review.py`: fracciones exactas, identidades, quince evaluaciones por diferenciación automática, límites por racionalización y cotas logarítmicas, signos, temperaturas y puntuaciones.
- Para F005: área contrastada con cuadratura de Simpson independiente; derivadas de primitivas verificadas por diferenciación automática y numérica; dominio y signos de rentabilidad, valores y extremos del anexo contrastados.
- Cuatro PDF y **21 páginas revisadas visualmente**: repaso 4+8 páginas; final 3+6. Fuentes incrustadas, A4, títulos, idioma, texto extraíble, ausencia de cifrado y desbordamientos comprobados.
- Se corrige el glifo defectuoso de un separador de encabezado y se añade su detección al lote. El solucionario final corrige una línea demasiado larga antes de publicar la pareja. Compilación sin conexión con los tipos de letra ya disponibles.
- Recompilación idéntica de los cuatro SHA-256: `../../tmp/pdfs/lote-175/hashes-before.json`. Informes: `pdf/repaso-analisis-build.json` y `pdf/examen-final-build.json`.
- 341 pruebas superadas, cero fallos: `../../tmp/tanda-06-175-unit-tests.log`.
- Chrome verifica catálogo, fórmulas y entrega HTTP de los 46 PDF desde raíz/subcarpeta: `../../tmp/tanda-06-175-browser.log`.
- Inferencia General conserva sus comprobaciones tras ampliar el proceso: `../../tmp/pdfs/lote-175/regression-inferencia-general.json`.
- Catálogo: **994 entidades** = 145 páginas + 398 preguntas + 405 tarjetas + 46 PDF. Repaso vinculado a t01 y final a t03, con etiquetas de los otros bloques y dependencias de cada solucionario.

## Estado y reproducción

29 de 30 paquetes revisados; queda F001. 46 PDF en 23 parejas de archivos; una de ellas contiene los dos exámenes de F004, no se cuenta ese paquete como dos fuentes.

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-repaso-analisis.json --python RUTA/python.exe --cached
node scripts/build-pdfs.mjs --config config/pdf-build-examen-final.json --python RUTA/python.exe --cached
python scripts/update-pdf-inventory.py
```

T06 continúa abierta hasta revisar F001 y M01. M33, M36, las unidades del cohete y la precisión del mecanismo de corte conservan las carencias indicadas; revisar antes de uso evaluativo. T04 requiere servicio real; T07, biblioteca con filtros. Accesibilidad semántica de PDF pendiente T13. Diseño web y MathJax sin cambios; cuentas e historial del alumnado inactivos.

- [x] F004/F005: revisión matemática, soluciones, compilación y páginas inspeccionadas.
- [x] Cerrar registro del lote tras la batería unitaria completa.
- [x] Lote 16: F001 y auditoría conjunta completados; T06 cerrada en entrega 176.
