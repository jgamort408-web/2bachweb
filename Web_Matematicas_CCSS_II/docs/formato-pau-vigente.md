# Formato de la PAU vigente y generador de exámenes

Actualizado: 7 de noviembre de 2026 · Base de la tarea P10 del [plan operativo](../../PLAN_WEB_OPERATIVA.md).

## Fuente

- [Directrices y orientaciones generales 2025/2026](<../../Instrucciones PEvAU/sel_2025-2026-Orientaciones_matematicas_aplicadas.pdf>) de Matemáticas Aplicadas a las CC. SS. II (Universidades Públicas de Andalucía, 11 páginas), aportadas por el docente. Original de solo lectura.
- Contiene: saberes evaluables (apartado 1º), estructura de la prueba (2º), notación y materiales (3º), criterios generales de corrección (4º), tabla de la N(0, 1) y un modelo de prueba con sus criterios específicos (6º y 7º).

## Estructura de la prueba

Modelo único de **4 ejercicios**, 10 puntos, **1 hora y 30 minutos**.

| Ejercicio | Puntos | Saberes básicos | Temas del banco | En el modelo de ejemplo |
|---|---|---|---|---|
| 1 | 3 | A1 (matrices), C2 (modelización, programación lineal), C3 (sistemas, Cramer, ecuaciones matriciales) | T04, T05, T06 | a) sistema 3×3 en contexto (precios con descuento) · b) programación lineal |
| 2 | 3 | B1 (integrales, áreas, Barrow), B2 (derivadas y aplicaciones), C4 (estudio y representación de funciones) | T01, T02, T03 | a) derivada dada en contexto: monotonía, extremos, primitiva · b) área entre una parábola y una recta en contexto |
| 3 | 2 | D1 (probabilidad), D2 (binomial y normal), D3 (inferencia) | T07, T08, T09 | Binomial con n = 6 (cuatro apartados) |
| 4 | 2 | D1, D2, D3 | T07, T08, T09 | Intervalo de confianza para la media y tamaño muestral mínimo |

Reglas del documento que el generador debe respetar:

- **Opcionalidad.** Algunos ejercicios pueden ofrecer elegir entre a) y b). Si se responde a más de lo pedido, solo se corrige lo primero. No siempre habrá opcionalidad en los ejercicios 1 y 2: el modelo es solo un ejemplo.
- **Obligatoriedad entre el 40 % y el 50 %** de la prueba. Con a)/b) en los ejercicios 1 y 2 y los ejercicios 3 y 4 obligatorios, la parte obligatoria es 4 de 10 puntos (40 %). Si el ejercicio 1 o el 2 no tiene opcionalidad, la parte obligatoria pasa del 50 %, salvo que haya opcionalidad dentro de los ejercicios 3 y 4.
- **50 % de carácter competencial** (problemas en contexto). Los ejercicios tendrán, en general, carácter práctico.
- **Sin apartados encadenados** en lo posible: la respuesta de un apartado no debe depender de los cálculos de otro.
- Puntuación máxima indicada en cada ejercicio, parte o apartado.
- Cabecera con las instrucciones a)–g) del modelo (duración, número de ejercicios, opcionalidad, puntuación, justificación, calculadora, corrección lingüística hasta el 10 %).
- Se facilita al alumnado la **tabla de la N(0, 1)** (página 8): P(Z ≤ z) de 0.00 a 4.09, con cuatro decimales hasta 2.69 y cinco desde 2.70.

## Notación de la prueba (apartado 3.1)

- Punto decimal (7.5) y **ningún separador de millares**. El banco ya sigue esta notación; las lecciones de la web usan la coma decimal y el espacio fino de los millares. Las salidas del generador (LaTeX e impresión) mantienen la notación de la prueba.
- Matrices: A · B producto, Aᵗ traspuesta, Iₙ identidad, |A| determinante, O matriz nula.
- ln(x) neperiano y log(x) decimal.
- Discontinuidades: evitable, de salto finito o de salto infinito.
- f es convexa en x cuando f″(x) > 0. «Extremos», «óptimos», «máximos y mínimos», «locales», «relativos», «absolutos» o «globales» se usan indistintamente.
- Sucesos: Aᶜ contrario; A − B = A ∩ Bᶜ.
- Inferencia: muestreo aleatorio simple; en poblaciones finitas, con reemplazamiento; muestras grandes si n ≥ 30.
- Binomial por normal si n·p ≥ 5 y n·(1 − p) ≥ 5, con corrección por continuidad.

## Criterios de corrección útiles para las soluciones

- Se valoran el planteamiento y su desarrollo; describir sin ejecutar no puntúa.
- Errores de cálculo no conceptuales: hasta un 10 % del ejercicio o apartado.
- Lectura inversa de la tabla normal: valen la interpolación o el valor más cercano de la tabla.
- Ortografía y presentación: como máximo 1 punto (las dos primeras faltas no penalizan; desde la tercera, −0.10 cada una; redacción y presentación hasta −0.5).

**Incoherencia del propio modelo.** En el ejercicio 2 a), el enunciado puntúa i) con 1 punto y ii) con 0.75, y los criterios específicos con 1.25 y 0.5 (las dos sumas dan 3). Se registra sin corregir; no afecta al generador.

## Cobertura del banco frente al formato

El banco (640 ejercicios, 2008–2021) procede del formato anterior: dos opciones de cuatro ejercicios de 2.5 puntos. Recuento por tema principal y, entre paréntesis, ejercicios con algún epígrafe del tema.

| Ejercicio | Material disponible | Carencia |
|---|---|---|
| 1 | T04 matrices 81 · T06 programación lineal 83 · T05 sistemas 2 (8) | Pocos sistemas en contexto o con Cramer: el formato anterior no los pedía como ejercicio propio. |
| 2 | T01 límites y derivadas 105 · T02 representación 60 · T03 integrales 1 (21) | Las integrales casi siempre son un apartado final de un ejercicio de análisis; casi no hay ejercicios de áreas como el 2 b) del modelo. |
| 3 y 4 | T07 probabilidad 166 · T09 inferencia 142 · T08 distribuciones 0 (binomial 4, normal 121 dentro de inferencia) | No hay ejercicios de binomial o normal como el 3 del modelo: no entraban en la prueba anterior. |

Contenido del banco **fuera de los saberes vigentes**: el contraste de hipótesis (31 ejercicios con la etiqueta `contraste-hipotesis`). D3 solo incluye estimación, intervalos de confianza y tamaño muestral.

## Reglas propuestas para el generador (P10)

Valores por defecto razonados a partir del documento; el docente puede cambiarlos.

1. **Plantilla del modelo.** Ejercicio 1 con a)/b) de T04–T06, ejercicio 2 con a)/b) de T01–T03, ejercicio 3 de T07 y ejercicio 4 de T09, ambos obligatorios. Resultado: 40 % obligatorio.
2. **Sentido dentro de cada ejercicio.** Las dos opciones a) y b) tratan ideas distintas: por ejemplo, matrices o sistemas frente a programación lineal; derivadas frente a representación o integrales. Los ejercicios 3 y 4 son de temas distintos.
3. **Sin repeticiones.** Ningún ejercicio dos veces y, si es posible, cada uno de un examen de origen distinto.
4. **Exclusiones.** Se excluyen los ejercicios fuera de los saberes vigentes (contraste de hipótesis) y los que no estén cotejados. Las soluciones solo aparecen si están validadas y el docente las ha activado.
5. **Puntuación.** Los ejercicios originales valen 2.5 puntos (568), 3 (48) o 4 (24). Las puntuaciones de los apartados están escritas en el enunciado como `\textbf{(x puntos)}`. Al llevar un ejercicio a una pregunta de 3 o 2 puntos, se reescalan proporcionalmente, en múltiplos de 0.25 y con el total exacto. Se indica «Puntuación adaptada al formato vigente (original: 2.5 puntos)».
6. **Modo guiado.** El usuario fija el tema, el epígrafe, las etiquetas o el ejercicio concreto de cada hueco. El resto se completa al azar con las mismas reglas.
7. **Salidas.** Las mismas que P09: impresión y LaTeX, con y sin soluciones. Incluyen la cabecera con las instrucciones a)–g) y, como anexo, la tabla de la N(0, 1) del documento.
8. **Avisos, no bloqueos.** Se avisa cuando una plantilla no cumple la obligatoriedad del 40–50 % o cuando falta material para un hueco (integrales, binomial). Las carencias se muestran, sin ejercicios inventados.

No se puede comprobar automáticamente el 50 % competencial, porque el banco no clasifica qué ejercicios son competenciales. Por ahora queda a criterio del docente al revisar el examen generado.
