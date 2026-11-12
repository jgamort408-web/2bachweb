# Selectividad: banco LaTeX modular

Proyecto preparado para **Overleaf** y para trabajar por tandas con los originales de `../Selectividad/`. La planificación y el seguimiento están en [PLAN_DE_TRABAJO.md](PLAN_DE_TRABAJO.md).

**L001-L084 cerradas: 640 enunciados únicos cotejados y 640 clasificaciones verificadas.** Son 83 exámenes canónicos y 84 de 84 candidatos cerrados; ninguno pendiente de transcripción. L057 es una reedición sin ejercicios nuevos. L084 añade ocho enunciados desde DOC convertidos, curso 2011-2012 impreso. S001-S084 incorporan 640 soluciones validadas. Quedan 0 por redactar. La transcripción completa permanece intacta.

En L005-L056 y L058-L084, el cotejo consta de segundas pasadas visuales completas del mismo autor, separadas de la escritura; no se atribuye a un segundo revisor distinto. L001-L004 conservan sus propias evidencias de revisión.

Los primeros dieciocho exámenes conservan límites de identificación documentados. L001-L004 tienen convocatoria/tipo de carpeta; L005/L006, reserva y letras de carpeta con convocatoria vacía. L007 confirma ordinaria y curso 2020-2021; L010 confirma extraordinaria y ese curso. L008/L009/L011/L012 sólo imprimen curso: convocatoria y tipo proceden de nombres. L012 conserva reserva B sólo con evidencia del nombre. **L013-L018 confirman curso 2019-2020; convocatoria, tipo, reserva y modelo quedan vacíos.** Los sufijos A-F de P_A/P_B/P_C/P_D/P_E/P_F no acreditan modelos ni opciones; tampoco hay tabla específicamente asociada para estos seis. Todos mantienen modelo vacío, identificación parcialmente confirmada y requiere_revision=si por esos límites. INC-006 conserva matrix de L006; INC-007, (1 puntos) de L015. L010 tiene tabla normal en su página 3. Las fechas del relato, como caducidad 2021 en C6 de L014, no datan el examen.

L007-L018 usan cuatro bloques A-D y números globales 1-8, sin opciones. Sus IDs son BA-E01/E02, BB-E03/E04, BC-E05/E06 y BD-E07/E08 por documento. El original exige cuatro ejercicios de al menos tres bloques y corrige los cuatro primeros que cumplen la regla; la colección reúne ocho para consulta, sin imponer esa regla a la selección didáctica. En L016 A1 imprime total 2.5, sin apartados; otros siete totales derivados de apartados y concordantes con criterios, sin añadir totales al cuerpo. B3 conserva dos derivadas bajo 1.2 y tangentes más corte bajo 1.3; B4a y D7a conservan sus preguntas con puntuación conjunta.

**Verificación L084:** 21 pruebas superadas en 507.023s;640 ejercicios y215 fuentes válidas. Cuatro páginas fuente y7 páginas finales revisadas;PDF de3/4páginas. Los1428 archivos anteriores intactos:632 enunciados,632 soluciones y164 PDF. ZIP aislado de1908 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.

## Abrir en Overleaf

1. Subir `dist/Selectividad_Overleaf.zip` como proyecto nuevo.
2. Elegir `main.tex` y **pdfLaTeX**.
3. Compilar. La selección inicial contiene los seis ejercicios de L078 y sus instrucciones, no los 640 ejercicios del catálogo completo.

La selección inicial carga `selecciones/l084-examen6-2012.tex`,lista l084-ids.tex y contexto EXA-0084. Entradas l084-enunciados.tex y l084-con-soluciones.tex; anteriores conservadas y632 soluciones pendientes, con8 validadas. En relaciones nuevas vaciar ContextoSeleccion según la guía.

Para compilar directamente un lote, elegir una de estas entradas:

| Sólo enunciados | Enunciados con avisos de soluciones pendientes |
|---|---|
| `s084-enunciados.tex` | `s084-con-soluciones.tex` |
| `s083-enunciados.tex` | `s083-con-soluciones.tex` |
| `s082-enunciados.tex` | `s082-con-soluciones.tex` |
| `s081-enunciados.tex` | `s081-con-soluciones.tex` |
| `s080-enunciados.tex` | `s080-con-soluciones.tex` |
| `s079-enunciados.tex` | `s079-con-soluciones.tex` |
| `s078-enunciados.tex` | `s078-con-soluciones.tex` |
| `s077-enunciados.tex` | `s077-con-soluciones.tex` |
| `s076-enunciados.tex` | `s076-con-soluciones.tex` |
| `s075-enunciados.tex` | `s075-con-soluciones.tex` |
| `s074-enunciados.tex` | `s074-con-soluciones.tex` |
| `s073-enunciados.tex` | `s073-con-soluciones.tex` |
| `s072-enunciados.tex` | `s072-con-soluciones.tex` |
| `s071-enunciados.tex` | `s071-con-soluciones.tex` |
| `s070-enunciados.tex` | `s070-con-soluciones.tex` |
| `s069-enunciados.tex` | `s069-con-soluciones.tex` |
| `s068-enunciados.tex` | `s068-con-soluciones.tex` |
| `s067-enunciados.tex` | `s067-con-soluciones.tex` |
| `s066-enunciados.tex` | `s066-con-soluciones.tex` |
| `s065-enunciados.tex` | `s065-con-soluciones.tex` |
| `s064-enunciados.tex` | `s064-con-soluciones.tex` |
| `s063-enunciados.tex` | `s063-con-soluciones.tex` |
| `s062-enunciados.tex` | `s062-con-soluciones.tex` |
| `s061-enunciados.tex` | `s061-con-soluciones.tex` |
| `s060-enunciados.tex` | `s060-con-soluciones.tex` |
| `s059-enunciados.tex` | `s059-con-soluciones.tex` |
| `s058-enunciados.tex` | `s058-con-soluciones.tex` |
| `s057-enunciados.tex` | `s057-con-soluciones.tex` |
| `s056-enunciados.tex` | `s056-con-soluciones.tex` |
| `s055-enunciados.tex` | `s055-con-soluciones.tex` |
| `s054-enunciados.tex` | `s054-con-soluciones.tex` |
| `s053-enunciados.tex` | `s053-con-soluciones.tex` |
| `s052-enunciados.tex` | `s052-con-soluciones.tex` |
| `s051-enunciados.tex` | `s051-con-soluciones.tex` |
| `s050-enunciados.tex` | `s050-con-soluciones.tex` |
| `s049-enunciados.tex` | `s049-con-soluciones.tex` |
| `s048-enunciados.tex` | `s048-con-soluciones.tex` |
| `s047-enunciados.tex` | `s047-con-soluciones.tex` |
| `s046-enunciados.tex` | `s046-con-soluciones.tex` |
| `s045-enunciados.tex` | `s045-con-soluciones.tex` |
| `s044-enunciados.tex` | `s044-con-soluciones.tex` |
| `s043-enunciados.tex` | `s043-con-soluciones.tex` |
| `s042-enunciados.tex` | `s042-con-soluciones.tex` |
| `s041-enunciados.tex` | `s041-con-soluciones.tex` |
| `s040-enunciados.tex` | `s040-con-soluciones.tex` |
| `s039-enunciados.tex` | `s039-con-soluciones.tex` |
| `s038-enunciados.tex` | `s038-con-soluciones.tex` |
| `s037-enunciados.tex` | `s037-con-soluciones.tex` |
| `s036-enunciados.tex` | `s036-con-soluciones.tex` |
| `s035-enunciados.tex` | `s035-con-soluciones.tex` |
| `s034-enunciados.tex` | `s034-con-soluciones.tex` |
| `s033-enunciados.tex` | `s033-con-soluciones.tex` |
| `s032-enunciados.tex` | `s032-con-soluciones.tex` |
| `s031-enunciados.tex` | `s031-con-soluciones.tex` |
| `s030-enunciados.tex` | `s030-con-soluciones.tex` |
| `s029-enunciados.tex` | `s029-con-soluciones.tex` |
| `s028-enunciados.tex` | `s028-con-soluciones.tex` |
| `s027-enunciados.tex` | `s027-con-soluciones.tex` |
| `s026-enunciados.tex` | `s026-con-soluciones.tex` |
| `s025-enunciados.tex` | `s025-con-soluciones.tex` |
| `s024-enunciados.tex` | `s024-con-soluciones.tex` |
| `s023-enunciados.tex` | `s023-con-soluciones.tex` |
| `s022-enunciados.tex` | `s022-con-soluciones.tex` |
| `s021-enunciados.tex` | `s021-con-soluciones.tex` |
| `s020-enunciados.tex` | `s020-con-soluciones.tex` |
| `s019-enunciados.tex` | `s019-con-soluciones.tex` |
| `s018-enunciados.tex` | `s018-con-soluciones.tex` |
| `s017-enunciados.tex` | `s017-con-soluciones.tex` |
| `s016-enunciados.tex` | `s016-con-soluciones.tex` |
| `s015-enunciados.tex` | `s015-con-soluciones.tex` |
| `s014-enunciados.tex` | `s014-con-soluciones.tex` |
| `s013-enunciados.tex` | `s013-con-soluciones.tex` |
| `s012-enunciados.tex` | `s012-con-soluciones.tex` |
| `s011-enunciados.tex` | `s011-con-soluciones.tex` |
| `s010-enunciados.tex` | `s010-con-soluciones.tex` |
| `s009-enunciados.tex` | `s009-con-soluciones.tex` |
| `s008-enunciados.tex` | `s008-con-soluciones.tex` |
| `s007-enunciados.tex` | `s007-con-soluciones.tex` |
| `s006-enunciados.tex` | `s006-con-soluciones.tex` |
| `s005-enunciados.tex` | `s005-con-soluciones.tex` |
| `s004-enunciados.tex` | `s004-con-soluciones.tex` |
| `s003-enunciados.tex` | `s003-con-soluciones.tex` |
| `s002-enunciados.tex` | `s002-con-soluciones.tex` |
| `s001-enunciados.tex` | `s001-con-soluciones.tex` |
| `l084-enunciados.tex` | `l084-con-soluciones.tex` |
| `l083-enunciados.tex` | `l083-con-soluciones.tex` |
| `l082-enunciados.tex` | `l082-con-soluciones.tex` |
| `l081-enunciados.tex` | `l081-con-soluciones.tex` |
| `l080-enunciados.tex` | `l080-con-soluciones.tex` |
| `l079-enunciados.tex` | `l079-con-soluciones.tex` |
| `l078-enunciados.tex` | `l078-con-soluciones.tex` |
| `l077-enunciados.tex` | `l077-con-soluciones.tex` |
| `l076-enunciados.tex` | `l076-con-soluciones.tex` |
| `l075-enunciados.tex` | `l075-con-soluciones.tex` |
| `l074-enunciados.tex` | `l074-con-soluciones.tex` |
| `l073-enunciados.tex` | `l073-con-soluciones.tex` |
| `l072-enunciados.tex` | `l072-con-soluciones.tex` |
| `l071-enunciados.tex` | `l071-con-soluciones.tex` |
| `l070-enunciados.tex` | `l070-con-soluciones.tex` |
| `l069-enunciados.tex` | `l069-con-soluciones.tex` |
| `l068-enunciados.tex` | `l068-con-soluciones.tex` |
| `l067-enunciados.tex` | `l067-con-soluciones.tex` |
| `l066-enunciados.tex` | `l066-con-soluciones.tex` |
| `l065-enunciados.tex` | `l065-con-soluciones.tex` |
| `l064-enunciados.tex` | `l064-con-soluciones.tex` |
| `l063-enunciados.tex` | `l063-con-soluciones.tex` |
| `l062-enunciados.tex` | `l062-con-soluciones.tex` |
| `l061-enunciados.tex` | `l061-con-soluciones.tex` |
| `l060-enunciados.tex` | `l060-con-soluciones.tex` |
| `l059-enunciados.tex` | `l059-con-soluciones.tex` |
| `l058-enunciados.tex` | `l058-con-soluciones.tex` |
| `l056-enunciados.tex` | `l056-con-soluciones.tex` |
| `l055-enunciados.tex` | `l055-con-soluciones.tex` |
| `l054-enunciados.tex` | `l054-con-soluciones.tex` |
| `l053-enunciados.tex` | `l053-con-soluciones.tex` |
| `l052-enunciados.tex` | `l052-con-soluciones.tex` |
| `l051-enunciados.tex` | `l051-con-soluciones.tex` |
| `l050-enunciados.tex` | `l050-con-soluciones.tex` |
| `l049-enunciados.tex` | `l049-con-soluciones.tex` |
| `l048-enunciados.tex` | `l048-con-soluciones.tex` |
| `l047-enunciados.tex` | `l047-con-soluciones.tex` |
| `l046-enunciados.tex` | `l046-con-soluciones.tex` |
| `l045-enunciados.tex` | `l045-con-soluciones.tex` |
| `l044-enunciados.tex` | `l044-con-soluciones.tex` |
| `l043-enunciados.tex` | `l043-con-soluciones.tex` |
| `l042-enunciados.tex` | `l042-con-soluciones.tex` |
| `l041-enunciados.tex` | `l041-con-soluciones.tex` |
| `l040-enunciados.tex` | `l040-con-soluciones.tex` |
| `l039-enunciados.tex` | `l039-con-soluciones.tex` |
| `l038-enunciados.tex` | `l038-con-soluciones.tex` |
| `l037-enunciados.tex` | `l037-con-soluciones.tex` |
| `l036-enunciados.tex` | `l036-con-soluciones.tex` |
| `l035-enunciados.tex` | `l035-con-soluciones.tex` |
| `l034-enunciados.tex` | `l034-con-soluciones.tex` |
| `l033-enunciados.tex` | `l033-con-soluciones.tex` |
| `l032-enunciados.tex` | `l032-con-soluciones.tex` |
| `l031-enunciados.tex` | `l031-con-soluciones.tex` |
| `l030-enunciados.tex` | `l030-con-soluciones.tex` |
| `l029-enunciados.tex` | `l029-con-soluciones.tex` |
| `l028-enunciados.tex` | `l028-con-soluciones.tex` |
| `l027-enunciados.tex` | `l027-con-soluciones.tex` |
| `l026-enunciados.tex` | `l026-con-soluciones.tex` |
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

Actualmente el generador sin filtros selecciona 640 ejercicios: 48 de 2012 y 592 de otros años. T06 recupera 86; T05,8; T03,21; T09 más tamano-muestral,99. EXA-0084 contiene cuatro ejercicios por opción de 2.5 puntos. Curso 2011-2012 impreso; convocatoria,tipo,reserva y modelo vacíos. Criterios DOC separados; tabla normal asociada por carpeta, sin cita expresa.

`--incluir-pendientes` permite incorporar registros pendientes o borradores a una selección de revisión; no modifica sus estados ni rellena contenidos. Tras generar una selección, cargar su ruta desde `config/seleccion.tex`. Mantener los archivos editoriales de L001-L056 separados de sus listas de IDs generadas evita perder sus títulos y contextos al regenerar.

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

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

La entrada principal `main.tex` del ZIP aislado compila con L056, con texto y cuatro renderizados idénticos al PDF de preguntas.
## Acceso individual y relaciones

Acceso individual: [índice de los 640 ejercicios](INDICE_EJERCICIOS.md), con enlace directo al enunciado, procedencia, temas, epígrafes y etiquetas; [guía de relaciones dirigidas](docs/GUIA_RELACIONES.md). Ejemplo listo para compilar: `relacion-ejemplo.tex`. Las selecciones combinan IDs sin copiar contenidos; se conserva el orden del catálogo. Las etiquetas de unidades y comparación de tamaño muestral describen lo solicitado, sin resolverlo.

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

## Procedencia y estructura de L026

Curso2015-2016 impreso; suplemente_septiembre sólo del nombre, sin acreditar convocatoria extraordinaria ni fecha. Convocatoria/tipo/reserva/modelo vacíos;4 no acredita modelo. Criterios SRC-0CCBF6368E87 concordantes por curso/contenido/puntos; sin tabla específica. B4 imprime2.5;otros siete totales derivados de apartados, corroborados con criterios. Contraste histórico B4 conservado en T09.1/T08.3, sin epígrafe inventado.

La fase posterior de resoluciones sigue [este plan](docs/FASE_SOLUCIONES.md). La autorización del27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

- [Registro y verificación de L026](docs/lotes/L026_2016_suplemente_septiembre.md).

## Procedencia y estructura de L027

Curso 2016-2017 impreso; suplemente_septiembre sólo del nombre, sin acreditar convocatoria extraordinaria ni fecha. Convocatoria/tipo/reserva/modelo vacíos; 6 no acredita modelo. Criterios SRC-FC94E50B392D concordantes por contenido, puntuaciones y cabecera visible 2016-2017; la extracción incluye un curso antiguo oculto que no se usa para datar. Sin tabla específica. Ocho totales 2.5 derivados de apartados y corroborados con criterios, sin añadirlos al cuerpo. A4: error no superior a 0.04 inclusivo; B4: error menor que 2 estricto.

La fase posterior de resoluciones sigue [este plan](docs/FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

- [Registro y verificación de L027](docs/lotes/L027_2017_suplemente_septiembre.md).

## Procedencia y estructura de L028

Curso 2017-2018 impreso; tipo suplente y junio sólo de carpeta, sin acreditar convocatoria ordinaria ni fecha. Convocatoria/reserva/modelo vacíos; no hay modelo impreso. Cabecera sin UNIVERSIDADES DE ANDALUCÍA; instrucción final sin el uso de la misma. Criterios SRC-D3E2788903E8 concordantes. Tabla normal SRC-03976ECEE4F8 asociada por carpeta y revisada por imagen; genérica, copia exacta ya inventariada, no ejercicio ni tabla fechada exclusiva. Ocho totales 2.5 derivados de apartados y corroborados con criterios. B3 exige orden y sin reposición; A4 error máximo 2 inclusivo y B4 menor que 0.02 estricto.

La fase posterior de resoluciones sigue [este plan](docs/FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

- [Registro y verificación de L028](docs/lotes/L028_2018_suplente_junio.md).

## Procedencia y estructura de L029

Curso 2017-2018 impreso; tipo suplente y septiembre sólo de carpeta, sin acreditar convocatoria extraordinaria ni fecha. Convocatoria/reserva/modelo vacíos. Criterios SRC-6D24250C0DCF concordantes; tabla SRC-DF745539FC83 normal acumulada genérica de misma carpeta, copia exacta inventariada y revisada por imagen. B1 imprime total2.5 sin apartados; otros siete derivados de apartados y corroborados con criterios. B2 conserva e^(5x)(x²−5)^3 y (x³+1)^2/ln(x²+2), sin respuestas. A4 cambia confianza95→99%; B4 cambia proporción a0.25 y confianza a92.5% con error inferior0.03 estricto.

La fase posterior de resoluciones sigue [este plan](docs/FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

- [Registro y verificación de L029](docs/lotes/L029_2018_suplente_septiembre.md).

## Procedencia y estructura de L030

Curso 2017-2018 impreso; titular y junio sólo de carpeta, sin acreditar convocatoria ordinaria ni fecha. Convocatoria/reserva/modelo vacíos. Criterios SRC-969E0FA37C16 concordantes; tabla SRC-7CE2805F3B2B normal acumulada genérica de misma carpeta, copia exacta ya inventariada. Ocho totales2.5 derivados de apartados y corroborados, sin añadirlos al cuerpo. A1a pide formular sin resolver y A1b trata otro recinto. INC-010: A4 no explicita reposición ni orden de las muestras; conservar el texto y revisar convención antes de redactar solución. No se añade hipótesis ni se anticipan respuestas. B1 conserva XA=2B^t+I_2; B4 cambia confianza97→96 y error no superior2% inclusivo.

La fase posterior de resoluciones sigue [este plan](docs/FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

- [Registro y verificación de L030](docs/lotes/L030_2018_titular_junio.md).

## Procedencia y estructura de L031

Curso 2015-2016 impreso; tipo titular y junio sólo del nombre, sin acreditar convocatoria ordinaria ni fecha. Convocatoria/reserva/modelo vacíos; número6 del nombre no acredita modelo. Criterios SRC-06A33DC598A0 concordantes. Sin tabla específicamente asociada. B1 imprime total2.5 sin apartados;otros siete derivados de apartados y corroborados, sin añadir totales al cuerpo. A1 pide interpretar los elementos de productos matriciales; B2 pide interpretar la asíntota horizontal. A4 mantiene error inferior1 estricto. B4 distingue n64 de n100 y probabilidad de media de un intervalo de confianza.

La fase posterior de resoluciones sigue [este plan](docs/FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

- [Registro y verificación de L031](docs/lotes/L031_2016_titular_junio.md).

## Procedencia y estructura de L032

Curso visible 2016-2017, año2017. El texto oculto 2015-2016 no se usa para fechar. Titular/junio sólo del nombre; 5 no acredita modelo. Criterios SRC-3B05F22DF1BE concordantes; sin tabla específica. Ocho IDs D0032, archivos individuales y soluciones de sólo comentarios. [Informe](docs/lotes/L032_2017_titular_junio.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L033

Curso 2017-2018 visible, año 2018. Titular/septiembre sólo de carpeta; convocatoria, reserva y modelo vacíos. Criterios SRC-42767DB22262 concordantes, salvo tercera etiqueta b) repetida en B2 frente a c) del examen. A4c conserva afijación proporcional con 121 y razones 1:2:3; criterio de redondeo reservado a la resolución futura. Tabla Normal genérica SRC-91337370C760 de la misma carpeta, sin vínculo explícito de fecha/modelo. [Informe](docs/lotes/L033_2018_titular_septiembre.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L034

Curso 2015-2016 visible, año 2016. La fuente preliminar otro contiene un examen completo A/B, sin criterios combinados. Titular/septiembre sólo del nombre; 1 no acredita modelo. Convocatoria, reserva y modelo vacíos. Criterios SRC-E33A07DB6B02 concordantes; sin tabla específica. INC-013: B4b no explicita reposición ni orden; revisar convención antes de resolver, sin añadir hipótesis al enunciado. [Informe](docs/lotes/L034_2016_titular_septiembre.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L035

Curso 2016-2017 visible, año2017. Titular/septiembre sólo del nombre;1 no acredita modelo. Convocatoria,reserva,modelo vacíos. Criterios SRC-15FF6FFF34D6 concordantes; sin tabla específica. A4 conserva error no superior5años inclusivo y B4 error inferior0.03 estricto con confianza92.5%. Urna con sustitución por dos del otro color; sin añadir hipótesis ni anticipar respuestas. Nuevas etiquetas urna-dinamica e igualdad-derivadas. [Informe](docs/lotes/L035_2017_titular_septiembre.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L036

Curso 2014-2015 visible, año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua1 sólo del nombre. Examen SRC-D4199CAE2EC3 y alias SRC-96902844B9A7 idénticos; criterios SRC-B7CB1F935609 y alias SRC-022F67F8B3D8 idénticos. Las cuatro rutas quedan en el inventario; ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A4 conserva un contraste histórico unilateral de media bajo T09.1/T08.3,con significación1% y H0:mu<=170;sin inventar un epígrafe. B4 es IC90 y error no superior0.1horas. Etiqueta comparacion-reposicion para A3. [Informe](docs/lotes/L036_2015_Ua1.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L037

Curso2014-2015 visible,año 2015. Convocatoria,tipo,reserva,modelo vacíos;Ua2 sólo del nombre. Examen SRC-20170EF2B2D5 y alias SRC-3C3C0BA557E4 idénticos;criterios SRC-8F3B9C58D85E y alias SRC-6557CA8734E1 idénticos. Cuatro rutas conservadas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A1b pide despejar sin calcular elementos;B1 maximiza ingresos;B2c conserva log. A4 es contraste histórico bilateral de media bajo T09.1/T08.3,con N(mu,2.1),H0:mu=5.5 y significación8%. B4 pide IC99.2% y error,sin tamaño mínimo. Etiquetas nuevas:despeje-matricial y contraste-bilateral-media. [Informe](docs/lotes/L037_2015_Ua2.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L038

Curso2014-2015 visible,año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua3 sólo del nombre. Examen SRC-DED70B2939A7 y alias SRC-98DB47100206 idénticos;criterios SRC-34AF76192C3D y alias SRC-C308B33F0C93 idénticos. Cuatro rutas conservadas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A2 contiene dos funciones independientes;A4 solicita IC95 y tamaño con error inferior0.5cl. B1 conserva beneficio literal y datos de venta,sin inventar costes. B4 conserva contraste histórico unilateral de media bajo T09.1/T08.3,H0:mu<=80,significación5% y umbral histórico del enunciado. Sin soluciones. [Informe](docs/lotes/L038_2015_Ua3.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L039

Curso2014-2015 visible,año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua4 sólo del nombre. El candidato2022 del texto extraído no fecha el examen. Examen SRC-6129A8DBCD4F y alias SRC-014DA3092BF3 idénticos;criterios SRC-4F8A35ED2B35 y alias SRC-CD6448FF91C4 idénticos. Cuatro rutas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A1 maximiza número de tarrinas;A4 contrasta H0:mu<=5 y compara significaciones5/15% bajo T09.1/T08.3. B3 pide diagnóstico correcto y probabilidades dado positivo. B4 aporta varianza0.25mm² y limita amplitud inferior2mm,no error2mm. Etiqueta diagnostico-correcto. Sin soluciones. [Informe](docs/lotes/L039_2015_Ua4.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L040

Curso2014-2015 visible,año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua5 sólo del nombre. Examen SRC-5D9E6A5CB42C y alias SRC-8E44CA3AEC52 idénticos;criterios SRC-D7A2E4F81DC6 y alias SRC-6620057F9E36 idénticos. Cuatro rutas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A1 incluye potencias4/80;A2 tres tramos;A3 pregunta incompatibilidad. A4 contrasta H0:mu<=7 con varianza16 y significación0.05 bajo T09.1/T08.3. B1 conserva cinco restricciones;B2 pide dos tangentes;B3 Reserva y Bayes;B4 IC92 y tamaño para reducir error a la mitad. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L040_2015_Ua5.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L041

Curso2014-2015 visible,año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua6 sólo del nombre. Examen SRC-417302754109 y alias SRC-FD67A988445D idénticos;criterios SRC-4283A8F81C69 y alias SRC-E27DBB823B7A idénticos. Cuatro rutas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A1 conserva matrices y parámetros;A2 racional/cúbica y tangente−3;A3 pregunta independencia. A4 usa nueve capitales,IC95 y error máximo4000euros. B1 inversión100000euros y mínimoB10000;B2 dos tramos y monotonía;B3 hospitalización y Bayes;B4 H0:mu>=110,sigma6 y significación5% bajo T09.1/T08.3. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L041_2015_Ua6.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L042

Curso2013-2014 visible,año2014. Convocatoria,tipo,reserva,modelo vacíos;ANDAL-1 sólo del nombre. Examen SRC-987D141AC72B y criterios SRC-805FB552E609,sin alias exactos en inventario. Criterios concordantes,sin tabla específica. A1 conserva signos,traspuesta y datos parciales;A2 mínimo y tangente;A3 independencia y complemento;A4 media/error desde intervalo y tamaño96%. B1 dieta de coste mínimo;B2 derivabilidad en0;B3 defectos;B4 contraste H0:p>=0.25 y significaciones5/1% bajo T09.1. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L042_2014_ANDAL1.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L043

Curso2013-2014 visible,año2014. Convocatoria,tipo,reserva,modelo vacíos;ANDAL-2 sólo del nombre. Examen SRC-B7376BBA6509 y criterios SRC-44E6C9B92F20,sin alias exactos en inventario. Criterios concordantes,sin tabla específica. A1 región y extremos;A2 derivabilidad y tangente;A3 cámaras;A4 nueve precios,IC95 y error no superior0.08euros. B1 conserva orden y signos de matrices;B2 audiencia en6/12h;B3 conjunto de16números;B4 estructura1a/1b/2 y muestreo. INC-014 reserva la justificación de convención de muestreo en B4.2 para la fase de soluciones. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L043_2014_ANDAL2.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L044

Curso2013-2014 visible,año2014. Convocatoria,tipo,reserva,modelo vacíos;ANDAL-3 sólo del nombre. Examen SRC-12C7C27227F3 y criterios SRC-C7810D495446,sin alias exactos en inventario. Criterios concordantes en puntuaciones,sin tabla específica. A1 traspuesta y matriz fila;A2 cúbica;A3 dos adultos;A4 proporción con confianza95/99%. B1 conserva cuatro restricciones sin añadir y>=0;B2 dos tramos y tangente2;B3 museo;B4 muestras de{6,9,12} y afijación proporcional. INC-015 reserva convención de muestreo para solución futura;INC-016 conserva a/b del examen frente1/2 de criterios. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L044_2014_ANDAL3.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L045

Curso2013-2014 visible,año2014. Convocatoria,tipo,reserva,modelo vacíos;ANDAL-5 sólo del nombre. Examen SRC-FF289770F60D y criterios SRC-8FFDC913699D,sin alias exactos en inventario. Criterios concordantes,sin tabla específica. A1 matrices;A2 producto logarítmico y cociente exponencial;A3 deportes;A4 H0:p>=0.65 y significaciones10/1%. B1 mezcla matriz y región de cinco vértices,bajo T04/T06,sin dividir el ejercicio;B2 cúbica;B3 prensa y exclusividad;B4 intervalo94%,proporción,recuento y tamaño. Sin incidencias ni etiquetas nuevas;sin soluciones. [Informe](docs/lotes/L045_2014_ANDAL5.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L046

Curso2013-2014 visible,año2014. Fuente SRC-9B38A4843707 inicialmente otro,cotejada como examen completo A/B de dos páginas,sin criterios intercalados. Junio sólo del nombre JUN;convocatoria,tipo,reserva,modelo vacíos. Criterios separados SRC-1F22C9DEEB02 concordantes;sin alias exactos ni tabla específica. A1 potencia2014 y ecuación cúbica matricial;A2 beneficios y signo de derivada;A3 moneda/urnas;A4 IC98.8 y tamaño para error no excede1euro. B1 conserva cuatro restricciones sin añadir x>=0;B2 dos tramos;B3 ofertas y unión;B4 H0:p=0.7,bilateral,significación1%. Nueva etiqueta contraste-bilateral-proporcion;sin incidencias nuevas ni soluciones. [Informe](docs/lotes/L046_2014_JUN.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L047

Curso2013-2014 visible,año2014. Fuente SRC-3753985712BC inicialmente otro,cotejada como examen completo A/B de dos páginas,sin criterios intercalados. Septiembre sólo del nombre SEPT;convocatoria,tipo,reserva,modelo vacíos. Criterios separados SRC-4E7EB7A5A236 concordantes;sin alias exactos ni tabla específica. A1 sistema y traspuesta;A2 beneficios;A3 asistencia85/35%;A4 H0:mu<=8 y significación5%. B1a exige plantear sin resolver y B1b tiene recinto propio;B2 parábola;B3 peritaje correcto y autenticidad dadoerror;B4 peso total1615.2g,dosdocenas,IC96 y amplitud máxima0.8. Nueva etiqueta peritaje-correcto;sin incidencias nuevas ni soluciones. [Informe](docs/lotes/L047_2014_SEPT.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L048

Curso2012-2013 visible,año2013. Examen SRC-551C95013DE9 y criterios SRC-1A43EA28D160,sin alias exactos. Tipo reserva y letra A sólo de carpeta;convocatoria/modelo vacíos,junio sólo de ruta,5no acredita modelo. Tabla normal separada SRC-5773393B0621 asociada por carpeta:cinco rutas idénticas,conservadas en inventario,cuatro copias exactas adicionales. A1 formulación sin resolver y recinto;A2 tres tramos y derivabilidad;A3 calibres y rotura;A4 contraste histórico de media con H0:mu<=25. B1 potencias2013;B2 tangente0;B3 votación por grupos;B4 IC90proporción y cotaerror0.1. INC-017 registra total2.5 frente desglose2en criteriosA2;se conserva el examen. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L048_2013_RESERVA_A.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia de L049

Curso2012-2013 impreso; reserva B sólo por carpeta,convocatoria/modelo vacíos. Ocho ejercicios A/B; B1 mixto T04/T06 conservado completo. Criterios concordantes. Tabla SRC-8304DD8AE43B asociada por carpeta,copia exacta de SRC-5773393B0621. INC-018 registra reposición/orden no explícitos de B4b para fase futura. Nueva etiqueta varianza-medias-muestrales, sin resultados. [Informe](docs/lotes/L049_2013_RESERVA_B.md).

**Siguiente: L050**, fuente `SRC-6CABE043886D`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/titular/EXAMEN 6 -ANDALUCÍA.pdf`. Revisar cabecera, curso, criterios, tabla y posibles alias antes de asignar metadatos.

## Procedencia de L050

Curso2012-2013 impreso;junio y titular sólo por carpeta,reserva/modelo vacíos. Ocho ejercicios A/B:matrices,beneficios,transporte,piscifactoría,tapices,derivada dada,sucesos independientes y televisión. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-D2928B91F5AA asociada por carpeta,copia de SRC-5773393B0621,cinco procedencias idénticas. Beneficio literal de B1 conservado;etiqueta recursos-sobrantes añadida. Sin incidencias nuevas ni soluciones. [Informe](docs/lotes/L050_2013_TITULAR_JUNIO.md).

**Siguiente: L051**, fuente `SRC-48C4AF791735`, archivo `Selectividad/sel_2013_matematicas_aplicadas/septiembre/reserva a/EXAMEN 3 -ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios,tabla y alias antes de asignar metadatos.

## Procedencia de L051

Curso2012-2013 impreso;reserva A sólo de carpeta,septiembre sólo de ruta;convocatoria/modelo vacíos. Ocho ejercicios A/B:ecuaciones matriciales,tres tramos,urnas,café,recinto,curvatura,idiomas y contraste histórico de proporción. A1 relacionado también con T05 por notación matricial;B4 en T09.1 y etiquetas de contraste,sin epígrafe específico actual. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-8312DBB75351 asociada por carpeta,copia de SRC-5773393B0621,cinco procedencias idénticas. Sin etiquetas nuevas,incidencias nuevas ni soluciones. [Informe](docs/lotes/L051_2013_RESERVA_A_SEPTIEMBRE.md).

**Siguiente: L052**, fuente `SRC-F90FB6B40256`, archivo `Selectividad/sel_2013_matematicas_aplicadas/septiembre/reserva b/EXAMEN 4-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios,tabla y alias antes de asignar metadatos.

## Procedencia de L052

Curso2012-2013 impreso;reserva B sólo de carpeta,septiembre sólo de ruta;convocatoria/modelo vacíos. Ocho ejercicios A/B:matrices,derivadas,terapias,acidez,región factible,dos tramos,sucesos independientes y muestreo/intervalo de proporción. INC-019 registra reposición/orden no explícitos en B4a;convención para la fase de soluciones. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-C8FC9A3149DF asociada por carpeta,copia de SRC-5773393B0621,cinco procedencias idénticas. Sin etiquetas nuevas ni respuestas. [Informe](docs/lotes/L052_2013_RESERVA_B_SEPTIEMBRE.md).

**Siguiente: L053**, fuente `SRC-A5DF0494F1A7`, archivo `Selectividad/sel_2013_matematicas_aplicadas/septiembre/titular/EXAMEN 2-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios,tabla y alias antes de asignar metadatos.

## Procedencia de L053

Curso2012-2013 impreso;septiembre y titular sólo de carpeta,reserva/modelo vacíos. Ocho ejercicios A/B:región factible,montajes,baile,contraste bilateral,matrices fraccionarias,parámetros,préstamos y gasto familiar. A4 en T09.1 con varianza25 literal. Criterios concordantes;examen,criterios y tabla sin alias exactos. Tabla específica SRC-B65557E07CB9 asociada por carpeta,distinta en bytes de las cinco copias de tabla anteriores. Separación local de filas en matrices de B1 para legibilidad,sin alterar entradas. Sin etiquetas ni incidencias nuevas ni soluciones. [Informe](docs/lotes/L053_2013_TITULAR_SEPTIEMBRE.md).

**Siguiente: L054**, fuente `SRC-45EF64533A19`, archivo `Selectividad/sel_2011_matematicas_aplicadas/121-EXAMEN 4.pdf`. Revisar cabecera,curso,auxiliares y alias antes de asignar metadatos.

## Procedencia de L054

Curso2010-2011 impreso,año2011. Convocatoria,tipo,reserva y modelo vacíos;121y4 sólo del nombre. Ocho ejercicios A/B:matrices,derivada/afluencia,transferencia de bolas,contraste unilateral,recinto,beneficios,errores en libro y muestreo/tamaño. A2 mixto T02principal1.5puntos/T01secundario1punto,conservado completo. INC-020 preserva media sus longitudes literal de A4. Nueva etiqueta region-aceptacion. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-0DF80B854632 asociada por prefijo121 y carpeta,con cuatro procedencias de huella idéntica. Sin respuestas. [Informe](docs/lotes/L054_2011_EXAMEN_4.md).

**Siguiente: L055**, fuente `SRC-471D895044A9`, archivo `Selectividad/sel_2011_matematicas_aplicadas/122A-EXAMEN 6.pdf`. Revisar cabecera,curso,auxiliares y alias antes de asignar metadatos.

## Procedencia de L055

Curso2010-2011 impreso,año2011. Convocatoria,tipo,reserva y modelo vacíos;122Ay6 sólo del nombre. Ocho ejercicios A/B:recinto,tres tramos,examen,contraste televisivo,matrices/café,derivadas,paraguas y chocolate. B1 conserva Nt como dato y etiquetas natural/descafein.,A/B/C en P/Q. B2 total2.5impreso sin apartados ni puntuaciones por función;criterios0.8/0.9/0.8 no añadidos al texto. B4 peso total5274g y amplitud total como máximo3g preservados. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-CEDD41219D14 asociada por prefijo122A y carpeta,copia de SRC-0DF80B854632,cuatro procedencias idénticas. Sin etiquetas nuevas,incidencias nuevas ni soluciones. [Informe](docs/lotes/L055_2011_EXAMEN_6.md).

**Siguiente: L056**, fuente `SRC-6437A476F758`, archivo `Selectividad/sel_2011_matematicas_aplicadas/123-EXAMEN 1.pdf`. Revisar cabecera,curso,auxiliares y alias antes de asignar metadatos.

## Procedencia de L056

Curso2010-2011 impreso,año2011. Convocatoria,tipo,reserva y modelo vacíos;123y1 sólo del nombre. Criterios SRC-C0D9348217F0 concordantes. Sin tabla específicamente acreditada. Etiqueta matriz-adyacencia añadida. El homónimo SRC-98312D373CA4 reproduce EXA-0054 con distinta SHA y no se usa como fuente de L056 ni como tabla. Cinco páginas fuente revisadas. Sin incidencias nuevas ni soluciones. [Informe](docs/lotes/L056_2011_EXAMEN_1.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Equivalencias de contenido: L057

[Informe y acceso individual](docs/lotes/L057_2011_REEDICION_EXAMEN_4.md). `datos/equivalencias_contenido.csv` relaciona SRC-98312D373CA4 con los ocho ID de EXA-0054. Las huellas son distintas:se conserva el inventario de duplicados exactos sin cambios. No se crean EXA-0057 ni D0057. La selección reutilizable es `selecciones/l057-ids.tex`;la selección inicial usa L084.

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L058

Curso2010-2011 impreso;convocatoria,tipo,reserva y modelo vacíos. 221Ay5 sólo del nombre. Criterios concordantes y tabla acumulada N(0,1) asociada por prefijo y carpeta,sin cita expresa. Tres fuentes sin alias exactos. A3 conserva el literal «sin que haya incidente»;interpretación del0.03 pendiente para soluciones,sin convertir el dato en notación condicionada o conjunta. No se redactan respuestas. Sin etiquetas nuevas. [Informe](docs/lotes/L058_2011_EXAMEN_5.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L059

Curso2010-2011 impreso;convocatoria,tipo,reserva y modelo vacíos. 222y2 sólo del nombre. Criterios concordantes;examen y criterios sin alias exactos. Tabla acumulada N(0,1) asociada por prefijo y carpeta,sin cita expresa;cuatro procedencias exactas. Matrices,unidades monetarias,dado y moneda,media muestral,dos regiones distintas,tres ramas,bolas con devolución y contraste de proporción conservados. Etiqueta nueva extraccion-con-reposicion. Sin soluciones. [Informe](docs/lotes/L059_2011_EXAMEN_2.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L060

Curso2010-2011 impreso;convocatoria,tipo,reserva y modelo vacíos. 223Ay3 sólo del nombre. Criterios concordantes;examen y criterios sin alias exactos. Tabla acumulada N(0,1) asociada por prefijo y carpeta,sin cita expresa;cuatro procedencias exactas. Se conservan elementos de matrices,beneficio por tramos,aceites,media muestral,recinto,derivada descrita,tangente,garantía y ocho pesos. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L060_2011_EXAMEN_3.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L061

Curso2009-2010 impreso,año2010. Junio sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. El5del nombre no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla normal asociada por carpeta,sin cita expresa;doce procedencias exactas. Se conservan el10%de puntualidad en coche,la confianza93%,el orden de factores,tres derivadas y diez producciones. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L061_2010_EXAMEN_5.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L062

Curso2009-2010 impreso,año2010. Junio sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. Ra sólo parte de la ruta;4no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan ingreso de lotes,tres ramas,condicionales,cuatro niveles de confianza,semiplanos,depósito,dado y dos cotas estrictas. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L062_2010_EXAMEN_4.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L063

Curso2009-2010 impreso,año2010. Junio sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. Rb sólo parte de la ruta;6no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan coste mínimo,parábola,complementos,proteína,recinto,dos derivadas bajo puntuación conjunta,función racional,alarma y sacos. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L063_2010_EXAMEN_6.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L064

Curso2009-2010 impreso,año2010. Septiembre sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. El3del nombre no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan recinto,consultorio,periódicos,H0 impresa,matrices,trozos,dado y muestreo. INC-021 registra reposición y orden no explicitados en B4b,pendientes de justificar al resolver. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L064_2010_EXAMEN_3.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L065

Curso2009-2010 impreso,año2010. Septiembre sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. El1del nombre no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan recinto,publicidad,fracciones,muestreo,matrices,trozos,camareros y contraste bilateral. INC-022 registra reposición y orden no explicitados en A4b,pendientes de justificar al resolver. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L065_2010_EXAMEN_1.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L066

Curso2009-2010 impreso,año2010. Septiembre sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. El2del nombre no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan matrices,perfiles de arcos,servidores,intervalo de proporción,recinto,beneficio,deportes y contraste unilateral. No se añaden incidencias ni se alteran las anteriores. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L066_2010_EXAMEN_2.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L067

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Tres etiquetas nuevas:sistemas-lineales,clasificacion-sistemas,efecto-tamano-muestral. Sin soluciones. [Informe](docs/lotes/L067_2009_CCSS01.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L068

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L068_2009_CCSS02.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L069

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L069_2009_CCSS03.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L070

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L070_2009_CCSS04.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L071

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L071_2009_CCSS05.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L072

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L072_2009_CCSS06.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L073

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L073_2008_CCSS01.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L074

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Etiqueta nueva coste-maximo; sin incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L074_2008_CCSS02.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L075

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. INC-024: muestreo sin reposición ni orden explícitos. Sin etiquetas nuevas. Sin soluciones. [Informe](docs/lotes/L075_2008_CCSS03.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L076

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios en3 (puntuaciones concordantes; rotulación B2 documentada en INC-025). Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. INC-025: criterios B2 rotulados a,c,c,d; examen a,b,c,d intacto. Sin etiquetas nuevas. Sin soluciones. [Informe](docs/lotes/L076_2008_CCSS04.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L077

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin incidencias nuevas. Sin etiquetas nuevas. Sin soluciones. [Informe](docs/lotes/L077_2008_CCSS05.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L078

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. INC-026: comilla abierta sin cierre visible en A3-I. Sin etiquetas nuevas. Sin soluciones. [Informe](docs/lotes/L078_2008_CCSS06.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L079

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas ni incidencias nuevas. [Informe](docs/lotes/L079_2012_EXAMEN_1.md) y [conversión](docs/lotes/L079_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L080

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas ni incidencias nuevas. [Informe](docs/lotes/L080_2012_EXAMEN_5.md) y [conversión](docs/lotes/L080_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L081

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas nuevas. INC-027 registra que B4b no explicita reposición ni orden en el muestreo. [Informe](docs/lotes/L081_2012_EXAMEN_2.md) y [conversión](docs/lotes/L081_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L082

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas ni incidencias nuevas. [Informe](docs/lotes/L082_2012_EXAMEN_4.md) y [conversión](docs/lotes/L082_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L083

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas ni incidencias nuevas. [Informe](docs/lotes/L083_2012_EXAMEN_3.md) y [conversión](docs/lotes/L083_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Cierre de la primera pasada y procedencia de L084

Curso 2011-2012 visible en los DOC convertidos. Examen de dos páginas, criterios de una y tabla normal de una asociada por carpeta. Ocho ejercicios, sin soluciones. INC-028 registra un trazo literal tras B2c; no se interpreta como parte de la función. [Informe](docs/lotes/L084_2012_EXAMEN_6.md), [conversión](docs/lotes/L084_conversion.json) y [balance y siguientes tareas](docs/CIERRE_TRANSCRIPCIONES.md).

## Soluciones: avance histórico S001

Dos soluciones validadas, A1/A2 de EXA-0001;638 pendientes. Incluyen teoría, desarrollo, comprobaciones exactas y figura del recinto.22 pruebas superadas; PDF revisados y comprobación del ZIP aislado documentada en el informe al cierre. [Informe](docs/soluciones/S001_2019_A1_A2.md), [tandas secuenciales](docs/LOTES_DE_SOLUCIONES.md) y [auditoría de incidencias](docs/AUDITORIA_INCIDENCIAS_SOLUCIONES.md).

## Soluciones: avance S002

Seis soluciones nuevas validadas; ocho acumuladas y632 pendientes. Se completa EXA-0001, conservando los640 enunciados y sus categorías. Comprobaciones racionales de probabilidades y matrices; derivación racional y percentiles contrastados con bisección de la CDF; tamaños mínimos verificados en n y n-1.22 pruebas y PDF revisados. [Informe](docs/soluciones/S002_2019_RESTO_EXAMEN.md); [tandas](docs/LOTES_DE_SOLUCIONES.md).

## Soluciones: avance S003

EXA-0002: ocho soluciones nuevas validadas;16 acumuladas y624 pendientes. Enunciados y categorías intactos. Tres pasadas del mismo autor;22 pruebas, PDF y ZIP aislado revisados. [Informe](docs/soluciones/S003_2019_SEPTIEMBRE.md). Siguiente:S004.

## Soluciones: avance S004

EXA-0003: ocho soluciones nuevas;24 validadas y616 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. A4b documenta la diferencia entre amplitud y error y el efecto del redondeo prematuro del cuantil. [Informe](docs/soluciones/S004_2019_SUPLENTE_JUNIO.md). Siguiente:S005.

## Soluciones: avance S005

EXA-0004: ocho soluciones nuevas;32 validadas y608 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se justifican el mínimo sobre una región no acotada y los extremos de las funciones a trozos. [Informe](docs/soluciones/S005_2019_SUPLENTE_SEPTIEMBRE.md). Siguiente:S006.

## Soluciones: avance S006

EXA-0005: ocho soluciones nuevas;40 validadas y600 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se documenta el mínimo sobre un segmento y la limitación del tamaño muestral deducido de límites redondeados. [Informe](docs/soluciones/S006_2019_RESERVA_A.md). Siguiente:S007.

## Soluciones: avance S007

EXA-0006: ocho soluciones nuevas;48 validadas y592 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se conserva el dato120 de A4 y se revisa INC-006 sin modificar el original ni cerrar automáticamente su estado. [Informe](docs/soluciones/S007_2019_RESERVA_B.md). Siguiente:S008.

## Soluciones: avance S008

EXA-0007: ocho soluciones nuevas;56 validadas y584 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se mantienen los cuatro bloques y la numeración global; gráficas, áreas e insesgadez de la media muestral comprobadas. [Informe](docs/soluciones/S008_2021_ORDINARIA.md). Siguiente:S009.

## Soluciones: avance S009

EXA-0008: ocho soluciones nuevas;64 validadas y576 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se comprueban potencias, mínimo sobre un segmento, áreas y dados; E7 documenta4898 con cuantil preciso y4899 con1.96 tabulado. [Informe](docs/soluciones/S009_2021_ORD_SUPLENTE.md). Siguiente:S010.

## Soluciones: avance S010

EXA-0009: ocho soluciones nuevas;72 validadas y568 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. E1a se formula sin resolver; E7b explica ambas convenciones de reemplazamiento; E8 distingue amplitud y error y comprueba el mínimo 71. [Informe](docs/soluciones/S010_2021_ORD_RESERVA.md). Siguiente:S011.

## Soluciones: avance S011

EXA-0010: ocho soluciones nuevas;80 validadas y560 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. E3 distingue integral definida y área; E7 explica 783 con cuantil preciso y 785 con 2.81 tabulado; E8 verifica el mínimo 53. [Informe](docs/soluciones/S011_2021_EXTRAORDINARIA.md). Siguiente:S012.

## Soluciones: avance S012

EXA-0011: ocho soluciones nuevas;88 validadas y552 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Tres figuras vectoriales; E7 explicita orden y reposición y verifica probabilidad 1/9; E8 usa sigma=9 y distingue las dos confianzas, con mínimo 110. [Informe](docs/soluciones/S012_2021_EXTRA_SUPLENTE.md). Siguiente:S013.

## Soluciones: avance S013

EXA-0012: ocho soluciones nuevas;96 validadas y544 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Dos figuras vectoriales; E1 conserva la frontera estricta y demuestra el máximo; E4 declara continuidad del modelo; E7/E8 distinguen cambios de confianza y cotas inclusivas/estrictas. [Informe](docs/soluciones/S013_2021_EXTRA_RESERVA_B.md). Siguiente:S014.

## Soluciones: avance S014

EXA-0013: ocho soluciones nuevas;104 validadas y536 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. E2 demuestra el mínimo en todo un segmento; E5 actualiza la urna a 15 bolas; E7 explica ambas convenciones de muestreo; E8 distingue varianza, desviación y las dos confianzas. [Informe](docs/soluciones/S014_2020_PA.md). Siguiente:S015.

## Soluciones: avance S015

EXA-0014: ocho soluciones nuevas;112 validadas y528 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Dos figuras; máximo 400 euros; ecuación matricial comprobada en su forma original; llaves sin reemplazamiento; reducción del error a 0.84 sin inventar una nueva media. [Informe](docs/soluciones/S015_2020_PB.md). Siguiente:S016.

## Soluciones: avance S016

EXA-0015: ocho soluciones nuevas;120 validadas y520 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Dos figuras. Se coteja INC-007 y se comprueba la cobertura del 99 % para el tamaño mínimo de 166 hogares. [Informe](docs/soluciones/S016_2020_PC.md). Siguiente:S017.

## Soluciones: avance S017

EXA-0016: ocho soluciones nuevas;128 validadas y512 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Región factible, tangentes y cotas de tamaño muestral comprobadas. [Informe](docs/soluciones/S017_2020_PD.md). Siguiente:S018.

## Soluciones: avance S018

EXA-0017: ocho soluciones nuevas;136 validadas y504 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Región factible, inversa y tamaños muestrales comprobados. [Informe](docs/soluciones/S018_2020_PE.md). Siguiente:S019.

## Soluciones: avance S019

EXA-0018: ocho soluciones nuevas;144 validadas y496 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Tres figuras. Se documenta el segmento de máximos y el efecto del redondeo del cuantil. [Informe](docs/soluciones/S019_2020_PF.md). Siguiente:S020.

## S020 · 2026-11-08

Ocho soluciones nuevas de EXA-0019. El banco suma 152 validadas y 488 pendientes. [Informe](docs/soluciones/S020_2018_RESERVA_A.md). Siguiente tanda S021.

## S021 · 2026-11-08

Ocho soluciones nuevas de EXA-0020. El banco suma 160 validadas y 480 pendientes. [Informe](docs/soluciones/S021_2018_RESERVA_B.md). Siguiente tanda S022.

## S022 · 2026-11-08

Ocho soluciones nuevas de EXA-0021. El banco suma 168 validadas y 472 pendientes. [Informe](docs/soluciones/S022_2017_RESERVA_A.md). Siguiente tanda S023.

## S023 · 2026-11-08

Ocho soluciones nuevas de EXA-0022. El banco suma 176 validadas y 464 pendientes. [Informe](docs/soluciones/S023_2016_RESERVA_A.md). Siguiente tanda S024.

## S024 · 2026-11-08

Ocho soluciones nuevas de EXA-0023. El banco suma 184 validadas y 456 pendientes. [Informe](docs/soluciones/S024_2016_RESERVA_B.md). Siguiente tanda S025.

## S025 · 2026-11-08

Ocho soluciones nuevas de EXA-0024. El banco suma 192 validadas y 448 pendientes. [Informe](docs/soluciones/S025_2017_RESERVA_B.md). Siguiente tanda S026.

## S026 · 2026-11-08

Ocho soluciones nuevas de EXA-0025. El banco suma 200 validadas y 440 pendientes. [Informe](docs/soluciones/S026_2017_EXA0025.md). Siguiente tanda S027.

## S027 · 2026-11-08

Ocho soluciones nuevas de EXA-0026. El banco suma 208 validadas y 432 pendientes. [Informe](docs/soluciones/S027_2016_EXA0026.md). Siguiente tanda S028.

## S028 · 2026-11-08

Ocho soluciones nuevas de EXA-0027. El banco suma 216 validadas y 424 pendientes. [Informe](docs/soluciones/S028_2017_EXA0027.md). Siguiente tanda S029.

## S029 · 2026-11-09

Ocho soluciones nuevas de EXA-0028. El banco suma 224 validadas y 416 pendientes. [Informe](docs/soluciones/S029_2018_SUPLENTE.md). Siguiente tanda S030.

## S030 · 2026-11-09

Ocho soluciones nuevas de EXA-0029. El banco suma 232 validadas y 408 pendientes. [Informe](docs/soluciones/S030_2018_EXA0029.md). Siguiente tanda S031.

## S031 · 2026-11-09

Ocho soluciones nuevas de EXA-0030. El banco suma 240 validadas y 400 pendientes. [Informe](docs/soluciones/S031_2018_EXA0030.md). Siguiente tanda S032.

## S032 · 2026-11-09

Ocho soluciones nuevas de EXA-0031. El banco suma 248 validadas y 392 pendientes. [Informe](docs/soluciones/S032_2016_EXA0031.md). Siguiente tanda S033.

## S033 · 2026-11-09

Ocho soluciones nuevas de EXA-0032. El banco suma 256 validadas y 384 pendientes. [Informe](docs/soluciones/S033_2017_EXA0032.md). Siguiente tanda S034.

## S034 · 2026-11-09

Ocho soluciones nuevas de EXA-0033. El banco suma 264 validadas y 376 pendientes. [Informe](docs/soluciones/S034_2018_EXA0033.md). Siguiente tanda S035.

## S035 · 2026-11-09

Ocho soluciones nuevas de EXA-0034. El banco suma 272 validadas y 368 pendientes. [Informe](docs/soluciones/S035_2016_EXA0034.md). Siguiente tanda S036.

## S036 · 2026-11-09

Ocho soluciones nuevas de EXA-0035. El banco suma 280 validadas y 360 pendientes. [Informe](docs/soluciones/S036_2017_EXA0035.md). Siguiente tanda S037.

## S037 · 2026-11-09

Ocho soluciones nuevas de EXA-0036. El banco suma 288 validadas y 352 pendientes. [Informe](docs/soluciones/S037_2015_EXA0036.md). Siguiente tanda S038.

## S038 · 2026-11-09

Ocho soluciones nuevas de EXA-0037. El banco suma 296 validadas y 344 pendientes. [Informe](docs/soluciones/S038_2015_EXA0037.md). Siguiente tanda S039.

## S039 · 2026-11-09

Ocho soluciones nuevas de EXA-0038. El banco suma 304 validadas y 336 pendientes. [Informe](docs/soluciones/S039_2015_EXA0038.md). Siguiente tanda S040.

## S040 · 2026-11-09

Ocho soluciones nuevas de EXA-0039. El banco suma 312 validadas y 328 pendientes. [Informe](docs/soluciones/S040_2015_EXA0039.md). Siguiente tanda S041.

## S041 · 2026-11-09

Ocho soluciones nuevas de EXA-0040. El banco suma 320 validadas y 320 pendientes. [Informe](docs/soluciones/S041_2015_EXA0040.md). Siguiente tanda S042.

## S042 · 2026-11-09

Ocho soluciones nuevas de EXA-0041. El banco suma 328 validadas y 312 pendientes. [Informe](docs/soluciones/S042_2015_EXA0041.md). Siguiente tanda S043.

## S043 · 2026-11-09

Ocho soluciones nuevas de EXA-0042. El banco suma 336 validadas y 304 pendientes. [Informe](docs/soluciones/S043_2014_EXA0042.md). Siguiente tanda S044.

## S044 · 2026-11-09

Ocho soluciones nuevas de EXA-0043. El banco suma 344 validadas y 296 pendientes. [Informe](docs/soluciones/S044_2014_EXA0043.md). Siguiente tanda S045.

## S045 · 2026-11-09

Ocho soluciones nuevas de EXA-0044. El banco suma 352 validadas y 288 pendientes. [Informe](docs/soluciones/S045_2014_EXA0044.md). Siguiente tanda S046.

## S046 · 2026-11-09

Ocho soluciones nuevas de EXA-0045. El banco suma 360 validadas y 280 pendientes. [Informe](docs/soluciones/S046_2014_EXA0045.md). Siguiente tanda S047.

## S047 · 2026-11-09

Ocho soluciones nuevas de EXA-0046. El banco suma 368 validadas y 272 pendientes. [Informe](docs/soluciones/S047_2014_EXA0046.md). Siguiente tanda S048.

## S048 · 2026-11-09

Ocho soluciones nuevas de EXA-0047. El banco suma 376 validadas y 264 pendientes. [Informe](docs/soluciones/S048_2014_EXA0047.md). Siguiente tanda S049.

## S049 · 2026-11-09

Ocho soluciones nuevas de EXA-0048. El banco suma 384 validadas y 256 pendientes. [Informe](docs/soluciones/S049_2013_EXA0048.md). Siguiente tanda S050.

## S050 · 2026-11-09

Ocho soluciones nuevas de EXA-0049. El banco suma 392 validadas y 248 pendientes. [Informe](docs/soluciones/S050_2013_EXA0049.md). Siguiente tanda S051.

## S051 · 2026-11-09

Ocho soluciones nuevas de EXA-0050. El banco suma 400 validadas y 240 pendientes. [Informe](docs/soluciones/S051_2013_EXA0050.md). Siguiente tanda S052.

## S052 · 2026-11-09

Ocho soluciones nuevas de EXA-0051. El banco suma 408 validadas y 232 pendientes. [Informe](docs/soluciones/S052_2013_EXA0051.md). Siguiente tanda S053.

## S053 · 2026-11-09

Ocho soluciones nuevas de EXA-0052. El banco suma 416 validadas y 224 pendientes. [Informe](docs/soluciones/S053_2013_EXA0052.md). Siguiente tanda S054.

## S054 · 2026-11-09

Ocho soluciones nuevas de EXA-0053. El banco suma 424 validadas y 216 pendientes. [Informe](docs/soluciones/S054_2013_EXA0053.md). Siguiente tanda S055.

## S055 · 2026-11-09

Ocho soluciones nuevas de EXA-0054. El banco suma 432 validadas y 208 pendientes. [Informe](docs/soluciones/S055_2011_EXA0054.md). Siguiente tanda S056.

## S056 · 2026-11-09

Ocho soluciones nuevas de EXA-0055. El banco suma 440 validadas y 200 pendientes. [Informe](docs/soluciones/S056_2011_EXA0055.md). Siguiente tanda S057.

## S057 · 2026-11-09

Ocho soluciones nuevas de EXA-0056. El banco suma 448 validadas y 192 pendientes. [Informe](docs/soluciones/S057_2011_EXA0056.md). Siguiente tanda S058.

## S058 · 2026-11-09

Ocho soluciones nuevas de EXA-0058. El banco suma 456 validadas y 184 pendientes. [Informe](docs/soluciones/S058_2011_EXA0058.md). Siguiente tanda S059.

## S059 · 2026-11-09

Ocho soluciones nuevas de EXA-0059. El banco suma 464 validadas y 176 pendientes. [Informe](docs/soluciones/S059_2011_EXA0059.md). Siguiente tanda S060.

## S060 · 2026-11-10

Ocho soluciones nuevas de EXA-0060. El banco suma 472 validadas y 168 pendientes. [Informe](docs/soluciones/S060_2011_EXA0060.md). Siguiente tanda S061.

## S061 · 2026-11-10

Ocho soluciones nuevas de EXA-0061. El banco suma 480 validadas y 160 pendientes. [Informe](docs/soluciones/S061_2010_EXA0061.md). Siguiente tanda S062.

## S062 · 2026-11-10

Ocho soluciones nuevas de EXA-0062. El banco suma 488 validadas y 152 pendientes. [Informe](docs/soluciones/S062_2010_EXA0062.md). Siguiente tanda S063.

## S063 · 2026-11-10

Ocho soluciones nuevas de EXA-0063. El banco suma 496 validadas y 144 pendientes. [Informe](docs/soluciones/S063_2010_EXA0063.md). Siguiente tanda S064.

## S064 · 2026-11-10

Ocho soluciones nuevas de EXA-0064. El banco suma 504 validadas y 136 pendientes. [Informe](docs/soluciones/S064_2010_EXA0064.md). Siguiente tanda S065.

## S065 · 2026-11-10

Ocho soluciones nuevas de EXA-0065. El banco suma 512 validadas y 128 pendientes. [Informe](docs/soluciones/S065_2010_EXA0065.md). Siguiente tanda S066.

## S066 · 2026-11-10

Ocho soluciones nuevas de EXA-0066. El banco suma 520 validadas y 120 pendientes. [Informe](docs/soluciones/S066_2010_EXA0066.md). Siguiente tanda S067.

## S067 · 2026-11-10

Seis soluciones nuevas de EXA-0067. El banco suma 526 validadas y 114 pendientes. [Informe](docs/soluciones/S067_2009_EXA0067.md). Siguiente tanda S068.

## S068 · 2026-11-10

Seis soluciones nuevas de EXA-0068. El banco suma 532 validadas y 108 pendientes. [Informe](docs/soluciones/S068_2009_EXA0068.md). Siguiente tanda S069.

## S069 · 2026-11-10

Seis soluciones nuevas de EXA-0069. El banco suma 538 validadas y 102 pendientes. [Informe](docs/soluciones/S069_2009_EXA0069.md). Siguiente tanda S070.

## S070 · 2026-11-10

Seis soluciones nuevas de EXA-0070. El banco suma 544 validadas y 96 pendientes. [Informe](docs/soluciones/S070_2009_EXA0070.md). Siguiente tanda S071.

## S071 · 2026-11-10

Seis soluciones nuevas de EXA-0071. El banco suma 550 validadas y 90 pendientes. [Informe](docs/soluciones/S071_2009_EXA0071.md). Siguiente tanda S072.

## S072 · 2026-11-10

Seis soluciones nuevas de EXA-0072. El banco suma 556 validadas y 84 pendientes. [Informe](docs/soluciones/S072_2009_EXA0072.md). Siguiente tanda S073.

## S073 · 2026-11-10

Seis soluciones de EXA-0073. El banco suma 562 validadas y 78 pendientes. [Informe](docs/soluciones/S073_2008_EXA0073.md). Siguiente tanda S074.

## S074 · 2026-11-10

Seis soluciones de EXA-0074. El banco suma 568 validadas y 72 pendientes. [Informe](docs/soluciones/S074_2008_EXA0074.md). Siguiente tanda S075.

## S075 · 2026-11-10

Seis soluciones de EXA-0075. El banco suma 574 validadas y 66 pendientes. [Informe](docs/soluciones/S075_2008_EXA0075.md). Siguiente tanda S076.

## S076 · 2026-11-12

Seis soluciones de EXA-0076. El banco suma 580 validadas y 60 pendientes. [Informe](docs/soluciones/S076_2008_EXA0076.md). Siguiente tanda S077.

## S077 · 2026-11-12

Seis soluciones de EXA-0077. El banco suma 586 validadas y 54 pendientes. [Informe](docs/soluciones/S077_2008_EXA0077.md). Siguiente tanda S078.

## S078 · 2026-11-12

Seis soluciones de EXA-0078. El banco suma 592 validadas y 48 pendientes. [Informe](docs/soluciones/S078_2008_EXA0078.md). Siguiente tanda S079.

## S079 · 2026-11-12

Ocho soluciones de EXA-0079. El banco suma 600 validadas y 40 pendientes. [Informe](docs/soluciones/S079_2012_EXA0079.md). Siguiente tanda S080.

## S080 · 2026-11-12

Ocho soluciones de EXA-0080. El banco suma 608 validadas y 32 pendientes. [Informe](docs/soluciones/S080_2012_EXA0080.md). Siguiente tanda S081.

## S081 · 2026-11-12

Ocho soluciones de EXA-0081. El banco suma 616 validadas y 24 pendientes. [Informe](docs/soluciones/S081_2012_EXA0081.md). Siguiente tanda S082.

## S082 · 2026-11-12

Ocho soluciones de EXA-0082. El banco suma 624 validadas y 16 pendientes. [Informe](docs/soluciones/S082_2012_EXA0082.md). Siguiente tanda S083.

## S083 · 2026-11-12

Ocho soluciones de EXA-0083. El banco suma 632 validadas y 8 pendientes. [Informe](docs/soluciones/S083_2012_EXA0083.md). Siguiente tanda S084.

## S084 · 2026-11-12

Ocho soluciones de EXA-0084. El banco suma 640 validadas y 0 pendientes. [Informe](docs/soluciones/S084_2012_EXA0084.md). Siguiente fase de auditoría y selección por apartados.
