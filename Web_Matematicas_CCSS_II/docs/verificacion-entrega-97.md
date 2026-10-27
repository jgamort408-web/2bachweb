# Verificación · entrega 97

Fuente intacta: `Página web existente/5. Inferencia Estadística/3. Error y tamaño muestral.txt`, SHA-256 `214e94920068be91a48f175564dc3a3973d1dbbb3ca116cfe5b12de864f1469a`.

Destino: [lección 9.8](../libro/temas/09-inferencia-estadistica/08-tamano-de-la-muestra-error-cometido.html). Se conserva la fórmula del margen \(E=z_{\alpha/2}\sigma/\sqrt n\), el tamaño mínimo como techo de \((z_{\alpha/2}\sigma/E_0)^2\) y el ejemplo simbólico 34,02 → 35. La figura tiene título y descripción. La calculadora requiere \(\sigma\) poblacional conocida, confianza bilateral y margen objetivo; no guarda entradas. No se ha inventado un problema completo ausente del original.

`tests/sample-size.test.mjs`: tres pruebas de redondeo, margen alcanzado, relación cuadrática, confianza y parámetros inválidos. `tests/sample-size-import-97-browser.cjs`: Chrome en raíz y subcarpeta, MathJax sin errores, cálculo con teclado, valores de 95 y 99 %, móvil 390 px con texto al 200 % y explicación utilizable sin JavaScript. Se corrigió el desbordamiento del formulario en móvil y se aislaron fórmulas largas en bloques desplazables.

Quedan cinco fuentes originales de Inferencia por revisar. Siguiente: `4. Ejercicios resueltos.txt`. La lección 9.8 mantiene estado editorial parcial; falta una revisión con lectores de pantalla y de pronunciación matemática.
