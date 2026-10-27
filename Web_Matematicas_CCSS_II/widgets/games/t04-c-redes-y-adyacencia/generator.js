import {generatedGraph,validateGraph} from '../../../content/models/graphs.js';
import {matrixTex} from '../../../content/models/matrix-basics.js';
const tex=String.raw;
export const letter=i=>String.fromCharCode(65+i);
export function connections(matrix,directed){
 return matrix.flatMap((row,i)=>row.flatMap((value,j)=>value&&(directed||i<j)?[letter(i)+(directed?' → ':' — ')+letter(j)]:[]));
}
export function generateNetworks(seed=1){
 let value=Number(seed)>>>0;
 return Array.from({length:6},(_,index)=>{
  value=(Math.imul(value,1664525)+1013904223)>>>0;
  const directed=index===2||index===3,size=index<2?3:4;
  const matrix=generatedGraph(value,size,directed);
  // Los retos dirigidos incluyen al menos un arco sin vuelta.
  if(directed){matrix[0][1]=1;matrix[1][0]=0;}
  // Última pareja: un vértice aislado, con posición variable.
  const isolated=index>=4?value%size:null;
  if(isolated!==null)for(let i=0;i<size;i++)matrix[isolated][i]=matrix[i][isolated]=0;
  const links=connections(matrix,directed);
  const title=`Red ${index+1}: ${index%2?'de la matriz al grafo':'del grafo a la matriz'}`;
  return {index,id:'network-'+index,title,directed,matrix,isolated,mode:index%2?'graph':'matrix',
   hint:directed?'Lee cada fila como origen y cada columna como destino. Una flecha de A a B no obliga a dibujar la vuelta.':'Cada arista une en ambos sentidos: escribe las dos entradas simétricas. Un vértice aislado tiene su fila y su columna a cero.',
   explanation:tex`Orden: ${matrix.map((_,i)=>letter(i)).join(', ')}. Fila = origen; columna = destino. \[A=${matrixTex(matrix)}.\] ${links.length?'Conexiones: '+links.join('; ')+'.':'No hay conexiones: todas las entradas son cero.'} ${directed?'Cada 1 representa un arco con el sentido indicado.':'Cada arista aparece dos veces en la matriz simétrica.'} La diagonal es cero porque no hay lazos.`};
 });
}
export function blankMatrix(size){return Array.from({length:size},()=>Array(size).fill(0));}
export function validAnswer(matrix,size){
 return Array.isArray(matrix)&&matrix.length===size&&matrix.every((row,i)=>Array.isArray(row)&&row.length===size&&row.every((v,j)=>[0,1].includes(v)&&(i!==j||v===0)));
}
export function mismatches(expected,actual){
 return expected.flatMap((row,i)=>row.flatMap((v,j)=>v!==actual[i][j]?[{row:i,col:j,expected:v,actual:actual[i][j]}]:[]));
}
export function createNetworkState(){return {index:0,phase:'answer',attempts:0,score:0,hints:[],results:[]};}
export function answerNetwork(state,round,matrix){
 if(state.phase!=='answer'||!round||round.index!==state.index||!validAnswer(matrix,round.matrix.length))return {state,ignored:true};
 const differences=mismatches(round.matrix,matrix),correct=differences.length===0,attempts=state.attempts+1,done=correct||attempts===2,points=correct?(attempts===1?100:50):0;
 return {correct,done,points,differences,state:{...state,attempts,score:state.score+points,phase:done?'resolved':'answer',
  results:done?[...state.results,{id:round.id,correct,attempts,points,answer:matrix.map(row=>[...row])}]:state.results}};
}
export function hintNetwork(state){
 return state.phase!=='answer'||state.hints.includes(state.index)?state:{...state,hints:[...state.hints,state.index]};
}
export function advanceNetwork(state,total=6){
 if(state.phase!=='resolved')return state;
 return {...state,index:state.index+1,phase:state.index+1===total?'summary':'answer',attempts:0};
}
export function validateRound(round){return validateGraph(round.matrix,round.directed);}
