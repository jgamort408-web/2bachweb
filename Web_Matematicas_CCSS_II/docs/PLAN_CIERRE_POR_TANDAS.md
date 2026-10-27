# Plan de cierre por tandas

Inicio: 18 de octubre de 2026. Basado en el [diagnóstico global](analisis-pendientes-plan-2026-10-18.md) y subordinado a las instrucciones del usuario y al [plan general](../PLAN_DE_ACCION.md).

## Forma de trabajar

Cada tanda sigue esta secuencia: leer requisitos y fuentes → registrar alcance → implementar → comprobar matemáticas y funcionamiento → revisar el resultado → actualizar estado y diario. Una tanda se cierra con archivos concretos, resultados de pruebas y limitaciones. Un fallo pendiente mantiene abierta su casilla.

Los originales se conservan. Los cambios de código y contenido se separan de la conexión a servicios reales. Toda integración sin configurar queda identificada; una simulación de pruebas no acredita su funcionamiento en producción.

Se mantiene el diseño provisional. En programación lineal, estadística bidimensional, distribuciones e inferencia se reutiliza el material original y se documentan los huecos sin inventar contenido para alcanzar cuotas. El alumnado sigue sin cuentas ni historial persistente.

## Secuencia y criterios de salida

| Tanda | Alcance | Dependencia | Criterio de salida | Estado |
|---|---|---|---|---|
| T01 | Sanear pruebas, discrepancia de cuatro alternativas, incidencias y estado | Diagnóstico 156 | Batería unitaria completa en verde; banco t07 con cuatro alternativas distintas y justificadas; IDs de incidencias únicos; documentación coherente | Cerrada · entrega 157 |
| T02 | Contratos de catálogo y visibilidad | T01 | Esquema versionado, respaldo estático, herencia y dependencias, adaptador local de pruebas y validación de datos | Cerrada · entrega 158 |
| T03 | Panel administrativo y filtrado público | T02 | Árbol de contenidos, borrador, vista previa, guardar/descartar, conflictos y visibilidad aplicada a navegación y actividades; estado honesto sin servicio real | Cerrada · entrega 159 |
| T04 | Conectar administración central | T03 y configuración externa real | Autenticación y autorización probadas; escrituras denegadas a visitantes; guardado y propagación en dos navegadores; historial y restauración | Pendiente de servicio real |
| T05 | Piloto editorial LaTeX/PDF | T01 | Una pareja examen/soluciones conciliada, corregida, compilada y revisada página a página; proceso y catálogo reproducibles | Cerrada · entrega 160 |
| T06 | Completar paquetes LaTeX por lotes pequeños | T05 | Repetir lotes de hasta dos paquetes, conciliando variantes; registrar los 30 paquetes y todos sus PDF finales | Cerrada · lotes 01–16 y piloto · entrega 176 |
| T07 | Biblioteca de recursos y exámenes | T02, T05 | Manifiesto, etiquetas, búsqueda, filtros y acciones separadas de examen/solución; dependencias de visibilidad comprobadas | Pendiente |
| T08 | Migrar combinatoria y cerrar fuentes | T01 | Original de combinatoria integrado con calculadora y juego; matriz de material conservado, fusionado o pendiente por fuente | Pendiente |
| T09 | Revisión editorial de evaluaciones | T01, T08 | Revisar por lotes las preguntas y problemas, distractores, hipótesis, redondeo y correspondencia con fuentes; mantener registro individual | Pendiente |
| T10 | Metadatos y buscador común | T02, T09 | IDs, tema, epígrafe, dificultad y destreza validados; índice de búsqueda sin enlaces ocultos ni resultados huérfanos | Pendiente |
| T11 | Práctica, reto y simulacro | T10 | Selección de actividades, repetición de errores de sesión, reto opcional y simulacro con corrección al final; navegación por teclado | Pendiente |
| T12 | Tarjetas y herramientas | T10 | Filtros, reaprendizaje de sesión, programador futuro inactivo, formulario y glosario enlazados; conciliación de conceptos | Pendiente |
| T13 | Accesibilidad transversal | T03, T07, T11, T12 | Controles completos, teclado, foco, contraste, reflujo e impresión; validación manual con lector de pantalla registrada | Pendiente |
| T14 | Idiomas y lectura en voz alta | T13 | Contenido activo y fórmulas con lectura verbal revisada; controles de voz y arquitectura de idioma; integraciones reales solo cuando estén configuradas | Pendiente |
| T15 | Widgets restantes y cierre curricular | T08, T09 | Reutilizar las actividades originales disponibles; registrar expresamente las carencias sin fuente; probar widgets solos e insertados | Pendiente |
| T16 | Diseño final y publicación | T04, T06–T15 | Diseño abordado en su fase expresa, batería completa, documentación docente/técnica y despliegue real de Pages verificados | Pendiente |

La ejecución es secuencial y acumulativa. Si una conexión externa de T04 o T14 necesita datos aún no disponibles, se mantiene esa tanda abierta y se continúa con el siguiente trabajo independiente; no se sustituye la integración por una demostración local.

## T01 · Base verificable

- [x] Registrar tandas, dependencias y criterios de salida.
- [x] Centralizar expectativas del catálogo sin deducirlas del propio banco.
- [x] Actualizar las pruebas antiguas conservando sus comprobaciones por tema y de unicidad.
- [x] Incluir todos los archivos unitarios en la ejecución habitual.
- [x] Añadir y revisar el cuarto distractor de cada pregunta de Probabilidad; conservar enunciados y respuestas correctas.
- [x] Comprobar diferencias numéricas entre alternativas y recorrer las 60 preguntas en navegador.
- [x] Conciliar las incidencias M13/M14 y limpiar el byte NUL del informe de inferencia.
- [x] Corregir textos de recuentos y actualizar fecha de catálogo.
- [x] Ejecutar la batería completa y registrar resultados.
- [x] Cerrar T01 y señalar la siguiente tanda.

## T02 · Contratos de catálogo y visibilidad

- [x] Definir entidades visibles e IDs estables, con esquema y versión.
- [x] Separar revisión editorial de visibilidad y establecer configuración de respaldo.
- [x] Resolver herencia: un padre oculto oculta a sus hijos sin borrar su elección individual.
- [x] Definir dependencias entre examen y solución, y entre páginas y actividades.
- [x] Crear repositorio de configuración sustituible, con validación y control de versión para conflictos.
- [x] Probar modelos con adaptador de desarrollo, sin acreditar todavía persistencia central real.
- [x] Documentar la interfaz que utilizará el panel de T03.

Contrato y límites: [arquitectura de visibilidad](arquitectura-visibilidad.md). Evidencia: [entrega 158](verificacion-entrega-158.md).

## T03 · Panel y aplicación pública

- [x] Cargar una configuración común y tratar fallos y respaldo de forma explícita.
- [x] Construir el árbol con estados individuales, efectivos, dependencias y accesos permanentes.
- [x] Separar publicación, borrador y vista previa; permitir descartar sin alterar la publicación.
- [x] Mostrar el estado real del servicio y no anunciar guardado global con el adaptador estático.
- [x] Preparar guardar, relectura y resolución de conflictos conservando el borrador.
- [x] Aplicar la visibilidad a navegación, índices, preguntas, tarjetas, juegos y enlaces.
- [x] Controlar rutas directas e iframes; permitir acabar partidas activas y bloquear nuevas rondas ocultas.
- [x] Comprobar teclado, foco, raíz/subcarpeta y ausencia de regresiones en fórmulas.
- [x] Registrar lo que T04 debe verificar con autenticación y persistencia reales.
- [x] Conciliar todas las páginas curriculares y las 80 copias de preguntas de lectura con los IDs existentes.

Guía y límites: [administración y visibilidad](administracion-y-visibilidad.md). Evidencia: [entrega 159](verificacion-entrega-159.md).

## T04 · Administración central · siguiente integración

- [ ] Seleccionar y configurar el servicio real y las identidades administrativas autorizadas.
- [ ] Incorporar autenticación administrativa sin cuentas de alumnado y sin marcas locales que concedan permisos.
- [ ] Sustituir el adaptador estático por el repositorio central; denegar escrituras a visitantes desde el servidor.
- [ ] Confirmar publicaciones con versión, conflictos y borradores conservados durante fallos.
- [ ] Verificar propagación en dos navegadores y recuperación de la última configuración pública conocida.
- [ ] Implementar historial administrativo y restauración con control de versión y permisos.
- [ ] Integrar los controles avanzados de orden y destacados previstos en el contrato.
- [ ] Probar cierre de sesión, acceso denegado y ausencia de credenciales privadas en el despliegue.
- [ ] Registrar pruebas reales; mantener T04 abierta mientras no exista persistencia compartida comprobada.

No se ha encontrado un proveedor central configurado en el proyecto. Mientras falte esa configuración, el siguiente trabajo independiente es T05, piloto LaTeX/PDF, conforme a la regla de secuencia anterior.

## Diario

### 2026-10-18 · plan: iniciar cierre secuencial

- Se inicia T01 a partir de 297 pruebas: 247 superadas y 50 fallidas.
- No se consideran cerradas las tandas futuras por existir sus carpetas o páginas reservadas.

### 2026-10-18 · test/fix/docs: cerrar T01 · entrega 157

- test: 73 archivos unitarios descubiertos automáticamente; 302 pruebas superadas, cero fallos.
- test: contrato editorial independiente por tema, unicidad de IDs, cuatro alternativas, referencias válidas y conservación por huella del contenido previo de las 60 preguntas.
- fix: 49 pruebas usan expectativas centrales; se formalizan los tres destinos de repaso de 24 preguntas.
- feat: cuarto distractor explicado en cada pregunta de Probabilidad; enunciados, respuestas, pistas y explicaciones previas conservados.
- fix: fuente de la pregunta 36 corregida al archivo de tablas y árboles; M13/M14 conciliados y byte NUL eliminado.
- browser: pasan banco de 60 preguntas y auditoría transversal, con raíz/subcarpeta, móvil, fórmulas y lectura estática.
- next: T02, contratos de visibilidad; administración central y PDF continúan pendientes en sus tandas.

### 2026-10-18 · feat/test/docs: cerrar T02 · entrega 158

- feat: catálogo normalizado de 947 entidades con IDs estables y un control compartido por anfitrión/widget.
- feat: visibilidad separada de revisión editorial, ocultación por dependencias y conservación de elecciones individuales.
- feat: contrato de parejas examen/solución y manifiesto vacío a la espera de PDF verificados.
- feat: repositorios sustituibles, respaldo estático validado y adaptador de memoria con control de conflictos.
- test: 76 archivos unitarios, 329 pruebas superadas y cero fallos; 27 pruebas nuevas de contratos.
- browser: pasan lectura real, respaldo, módulos y rutas desde raíz/subcarpeta; sin almacenamiento del alumnado ni cambios en las fórmulas.
- docs: contratos y límites documentados; T03 queda desglosada como siguiente tanda. El filtrado público y el panel aún no están activados.

### 2026-10-20 · feat/fix/test/docs: cerrar T03 · entrega 159

- feat: árbol de contenidos, búsqueda, estados heredados, borrador, descarte y comparación con resolución explícita de conflictos.
- feat: vista previa navegable de desarrollo y guardado en memoria identificado como no publicado; sin edición administrativa operativa en el despliegue público.
- feat: configuración común aplicada a menús, índices, enlaces, test, tarjetas, rutas y widgets; partidas activas conservadas y siguientes bloqueadas.
- fix: lectura de Inferencia registrada con ID propio; 948 entidades y 173 HTML de páginas/widgets con comprobación inicial.
- fix: lecturas de Probabilidad e Inferencia vinculadas a sus 80 IDs del banco y a sus temas, evitando accesos alternativos a preguntas ocultas.
- fix: reflujo del panel al 200 %, conservación del foco ante lecturas idénticas y referencias cruzadas sin borrar argumentos matemáticos.
- test: 77 archivos y 341 pruebas superadas; Chrome verifica raíz/subcarpeta, panel, rutas, lecturas y carga de los 28 widgets.
- test: pasan recuperación y concurrencia de LaTeX, test completo de 398 preguntas, Límite Express y Tangente Sprint.
- docs: guía de uso, verificación y estado actualizados. T04 permanece pendiente de servicio real; T05 es el siguiente trabajo independiente.

## T05 · Piloto editorial cerrado · entrega 160

- [x] Elegir F023/F024 y conservar los originales con huellas.
- [x] Conciliar puntos, duración, datos y cuatro apartados.
- [x] Corregir M08 y documentar M15 en copias revisadas.
- [x] Compilar examen y soluciones con validación técnica y matemática.
- [x] Revisar visualmente las cinco páginas.
- [x] Recompilar sin conexión y confirmar idénticas huellas.
- [x] Registrar pareja, etiquetas y dependencia; comprobar catálogo y rutas.
- [x] Ejecutar pruebas y documentar limitaciones y siguiente lote.

### 2026-10-20 · feat/fix/test/docs: cerrar T05 · entrega 160

- feat: primera pareja PDF revisada; examen de una página y soluciones de cuatro.
- fix: tangente y=8x-10 y monotonía por ramas; originales intactos.
- build: compilación local repetible, validación previa y huellas deterministas.
- test: 341 pruebas pasan; catálogo de 950 entidades y raíz/subcarpeta comprobados en Chrome.
- docs: [auditoría y siguiente lote F029/F030](auditoria-pdf-recuperacion-t1.md), [verificación](verificacion-entrega-160.md).
- next: T06, siguiente lote de dos paquetes; 28 paquetes restantes. T04 sigue pendiente de servicio central.

## T06 · Lotes de revisión LaTeX/PDF

- [x] Lote 01: F029/F030, conciliación de variantes, M06/M13, compilación y seis páginas revisadas.
- [x] Registrar originales, respuestas, etiquetas, dependencias y comprobaciones.
- [x] Lote 02: F025/F026, SELs I; revisión algebraica independiente y cinco páginas comprobadas.
- [x] Lote 03: F027/F028, SELs II; matrices y logística, cinco páginas revisadas.
- [x] Registrar los 30 ZIP con huellas y estados individuales en docs/pdf/registro-paquetes.json.
- [x] Lote 04: F019/F021, Programación Lineal 1; optatividad, frontera estricta, regiones y óptimos, seis páginas revisadas.
- [x] Lote 05: F020/F022, Programación Lineal 2; formulación fiel, variante conservada y seis páginas revisadas.
- [x] Lote 06: F014/F015, Matrices I y II; dos exámenes y dos solucionarios nuevos, ocho páginas revisadas.
- [x] Lote 07: F016, Matrices III; examen y solucionario nuevo, cuatro páginas revisadas.
- [x] Lote 08: F006/F007, dos exámenes distintos y soluciones nuevas, doce páginas revisadas y anexo conservado.
- [x] Lote 09: F008, Límites y Derivadas; M14 corregida, nueve páginas revisadas y alternativas comentadas conservadas.
- [x] Lote 10: F002/F003, Distribuciones; M02/M03 corregidas y ocho páginas revisadas.
- [x] Lote 11: F017/F018, Probabilidad; variantes y optatividad conservadas, doce páginas revisadas.
- [x] Lote 12: F009; M04/M05 y otras correcciones, gráfico completado y quince páginas revisadas.
- [x] Lote 13: F011/F012; M27/M28, cuatro PDF y diez páginas revisadas.
- [x] Lote 14: F010/F013; ocho coincidencias cotejadas, carencias explícitas y catorce páginas revisadas.
- [x] Lote 15: F004/F005; dos exámenes de repaso, solucionario final nuevo y anexo; 21 páginas revisadas.
- [x] Lote 16: F001, M01/M37/M38; ocho páginas revisadas e inventario completo de los 30 paquetes.
- [x] Continuar lotes pequeños hasta conciliar los 30 paquetes y todos sus documentos.
- [x] Cerrar T06 únicamente con el inventario completo y los PDF revisados.

### 2026-10-20 · feat/fix/build/test/docs: T06 lote 01 · entrega 161

- fix: rama racional y parámetros 1,1 fieles a F030; primitiva con valor absoluto y dominio.
- fix: M16, crecimiento por ramas; conversación y duplicado de F029 conciliados, originales conservados.
- build: configuración por lote, huellas de originales y fuentes incrustadas verificadas; piloto anterior recompilado sin regresión.
- feat: dos PDF y seis páginas revisadas; cuatro recursos y 952 entidades en total.
- test: 341 pruebas superadas; Chrome comprueba catálogo y HTTP PDF desde raíz/subcarpeta.
- docs: [auditoría y siguiente lote](auditoria-pdf-subida-nota-t1-general.md), [verificación](verificacion-entrega-161.md).
- next: F025/F026. Cuatro paquetes tratados, 26 pendientes; T06 abierta y T04 pendiente de servicio real.

### 2026-10-20 · feat/build/test/docs: T06 lote 02 · entrega 162

- feat: pareja SELs I fiel a los originales; pasos, comprobaciones y contradicción de rangos explícitos.
- docs: interpretación económica de los importes conservada y aclarada; no se altera ningún resultado correcto.
- build: originales y recurso gráfico comprobados, cinco páginas revisadas y PDF reproducibles sin conexión.
- test: eliminación racional, sustitución y 79 casos del parámetro; regresión de las parejas anteriores superada.
- test: 341 pruebas pasan; Chrome comprueba catálogo y seis PDF desde raíz y subcarpeta.
- docs: [auditoría](auditoria-pdf-sistemas-sels-i.md) y [verificación](verificacion-entrega-162.md).
- next: lote 03 F027/F028. Seis paquetes tratados, 24 pendientes; T06 abierta.

### 2026-10-20 · feat/build/test/docs: T06 lote 03 · entrega 163

- feat: pareja SELs II fiel a los originales, comprobaciones completas y contradicción 0=-2 para lambda=5.
- build: cinco páginas revisadas, logo y originales comprobados, PDF reproducibles sin conexión.
- test: sustitución y eliminación racional con 79 casos del parámetro; SELs I sigue superando la verificación.
- feat: registro de los 30 paquetes con huellas, estados y vínculos a procedencia, informes y recursos revisados.
- test: 341 pruebas pasan; Chrome comprueba catálogo y los ocho PDF desde raíz y subcarpeta.
- docs: [auditoría](auditoria-pdf-sistemas-sels-ii.md) y [verificación](verificacion-entrega-163.md).
- next: lote 04 F019/F021. Ocho paquetes tratados, 22 pendientes; T06 abierta.

### 2026-10-20 · fix/build/test/docs: T06 lote 04 · entrega 164

- fix: M17, orden y puntuación fieles a F021: un obligatorio y uno optativo, máximo 10 puntos.
- fix: M07, inversión >2 millones; frontera excluida y decisiones enteras distinguidas, máximo (4,16) confirmado.
- test: intersecciones racionales, certificados de óptimos y enumeración de 9 y 686 casos enteros factibles.
- build: seis páginas revisadas; signos de interrogación corregidos y comprobados; PDF idénticos sin conexión.
- test: 341 pruebas pasan; Chrome verifica catálogo y los diez PDF desde raíz y subcarpeta.
- docs: [auditoría](auditoria-pdf-programacion-lineal-i.md), [verificación](verificacion-entrega-164.md) y registro de paquetes actualizados.
- next: F020/F022. Diez paquetes tratados, 20 pendientes; T06 abierta y M07 pendiente en la siguiente pareja.

### 2026-10-20 · fix/build/test/docs: T06 lote 05 · entrega 165

- fix: M18, misiones formulado fiel a F022; frutos rojos conservados en anexo no evaluable, sin resolver.
- fix: M07 atendida en ambas parejas PL; inversión estricta y formulación sin resolver diferenciadas.
- docs: M19, faltan costes para beneficio neto en frutos rojos; se formula ingreso y se indica la mejora pendiente sin inventar datos.
- build: seis páginas revisadas, fuentes incrustadas y PDF reproducibles sin conexión; PL I sigue pasando sus comprobaciones.
- test: 686 decisiones de baterías y equivalencia de formulación en 364 casos de misiones y 3025 de frutos rojos.
- test: 341 pruebas pasan; Chrome verifica catálogo y doce PDF desde raíz y subcarpeta.
- docs: [auditoría](auditoria-pdf-programacion-lineal-ii.md), [verificación](verificacion-entrega-165.md) y registro de paquetes actualizados.
- next: F014/F015, Matrices I y II. Doce paquetes tratados, 18 pendientes; T06 abierta.

### 2026-10-20 · feat/build/test/docs: T06 lote 06 · entrega 166

- feat: dos solucionarios nuevos identificados como elaborados, al no existir soluciones en F014/F015.
- feat: exámenes conservados con cuatro operaciones elegibles de cinco, 10 puntos, 55 minutos y exponente 2025.
- test: inversas por dos métodos y productos por ambos lados; ecuaciones, operaciones no definidas, nilpotencia y parámetros verificados exactamente.
- build: cuatro PDF y ocho páginas revisadas; recompilación idéntica sin conexión. PL II mantiene sus resultados.
- test: 341 pruebas pasan; Chrome verifica catálogo y dieciséis PDF desde raíz y subcarpeta.
- docs: [auditoría](auditoria-pdf-matrices-i-ii.md), [verificación](verificacion-entrega-166.md) y registro individual actualizados.
- next: F016 en lote de un paquete para cerrar matrices. Catorce paquetes tratados, dieciséis pendientes; T06 abierta.

### 2026-10-20 · feat/build/test/docs: T06 lote 07 · entrega 167

- feat: solucionario nuevo de F016 identificado; original preservado y condiciones de evaluación conservadas.
- test: factor común sin permutar factores, inversa por dos métodos y residuo exacto; 81 exponentes contrastados.
- test: operaciones dimensionales, Gram de orden 1 y parámetros por intercambio de filas comprobados.
- build: dos PDF, cuatro páginas revisadas y recompilación idéntica sin conexión; Matrices I/II sin regresión.
- test: 341 pruebas pasan; Chrome verifica catálogo y dieciocho PDF desde raíz y subcarpeta.
- docs: [auditoría](auditoria-pdf-matrices-iii.md), [verificación](verificacion-entrega-167.md) e inventario actualizados.
- next: F006/F007, Funciones y copia. Quince paquetes tratados, quince pendientes; T06 abierta.

### 2026-10-20 · feat/build/test/docs: T06 lote 08 · entrega 168

- feat: F006/F007 conservados como exámenes distintos; dos solucionarios nuevos y variante comentada recuperada en anexo no evaluable.
- test: dominios, hueco, límites laterales, derivabilidad, extremos, curvatura y cálculos de temperatura/cotización contrastados.
- docs: M20, duración del corte condicionada a hipótesis físicas explícitas; no se inventa estado eléctrico.
- build: cuatro PDF y doce páginas revisadas; fuente matemática completada en caché y recompilación idéntica sin conexión.
- test: 341 pruebas pasan; Matrices III sin regresión; Chrome verifica catálogo y veintidós PDF desde raíz/subcarpeta.
- docs: [auditoría](auditoria-pdf-funciones.md), [verificación](verificacion-entrega-168.md) y registro de fuentes actualizados.
- next: F008 y M14. Diecisiete paquetes tratados, trece pendientes; T06 abierta.

### 2026-10-20 · fix/feat/build/test/docs: T06 lote 09 · entrega 169

- fix: M14 corregida en copia LaTeX/PDF; límite cero sin llegada en tiempo finito, unidades preservadas.
- feat: solucionario nuevo, seis derivadas y seis límites activos; doce alternativas comentadas conservadas en anexos no evaluables.
- test: diferenciación automática independiente en 58 evaluaciones, límites, parámetros y rectas contrastados.
- build: nueve páginas revisadas y recompilación idéntica sin conexión. Frases esperadas verificadas independientemente del espaciado extraído.
- test: 341 pruebas pasan; Funciones sin regresión; Chrome verifica catálogo y veinticuatro PDF desde raíz/subcarpeta.
- docs: [auditoría](auditoria-pdf-limites-derivadas.md), [verificación](verificacion-entrega-169.md) e incidencias actualizadas.
- next: F002/F003 y M02/M03. Dieciocho paquetes tratados, doce pendientes; T06 abierta.

### 2026-10-21 · fix/build/test/docs: cierre de entrega 170

- fix: M02/M03 corregidas en copias revisadas.
- build: cuatro PDF, ocho páginas revisadas y recompilación idéntica sin conexión.
- test: 341 pruebas pasan; 28 PDF y 976 entidades comprobados desde raíz/subcarpeta.
- docs: [auditoría](auditoria-pdf-distribuciones.md), [índice operativo](../TAREAS.md) y registro individual.
- next: F017/F018. Veinte paquetes revisados, diez pendientes; T06 abierta.

### 2026-10-21 · fix/build/test/docs: T06 lote 11 · entrega 171

- fix: M21, redondeo 343/469 corregido; M22, interpretación de muestreo explícita y redacción original pendiente de mejora.
- feat: dos variantes y optatividad conservadas; soluciones originales ampliadas con tablas de contingencia.
- test: enumeración independiente de sucesos y alumnado, probabilidad total y Bayes contrastados.
- build: cuatro PDF y doce páginas revisadas; recompilación idéntica sin conexión.
- test: 341 pruebas pasan; Distribuciones I sin regresión; Chrome verifica 32 PDF desde raíz/subcarpeta.
- docs: [auditoría](auditoria-pdf-probabilidad.md), [verificación](verificacion-entrega-171.md) e [índice](../TAREAS.md) actualizados.
- next: F009 y M04/M05. Veintidós paquetes revisados, ocho pendientes; T06 abierta.

### 2026-10-21 · fix/feat/build/test/docs: T06 lote 12 · entrega 172

- fix: M04/M05 corregidas en copia; medias 9 y 11 e intervalos recalculados. M24, extremos; M26, decimales de llaves.
- feat: M25, gráfico y mínimo de 6(b) completados y verificados por recorte exacto.
- docs: M23 abierta; nueve ejercicios y 22,5 puntos sin regla de elección. Hipótesis de muestreo explícita, no atribuida al original.
- test: enumeración de 4005 parejas y 30000 latas, cuantiles independientes, derivadas, área y productos matriciales.
- build: quince páginas revisadas; recompilación idéntica sin conexión.
- test: 341 pruebas pasan; Probabilidad I sin regresión; Chrome verifica 34 PDF desde raíz/subcarpeta.
- docs: [auditoría](auditoria-pdf-recuperacion-inferencia.md), [verificación](verificacion-entrega-172.md) e [índice](../TAREAS.md).
- next: F011/F012. Veintitrés paquetes revisados, siete pendientes; T06 abierta.

### 2026-10-22 · fix/build/test/docs: T06 lote 13 · entrega 173

- fix: M27, suma e intervalo de F012; M28, precisión del diseño probabilístico matizada en F011/F012.
- test: cuantiles independientes, tamaños mínimos y cotas, afijación proporcional y puntuaciones contrastados.
- build: cuatro PDF, diez páginas revisadas y recompilación idéntica sin conexión.
- test: 341 pruebas pasan; F009 sin regresión; Chrome verifica 38 PDF desde raíz/subcarpeta.
- docs: [auditoría](auditoria-pdf-inferencia-i-ii.md), [verificación](verificacion-entrega-173.md) e [índice](../TAREAS.md).
- next: F010/F013; veinticinco paquetes revisados, cinco pendientes. T06 abierta.

### 2026-10-22 · fix/build/test/docs: T06 lote 14 · entrega 174

- review: F010/F013 conciliados con F011/F012, conservando puntos y numeración.
- fix: M27/M28 extendidas a F010; M29 corregida en F013.
- docs: M30 explica ambigüedad de redondeo; M31 abierta, 18 puntos sin regla de evaluación.
- build: cuatro PDF, catorce páginas revisadas y recompilación idéntica sin conexión.
- test: 341 pruebas pasan; Inferencia II sin regresión; Chrome verifica 42 PDF desde raíz/subcarpeta.
- docs: [auditoría](auditoria-pdf-inferencia-recopilaciones.md), [verificación](verificacion-entrega-174.md) e [índice](../TAREAS.md).
- next: F004/F005; veintisiete paquetes revisados, tres pendientes. T06 abierta.

### 2026-10-22 · fix/feat/build/test/docs: T06 lote 15 · entrega 175

- fix: M32, temperatura positiva ocho horas y conclusión condicional corregida; M35, punto angular sin salto.
- docs: M20/M33 mantienen carencias explícitas; M34 aclara tendencia; M36 conserva anexo no evaluable.
- feat: gráficas elaboradas de F004 y solucionario nuevo de F005, con anexo resuelto.
- build: cuatro PDF y 21 páginas revisadas; recompilación idéntica sin conexión.
- test: 341 pruebas pasan; Inferencia General sin regresión; Chrome verifica 46 PDF desde raíz/subcarpeta.
- docs: [auditoría](auditoria-pdf-repaso-y-final.md), [verificación](verificacion-entrega-175.md) e [índice](../TAREAS.md).
- next: F001 y M01. Veintinueve paquetes revisados, uno pendiente; T06 abierta.

### 2026-10-22 · fix/build/test/docs: T06 lote 16 · entrega 176 y cierre

- fix: F001, M01, M37 y M38 corregidas; reglas de evaluación y 90 minutos preservados.
- build: ocho páginas nuevas revisadas y recompilación idéntica sin conexión.
- test: 341 pruebas pasan; Chrome verifica 48 PDF desde raíz/subcarpeta.
- audit: 24 parejas, 48 PDF y 154 páginas superan la comprobación conjunta; 30/30 originales conciliados.
- docs: [auditoría](auditoria-pdf-subida-nota-curso.md), [cierre T06](cierre-t06-latex-pdf.md), [verificación](verificacion-entrega-176.md) e [índice](../TAREAS.md).
- next: T07, biblioteca con búsqueda, filtros, etiquetas y acciones separadas. T04 y accesibilidad semántica PDF mantienen sus pendientes.
