# Verificación de la entrega 143

Fecha: 2026-10-18. Alcance: seis preguntas base integradas sobre una tabla ficticia.

- Fuentes conceptuales intactas: los cinco archivos usados por el banco conservan las huellas SHA-256 registradas en el inventario y comprobadas por el test. Los recuentos de las 200 fichas son una ampliación didáctica, no datos observados.
- Coherencia de la tabla: filas \(90+30=120\), \(40+40=80\); columnas \(90+40=130\), \(30+40=70\); total 200.
- Cálculos: resuelta \(130/200=0{,}65\); web y no resuelta \(30/200=0{,}15\); resuelta dado teléfono \(40/80=1/2\); teléfono dado resuelta \(40/130=4/13\); web o resuelta \((120+130-90)/200=0{,}80\); no independencia porque \(90/200=0{,}45\ne(120/200)(130/200)=0{,}39\).
- Banco: 45 preguntas del tema 7, con nueve originales adaptadas y 36 ampliaciones identificadas; 383 preguntas globales con identificadores únicos y 405 tarjetas sin cambios.
- Chrome local: 45 correcciones, pistas, MathJax sin errores, tablas con título y encabezados, teclado, raíz y subcarpeta, móvil con texto al 200 %, reinicio y 45 soluciones disponibles sin JavaScript. La lectura estática tampoco presenta desplazamiento horizontal a 390 px con texto al 200 %.
- Comando: `tests/probability-test-121-browser.cjs` actualizado para el banco actual. Resultado: **PASS**.

Faltan 15 preguntas base para el mínimo de 60 del tema y la prueba manual de lectura matemática con lector de pantalla.
