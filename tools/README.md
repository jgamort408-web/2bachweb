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
