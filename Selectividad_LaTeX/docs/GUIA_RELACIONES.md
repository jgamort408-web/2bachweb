# Encontrar ejercicios y preparar relaciones dirigidas

## Acceso rápido

1. Abre el [índice de ejercicios](../INDICE_EJERCICIOS.md).
2. Elige tema, etiqueta o busca una palabra/epígrafe con la búsqueda del documento.
3. Pulsa el **ID** para abrir el enunciado individual. Ese mismo ID permite incluirlo en cualquier relación.

El [CSV maestro](../datos/ejercicios.csv) contiene título descriptivo, examen/año, bloque/número, páginas, tema principal, secundarios, epígrafes, etiquetas y rutas. Un ejercicio completo conserva juntos sus datos y apartados aunque pertenezca a varios temas. Las categorías describen las preguntas sin anticipar respuestas. No hay clasificación de dificultad revisada: no se presenta una dificultad inventada.

## Elegir una relación con precisión

| Necesidad | Selección |
|---|---|
| Repasar un tema completo | Tema principal o secundario, por ejemplo T09 |
| Trabajar un apartado concreto del libro | Epígrafe exacto, por ejemplo T09.8 |
| Fijar objetivo y contenido | Tema/epígrafe y varias etiquetas simultáneas |
| Mezclar ejercicios elegidos manualmente | Lista de IDs concretos |
| Mantener procedencia | Combinar con examen, año, bloque u opción confirmados |

**Los filtros se combinan con AND:** dos etiquetas exigen ambas. Un tema incluye principales y secundarios; el epígrafe compara códigos completos, sin confundir T03.1 con T03.10. Opción y bloque son distintos. Si un dato de convocatoria/modelo no está confirmado, queda vacío. Por defecto sólo entran enunciados cotejados.

## Preparación local con el generador

### Seleccionar partes y apartados preparados

La cobertura revisada comprende diez ejercicios y está en
`datos/seleccion_parcial.json`. El generador valida todos los ejercicios
seleccionados antes de escribir los archivos. Una petición de parte o apartado
que todavía no esté preparada produce un error y conserva la selección anterior.

| Ejercicio | Selecciones preparadas |
|---|---|
| SEL-D0075-OB-E03 | Partes I y II, con apartados a y b en cada parte |
| SEL-D0084-OA-E01 | Apartados a, b y c |
| SEL-D0067-OA-E03 y SEL-D0067-OB-E03 | Partes I y II completas |
| SEL-D0068-OA-E03 y SEL-D0068-OB-E03 | Partes I y II completas |
| SEL-D0069-OA-E03 y SEL-D0069-OB-E03 | Partes I y II completas |
| SEL-D0070-OA-E03 y SEL-D0070-OB-E03 | Partes I y II completas |

En los ocho ejercicios incorporados en SEL-PARTES02 se usa `--parte I` o
`--parte II`. La selección individual de sus apartados está pendiente de
preparación. Se conserva el conjunto de preguntas internas de cada parte.

Por ejemplo, para reunir las dos Partes II de EXA-0067 se utiliza

```text
python Selectividad_LaTeX/scripts/generar_seleccion.py --id SEL-D0067-OA-E03 --id SEL-D0067-OB-E03 --parte II --salida selecciones/inferencia-2009.tex
```

Para pedir únicamente el apartado a de la Parte II de inferencia, desde la raíz
del repositorio se utiliza

```text
python Selectividad_LaTeX/scripts/generar_seleccion.py --id SEL-D0075-OB-E03 --parte II --apartado a --salida selecciones/mi-parte.tex
```

Omitiendo `--apartado` se incluye la Parte II completa. En ejercicios divididos
en partes, un apartado requiere indicar también su parte. Para un apartado de
matrices se utiliza

```text
python Selectividad_LaTeX/scripts/generar_seleccion.py --id SEL-D0084-OA-E01 --apartado b --salida selecciones/mi-apartado.tex
```

La entrada de compilación carga la selección generada antes de `main`, como en
los ejemplos de esta guía. Se elige `enunciados` o `enunciados-y-soluciones`
mediante `ModoSalida`. La cabecera conserva el ID del ejercicio original e indica
la parte y la letra elegidas. Los datos comunes y las preguntas seleccionadas
proceden de los mismos archivos que la versión completa.

Para cambiar el alcance de una selección parcial se regenera con el generador.
Sin los dos filtros nuevos se mantiene la selección del ejercicio completo.
Los filtros de temas y etiquetas siguen describiendo ejercicios completos.
La preparación del resto del banco se registra en
[el seguimiento de SEL-PARTES01](soluciones/SEL_PARTES01_SELECCION_PARCIAL.md).

Desde la raíz de `Selectividad_LaTeX/`, con Python disponible:

```text
python scripts/generar_seleccion.py --tema T09 --epigrafe T09.8 --tag intervalo-confianza-media --tag tamano-muestral --salida selecciones/mi-relacion.tex
```

Otro ejemplo, una relación de programación lineal:

```text
python scripts/generar_seleccion.py --tema T06 --tag beneficio-maximo --salida selecciones/mi-relacion.tex
```

Selección individual o mezcla manual, repitiendo `--id`:

```text
python scripts/generar_seleccion.py --id SEL-D0017-BA-E02 --id SEL-D0017-BB-E03 --salida selecciones/mi-relacion.tex
```

Los ejercicios quedan en **orden de catálogo**, una sola vez cada uno; el orden de los argumentos `--id` no reordena la relación. Para fijar otro orden, edita la lista de IDs del `.tex` generado después de seleccionar. Guarda aparte esa selección manual para no sobrescribirla al regenerar.

## Componer el PDF en Overleaf

1. Sube el ZIP del proyecto.
2. Crea un archivo `mi-relacion.tex` en la raíz del proyecto con esta entrada:

```tex
\newcommand{\ModoSalida}{enunciados}
\newcommand{\TituloSeleccion}{Mi relación dirigida}
\newcommand{\ContextoSeleccion}{}
\input{selecciones/mi-relacion}
\input{main}
```

3. Elige ese archivo como documento principal y compila con pdfLaTeX.

También puedes crear la selección directamente en Overleaf copiando los IDs del índice:

```tex
\providecommand{\ListaEjercicios}{SEL-D0017-BA-E02,SEL-D0017-BB-E03}
```

Así puedes preparar una relación sin ejecutar Python. En la entrada principal se carga la selección antes de `main`. Mantén `\ContextoSeleccion` vacío como en el ejemplo: evita heredar las instrucciones del examen seleccionado por defecto. Cada enunciado conserva sus datos y su ID. Una relación didáctica mezclada no incorpora las instrucciones de un examen concreto ni exige su optatividad.

Está incluido un [ejemplo listo para compilar](../relacion-ejemplo.tex), con [dos IDs elegidos](../selecciones/ejemplo-compatibilidad-y-tangente.tex): compatibilidad matricial y tangente. Cambia esa lista por los IDs del índice y el título por el objetivo de tu relación.

Para el futuro modo combinado cambia `enunciados` por `enunciados-y-soluciones`: actualmente aparecerán **avisos de solución pendiente**, no respuestas elaboradas. La fase de resolución sigue inactiva.

## Mantener el acceso actualizado

Después de una tanda cotejada:

```text
python scripts/generar_indice.py
```

El índice se regenera desde los CSV; no se edita a mano. Generar selecciones no modifica enunciados, soluciones ni sus estados. Los informes de lote conservan el cotejo y las limitaciones de procedencia.
