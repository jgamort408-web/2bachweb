# Instrucciones del proyecto

- Idioma de trabajo: español.
- **Empieza cada sesión leyendo [PLAN_WEB_OPERATIVA.md](PLAN_WEB_OPERATIVA.md)** (tareas y diario) y `git log --oneline -15`. Al terminar una tarea, márcala y añade una línea al Diario.
- Las tareas marcadas con 🗣️ requieren preguntar al docente antes de implementar. **Ningún rediseño visual empieza sin cerrar la fase 1 (consulta de diseño D01–D05).**
- Originales de solo lectura: `Selectividad/`, `Materiales y Recursos y Exámenes/`, `Página web existente/`.
- Web: `Web_Matematicas_CCSS_II/`. Comprobar con `npm test` (incluye enlaces). Tras copiar o mover páginas: `npm run fix:links`. Sin rutas absolutas (el sitio vive en una subcarpeta de GitHub Pages).
- PDF: `node scripts/build-pdfs.mjs --config config/pdf-build-<paquete>.json --cached`; Tectonic está en `tools/` (no versionado, ver `tools/README.md`).
- Selectividad: seguir `Selectividad_LaTeX/PLAN_DE_TRABAJO.md` y `docs/CRITERIOS_TRANSCRIPCION.md`; preparar la lectura de un lote con `tools/selectividad/leer_lote.py`.
- `tmp/` es desechable y no se versiona.
- Commits reales, pequeños y en rama; no hacer push a `main` sin que el docente lo pida.
