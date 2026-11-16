# SEL-PARTES01 · Selección parcial con dos ejercicios piloto

Fecha 2026-11-12. Primera tanda de implementación. Cobertura de dos ejercicios
de los 640 del banco. La selección parcial del resto requiere preparar y revisar
sus bloques y dependencias de contexto.

## Lista de tareas

- [x] Revisar el generador y la carga de fragmentos compartidos.
- [x] Añadir filtros de parte y apartado con validación previa a la escritura.
- [x] Preparar Partes I/II y sus apartados en SEL-D0075-OB-E03.
- [x] Preparar apartados a, b y c en SEL-D0084-OA-E01.
- [x] Conservar la procedencia, la letra y los datos comunes en las selecciones.
- [x] Añadir regresiones para peticiones inválidas y conservación de archivos.
- [x] Ejecutar las pruebas y verificar la salida de los seis PDF de control.
- [x] Comparar las versiones completas con sus PDF anteriores.
- [x] Revisar visualmente las dos modalidades de cada piloto parcial.
- [x] Actualizar la guía y el paquete para Overleaf.

## Decisiones de implementación

Los bloques seleccionables están en los archivos originales de enunciado y
solución. La versión completa y la parcial utilizan el mismo contenido.
El índice `datos/seleccion_parcial.json` declara las selecciones revisadas.

El generador combina los filtros anteriores con `--parte` y `--apartado`.
Comprueba todos los IDs resultantes antes de escribir. Si el ejercicio todavía
no está preparado o la parte o letra no existe, muestra un error.

En las selecciones de matrices se conserva la tabla de ventas y ganancias y se
explicita que los productos considerados son F traspuesta por G y F por G
traspuesta. En inferencia, la Parte II conserva la población y el apartado a
seleccionado. La cabecera muestra el ID completo del ejercicio y el alcance.

## Accesos de prueba

- [Inferencia, preguntas](../../partes01-inferencia-enunciados.tex).
- [Inferencia, preguntas y solución](../../partes01-inferencia-con-soluciones.tex).
- [Matrices, preguntas](../../partes01-matrices-enunciados.tex).
- [Matrices, preguntas y solución](../../partes01-matrices-con-soluciones.tex).

## Siguientes tandas

- [x] SEL-PARTES02 · Preparar hasta ocho ejercicios con Partes I/II y revisar sus datos comunes y las dependencias entre apartados.
- [ ] SEL-PARTES03 · Ampliar por tandas de hasta ocho ejercicios, manteniendo explícita la cobertura real.
- [ ] SEL-PARTES-CATEGORIAS · Clasificar partes y apartados por sus contenidos específicos para filtrar directamente esas unidades.
- [ ] SEL-AUD-01 · Revisión matemática y didáctica independiente.

Los temas y etiquetas actuales se aplican al ejercicio completo. La selección
parcial permite pedir una unidad concreta de un ID preparado y no presupone
que todas sus partes compartan el mismo tema.

La tanda SEL-PARTES02 comenzará por SEL-D0067-OA-E03,
SEL-D0067-OB-E03, SEL-D0068-OA-E03, SEL-D0068-OB-E03,
SEL-D0069-OA-E03, SEL-D0069-OB-E03, SEL-D0070-OA-E03 y
SEL-D0070-OB-E03. Se verificará en cada caso la selección completa,
cada parte y los apartados preparados, en las dos modalidades de salida.


## Verificación de cierre

29 pruebas superadas, incluidas siete regresiones de la selección parcial.
Se comprobaron las dos modalidades de los pilotos y se revisaron sus cuatro
páginas. Las versiones completas S075 y S084 conservan el texto anterior al
normalizar espacios y guiones de separación de palabras al final de línea.
Los CSV, los otros 638 enunciados y las otras 638 soluciones conservan sus
huellas. El catálogo y las 215 fuentes superaron la validación.

La implementación admite los dos IDs preparados y rechaza una petición
parcial para cualquier ID sin cobertura declarada. Los otros 638 ejercicios
siguen disponibles como ejercicios completos. SEL-PARTES permanece abierto
hasta completar la preparación prevista del banco.

[Inferencia, preguntas](../../output/pdf/partes01-inferencia-enunciados.pdf) ·
[Inferencia, con solución](../../output/pdf/partes01-inferencia-con-soluciones.pdf) ·
[Matrices, preguntas](../../output/pdf/partes01-matrices-enunciados.pdf) ·
[Matrices, con solución](../../output/pdf/partes01-matrices-con-soluciones.pdf).

`package` · Se extrajo el ZIP en una carpeta aislada y se recompilaron el piloto de inferencia en modo preguntas y el de matrices con solución. Sus textos coinciden con los PDF publicados. La prueba se realizó en local con pdfLaTeX.

SEL-PARTES02 cerrada el 2026-11-12. Ocho ejercicios D0067–D0070 admiten partes completas, con diez IDs de cobertura acumulada. Próxima tanda SEL-PARTES03, D0071–D0074 OA/OB E03. Los apartados individuales y sus categorías siguen pendientes.
