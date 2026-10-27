import {gaussDetails} from '../../../content/models/gauss.js';
import {fraction} from '../../../content/models/matrix-inverse.js';
import {applyRowOperation,fromIntegerRows,validateAugmented} from '../../../content/models/equivalent-systems.js';
export function generateGaussGame(seed=1){
 if(!Number.isInteger(seed)||seed<0||seed>4294967295)throw new RangeError('Semilla entera de 32 bits.');
 let state=seed>>>0;
 const pick=a=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return a[Math.floor(state/4294967296*a.length)];};
 const n=()=>pick([-2,-1,0,1,2]),u=n(),v=n(),w=n(),c=n(),d=n();
 const data=[
 ['eliminate','Eliminar sin perder condiciones',[[1,1,u+v],[2,-1,2*u-v]]],
 ['swap','Empezar con un coeficiente cero',[[0,2,2*v],[1,1,u+v]]],
 ['free','Resolver con una variable libre',[[1,0,1,u],[1,1,0,u+v]]],
 ['contradiction','Comprobar la compatibilidad',[[1,1,0,c],[1,2,1,c+d],[1,1,0,c+1]]],
 ['three','Escalonar tres ecuaciones',[[1,1,1,u+v+w],[1,2,1,u+2*v+w],[1,1,2,u+v+2*w]]],
 ['homogeneous','Estudiar un sistema homogéneo',[[1,1,1,0],[2,2,2,0],[-1,-1,-1,0]]]
 ];
 // Signs vary while preserving the intended algebraic families and input bounds.
 return data.map(([id,title,rows],index)=>{
  rows=rows.map(row=>{const k=pick([-1,1]);return row.map(x=>k*x);});
  const details=gaussDetails(rows),initial=fromIntegerRows(rows);
  const route=details.echelon.steps.map(s=>({kind:s.type,target:s.target-1,...(s.source?{source:s.source-1}:{}),...(s.factor?{scalar:s.factor}:{})}));
  return {id,index,title,rows,initial,details,route};
 });
}
/** Structural row echelon form: leading entries increase; zero rows are last.
 * Pivots need not be one. The augmented column can expose a contradiction. */
export function isEchelon(matrix){
 const a=validateAugmented(matrix);let previous=-1,zero=false;
 for(const row of a){const pivot=row.findIndex(v=>v.numerator!==0);if(pivot<0){zero=true;continue;}if(zero||pivot<=previous)return false;previous=pivot;}
 return true;
}
export function suggestOperation(matrix){
 const a=validateAugmented(matrix);let row=0;
 for(let col=0;col<a[0].length&&row<a.length;col++){
  const pivot=a.findIndex((r,i)=>i>=row&&r[col].numerator!==0);
  if(pivot<0)continue;
  if(pivot!==row)return {kind:'swap',target:row,source:pivot};
  const target=a.findIndex((r,i)=>i>row&&r[col].numerator!==0);
  if(target!==-1){
   const p=a[row][col],b=a[target][col],k=fraction(-b.numerator*p.denominator,b.denominator*p.numerator);
   if(Math.abs(k.numerator)<=9&&k.denominator<=9)return {kind:'add',target,source:row,scalar:k};
   const normalize=fraction(p.denominator,p.numerator);
   if(Math.abs(normalize.numerator)<=9&&normalize.denominator<=9&&(p.numerator!==p.denominator))return {kind:'scale',target:row,scalar:normalize};
   return null;
  }
  row++;
 }
 return null;
}
export function parseFactor(text){
 const value=String(text).trim().replaceAll('−','-').replace(',','.');
 const match=value.match(/^([+-]?\d+)(?:\/([+-]?\d+))?$/);
 if(!match)throw new RangeError('Escribe un entero o una fracción, por ejemplo −2 o 1/2.');
 const n=Number(match[1]),d=match[2]===undefined?1:Number(match[2]);
 if(!Number.isSafeInteger(n)||!Number.isSafeInteger(d)||d===0)throw new RangeError('El denominador debe ser distinto de cero.');
 const f=fraction(n,d);
 if(Math.abs(f.numerator)>9||f.denominator>9)throw new RangeError('Usa numerador entre −9 y 9 y denominador entre 1 y 9 tras simplificar.');
 return f;
}
export const createGaussState=c=>({index:c.index,phase:'working',matrix:structuredClone(c.initial),history:[],attempts:0,assisted:false,hinted:false,operations:0,result:null});
export function applyGaussStep(state,operation){
 if(state.phase!=='working')return state;
 if(state.history.length>=30)throw new RangeError('Límite de 30 pasos en la ruta. Deshaz un paso o reinicia el reto.');
 const matrix=applyRowOperation(state.matrix,operation);
 if(JSON.stringify(matrix)===JSON.stringify(state.matrix))throw new RangeError('La operación no cambia la matriz. Elige un paso que la modifique.');
 return {...state,matrix,operations:state.operations+1,history:[...state.history,{before:structuredClone(state.matrix),operation:structuredClone(operation)}]};
}
export function undoGaussStep(state){
 if(state.phase!=='working'||!state.history.length)return state;
 return {...state,matrix:structuredClone(state.history.at(-1).before),history:state.history.slice(0,-1)};
}
export function resetGaussChallenge(state,c){
 if(state.phase!=='working'||state.index!==c.index)return state;
 return {...state,matrix:structuredClone(c.initial),history:[]};
}
export function revealGaussRoute(state,c){
 if(state.phase!=='working'||state.index!==c.index)return state;
 let matrix=structuredClone(c.initial);const history=[];
 for(const operation of c.route){history.push({before:structuredClone(matrix),operation:structuredClone(operation)});matrix=applyRowOperation(matrix,operation);}
 return {...state,matrix,history,assisted:true};
}
export function checkGaussChallenge(state,c,kind){
 if(state.phase!=='working'||state.index!==c.index)return {state,ignored:true};
 if(!isEchelon(state.matrix))return {state,ignored:true,message:'La matriz aún no está escalonada. Los pivotes deben avanzar a la derecha y las filas nulas quedar al final.'};
 if(!['SCD','SCI','SI'].includes(kind))return {state,ignored:true,message:'Selecciona SCD, SCI o SI antes de comprobar.'};
 const attempts=state.attempts+1,correct=kind===c.details.kind,done=correct||attempts===2,points=done&&correct&&!state.assisted?(attempts===1?100:50):0;
 return {correct,done,points,ignored:false,state:{...state,attempts,phase:done?'resolved':'working',result:done?{correct,attempts,points,assisted:state.assisted,operations:state.operations,hinted:state.hinted}:null}};
}
