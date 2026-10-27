# Piloto LaTeX/PDF · Recuperación T1

20 de octubre de 2026 · Entrega 160 · T05 cerrada.

## Procedencia y conservación

F024 es el examen y F023 sus soluciones, en los ZIP de `../../Materiales y Recursos y Exámenes/`. Se conservan intactos. Las copias revisadas, el estilo común y el logo original están en `../content/latex/recuperacion-t1/`. `provenance.json` identifica ZIP, entradas y huellas SHA-256. El informe `pdf/recuperacion-t1-build.json` identifica las entradas y PDF finales.

Se conservan los dos ejercicios, cuatro apartados, 10 puntos, 55 minutos y permiso de calculadora. La redacción y la composición se han revisado; no se añaden preguntas evaluables. El solucionario explica y comprueba cada apartado.

## Revisión matemática

- 1(a): continuidad y derivadas laterales producen a=10, b=5; ambas ramas valen 7 y tienen pendiente 4 en la unión.
- 1(b): sus propios parámetros a=3, b=-2 dan P=(2,6), pendiente 8 y tangente y=8x-10. M08: se sustituye la vertical incorrecta del gráfico original.
- 2(a): dominio R sin -3, asíntotas x=-3 e y=0; decrece en cada rama. M15: no decrece en todo el dominio desconectado; -4<-2 pero g(-4)=-1<1=g(-2). El cambio de curvatura a través de -3 no crea un punto de inflexión, porque no pertenece al dominio.
- 2(b): área ln(7/5)=0,3364722366212129; cuadratura independiente 0,336472236621213. Acotada entre 2/7 y 2/5.

## Verificación técnica y visual

Dos compilaciones finales sin conexión producen las mismas huellas SHA-256. El examen tiene una página y las soluciones cuatro, todas A4. Se verifican títulos, idioma es-ES, páginas numeradas, texto extraíble, ausencia de cifrado, 10 y 18 fuentes incrustadas respectivamente, glifos de sustitución y desbordamientos del registro TeX. Se inspeccionaron las cinco páginas renderizadas: fórmulas, cabeceras, márgenes, tangente, ramas separadas y área sombreada, sin cortes ni solapamientos.

Las imágenes de inspección y los registros de compilación están en `../../tmp/pdfs/piloto-160/` y `../../tmp/pdfs/build-160/`. Los PDF no están etiquetados semánticamente: esta revisión no acredita accesibilidad con lector de pantalla, pendiente de T13. El texto matemático fuente permanece disponible en LaTeX.

## Catálogo y límites

Dos registros revisados en `../config/resources.json`, etiquetados por recuperación, trimestre y contenido. La solución depende del examen; el tema principal es t01 y las etiquetas reflejan también integrales. El catálogo contiene ahora 950 entidades. T07 implementará la biblioteca con búsqueda y filtros. Ocultar un enlace no protege un archivo estático ante quien conoce su dirección. T04 sigue pendiente de servicio central real.

## Recompilar

Desde la raíz del proyecto:

```powershell
node scripts/build-pdfs.mjs --engine RUTA/tectonic.exe --python RUTA/python.exe --cached
```

El proceso usa `config/pdf-build.json`, una carpeta temporal de salida y `scripts/check-pdfs.py` (requiere pypdf y pdfplumber). Solo copia la pareja a `output/pdf/` cuando pasan ambos documentos. Después de modificar contenido hay que repetir la revisión visual completa; el informe automático no la sustituye.

Motor portable Tectonic 0.17.0, sin instalación global. Binario local en `../../tmp/tools/tectonic-0.17.0/`; caché en `../../tmp/tools/tectonic-cache/`. Primera compilación: omitir `--cached` para descargar dependencias. Se emplea modo no confiable sin ejecución de comandos, fecha fija y modo determinista. No se envían los documentos al servicio de compilación: la compilación es local.

[Instalación oficial](https://tectonic-typesetting.github.io/book/latest/installation/) · [Versión oficial](https://github.com/tectonic-typesetting/tectonic/releases/tag/tectonic%400.17.0). ZIP Windows SHA-256: `f61ce51f0b0ade1015b7de7ef368541c5424e9756ecbd0d7af97d6d48030845f`. La huella del ejecutable consta en el informe de compilación.

## Siguiente lote T06

- [x] Localizar F029/F030 y conciliar documentos y variantes antes de fijar el número de PDF.
- [x] Aplicar M06 y M13 a copias revisadas y comprobar enunciados frente a soluciones.
- [x] Compilar cada documento y revisar todas sus páginas.
- [x] Registrar parejas, etiquetas, huellas y resultados; no publicar PDF sin revisar.
- [x] Actualizar el recuento: entrega 161, 4 de 30 tratados; quedan 26.

Lote completado: [auditoría F029/F030](auditoria-pdf-subida-nota-t1-general.md).
