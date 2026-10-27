# T06 · Lote 07 · Matrices III

20 de octubre de 2026 · Entrega 167 · Lote cerrado; T06 continúa abierta.

## Fuente y conservación

F016: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Matrices III.zip`.

El ZIP contiene un único examen, un logo y seis imágenes geométricas no utilizadas. No contiene soluciones. Se ha elaborado un solucionario nuevo, identificado expresamente en su primera página y en `provenance.json`. No se atribuyen esos desarrollos al autor del original.

ZIP y entrada `main.tex` conservados y comprobados por SHA-256. Copia de inspección: `../../tmp/pdfs/lote-167/originales/F016/`. Copias revisadas, estilo y procedencia: `../content/latex/matrices-iii/`. El logo procede del propio ZIP y se verifica contra su entrada; las imágenes no pertinentes permanecen en el original.

Se conservan 55 minutos, calculadora, ejercicios de 5+2,5+2,5=10 puntos y apartados 3+2 del primero. En el segundo se eligen cuatro de cinco operaciones; el solucionario presenta las cinco como consulta, sin aumentar la exigencia ni inventar puntos individuales. Se mantienen la pista de factor común y los exponentes 4 y 80.

## Comprobación matemática

### Ejercicio 1(a): ecuación

AX+BX=(A+B)X por distributividad, sin permutar factores. A+B=[[1,0],[2,1]], con determinante 1 e inversa [[1,0],[-2,1]]. Resultado X=[[2,1],[-1,0]], comprobado sustituyendo por separado AX y BX en el enunciado original. El residuo es exactamente nulo y la solución es única.

La inversa se contrasta mediante reducción racional y fórmula de adjunta; ambos órdenes de producto dan identidad.

### Ejercicio 1(b): potencias

A²=-I2, por lo que A⁴=I2 y A^80=(A⁴)^20=I2. Se comprueba mediante exponenciación binaria y multiplicación sucesiva independiente para 81 exponentes, de 0 a 80. El ciclo se repite cada cuatro potencias.

### Ejercicio 2: dimensiones y operaciones

- AC^t+BD^t no está definida: AC^t intenta multiplicar una 2x2 por una 1x2, aunque BD^t sí existe.
- (A+B)C es la columna (-10,5).
- B²+CD=[[10,-6],[0,7]].
- |-2A|=(-2)²|A|=-8.
- C^tC es la matriz 1x1 [5], cuyo determinante vale 5. No se confunde con C rectangular ni con la operación no definida anterior.

Todos los productos, sumas, determinantes y rechazos dimensionales se comprueban con fracciones exactas.

### Ejercicio 3: filas invariantes

La multiplicación MA intercambia las filas de A. La igualdad exige a=2 y b=1. Se comprueba el producto original y se contrasta con reducción del sistema de igualdades entrada a entrada. La matriz resultante es singular, lo que no impide cumplir MA=A; no se presupone invertibilidad de A.

## Revisión técnica y visual

- Examen de una página y solucionario de tres. Se inspeccionaron las cuatro páginas renderizadas: matrices, signos, exponentes, determinantes, texto de autoría y evaluación, cabeceras y pies, sin recortes ni solapamientos.
- Recompilación sin conexión con huellas SHA-256 idénticas para ambos PDF. Informe `pdf/matrices-iii-build.json`.
- Títulos, idioma es-ES, numeración, texto extraíble y ausencia de cifrado, referencias rotas, glifos incorrectos y desbordamientos comprobados. Fuentes incrustadas: 11 en el examen y 14 en las soluciones.
- El módulo `../scripts/pdf_math_matrices.py` incorpora la comprobación independiente de F016. Las parejas Matrices I y II superan nuevamente sus validaciones tras ampliarlo.
- 77 archivos unitarios, 341 pruebas superadas: `../../tmp/tanda-06-167-unit-tests.log`.
- Chrome verifica catálogo, fórmulas y entrega HTTP de los dieciocho PDF desde raíz y subcarpeta: `../../tmp/tanda-06-167-browser.log`.

## Reproducción

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-matrices-iii.json --engine RUTA/tectonic.exe --python RUTA/python.exe --cached
python scripts/update-pdf-inventory.py
```

Motor y dependencias: [piloto](auditoria-pdf-recuperacion-t1.md). Repetir la revisión visual completa tras cambiar contenido. Registro de fuentes: `pdf/registro-paquetes.json`.

## Estado y siguiente lote

Queda revisado el trío de exámenes Matrices I, II y III; esto no cierra T06 ni los restantes materiales LaTeX. Acumulado: 15 de 30 paquetes revisados, 15 pendientes, 18 PDF en nueve parejas y 966 entidades en el catálogo. La solución nueva depende de su examen y ambos de t04.

T04 requiere servicio real, T07 la interfaz de biblioteca y T13 accesibilidad semántica de PDF con comprobación de lector de pantalla. Diseño web y MathJax sin cambios. La ocultación estática no protege los archivos. M19 conserva pendiente la mejora de información de costes del anexo de frutos rojos.

- [x] Lote 08: F006/F007, Examen Funciones y su copia; conciliar diferencias y posibles duplicados antes de fijar documentos finales.
- [x] Revisar condiciones, enunciados y soluciones disponibles por métodos independientes.
- [x] Compilar, revisar todas las páginas y registrar variantes, recursos e inventario.

Lote 08 completado en entrega 168: [auditoría Funciones](auditoria-pdf-funciones.md). Estado vigente: diecisiete paquetes revisados, trece pendientes y veintidós PDF.
