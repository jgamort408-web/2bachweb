# T06 · Lote 09 · Límites y derivadas

20 de octubre de 2026 · Entrega 169 · Lote cerrado; T06 continúa abierta.

## Fuente y conservación

F008: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Límites y Derivadas.zip`.

El ZIP contiene el examen y dos comentarios de respuesta del cohete, no un solucionario completo. Se elabora uno nuevo, identificado como tal, y se corrige la interpretación M14. ZIP y entrada `main.tex` intactos y verificados por SHA-256. Copia de inspección: `../../tmp/pdfs/lote-169/originales/F008/`. Copias revisadas, logo y procedencia: `../content/latex/limites-derivadas/`. El logo se verifica contra su entrada; las imágenes y otros logos no utilizados permanecen en el original.

Se conservan 55 minutos, calculadora y puntuaciones 3,2+2,4+2,4+2=10. El ejercicio 1 conserva sus apartados 2+0,6+0,6. Se ofrecen seis derivadas y seis límites; en cada bloque se eligen cuatro, valen 0,6 por apartado y se corrigen **las cuatro primeras respuestas según orden de lectura**. El solucionario muestra todas como consulta, sin ampliar el requisito de evaluación.

Las seis derivadas y seis límites alternativos comentados se conservan en dos anexos no evaluables, con respuestas contrastadas. Los delimitadores LaTeX dañados de la primera alternativa de derivación se normalizan siguiendo la expresión legible del original, sin cambiar coeficientes ni exponente. Se preservan sus dominios. Los comentarios erróneos del cohete no se trasladan como respuestas válidas.

## Revisión matemática

### Continuidad, derivabilidad y rectas

En x=0, continuidad exige b=-2 y la igualdad de derivadas laterales da a=1. Se contrasta mediante cocientes incrementales por ambos lados. Usando esos parámetros, f(2)=0 y f'(2)=1: tangente y=x-2 y normal y=-x+2. Se comprueba punto común y producto de pendientes -1.

### Derivadas

Las seis funciones activas y seis alternativas comentadas se comprueban por diferenciación automática independiente de las fórmulas impresas, en 58 evaluaciones dentro de sus dominios. Se verifican cadena, cociente, producto, signos y simplificaciones. Las respuestas y dominios completos constan en `limites-derivadas-soluciones.tex`.

En especial, x²/sqrt(1+2 ln x) exige x>exp(-1/2), no solo x>0; su derivada es x(1+4 ln x)/(1+2 ln x)^(3/2). La alternativa x/sqrt(1+x) exige x>-1. Se conservan las dos listas separadas.

### Límites activos

| Apartado | Resultado y método |
|---|---|
| a | 1/2; racionalización |
| b | +infinito; crecimiento exponencial frente a polinomio |
| c | 5/sqrt(2); división por x positivo |
| d | 1; logaritmo x ln(1-1/x²) tiende a 0 |
| e | 3/4; la diferencia se simplifica a 3/x fuera del punto |
| f | Bilateral inexistente; laterales +infinito y -infinito |

Se contrastan identidades racionales exactas, signos laterales y aproximaciones independientes. En las alternativas comentadas los resultados son +infinito, +infinito, 3, exp(2), 1 y límite bilateral inexistente, respectivamente. En el cuarto se respeta x hacia menos infinito y el signo del exponente; en el sexto se distinguen otra vez los dos infinitos laterales.

### Cohete y cierre de M14 en copia/PDF

D(0)=100 miles de km=100000 km; D(2)=20 miles de km=20000 km. El límite en infinito es cero, pero 100/(t²+1)>0 para todo t finito no negativo. El modelo no alcanza distancia cero ni proporciona instante de aterrizaje. Se corrige el comentario original que confundía límite con llegada; el gráfico no añade un impacto ficticio. El ZIP original se mantiene intacto.

## Verificación técnica y visual

- Dos páginas de examen y siete de soluciones, incluidos dos anexos. Se inspeccionaron las nueve páginas: elección y baremo, signos, fórmulas, dominios, exponentes, unidades, gráfica y numeración, sin cortes ni solapamientos.
- Recompilación sin conexión con huellas SHA-256 idénticas; informe `pdf/limites-derivadas-build.json`.
- Títulos, idioma es-ES, texto extraíble, fuentes incrustadas (14 y 17), ausencia de cifrado, errores de glifos, referencias y desbordamientos comprobados.
- La verificación de frases esperadas tolera espacios que el extractor PDF omite o introduce; no se eliminan sus verificaciones de contenido. Las reglas de evaluación se comprobaron también visualmente.
- `../scripts/pdf_math_limits_derivatives.py` contiene la diferenciación automática, identidades y comprobaciones independientes. El solucionario principal de Funciones supera de nuevo su validación tras ampliar el proceso.
- 77 archivos unitarios, 341 pruebas superadas: `../../tmp/tanda-06-169-unit-tests.log`.
- Chrome verifica catálogo, fórmulas y entrega HTTP de los veinticuatro PDF desde raíz y subcarpeta: `../../tmp/tanda-06-169-browser.log`.

## Reproducción

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-limites-derivadas.json --engine RUTA/tectonic.exe --python RUTA/python.exe --cached
python scripts/update-pdf-inventory.py
```

Motor y dependencias: [piloto](auditoria-pdf-recuperacion-t1.md). Tras modificar contenido hay que repetir la revisión visual completa.

## Estado y siguiente lote

18 paquetes originales revisados, 12 pendientes y 24 PDF en doce parejas. Catálogo de 972 entidades, con la nueva pareja vinculada a t01 y la solución a su examen. Registro individual: `pdf/registro-paquetes.json`.

M14 queda corregida en la adaptación web y en la copia LaTeX/PDF. M19 y M20 mantienen sus carencias del enunciado expresamente documentadas. T06 sigue abierta, T04 requiere servicio real y T07 la biblioteca con filtros. Accesibilidad semántica de PDF y lector de pantalla pendientes de T13. Diseño web y MathJax sin cambios; ocultar enlaces estáticos no protege archivos.

- [x] Lote 10: F002/F003, Distribuciones de Probabilidad; conciliar variantes y soluciones existentes.
- [x] Revisar M02 (binomial) y M03 (normal) mediante cálculos independientes y mantener los datos originales.
- [x] Compilar, inspeccionar todas las páginas y actualizar procedencia, catálogo e inventario.
