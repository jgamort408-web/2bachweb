/**
 * Ocho casos / trece decisiones. Los modelos describen las alternativas
 * para poder contrastarlas numéricamente sin interpretar ni ejecutar LaTeX.
 */
const math = (text) => '\\(' + text + '\\)';
const signed = (value) => value < 0 ? '-' + Math.abs(value) : '+' + value;
const power = (coefficient, exponent) => coefficient + 'x^{' + exponent + '}';
const linear = (m, b) => m + 'x' + signed(b);
const quadratic = (a, b, c) => a + 'x^2' + signed(b) + 'x' + signed(c);
const rules = [
  ['power', 'Potencia y factor constante'],
  ['product', 'Producto'],
  ['quotient', 'Cociente'],
  ['chain', 'Cadena'],
];
function question(id, prompt, options, explanation, hint, extra = {}) {
  return { id, prompt, options, correct:'correct', explanation, hint, ...extra };
}
function option(id, latex, feedback, model) {
  return { id, text:math(latex), feedback, model };
}
function ruleQuestion(caseNumber, family, expression, explanation) {
  const choices = family === 'lateral'
    ? [['lateral','Comparar las derivadas laterales'],...rules.slice(0,3)]
    : rules;
  return question('detective-'+caseNumber+'-rule',
    'Caso '+caseNumber+' · Justifica. Para '+math('f(x)='+expression)+', ¿qué procedimiento principal hemos utilizado respetando su escritura?',
    choices.map(([id,text])=>({id:id===family?'correct':id,text,
      feedback:id===family?'Ese es el procedimiento del desarrollo.':'Revisa la operación exterior o el comportamiento en la unión.'})),
    explanation,'Identifica la operación que conecta las partes. En un punto de unión, compara ambos lados.',
    {caseNumber,family,stage:'rule'});
}

export function generateDetectiveSession(seed) {
  let state=seed>>>0;
  const integer=(min,max)=>{
    state=(Math.imul(1664525,state)+1013904223)>>>0;
    return min+Math.floor(state/4294967296*(max-min+1));
  };
  const nonzero=()=>integer(1,3)*(integer(0,1)?1:-1);
  const session=[];
  const addCase=(caseNumber,family,expression,options,explanation,hint,parameters)=>{
    session.push(question('detective-'+caseNumber+'-derivative',
      'Caso '+caseNumber+' · Elige la derivada de '+math('f(x)='+expression)+'.'+(family==='quotient'?' Dominio: '+math('x\\ne'+parameters.b)+'.':''),
      options,explanation,hint,{caseNumber,family,stage:'derivative',parameters}));
    session.push(ruleQuestion(caseNumber,family,expression,explanation));
  };

  // 1. Potencia. a != n evita dos distractores equivalentes.
  const n=integer(2,5);
  let a=integer(2,5); if(a===n)a++;
  const monomial=(coefficient,exponent)=>({type:'monomial',coefficient,exponent});
  addCase(1,'power',power(a,n),[
    option('correct',power(a*n,n-1),'Multiplicas por el exponente y lo reduces en una unidad.',monomial(a*n,n-1)),
    option('exponent',power(a,n-1),'Has reducido el exponente, pero falta multiplicar por él.',monomial(a,n-1)),
    option('constant',power(n,n-1),'Has perdido el factor constante exterior.',monomial(n,n-1)),
    option('degree',power(a*n,n),'El exponente debe disminuir en una unidad.',monomial(a*n,n)),
  ],math("f'(x)="+power(a*n,n-1))+'. El factor '+a+' se conserva y la derivada de '+math('x^{'+n+'}')+' es '+math(power(n,n-1))+'.',
  'Conserva el factor constante y aplica la regla de la potencia.',{a,n});

  // 2. Producto con exponencial, sin coincidencia entre distractores.
  const p=nonzero(), k=integer(2,4);
  const productModel=(slope,intercept)=>({type:'exp-linear',slope,intercept,k});
  const productTex=(slope,intercept)=>'('+linear(slope,intercept)+')e^{'+k+'x}';
  addCase(2,'product','(x'+signed(p)+')e^{'+k+'x}',[
    option('correct',productTex(k,1+k*p),'La derivada es la suma de dos términos.',productModel(k,1+k*p)),
    option('missing-first',productTex(k,k*p),'Falta el término que deriva el primer factor.',productModel(k,k*p)),
    option('missing-second','e^{'+k+'x}','Falta el término que deriva la exponencial.',productModel(0,1)),
    option('multiply',k+'e^{'+k+'x}','Has multiplicado las derivadas: el producto exige sumar dos términos.',productModel(0,k)),
  ],math("f'=1\\cdot e^{"+k+"x}+(x"+signed(p)+')'+k+'e^{'+k+'x}')+' = '+math(productTex(k,1+k*p))+'. La derivada interior de la exponencial aporta '+k+'.',
  'Usa derivada del primero por segundo, más primero por derivada del segundo.',{a:p,k});

  // 3. Cociente. Numerador derivado: x² - 2bx - c.
  const b=nonzero(), c=integer(1,4);
  const fraction=(numerator,denominatorPower)=>'\\frac{'+numerator+'}{(x'+signed(-b)+')^{'+denominatorPower+'}}';
  const rational=(coefficients,denominatorPower)=>({type:'rational',coefficients,b,denominatorPower});
  const numerator=quadratic(1,-2*b,-c);
  addCase(3,'quotient','\\frac{x^2+'+c+'}{x'+signed(-b)+'}',[
    option('correct',fraction(numerator,2),'El segundo producto se resta y el denominador se eleva al cuadrado.',rational([1,-2*b,-c],2)),
    option('separate','2x','No se deriva el cociente dividiendo las derivadas.',monomial(2,1)),
    option('sign',fraction(quadratic(3,-2*b,c),2),'Has sumado los productos; la regla del cociente los resta.',rational([3,-2*b,c],2)),
    option('denominator',fraction(numerator,1),'Falta elevar el denominador al cuadrado.',rational([1,-2*b,-c],1)),
  ],math("f'=\\frac{2x(x"+signed(-b)+')-(x^2+'+c+')}{(x'+signed(-b)+')^2}')+' = '+math(fraction(numerator,2))+'. Se conserva '+math('x\\ne'+b)+'.',
  'Escribe la regla completa antes de sustituir: derivada de arriba por abajo, menos arriba por derivada de abajo; todo sobre abajo al cuadrado.',{b,c});

  // 4. Cadena. m >= 2 distingue olvidar el factor interior.
  const m=integer(2,4), d=nonzero(), exponent=integer(2,4);
  const inner='('+linear(m,d)+')';
  const composed=(coefficient,pow)=>({type:'composed-power',coefficient,m,b:d,exponent:pow});
  const composedTex=(coefficient,pow)=>coefficient+inner+'^{'+pow+'}';
  addCase(4,'chain',inner+'^{'+exponent+'}',[
    option('correct',composedTex(m*exponent,exponent-1),'Has incluido la derivada interior.',composed(m*exponent,exponent-1)),
    option('interior',composedTex(exponent,exponent-1),'Olvidaste multiplicar por la derivada interior.',composed(exponent,exponent-1)),
    option('sign',composedTex(-m*exponent,exponent-1),'La derivada interior es positiva; no aparece ese signo menos.',composed(-m*exponent,exponent-1)),
    option('degree',composedTex(m*exponent,exponent),'La potencia exterior debe reducir su exponente.',composed(m*exponent,exponent)),
  ],math("f'="+exponent+inner+'^{'+(exponent-1)+'}\\cdot'+m)+' = '+math(composedTex(m*exponent,exponent-1))+'.',
  'Deriva la potencia exterior y multiplica por la derivada de su argumento.',{m,b:d,n:exponent});

  // 5. Laterales. La función es continua, pero no tiene derivada en la esquina.
  const point=nonzero(), slope=integer(2,5), absolute=slope+'|x'+signed(-point)+'|';
  const lateralExplanation='La función es continua en '+math('x='+point)+', pero '+math("f'_-("+point+')=-'+slope)+' y '+math("f'_+("+point+')='+slope)+'. Al ser distintas, no hay derivada en ese punto.';
  session.push(question('detective-5-derivative','Caso 5 · Para '+math('f(x)='+absolute)+', ¿qué ocurre con la derivada en '+math('x='+point)+'?',[
    {id:'correct',text:'No existe: las derivadas laterales son distintas.',feedback:'La esquina impide una pendiente única.'},
    option('right',String(slope),'Este es solo el resultado por la derecha.'),
    option('left',String(-slope),'Este es solo el resultado por la izquierda.'),
    option('mean','0','Las derivadas laterales no se promedian.'),
  ],lateralExplanation,'Escribe el valor absoluto por tramos; a la izquierda cambia el signo.',
  {caseNumber:5,family:'lateral',stage:'derivative',parameters:{a:point,k:slope}}));
  session.push(ruleQuestion(5,'lateral',absolute,lateralExplanation));

  // 6–8. El primer error varía entre los cuatro pasos. Las consecuencias
  // posteriores se arrastran para que el desarrollo sea coherente con ese error.
  for (const [offset,family] of ['chain','product','quotient'].entries()) {
    const errorStep=1+((seed>>>0)+offset)%4;
    let expression, steps, explanation, parameters;
    if(family==='chain'){
      const m=integer(2,4), b=nonzero(), n=integer(2,4), inner='('+linear(m,b)+')';
      const interior=errorStep===1?m+1:m, pow=errorStep===2?n:n-1;
      const coefficient=errorStep===3?n:n*interior, finalCoefficient=errorStep===4?coefficient+1:coefficient;
      expression=inner+'^{'+n+'}';
      steps=[
        'Identifico '+math('u(x)='+linear(m,b))+' y escribo '+math("u'(x)="+interior)+'.',
        'Para '+math('F(u)=u^{'+n+'}')+', escribo '+math("F'(u)="+n+'u^{'+pow+'}')+'.',
        'Aplico la composición: '+math("f'(x)="+n+inner+'^{'+pow+'}'+(errorStep===3?'':'\\cdot'+interior))+'.',
        'Simplifico: '+math("f'(x)="+finalCoefficient+inner+'^{'+pow+'}')+'.',
      ];
      explanation=['La derivada interior es '+m+', no '+interior+'.','La potencia exterior debe quedar con exponente '+(n-1)+'.','Falta multiplicar por la derivada interior '+m+'.','El coeficiente es '+n+'·'+m+'='+n*m+', no '+finalCoefficient+'.'][errorStep-1]+' Resultado: '+math("f'="+n*m+inner+'^{'+(n-1)+'}')+'.';
      parameters={m,b,n,errorStep};
    }else if(family==='product'){
      const a=nonzero(), k=integer(2,4), du=errorStep===1?2:1, dv=errorStep===2?1:k;
      const linearCoefficient=errorStep===3?0:dv;
      const constant=errorStep===3?du*dv:du+dv*a;
      expression='(x'+signed(a)+')e^{'+k+'x}';
      steps=[
        'Para '+math('u=x'+signed(a))+', tomo '+math("u'="+du)+'.',
        'Para '+math('v=e^{'+k+'x}')+', tomo '+math("v'="+dv+'e^{'+k+'x}')+'.',
        'Uso '+math(errorStep===3?"f'=u'v'":"f'=u'v+uv'")+'.',
        'Obtengo '+math("f'=("+linear(linearCoefficient,errorStep===4?constant+1:constant)+')e^{'+k+'x}')+'.',
      ];
      explanation=['La derivada de x más una constante es 1.','Falta el factor interior '+k+' de la exponencial.','No se multiplican las derivadas: se usa la suma de dos productos.','Hay un error al agrupar los coeficientes.'][errorStep-1]+' Resultado: '+math("f'=("+linear(k,1+k*a)+')e^{'+k+'x}')+'.';
      parameters={a,k,errorStep};
    }else{
      const b=nonzero(), c=integer(1,4), du=errorStep===1?1:2, dv=errorStep===2?0:1, sign=errorStep===3?1:-1;
      expression='\\frac{x^2+'+c+'}{x'+signed(-b)+'}';
      steps=[
        'Para '+math('u=x^2+'+c)+', tomo '+math("u'="+du+'x')+'.',
        'Para '+math('v=x'+signed(-b))+', tomo '+math("v'="+dv)+'.',
        'Uso '+math("f'=\\frac{u'v"+(sign===1?'+':'-')+"uv'}{v^2}")+'.',
        'Obtengo '+math("f'=\\frac{"+quadratic(du+sign*dv,-du*b,sign*dv*c)+'}{(x'+signed(-b)+')^{'+(errorStep===4?1:2)+'}}')+'.',
      ];
      explanation=['La derivada del numerador es 2x.','La derivada del denominador es 1.','El segundo producto debe restarse.','El denominador debe permanecer al cuadrado.'][errorStep-1]+' Resultado: '+math("f'=\\frac{"+quadratic(1,-2*b,-c)+'}{(x'+signed(-b)+')^2}')+', con '+math('x\\ne'+b)+'.';
      parameters={b,c,errorStep};
    }
    const caseNumber=offset+6;
    session.push(question('detective-'+caseNumber+'-error',
      'Caso '+caseNumber+' · Localiza el primer paso erróneo al derivar '+math('f(x)='+expression)+'.'+(family==='quotient'?' Trabaja con '+math('x\\ne'+parameters.b)+'.':''),
      steps.map((_,i)=>({id:i+1===errorStep?'correct':'step-'+(i+1),text:'Paso '+(i+1),
        feedback:i+1===errorStep?'Has localizado el origen del error.':i+1<errorStep?'Este paso todavía es correcto.':'Hay un error anterior; revisa desde el principio.'})),
      explanation,'Revisa cada igualdad desde arriba. Un resultado posterior puede arrastrar un error anterior.',
      {caseNumber,family,stage:'error',steps,parameters}));
  }
  return session;
}
