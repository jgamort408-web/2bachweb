export const definiteFamilies={
 constant:{label:'f(x)=2',tex:'2',value:x=>2,cuts:[]},
 line:{label:'f(x)=x−1',tex:'x-1',value:x=>x-1,cuts:[1]},
 valley:{label:'f(x)=|x|−1',tex:String.raw`|x|-1`,value:x=>Math.abs(x)-1,cuts:[-1,0,1]}
};
const clean=x=>Math.abs(x)<1e-12?0:x;
/** Valor exacto por trapecios en tramos lineales, separados por ceros y vértices. */
export function definiteModel(kind,a,b,n=4){
 const family=Object.hasOwn(definiteFamilies,kind)?definiteFamilies[kind]:null;
 if(!family||![a,b].every(x=>Number.isInteger(x)&&x>=-3&&x<=3)||![4,8,16,32].includes(n))throw new RangeError('Configuración de integral no admitida');
 const low=Math.min(a,b),high=Math.max(a,b),orientation=Math.sign(b-a);
 const cuts=[low,...family.cuts.filter(x=>x>low&&x<high),high];
 const segments=[];
 if(a!==b)for(let i=0;i<cuts.length-1;i++){
  const left=cuts[i],right=cuts[i+1],yLeft=family.value(left),yRight=family.value(right);
  const contribution=clean((right-left)*(yLeft+yRight)/2);
  segments.push({left,right,yLeft,yRight,contribution,area:Math.abs(contribution)});
 }
 const positive=segments.reduce((s,t)=>s+Math.max(0,t.contribution),0),negative=segments.reduce((s,t)=>s+Math.max(0,-t.contribution),0);
 const width=(high-low)/n;
 const rectangles=a===b?[]:Array.from({length:n},(_,i)=>{const left=low+i*width,right=low+(i+1)*width,mid=(left+right)/2,height=family.value(mid);return {left,right,mid,height,contribution:height*width};});
 const integral=clean(orientation*(positive-negative)),area=positive+negative;
 const approximation=clean(orientation*rectangles.reduce((s,r)=>s+r.contribution,0));
 return {family,a,b,n,low,high,orientation,segments,rectangles,positive,negative,integral,area,approximation,error:clean(Math.abs(approximation-integral))};
}
