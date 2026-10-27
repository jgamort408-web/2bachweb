# Reutilización de los HTML de programación lineal

Actualizado: 13 de octubre de 2026 · Entregas 71–76.

## Criterio

Aplicar el [criterio de reutilización del usuario](criterio-reutilizacion-html-estadistica-pl-inferencia.md): conservar contenido válido y actividades originales; documentar correcciones. Los huecos quedan pendientes, sin generar material para completar cuotas.

## Correspondencia por archivo

| Fuente original completa (HTML guardado como TXT) | Destino o estado |
|---|---|
| [0. Presentación.txt](<../../Página web existente/1. Programación Lineal/0. Presentación.txt>) | Reutilizado y revisado: [índice del tema 6](../libro/temas/06-programacion-lineal/index.html), orientación y conexiones con datos/probabilidad/inferencia. |
| [1. Inecuaciones.txt](<../../Página web existente/1. Programación Lineal/1. Inecuaciones.txt>) | Teoría, gráfico y procedimiento reutilizados y verificados en [6.1](../libro/temas/06-programacion-lineal/01-inecuaciones-lineales-con-dos-incognitas.html). Lección parcial por carencias indicadas abajo. |
| [2. Sistemas de inecuaciones.txt](<../../Página web existente/1. Programación Lineal/2. Sistemas de inecuaciones.txt>) | Reutilizado y verificado en [6.2](../libro/temas/06-programacion-lineal/02-sistemas-de-inecuaciones-lineales-con-dos-incognitas.html), con gráfico corregido y afirmaciones de óptimos precisadas. Lección parcial; carencias documentadas. |
| [3. Programación Lineal.txt](<../../Página web existente/1. Programación Lineal/3. Programación Lineal.txt>) | Reutilizado y verificado en [6.3](../libro/temas/06-programacion-lineal/03-programacion-lineal.html). No negatividad corregida (M10); lección parcial sin actividades inventadas. |
| [4. El método gráfico.txt](<../../Página web existente/1. Programación Lineal/4. El método gráfico.txt>) | Integrado en [6.4](../libro/temas/06-programacion-lineal/04-solucion-de-un-problema-de-programacion-lineal.html): recursos y dos objetivos conservados; región, vértices, tablas y óptimos corregidos. Parcial por carencias. |
| [5. Ejercicios Resueltos.txt](<../../Página web existente/1. Programación Lineal/5. Ejercicios Resueltos.txt>) | Seis ejercicios y 23 pasos integrados en [6.5](../libro/temas/06-programacion-lineal/05-problemas-de-programacion-lineal.html), con selector y GeoGebra bajo demanda. Correcciones y carencias documentadas; estado parcial. |
| [6. Flashcards.txt](<../../Página web existente/1. Programación Lineal/6. Flashcards.txt>) | 19 tarjetas revisadas integradas en el [mazo del tema 6](../tarjetas/index.html?tema=t06), con las cinco categorías originales y correcciones documentadas. |

Se han leído íntegramente y adaptado los siete archivos: los dos iniciales en la entrega 71, sistemas de inecuaciones en la 72, programación lineal en la 73, método gráfico en la 74, ejercicios resueltos en la 75 y flashcards en la 76. La integración no elimina las carencias documentadas.

## Presentación: qué se conserva y cómo se adapta

Presentación es idéntica byte por byte a [Inicio.txt](<../../Página web existente/Inicio.txt>): mismo tamaño y SHA-256. No se crea una segunda portada duplicada.

- Se conserva el itinerario: optimización y gestión de restricciones; correlación y regresión; Bayes y probabilidad total; binomial; normal; inferencia, muestreo, estimación y confianza; capacidad crítica para analizar datos.
- Se traslada la entrada de optimización a la presentación del tema 6 y el resto a un bloque desplegable de conexiones, con destinos de la estructura actual y estado pendiente explícito.
- Se retiran las fechas incoherentes de la copia original (título “Syllabus 2024” y distintivo “Curso 2025-2026”) y los trimestres como calendario vigente. No se inventa una nueva programación temporal.
- La etiqueta “Teoría de la Medida” se sustituye por “probabilidad condicionada”, coherente con la mención original a Bayes y probabilidad total.
- Se omiten de la adaptación las tarjetas decorativas, el rótulo ornamental “Conexión Fundamental” y el lema atribuido a Karl Pearson. Permanecen en el archivo original; no aportan contenido matemático adicional al itinerario.
- Se utilizan cabecera, pie y estilos comunes; no se copian fuentes remotas ni el script del pie externo que reejecutaba scripts. Las funciones globales de traducción/voz conservan su fase pendiente.

## Inecuaciones: correspondencia por bloque

| Bloque de origen | Destino | Estado |
|---|---|---|
| Ecuación como recta e inecuación como territorio | 6.1, definición | Reutilizado; hipótesis precisada. |
| Fórmula ax+by≤c | 6.1, definición | Conservada en LaTeX con la condición sobre a y b. |
| SVG y ejemplo x+2y≤10 | 6.1, ejemplo gráfico | Corregido, con escala, intersecciones, descripción y pie explicativo. |
| Dibujar frontera | 6.1, paso 1 | Conservado. |
| Continua/discontinua y borde incluido/excluido | 6.1, paso 1 | Conservado con muestras de línea y texto equivalente. |
| Punto de prueba, normalmente (0,0) | 6.1, paso 2 | Corregido para exigir que esté fuera de la frontera. |
| Sombrear el lado del punto o el opuesto | 6.1, paso 3 | Conservado; se recuerda incluir/excluir el borde. |

### Correcciones justificadas

1. **Hipótesis:** no toda ecuación define una recta. Para la forma lineal se precisa \((a,b)\ne(0,0)\). No se desarrolla un apartado nuevo de casos degenerados.
2. **Punto de prueba:** un punto en la frontera no permite decidir qué lado sombrear. Se indica elegir otro si el origen pertenece a ella.
3. **Gráfico:** el SVG original tenía pendiente visual incompatible con \(x+2y=10\); el borde del relleno tampoco coincidía con la línea. Se representa el mismo ejemplo con origen en (40,200) píxeles y escala de 20 píxeles/unidad. La frontera tiene extremos visibles (20,90) y (280,220), correspondientes a (−1,5.5) y (12,−1). Ambos cumplen \(x+2y=10\). La región rayada contiene el origen y queda en el lado \(x+2y\le10\).
4. **Ventana:** se aclara que el marco no es una restricción; el semiplano es ilimitado.
5. **Acceso:** gráfico con título y descripción, pie equivalente, muestras de línea no dependientes del color, estructura semántica y carga local de fórmulas.

Las sustituciones del origen y los interceptos explican y verifican el ejemplo que ya existía; no se contabilizan como nuevos problemas.

## Carencias conservadas

- Este archivo fuente no contiene cuestionario, tarjetas propias, entrada de respuesta, generación procedural ni explorador interactivo. No se añaden.
- No contiene una colección de ejercicios resueltos complementarios. El archivo separado de ejercicios permanece pendiente.
- La fuente no ofrece un ejemplo separado de desigualdad estricta, frontera vertical/horizontal ni comprobación interactiva del punto de prueba. Se registran como mejoras posibles, sin desarrollarlas.
- El tema 6 y 6.1 tienen estado editorial **partial**. El índice distingue “Contenido parcial” de “En preparación”, para no confundir material ya consultable con un esqueleto.
- No se certifica accesibilidad completa; siguen pendientes lectores de pantalla y pronunciación matemática.

## Integridad de originales

SHA-256, comprobado antes y después:

- Inicio.txt y 0. Presentación.txt: `985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb`.
- 1. Inecuaciones.txt: `eb272271f4b5ca059ec703d287425b5c419ef59ecb0cabd2e2f900b7ccda50cc`.

No se ha escrito sobre esos archivos. [Verificación de integración](verificacion-entrega-71.md).


## Entrega 72 · Sistemas de inecuaciones

### Correspondencia completa por bloque

| Bloque original | Adaptación en 6.2 | Estado |
|---|---|---|
| Condiciones simultáneas y superposición | Sistema y región factible | Conservado, con definición de intersección. |
| x+y≤60, x≤40, x≥0, y≥0 | Mismo sistema y términos independientes | Conservado sin cambiar datos. |
| Primer sombreado R1 | Triángulo del primer cuadrante con rayado oblicuo | Geometría y escala verificadas. |
| Segundo sombreado R2 | Franja 0≤x≤40 con rayado horizontal | Posición corregida y recorte superior explicado. |
| Sombreado común y cuatro puntos | Cuadrilátero gris con fronteras continuas | Corregido y descrito en texto equivalente. |
| Vértices como esquinas | Definición y coordenadas del mismo ejemplo | Precisado: solo cruces que cumplen todas las restricciones. |
| Óptimo “SIEMPRE” en vértices | Condiciones para función lineal sobre polígono cerrado, acotado y no vacío | Corrección de M10; se permite óptimo no único. |
| Región acotada y no acotada | Tipos de región | Conservado con hipótesis corregidas y aviso de intersección vacía. |

### Correcciones y justificación

- **Escala:** en el original, el corte x=60 correspondía a un recorrido de 200 píxeles desde el origen; la vertical situada a 120 píxeles representaría x=36, no x=40. La esquina superior derecha tampoco representaba (40,20). Se adopta origen (40,280) y escala uniforme de 4 píxeles/unidad. Vértices: (0,0), (40,0), (40,20), (0,60).
- **Bordes incluidos:** las cuatro restricciones admiten igualdad; la frontera común pasa de discontinua a continua. Las regiones parciales se distinguen por rayados y la intersección por relleno, sin depender solo del color.
- **Factibilidad:** el cruce (60,0) queda fuera por x≤40. Las sustituciones del desplegable explican y verifican los cuatro puntos que ya mostraba el original; no añaden otro problema.
- **Existencia de extremos:** “acotada” no implica por sí sola “cerrada y no vacía”. Se precisan esas condiciones y que la función objetivo sea lineal. Se corrige la afirmación de unicidad implícita: además de un vértice, un lado entero puede alcanzar el mismo extremo.
- **No hay objetivo dado:** no se asigna arbitrariamente una función que optimizar al sistema fuente.
- **Casos excluidos:** una intersección vacía no tiene solución; desigualdades estrictas pueden excluir bordes. Son aclaraciones mínimas para corregir las afirmaciones generales originales, sin generar nuevos ejercicios o colecciones de ejemplos.
- **Acceso y técnica:** SVG con título, descripción, escala y pie; desplegable nativo para comprobaciones, roles editoriales, cabecera/pie compartidos y MathJax local. No se copian fuentes remotas, estilos de cristal ni scripts del pie externo.

### Carencias

Esta fuente no incluye cuestionario, tarjetas, explorador editable, generación procedural ni ejercicios adicionales. Tampoco proporciona ejemplos desarrollados separados de región vacía, no acotada o desigualdades estrictas. Permanecen como mejoras pendientes; no se inventan para cubrir cuotas.

El tema 6 y 6.1–6.2 mantienen estado **partial**. La revisión con lectores de pantalla y pronunciación matemática sigue pendiente. Los bancos no cambian.

### Integridad

2. Sistemas de inecuaciones.txt — SHA-256: `5d963b48bb98ab92aef7222307925ffe9088d55139fd63ce11b2fcb17899a588`. Original intacto antes y después. [Verificación de la entrega 72](verificacion-entrega-72.md).


## Entrega 73 · Programación lineal

### Correspondencia completa por bloque

| Bloque de origen | Destino en 6.3 | Estado |
|---|---|---|
| Rompecabezas de tres piezas | Introducción y anatomía | Conservado su significado. |
| Variables: x=sillas, y=mesas | Variables | Conservado, precisando que son cantidades. |
| Función objetivo Z=ax+by | Función objetivo | Conservada en LaTeX; se explicita máximo/mínimo y coeficientes dados. |
| Restricciones con puntos suspensivos | Restricciones | Esquema conservado, identificado como no numérico; “s.a.” explicado. |
| Variables → restricciones → objetivo | Diagrama | Tres nodos y dos flechas conservados en disposición vertical, con descripción y pie equivalentes. |
| −5 sillas / −3 kilos de harina | No negatividad | Ejemplos originales conservados. |
| “Siempre debes añadir” / “siempre en primer cuadrante” | No negatividad | Corregido según el significado de las variables; ejes incluidos cuando x,y≥0. |

### Correcciones y adaptación

- La no negatividad no se impone automáticamente en cualquier modelo. Se mantiene para las cantidades producidas/compradas de la fuente y se exige justificar el dominio por la definición y el enunciado. Corrección de M10.
- Se precisa que las restricciones son lineales y pueden incluir igualdades. Se conserva el esquema original de inecuaciones, sin asignarle coeficientes o términos independientes.
- Se distingue la función objetivo de las restricciones y se explicita que los coeficientes a,b son datos. No se inventan beneficios, recursos ni un problema numérico de sillas y mesas.
- Diagrama neutral y vertical para mantener legibilidad en móvil. Mismo flujo y etiquetas, sin animaciones, tarjetas de cristal ni fuentes externas. SVG con título, descripción y texto equivalente.
- Cabecera/pie, preferencias, roles editoriales y motor LaTeX comunes. No se copian el pie remoto ni sus scripts.

### Carencias

No hay en esta fuente un enunciado completo para formular y resolver, tabla de recursos, valores numéricos de la función objetivo, colección de ejercicios, test, tarjetas, explorador ni generación procedural. Esos huecos permanecen pendientes. La fuente tampoco desarrolla el dominio entero al contar objetos indivisibles; se registra como mejora pendiente sin abrir una unidad de programación entera.

6.3 conserva estado **partial**, al igual que 6.1, 6.2 y el tema 6. Bancos y número de widgets sin cambios.

### Integridad y evidencia

3. Programación Lineal.txt — SHA-256: `82d9466ebbe563c0d8a3724c1eeb031f312c7a7082b360bda11d55bf7502f03b`. Original intacto. [Verificación de la entrega 73](verificacion-entrega-73.md).

## Entrega 74 · Método gráfico

### Correspondencia completa por bloque

| Bloque original | Destino en 6.4 | Estado |
|---|---|---|
| Principio del óptimo único en un vértice | Por qué usar vértices | Conservado y contextualizado con hipótesis suficientes para comparar vértices. |
| Algoritmo de cinco pasos | Cinco pasos | Conservado; se añade comprobar factibilidad de intersecciones. |
| Enunciado y tabla de sillas/mesas | Modelo | Todos los datos conservados: corte 2/2 y 18 h; montaje 1/3 y 42 h; beneficio 30/50 €. |
| Z=30x+50y y sistema | Modelo | Conservados sin alterar recursos para forzar una mezcla óptima. |
| Región cuadrilateral y cuatro puntos | Región y vértices | Corregidos a triángulo (0,0), (9,0), (0,9); misma escala en ambos ejes. |
| Evaluación con beneficio 30 € | Evaluación | Recalculada sobre los vértices factibles: 0, 270, 450 €. |
| “Corrección didáctica” a 40 € | Variante original | Conservada como segundo supuesto separado, no como cambio silencioso de enunciado. |
| Segunda evaluación | Variante original | Recalculada: 0, 360, 450 €. |
| Conclusión 3 sillas / 12 mesas | Decidir e interpretar | Corregida: 0 sillas / 9 mesas, máximo único de 450 € en ambos casos. |
| Aumento de radio al pasar el ratón | Gráfico y texto equivalente | Efecto decorativo retirado; no había captura de respuestas ni actividad matemática. |

### Correcciones matemáticas justificadas

- **Región:** el corte impone x+y≤9. Con x,y≥0, se cumple x+3y≤3(x+y)≤27<42. El montaje es redundante. La región original no cumplía el sistema del propio enunciado.
- **Cruce de recursos:** x+y=9 y x+3y=42 dan (−7.5,16.5), excluido por x<0. Los cortes de montaje (0,14) y (42,0) consumen 28 y 84 horas de corte, respectivamente.
- **Vértice C erróneo:** (3,12) consume 30 horas de corte, frente a las 18 disponibles. No se conserva como solución. Se explica su descarte en un desplegable; las letras A/B/C designan ahora los tres vértices correctos.
- **Primera tabla:** la fuente destacaba 690 € como máximo pese a mostrar 700 € en otra fila. Ambos puntos eran inviables. No basta cambiar el resaltado: se sustituyen las filas por vértices factibles.
- **Variante 40 €:** cambiar el beneficio de la silla no afecta a la región ni convierte (3,12) en punto factible. El resultado tampoco es una mezcla: sigue siendo 9 mesas.
- **Unicidad:** Z=50(x+y)−20x≤450 y Z₂=50(x+y)−10x≤450. En ambos casos, igualdad solo con x=0,y=9.
- **Recursos en el óptimo:** 18 h de corte, 27 h de montaje y 15 h de montaje sin usar. La solución entera también resuelve el problema de cantidades indivisibles.
- **Hipótesis:** se evita afirmar que toda región tiene infinitos puntos o que siempre existe óptimo. Para el procedimiento se explicitan región poligonal cerrada, acotada y no vacía y objetivo lineal; varios vértices empatados pueden dar un segmento óptimo.
- **Geometría SVG:** origen (50,330), escala uniforme 20 px/unidad. Triángulo: (50,330), (230,330), (50,150). Recta de montaje: extremos visibles (50,50) y (290,130), correspondientes a (0,14) y (12,10), ambos en x+3y=42. Fronteras continuas, descripción y pie equivalente.
- **Integración:** cabecera/pie, estilos provisionales, roles editoriales, tablas desplazables por teclado y MathJax local compartidos. Se omiten fuentes remotas, CSS decorativo y ejecución de scripts del pie externo.

Las comprobaciones y las desigualdades explican las correcciones del mismo ejemplo; no constituyen nuevos problemas añadidos a la fuente.

### Carencias que permanecen

Sin cuestionario, flashcards propias, preguntas procedurales, explorador editable ni práctica autocorregible en este archivo. No se añaden. Faltan ejemplos desarrollados de óptimo múltiple y ausencia de óptimo, y revisión global con lectores de pantalla y pronunciación matemática. 6.4 y el tema 6 conservan estado **partial**.

### Integridad y siguiente fuente

4. El método gráfico.txt — SHA-256: `455c45b45dea0bd4641009e6af0d179d92eb41d741a1ce5708052ba7d248709c`. Archivo original intacto. [Verificación](verificacion-entrega-74.md).

Siguiente: lectura completa de [5. Ejercicios Resueltos.txt](<../../Página web existente/1. Programación Lineal/5. Ejercicios Resueltos.txt>), comprobación de sus seis ejercicios y de GeoGebra antes de integrar 6.5.

## Entrega 75 · Seis ejercicios resueltos y laboratorio

Fuente: [5. Ejercicios Resueltos.txt](<../../Página web existente/1. Programación Lineal/5. Ejercicios Resueltos.txt>). Leída íntegramente: CSS, HTML, array de seis ejercicios, selector, renderizado y carga de GeoGebra. Original intacto, SHA-256: `cf12fac3410b388d7a9588987dead55b0237a5d8b41865a9975c2a98a6efb24d`.

### Correspondencia completa

| Bloque | Destino | Conservación / revisión |
|---|---|---|
| Selector con seis títulos | Selector de 6.5 | Mismos ejercicios; vista inicial del primero, opción de ver todos y enlaces directos #ejercicio-1 a #ejercicio-6. |
| Muebles · 5 pasos | Ejercicio 1 | Enunciado, modelo, redundancia, vértices, evaluación y 240 € conservados. |
| Dieta · 5 pasos | Ejercicio 2 | Modelo, cruce (1.2,2.4), ejes, evaluación y 12 € conservados; existencia de mínimo justificada. |
| Inversión · 3 pasos | Ejercicio 3 | Datos, miles de euros, cuatro vértices y 4.000 € conservados; unidades y supuesto de seguridad contextualizados. |
| Drones · 4 pasos | Ejercicio 4 | Restricciones, contrato, proporción, cuatro vértices y 41.250 € conservados; D exacto y redundancia demostrada. |
| Minerales · 3 pasos | Ejercicio 5 | Proporción del 40 %, restricciones, vértices y 3.200 € conservados; fila ganadora y explicación corregidas. |
| Refinería · 3 pasos | Ejercicio 6 | Cinco restricciones técnicas y resultado 1.600 € conservados; no negatividad explícita, cuatro lados y candidato descartado precisados. |
| Laboratorio gráfico GeoGebra libre | Laboratorio de 6.5, documento aislado | Misma calculadora graphing y ejemplo 2x+y≤10. No se crean nuevas actividades ni sincronización automática con problemas. |
| Resolución dinámica al elegir | HTML semántico con mejora progresiva | Los seis contenidos existen sin JavaScript. Selector filtra, cada solución se despliega; MathJax compartido evita motores duplicados. |
| Pie externo y estilos decorativos | Cabecera/pie y CSS comunes | Se omiten fuentes remotas, animación de entrada y ejecución de scripts del pie externo. |

### Correcciones justificadas

1. **LaTeX:** dos secuencias `\ge` tenían una sola barra en cadenas JavaScript del original (vitaminas y proporción); al ejecutarse podían convertirse en texto “ge”. En la copia integrada se conservan correctamente como LaTeX HTML. Las conclusiones se escriben como texto semántico, no como largas frases dentro de `\text`.
2. **Muebles:** sin cambio de datos. Se comprueba el consumo de 120 kg de madera y 60 h de trabajo, y que el óptimo es entero.
3. **Dieta:** una región no acotada no garantiza por sí sola un mínimo. Aquí `Z=(x+2y)+(3x+y)≥12`; la igualdad simultánea da el único mínimo (1.2,2.4). Se añade la justificación del resultado existente.
4. **Inversión:** se identifican cantidades y rendimiento anual en miles de euros y su conversión final. “Seguras” queda como supuesto del enunciado idealizado, no una afirmación general sobre acciones reales.
5. **Drones, redundancia:** evaluar un solo cruce no prueba una propiedad de toda la región. Sumando R1 y R2 y dividiendo entre cuatro se demuestra x+y≤325<350.
6. **Drones, exactitud:** D=(800/3,50), no (266.6,50); su objetivo es exactamente 39.500 €. El máximo continuo (250,75) es entero, así que también sirve para drones indivisibles sin redondear vértices.
7. **Minerales:** se elimina el resaltado contradictorio de D y la frase que insinuaba que A dejaba de ser prometedor. Comparación correcta: A cuesta 3.200 €, D cuesta 3.600 €; gana A. No cambian los datos ni el óptimo final.
8. **Refinería, dominio:** se explicita y≥0 para cantidades de líquido; x≥0 ya se deduce de x≥10. Sin la primera, el cuadrilátero de la fuente no estaba cerrado por el eje X.
9. **Refinería, geometría:** cinco restricciones técnicas no implican cinco lados. La región es A(10,30), B(40,60), D(80,0), E(10,0). El candidato C=(100/3,70) viola x+y≤100 e y−x≤20.
10. **Refinería, redundancia:** R2+3R5 implica y≤60, luego R4 es redundante. (2/5)R2+(1/5)R5 implica R1: x+y≤100. R1 es redundante pero alcanza igualdad en B, donde coinciden tres fronteras.
11. **Unidades y acceso:** litros en la refinería, kg en dieta y toneladas en minerales; encabezados, desplegables nativos, tabla desplazable por teclado y roles editoriales. Se conserva la separación entre prosa y fórmulas.

No se añaden problemas, bancos o preguntas procedurales. Las comprobaciones añadidas justifican los mismos seis modelos.

### GeoGebra: integración y límites

- Carga explícita desde un botón: no se solicita nada al proveedor antes de pulsarlo.
- Documento aislado: [HTML](../widgets/shared/geogebra/index.html), [configuración](../widgets/shared/geogebra/geogebra.js), [control desde la lección](../assets/js/shared/geogebra-host.js).
- Una instancia por intento. Estado “listo” solo tras appletOnLoad, errores y espera máxima de 35 segundos con reintento manual; cierre destruye el documento y descarta mensajes tardíos. Se verifican origen y ventana de los mensajes.
- Se mantiene el recurso libre: el usuario introduce inecuaciones, sin autocorrección ni envío de datos de los ejercicios al proveedor.
- Enlace alternativo para abrir el recurso fuera de la lección. Requiere Internet y sigue dependiendo de un servicio externo.
- Corregido scaleContainerClass: el original indicaba un identificador como si fuera clase; ahora existe el contenedor correspondiente.
- Integración basada en la [documentación oficial de inserción](https://geogebra.github.io/docs/reference/en/GeoGebra_Apps_Embedding/) y en los [parámetros oficiales](https://geogebra.github.io/docs/reference/en/GeoGebra_App_Parameters/), consultados el 12 de octubre de 2026.
- Las preferencias compartidas se aplican al texto de la lección. La interfaz externa no hereda esas preferencias; su revisión completa de accesibilidad sigue pendiente.

### Carencias y siguiente archivo

No hay cuestionario, respuesta corregible ni generación procedural en la fuente. No se inventan. Los seis enunciados y las 23 secciones de resolución están integrados; la lección se mantiene parcial por las actividades ausentes y revisión global de accesibilidad.

Siguiente: [6. Flashcards.txt](<../../Página web existente/1. Programación Lineal/6. Flashcards.txt>). [Verificación de la entrega](verificacion-entrega-75.md).

## Entrega 76 · Flashcards originales

Fuente completa: [6. Flashcards.txt](<../../Página web existente/1. Programación Lineal/6. Flashcards.txt>), leída con sus 19 objetos, filtros, giro de tarjetas y renderizado. SHA-256: `58ae420a2140ec783ba86c07793a14ff187b23eef6d996581f98348cb2b5d87a`. Original intacto.

Destino: [banco del tema 6](../content/activities/linear-programming-cards.js) y [visor común](../tarjetas/index.html?tema=t06). Cada tarjeta tiene ID estable fc-pl-original-01…19 y sourceIndex coincidente con su posición de origen. No se crean tarjetas adicionales.

### Correspondencia uno a uno y correcciones

| N.º | Pregunta/concepto original | Conservación o corrección |
|---|---|---|
| 1 | Función objetivo | Se conserva ax+by y máximo/mínimo; se denomina función, no ecuación, y se exige factibilidad. |
| 2 | Restricciones | Se conservan condiciones lineales; se incluyen igualdades y cumplimiento simultáneo. |
| 3 | No negatividad | Se justifica por las cantidades representadas, sin presentarla como obligación casi universal. |
| 4 | Como mínimo 100 unidades | Mismo total y desigualdad; se define x/y como cantidades de dos productos y se incluye la igualdad. |
| 5 | Como máximo 500 euros | Mismo total y desigualdad; se aclara que x/y son importes, no cantidades de productos sin coeficientes de coste. |
| 6 | El doble de A que de B | Corrección: x=2y. x≥2y corresponde a «al menos el doble». El ejemplo 10/20 original se conserva, con igualdad exacta. |
| 7 | A no supera a B en más de 20 | x−y≤20 conservada; no se impone adicionalmente A≥B. Variables identificadas. |
| 8 | La mitad de A es al menos B | x/2≥y y x≥2y conservadas, con variables identificadas. |
| 9 | Región factible | Intersección conservada; puede ser vacía, no acotada o degenerada. No siempre es un polígono acotado. |
| 10 | Dibujar una recta | Se exigen dos puntos distintos y (a,b)≠(0,0); se contempla frontera vertical y cortes inexistentes/coincidentes. |
| 11 | Sombreado | El punto de prueba debe quedar fuera de la frontera; el origen no siempre sirve. Bordes incluidos/excluidos según desigualdad. |
| 12 | Vértices | Sistemas 2×2 conservados; se comprueban no paralelismo, factibilidad y condición de esquina. |
| 13 | Teorema fundamental | Se conserva óptimo único en vértice; se añaden condiciones suficientes para existencia de extremos y se permite multiplicidad. |
| 14 | Evaluación de vértices | Comparación conservada con región cerrada, acotada y no vacía. En regiones no acotadas se estudia el comportamiento sin límite. |
| 15 | Líneas de nivel | Paralelismo conservado para objetivo no constante; se precisa sentido de k según máximo/mínimo y existencia del extremo. |
| 16 | Región no acotada | No significa abierta; existencia de máximo/mínimo depende del objetivo y región. Retirada la afirmación de que generalmente falta máximo. |
| 17 | Infinitas soluciones | Se habla de soluciones óptimas. Paralelismo no basta: el lado debe alcanzar el extremo. Segmento entre óptimos y objetivo constante precisados. |
| 18 | Infactibilidad | Contradicción x≤5, x≥10 conservada; sin región común ni óptimo. |
| 19 | Solución entera | Óptimo continuo entero válido; redondear o buscar solo enteros cercanos no garantiza la solución. Se exige búsqueda completa o método entero. |

Cinco categorías originales, mismo orden y tamaños: **Definiciones 3; Planteamiento 5; Región Factible 4; Teoremas y Métodos 3; Casos Especiales 4**. Los filtros usan los nombres de las categorías de los datos; las etiquetas abreviadas «Traducción (Lenguaje)», «Teoremas» y «Casos Raros» se normalizan a esos nombres.

### Interacción e integración

- Se conserva descubrir/ocultar respuestas y filtrar categorías. El giro decorativo 3D y el clic en un div se sustituyen por los botones del motor común, utilizables con teclado.
- Navegación anterior/siguiente y contador; cambio de categoría vuelve a la primera tarjeta con respuesta oculta. Las tarjetas restantes no desaparecen del banco.
- [Motor común](../assets/js/learning/flashcards.js) separado del coordinador de lecciones; usa la cola MathJax compartida, texto semántico para preguntas/explicaciones y fórmulas LaTeX.
- Se omiten colores forzados sobre MathJax, fuentes remotas y ejecución de scripts del pie externo. Las preferencias de lectura siguen siendo comunes.
- No se guardan respuestas, categoría, posición ni avances. Al recargar se inicia el mazo; las preferencias de lectura sí se conservan.
- Se mantienen 318 preguntas y dieciséis juegos; el total pasa de 301 a **320 tarjetas**. Los otros temas conservan 61/54/48/72/66 tarjetas.
- No se duplica el mazo en el tema: su índice y 6.5 enlazan al visor filtrado.

### Carencias y siguiente bloque

La fuente no incluye autocorrección, puntuación, repetición espaciada ni generación procedural. No se crean para completar cuotas. Siguen pendientes revisión con lectores de pantalla y pronunciación matemática, y las carencias identificadas en cada lección. Tema 6 y 6.1–6.5 mantienen estado parcial.

Los siete archivos fuente de programación lineal han quedado integrados. Siguiente: [presentación original de estadística bidimensional](<../../Página web existente/2. Estadística Bidimensional/0. Presentación.txt>), aplicando el mismo criterio de conservar y documentar, sin rellenar huecos. [Verificación de la entrega 76](verificacion-entrega-76.md).
