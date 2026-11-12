from fractions import Fraction as F
from itertools import combinations
from pathlib import Path
from statistics import NormalDist
import json
import math

limits = [(3,1,15),(1,2,10),(0,-1,F(-3,2)),(-2,1,0),(-1,0,0)]
vertices = set()
for (a,b,c),(d,e,f) in combinations(limits,2):
    determinant = a*e-b*d
    if determinant:
        x,y = F(c*e-b*f,determinant),F(a*f-c*d,determinant)
        if all(u*x+v*y <= w for u,v,w in limits):
            vertices.add((x,y))
assert vertices == {(F(3,4),F(3,2)),(F(9,2),F(3,2)),(4,3),(2,4)}
assert max((3*x+5*y,x,y) for x,y in vertices)==(27,4,3)
assert (5*(-1)+(-4),5*4-2,-1+2*(-4),4+2*(-2))==(-9,18,-9,0)

def numerical_derivative(function, x):
    step = 1e-6
    return (function(x+step)-function(x-step))/(2*step)

for x in [-3.,-1.5,2.]:
    assert math.isclose(numerical_derivative(lambda t: math.log(3*t*t-3)+(1-2*t)/(t+2), x),2*x/(x*x-1)-5/(x+2)**2,rel_tol=1e-8)
for x in [-1.,.5,2.]:
    assert math.isclose(numerical_derivative(lambda t: 2*math.exp(t**3)+t*t*(3*t+4)**3,x),6*x*x*math.exp(x**3)+2*x*(3*x+4)**3+9*x*x*(3*x+4)**2,rel_tol=1e-8)
assert 2*F(-1,3)==(F(-1,3)-1)/2==F(-2,3)
assert -F(1,2)+F(1,2)==0 and 1-F(1,2)==F(2,4)
assert F(2,2**2)==F(1,2) and F(2,4**2)!=2-F(1,2)
antiderivative = lambda x: x**3/3-2*x*x
assert antiderivative(F(2))-antiderivative(F(1))==F(-11,3)
errors = F('.30')*F('.01')+F('.45')*F('.03')+F('.25')*F('.02')
assert errors==F('.0215') and F('.45')*F('.97')/(1-errors)==F(873,1957)
assert F('.13')-F('.06')==F('.07') and 1-F('.11')-F('.13')+F('.06')==F('.82') and F('.06')/F('.11')==F(6,11)
assert (F('153.65')+F('162.35'))/2==158 and (F('162.35')-F('153.65'))/2==F('4.35')

def quantile(p):
    lo,hi = 0.,4.
    for _ in range(80):
        mid=(lo+hi)/2
        if 1-math.erfc(mid/math.sqrt(2))/2<p:
            lo=mid
        else:
            hi=mid
    z=(lo+hi)/2
    assert abs(z-NormalDist().inv_cdf(p))<1e-12
    return z

z95,z97 = quantile(.975),quantile(.985)
assert 15*z95/math.sqrt(96)>=3>15*z95/math.sqrt(97)
assert 2*z97/math.sqrt(18)>1>=2*z97/math.sqrt(19)
data=list(map(F,['8.5','3.7','4.3','3.6','5.6','4.8','1.0','1.4','6.0']))
assert sum(data)==F('38.9')
mean=float(sum(data)/len(data))
interval=[mean-2*z95/3,mean+2*z95/3]
result={'tanda':'S017','E1_optimo':[4,3,27],'E2_X':[[-1,4],[-4,-2]],'E3_corte':['-1/3','-2/3'],'E4_integral':'-11/3','E5_error':'43/2000','E5_condicionada':'873/1957','E6_condicionada':'6/11','E7_cota_n':25*z95**2,'E7_minimo':97,'E8_intervalo':interval,'E8_minimo':19,'segundo_revisor_distinto':False}
root=Path(__file__).resolve().parents[2]
out=root/'output/verificaciones/s017-matematica.json'
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('S017: comprobaciones matemáticas superadas.')
