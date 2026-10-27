# Plan de acción y registro de avances

Inicio: 16 de septiembre de 2026. Documento vivo del desarrollo.

Estado vigente al 20 de octubre: [resumen del proyecto](docs/estado-proyecto.md) y [análisis de lo pendiente para cumplir el plan](docs/analisis-pendientes-plan-2026-10-18.md). Las cifras y siguientes tareas de entradas antiguas se conservan como historial.

Ejecución del cierre: [tandas T01–T16](docs/PLAN_CIERRE_POR_TANDAS.md), con dependencias, tareas y criterios de salida. T01–T03 y T05 cerradas en las entregas 157–160. T04 requiere configurar el servicio central; T06 es el siguiente trabajo independiente.

## Reglas de trabajo

- **Criterio del usuario (7 de octubre): programación lineal, estadística bidimensional, distribuciones e inferencia se construirán a partir de todos los HTML originales. Los huecos quedarán sin desarrollar o con mejoras pendientes; no se generará contenido para rellenarlos ni para cumplir cuotas.** Rutas y revisión por archivo: [criterio de reutilización](docs/criterio-reutilizacion-html-estadistica-pl-inferencia.md).

- Seguir `../PROMPT_MAESTRO_WEB_MATEMATICAS_CCSS_II.md`, el guion y el inventario de la carpeta superior. Conservar los originales.
- Trabajar en entregas pequeñas completas: leer fuentes → desarrollar → comprobar matemáticas e interacción → actualizar este documento.
- `[x]` significa terminado y verificado; `[ ]` significa pendiente, incluso si hay trabajo parcial. Cada avance se registra abajo con un mensaje de estilo `feat:`, `fix:`, `test:` o `docs:`. Estos mensajes son un diario, no commits reales de Git.
- Un epígrafe terminado incluye objetivos, requisitos, teoría suficiente, ejemplos resueltos, práctica con explicación, errores frecuentes, resumen y enlaces. La cobertura de su tema completo se valida por separado.
- Cada tema requiere además ≥12 problemas desarrollados, ≥60 ítems base de test, variantes de cálculo, tarjetas y sus laboratorios. No contar una variante numérica como una pregunta base nueva.
- Todo el contenido se conserva en el proyecto. La visibilidad para alumnado se controlará desde el panel del administrador con persistencia central; no sustituirlo por un editor local.
- Acceso público sin cuentas del alumnado. No guardar respuestas, historial ni estadísticas personales. La futura extensión de cuentas queda desactivada.
- Al cerrar cada entrega indicar archivos principales, comprobaciones, límites y siguiente tarea concreta.
- Mantener el diseño provisional hasta abordar expresamente esa fase. Clasificar los textos por función editorial para aplicar después distintas tipografías y estilos; conservar la configuración de LaTeX. Referencia: docs/estructura-editorial-y-diseno.md.

## Orden de ejecución

1. Crear una primera secuencia completa de límites y los componentes reutilizables.
2. Completar análisis (temas 1–3), avanzando por epígrafes y sus actividades.
3. Completar álgebra y decisiones (temas 4–6).
4. Integrar azar y datos (temas 7–9) y los dos apoyos. Para los bloques estadísticos, aplicar el criterio de reutilización del usuario: conservar originales y registrar huecos sin completarlos automáticamente.
5. Conciliar y compilar los 30 paquetes LaTeX, publicar biblioteca etiquetada.
6. Completar accesibilidad, administración y las integraciones que necesitan configuración externa.
7. Revisar el conjunto, documentar y preparar GitHub Pages.

Los componentes de navegación, accesibilidad y revisión se mejoran durante todas las fases. Ningún servicio externo sin configurar se dará por operativo.

## A. Base común

- [x] Crear estructura: 141 páginas, componentes compartidos y 28 carpetas de widgets.
- [x] Comprobar rutas, cabecera/pie y carga en raíz y subcarpeta.
- [x] Guardar este plan con inventario de tareas y diario de avances.
- [x] Crear portada e índice que orienten hacia los contenidos desarrollados sin eliminar las páginas pendientes.
- [x] Establecer plantilla de lección y estilos de lectura, ejemplos, práctica y fórmulas accesibles.
- [x] Crear registro de procedencia y revisiones matemáticas.
- [x] Motor inicial de práctica y test con explicación y sin persistencia personal.
- [x] Motor de tarjetas para repaso libre.
- [x] Catálogo de estado editorial separado del control administrativo de visibilidad.
- [ ] Buscador del libro y filtros de actividades.
- [ ] Revisar diseño visual cohesionado, móvil, impresión y navegación por teclado.

### A.1. Fórmulas LaTeX y recuperación

- [x] Revisar la configuración de los HTML originales y fijar MathJax compatible.
- [x] Incluir el motor local con licencia y procedencia.
- [x] Crear carga única, caché y cola de procesamiento.
- [x] Añadir tiempos máximos, tres intentos con espera y recuperación manual/sin recarga de página.
- [x] Integrar contenido dinámico y widgets.
- [x] Probar fallos transitorios y persistentes, conservación de respuestas y concurrencia.
- [x] Revisar fracciones, límites, matrices, integrales, sumatorios y delimitadores.
- [x] Documentar la API compartida y sus límites.
- [ ] Comprobar el rendimiento y la accesibilidad matemática del curso completo conforme crezca.

## B. Libro: 86 epígrafes

### 1. Límites y derivadas

- [x] `t01-e01` 1.1. Límite de una función — `libro/temas/01-limites-y-derivadas/01-limite-de-una-funcion.html`
- [x] `t01-e02` 1.2. Límites laterales — `libro/temas/01-limites-y-derivadas/02-limites-laterales.html`
- [x] `t01-e03` 1.3. Operaciones con el infinito — `libro/temas/01-limites-y-derivadas/03-operaciones-con-el-infinito.html`
- [x] `t01-e04` 1.4. Límites infinitos en un punto finito — `libro/temas/01-limites-y-derivadas/04-limites-infinitos-en-un-punto-finito.html`
- [x] `t01-e05` 1.5. Límites finitos en el infinito — `libro/temas/01-limites-y-derivadas/05-limites-finitos-en-el-infinito.html`
- [x] `t01-e06` 1.6. Límites infinitos en el infinito — `libro/temas/01-limites-y-derivadas/06-limites-infinitos-en-el-infinito.html`
- [x] `t01-e07` 1.7. Operaciones con límites de funciones — `libro/temas/01-limites-y-derivadas/07-operaciones-con-limites-de-funciones.html`
- [x] `t01-e08` 1.8. Cálculo de límites sencillos — `libro/temas/01-limites-y-derivadas/08-calculo-de-limites-sencillos.html`
- [x] `t01-e09` 1.9. Indeterminaciones — `libro/temas/01-limites-y-derivadas/09-indeterminaciones.html`
- [x] `t01-e10` 1.10. Continuidad — `libro/temas/01-limites-y-derivadas/10-continuidad.html`
- [x] `t01-e11` 1.11. Función derivada — `libro/temas/01-limites-y-derivadas/11-funcion-derivada.html`
- [x] `t01-e12` 1.12. Derivadas laterales — `libro/temas/01-limites-y-derivadas/12-derivadas-laterales.html`
- [x] `t01-e13` 1.13. Ecuaciones de las rectas tangente y normal — `libro/temas/01-limites-y-derivadas/13-ecuaciones-de-las-rectas-tangente-y-normal.html`
- [x] `t01-e14` 1.14. Tabla de derivadas — `libro/temas/01-limites-y-derivadas/14-tabla-de-derivadas.html`
- [x] `t01-e15` 1.15. Reglas de derivación — `libro/temas/01-limites-y-derivadas/15-reglas-de-derivacion.html`
- [x] `t01-e16` 1.16. Regla de la cadena — `libro/temas/01-limites-y-derivadas/16-regla-de-la-cadena.html`
- [x] `t01-e17` 1.17. Continuidad de las funciones derivables — `libro/temas/01-limites-y-derivadas/17-continuidad-de-las-funciones-derivables.html`
- [x] `t01-e18` 1.18. Regla de L'Hôpital. Aplicación al cálculo de límites — `libro/temas/01-limites-y-derivadas/18-regla-de-l-hopital-aplicacion-al-calculo-de-limites.html`
- [ ] Cerrar t01: ≥12 problemas, ≥60 test base con cobertura y variantes, mazo completo, actividades, revisión matemática y de accesibilidad.

### 2. Representación de funciones

- [x] `t02-e01` 2.1. Esquema general para representar una función — `libro/temas/02-representacion-de-funciones/01-esquema-general-para-representar-una-funcion.html`
- [x] `t02-e02` 2.2. Funciones polinómicas — `libro/temas/02-representacion-de-funciones/02-funciones-polinomicas.html`
- [x] `t02-e03` 2.3. Funciones racionales — `libro/temas/02-representacion-de-funciones/03-funciones-racionales.html`
- [x] `t02-e04` 2.4. Funciones exponenciales — `libro/temas/02-representacion-de-funciones/04-funciones-exponenciales.html`
- [x] `t02-e05` 2.5. Funciones logarítmicas — `libro/temas/02-representacion-de-funciones/05-funciones-logaritmicas.html`
- [x] `t02-e06` 2.6. Funciones a trozos. Valor absoluto — `libro/temas/02-representacion-de-funciones/06-funciones-a-trozos-valor-absoluto.html`
- [x] `t02-e07` 2.7. Traslaciones — `libro/temas/02-representacion-de-funciones/07-traslaciones.html`
- [x] `t02-e08` 2.8. Expansión y contracción — `libro/temas/02-representacion-de-funciones/08-expansion-y-contraccion.html`
- [x] `t02-e09` 2.9. Optimización de funciones — `libro/temas/02-representacion-de-funciones/09-optimizacion-de-funciones.html`
- [ ] Cerrar t02: ≥12 problemas, ≥60 test base con cobertura y variantes, mazo completo, actividades, revisión matemática y de accesibilidad.

### 3. Integrales

- [x] `t03-e01` 3.1. Integral indefinida — `libro/temas/03-integrales/01-integral-indefinida.html`
- [x] `t03-e02` 3.2. Integrales inmediatas — `libro/temas/03-integrales/02-integrales-inmediatas.html`
- [x] `t03-e03` 3.3. Integrales casi inmediatas — `libro/temas/03-integrales/03-integrales-casi-inmediatas.html`
- [x] `t03-e04` 3.4. Métodos de integración — `libro/temas/03-integrales/04-metodos-de-integracion.html`
- [x] `t03-e05` 3.5. Integral definida — `libro/temas/03-integrales/05-integral-definida.html`
- [x] `t03-e06` 3.6. Teorema fundamental del cálculo — `libro/temas/03-integrales/06-teorema-fundamental-del-calculo.html`
- [x] `t03-e07` 3.7. Regla de Barrow — `libro/temas/03-integrales/07-regla-de-barrow.html`
- [x] `t03-e08` 3.8. Aplicaciones de la integral — `libro/temas/03-integrales/08-aplicaciones-de-la-integral.html`
- [ ] Cerrar t03: ≥12 problemas, ≥60 test base con cobertura y variantes, mazo completo, actividades, revisión matemática y de accesibilidad.

### 4. Matrices y determinantes

- [x] `t04-e01` 4.1. Matrices: definición, características y tipos — `libro/temas/04-matrices-y-determinantes/01-matrices-definicion-caracteristicas-y-tipos.html`
- [x] `t04-e02` 4.2. Operaciones con matrices — `libro/temas/04-matrices-y-determinantes/02-operaciones-con-matrices.html`
- [x] `t04-e03` 4.3. Producto de matrices — `libro/temas/04-matrices-y-determinantes/03-producto-de-matrices.html`
- [x] `t04-e04` 4.4. Potencia de una matriz — `libro/temas/04-matrices-y-determinantes/04-potencia-de-una-matriz.html`
- [x] `t04-e05` 4.5. Comparación de matrices. Matriz simétrica y matriz antisimétrica — `libro/temas/04-matrices-y-determinantes/05-comparacion-de-matrices-matriz-simetrica-y-matriz-antisimetrica.html`
- [x] `t04-e06` 4.6. Determinante de una matriz — `libro/temas/04-matrices-y-determinantes/06-determinante-de-una-matriz.html`
- [x] `t04-e07` 4.7. Propiedades de los determinantes — `libro/temas/04-matrices-y-determinantes/07-propiedades-de-los-determinantes.html`
- [x] `t04-e08` 4.8. Desarrollo de un determinante — `libro/temas/04-matrices-y-determinantes/08-desarrollo-de-un-determinante.html`
- [x] `t04-e09` 4.9. Matriz inversa y matriz adjunta — `libro/temas/04-matrices-y-determinantes/09-matriz-inversa-y-matriz-adjunta.html`
- [x] `t04-e10` 4.10. Rango de una matriz — `libro/temas/04-matrices-y-determinantes/10-rango-de-una-matriz.html`
- [x] `t04-e11` 4.11. Ecuaciones matriciales — `libro/temas/04-matrices-y-determinantes/11-ecuaciones-matriciales.html`
- [x] `t04-e12` 4.12. Grafos y matriz de adyacencia asociada — `libro/temas/04-matrices-y-determinantes/12-grafos-y-matriz-de-adyacencia-asociada.html`
- [ ] Cerrar t04: ≥12 problemas, ≥60 test base con cobertura y variantes, mazo completo, actividades, revisión matemática y de accesibilidad.

### 5. Sistemas de ecuaciones

- [x] `t05-e01` 5.1. Sistemas de ecuaciones lineales — `libro/temas/05-sistemas-de-ecuaciones/01-sistemas-de-ecuaciones-lineales.html`
- [x] `t05-e02` 5.2. Solución de un sistema de ecuaciones — `libro/temas/05-sistemas-de-ecuaciones/02-solucion-de-un-sistema-de-ecuaciones.html`
- [x] `t05-e03` 5.3. Clasificación de sistemas de ecuaciones según sus soluciones — `libro/temas/05-sistemas-de-ecuaciones/03-clasificacion-de-sistemas-de-ecuaciones-segun-sus-soluciones.html`
- [x] `t05-e04` 5.4. Notación matricial de un sistema de ecuaciones — `libro/temas/05-sistemas-de-ecuaciones/04-notacion-matricial-de-un-sistema-de-ecuaciones.html`
- [x] `t05-e05` 5.5. Sistemas equivalentes — `libro/temas/05-sistemas-de-ecuaciones/05-sistemas-equivalentes.html`
- [x] `t05-e06` 5.6. Teorema de Rouché-Frobenius — `libro/temas/05-sistemas-de-ecuaciones/06-teorema-de-rouche-frobenius.html`
- [x] `t05-e07` 5.7. Resolución de sistemas. Matriz inversa — `libro/temas/05-sistemas-de-ecuaciones/07-resolucion-de-sistemas-matriz-inversa.html`
- [x] `t05-e08` 5.8. Resolución de sistemas. Método de Gauss — `libro/temas/05-sistemas-de-ecuaciones/08-resolucion-de-sistemas-metodo-de-gauss.html`
- [x] `t05-e09` 5.9. Resolución de sistemas. Regla de Cramer — `libro/temas/05-sistemas-de-ecuaciones/09-resolucion-de-sistemas-regla-de-cramer.html`
- [x] `t05-e10` 5.10. Sistemas homogéneos — `libro/temas/05-sistemas-de-ecuaciones/10-sistemas-homogeneos.html`
- [x] `t05-e11` 5.11. Discusión de sistemas con parámetros — `libro/temas/05-sistemas-de-ecuaciones/11-discusion-de-sistemas-con-parametros.html`
- [ ] Cerrar t05: ≥12 problemas, ≥60 test base con cobertura y variantes, mazo completo, actividades, revisión matemática y de accesibilidad.

### 6. Programación lineal

- [ ] `t06-e01` 6.1. Inecuaciones lineales con dos incógnitas — `libro/temas/06-programacion-lineal/01-inecuaciones-lineales-con-dos-incognitas.html`
- [ ] `t06-e02` 6.2. Sistemas de inecuaciones lineales con dos incógnitas — `libro/temas/06-programacion-lineal/02-sistemas-de-inecuaciones-lineales-con-dos-incognitas.html`
- [ ] `t06-e03` 6.3. Programación lineal — `libro/temas/06-programacion-lineal/03-programacion-lineal.html`
- [ ] `t06-e04` 6.4. Solución de un problema de programación lineal — `libro/temas/06-programacion-lineal/04-solucion-de-un-problema-de-programacion-lineal.html`
- [ ] `t06-e05` 6.5. Problemas de programación lineal — `libro/temas/06-programacion-lineal/05-problemas-de-programacion-lineal.html`
- [ ] Cerrar t06: ≥12 problemas, ≥60 test base con cobertura y variantes, mazo completo, actividades, revisión matemática y de accesibilidad.

### 7. Probabilidad

- [ ] `t07-e01` 7.1. Sucesos. Regla de Laplace — `libro/temas/07-probabilidad/01-sucesos-regla-de-laplace.html`
- [ ] `t07-e02` 7.2. Álgebra de sucesos — `libro/temas/07-probabilidad/02-algebra-de-sucesos.html`
- [ ] `t07-e03` 7.3. Tablas de contingencia — `libro/temas/07-probabilidad/03-tablas-de-contingencia.html`
- [ ] `t07-e04` 7.4. Frecuencias — `libro/temas/07-probabilidad/04-frecuencias.html`
- [ ] `t07-e05` 7.5. Axiomática de Kolmogórov — `libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html`
- [ ] `t07-e06` 7.6. Propiedades de la probabilidad — `libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html`
- [ ] `t07-e07` 7.7. Experimentos compuestos — `libro/temas/07-probabilidad/07-experimentos-compuestos.html`
- [ ] `t07-e08` 7.8. Probabilidad condicionada — `libro/temas/07-probabilidad/08-probabilidad-condicionada.html`
- [ ] `t07-e09` 7.9. Probabilidad total — `libro/temas/07-probabilidad/09-probabilidad-total.html`
- [ ] `t07-e10` 7.10. Teorema de Bayes — `libro/temas/07-probabilidad/10-teorema-de-bayes.html`
- [ ] Cerrar t07: ≥12 problemas, ≥60 test base con cobertura y variantes, mazo completo, actividades, revisión matemática y de accesibilidad.

### 8. Distribuciones de probabilidad

- [ ] `t08-e01` 8.1. Variable aleatoria — `libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html`
- [ ] `t08-e02` 8.2. Distribución binomial — `libro/temas/08-distribuciones-de-probabilidad/02-distribucion-binomial.html`
- [ ] `t08-e03` 8.3. Distribución normal — `libro/temas/08-distribuciones-de-probabilidad/03-distribucion-normal.html`
- [ ] `t08-e04` 8.4. Aproximación de la distribución binomial a la distribución normal — `libro/temas/08-distribuciones-de-probabilidad/04-aproximacion-de-la-distribucion-binomial-a-la-distribucion-normal.html`
- [ ] Cerrar t08: ≥12 problemas, ≥60 test base con cobertura y variantes, mazo completo, actividades, revisión matemática y de accesibilidad.

### 9. Inferencia estadística

- [ ] `t09-e01` 9.1. Estadística inferencial — `libro/temas/09-inferencia-estadistica/01-estadistica-inferencial.html`
- [ ] `t09-e02` 9.2. Muestreo — `libro/temas/09-inferencia-estadistica/02-muestreo.html`
- [ ] `t09-e03` 9.3. Técnicas de muestreo — `libro/temas/09-inferencia-estadistica/03-tecnicas-de-muestreo.html`
- [ ] `t09-e04` 9.4. Distribución muestral. Teorema central del límite — `libro/temas/09-inferencia-estadistica/04-distribucion-muestral-teorema-central-del-limite.html`
- [ ] `t09-e05` 9.5. Estimación puntual y estimación por intervalos — `libro/temas/09-inferencia-estadistica/05-estimacion-puntual-y-estimacion-por-intervalos.html`
- [ ] `t09-e06` 9.6. Intervalos de probabilidad o intervalos característicos — `libro/temas/09-inferencia-estadistica/06-intervalos-de-probabilidad-o-intervalos-caracteristicos.html`
- [ ] `t09-e07` 9.7. Intervalos de confianza — `libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html`
- [ ] `t09-e08` 9.8. Tamaño de la muestra. Error cometido — `libro/temas/09-inferencia-estadistica/08-tamano-de-la-muestra-error-cometido.html`
- [ ] `t09-e09` 9.9. Ficha técnica de encuestas — `libro/temas/09-inferencia-estadistica/09-ficha-tecnica-de-encuestas.html`
- [ ] Cerrar t09: ≥12 problemas, ≥60 test base con cobertura y variantes, mazo completo, actividades, revisión matemática y de accesibilidad.

## C. Apoyos y secciones

- [ ] Combinatoria: migrar y revisar teoría, calculadora, ejercicios y juego.
- [ ] Estadística bidimensional: migrar y revisar las ocho fuentes.
- [ ] Practicar: selección por tema, epígrafe, dificultad y destreza.
- [ ] Test: práctica, reto opcional y simulacro con informe de sesión.
- [ ] Flashcards: mazos de todos los temas y repaso de errores de la sesión.
- [ ] Laboratorios: catálogo de actividades desarrolladas y controles por teclado.
- [ ] Herramientas: formulario completo, glosario, tabla normal y calculadoras.
- [ ] Exámenes: selección por tema, simulacros y enlaces separados a soluciones.
- [ ] Recursos: búsqueda, etiquetas, descarga y relación examen–solución.

## D. Widgets: desarrollo y comprobación individual

- [x] `t01-a-limite-express` Límite Express — `widgets/games/t01-a-limite-express/index.html`
- [x] `t01-b-continuidad-repara-la-funcion` Continuidad: repara la función — `widgets/games/t01-b-continuidad-repara-la-funcion/index.html`
- [x] `t01-c-derivada-detective` Derivada Detective — `widgets/games/t01-c-derivada-detective/index.html`
- [x] `t01-d-tangente-sprint` Tangente Sprint — `widgets/games/t01-d-tangente-sprint/index.html`
- [x] `t02-a-construye-la-grafica` Construye la gráfica — `widgets/games/t02-a-construye-la-grafica/index.html`
- [x] `t02-b-transforma-la-funcion` Transforma la función — `widgets/games/t02-b-transforma-la-funcion/index.html`
- [x] `t02-c-optimiza` Optimiza — `widgets/games/t02-c-optimiza/index.html`
- [x] `t03-a-parejas-de-primitivas` Parejas de primitivas — `widgets/games/t03-a-parejas-de-primitivas/index.html`
- [x] `t03-b-metodo-correcto` Método correcto — `widgets/games/t03-b-metodo-correcto/index.html`
- [x] `t03-c-area-por-tramos` Área por tramos — `widgets/games/t03-c-area-por-tramos/index.html`
- [x] `t04-a-matrix-ops` Matrix Ops — `widgets/games/t04-a-matrix-ops/index.html`
- [x] `t04-b-la-camara-del-determinante` La cámara del determinante — `widgets/games/t04-b-la-camara-del-determinante/index.html`
- [x] `t04-c-redes-y-adyacencia` Redes y adyacencia — `widgets/games/t04-c-redes-y-adyacencia/index.html`
- [x] `t05-a-clasificador-de-sistemas` Clasificador de sistemas — `widgets/games/t05-a-clasificador-de-sistemas/index.html` (entrega 67)
- [x] `t05-b-gauss-paso-a-paso` Gauss paso a paso — `widgets/games/t05-b-gauss-paso-a-paso/index.html` (entrega 68)
- [x] `t05-c-elige-el-metodo` Elige el método — `widgets/games/t05-c-elige-el-metodo/index.html` (entrega 69)
- [ ] `t06-a-pinta-la-region-factible` Pinta la región factible — `widgets/games/t06-a-pinta-la-region-factible/index.html`
- [ ] `t06-b-cazador-de-vertices` Cazador de vértices — `widgets/games/t06-b-cazador-de-vertices/index.html`
- [ ] `t06-c-fabrica-de-modelos` Fábrica de modelos — `widgets/games/t06-c-fabrica-de-modelos/index.html`
- [x] `t07-a-algebra-de-sucesos` Álgebra de sucesos — `widgets/games/t07-a-algebra-de-sucesos/index.html` (entrega 122)
- [x] `t07-b-arbol-de-probabilidad` Árbol de probabilidad — `widgets/games/t07-b-arbol-de-probabilidad/index.html` (entrega 123)
- [x] `t07-c-detective-bayes` Detective Bayes — `widgets/games/t07-c-detective-bayes/index.html` (entrega 124)
- [ ] `t08-a-binomial-factory` Binomial Factory — `widgets/games/t08-a-binomial-factory/index.html`
- [ ] `t08-b-normal-slider` Normal Slider — `widgets/games/t08-b-normal-slider/index.html`
- [ ] `t08-c-correccion-de-continuidad` Corrección de continuidad — `widgets/games/t08-c-correccion-de-continuidad/index.html`
- [ ] `t09-a-disena-la-muestra` Diseña la muestra — `widgets/games/t09-a-disena-la-muestra/index.html`
- [ ] `t09-b-constructor-de-intervalos` Constructor de intervalos — `widgets/games/t09-b-constructor-de-intervalos/index.html`
- [ ] `t09-c-auditor-de-encuestas` Auditor de encuestas — `widgets/games/t09-c-auditor-de-encuestas/index.html`

Cada widget debe poder ejecutarse solo y embebido, tener alternativas al arrastre/tiempo, explicaciones, parámetros válidos y pruebas de su generador. La carpeta vacía no cuenta como actividad terminada.

## E. LaTeX y PDF

- [ ] Aplicar M13 en la copia revisada de F029: corregir el paso logarítmico y el dominio, conciliar documentos y compilar/verificar sus PDF. La lección 3.4 ya usa el desarrollo correcto.

Por cada paquete: extraer en carpeta propia → leer enunciados y soluciones → conciliar duplicados/parejas → corregir en copia → compilar → revisar visualmente → registrar los PDF resultantes. Una casilla solo se cierra tras documentar su destino, aunque dos paquetes alimenten la misma pareja de PDF.

- [ ] `BACH - 2 CCSS - EXAMEN SUBIDA NOTA CURSO.zip`
- [ ] `BACH - 2º SOC - Distribuciones de Probabilidad (2).zip`
- [ ] `BACH - 2º SOC - Distribuciones de Probabilidad.zip`
- [ ] `BACH - 2º SOC - Ejercicios repaso.zip`
- [ ] `BACH - 2º SOC - Examen Final.zip`
- [ ] `BACH - 2º SOC - Examen Funciones (Copy).zip`
- [ ] `BACH - 2º SOC - Examen Funciones.zip`
- [ ] `BACH - 2º SOC - Examen Límites y Derivadas.zip`
- [ ] `BACH - 2º SOC - Examen Resuelto Recuperación.zip`
- [ ] `BACH - 2º SOC - Inferencia Estadística (EXAMEN I y II).zip`
- [ ] `BACH - 2º SOC - Inferencia Estadística (EXAMEN I).zip`
- [ ] `BACH - 2º SOC - Inferencia Estadística (EXAMEN II).zip`
- [ ] `BACH - 2º SOC - Inferencia Estadística.zip`
- [ ] `BACH - 2º SOC - Matrices I.zip`
- [ ] `BACH - 2º SOC - Matrices II.zip`
- [ ] `BACH - 2º SOC - Matrices III.zip`
- [ ] `BACH - 2º SOC - Probabilidad (2).zip`
- [ ] `BACH - 2º SOC - Probabilidad.zip`
- [ ] `BACH - 2º SOC - Programación Lineal (Soluciones 1).zip`
- [ ] `BACH - 2º SOC - Programación Lineal (Soluciones 2).zip`
- [ ] `BACH - 2º SOC - Programación Lineal 1.zip`
- [ ] `BACH - 2º SOC - Programación Lineal 2.zip`
- [ ] `BACH - 2º SOC - Recuperación T1 Soluciones.zip`
- [ ] `BACH - 2º SOC - Recuperación T1.zip`
- [ ] `BACH - 2º SOC - SELs I (SOLUCIONES).zip`
- [ ] `BACH - 2º SOC - SELs I.zip`
- [ ] `BACH - 2º SOC - SELs II (SOLUCIONES).zip`
- [ ] `BACH - 2º SOC - SELs II.zip`
- [ ] `BACH - 2º SOC - Subida de nota T1 General Soluciones.zip`
- [ ] `BACH - 2º SOC - Subida de nota T1 General.zip`

- [ ] Resolver incidencias M01–M12 del inventario y registrar nuevos hallazgos.
- [ ] Manifestar todos los PDF con fuente, tema, tipo, etiquetas, fecha y relación entre examen y soluciones.
- [ ] Verificar que no se han perdido ejercicios locales válidos.

## F. Accesibilidad e idiomas

- [x] Entrega 11: conectar tamaño, contraste y resaltado; revisar navegación de t01, propagación a juegos y conservación de respuestas.
- [x] Controles comunes de tamaño (100–200 %), contraste y resaltado.
- [ ] Completar controles de espaciado, movimiento y concentración.
- [x] Persistir únicamente preferencias de lectura, con alternativa en memoria si se deniega almacenamiento.
- [ ] Incorporar la preferencia de idioma cuando se habilite la traducción.
- [ ] Verificar traducción mediante servicios oficiales de Google y documentar requisitos reales.
- [ ] Lectura en voz alta, selección de voz disponible, pausa, cancelación y lectura de fórmulas. No prometer voces de Google si el dispositivo no las ofrece.
- [x] Comprobar propagación de ajustes a los cuatro widgets desarrollados, también en subcarpeta y sin almacenamiento.
- [ ] Revisión con teclado, foco, lector de pantalla, zoom al 200 %, móvil y contraste.

## G. Administración y extensión futura

- [ ] Esquema central de visibilidad por sección, tema, actividad y PDF, con herencia y dependencias. Contratos y cálculo terminados en T02/T03; servicio compartido pendiente en T04.
- [ ] Aplicar visibilidad a todos los listados, búsquedas y rutas. Vistas y rutas existentes terminadas en T03; buscador común pendiente en T10.
- [ ] Preparar autenticación del administrador y reglas de autorización del servicio externo.
- [ ] Panel con vista previa, cambios pendientes, guardado global y gestión de conflictos.
- [ ] Historial, restauración, respaldo y estado sin conexión.
- [ ] Probar persistencia real en dos navegadores y propagación de cambios. Depende de un servicio configurado.
- [ ] Preparar adaptadores de cuentas/progreso del alumnado, desactivados y sin login público.
- [ ] Documentar que ocultar archivos estáticos no impide descargar sus URL directas.

## H. Cierre y publicación

- [ ] Auditoría de cobertura de 86 epígrafes, apoyos, 28 actividades y todos los materiales originales.
- [ ] Pruebas matemáticas de generadores, respuestas y casos límite.
- [ ] Comprobar enlaces, recursos locales, rutas en subcarpeta y recuperación de errores.
- [ ] Revisar todas las páginas desarrolladas en escritorio y móvil.
- [ ] Documentación docente, técnica y de publicación en GitHub Pages.
- [ ] Configurar y verificar el alojamiento cuando estén disponibles el repositorio y los servicios necesarios.

## Estado y siguiente entrega

**Entrega 83 cerrada (14 de octubre):** nueve ejercicios y 32 pasos originales integrados con selector, soluciones desplegables y tablas accesibles. Corregidos Σxy=216, Sxy=3,52 y r≈0,889 del ejercicio 2; interpretaciones revisadas. Pruebas y capturas verificadas. Siguiente: flashcards originales.

**Entrega 82 cerrada (13 de octubre):** regresión integrada con mínimos cuadrados, geometría corregida, ejemplo original 7→7,6 y determinación 72,25 %. Laboratorio confirmado como estático; LaTeX y lectura verificados. Siguiente: ejercicios resueltos.

**Entrega 81 cerrada (13 de octubre):** Pearson integrado desde el original con fórmula, escala, tres valores e interpretación causal; requisitos y límites corregidos. LaTeX, lectura ampliada y regresión verificados. Siguiente: regresión lineal y su laboratorio.

**Entrega 80 cerrada (13 de octubre):** covarianza integrada desde el original, con fórmula, signos e interpretación; cambio de unidades corregido a 0,15→15. LaTeX, lectura ampliada y regresión verificados. Siguiente: coeficiente de correlación de Pearson.

**Entrega 79 cerrada (13 de octubre):** cuatro diagramas de dispersión y centro de gravedad reutilizados, con puntos conservados, correcciones documentadas y lectura verificada en escritorio/móvil. Siguiente: La covarianza.

**Entrega 78 cerrada (13 de octubre):** serie simple, tabla de 50 familias, marginales y medias verificadas, con diez fuentes intactas y lectura en escritorio/móvil. Apoyo parcial; siguiente: La nube de puntos.

**Entrega 77 cerrada (13 de octubre):** integrada la presentación original de estadística bidimensional en su apoyo: repaso 1D, esquema dimensional, pares y tabla de 43 alumnos. Doce frecuencias conservadas, marginales comprobados y categoría Aprobado distinguida de superar la asignatura. Nueve fuentes intactas, LaTeX, gráficos, tabla por teclado, móvil 320 px/texto 200 %, navegación raíz/subcarpeta y 172 HTML verificados. Totales sin cambios: 58 lecciones desarrolladas, cinco parciales, 318 preguntas, 320 tarjetas y dieciséis juegos; se añade un apoyo parcial. Siguiente: 1. La variable bidimensional.txt. Evidencia: [verificación](docs/verificacion-entrega-77.md) y [auditoría](docs/auditoria-reutilizacion-estadistica-bidimensional.md).

**Entrega 76 cerrada (13 de octubre):** integradas las 19 flashcards originales de programación lineal con cinco categorías, correcciones documentadas y motor común de tarjetas. Verificadas todas las respuestas en raíz/subcarpeta, filtros, LaTeX, teclado, móvil 320 px/texto 200 %, ocho fuentes intactas y mazos anteriores. Tres pruebas de catálogo superadas; 172 HTML sin enlaces rotos. Totales: 58 lecciones desarrolladas y cinco parciales, 318 preguntas, 320 tarjetas y dieciséis juegos. Los siete archivos de programación lineal están integrados con carencias explícitas. Siguiente: presentación original de estadística bidimensional. Evidencia: [verificación](docs/verificacion-entrega-76.md) y [auditoría](docs/auditoria-reutilizacion-programacion-lineal.md).

**Entrega 75 cerrada (13 de octubre):** integrados en 6.5 los seis ejercicios originales, 23 pasos, selector y laboratorio GeoGebra bajo demanda. Corregidos escapes LaTeX, precisión de drones, mínimo señalado en minerales y dominio/geometría de refinería; datos y soluciones finales conservados. Siete fuentes intactas, seis modelos exactos, navegador, fallos/reintento del laboratorio, servicio real, regresión 6.4 y 172 HTML verificados. Totales: 58 lecciones desarrolladas y cinco parciales, 318 preguntas, 301 tarjetas y dieciséis juegos. Siguiente: 6. Flashcards.txt. Evidencia: [verificación](docs/verificacion-entrega-75.md) y [auditoría](docs/auditoria-reutilizacion-programacion-lineal.md).

**Entrega 74 cerrada (12 de octubre):** adaptado El método gráfico en 6.4 con cinco pasos y las dos variantes originales de sillas/mesas. Corregidos región, tablas y máximo: 450 € con 9 mesas; recursos originales conservados. Seis fuentes intactas, cálculos independientes, SVG, LaTeX local, recarga, teclado, móvil y subcarpeta verificados; regresiones de 6.1–6.3 aprobadas y 171 HTML sin enlaces rotos. Totales: 58 lecciones desarrolladas y cuatro parciales, 318 preguntas, 301 tarjetas y dieciséis widgets. Siguiente: 5. Ejercicios Resueltos.txt para integrar 6.5. Evidencia: [verificación](docs/verificacion-entrega-74.md) y [auditoría](docs/auditoria-reutilizacion-programacion-lineal.md).

**Entrega 73 cerrada (12 de octubre):** integrado el HTML original de programación lineal en 6.3: variables, función objetivo, restricciones, diagrama y no negatividad contextual. Sin inventar problema numérico ni actividades ausentes. Verificados fuentes intactas, LaTeX local, navegación, móvil, subcarpeta y regresiones de 6.1–6.2. Totales: 58 lecciones desarrolladas y tres parciales, 318 preguntas, 301 tarjetas y dieciséis widgets. Siguiente: 4. El método gráfico.txt para adaptar 6.4. Evidencia: [verificación](docs/verificacion-entrega-73.md) y [auditoría](docs/auditoria-reutilizacion-programacion-lineal.md).

**Entrega 72 cerrada (12 de octubre):** integrado el HTML original de sistemas de inecuaciones en 6.2. Conservados sistema, intersección, vértices y tipos de región; corregidos escala, bordes incluidos y condiciones de óptimos. Verificados cuatro vértices independientes, 286 puntos factibles, LaTeX local, móvil, subcarpeta, integridad de fuentes y regresión de 6.1. Totales: 58 lecciones desarrolladas y dos parciales, 318 preguntas, 301 tarjetas y dieciséis widgets. Siguiente: 3. Programación Lineal.txt para adaptar 6.3 y revisar la no negatividad. Evidencia: [verificación](docs/verificacion-entrega-72.md) y [auditoría](docs/auditoria-reutilizacion-programacion-lineal.md).

**Entrega 71 cerrada (11 de octubre):** reutilizados Presentación e Inecuaciones originales. Índice del tema 6 y 6.1 con definición, gráfico y método; corregidos hipótesis de recta, punto de prueba y geometría. 6.1 permanece parcial, sin inventar test ni explorador. Originales intactos por SHA-256; verificados gráfico, LaTeX local, lectura móvil, índice parcial, subcarpeta y enlaces. Total: 58 lecciones desarrolladas y una parcial, 318 preguntas, 301 tarjetas y dieciséis widgets. Siguiente: 2. Sistemas de inecuaciones.txt para adaptar 6.2. Evidencia: [verificación](docs/verificacion-entrega-71.md) y [auditoría por fuente](docs/auditoria-reutilizacion-programacion-lineal.md).

**Entrega 70 cerrada (11 de octubre):** conectado el recorrido del tema 5 con contenidos previos, refuerzos, invitaciones desde 5.6/5.8/5.11 y navegación entre los tres juegos. Verificados once epígrafes, test 66/66, 66 tarjetas, juegos insertados e independientes, teclado, lectura al 200 %, subcarpeta y enlaces. Totales sin cambios: 58 lecciones, 318 preguntas, 301 tarjetas y dieciséis widgets. Tema 5 parcial por accesibilidad global. Siguiente: programación lineal desde los HTML originales, comenzando por presentación e inecuaciones y señalando carencias. Evidencia: [verificación de la entrega 70](docs/verificacion-entrega-70.md).

**Entrega 69 cerrada (11 de octubre):** disponible Elige el método, widget independiente e insertable con seis familias, estrategias justificadas, alternativas válidas y explicación de eficiencia. Verificadas 6.000 situaciones, puntuación, LaTeX, teclado, móvil y subcarpeta; 277 pruebas acumuladas. Total: 58 lecciones, 318 preguntas, 301 tarjetas y dieciséis widgets; t05 conserva 66/66. Siguiente: recorrido conjunto de los tres juegos. Tema 5 parcial por ese recorrido y accesibilidad global. Evidencia: [verificación de la entrega 69](docs/verificacion-entrega-69.md).

**Entrega 68 cerrada (11 de octubre):** disponible Gauss paso a paso, widget independiente e insertable con seis sistemas, operaciones exactas, historial, deshacer, pistas, asistencia y clasificación final. Acepta rutas alternativas y pivotes no unitarios. Verificados 6.000 sistemas, límites, puntuación y recorrido de navegador; 271 pruebas acumuladas. Total: 58 lecciones, 318 preguntas, 301 tarjetas y quince widgets; t05 conserva 66/66. Siguiente: Elige el método (5C). Tema 5 parcial por ese juego, recorrido conjunto y accesibilidad global. Evidencia: [verificación de la entrega 68](docs/verificacion-entrega-68.md).

**Entrega 67 cerrada (11 de octubre):** disponible Clasificador de sistemas, widget independiente e insertable con doce retos por sesión en cuatro representaciones. Clasificación exacta, pistas, dos intentos, explicación y resumen. Verificadas 1.000 sesiones/12.000 retos, geometría, puntuación y navegador; 265 pruebas acumuladas. Total: 58 lecciones, 318 preguntas, 301 tarjetas y catorce widgets; t05 conserva 66/66. Siguiente: Gauss paso a paso (5B). Tema 5 parcial por dos juegos, recorrido conjunto y accesibilidad global. Evidencia: docs/verificacion-entrega-67.md.

**Entrega 66 cerrada (11 de octubre):** repaso integrado del tema 5 con cuatro bloques resueltos y once preguntas existentes, una por epígrafe. Auditoría con dieciséis problemas/bloques y cobertura de los 22 conceptos fuente de tarjetas. Corregida una frase de 5.1 sobre intercambio de ecuaciones; las once lecciones enlazan al repaso. Total sin cambios: 58 lecciones, 318 preguntas, 301 tarjetas y trece widgets; t05 66/66. Superadas 260 pruebas y recorrido de navegador. Siguiente: widget Clasificador de sistemas (5A). Tema 5 parcial por videojuegos y accesibilidad global. Evidencia: docs/verificacion-entrega-66.md.

**Entrega 65 cerrada (11 de octubre):** desarrollada 5.11. Discusión de sistemas con parámetros: seis discusiones completas, práctica de mezclas, explorador con muestras exactas y variantes equivalentes, seis preguntas y seis tarjetas. Total: 58 lecciones, 318 preguntas y 301 tarjetas; trece widgets. Tema 5: 11/11 epígrafes y bancos 66/66, todavía parcial por repaso, auditoría, juegos y accesibilidad global. Siguiente: repaso integrado y auditoría de cobertura del tema 5. Evidencia: docs/verificacion-entrega-65.md.

**Entrega 64 cerrada (11 de octubre):** desarrollada 5.10. Sistemas homogéneos: definición, rango y determinante, seis ejemplos, práctica y explorador con B nulo, familias exactas y selección de soluciones mediante parámetros. Ocho casos, variantes y seis preguntas/tarjetas nuevas. 1.539 matrices exhaustivas y 4.000 variantes contrastadas; 250 pruebas acumuladas, navegador, regresión de 5.9 y enlaces aprobados. Total: 57 lecciones, 312 preguntas, 295 tarjetas y trece widgets. Tema 5: 10/11 epígrafes. Siguiente: 5.11. Discusión de sistemas con parámetros. Evidencia: docs/verificacion-entrega-64.md.

**Entrega 63 cerrada (10 de octubre):** desarrollada 5.9. Regla de Cramer: condiciones, seis ejemplos, comparación con Gauss, práctica y explorador de columnas sustituidas, determinantes y soluciones exactas. Ocho casos, variantes y seis preguntas/tarjetas nuevas. 729 sistemas exhaustivos y 6.000 variantes contrastados; 245 pruebas acumuladas, navegador, regresión de 5.8 y enlaces aprobados. Total: 56 lecciones, 306 preguntas, 289 tarjetas y trece widgets. Tema 5: 9/11 epígrafes. Siguiente: 5.10. Sistemas homogéneos. Evidencia: docs/verificacion-entrega-63.md.

**Entrega 62 cerrada (10 de octubre):** desarrollada 5.8. Método de Gauss: teoría, seis ejemplos, práctica y explorador de eliminación por pasos, sustitución exacta, contradicciones y familias paramétricas. Ocho casos, variantes y seis preguntas/tarjetas nuevas. 729 sistemas exhaustivos y 4.000 variantes contrastados; 240 pruebas acumuladas, navegador, regresión de 5.7 y enlaces aprobados. Total: 55 lecciones, 300 preguntas, 283 tarjetas y trece widgets. Tema 5: 8/11 epígrafes. Siguiente: 5.9. Regla de Cramer. Evidencia: docs/verificacion-entrega-62.md.

**Entrega 61 cerrada (10 de octubre):** desarrollada 5.7. Resolución mediante matriz inversa: condiciones, seis ejemplos, práctica y explorador con fracciones exactas, comprobación y clasificación de casos singulares. Seis preguntas y seis tarjetas nuevas. 729 sistemas exhaustivos y 6.000 variantes contrastados; 235 pruebas acumuladas, navegador, regresión de 5.6 y enlaces aprobados. Total: 54 lecciones, 294 preguntas, 277 tarjetas y trece widgets. Tema 5: 7/11 epígrafes. Siguiente: 5.8. Método de Gauss. Evidencia: docs/verificacion-entrega-61.md.

**Entrega 60 cerrada (10 de octubre):** desarrollada 5.6. Rouché–Frobenius: compatibilidad y unicidad por rangos, seis ejemplos, práctica y explorador con justificación mediante menores, variantes y parámetro. Seis preguntas y seis tarjetas nuevas. 729 casos exhaustivos, 2.000 adicionales y 3.000 variantes contrastados; 230 pruebas acumuladas, navegador, regresión de 5.5 y enlaces aprobados. Total: 53 lecciones, 288 preguntas, 271 tarjetas y trece widgets. Tema 5: 6/11 epígrafes. Siguiente: 5.7. Matriz inversa. Evidencia: docs/verificacion-entrega-60.md.

**Entrega 59 cerrada (9 de octubre):** desarrollada 5.5. Sistemas equivalentes: operaciones reversibles, ampliada completa, seis ejemplos, práctica y taller con fracciones exactas, historial y deshacer. Seis preguntas y seis tarjetas nuevas. 10.000 transformaciones contrastadas; 225 pruebas acumuladas, navegador, regresión de 5.4 y enlaces aprobados. Total: 52 lecciones, 282 preguntas, 265 tarjetas y trece widgets. Tema 5: 5/11 epígrafes. Siguiente: 5.6. Rouché–Frobenius. Evidencia: docs/verificacion-entrega-59.md.

**Entrega 58 cerrada (9 de octubre):** desarrollada 5.4. Notación matricial: A, X, B, ampliada, dimensiones y correspondencia de filas/columnas. Seis ejemplos, práctica contextual, explorador editable, seis preguntas y seis tarjetas nuevas. 8.000 permutaciones contrastadas; 220 pruebas acumuladas, navegador, regresión de 5.3 y enlaces aprobados. Total: 51 lecciones, 276 preguntas, 259 tarjetas y trece widgets. Tema 5: 4/11 epígrafes. Siguiente: 5.5. Sistemas equivalentes. Evidencia: docs/verificacion-entrega-58.md.

**Entrega 57 cerrada (9 de octubre):** desarrollada 5.3. Clasificación de sistemas: SCD/SCI/SI, identidades, contradicciones, seis ejemplos, práctica contextual y seis familias procedurales. Seis preguntas y seis tarjetas nuevas. 6.000 variantes contrastadas; 215 pruebas acumuladas, navegador, regresión de 5.2 y enlaces aprobados. Total: 50 lecciones, 270 preguntas, 253 tarjetas y trece widgets. Tema 5: 3/11 epígrafes. Siguiente: 5.4. Notación matricial. Evidencia: docs/verificacion-entrega-57.md.

**Entrega 56 cerrada (9 de octubre):** desarrollada 5.2. Solución de un sistema de ecuaciones: conjunto solución, rectas, seis ejemplos, práctica y explorador con fracciones exactas, parámetro y ventanas. Seis preguntas y seis tarjetas nuevas. 14.400 pares de rectas y 3.000 variantes contrastados; 210 pruebas acumuladas, navegador, regresión de 5.1 y enlaces aprobados. Total: 49 lecciones, 264 preguntas, 247 tarjetas y trece widgets. Tema 5: 2/11 epígrafes. Siguiente: 5.3. Clasificación de sistemas. Evidencia: docs/verificacion-entrega-56.md.

**Entrega 55 cerrada (9 de octubre):** desarrollada 5.1. Sistemas de ecuaciones lineales: conceptos, cinco ejemplos, práctica, explorador de sustitución simultánea y variantes. Seis preguntas y seis tarjetas nuevas, con filtro t05. 4000 sistemas contrastados; 205 pruebas acumuladas, navegador, regresión del repaso de matrices y enlaces aprobados. Total: 48 lecciones, 258 preguntas, 241 tarjetas y trece widgets. Tema 5: 1/11 epígrafes. Siguiente: 5.2. Solución de un sistema de ecuaciones. Evidencia: docs/verificacion-entrega-55.md.

**Entrega 54 cerrada (8 de octubre):** recorrido conjunto del tema 4 verificado: doce lecciones, test 72/72, 72 tarjetas y tres juegos con refuerzos y retornos. Preferencias conservadas, teclado, móvil 320 px/texto 200 % y cadena en subcarpeta. 200 pruebas acumuladas y regresión del repaso aprobadas. Se mantienen 47 lecciones, 252 preguntas, 235 tarjetas y trece widgets. Tema 4 parcial por lectores de pantalla y pronunciación matemática. Siguiente: 5.1. Sistemas de ecuaciones lineales. Evidencia: docs/verificacion-entrega-54.md.

**Entrega 53 cerrada (8 de octubre):** Redes y adyacencia disponible como widget y página anfitriona: seis redes para traducir entre grafos y matrices, nodos móviles, conexiones por teclado, pistas y soluciones. 1000 semillas/6000 redes contrastadas; 200 pruebas acumuladas aprobadas, dos partidas completas y regresiones de grafos y La cámara del determinante. Trece widgets disponibles; se mantienen 47 lecciones, 252 preguntas y 235 tarjetas. Tema 4 parcial; siguiente: recorrido conjunto de los tres juegos. Evidencia: docs/verificacion-entrega-53.md.

**Entrega 52 cerrada (8 de octubre):** La cámara del determinante disponible como widget y página anfitriona: seis salas, dieciocho cerraduras, pistas, reintentos y solución final mediante cofactor traspuesto. 1000 semillas/6000 salas contrastadas; 195 pruebas acumuladas aprobadas, dos partidas completas y regresiones de Matrix Ops y repaso verificadas. Doce widgets disponibles; se mantienen 47 lecciones, 252 preguntas y 235 tarjetas. Tema 4 parcial; siguiente: Redes y adyacencia. Evidencia: docs/verificacion-entrega-52.md.

**Entrega 51 cerrada (8 de octubre):** Matrix Ops disponible como widget y página anfitriona: ocho retos, dieciséis decisiones, tipos variables, dimensiones previas, cálculos, pistas y resumen. 1000 sesiones/8000 retos contrastados; 190 pruebas acumuladas aprobadas, partidas completas y regresión del repaso verificadas. Once widgets disponibles; se mantienen 47 lecciones, 252 preguntas y 235 tarjetas. Tema 4 parcial; siguiente: La cámara del determinante. Evidencia: docs/verificacion-entrega-51.md.

**Entrega 50 cerrada (8 de octubre):** repaso integrado de matrices con cuatro bloques, doce preguntas seleccionadas sin duplicación y auditoría de veinte problemas/bloques resueltos. Se conservan 72 preguntas y 72 tarjetas en t04; 47 lecciones, 252 preguntas y 235 tarjetas en el curso. 185 pruebas acumuladas, recorrido de las doce lecciones, regresión de grafos, catálogo y 171 HTML verificados. El tema sigue parcial por sus tres juegos y accesibilidad global. Siguiente: Matrix Ops. Evidencia: docs/verificacion-entrega-50.md.

**Entrega 49 cerrada (7 de octubre):** desarrollada 4.12. Grafos y matriz de adyacencia: cinco ejemplos, editor de redes, recorridos y potencias, seis preguntas y seis tarjetas. Tema 4: 12/12 epígrafes, 72 preguntas y 72 tarjetas; siguen pendientes repaso integrado, auditoría y tres juegos. Total: 47 lecciones, 252 preguntas base, 235 tarjetas y diez widgets. 180 pruebas acumuladas, regresión de 4.11, catálogo y 171 HTML verificados. Evidencia: docs/verificacion-entrega-49.md.

**Entrega 43 cerrada (6 de octubre):** desarrollada 4.6. Determinante de una matriz: fórmulas de órdenes 1–3, Sarrus, signos, inversa y parámetro. Cinco ejemplos, práctica, siete bases explorables y variantes; seis preguntas y seis tarjetas nuevas. Tema 4: 6/12 epígrafes con contenido. Total: 41 lecciones, 216 preguntas base, 199 tarjetas y diez widgets. 151 pruebas acumuladas, regresión de 4.5, catálogo y enlaces superados. Evidencia: docs/verificacion-entrega-43.md.

**Entrega 42 cerrada (6 de octubre):** desarrollada 4.5. Comparación de matrices, simetría y antisimetría: igualdad, traspuesta, condiciones completas y diagonal. Cinco ejemplos, práctica, siete bases explorables, comparación de pares y variantes; seis preguntas y seis tarjetas nuevas. Tema 4: 5/12 epígrafes con contenido. Total: 40 lecciones, 210 preguntas base, 193 tarjetas y diez widgets. 146 pruebas acumuladas, regresión de 4.4, catálogo y enlaces superados. Evidencia: docs/verificacion-entrega-42.md.

**Entrega 41 cerrada (6 de octubre):** desarrollada 4.4. Potencia de una matriz: definición, propiedades, patrones, cinco ejemplos, práctica y explorador con siete bases y exponentes 0–6. Seis preguntas y seis tarjetas nuevas. Tema 4: 4/12 epígrafes con contenido. Total: 39 lecciones, 204 preguntas base, 187 tarjetas y diez widgets. 141 pruebas acumuladas, regresión de 4.3 y recorrido del catálogo superados. Evidencia: docs/verificacion-entrega-41.md.

**Entrega 40 cerrada (6 de octubre):** desarrollada 4.3. Producto de matrices. Compatibilidad, orden, cálculo fila por columna, propiedades, contraejemplos, ingresos y composición de transformaciones. Cinco ejemplos resueltos, práctica, explorador de AB/BA con selección de casillas, cuatro ejemplos cargables y variantes; seis preguntas y seis tarjetas nuevas. Tema 4: 3/12 epígrafes; estado parcial. Total: 38 lecciones, 198 preguntas base, 181 tarjetas y diez widgets. 136 pruebas acumuladas superadas. Evidencia: docs/verificacion-entrega-40.md.

**Entrega 39 cerrada (5 de octubre):** desarrollada 4.2. Operaciones con matrices: suma, resta, producto por escalar, propiedades y combinaciones lineales. Cuatro ejemplos resueltos, práctica, editor de dos matrices con dimensiones independientes, variantes y cálculo por casillas. Seis preguntas y seis tarjetas nuevas. Tema 4: 2/12 epígrafes; estado parcial. Total: 37 lecciones, 192 preguntas base, 175 tarjetas y diez widgets. 131 pruebas acumuladas, recorrido del catálogo y regresión de 4.1 superados. Evidencia: docs/verificacion-entrega-39.md.

**Entrega 38 cerrada (5 de octubre):** desarrollada 4.1. Matrices: definición, características y tipos. Orden, posiciones, clasificación con inclusiones, igualdad y lectura de datos. Cuatro ejemplos resueltos, práctica con parámetro, editor de matrices de 1×1 a 4×4, ocho ejemplos cargables, variantes, seis preguntas y seis tarjetas. Tema 4: 1/12 epígrafes; estado parcial. Total: 36 lecciones, 186 preguntas base, 169 tarjetas y diez widgets. 126 pruebas acumuladas y recorrido completo del catálogo superados. Evidencia: docs/verificacion-entrega-38.md.

**Entrega 37 cerrada (5 de octubre):** revisión integrada de t03 completada: ocho lecciones, test 60/60, 48 tarjetas, repaso y tres juegos. Orientación por bloques, refuerzo desde 3.3/3.4/3.8 y enlaces entre juegos con retorno al repaso. Respuestas conservadas al cambiar preferencias; recorrido en móvil, texto al 200 % y subcarpeta verificados. 122 pruebas acumuladas superadas. Total sin cambios: 35 lecciones, 180 preguntas base, 163 tarjetas y diez widgets. El tema permanece parcial únicamente por la revisión global de accesibilidad pendiente. Evidencia: docs/verificacion-entrega-37.md.

**Entrega 36 cerrada (5 de octubre):** Área por tramos desarrollado como widget independiente e insertable. Seis curvas variables y dieciocho pasos: cortes, integrales parciales y comparación integral/área. Incluye contacto, raíz en extremo y signo constante; gráfica seleccionable, tabla, fracciones, decimales, pistas y soluciones. 122 pruebas acumuladas superadas, 6000 curvas contrastadas y dos partidas completas en navegador. Diez widgets desarrollados, incluidos los tres de integrales. Totales sin cambios: 35 lecciones, 180 preguntas base y 163 tarjetas. Tema 3 parcial por recorrido conjunto y accesibilidad global. Evidencia: docs/verificacion-entrega-36.md.

**Entrega 35 cerrada (5 de octubre):** Método correcto desarrollado como widget independiente e insertable. Ocho retos variables y dieciséis decisiones: estrategia y familia de primitivas. Cuatro rutas, con dos retos de ampliación por partes; pistas, dos intentos y resumen explicado. 117 pruebas acumuladas superadas, 8000 integrandos contrastados y dos partidas completas en navegador. Nueve widgets desarrollados. Total sin cambios: 35 lecciones, 180 preguntas base y 163 tarjetas. Tema 3 parcial: Área por tramos, recorrido conjunto y accesibilidad global pendientes. Evidencia: docs/verificacion-entrega-35.md.

**Entrega 34 cerrada (5 de octubre):** Parejas de primitivas desarrollado como widget independiente e insertable. Diez parejas en dos tableros, variantes, pistas, dos intentos, soluciones y bonus por racha. Verificadas 1000 sesiones generadas y dos partidas completas en navegador. 113 pruebas acumuladas superadas. Total sin cambios: 35 lecciones, 180 preguntas base y 163 tarjetas. Tema 3 parcial: dos juegos y revisión global de accesibilidad pendientes. Evidencia: docs/verificacion-entrega-34.md.

**Entrega 33 cerrada (1 de octubre):** repaso integrado de t03 con cuatro bloques resueltos y doce preguntas nuevas. Auditoría de ocho epígrafes, veinte problemas/bloques inventariados y cobertura de los 18 conceptos originales de tarjetas. Tema 3: 60 preguntas base y 48 tarjetas. Total: 35 lecciones, 180 preguntas base y 163 tarjetas. El tema sigue parcial por sus tres videojuegos y la revisión global de accesibilidad. Evidencia: docs/auditoria-tema-03.md y docs/verificacion-entrega-33.md.

**Entrega 32 cerrada (1 de octubre):** desarrollada 3.8. Aplicaciones de la integral: áreas con eje y entre curvas, cortes, orden, tramos, acumulación y unidades. Dos ejemplos locales revisados. Explorador de cuatro familias y 600 configuraciones, seis retos procedurales por sesión, seis preguntas base y seis tarjetas nuevas. Total: 35 lecciones, 168 preguntas base y 163 tarjetas. Tema 3: 8/8 epígrafes y 48 preguntas/tarjetas. El tema permanece parcial: faltan repaso global, cobertura mínima de 60 preguntas, laboratorios y revisión de accesibilidad. Verificación: docs/verificacion-entrega-32.md.

**Entrega 31 cerrada (1 de octubre):** desarrollada 3.7. Regla de Barrow: condiciones, extremos, signos, constantes, dominio, tramos e integral frente a área. Incluye el ejercicio 2(b) revisado de recuperación T1, laboratorio de 225 configuraciones y seis familias procedurales. Seis preguntas base y seis tarjetas nuevas. Total: 34 lecciones, 162 preguntas base y 157 tarjetas. Tema 3: 7/8 epígrafes y bancos de 42 preguntas/tarjetas. Verificación: docs/verificacion-entrega-31.md.

**Entrega 30 cerrada (30 de septiembre):** desarrollada 3.6. Teorema fundamental del cálculo: derivada de la acumulación, dato inicial, continuidad, crecimiento, ejemplos y puente hacia Barrow. Explorador de cuatro integrandos, dos gráficos, secantes laterales, origen variable y contraejemplo con salto; 324 configuraciones. Seis preguntas y seis tarjetas nuevas. Total: 33 lecciones, 156 preguntas base y 151 tarjetas. Tema 3: 6/8 epígrafes y bancos de 36 preguntas/tarjetas. Verificación: docs/verificacion-entrega-30.md.

**Entrega 24 cerrada (29 de septiembre):** Optimiza desarrollado como widget independiente e insertable. Cuatro microhistorias y veinte decisiones por sesión: objetivo, dominio, candidatos, extremo e interpretación. Variantes con límite de capacidad, beneficio negativo, extremos excluidos y empate entero. Tema 2: nueve lecciones y sus tres laboratorios desarrollados; cierre global pendiente de revisión integrada y lectores de pantalla. Total del curso sin cambios: 27 lecciones, 120 preguntas base y 115 tarjetas. Verificación: docs/verificacion-entrega-24.md.

**Entrega 23 cerrada (29 de septiembre):** Transforma la función desarrollado como widget independiente e insertable. Seis objetivos procedurales de tres familias; diez acciones sobre la gráfica actual, comparación de funciones equivalentes, registro de movimientos, puntuación y ruta de solución sin historial. Corregidos delimitadores LaTeX en este widget y en la explicación de Construye la gráfica. Tema 2: dos laboratorios desarrollados; Optimiza pendiente. Total: 27 lecciones, 120 preguntas base y 115 tarjetas. Verificación: docs/verificacion-entrega-23.md.

**Entrega 22 cerrada (29 de septiembre):** Construye la gráfica desarrollado como widget independiente e insertable. Seis retos procedurales de tres familias; cuatro gráficas por ficha, descripción textual, pistas, dos intentos y resumen sin historial. El tema 2 tiene un laboratorio desarrollado y dos pendientes. Total del curso sin cambios: 27 lecciones, 120 preguntas base y 115 tarjetas; las variantes del juego se cuentan por separado. Verificación en docs/verificacion-entrega-22.md.

**Entrega 21 cerrada (29 de septiembre):** repaso integrado del tema 2 en su índice, tres problemas resueltos desplegables y seis preguntas transversales. Total: 27 lecciones, 120 preguntas base y 115 tarjetas. Tema 2: 60 preguntas, 54 tarjetas y 21 problemas inventariados. Estado global parcial por laboratorios y revisión con lectores de pantalla. Véanse docs/auditoria-tema-02.md y docs/verificacion-entrega-21.md.

**Entrega 20 cerrada (28 de septiembre):** desarrollada 2.9 con función objetivo, restricciones, candidatos, frontera, cantidades enteras y problemas de beneficio, coste medio, ingreso y dimensiones. Explorador de 24 escenarios, selección de cantidad y comparación de candidatos. Añadidas seis preguntas y seis tarjetas. Total: 27 lecciones, 114 preguntas base y 115 tarjetas; t02 tiene sus 9 lecciones desarrolladas, 54 preguntas y 54 tarjetas. El cierre global del tema permanece pendiente. Verificación en docs/verificacion-entrega-20.md.

**Entrega 19 cerrada (28 de septiembre):** desarrollada 2.8 con escalas verticales y horizontales, regla (u,v)→(u/b,av), reflexiones, intervalos, extremos y asíntotas. Comparador de tres familias y 48 configuraciones; seis preguntas y seis tarjetas nuevas. Total: 26 lecciones, 108 preguntas base y 109 tarjetas; t02 tiene 8 de 9 lecciones. Verificación en docs/verificacion-entrega-19.md.

**Entrega 18 cerrada (28 de septiembre):** desarrollada 2.7 con regla de puntos, sentido de traslaciones, dominio, recorrido, extremos, monotonía, cortes y asíntotas, incluida oblicua opcional. Comparador de cuatro familias y 36 configuraciones con original ocultable. Seis preguntas y seis tarjetas nuevas. Total: 25 lecciones, 102 preguntas base y 103 tarjetas; t02 tiene 7 de 9 lecciones. Verificación en docs/verificacion-entrega-18.md.

**Entrega 17 cerrada (28 de septiembre):** desarrollada 2.6 con lectura de intervalos, dominio, continuidad, derivabilidad lateral, valor absoluto y tarifa progresiva. Explorador de cinco situaciones y tres puntos de unión, con extremos abiertos y cerrados, tabla y diagnóstico. Seis preguntas y seis tarjetas nuevas. Total: 24 lecciones, 96 preguntas base y 97 tarjetas; t02 tiene 6 de 9 lecciones. Verificación en docs/verificacion-entrega-17.md.

**Entrega 16 cerrada (28 de septiembre):** desarrollada 2.5 con logaritmo como inversa, dominio, recorrido, límites, propiedades, transformaciones y ecuaciones con comprobación del dominio. Aplicaciones a tiempo de duplicación, escala y rendimientos marginales decrecientes. Explorador de 24 configuraciones; seis preguntas y seis tarjetas nuevas. Total: 23 lecciones, 90 preguntas base y 91 tarjetas; t02 tiene 5 de 9 lecciones. Verificación en docs/verificacion-entrega-16.md.

**Entrega 15 cerrada (28 de septiembre):** desarrollada 2.4 con exponenciales básicas, transformaciones, estudio completo y modelos de capitalización y depreciación. Explorador con 24 configuraciones, gráfica, límites y tabla sincronizados; seis preguntas y seis tarjetas nuevas. Total: 22 lecciones, 84 preguntas base y 85 tarjetas; t02 tiene 4 de 9 lecciones. Verificación en docs/verificacion-entrega-15.md.

**Entrega 14 cerrada (28 de septiembre):** desarrollada 2.3 con dominio, huecos, asíntotas verticales, horizontales y oblicuas, signo, derivada y extremos. Incluye dos estudios principales, práctica resuelta, dos gráficas y explorador de 18 configuraciones. Añadidas seis preguntas y seis tarjetas. Total: 21 lecciones, 78 preguntas base y 79 tarjetas; t02 tiene 3 de 9 lecciones. Verificación en docs/verificacion-entrega-14.md.

**Entrega 13 cerrada (28 de septiembre):** desarrollada 2.2 con grado, término dominante, multiplicidad, signo, monotonía y extremos; estudio de una cúbica y modelo de beneficio con dominio restringido. Añadidas seis preguntas, seis tarjetas y un taller procedural de seis retos. Total: 20 lecciones, 72 preguntas base y 73 tarjetas; t02 tiene 2 de 9 lecciones, 12 preguntas y 12 tarjetas. Verificación en docs/verificacion-entrega-13.md.

**Entrega 12 cerrada (28 de septiembre):** desarrollada 2.1 con método, estudio completo de una cúbica, práctica resuelta de una parábola, gráfica por capas, seis preguntas y seis tarjetas. Test y tarjetas separados por tema; el banco t01 conserva 60 preguntas y 61 tarjetas. Total: 19 lecciones, 66 preguntas y 67 tarjetas. Verificación en docs/verificacion-entrega-12.md.

**Entrega 11 cerrada:** preferencias compartidas de lectura, navegación revisada y correcciones de ampliación en móvil. El cierre global de t01 conserva pendiente la revisión con lectores de pantalla y lectura matemática.

**Entrega 10 cerrada:** Límite Express incorpora lectura gráfica con tabla y animación opcional, cuatro niveles, rondas especiales y modalidades con/sin reloj. Se verifican 20.000 variantes nuevas y el recorrido completo. Los cuatro laboratorios de t01 están desarrollados; el cierre global del tema sigue pendiente de revisión conjunta.

**Entrega 09 cerrada:** Tangente Sprint incluye seis retos procedurales, cálculo y ecuaciones, ajuste por arrastre o teclado, normales y modo opcional de 45 segundos con pausa. Verificados 6000 retos y el recorrido completo. Los cuatro laboratorios de t01 son funcionales; Límite Express sigue parcial.

**Entrega 08 cerrada:** Derivada Detective incorpora ocho casos y trece decisiones por sesión: derivadas, reglas, laterales y detección del primer paso erróneo. Generación procedural, inserción y fórmulas comprobadas. El banco fijo sigue en 60 preguntas y 61 tarjetas.

**Entrega 07 cerrada:** repaso integrado con tres problemas nuevos, 60 preguntas base, 61 tarjetas y widget Continuidad: repara la función. Auditoría de 15 problemas y cobertura de los 18 epígrafes en docs/auditoria-tema-01.md. El tema sigue abierto.

**Entrega 06 cerrada:** completados 1.16–1.18, cinco derivadas y el límite 3(d) del examen, la justificación de crecimientos y el comparador de continuidad. Acumulado: 18 lecciones, 54 preguntas, 56 tarjetas y siete exploradores. El tema sigue pendiente de cierre global.

**Entrega 05 cerrada:** completados 1.13–1.15, los apartados 1(b–c) y 2(c) del examen y el explorador de tangente y normal. Acumulado: 15 lecciones, 45 preguntas, 47 tarjetas y seis exploradores. Se conservan el diseño y el motor LaTeX.

**Entrega 04 cerrada:** completados 1.10–1.12, con la pregunta 1(a) del examen resuelta y un explorador de secantes y esquinas. Acumulado: 12 lecciones, 36 preguntas, 38 tarjetas y cinco exploradores. Se conservan el diseño y el motor LaTeX.

**Entrega 03 cerrada:** completados 1.7–1.9 y el explorador del conjugado. Banco acumulado de 27 preguntas, 29 tarjetas y nueve familias de Límite Express. Se mantienen el diseño, las categorías editoriales y el servicio LaTeX compartido.

**Entrega 02 cerrada:** completados 1.3–1.6. Se mantiene el diseño vigente. La estructura editorial se documenta en docs/estructura-editorial-y-diseno.md; las categorías de texto permitirán aplicar tipografías y estilos posteriores sin modificar LaTeX.

**Entrega 01 cerrada:** 1.1 y 1.2 con contenido y actividades, recorrido inicial, seis preguntas, ocho tarjetas y una versión parcial de Límite Express. La infraestructura LaTeX queda integrada y comprobada.

**Siguiente entrega — 4.8. Desarrollo de un determinante:** introducir menores y cofactores, desarrollo por filas/columnas y elección de ceros para simplificar, con ejemplos y actividades.

**Estado del tema 1:** 18 lecciones, 60 preguntas base, 61 tarjetas, 15 problemas inventariados, siete exploradores y cuatro laboratorios desarrollados. Revisados enlaces, navegación y lectura ampliada; los ajustes se propagan a los juegos conservando respuestas. El cierre global permanece pendiente por la revisión con lectores de pantalla y lectura matemática. Los extras de gamificación recomendados (escudos, misiones y multiplicadores) no están activados. Continúan las fases globales de PDF, accesibilidad, administración y extensión al resto del curso.

## Diario de avances

### 2026-09-16 · `docs: organizar el desarrollo por entregas verificables`

- Guardado el plan completo, con tareas para los 86 epígrafes, los 28 widgets y los 30 paquetes LaTeX.
- Revisados el guion 1.1–1.2, las planificaciones T1 y el examen local de Límites y Derivadas.
- Detectado en ese examen un comentario que equipara acercarse a cero cuando el tiempo crece con aterrizar en tiempo finito. Se registrará para la revisión del PDF.
- Siguiente: construir la secuencia inicial y verificarla antes de marcar tareas de contenido.

### 2026-09-16 · `feat: desarrollar límites y límites laterales`

- Completados 1.1 y 1.2 con objetivos, requisitos, explicaciones, ejemplos, ayudas, errores frecuentes y resumen.
- Añadidos explorador de un hueco, seis preguntas con explicación, ocho tarjetas y sesiones procedurales de diez rondas.
- Actualizadas portada, libro, primer tema, práctica, test, tarjetas y laboratorio. El estado editorial se distingue de la visibilidad administrativa.
- Registrada la procedencia y la incidencia del límite asintótico (M14 desde la entrega 157; identificada como M13 en aquella entrega); los originales no se modifican.

### 2026-09-16 · `feat: integrar LaTeX local con cola y recuperación`

- Incluida copia local de MathJax 3.2.2, salida SVG y MathML de asistencia.
- Unificada la carga en páginas y widgets, con tres intentos, tiempos máximos, espera escalonada y botón de reintento.
- Documentado el uso de renderMath/updateMath para futuras actividades.

### 2026-09-16 · `fix: evitar fórmulas duplicadas al recuperar cargas fallidas`

- Una prueba con descarga bloqueada detectó ámbitos anidados en la cola de recuperación.
- Se eliminan ámbitos duplicados y contenidos antes de renderizar, también al reintentar.
- Se verificó que la selección del alumno se conserva durante la recuperación.
- Corregidas rutas de las nuevas lecciones para funcionar bajo una subcarpeta.

### 2026-09-16 · `test: verificar la primera entrega y sus fallos de carga`

- 10.000 preguntas generadas (1.000 semillas) verificadas; soluciones contrastadas y alternativas únicas.
- 171 HTML comprobados: destinos de enlaces/recursos válidos y sin IDs duplicados.
- Navegador: dos fallos y recuperación automática; fallo persistente limitado a tres intentos y recuperación manual; componente opcional; 60 solicitudes en cola; ocho páginas simultáneas.
- Test completado con resultado 6/6; tarjetas y widget autónomo/embebido probados.
- Ocho rutas desarrolladas y el widget comprobados bajo /curso/. Fórmulas revisadas en escritorio y móvil de 390 px.
- Límites: no es prueba de carga del servidor de GitHub, ni certificación con lector de pantalla, ni cierre de todo el tema 1. Detalle en docs/verificacion-entrega-01.md.

### 2026-09-16 · `feat: completar infinito y asíntotas en los epígrafes 1.3–1.6`

- Redactados los cuatro epígrafes con objetivos, requisitos, teoría, condiciones, ejemplos, ayudas, comprobación autónoma y resúmenes.
- Adaptados y resueltos tres apartados del examen local: 3(b), 3(c) y 3(f), conservando la fuente intacta.
- Añadidos exploradores de signos y de saturación; documentada la diferencia entre límite asintótico y valor alcanzado.
- Marcadas las cuatro lecciones tras revisar matemáticas e interacción. El total disponible es 6 de 86 epígrafes.

### 2026-09-16 · `feat: ampliar práctica y organizar el contenido para el diseño futuro`

- Banco acumulado de 18 preguntas y 20 tarjetas; cada epígrafe desarrollado tiene tres preguntas con explicación.
- Límite Express pasa de tres a siete familias con parámetros verificables.
- Creado el catálogo de actividades para vincular cada lección a sus preguntas.
- Registradas categorías de texto mediante data-content-role en lecciones y componentes dinámicos.
- Conservados los CSS, las fuentes actuales y el motor de LaTeX; el diseño definitivo continúa pendiente.

### 2026-09-16 · `test: verificar la entrega 02 y la regresión del renderizado`

- 10.000 preguntas procedurales comprobadas con 1.000 semillas y cobertura de siete familias.
- Comprobados los 171 HTML, incluidas anclas locales, sin rutas rotas ni IDs duplicados.
- Verificados los dos exploradores, error/pista/reintento, test 18/18 y widget 10/10.
- Revisados móvil, fórmulas y rutas bajo /curso/; se mantiene operativa la recuperación LaTeX sin pérdida de respuestas.
- Evidencia y límites: docs/verificacion-entrega-02.md. La tarea global del widget y el cierre del tema 1 siguen pendientes.

### 2026-09-16 · `feat: completar operaciones, cálculo e indeterminaciones`

- Completados 1.7–1.9 con hipótesis, teoría, ejemplos, ayudas, práctica autónoma y resúmenes. Total: 9 de 86 epígrafes.
- Resueltos y adaptados los apartados 3(a) y 3(e) del examen local, sin modificar el original.
- Añadido el explorador del conjugado con parámetros variables y evaluación numérica estable.

### 2026-09-16 · `feat: ampliar la práctica de técnicas algebraicas`

- Banco acumulado de 27 preguntas y 29 tarjetas; tres preguntas por cada lección desarrollada.
- Límite Express incorpora racionalización y común denominador: nueve familias en sesiones de diez rondas.
- Conservados el diseño, las fuentes y el motor LaTeX; las categorías de texto siguen preparadas para estilos posteriores.

### 2026-09-16 · `test: verificar la entrega 03 en móvil y subcarpeta`

- 10.000 preguntas generadas y 171 HTML verificados, sin errores detectados en soluciones, opciones o enlaces.
- Tres lecciones comprobadas en móvil, con respuesta vacía, error, pista y reintento; explorador y widget 10/10 operativos.
- Test acumulado 27/27, recorrido de las 29 tarjetas y widget embebido comprobados bajo /curso/.
- Revisadas visualmente las fórmulas de común denominador y el explorador del conjugado.
- Evidencia y límites: docs/verificacion-entrega-03.md. Continúan pendientes el cierre del tema, los PDF y el panel administrativo.

### 2026-09-16 · `feat: completar continuidad y primeras derivadas`

- Completados 1.10–1.12 con teoría, hipótesis, ejemplos, práctica guiada y resumen. Total: 12 de 86 epígrafes.
- Adaptada la pregunta 1(a) del examen: b=−2 por continuidad y a=1 por derivabilidad, usando cocientes incrementales.
- Añadido el explorador de secantes del cuadrado y el valor absoluto, con gráfica, tabla, control de distancia y descripción textual.
- Banco acumulado de 36 preguntas y 38 tarjetas; Límite Express conserva sus nueve familias.

### 2026-09-16 · `fix: repartir fórmulas y explicaciones para facilitar la lectura en móvil`

- Una prueba detectó desbordamiento en una explicación algebraica del test; se dividió en pasos más cortos.
- Distribuidas en líneas las fórmulas del explorador para que quepan en móvil.
- Conservados los CSS, las fuentes y la cola común de MathJax.

### 2026-09-16 · `test: verificar secantes, derivabilidad y recorrido acumulado`

- Seis pruebas matemáticas superadas: 10.000 preguntas generadas, catálogo, 84 casos de secantes, ejemplo del examen y coste marginal.
- Comprobados 171 HTML sin errores de enlaces, anclas o IDs.
- Tres lecciones verificadas en móvil; respuesta vacía, error, pista y reintento operativos.
- Test 36/36 y las 38 tarjetas comprobados; cambios de función sin fórmulas duplicadas.
- Explorador revisado con teclado, texto al 200 %, móvil y escritorio. Tres rutas bajo /curso/ e índice con 12 lecciones disponibles y 6 pendientes.
- Evidencia y límites: docs/verificacion-entrega-04.md. Los PDF, el panel administrativo y el cierre del tema siguen pendientes.

### 2026-09-17 · `feat: completar tangentes, tabla y reglas de derivación`

- Completados 1.13–1.15 con condiciones, ejemplos, errores frecuentes, práctica guiada y resumen. Total: 15 de 86 epígrafes.
- Resueltos 1(b–c) con los parámetros de 1(a), explicitando también el caso de b libre; desarrollado 2(c) mediante cociente y potencia compuesta.
- Incorporado el explorador de tangente y normal con escala idéntica en ambos ejes y normal vertical en el vértice.
- Banco acumulado de 45 preguntas y 47 tarjetas; seis exploradores. Límite Express mantiene nueve familias.

### 2026-09-17 · `fix: mejorar la lectura de las tablas en móvil`

- Usados encabezados matemáticos f y f′ con etiquetas accesibles para evitar cortes de palabras en tablas estrechas.
- Abreviado el texto de pendiente no definida; el resumen explica la normal vertical.
- Conservados los estilos generales, las fuentes y el servicio compartido de LaTeX.

### 2026-09-17 · `test: verificar tangentes y reglas con el recorrido acumulado`

- Nueve pruebas matemáticas superadas: incluyen 10.000 preguntas generadas, catálogo, secantes, tangentes, examen y nueve expresiones contrastadas en 36 puntos.
- Revisados 171 HTML sin enlaces rotos, anclas inexistentes ni IDs duplicados.
- Tres lecciones y nueve preguntas verificadas en móvil; normal vertical, teclado y texto ampliado operativos.
- Test completo 45/45 y recorrido de 47 tarjetas comprobados.
- Tres rutas bajo /curso/ e índice con 15 lecciones disponibles y 3 pendientes; inspección visual de gráfica, tabla y resolución del examen.
- Evidencia y límites: docs/verificacion-entrega-05.md. No se han compilado PDF ni cerrado todavía el tema o la administración.

### 2026-09-17 · `feat: completar cadena, continuidad y L’Hôpital`

- Completados 1.16–1.18: las 18 lecciones del tema 1 tienen contenido, dentro de los 86 epígrafes del curso.
- Desarrollados 2(a), 2(b), 2(d), 2(e), 2(f) y 3(d) del examen con dominios y pasos; retomada y justificada la comparación de crecimientos de 1.6.
- Añadido el comparador de curva suave, esquina, salto y valor aislado con tabla, gráfica y diagnóstico.
- Banco acumulado de 54 preguntas y 56 tarjetas. Se conservan diseño, fuentes y motor LaTeX.

### 2026-09-17 · `test: verificar teoremas, composiciones y recorrido completo`

- Doce pruebas matemáticas superadas: incluyen 10.000 preguntas generadas, catálogo, 25 evaluaciones de derivadas nuevas, 32 casos del comparador y comprobaciones de límites.
- Revisados 171 HTML; tres lecciones verificadas en móvil, con error, pista y reintento.
- Test 54/54 y recorrido de 56 tarjetas completados. Fórmulas dinámicas, teclado y texto ampliado comprobados.
- Tres rutas bajo /curso/ e índice con 18 lecciones disponibles; inspección visual de cadena, continuidad y L’Hôpital.
- Justificación de crecimientos añadida y comprobada en móvil. Evidencia y límites: docs/verificacion-entrega-06.md.

### 2026-09-17 · `docs: preparar la auditoría conjunta del primer tema`

- El cierre global de t01 permanece sin marcar: faltan al menos seis preguntas para el mínimo de 60, auditoría de problemas y finalización de laboratorios.
- Se conservan pendientes los PDF y la administración con persistencia global; ninguna integración externa se da por activa.


### 2026-09-27 · `feat: cerrar repaso integrado y reparación de continuidad`

- [x] Incorporar tres problemas desarrollados y seis preguntas transversales: 60 preguntas base.
- [x] Contrastar los 24 conceptos de tarjetas y ampliar el mazo a 61.
- [x] Implementar el widget 1B con seis retos, gráfica, diagnóstico, reparación, pistas y puntuación sin historial.
- [x] Auditar 15 problemas, fuentes y correcciones aplicadas a la web.

### 2026-09-27 · `fix: conservar escala de fórmulas y altura de widgets`

- Limitado el estilo SVG a la gráfica para respetar MathJax.
- Ampliada la cota del anfitrión a 8000 px para formularios móviles, conservando validación de mensajes.

### 2026-09-27 · `test: verificar repaso, generadores e inserción`

- Quince pruebas matemáticas superadas: 10.000 preguntas de límites y 6.000 funciones de continuidad, además de derivadas y problemas.
- Repaso 5/6 con reintento; juego completo 2600/2700 con una pista, sin duplicar puntos.
- Test 60/60, 61 tarjetas, 171 HTML sin enlaces rotos; móvil, teclado, texto ampliado e inserción bajo subcarpeta comprobados.
- Evidencia en docs/verificacion-entrega-07.md. El tema completo, otros laboratorios, PDF y administración permanecen pendientes.

### 2026-09-27 · `feat: desarrollar Derivada Detective`

- [x] Generar cinco familias de derivadas con justificación de la regla.
- [x] Incorporar tres familias de desarrollos con errores, con cuatro posiciones posibles.
- [x] Insertar el widget en el catálogo, el repaso y el índice del tema.
- [x] Mantener pistas, reintento y resumen sin historial; ampliar el motor común con listas de pasos opcionales.

### 2026-09-27 · `test: contrastar derivadas y recorrer las investigaciones`

- Diecisiete pruebas matemáticas acumuladas superadas. Nuevo generador comprobado con 1000 semillas, 8000 casos y 13.000 decisiones.
- Derivadas y distractores contrastados con las funciones originales; cocientes incrementales de la esquina verificados.
- Cuatro sesiones de navegador, 52 decisiones y doce combinaciones de desarrollo erróneo. Verificados reintentos, solución tras dos errores, reinicio, móvil, teclado, texto ampliado y subcarpeta.
- Repetida la batería de entrega 07 tras ampliar el motor de preguntas. Evidencia: docs/verificacion-entrega-08.md.
- Siguiente: Tangente Sprint. Se mantienen pendientes los PDF, la administración, otras actividades y el resto del curso.

### 2026-09-27 · `feat: desarrollar Tangente Sprint y sus normales`

- [x] Crear seis retos con polinomios, punto y derivada controlados.
- [x] Corregir ecuaciones por coeficientes, aceptando fracciones equivalentes y coma decimal.
- [x] Ajustar rectas mediante tiradores y controles de teclado con escala igual en ambos ejes.
- [x] Incluir tangente horizontal, normal oblicua y normal vertical.
- [x] Añadir modo libre y Sprint de 45 segundos con pausa; esperar a que cargue LaTeX antes de iniciar el reloj.
- [x] Integrar el widget en catálogo, Practicar e índice del tema.

### 2026-09-27 · `test: verificar rectas, arrastre y recuperación con reloj`

- Diecinueve pruebas matemáticas superadas, incluyendo 6000 retos nuevos.
- Partida completa 3500/3600 con una pista, reintentos sin puntos duplicados, arrastre, teclado y reinicio comprobados.
- Pausa, agotamiento de seis rondas, resumen 0/3600 y conservación de los campos verificados con reloj simulado.
- Descarga de MathJax bloqueada y recuperada: el tiempo permanece en 45 segundos hasta poder empezar.
- Móvil, texto al 200 %, formularios insertados, rutas en subcarpeta y 171 HTML sin enlaces rotos.
- Evidencia y límites en docs/verificacion-entrega-09.md. Se mantienen pendientes el cierre de Límite Express, revisión global del tema, PDF y resto del curso.

### 2026-09-27 · `feat: completar niveles y lectura gráfica en Límite Express`

- [x] Incorporar límites desde gráfica, con tabla, descripción y avance manual o animado.
- [x] Respetar movimiento reducido y ofrecer controles de teclado.
- [x] Organizar diez preguntas en cuatro niveles, con selección de método y rondas especiales tras tres aciertos.
- [x] Añadir puntos, rachas, resumen por niveles y modalidades libre y de 20 segundos con pausa.
- [x] Mantener el reloj detenido hasta representar enunciado y alternativas; conservar la recuperación LaTeX.

### 2026-09-27 · `fix: diversificar selección procedural con semillas consecutivas`

- Mezcladas las semillas antes de elegir familias para evitar sesgos de cobertura en la primera extracción.
- Separados generadores, sesión, gráfica y controles para facilitar ampliaciones.

### 2026-09-27 · `test: comprobar progresión, gráficas y reloj de límites`

- Veintidós pruebas acumuladas superadas, incluyendo 20.000 rondas nuevas y 200 sesiones perfectas.
- Partida completa de navegador con 910 puntos, pista y reintento; especiales, gráfica, tabla y movimiento reducido comprobados.
- Verificados modo libre sin caducidad, pausa, diez expiraciones y recuperación de fórmulas sin consumir tiempo.
- Tres lecciones anteriores y el widget actual comprobados; 171 HTML sin enlaces rotos.
- Evidencia en docs/verificacion-entrega-10.md. Siguiente: revisión conjunta de t01; todavía no se marca el cierre global.

### 2026-09-27 · `feat: compartir preferencias de lectura entre páginas y juegos`

- [x] Añadir tamaño 100–200 %, contraste y resaltado en cabecera y widgets independientes.
- [x] Propagar ajustes a actividades insertadas y sincronizar pestañas del mismo proyecto.
- [x] Guardar solo preferencias, separar repositorios por ruta y funcionar sin almacenamiento.
- [x] Completar la página de accesibilidad con instrucciones y pendientes reales.

### 2026-09-27 · `fix: adaptar fórmulas y controles a lectura ampliada`

- [x] Confinar fórmulas largas en línea sin reducir su tamaño ni ensanchar la página.
- [x] Ajustar enunciados, alternativas y selectores a 320 px con texto al 200 %.
- [x] Ampliar también el texto de los botones de todos los widgets.
- [x] Restaurar observadores de widgets al volver a páginas conservadas y reanudar correctamente el reloj de Tangente Sprint.

### 2026-09-27 · `test: auditar navegación y accesibilidad visual del tema 1`

- [x] Revisar enlaces y anclas de 171 HTML, navegación de 18 lecciones y lectura ampliada en todas ellas.
- [x] Comprobar cuatro juegos insertados e independientes, respuestas y fórmulas conservadas, pestañas, subcarpeta y almacenamiento denegado.
- [x] Repetir las 22 pruebas matemáticas, recorrido de test/tarjetas y batería de Tangente Sprint.
- [x] Repetir la batería completa de MathJax: reintentos, recuperación manual, 60 solicitudes agrupadas y ocho páginas simultáneas.
- Evidencia y límites: docs/verificacion-entrega-11.md. El cierre global conserva pendientes lectores de pantalla y lectura matemática; siguiente contenido: 2.1, esquema de representación de funciones.

### 2026-09-28 · `feat: desarrollar el método de representación de funciones`

- [x] Completar 2.1 con dominio, cortes, simetrías, signo, continuidad, asíntotas, monotonía, extremos y curvatura opcional.
- [x] Estudiar x³−3x y resolver la práctica x²−4x+3; diferenciar hueco y asíntota en una fracción simplificable.
- [x] Incorporar una gráfica por capas con controles de teclado, descripción, escala explícita y tabla de apoyo.
- [x] Añadir seis preguntas razonadas y seis tarjetas, con procedencia documentada.

### 2026-09-28 · `feat: separar los repasos por tema`

- [x] Mantener 60 preguntas y 61 tarjetas de t01; ofrecer t02 y el catálogo completo por separado.
- [x] Actualizar portada, índice del tema 2 y enlaces de repaso del tema 1.
- [x] Conservar las sesiones en memoria y el estado editorial parcial del tema 2.

### 2026-09-28 · `test: verificar gráficas, filtros y práctica de representación`

- [x] Superar 25 pruebas matemáticas y de estado, con contraste numérico de derivadas, raíces, extremos, simetría y separación de bancos.
- [x] Recorrer 2.1 con pista y reintento (5/6), seis tarjetas y test del tema 2 (6/6).
- [x] Verificar gráfica con teclado, lectura al 200 % en 320 px, filtros por tema, índice 1/9 y rutas en subcarpeta.
- [x] Repetir el recorrido completo de 66 preguntas y 67 tarjetas, junto a las tres lecciones avanzadas del tema 1.
- [x] Comprobar 171 HTML sin enlaces rotos, anclas ausentes ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-12.md. Próximo contenido: 2.2. No se han compilado nuevos PDF ni activado cuentas o administración.

### 2026-09-28 · `feat: desarrollar funciones polinómicas y su interpretación`

- [x] Completar 2.2 con grado, término dominante, multiplicidad de raíces, signo y clasificación de extremos.
- [x] Estudiar (x+1)²(x−2) y mostrar su gráfica con raíz doble y simple.
- [x] Resolver un modelo de beneficio en [0,10], con unidades, comparación de candidatos y cambio de capacidad a [0,4].
- [x] Añadir seis preguntas base y seis tarjetas; actualizar índices y enlaces.

### 2026-09-28 · `feat: generar práctica de infinitos para polinomios`

- [x] Crear sesiones de seis polinomios de grados 1–6 con coeficientes nuevos y cuatro patrones de límites.
- [x] Reutilizar pistas, reintentos y resumen del motor de preguntas, sin temporizador ni historial.
- [x] Mantener independientes el taller procedural y el test fijo de la lección.

### 2026-09-28 · `test: contrastar raíces, beneficio y variantes procedurales`

- [x] Superar 29 pruebas acumuladas, incluyendo 6000 polinomios generados, cálculo de derivadas y restricciones del modelo económico.
- [x] Completar taller 5/6 con pista y reintento, test fijo 6/6 y test t02 12/12; comprobar regeneración e independencia de sesiones.
- [x] Recorrer las seis tarjetas y verificar teclado, 320/390 px, texto al 200 %, contraste, resaltado y subcarpeta.
- [x] Repetir la lección 2.1 y el recorrido general actualizado de 72 preguntas y 73 tarjetas.
- [x] Revisar 171 HTML sin enlaces locales rotos, anclas ausentes ni IDs duplicados.
- Evidencia y límites: docs/verificacion-entrega-13.md. Siguiente contenido: 2.3. Siguen pendientes los siete epígrafes restantes de t02 y las fases globales del proyecto.

### 2026-09-28 · `feat: desarrollar funciones racionales y sus discontinuidades`

- [x] Completar dominio original, cortes, signo, límites, asíntotas y monotonía por intervalos.
- [x] Estudiar (x²−1)/(x²−x−2) con hueco y asíntotas, y x²/(x−1) con oblicua y extremos relativos.
- [x] Añadir práctica resuelta, seis preguntas base y seis tarjetas; enlazar la lección desde portada e índices.
- [x] Dibujar las ramas separadas por polos, con hueco abierto, asíntotas y descripciones textuales.

### 2026-09-28 · `feat: explorar multiplicidades y cancelación de factores`

- [x] Comparar tres casos de cancelación, tres puntos y dos coeficientes: 18 configuraciones.
- [x] Actualizar fórmula, diagnóstico y tabla de ambos lados mediante la cola común de MathJax.
- [x] Conservar el punto excluido y las respuestas del test durante los cambios del explorador.

### 2026-09-28 · `test: verificar racionales, gráficas y cambios dinámicos`

- [x] Superar 33 pruebas acumuladas: dominio, identidades, derivadas numéricas, límites, extremos, práctica y configuraciones.
- [x] Comprobar 18 estados en navegador, cambios rápidos, teclado, conservación de respuesta y recuperación del estado final de las fórmulas.
- [x] Recorrer test de lección 5/6 con reintento, seis tarjetas y test t02 18/18.
- [x] Verificar 320/390 px, texto al 200 %, contraste, resaltado, subcarpeta y revisar gráficas.
- [x] Repetir el catálogo completo de 78 preguntas y 79 tarjetas y revisar 171 HTML sin enlaces rotos ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-14.md. Siguiente contenido: 2.4. Las fases de PDF, administración, traducción, voz y revisión con lectores de pantalla siguen pendientes.

### 2026-09-28 · `feat: desarrollar exponenciales y modelos porcentuales`

- [x] Completar bases, dominio, recorrido, cortes, límites, monotonía y transformaciones.
- [x] Estudiar 2−4(1/2)^x y resolver la práctica 3·2^x−3.
- [x] Explicar capitalización compuesta y depreciación, con unidades, redondeo final y distinción entre años completos y extensión continua.
- [x] Añadir seis preguntas y seis tarjetas, enlazar la lección y actualizar el índice 4/9.

### 2026-09-28 · `feat: explorar bases, coeficientes y desplazamientos`

- [x] Implementar 24 combinaciones con controles de teclado, curva, descripción, límites y tabla.
- [x] Sincronizar los resultados mediante la cola común de LaTeX y conservar la selección del test al cambiar controles.
- [x] Separar modelo matemático, actividades y presentación; mantener los roles editoriales y el diseño provisional.

### 2026-09-28 · `test: verificar exponenciales y catálogo acumulado`

- [x] Superar 37 pruebas acumuladas: derivadas numéricas, monotonía, límites, reflexión y cálculo porcentual por iteración independiente.
- [x] Verificar las 24 configuraciones en navegador, cambios rápidos y teclado; recorrer test de lección 5/6 con pista, seis tarjetas y test t02 24/24.
- [x] Revisar gráfica, texto al 200 %, contraste, resaltado y 320/390 px, sin desbordamiento global; comprobar subcarpeta.
- [x] Repetir 2.1, filtros e índice y el recorrido general de 84 preguntas y 85 tarjetas junto con las tres lecciones avanzadas de t01.
- [x] Revisar 171 HTML sin enlaces locales rotos, anclas ausentes ni IDs duplicados.
- Evidencia y límites: docs/verificacion-entrega-15.md. Siguiente contenido: 2.5. PDF, administración, traducción, voz y revisión con lectores de pantalla siguen pendientes.

### 2026-09-28 · `feat: desarrollar logaritmos, dominio y ecuaciones`

- [x] Explicar la relación inversa con la exponencial, bases válidas, límites, recorrido y monotonía.
- [x] Añadir propiedades con condiciones y una ecuación con candidato descartado por dominio.
- [x] Estudiar log₂(x−1)−1 y resolver la práctica −ln(x+1).
- [x] Conectar el crecimiento del 5 % con el tiempo de duplicación; añadir escala logarítmica y rendimiento marginal decreciente.
- [x] Integrar seis preguntas y seis tarjetas; actualizar enlaces e índice 5/9.

### 2026-09-28 · `feat: explorar transformaciones logarítmicas`

- [x] Implementar 24 combinaciones de base, signo y desplazamientos.
- [x] Mantener toda la curva dentro del dominio, con asíntota, punto de referencia, descripción y tabla.
- [x] Sincronizar fórmulas, límites y gráfica mediante la cola común; conservar foco y respuestas del test.

### 2026-09-28 · `test: verificar logaritmos y repaso acumulado`

- [x] Superar 41 pruebas acumuladas, incluyendo derivadas numéricas, dominio estricto, funciones inversas, ecuaciones y modelos.
- [x] Comprobar 24 estados del explorador, cambios rápidos, teclado y conservación de respuesta.
- [x] Recorrer el test de lección 5/6 con pista y reintento, seis tarjetas y el test t02 30/30.
- [x] Revisar gráfica, 320/390 px, texto al 200 %, contraste, resaltado y funcionamiento en subcarpeta.
- [x] Repetir 2.1, filtros e índice, y el catálogo completo de 90 preguntas y 91 tarjetas junto a las tres lecciones avanzadas de t01.
- [x] Comprobar 171 HTML sin enlaces locales rotos, anclas ausentes ni IDs duplicados.
- Evidencia y límites: docs/verificacion-entrega-16.md. Siguiente: 2.6. Permanecen pendientes las fases de PDF, administración, traducción, voz y revisión con lectores de pantalla.

### 2026-09-28 · `feat: desarrollar funciones a trozos y valor absoluto`

- [x] Explicar elección de rama, dominio, intervalos abiertos/cerrados y comparación de límites con valor puntual.
- [x] Estudiar una unión suave y contrastarla con salto, valor aislado y punto sin definir.
- [x] Desarrollar |x−1|−2, |x²−4| y la práctica |2x−4|; resolver parámetros de continuidad y derivabilidad.
- [x] Modelar una tarifa progresiva conservando el coste anterior y las unidades.
- [x] Integrar seis preguntas y seis tarjetas; actualizar navegación e índice 6/9.

### 2026-09-28 · `feat: representar uniones con puntos abiertos y cerrados`

- [x] Implementar cinco situaciones y tres puntos de unión: 15 combinaciones.
- [x] Dibujar las ramas por separado, diferenciar extremos excluidos y valor incluido, y ofrecer límites y tabla.
- [x] Actualizar el diagnóstico con LaTeX serializado, conservando foco y respuesta del test.
- [x] Evitar la fragmentación de cifras al ampliar texto; permitir desplazamiento horizontal de la tabla con teclado.

### 2026-09-28 · `test: verificar tramos y catálogo acumulado`

- [x] Superar 45 pruebas acumuladas: valores, límites, cocientes incrementales con valor real, absolutos y tarifa.
- [x] Verificar 15 estados, ramas separadas, marcadores, cambios rápidos, teclado y conservación de selección.
- [x] Recorrer test de lección 5/6 con pista y reintento, seis tarjetas y t02 36/36.
- [x] Revisar gráfica, 320/390 px, texto 200 %, contraste, resaltado, tabla desplazable y subcarpeta.
- [x] Repetir 2.1, filtros e índice, y el catálogo de 96 preguntas y 97 tarjetas junto a las tres lecciones avanzadas de t01.
- [x] Comprobar 171 HTML sin destinos locales rotos, anclas ausentes ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-17.md. Siguiente: 2.7. Continúan pendientes PDF, administración, traducción, voz y revisión con lectores de pantalla.

### 2026-09-28 · `feat: desarrollar traslaciones de funciones`

- [x] Justificar (u,v)→(u+a,v+k) para f(x−a)+k y el sentido del desplazamiento horizontal.
- [x] Trasladar dominio, recorrido, extremos y asíntotas, conservando inclusión de extremos y pendientes correspondientes.
- [x] Resolver ejemplos con parábola, racional, logaritmo, coste fijo y oblicua; explicar por qué los cortes deben revisarse.
- [x] Añadir práctica con valor absoluto e intervalos, seis preguntas y seis tarjetas; actualizar índice 7/9.

### 2026-09-28 · `feat: comparar curvas originales y trasladadas`

- [x] Implementar cuatro familias y 36 combinaciones de desplazamientos.
- [x] Distinguir curva original a trazos y trasladada continua, con círculo y cuadrado para puntos correspondientes.
- [x] Permitir ocultar la original y conservar controles y selección del test durante cambios rápidos.
- [x] Dibujar ramas racionales separadas, logaritmos solo en su dominio y tabla desplazable con teclado.

### 2026-09-28 · `test: verificar traslaciones y catálogo acumulado`

- [x] Superar 49 pruebas acumuladas: puntos, dominio, pendientes, cortes, intervalos, composición y asíntota oblicua.
- [x] Comprobar las 36 configuraciones en navegador, marcadores, tabla, ramas, visibilidad, teclado y estado final de fórmulas.
- [x] Recorrer test de lección 5/6 con pista y reintento, seis tarjetas y test t02 42/42.
- [x] Revisar gráfica, 320/390 px, texto 200 %, contraste, resaltado, desplazamiento de tabla y rutas en subcarpeta.
- [x] Repetir 2.1, filtros e índice, y catálogo de 102 preguntas y 103 tarjetas junto a las tres lecciones avanzadas de t01.
- [x] Comprobar 171 HTML sin enlaces locales rotos, anclas ausentes ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-18.md. Siguiente: 2.8. Continúan pendientes PDF, administración, traducción, voz y revisión con lectores de pantalla.

### 2026-09-28 · `feat: desarrollar escalas y reflexiones`

- [x] Justificar la escala horizontal inversa y la regla (u,v)→(u/b,av), con factores no nulos.
- [x] Explicar reflexiones, dominio, recorrido, extremos, ceros y asíntotas; distinguir los factores cero en una ampliación.
- [x] Resolver ejemplos con parábola, racional, logaritmo y coste de dos centros; añadir práctica de valor absoluto e intervalos.
- [x] Integrar seis preguntas y seis tarjetas; actualizar índice 8/9 y navegación.

### 2026-09-28 · `feat: comparar expansión, contracción y reflexión`

- [x] Implementar tres familias no pares y 48 combinaciones de factores.
- [x] Mostrar original a trazos, transformada continua, puntos correspondientes, asíntotas y tabla.
- [x] Mantener ramas racionales separadas y logaritmos en el lado correcto del dominio incluso con factor interior negativo.
- [x] Conservar respuestas y foco durante cambios rápidos; normalizar el cero mostrado y permitir tabla desplazable con teclado.

### 2026-09-28 · `test: verificar escalas y catálogo acumulado`

- [x] Superar 53 pruebas acumuladas: puntos, dominio, derivadas numéricas, extremos, intervalos y ejemplos.
- [x] Comprobar 48 estados en navegador, reflexión horizontal, marcadores, alternancia de original y estado final de fórmulas.
- [x] Recorrer test de lección 5/6 con pista y reintento, seis tarjetas y test t02 48/48.
- [x] Revisar gráfica, 320/390 px, texto 200 %, contraste, resaltado, desplazamiento de tabla y subcarpeta.
- [x] Repetir 2.1, filtros e índice, y catálogo de 108 preguntas y 109 tarjetas junto a las tres lecciones avanzadas de t01.
- [x] Comprobar 171 HTML sin enlaces locales rotos, anclas ausentes ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-19.md. Siguiente: 2.9. Permanecen pendientes las fases globales de PDF, administración, traducción, voz, lectores de pantalla y laboratorios del tema 2.

### 2026-09-28 · `feat: desarrollar optimización con restricciones`

- [x] Plantear variable, unidades, objetivo y dominio antes de derivar; distinguir candidatos y óptimos.
- [x] Resolver beneficio con capacidad, cambio de coste fijo, pérdidas y empate entre cantidades enteras.
- [x] Resolver coste medio, dimensiones con dominio abierto y práctica de ingreso.
- [x] Integrar seis preguntas y seis tarjetas; actualizar índice 9/9 sin cerrar el tema globalmente.

### 2026-09-28 · `feat: comparar producción y candidatos factibles`

- [x] Implementar 24 escenarios de precio, coste fijo, capacidad y modo divisible/entero.
- [x] Mostrar función, dominio, punto estacionario, tabla de candidatos y máximo, incluyendo empates.
- [x] Añadir selección de cantidad, ingreso, coste, beneficio y distancia al óptimo.
- [x] Distinguir cantidades excluidas, referencia continua y puntos enteros; conservar respuesta del test y sincronizar LaTeX.

### 2026-09-28 · `test: verificar optimización y catálogo acumulado`

- [x] Superar 57 pruebas acumuladas, con contraste numérico continuo y enumeración exhaustiva de enteros.
- [x] Comprobar 24 escenarios, fronteras, pérdidas, empate, teclado, cambio de modo y ajuste a la capacidad.
- [x] Recorrer test de lección 5/6 con pista y reintento, seis tarjetas y test t02 54/54.
- [x] Corregir el ancho de un selector en lectura ampliada y repetir la verificación móvil a 320/390 px, texto 200 %, contraste y resaltado.
- [x] Revisar gráfica, tabla con teclado, cambios rápidos y funcionamiento en subcarpeta.
- [x] Repetir 2.1, filtros e índice 9/9, y catálogo de 114 preguntas y 115 tarjetas junto a las tres lecciones avanzadas de t01.
- [x] Comprobar 171 HTML sin enlaces locales rotos, anclas ausentes ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-20.md. Siguen pendientes el repaso integrado, mínimo de 60 preguntas, auditoría y tres widgets del tema 2, además de las fases globales de PDF, administración, traducción, voz y lectores de pantalla.

### 2026-09-29 · `feat: añadir repaso integrado de representación`

- [x] Desarrollar tres problemas de síntesis con pista, solución y enlaces de refuerzo en el índice del tema.
- [x] Añadir seis preguntas base transversales: t02 llega a 60 y el curso a 120; se conservan las 115 tarjetas.
- [x] Enlazar desde Practicar y conservar bancos individuales de seis preguntas por lección.

### 2026-09-29 · `docs: auditar cobertura del tema 2`

- [x] Inventariar 21 problemas con direcciones, resultados y criterio de recuento.
- [x] Relacionar los nueve epígrafes, diez ítems fuente y veinte conceptos de tarjetas con sus módulos.
- [x] Mantener visibles en el plan los tres juegos pendientes y la revisión con lectores de pantalla.

### 2026-09-29 · `fix: proteger desigualdades LaTeX del repaso`

- [x] Corregir signos menores que interpretados como HTML y comprobar ausencia de delimitadores sin procesar.
- [x] Superar 61 pruebas matemáticas y de bancos; comprobar teclado, soluciones desplegables, pista, reintento, reinicio y subcarpeta.
- [x] Revisar capturas de escritorio y móvil con texto al 200 %, contraste y resaltado.
- [x] Repetir el test t02 completo, filtros y catálogo general de 120 preguntas/115 tarjetas.
- [x] Revisar 171 HTML: sin rutas o anclas locales rotas ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-21.md y docs/auditoria-tema-02.md. Siguiente: Construye la gráfica.

### 2026-09-29 · `feat: desarrollar Construye la gráfica`

- [x] Generar seis retos de polinomios, racionales y exponenciales con cuatro opciones distintas por ficha.
- [x] Dibujar SVG con ejes comunes, asíntotas discontinuas y ramas racionales separadas; añadir descripción textual equivalente.
- [x] Corregir señalando el dato incompatible, con pista, segundo intento y solución LaTeX.
- [x] Mostrar puntuación de sesión, bloquear duplicados y regenerar datos al reiniciar, sin guardar respuestas.
- [x] Insertar en su página, enlazar desde Laboratorios e índice t02 y actualizar estado editorial del juego.

### 2026-09-29 · `test: verificar gráficas procedurales y sesión`

- [x] Superar 65 pruebas acumuladas; 1000 semillas, 6000 retos y 24000 opciones con una única coincidencia por ficha.
- [x] Contrastar raíces, derivadas numéricas, extremos, asíntotas y separación de ramas SVG.
- [x] Recorrer 12 retos en navegador: 450/600 con pista, reintento y dos fallos; 600/600 en sesión perfecta.
- [x] Revisar teclado, descripciones, bloqueo, reinicio, fórmulas, móvil 320 px, texto 200 %, contraste y preferencias dentro del iframe.
- [x] Comprobar inserción bajo subcarpeta y 171 HTML sin rutas o fragmentos locales rotos ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-22.md. Siguiente: Transforma la función. Lectores de pantalla y lectura matemática siguen pendientes.

### 2026-09-29 · `feat: transformar gráficas con composición real`

- [x] Generar seis retos de polinomios, valor absoluto y racionales con rutas válidas.
- [x] Implementar traslaciones, escalas y reflexiones sobre la gráfica actual, incluidos los desplazamientos.
- [x] Comparar funciones equivalentes mediante coeficientes, vértices y asíntotas; aceptar parámetros y rutas distintos.
- [x] Añadir gráfica original opcional, descripción textual, correspondencia de puntos y registro de movimientos accesible.
- [x] Puntuar por movimientos; conservar el coste al volver a la original y permitir mostrar solución con cero puntos.
- [x] Integrar en página anfitriona, Laboratorios e índice t02.

### 2026-09-29 · `fix: conservar delimitadores LaTeX en los dos widgets`

- [x] Conservar con String.raw los delimitadores en las fórmulas de Transforma la función y la solución de Construye la gráfica.
- [x] Reforzar pruebas exigiendo contenedores MathJax, además de ausencia de errores y delimitadores pendientes.

### 2026-09-29 · `test: comprobar transformaciones y equivalencia`

- [x] Superar 69 pruebas acumuladas, incluidas 1000 sesiones / 6000 objetivos del nuevo juego.
- [x] Contrastar cada acción con la composición de la función original, incluidos ejemplos de orden no conmutativo.
- [x] Verificar seis retos en navegador, ruta equivalente con parámetros distintos, puntuación exacta, solución mostrada, bloqueo, límites y reinicio.
- [x] Comprobar teclado, texto al 200 % a 320 px, contraste, preferencias en iframe y subcarpeta.
- [x] Repetir los 12 retos del navegador de Construye la gráfica con fórmulas renderizadas.
- Evidencia: docs/verificacion-entrega-23.md. Siguiente: Optimiza. Lectores de pantalla y lectura matemática siguen pendientes.

- [x] Comprobar los 171 HTML: cero enlaces locales rotos, fragmentos ausentes o IDs duplicados.

### 2026-09-29 · `feat: desarrollar Optimiza con microhistorias procedurales`

- [x] Crear cuatro modelos: beneficio con capacidad, coste medio, recinto con pared e ingreso de paquetes enteros.
- [x] Generar cinco decisiones por historia: función objetivo, dominio, candidatos, extremo e interpretación.
- [x] Explicar capacidad que excluye el estacionario, máximo con pérdidas, raíz negativa inadmisible, límites no alcanzados y empate entero.
- [x] Reutilizar el motor de test con pistas, dos intentos, corrección razonada y resumen sin historial.
- [x] Conservar delimitadores y órdenes LaTeX; regenerar datos al reiniciar la sesión.
- [x] Insertar el widget y enlazar desde Laboratorios e índice t02; actualizar el estado editorial del juego.

### 2026-09-29 · `test: contrastar decisiones de optimización y renderizado`

- [x] Superar 73 pruebas acumuladas; comprobar los cuatro modelos en 1000 sesiones y 4000 decisiones en 200 bancos.
- [x] Verificar candidatos y restricciones, máximos de beneficio, mínimos de coste, áreas y todos los enteros del modelo de ingreso.
- [x] Recorrer 40 decisiones en navegador: pista, reintento, dos fallos, resúmenes 18/20 y 20/20, reinicio y ausencia de respuestas al recargar.
- [x] Contar fórmulas MathJax en enunciados, opciones y correcciones; descartar errores y delimitadores sin procesar.
- [x] Revisar capturas de escritorio y móvil 320 px con texto 200 %, contraste y resaltado; comprobar teclado, preferencias dentro del iframe y subcarpeta.
- [x] Comprobar 171 HTML: cero enlaces locales rotos, fragmentos ausentes o IDs duplicados.
- Evidencia: docs/verificacion-entrega-24.md. Siguiente: revisión integrada de t02, después 3.1. Lectores de pantalla y lectura matemática pendientes.

### 2026-09-29 · `fix: completar recorrido de repaso del tema 2`

- [x] Añadir orientación entre epígrafes y juegos, retornos al tema y a Laboratorios y enlace hacia integrales.
- [x] Corregir el texto desactualizado de 54 preguntas en el índice de test; t02 tiene 60.
- [x] Verificar navegación con teclado hacia los tres widgets y retorno, bancos 60/54 y estados editoriales coherentes.
- [x] Mantener el cierre global pendiente de lectores de pantalla y pronunciación matemática.

### 2026-09-29 · `feat: desarrollar integral indefinida y familia de primitivas`

- [x] Explicar primitiva, integral indefinida, constante por intervalo y comprobación mediante derivada.
- [x] Resolver condición inicial, polinomio, coste marginal y práctica; aclarar dominios separados en una ampliación.
- [x] Crear explorador de tres familias, constante C, pendiente, punto exigido y ajuste al dato inicial.
- [x] Añadir seis preguntas y seis tarjetas; abrir índice de integrales y filtros del tema 3 conservando los bancos anteriores.

### 2026-09-29 · `test: comprobar primitivas, filtros y accesibilidad de interacción`

- [x] Superar 77 pruebas acumuladas, incluidos 351 estados matemáticos del explorador y comprobaciones por derivadas.
- [x] Recorrer 27 ajustes en navegador, valores, pendientes, marcas, referencias, extremos del control C y respuesta conservada.
- [x] Completar test de lección 5/6 con pista y reintento, seis tarjetas, filtro t03 e índice 1/8.
- [x] Revisar escritorio, móvil 320 px al 200 %, contraste, resaltado, desplazamiento de tabla con teclado y subcarpeta.
- [x] Repetir la regresión del catálogo completo: 126 preguntas y 121 tarjetas junto a las tres lecciones avanzadas de t01.
- [x] Comprobar 171 HTML sin enlaces/fragmentos locales rotos ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-25.md. Siguiente: 3.2. Integrales inmediatas.

### 2026-09-29 · `feat: desarrollar integrales inmediatas y linealidad`

- [x] Construir tabla con condiciones de dominio y derivada de comprobación; distinguir x⁻¹, raíces y bases exponenciales.
- [x] Explicar sumas y factores constantes, con contraejemplo a la regla incorrecta de productos.
- [x] Resolver cinco ejemplos y práctica con condición inicial; incorporar seis preguntas y seis tarjetas.
- [x] Crear sesiones de seis retos procedurales con pistas, reintento, comprobación derivando y reinicio sin historial.
- [x] Integrar navegación, estado editorial 2/8 y bancos t03 de doce preguntas y doce tarjetas.

### 2026-09-29 · `fix: ampliar variedad de las sesiones de integrales`

- [x] Corregir correlaciones del generador al seleccionar datos; contrastar diversidad en 1000 semillas.
- [x] Mantener el motor común de fórmulas y la clasificación editorial de textos para el futuro diseño.

### 2026-09-29 · `test: verificar tabla, práctica y bancos de integrales`

- [x] Superar 81 pruebas acumuladas; contrastar 6000 integrales y 24000 opciones mediante derivadas numéricas.
- [x] Comprobar ejemplos, condición inicial, intervalos negativos, potencias fraccionarias y bases menores que uno.
- [x] Recorrer dos sesiones procedurales y el test, pistas, reintento, reinicio y seis tarjetas en navegador.
- [x] Verificar LaTeX renderizado, teclado, móvil 320 px al 200 %, contraste, resaltado y subcarpeta.
- [x] Repetir 3.1 y el catálogo completo de 132 preguntas y 127 tarjetas.
- [x] Comprobar 171 HTML sin enlaces o anclas locales rotos ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-26.md. Siguiente: 3.3. Integrales casi inmediatas. Los pendientes globales de PDF, administración, traducción, voz y revisión con lectores de pantalla se mantienen.

### 2026-09-29 · `feat: desarrollar integrales casi inmediatas`

- [x] Explicar la regla de la cadena inversa, el ajuste constante y la identidad en puntos donde u′=0.
- [x] Construir tabla con dominios, potencias, cocientes, exponenciales y extensión trigonométrica.
- [x] Resolver ocho cálculos en siete bloques y práctica con condición inicial; incorporar contraejemplos a ajustes variables.
- [x] Añadir seis preguntas base y seis tarjetas; abrir el tercer epígrafe y actualizar navegación y bancos.
- [x] Crear entrenamiento de seis familias, con función interior, derivada, pistas, dos intentos y comprobación sin historial.

### 2026-09-29 · `test: contrastar composición, dominios e interacción`

- [x] Superar 85 pruebas acumuladas, incluyendo 6000 composiciones y 24000 opciones contrastadas mediante derivadas numéricas.
- [x] Comprobar ajustes de ambos signos, potencias negativas, logaritmos a ambos lados del punto excluido y la condición inicial.
- [x] Recorrer dos rondas procedurales, seis preguntas y seis tarjetas; verificar reinicio, pistas, reintento y selección conservada entre actividades.
- [x] Comprobar MathJax, teclado, móvil 320 px al 200 %, contraste, resaltado y subcarpeta.
- [x] Corregir la anchura de la primera columna de la tabla tras revisar la captura.
- [x] Repetir 3.2 y la regresión general de 138 preguntas/133 tarjetas, con tres lecciones avanzadas de t01.
- [x] Comprobar 171 HTML sin enlaces o anclas locales rotos ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-27.md. Siguiente: 3.4. Métodos de integración. Siguen pendientes las fases globales de PDF, administración central, traducción, voz y lectores de pantalla.

### 2026-09-29 · `feat: desarrollar métodos de integración y taller de transformaciones`

- [x] Organizar una guía de decisión, simplificación, división, cancelación con dominio y cambio de variable completo.
- [x] Resolver cinco ejemplos nucleares y práctica con condición inicial; añadir descomposición elemental y partes como ampliaciones identificadas.
- [x] Generar seis transformaciones por sesión, con opciones inequívocas, pista, dos intentos y continuación hasta la primitiva.
- [x] Añadir seis preguntas y seis tarjetas, enlaces y estado editorial 4/8; conservar el diseño provisional y el motor común de fórmulas.

### 2026-09-29 · `fix: revisar el paso logarítmico del ejercicio local F029`

- [x] Detectar y comprobar el error ∫1/(1−x) dx=x en el primer ejercicio 3 del solucionario.
- [x] Desarrollar la respuesta correcta con signo y valor absoluto en la lección, conservando el ZIP original.
- [x] Registrar M13 en el inventario y su procedencia; mantener pendiente la copia LaTeX y la compilación del PDF.

### 2026-09-29 · `test: verificar transformaciones, dominios y catálogo`

- [x] Superar 89 pruebas acumuladas: 6000 transformaciones y 24000 opciones, recuperación del integrando original y derivadas independientes.
- [x] Comprobar puntos excluidos antes y después de cancelar, signos de du, ejemplos, ampliaciones y dato inicial.
- [x] Recorrer dos sesiones procedurales, test, seis tarjetas, ampliaciones, pistas, reintento y reinicio sin historial.
- [x] Revisar fórmulas, teclado, tabla desplazable, móvil 320 px al 200 %, contraste, resaltado y subcarpeta.
- [x] Repetir tres lecciones avanzadas t01 y el catálogo de 144 preguntas/139 tarjetas.
- [x] Comprobar 171 HTML sin rutas o fragmentos locales rotos ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-28.md. Siguiente: 3.5. Integral definida. Siguen pendientes las fases globales de recursos PDF, administración, traducción, voz y lectores de pantalla.

### 2026-09-30 · `feat: desarrollar integral definida y acumulación con signo`

- [x] Introducir sumas de puntos medios, resultado numérico, unidades y diferencia respecto a la integral indefinida.
- [x] Explicar áreas superior/inferior, compensación, límites iguales e invertidos, aditividad y linealidad.
- [x] Resolver ejemplos geométricos, tasa neta con saldo inicial, propiedades y práctica; añadir seis preguntas y seis tarjetas.
- [x] Mantener 3.6 y 3.7 pendientes: los cálculos de esta lección usan geometría y propiedades.

### 2026-09-30 · `feat: explorar áreas, orientación y rectángulos`

- [x] Dibujar tres funciones con rayados distintos para las regiones por encima y debajo del eje.
- [x] Permitir elegir e intercambiar los límites, incluidos extremos iguales, conservando las respuestas del test.
- [x] Mostrar tabla de tramos, áreas parciales, integral, área geométrica y orientación de a hacia b.
- [x] Añadir 4, 8, 16 o 32 rectángulos de puntos medios, aproximación y error absoluto respecto a la geometría exacta.
- [x] Acompañar el gráfico con descripción textual y tabla desplazable con teclado.

### 2026-09-30 · `test: verificar área, aproximación y catálogo`

- [x] Superar 93 pruebas acumuladas: 588 configuraciones contrastadas con primitivas independientes de f y de |f|.
- [x] Revisar aditividad para todos los triples de extremos, linealidad, convergencia y casos con cancelación o intervalo nulo.
- [x] Recorrer 27 configuraciones en navegador, cambios de orientación, cuatro cantidades de rectángulos y cambios consecutivos.
- [x] Verificar test 5/6 con pista/reintento y reinicio, seis tarjetas, fórmulas, móvil 320 px al 200 %, contraste, resaltado, teclado y subcarpeta.
- [x] Repetir tres lecciones avanzadas t01 y el catálogo completo de 150 preguntas/145 tarjetas.
- [x] Revisar 171 HTML sin enlaces o fragmentos locales rotos ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-29.md. Siguiente: 3.6. Teorema fundamental del cálculo. Se conservan el diseño provisional y los pendientes globales de PDF, administración, traducción, voz y lectores de pantalla.

### 2026-09-30 · `feat: desarrollar el teorema fundamental del cálculo`

- [x] Explicar A′=f para integrandos continuos, A(a)=0, intuición de la franja y justificación mediante una cota.
- [x] Relacionar signo de f y crecimiento de A sin confundir valor acumulado y pendiente.
- [x] Resolver ejemplos con dato inicial, extremos, tasa neta y derivación sin hallar antes una primitiva; añadir práctica.
- [x] Incorporar contraejemplos de salto y valor aislado, más ampliación de extremo compuesto y límite inferior variable.
- [x] Añadir seis preguntas, seis tarjetas y puente conceptual hacia Barrow; actualizar índice 6/8 y navegación.

### 2026-09-30 · `feat: comparar integrando, acumulación y secantes laterales`

- [x] Mostrar dos gráficos con escalas verticales identificadas, sombreado del intervalo y marcadores de valor y origen.
- [x] Permitir cuatro integrandos, tres orígenes, nueve puntos y tres distancias h: 324 configuraciones.
- [x] Mostrar tangente cuando existe y dos secantes diferenciadas por trazos y marcadores, con tabla numérica.
- [x] Contrastar f=|t|, continua, y el salto −1/1; omitir la tangente donde A no es derivable.
- [x] Conservar respuestas al cambiar los controles y ofrecer descripción textual y lectura de valores redondeados.

### 2026-09-30 · `test: verificar acumulación, condiciones y catálogo`

- [x] Superar 97 pruebas acumuladas: acumulaciones contrastadas con cuadratura independiente, pendientes, dato inicial y convergencia de las secantes.
- [x] Verificar que cambiar a solo desplaza A, sin alterar pendientes, y que el cociente simétrico del salto no demuestra derivabilidad.
- [x] Comprobar ejemplos, condiciones iniciales, extremos, regla de la cadena y límite inferior variable.
- [x] Recorrer 36 configuraciones en navegador, tres h, salto/esquina, tangente, secantes, puntos, teclado y cambios consecutivos.
- [x] Completar test 5/6 con pista y reintento, reinicio y seis tarjetas; revisar LaTeX, móvil 320 px al 200 %, contraste, resaltado y subcarpeta.
- [x] Repetir tres lecciones avanzadas t01 y el catálogo de 156 preguntas/151 tarjetas.
- [x] Revisar 171 HTML sin rutas o fragmentos locales rotos ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-30.md. Siguiente: 3.7. Regla de Barrow. Diseño provisional y pendientes globales de recursos PDF, administración, traducción, voz y lectores de pantalla conservados.

## Entrega 31 · 1 de octubre de 2026

### feat: desarrollar Barrow y el control de extremos

- [x] Leer guion 3.7, test T3.5, tarjeta 12 y ejercicio 2(b) de recuperación T1.
- [x] Explicar condiciones, primitiva, resta, cancelación de C y cálculo exacto.
- [x] Desarrollar cinco ejemplos, tramos, integral frente a área y práctica resuelta.
- [x] Explicar el fallo al atravesar cero con 1/x; ampliación de límites impropios.
- [x] Añadir laboratorio de 225 configuraciones e intercambio de extremos.
- [x] Añadir seis familias procedurales, seis preguntas y seis tarjetas sin historial.

### fix: mantener legible la tabla con texto ampliado

- [x] Añadir ancho mínimo y desplazamiento local por teclado a la nueva tabla.
- [x] Conservar diseño provisional, roles editoriales y componentes compartidos.

### test: verificar matemáticas, actividades y navegación

- [x] Superar 101 pruebas acumuladas, incluidas 225 configuraciones y 6000 retos nuevos contrastados mediante cuadratura independiente.
- [x] Recorrer 75 combinaciones en navegador, constantes, orientación y recuperación tras un intervalo inválido.
- [x] Completar dos sesiones procedurales, test con pista/reintento y seis tarjetas.
- [x] Verificar móvil de 320 px al 200 %, contraste, resaltado y teclado.
- [x] Comprobar filtros 42/42, índice 7/8 y carga en subcarpeta.
- [x] Recorrer 162 preguntas y 157 tarjetas del catálogo y tres lecciones avanzadas t01.
- [x] Revisar 171 HTML sin enlaces locales rotos, fragmentos ausentes ni IDs duplicados.
- Evidencia: docs/verificacion-entrega-31.md. Siguiente: 3.8. Aplicaciones de la integral. Cierre global de t03, PDF, administración, traducción, voz y lectores de pantalla pendientes.

## Entrega 32 · 1 de octubre de 2026

### feat: desarrollar áreas entre curvas y acumulaciones

- [x] Revisar guion 3.8, T3.7 y conceptos 15–17 del mazo original.
- [x] Revisar en los ZIP el recinto de h=−x²+2x+3 y el área de x²−2x−1 en [0,1], sin modificar originales.
- [x] Desarrollar seis ejemplos de áreas, dos modelos de acumulación y práctica resuelta entre recta y parábola.
- [x] Explicar fronteras, dominios, cortes, orden de curvas, signos y unidades.
- [x] Añadir explorador con cuatro familias, escalas, inversión, intercambio de nombres, tramos y rayados.
- [x] Añadir seis retos por sesión, seis conceptos y seis tarjetas sin persistencia personal.

### test: contrastar áreas y verificar lectura e interacción

- [x] Superar 105 pruebas acumuladas: 600 configuraciones y 6000 retos nuevos, áreas por cuadratura independiente y opciones exactas en fracciones.
- [x] Recorrer 100 configuraciones y 24 variantes de escala/intercambio en navegador; revisar cortes, regiones y tablas.
- [x] Comprobar límites iguales, inversión, sombreado, cambios consecutivos y conservación de respuesta.
- [x] Resolver dos sesiones procedurales, test 5/6 con pista y reintento y seis tarjetas.
- [x] Verificar LaTeX, teclado, móvil 320 px al 200 %, contraste, resaltado y subcarpeta.
- [x] Revisar el catálogo completo de 168 preguntas/163 tarjetas y tres lecciones avanzadas t01.
- [x] Revisar 171 HTML sin rutas locales rotas, fragmentos ausentes ni IDs duplicados.

### docs: completar la secuencia de lecciones sin cerrar prematuramente el tema

- [x] Actualizar índice 8/8, bancos 48/48, portada, README, procedencia y verificación.
- El cierre global de t03 sigue pendiente. Próximo paso: auditoría y repaso del tema; después, sus tres videojuegos. PDF, administración, traducción, voz y lectores de pantalla mantienen sus fases previstas.

## Entrega 33 · 1 de octubre de 2026

### feat: integrar el repaso de las ocho lecciones de integrales

- [x] Incorporar cuatro bloques con pistas, soluciones y enlaces de refuerzo.
- [x] Trabajar compatibilidad, equivalencia, límites transformados, tasa por tramos, máximo, variación total, contacto e invariancia del área.
- [x] Añadir doce preguntas con trazabilidad a los ocho epígrafes: 60 preguntas base en t03.
- [x] Conservar seis preguntas por lección y las 48 tarjetas, sin persistencia personal.
- [x] Enlazar 3.8 con el repaso y actualizar portada, índice y test.

### docs: auditar cobertura y problemas sin cerrar el tema antes de tiempo

- [x] Relacionar guion 3.1–3.8, T3.1–T3.10 y los 18 conceptos de tarjetas con sus bancos.
- [x] Inventariar veinte problemas o bloques con ubicación y resultado.
- [x] Separar preguntas base, variantes y configuraciones.
- [x] Mantener pendientes los tres videojuegos, sus variantes y lectores de pantalla.

### test: comprobar síntesis, fórmulas y recorrido

- [x] Superar 109 pruebas acumuladas con comprobaciones independientes de los cuatro bloques.
- [x] Resolver test 11/12 con error, pista, reintento y reinicio.
- [x] Verificar las cuatro soluciones y ampliación, LaTeX, teclado, móvil 320 px al 200 %, contraste, resaltado y subcarpeta.
- [x] Recorrer las ocho lecciones, conservar sus bancos de seis preguntas y volver al repaso desde 3.8.
- [x] Revisar las 180 preguntas y 163 tarjetas del catálogo y tres lecciones avanzadas t01.
- [x] Revisar 171 HTML y enlaces locales del nuevo documento de auditoría.
- Evidencia: docs/verificacion-entrega-33.md. Próximo: Parejas de primitivas. Diseño provisional conservado.

### 2026-10-05 · `feat: emparejar integrandos y familias de primitivas`

- [x] Desarrollar t03-a como widget independiente e insertable: dos tableros, diez parejas, siete opciones por tablero y orden variable.
- [x] Añadir pistas, dos intentos, corrección mediante derivadas, familias con +C y resumen con diez soluciones.
- [x] Aplicar 100/50/0 puntos y bonus de 100 por cinco aciertos consecutivos al primer intento; máximo 1200.
- [x] Enlazar desde portada, Laboratorios y tema 3; conservar estado parcial del tema.

### 2026-10-05 · `fix: distinguir una primitiva particular de la familia completa`

- [x] Explicar que omitir +C puede dar una primitiva válida, pero no toda la familia solicitada.
- [x] Bloquear parejas resueltas y opciones asignadas, impedir doble puntuación y mostrar ambas referencias de cada emparejamiento.
- [x] Mantener fórmulas dentro de las etiquetas de los controles y ajustes de lectura compartidos.

### 2026-10-05 · `test: verificar parejas, puntuación e inserción`

- [x] Superar 113 pruebas acumuladas; validar por derivadas numéricas 10.000 integrandos de 1000 semillas y la unicidad de su familia entre las opciones.
- [x] Completar sesiones de 950/1200 y 1200/1200, pistas, errores, reintentos, bloqueo y nueva sesión.
- [x] Verificar teclado, móvil de 320 px con texto al 200 %, fórmulas, preferencias, recarga, iframe, subcarpeta y ruta desde el libro.
- [x] Revisar capturas y comprobar rutas locales, fragmentos e identificadores de los 171 HTML.
- [x] Actualizar procedencia, auditoría, README y evidencia de la entrega 34.
- Diseño provisional conservado. Sin historial del alumnado. Siguiente: Método correcto. Continúan los pendientes globales de PDF, administración central, traducción, voz y lectores de pantalla.

### 2026-10-05 · `feat: elegir el método antes de resolver la integral`

- [x] Desarrollar t03-b con ocho retos variables, cuatro estrategias y dos decisiones por reto.
- [x] Desbloquear la elección de primitiva tras decidir la estrategia; añadir pistas, dos intentos y soluciones completas.
- [x] Añadir dos ampliaciones por partes y precisar que la ruta propuesta no excluye otros métodos válidos.
- [x] Integrar el widget en su anfitrión, portada, Laboratorios y ruta del tema; conservar diseño provisional y ausencia de historial.

### 2026-10-05 · `test: comprobar métodos, primitivas y recorrido de sesión`

- [x] Superar 117 pruebas acumuladas; contrastar 8000 integrandos de 1000 semillas y una familia completa válida por reto.
- [x] Completar sesiones de 1400/1600 y 1600/1600 con bloqueo de fases, errores, pistas, reintentos y ocho soluciones finales.
- [x] Verificar teclado, texto al 200 %, móvil de 320 px, preferencias conservadas, recarga sin respuestas, iframe y subcarpeta.
- [x] Revisar capturas y referencias locales de los 171 HTML.
- [x] Actualizar el selector del test del juego anterior al añadir un segundo enlace en la ruta del tema.

### 2026-10-05 · `docs: registrar procedencia y cerrar la entrega 35`

- [x] Actualizar README, auditoría del tema, procedencia y docs/verificacion-entrega-35.md.
- Las variantes no incrementan las 180 preguntas base ni las 163 tarjetas. Siguiente: Área por tramos. Continúan los pendientes globales de PDF, administración central, traducción, voz y lectores de pantalla.

### 2026-10-05 · `feat: separar la integral con signo del área por tramos`

- [x] Desarrollar t03-c como widget independiente e insertable: seis curvas variables y tres pasos por curva.
- [x] Seleccionar cortes en la gráfica o con casillas; acompañar la gráfica de tabla de valores y descripción de signos.
- [x] Introducir integrales parciales y resultados totales con enteros, fracciones o decimales.
- [x] Añadir dos intentos, pistas, corrección mediante Barrow y resumen de seis soluciones.
- [x] Explicar partición mínima, raíces de contacto, extremos y diferencia entre valor absoluto de una suma y suma de valores absolutos.
- [x] Enlazar desde portada, Laboratorios, índice y cierre del tema 3; conservar diseño provisional.

### 2026-10-05 · `test: verificar curvas, cortes y partidas completas`

- [x] Superar 122 pruebas acumuladas: 6000 curvas de 1000 semillas, primitivas contrastadas por derivación numérica e integrales por cuadratura independiente.
- [x] Verificar formato numérico, fracciones equivalentes, coma decimal, signo menos tipográfico, tolerancia de redondeo e intentos no consumidos por entradas inválidas.
- [x] Completar dos sesiones de 1600/1800 y 1800/1800, con ratón, teclado, casillas, pistas, errores y bloqueo de doble puntuación.
- [x] Comprobar móvil de 320 px y texto al 200 %, tabla alternativa, conservación de respuestas con preferencias, recarga sin historial, iframe y subcarpeta.
- [x] Revisar capturas y referencias locales de los 171 HTML.

### 2026-10-05 · `docs: cerrar el tercer widget de integrales`

- [x] Actualizar procedencia, README, auditoría y docs/verificacion-entrega-36.md.
- Diez widgets desarrollados. No se añaden variantes al banco fijo: 180 preguntas y 163 tarjetas. Siguiente: revisión integrada de t03; después matrices. Las fases globales de PDF, administración, voz, traducción y lectores de pantalla siguen pendientes.

### 2026-10-05 · `feat: conectar el recorrido de integrales con sus tres juegos`

- [x] Organizar la orientación en tres etapas vinculadas a los bloques del libro, sin requisitos de acceso ni puntuación.
- [x] Añadir refuerzo desde 3.3 a Parejas de primitivas, desde 3.4 a Método correcto y desde 3.8 a Área por tramos.
- [x] Conectar juegos anterior/siguiente y regreso al repaso en sus páginas anfitrionas.
- [x] Conservar todos los contenidos y el diseño provisional.

### 2026-10-05 · `test: recorrer el tema 3 de principio a fin`

- [x] Revisar las ocho lecciones y corregir una pregunta de cada una, conservando la selección al cambiar tamaño, contraste y resaltado.
- [x] Completar las 60 preguntas del tema con sus explicaciones y mostrar las 48 tarjetas.
- [x] Repetir la verificación del repaso: cuatro bloques, ampliación y doce decisiones con pista y reintento.
- [x] Comprobar tres juegos insertados e independientes, propagación de preferencias y corrección inicial.
- [x] Recorrer la cadena entre los juegos y regresar al repaso en una subcarpeta.
- [x] Verificar fórmulas, móvil de 320 px y lectura al 200 %, capturas y estados editoriales.
- [x] Superar las 122 pruebas matemáticas y de estado acumuladas.
- [x] Comprobar rutas y fragmentos de los 171 HTML y enlaces de la documentación.

### 2026-10-05 · `docs: conciliar la auditoría de integrales`

- [x] Marcar el recorrido conjunto terminado y actualizar README, procedencia y docs/verificacion-entrega-37.md.
- Se conserva t03 como parcial y la casilla de cierre global sin marcar: lectores de pantalla y pronunciación matemática aún pendientes.
- Los bancos, inventario de problemas y variantes permanecen sin cambios. Siguiente: 4.1. Matrices: definición, características y tipos.

### 2026-10-05 · `feat: comenzar álgebra con la definición y los tipos de matrices`

- [x] Desarrollar 4.1 con objetivos, requisitos, definición, orden, índices, ocho tipos, igualdad y lectura de unidades.
- [x] Añadir cuatro ejemplos resueltos y práctica con parámetro, errores, resumen y refuerzo.
- [x] Crear editor de 1×1 a 4×4 con ocho ejemplos, selección de elementos, clasificación simultánea y generación de valores.
- [x] Integrar seis preguntas y seis tarjetas propias/adaptadas en el tema 4 y el catálogo global.
- [x] Activar el filtro t04 en test y tarjetas; actualizar índice del tema, libro, portada y estado editorial.

### 2026-10-05 · `fix: conservar lectura ampliada y coherencia del editor`

- [x] Validar enteros entre −99 y 99, señalizar entradas inválidas y conservar el último valor válido.
- [x] Conservar casillas comunes al redimensionar y rellenar las nuevas con cero.
- [x] Identificar el editor como personalizado tras cambios y permitir volver a cargar un ejemplo.
- [x] Corregir el desbordamiento de controles al 200 % y evitar encabezados de tabla partidos letra por letra.
- [x] Distinguir nula rectangular de nula cuadrada y contemplar todas las clasificaciones de 1×1.

### 2026-10-05 · `test: verificar matrices y la ampliación del catálogo`

- [x] Superar 126 pruebas acumuladas: clasificación exhaustiva de 81 matrices 2×2 y 1600 variantes de distintos órdenes.
- [x] Verificar igualdad, dimensiones, conservación sin alias, inválidos, ejemplos y bancos aislados.
- [x] Probar editor, entrada inválida, dimensiones, generación, test 5/6 con reintento, seis tarjetas y recarga.
- [x] Comprobar móvil 320 px, lectura al 200 %, contraste, resaltado, fórmulas, subcarpeta e índice con 1 lección disponible y 11 pendientes.
- [x] Recorrer las 186 preguntas y 169 tarjetas del catálogo general, con regresión de tres lecciones de t01.
- [x] Comprobar referencias y fragmentos en los 171 HTML.

### 2026-10-05 · `docs: registrar fuentes y límites de la entrega 38`

- [x] Actualizar README, procedencia y docs/verificacion-entrega-38.md.
- Las variantes del editor no incrementan el banco fijo. Se conservan originales, diseño provisional y ausencia de historial.
- Siguiente: 4.2. Operaciones con matrices. PDF, administración central, voz, traducción y lectores de pantalla siguen pendientes.

### 2026-10-05 · `feat: desarrollar las operaciones elemento a elemento con matrices`

- [x] Completar 4.2 con objetivos, requisitos, teoría, propiedades, cuatro ejemplos, práctica, errores y resumen.
- [x] Diferenciar compatibilidad de dimensiones de coherencia de categorías y unidades.
- [x] Incorporar editor de dos matrices de 1×1 a 3×3, cuatro operaciones, escalares, variantes y cálculo por elemento.
- [x] Rechazar órdenes incompatibles y entradas inválidas; conservar el último valor válido.
- [x] Añadir seis preguntas y seis tarjetas; conectar índices, portada, filtros y estado editorial.

### 2026-10-05 · `test: comprobar operaciones, fórmulas y recorrido del catálogo`

- [x] Superar 131 pruebas acumuladas, incluidas 800 variantes y 81 parejas de órdenes.
- [x] Comprobar propiedades, contraejemplos, contextos, despeje y práctica.
- [x] Probar las cuatro operaciones, edición, dimensiones, escalares negativos/cero, variantes, test 5/6, tarjetas y recarga.
- [x] Verificar móvil de 320 px, lectura al 200 %, contraste, resaltado, fórmulas y alojamiento en subcarpeta.
- [x] Recorrer 192 preguntas y 175 tarjetas, y repetir la regresión de 4.1.
- [x] Comprobar referencias locales, fragmentos e IDs en los 171 HTML.

### 2026-10-05 · `docs: cerrar la entrega 39 y preparar el producto de matrices`

- [x] Actualizar plan, README, procedencia y docs/verificacion-entrega-39.md.
- Diseño provisional, originales y ausencia de historial conservados; las variantes se cuentan aparte.
- Siguiente: 4.3. Producto de matrices. PDF, administración central, voz, traducción y lectores de pantalla siguen pendientes.

### 2026-10-06 · `feat: desarrollar el producto fila por columna`

- [x] Completar 4.3 con objetivos, requisitos, condiciones dimensionales, fórmula general y propiedades.
- [x] Resolver cinco ejemplos: rectangulares, no conmutatividad, ingresos, transformaciones y producto nulo.
- [x] Añadir práctica explicada, errores frecuentes y resumen.
- [x] Crear editor de AB/BA con cuatro ejemplos, selección de resultado, contornos de fila/columna, explicación textual y todos los pasos.
- [x] Integrar seis preguntas y seis tarjetas; adaptar T4.2 y precisar T4.3 del banco local.
- [x] Conectar navegación, índices, portada, catálogo y estado editorial.

### 2026-10-06 · `test: verificar dimensiones, productos y lectura ampliada`

- [x] Superar 136 pruebas acumuladas: 810 productos, 81 parejas de órdenes, 100 casos de propiedades y todos los ejemplos.
- [x] Comprobar AB/BA, productos incompatibles, edición, límites, casos 1×1 y 3×3 y variantes reproducibles.
- [x] Completar test 5/6 con pista y reintento, seis tarjetas, preferencias y recarga sin historial.
- [x] Revisar móvil de 320 px, texto al 200 %, fórmulas y alojamiento en subcarpeta.
- [x] Repetir el recorrido de 4.2 tras ampliar el catálogo.
- [x] Recorrer 198 preguntas y 181 tarjetas del catálogo y comprobar enlaces, fragmentos e IDs en los 171 HTML.

### 2026-10-06 · `docs: documentar fuentes y límites de la entrega 40`

- [x] Actualizar plan, README, procedencia y docs/verificacion-entrega-40.md.
- El editor es una actividad de lección; no aumenta el número de widgets. Las variantes se cuentan aparte.
- Se conservan originales, diseño provisional y ausencia de historial del alumnado.
- Siguiente: 4.4. Potencia de una matriz. Continúan pendientes PDF, administración central, voz, traducción y lectores de pantalla.

### 2026-10-06 · `feat: desarrollar potencias y patrones matriciales`

- [x] Completar 4.4 con definición, identidad, leyes, condiciones y precauciones con bases distintas.
- [x] Resolver cinco ejemplos, práctica y aplicación a un incremento constante.
- [x] Crear explorador 2×2 con siete ejemplos, exponentes 0–6, variantes, potencias intermedias y último producto explicado.
- [x] Añadir estado iterado desde un vector inicial y distinguir datos abstractos de la aplicación contextual.
- [x] Integrar seis preguntas y seis tarjetas, navegación, portada, filtros e índice.

### 2026-10-06 · `test: verificar potencias y actividades`

- [x] Contrastar 2100 potencias con un algoritmo independiente.
- [x] Comprobar patrones hasta n=12, leyes, ejemplos, práctica, casos inválidos y conservación de datos.
- [x] Recorrer los siete ejemplos, exponentes, edición, variantes, test 5/6 con pista, seis tarjetas y recarga.
- [x] Revisar móvil 320 px, texto al 200 %, preferencias y subcarpeta.
- [x] Superar 141 pruebas acumuladas, repetir la regresión de 4.3 y recorrer 204 preguntas y 187 tarjetas.
- [x] Comprobar enlaces, fragmentos e IDs en los 171 HTML.

### 2026-10-06 · `docs: registrar fuentes y límites de potencias`

- [x] Actualizar plan, README, procedencia y docs/verificacion-entrega-41.md.
- Se conservan originales, diseño provisional y ausencia de historial del alumnado.
- Las variantes y el explorador no incrementan el banco fijo ni el número de widgets.
- Siguiente: 4.5. Comparación, simetría y antisimetría. PDF, administración central, voz, traducción y lectores de pantalla siguen pendientes.

### 2026-10-06 · `feat: desarrollar igualdad, traspuesta y simetrías`

- [x] Completar 4.5 con objetivos, requisitos, teoría, cinco ejemplos, práctica, errores y resumen.
- [x] Distinguir igualdad, trasposición, simetría y antisimetría, incluyendo diagonal y casos límite.
- [x] Crear editor de 1×1 a 3×3, siete ejemplos, seguimiento de posiciones, pares y ejemplos de condiciones incumplidas.
- [x] Añadir seis preguntas y seis tarjetas; adaptar T4.6 del banco local.
- [x] Conectar portada, navegación, índices, filtros y estado editorial.

### 2026-10-06 · `test: verificar comparaciones y trasposición`

- [x] Comprobar exhaustivamente 81 matrices 2×2 y 1600 variantes rectangulares.
- [x] Verificar doble traspuesta, linealidad, inversión de factores, parámetros y datos aplicados.
- [x] Superar 146 pruebas acumuladas y recorrer la nueva lección: edición, dimensiones, casos límite, variantes, test 5/6, seis tarjetas y recarga.
- [x] Revisar móvil 320 px, texto al 200 %, contraste/resaltado, fórmulas y subcarpeta.
- [x] Repetir 4.4 y recorrer 210 preguntas y 193 tarjetas del catálogo general.
- [x] Comprobar referencias, fragmentos e IDs de los 171 HTML.

### 2026-10-06 · `docs: registrar fuentes y límites de la entrega 42`

- [x] Actualizar plan, README, procedencia y docs/verificacion-entrega-42.md.
- Se conservan originales, diseño provisional y ausencia de historial del alumnado.
- Siguiente: 4.6. Determinante de una matriz. Siguen pendientes PDF, administración central, voz, traducción y lectores de pantalla.

### 2026-10-06 · `feat: desarrollar cálculo e interpretación de determinantes`

- [x] Completar 4.6 con definición, órdenes 1–3, Sarrus, signos, inversa, rango y sistemas como enlace a los siguientes contenidos.
- [x] Añadir cinco ejemplos, parámetro, práctica, errores frecuentes y resumen.
- [x] Crear editor con siete ejemplos, productos seleccionables, contornos, posiciones escritas y resta final.
- [x] Distinguir determinante nulo, negativo y no definido en matrices no cuadradas.
- [x] Añadir seis preguntas y seis tarjetas; adaptar T4.4 y T4.5 del banco local y actualizar navegación.

### 2026-10-06 · `test: verificar determinantes con cálculo independiente`

- [x] Contrastar 19.764 matrices de órdenes 2 y 3 mediante expansión por menores.
- [x] Comprobar 1500 variantes, productos, signos, parámetros, ejemplos, práctica y casos inválidos.
- [x] Superar 151 pruebas acumuladas y el recorrido de determinantes: siete ejemplos, edición, variantes, test 5/6, seis tarjetas y recarga.
- [x] Verificar móvil 320 px, texto al 200 %, contraste/resaltado, fórmulas y subcarpeta.
- [x] Repetir 4.5 y recorrer 216 preguntas y 199 tarjetas del catálogo completo.
- [x] Comprobar referencias, fragmentos e IDs de los 171 HTML.

### 2026-10-06 · `docs: registrar fuentes y límites de la entrega 43`

- [x] Actualizar plan, README, procedencia y docs/verificacion-entrega-43.md.
- Se conservan originales, diseño provisional y ausencia de historial del alumnado.
- Siguiente: 4.7. Propiedades de los determinantes. PDF, administración central, voz, traducción y lectores de pantalla siguen pendientes.

### 2026-10-06 · `feat: desarrollar propiedades y transformaciones del determinante`

- [x] Completar 4.7 con operaciones, condiciones, factores, dependencia, triangularidad, producto y traspuesta.
- [x] Añadir cinco ejemplos, práctica explicada, linealidad en una fila y contraejemplo de aditividad global.
- [x] Crear explorador de órdenes 2 y 3 con cuatro bases, cinco operaciones y filas/columnas seleccionables.
- [x] Explicar factor esperado, determinantes antes/después y entradas modificadas sin acumular transformaciones.
- [x] Incorporar seis preguntas y seis tarjetas; adaptar T4.10 e integrar navegación y catálogo.

### 2026-10-06 · `test: contrastar transformaciones y factores`

- [x] Comprobar 54.600 configuraciones, con rechazo de origen y destino iguales en las reglas que lo exigen.
- [x] Verificar escala global, traspuesta, cero, bases singulares, cadenas de operaciones, ejemplos y práctica.
- [x] Superar 156 pruebas matemáticas acumuladas y el recorrido de navegador de 4.7.
- [x] Comprobar móvil de 320 px, texto al 200 %, contraste, resaltado, fórmulas, recarga y subcarpeta.
- [x] Repetir 4.6 y el catálogo completo de 222 preguntas y 205 tarjetas.
- [x] Revisar enlaces, fragmentos e identificadores de los 171 HTML sin errores.
- [x] Corregir la selección de valores numéricos en la prueba automática: distinguir valor interno de etiqueta visible.

### 2026-10-07 · `docs: cerrar fuentes y verificación de la entrega 44`

- [x] Actualizar plan, README, procedencia y docs/verificacion-entrega-44.md.
- Diseño provisional y fuentes originales conservados; sin historial del alumnado.
- Siguiente: 4.8. Desarrollo de un determinante. Siguen pendientes PDF, administración central, voz, traducción y lectores de pantalla.

### 2026-10-07 · `feat: desarrollar menores y adjuntos`

- [x] Desarrollar 4.8 con teoría, cinco ejemplos y práctica explicada.
- [x] Añadir explorador editable de órdenes 2–4 con cuatro bases y variantes.
- [x] Mostrar submatriz, signo, menor, adjunto y aportación de cada posición.
- [x] Integrar seis preguntas y seis tarjetas en el catálogo y la navegación.
- [x] Superar 160 pruebas matemáticas y contrastar 5400 desarrollos mediante permutaciones.
- [x] Recorrer todas las filas, columnas y términos de las cuatro bases; verificar test, tarjetas, edición, variantes y subcarpeta.
- [x] Revisar escritorio y móvil 320 px con texto al 200 %, contraste, resaltado y fórmulas.
- [x] Repetir 4.7 y catálogo completo de 228 preguntas y 211 tarjetas.
- [x] Comprobar enlaces, fragmentos e IDs de los 171 HTML sin errores.
- [x] Cerrar documentación y procedencia de la entrega 45.
- Siguiente: 4.9. Matriz inversa y matriz adjunta.

### 2026-10-07 · `test: verificar desarrollo por filas y columnas`

- [x] Pruebas y regresiones completadas; detalles en docs/verificacion-entrega-45.md.
- [x] Plan, README y procedencia actualizados.
- Se mantienen diseño provisional, MathJax compartido y originales. El tema 4 continúa parcial.
- Siguiente: 4.9. Matriz inversa y matriz adjunta.

### 2026-10-07 · `feat: desarrollar matriz inversa y adjunta`

- [x] Revisar guion 4.9, test T4.7 y tarjetas 16, 17, 19 y 20 del tema 4.
- [x] Crear modelo de órdenes 2–3 con fracciones exactas y control de singularidad.
- [x] Crear explorador con cofactores, trasposición y verificación en ambos órdenes.
- [x] Completar lección, ejemplos, práctica, preguntas y tarjetas.
- [x] Integrar navegación y comprobar matemáticas, navegador y enlaces.
- [x] Cerrar documentación y registro de la entrega 46.

### 2026-10-07 · `test: contrastar inversas y comprobar ambos productos`

- [x] Superar 165 pruebas acumuladas: 1625 matrices contrastadas con Gauss-Jordan.
- [x] Comprobar fracciones, singularidad, ejemplos, ecuaciones, sistema y parámetro.
- [x] Recorrer cuatro bases y todos sus cofactores; edición, cambio de orden, generación y recuperación de la inversa.
- [x] Completar test y tarjetas, revisar móvil 320 px/texto 200 %, preferencias, fórmulas y subcarpeta.
- [x] Repetir 4.8 y catálogo completo de 234 preguntas y 217 tarjetas.
- [x] Revisar 171 HTML: enlaces, fragmentos e identificadores sin errores.

### 2026-10-07 · `docs: cerrar entrega 46 y registrar la convención de adjunta`

- [x] Actualizar plan, README, procedencia y docs/verificacion-entrega-46.md.
- Diseño provisional, configuración matemática y fuentes originales conservados.
- Siguiente: 4.10. Rango de una matriz. Tema 4 parcial; PDF, administración central, voz, traducción y lectores de pantalla siguen pendientes.

### 2026-10-07 · `feat: desarrollar rango por menores y reducción`

- [x] Revisar el guion 4.10 y preparar modelo para matrices rectangulares.
- [x] Crear explorador con menores de todas las posiciones y reducción exacta.
- [x] Completar ejemplos, práctica, preguntas y tarjetas e integrar la navegación.
- [x] Verificar matemáticas, navegador, regresiones y enlaces.
- [x] Cerrar documentación y procedencia de la entrega 47.

### 2026-10-07 · `test: verificar rango por dos métodos`

- [x] Superar 170 pruebas acumuladas y contrastar 2481 matrices y sus pasos.
- [x] Recorrer cinco bases y todos sus menores, rangos 0–3, edición, generación, test y tarjetas.
- [x] Revisar móvil 320 px/texto 200 %, fórmulas, preferencias y subcarpeta.
- [x] Repetir 4.9 y catálogo completo de 240 preguntas/223 tarjetas.
- [x] Verificar 171 HTML sin enlaces rotos, fragmentos inexistentes o IDs duplicados.
- [x] Cerrar plan, README, procedencia y verificación de entrega 47.
- Siguiente lección: 4.11. Ecuaciones matriciales.

### 2026-10-07 · `docs: priorizar HTML originales en bloques estadísticos y PL`

- [x] Registrar la instrucción del usuario, localizar 33 HTML guardados como TXT y listar revisiones por archivo.
- [x] Actualizar el prompt maestro y este plan: no completar automáticamente los huecos de esos bloques.
- [ ] Migrar las fuentes cuando corresponda en la secuencia; dejar carencias señaladas.
- No se han alterado los originales ni se han rellenado páginas de esos bloques en esta entrega.

### 2026-10-07 · `feat: desarrollar ecuaciones matriciales`

- [x] Revisar guion 4.11 y crear modelo de AX+kX=B y XA+kX=B.
- [x] Crear explorador con dimensiones compatibles, fracciones y comprobación.
- [x] Completar lección, actividades e integración.
- [x] Verificar matemáticas, navegador, regresiones y enlaces.
- [x] Cerrar documentación y procedencia de entrega 48.

### 2026-10-07 · `test: contrastar ecuaciones y sustitución original`

- [x] Superar 175 pruebas acumuladas; 8400 ecuaciones contrastadas con Gauss-Jordan.
- [x] Verificar ambos lados, tamaños rectangulares, coeficiente A+kI, singularidad y fracciones.
- [x] Recorrer cinco ejemplos del explorador, edición, cambios de tamaño, escalar y generación.
- [x] Completar test y tarjetas; comprobar móvil 320 px/texto 200 %, preferencias, fórmulas y subcarpeta.
- [x] Repetir 4.10 y catálogo completo de 246 preguntas y 229 tarjetas.
- [x] Revisar enlaces, fragmentos e IDs de 171 HTML sin errores.

### 2026-10-07 · `docs: cerrar entrega 48`

- [x] Actualizar plan, README, procedencia y docs/verificacion-entrega-48.md.
- Se conservan diseño provisional, MathJax compartido y originales.
- Se mantiene el criterio de reutilización de HTML en programación lineal y bloques estadísticos.
- Siguiente: 4.12. Grafos y matriz de adyacencia asociada. Tema 4 aún parcial.

### 2026-10-07 · `feat: conectar grafos y matrices de adyacencia`

- [x] Revisar guion 4.12 y test local T4.8.
- [x] Crear modelo binario sin lazos, con grafos dirigidos/no dirigidos, potencias y recorridos.
- [x] Crear editor de conexiones, representación de la red y descripción textual.
- [x] Completar ejemplos, práctica, preguntas y tarjetas.
- [x] Verificar matemáticas, navegador, regresiones y enlaces.
- [x] Cerrar documentación y precisar el trabajo pendiente del tema 4.

### 2026-10-07 · `test: contrastar redes y recorridos de longitud exacta`

- [x] Superar 180 pruebas acumuladas; 338 redes contrastadas con un recuento independiente.
- [x] Verificar repeticiones, aislados, cero pasos, grados, orientación y edición sin mutación.
- [x] Recorrer cinco redes, 80 combinaciones del anillo, selección de recorridos, teclado, generación y cambios rápidos.
- [x] Completar test y seis tarjetas; revisar móvil 320 px/texto 200 %, contraste, fórmulas y subcarpeta.
- [x] Repetir 4.11 y catálogo completo de 252 preguntas y 235 tarjetas.
- [x] Revisar 171 HTML sin enlaces rotos, fragmentos inexistentes ni IDs duplicados.

### 2026-10-07 · `docs: cerrar entrega 49 y delimitar cierre del tema`

- [x] Actualizar plan, README, procedencia y docs/verificacion-entrega-49.md.
- Diseño provisional, servicio matemático y originales conservados.
- Siguiente: repaso integrado y auditoría del tema 4; después sus tres juegos. El tema sigue parcial.
- Se mantiene el criterio de reutilizar todos los HTML originales en programación lineal y bloques estadísticos, dejando carencias señaladas.

### 2026-10-08 · `feat: preparar repaso integrado de matrices`

- [x] Revisar los doce epígrafes y las fuentes de test y tarjetas.
- [x] Desarrollar cuatro bloques con pistas, soluciones y enlaces de refuerzo.
- [x] Seleccionar doce preguntas existentes sin duplicar el banco.
- [x] Auditar cobertura, problemas, variantes y pendientes del tema 4.
- [x] Verificar matemáticas, recorrido en navegador y enlaces.
- [x] Cerrar documentación de la entrega 50.

### 2026-10-08 · `test: verificar síntesis y recorrido de matrices`

- [x] Superar 185 pruebas acumuladas; validar los cuatro bloques y la selección sin duplicación.
- [x] Recorrer pistas, soluciones y test 11/12 con corrección; comprobar teclado, móvil 320 px/texto 200 %, contraste y fórmulas.
- [x] Visitar las doce lecciones, retornar al repaso y comprobar filtros 72/72 y subcarpeta.
- [x] Repetir grafos y catálogo completo de 252 preguntas y 235 tarjetas.
- [x] Revisar 171 HTML y cuatro documentos: enlaces, fragmentos e identificadores sin errores.

### 2026-10-08 · `docs: cerrar entrega 50 y registrar auditoría del tema 4`

- [x] Publicar docs/auditoria-tema-04.md y docs/verificacion-entrega-50.md; actualizar README y procedencia.
- [x] Mantener el tema parcial: los exploradores no sustituyen sus videojuegos.
- Siguiente: widget Matrix Ops, insertable en su página anfitriona.
- Continúan pendientes los otros juegos, su recorrido conjunto y lectores de pantalla/pronunciación matemática.
- Se conserva el criterio de reutilizar los HTML originales en programación lineal y bloques estadísticos.

### 2026-10-08 · `feat: desarrollar Matrix Ops como widget independiente`

- [x] Revisar el laboratorio 4A y los componentes compartidos.
- [x] Generar retos de tipos, suma, resta, escala, productos y potencias.
- [x] Implementar decisiones previas, cálculo, pistas, dos intentos y resumen.
- [x] Integrar el widget, navegación y estado editorial.
- [x] Verificar matemáticas, puntuación, teclado, fórmulas, móvil y subcarpeta.
- [x] Cerrar documentación de la entrega 51.

### 2026-10-08 · `test: verificar Matrix Ops y su inserción`

- [x] Contrastar 1000 sesiones/8000 retos, cuatro tipos, compatibilidad, resultados y opciones únicas.
- [x] Verificar 1600 puntos en sesión perfecta y 1400 con errores; pistas únicas y bloqueo de doble puntuación.
- [x] Completar dos sesiones en navegador, ocho soluciones, reinicio y variantes.
- [x] Revisar teclado, fórmulas, móvil 320 px/texto 200 %, contraste, preferencias y recarga.
- [x] Verificar iframe, ajuste de altura, subcarpeta, navegación y regreso al repaso.
- [x] Superar 190 pruebas acumuladas y regresión del repaso del tema 4.
- [x] Revisar 171 HTML y cuatro documentos sin enlaces rotos, fragmentos inexistentes ni IDs duplicados.

### 2026-10-08 · `docs: cerrar entrega 51`

- [x] Actualizar README, auditoría del tema 4, procedencia y docs/verificacion-entrega-51.md.
- Diseño provisional y motor matemático compartido conservados; puntuación solo durante la visita.
- No se duplican preguntas por las variantes del juego: bancos 72/72 en t04 y 252/235 en el curso.
- Siguiente: La cámara del determinante. Quedan Redes y adyacencia, recorrido conjunto y accesibilidad global.
- Se mantiene la reutilización de HTML originales en programación lineal y bloques estadísticos.

### 2026-10-08 · `feat: construir La cámara del determinante`

- [x] Revisar el laboratorio 4B y las lecciones 4.6–4.10.
- [x] Generar seis salas y un reto final de determinante, inversa y cofactor.
- [x] Implementar cerraduras, pistas, corrección, reintentos y resumen.
- [x] Integrar widget, anfitrión, enlaces y estado editorial.
- [x] Verificar matemáticas, puntuación, fórmulas, teclado, móvil e inserción.
- [x] Cerrar documentación de la entrega 52.

### 2026-10-08 · `test: verificar las cerraduras del determinante`

- [x] Contrastar 1000 semillas, 6000 salas y 18000 decisiones con cálculos independientes.
- [x] Verificar determinantes, operaciones de filas, rango, parámetro y fracciones exactas de la inversa.
- [x] Completar dos partidas en navegador: 1600 y 1800 puntos; comprobar pistas, errores, mapa, soluciones y reinicio.
- [x] Revisar teclado, fórmulas, móvil 320 px/texto 200 %, contraste, selección y recarga sin historial.
- [x] Verificar inserción, altura, preferencias, subcarpeta y navegación.
- [x] Superar 195 pruebas acumuladas y regresiones de Matrix Ops y repaso del tema 4.
- [x] Revisar 171 HTML y cuatro documentos sin enlaces rotos, fragmentos inexistentes ni IDs duplicados.

### 2026-10-08 · `docs: cerrar entrega 52`

- [x] Actualizar README, auditoría, procedencia y docs/verificacion-entrega-52.md.
- Diseño provisional y servicio matemático compartido conservados; puntos solo durante la visita.
- Las variantes no incrementan el banco: 72 preguntas/72 tarjetas en t04 y 252/235 en el curso.
- Siguiente: Redes y adyacencia; después, recorrido conjunto. El tema 4 sigue parcial.
- Se mantiene la reutilización de todos los HTML originales para programación lineal y bloques estadísticos, con carencias señaladas.

### 2026-10-08 · `feat: construir Redes y adyacencia`

- [x] Revisar laboratorio 4C, lección 4.12 y modelo de grafos.
- [x] Generar seis redes para traducir en ambos sentidos entre grafo y matriz.
- [x] Implementar conexiones, nodos móviles, teclado, pistas y soluciones.
- [x] Integrar widget, navegación y estado editorial.
- [x] Verificar modelos, partidas completas, fórmulas, móvil e inserción.
- [x] Cerrar documentación de la entrega 53.

### 2026-10-08 · `test: verificar traducciones entre grafos y matrices`

- [x] Contrastar 1000 semillas/6000 redes, orientación, simetría, aislados y reconstrucción independiente desde sus conexiones.
- [x] Verificar 600 puntos en sesión perfecta y 450 con reintento y revelación; pistas únicas y bloqueo de doble puntuación.
- [x] Completar dos partidas en navegador, revisar seis soluciones y generar nueva sesión.
- [x] Comprobar nodos por teclado, clic y arrastre; conexiones por tabla, flechas independientes y simetría.
- [x] Revisar fórmulas, móvil 320 px/texto 200 %, contraste, resaltado y conservación de respuestas al cambiar preferencias.
- [x] Verificar iframe, altura, subcarpeta, navegación y recarga sin historial.
- [x] Superar 200 pruebas acumuladas y regresiones de grafos y La cámara del determinante.
- [x] Revisar 171 HTML y cuatro documentos sin enlaces rotos, fragmentos inexistentes ni IDs duplicados.

### 2026-10-08 · `docs: cerrar entrega 53`

- [x] Actualizar README, auditoría, procedencia y docs/verificacion-entrega-53.md.
- Diseño provisional y servicio matemático compartido conservados; respuestas y puntuación solo durante la visita.
- Las variantes no incrementan el banco: t04 72 preguntas/72 tarjetas; curso 252/235.
- Siguiente: recorrido conjunto de los tres juegos, orientación y enlaces de refuerzo. El tema 4 sigue parcial.
- Se mantiene la reutilización de todos los HTML originales en programación lineal y bloques estadísticos, con carencias señaladas.

### 2026-10-08 · `feat: orientar el recorrido de juegos del tema 4`

- [x] Revisar índice, lecciones de enlace y navegación de los tres anfitriones.
- [x] Añadir una ruta por contenidos previos, práctica y refuerzo.
- [x] Conectar anfitriones, ruta del tema y lecciones recomendadas.
- [x] Verificar doce lecciones, 72 preguntas, 72 tarjetas, juegos y subcarpeta.
- [x] Cerrar documentación de la entrega 54 y registrar el siguiente contenido.

### 2026-10-08 · `test: recorrer matrices desde el libro hasta los juegos`

- [x] Revisar doce lecciones, respuestas conservadas con texto ampliado, fórmulas y cabecera/pie.
- [x] Completar el test 72/72 y mostrar las respuestas de las 72 tarjetas.
- [x] Acceder con teclado a los tres juegos insertados, responder y conservar selección al cambiar preferencias.
- [x] Abrir los widgets independientes, verificar puntuación inicial y volver al libro.
- [x] Recorrer la cadena de juegos y el retorno al repaso con prefijo de subcarpeta.
- [x] Revisar capturas de la ruta y un juego insertado con lectura ampliada.
- [x] Superar 200 pruebas acumuladas y repetir el repaso integrado del tema 4.
- [x] Revisar 171 HTML y cuatro documentos sin enlaces rotos, fragmentos ausentes ni IDs duplicados.

### 2026-10-08 · `docs: cerrar entrega 54 y continuar hacia sistemas`

- [x] Actualizar README, procedencia, auditoría y docs/verificacion-entrega-54.md.
- [x] Marcar el recorrido conjunto terminado; mantener t04 parcial por la revisión de lectores de pantalla y pronunciación matemática.
- Diseño provisional, bancos, generadores, originales y servicio matemático conservados.
- Siguiente: 5.1. Sistemas de ecuaciones lineales, según el guion local.
- Permanecen las fases globales de PDF, administración central, traducción, voz y cuentas futuras.
- Se mantiene la reutilización de todos los HTML originales para programación lineal y bloques estadísticos, con carencias señaladas.

### 2026-10-08 · `feat: introducir sistemas de ecuaciones lineales`

- [x] Revisar guion 5.1, test y tarjetas locales del tema 5.
- [x] Desarrollar definición, elementos, modelización, ejemplos y práctica.
- [x] Crear explorador de sustitución simultánea con variantes.
- [x] Integrar seis preguntas, seis tarjetas y filtro del tema 5.
- [x] Verificar matemáticas, navegador, catálogos y enlaces.
- [x] Cerrar documentación de la entrega 55.

### 2026-10-09 · `test: comprobar sustituciones y banco inicial de sistemas`

- [x] Contrastar 4000 sistemas generados en las cuatro dimensiones admitidas, con perturbación de términos independientes.
- [x] Verificar ejemplos, signos, reordenaciones, práctica, filas 0=0 y 0=1 y validación.
- [x] Recorrer cinco ejemplos del explorador, cambios rápidos, tamaños, edición, recuperación y variantes.
- [x] Completar test 5/6 con pista/reintento y mostrar las seis tarjetas.
- [x] Revisar teclado, móvil 320 px/texto 200 %, contraste, resaltado, fórmulas y conservación de valores.
- [x] Verificar recarga sin historial, índice 1/11, filtro t05, cabecera/pie y subcarpeta.
- [x] Superar 205 pruebas acumuladas y regresión del repaso de matrices; revisar capturas.
- [x] Revisar 171 HTML y cuatro documentos sin enlaces rotos, fragmentos ausentes ni IDs duplicados.

### 2026-10-09 · `docs: cerrar entrega 55`

- [x] Actualizar README, procedencia, plan y docs/verificacion-entrega-55.md.
- El explorador comprueba tuplas; no enumera todas las soluciones ni certifica unicidad.
- Diseño provisional, servicio de fórmulas y materiales originales conservados. Las variantes no se cuentan como preguntas nuevas.
- Siguiente: 5.2. Solución de un sistema de ecuaciones; tema 5 parcial.
- Se mantiene el criterio de reutilizar todos los HTML originales de programación lineal y bloques estadísticos, dejando carencias señaladas.

### 2026-10-09 · `feat: conectar soluciones y rectas`

- [x] Revisar guion 5.2 y fuentes locales de test y tarjetas.
- [x] Desarrollar teoría, ejemplos, práctica y distinción entre comprobar y resolver.
- [x] Crear explorador de rectas, fracciones exactas y variantes.
- [x] Integrar seis preguntas, seis tarjetas y navegación.
- [x] Verificar matemáticas, gráfica, accesibilidad de uso y regresiones.
- [x] Cerrar documentación de la entrega 56.

### 2026-10-09 · `test: contrastar intersecciones y soluciones exactas`

- [x] Contrastar 14.400 pares con eliminación independiente y 3.000 variantes con tipo conservado.
- [x] Verificar familias, verticales, fracciones, aproximaciones decimales y práctica contextual.
- [x] Comprobar 2.952 casos de recorte gráfico en tres ventanas y validación de coordenadas.
- [x] Recorrer seis casos, punto solución, parámetro, cambio de ventana, generación y cambios rápidos.
- [x] Completar test 5/6 con pista/reintento y mostrar las seis tarjetas.
- [x] Revisar teclado, móvil 320 px/texto 200 %, contraste, resaltado, fórmulas y conservación de valores.
- [x] Verificar recarga, índice 2/11, filtro t05 12/12, cabecera/pie y subcarpeta.
- [x] Superar 210 pruebas acumuladas, repetir pruebas específicas tras ampliar variantes y regresión de 5.1.
- [x] Revisar capturas, 171 HTML y cuatro documentos sin errores de enlaces, fragmentos o IDs.

### 2026-10-09 · `docs: cerrar entrega 56`

- [x] Actualizar README, procedencia, plan y docs/verificacion-entrega-56.md.
- El dibujo ayuda a interpretar; la solución y la pertenencia de un punto se calculan exactamente.
- Diseño provisional, motor LaTeX y materiales originales conservados. Las variantes no se cuentan como preguntas nuevas.
- Siguiente: 5.3. Clasificación de sistemas de ecuaciones según sus soluciones; tema 5 parcial.
- Se mantiene la reutilización de todos los HTML originales de programación lineal y bloques estadísticos, dejando carencias señaladas.

### 2026-10-09 · `feat: clasificar sistemas por sus soluciones`

- [x] Revisar guion 5.3 y fuentes locales T5.1, T5.2 y T5.10.
- [x] Desarrollar clasificación, seis ejemplos y práctica razonada.
- [x] Añadir seis familias procedurales, seis preguntas y seis tarjetas.
- [x] Verificar matemáticas, navegador, regresión y enlaces.
- [x] Cerrar documentación de la entrega 57.

### 2026-10-09 · `test: comprobar clasificación y variantes de sistemas`

- [x] Contrastar 6.000 variantes con eliminación independiente y sustitución de soluciones.
- [x] Verificar contraejemplos, familias, datos reproducibles y práctica con restricciones enteras.
- [x] Superar 215 pruebas acumuladas.
- [x] Recorrer entrenamiento y test separados, pistas, dos errores, reinicio y tarjetas.
- [x] Revisar teclado, móvil 320 px/texto 200 %, contraste, resaltado y fórmulas.
- [x] Verificar recarga sin historial, índice 3/11, t05 18/18 y subcarpeta.
- [x] Superar regresión de 5.2 y revisar capturas.
- [x] Comprobar 171 HTML y cuatro documentos sin errores de enlaces, fragmentos o IDs.

### 2026-10-09 · `docs: cerrar entrega 57`

- [x] Actualizar README, procedencia, plan y docs/verificacion-entrega-57.md.
- Diseño provisional, roles editoriales, servicio de LaTeX y materiales originales conservados.
- Siguiente: 5.4. Notación matricial de un sistema de ecuaciones. Tema 5 parcial.
- Continúan pendientes las fases globales de PDF, administración central, traducción, voz y cuentas futuras.
- Se mantiene el criterio de reutilizar todos los HTML originales de programación lineal y bloques estadísticos, dejando carencias señaladas.

### 2026-10-09 · `feat: escribir sistemas en forma matricial`

- [x] Revisar guion 5.4, test T5.8 y tarjetas locales de forma matricial.
- [x] Desarrollar teoría, seis ejemplos y práctica contextual.
- [x] Crear explorador de A, X, B y ampliada, con orden de incógnitas y variantes.
- [x] Integrar seis preguntas y seis tarjetas.
- [x] Verificar matemáticas, navegador, regresión y enlaces.
- [x] Cerrar documentación de la entrega 58.

### 2026-10-09 · `test: verificar correspondencia entre ecuaciones y matrices`

- [x] Contrastar 8.000 permutaciones, dimensiones y productos en cuatro tamaños.
- [x] Verificar signos, ceros, ejemplos, práctica contextual y rechazo de entradas inválidas.
- [x] Superar 220 pruebas acumuladas.
- [x] Recorrer seis presets, edición, variantes, orden inverso y cambios rápidos.
- [x] Completar test y tarjetas, teclado y preferencias sin pérdida de estado.
- [x] Corregir desbordamiento de controles en móvil y verificar 320 px/texto 200 %.
- [x] Revisar fórmulas, recarga, índice 4/11, t05 24/24 y subcarpeta.
- [x] Superar regresión de 5.3 y revisar capturas.
- [x] Comprobar 171 HTML y cuatro documentos sin errores de enlaces, fragmentos o IDs.

### 2026-10-09 · `docs: cerrar entrega 58`

- [x] Actualizar README, procedencia, plan y docs/verificacion-entrega-58.md.
- Diseño provisional, roles editoriales, servicio LaTeX y originales conservados.
- Siguiente: 5.5. Sistemas equivalentes. Tema 5 parcial.
- Pendientes las fases globales de PDF, administración central, traducción, voz y cuentas futuras.
- Se mantiene la reutilización de todos los HTML originales de programación lineal y bloques estadísticos, con carencias señaladas.

### 2026-10-09 · `feat: transformar sistemas sin cambiar sus soluciones`

- [x] Revisar guion 5.5, test T5.5 y tarjetas locales 7–8.
- [x] Desarrollar teoría, seis ejemplos y práctica guiada.
- [x] Crear taller de operaciones por filas con fracciones exactas, historial y deshacer.
- [x] Integrar seis preguntas y seis tarjetas.
- [x] Verificar matemáticas, navegador, regresión y enlaces.
- [x] Cerrar documentación de la entrega 59.

### 2026-10-09 · `test: verificar operaciones reversibles e historial`

- [x] Contrastar 10.000 transformaciones con sus inversas exactas y rangos independientes.
- [x] Comprobar 2.450 tuplas, seis casos y contraejemplos de pérdida de información.
- [x] Superar 225 pruebas acumuladas.
- [x] Recorrer operaciones, fracciones, rechazos, deshacer, reinicio y variantes.
- [x] Verificar límite numérico sin mutación y máximo de 30 pasos con recuperación.
- [x] Completar test y tarjetas, teclado, móvil 320 px/texto 200 % y preferencias.
- [x] Revisar LaTeX, recarga, índice 5/11, t05 30/30 y subcarpeta.
- [x] Superar regresión de 5.4 y revisar capturas.
- [x] Comprobar 171 HTML y cuatro documentos sin errores de enlaces, fragmentos o IDs.

### 2026-10-09 · `docs: cerrar entrega 59`

- [x] Actualizar README, procedencia, plan y docs/verificacion-entrega-59.md.
- Diseño provisional, roles editoriales, servicio LaTeX y originales conservados.
- Siguiente: 5.6. Teorema de Rouché–Frobenius. Tema 5 parcial.
- Pendientes las fases globales de PDF, administración central, traducción, voz y cuentas futuras.
- Se mantiene el criterio de reutilizar todos los HTML originales para programación lineal y bloques estadísticos, con carencias señaladas.

### 2026-10-09 · `feat: clasificar sistemas mediante Rouché–Frobenius`

- [x] Revisar guion 5.6, test T5.3–T5.4 y tarjetas locales 9–12.
- [x] Desarrollar teorema, seis ejemplos y práctica.
- [x] Crear explorador de rangos con pruebas por menores, variantes y parámetro.
- [x] Integrar seis preguntas y seis tarjetas.
- [x] Verificar matemáticas, navegador, regresión y enlaces.
- [x] Cerrar documentación de la entrega 60.

### 2026-10-10 · `test: contrastar rangos, compatibilidad y parámetros`

- [x] Contrastar 729 sistemas exhaustivos y 2.000 adicionales con eliminación independiente.
- [x] Verificar 3.000 variantes, menores certificados, rangos cero y familia con parámetro.
- [x] Superar 230 pruebas acumuladas.
- [x] Recorrer seis presets, siete muestras del parámetro, edición, validación y dimensiones.
- [x] Completar test y tarjetas, teclado, móvil 320 px/texto 200 % y preferencias.
- [x] Revisar fórmulas, recarga, índice 6/11, t05 36/36 y subcarpeta.
- [x] Superar regresión de 5.5 y revisar capturas.
- [x] Comprobar 171 HTML y cuatro documentos sin errores de enlaces, fragmentos o IDs.

### 2026-10-10 · `docs: cerrar entrega 60`

- [x] Actualizar README, procedencia, plan y docs/verificacion-entrega-60.md.
- Diseño provisional, roles editoriales, servicio LaTeX y materiales originales conservados.
- Siguiente: 5.7. Resolución de sistemas mediante matriz inversa. Tema 5 parcial.
- Pendientes las fases globales de PDF, administración central, traducción, voz y cuentas futuras.
- Se mantiene la reutilización de todos los HTML originales para programación lineal y bloques estadísticos, con carencias señaladas.

### 2026-10-10 · `feat: resolver sistemas mediante la matriz inversa`

- [x] Revisar guion 5.7, test T4.7 y tarjetas locales 13–14 del tema 5.
- [x] Desarrollar condiciones, seis ejemplos y práctica resuelta.
- [x] Crear explorador con solución exacta, comprobación y bloqueo de matrices singulares.
- [x] Integrar seis preguntas y seis tarjetas.
- [x] Verificar matemáticas, navegador, regresión y enlaces.
- [x] Cerrar documentación de la entrega 61.

### 2026-10-10 · `test: verificar inversas y soluciones exactas`

- [x] Contrastar 729 sistemas exhaustivos y 6.000 variantes con rangos independientes.
- [x] Comprobar soluciones e inversas mediante aritmética exacta, incluidos fracciones, B nulo y cambios de B.
- [x] Superar 235 pruebas acumuladas.
- [x] Recorrer seis casos, edición, validación, dimensiones, variantes y transiciones singulares sin resultados antiguos.
- [x] Completar test y tarjetas, teclado, móvil 320 px/texto 200 % y preferencias.
- [x] Revisar LaTeX, recarga, índice 7/11, t05 42/42 y subcarpeta.
- [x] Superar regresión de 5.6 y revisar capturas.
- [x] Comprobar 171 HTML y cuatro documentos sin errores de enlaces, fragmentos o IDs.

### 2026-10-10 · `docs: cerrar entrega 61`

- [x] Actualizar README, procedencia, plan y docs/verificacion-entrega-61.md.
- Diseño provisional, roles editoriales, servicio LaTeX y materiales originales conservados.
- Siguiente: 5.8. Método de Gauss. Tema 5 parcial.
- Pendientes revisión con lectores de pantalla, PDF, administración central, traducción, voz y cuentas futuras.
- Se mantiene la reutilización de todos los HTML originales para programación lineal y bloques estadísticos, con carencias señaladas.

### 2026-10-10 · `feat: resolver y clasificar sistemas mediante Gauss`

- [x] Revisar guion 5.8, test T5.5 y tarjeta local 15 del tema 5.
- [x] Desarrollar teoría, seis ejemplos y práctica resuelta.
- [x] Crear explorador por pasos con fracciones exactas, contradicciones y familias paramétricas.
- [x] Integrar seis preguntas y seis tarjetas.
- [x] Verificar matemáticas, navegador, regresión y enlaces.
- [x] Cerrar documentación de la entrega 62.

### 2026-10-10 · `test: verificar escalonamiento y familias completas`

- [x] Contrastar 729 sistemas exhaustivos y 4.000 variantes con rangos por menores independientes.
- [x] Reproducir todas las operaciones y comprobar soluciones y familias con aritmética racional exacta.
- [x] Superar 240 pruebas acumuladas.
- [x] Recorrer ocho casos, pasos, edición, recuperación, dimensiones y transiciones entre los tres tipos de sistemas.
- [x] Completar test y tarjetas, teclado, móvil 320 px/texto 200 %, contraste y resaltado.
- [x] Revisar LaTeX, recarga, índice 8/11, t05 48/48 y subcarpeta.
- [x] Superar regresión de 5.7 y revisar capturas.
- [x] Comprobar 171 HTML y cuatro documentos sin errores de enlaces, fragmentos o IDs.

### 2026-10-10 · `docs: cerrar entrega 62`

- [x] Actualizar README, procedencia, plan y docs/verificacion-entrega-62.md.
- Diseño provisional, roles editoriales, servicio LaTeX y materiales originales conservados.
- Siguiente: 5.9. Regla de Cramer. Tema 5 parcial.
- Pendientes revisión con lectores de pantalla, PDF, administración central, traducción, voz y cuentas futuras.
- Se mantiene la reutilización de todos los HTML originales para programación lineal y bloques estadísticos, con carencias señaladas.

### 2026-10-10 · `feat: resolver sistemas mediante la regla de Cramer`

- [x] Revisar guion 5.9, test T5.6 y tarjeta local 16 del tema 5.
- [x] Desarrollar condiciones, seis ejemplos, comparación de métodos y práctica.
- [x] Crear explorador de columnas sustituidas, determinantes y solución exacta.
- [x] Integrar seis preguntas y seis tarjetas.
- [x] Verificar matemáticas, navegador, regresión y enlaces.
- [x] Cerrar documentación de la entrega 63.

### 2026-10-10 · `test: contrastar Cramer y sus casos límite`

- [x] Contrastar 729 sistemas exhaustivos y 6.000 variantes con determinantes por permutaciones.
- [x] Verificar columnas sustituidas, cofactores, cocientes exactos y sustitución en todas las ecuaciones.
- [x] Comprobar numeradores cero y el contraejemplo incompatible con todos los determinantes nulos.
- [x] Superar 245 pruebas acumuladas.
- [x] Recorrer ocho casos, edición, recuperación, dimensiones, variantes y transiciones singulares.
- [x] Completar test y tarjetas, teclado, móvil 320 px/texto 200 %, contraste y resaltado.
- [x] Revisar LaTeX, recarga, índice 9/11, t05 54/54 y subcarpeta.
- [x] Superar regresión de 5.8 y revisar capturas.
- [x] Corregir enlace a 4.6 y comprobar 171 HTML y cuatro documentos sin errores de enlaces, fragmentos o IDs.

### 2026-10-10 · `docs: cerrar entrega 63`

- [x] Actualizar README, procedencia, plan y docs/verificacion-entrega-63.md.
- Diseño provisional, roles editoriales, servicio LaTeX y materiales originales conservados.
- Siguiente: 5.10. Sistemas homogéneos. Tema 5 parcial.
- Pendientes revisión con lectores de pantalla, PDF, administración central, traducción, voz y cuentas futuras.
- Se mantiene la reutilización de todos los HTML originales para programación lineal y bloques estadísticos, con carencias señaladas.

### 2026-10-11 · `feat: explorar soluciones de sistemas homogéneos`

- [x] Revisar guion 5.10, test T5.7 y tarjetas locales 17–19.
- [x] Desarrollar definición, clasificación, seis ejemplos y práctica contextual.
- [x] Crear explorador con B fijo nulo, familias exactas y selección de soluciones.
- [x] Integrar seis preguntas y seis tarjetas.
- [x] Verificar matemáticas, navegador, regresión y enlaces.
- [x] Cerrar documentación de la entrega 64.

### 2026-10-11 · `test: verificar familias de sistemas homogéneos`

- [x] Contrastar 1.539 matrices exhaustivas y 4.000 variantes con rangos independientes.
- [x] Comprobar direcciones, familias completas y soluciones elegidas con aritmética exacta.
- [x] Verificar B nulo, parámetros, casos rectangulares, matriz nula y práctica presupuestaria.
- [x] Superar 250 pruebas acumuladas.
- [x] Recorrer ocho casos, edición, recuperación, cuatro dimensiones y cambios SCD/SCI.
- [x] Completar test y tarjetas, teclado, móvil 320 px/texto 200 %, contraste y resaltado.
- [x] Mejorar encabezados de tabla ampliados y repetir el recorrido de navegador.
- [x] Revisar LaTeX, recarga, índice 10/11, t05 60/60 y subcarpeta.
- [x] Superar regresión de 5.9 y revisar capturas.
- [x] Comprobar 171 HTML y cuatro documentos sin errores de enlaces, fragmentos o IDs.

### 2026-10-11 · `docs: cerrar entrega 64`

- [x] Actualizar README, procedencia, plan y docs/verificacion-entrega-64.md.
- Diseño provisional, roles editoriales, servicio LaTeX y materiales originales conservados.
- Siguiente: 5.11. Discusión de sistemas con parámetros. Tema 5 parcial.
- Pendientes revisión con lectores de pantalla, PDF, administración central, traducción, voz y cuentas futuras.
- Se mantiene la reutilización de todos los HTML originales para programación lineal y bloques estadísticos, con carencias señaladas.

### 2026-10-11 · `feat: discutir sistemas con parámetros sin perder casos`

- [x] Revisar guion 5.11, test T5.9 y tarjetas locales 20–21.
- [x] Desarrollar procedimiento, seis discusiones resueltas y práctica contextual.
- [x] Crear explorador con particiones completas, muestras exactas y variantes equivalentes.
- [x] Integrar seis preguntas y seis tarjetas.
- [x] Verificar fórmulas, rangos, familias, navegador, regresión y enlaces.
- [x] Cerrar documentación de la entrega 65 y dejar preparado el repaso del tema 5.

### 2026-10-11 · `test: contrastar las discusiones y variantes de parámetros`

- [x] Contrastar 78 muestras y 6.000 variantes con rangos independientes y soluciones exactas.
- [x] Comprobar fórmulas y particiones con 1.722 valores racionales adicionales.
- [x] Verificar la integridad de las familias y la factibilidad contextual de la mezcla.
- [x] Superar 255 pruebas acumuladas.
- [x] Recorrer seis familias, valores críticos, cambios SCD/SCI/SI y variantes en navegador.
- [x] Completar test y tarjetas, teclado, móvil 320 px/texto 200 %, contraste y resaltado.
- [x] Evitar encabezados partidos letra a letra y repetir la revisión.
- [x] Verificar recarga, índice 11/11, bancos 66/66 y subcarpeta.
- [x] Superar regresión de 5.10 y revisar capturas.
- [x] Revisar 171 HTML y cuatro documentos: sin errores de enlaces, fragmentos ni IDs.

### 2026-10-11 · `docs: cerrar entrega 65`

- [x] Actualizar README, procedencia, plan y docs/verificacion-entrega-65.md.
- Diseño provisional, roles editoriales, servicio LaTeX y materiales originales conservados.
- Siguiente: repaso integrado y auditoría de cobertura del tema 5; después, sus videojuegos. Tema 5 sigue parcial.
- Pendientes lectores de pantalla, PDF, administración central, traducción, voz y cuentas futuras.
- Se mantiene la reutilización de todos los HTML originales para programación lineal y bloques estadísticos, con carencias señaladas.

### 2026-10-11 · `feat: integrar el repaso de sistemas`

- [x] Revisar guion 5.1–5.11, T5.1–T5.10, 22 conceptos de tarjetas y laboratorios previstos.
- [x] Desarrollar cuatro bloques de síntesis con pistas, soluciones y refuerzos.
- [x] Seleccionar once preguntas existentes, una por epígrafe, sin duplicar el banco.
- [x] Inventariar problemas y cobertura, con carencias y tareas de cierre explícitas.
- [x] Comprobar matemáticas, navegación, fórmulas, móvil y enlaces.
- [x] Cerrar la documentación de la entrega 66.

### 2026-10-11 · `fix: precisar el intercambio de ecuaciones en 5.1`

- [x] Aclarar que cambiar el orden de las ecuaciones conserva el sistema y que cada ecuación mantiene su interpretación y unidades.
- Originales preservados; corrección documentada en la auditoría.

### 2026-10-11 · `test: verificar el repaso de sistemas`

- [x] Contrastar métodos, soluciones exactas, familias, rangos y restricciones de contexto.
- [x] Enumerar independientemente los seis repartos enteros y verificar 287 parámetros racionales en las dos discusiones.
- [x] Superar 260 pruebas acumuladas y confirmar bancos sin duplicación.
- [x] Recorrer cuatro bloques, test 10/11 con corrección, reinicio, teclado y preferencias.
- [x] Revisar móvil 320 px/texto 200 %, fórmulas y capturas.
- [x] Recorrer once lecciones, retorno al repaso, índice 11/11, bancos 66/66 y subcarpeta.
- [x] Revisar 171 HTML y cinco documentos sin errores de enlaces, fragmentos ni IDs.

### 2026-10-11 · `docs: cerrar entrega 66`

- [x] Actualizar README, procedencia, auditoría, plan y verificación de la entrega.
- Siguiente: Clasificador de sistemas; después Gauss paso a paso, Elige el método y recorrido conjunto.
- El tema 5 conserva estado parcial. Siguen pendientes lectores de pantalla y pronunciación matemática.
- Diseño provisional, servicio LaTeX y ausencia de historial personal conservados.
- Continúan las fases globales de PDF, administración central, traducción, voz y cuentas futuras.
- Vigente el criterio de reutilizar todos los HTML iniciales de programación lineal y bloques estadísticos, señalando huecos y mejoras.

### 2026-10-11 · `feat: clasificar sistemas jugando`

- [x] Revisar laboratorio 5A y componentes de widgets existentes.
- [x] Generar doce retos por sesión con ecuaciones, matrices, rectas y rangos.
- [x] Añadir clasificación, pistas, dos intentos, explicación y resumen.
- [x] Integrar el widget independiente y su página anfitriona.
- [x] Verificar generación, puntuación, gráficos, fórmulas, teclado y móvil.
- [x] Cerrar documentación de la entrega 67.

### 2026-10-11 · `test: verificar el clasificador de sistemas`

- [x] Contrastar 1.000 sesiones y 12.000 retos mediante rangos independientes.
- [x] Verificar rectas verticales/horizontales, coincidencia, paralelismo y recorte de trazos.
- [x] Comprobar rangos cero, matrices rectangulares, filas nulas y contradicciones.
- [x] Verificar pistas, reintentos, puntuación 1050/1200, bloqueo y reinicio.
- [x] Superar 265 pruebas acumuladas.
- [x] Recorrer dos sesiones y cuatro representaciones en móvil 320 px/texto 200 %, con teclado y fórmulas.
- [x] Revisar capturas, preferencias, recarga e inserción en raíz/subcarpeta.
- [x] Confirmar bancos 66/66 y globales 318/301, sin duplicación.

### 2026-10-11 · `docs: cerrar entrega 67`

- [x] Actualizar README, procedencia, auditoría, plan y verificación.
- Siguiente: Gauss paso a paso (5B); después Elige el método y recorrido conjunto.
- Tema 5 parcial por las tareas restantes y accesibilidad global.
- Diseño provisional, fórmulas locales, originales y ausencia de historial personal conservados.
- Vigente el criterio de reutilización de HTML para programación lineal y bloques estadísticos.

### 2026-10-11 · `feat: resolver sistemas con Gauss paso a paso`

- [x] Revisar laboratorio 5B y taller de operaciones equivalentes.
- [x] Desarrollar seis retos, operaciones exactas y aceptación de rutas alternativas.
- [x] Añadir historial, deshacer, pistas, asistencia y clasificación final.
- [x] Integrar widget y enlaces de refuerzo.
- [x] Verificar equivalencia, soluciones, puntuación, navegador y lectura móvil.
- [x] Cerrar documentación de la entrega 68.


### 2026-10-11 · `test: verificar Gauss paso a paso`

- [x] Contrastar 1.000 sesiones y 6.000 sistemas mediante rangos independientes y operaciones inversas.
- [x] Comprobar exactamente las soluciones y familias, rutas alternativas y pivotes no unitarios.
- [x] Verificar límites, entradas inválidas, deshacer, reinicio, pistas y asistencia persistente.
- [x] Superar 271 pruebas acumuladas.
- [x] Recorrer sesiones de 350/600 puntos y seis casos en móvil 320 px/texto 200 %.
- [x] Revisar capturas, fórmulas, preferencias, recarga e inserción en raíz/subcarpeta.
- [x] Confirmar bancos 66/66 y globales 318/301, sin duplicación.

### 2026-10-11 · `docs: cerrar entrega 68`

- [x] Actualizar README, procedencia, auditoría, plan y verificación.
- Siguiente: Elige el método (5C), seguido del recorrido conjunto.
- Tema 5 parcial por las tareas restantes y accesibilidad global.
- Diseño provisional, fórmulas locales, originales y ausencia de historial personal conservados.
- Vigente el criterio de reutilización de HTML para programación lineal y bloques estadísticos.


### 2026-10-11 · `feat: elegir estrategias para resolver sistemas`

- [x] Revisar el laboratorio 5C y los componentes compartidos.
- [x] Desarrollar seis familias variables y estrategias con justificación.
- [x] Aceptar alternativas válidas y explicar condiciones y eficiencia.
- [x] Integrar widget, refuerzos y enlaces del tema.
- [x] Verificar matemáticas, puntuación, LaTeX, móvil e inserción.
- [x] Cerrar documentación de la entrega 69.


### 2026-10-11 · `test: verificar la elección de métodos`

- [x] Contrastar 1.000 sesiones y 6.000 situaciones: determinantes, soluciones, familias y parámetros.
- [x] Comprobar alternativas válidas, puntuación, reintentos, pistas y bloqueo.
- [x] Superar 277 pruebas acumuladas.
- [x] Recorrer dos sesiones de 450/600 y 600/600 puntos con teclado y explicaciones.
- [x] Revisar seis casos en móvil a 320 px/texto 200 %, contraste, resaltado y fórmulas.
- [x] Verificar preferencias, recarga, iframe, altura, raíz/subcarpeta y retorno al repaso.
- [x] Revisar capturas y enlaces de 171 HTML y cinco documentos.
- [x] Conservar los bancos 66/66 del tema y 318/301 del curso.

### 2026-10-11 · `docs: cerrar entrega 69`

- [x] Actualizar README, procedencia, auditoría, plan y verificación.
- Siguiente: recorrido conjunto de los tres juegos del tema 5 con refuerzos.
- Tema 5 parcial por ese recorrido y accesibilidad global.
- Diseño provisional, fórmulas locales, originales y ausencia de historial personal conservados.
- Continúan las fases de PDF, administración central, traducción, voz y cuentas futuras.
- Vigente la reutilización de todos los HTML originales de programación lineal y bloques estadísticos, señalando huecos y mejoras.


### 2026-10-11 · `feat: conectar la práctica de sistemas`

- [x] Revisar juegos, contenidos previos y recorridos de otros temas.
- [x] Añadir ruta de clasificación, operaciones y elección de estrategias.
- [x] Enlazar lecciones, juegos, refuerzos y repaso con navegación coherente.
- [x] Verificar el recorrido, preferencias, LaTeX, móvil y subcarpeta.
- [x] Actualizar auditoría, fuentes, verificación y siguiente paso.


### 2026-10-11 · `test: recorrer el tema de sistemas`

- [x] Recorrer once lecciones, corregir una respuesta por lección y conservar la selección al ampliar.
- [x] Completar el test 66/66 y mostrar las respuestas de las 66 tarjetas.
- [x] Acceder por teclado a los tres juegos y comprobar una respuesta puntuada en cada uno.
- [x] Mantener selección y matriz al propagar preferencias de lectura.
- [x] Verificar widgets independientes, retornos y cadena anterior/siguiente en subcarpeta.
- [x] Revisar móvil 320 px/texto 200 %, capturas, fórmulas y 171 HTML sin enlaces rotos.
- [x] Ajustar la espera del comprobador a la inicialización y carga matemática; recorrido completo aprobado.
- La última batería matemática/de estado permanece en 277 pruebas superadas en la entrega 69. Esta entrega verifica integración sin modificar modelos ni bancos.

### 2026-10-11 · `docs: cerrar entrega 70`

- [x] Actualizar README, auditoría, procedencia, plan y verificación.
- Siguiente: integrar presentación e inecuaciones de programación lineal desde los HTML originales.
- Conservar todo el material válido y documentar correcciones, dependencias y carencias; no rellenar huecos ni cuotas.
- Tema 5 parcial por la revisión global con lectores de pantalla y pronunciación matemática.
- Diseño provisional, motor LaTeX, originales y ausencia de historial personal conservados.
- Continúan biblioteca PDF, administración central, traducción, voz y cuentas futuras.


### 2026-10-11 · `feat: reutilizar presentación e inecuaciones de programación lineal`

- [x] Leer completos los dos HTML fuente y confirmar que Presentación e Inicio son idénticos.
- [x] Identificar correcciones: hipótesis de recta, punto fuera de frontera y gráfico del semiplano.
- [x] Integrar el itinerario y 6.1 con fórmulas, navegación y descripción del gráfico.
- [x] Documentar por bloque lo reutilizado, lo corregido y las carencias sin inventar actividades.
- [x] Verificar contenido, geometría, LaTeX, lectura móvil y enlaces.
- [x] Cerrar la entrega 71 y registrar el siguiente HTML fuente.


### 2026-10-11 · `fix: corregir frontera y punto de prueba de la fuente`

- [x] Precisar que a y b no pueden ser ambos cero para representar una recta.
- [x] Exigir un punto de prueba fuera de la frontera.
- [x] Corregir el gráfico de x+2y≤10 conservando el ejemplo, sus interceptos y el lado del origen.
- [x] Explicar que el marco de la vista no acota el semiplano.
- [x] Mantener descripción textual, muestras de borde y roles editoriales para el futuro diseño.

### 2026-10-11 · `test: verificar la primera migración de programación lineal`

- [x] Confirmar igualdad entre Presentación e Inicio y preservar los tres archivos por SHA-256.
- [x] Verificar coordenadas de frontera, interceptos y 66 puntos del relleno.
- [x] Revisar fórmulas locales, sin errores ni solicitudes HTTP externas.
- [x] Comprobar índice parcial, retorno al tema, conexiones y regresión del índice de sistemas.
- [x] Verificar teclado, móvil 320 px/texto 200 %, contraste, resaltado y subcarpeta.
- [x] Inspeccionar capturas y 171 HTML/seis documentos sin enlaces rotos.
- No se cambian los modelos matemáticos existentes; la última batería acumulada de 277 pruebas corresponde a la entrega 69.

### 2026-10-11 · `docs: cerrar entrega 71`

- [x] Registrar correspondencia por archivo y bloque, correcciones y carencias.
- [x] Actualizar README, criterio de reutilización, procedencia, plan y verificación.
- Siguiente: leer completo 2. Sistemas de inecuaciones.txt, revisar los casos límite e integrar 6.2.
- 6.1 y el tema 6 conservan estado parcial; no se crean preguntas, tarjetas ni juegos ausentes en esta fuente.
- Se mantienen diseño provisional, servicio LaTeX, originales y ausencia de historial personal.
- Siguen pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.


### 2026-10-12 · `feat: reutilizar sistemas de inecuaciones originales`

- [x] Leer íntegro el HTML fuente y revisar el ejemplo y las afirmaciones sobre óptimos.
- [x] Integrar 6.2 con región común, vértices y tipos de región.
- [x] Corregir escala/fronteras del SVG y precisar hipótesis de existencia de extremos.
- [x] Registrar carencias sin crear actividades ausentes en la fuente.
- [x] Verificar restricciones, geometría, LaTeX, navegación, móvil y fuentes intactas.
- [x] Cerrar documentación de la entrega 72.


### 2026-10-12 · `fix: precisar la región factible y los óptimos`

- [x] Corregir la escala para situar x=40 y la esquina (40,20).
- [x] Usar bordes continuos porque todas las restricciones incluyen la igualdad.
- [x] Verificar los cuatro vértices y excluir el cruce no factible (60,0).
- [x] Precisar función lineal, región cerrada, acotada y no vacía para garantizar extremos.
- [x] Señalar que el óptimo puede no ser único y que aún no hay función objetivo en este ejemplo.
- [x] Mantener vacíos los apartados interactivos ausentes y registrar las mejoras pendientes.

### 2026-10-12 · `test: verificar sistemas de inecuaciones reutilizados`

- [x] Confirmar integridad de cuatro originales por SHA-256.
- [x] Contrastar intersecciones, factibilidad y 286 combinaciones del relleno.
- [x] Revisar LaTeX local, teclado, desplegables, preferencias y navegación en subcarpeta.
- [x] Comprobar móvil a 320 px/texto 200 % e inspeccionar capturas.
- [x] Superar la regresión de 6.1 y conservar los estados de los otros temas.
- [x] Revisar 171 HTML y seis documentos sin enlaces rotos.
- No se modifican generadores ni motores de corrección; la última batería acumulada sigue siendo la de 277 pruebas de la entrega 69.

### 2026-10-12 · `docs: cerrar entrega 72`

- [x] Actualizar correspondencia por bloque, correcciones, carencias y hash de la fuente.
- [x] Actualizar README, criterio de reutilización, procedencia, plan y verificación.
- Siguiente: lectura íntegra de 3. Programación Lineal.txt, revisión de la no negatividad e integración de 6.3.
- Tema 6 y 6.1–6.2 parciales: no se inventan tests, tarjetas o exploradores ausentes.
- Se mantienen diseño provisional, originales, servicio LaTeX y ausencia de historial personal.
- Continúan accesibilidad global, biblioteca PDF, administración central, traducción, voz y cuentas futuras.


### 2026-10-12 · `feat: reutilizar la anatomía de programación lineal`

- [x] Leer íntegro el HTML fuente e identificar la afirmación de no negatividad que requiere corrección.
- [x] Integrar variables, objetivo, restricciones y diagrama en 6.3.
- [x] Precisar cuándo procede la no negatividad sin crear problemas o actividades ausentes.
- [x] Registrar correspondencia, correcciones y carencias.
- [x] Verificar fuentes intactas, fórmulas, navegación, lectura móvil y regresiones de 6.1–6.2.
- [x] Cerrar la entrega 73 y actualizar el siguiente archivo.


### 2026-10-12 · `fix: justificar la no negatividad según las variables`

- [x] Corregir la obligación universal de añadir x≥0 e y≥0.
- [x] Mantener la no negatividad para las cantidades de sillas/mesas de la fuente.
- [x] Precisar que el primer cuadrante incluye los ejes en ese caso.
- [x] Conservar el esquema de restricciones sin inventar coeficientes ni recursos.
- [x] Mantener el flujo original con descripción equivalente y disposición legible.

### 2026-10-12 · `test: verificar la estructura del modelo original`

- [x] Comprobar integridad de cinco archivos originales mediante SHA-256.
- [x] Revisar las tres piezas, el diagrama, las fórmulas y la ausencia de cargas HTTP externas.
- [x] Verificar navegación anterior/siguiente, índice parcial, teclado y subcarpeta.
- [x] Comprobar texto al 200 %, contraste, resaltado y móvil de 320 px.
- [x] Inspeccionar capturas y superar las regresiones de 6.1 y 6.2.
- [x] Revisar 171 HTML y seis documentos sin enlaces rotos.
- Los modelos existentes no cambian; la última suite acumulada permanece en 277 pruebas superadas en la entrega 69.

### 2026-10-12 · `docs: cerrar entrega 73`

- [x] Actualizar correspondencia por bloque, corrección M10, carencias y hash.
- [x] Actualizar README, criterio de reutilización, procedencia, plan y verificación.
- Siguiente: lectura completa de 4. El método gráfico.txt, revisión de condiciones y adaptación de 6.4.
- 6.1–6.3 y tema 6 parciales; actividades ausentes sin completar artificialmente.
- Diseño provisional, originales, motor LaTeX y ausencia de historial personal conservados.
- Continúan accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-12 · `feat: reutilizar el método gráfico original`

- [x] Leer el HTML completo y detectar los vértices y óptimos incompatibles con el enunciado.
- [x] Integrar 6.4 conservando recursos, beneficios y las dos variantes originales.
- [x] Corregir región factible, tablas y conclusión; documentar la procedencia.
- [x] Verificar cálculos, integridad, LaTeX, navegación, móvil y subcarpeta.
- [x] Cerrar documentación de la entrega 74.

### 2026-10-12 · `fix: corregir factibilidad y óptimos de sillas y mesas`

- [x] Conservar 18 h de corte, 42 h de montaje y beneficios originales 30/50 y 40/50 €.
- [x] Sustituir el cuadrilátero inviable por el triángulo (0,0), (9,0), (0,9).
- [x] Justificar la redundancia de montaje y descartar (3,12), (0,14) y el cruce de recursos fuera del dominio.
- [x] Corregir ambas tablas: máximo único de 450 € con 9 mesas.
- [x] Mejorar el ancho de las tablas para lectura ampliada con desplazamiento por teclado.
- [x] Mantener el diseño provisional, MathJax compartido y carencias señaladas.

### 2026-10-12 · `test: verificar el método gráfico reutilizado`

- [x] Confirmar integridad de seis fuentes mediante SHA-256.
- [x] Calcular intersecciones independientemente, comprobar 55 puntos enteros y 4.186 fraccionarios por objetivo.
- [x] Contrastar las tablas, coordenadas y rectas del SVG con el sistema original.
- [x] Comprobar LaTeX local, recarga, preferencias y ausencia de peticiones HTTP externas.
- [x] Recorrer navegación, teclado, desplegable, móvil 320 px/texto 200 % y subcarpeta.
- [x] Inspeccionar capturas; repetir la prueba específica tras ajustar la legibilidad de tablas.
- [x] Superar regresiones de 6.1, 6.2 y 6.3; revisar 171 HTML y seis Markdown sin incidencias.
- La batería acumulada de modelos sigue siendo la de 277 pruebas de la entrega 69; los modelos no se modifican.

### 2026-10-12 · `docs: cerrar entrega 74`

- [x] Registrar correspondencia completa, correcciones matemáticas, carencias y hash.
- [x] Actualizar README, procedencia, criterio de reutilización, auditoría, verificación y plan.
- Siguiente: lectura íntegra de 5. Ejercicios Resueltos.txt; revisar seis ejercicios y GeoGebra antes de integrar 6.5.
- 6.1–6.4 y el tema 6 conservan estado parcial. Actividades ausentes sin rellenar artificialmente.
- Continúan pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-12 · `feat: reutilizar los seis problemas originales`

- [x] Leer íntegro el HTML y revisar enunciados, pasos, soluciones y dependencias.
- [x] Integrar los seis ejercicios conservando datos y selector.
- [x] Integrar GeoGebra con carga explícita, estados y recuperación de fallos.
- [x] Verificar los seis modelos, LaTeX, navegación, teclado y móvil.
- [x] Documentar las correcciones, carencias y cierre de la entrega 75.

### 2026-10-13 · `fix: revisar los seis problemas y recuperar el laboratorio`

- [x] Corregir escapes LaTeX y conservar las seis soluciones finales originales.
- [x] Usar D=(800/3,50) y coste exacto de 39.500 € en drones; justificar la redundancia de calidad.
- [x] Identificar A como mínimo en minerales y aclarar dominio/cuatro lados en refinería.
- [x] Conservar el selector con seis ejercicios, soluciones desplegables y vista conjunta.
- [x] Cargar GeoGebra a petición en documento aislado, con cierre, límite de espera y reintento.
- [x] Verificar el servicio real: acepta la inecuación original del laboratorio.

### 2026-10-13 · `test: verificar problemas, selector y recuperación de GeoGebra`

- [x] Comprobar siete fuentes intactas por SHA-256.
- [x] Contrastar seis modelos con aritmética exacta, vértices y objetivos; 630 muestras fraccionarias y casos enteros.
- [x] Comprobar seis ejercicios y 23 pasos, LaTeX, cambios rápidos, enlaces directos y subcarpeta.
- [x] Verificar teclado, tablas desplazables, móvil 320 px/texto 200 % y preferencias tras recargar.
- [x] Corregir la prueba que cerraba una solución abierta al volver mediante su fragmento.
- [x] Superar fallos simulados, reintento, cierre y espera máxima del laboratorio.
- [x] Superar regresión de 6.4 con cinco lecciones parciales.
- [x] Completar revisión de enlaces y cerrar la documentación.

### 2026-10-13 · `docs: cerrar entrega 75`

- [x] Revisar 172 HTML y seis Markdown sin enlaces rotos, fragmentos ausentes ni IDs duplicados.
- [x] Documentar correspondencia completa, correcciones, integridad y límites de GeoGebra.
- [x] Inspeccionar capturas de resolución, móvil y laboratorio real.
- [x] Actualizar README, procedencia, criterio, auditoría, verificación y plan.
- Siguiente: leer y verificar 6. Flashcards.txt e integrar el mazo original.
- 6.1–6.5 y tema 6 permanecen parciales. No se inventan preguntas ni actividades ausentes.
- Continúan pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-13 · `feat: reutilizar las flashcards originales de programación lineal`

- [x] Leer el HTML completo: 19 tarjetas y cinco categorías.
- [x] Revisar una a una las respuestas y conservar su correspondencia con el original.
- [x] Integrar el banco y los filtros en el motor común, sin persistencia personal.
- [x] Verificar todas las tarjetas, categorías, LaTeX, teclado, móvil y regresión de otros temas.
- [x] Registrar correcciones, carencias y cierre de la entrega 76.

### 2026-10-13 · `fix: precisar las respuestas del mazo original`

- [x] Corregir «el doble» a igualdad y explicitar el significado de las variables en traducciones.
- [x] Precisar no negatividad, región, rectas verticales, punto de prueba y vértices factibles.
- [x] Corregir hipótesis de extremos, no acotación, paralelismo e integridad de soluciones.
- [x] Mantener las 19 tarjetas y cinco categorías, sin añadir contenido para alcanzar cuotas.
- [x] Separar el visor en un módulo común con cola LaTeX y controles de teclado.

### 2026-10-13 · `test: recorrer las 19 tarjetas originales y conservar los mazos anteriores`

- [x] Verificar ocho fuentes intactas, correspondencia de categorías/posición y 320 IDs únicos.
- [x] Recorrer preguntas/respuestas, filtros, cambios rápidos y navegación en raíz/subcarpeta.
- [x] Verificar LaTeX, teclado, móvil 320 px/texto 200 %, contraste y resaltado.
- [x] Comprobar que recargar reinicia el mazo sin borrar las preferencias de lectura.
- [x] Superar regresión de los cinco temas anteriores, banco global y mazo de lección.
- [x] Superar tres pruebas existentes de catálogo y generadores, con 1.000 semillas.
- [x] Inspeccionar capturas y revisar 172 HTML y seis Markdown sin incidencias.

### 2026-10-13 · `docs: cerrar entrega 76`

- [x] Documentar correspondencia uno a uno, correcciones, integridad y carencias.
- [x] Actualizar README, procedencia, criterio, auditoría, verificación y plan.
- Siguiente: leer 0. Presentación.txt de Estadística Bidimensional e integrar lo existente, señalando los huecos.
- Los siete originales de programación lineal están integrados; tema 6 y sus cinco lecciones mantienen estado parcial.
- Continúan pendientes actividades ausentes, juegos de programación lineal, accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-13 · `feat: reutilizar la presentación de estadística bidimensional`

- [x] Leer íntegro el HTML fuente y comprobar la tabla de 43 alumnos.
- [x] Integrar repaso, esquema dimensional, pares y tabla con marginales.
- [x] Precisar la categoría Aprobado y documentar las carencias sin añadir actividades.
- [x] Verificar datos, fórmulas, gráficos, teclado, móvil y navegación.
- [x] Cerrar documentación de la entrega 77.

### 2026-10-13 · `fix: precisar categorías y total del grupo observado`

- [x] Conservar las doce frecuencias y los marginales del original, sin añadir la fila ausente.
- [x] Diferenciar categoría Aprobado (5–6) de superar una asignatura; comprobar 30/32/27.
- [x] Identificar N como total del grupo, sin afirmar población completa o muestra.
- [x] Preservar los puntos/centros del SVG y explicar que son esquemas independientes.
- [x] Registrar fórmulas ausentes, límites para notas decimales y actividades pendientes.

### 2026-10-13 · `test: verificar la presentación bidimensional reutilizada`

- [x] Confirmar nueve fuentes originales intactas por SHA-256.
- [x] Recalcular filas, columnas, total 43, recuentos de aprobados y centros del esquema.
- [x] Verificar MathJax local, tabla con encabezados, teclado, móvil y preferencias.
- [x] Ajustar el ancho de tabla tras inspección visual; repetir la prueba específica.
- [x] Comprobar navegación libro/apoyo/tema 6 en raíz y subcarpeta.
- [x] Inspeccionar capturas y revisar 172 HTML y siete Markdown sin incidencias.
- No se modifican generadores ni motores; bancos y juegos conservados.

### 2026-10-13 · `docs: cerrar entrega 77`

- [x] Guardar auditoría por bloque, procedencia, datos preservados y carencias.
- [x] Actualizar README, criterio, verificación y plan; marcar integrado el bloque fuente de programación lineal.
- Siguiente: leer 1. La variable bidimensional.txt y conciliar sus contenidos con la presentación para evitar duplicaciones.
- El apoyo continúa parcial; siete fuentes de estadística pendientes de revisión completa.
- Continúan pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-13 · `feat: reutilizar la variable bidimensional y sus marginales`

- [x] Leer íntegro el HTML original y recalcular el ejemplo de 50 familias.
- [x] Integrar serie simple, tabla, marginales y medias sin duplicar la definición.
- [x] Precisar el umbral orientativo y actualizar las carencias.
- [x] Verificar fuentes, tablas, fórmulas, lectura ampliada y navegación.
- [x] Cerrar la documentación de la entrega 78.

### 2026-10-13 · `fix/test/docs: cerrar entrega 78`

- [x] Precisar N<20 como orientación y distinguir los tres conjuntos de datos.
- [x] Comprobar diez fuentes intactas, cinco pares, frecuencias y medias 2/1,22.
- [x] Superar regresión de presentación, LaTeX, teclado, móvil, preferencias y subcarpeta.
- [x] Inspeccionar capturas y revisar 172 HTML y siete Markdown sin incidencias.
- Siguiente: La nube de puntos. Bancos y motores conservados.

### 2026-10-13 · `feat: reutilizar la nube de puntos`

- [x] Leer el original completo y revisar los cinco diagramas.
- [x] Integrar diagramas, interpretación y centro de gravedad.
- [x] Corregir la curva ilustrativa y las afirmaciones sobre correlación.
- [x] Verificar geometría, LaTeX, lectura ampliada y navegación.
- [x] Cerrar documentación de la entrega 79.

### 2026-10-13 · `fix: corregir la interpretación de los diagramas originales`

- [x] Unir los siete puntos funcionales con una guía que pasa por todos ellos.
- [x] Distinguir tendencia de regla exacta, ausencia de tendencia lineal de independencia y asociación de causalidad.
- [x] Explicar los signos respecto al centro y por qué contar puntos por zonas no decide la correlación.
- [x] Separar estilos y selectores de diagramas de los SVG internos de MathJax.

### 2026-10-13 · `test/docs: cerrar entrega 79`

- [x] Confirmar once fuentes intactas y todos los puntos de los cinco dibujos.
- [x] Recalcular centro (100,90), verificar guía funcional y signos de tendencias.
- [x] Superar regresión de tablas/marginales, LaTeX, teclado, móvil y navegación raíz/subcarpeta.
- [x] Inspeccionar tres capturas y revisar 172 HTML y siete Markdown sin incidencias.
- [x] Actualizar procedencia, auditoría, criterio, README, verificación y plan.
- Siguiente: leer e integrar 3. La covarianza.txt.
- El apoyo sigue parcial; quedan cinco fuentes del bloque por revisar. Bancos y juegos conservados.
- Continúan pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-13 · `feat: reutilizar la covarianza`

- [x] Leer íntegro el HTML original y revisar fórmula, signos y cambio de unidades.
- [x] Integrar definición, fórmula, esquema de signos, interpretación y limitación.
- [x] Corregir escala 0,15→15 y precisar el significado de cero/cercanía a cero.
- [x] Verificar matemáticas, LaTeX, móvil y regresión del apoyo.
- [x] Cerrar documentación de la entrega 80.

### 2026-10-13 · `fix: precisar covarianza y escala de unidades`

- [x] Corregir 0,15→1500 a 0,15→15 cuando solo la altura pasa de m a cm.
- [x] Explicitar divisor N y suma de observaciones, incluidas repeticiones.
- [x] Explicar signos por desviaciones, no por cambios temporales ni número de puntos.
- [x] Separar covarianza nula de valor pequeño y precisar el caso de variable constante.
- [x] Usar signos y texto equivalente sin dependencia del color; rotular ambas medias.

### 2026-10-13 · `test/docs: cerrar entrega 80`

- [x] Confirmar doce fuentes originales intactas por SHA-256.
- [x] Comprobar identidad de fórmulas, signos, casos nulos y escala de unidades.
- [x] Verificar cuatro fórmulas LaTeX y el esquema, más regresión de tablas y diagramas.
- [x] Superar raíz/subcarpeta, lectura móvil al 200 %, contraste, teclado y preferencias.
- [x] Corregir una espera de la prueba de navegación tras fallos intermitentes del desplegable.
- [x] Inspeccionar cuatro capturas y revisar 172 HTML y siete Markdown sin incidencias.
- [x] Actualizar README, criterio, procedencia, auditoría, verificación y plan.
- Siguiente: leer 4. Coeficiente de correlación de Pearson.txt.
- Apoyo parcial; quedan cuatro fuentes del bloque por revisar. No se crean ejercicios ausentes ni se modifican bancos.
- Continúan pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-13 · `feat: reutilizar el coeficiente de Pearson`

- [x] Leer el HTML completo y revisar fórmula, escala y ejemplos.
- [x] Integrar normalización, interpretación, escala y causalidad.
- [x] Precisar requisitos, intensidad lineal y ausencia de datos del ejemplo causal.
- [x] Verificar matemáticas, LaTeX, lectura y navegación del apoyo.
- [x] Cerrar documentación de la entrega 81.

### 2026-10-13 · `fix: precisar alcance y requisitos de Pearson`

- [x] Exigir desviaciones típicas positivas y convención coherente con la covarianza.
- [x] Distinguir intensidad por valor absoluto y sentido por signo.
- [x] Precisar cero, extremos ±1 y caso de variable constante.
- [x] Conservar -0,95/0,12/0,85 sin deducir una forma única de nube.
- [x] Retirar umbrales visuales no justificados y dejar causalidad como ejemplo hipotético sin coeficiente empírico.
- [x] Mantener etiquetas completas de escala y lectura independiente del color.

### 2026-10-13 · `test/docs: cerrar entrega 81`

- [x] Confirmar trece originales intactos y conservación de los tres valores ilustrativos.
- [x] Contrastar extremos, cero no lineal, casos indefinidos y cambios de escala/traslación/signo.
- [x] Verificar LaTeX, escala y regresión de todas las secciones anteriores del apoyo.
- [x] Comprobar navegación raíz/subcarpeta, teclado, preferencias y móvil al 200 %.
- [x] Inspeccionar cuatro capturas y revisar 172 HTML y siete Markdown sin incidencias.
- [x] Actualizar README, procedencia, auditoría, criterio, verificación y plan.
- Siguiente: leer e integrar 5. Regresión lineal.txt, revisando también su laboratorio.
- Apoyo parcial; quedan tres fuentes del bloque. No se crean ejercicios ausentes ni se modifican bancos.
- Continúan pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-13 · `feat: reutilizar regresión lineal y predicción`

- [x] Leer el original completo; identificar laboratorio estático y errores de gráfico/R².
- [x] Integrar mínimos cuadrados, recta, predicción guiada y determinación.
- [x] Corregir geometría y límites de interpretación sin inventar datos ni controles.
- [x] Verificar cálculos, SVG, LaTeX, móvil y regresión del apoyo.
- [x] Cerrar documentación de la entrega 82.

### 2026-10-13 · `fix: corregir ajuste y significado de R²`

- [x] Conservar los cuatro puntos y recalcular centro, recta y residuos verticales.
- [x] Precisar varianza de X positiva y separar estimación de observación.
- [x] Conservar las dos formas de la recta y el resultado 7,6; no afirmar interpolación sin rango.
- [x] Corregir «72 % de predicción fiable» a 72,25 % de variación recogida por el ajuste.
- [x] Explicitar condiciones de R²=r² y separar los tres ejemplos sin datos compartidos.

### 2026-10-13 · `test/docs: cerrar entrega 82`

- [x] Confirmar catorce fuentes originales intactas por SHA-256.
- [x] Verificar centro, pendiente, residuos y condiciones de mínimos cuadrados.
- [x] Comprobar variables constantes, predicción 7,6 y R²=0,7225.
- [x] Superar lectura LaTeX, navegación raíz/subcarpeta, teclado, preferencias y móvil al 200 %.
- [x] Inspeccionar cuatro capturas y revisar 172 HTML y siete Markdown sin incidencias.
- [x] Actualizar README, criterio, procedencia, auditoría, verificación y plan.
- Siguiente: leer e integrar 6. Ejercicios resueltos.txt.
- Apoyo parcial; quedan ejercicios y flashcards originales. Laboratorio de predicción conservado como ejemplo estático; controles y datos ausentes quedan pendientes.
- Continúan pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-14 · `feat: reutilizar los nueve ejercicios de estadística`

- [x] Leer los nueve ejercicios y sus 32 pasos del original.
- [x] Conservar enunciados y datos; integrar selector y soluciones desplegables.
- [x] Corregir suma de productos, índices, redondeo e interpretaciones.
- [x] Verificar cálculos independientes, fórmulas, selección, teclado y móvil.
- [x] Cerrar documentación de la entrega 83.

### 2026-10-14 · `fix: revisar cálculos e interpretación de los nueve ejercicios`

- [x] Corregir índices de marginales y frecuencias condicionadas.
- [x] Recalcular productos, covarianza y Pearson del ejercicio de notas.
- [x] Mantener unidades, coeficientes y resultados válidos de los otros ocho problemas.
- [x] Precisar R², causalidad, comparación de rectas, fracciones exactas y factores no nulos.
- [x] Distinguir valores representativos de observaciones individuales y agrupación de independencia.
- [x] Retirar intensidad y decisiones comerciales no justificadas por la covarianza.

### 2026-10-14 · `test/docs: cerrar entrega 83`

- [x] Confirmar quince fuentes originales intactas, nueve IDs y 32 pasos.
- [x] Contrastar tablas, pares, parámetros, sistemas, cambios de escala y resultados.
- [x] Recorrer los nueve ejercicios, todas las soluciones, selección individual/todos y cambios rápidos.
- [x] Verificar enlaces directos, teclado, LaTeX, raíz/subcarpeta y lectura móvil al 200 %.
- [x] Comprobar acceso sin JavaScript y ausencia de persistencia de selección.
- [x] Inspeccionar cinco capturas y revisar 172 HTML y siete Markdown sin incidencias.
- [x] Actualizar README, criterio, procedencia, auditoría, verificación y plan.
- Siguiente: leer e integrar 7. Flashcards.txt.
- Apoyo parcial; no se inventan actividades ausentes. Bancos de test, tarjetas y juegos conservados.
- Continúan pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-14 · `feat: integrar las 20 flashcards de estadística`

- [x] Leer las 20 tarjetas y conservar sus cuatro categorías y correspondencia original.
- [x] Revisar covarianza, Pearson, residuos, R² y coeficientes de regresión.
- [x] Integrar el banco en el visor común y enlazarlo desde el apoyo.
- [x] Verificar las 20 respuestas, filtros, LaTeX, teclado, móvil y navegación.
- [x] Documentar correcciones y cerrar la entrega 84.


### 2026-10-14 · `fix: precisar covarianza, residuos y R² en las tarjetas`

- [x] Corregir covarianza próxima a cero y requisitos de Pearson.
- [x] Distinguir residuos con signo y suma de cuadrados.
- [x] Sustituir fiabilidad predictiva por variación observada recogida por el ajuste.
- [x] Precisar hipótesis y orientaciones del producto de coeficientes.

### 2026-10-14 · `test/docs: cerrar entrega 84`

- [x] Confirmar dieciséis fuentes intactas por SHA-256 y veinte correspondencias.
- [x] Verificar texto y fórmulas de las cuarenta caras en raíz y subcarpeta.
- [x] Comprobar cuatro categorías, teclado, cambios rápidos y recarga sin progreso guardado.
- [x] Comprobar lectura móvil al 200 %, contraste, resaltado y tres capturas.
- [x] Verificar los seis mazos anteriores, mazo global y una lección con test.
- [x] Superar las tres pruebas comunes de generadores, cobertura e integridad.
- [x] Revisar 172 HTML y siete Markdown sin enlaces rotos ni IDs duplicados.
- [x] Actualizar README, criterio, procedencia, auditoría, informe y plan.
- Total actual: 340 tarjetas, 318 preguntas y dieciséis juegos.
- Ocho originales bidimensionales integrados; apoyo parcial por sus carencias documentadas.
- Siguiente: revisar la presentación original de Distribuciones y su correspondencia con el tema 8.
- Continúan pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-14 · `feat: integrar la presentación de Distribuciones`

- [x] Leer el HTML completo e identificar sus cinco bloques y cinco objetivos.
- [x] Adaptar el itinerario de la unidad 4 original al tema 8.
- [x] Precisar discreta/continua, Bernoulli, notación normal y aproximación.
- [x] Mantener las cuatro lecciones en preparación y marcar solo el índice como parcial.
- [x] Verificar navegación, fórmulas, lectura y conservación de estados.
- [x] Cerrar procedencia, auditoría y verificación de la entrega 85.

### 2026-10-14 · `fix: precisar supuestos y notación de los modelos`

- [x] Tratar contar/medir como orientación y precisar discreta/continua.
- [x] Añadir probabilidad constante y número fijo de ensayos al resumen binomial.
- [x] Explicitar que σ es desviación típica, positiva, en la convención conservada.
- [x] Precisar que n grande no basta para aproximar y usar «corrección de continuidad».
- [x] Mantener ejercicios y tarjetas como espacios pendientes sin anunciar actividades disponibles.

### 2026-10-14 · `test/docs: cerrar entrega 85`

- [x] Confirmar fuente intacta y cinco bloques/cinco objetivos.
- [x] Verificar LaTeX, enlaces raíz/subcarpeta, teclado y lectura móvil al 200 %.
- [x] Comprobar conservación de preferencias, estados, bancos y lectura sin JavaScript.
- [x] Inspeccionar dos capturas y revisar 172 HTML y seis Markdown sin incidencias.
- [x] Actualizar procedencia, auditoría de Distribuciones, criterio, README y verificación.
- [x] Conciliar el seguimiento de estadística bidimensional: sus ocho originales quedaron integrados en la entrega 84.
- Índice del tema 8 parcial; cuatro lecciones y seis fuentes originales todavía pendientes.
- Siguiente: revisar e integrar 1. Variable aleatoria.txt.
- Continúan pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-14 · `feat: integrar variable aleatoria y el ejemplo del dado`

- [x] Leer el original y conservar definición, distribución, parámetros y dado.
- [x] Distinguir resultados, valores y distribución; delimitar el caso discreto finito.
- [x] Corregir comparación con descriptiva y redondeo anticipado de varianza.
- [x] Integrar la lección con fórmulas compartidas y marcarla parcial.
- [x] Verificar cálculos, fórmulas, enlaces, lectura móvil y estados del índice.
- [x] Cerrar procedencia, auditoría y verificación de la entrega 86.

### 2026-10-14 · `fix: distinguir variable y distribución y conservar precisión`

- [x] Separar resultados del espacio muestral, valores de X y pares de la distribución.
- [x] Delimitar las fórmulas al caso discreto finito.
- [x] Corregir la oposición entre estadística descriptiva y población teórica.
- [x] Mantener 91/6 hasta obtener varianza 35/12≈2,92.

### 2026-10-14 · `test/docs: cerrar entrega 86`

- [x] Confirmar dos originales intactos y la conservación de los datos del dado.
- [x] Contrastar probabilidades y momentos a partir de la tabla mostrada.
- [x] Verificar todas las expresiones LaTeX, navegación raíz/subcarpeta y teclado.
- [x] Revisar texto al 200 %, preferencias, tres capturas y lectura sin JavaScript.
- [x] Confirmar desplazamiento con teclado de la fórmula larga en Chrome.
- [x] Revisar 172 HTML y seis Markdown sin incidencias.
- [x] Cerrar auditoría, procedencia, criterio, README y verificación.
- Total actual: 58 lecciones desarrolladas y seis parciales; 318 preguntas, 340 tarjetas y dieciséis juegos.
- Dos originales de Distribuciones integrados; cinco pendientes. La clasificación completa y actividades ausentes siguen señaladas en 8.1.
- Siguiente: revisar e integrar 2. Distribución Binomial.txt.
- Continúan pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-14 · `feat: integrar distribución binomial`

- [x] Revisar el original completo y conservar teoría y dos ejemplos.
- [x] Precisar condiciones, factores, soporte y casos extremos.
- [x] Integrar soluciones desplegables y navegación común, sin rediseño.
- [x] Verificar cálculos, soluciones, fórmulas, móvil y estados.
- [x] Registrar correspondencias y cerrar la entrega 87.

### 2026-10-14 · `fix: precisar condiciones e interpretación binomial`

- [x] Definir X como recuento y concretar soporte y parámetros.
- [x] Distinguir probabilidad de una secuencia y factor combinatorio.
- [x] Separar los casos p=0/1 para evitar sustituciones ambiguas.
- [x] Explicitar independencia y p constante en ambos ejemplos.
- [x] Distinguir esperanza de resultado garantizado y desviación de margen garantizado.

### 2026-10-14 · `test/docs: cerrar entrega 87`

- [x] Confirmar original intacto y conservar los dos ejemplos.
- [x] Contrastar baloncesto enumerando secuencias y calidad mediante momentos de Bernoulli.
- [x] Verificar todas las expresiones LaTeX y los desplegables con teclado.
- [x] Verificar raíz/subcarpeta, lectura móvil al 200 %, preferencias y acceso sin JavaScript.
- [x] Inspeccionar dos capturas y revisar 172 HTML y seis Markdown sin incidencias.
- [x] Actualizar auditoría, procedencia, criterio, README e informe de verificación.
- Total actual: 58 lecciones desarrolladas y siete parciales; 318 preguntas, 340 tarjetas y dieciséis juegos.
- Tres originales de Distribuciones integrados; cuatro pendientes.
- Siguiente: revisar e integrar 3. Distribución Normal.txt.
- Continúan pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-14 · `feat: integrar normal y su explorador original`

- [x] Leer teoría, cinco controles, cuatro gráficos y cálculos del original.
- [x] Separar modelo numérico e interfaz usando el motor matemático compartido.
- [x] Corregir escalas, recorte silencioso, gráficas pequeñas y sombreado de acumulada.
- [x] Precisar densidad, acumulada, probabilidad puntual y porcentajes empíricos.
- [x] Verificar cálculos, extremos, controles, fórmulas, gráficos y lectura.
- [x] Cerrar documentación y enlaces de la entrega 88.

### 2026-10-14 · `fix: corregir escalas y lecturas de la normal`

- [x] Reparar viewBox de las dos vistas pequeñas.
- [x] Usar escalas fijas para visualizar desplazamiento y dispersión.
- [x] Eliminar recorte silencioso de a/b/k y avisar de extremos invertidos.
- [x] Retirar la falsa banda de área bajo la CDF y conservar sus guías.
- [x] Separar densidad/probabilidad, normalidad/continuidad y modelo/porcentajes observados.
- [x] Conservar coeficientes numéricos, estabilizar colas pequeñas y agrupar cambios con LaTeX compartido.

### 2026-10-14 · `test/docs: cerrar entrega 88`

- [x] Confirmar fuente intacta, cinco controles y cuatro gráficos.
- [x] Superar tres pruebas numéricas con contraste independiente por integración.
- [x] Comprobar parámetros extremos, igualdad/inversión de límites y cambios rápidos.
- [x] Verificar gráficos, LaTeX, teclado, móvil al 200 % y rutas raíz/subcarpeta.
- [x] Comprobar recarga sin guardar parámetros y alternativa de lectura sin JavaScript.
- [x] Inspeccionar cuatro capturas y revisar 172 HTML y seis Markdown sin incidencias.
- [x] Cerrar auditoría, procedencia, criterio, README y verificación.
- Total actual: 58 lecciones desarrolladas y ocho parciales; 318 preguntas, 340 tarjetas y dieciséis juegos.
- Cuatro originales de Distribuciones integrados; tres pendientes.
- Siguiente: revisar e integrar 4. Aproximación de la Binomial por la Normal.txt.
- Continúan pendientes accesibilidad global, PDF, administración central, traducción, voz y cuentas futuras.

### 2026-10-14 · Entrega 89 · aproximación binomial-normal

- [x] Revisar el original y localizar diferencias entre áreas y probabilidades.
- [x] Integrar teoría, seis controles y cuatro gráficos.
- [x] Contrastar cálculos y comprobar el navegador.
- [x] Documentar procedencia y carencias.


### 2026-10-14 · feat/fix/test/docs: cerrar entrega 89

- feat: teoría y comparador original con seis controles y cuatro gráficos.
- fix: continuidad, colas, límites sincronizados y lectura de acumuladas.
- test: dos pruebas numéricas y comprobación Chrome superadas; tres capturas inspeccionadas.
- docs: procedencia, auditoría, estados editoriales e informe actualizados.
- Siguiente: revisar e integrar 5. Ejercicios Resueltos.txt, sin inventar contenido ausente.

### 2026-10-15 · feat: integrar ejercicios resueltos de Distribuciones

- [x] Inventariar los 21 ejercicios y conservar el archivo original.
- [x] Recalcular los resultados binomiales, normales y aproximados.
- [x] Corregir seis resultados finales y un producto intermedio.
- [x] Incorporar enunciados, pasos y soluciones desplegables al índice del tema 8.
- [x] Verificar MathJax, selector, enlaces directos, móvil, subcarpeta y lectura sin JavaScript.
- [x] Actualizar auditoría, procedencia, criterio, README y verificación.
- Total actual: 58 lecciones desarrolladas, nueve parciales; 318 preguntas, 340 tarjetas y dieciséis juegos. Los ejercicios originales se cuentan aparte.
- Seis de los siete originales de Distribuciones integrados; siguiente: 6. Flashcards.txt.

### 2026-10-15 · feat/test/docs: integrar flashcards de Distribuciones

- [x] Inventariar las 19 tarjetas originales y comprobar su hash.
- [x] Corregir definiciones, condiciones y continuidad con correspondencia uno a uno.
- [x] Conectar tema 8 y visor general con las cinco categorías.
- [x] Verificar 359 tarjetas, MathJax, teclado, filtro, móvil y raíz/subcarpeta.
- [x] Comprobar la regresión de la lección normal.
- [x] Actualizar plan, auditoría, procedencia, criterio, README y verificación.
- Siete originales de Distribuciones integrados. Las lecciones mantienen estado parcial por carencias documentadas.
- Total actual: 58 lecciones desarrolladas, nueve parciales; 318 preguntas, 359 tarjetas y dieciséis juegos.
- Siguiente: inventariar y comenzar las fuentes originales de inferencia.

### 2026-10-15 · Entrega 92 · presentación de Inferencia

- [x] Inventariar las once fuentes originales y revisar la presentación.
- [x] Integrar población, muestra, técnicas y ficha técnica en el tema 9.
- [x] Precisar el sentido de la inferencia y las condiciones de los métodos.
- [x] Comprobar fórmulas, navegación y lectura móvil.
- [x] Actualizar auditoría, procedencia, criterio y estado editorial.

### 2026-10-15 · feat/fix/test/docs: cerrar entrega 92

- feat: presentación original de Inferencia integrada en el tema 9, con sus tres bloques e índice de nueve páginas.
- fix: sentido de la inferencia, matices del muestreo y condiciones del margen de error de la ficha de ejemplo.
- test: fuente intacta, MathJax, tres bloques, nueve enlaces, raíz/subcarpeta, móvil al 200 % y contenido sin JavaScript.
- docs: auditoría específica de once fuentes, procedencia, criterio, README y verificación.
- Estado: tema 9 parcial; las nueve lecciones permanecen en preparación. Se integra una de once fuentes.
- Siguiente: 1. Distribuciones muestrales.txt.

### 2026-10-15 · Entrega 93 · distribuciones muestrales

- [x] Leer la fuente original y distinguir afirmaciones exactas de aproximaciones.
- [x] Integrar medias, proporciones, sumas y tabla de fórmulas en 9.4.
- [x] Corregir las condiciones del TCL y la lectura de n ≥ 30.
- [x] Comprobar fórmulas, navegación y presentación móvil.
- [x] Registrar procedencia, verificaciones y carencias.

### 2026-10-15 · feat/fix/test/docs: cerrar entrega 93

- feat: distribuciones de media, proporción y suma, con tabla original revisada y figura accesible.
- fix: TCL con independencia y varianza finita; n≥30 orientativo, parámetros exactos frente a forma normal aproximada, normalidad exacta si la población es normal.
- test: fuente intacta, fórmulas, secciones, tabla, índice, raíz/subcarpeta, móvil al 200 % y lectura sin JavaScript.
- docs: auditoría, procedencia, criterio, README y verificación actualizados.
- Estado: tema 9 y lección 9.4 parciales; dos de once fuentes integradas. Total: 58 lecciones desarrolladas y diez parciales; 318 preguntas, 359 tarjetas y dieciséis juegos.
- Siguiente: 2. Estimación.txt.

### 2026-10-15 · Entrega 94 · estimación

- [x] Revisar el original, valores críticos, fórmula y ejemplos de dirección.
- [x] Integrar estimación puntual, confianza y el intervalo para la media en 9.5.
- [x] Precisar cobertura, supuestos, margen de error y casos sin datos suficientes.
- [x] Comprobar fórmulas, tabla y lectura móvil.
- [x] Actualizar auditoría, procedencia y plan.

### 2026-10-15 · feat/fix/test/docs: cerrar entrega 94

- feat: estimación puntual y por intervalos, tabla crítica y fórmula original en 9.5.
- fix: cobertura de confianza, sigma conocida, margen calculado frente a objetivo y valor crítico del 99 % corregido a 2,576.
- test: cuantiles contrastados con cálculo independiente; Chrome con MathJax, índice, raíz/subcarpeta, móvil al 200 % y lectura sin JavaScript.
- docs: auditoría, procedencia, criterio, README y verificación actualizados.
- Estado: tema 9, 9.4 y 9.5 parciales; tres de once fuentes integradas. Total: 58 lecciones desarrolladas y once parciales; 318 preguntas, 359 tarjetas y dieciséis juegos.
- Siguiente: 2.1. Distribución de la media muestral.txt.

### 2026-10-15 · Entrega 95 · media muestral y aventura original

- [x] Revisar fuente, ejemplo del café y tres decisiones de la aventura.
- [x] Integrar el ejemplo y la normalidad exacta en 9.4.
- [x] Adaptar la aventura como componente insertable con respuesta automática.
- [x] Contrastar probabilidades y comprobar fórmulas, teclado y móvil.
- [x] Registrar procedencia, correcciones y contenido pendiente.

### 2026-10-15 · feat/fix/test/docs: cerrar entrega 95

- feat: ejemplo de café y «Operación Bombilla» de tres etapas en 9.4, con soluciones disponibles sin JavaScript y sin guardar respuestas.
- fix: probabilidades 0,3694 y 0,0478 sin redondeo intermedio; normalidad exacta bajo población normal e independencia; interpretación del 2,28 % sin afirmar que el lote pueda enviarse.
- test: tres comprobaciones numéricas; Chrome en raíz y subcarpeta con MathJax, teclado, avance/reinicio, móvil al 200 % y lectura sin JavaScript.
- docs: procedencia, auditoría, criterio, README y verificación actualizados. Cuatro de once fuentes originales de Inferencia integradas; 9.4 continúa parcial.
- Siguiente: 2.2. Distribución de la proporción muestral.txt.

### 2026-10-15 · Entrega 96 · proporción muestral y aventura original

- [x] Revisar el original 2.2, el ejemplo del comercio y las tres decisiones de «Lanzamiento Premium».
- [x] Integrar ejemplo y aventura en 9.4, reutilizando el componente por etapas.
- [x] Distinguir probabilidad binomial exacta, normal sin corrección y corrección de continuidad; precisar independencia y sentido de «más del».
- [x] Verificar cálculos, MathJax, teclado, móvil, raíz/subcarpeta y soluciones sin JavaScript.
- [x] Actualizar procedencia, auditoría, criterio, README e índice del tema.

### 2026-10-15 · feat/fix/test/docs: cerrar entrega 96

- feat: ejemplo de comercio y aventura Premium de tres etapas en 9.4; módulo común para aventuras de medias y proporciones, sin persistencia.
- fix: 18,84 % normal frente a 18,61 % binomial para comercio; 8,08 % de tabla normal frente a 6,63 % binomial para Premium. Se añade corrección de continuidad y se retira la conclusión comercial no justificada.
- test: tres pruebas numéricas nuevas; Chrome con MathJax, respuestas, teclado, móvil 390 px al 200 %, raíz/subcarpeta y lectura sin JavaScript. La aventura de medias también se revalidó.
- docs: cinco de once fuentes de Inferencia integradas; tema y 9.4 parciales. Siguiente: 3. Error y tamaño muestral.txt.

### 2026-10-15 · Entrega 97 · error y tamaño muestral

- [x] Revisar el original 3 y sus fórmulas, figura, ejemplo de redondeo y relaciones de diseño.
- [x] Integrar la teoría revisada en 9.8 y registrar su estado parcial.
- [x] Añadir cálculo accesible de margen y tamaño mínimo con parámetros introducidos por el estudiante.
- [x] Verificar cálculo, redondeo, fórmulas, teclado, móvil y funcionamiento sin JavaScript.
- [x] Actualizar auditoría, procedencia, índice, README y verificación.

### 2026-10-15 · feat/fix/test/docs: cerrar entrega 97

- feat: 9.8 incorpora margen, tamaño mínimo, figura descrita, redondeo y planificador con confianza, desviación conocida y margen objetivo.
- fix: el margen no se presenta como cota garantizada; se separa el objetivo previo del margen calculado. El formulario y las fórmulas largas se adaptan a móvil con texto al 200 %.
- test: tres pruebas del modelo; Chrome con MathJax, cálculo, teclado, raíz/subcarpeta, móvil y lectura sin JavaScript.
- docs: procedencia, auditoría, criterio, README, índice y estado editorial actualizados. Seis de once fuentes de Inferencia integradas; 9.8 parcial. Siguiente: 4. Ejercicios resueltos.txt.

### 2026-10-15 · Entrega 98 · 27 ejercicios resueltos de Inferencia

- [x] Inventariar los 27 originales, sus enunciados, pasos y conclusiones.
- [x] Revisar cálculos y reescribir las soluciones con notación y supuestos correctos.
- [x] Publicar los 27 en una página con cabecera/pie comunes, fórmulas locales y soluciones desplegables.
- [x] Verificar correspondencia uno a uno, resultados, LaTeX, navegación y lectura móvil.
- [x] Registrar correcciones, procedencia, estado y siguiente fuente en plan y auditoría.

### 2026-10-15 · feat/fix/test/docs: cerrar entrega 98

- feat: colección propia con 27/27 ejercicios de Inferencia, mismo orden e identificadores, selector para mostrar uno y resoluciones desplegables.
- fix: LaTeX y resultados revisados; se distinguen normal y binomial exacta, margen y error observado, y evidencia estadística frente a certeza. Dos preguntas se reformulan con sus datos originales.
- test: tres pruebas de referencias numéricas; Chrome con MathJax, selector, teclado, raíz/subcarpeta, móvil al 200 % y lectura sin JavaScript.
- docs: procedencia, auditoría, criterio, índice, README y verificación actualizados. Siete de once fuentes de Inferencia integradas; colección parcial. Siguiente: 5. Flashcards.txt.

### 2026-10-15 · Entrega 99 · flashcards originales de Inferencia

- [x] Inventariar 30 tarjetas del original y verificar su integridad por SHA-256.
- [x] Conservar preguntas, orden y ocho categorías; revisar matemáticamente las respuestas y sus supuestos.
- [x] Integrar el mazo en el visor común y enlazarlo desde el tema 9.
- [x] Verificar fórmulas, filtro, teclado, móvil, raíz/subcarpeta y recarga.
- [x] Actualizar auditoría, procedencia, criterio, README y verificación.

### 2026-10-15 · feat/fix/test/docs: cerrar entrega 99

- feat: 30 tarjetas originales de Inferencia incorporadas al visor por ocho categorías; 389 tarjetas totales.
- fix: se precisan representatividad, muestreo, condiciones del TCL, cobertura, desviación conocida, planificación de proporciones y reglas de tamaño. El valor crítico bilateral del 99 % se redondea a 2,576.
- test: correspondencia 1–30, categorías, identificadores y 318 preguntas conservadas; Chrome recorre las 30 respuestas sin errores LaTeX y comprueba filtro, teclado, móvil y subcarpeta.
- docs: ocho de once fuentes de Inferencia integradas. Siguiente: `6. Tipos de muestreo.txt`. Tema 9 parcial; no se atribuye contenido de los tres archivos pendientes.

### 2026-10-15 · Entrega 100 · técnicas de muestreo originales

- [x] Leer el catálogo original y verificar su integridad por SHA-256.
- [x] Conservar las cuatro técnicas probabilísticas, las cuatro no probabilísticas y sus ejemplos.
- [x] Precisar inferencia, incertidumbre, costes y límites de cada diseño.
- [x] Publicar 9.3 y enlazarla desde los índices; mantener 9.2 pendiente.
- [x] Verificar fórmulas, enlaces, raíz/subcarpeta y móvil al 200 %.
- [x] Actualizar auditoría, procedencia, criterio, README y verificación.

### 2026-10-15 · feat/fix/test/docs: cerrar entrega 100

- feat: 9.3 desarrolla ocho técnicas del catálogo original, con ejemplos y comparación de alcance.
- fix: se retiran generalizaciones absolutas sobre extrapolación, precisión y costes; el ejemplo sistemático conserva 20 posiciones y las cuotas suman 100.
- test: Chrome comprueba fuente intacta, ocho apartados, LaTeX, enlaces, índice, raíz/subcarpeta y móvil al 200 %.
- docs: nueve de once fuentes de Inferencia integradas; 58 lecciones desarrolladas, trece parciales, 318 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: `7. Tipo test.txt`.

### 2026-10-15 · Entrega 101 · test original de Inferencia

- [x] Inventariar las 20 preguntas, cuatro opciones, respuestas y explicaciones del original; comprobar su hash.
- [x] Revisar las preguntas con afirmaciones absolutas sin cambiar las situaciones ni las respuestas previstas.
- [x] Integrar el banco en el test común y enlazarlo desde el tema 9.
- [x] Recorrer las 20 preguntas, corrección, pistas, teclado, subcarpeta y móvil.
- [x] Actualizar pruebas de regresión del catálogo, auditoría, procedencia, criterio, README y verificación.

### 2026-10-15 · feat/fix/test/docs: cerrar entrega 101

- feat: 20 preguntas originales revisadas de Inferencia en el test común, con generador reproducible y hash; 338 preguntas base en total.
- fix: precisados sesgo, probabilidades de inclusión, estratos, conglomerados, costes y extrapolación. Orden y respuesta prevista conservados.
- test: Chrome recorre las 20 respuestas y verifica pista, corrección, resumen, teclado, móvil, raíz/subcarpeta, MathJax y lectura sin JavaScript. Batería general: 294 pruebas superadas.
- docs: diez de once fuentes de Inferencia integradas. Siguiente: `8. Intervalos de confianza.txt`. Tema 9 y lecciones parciales conservan sus límites documentados.

### 2026-10-15 · Entrega 102 · intervalos de confianza originales

- [x] Revisar teoría, fórmula, cuatro controles, figura y código del último original de Inferencia; verificar SHA-256.
- [x] Precisar cobertura, desviación poblacional conocida y alcance de la visualización.
- [x] Integrar 9.7 con modelo numérico separado y laboratorio accesible por teclado.
- [x] Corregir el cuantil del 99 % y comprobar extremos, anchura y relaciones de los controles.
- [x] Verificar MathJax, raíz/subcarpeta, móvil al 200 % y lectura sin JavaScript.
- [x] Actualizar auditoría, procedencia, criterio, índice, README y verificación.

### 2026-10-15 · feat/fix/test/docs: cerrar entrega 102

- feat: 9.7 incorpora explicación, analogía revisada y laboratorio con media, desviación, tamaño y confianza; figura y texto sincronizados.
- fix: cuantiles precisos sin redondeo intermedio y distinción entre un intervalo calculado y cobertura del procedimiento repetido.
- test: tres pruebas numéricas y Chrome con controles, figura, MathJax, teclado, raíz/subcarpeta, móvil y lectura sin JavaScript.
- docs: los once originales de Inferencia están revisados. Total: 58 lecciones desarrolladas y catorce parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Próximo trabajo: cubrir los epígrafes aún vacíos y carencias documentadas, sin atribuirlas al material original.

### 2026-10-15 · Entrega 103 · fundamentos de inferencia en 9.1

- [x] Releer la presentación original y separar lo que permite desarrollar de los datos ausentes.
- [x] Organizar población, muestra, parámetro, estadístico y sentido de la inferencia en 9.1.
- [x] Usar la ficha didáctica de 2.500 entrevistas sin atribuirle resultados ni procedencia reales.
- [x] Enlazar técnicas, estimación, test y tarjetas existentes sin duplicar bancos.
- [x] Verificar origen, fórmulas, índice, enlaces, raíz/subcarpeta, móvil y lectura sin JavaScript.
- [x] Actualizar auditoría, procedencia, criterio, README y verificación.

### 2026-10-15 · feat/test/docs: cerrar entrega 103

- feat: 9.1 deja de estar vacía y explica el vocabulario y el proceso de inferencia desde el original 0; ficha didáctica leída con límites explícitos.
- test: Chrome confirma fuente intacta, cuatro conceptos, enlaces, MathJax, índice, raíz/subcarpeta, móvil al 200 % y contenido sin JavaScript.
- docs: once originales integrados, sin nuevos bancos. Total: 58 lecciones desarrolladas y quince parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: 9.2 Muestreo, con alcance y fuentes delimitados.

### 2026-10-15 · Entrega 104 · muestreo en 9.2

- [x] Releer presentación, técnicas y test originales; comprobar sus hashes.
- [x] Organizar población objetivo, marco, selección y respuesta sin repetir el catálogo 9.3.
- [x] Leer la ficha didáctica de 2.500 entrevistas sin inventar datos ni validar su margen.
- [x] Enlazar técnicas y repaso; marcar 9.2 como parcial en el índice y panel editorial.
- [x] Verificar fórmulas, raíz/subcarpeta, móvil al 200 % y contenido sin JavaScript.
- [x] Actualizar auditoría, procedencia, criterio, README y verificación.

### 2026-10-15 · feat/test/docs: cerrar entrega 104

- feat: 9.2 deja de estar vacía; guía la preparación y lectura crítica de una muestra con las fuentes originales.
- test: Chrome comprueba fuentes intactas, cinco secciones, tabla, enlaces, MathJax, índice, raíz/subcarpeta, móvil y lectura sin JavaScript.
- docs: once originales ya revisados; 58 lecciones desarrolladas, dieciséis parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: 9.6, con el alcance que permitan los originales.


### 2026-10-15 · Entrega 105 · intervalos característicos en 9.6

- [x] Revisar guion, distinción original y ejercicio de estaturas.
- [x] Desarrollar áreas centrales, colas, tipificación e intervalo de la media bajo supuestos explícitos.
- [x] Resolver el 95 % con datos originales, separando la nueva pregunta del enunciado fuente.
- [x] Comparar intervalo característico con intervalo de confianza y enlazar 9.7.
- [x] Marcar 9.6 parcial y verificar fórmulas, raíz/subcarpeta, móvil y lectura sin JavaScript.
- [x] Actualizar auditoría, procedencia, criterio, README y verificación.

### 2026-10-15 · feat/test/docs: cerrar entrega 105

- feat: 9.6 deja de estar vacía con teoría, tabla, ejemplo resuelto y comparación de las dos direcciones estadísticas.
- test: Chrome confirma fuentes intactas, MathJax, cinco secciones, índice, navegación, móvil al 200 % y contenido sin JavaScript.
- docs: 58 lecciones desarrolladas, diecisiete parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: 9.9 Ficha técnica.


### 2026-10-15 · Entrega 106 · ficha técnica de encuestas en 9.9

- [x] Revisar los cinco campos de la ficha original y el guion del epígrafe.
- [x] Distinguir datos declarados, datos ausentes y resultados no observados.
- [x] Explicar el margen anunciado bajo supuestos simplificados sin validarlo para el diseño estratificado.
- [x] Conectar muestreo, intervalos, test y tarjetas; marcar 9.9 como parcial.
- [x] Verificar fuentes, fórmula, índice, raíz/subcarpeta, móvil al 200 % y contenido sin JavaScript.
- [x] Actualizar auditoría, procedencia, criterio, README y verificación.

### 2026-10-15 · feat/test/docs: cerrar entrega 106

- feat: 9.9 deja de estar vacía y enseña a leer críticamente una ficha de encuesta sin atribuir el ejemplo a un estudio real.
- test: Chrome confirma cinco secciones, tablas, MathJax, enlaces, móvil y lectura sin JavaScript.
- docs: los nueve epígrafes de Inferencia tienen contenido parcial; 58 lecciones desarrolladas, dieciocho parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: revisión transversal de precisión, enlaces y accesibilidad del tema 9.


### 2026-10-15 · Entrega 107 · revisión transversal del tema 9

- [x] Revisar referencias temporales y estados de las nueve lecciones, índice y colección.
- [x] Corregir la notación LaTeX de n en 9.2 y enlazar 9.9 ya disponible.
- [x] Actualizar textos de 9.4, 9.8, índice y ejercicios que hablaban de originales aún no integrados.
- [x] Recorrer las once rutas, fórmulas, anclas y enlaces locales en Chrome.
- [x] Confirmar diez entradas parciales en el índice dinámico (nueve lecciones y colección).
- [x] Registrar hallazgos y límites en auditoría, README y verificación.

### 2026-10-15 · fix/test/docs: cerrar entrega 107

- fix: eliminadas indicaciones desactualizadas y reparada la fórmula inline de 9.2.
- test: once páginas con estructura común, MathJax y enlaces/fragmentos sin error; índice editorial coherente.
- docs: sin nuevos contenidos ni bancos. Permanecen 58 lecciones desarrolladas, dieciocho parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Próxima revisión: accesibilidad matemática con tecnología de apoyo y carencias particulares de cada lección.


### 2026-10-15 · Entrega 108 · apoyo a la lectura matemática de Inferencia

- [x] Revisar la configuración local de MathJax y su MathML de apoyo.
- [x] Comprobar los nueve epígrafes: MathML, fórmulas válidas, tablas y figuras semánticas.
- [x] Añadir explicaciones en palabras a las fórmulas centrales de 9.6, 9.7 y 9.9.
- [x] Verificar en Chrome que las explicaciones y el MathML se mantienen tras la edición.
- [x] Documentar el alcance de la auditoría y la validación manual pendiente.

### 2026-10-15 · feat/test/docs: cerrar entrega 108

- feat: cuatro expresiones clave incorporan explicación visible en palabras para complementar MathML.
- test: los nueve epígrafes muestran MathML de apoyo y carecen de errores MathJax; tablas y figuras comprobadas; explicaciones presentes.
- docs: no se declara validación con lector de pantalla. Totales de contenidos y bancos sin cambios. Siguiente: prueba manual de lector de pantalla y pronunciación matemática, seguida de mejoras específicas que revele.


### 2026-10-16 · Entrega 109 · portada y 7.1 Probabilidad

- [x] Inventariar los ocho originales de Probabilidad y releer presentación, introducción y tipos.
- [x] Desarrollar la portada con índice dinámico y estados editoriales reales.
- [x] Integrar 7.1 con espacio muestral, tipos de sucesos y Laplace solo bajo equiprobabilidad.
- [x] Conservar ejemplos de dado y baraja con respuestas desplegables; reservar unión y frecuencias para sus epígrafes.
- [x] Verificar originales intactos, MathJax, índice, raíz/subcarpeta, móvil al 200 % y sin JavaScript.
- [x] Documentar procedencia, límites, README y verificación.

### 2026-10-16 · feat/test/docs: cerrar entrega 109

- feat: tema 7 inicia con portada y 7.1; nueve epígrafes siguen en preparación.
- test: Chrome comprueba las tres fuentes, cinco secciones, tabla, tres ejemplos, fórmulas y accesibilidad básica.
- docs: 58 lecciones desarrolladas y diecinueve parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: 7.2 Álgebra de sucesos desde el original de introducción.


### 2026-10-16 · Entrega 110 · álgebra de sucesos en 7.2

- [x] Revisar cuatro diagramas originales, ejercicio «rey o copa» y guion 7.2.
- [x] Desarrollar unión, intersección, diferencia, complementario y compatibilidad.
- [x] Añadir diagrama accesible y traducción de «al menos uno», «ninguno», «solo A», «solo uno» y «ambos».
- [x] Explicar De Morgan y doble conteo; conservar 13/40 del ejemplo original.
- [x] Verificar fuentes intactas, MathJax, índice, raíz/subcarpeta, móvil y sin JavaScript.
- [x] Actualizar auditoría, procedencia, README y verificación.

### 2026-10-16 · feat/test/docs: cerrar entrega 110

- feat: 7.2 deja de estar vacía y conecta operaciones, diagrama y ejemplo resuelto.
- test: Chrome comprueba seis secciones, dos tablas, figura descrita, cálculo, fórmulas y estados.
- docs: 58 lecciones desarrolladas y veinte parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: 7.3 Tablas de contingencia.


### 2026-10-16 · Entrega 111 · tablas de contingencia en 7.3

- [x] Revisar la tabla simbólica, el ejemplo numérico y el guion 7.3.
- [x] Explicar casillas conjuntas, marginales, frecuencias y denominador de una condicionada.
- [x] Mantener las cifras originales y separar la ampliación didáctica de los datos fuente.
- [x] Actualizar índice y estado editorial sin revelar contenidos todavía vacíos.
- [x] Verificar original intacto, MathJax, tablas, raíz/subcarpeta, móvil y sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-16 · feat/test/docs: cerrar entrega 111

- feat: 7.3 incorpora dos tablas, ejemplo resuelto y lectura de probabilidades condicionadas.
- test: Chrome comprueba la lección nueva y las regresiones de 7.1 y 7.2.
- docs: 58 lecciones desarrolladas y veintiuna parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: 7.4 Frecuencias desde los originales.

### 2026-10-16 · Entrega 112 · frecuencias en 7.4

- [x] Revisar el original de probabilidad teórica/empírica y el guion 7.4.
- [x] Explicar frecuencia absoluta, relativa y acumulada con su ámbito de uso.
- [x] Conservar los dos ejemplos numéricos y matizar la estimación empírica y la ley de los grandes números.
- [x] Actualizar portada y estado editorial de 7.4.
- [x] Verificar fuente intacta, MathJax, índice, raíz/subcarpeta, móvil y sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-16 · feat/test/docs: cerrar entrega 112

- feat: 7.4 deja de estar vacía y conecta recuentos, porcentajes y estimación.
- test: Chrome comprueba cinco secciones, fórmulas, ejemplos, índice y lectura ampliada.
- docs: 58 lecciones desarrolladas y veintidós parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: 7.5 Axiomática de Kolmogórov.

### 2026-10-16 · Entrega 113 · axiomática en 7.5

- [x] Revisar los axiomas, ejemplos y autoevaluación del original y el guion 7.5.
- [x] Explicar no negatividad, normalización y aditividad; precisar el caso numerable.
- [x] Deducir P(∅)=0 y conservar el ejemplo del dado sin atribuir equiprobabilidad a los axiomas.
- [x] Actualizar índice y estado editorial.
- [x] Verificar fuente intacta, MathJax, raíz/subcarpeta, móvil y sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-16 · feat/test/docs: cerrar entrega 113

- feat: 7.5 incorpora los axiomas, una deducción y un ejemplo desplegable.
- test: Chrome comprueba cinco secciones, fórmulas, índice y lectura ampliada.
- docs: 58 lecciones desarrolladas y veintitrés parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: 7.6 Propiedades de la probabilidad.

### 2026-10-16 · Entrega 114 · propiedades en 7.6

- [x] Revisar propiedades y ejemplos del original y el guion 7.6.
- [x] Deducir complementario, monotonía y unión con solape desde los axiomas.
- [x] Conservar los dos ejemplos originales y distinguir incompatibilidad de independencia.
- [x] Actualizar índice y estado editorial.
- [x] Verificar fuente intacta, MathJax, tabla, raíz/subcarpeta, móvil y sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-16 · feat/test/docs: cerrar entrega 114

- feat: 7.6 desarrolla propiedades, deducciones y ejemplos desplegables.
- test: Chrome comprueba cinco secciones, tabla de cuatro propiedades, fórmulas e índice.
- docs: 58 lecciones desarrolladas y veinticuatro parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: 7.7 Experimentos compuestos.

### 2026-10-16 · Entrega 115 · experimentos compuestos en 7.7

- [x] Revisar árboles y ejemplos del original y el guion 7.7.
- [x] Explicar nodos, ramas, producto de caminos y suma de caminos incompatibles.
- [x] Conservar el ejemplo de incendios y añadir el contraste con/sin reemplazamiento identificado como elaboración didáctica.
- [x] Registrar la fórmula defectuosa del ejemplo de fallos para revisión posterior.
- [x] Actualizar índice y estado editorial.
- [x] Verificar fuente intacta, MathJax, tabla, raíz/subcarpeta, móvil y sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-16 · feat/test/docs: cerrar entrega 115

- feat: 7.7 incorpora el árbol original en formato tabular legible y un ejemplo de reemplazamiento.
- test: Chrome comprueba cinco secciones, cuatro caminos, fórmulas e índice.
- docs: 58 lecciones desarrolladas y veinticinco parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: 7.8 Probabilidad condicionada.

### 2026-10-17 · Entrega 116 · probabilidad condicionada en 7.8

- [x] Revisar definición y ejemplo del original y el guion 7.8.
- [x] Explicar cambio de universo, denominador y regla del producto.
- [x] Comparar las dos condiciones y comprobar independencia sin crear datos nuevos.
- [x] Actualizar índice y estado editorial.
- [x] Verificar fuente intacta, MathJax, desplegables, raíz/subcarpeta, móvil y sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-17 · feat/test/docs: cerrar entrega 116

- feat: 7.8 incorpora definición, producto, ejemplo de tabla y criterio de independencia.
- test: Chrome comprueba cinco secciones, fórmulas, dos soluciones e índice.
- docs: 58 lecciones desarrolladas y veintiséis parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: 7.9 Probabilidad total.

### 2026-10-17 · Entrega 117 · probabilidad total en 7.9

- [x] Revisar los originales de probabilidad total y árboles y el guion 7.9.
- [x] Explicar partición, suma de caminos y media ponderada.
- [x] Conservar los ejemplos de máquinas y dos ramas sin atribuirlos a datos observados.
- [x] Actualizar índice y estado editorial.
- [x] Verificar fuentes intactas, MathJax, tabla, raíz/subcarpeta, móvil y sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-17 · feat/test/docs: cerrar entrega 117

- feat: 7.9 desarrolla partición, fórmula y dos ejemplos originales.
- test: Chrome comprueba cinco secciones, tabla, fórmulas, soluciones e índice.
- docs: 58 lecciones desarrolladas y veintisiete parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: 7.10 Teorema de Bayes.

### 2026-10-17 · Entrega 118 · Bayes en 7.10

- [x] Revisar fórmula, dos ejemplos y autoevaluación del original y el guion 7.10.
- [x] Desarrollar la probabilidad inversa con cálculo previo del denominador.
- [x] Conservar los datos y precisar los resultados 95/392 y 8/27.
- [x] Marcar los diez epígrafes del tema con contenido parcial en el índice.
- [x] Verificar fuente intacta, MathJax, tabla, raíz/subcarpeta, móvil y sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-17 · feat/test/docs: cerrar entrega 118

- feat: 7.10 completa el primer recorrido teórico de los diez epígrafes de Probabilidad.
- test: Chrome comprueba cinco secciones, tabla, fórmulas, solución e índice.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: integrar ejercicios, test y tarjetas originales del tema 7, además de revisar accesibilidad matemática.

### 2026-10-17 · Entrega 119 · ejercicios resueltos de Probabilidad

- [x] Inventariar los ocho problemas del original y comprobar sus resultados.
- [x] Adaptar enunciados y procedimientos a soluciones desplegables con LaTeX válido.
- [x] Enlazar la colección desde la portada sin añadir un undécimo epígrafe al índice.
- [x] Registrar la página y su estado editorial parcial.
- [x] Verificar fuente intacta, MathJax, ocho ejercicios, raíz/subcarpeta, móvil y sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-17 · feat/test/docs: cerrar entrega 119

- feat: el tema 7 incorpora ocho problemas resueltos, separados del índice de diez lecciones.
- test: Chrome comprueba ocho artículos, fórmulas, navegación y lectura ampliada; cálculo independiente confirma once resultados o apartados.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 338 preguntas, 389 tarjetas y dieciséis juegos. Siguiente: revisar el original de tarjetas de Probabilidad y su posible integración.

### 2026-10-17 · Entrega 120 · tarjetas de Probabilidad

- [x] Inventariar las 16 tarjetas originales y sus cinco categorías.
- [x] Conservar el orden y precisar condiciones matemáticas en las respuestas.
- [x] Integrar el banco en la vista común, con filtro de tema y categoría.
- [x] Actualizar portada, recuento global y pruebas dependientes del total.
- [x] Verificar fuente intacta, fórmulas de las 16 tarjetas, teclado, raíz/subcarpeta, móvil y recarga.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-17 · feat/test/docs: cerrar entrega 120

- feat: tema 7 incorpora 16 tarjetas originales revisadas; total global 405.
- test: Chrome recorre las 16 respuestas y comprueba MathJax, categorías, navegación y recarga; mazos de Inferencia y Distribuciones sin regresión.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 338 preguntas, 405 tarjetas y dieciséis juegos. Siguiente: autoevaluaciones y práctica del tema 7, luego juegos y accesibilidad matemática.

### 2026-10-17 · Entrega 121 · autoevaluaciones de Probabilidad

- [x] Localizar las tres autoevaluaciones dentro de los originales 3, 4 y 5; verificar sus huellas.
- [x] Convertir las nueve ideas, en orden, en preguntas de elección real con distractores, pistas y explicaciones.
- [x] Integrar el tema 7 en el test común y añadir una lectura con soluciones sin JavaScript.
- [x] Enlazar las vistas desde el índice del tema y registrar la página y el estado editorial.
- [x] Verificar respuestas, MathJax, teclado, raíz/subcarpeta, móvil, recarga y regresión de Inferencia.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-17 · feat/test/docs: cerrar entrega 121

- feat: nueve preguntas originales adaptadas de Probabilidad disponibles con corrección y lectura sin JavaScript.
- test: Chrome confirma las nueve respuestas y no detecta errores de fórmulas; el banco de Inferencia mantiene sus veinte preguntas.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas, 405 tarjetas y dieciséis juegos. Siguiente: práctica adicional y juegos del tema 7; validación de accesibilidad matemática con lector de pantalla.

### 2026-10-17 · Entrega 122 · juego de álgebra de sucesos

- [x] Revisar las operaciones del original y la lección 7.2; verificar la fuente intacta.
- [x] Generar ocho retos nuevos por partida, con dos de cada operación.
- [x] Implementar selección accesible por teclado, dos intentos, pista y explicación.
- [x] Insertar el widget en su página y enlazarlo desde laboratorios y el tema 7.
- [x] Comprobar invariantes de mil partidas y recorrido en Chrome, incluida raíz y subcarpeta.
- [x] Actualizar procedencia, auditoría, README y verificación.

### 2026-10-17 · feat/test/docs: cerrar entrega 122

- feat: primer juego del tema 7, Álgebra de sucesos, con conjuntos generados y ocho rondas.
- test: generador, corrección, pistas, teclado, inserción y móvil verificados.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas, 405 tarjetas y diecisiete juegos. Siguiente: árbol de probabilidad y detective Bayes; revisión con lector de pantalla.

### 2026-10-17 · Entrega 123 · árbol de probabilidad

- [x] Revisar la regla original de ramas y verificar la fuente intacta.
- [x] Crear seis retos procedurales por partida con caminos, total y unión.
- [x] Presentar las ramas como lista textual y aceptar porcentajes con teclado.
- [x] Ofrecer pista, dos intentos, explicación, puntuación y reinicio.
- [x] Insertar el widget y enlazarlo desde el tema 7 y laboratorios.
- [x] Verificar dos mil árboles y recorrido en Chrome, raíz/subcarpeta y móvil.
- [x] Registrar procedencia, auditoría, verificación y pendientes.

### 2026-10-17 · feat/test/docs: cerrar entrega 123

- feat: juego Árbol de probabilidad con seis tipos de pregunta y ramas nuevas.
- test: dos mil árboles conservan suma de caminos igual a 100 %; Chrome confirma corrección, teclado y dos intentos.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas, 405 tarjetas y dieciocho juegos. Siguiente: Detective Bayes y revisión con lector de pantalla.

### 2026-10-17 · Entrega 124 · Detective Bayes

- [x] Revisar la fórmula y los ejemplos originales; verificar la fuente intacta.
- [x] Crear seis casos hipotéticos con cifras variables y dos cálculos por caso.
- [x] Separar probabilidad total y probabilidad inversa, con redondeo final a una décima.
- [x] Añadir fórmula LaTeX, pistas, dos intentos, explicaciones y teclado.
- [x] Insertar el widget y enlazarlo desde el tema 7 y laboratorios.
- [x] Verificar dos mil sesiones, casos originales, Chrome, raíz/subcarpeta y móvil.
- [x] Registrar procedencia, auditoría, verificación y pendientes.

### 2026-10-17 · feat/test/docs: cerrar entrega 124

- feat: Detective Bayes completa los tres juegos previstos del tema 7.
- test: dos mil sesiones generadas y doce cálculos por partida; se comprueban decimal, fórmula, teclado y dos intentos.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas, 405 tarjetas y diecinueve juegos. Siguiente: ampliar práctica por lección y validar lectura matemática con lector de pantalla.

### 2026-10-17 · Entrega 125 · práctica de Laplace en 7.1

- [x] Revisar los ejemplos originales de dado y baraja; verificar ambas fuentes intactas.
- [x] Generar seis preguntas de dados, urnas y baraja con condiciones de equiprobabilidad explícitas.
- [x] Explicar casos favorables y posibles, con fracciones LaTeX y dos intentos.
- [x] Integrar la práctica y enlazarla desde la portada del tema 7.
- [x] Verificar dos mil semillas, opciones distintas, Chrome, MathJax, teclado, móvil y lectura sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-17 · feat/test/docs: cerrar entrega 125

- feat: 7.1 incorpora seis preguntas procedurales por sesión sin cambiar el banco base.
- test: dos mil variantes verifican fracciones y distractores; Chrome comprueba corrección, pistas, teclado y recarga.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas base, 405 tarjetas y diecinueve juegos. Siguiente: práctica de 7.2 y revisión con lector de pantalla.

### 2026-10-17 · Entrega 126 · práctica de sucesos en 7.2

- [x] Revisar las operaciones y el lenguaje de los originales; verificar ambas fuentes intactas.
- [x] Generar seis regiones nuevas por sesión con las cuatro partes de Venn presentes.
- [x] Relacionar frases y operaciones, con recuento equiprobable y respuesta en LaTeX.
- [x] Integrar pistas, dos intentos y acceso desde la portada del tema.
- [x] Verificar dos mil semillas, seis operaciones, Chrome, MathJax, teclado, móvil y respaldo sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y pendientes.

### 2026-10-17 · feat/test/docs: cerrar entrega 126

- feat: 7.2 incorpora seis preguntas procedurales de operaciones con sucesos.
- test: todas las regiones quedan representadas; Chrome comprueba seis correcciones y MathJax sin errores.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas base, 405 tarjetas y diecinueve juegos. Siguiente: práctica de 7.3 y revisión con lector de pantalla.

### 2026-10-17 · Entrega 127 · práctica de tablas en 7.3

- [x] Revisar el esquema original de contingencia y verificar la fuente intacta.
- [x] Generar seis preguntas por sesión con recuentos sintéticos coherentes.
- [x] Mostrar tablas semánticas con título y encabezados de fila y columna.
- [x] Diferenciar casillas conjuntas, márgenes y condicionadas inversas.
- [x] Integrar pistas, dos intentos, fórmulas y acceso desde el tema 7.
- [x] Verificar dos mil semillas, Chrome, teclado, móvil, sin JavaScript y regresiones del test común.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-17 · feat/test/docs: cerrar entrega 127

- feat: 7.3 incorpora seis preguntas procedurales de lectura de tablas; el test común admite tablas accesibles.
- test: márgenes y denominadores comprobados en dos mil variantes; Inferencia y práctica 7.1 siguen funcionando.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas base, 405 tarjetas y diecinueve juegos. Siguiente: práctica de 7.4 y revisión con lector de pantalla.

### 2026-10-17 · Entrega 128 · práctica de frecuencias en 7.4

- [x] Revisar frecuencia relativa y ejemplos originales; verificar la fuente intacta.
- [x] Generar seis registros ficticios de categorías ordenadas con totales coherentes.
- [x] Diferenciar frecuencia absoluta, relativa, porcentaje y acumulados.
- [x] Añadir interpretación sobre el límite de una frecuencia observada.
- [x] Integrar tablas, fórmulas, pista, dos intentos y acceso desde el tema 7.
- [x] Verificar dos mil semillas, Chrome, teclado, móvil y respaldo sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-17 · feat/test/docs: cerrar entrega 128

- feat: 7.4 incorpora seis preguntas procedurales sobre frecuencias y su interpretación.
- test: dos mil registros tienen totales coherentes; Chrome confirma corrección y fórmulas.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas base, 405 tarjetas y diecinueve juegos. Siguiente: práctica de 7.5 y revisión con lector de pantalla.

### 2026-10-17 · Entrega 129 · práctica de axiomas en 7.5

- [x] Revisar los axiomas y la autoevaluación original; verificar la fuente intacta.
- [x] Generar seis preguntas sobre axiomas y consecuencias con valores coherentes.
- [x] Diferenciar el suceso imposible y el complementario de los axiomas primarios.
- [x] Corregir y verificar las secuencias LaTeX del suceso imposible.
- [x] Integrar pistas, dos intentos y acceso desde la portada del tema.
- [x] Verificar dos mil variantes, Chrome, MathJax, teclado, móvil y respaldo sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y pendientes.

### 2026-10-17 · feat/test/docs: cerrar entrega 129

- feat: 7.5 incorpora seis preguntas procedurales de axiomas y sus consecuencias.
- test: MathJax muestra el imposible y las seis soluciones; dos mil variantes conservan opciones distintas.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas base, 405 tarjetas y diecinueve juegos. Siguiente: práctica de 7.6 y revisión con lector de pantalla.

### 2026-10-17 · Entrega 130 · práctica de propiedades en 7.6

- [x] Revisar complementario, unión e inclusión del original; verificar la fuente intacta.
- [x] Generar regiones coherentes para cuatro cálculos y dos decisiones conceptuales.
- [x] Evitar doble conteo de la intersección y distinguir incompatibilidad de independencia.
- [x] Integrar pistas, dos intentos, LaTeX y acceso desde la portada del tema.
- [x] Verificar dos mil variantes, Chrome, teclado, móvil y respaldo sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y pendientes.

### 2026-10-17 · feat/test/docs: cerrar entrega 130

- feat: 7.6 incorpora seis preguntas procedurales sobre propiedades de la probabilidad.
- test: veinte resultados se reparten coherentemente en cuatro regiones; Chrome confirma fórmulas y corrección.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas base, 405 tarjetas y diecinueve juegos. Siguiente: práctica de 7.7 y revisión con lector de pantalla.

### 2026-10-17 · Entrega 131 · práctica de experimentos compuestos en 7.7

- [x] Revisar los árboles del original y verificar que la fuente permanece intacta.
- [x] Generar seis preguntas variables con urnas equiprobables y ramas de dos etapas.
- [x] Distinguir con y sin reemplazamiento, producto de ramas y «al menos una» mediante caminos o complementario.
- [x] Integrar pistas, dos intentos, LaTeX, respaldo sin JavaScript y enlace desde el tema.
- [x] Verificar dos mil variantes, respuestas, distractores, Chrome, MathJax, teclado, subcarpeta y móvil.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-17 · feat/test/docs: cerrar entrega 131

- feat: 7.7 incorpora seis preguntas procedurales sobre árboles y extracciones con y sin reemplazamiento.
- test: dos mil sesiones tienen productos y ramas coherentes; Chrome confirma fórmulas y corrección.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas base, 405 tarjetas y diecinueve juegos. Siguiente: práctica de 7.8 y revisión con lector de pantalla.

### 2026-10-17 · Entrega 132 · práctica de probabilidad condicionada en 7.8

- [x] Revisar la definición, la tabla original y su procedencia; verificar la fuente intacta.
- [x] Generar seis preguntas variables con tablas equiprobables y márgenes coherentes.
- [x] Contrastar las dos condiciones inversas en una misma tabla y practicar complementarios y producto.
- [x] Integrar pista, dos intentos, LaTeX, respaldo sin JavaScript y enlace desde el tema.
- [x] Verificar dos mil variantes, Chrome, MathJax, teclado, subcarpeta y móvil.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-17 · feat/test/docs: cerrar entrega 132

- feat: 7.8 incorpora seis preguntas procedurales que obligan a identificar el denominador de cada condición.
- test: dos mil sesiones conservan tablas, márgenes y respuestas coherentes; Chrome confirma fórmulas y corrección.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas base, 405 tarjetas y diecinueve juegos. Siguiente: práctica de 7.9 y revisión con lector de pantalla.

### 2026-10-17 · Entrega 133 · práctica de probabilidad total en 7.9

- [x] Revisar los ejemplos originales de dos ramas y máquinas; verificar la fuente intacta.
- [x] Generar dos particiones por sesión, de dos y tres grupos, con pesos positivos que suman 1.
- [x] Practicar contribuciones, suma ponderada y complementario sin confundir la probabilidad inversa.
- [x] Integrar tablas, pistas, dos intentos, LaTeX, respaldo sin JavaScript y enlace desde el tema.
- [x] Verificar dos mil variantes, Chrome, MathJax, teclado, subcarpeta y móvil.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-17 · feat/test/docs: cerrar entrega 133

- feat: 7.9 incorpora seis preguntas procedurales de suma de caminos para dos y tres grupos.
- test: dos mil sesiones conservan particiones y medias ponderadas coherentes; Chrome confirma fórmulas y corrección.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas base, 405 tarjetas y diecinueve juegos. Siguiente: práctica de 7.10 y revisión con lector de pantalla.

### 2026-10-17 · Entrega 134 · práctica de Bayes en 7.10

- [x] Revisar la fórmula y los dos ejemplos originales; verificar la fuente intacta.
- [x] Generar dos escenarios por sesión, de dos y tres causas, con pesos y tasas coherentes.
- [x] Pedir primero la probabilidad total observada y después las causas condicionadas al resultado.
- [x] Integrar tablas, pistas, dos intentos, LaTeX, respaldo sin JavaScript y enlace desde el tema.
- [x] Verificar dos mil variantes, suma de posteriores, Chrome, MathJax, teclado, subcarpeta y móvil.
- [x] Registrar procedencia, auditoría, verificación y límites.

### 2026-10-17 · feat/test/docs: cerrar entrega 134

- feat: 7.10 incorpora seis preguntas procedurales de probabilidad total y posterior de Bayes.
- test: dos mil sesiones conservan probabilidades posteriores que suman 1; Chrome confirma fórmulas y corrección.
- docs: 58 lecciones desarrolladas y veintiocho parciales, 347 preguntas base, 405 tarjetas y diecinueve juegos. Las diez lecciones del tema 7 tienen práctica propia. Siguiente: auditar cobertura y accesibilidad del tema antes de ampliar contenidos.

### 2026-10-17 · Entrega 135 · auditoría transversal del tema 7

- [x] Inventariar diez lecciones, diez prácticas, test, problemas, tarjetas, juegos y ocho fuentes originales.
- [x] Comprobar enlaces locales, semántica básica, MathJax y foco por teclado en las diez lecciones.
- [x] Corregir el enlace roto de 7.4 a Muestreo y los textos de estado obsoletos de la portada y 7.10.
- [x] Mantener el foco en el botón de avance tras corregir una pregunta del componente común.
- [x] Ejecutar regresiones del test base de Probabilidad y una práctica de Integrales.
- [x] Registrar cobertura real, límites y revisión manual pendiente en la auditoría.
- [ ] Validar lectura matemática y mensajes de corrección con lector de pantalla.
- [x] Completar al menos 12 problemas y 60 ítems base del tema 7 sin contar variantes (entregas 137 y 144).

### 2026-10-17 · fix/test/docs: cerrar entrega 135

- fix: enlace de Muestreo, textos de estado y foco perdido al terminar una pregunta.
- test: diez lecciones pasan enlaces, fórmulas, estructura y teclado; test base de Probabilidad e Integrales siguen pasando.
- docs: [auditoría vigente](docs/auditoria-cobertura-accesibilidad-probabilidad.md) distingue diez prácticas variables de las nueve preguntas base y deja explícita la validación manual pendiente. Siguiente: revisar con lector de pantalla o ampliar materiales originales pendientes con revisión matemática.

### 2026-10-17 · Entrega 136 · árbol original de fallos de fábrica

- [x] Revisar el segundo árbol del original y verificar que la fuente permanece intacta.
- [x] Calcular con exactitud los cuatro caminos y «al menos un fallo» antes de redondear.
- [x] Reparar la fórmula LaTeX dañada al adaptarla e incorporar tabla textual con encabezados.
- [x] Comprobar sumas, MathJax, Chrome, subcarpeta, móvil y lectura sin JavaScript.
- [x] Actualizar auditoría, procedencia, verificación y límites del tema.

### 2026-10-17 · feat/fix/test/docs: cerrar entrega 136

- feat: 7.7 incluye el árbol de dos unidades con fallo raro y cuatro caminos exactos.
- fix: la fórmula final ya no mezcla delimitadores ni redondea antes de la resta.
- test: \(0{,}00000004+0{,}00019996+0{,}00019996+0{,}99960004=1\); Chrome confirma LaTeX y lectura básica.
- docs: ocho problemas resueltos y nueve preguntas base del tema 7 sin cambios. Siguiente: revisar el resto de los originales y ampliar la cobertura contrastada.

### 2026-10-17 · Entrega 137 · cuatro problemas nuevos de Probabilidad

- [x] Conciliar los apartados del original de tablas y árboles con 7.3, 7.7, 7.9 y el test adaptado.
- [x] Añadir cuatro problemas de ampliación identificados como nuevos, sin alterar los ocho originales.
- [x] Resolver sucesos, extracción sin reemplazamiento, condicionadas inversas y Bayes con fracciones comprobadas.
- [x] Enlazar la colección desde el índice y distinguir originales de ampliaciones.
- [x] Verificar fuente original intacta, cálculos, MathJax, Chrome, subcarpeta, móvil y lectura sin JavaScript.
- [x] Actualizar auditoría, procedencia y cobertura; doce problemas desarrollados alcanzados.
- [x] Completar los 60 ítems base del tema 7 (entrega 144).
- [ ] Validar lectura matemática con lector de pantalla.

### 2026-10-17 · feat/test/docs: cerrar entrega 137

- feat: la colección de Probabilidad ofrece doce problemas, ocho originales y cuatro ampliaciones.
- test: fracciones y tabla comprobadas; Chrome muestra fórmulas y soluciones en raíz y subcarpeta.
- docs: el mínimo de doce problemas se cumple; permanecen nueve de sesenta preguntas base previstas y la validación manual de accesibilidad.

### 2026-10-18 · Entrega 138 · seis preguntas base para 7.1 y 7.2

- [x] Conservar en orden las nueve ideas de autoevaluación originales e identificar seis preguntas nuevas como ampliaciones.
- [x] Cubrir espacio muestral, imposible, equiprobabilidad, De Morgan, diferencia y unión con solape.
- [x] Integrar quince preguntas en test común y lectura con soluciones sin JavaScript.
- [x] Actualizar el recuento del tema y el curso sin contar variantes procedurales.
- [x] Verificar fuentes intactas, MathJax, corrección, pistas, teclado, subcarpeta y móvil.
- [x] Registrar procedencia, auditoría, verificación y límites.
- [ ] Continuar de 15 a 60 preguntas base y revisar accesibilidad matemática con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 138

- feat: el test del tema 7 pasa de nueve a quince preguntas base; la lectura estática conserva las quince respuestas.
- test: Chrome confirma quince correcciones, MathJax sin errores y lectura sin JavaScript; 353 preguntas globales únicas.
- docs: originales 1–9 y ampliaciones 10–15 diferenciadas. Siguiente: ampliar la cobertura base de 7.3 y 7.4.

### 2026-10-18 · Entrega 139 · seis preguntas base para 7.3 y 7.4

- [x] Añadir tres preguntas estables de tabla: unión, condicionada e independencia.
- [x] Añadir tres preguntas de frecuencia: proporción observada, acumulada y comparación con un modelo teórico.
- [x] Distinguir datos hipotéticos y ampliaciones nuevas de las nueve autoevaluaciones originales.
- [x] Ofrecer las veintiuna soluciones en una lectura sin JavaScript, con tablas tituladas y encabezados.
- [x] Verificar las 21 correcciones, MathJax, pista, teclado, móvil, subcarpeta y fuentes intactas.
- [x] Actualizar índices, recuentos, auditoría, procedencia y verificación.
- [ ] Continuar de 21 a 60 preguntas base y validar lectura matemática con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 139

- feat: el test del tema 7 pasa de quince a veintiuna preguntas base; 7.3 y 7.4 tienen tres ampliaciones cada una.
- test: Chrome confirma 21 correcciones, tablas y fórmulas sin errores, además de lectura sin JavaScript; 359 preguntas globales únicas.
- docs: nueve ideas originales adaptadas y doce ampliaciones separadas. Siguiente: cobertura base de 7.5 y 7.6.

### 2026-10-18 · Entrega 140 · seis preguntas base para 7.5 y 7.6

- [x] Revisar la fuente local y separar axiomas de consecuencias demostradas.
- [x] Añadir tres preguntas estables sobre no negatividad, normalización y probabilidad del imposible.
- [x] Añadir tres preguntas estables sobre complementario, monotonía y unión con solape.
- [x] Identificar los seis enunciados y cifras como ampliaciones didácticas.
- [x] Ofrecer las veintisiete soluciones en la lectura sin JavaScript.
- [x] Verificar 27 correcciones, MathJax, teclado, móvil, subcarpeta y fuente intacta.
- [x] Actualizar recuentos, auditoría, procedencia y verificación.
- [ ] Continuar de 27 a 60 preguntas base y validar lectura matemática con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 140

- feat: el test del tema 7 pasa de veintiuna a veintisiete preguntas base; 7.5 y 7.6 aportan tres ampliaciones cada una.
- test: Chrome confirma 27 correcciones y fórmulas sin errores en raíz, subcarpeta y móvil; 365 preguntas globales únicas.
- docs: nueve ideas originales adaptadas y dieciocho ampliaciones diferenciadas. Siguiente: cobertura base de 7.7 y 7.8.

### 2026-10-18 · Entrega 141 · seis preguntas base para 7.7 y 7.8

- [x] Revisar el árbol original de incendios, las reglas de ramas y la lección de condicionadas.
- [x] Añadir tres preguntas estables sobre exactamente uno, reemplazamiento y suceso complementario sin reemplazamiento.
- [x] Añadir tres preguntas estables sobre denominador, producto y condición de probabilidad positiva.
- [x] Identificar la urna y los datos condicionados nuevos como ampliaciones, y mantener los nueve originales en su orden.
- [x] Ofrecer treinta y tres soluciones en la lectura sin JavaScript.
- [x] Verificar 33 correcciones, MathJax, teclado, móvil, subcarpeta y fuente intacta.
- [x] Actualizar recuentos, auditoría, procedencia y verificación.
- [ ] Continuar de 33 a 60 preguntas base y validar lectura matemática con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 141

- feat: el test del tema 7 pasa de veintisiete a treinta y tres preguntas base; 7.7 y 7.8 aportan tres ampliaciones cada una.
- test: Chrome confirma 33 correcciones y fórmulas sin errores en raíz, subcarpeta y móvil; 371 preguntas globales únicas.
- docs: nueve ideas originales adaptadas y veinticuatro ampliaciones diferenciadas. Siguiente: cobertura base de 7.9 y 7.10.

### 2026-10-18 · Entrega 142 · seis preguntas base para 7.9 y 7.10

- [x] Revisar partición, máquinas, dos ramas y correo en la fuente original y las lecciones 7.9–7.10.
- [x] Añadir tres preguntas estables sobre partición, suma ponderada y complementario del total.
- [x] Añadir tres preguntas estables sobre inversión de máquinas, correo y un modelo nuevo de tres causas.
- [x] Mantener diferenciadas las nueve ideas de autoevaluación original y las treinta ampliaciones.
- [x] Ofrecer treinta y nueve soluciones en la lectura sin JavaScript.
- [x] Verificar 39 correcciones, MathJax, teclado, móvil, subcarpeta y fuente intacta.
- [x] Actualizar recuentos, auditoría, procedencia y verificación.
- [ ] Continuar de 39 a 60 preguntas base y validar lectura matemática con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 142

- feat: el test del tema 7 pasa de treinta y tres a treinta y nueve preguntas base; 7.9 y 7.10 aportan tres ampliaciones cada una.
- test: Chrome confirma 39 correcciones y fórmulas sin errores en raíz, subcarpeta y móvil; 377 preguntas globales únicas.
- docs: nueve ideas originales adaptadas y treinta ampliaciones diferenciadas. Siguiente: revisión transversal y ampliación del banco hacia 60.

### 2026-10-18 · Entrega 143 · repaso integrado con una tabla

- [x] Revisar los 39 ítems existentes y elegir una conexión poco practicada: cambiar la operación sin cambiar los datos.
- [x] Construir una tabla ficticia 2×2 con márgenes coherentes y selección equiprobable entre 200 fichas.
- [x] Añadir seis preguntas estables de marginal, conjunta, dos condicionadas inversas, unión e independencia.
- [x] Mantener las nueve ideas originales en su orden e identificar los seis nuevos ítems como ampliaciones.
- [x] Integrar la tabla y las 45 soluciones en la lectura sin JavaScript.
- [x] Verificar cálculos, 45 correcciones, MathJax, teclado, subcarpeta y reflujo móvil al 200 %.
- [x] Actualizar recuentos, auditoría, procedencia y verificación.
- [ ] Continuar de 45 a 60 preguntas base y validar lectura matemática con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 143

- feat: el test del tema 7 pasa de 39 a 45 preguntas base con seis decisiones conectadas por una tabla ficticia.
- test: Chrome confirma 45 correcciones, tablas y fórmulas sin errores; 383 preguntas globales únicas y lectura sin JavaScript con reflujo al 200 %.
- docs: nueve ideas originales adaptadas y 36 ampliaciones diferenciadas. Siguiente: completar quince ítems base con cobertura equilibrada y revisar accesibilidad matemática manual.

### 2026-10-18 · Entrega 144 · mínimo de sesenta preguntas base de Probabilidad

- [x] Añadir cinco preguntas enlazadas sobre dos dados distinguibles y verificar que los 36 pares son equiprobables.
- [x] Añadir cinco preguntas sobre dos extracciones sin reemplazamiento y distinguir los dos órdenes de «exactamente una roja».
- [x] Añadir cinco preguntas sobre un modelo ficticio de dos canales con probabilidad total y dos posteriores de Bayes.
- [x] Mantener las nueve ideas originales y etiquetar las quince incorporaciones como ampliaciones didácticas.
- [x] Incorporar las 60 soluciones y una tabla semántica nueva a la lectura sin JavaScript.
- [x] Comprobar cálculos, 60 correcciones, MathJax, teclado, subcarpeta y reflujo móvil al 200 %.
- [x] Actualizar índice, recuentos, auditoría, procedencia y verificación.
- [ ] Revisar con lector de pantalla fórmulas, tablas y mensajes de corrección; ampliar el contenido parcial de las diez lecciones.

### 2026-10-18 · feat/test/docs: cerrar entrega 144

- feat: el tema 7 alcanza 60 preguntas base (9 adaptadas del original y 51 ampliaciones); el curso suma 398.
- test: Chrome confirma 60 respuestas correctas, fórmulas sin errores, cuatro tablas en la lectura estática y reflujo a 390 px con texto al 200 %.
- docs: el mínimo cuantitativo de preguntas y problemas queda cumplido; el tema mantiene estado parcial hasta revisar lecciones y accesibilidad manual.

### 2026-10-18 · Entrega 145 · completar la guía editorial de 7.1

- [x] Contrastar 7.1 con los originales de Introducción y Tipos de probabilidad.
- [x] Recuperar el ejemplo original «obtener un 3» sin alterar los archivos fuente.
- [x] Añadir objetivos, requisitos, un contraste resuelto de sectores desiguales, errores frecuentes y resumen, sin cambiar el diseño.
- [x] Identificar la ruleta como ampliación y mantener separado el banco fijo de sesenta preguntas.
- [x] Verificar fuentes, fórmulas, práctica de 2.000 semillas, teclado, raíz/subcarpeta, móvil y lectura sin JavaScript.
- [x] Registrar procedencia, auditoría, verificación y límites.
- [x] Revisar 7.2 con el mismo criterio editorial (entrega 146).
- [ ] Validar la lectura matemática con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 145

- feat: 7.1 añade un ejemplo original omitido y una comparación resuelta que exige comprobar la equiprobabilidad antes de contar.
- test: pasan las regresiones de introducción, práctica de Laplace y auditoría transversal; MathJax no muestra errores.
- docs: el curso conserva 398 preguntas base; 7.1 y el tema 7 permanecen parciales por la revisión editorial y de accesibilidad restante.

### 2026-10-18 · Entrega 146 · comparar regiones de sucesos en 7.2

- [x] Contrastar los cuatro diagramas originales y el ejercicio «rey o copa» con la adaptación de 7.2.
- [x] Añadir objetivos y requisitos sin cambiar los estilos generales.
- [x] Resolver con el dado una misma situación como «al menos uno», «exactamente uno», «ninguno» y «no ambos»; distinguir también el orden de la diferencia.
- [x] Identificar la comparación como ampliación didáctica; conservar el ejercicio original y el banco fijo de sesenta preguntas.
- [x] Añadir errores frecuentes, resumen y enlaces hacia 7.3 y la lectura del test.
- [x] Verificar conjuntos, fórmulas, 2.000 semillas de práctica, teclado, raíz/subcarpeta, móvil y lectura sin JavaScript.
- [x] Actualizar procedencia, auditorías, README y verificación.
- [x] Revisar 7.3 con el mismo criterio editorial (entrega 147).
- [ ] Completar la validación manual con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 146

- feat: 7.2 distingue cuatro expresiones que suelen confundirse, con los mismos sucesos y el mismo espacio muestral.
- test: pasan las regresiones de álgebra de sucesos, práctica procedural y cobertura transversal; MathJax no muestra errores.
- docs: no cambian los 60 ítems base del tema ni las 398 preguntas globales; el tema permanece parcial.

### 2026-10-18 · Entrega 147 · lectura integrada de la tabla original en 7.3

- [x] Contrastar la tabla simbólica, el ejemplo de clase y la condicionada del HTML original.
- [x] Añadir objetivos y requisitos para distinguir recuentos, conjuntas, marginales y condicionadas.
- [x] Derivar del mismo ejemplo unión, ninguno, condición complementaria e independencia, sin presentarlos como preguntas originales ni inventar observaciones.
- [x] Añadir errores frecuentes, resumen y enlace al siguiente epígrafe.
- [x] Conservar las dos tablas editoriales y la práctica de seis tablas variables.
- [x] Verificar cálculos, fórmulas, 2.000 semillas, teclado, raíz/subcarpeta, reflujo móvil y lectura sin JavaScript.
- [x] Actualizar plan, procedencia, auditorías, README y verificación.
- [x] Revisar 7.4 con el mismo criterio editorial (entrega 148).
- [ ] Validar la lectura matemática con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 147

- feat: 7.3 usa una sola tabla hipotética para distinguir cuatro operaciones adicionales y el denominador correcto de una condición.
- test: pasan las regresiones de tablas, práctica y cobertura transversal; la prueba de 7.3 selecciona las tablas editoriales sin confundirlas con la tabla dinámica del ejercicio.
- docs: 60 preguntas base del tema y 398 globales sin cambios; la revisión manual de accesibilidad sigue pendiente.

### 2026-10-18 · Entrega 148 · frecuencias observadas y acumuladas en 7.4

- [x] Contrastar los ejemplos 850/10 000 y 24/200 y la explicación empírica con el original de Tipos de probabilidad.
- [x] Añadir objetivos y requisitos sin cambiar el diseño.
- [x] Resolver un registro ficticio ordenado de diez tareas: frecuencia exacta y acumulada, con tabla semántica.
- [x] Comparar cuatro seises en veinte lanzamientos con la probabilidad teórica 1/6, sin inferir que el dado esté cargado.
- [x] Identificar ambos ejemplos añadidos como ampliaciones didácticas y conservar intacta la fuente.
- [x] Añadir errores frecuentes, resumen y enlace al epígrafe siguiente.
- [x] Verificar fórmulas, 2.000 registros procedurales, teclado, raíz/subcarpeta, móvil y lectura sin JavaScript.
- [x] Ajustar la prueba transversal para esperar la respuesta automática antes de comprobarla.
- [x] Actualizar procedencia, auditorías, README y verificación.
- [x] Revisar 7.5 con el mismo criterio editorial (entrega 149).
- [ ] Validar manualmente fórmulas y actividades con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 148

- feat: 7.4 distingue con números «exactamente una» de «como máximo una» y frecuencia observada de probabilidad teórica.
- test: pasan la regresión de frecuencias y la auditoría transversal de las diez lecciones; MathJax no muestra errores.
- docs: el tema conserva 60 preguntas base y el curso 398; la revisión manual de accesibilidad sigue pendiente.

### 2026-10-18 · Entrega 149 · tres axiomas y validez de modelos en 7.5

- [x] Contrastar los tres axiomas y los ejemplos del HTML original de Kolmogórov.
- [x] Recuperar el ejemplo original «sacar figura» en baraja española: 12/40 = 3/10.
- [x] Añadir objetivos y requisitos, sin cambiar el diseño provisional.
- [x] Comprobar tres asignaciones finitas para distinguir modelo válido, peso negativo y suma incompleta.
- [x] Identificar las tres asignaciones como ampliación didáctica, separada de los ejemplos originales y del banco base.
- [x] Añadir errores frecuentes, resumen y enlace a las propiedades de 7.6.
- [x] Verificar fuente intacta, cálculos, fórmulas, 2.000 variantes, teclado, raíz/subcarpeta, móvil y lectura sin JavaScript.
- [x] Actualizar procedencia, auditorías, README y verificación.
- [x] Revisar 7.6 con el mismo criterio editorial (entrega 150).
- [ ] Validar la lectura matemática con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 149

- feat: 7.5 recupera un ejemplo original omitido y demuestra por qué sumar 1 no valida un peso negativo.
- test: pasan las regresiones de axiomas, práctica procedural y cobertura transversal; MathJax no muestra errores.
- docs: se mantienen 60 preguntas base del tema y 398 globales; el tema continúa parcial por las lecciones restantes y la validación manual.

### 2026-10-18 · Entrega 150 · tres relaciones de probabilidad en 7.6

- [x] Contrastar propiedades, demostraciones y ejemplos de dos dados y baraja con el original de Kolmogórov.
- [x] Añadir objetivos y requisitos sin modificar los estilos generales.
- [x] Comparar complementario y unión con solape en el mismo experimento original de dos dados; usar la inclusión como control.
- [x] Identificar el contraste como ampliación didáctica, separado de los ejemplos originales.
- [x] Añadir errores frecuentes, resumen y enlace hacia 7.7.
- [x] Mantener las seis preguntas procedurales y el banco base sin cambiar sus recuentos.
- [x] Verificar fuente, fórmulas, 2.000 variantes, teclado, raíz/subcarpeta, móvil y lectura sin JavaScript.
- [x] Actualizar procedencia, auditorías, README y verificación.
- [x] Revisar editorialmente 7.7 (entrega 151).
- [ ] Validar manualmente la lectura matemática con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 150

- feat: 7.6 presenta dos cálculos de «al menos un seis» y dos comprobaciones de inclusión sobre los mismos dados.
- test: pasan las regresiones de propiedades, práctica procedural y cobertura transversal; MathJax no muestra errores.
- docs: se conservan 60 preguntas base del tema y 398 globales; sigue pendiente la validación manual con tecnologías de apoyo.

### 2026-10-18 · Entrega 151 · independencia y ramas condicionadas en 7.7

- [x] Contrastar los dos árboles independientes y el mini-ejemplo condicionado con el HTML original de tablas y árboles.
- [x] Incorporar los cuatro caminos del mini-ejemplo con 0,3; 0,8 y 0,2; comprobar suma 1 y \(P(B)=0{,}38\).
- [x] Identificar la tabla completa y la comprobación de dependencia como desarrollo de datos originales, distinto de la urna didáctica añadida.
- [x] Añadir objetivos, requisitos, errores frecuentes y resumen sin cambiar el diseño.
- [x] Precisar en 7.9 la fuente del ejemplo de dos ramas y reparar un recuento obsoleto de su prueba.
- [x] Verificar fuentes, cálculos, fórmulas, 2.000 variantes, teclado, raíz/subcarpeta, móvil y lectura sin JavaScript.
- [x] Actualizar procedencia, auditorías, README y verificación.
- [x] Revisar editorialmente 7.8 (entrega 152).
- [ ] Validar manualmente las fórmulas con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 151

- feat: 7.7 contrapone los dos árboles independientes del original con un árbol condicionado del mismo HTML; sus cuatro caminos suman 1.
- fix: 7.9 identifica expresamente el HTML de tablas y árboles como fuente de su ejemplo de dos ramas.
- test: pasan las regresiones de experimentos compuestos, práctica, fábrica, probabilidad total y cobertura transversal.
- docs: permanecen 60 preguntas base del tema y 398 globales; continúa pendiente la validación manual con tecnologías de apoyo.

### 2026-10-18 · Entrega 152 · grupo de referencia en 7.8

- [x] Contrastar definición y ejemplo de aprobar/entregar con el HTML original de tablas y árboles.
- [x] Incorporar en 7.8 la tabla completa derivada de los tres datos originales, con caption y encabezados.
- [x] Comparar \(P(A\mid B)=0{,}70\), \(P(A\mid B^c)=0{,}50\) y \(P(A^c\mid B)=0{,}30\), sin atribuir causalidad ni datos observados.
- [x] Añadir objetivos, requisitos, errores y resumen sin alterar el diseño provisional.
- [x] Actualizar el enlace al mini-ejemplo de ramas, ahora adaptado también en 7.7.
- [x] Verificar fuente, cálculos, MathJax, 2.000 variantes, teclado, raíz/subcarpeta, móvil y lectura sin JavaScript.
- [x] Actualizar procedencia, auditorías, README y verificación.
- [x] Revisar editorialmente 7.9 (entrega 153).
- [ ] Validar manualmente la lectura matemática con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 152

- feat: 7.8 permite calcular las condicionadas directamente desde la tabla y comparar dos grupos de referencia.
- test: pasan la regresión de condicionadas, la práctica procedural y la cobertura transversal; MathJax no muestra errores.
- docs: siguen 60 preguntas base del tema y 398 globales; la lectura con lector de pantalla requiere una prueba manual.

### 2026-10-18 · Entrega 153 · comprobar la probabilidad total en 7.9

- [x] Contrastar partición, fórmula y ejemplo de dos máquinas con el archivo original de probabilidad total.
- [x] Mantener la procedencia del ejemplo de dos ramas, tomada del HTML de tablas y árboles.
- [x] Derivar los dos caminos hacia «sin defecto» de las tasas originales: 0,686 y 0,285; comprobar \(P(D^c)=0{,}971=1-0{,}029\).
- [x] Mostrar por qué el promedio simple 0,035 no corresponde a los pesos 70 % y 30 % del modelo.
- [x] Añadir objetivos, requisitos, errores y resumen sin modificar el diseño.
- [x] Verificar fuentes, cálculos, MathJax, 2.000 variantes, teclado, raíz/subcarpeta, móvil y lectura sin JavaScript.
- [x] Actualizar procedencia, auditorías, README y verificación.
- [x] Revisar editorialmente 7.10 (entrega 154).
- [ ] Validar manualmente fórmulas y actividades con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 153

- feat: 7.9 comprueba el resultado de las dos máquinas mediante los caminos sin defecto y distingue el promedio simple de la media ponderada.
- test: las regresiones de probabilidad total, práctica procedural y cobertura transversal informan resultado satisfactorio.
- docs: se conservan 60 preguntas base del tema y 398 globales; queda pendiente la prueba manual con lector de pantalla.

### 2026-10-18 · Entrega 154 · comprobar las posteriores de Bayes en 7.10

- [x] Contrastar fórmula, prueba hipotética y ejemplo de correo con el HTML original de probabilidad total y Bayes.
- [x] Derivar de las contribuciones originales las posteriores de las causas alternativas: \(297/392\) y \(19/27\).
- [x] Comprobar que cada par de posteriores suma 1 y separar sensibilidad o tasa dentro de grupo de probabilidad posterior.
- [x] Identificar las comprobaciones como ampliación editorial, sin presentar los casos como datos médicos o de correo observados.
- [x] Añadir objetivos, requisitos, errores y resumen sin cambiar el diseño.
- [x] Verificar fuente, cálculos, MathJax, 2.000 variantes, teclado, raíz/subcarpeta, móvil y lectura sin JavaScript.
- [x] Actualizar procedencia, auditorías, README y verificación.
- [x] Auditar de forma automatizada la estructura y los enlaces de las diez lecciones, las 60 preguntas base y los doce problemas (entrega 155).
- [ ] Revisar editorialmente en detalle los 60 ítems base y los doce problemas frente a sus fuentes.
- [ ] Validar manualmente fórmulas, tablas y actividades con lector de pantalla.

### 2026-10-18 · feat/test/docs: cerrar entrega 154

- feat: 7.10 muestra cómo las posteriores de dos causas comparten denominador y suman 1 en ambos ejemplos originales.
- test: las regresiones de Bayes, práctica procedural y cobertura transversal informan resultado satisfactorio.
- docs: las diez lecciones recibieron esta pasada editorial; siguen 60 preguntas base del tema y 398 globales, con validación manual pendiente.

### 2026-10-18 · Entrega 155 · auditoría transversal del tema 7

- [x] Comprobar en las diez lecciones objetivos, requisitos, fuente, errores, resumen y navegación a apartados existentes.
- [x] Comprobar la semántica de todas las tablas y los títulos de todos los desplegables, además de MathJax, enlaces locales y foco de la práctica.
- [x] Confirmar 60 preguntas base y 12 problemas: ocho originales adaptados y cuatro ampliaciones.
- [x] Corregir el texto de estado del índice y el pendiente obsoleto del banco base en la colección de problemas.
- [x] Actualizar la regresión histórica de ejercicios para contar doce sin perder la separación de los ocho originales.
- [x] Verificar Chrome, raíz/subcarpeta, móvil al 200 % y lectura sin JavaScript.
- [x] Actualizar plan, README, auditorías, procedencia y verificación.
- [ ] Revisar el material original restante por archivo y la calidad editorial de test/problemas; validar manualmente con lector de pantalla.

### 2026-10-18 · test/fix/docs: cerrar entrega 155

- test: la auditoría transversal comprueba ahora roles editoriales, todos los encabezados de tablas, desplegables y destinos de fragmentos; pasan también 60 preguntas y 12 problemas.
- fix: el índice refleja la pasada editorial de las diez lecciones y la colección deja de pedir ampliar un banco base que ya alcanzó 60.
- docs: el tema continúa parcial por revisión de fuentes, calidad editorial de evaluaciones y validación manual de accesibilidad.

### 2026-10-18 · Entrega 156 · análisis global de cumplimiento del plan

- [x] Contrastar prompt maestro, tareas iniciales, catálogos, código y auditorías.
- [x] Calcular los recuentos reales por tema y separar contenido revisado, parcial y funciones sin implementar.
- [x] Distinguir las carencias sujetas a reutilización de los requisitos activos de producto.
- [x] Ejecutar los 71 archivos unitarios: 297 pruebas, 247 superadas y 50 fallidas.
- [x] Identificar 49 fallos de recuentos históricos y una discrepancia de tres alternativas frente a cuatro en Probabilidad; sin dar por certificadas las aserciones posteriores.
- [x] Documentar el estado de PDF, administración, búsqueda, práctica, voz, idiomas, apoyos, diseño y publicación.
- [x] Conciliar seis casillas antiguas de juegos ya desarrollados y verificados.
- [x] Crear docs/estado-proyecto.md y el informe de pendientes, con prioridades y criterios de salida.
- [x] Sanear la batería global de pruebas, las incidencias con ID duplicado y los textos actuales de estado (T01, entrega 157).
- [ ] Normalizar dificultades, destrezas y metadatos completos para los filtros (T10).
- [ ] Avanzar en administración/visibilidad y en la primera pareja de PDF antes de declarar listo el producto completo.

### 2026-10-18 · docs: cerrar entrega 156

- docs: diagnóstico de cumplimiento guardado en docs/analisis-pendientes-plan-2026-10-18.md; se crea un resumen canónico de estado.
- audit: 86 lecciones con contenido, 58 revisadas y 28 parciales; 398 preguntas, 405 tarjetas, 19 juegos y ningún PDF final en la web.
- test: la ejecución global revela 50 fallos; quedan registrados con su causa observada y no se presentan como resueltos.

### 2026-10-18 · Entrega 157 · T01, base verificable del cierre secuencial

- [x] Crear el plan de cierre en dieciséis tandas, con dependencias y criterios de salida.
- [x] Centralizar las expectativas editoriales por tema y migrar 49 archivos unitarios.
- [x] Descubrir todos los archivos unitarios desde la ejecución habitual.
- [x] Añadir el cuarto distractor explicado en las 60 preguntas de Probabilidad; conservar por huella el contenido anterior.
- [x] Corregir la procedencia de la pregunta 36 y registrar los destinos de tres bloques de repaso.
- [x] Conciliar M13/M14, retirar el byte NUL del informe de inferencia y corregir textos de estado.
- [x] Superar 302 pruebas de 73 archivos, sin fallos.
- [x] Superar en Chrome el banco de 60 preguntas y la auditoría de las diez lecciones.
- [x] Actualizar plan de tandas, estado canónico, procedencia y verificación.
- [x] T02: preparar el esquema de visibilidad y sus contratos, antes del panel de T03 (entrega 158).

### 2026-10-18 · test/fix/docs: cerrar T01

- test: 302/302 pruebas; el contrato conserva cantidades por tema e IDs únicos, además de comprobar referencias y opciones.
- feat: cuatro alternativas por pregunta de Probabilidad, con respuestas y ayudas previas conservadas.
- fix: M13/M14 son distintos y la pregunta 36 remite a su fuente correcta.
- docs: T02–T16 permanecen abiertas; el guardado central y los PDF requieren sus propias pruebas de cierre.

### 2026-10-18 · Entrega 158 · T02, contratos de catálogo y visibilidad

- [x] Registrar 144 páginas, 398 preguntas y 405 tarjetas con IDs normalizados, conservando los originales.
- [x] Unificar el control de cada widget y su página anfitriona, con dependencia del tema.
- [x] Separar revisión editorial de visibilidad y conservar elecciones individuales al ocultar/mostrar un padre.
- [x] Validar esquemas, rutas, referencias, ciclos, audiencias, opciones y versiones.
- [x] Preparar examen/solución con dependencia obligatoria; dejar vacío el manifiesto real hasta verificar PDF.
- [x] Crear repositorio de consultas, lector estático con respaldo y adaptador en memoria para desarrollo.
- [x] Probar conflictos simultáneos, instantáneas, observadores, fallos de lectura y tiempos máximos.
- [x] Superar 329 pruebas en 76 archivos y la comprobación de Chrome desde raíz/subcarpeta.
- [x] Documentar contratos, límites y tareas de integración de T03.
- [x] T03: implementar panel y aplicar visibilidad a las vistas y rutas públicas (entrega 159).
- [ ] T04: comprobar autenticación, permisos, persistencia compartida, propagación e historial reales.

### 2026-10-18 · feat/test/docs: cerrar T02

- feat: catálogo de 947 entidades; herencia y dependencias sin mezclar publicación con revisión editorial.
- feat: contrato común de lectura/guardado, versiones y conflictos; respaldo estático y memoria identificada como desarrollo.
- test: 329/329 pruebas, más Chrome en raíz/subcarpeta; el conjunto conserva contenido, diseño, fórmulas y preferencias.
- docs: arquitectura y verificación de entrega 158; siguiente tanda T03 desglosada. El guardado central y los PDF siguen pendientes.

### 2026-10-20 · Entrega 159 · T03, panel y filtrado público

- [x] Separar configuración guardada, borrador y vista previa, con descarte y confirmación.
- [x] Implementar árbol, búsqueda y estados de visibilidad individual y heredada.
- [x] Preparar autorización, lectura/guardado y comparación explícita ante conflictos.
- [x] Identificar la prueba local como no publicada; no abrir controles administrativos en el despliegue sin servicio.
- [x] Aplicar visibilidad a menús, índices, enlaces, preguntas, tarjetas, páginas directas y widgets.
- [x] Permitir terminar partidas iniciadas y bloquear las siguientes al ocultar el juego.
- [x] Registrar la lectura existente de Inferencia; 145 páginas y 948 entidades, sin preguntas ni tarjetas nuevas.
- [x] Vincular las 80 preguntas de lectura con el banco y sus temas; comprobar integridad de todos los HTML curriculares.
- [x] Verificar teclado, foco, reflujo móvil al 200 %, raíz/subcarpeta, errores y carga de los 28 widgets.
- [x] Superar 341 pruebas de 77 archivos, las regresiones de MathJax, Límite Express y Tangente Sprint.
- [x] Registrar guía, arquitectura, evidencia y siguiente integración.
- [ ] T04: configurar y verificar administración central real, permisos, propagación, historial y restauración.
- [x] T05: piloto de examen/soluciones completado en la entrega 160.

### 2026-10-20 · feat/fix/test/docs: cerrar T03

- feat: panel y filtrado público conectados; borradores y vista previa sin alterar la publicación.
- fix: lecturas estáticas y accesos directos comparten las decisiones de visibilidad; sin pérdida de elecciones de los hijos.
- test: 341/341 pruebas; Chrome valida panel, rutas, lecturas y 28 widgets; pasan concurrencia/recuperación de LaTeX y ambos juegos con reloj.
- docs: T03 cerrada; el panel compartido permanece incompleto hasta T04. Los originales, el diseño general y el historial inactivo del alumnado se conservan.

## Entrega 160 · Piloto LaTeX/PDF

Primera pareja de Recuperación T1 revisada y compilada: cinco páginas inspeccionadas, tangente corregida y monotonía por ramas precisada. Originales conservados, proceso repetible sin conexión y dos registros etiquetados en el catálogo (950 entidades). Pasan 341 pruebas y la comprobación de raíz/subcarpeta en Chrome. [Auditoría y siguiente lote](docs/auditoria-pdf-recuperacion-t1.md). T05 cerrada; T06 continúa con F029/F030. Biblioteca T07 y administración central T04 pendientes.

## Entrega 161 · T06, lote 01

F029/F030 conciliados: dos documentos y conversación en las soluciones originales, rama racional recuperada, M06/M13 corregidas y M16 precisada. Dos PDF nuevos con seis páginas revisadas; proceso por lotes con comprobación de originales y fuentes incrustadas. Cuatro PDF, 952 entidades y 341 pruebas superadas. [Auditoría y siguiente lote F025/F026](docs/auditoria-pdf-subida-nota-t1-general.md). T06 sigue abierta: 26 paquetes pendientes.

## Entrega 162 · T06, lote 02

F025/F026, SELs I, revisados y compilados en copias conservando los originales. Resultados confirmados por sustitución y eliminación racional, con 79 casos del parámetro. Cinco páginas comprobadas visualmente y aclaración económica documentada. Seis PDF revisados, tres parejas y 954 entidades. Pasan 341 pruebas y Chrome verifica los seis PDF desde raíz y subcarpeta. [Auditoría y siguiente lote F027/F028](docs/auditoria-pdf-sistemas-sels-i.md). T06 abierta: 24 paquetes pendientes.

## Entrega 163 · T06, lote 03

F027/F028, SELs II, revisados y compilados: cinco páginas inspeccionadas, resultados originales confirmados y contradicción de lambda=5 explícita. Contraste racional con 79 casos. Ocho PDF, cuatro parejas y 956 entidades; 341 pruebas superadas y HTTP comprobado en Chrome desde raíz/subcarpeta. Registro de los 30 ZIP con huellas y estados: ocho revisados, 22 pendientes. [Auditoría y siguiente lote F019/F021](docs/auditoria-pdf-sistemas-sels-ii.md). T06 continúa abierta.

## Entrega 164 · T06, lote 04

F019/F021, Programación Lineal I: orden, puntuación y optatividad conciliados (M17); frontera estricta de misiones corregida (M07). Recintos y óptimos contrastados mediante fracciones, certificados y enumeración entera. Seis páginas revisadas, diez PDF en cinco parejas y 958 entidades. Pasan 341 pruebas y la comprobación de los diez PDF en Chrome desde raíz/subcarpeta. [Auditoría y siguiente lote F020/F022](docs/auditoria-pdf-programacion-lineal-i.md). Diez paquetes tratados, veinte pendientes; T06 continúa abierta.

## Entrega 165 · T06, lote 05

F020/F022 conciliados: misiones formulado sin resolver y variante de frutos rojos conservada en anexo no evaluable. M18 corrige la correspondencia; M07 atendida en ambas parejas PL. M19 señala costes ausentes para beneficio neto, sin inventarlos. Seis páginas revisadas y PDF reproducibles; doce PDF, seis parejas y 960 entidades. Pasan 341 pruebas y la comprobación HTTP en Chrome. [Auditoría y siguiente lote F014/F015](docs/auditoria-pdf-programacion-lineal-ii.md). Doce paquetes tratados, dieciocho pendientes; T06 continúa abierta.

## Entrega 166 · T06, lote 06

F014/F015, Matrices I y II, son exámenes distintos sin soluciones en sus ZIP. Se elaboran dos solucionarios nuevos identificados y comprobados por métodos exactos independientes. Cuatro PDF y ocho páginas revisadas; se conserva la elección de cuatro operaciones y el exponente 2025. Dieciséis PDF en ocho parejas, 964 entidades y 341 pruebas superadas; Chrome verifica los archivos desde raíz/subcarpeta. [Auditoría y siguiente lote F016](docs/auditoria-pdf-matrices-i-ii.md). Catorce paquetes tratados, dieciséis pendientes; T06 abierta.

## Entrega 167 · T06, lote 07

F016, Matrices III: examen conservado y solucionario nuevo identificado, cuatro páginas revisadas. Factor común, ecuación, potencias, dimensiones y parámetros contrastados; 81 exponentes comprobados y Matrices I/II sin regresión. Dieciocho PDF en nueve parejas, 966 entidades y 341 pruebas superadas. Chrome verifica los archivos desde raíz/subcarpeta. [Auditoría y siguiente lote F006/F007](docs/auditoria-pdf-matrices-iii.md). Quince paquetes tratados, quince pendientes; T06 abierta.

## Entrega 168 · T06, lote 08

F006/F007 contienen exámenes distintos: ambos conservados y con solucionarios nuevos identificados. Se verifican funciones, huecos, asíntotas, derivabilidad y temperatura; M20 explicita la hipótesis necesaria sobre el corte eléctrico. Variante bursátil comentada conservada en anexo no evaluable. Cuatro PDF y doce páginas revisadas, 970 entidades y 341 pruebas superadas. Chrome verifica los veintidós PDF. [Auditoría y siguiente lote F008/M14](docs/auditoria-pdf-funciones.md). Diecisiete paquetes revisados, trece pendientes; T06 abierta.

## Entrega 169 · T06, lote 09

F008, Límites y Derivadas: examen preservado y solucionario nuevo, nueve páginas revisadas. M14 corregida en copia/PDF: aproximación a distancia cero sin llegada en tiempo finito. Derivadas y límites activos y comentados contrastados; 58 evaluaciones por diferenciación automática. Se conserva la corrección de las cuatro primeras respuestas de cada bloque. Veinticuatro PDF en doce parejas, 972 entidades y 341 pruebas superadas; Chrome verifica raíz/subcarpeta. [Auditoría y siguiente lote F002/F003](docs/auditoria-pdf-limites-derivadas.md). Dieciocho paquetes tratados, doce pendientes; T06 abierta.

## 2026-10-21 · cierre documental de entrega 170

F002/F003 revisados: M02/M03 corregidas en copias, cuatro PDF y ocho páginas inspeccionadas. Total: 20/30 paquetes, 28 PDF en 14 parejas; 341 pruebas pasan. Siguiente lote F017/F018. Índice operativo: TAREAS.md.

## 2026-10-21 · fix/build/test/docs: entrega 171, Probabilidad F017/F018

Variantes y optatividad conservadas; soluciones revisadas con tablas. M21: 343/469 se redondea a 0,7313; M22: interpretación uniforme entre jamones explicitada, mejora de redacción original pendiente. Cuatro PDF y doce páginas revisadas; recompilación idéntica sin conexión. 341 pruebas pasan; Chrome verifica 32 PDF desde raíz/subcarpeta. Total: 22/30 paquetes revisados, ocho pendientes; 980 entidades. Siguiente lote: F009, M04/M05. Índice: TAREAS.md.

## 2026-10-21 · fix/feat/build/test/docs: entrega 172, F009

Nueve ejercicios conservados. M04/M05 corregidas (sumas 144 y 110), extremos M24 y decimales de llaves M26 corregidos; recinto M25 completado. M23 abierta: 22,5 puntos sin regla de elección o conversión; no se inventa nota sobre 10. Dos PDF y quince páginas revisadas; recompilación idéntica sin conexión. 341 pruebas pasan y Chrome verifica 34 PDF desde raíz/subcarpeta. Total: 23/30 paquetes revisados, siete pendientes; 982 entidades. Próximo lote F011/F012. Índice: TAREAS.md.

## 2026-10-22 · fix/build/test/docs: entrega 173, F011/F012

Inferencia I/II conservadas con 10 puntos, apartados y 55 minutos. M27: suma 1620, media 180 e intervalo corregido en F012; M28: precisión muestral matizada en ambas copias. Cuatro PDF y diez páginas revisadas; recompilación idéntica sin conexión. 341 pruebas pasan; Chrome verifica 38 PDF en raíz/subcarpeta. Total: 25/30 paquetes revisados, cinco pendientes; 986 entidades. Próximo lote F010/F013. Índice: TAREAS.md.

## 2026-10-22 · fix/build/test/docs: entrega 174, F010/F013

Ocho enunciados compartidos cotejados; puntuación propia conservada. M27/M28 extendidas a F010; M29 corregida. M30 explica tamaño 144 de tabla y compatibilidad 143/144/145 con extremos redondeados; M31 abierta, 18 puntos sin regla de evaluación. Cuatro PDF y catorce páginas revisadas; recompilación idéntica sin conexión. 341 pruebas pasan; Chrome verifica 42 PDF en raíz/subcarpeta. Total: 27/30 paquetes revisados, tres pendientes; 990 entidades. Próximo lote F004/F005. Índice: TAREAS.md.

## 2026-10-22 · fix/feat/build/test/docs: entrega 175, F004/F005

F004 conserva dos exámenes separados de 10 puntos; soluciones revisadas, gráficas elaboradas y temperatura positiva corregida a ocho horas. Criterios ausentes y supuestos eléctricos explícitos. F005 recibe solucionario nuevo y anexo comentado no evaluable; puntuación discrepante del anexo señalada. Cuatro PDF y 21 páginas revisadas; recompilación idéntica sin conexión. 341 pruebas pasan y Chrome verifica 46 PDF desde raíz/subcarpeta. Total: 29/30 paquetes, uno pendiente; 994 entidades. Siguiente F001 y M01. Índice: TAREAS.md.

## 2026-10-22 · fix/build/test/docs: entrega 176, F001 y cierre T06

M01 corregida: rama válida, sin asíntota en 1 y sin monotonía global. M37: tartas (20,40), 680 euros; M38: suma 30,9 y media 3,09. Dos PDF y ocho páginas nuevas revisadas; recompilación idéntica sin conexión. 341 pruebas pasan; Chrome verifica 48 PDF. Auditoría conjunta: 30/30 originales, 24 parejas, 48 PDF y 154 páginas, sin paquetes pendientes. Catálogo 996 entidades. T06 cerrada con carencias originales documentadas; accesibilidad semántica PDF pendiente. Siguiente T07, biblioteca con búsqueda/filtros/etiquetas. Índice: TAREAS.md.
