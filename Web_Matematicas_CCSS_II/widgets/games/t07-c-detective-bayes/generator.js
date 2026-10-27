export const contexts=[
 {name:'Piezas de dos máquinas',cause:'fabricada por la máquina A',result:'presenta un defecto'},
 {name:'Mensajes filtrados',cause:'es un mensaje no deseado',result:'contiene la palabra señalada'},
 {name:'Envíos',cause:'procede del almacén A',result:'llega tarde'},
 {name:'Solicitudes',cause:'procede del grupo A',result:'requiere revisión'},
 {name:'Pedidos',cause:'es del proveedor A',result:'incluye una incidencia'},
 {name:'Campaña',cause:'pertenece al segmento A',result:'responde a la propuesta'}
];
export function bayesValues(prior,likelihood,alternative){
 if(![prior,likelihood,alternative].every(x=>Number.isInteger(x)&&x>0&&x<100))throw new RangeError('Porcentajes inválidos');
 const causePath=prior*likelihood/100;
 const otherPath=(100-prior)*alternative/100;
 const total=causePath+otherPath;
 return {causePath,otherPath,total,posterior:Math.round(1000*causePath/total)/10};
}
export function generateSession(random=Math.random){
 const pick=(start,end)=>start+10*Math.floor(random()*((end-start)/10+1));
 return contexts.map(context=>{
  const prior=pick(10,60),likelihood=pick(50,90),alternative=pick(10,40);
  return {...context,prior,likelihood,alternative,...bayesValues(prior,likelihood,alternative)};
 });
}
