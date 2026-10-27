# T06 · Lote 08 · Funciones y variante

20 de octubre de 2026 · Entrega 168 · Lote cerrado; T06 continúa abierta.

## Fuentes: la copia no es un duplicado

- F006: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Funciones (Copy).zip`.
- F007: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Funciones.zip`.

Los documentos contienen exámenes distintos. F006 tiene tres ejercicios de 4+3+3 puntos, F007 cuatro de 2+3+2+3. Se conservan ambos, sus funciones, dominios, preguntas, reparto por apartados, calculadora y duración de 55 minutos; no se inventan tiempos por ejercicio.

Ninguno contiene solucionario activo. Se elaboran dos nuevos, identificados en la primera página y en las procedencias. ZIP y entradas `main.tex` intactos y comprobados por SHA-256. Las copias de inspección están en `../../tmp/pdfs/lote-168/originales/`; las revisadas en `../content/latex/funciones-variante/` y `../content/latex/funciones-principal/`.

Los logos utilizados proceden de sus propios ZIP. Otros logos e imágenes geométricas no empleados se conservan en los originales; no se adoptan identidades institucionales alternativas. Se retira de las copias la enumeración vacía del original principal y la geometría final sin contenido, manteniendo todos los ejercicios activos.

## F006: variante

### Función por tramos en [-2,2]

Continuidad en todo el dominio, con continuidad relativa en los extremos. Las derivadas laterales en 0 son 2 y -2: no es derivable allí. Se distingue derivada bilateral de las unilaterales en -2 y 2.

Mínimos absolutos 0 en -1 y 1; máximo absoluto 1 en -2, 0 y 2. Se explicita la convención para extremos relativos en los bordes. Curvatura hacia arriba en cada rama, sin punto de inflexión en 0. No se deduce convexidad global: f(0)=1 supera la media de f(-1) y f(1), que vale 0.

### Racional con cancelación

El dominio excluye 2,3,5. Cancelar x-2 no reincorpora x=2: hay hueco en (2,1/3), no asíntota allí. Verticales x=3 y x=5, horizontal y=0; límites laterales y signos contrastados exactamente. La gráfica separa ramas y marca el hueco con círculo vacío.

### Cotización a partir de la derivada

c'(t)=3(t-10)(t-20)/100. Crece en (0,10) y (20,24), decrece en (10,20); máximo relativo en 10 y mínimo relativo en 20. No se inventan precios absolutos a partir de una derivada sin condición inicial. La figura representa c', identificada expresamente, y no el precio c.

## F007: examen principal

### Cúbica

Cortes x=0,1,2; derivadas 3x²-6x+2 y 6x-6. Críticos 1±1/sqrt(3), con ordenadas ±2sqrt(3)/9 (máximo a la izquierda, mínimo a la derecha). Crecimiento fuera de los críticos y decrecimiento entre ellos. Curvatura hacia abajo para x<1, hacia arriba para x>1, inflexión (1,0); sin extremos absolutos en R.

### Función por tramos en [0,+infinito)

Continua en la unión x=2, valor 4/3. Las derivadas laterales 4/3 y -4/9 no coinciden. Se distingue derivada derecha en 0. Máximo absoluto único 4/3 en 2, con incremento hasta la unión y descenso después. La gráfica no dibuja hueco en una unión continua.

### Asíntotas

Para 1/((x-2)(x-1)): verticales x=1 y x=2, horizontal y=0. Se verifican los signos laterales y se separan las tres ramas en el gráfico.

### Refrigeración y M20

Los límites en 1 y 11 coinciden con -9. La expresión central es 16-(t-6)²: máximo 16 en t=6, ceros en 2 y 10. Está por encima de cero durante ocho horas, más de seis. Según los umbrales hipotéticos del enunciado, las vacunas sí se estropean y los sueros no, porque no se alcanzan 20 grados. No se presentan esos umbrales como recomendaciones de conservación reales.

**M20: el estado eléctrico no está definido por la temperatura.** La respuesta escolar de inicio en t=1, final en t=6 y duración de cinco horas se ofrece condicionada a que calentamiento y enfriamiento coincidan con corte y retorno de energía. Sin esa hipótesis no se identifica de manera única la restauración; t=11 es recuperación de temperatura, no necesariamente retorno eléctrico. La hipótesis pendiente de explicitar queda señalada, sin alterar los datos del examen.

## Variante comentada conservada una vez

Ambos ZIP contienen comentado el mismo ejercicio de v'(t)=t²-5t+6, v(0)=10, compra de 3000 acciones en 2 y venta en 4 y elección de instantes óptimos en [0,6]. Se conserva como anexo no evaluable en el solucionario principal; el de la variante remite a él. No se añaden sus puntos al examen. La pregunta comentada marca 1 punto, pero sus apartados suman 2,5; no se traslada ese baremo inconsistente al anexo.

Primitiva v=t³/3-5t²/2+6t+10. Valores v(2)=44/3, v(4)=46/3; ganancia 2000 euros. Comparación de extremos y críticos: mínimo 10 en 0, máximo 28 en 6, compra anterior a venta y ganancia de 54000 euros con el número de acciones dado. Resultados del modelo del ejercicio, sin introducir datos de mercado ni comisiones.

## Verificación técnica y visual

Cuatro PDF y doce páginas revisadas: variante, una de examen y tres de soluciones; principal, dos de examen y seis de soluciones, con anexo en la sexta. Se inspeccionaron texto, fórmulas, signos, dominios, puntos abiertos, extremos, tablas, figuras y pies, sin recortes ni solapamientos.

Se completó la caché local con una fuente matemática requerida. Después, ambas parejas recompilan sin conexión con idénticas huellas SHA-256. Se comprueban fuentes incrustadas, títulos, idioma es-ES, texto extraíble, numeración y ausencia de cifrado, referencias rotas, glifos erróneos y desbordamientos. Informes: `pdf/funciones-variante-build.json` y `pdf/funciones-principal-build.json`.

El módulo `../scripts/pdf_math_functions.py` contrasta polinomios y derivadas, valores racionales, polos y hueco, extremos, temperatura e intervalos y la variante bursátil. Matrices III supera de nuevo su verificación tras ampliar el proceso.

77 archivos unitarios: 341 pruebas superadas, cero fallos. Registro `../../tmp/tanda-06-168-unit-tests.log`. Chrome verifica catálogo, fórmulas y entrega HTTP de los veintidós PDF desde raíz y subcarpeta: `../../tmp/tanda-06-168-browser.log`.

## Reproducción

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-funciones-variante.json --engine RUTA/tectonic.exe --python RUTA/python.exe --cached
node scripts/build-pdfs.mjs --config config/pdf-build-funciones-principal.json --engine RUTA/tectonic.exe --python RUTA/python.exe --cached
python scripts/update-pdf-inventory.py
```

Motor y dependencias: [piloto](auditoria-pdf-recuperacion-t1.md). Repetir la revisión visual completa tras cambiar contenido.

## Estado y siguiente lote

17 paquetes originales revisados y 13 pendientes. Veintidós PDF en once parejas, 970 entidades y dependencia de ambas parejas respecto a t02. Registro individual: `pdf/registro-paquetes.json`. T06 abierta; no se da por resuelta la falta de hipótesis de M20 ni de costes de M19.

T04 requiere servicio real, T07 la biblioteca y T13 accesibilidad semántica de los PDF con lector de pantalla. Diseño web y MathJax sin cambios; la ocultación estática no protege archivos.

- [x] Lote 09: F008, Examen Límites y Derivadas; revisar documentos y soluciones y cerrar M14 en copias.
- [x] Contrastar dominios, límites y modelo del cohete sin confundir aproximación con llegada.
- [x] Compilar, revisar todas las páginas y actualizar procedencia, catálogo e inventario.

Lote 09 completado en entrega 169: [auditoría F008](auditoria-pdf-limites-derivadas.md). M14 corregida en copia/PDF; estado vigente: dieciocho paquetes revisados y doce pendientes.
