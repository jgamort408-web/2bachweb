# Verificación de la preparación del banco

Fecha: **2026-10-22**. Alcance: estructura, datos y composición de avisos. Esta revisión **no acredita una transcripción de los ejercicios ni una solución matemática**.

**Registro histórico de la preparación inicial.** La transcripción y el cotejo posteriores de los ocho enunciados de L001 se documentan en [el cierre del lote](lotes/L001_2019_TITULAR_JUNIO.md). La selección inicial actual ya carga ese lote; los recuentos de pendientes y selección vacía de este informe corresponden a la entrega anterior.

## Resultados

| Control | Resultado |
| --- | --- |
| Inventario y huellas de originales | 215 fuentes presentes; SHA-256 coincidente en todos los casos |
| Integridad del catálogo | Ocho ejercicios, un examen, nueve temas y 86 epígrafes; referencias y pares de rutas válidos |
| Contenido de los fragmentos | 16 archivos con sólo comentarios: ocho enunciados `pendiente` y ocho soluciones `no_redactada` |
| Pruebas automáticas | 17 pruebas superadas con `unittest` |
| Filtros | Tema principal/secundarios, etiquetas conjuntas, examen, año, tipo, modelo, opción, bloque e IDs; selección vacía por defecto |
| Identidad | Formatos de opción, bloque y sin opción; número original y documento coherentes; metadatos comunes contrastados |
| Escritura de archivos | Salidas limitadas al proyecto; generador sin escritura en enunciados/soluciones; rechazo de catálogo obsoleto al empaquetar |
| ZIP | Integridad correcta, `main.tex` en raíz, todos los archivos internos coincidentes; sin originales, cachés ni resultados temporales |
| Reproducibilidad del ZIP | Comprobada por prueba automatizada con dos empaquetados sin cambios |
| Enlaces de documentación | Destinos Markdown locales existentes |

## Compilación local

Se ha usado **Tectonic 0.17.0**, basado en XeTeX, con los recursos disponibles en caché y sin acceso a red en las compilaciones finales. El proyecto recomienda **pdfLaTeX** en Overleaf y utiliza paquetes comunes compatibles; no se ha iniciado sesión ni compilado dentro del servicio de Overleaf en esta entrega.

Los archivos LaTeX incluidos en el ZIP coinciden byte a byte con los usados en estas comprobaciones. Las dos envolturas del piloto se crearon únicamente en el directorio temporal de verificación, sin añadir contenidos al banco.

| Prueba | Salida temporal | Comprobación |
| --- | ---: | --- |
| `main.tex`, selección inicial vacía | 1 página | Mensaje de preparación y selección vacía |
| Piloto de ocho registros, modo `enunciados` | 2 páginas | Ocho avisos de enunciado pendiente; ningún apartado de solución |
| Piloto de ocho registros, modo `enunciados-y-soluciones` | 2 páginas | Ocho avisos de enunciado y ocho avisos de solución pendiente |

Se han renderizado e inspeccionado **las cinco páginas**: sin recortes, solapamientos o avisos críticos de desbordamiento, caracteres ausentes ni referencias indefinidas. Los avisos de cada registro reservado permanecen juntos. Los estados con guion bajo se imprimen como texto seguro.

Estos PDF son comprobaciones temporales en `../../tmp/selectividad/compilacion/`, no entregas de exámenes. No se incluyen en el ZIP ni se publican en la web. Tampoco se ha dado por comprobada la fidelidad de fórmulas que aún no se han transcrito, ni se han ejercitado soluciones reales: no existe ninguna redactada.

## Repetir los controles de datos

Desde la raíz de `Selectividad_LaTeX/`, con Python 3.10 o posterior:

```text
python -m unittest discover -s tests -v
python scripts/validar.py --fuentes
python scripts/generar_seleccion.py --anio 2019 --incluir-pendientes --salida selecciones/piloto-2019.tex
python scripts/empaquetar.py
```

`--fuentes` requiere la carpeta hermana original `../Selectividad/`; la validación normal y la compilación del ZIP no la necesitan. Regenerar el inventario de PDF sí requiere `pypdf`; los cuatro controles anteriores usan la biblioteca estándar de Python.

Para comprobar el piloto en Overleaf, cargar `selecciones/piloto-2019.tex` desde `config/seleccion.tex` y cambiar el modo según el README. Antes de dar por terminado cada futuro enunciado, compilar también su fragmento en revisión de borradores y cotejarlo visualmente contra su fuente.

## Trabajo que sigue pendiente

- Transcribir literalmente los ocho ejercicios del lote L001 y completar el resto de fuentes por tandas.
- Hacer el segundo cotejo y verificar la clasificación de cada ejercicio.
- Confirmar metadatos dudosos, convertir copias de los DOC y revisar los escaneados/documentos combinados.
- Resolver las incidencias abiertas sin alterar los originales.
- Activar posteriormente la fase de soluciones y completar sus pasadas matemática, independiente, didáctica y editorial.

No se ha cambiado el diseño ni la biblioteca del proyecto web existente.
