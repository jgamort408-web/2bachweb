# Selectividad: banco LaTeX modular

Proyecto preparado para **Overleaf** y para trabajar por tandas con los originales de `../Selectividad/`. La planificación y el seguimiento están en [PLAN_DE_TRABAJO.md](PLAN_DE_TRABAJO.md).

**L001-L025 cerradas: 200 enunciados cotejados y 200 clasificaciones verificadas.** L025 incorpora ocho ejercicios del curso 2016-2017, archivo suplemente_junio_EXAMEN 4; se conservan los 192 anteriores. Las 200 soluciones contienen sólo comentarios, sin respuestas. Veinticinco de 84 candidatos cerrados, 59 pendientes. Fase de soluciones inactiva.

En L005-L025, el cotejo consta de segundas pasadas visuales completas del mismo autor, separadas de la escritura; no se atribuye a un segundo revisor distinto. L001-L004 conservan sus propias evidencias de revisión.

Los primeros dieciocho exámenes conservan límites de identificación documentados. L001-L004 tienen convocatoria/tipo de carpeta; L005/L006, reserva y letras de carpeta con convocatoria vacía. L007 confirma ordinaria y curso 2020-2021; L010 confirma extraordinaria y ese curso. L008/L009/L011/L012 sólo imprimen curso: convocatoria y tipo proceden de nombres. L012 conserva reserva B sólo con evidencia del nombre. **L013-L018 confirman curso 2019-2020; convocatoria, tipo, reserva y modelo quedan vacíos.** Los sufijos A-F de P_A/P_B/P_C/P_D/P_E/P_F no acreditan modelos ni opciones; tampoco hay tabla específicamente asociada para estos seis. Todos mantienen modelo vacío, identificación parcialmente confirmada y requiere_revision=si por esos límites. INC-006 conserva matrix de L006; INC-007, (1 puntos) de L015. L010 tiene tabla normal en su página 3. Las fechas del relato, como caducidad 2021 en C6 de L014, no datan el examen.

L007-L018 usan cuatro bloques A-D y números globales 1-8, sin opciones. Sus IDs son BA-E01/E02, BB-E03/E04, BC-E05/E06 y BD-E07/E08 por documento. El original exige cuatro ejercicios de al menos tres bloques y corrige los cuatro primeros que cumplen la regla; la colección reúne ocho para consulta, sin imponer esa regla a la selección didáctica. En L016 A1 imprime total 2.5, sin apartados; otros siete totales derivados de apartados y concordantes con criterios, sin añadir totales al cuerpo. B3 conserva dos derivadas bajo 1.2 y tangentes más corte bajo 1.3; B4a y D7a conservan sus preguntas con puntuación conjunta.

**Verificación L025:** 21 pruebas superadas en 33.915 s; 200 ejercicios válidos y 215 huellas originales coincidentes. Dos PDF de cuatro páginas, ocho páginas finales revisadas y ocho avisos pendientes en combinado. Los 192 enunciados, 192 soluciones y 48 PDF anteriores intactos (432 archivos). ZIP aislado compilado: ambas salidas L025 y enunciados L024 idénticos byte a byte; main.tex con texto y cuatro renderizados idénticos al PDF de preguntas. Comprobación local con Tectonic y caché; servicio Overleaf no probado.

## Abrir en Overleaf

1. Subir `dist/Selectividad_Overleaf.zip` como proyecto nuevo.
2. Elegir `main.tex` y **pdfLaTeX**.
3. Compilar. La selección inicial contiene los ocho ejercicios de L025 y sus instrucciones, no los 200 ejercicios del catálogo completo.

`config/seleccion.tex` carga `selecciones/l025-suplemente-junio-2017.tex`; reúne l025-ids.tex y contexto EXA-0025. Las selecciones anteriores conservan sus propios contextos y archivos.

Para compilar directamente un lote, elegir una de estas entradas:

| Sólo enunciados | Enunciados con avisos de soluciones pendientes |
|---|---|
| `l025-enunciados.tex` | `l025-con-soluciones.tex` |
| `l024-enunciados.tex` | `l024-con-soluciones.tex` |
| `l023-enunciados.tex` | `l023-con-soluciones.tex` |
| `l022-enunciados.tex` | `l022-con-soluciones.tex` |
| `l021-enunciados.tex` | `l021-con-soluciones.tex` |
| `l020-enunciados.tex` | `l020-con-soluciones.tex` |
| `l019-enunciados.tex` | `l019-con-soluciones.tex` |
| `l018-enunciados.tex` | `l018-con-soluciones.tex` |
| `l017-enunciados.tex` | `l017-con-soluciones.tex` |
| `l016-enunciados.tex` | `l016-con-soluciones.tex` |
| `l015-enunciados.tex` | `l015-con-soluciones.tex` |
| `l014-enunciados.tex` | `l014-con-soluciones.tex` |
| `l013-enunciados.tex` | `l013-con-soluciones.tex` |
| `l012-enunciados.tex` | `l012-con-soluciones.tex` |
| `l011-enunciados.tex` | `l011-con-soluciones.tex` |
| `l010-enunciados.tex` | `l010-con-soluciones.tex` |
| `l009-enunciados.tex` | `l009-con-soluciones.tex` |
| `l008-enunciados.tex` | `l008-con-soluciones.tex` |
| `l007-enunciados.tex` | `l007-con-soluciones.tex` |
| `l006-enunciados.tex` | `l006-con-soluciones.tex` |
| `l005-enunciados.tex` | `l005-con-soluciones.tex` |
| `l004-enunciados.tex` | `l004-con-soluciones.tex` |
| `l003-enunciados.tex` | `l003-con-soluciones.tex` |
| `l002-enunciados.tex` | `l002-con-soluciones.tex` |
| `l001-enunciados.tex` | `l001-con-soluciones.tex` |

Para una selección personalizada mediante `main.tex`, editar el modo en `config/opciones.tex`:

```tex
\providecommand{\ModoSalida}{enunciados}
% Alternativa: enunciados-y-soluciones.
```

Mantener una única definición activa. Una solución sin validar aparece como pendiente. La configuración normal conserva `IncluirBorradores=no`; una revisión de borradores exige seleccionarlos expresamente y activar ese control con valor `si`, sin cambiar sus estados ni habilitar respuestas.

La lista de IDs también se puede fijar en un archivo de selección:

```tex
\providecommand{\ListaEjercicios}{SEL-D0016-BA-E01,SEL-D0016-BD-E08}
```

El proyecto contiene sus recursos de composición y no necesita Python, los PDF originales, conexiones externas ni `shell-escape` para compilar. **Las pruebas se realizan localmente con Tectonic 0.17.0; no se acredita una ejecución en el servicio Overleaf.**

## Elegir ejercicios desde el catálogo local

Los scripts usan Python 3.10 o posterior. Generación, pruebas, validación de catálogo y empaquetado usan sólo la biblioteca estándar. Regenerar el inventario de PDF requiere además `pypdf`.

Ejecutar desde esta carpeta:

```text
python scripts/validar.py
python -m unittest discover -s tests -v
python scripts/generar_seleccion.py --tema T06 --salida selecciones/programacion-lineal.tex
python scripts/generar_seleccion.py --anio 2019 --salida selecciones/anio-2019.tex
python scripts/empaquetar.py
```

Actualmente el generador sin filtros selecciona 200 ejercicios: 16 de 2016, 24 de 2017, 16 de 2018 y 48 de cada año 2019, 2020 y 2021. T06 recupera 26; T03, 21; T05, dos; T09 más tamano-muestral, 44. L025: opción A/B cuatro, bloque A ninguno; beneficio-maximo sólo A1; asintotas sólo A2; seleccion-sin-reposicion sólo A3; intervalo-confianza-proporcion y cota-estricta sólo A4; compatibilidad-dimensiones y ecuacion-matricial sólo B1; clasificacion-discontinuidades sólo B2; union-sucesos y probabilidad-condicionada sólo B3; amplitud-intervalo sólo B4. Tamaño con cota-no-estricta ninguno; tamaño con cota-estricta sólo A4. IDs exactos, temas, epígrafes y etiquetas se combinan por intersección.

`--incluir-pendientes` permite incorporar registros pendientes o borradores a una selección de revisión; no modifica sus estados ni rellena contenidos. Tras generar una selección, cargar su ruta desde `config/seleccion.tex`. Mantener los archivos editoriales de L001-L025 separados de sus listas de IDs generadas evita perder sus títulos y contextos al regenerar.

Otras combinaciones disponibles:

```text
python scripts/generar_seleccion.py --tema T09 --tag tamano-muestral --salida selecciones/inferencia.tex
python scripts/generar_seleccion.py --examen EXA-0001 --opcion A --modo enunciados-y-soluciones --salida selecciones/l001-opcion-a.tex
python scripts/generar_seleccion.py --examen EXA-0007 --bloque D --salida selecciones/l007-bloque-d.tex
python scripts/generar_seleccion.py --examen EXA-0008 --bloque D --salida selecciones/l008-bloque-d.tex
python scripts/generar_seleccion.py --examen EXA-0009 --bloque D --salida selecciones/l009-bloque-d.tex
python scripts/generar_seleccion.py --examen EXA-0010 --bloque D --salida selecciones/l010-bloque-d.tex
python scripts/generar_seleccion.py --examen EXA-0011 --bloque D --salida selecciones/l011-bloque-d.tex
python scripts/generar_seleccion.py --examen EXA-0012 --bloque D --salida selecciones/l012-bloque-d.tex
python scripts/generar_seleccion.py --examen EXA-0013 --bloque D --salida selecciones/l013-bloque-d.tex
python scripts/generar_seleccion.py --examen EXA-0014 --bloque D --salida selecciones/l014-bloque-d.tex
python scripts/generar_seleccion.py --examen EXA-0015 --bloque D --salida selecciones/l015-bloque-d.tex
python scripts/generar_seleccion.py --examen EXA-0016 --bloque D --salida selecciones/l016-bloque-d.tex
```

Si una selección generada incluye un modo, éste tiene prioridad porque `main.tex` lee la selección antes de las opciones. Si no lo incluye, se usa `config/opciones.tex`. Un documento de comprobación también puede fijar el modo antes de cargar `main.tex`.

Las selecciones generadas guardan los IDs elegidos y mantienen el orden del CSV. Los criterios de elección se documentan en el registro del lote. Editar metadatos o estados requiere regenerar el registro LaTeX antes de compilar. El generador no escribe en `enunciados/` ni `soluciones/`.

La puntuación del índice es `2.5` en cada ejercicio de L001: en A1 está impresa como total; en los otros siete se obtiene sumando las puntuaciones de sus apartados. Ese total derivado no se ha añadido al texto LaTeX como si estuviera impreso en el original.

En L002, ninguno de los ocho ejercicios imprime un total `2.5`: los totales del índice se derivan de sus apartados y no se añaden al enunciado. En A1, el apartado a) vale **1 punto en conjunto** y contiene las afirmaciones anidadas 1) y 2); no se asigna un punto a cada afirmación. El vocabulario incorpora las nuevas etiquetas de L002, como `varianza-conocida`, `derivada-dada` y `primitiva-con-condicion`, sin cambiar los códigos de temas ni inferir modelos.

En L003, los ocho totales `2.5` del índice también se derivan de apartados y no se imprimen como totales añadidos. Se conservan especialmente la **varianza de 225 mg²** y la **amplitud total como máximo de 5 mg** de A4, la barra original de `P(A/B^c)` en B3 y el error **inferior a 0.03** de B4. El vocabulario distingue `amplitud-intervalo`, `cota-no-estricta` y `compatibilidad-dimensiones`, entre otras etiquetas, sin transformar las condiciones originales.

En L004, A1 no imprime puntuación total ni divide las preguntas en apartados puntuados: su `2.5` del índice procede **solo de los criterios oficiales vinculados**, no de una suma ni de un total visible en el enunciado. Los otros siete totales `2.5` se obtienen sumando apartados. Ninguno se añade al texto como total original. A4 estima la proporción de quienes **no habían probado** el helado y exige en b) error **inferior al 5 %**; B4 b) conserva el error **inferior a 500 horas**. Ambas cotas son estrictas.

En L005, A1 permanece completo con T04 principal y T06 secundario. `reserva=A` sólo describe la carpeta; convocatoria y modelo quedan vacíos. Se conservan el error inferior a 0.1 de A4, el dominio cerrado de B2 y el intervalo dado (18 475.7, 18 524.3) de B4, sin calcular respuestas. Todos los totales 2.5 del lote son derivados de apartados.

En L006, A1 imprime total 2.5; los otros siete se derivan de apartados. Se conserva matrix en B1b (INC-006) y el dato 120 en A4. La fracción de A2 y la notación de probabilidad de B3 están cotejadas sin transformarlas. La etiqueta dominio identifica una petición explícita; no contiene su respuesta.

En L007 se distinguen bloques de opciones. E1 imprime total 2.5; los otros siete totales se derivan de apartados. D7a conserva 1.5 en conjunto para dos cuestiones. Las etiquetas nuevas de áreas y muestreo describen contenidos sin resultados; B3/B4 permanecen como ejercicios completos multitema.

En L008 todos los totales 2.5 se derivan de apartados. La cabecera confirma el curso, mientras convocatoria/tipo/Modelo-4 sólo constan en nombres. D8 conserva varianza y suma de pesos, sin respuestas añadidas.

L009: A1a solicita formular sin resolver y A1b usa otro recinto sin añadir y≥0. D7b no explicita reposición ni orden de las muestras: se conserva el original y se revisará la convención antes de redactar soluciones. D8b limita la amplitud total a como máximo 0.2; no se transforma en cota estricta ni se sustituye amplitud por semiancho. Las nuevas etiquetas describen contenidos sin respuestas.

L010 conserva 2^(x+1) en B3 y su petición de integral definida entre −2 y 2, sin convertirla en área por la rúbrica. Marzo de 2020 en B4 es contexto temporal, no año del examen. D8 conserva desviación típica 4 y doce datos en su orden original; no se sustituye por varianza ni por una media calculada. La página 3 del original es tabla normal, registrada como auxiliar y no como otro ejercicio.

L011 conserva tres cuestiones bajo 2 puntos en B4a y tres bajo 1.5 en D7b, sin repartir puntos ni separar IDs. D7a no explicita reposición ni orden de las muestras: conservarlo y revisar la convención en la fase futura. D7b compara intervalos con una muestra mayor de igual proporción, sin inventar un nuevo tamaño. D8 mantiene varianza 81, dieciséis datos y confianza 95 % en a frente a 98 % en b. La etiqueta `comparacion-intervalos` no anticipa la respuesta.

L012 conserva «superarse los 2 millones» en A1 y «a lo sumo» 2 % en D7b, sin intercambiar cotas estrictas e inclusivas. D7 cambia confianza 94 a 97 %, mientras D8 cambia 97 a 94 % y da desviación típica 7 cm. B3 conserva las condiciones distintas de a por apartado; C6a sus dos preguntas bajo 1 punto. El espaciado del modo combinado de L012 se ajusta localmente para evitar una página final con sólo un aviso, sin cambiar contenido ni archivos compartidos.

L013 conserva 2+a/(x−1) en B3 y el reemplazo de una bola por seis del otro color en C5. D7 no explicita reposición ni orden: la convención deberá documentarse al resolver en fase futura, sin añadirla al enunciado. D8 mantiene varianza 4, los 16 tiempos en orden, confianza 97.5 % en a y 90 % en b, y error a lo sumo 0.3 minutos. Nueva etiqueta descriptiva asintotas, sin anticipar resultados. No se copian respuestas de los criterios.

L014 conserva todas las preguntas de A1 bajo 2.5 puntos conjuntos, a=2 en A2b y a=0 en A2c, y las funciones distintas f/g en B3. D7 mantiene varianza 9 y error menor a 1.5 euros; D8 da desviación típica 3, muestra 36, intervalo (6.04,8) al 95 %, cambia n a 49 en c y aumenta confianza sin indicar un nuevo nivel en d. Nueva etiqueta comparacion-error para describir esas peticiones sin anticipar resultados. Ninguna respuesta de los criterios se incorpora al banco.

L015 conserva literalmente (1 puntos) en B3a, documentado en INC-007 sin sic ni corrección silenciosa. A2a exige formular sin resolver; A2b da otro recinto. B3 mantiene a=4 y b=−3 sólo en b/c y la condición F(2)=10; B4 conserva dos derivadas bajo 1.2 puntos conjuntos. D7 mantiene varianza 7.84, doce datos en orden, confianza 93.5 % en a y 99 % con n=50 en b. D8 mantiene miles de euros, desviación típica 5, cota inclusiva de una unidad y probabilidad de la media muestral con μ=24 sólo en c. Nueva etiqueta probabilidad-media-muestral, sin anticipar respuestas.

L016 conserva ax+1/2 en B4 y el exponente x³ de e en B3, t minúscula y O mayúscula en A2 y las cursivas de los postres de A1. D7 mantiene varianza 225 y no añade un nivel de confianza al intervalo dado; c exige error inferior a 3 km. D8 da desviación típica 2 meses, nueve datos en orden con 1.0 y 6.0, confianza 95 % en a y 97 % en b, con cota inclusiva no exceda de un mes. Nueva etiqueta interseccion-rectas y T05 secundario de B3 por el punto de corte solicitado, representable mediante un sistema lineal; no impone un método ni anticipa el punto.

## Documentación y datos

- [Plan y diario](PLAN_DE_TRABAJO.md).
- [Inventario de las fuentes](docs/INVENTARIO_FUENTES.md) y [CSV completo](datos/fuentes.csv).
- [Índice de ejercicios](datos/ejercicios.csv) y [fichas de exámenes](datos/examenes.csv).
- [Diccionario de campos](docs/DICCIONARIO_CSV.md).
- [Criterios de transcripción](docs/CRITERIOS_TRANSCRIPCION.md).
- [Tandas de trabajo](docs/LOTES_DE_TRANSCRIPCION.md).
- [Cierre y verificación de L001](docs/lotes/L001_2019_TITULAR_JUNIO.md).
- [Registro y verificación de L002](docs/lotes/L002_2019_TITULAR_SEPTIEMBRE.md).
- [Registro y verificación de L003](docs/lotes/L003_2019_SUPLENTE_JUNIO.md).
- [Registro y verificación de L004](docs/lotes/L004_2019_SUPLENTE_SEPTIEMBRE.md).
- [Registro y verificación de L005](docs/lotes/L005_2019_RESERVA_A.md).
- [Registro y verificación de L006](docs/lotes/L006_2019_RESERVA_B.md).
- [Registro y verificación de L007](docs/lotes/L007_2021_ORDINARIA.md).
- [Registro y verificación de L008](docs/lotes/L008_2021_SUPLENTE.md).
- [Registro y verificación de L009](docs/lotes/L009_2021_RESERVA.md).
- [Registro y verificación de L010](docs/lotes/L010_2021_EXTRAORDINARIA.md).
- [Registro y verificación de L011](docs/lotes/L011_2021_SUPLENTE_EXTRA.md).
- [Registro y verificación de L012](docs/lotes/L012_2021_RESERVA_B_EXTRA.md).
- [Registro y verificación de L013](docs/lotes/L013_2020_P_A.md).
- [Registro y verificación de L014](docs/lotes/L014_2020_P_B.md).
- [Registro y verificación de L015](docs/lotes/L015_2020_P_C.md).
- [Registro y verificación de L016](docs/lotes/L016_2020_P_D.md).
- [Registro y verificación de L017](docs/lotes/L017_2020_P_E.md).
- [Registro y verificación de L018](docs/lotes/L018_2020_P_F.md).
- [Registro y verificación de L019](docs/lotes/L019_2018_reserva_a.md).
- [Registro y verificación de L020](docs/lotes/L020_2018_reserva_b.md).
- [Registro y verificación de L021](docs/lotes/L021_2017_reserva_a.md).
- [Registro y verificación de L022](docs/lotes/L022_2016_reserva_a.md).
- [Registro y verificación de L023](docs/lotes/L023_2016_reserva_b.md).
- [Registro y verificación de L024](docs/lotes/L024_2017_reserva_b.md).
- [Registro y verificación de L025](docs/lotes/L025_2017_suplemente_junio.md).
- [Verificación histórica de la preparación](docs/VERIFICACION_PREPARACION.md).

Los CSV usan UTF-8 con marca BOM, separador coma y comillas cuando hacen falta. Dentro de un campo multivalor se usa `|`. Para abrirlos en Excel con configuración española, importar como UTF-8 y seleccionar explícitamente la coma como delimitador.

## Relación con el libro interactivo

Este banco es un proyecto aparte de `../Web_Matematicas_CCSS_II/`. Los originales no se alteran y no se han cambiado el diseño ni los contenidos de la web. Una integración futura podrá usar IDs y etiquetas del CSV para publicar recursos; el banco actual no incorpora autenticación, publicación ni descarga de respuestas desde la web.

## Continuación prevista

**Siguiente: L026**, fuente candidata `SRC-251685BD691B`, archivo `Selectividad/matematicas_aplicadas/suplemente_septiembre_EXAMEN 4-ANDALUCÍA.pdf`. Confirmar curso, naturaleza y auxiliares desde el contenido, conservando el nombre original.

La entrada principal `main.tex` del ZIP aislado compila con L025, con texto y cuatro renderizados idénticos al PDF de preguntas.
## Acceso individual y relaciones

Acceso individual: [índice de los 200 ejercicios](INDICE_EJERCICIOS.md), con enlace directo al enunciado, procedencia, temas, epígrafes y etiquetas; [guía de relaciones dirigidas](docs/GUIA_RELACIONES.md). Ejemplo listo para compilar: `relacion-ejemplo.tex`. Las selecciones combinan IDs sin copiar contenidos; se conserva el orden del catálogo. Las etiquetas de unidades y comparación de tamaño muestral describen lo solicitado, sin resolverlo.

## Procedencia y estructura de L019

**Identificación L019:** curso 2017-2018 confirmado por ambas cabeceras, año 2018. Reserva A sólo por carpeta, sin convocatoria ni modelo acreditados. Opciones A/B impresas, ejercicios 1-4 por opción; no bloques. Cabecera sin ámbito territorial impreso: no se añade Andalucía a su transcripción. Criterios concordantes y tabla normal genérica asociada por carpeta, sin año propio. Modelo vacío y requiere_revision=si por estos límites. Los metadatos y evidencias anteriores conservan su alcance; L013-L018 siguen siendo curso 2019-2020.

## Procedencia y estructura de L020

**Identificación L020:** curso 2017-2018 confirmado por ambas cabeceras; reserva B sólo por carpeta, convocatoria y modelo vacíos. Opciones A/B impresas, cuatro ejercicios por opción; sin bloques ni ámbito territorial impreso. Criterios y tabla normal genérica asociados por carpeta. INC-008 conserva la discrepancia a/b/b de criterios frente a a/b/c del examen; el enunciado sigue a/b/c y el literal (1punto). Identificación parcialmente confirmada; requiere_revision=si por estos límites. T05 secundario de B1 por el sistema de ecuaciones matriciales, interpretable por entradas sin imponer un procedimiento. L013-L018 conservan curso 2019-2020; L019 su evidencia propia.

## Procedencia y estructura de L021

**Identificación L021:** UNIVERSIDADES DE ANDALUCÍA y curso 2016-2017 impresos en ambas cabeceras; año 2017 confirmado. Reserva A sólo del nombre del archivo, convocatoria/modelo vacíos y número 3 sin valor de modelo acreditado. Opciones A/B con ejercicios 1-4, sin bloques. Criterios SRC-4DFB0FF51804 concordantes; fuente_tabla vacía al no haber tabla específicamente asociada. Todos los totales 2.5 son derivados de apartados, sin añadirlos al cuerpo. Identificación parcialmente confirmada y requiere_revision=si por límites de metadatos.

## Procedencia y estructura de L022

**Identificación L022:** UNIVERSIDADES DE ANDALUCÍA, PRUEBA DE ACCESO A LA UNIVERSIDAD y curso 2015-2016 impresos; año 2016 confirmado. Reserva A sólo del nombre; convocatoria/modelo vacíos y número 5 sin valor de modelo acreditado. Opciones A/B de cuatro ejercicios, sin bloques. Criterios SRC-5F93069BAB36 concordantes; sin tabla específicamente asociada. A2/B1/B4 imprimen 2.5, otros cinco totales derivados. INC-009: A4b no explicita afijación proporcional; conservar y revisar al resolver, sin añadir supuestos. B4 contraste histórico en T09.1/T08.3 con etiquetas específicas, sin inventar epígrafe ni excluirlo. Requiere_revision=si por metadatos y, en A4, esa limitación docente.

## Procedencia y estructura de L023

**Identificación L023:** curso 2015-2016 y UNIVERSIDADES DE ANDALUCÍA impresos; reserva B sólo del nombre, convocatoria/modelo vacíos y 2 sin valor de modelo acreditado. Opciones A/B de cuatro ejercicios, sin bloques. Candidato SRC-B1EA93903484 rechazado: imprime 2016-2017 y otro contenido/puntuación. Búsqueda textual en criterios inventariados sin identificar otro concordante, sin afirmar ausencia absoluta. fuente_criterios y fuente_tabla vacías; asociación auxiliar pendiente. Totales 2.5 derivados sólo de apartados del examen, sin acreditarlos por criterios. Contraste histórico A4 conservado en T09.1/T08.3. Requiere_revision=si por metadatos y auxiliares.

## Procedencia y estructura de L024

**Identificación L024:** curso 2016-2017 impreso; reserva B sólo del nombre, convocatoria/modelo vacíos y 2 sin valor de modelo acreditado. Opciones A/B de cuatro ejercicios, sin bloques. Criterios SRC-B1EA93903484 asociados por curso, contenido y puntuaciones; siguen sin asociarse a L023 (curso distinto). Sin tabla específicamente asociada. A1 imprime total 2.5; los siete restantes derivan de apartados y concuerdan con criterios, sin añadirlos al cuerpo. A4 pide representación proporcional explícita, sin afirmar muestreo aleatorio. Requiere_revision=si por límites de metadatos.

## Procedencia y estructura de L025

**Identificación L025:** curso 2016-2017 impreso; suplemente_junio sólo del nombre, sin acreditar convocatoria ordinaria ni fecha. Convocatoria, tipo, reserva y modelo vacíos; 4 no acredita modelo. Opciones A/B de cuatro ejercicios, sin bloques. Criterios SRC-57188FF1F0A8 asociados por curso, contenido y puntuaciones. Sin tabla específicamente asociada. A1 imprime total 2.5; los siete restantes derivan de apartados y concuerdan con criterios, sin añadirlos al cuerpo. Requiere_revision=si por límites de metadatos. Nuevas etiquetas: seleccion-sin-reposicion y clasificacion-discontinuidades. B4 pide amplitud total e intervalo, no tamaño muestral; A4 mantiene error estrictamente inferior a0.03.
