# T06 · Lote 04 · Programación lineal I

20 de octubre de 2026 · Entrega 164 · Lote cerrado; T06 continúa abierta.

## Fuentes, correspondencia y conservación

F019: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Programación Lineal (Soluciones 1).zip`.

F021: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Programación Lineal 1.zip`.

ZIP y entradas originales conservados y verificados por SHA-256. Copias de inspección en `../../tmp/pdfs/lote-164/originales/` y revisadas en `../content/latex/programacion-lineal-i/`. `provenance.json` registra datos preservados, respuestas, gráficos inspeccionados y correspondencia. El logo procede de F021 y coincide con su entrada ZIP.

Las tres imágenes originales de F019 se han inspeccionado. Las regiones de baterías y del recinto abstracto coinciden con sus vértices; la imagen de misiones incluye indebidamente la frontera de inversión igual a 2 millones. Los PDF revisados emplean gráficos vectoriales elaborados con las mismas restricciones y la frontera estricta corregida. Las imágenes originales permanecen en su ZIP; no se sustituyen allí.

### M17 · Orden, puntuación y optatividad

| Ejercicio de F021 | Contenido | Ubicación en F019 |
|---|---|---|
| 1 obligatorio, 5 puntos | Recinto y mínimo | Ejercicio 3, marcado como 4 puntos |
| 2 optativo, 5 puntos | Misiones | Ejercicio 1, marcado como 4 puntos |
| 3 optativo, 5 puntos | Baterías | Ejercicio 2, marcado como 2 puntos |

El solucionario revisado sigue F021. Se resuelve el ejercicio 1 y solo uno de 2 o 3: máximo 10 puntos, no 15. Se preservan 55 minutos, calculadora, 25 minutos orientativos por ejercicio elegido y 0,5 puntos de expresión incluidos en cada ejercicio. Los dos ejercicios que se realizan suman 50 minutos orientativos; no se suman los tres tiempos. El examen separa el bloque obligatorio y el optativo en dos páginas.

## Revisión matemática

### Ejercicio 1: recinto y mínimo

Restricciones originales conservadas. Vértices (0,2), (3,1/2), (5,0) y (0,7); valores de 2x+y: 2, 13/2, 10 y 7. Mínimo único 2 en (0,2). Se comprueban todas las intersecciones frontera y se descartan las no factibles.

Certificado independiente válido en todo el recinto: 2x+y=(x+2y)/2+3x/2 >= 2. La igualdad exige (0,2). No se añade y>=0 como una restricción nueva; el recinto dado ya la implica.

### Ejercicio 2: M07, inversión estricta

«Superar 2 millones» exige 2x+y>20, junto a 2x+y<=24, x>=4 e y>=2x. Los puntos (4,12) y (5,10) son esquinas de la clausura, pero están excluidos de la región estricta. Su segmento se dibuja discontinuo con extremos vacíos.

El máximo sigue siendo 44/5=8,8 en (4,16). Certificado: F=2(2x+y)/5-x/5 <= 44/5. Se alcanza en ese punto, con inversión 2,4 millones, por encima de 2 millones. No se presupone que evaluar esquinas excluidas garantice un óptimo alcanzado en una región abierta.

Para cantidades enteras, la condición equivale a 2x+y>=21. Enumeración exhaustiva a partir de importes originales: nueve posibilidades; máximo único (4,16). El óptimo continuo también es entero. M07 queda corregida en F019/F021; su revisión en F020/F022 sigue pendiente.

### Ejercicio 3: baterías

Restricciones x+y>=10, y-x<=10, 3x+2y<=120 y no negatividad. Vértices (0,10), (10,0), (40,0), (20,30), con beneficios 1400, 1300, 5200 y 6800 euros. Máximo único: 20 baterías A y 30 B, beneficio 6800 euros.

Certificado: Z=54(3x+2y)+32(y-x)<=6800. Enumeración independiente de las 686 combinaciones enteras factibles con gastos originales confirma el mismo óptimo. Los beneficios unitarios ya dados no se confunden con ingresos a los que restar nuevamente los gastos.

## Comprobación técnica y visual

- Examen de dos páginas y soluciones de cuatro, todas A4. Se han revisado visualmente las seis páginas finales: bloques, signos, fórmulas, tablas y gráficos.
- Detectada sustitución tipográfica de «¿» por «£» en la primera compilación. Corregida mediante comando tipográfico explícito; texto esperado y glifo prohibido validados en ambas especificaciones de construcción. La versión final se ha renderizado y revisado nuevamente.
- Títulos, idioma es-ES, texto extraíble, numeración y ausencia de cifrado, errores de referencias o desbordamientos comprobados. Fuentes incrustadas: 8 y 10 respectivamente.
- Recompilación sin conexión con huellas SHA-256 idénticas; informe `pdf/programacion-lineal-i-build.json`.
- El módulo `../scripts/pdf_math_linear.py` calcula intersecciones con fracciones exactas, factibilidad estricta, cotas y enumeraciones enteras. La pareja SELs II supera de nuevo su verificación tras ampliar el proceso.
- 77 archivos unitarios, 341 pruebas superadas: `../../tmp/tanda-06-164-unit-tests.log`.
- Chrome verifica catálogo, fórmulas y entrega HTTP de los diez PDF desde raíz/subcarpeta: `../../tmp/tanda-06-164-browser.log`.

## Reproducción

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-programacion-lineal-i.json --engine RUTA/tectonic.exe --python RUTA/python.exe --cached
python scripts/update-pdf-inventory.py
```

Motor y dependencias: [piloto](auditoria-pdf-recuperacion-t1.md). Tras cambiar contenido hay que repetir la revisión visual completa. Registro individual de los 30 paquetes: `pdf/registro-paquetes.json`.

## Estado y siguiente lote

Diez PDF revisados, cinco parejas y 958 entidades. Tema principal t06 y etiquetas de programación lineal, optatividad, regiones, optimización y frontera estricta. Acumulado: 10 de 30 paquetes revisados; 20 pendientes.

La biblioteca con filtros sigue pendiente de T07; administración central, de T04. Los PDF no están etiquetados semánticamente y no se acredita aún lectura accesible con lector de pantalla (T13). La ocultación de enlaces estáticos no protege los archivos. Diseño web y MathJax permanecen sin cambios.

- [x] Lote 05: F020/F022, Programación Lineal 2; conciliar orden, puntuación, optatividad y variantes.
- [x] Verificar fronteras y cálculos respetando la petición de formular sin resolver.
- [x] Compilar, revisar cada página, registrar pareja e inventario.

Lote 05 completado en entrega 165: [auditoría PL II](auditoria-pdf-programacion-lineal-ii.md). M07 atendida también en esa pareja; M18/M19 documentadas. Recuento vigente: doce paquetes tratados, dieciocho pendientes.
