# T06 · Lote 05 · Programación lineal II

20 de octubre de 2026 · Entrega 165 · Lote cerrado; T06 continúa abierta.

## Fuentes y conservación

F020: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Programación Lineal (Soluciones 2).zip`.

F022: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Programación Lineal 2.zip`.

Ambos ZIP y sus entradas `main.tex` se conservan íntegros, con huellas SHA-256 verificadas. Copias de inspección: `../../tmp/pdfs/lote-165/originales/`; revisadas: `../content/latex/programacion-lineal-ii/`. El logo procede de F022 y se comprueba contra su entrada original. Las seis imágenes geométricas no usadas permanecen en el ZIP. F020 no incluye imágenes externas.

`provenance.json` registra correspondencia, datos preservados, respuestas e incidencias. Las copias de baterías y recinto reutilizan los desarrollos ya revisados en PL I, porque sus datos son idénticos, y se contrastan de nuevo para este examen.

## M18 · Ejercicio sustituido en el solucionario

| F022, examen | F020, soluciones originales | Actuación |
|---|---|---|
| 1, baterías, 4 puntos | 1, baterías | Conservar y verificar |
| 2, misiones: formular sin resolver, 3 puntos | 2, frutos rojos: formular sin resolver | Redactar formulación fiel a F022; conservar frutos rojos en anexo identificado |
| 3, recinto y mínimo, 3 puntos | 3, mismo recinto | Conservar y verificar |

Los tres ejercicios son obligatorios. Se preservan 4+3+3=10 puntos, 25+15+15=55 minutos, calculadora y los dos apartados del ejercicio 1. No se traslada la optatividad de PL I ni su criterio explícito de 0,5 puntos de expresión, ausente en F022.

El anexo no altera el examen ni su puntuación. La variante original de frutos rojos queda disponible en la última página de las soluciones, con sus cifras, restricciones y objetivo revisado. No se elimina material ni se presenta esa variante como respuesta a misiones.

## Revisión matemática

### Ejercicio 1

Vértices de baterías (0,10), (10,0), (40,0), (20,30). Máximo único 6800 euros con 20 A y 30 B. Contrastado mediante intersecciones racionales, cotas algebraicas y las 686 combinaciones enteras factibles con importes originales. Los beneficios unitarios no se confunden con ingresos a los que descontar otra vez los gastos.

### Ejercicio 2 y M07

Modelo: maximizar 3x/5+2y/5, sujeto a 2x+y<=24, 2x+y>20, x>=4, y>=2x. Las decisiones finales son enteras no negativas; la relajación continua se identifica expresamente. Para cantidades enteras, la condición estricta equivale a 2x+y>=21.

Se respetan «formular, sin resolver»: no se calculan ni muestran vértices, cantidades óptimas ni valor máximo de misiones en esta solución. Se comprueba equivalencia de importes originales, restricciones escaladas y versión entera en 364 combinaciones, sin optimizar este ejercicio.

M07 queda atendida en las dos parejas revisadas, F019/F021 y F020/F022: la inversión exactamente igual a 2 millones no se admite. Los ZIP históricos permanecen intactos.

### Ejercicio 3

Vértices (0,2), (3,1/2), (5,0), (0,7). Mínimo único de 2x+y igual a 2 en (0,2), verificado por intersecciones exactas y certificado (x+2y)/2+3x/2>=2. No se incorpora y>=0 como hipótesis ajena al original. Las representaciones vectoriales proceden de estas mismas restricciones.

### Anexo y M19: ingreso frente a beneficio

Datos conservados: A lleva 75 g de arándanos y 100 g de frambuesas, precio 2,40 euros; B lleva 75 g y 50 g, precio 1,80 euros. Disponibilidades 3,75 kg y 4 kg; x<=2y. Formulación: x+y<=50, 2x+y<=80, x<=2y, cantidades no negativas e integralidad para surtidos completos.

La función que los precios permiten calcular es el ingreso I=2,40x+1,80y. El original lo llama beneficio, pero faltan costes o márgenes para justificar beneficio neto. **M19 queda pendiente de mejora del enunciado**, con la carencia señalada en el PDF. No se inventan datos ni se afirma un beneficio neto. El anexo no se resuelve, respetando su petición original.

Las conversiones de kilogramos a gramos y las restricciones se comparan con el modelo original en 3025 pares enteros, incluidos valores negativos de control; aparecen 880 combinaciones factibles. Es una comprobación de formulación, no una resolución del anexo.

## Compilación y revisión visual

- Examen de dos páginas y soluciones de cuatro, con el anexo en la cuarta. Se inspeccionaron las seis páginas: textos, signos, matrices de restricciones, tablas, recintos, pies y referencias a la variante, sin recortes ni solapamientos.
- El original F020 utiliza un entorno de gráficos sin cargar su paquete y una posición de figura que requiere otro paquete. Las copias usan el estilo común y gráficos correctamente configurados, sin alterar el ZIP.
- Títulos, idioma es-ES, numeración, texto extraíble y ausencia de cifrado, desbordamientos y errores de glifos comprobados. Signos de interrogación explícitos y texto esperado validado.
- Fuentes incrustadas: 8 en el examen y 12 en las soluciones. Recompilación sin conexión con huellas idénticas; informe `pdf/programacion-lineal-ii-build.json`.
- PL I supera de nuevo su verificación completa tras ampliar el contraste matemático.
- 77 archivos unitarios: 341 pruebas superadas; registro `../../tmp/tanda-06-165-unit-tests.log`.
- Chrome verifica catálogo, fórmulas y entrega HTTP de los doce PDF desde raíz y subcarpeta; registro `../../tmp/tanda-06-165-browser.log`.

## Reproducción

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-programacion-lineal-ii.json --engine RUTA/tectonic.exe --python RUTA/python.exe --cached
python scripts/update-pdf-inventory.py
```

Motor y dependencias: [piloto](auditoria-pdf-recuperacion-t1.md). Repetir la revisión visual después de modificar contenido. Registro individual: `pdf/registro-paquetes.json`.

## Estado y siguiente lote

Doce PDF revisados en seis parejas; 960 entidades. El registro identifica 12 paquetes tratados y 18 pendientes. El estado revisado acredita revisión y carencias documentadas; no convierte el beneficio neto desconocido del anexo en un resultado completo.

T06 sigue abierta. T04 requiere servicio administrativo real; T07 desarrollará la biblioteca con filtros. Accesibilidad semántica de PDF y lector de pantalla pendientes de T13. No se cambia el diseño de la web ni MathJax; la ocultación estática no protege los archivos.

- [x] Lote 06: F014/F015, Matrices I y II; inspeccionar como exámenes distintos y determinar qué soluciones contienen.
- [x] Revisar matrices, dimensiones, inversas y ecuaciones por métodos independientes.
- [x] Compilar, inspeccionar todas las páginas y registrar originales y documentos resultantes.

Lote 06 completado en entrega 166: [auditoría de Matrices I/II](auditoria-pdf-matrices-i-ii.md). Dos originales distintos y cuatro PDF; estado vigente: 14 paquetes revisados, 16 pendientes.
