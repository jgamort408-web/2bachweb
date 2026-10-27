# T06 · Lote 01 · Subida de nota T1 general

20 de octubre de 2026 · Entrega 161 · Lote cerrado; T06 continúa abierta.

## Fuentes y variantes

- F030: examen original `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Subida de nota T1 General.zip`.
- F029: soluciones originales, mismo nombre con ` Soluciones.zip`.
- Ambos ZIP y sus entradas `main.tex` conservados sin cambios y comprobados mediante SHA-256. Las copias de inspección están en `../../tmp/pdfs/lote-161/originales/`.
- F029 contiene dos documentos completos separados por explicaciones y conversación. El primero resuelve tres ejercicios con una rama izquierda errónea; el segundo repite solo el ejercicio 1 y confunde los parámetros independientes de sus apartados. No son dos exámenes distintos. Se concilian en un único solucionario de F030; la conversación y el duplicado no se imprimen y se conservan íntegros en el original.
- F030 referencia un logo que no está incluido en su ZIP. La copia revisada utiliza cabecera textual; no se añade una imagen de otra fuente.

Copias revisadas: `../content/latex/subida-nota-t1-general/`. `provenance.json` registra hashes, variantes, datos preservados, incidencias y respuestas. Se conservan los tres ejercicios, cinco apartados, puntos 2+2+3,5+1,5+1, tiempos 15+35+5 minutos y permiso de calculadora. Solo se revisa redacción y composición.

## Correcciones y contraste

| Apartado | Resultado y comprobación |
|---|---|
| 1(a), M06 | Se mantiene a/(x-1). Continuidad da a=1; derivadas laterales -a=-b dan b=1. Los cocientes incrementales recuperan pendiente -1. El par 1,-1 corresponde a la variante lineal descartada. |
| 1(b) | Parámetros independientes a=1,b=2. En [0,1], la función es negativa; área 5/3. Integración exacta racional independiente y cotas 1 a 2. |
| 2(a), M16 | g=x/(x+3): asíntotas x=-3 e y=1, límites laterales +infinito y -infinito, corte (0,0), crecimiento en cada rama. No crecimiento global: -4<-2, pero 4>-2. Sin inflexión en -3. Curvatura conservada como ampliación del solucionario, sin añadir exigencias al examen. |
| 2(b) | Punto (2,2/5), pendiente 3/25, tangente y=3x/25+4/25. Punto y pendiente contrastados con fracciones exactas. |
| 3, M13 | Primitiva x³/3+e^(2x)/2+ln\|1-x\|+C por intervalos sin cruzar 1, con constantes independientes si se considera todo el dominio. Diferenciación y contraste numérico a ambos lados; error máximo menor de 4e-9. |

## Validación y reproducción

Examen: una página. Soluciones: cinco páginas. Se han inspeccionado visualmente las seis páginas A4 renderizadas: texto, fórmulas, numeración, recinto bajo el eje, dos ramas y tangente, sin recortes ni solapamientos. El PDF de examen incrusta 11 fuentes y el de soluciones 17. Idioma es-ES, títulos, texto extraíble, ausencia de cifrado y errores de glifos/desbordamiento comprobados automáticamente.

Recompilaciones sin conexión producen las mismas huellas SHA-256. `../docs/pdf/subida-nota-t1-general-build.json` registra entradas, motor y resultados. Se amplía el proceso existente mediante configuración por lote; también se recompila correctamente el piloto anterior sin modificar sus PDF.

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-subida-nota-t1-general.json --engine RUTA/tectonic.exe --python RUTA/python.exe --cached
```

Se usa el mismo motor y caché local del [piloto](auditoria-pdf-recuperacion-t1.md). El verificador comprueba los ZIP y entradas originales antes de publicar; cada lote conserva su carpeta temporal y su informe. Tras cualquier modificación hay que repetir la revisión visual. La compilación automática no sustituye la revisión editorial.

## Catálogo y límites

Cuatro recursos revisados en total, dos parejas vinculadas y 952 entidades. Las etiquetas reflejan recuperación/subida, trimestre y contenido; las soluciones dependen de su examen. Chrome verifica los cuatro archivos por HTTP, tipo application/pdf y firma PDF desde raíz y subcarpeta. Pasan las 341 pruebas de 77 archivos.

La biblioteca con filtros continúa pendiente de T07 y la administración central de T04. Los PDF no están etiquetados semánticamente ni se acredita accesibilidad con lector de pantalla (T13). La ocultación de enlaces estáticos no protege el archivo.

## Siguiente lote

- [x] T06 · Lote 02: F025/F026, SELs I; conciliar ejercicios, soluciones, variantes y recursos gráficos antes de compilar.
- [x] Verificar álgebra por métodos independientes y registrar aclaraciones.
- [x] Compilar y revisar cada página, registrar parejas y actualizar inventario.

Acumulado: 4 de 30 paquetes revisados; 26 pendientes. T06 se cierra solo al completar los lotes restantes.

Lote 02 completado en entrega 162: [auditoría SELs I](auditoria-pdf-sistemas-sels-i.md). Recuento vigente: seis paquetes tratados y 24 pendientes.
