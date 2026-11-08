# Herramientas locales

Esta carpeta reúne lo que antes estaba en `tmp/tools/` y que **no es temporal**: sin ello no se pueden compilar ni verificar los PDF. `tmp/` vuelve a ser solo para salidas desechables (capturas, compilaciones intermedias y extracciones de lotes) y puede vaciarse.

| Ruta | Versionada en Git | Uso |
|---|---|---|
| `tectonic-0.17.0/` | No (binario de unos 100 MB) | Motor LaTeX fijado para `Web_Matematicas_CCSS_II/scripts/build-pdfs.mjs` y las comprobaciones locales de Selectividad |
| `tectonic-cache/` | No | Caché del bundle TeX; permite compilar sin red con `--cached` |
| `requirements.txt` | Sí | Dependencias Python de las verificaciones de PDF |
| `selectividad/leer_lote.py` | Sí | Preparación de la lectura de un lote del banco de Selectividad |

## Instalar Tectonic 0.17.0 en un equipo nuevo

1. Descargar `tectonic-0.17.0-x86_64-pc-windows-msvc.zip` desde las *releases* oficiales de `tectonic-typesetting/tectonic` en GitHub.
2. Descomprimir `tectonic.exe` en `tools/tectonic-0.17.0/`.
3. Comprobar: `tools/tectonic-0.17.0/tectonic.exe --version` debe responder `Tectonic 0.17.0`.
4. La primera compilación sin `--cached` descarga el bundle en `tools/tectonic-cache/`.

Se pueden usar otras rutas con las variables `TECTONIC_BIN` y `TECTONIC_CACHE_DIR`, o con `--engine` en `build-pdfs.mjs`.

## Python

```text
python -m pip install -r tools/requirements.txt
```

`build-pdfs.mjs` compila primero y después ejecuta `scripts/check-pdfs.py`; si faltan estas librerías la compilación termina sin publicar nada en `output/pdf/`.

## Leer un lote de Selectividad

```text
python tools/selectividad/leer_lote.py l027 examen=SRC-XXXXXXXXXXXX criterios=SRC-YYYYYYYYYYYY --esperados 468
```

Comprueba la huella de cada fuente en `Selectividad_LaTeX/datos/fuentes.csv`, guarda el control de los archivos previos y deja texto y páginas renderizadas en `tmp/pdfs/selectividad-<lote>/`. Sustituye a los `tmp/leer_lNNN.py` que se copiaban a mano en cada lote.


## DOC de Selectividad (L079 y siguientes)

`selectividad/convertir_doc.ps1` convierte copias de los DOC inventariados y comprueba SHA-256 antes y después. Requiere un ejecutable local de LibreOffice, indicado con `-Soffice`; no descarga ni instala software. Exporta primero a una carpeta temporal corta para evitar fallos de guardado del conversor en rutas largas o sincronizadas y copia los PDF al lote. Registra versión, argumentos, originales y derivados en `conversion-doc.json`. No sobrescribe conversiones existentes.

Ejemplo desde la raíz, en PowerShell:

```powershell
& tools/selectividad/convertir_doc.ps1 -Lote l080 -Soffice RUTA/soffice.com -Fuentes @('examen=SRC-233B0EB573AE','criterios=SRC-E63EDEDF9977')
```

Después usar `leer_lote.py` con las fuentes originales, `--pdf-convertido examen=tmp/pdfs/selectividad-l080/convertidos/examen.pdf`, el PDF de criterios y `--conversor` con la versión registrada. Sólo se admiten PDF derivados dentro de la carpeta del lote; `lectura-fuentes.json` conserva su relación con los DOC originales. La conversión no certifica por sí sola las fórmulas: es obligatorio revisar todas las páginas y las expresiones incrustadas.

En L079 se usó LibreOffice 26.8.2.2 extraído administrativamente bajo `tmp/selectividad/conversor/`, sin instalación del producto en Windows. Los binarios y el paquete se mantienen fuera del versionado; los scripts sí forman parte del proyecto.


En una conversión interrumpida, `-Reanudar` permite conservar un PDF ya generado únicamente después de comprobar su procedencia. El script exige que el DOC original y su copia mantengan la huella inventariada, verifica la cabecera del PDF y registra `reanudado=true` sin afirmar una nueva exportación. Cada éxito deja además `conversion-doc.parcial.json`; no se sobrescriben PDF por defecto. La revisión visual sigue siendo obligatoria.
