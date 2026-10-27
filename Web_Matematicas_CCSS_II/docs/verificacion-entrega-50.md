# Verificación · Entrega 50

Fecha: 8 de octubre de 2026.

## Resultado

Disponible el [repaso integrado del tema 4](../libro/temas/04-matrices-y-determinantes/index.html#repaso): cuatro bloques con pistas, soluciones razonadas, enlaces de refuerzo y doce preguntas seleccionadas del banco existente.

La [auditoría](auditoria-tema-04.md) inventaría veinte problemas o bloques resueltos y relaciona los doce epígrafes con los diez ítems de test y los 24 conceptos de tarjetas originales. Se mantienen **72 preguntas y 72 tarjetas en t04**, **47 lecciones, 252 preguntas base, 235 tarjetas y diez widgets en el curso**.

## Cambios

- Índice del tema: ventas y márgenes; parámetro, adjunta y rango; potencias y ecuaciones; redes y saldos.
- Selección explícita de doce identificadores en `content/activities/review-t04.js`. Se reutilizan las mismas preguntas; no se agregan copias al catálogo.
- Enlaces al repaso desde las doce lecciones, portada y documentación.
- Estado del tema conservado como parcial. Diseño provisional, MathJax, preferencias y arquitectura sin cuentas conservados.

## Matemáticas

**185 pruebas acumuladas aprobadas**, cinco nuevas:

1. Selección de doce preguntas existentes, una por epígrafe; opciones, pistas, bancos 72/72 y totales 252/235.
2. Ventas: productos, distributiva, ingresos, costes, márgenes y traspuesta.
3. Parámetro: 17 valores enteros de −8 a 8; determinantes, adjuntas, rangos y productos. En t=±1 se verifican 41 miembros de cada familia y un término independiente incompatible. La solución simbólica del texto separa todos los casos; el muestreo es un contraste, no sustituye la demostración.
4. Potencias: productos iterados hasta n=30, inversa bilateral y sustitución de las soluciones de PX=B y XP=B. El texto demuestra el patrón por inducción.
5. Redes: G² y H², recorridos exactos, rango 2 con conectividad y saldos antisimétricos.

## Navegador y presentación

Prueba `tests/matrices-review-50-browser.cjs` aprobada:

- Cuatro pistas y soluciones, apertura con teclado y fórmulas sin errores.
- Test 11/12 al primer intento, respuesta vacía, error, pista, corrección y reinicio.
- Texto al 200 %, contraste y resaltado en móvil de 320 px; se revisan los cuatro bloques abiertos sin desbordar la página.
- La selección de respuesta se conserva al cambiar preferencias; al recargar se reinicia la sesión.
- Recorrido por las doce lecciones y retorno al repaso; bancos 72/72.
- Cabecera, pie y funcionamiento bajo una subcarpeta.

Capturas revisadas: `../../tmp/repaso-matrices-escritorio.png` y `../../tmp/repaso-matrices-movil.png`. Las fórmulas anchas conservan desplazamiento interno.

Regresión de grafos (entrega 49) y recorrido del catálogo completo de 252 preguntas y 235 tarjetas aprobados. No se registraron errores de página, fallos HTTP de recursos ni errores de MathJax en las pruebas.

## Revisión estática

Revisados los **171 HTML**: enlaces locales, fragmentos e identificadores sin errores. También se comprobaron los enlaces de README, auditoría del tema 4, procedencia y este documento.

## Límites y siguiente entrega

El tema sigue parcial: quedan Matrix Ops, La cámara del determinante, Redes y adyacencia, su recorrido conjunto y revisión con lectores de pantalla/pronunciación matemática. Siguiente entrega: **widget Matrix Ops**.

PDF de exámenes y soluciones, administración central, voz, traducción y extensión de cuentas siguen en sus fases globales. Los bloques de programación lineal y estadística se desarrollarán a partir de sus HTML originales, manteniendo señalados los huecos.
