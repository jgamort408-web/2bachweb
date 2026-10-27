const tex=String.raw;
const q=(n,lessons,prompt,answers,explanation,hint)=>({id:'review-t03-'+n,topicId:'t03',lessonId:'t03-review',lessonIds:lessons.map(n=>'t03-e0'+n),prompt,correct:'correct',options:answers.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source:'Elaboración propia: síntesis del guion 3.1–3.8'});
export const integralReviewQuestions=[
 q('01',[1,7],tex`¿Existe F derivable en ℝ con F′(x)=2x, F(0)=1 y F(1)=3?`,[
 ['No; la derivada exige F(1)−F(0)=1 y los datos exigen 2.','Las condiciones son incompatibles.'],
 ['Sí: F(x)=x²+1.','Cumple F(0)=1, pero F(1)=2.'],
 ['Sí: basta elegir una constante diferente en cada punto.','En un mismo intervalo se elige una sola constante.'],
 ['Sí: F(x)=x²+2.','Cumple F(1)=3, pero F(0)=2.']],tex`Todas las primitivas son \(x^2+C\). También \(\int_0^1 2x\,dx=1\), pero 3−1=2. No hay tal F.`,'Comprueba la diferencia entre los dos datos.'),
 q('02',[1,2,3],tex`Sean F(x)=2ln(x²+1) y G(x)=ln((x²+1)²). ¿Qué relación hay entre ellas en ℝ?`,[
 ['Son la misma función y derivan a 4x/(x²+1).','El argumento x²+1 siempre es positivo.'],
 ['Sus derivadas difieren por un factor 2.','La potencia dentro del logaritmo aporta ese factor.'],
 ['Solo coinciden en x=0.','La identidad logarítmica vale para todo x real.'],
 ['G no está definida para x<0.','El argumento es positivo también para x negativo.']],tex`Como \(x^2+1>0\), \(\ln((x^2+1)^2)=2\ln(x^2+1)\). Su derivada es \(4x/(x^2+1)\).`,'Usa la identidad del logaritmo de una potencia y revisa el dominio.'),
 q('03',[3,4,7],tex`Para \(\int_0^1\frac{2x}{1+x^2}dx\), haces u=1+x². ¿Qué integral en u es equivalente?`,[
 [tex`\(\int_1^2\frac1u\,du\)`,'Se transforman diferencial y extremos.'],
 [tex`\(\int_0^1\frac1u\,du\)`,'Has conservado límites en x mientras integras en u.'],
 [tex`\(2\int_1^2\frac1u\,du\)`,'El factor 2x ya está incluido en du.'],
 [tex`\(\int_2^1\frac1u\,du\)`,'El cambio es creciente en este intervalo; no invierte esos extremos.']],tex`du=2x dx; x=0 da u=1 y x=1 da u=2. El valor es \(\ln2\).`,'Calcula la imagen de cada extremo bajo u(x).'),
 q('04',[1,2,4,7],tex`Sabes que \((xe^x)'=(x+1)e^x\). ¿Cómo calculas \(\int_0^1(x+1)e^x dx\)?`,[
 [tex`\([xe^x]_0^1=e\)`,'La derivada dada identifica una primitiva del producto completo.'],
 [tex`\([x^2/2+x]_0^1[e^x]_0^1\)`,'No se multiplican las integrales de los factores.'],
 [tex`\([e^x]_0^1=e-1\)`,'eˣ no es una primitiva de (x+1)eˣ.'],
 [tex`\([(x+1)e^x]_0^1=2e-1\)`,'Estás evaluando el integrando.']],tex`La comprobación por derivación permite aplicar Barrow sin buscar otro método: \(1e^1-0e^0=e\).`,'Usa la primitiva que ya se ha verificado.'),
 q('05',[5,7],tex`Si f es continua, \(\int_0^2 f=3\) y \(\int_2^5 f=-1\), calcula \(\int_5^0(2f(x)-1)dx\).`,[
 ['1','La integral hacia la derecha es 2·(3−1)−5=−1; invertir da 1.'],
 ['−1','Falta invertir la orientación final.'],
 ['−3','Has tratado la integral de la constante 1 como si valiera 1.'],
 ['9','Has perdido el signo de la segunda aportación o de la resta.']],tex`\(\int_0^5 f=2\), \(\int_0^5 1dx=5\). Así \(\int_5^0(2f-1)=-(4-5)=1\).`,'Combina aditividad, linealidad y orientación.'),
 q('06',[1,5,7,8],tex`Un almacén parte de 20 kg. Su tasa neta es r(t)=4−2t kg/h en [0,3] y r(t)=−2 kg/h en (3,5]. ¿Cuál es Q(5)?`,[
 ['19 kg.','Primer tramo: +3 kg. Segundo: −4 kg.'],
 ['−1 kg.','Eso es la variación neta, sin el dato inicial.'],
 ['27 kg.','Has sumado la pérdida como si fuera una entrada.'],
 ['29 kg.','Has añadido la variación total como si toda fuera aumento.']],tex`\(Q(5)=20+\int_0^3(4-2t)dt+\int_3^5(-2)dt=20+3-4=19\) kg.`,'Usa cada expresión solo en su intervalo.'),
 q('07',[6,8],tex`Para el almacén de 20 kg con r(t)=4−2t en [0,3] y r=−2 en (3,5], ¿cuándo alcanza Q su máximo?`,[
 ['En t=2 h, con Q=24 kg.','La tasa cambia de positiva a negativa en 2.'],
 ['En t=3 h, porque allí cambia la fórmula.','Q ya está disminuyendo desde 2.'],
 ['En t=0 h, porque allí r es máxima.','Máxima tasa no significa máxima cantidad acumulada.'],
 ['En t=5 h, porque ha pasado más tiempo.','La tasa es negativa durante las últimas horas.']],tex`\(Q'=r\): Q crece hasta 2 y decrece después. \(Q(2)=20+[4t-t^2]_0^2=24\).`,'Busca el cambio de signo de la tasa, no el máximo de la tasa.'),
 q('08',[5,8],tex`En el mismo almacén, ¿cuál es \(\int_0^5|r(t)|dt\), la variación total de existencias?`,[
 ['9 kg.','Aumenta 4 kg y después disminuye 1+4 kg.'],
 ['1 kg.','Es el valor absoluto de la variación neta, no la total.'],
 ['−1 kg.','Es la variación neta con signo.'],
 ['19 kg.','Es la cantidad final.']],tex`Separa en 2 (cambio de signo) y 3 (cambio de expresión): \(4+1+4=9\) kg. Solo equivale al movimiento bruto si no hay entradas y salidas simultáneas.`,'El punto donde cambia la expresión no es el único punto relevante.'),
 q('09',[8],tex`El área entre f=x²+2 y g=2x+2, en [0,2], vale 4/3. Si sumas p(x)=x³−7 a ambas curvas, ¿cuál es la nueva área?`,[
 [tex`\(4/3\)`,'La diferencia vertical y los cortes no cambian.'],
 [tex`\(4/3+\int_0^2p(x)dx\)`,'El sumando común se cancela al restar las curvas.'],
 [tex`\(8/3\)`,'No has duplicado la separación.'],
 ['No puede saberse sin estudiar por separado todos los ceros con el eje.','Para área entre curvas importa su diferencia.']],tex`\((g+p)-(f+p)=g-f=2x-x^2\). No es una traslación rígida si p varía, pero conserva las distancias verticales y el área.`,'Resta las nuevas funciones antes de integrar.'),
 q('10',[8],tex`En [0,2], f=x² y g=x²+(x−1)² coinciden en x=1. ¿Qué planteamiento calcula su área?`,[
 [tex`\(\int_0^2(x-1)^2dx=2/3\)`,'g está encima a ambos lados del contacto.'],
 ['Hay que invertir el signo en x=1 porque todo corte cambia el orden.','La diferencia es un cuadrado y no cambia de signo.'],
 ['El área es cero porque las curvas se tocan.','Solo coinciden en un punto.'],
 [tex`\(\int_0^2(2x^2+(x-1)^2)dx\)`,'Has sumado las alturas en lugar de restarlas.']],tex`\(g-f=(x-1)^2\ge0\). Se puede partir en 1, pero no hay cambio de función superior. \([(x-1)^3/3]_0^2=2/3\).`,'Estudia el signo a ambos lados; no basta localizar el corte.'),
 q('11',[5,8],tex`f es continua y no negativa en [0,1]. Si \(\int_0^1f(x)dx=0\), ¿qué puedes afirmar?`,[
 ['f vale cero en todo [0,1].','Una altura positiva, por continuidad, daría una región de área positiva.'],
 ['Puede haber áreas positivas y negativas que se compensen.','No hay valores negativos bajo las hipótesis.'],
 ['Solo se sabe que f(0)=0.','La conclusión afecta a todo el intervalo.'],
 ['La integral no existe.','Una función continua en un intervalo cerrado es integrable.']], 'Si f fuera positiva en algún punto, por continuidad sería positiva y acotada por debajo por una constante positiva en un pequeño tramo, también lateral en un extremo. Su integral sería positiva: contradicción.', 'La continuidad y el signo no negativo son esenciales en este argumento.'),
 q('12',[5,7,8],tex`Elige k para que \(\int_0^2(x-k)dx=0\). Con ese k, ¿cuánto vale el área con el eje en [0,2]?`,[
 ['k=1; área 1.','La integral se anula por compensación de dos triángulos de área 1/2.'],
 ['k=1; área 0.','Integral nula no implica área nula cuando hay cambio de signo.'],
 ['k=2; área 2.','Con k=2 la integral vale −2.'],
 ['k=0; área 2.','Con k=0 la integral vale 2.']],tex`\([x^2/2-kx]_0^2=2-2k=0\) da k=1. El área es \(-\int_0^1(x-1)dx+\int_1^2(x-1)dx=1\).`,'Primero resuelve la condición integral; después estudia el signo.')
];
