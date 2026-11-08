"""Verificación reproducible S011 con fracciones y métodos numéricos separados."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations
from statistics import NormalDist
import math,json

def main():
 r=Path(__file__).resolve().parents[2]
 A=[[2,1,0],[1,0,2],[0,2,1]];N=[[4,1,-2],[1,-2,4],[-2,4,1]]
 assert [[sum(A[i][k]*N[k][j] for k in range(3)) for j in range(3)] for i in range(3)]==[[9,0,0],[0,9,0],[0,0,9]]
 X=[F(1,3),F(-2,3),F(1,3)]
 assert [sum(a*b for a,b in zip(row,X)) for row in A]==[0,1,-1]
 for a in [-9,-8,0,1,5]:
  det=2*(0*a-4)-(a-0);assert det==-8-a
 lines=[(5,-4,-19),(3,-4,-13),(-1,0,7),(1,1,-2)];vertices=set()
 for a,b in combinations(lines,2):
  d=a[0]*b[1]-a[1]*b[0]
  if not d:continue
  x=F(a[2]*b[1]-a[1]*b[2],d);y=F(a[0]*b[2]-a[2]*b[0],d)
  if all(c*x+e*y<=f for c,e,f in lines):vertices.add((x,y))
 assert vertices=={(F(-7),F(-2)),(F(-3),F(1)),(F(-7),F(5))}
 vals=sorted(-x/5+F(5,2)*y for x,y in vertices)
 assert vals==[F(-18,5),F(31,10),F(139,10)] and F(47,3)>max(vals)
 # Simpson separado en cada rama, usando el límite izquierdo correcto en cero.
 def simpson(fun,a,b,n=2000):
  h=(b-a)/n
  return h/3*(fun(a)+fun(b)+4*sum(fun(a+h*i) for i in range(1,n,2))+2*sum(fun(a+h*i) for i in range(2,n,2)))
 value=3/(2*math.log(2))-4/3
 numerical=simpson(lambda x:2**(x+1),-2,0)+simpson(lambda x:x*x-2*x,0,2)
 assert abs(value-numerical)<1e-11
 f1=lambda t:-t*t+2*t-F(3,10)
 f2=lambda t:t/10-F(12,100)
 f3=lambda t:-t*t/2+F(83,10)*t-F(2862,100)
 assert f1(F(18,10))==f2(F(18,10))==F(6,100)
 assert f2(F(5))==f3(F(5))==F(38,100)
 candidates=[f1(F(2,10)),f1(F(1)),f1(F(18,10)),f2(F(5)),f3(F(83,10)),f3(F(10))]
 assert candidates==[F(6,100),F(7,10),F(6,100),F(38,100),F(5825,1000),F(438,100)]
 assert max(candidates)==F(5825,1000)
 # Completar cuadrados demuestra la cota de cada rama, además de candidatos.
 for t in [F(51,10),F(6),F(83,10),F(10)]:assert f3(t)==F(5825,1000)-(t-F(83,10))**2/2
 pos=F(15,100)*F(92,100)+F(85,100)*F(4,100)
 negE=F(15,100)*F(8,100)
 assert pos==F(172,1000) and F(138,1000)/pos==F(69,86)
 assert negE==F(12,1000) and negE/(1-pos)==F(1,69)
 union=1-F(3,100);inter=F(9,10)+F(4,10)-union
 assert union==F(97,100) and inter==F(33,100)
 assert F(4,10)-inter==F(7,100) and (F(4,10)-inter)/F(1,10)==F(7,10)
 def quantile(p):
  lo,hi=0.,5.
  for _ in range(100):
   mid=(lo+hi)/2
   if .5*math.erfc(-mid/math.sqrt(2))<p:lo=mid
   else:hi=mid
  q=(lo+hi)/2;z=NormalDist().inv_cdf(p);assert abs(z-q)<1e-13
  return z
 z7=quantile(.9975);e7=z7*math.sqrt(.46*.54/250);b7=z7*z7*.46*.54/.05**2
 assert math.floor(b7)+1==783
 errors7=[z7*math.sqrt(.46*.54/n) for n in [782,783]];assert errors7[0]>=.05>errors7[1]
 table_bound=2.81**2*.46*.54/.05**2;assert math.floor(table_bound)+1==785
 data=list(map(F,['11.8','10','9.8','12','9.7','10.8','9.6','11.3','10.4','12.2','9.1','10.5']))
 assert sum(data)==F(636,5) and sum(data)/12==F(53,5)
 z8=quantile(.985);e8=z8*4/math.sqrt(12);b8=(z8*4/1.2)**2
 assert math.floor(b8)+1==53
 errors8=[z8*4/math.sqrt(n) for n in [52,53]];assert errors8[0]>=1.2>errors8[1]
 result={'tanda':'S011','metodos':['fracciones y productos matriciales exactos','todas las intersecciones de fronteras','Simpson por ramas','identidad de completar cuadrados','cuantil separado por erfc y bisección'],
 'E1_X':[str(x) for x in X],'E2_valores':[str(x) for x in vals],
 'E3_integral':value,'E3_integral_numerica':numerical,'E3_area_distinta':3/(2*math.log(2))+4/3,
 'E4_maximo_miles':'233/40','E4_personas':5825,
 'E7_cuantil':z7,'E7_intervalo':[.46-e7,.46+e7],'E7_cota_n':b7,'E7_errores_782_783':errors7,'E7_cota_tabla_2_81':table_bound,'E7_minimo_preciso':783,'E7_minimo_con_tabla_2_81':785,
 'E8_media':'53/5','E8_cuantil':z8,'E8_intervalo':[10.6-e8,10.6+e8],'E8_cota_n':b8,'E8_errores_52_53':errors8,
 'segundo_revisor_distinto':False}
 out=r/'output/verificaciones/s011-matematica.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print('S011: todas las comprobaciones matemáticas superadas.')
if __name__=='__main__':main()
