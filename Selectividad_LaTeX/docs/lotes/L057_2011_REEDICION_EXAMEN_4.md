# L057 · reedición del examen registrado en L054

Fecha: 2026-10-29. Estado: cerrado.

## Plan de esta tanda

- [x] Guardar las huellas de los 1008 archivos anteriores y comprobar los dos originales.
- [x] Comparar visualmente las cuatro páginas: dos por versión, cabecera, instrucciones y ocho ejercicios.
- [x] Registrar las ocho correspondencias entre fuente alternativa e identificadores canónicos.
- [x] Preparar acceso individual y selección reutilizable por categorías, sin crear ejercicios ni soluciones duplicados.
- [x] Validar las correspondencias, filtros, fuentes y conservación de archivos anteriores.
- [x] Actualizar el paquete y comprobar sus entradas compilables antes de cerrar el seguimiento.

## Identificación y decisión

Fuente alternativa: `SRC-98312D373CA4`, `Selectividad/sel_2011_matematicas_aplicadas/123-MATEMATICAS APLICADAS ANDALUCIA.pdf`.

Fuente canónica: `SRC-45EF64533A19`, `Selectividad/sel_2011_matematicas_aplicadas/121-EXAMEN 4.pdf`, registrada como `EXA-0054` / `D0054`.

Ambas imprimen curso 2010-2011, opciones A/B, cuatro ejercicios por opción y las mismas instrucciones. La alternativa omite el logotipo y distribuye el texto con otro espaciado. Se han cotejado fórmulas, cifras, apartados, puntuaciones y la errata «la media sus longitudes» de A4, que conserva INC-020. No se detectan diferencias en los enunciados. Esta equivalencia se refiere al contenido revisado y no a identidad de archivos: las huellas SHA-256 son distintas.

Se conserva una sola transcripción de cada ejercicio, con sus ID de D0054. No se crean D0057 ni EXA-0057. No se modifica el inventario de fuentes ni sus campos de duplicado exacto. La relación de contenido se registra separadamente y no acredita convocatoria, tipo, reserva ni modelo. La fuente alternativa no contiene tabla ni criterios y no se vincula a EXA-0056 por compartir el prefijo 123.

## Diario

`L057 · plan/review` — Cuatro páginas comparadas en esta tanda;segunda comprobación respecto a la preidentificación de L056, por el mismo autor. Control previo de 1008 archivos. Se prepara el registro de correspondencias sin duplicar el catálogo y sin redactar soluciones.

## Huellas de las fuentes

- `SRC-98312D373CA4`: `3382ee86917021a5a103b010202f2bb187eafb9b883e084bbfe921302d86e503`.
- `SRC-45EF64533A19`: `c70ed065da193c82dd0a02fb4c05069415b0adf53d0f49bba1b0375a19823566`.

## Acceso individual y clasificación heredada

Las categorías pertenecen a los ID canónicos y se consultan en datos/ejercicios.csv. No se copian al CSV de equivalencias para evitar divergencias.

| ID y enunciado | Opción/número | Página en ambas fuentes | Tema principal | Secundarios | Epígrafes | Etiquetas |
|---|---|---|---|---|---|---|
| [SEL-D0054-OA-E01](../../enunciados/SEL-D0054-OA-E01.tex) | A/1 | 1 | T04 | — | T04.2, T04.3, T04.4, T04.11 | potencia-matriz, producto-matrices, matriz-traspuesta, ecuacion-matricial |
| [SEL-D0054-OA-E02](../../enunciados/SEL-D0054-OA-E02.tex) | A/2 | 1 | T02 | T01 | T02.2, T02.9, T01.11, T01.15, T01.16 | funcion-exponencial, regla-cociente, regla-cadena, funcion-polinomica, parametros, optimizacion, extremos-relativos |
| [SEL-D0054-OA-E03](../../enunciados/SEL-D0054-OA-E03.tex) | A/3 | 1 | T07 | — | T07.7, T07.8, T07.9, T07.10 | experimento-compuesto, urna-dinamica, probabilidad-total, probabilidad-condicionada, bayes |
| [SEL-D0054-OA-E04](../../enunciados/SEL-D0054-OA-E04.tex) | A/4 | 1 | T09 | T08 | T09.1, T08.3 | distribucion-normal, desviacion-conocida, media-muestral, contraste-hipotesis, contraste-unilateral-media, region-aceptacion, nivel-significacion |
| [SEL-D0054-OB-E01](../../enunciados/SEL-D0054-OB-E01.tex) | B/1 | 2 | T06 | — | T06.1, T06.2, T06.3, T06.4 | programacion-lineal, restricciones, region-factible, vertices, funcion-objetivo, viabilidad-punto, maximo-minimo |
| [SEL-D0054-OB-E02](../../enunciados/SEL-D0054-OB-E02.tex) | B/2 | 2 | T02 | T01 | T02.1, T02.2, T02.9, T01.11, T01.15 | funcion-polinomica, beneficio-maximo, optimizacion, representacion-grafica, maximo-minimo |
| [SEL-D0054-OB-E03](../../enunciados/SEL-D0054-OB-E03.tex) | B/3 | 2 | T07 | — | T07.8, T07.9, T07.10 | probabilidad-total, probabilidad-condicionada, bayes, complementario |
| [SEL-D0054-OB-E04](../../enunciados/SEL-D0054-OB-E04.tex) | B/4 | 2 | T09 | T08 | T09.2, T09.3, T09.7, T09.8, T08.3 | muestreo, muestreo-estratificado, muestra-proporcional, tamano-muestral, distribucion-normal, desviacion-conocida, error-estimacion, cota-no-estricta |

## Crear relaciones dirigidas

[Correspondencias CSV](../../datos/equivalencias_contenido.csv) · [Selección de ocho ID](../../selecciones/l057-ids.tex). La fuente alternativa se localiza en el CSV y remite a EXA-0054. El generador actual filtra los ejercicios canónicos;este registro de equivalencias no añade un filtro nuevo por fuente.

Desde la carpeta del banco:

```powershell
python scripts/generar_seleccion.py --examen EXA-0054 --salida selecciones/l057-ids.tex
python scripts/generar_seleccion.py --examen EXA-0054 --tema T07 --tag bayes --salida selecciones/l057-probabilidad.tex
python scripts/generar_seleccion.py --id SEL-D0054-OA-E01 --salida selecciones/l057-matrices.tex
```

Los dos últimos son ejemplos de selecciones que se pueden generar, no archivos precreados. Las etiquetas repetidas se combinan con AND. En relaciones nuevas, vaciar ContextoSeleccion como indica la guía para no arrastrar instrucciones de un examen distinto. La selección inicial del proyecto sigue siendo L056;las entradas de L054 permiten compilar los ejercicios de esta reedición en ambos modos.

## Cierre y verificación

**Verificación L057:** 21 pruebas superadas en88.953s;448 ejercicios únicos,56 exámenes canónicos y215 fuentes válidas. Ocho correspondencias comprobadas;1008 archivos anteriores y todos los CSV preexistentes intactos. ZIP aislado de1328 archivos:ambos modos L054 idénticos byte a byte a los PDF ya revisados;main con texto y cuatro renderizados idénticos a L056. Compilación local,sin nuevos PDF entregables ni soluciones;servicio Overleaf no probado.

[Control reproducible y huellas](L057_control.json) · [Paquete modular](../../dist/Selectividad_Overleaf.zip).

`L057 · feat/review/test/build/docs` — Reedición cotejada y enlazada a ocho ejercicios canónicos. Catálogo sin duplicados y categorías conservadas. Siguiente L058:SRC-C2BAB5B3B438,221A-EXAMEN 5.pdf. Soluciones para la fase posterior.
