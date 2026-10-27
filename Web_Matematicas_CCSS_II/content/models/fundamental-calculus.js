const tex=String.raw;
export const accumulationFamilies={
 line:{label:'f(t)=t−1',tex:'t-1',value:t=>t-1,base:t=>t*t/2-t,cuts:[1]},
 quadratic:{label:'f(t)=t²−1',tex:'t^2-1',value:t=>t*t-1,base:t=>t*t*t/3-t,cuts:[-1,1]},
 absolute:{label:'f(t)=|t|',tex:'|t|',value:t=>Math.abs(t),base:t=>t*Math.abs(t)/2,cuts:[0]},
 jump:{label:'f(t)=−1 si t<0; f(t)=1 si t≥0',tex:tex`\begin{cases}-1,&t<0,\\1,&t\ge0.\end{cases}`,value:t=>t<0?-1:1,base:t=>Math.abs(t),cuts:[0]}
};
const clean=n=>Math.abs(n)<1e-12?0:n;
export function accumulationModel(kind,a,x,h){
 const family=Object.hasOwn(accumulationFamilies,kind)?accumulationFamilies[kind]:null;
 if(!family||![-1,0,1].includes(a)||!Number.isFinite(x)||!Number.isInteger(x*2)||x< -2||x>2||![.5,.1,.01].includes(h))throw new RangeError('Configuración de acumulación no admitida');
 const accumulation=t=>clean(family.base(t)-family.base(a));
 const y=accumulation(x),left=accumulation(x-h),right=accumulation(x+h),integrand=family.value(x);
 const slope=kind==='jump'&&x===0?null:integrand;
 return {kind,family,a,x,h,accumulation,y,left,right,integrand,slope,leftSlope:clean((y-left)/h),rightSlope:clean((right-y)/h)};
}
