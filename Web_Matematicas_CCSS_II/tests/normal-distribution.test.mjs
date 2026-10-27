
import test from 'node:test';
import assert from 'node:assert/strict';
import {normalPDF,normalCDF,normalInterval,normalReadings} from '../content/models/normal-distribution.js';
const close=(a,b,tol=2e-7)=>assert.ok(Math.abs(a-b)<=tol,a+' != '+b);
function reference(z) {
 if(z===0)return .5;
 const n=2400,b=Math.abs(z),h=b/n,f=x=>Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);
 let total=f(0)+f(b);
 for(let i=1;i<n;i++)total+=(i%2?4:2)*f(i*h);
 return .5+Math.sign(z)*total*h/3;
}
test('CDF against independent Simpson quadrature over the control range',()=>{
 for(let z=-12;z<=12;z+=.125){close(normalCDF(z),reference(z));assert.ok(normalCDF(z)>=0&&normalCDF(z)<=1);}
 for(const mu of [-2,0,2])for(const sigma of [.5,1,2.5])for(const x of [-4,-1,0,.8,1,4])close(normalCDF(x,mu,sigma),reference((x-mu)/sigma));
 assert.equal(normalCDF(0),.5);assert.equal(normalCDF(-Infinity),0);assert.equal(normalCDF(Infinity),1);
});
test('Empirical intervals, symmetry, coincident/reversed ends and small tails',()=>{
 for(const [n,p]of [[1,.682689492137],[2,.954499736104],[3,.997300203937]])close(normalInterval(-n,n),p);
 for(const z of [0,.1,1,4,8,12])close(normalCDF(-z),1-normalCDF(z),1e-15);
 assert.equal(normalInterval(1,1),0);assert.equal(normalInterval(-1,1),normalInterval(1,-1));
 assert.ok(normalCDF(-12)>0);assert.ok(normalInterval(10,11)>0);
 close(normalInterval(10,11),normalInterval(-11,-10),1e-30);
 const m=normalReadings({mu:2,sigma:.5,a:4,b:-4,k:-4});
 assert.equal(m.reversed,true);assert.equal(m.k,-4);assert.equal(m.lo,-4);assert.equal(m.zk,-12);
 assert.ok(m.Fk<1e-30);assert.equal(m.interval,normalInterval(-4,4,2,.5));
});
test('Density peak, dispersion and validation',()=>{
 close(normalPDF(0),1/Math.sqrt(2*Math.PI),1e-15);
 close(normalPDF(2,2,.5),2*normalPDF(0),1e-15);
 assert.ok(normalPDF(0,0,2.5)<normalPDF(0,0,.5));assert.equal(normalPDF(Infinity),0);
 for(const sigma of [0,-1,Infinity,NaN])assert.throws(()=>normalCDF(0,0,sigma),RangeError);
 assert.throws(()=>normalPDF(undefined),RangeError);assert.throws(()=>normalInterval(NaN,1),RangeError);
});
