from fractions import Fraction as F
from itertools import combinations
from pathlib import Path
from statistics import NormalDist
import json
import math

limits=[(1,2,100),(2,1,80),(0,1,46),(-1,0,0),(0,-1,0)]
vertices=set()
for (a,b,c),(d,e,f) in combinations(limits,2):
    determinant=a*e-b*d
    if determinant:
        x,y=F(c*e-b*f,determinant),F(a*f-c*d,determinant)
        if all(u*x+v*y<=w for u,v,w in limits):
            vertices.add((x,y))
assert vertices=={(0,0),(40,0),(20,40),(8,46),(0,46)}
assert max((10*x+12*y,x,y) for x in range(41) for y in range(47) if all(a*x+b*y<=c for a,b,c in limits))==(680,20,40)
A=[[1,0,1],[-1,-3,2],[1,-1,1]]
adj=[[-1,-1,3],[3,0,-3],[4,1,-3]]
assert [[sum(x*y for x,y in zip(row,col)) for col in zip(*adj)] for row in A]==[[3,0,0],[0,3,0],[0,0,3]]
assert -(-2)==2 and -(-2+1)==1
assert 25000+15000==40000 and 2*25000==50000
bacteria=25000*math.exp(3)+15000
intersection=F('.2')*F('.5')
assert (intersection,F('.3')+F('.5')-intersection,1-intersection,F('.3')-intersection)==(F('.1'),F('.7'),F('.9'),F('.2'))
travel=F(8500)*F('.15')+F(6500)*F('.2')
assert travel/15000==F(103,600) and (6500-1300)/(15000-travel)==F(208,497)

def quantile(p):
    lo,hi=0.,4.
    for _ in range(80):
        mid=(lo+hi)/2
        if 1-math.erfc(mid/math.sqrt(2))/2<p:
            lo=mid
        else:
            hi=mid
    z=(lo+hi)/2
    assert abs(z-NormalDist().inv_cdf(p))<1e-12
    return z

z95,z97,z94=quantile(.975),quantile(.985),quantile(.97)
data=list(map(F,['4.7','2.1','3.6','5.4','0','4.2','4','-0.2','1.9','5.2']))
assert sum(data)/len(data)==F('3.09')
assert 2*z95/math.sqrt(61)>=.5>2*z95/math.sqrt(62)
variance=float(F(3,4)*F(1,4))
assert z94*math.sqrt(variance/736)>.03>=z94*math.sqrt(variance/737)
e7=2*z97/math.sqrt(10)
e8=z97*math.sqrt(variance/200)
result={'tanda':'S018','E1_optimo':[20,40,680],'E2_adjunta':adj,'E3_tangente':'y=x+2','E4_bacterias':bacteria,'E6_viaje':'103/600','E6_condicionada':'208/497','E7_intervalo':[3.09-e7,3.09+e7],'E7_minimo':62,'E8_intervalo':[.75-e8,.75+e8],'E8_cota_n':z94*z94*variance/.03**2,'E8_minimo':737,'segundo_revisor_distinto':False}
root=Path(__file__).resolve().parents[2]
out=root/'output/verificaciones/s018-matematica.json'
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('S018: comprobaciones matemáticas superadas.')
