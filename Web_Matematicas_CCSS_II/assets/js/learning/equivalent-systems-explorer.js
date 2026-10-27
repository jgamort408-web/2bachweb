import {equivalentPresets,fromIntegerRows,applyRowOperation,inverseOperation,operationTex,augmentedTex,equivalentSystemTex,generatedEquivalentRows} from '../../../content/models/equivalent-systems.js';
import {fraction} from '../../../content/models/matrix-inverse.js';
import {updateMath} from '../core/math.js';
const tex=String.raw;
export function initializeEquivalentSystemsExplorer(){
 const root=document.querySelector('[data-equivalence-explorer]');if(!root)return;
 const el=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
 let initial=fromIntegerRows(equivalentPresets.unique.rows),current=structuredClone(initial),history=[];
 const controls=el('div');controls.className='actions';
 function select(label,key,options){const wrap=el('label',label+' '),s=el('select');s.dataset[key]='';for(const [value,text]of options){const o=el('option',text);o.value=value;s.append(o);}wrap.append(s);controls.append(wrap);return s;}
 const preset=select('Sistema inicial','equivalencePreset',Object.entries(equivalentPresets).map(([key,v])=>[key,v.label]));
 const generated=el('option','Variante generada');generated.value='generated';generated.disabled=true;preset.append(generated);
 const kind=select('Operación','equivalenceKind',[['add','Sumar un múltiplo de otra fila'],['swap','Intercambiar dos filas'],['scale','Multiplicar una fila']]);
 const target=select('Fila de destino','equivalenceTarget',[]),source=select('Otra fila','equivalenceSource',[]);
 const scalar=select('Factor','equivalenceScalar',[['-3','−3'],['-2','−2'],['-1','−1'],['-1/2','−1/2'],['0','0'],['1/2','1/2'],['1','1'],['2','2'],['3','3']]);scalar.value='-2';
 const actions=el('div');actions.className='actions';
 function button(text,key,handler){const b=el('button',text);b.type='button';b.dataset[key]='';b.addEventListener('click',handler);actions.append(b);return b;}
 const apply=button('Aplicar operación','equivalenceApply',()=>{
  if(history.length>=30){status.textContent='Has alcanzado 30 pasos. Deshaz alguno o reinicia el sistema.';return;}
  const [n,d=1]=scalar.value.split('/').map(Number),op={kind:kind.value,target:Number(target.value),source:Number(source.value),scalar:fraction(n,d)};
  try{
   const next=applyRowOperation(current,op);history.push({before:structuredClone(current),op});current=next;status.textContent='Operación aplicada a toda la fila, incluido el término independiente.';render();
  }catch(error){status.textContent=error.message;}
 });
 const undo=button('Deshacer último paso','equivalenceUndo',()=>{const step=history.pop();if(!step)return;current=step.before;status.textContent='Último paso deshecho.';render();});
 button('Reiniciar sistema','equivalenceReset',()=>{current=structuredClone(initial);history=[];status.textContent='Sistema restaurado.';render();});
 button('Generar variante','equivalenceGenerate',()=>{const seed=crypto.getRandomValues(new Uint32Array(1))[0];root.dataset.seed=seed;initial=generatedEquivalentRows(seed,current.length,current[0].length-1);preset.value='generated';restart();});
 const status=el('p');status.dataset.equivalenceStatus='';status.setAttribute('role','status');
 const output=el('div');output.dataset.equivalenceOutput='';output.setAttribute('aria-live','polite');
 root.replaceChildren(controls,el('p','Selecciona filas distintas al intercambiar o sumar múltiplos. El factor 0 está disponible para comprobar por qué no puede usarse al multiplicar una fila. Las operaciones se aplican a la ampliada completa. Hasta 30 pasos, con fracciones exactas; no se guardan fuera de esta sesión.'),actions,status,output);
 function controlsState(){source.disabled=kind.value==='scale';scalar.disabled=kind.value==='swap';}
 kind.addEventListener('change',controlsState);
 function restart(){
  current=structuredClone(initial);history=[];status.textContent='';
  for(const s of [source,target]){s.replaceChildren();for(let i=0;i<current.length;i++){const o=el('option','Fila '+(i+1));o.value=i;s.append(o);}}
  target.value='1';source.value='0';controlsState();render();
 }
 preset.addEventListener('change',()=>{if(preset.value==='generated')return;initial=fromIntegerRows(equivalentPresets[preset.value].rows);restart();});
 function render(){
  undo.disabled=history.length===0;apply.disabled=history.length>=30;
  const start=structuredClone(initial),now=structuredClone(current),steps=structuredClone(history);
  return updateMath(output,()=>{
   output.dataset.snapshot=JSON.stringify(now);output.dataset.steps=String(steps.length);
   output.replaceChildren(el('h3','Sistema inicial'),el('p',tex`\[${equivalentSystemTex(start)}\]`),
    el('h3','Sistema equivalente actual'),el('p',tex`\[${equivalentSystemTex(now)}\]`),el('p',tex`\[(A|B)_{\text{actual}}=${augmentedTex(now)}.\]`),
    el('p',steps.length+' de 30 pasos. Todas las operaciones aceptadas son reversibles y conservan el conjunto solución.'));
   const last=steps.at(-1);
   if(last){output.append(el('p',tex`Último paso: \(${operationTex(last.op)}\). Para invertirlo: \(${operationTex(inverseOperation(last.op))}\).`));}
   const list=el('ol');list.dataset.contentRole='worked-steps';
   steps.forEach(step=>list.append(el('li',tex`\(${operationTex(step.op)}\)`)));
   if(steps.length)output.append(el('h3','Pasos de esta sesión'),list);
   now.forEach((row,i)=>{if(row.slice(0,-1).every(v=>v.numerator===0))output.append(el('p',row.at(-1).numerator===0?'La fila '+(i+1)+' es 0=0: no impone restricciones; revisa las otras filas.':'La fila '+(i+1)+' expresa una contradicción: el sistema inicial y el actual no tienen solución.'));});
   output.append(el('p','La equivalencia se justifica por la reversibilidad de los pasos; comprobar solo un punto no bastaría. Este taller prepara las operaciones de Gauss, pero no elige un procedimiento de resolución por ti.'));
  });
 }
 restart();
}
