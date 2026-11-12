from fractions import Fraction as F
from itertools import combinations
from pathlib import Path
from statistics import NormalDist
import math
import json

A=[[2,0,0],[1,1,1],[0,3,5]]
X=[[F(-1,2),5,-1],[F(13,4),F(-9,2),F(5,2)],[F(31,2),-31,13]]
def multiply(a,b):
    return [[sum(x*y for x,y in zip(row,col)) for col in zip(*b)] for row in a]
assert multiply(X,A)==multiply(A,list(zip(*A)))
limits=[(1,1,4),(-1,1,2),(-1,-3,-2),(0,1,2)]
vertices=set()
for (a,b,c),(d,e,f) in combinations(limits,2):
    det=a*e-b*d
    if det:
        x,y=F(c*e-b*f,det),F(a*f-c*d,det)
        if all(u*x+v*y<=w for u,v,w in limits):
            vertices.add((x,y))
assert vertices=={(-1,1),(0,2),(2,2),(5,-1)}
assert sorted(x+y for x,y in vertices)==[0,2,4,4] and 4+3*F('-0.75')<2
f=lambda x:x*x-6*x+8
assert f(1)==3 and f(3)==-1 and 2*1-6==-4
assert 4-6==F(2,-1) and -2!=2*(-2) and 6*3-15==3
primitive=lambda x:x**3/3-6*x
assert primitive(F(5))-primitive(F(3))==F(62,3)
improved=F('.65')*F('.80')+F('.35')*F('.30')
assert improved==F('.625') and F('.52')/improved==F('.832')
obesity=F('.47')*F('.72')+F('.53')*F('.22')
assert obesity==F('.455') and F('.47')*F('.28')==F('.1316') and F('.3384')/obesity==F(1692,2275)

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

z98,z97=quantile(.99),quantile(.985)
p=2/3
margin=z98*math.sqrt((2/9)/600)
assert p-margin<.65<p+margin
assert z98*math.sqrt((2/9)/3006)>=.02>z98*math.sqrt((2/9)/3007)
assert 5400/45==120 and z97*.8/math.sqrt(75)>=.2>z97*.8/math.sqrt(76)
coffee=z97*.8/math.sqrt(45)
result={'tanda':'S019','E1_X':[[str(x) for x in row] for row in X],'E2_extremos':[0,4],'E3_minimo':-1,'E4_area':'62/3','E5_condicionada':.832,'E6_condicionada':'1692/2275','E7_intervalo':[p-margin,p+margin],'E7_cota':z98*z98*(2/9)/.02**2,'E7_minimo':3007,'E8_intervalo':[120-coffee,120+coffee],'E8_minimo':76,'segundo_revisor_distinto':False}
root=Path(__file__).resolve().parents[2]
out=root/'output/verificaciones/s019-matematica.json'
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('S019: comprobaciones matemáticas superadas.')
