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
