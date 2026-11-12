"""S013: cálculo exacto, enumeración y comprobación separada de cuantiles."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations
from statistics import NormalDist
import math,json
def main():
 r=Path(__file__).resolve().parents[2]
 lines=[(2,1,24),(-2,-1,-20),(-1,0,-4),(2,-1,0)];vertices=set()
 for a,b in combinations(lines,2):
  d=a[0]*b[1]-a[1]*b[0]
  if not d:continue
  x=F(a[2]*b[1]-a[1]*b[2],d);y=F(a[0]*b[2]-a[2]*b[0],d)
  if all(c*x+e*y<=f for c,e,f in lines):vertices.add((x,y))
 assert vertices=={(4,12),(5,10),(6,12),(4,16)}
 excluded=sorted((x,y) for x,y in vertices if 2*x+y==20);assert excluded==[(4,12),(5,10)]
 feasible=[(x,y) for x in range(25) for y in range(25) if 20<2*x+y<=24 and x>=4 and y>=2*x]
 objective=lambda x,y:F(6,10)*x+F(4,10)*y
 assert max(objective(x,y) for x,y in feasible)==F(88,10)
 assert [(x,y) for x,y in feasible if objective(x,y)==F(88,10)]==[(4,16)]
 assert all(objective(x,y)==F(4,10)*(2*x+y)-F(2,10)*x for x,y in feasible)
 A=[[1,0,1],[0,1,0],[1,0,1]];B=[[1,0,2],[1,1,-1],[2,1,0]]
 def mul(a,b):return [[sum(a[i][k]*b[k][j] for k in range(len(b))) for j in range(len(b[0]))] for i in range(len(a))]
 power=[[1,0,0],[0,1,0],[0,0,1]]
 for n in range(1,13):
  power=mul(power,A);k=2**(n-1);assert power==[[k,0,k],[0,1,0],[k,0,k]]
 assert mul(B,[[7],[-13],[-3]])==[[1],[-3],[1]]
 assert 1*(1*0-(-1)*1)+2*(1*1-1*2)==-1
 assert F(1,2)==1-F(1,2) and F(3,2)==2-F(1,2)
 primitive=lambda x:F(x)**3/3-F(x)**2/4
 assert F(1,2)+primitive(2)-primitive(1)==F(25,12)
 def simpson(fun,a,b,n=1000):
  h=(b-a)/n
  return h/3*(fun(a)+fun(b)+4*sum(fun(a+i*h) for i in range(1,n,2))+2*sum(fun(a+i*h) for i in range(2,n,2)))
 area=simpson(lambda x:.5,0,1)+simpson(lambda x:x*x-x/2,1,2);assert abs(area-25/12)<1e-12
 derivative=lambda t:F(3,100)*t*t-F(9,10)*t+6
 c=lambda t:F(1,100)*t**3-F(45,100)*t*t+6*t+50
 for t in [F(0),F(5),F(10),F(15),F(20),F(24)]:assert derivative(t)==F(3,100)*(t-10)*(t-20)
 assert c(0)==50 and c(10)==75 and c(20)==70
 assert derivative(5)>0 and derivative(15)<0 and derivative(22)>0
 good=[F(45,100)*F(99,100),F(21,100)*F(97,100),F(34,100)*F(98,100)]
 total=sum(good);assert total==F(9824,10000) and good[2]==F(3332,10000)
 bayes=good[0]/total;assert bayes==F(4455,9824) and 1-total==F(176,10000)
 assert F(8,10)**2==F(64,100) and 1-F(2,10)**2==F(96,100)
 pos=F(8,10)*F(9,10)+F(2,10)*F(5,100)
 assert pos==F(73,100) and F(72,100)/pos==F(72,73)
 def q(p):
  lo,hi=0.,5.
  for _ in range(100):
   mid=(lo+hi)/2
   if .5*math.erfc(-mid/math.sqrt(2))<p:lo=mid
   else:hi=mid
  z=NormalDist().inv_cdf(p);assert abs(z-(lo+hi)/2)<1e-13;return z
 z94=q(.97);z97=q(.985)
 e7=z94*math.sqrt(.35*.65/500);bound7=z97*z97*.35*.65/.02**2
 assert math.ceil(bound7)==2679
 errors7=[z97*math.sqrt(.35*.65/n) for n in [2678,2679]];assert errors7[0]>.02>=errors7[1]
 assert math.ceil(2.17**2*.35*.65/.02**2)==2679
 e8=z97*7/math.sqrt(300);bound8=(7*z94/1.2)**2
 assert math.floor(bound8)+1==121
 errors8=[z94*7/math.sqrt(n) for n in [120,121]];assert errors8[0]>=1.2>errors8[1]
 assert math.floor((7*1.88/1.2)**2)+1==121
 result={'tanda':'S013','metodos':['fracciones e intersecciones exactas','enumeración entera','potencias matriciales directas','Simpson','Bayes exacto','cuantiles por erfc y bisección'],
 'E1_vertices_excluidos':[[str(x),str(y)] for x,y in excluded],'E1_optimo':[4,16],'E1_maximo':'44/5','E2_X':[7,-13,-3],
 'E3_area':'25/12','E3_area_Simpson':area,'E4_constante_con_modelo_continuo':50,'E4_extremos_relativos':[75,70],
 'E5_no_defecto':str(total),'E5_Bayes':str(bayes),'E5_Bayes_decimal':float(bayes),
 'E7_intervalo':[.35-e7,.35+e7],'E7_cota_n':bound7,'E7_errores_2678_2679':errors7,'E7_minimo':2679,
 'E8_intervalo':[168-e8,168+e8],'E8_cota_n':bound8,'E8_errores_120_121':errors8,'E8_minimo':121,'segundo_revisor_distinto':False}
 out=r/'output/verificaciones/s013-matematica.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print('S013: todas las comprobaciones matemáticas superadas.')
if __name__=='__main__':main()
