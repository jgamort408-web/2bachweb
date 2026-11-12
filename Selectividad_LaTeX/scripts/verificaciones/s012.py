"""Verificación S012 con fracciones, matrices, enumeración y cuantiles separados."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations,permutations,product
from statistics import NormalDist
import math,json

def main():
 r=Path(__file__).resolve().parents[2]
 lines=[(1,1,10),(-1,-1,-4),(1,-1,2),(-1,0,0),(0,-1,0)]
 vertices=set()
 for a,b in combinations(lines,2):
  d=a[0]*b[1]-a[1]*b[0]
  if not d:continue
  x=F(a[2]*b[1]-a[1]*b[2],d);y=F(a[0]*b[2]-a[2]*b[0],d)
  if all(c*x+e*y<=f for c,e,f in lines):vertices.add((x,y))
 assert vertices=={(0,4),(3,1),(6,4),(0,10)}
 vals={str(t):60*t[0]+25*t[1] for t in vertices};assert max(vals.values())==460
 feasible=[(x,y) for x in range(11) for y in range(11) if 4<=x+y<=10 and x-y<=2]
 assert [(x,y) for x,y in feasible if 60*x+25*y==460]==[(6,4)]
 assert all(60*x+25*y==F(85,2)*(x+y)+F(35,2)*(x-y) for x,y in feasible)
 A=[[3,4],[6,8]];B=[[2,2],[3,3]]
 def mul(a,b):return [[sum(a[i][k]*b[k][j] for k in range(len(b))) for j in range(len(b[0]))] for i in range(len(a))]
 assert mul(A,A)==[[11*x for x in row] for row in A]
 power=[[1,0],[0,1]]
 for _ in range(8):power=mul(power,A)
 assert power==[[11**7*x for x in row] for row in A]
 M=[[A[i][j]-B[i][j] for j in range(2)] for i in range(2)]
 assert mul([[1,0]],M)==[[1,2]] and mul(M,[[-5,2],[3,-1]])==[[1,0],[0,1]]
 # Primitivas exactas y cotas de las ramas en sus dominios.
 area=(F(1)**3-F(0)**3)/3+(F(0)**3-F(-1)**3)/3;assert area==F(2,3)
 assert 2*(0+1)==2 and 2*(0-1)==-2
 assert 8-(-4)**2/2==8-4**2/2==0 and 8-0**2/2==8
 def g(x):return (x*x-3)*math.exp(2*x-1)
 def dg(x):return 2*(x*x+x-3)*math.exp(2*x-1)
 errs=[]
 for x in [-2.,-.5,0.,1.,2.]:
  h=1e-6;num=(g(x+h)-g(x-h))/(2*h);err=abs(num-dg(x))/max(1,abs(dg(x)));assert err<1e-7;errs.append(err)
 win=F(4,10)*F(6,10)+F(6,10)*F(3,10)
 assert win==F(42,100) and F(16,100)/(1-win)==F(8,29)
 assert F(24,100)*F(1,10)+F(18,100)*F(2,10)==F(6,100)
 a=1-F(4,10);inter=a-F(12,100);b=inter/a
 assert a==F(6,10) and inter==F(48,100) and b==F(8,10)
 assert a+b-inter==F(92,100) and 1-inter==F(52,100) and F(12,100)/(1-b)==F(6,10)
 samples=[]
 for name,ss in [('sin_reemplazo_sin_orden',list(combinations(range(1,10),2))),('sin_reemplazo_con_orden',list(permutations(range(1,10),2))),('con_reemplazo_con_orden',list(product(range(1,10),repeat=2)))]:
  favorable=[t for t in ss if sum(t)==10]
  assert F(len(favorable),len(ss))==F(1,9)
  samples.append({'convencion':name,'total':len(ss),'favorables':favorable,'probabilidad':'1/9'})
 assert [x['total'] for x in samples]==[36,72,81]
 def q(p):
  lo,hi=0.,5.
  for _ in range(100):
   mid=(lo+hi)/2
   if .5*math.erfc(-mid/math.sqrt(2))<p:lo=mid
   else:hi=mid
  z=NormalDist().inv_cdf(p);assert abs(z-(lo+hi)/2)<1e-13;return z
 z97=q(.985);e=z97*math.sqrt(.05*.95/10000);ci7=[.05-e,.05+e]
 assert .06>ci7[1]
 e2=z97*math.sqrt(.05*.95/20000);assert .05-e<.05-e2<.05+e2<.05+e
 times=[30,42,38,45,52,60,21,26,33,44,28,49,32,51,49,40];assert sum(times)==640
 assert math.sqrt(81)==9 and sum(times)/16==40
 z95=q(.975);e95=z95*9/4;ci8=[40-e95,40+e95]
 z98=q(.99);bound=(9*z98/2)**2;assert math.floor(bound)+1==110
 errors=[9*z98/math.sqrt(n) for n in [109,110]];assert errors[0]>=2>errors[1]
 assert math.floor((9*2.33/2)**2)+1==110
 result={'tanda':'S012','metodos':['intersecciones y fracciones exactas','enumeración de producción entera','productos y potencia matricial directa','primitivas por tramos','diferencias centradas','enumeración de muestras','cuantiles contrastados por erfc y bisección'],
 'E1_maximo':460,'E1_produccion':[6,4],'E2_potencia':'11^7 A','E3_area':'2/3','E4_error_derivada_maximo':max(errs),
 'E7_muestras':samples,'E7_intervalo':ci7,'E7_error_n10000':e,'E7_error_n20000':e2,
 'E8_suma':640,'E8_media':40,'E8_desviacion':9,'E8_intervalo':ci8,'E8_cota_n':bound,'E8_errores_109_110':errors,'E8_minimo':110,
 'segundo_revisor_distinto':False}
 out=r/'output/verificaciones/s012-matematica.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print('S012: todas las comprobaciones matemáticas superadas.')
if __name__=='__main__':main()
