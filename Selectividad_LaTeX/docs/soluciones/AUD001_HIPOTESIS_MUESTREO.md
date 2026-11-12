# AUD001 · Hipótesis de muestreo y asignación entera

Fecha 2026-11-12. Revisión del mismo autor, posterior a S084. Alcance de doce incidencias de hipótesis no explícita. La auditoría independiente del conjunto sigue pendiente.

## Tareas

- [x] Leer los enunciados y las soluciones de los doce casos.
- [x] Enumerar las muestras con aritmética racional y comprobar las medias y varianzas.
- [x] Completar las variantes con reemplazo en SEL-D0030-OA-E04 y SEL-D0075-OB-E03.
- [x] Explicitar el criterio de asignación entera en SEL-D0033-OA-E04.
- [x] Recompilar y revisar los tres exámenes afectados y la relación AUD001.
- [x] Actualizar el paquete para Overleaf.

## Resultados de la revisión

| Incidencia | Ejercicio | Resultado y tratamiento |
|---|---|---|
| INC-009 | SEL-D0022-OA-E04 | Los recuentos 45, 63 y 135 requieren afijación proporcional. La solución explicita el supuesto y la insuficiencia de datos sin él. |
| INC-010 | SEL-D0030-OA-E04 | Media 5/2. Varianza 5/12 sin reemplazo y 5/8 con reemplazo. Se añade la tabla de las dieciséis parejas con reemplazo. |
| INC-011 | SEL-D0033-OA-E04 | No existe una asignación entera exactamente proporcional a 1, 2 y 3 con total 121. El método de restos mayores da 20, 40 y 61. Se aclara que el enunciado no determina el método. |
| INC-013 | SEL-D0034-OB-E04 | Para {2,4,6}, la varianza de las medias es 2/3 sin reemplazo y 4/3 con reemplazo. Las variantes ya estaban explicadas. |
| INC-014 | SEL-D0043-OB-E04 | La media poblacional es 7. La varianza es 24 sin reemplazo, aplicando corrección finita con denominador poblacional N, y 12 con reemplazo. Ambas constan en la solución. |
| INC-015 | SEL-D0044-OB-E04 | Para {6,9,12}, la varianza es 3/2 sin reemplazo y 3 con reemplazo. |
| INC-018 | SEL-D0049-OB-E04 | Para {1,4,7}, la varianza es 3/2 sin reemplazo y 3 con reemplazo. |
| INC-019 | SEL-D0052-OB-E04 | Para {2,4,6}, la desviación de las medias es raíz de 2/3 sin reemplazo y raíz de 4/3 con reemplazo. |
| INC-021 | SEL-D0064-OB-E04 | Para {10,12,17}, la media es 13 y la varianza de las medias es 13/6 sin reemplazo y 13/3 con reemplazo. |
| INC-022 | SEL-D0065-OA-E04 | La igualdad entre media de medias y media poblacional da a=16,2 con ambas convenciones. |
| INC-024 | SEL-D0075-OB-E03 | Se añade la variante con reemplazo, de varianza 5/8, junto al caso sin reemplazo, de varianza 5/12. |
| INC-027 | SEL-D0081-OB-E04 | Ambas convenciones y la tabla de dieciséis medias ya estaban documentadas. |

Las muestras sin reemplazo se enumeraron como combinaciones equiprobables y las muestras con reemplazo como productos cartesianos equiprobables. Se calcularon esperanza y varianza con fracciones exactas. Para INC-014 se comprobó la corrección finita. Para INC-011 se comprobaron las cuotas y sus restos.

Las doce incidencias quedan tratadas en las soluciones, pero su estado original en el CSV se conserva abierto porque registra una ambigüedad real de la fuente. No cambia la clasificación ni la procedencia de los ejercicios.

## Continuación

- [ ] AUD002 · Revisar las once incidencias editoriales y de correspondencia con criterios.
- [ ] AUD003 · Revisar las cinco incidencias generales de fuentes y metadatos.
- [ ] SEL-AUD-01 · Auditoría matemática y didáctica independiente.
- [ ] SEL-PARTES · Selección de partes y apartados.

[Relación de correcciones](../../output/pdf/aud001-hipotesis-muestreo-con-soluciones.pdf) · [Proyecto modular](../../dist/Selectividad_Overleaf.zip).

`build` · Se recompilaron S031, S034 y S075 y la relación AUD001. Se revisaron las páginas afectadas y las tres páginas de AUD001. Los 640 enunciados, todos los CSV y las otras 637 soluciones conservan sus huellas. El catálogo y las 215 fuentes superaron la validación.
