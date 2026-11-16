# SEL-PARTES02 · Ocho ejercicios con Partes I/II

Fecha 2026-11-12. Segunda tanda de preparación de selección parcial. Cobertura
acumulada de diez ejercicios, de los cuales ocho se incorporan en esta tanda.

## Tareas

- [x] Leer los ocho enunciados y soluciones y localizar el contexto de cada parte.
- [x] Encapsular las dos partes en los archivos compartidos de cada ejercicio.
- [x] Declarar las Partes I y II completas en el índice de cobertura.
- [x] Generar selecciones conjuntas para cada parte y ambas modalidades.
- [x] Superar las doce pruebas de selección parcial y búsqueda individual.
- [x] Comprobar los cuatro PDF parciales y sus páginas.
- [x] Comprobar las cuatro versiones completas y la preservación de los contenidos.
- [x] Verificar el catálogo y las fuentes y actualizar el ZIP.

## Cobertura y datos comunes

| ID | Parte I | Parte II |
|---|---|---|
| SEL-D0067-OA-E03 | Aciertos independientes de Lena y Adrián | Intervalo de edad media y error, con n=100 y desviación 0,8 |
| SEL-D0067-OB-E03 | Préstamos hipotecario y personal | Media muestral de cociente intelectual, con media 110 y desviación 15 |
| SEL-D0068-OA-E03 | Enfermedad y prueba de diagnóstico | Tamaño muestral e intervalo de proporción de fumadores |
| SEL-D0068-OB-E03 | Libros y máquinas de encuadernación | Intervalo y tamaño muestral de tiempo en caja |
| SEL-D0069-OA-E03 | Visitas a Cádiz y Sevilla | Tiempo en taller, suma de 136 horas y n=16 |
| SEL-D0069-OB-E03 | Asignatura optativa y sexo | Proporción de diésel, 75 de 300 turismos y error |
| SEL-D0070-OA-E03 | Independencia y complementarios | Muestras con reemplazo de la población {8,10,12} |
| SEL-D0070-OB-E03 | Bolas de tenis y pádel | Media muestral y afijación proporcional por departamentos |

Cada parte mantiene su introducción, todos los apartados internos y su
solución. Los contenedores de maquetación se incluyen dentro de la parte
correspondiente para conservar emparejados sus comienzos y finales al filtrar.

El cambio añade selección de partes completas en estos ocho IDs. Sus
apartados individuales todavía no se declaran como seleccionables. El
generador rechaza peticiones de apartado para estos casos. Los dos pilotos de
SEL-PARTES01 mantienen su cobertura de apartados anterior.

## Selecciones preparadas

- [Parte I, preguntas](../../partes02-I-enunciados.tex).
- [Parte I, preguntas y soluciones](../../partes02-I-con-soluciones.tex).
- [Parte II, preguntas](../../partes02-II-enunciados.tex).
- [Parte II, preguntas y soluciones](../../partes02-II-con-soluciones.tex).

Se conservan los IDs originales y las puntuaciones de cada parte. Los temas
y etiquetas del catálogo siguen describiendo ejercicios completos.

## Tanda siguiente

- [ ] SEL-PARTES03 · Preparar las Partes I/II completas de SEL-D0071-OA-E03, SEL-D0071-OB-E03, SEL-D0072-OA-E03, SEL-D0072-OB-E03, SEL-D0073-OA-E03, SEL-D0073-OB-E03, SEL-D0074-OA-E03 y SEL-D0074-OB-E03.
- [ ] SEL-PARTES-APARTADOS · Revisar dependencias y preparar apartados individuales en los ejercicios que actualmente admiten solo partes completas.
- [ ] SEL-PARTES-CATEGORIAS · Clasificar unidades parciales por sus contenidos específicos.

La selección por apartados del banco completo y la auditoría matemática
independiente siguen pendientes.

## Verificación y publicación

`feat(selectividad)`: ocho ejercicios adicionales admiten Partes I/II completas. Cobertura acumulada de diez IDs.

- Doce pruebas de selección parcial y búsqueda individual superadas.
- Catálogo y 215 fuentes verificados, con 640 ejercicios y 640 soluciones.
- Los dieciséis archivos conservan el contenido anterior al retirar los marcadores de selección. Los CSV y las restantes preguntas y soluciones conservan sus archivos.
- Cuatro PDF parciales compilados y sus quince páginas revisadas visualmente. Cada relación contiene ocho IDs y únicamente la parte solicitada.
- Cuatro PDF completos S067–S070 compilados, con seis soluciones cada uno y la misma secuencia de datos numéricos. La extracción textual difiere en algunos glifos entre los motores de compilación anteriores y pdfLaTeX.
- Ocho registros de compilación sin errores LaTeX, caracteres ausentes ni desbordamientos horizontales.

PDF publicados en `output/pdf/partes02-I-enunciados.pdf`, `partes02-I-con-soluciones.pdf`, `partes02-II-enunciados.pdf` y `partes02-II-con-soluciones.pdf`. Paquete actualizado en `dist/Selectividad_Overleaf.zip`.
