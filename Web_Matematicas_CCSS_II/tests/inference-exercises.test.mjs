import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {normalCDF} from '../content/models/normal-distribution.js';
import {binomialPMF} from '../content/models/binomial-normal-approximation.js';
import {planSampleForMean} from '../content/models/sample-size.js';

const page=readFileSync(new URL('../libro/temas/09-inferencia-estadistica/ejercicios-resueltos.html',import.meta.url),'utf8');
const ids=[...page.matchAll(/data-original-id="([^"]+)"/g)].map(match=>match[1]);

test('la colección conserva 27 identificadores únicos y soluciones',()=>{
 assert.equal(ids.length,27);
 assert.equal(new Set(ids).size,27);
 assert.equal((page.match(/data-solution/g)||[]).length,27);
 assert.ok(!page.includes('https://cdn.jsdelivr.net'));
});

test('correcciones de probabilidad frente a los redondeos originales',()=>{
 const central=normalCDF(2)-normalCDF(-2);
 assert.ok(Math.abs(central-.9544997361036418)<1e-6);
 const transport=binomialPMF(100,.6).slice(0,50).reduce((sum,value)=>sum+value,0);
 assert.ok(Math.abs(transport-.01676168650316141)<1e-12);
 let term=.95**400,components=0;
 for(let k=0;k<=28;k++){
   if(k>=16)components+=term;
   term*=((400-k)/(k+1))*(.05/.95);
 }
 assert.ok(Math.abs(components-.8193668946474638)<1e-12);
 assert.ok(Math.abs(1-normalCDF(4)-3.167124183311998e-5)<1e-7);
});

test('los tamaños y márgenes corregidos satisfacen sus objetivos',()=>{
 assert.equal(planSampleForMean({confidence:99,sigma:10,targetMargin:2}).n,166);
 assert.equal(planSampleForMean({confidence:99,sigma:2.5,targetMargin:.5}).n,166);
 assert.equal(planSampleForMean({confidence:95,sigma:15,targetMargin:5}).n,35);
 assert.ok(Math.abs(1.96*5/Math.sqrt(50)-1.3859292911256331)<1e-12);
});
