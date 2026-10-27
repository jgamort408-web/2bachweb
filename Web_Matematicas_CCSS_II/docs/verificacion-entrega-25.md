# Verificación · Entrega 25

Fecha: 29 de septiembre de 2026.

## Resultado

Recorrido integrado del tema 2 revisado y lección **3.1. Integral indefinida** desarrollada. Se mantienen el diseño provisional, MathJax compartido y las 171 páginas HTML. Curso: 28 lecciones, 126 preguntas base y 121 tarjetas. Tema 3: 1/8 lecciones con contenido, seis preguntas y seis tarjetas. T01 y t02 no se declaran cerrados: lectores de pantalla y lectura matemática siguen pendientes.

## Contenido de 3.1

- Definición F′=f y notación de integral indefinida como familia, no número o área calculada.
- Constante de integración y traslaciones verticales con igual pendiente en una misma abscisa.
- Condición inicial que fija una primitiva particular; comprobación de derivada y dato por separado.
- Ejemplos: 6x²; 3x²−4x+2 con F(1)=5; coste marginal 2q+5 con coste inicial 40 € y continuidad en cero; práctica 4x−3 con F(2)=1.
- Ampliación: constantes independientes en los dos intervalos del dominio de 1/x; precisión del alcance de «en un intervalo».
- Seis preguntas con pistas y feedback y seis tarjetas. No se adelanta la tabla sistemática de integrales de 3.2.

## Explorador

Modelos f=2x, 6x² y 3, con bases x², 2x³ y 3x. Control C entero de −6 a 6; a en {−1,0,1} y b en {−2,0,2}. Hay 351 estados. «Ajustar al dato» aplica C=b−F₀(a), siempre dentro del rango del control.

Gráfica elegida de trazo continuo, tres referencias opcionales a trazos, punto circular sobre la curva, cuadrado para la condición F(a)=b y segmento tangente. Las formas complementan el color. Descripción SVG, texto de valores y pendientes y tabla desplazable con teclado. Ventana x de −2 a 2, y de −10 a 10; se aclara que las curvas continúan fuera. El uso de «trazos discontinuos» describe el dibujo, no discontinuidades de las funciones.

## Archivos principales

- `libro/temas/03-integrales/01-integral-indefinida.html` e `index.html`.
- `content/models/antiderivatives.js`, `content/activities/antiderivatives.js`.
- `assets/js/learning/primitive-explorer.js` y estilos acotados en `learning.css`.
- `catalog.js` y `lesson.js`: catálogo y filtro t03, inicialización protegida del explorador.
- Índices de test/tarjetas, portada y estado editorial.
- Índice t02 y anfitriones de sus tres juegos: orientación, retornos y continuidad hacia integrales.
- Plan, README, procedencia y auditoría t02 actualizados.

## Pruebas ejecutadas

- **77 pruebas acumuladas superadas.**
- 351 estados: valores, derivadas numéricas independientes de las funciones originales, pendiente invariante al cambiar C, constante requerida y dato inicial cumplido.
- Ejemplos y práctica contrastados derivando; condiciones iniciales, K(3)=64 y constantes distintas por intervalo comprobadas.
- Bancos separados: preguntas 60/60/6 y tarjetas 61/54/6, total 126/121, identificadores únicos.
- **Navegador 3.1:** 27 combinaciones de familia/a/b con cambio de C y ajuste; marcas y pendientes contrastadas. Referencias ocultables, teclado Home/End en C, selección del test conservada durante cambios del explorador.
- Test de lección 5/6 con pista y reintento; seis tarjetas; ampliación y solución desplegadas sin errores LaTeX.
- Móvil 320 px, texto 200 %, contraste y resaltado, sin desbordamiento global; tabla desplazable con teclado. Fórmulas anchas con desplazamiento local.
- Filtros t03, tarjetas y test, índice 1/8 y prueba bajo subcarpeta.
- **Recorrido t02:** nueve lecciones disponibles, tres juegos insertados, navegación con teclado y retorno, test 60, tarjetas 54, estado global parcial y juegos revisados.
- **Regresión del catálogo:** tres lecciones avanzadas de t01, comparador, fórmulas dinámicas y recorrido acumulado de 126 preguntas y 121 tarjetas.
- **171 HTML sin rutas o fragmentos locales rotos ni IDs duplicados.**
- Capturas revisadas: `../../tmp/integral-indefinida-explorador.png` y `../../tmp/integral-indefinida-movil.png`.

La primera espera de la prueba de navegador seleccionaba todos los SVG del explorador, incluidos los de MathJax. Se acotó al SVG directo de la figura; la ejecución final pasa. No requirió cambiar el motor de fórmulas.

## Límites y siguiente entrega

La revisión con lectores de pantalla/pronunciación matemática no está realizada; no se declara certificación de accesibilidad. Administración central, PDF, voz, traducción y extensión de cuentas siguen en sus fases globales. No se repitieron los ensayos de fallos de red del motor MathJax, que no cambia.

Siguiente: **3.2. Integrales inmediatas**, con tabla basada en derivadas, linealidad, excepción de la potencia n=−1, ejemplos, práctica y comprobación.
