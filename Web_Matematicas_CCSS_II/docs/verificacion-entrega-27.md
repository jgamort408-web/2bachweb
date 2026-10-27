# Verificación · Entrega 27

Fecha: 29 de septiembre de 2026.

## Resultado y contenido

Desarrollada 3.3. Integrales casi inmediatas. Regla de la cadena al revés, función interior, identidad de ajuste constante, tabla de patrones y dominios. Ocho cálculos en siete bloques de ejemplos: potencia lineal, potencia cuadrática, cociente cuadrático, cociente lineal con punto excluido, dos exponenciales de base e, base 2 y raíz. Práctica con suma y condición inicial. Se aclara por qué un ajuste variable no puede tratarse como constante y por qué no reconocer un patrón no implica que no exista primitiva.

Seis preguntas base y seis tarjetas nuevas. Entrenamiento de seis retos por sesión, mostrando función interior y derivada, con opciones, pista, dos intentos y comprobación por la cadena. Resumen temporal y nuevas variantes al reiniciar. Curso: 30 lecciones, 138 preguntas base y 133 tarjetas; tema 3: 3/8 lecciones, 18 preguntas y 18 tarjetas. Las variantes se cuentan aparte.

## Archivos principales (desde la raíz web)

- `libro/temas/03-integrales/03-integrales-casi-inmediatas.html`.
- `content/models/near-immediate-integrals.js`: modelos reproducibles, fracciones reducidas, dominios, generador y funciones numéricas de contraste.
- `content/activities/near-immediate-integrals.js`: preguntas y tarjetas editoriales.
- `assets/js/learning/near-immediate-practice.js`: montaje protegido con el motor común de test.
- `content/activities/catalog.js`, `assets/js/learning/lesson.js`: integración sin modificar el motor MathJax.
- `assets/css/learning.css`: tabla con desplazamiento local y anchura mínima de la primera columna.
- `config/editorial.json`, índices, portada, README, plan y procedencia.

## Verificación matemática

85 pruebas acumuladas superadas. Las cuatro nuevas están en `tests/near-immediate-integrals.test.mjs`:

- 1000 semillas, 6000 integrales y 24000 opciones: derivadas numéricas de las funciones originales, igualdad del integrando con λu′h(u), una única respuesta válida en varios puntos y variedad de sesiones. Las familias cubren potencias lineales y cuadráticas, logaritmos lineales y cuadráticos, exponenciales lineales de base e y cuadráticas de otra base.
- Ajustes positivos y negativos; potencias enteras negativas de x²+d; punto cero cuando u′=0; logaritmos con argumento de ambos signos, evitando el punto excluido. Reproducibilidad por semilla.
- Todos los ejemplos y la práctica contrastados mediante diferencias centrales; dato F(0)=4. Los contraejemplos fallan la igualdad de derivadas. Se comprueban también los patrones de seno y coseno compuestos.
- Fracciones: signo, reducción y rechazo de denominador cero. Bancos separados, identificadores únicos, opciones inequívocas y delimitadores LaTeX conservados.

## Navegador y presentación

`tests/near-immediate-integrals-27-browser.cjs` verifica dos rondas procedurales y el test de lección (18 respuestas), seis tarjetas, pista, reintento, selección vacía, bloqueo tras resolver y reinicio. La práctica conserva la opción elegida en el test independiente. Recargar elimina las respuestas.

Se exige presencia de contenedores MathJax en la tabla, los pasos, las opciones y la corrección, además de ausencia de errores y delimitadores pendientes. Tabla desplazable con teclado y botón de comprobar activado mediante Enter. Móvil de 320 px, texto al 200 %, contraste y resaltado, sin desbordamiento horizontal global; las fórmulas largas conservan desplazamiento local. Filtros t03 18/18, índice 3/8 y funcionamiento bajo subcarpeta, con cabecera y pie.

El primer ensayo suponía que desde el radio bastaba un único Tab para llegar a Comprobar. Las fórmulas largas añaden regiones desplazables al recorrido del foco. Se corrigió esa suposición del ensayo y se comprobó la activación con Enter con el botón enfocado. La inspección visual detectó el encabezado «Integrando» partido en escritorio; se ajustó el ancho mínimo de esa columna.

Regresiones superadas: lección 3.2 y entrenamiento; tres lecciones avanzadas de t01 y catálogo completo de 138 preguntas/133 tarjetas. Revisión de 171 HTML: cero rutas locales rotas, fragmentos ausentes o IDs duplicados.

Capturas revisadas: `../../tmp/integrales-casi-inmediatas-tabla.png` y `../../tmp/integrales-casi-inmediatas-movil.png`.

## Límites y siguiente contenido

Se conserva el diseño provisional. La revisión con lectores de pantalla y pronunciación matemática sigue pendiente; las pruebas realizadas no certifican accesibilidad. No se repiten los ensayos de fallos de red del motor MathJax, que no cambia. Continúan pendientes los PDF, la administración central, traducción, voz y extensión futura de cuentas. El tema 3 todavía está en desarrollo.

Siguiente: **3.4. Métodos de integración**, empezando por elegir el procedimiento, simplificación algebraica y cambio de variable sencillo, con profundidad ajustada a las fuentes locales.
