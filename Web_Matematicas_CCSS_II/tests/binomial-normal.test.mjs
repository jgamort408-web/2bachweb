import test from 'node:test';
import assert from 'node:assert/strict';
import {binomialPMF,approximationReadings as read} from '../content/models/binomial-normal-approximation.js';
test('Recurrencia contra coeficiente binomial independiente y normalización',()=>{
 for(const n of [10,50,200])for(const p of [.05,.2,.5,.8,.95]){
   const values=binomialPMF(n,p);assert.ok(Math.abs(values.reduce((a,b)=>a+b,0)-1)<1e-12);
   for(let k=0;k<=n;k++){
     let choose=1;for(let j=1;j<=k;j++)choose*= (n-j+1)/j;
     const expected=choose*p**k*(1-p)**(n-k);
     assert.ok(Math.abs(values[k]-expected)<1e-12);
   }
 }
});
test('Corrección puntual, intervalos invertidos, soporte y orientación',()=>{
 const base={n:50,p:.5,K:30,A:20,B:40,mode:0};
 const m=read(base);assert.ok(Math.abs(m.exact-.9405397737202819)<1e-12);
 assert.equal(m.upper,30.5);assert.equal(m.lower,-Infinity);assert.equal(m.adequate,true);
 const point=read({...base,A:25,B:25,mode:1});
 assert.equal(point.lower,24.5);assert.equal(point.upper,25.5);assert.ok(point.exact>0);
 assert.equal(read({...base,A:40,B:20,mode:1}).exact,read({...base,mode:1}).exact);
 const all=read({...base,n:10,p:.05,K:10,A:0,B:10,mode:1});
 assert.ok(Math.abs(all.exact-1)<1e-12);assert.ok(all.approximate<1);assert.equal(all.adequate,false);
 assert.throws(()=>read({...base,K:51}),RangeError);assert.throws(()=>binomialPMF(50,0),RangeError);
});
