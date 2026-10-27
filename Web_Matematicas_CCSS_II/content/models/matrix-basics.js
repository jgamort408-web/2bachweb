export const presets={
 data:[[24,15,8],[10,20,18]],row:[[2,-1,0]],column:[[2],[-1],[0]],square:[[1,2],[3,4]],
 zero:[[0,0,0],[0,0,0]],diagonal:[[2,0,0],[0,0,0],[0,0,-1]],scalar:[[-2,0],[0,-2]],identity:[[1,0,0],[0,1,0],[0,0,1]]
};
export function dimensions(a){
 if(!Array.isArray(a)||!a.length||!Array.isArray(a[0])||!a[0].length||a.some(row=>!Array.isArray(row)||row.length!==a[0].length||row.some(x=>!Number.isFinite(x))))throw new TypeError('Se necesita una matriz rectangular de números finitos.');
 return {rows:a.length,cols:a[0].length};
}
export function classifyMatrix(a){
 const {rows,cols}=dimensions(a),square=rows===cols,zero=a.every(row=>row.every(x=>x===0)),diagonal=square&&a.every((row,i)=>row.every((x,j)=>i===j||x===0));
 const scalar=diagonal&&a.every((row,i)=>row[i]===a[0][0]),identity=scalar&&a[0][0]===1;
 return {rows,cols,count:rows*cols,row:rows===1,column:cols===1,rectangular:!square,square,zero,diagonal,scalar,identity};
}
export function equalMatrices(a,b){const d=dimensions(a),e=dimensions(b);return d.rows===e.rows&&d.cols===e.cols&&a.every((row,i)=>row.every((x,j)=>x===b[i][j]));}
export function resizeMatrix(a,rows,cols){
 dimensions(a);if(!Number.isInteger(rows)||!Number.isInteger(cols)||rows<1||rows>4||cols<1||cols>4)throw new RangeError('Orden entre 1 y 4.');
 return Array.from({length:rows},(_,i)=>Array.from({length:cols},(_,j)=>a[i]?.[j]??0));
}
export function generatedMatrix(rows,cols,seed=1){
 let state=Number(seed)>>>0;
 const a=resizeMatrix([[0]],rows,cols);
 return a.map(row=>row.map(()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return Math.floor(state/4294967296*7)-3;}));
}
export function matrixTex(a){dimensions(a);return String.raw`\begin{pmatrix}${a.map(row=>row.join('&')).join(String.raw`\\`)}\end{pmatrix}`;}
export const typeLabels={row:'Fila',column:'Columna',rectangular:'Rectangular no cuadrada',square:'Cuadrada',zero:'Nula',diagonal:'Diagonal',scalar:'Escalar',identity:'Identidad'};
