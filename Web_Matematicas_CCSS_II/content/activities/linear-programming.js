// Preguntas del tema 6 (programación lineal), seis por lección, y lección de referencia de las 19 tarjetas originales.
// Los datos numéricos proceden de los ejemplos de las lecciones 6.1–6.5; tests/linear-programming.test.mjs los contrasta.
const tex = String.raw;
const q = (lesson, n, prompt, choices, explanation, hint, source = 'Elaboración propia; lección ' + lesson.replace('t06-e0', '6.')) => ({
  id: 'lp-' + lesson.slice(-2) + '-' + n, topicId: 't06', lessonId: lesson, prompt, correct: 'correct',
  options: choices.map(([text, feedback], i) => ({ id: i ? 'wrong-' + i : 'correct', text, feedback })),
  explanation, hint, source,
});

export const linearProgrammingQuestions = [
  // 6.1 · Inecuaciones lineales con dos incógnitas
  q('t06-e01', '01', tex`¿Qué conjunto describe \(x+2y\le10\)?`, [
    ['El semiplano que contiene el origen, con la recta frontera incluida.', tex`El origen cumple \(0\le10\) y la desigualdad admite la igualdad.`],
    [tex`Solo los puntos de la recta \(x+2y=10\).`, 'Esa es la frontera; la inecuación selecciona todo un lado.'],
    ['El semiplano que no contiene el origen.', tex`Sustituye (0,0): \(0\le10\) es verdadero.`],
    ['Solo los puntos del primer cuadrante bajo la recta.', 'No hay condición x≥0 ni y≥0: el semiplano continúa en los demás cuadrantes.']],
    tex`La frontera \(x+2y=10\) pasa por (0,5) y (10,0). El origen la cumple, así que se sombrea su lado e incluye la recta.`,
    'Decide primero la frontera y después prueba un punto que no esté en ella.', 'Ejemplo de la fuente; lección 6.1'),
  q('t06-e01', '02', tex`¿Cómo se dibuja la frontera de \(y>-2\)?`, [
    [tex`Horizontal, \(y=-2\), con trazo discontinuo.`, 'Es estricta: los puntos con y=−2 no son solución.'],
    [tex`Horizontal, \(y=-2\), con trazo continuo.`, 'El trazo continuo indicaría que la frontera se incluye, y aquí no.'],
    [tex`Vertical, \(x=-2\), con trazo discontinuo.`, 'La condición fija y, no x.'],
    [tex`Horizontal, \(y=2\), con trazo discontinuo.`, 'Revisa el signo del término independiente.']],
    'La frontera es la recta y=−2, paralela al eje X. Como la desigualdad es estricta, se dibuja discontinua y se sombrea por encima.',
    'Fíjate en qué variable aparece y en si la desigualdad admite la igualdad.'),
  q('t06-e01', '03', tex`Para representar \(y\ge2x\), ¿por qué no sirve el origen como punto de prueba?`, [
    [tex`Porque está en la frontera: \(0\ge0\) es cierto pero no indica qué lado sombrear.`, 'Un punto de la frontera no distingue los dos semiplanos.'],
    ['Porque el origen nunca puede ser solución.', 'Aquí sí es solución: la frontera está incluida.'],
    ['Porque siempre hay que probar con (1,1).', 'Sirve cualquier punto fuera de la frontera, por ejemplo (0,1).'],
    ['Porque la frontera es vertical.', 'y=2x es una recta oblicua que pasa por el origen.']],
    'Se elige otro punto fuera de la recta, como (0,1): 1≥0 es verdadero, así que se sombrea su lado, por encima de y=2x.',
    'Sustituye (0,0) en la frontera y=2x.'),
  q('t06-e01', '04', tex`¿Qué inecuación es equivalente a \(-2y\le4\)?`, [
    [tex`\(y\ge-2\)`, 'Al dividir entre −2, número negativo, se invierte la desigualdad.'],
    [tex`\(y\le-2\)`, 'Has dividido entre −2 sin invertir la desigualdad.'],
    [tex`\(y\ge2\)`, 'El cociente 4/(−2) es −2, no 2.'],
    [tex`\(y\le2\)`, 'Revisa el signo del cociente y el sentido de la desigualdad.']],
    'Dividir ambos miembros entre −2 invierte el sentido: y≥−2. Comprobación: el origen cumple −2·0≤4 y también 0≥−2.',
    'Multiplicar o dividir por un número negativo cambia el sentido de la desigualdad.'),
  q('t06-e01', '05', tex`¿Es el punto \((2,-2)\) solución de \(y>-2\)?`, [
    ['No: está en la frontera y la frontera no se incluye.', '−2>−2 es falso.'],
    ['Sí: −2 es igual a −2.', 'La desigualdad es estricta; la igualdad no basta.'],
    ['Sí, porque su abscisa 2 es positiva.', 'La condición no depende de x.'],
    ['No, porque queda por encima de la recta.', 'Está exactamente sobre la recta y=−2.']],
    'El punto tiene y=−2, así que está en la frontera. Con «>» la frontera queda excluida.',
    'Sustituye la coordenada y en la desigualdad estricta.'),
  q('t06-e01', '06', tex`En \(3x-y\ge6\), el punto de prueba (0,0) da \(0\ge6\), que es falso. ¿Qué región es la solución?`, [
    ['El semiplano que no contiene el origen, con la frontera incluida.', 'Si el punto de prueba no cumple, se sombrea el lado contrario; «≥» incluye la frontera.'],
    ['El semiplano que contiene el origen.', 'El origen no cumple la inecuación.'],
    ['El semiplano que no contiene el origen, sin la frontera.', 'Con «≥» la igualdad está permitida.'],
    ['No hay solución porque el origen no la cumple.', 'Un solo punto que falla no vacía el semiplano: (3,0) cumple 9≥6.']],
    'La frontera 3x−y=6 pasa por (2,0) y (0,−6). Como el origen no cumple, la solución es el otro lado, incluida la recta.',
    'Recuerda qué se hace cuando el punto de prueba no cumple.'),

  // 6.2 · Sistemas de inecuaciones
  q('t06-e02', '01', tex`¿Cuáles son los vértices de la región \(x+y\le60,\ x\le40,\ x\ge0,\ y\ge0\)?`, [
    ['(0,0), (40,0), (40,20) y (0,60)', 'Son los cruces de fronteras que cumplen las cuatro restricciones.'],
    ['(0,0), (60,0) y (0,60)', '(60,0) incumple x≤40.'],
    ['(0,0), (40,0), (40,60) y (0,60)', '(40,60) incumple x+y≤60.'],
    ['(0,0), (40,20), (60,0) y (0,60)', '(60,0) no es factible y falta (40,0).']],
    'C sale de x=40 y x+y=60: y=20. D sale de x=0 y x+y=60. Hay que comprobar cada cruce en todas las restricciones.',
    'Calcula los cruces y descarta los que incumplan alguna restricción.', 'Ejemplo de la fuente; lección 6.2'),
  q('t06-e02', '02', tex`En el sistema anterior, ¿por qué (60,0) no es un vértice de la región factible?`, [
    [tex`Porque incumple \(x\le40\).`, 'Es un cruce de fronteras, pero no es factible.'],
    [tex`Porque incumple \(x+y\le60\).`, '60+0=60 sí cumple esa restricción.'],
    [tex`Porque incumple \(y\ge0\).`, 'y=0 cumple y≥0.'],
    ['Porque queda fuera del dibujo.', 'La ventana no decide la factibilidad; las restricciones sí.']],
    'Un vértice debe cumplir todas las restricciones. (60,0) está en la recta x+y=60 y en el eje X, pero 60>40.',
    'Sustituye el punto en cada restricción.'),
  q('t06-e02', '03', tex`¿Qué región define \(x\ge0,\ y\ge0,\ x+y\le2,\ x+y\ge5\)?`, [
    ['Vacía: no hay ningún punto común.', 'La misma suma no puede ser ≤2 y ≥5.'],
    ['Un segmento entre las dos rectas.', 'Las rectas x+y=2 y x+y=5 son paralelas y las condiciones se contradicen.'],
    ['El punto (2,5).', 'Ese punto da x+y=7, que incumple x+y≤2.'],
    ['Una región no acotada.', 'No hay ningún punto factible.']],
    'Las restricciones exigen 5≤x+y≤2, una contradicción. La región es vacía y el sistema no tiene solución.',
    'Busca dos cotas incompatibles para la misma expresión.'),
  q('t06-e02', '04', tex`¿Qué región define \(x\ge0,\ y\ge0,\ x+y\le4,\ x+y\ge4\)?`, [
    ['El segmento cerrado de (0,4) a (4,0).', 'Las dos últimas dan x+y=4 y los ejes lo recortan.'],
    [tex`La recta completa \(x+y=4\).`, 'x≥0 e y≥0 la recortan a un segmento.'],
    ['Vacía, porque su área es cero.', 'Área cero no significa ausencia de soluciones: (2,2) es factible.'],
    ['Solo los cinco puntos enteros del segmento.', 'Las variables son reales: hay infinitos puntos.']],
    'Todas las soluciones son (t,4−t) con 0≤t≤4. Si además se exigieran enteros, quedarían cinco puntos.',
    'Combina x+y≤4 y x+y≥4 en una sola condición.'),
  q('t06-e02', '05', tex`¿Qué región define \(x\ge1,\ y\ge2,\ x+y\le3\)?`, [
    ['El único punto (1,2).', 'x≥1 e y≥2 dan x+y≥3; con x+y≤3 la suma es 3, y solo cabe (1,2).'],
    ['Vacía.', '(1,2) cumple las tres condiciones.'],
    ['El segmento de (1,2) a (3,0).', '(3,0) incumple y≥2.'],
    ['Una región no acotada.', 'Está encerrada por las tres restricciones.']],
    'Si x>1 o y>2, la suma supera 3. Comprobación: 1≥1, 2≥2 y 1+2≤3.',
    'Suma las dos primeras restricciones.'),
  q('t06-e02', '06', tex`¿Cómo es la región \(x\ge0,\ y\ge0,\ x+y\ge2\)?`, [
    ['No acotada: se extiende indefinidamente.', 'Por ejemplo, (2+t,0) es factible para todo t≥0.'],
    ['El triángulo de vértices (0,0), (2,0) y (0,2).', 'Ese triángulo es x+y≤2: el lado contrario.'],
    ['Vacía.', '(2,0) cumple las tres condiciones.'],
    ['Un segmento de (2,0) a (0,2).', 'Eso sería x+y=2; aquí la suma puede ser mayor.']],
    'La región es la parte del primer cuadrante por encima de x+y=2. Tiene vértices (2,0) y (0,2), pero no está acotada.',
    'Prueba el punto (10,10).'),

  // 6.3 · Programación lineal: formulación
  q('t06-e03', '01', '¿Qué es la función objetivo de un problema de programación lineal?', [
    [tex`La función lineal \(Z=ax+by\) que se quiere maximizar o minimizar.`, 'Expresa la meta: beneficio, coste, ingresos…'],
    ['El conjunto de restricciones del problema.', 'Las restricciones limitan las decisiones; el objetivo las compara.'],
    ['La región factible.', 'La región es el conjunto de decisiones admisibles.'],
    ['La solución óptima.', 'La solución se obtiene después, al optimizar la función.']],
    'Variables, función objetivo y restricciones son las tres piezas del modelo. El enunciado debe indicar si se busca el máximo o el mínimo.',
    'Piensa en qué cantidad se quiere hacer lo más grande o lo más pequeña posible.', 'Adaptación de la tarjeta original 1; lección 6.3'),
  q('t06-e03', '02', 'Con x e y unidades de dos productos, ¿cómo se traduce «como mínimo 100 unidades en total»?', [
    [tex`\(x+y\ge100\)`, '«Como mínimo» incluye exactamente 100.'],
    [tex`\(x+y\le100\)`, 'Eso sería «como máximo».'],
    [tex`\(x\ge100\) e \(y\ge100\)`, 'Se pide el total, no cada producto por separado.'],
    [tex`\(x+y=100\)`, 'La igualdad prohibiría superar 100.']],
    'El total es x+y y debe ser al menos 100.', '«Como mínimo» es «mayor o igual que».', 'Adaptación de la tarjeta original 4; lección 6.3'),
  q('t06-e03', '03', 'Con x cantidad de A e y cantidad de B, ¿cómo se traduce «el doble de A que de B»?', [
    [tex`\(x=2y\)`, 'Si hay 10 de B, hay 20 de A.'],
    [tex`\(y=2x\)`, 'Eso dice que B es el doble de A.'],
    [tex`\(x\ge2y\)`, 'Eso sería «al menos el doble».'],
    [tex`\(x+y=2\)`, 'No se habla de la suma.']],
    'Prueba con números: si y=10, debe ser x=20, que cumple x=2y.', 'Sustituye un valor concreto de B.', 'Adaptación de la tarjeta original 6; lección 6.3'),
  q('t06-e03', '04', 'Con x cantidad de A e y cantidad de B, ¿cómo se traduce «A no supera a B en más de 20»?', [
    [tex`\(x-y\le20\)`, 'La diferencia A−B no pasa de 20.'],
    [tex`\(x-y\ge20\)`, 'Eso exigiría que A supere a B en al menos 20.'],
    [tex`\(y-x\le20\)`, 'Has invertido el papel de A y B.'],
    [tex`\(x\le20\)`, 'No se limita A por sí sola, sino su exceso sobre B.']],
    'Equivale a x≤y+20. No exige que A sea mayor que B.', 'Escribe primero «exceso de A sobre B».', 'Adaptación de la tarjeta original 7; lección 6.3'),
  q('t06-e03', '05', '¿Cuándo se imponen las restricciones de no negatividad x≥0, y≥0?', [
    ['Cuando las variables representan cantidades que no pueden ser negativas.', 'Se justifican por el significado de las variables.'],
    ['Siempre, en cualquier problema y con cualquier variable.', 'No es una regla universal: depende del modelo.'],
    ['Nunca, porque se deducen de las demás restricciones.', 'A veces se deducen, pero en general hay que escribirlas.'],
    ['Solo cuando se minimiza.', 'El sentido de la optimización no decide el signo de las variables.']],
    'Si x e y cuentan sillas y mesas, no pueden ser negativas y se trabaja en el primer cuadrante, ejes incluidos.',
    'Pregúntate qué significa cada variable.', 'Adaptación de la tarjeta original 3; lección 6.3'),
  q('t06-e03', '06', 'Cada silla necesita 2 h de corte y cada mesa 2 h; hay 18 h de corte disponibles. ¿Qué restricción corresponde?', [
    [tex`\(2x+2y\le18\)`, '«Dispone de» marca un máximo, no una obligación de gastarlo todo.'],
    [tex`\(2x+2y\ge18\)`, 'Eso obligaría a usar al menos 18 h.'],
    [tex`\(x+y\le18\)`, 'Faltan las 2 h que consume cada unidad.'],
    [tex`\(2x+2y=18\)`, 'La igualdad impondría usar exactamente 18 h.']],
    'x sillas consumen 2x h y y mesas, 2y h. El total no puede superar 18: 2x+2y≤18, equivalente a x+y≤9.',
    'Multiplica el consumo por unidad por el número de unidades.', 'Ejemplo de la fuente; lección 6.3'),

  // 6.4 · Método gráfico
  q('t06-e04', '01', tex`¿Dónde alcanza su máximo \(Z=30x+50y\) en el triángulo de vértices (0,0), (9,0) y (0,9)?`, [
    ['En (0,9), con Z=450.', 'Los valores son 0, 270 y 450.'],
    ['En (9,0), con Z=270.', '270 es menor que 450.'],
    ['En el punto medio (4,5; 4,5), porque equilibra la producción.', 'Ahí Z=360, menos que en (0,9).'],
    ['En (3,12), con Z=690.', '(3,12) consume 30 h de corte: no es factible.']],
    'Se evalúa Z en cada vértice: Z(0,0)=0, Z(9,0)=270, Z(0,9)=450. El máximo es 450 €, con 0 sillas y 9 mesas.',
    'Evalúa la función objetivo en los tres vértices.', 'Ejemplo de la fuente; lección 6.4'),
  q('t06-e04', '02', '¿Cuándo garantiza la teoría que el máximo y el mínimo de una función lineal se alcanzan en un vértice?', [
    ['Cuando la región factible es no vacía, cerrada y acotada.', 'Es la condición del teorema fundamental.'],
    ['Siempre que la región tenga vértices.', 'Una región no acotada con vértices puede no tener máximo.'],
    ['Solo si la función objetivo tiene coeficientes positivos.', 'El signo de los coeficientes no es la condición.'],
    ['Nunca: hay que probar todos los puntos de la región.', 'Precisamente el teorema permite limitarse a los vértices.']],
    'En un polígono no vacío, cerrado y acotado, la función lineal alcanza ambos extremos y al menos un vértice alcanza cada uno.',
    'Recuerda las tres condiciones del principio de la lección.'),
  q('t06-e04', '03', tex`Se maximiza \(Z=2x+2y\) con \(x\ge0,\ y\ge0,\ x+y\le6\). ¿Qué se concluye?`, [
    ['Máximo 12, alcanzado en todos los puntos del segmento de (6,0) a (0,6).', 'Dos vértices empatan y todo el lado que los une es óptimo.'],
    ['Máximo 12, solo en (6,0).', '(0,6) y (3,3) también dan 12.'],
    ['No hay máximo porque hay un empate.', 'El empate no impide que exista el máximo.'],
    ['Máximo 12, solo en (3,3).', '(3,3) es óptimo, pero no el único.']],
    'Z=2(x+y)≤12 y la igualdad se da en x+y=6. La recta de nivel es paralela al lado óptimo.',
    'Factoriza la función objetivo.'),
  q('t06-e04', '04', tex`Se maximiza \(Z=x+y\) con \(x\ge0,\ y\ge0,\ x+y\ge2\). ¿Qué ocurre?`, [
    ['No hay máximo finito: Z crece sin límite en la región.', '(2+t,0) es factible y da Z=2+t.'],
    ['El máximo es 2, en el segmento de (2,0) a (0,2).', 'Ese es el mínimo, no el máximo.'],
    ['El máximo es infinito y se alcanza en el infinito.', 'Ningún punto factible tiene valor infinito: no hay máximo.'],
    ['La región es vacía.', '(2,0) es factible.']],
    'La región no está acotada en la dirección que aumenta Z. En cambio, el mínimo existe: Z≥2.',
    'Busca puntos factibles con valores de Z cada vez mayores.'),
  q('t06-e04', '05', tex`Con \(x\ge0,\ y\ge0,\ x+y\le1,\ x+y\ge3\), ¿cuál es el máximo de \(Z=x+y\)?`, [
    ['No existe: la región factible es vacía.', 'Las dos restricciones sobre x+y son incompatibles.'],
    ['3, en la recta x+y=3.', 'Esos puntos incumplen x+y≤1.'],
    ['1, en la recta x+y=1.', 'Esos puntos incumplen x+y≥3.'],
    ['2, el punto medio entre 1 y 3.', 'No hay ningún punto factible que evaluar.']],
    'Sin puntos factibles no hay óptimo. Cambiar la función objetivo no resuelve la incompatibilidad.',
    'Comprueba primero si la región tiene algún punto.'),
  q('t06-e04', '06', tex`Se maximiza \(Z=x+y\) con \(0\le x<1,\ 0\le y\le1\). ¿Qué se concluye?`, [
    ['No hay máximo: 2 es el supremo, pero ningún punto factible lo alcanza.', 'El lado x=1 está excluido.'],
    ['El máximo es 2, en (1,1).', '(1,1) incumple x<1.'],
    ['El máximo es 1, en (0,1).', 'Hay puntos con Z mayor, como (0,5; 1).'],
    ['La región es vacía.', '(0,0) es factible.']],
    'Los puntos (1−1/m, 1) son factibles y dan Z=2−1/m, cada vez más cerca de 2 sin llegar.',
    'Fíjate en si la frontera x=1 pertenece a la región.'),

  // 6.5 · Problemas de programación lineal
  q('t06-e05', '01', tex`En el problema de los muebles, la madera da \(x+2y\le12\) y las horas \(x+2y\le20\). ¿Qué ocurre con la restricción de horas?`, [
    ['Es redundante: la de la madera ya es más exigente.', 'Todo punto con x+2y≤12 cumple x+2y≤20.'],
    ['Las dos se contradicen y la región es vacía.', 'Son compatibles: (0,0) cumple ambas.'],
    ['Hay que sumarlas: 2x+4y≤32.', 'La suma pierde información; cada restricción se cumple por separado.'],
    ['Determina el óptimo, porque su término independiente es mayor.', 'No toca la región factible.']],
    'La región la cierran la madera y los ejes: vértices (0,0), (12,0) y (0,6). El máximo de Z=20x+35y es 240 € en (12,0).',
    'Compara las dos restricciones con el mismo primer miembro.', 'Ejercicio 1 del material original; lección 6.5'),
  q('t06-e05', '02', 'En la dieta se piden «al menos 12 unidades de proteínas». Si A aporta 2 y B aporta 4 por kg, ¿qué restricción corresponde?', [
    [tex`\(2x+4y\ge12\)`, '«Al menos» es mayor o igual.'],
    [tex`\(2x+4y\le12\)`, 'Eso limitaría las proteínas a un máximo.'],
    [tex`\(4x+2y\ge12\)`, 'Has intercambiado las aportaciones de A y B.'],
    [tex`\(x+y\ge12\)`, 'Faltan las unidades que aporta cada kilo.']],
    'Simplificando: x+2y≥6. Las necesidades mínimas producen restricciones con «≥» y una región no acotada.',
    'Multiplica cada aportación por los kilos de su producto.', 'Ejercicio 2 del material original; lección 6.5'),
  q('t06-e05', '03', 'La región de la dieta no está acotada. ¿Tiene mínimo el coste Z=4x+3y?', [
    ['Sí: 12 €, con 1,2 kg de A y 2,4 kg de B.', 'Z=(x+2y)+(3x+y)≥6+6=12, y la igualdad solo se da en (1,2; 2,4).'],
    ['No, porque la región no está acotada.', 'Una región no acotada puede tener mínimo.'],
    ['Sí: 18 €, en (0,6).', 'En (1,2; 2,4) el coste es menor.'],
    ['Sí: 0 €, en el origen.', 'El origen no cumple las necesidades mínimas.']],
    'Al minimizar un coste con coeficientes positivos, la región no acotada «se aleja» en la dirección que empeora el objetivo.',
    'Evalúa el coste en los tres vértices.', 'Ejercicio 2 del material original; lección 6.5'),
  q('t06-e05', '04', 'Con x euros en A e y euros en B, ¿cómo se traduce «la inversión en A es igual o superior a la de B»?', [
    [tex`\(x\ge y\)`, 'A debe ser al menos tanto como B.'],
    [tex`\(x\le y\)`, 'Eso dice que A no supera a B.'],
    [tex`\(x=y\)`, '«Igual o superior» permite que A sea mayor.'],
    [tex`\(x+y\ge0\)`, 'No compara las dos inversiones.']],
    'En el ejercicio, con x+y≤50, x≤30 e y≥15, el máximo de Z=0,10x+0,05y es 4 (miles de euros) en (30,20).',
    '«Igual o superior» es «mayor o igual».', 'Ejercicio 3 del material original; lección 6.5'),
  q('t06-e05', '05', 'B debe ser al menos el 40 % del tonelaje total. ¿Qué inecuación lineal resulta?', [
    [tex`\(-2x+3y\ge0\)`, 'De y≥0,4(x+y): 0,6y≥0,4x, es decir, 3y≥2x.'],
    [tex`\(y\ge0{,}4x\)`, 'El 40 % es del total x+y, no solo de A.'],
    [tex`\(y\ge40\)`, 'Es una proporción, no una cantidad fija.'],
    [tex`\(2x-3y\ge0\)`, 'El sentido queda invertido.']],
    'Se parte de y≥0,4(x+y) y se despeja: 0,6y≥0,4x ⇔ 3y≥2x ⇔ −2x+3y≥0.',
    'Escribe primero «B ≥ 40 % del total».', 'Ejercicio 5 del material original; lección 6.5'),
  q('t06-e05', '06', tex`En el problema de los drones, un vértice es \(\left(\frac{800}{3},50\right)\). ¿Hay que redondearlo para obtener la solución entera?`, [
    ['No: el máximo continuo está en (250,75), que ya es entero.', 'Si el óptimo continuo es entero, resuelve también el problema entero.'],
    ['Sí: hay que redondearlo a (267,50).', '(267,50) incumple el ensamblaje: 3·267+2·50=901>900.'],
    ['Sí: hay que redondearlo a (266,50) y ese es el óptimo.', 'Su beneficio, 39 420 €, es menor que el de (250,75).'],
    ['No, porque los drones pueden fabricarse a trozos.', 'Los drones son indivisibles; la clave es que el óptimo ya es entero.']],
    'Valores: A(25,50) 10 500 €, B(80,160) 33 600 €, C(250,75) 41 250 € y D 39 500 €. El óptimo es C, entero.',
    'Compara el valor de Z en todos los vértices.', 'Ejercicio 4 del material original; lección 6.5'),
];

// Lección donde se explica cada tarjeta original (las tarjetas conservan su categoría de la fuente).
export const linearProgrammingCardLessons = Object.freeze({
  'fc-pl-original-01': 't06-e03', 'fc-pl-original-02': 't06-e03', 'fc-pl-original-03': 't06-e03',
  'fc-pl-original-04': 't06-e03', 'fc-pl-original-05': 't06-e03', 'fc-pl-original-06': 't06-e03',
  'fc-pl-original-07': 't06-e03', 'fc-pl-original-08': 't06-e03',
  'fc-pl-original-09': 't06-e02', 'fc-pl-original-10': 't06-e01', 'fc-pl-original-11': 't06-e01', 'fc-pl-original-12': 't06-e02',
  'fc-pl-original-13': 't06-e04', 'fc-pl-original-14': 't06-e04', 'fc-pl-original-15': 't06-e04', 'fc-pl-original-16': 't06-e04',
  'fc-pl-original-17': 't06-e04', 'fc-pl-original-18': 't06-e04', 'fc-pl-original-19': 't06-e04',
});
