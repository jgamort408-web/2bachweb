"""S016: comprobación exacta y por métodos numéricos separados."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations
from statistics import NormalDist
import math,json
def main():
 r=Path(__file__).resolve().parents[2]
 def mul(a,b):return [[sum(a[i][k]*b[k][j] for k in range(len(b))) for j in range(len(b[0]))] for i in range(len(a))]
 A=[[1,2],[1,3]];B=[[2,1],[0,-1]];X=[[6,5],[-2,-2]];Y=[[F(1),F(5,2)],[-1,-3]]
 assert mul(A,X)==B and mul(B,Y)==A and mul(X,Y)==mul(Y,X)==[[1,0],[0,1]]
 lines=[(-1,-2,-7),(-4,1,-1),(2,-1,4),(3,2,20),(-1,0,0),(0,-1,0)];vertices=set()
 for a,b in combinations(lines,2):
  d=a[0]*b[1]-a[1]*b[0]
  if not d:continue
  x=F(a[2]*b[1]-a[1]*b[2],d);y=F(a[0]*b[2]-a[2]*b[0],d)
  if all(c*x+e*y<=f for c,e,f in lines):vertices.add((x,y))
 assert vertices=={(1,3),(3,2),(4,4),(2,7)}
 assert sorted(2*x+y for x,y in vertices)==[5,8,11,12]
 assert 8*(-2)+2*24+4==36 and 12*(-2)+24==0 and 12*(-2)<0
 f=lambda x:4*x**3-3*x+4
 assert f(F(-1,2))==5 and f(F(1,2))==3
 primitive=lambda x:x**4-F(3,2)*x*x+4*x-8
 assert primitive(F(2))==10
 # Derivadas: diferencias centradas contra las fórmulas del fragmento.
 fun=lambda x:(x*x-5)**2*math.exp(3*x)
 df=lambda x:(x*x-5)*math.exp(3*x)*(3*x*x+4*x-15)
 g=lambda x:math.log(x**3-5*x)/(1-x*x)
 dg=lambda x:(((3*x*x-5)/(x**3-5*x))*(1-x*x)+2*x*math.log(x**3-5*x))/(1-x*x)**2
 errors=[]
 for fn,der,points in [(fun,df,[-2.,0.,1.,2.]),(g,dg,[-2.,-.5,3.])]:
  for x in points:
   eps=1e-6;num=(fn(x+eps)-fn(x-eps))/(2*eps);err=abs(num-der(x))/max(1,abs(der(x)));assert err<1e-7,(x,err);errors.append(err)
 ant=lambda x:-F(x)**3/3+F(x)**2+3*F(x)
 assert ant(3)==9 and ant(-1)==F(-5,3) and ant(3)-ant(-1)==F(32,3)
 assert 46-16==30 and 34-16==18 and 120-64==56
 assert F(64,120)==F(8,15) and F(56,120)==F(7,15) and F(30,120)==F(1,4) and F(30,86)==F(15,43)
 good=F(3,10)*F(8,10)+F(7,10)*F(6,10);bad1=F(3,10)*(1-F(8,10)-F(5,100));medium2=(F(19,100)-F(3,10)*F(5,100))/F(7,10)
 assert good==F(66,100) and bad1==F(45,1000) and medium2==F(1,4)
 assert F(24,100)+F(15,1000)+F(45,1000)+F(42,100)+F(175,1000)+F(105,1000)==1
 def q(p):
  lo,hi=0.,5.
  for _ in range(100):
   mid=(lo+hi)/2
   if .5*math.erfc(-mid/math.sqrt(2))<p:lo=mid
   else:hi=mid
  z=NormalDist().inv_cdf(p);assert abs(z-(lo+hi)/2)<1e-13;return z
 data=list(map(F,['9.5','9','10.2','8.6','11.4','10.8','12.6','11','11.8','14.5','10.4','9.8']))
 assert sum(data)==F(648,5) and sum(data)/12==F(54,5) and F('2.8')**2==F('7.84')
 z935=q(.9675);e7=z935*2.8/math.sqrt(12);z99=q(.995);error50=z99*2.8/math.sqrt(50)
 bound=25*z99*z99;assert math.ceil(bound)==166 and math.ceil(25*2.576**2)==166
 margins=[z99*5/math.sqrt(n) for n in [165,166]];assert margins[0]>1>=margins[1]
 coverages=[1-math.erfc(math.sqrt(n)/5/math.sqrt(2)) for n in [165,166]];assert coverages[0]<.99<=coverages[1]
 tail=.5*math.erfc(2/math.sqrt(2));assert abs(tail-(1-NormalDist().cdf(2)))<1e-15
 result={'tanda':'S016','metodos':['productos y fracciones exactas','todas las intersecciones de fronteras','diferencias centradas para derivadas','primitivas y sustitución exacta','cuantiles por erfc y bisección','cobertura calculada directamente'],
 'E1_X':X,'E1_Y':[[str(x) for x in row] for row in Y],'E2a':'Sólo formulación; no se calcula su óptimo.','E2b_minimo':5,'E2b_punto':[1,3],
 'E3_parametros':[-2,24],'E3_primitiva_constante':-8,'E4_error_derivada_maximo':max(errors),'E4_area':'32/3','E5_condicionada':'15/43','E6_media_dada_E2':'1/4',
 'E7_suma':'648/5','E7_media':'54/5','E7_cuantil':z935,'E7_intervalo':[10.8-e7,10.8+e7],'E7_error_n50_99':error50,'E7_error_n50_tabla':2.576*2.8/math.sqrt(50),
 'E8_cota_n':bound,'E8_minimo':166,'E8_margenes_165_166':margins,'E8_coberturas_165_166':coverages,'E8_probabilidad_media_superior_25':tail,'segundo_revisor_distinto':False}
 out=r/'output/verificaciones/s016-matematica.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print('S016: todas las comprobaciones matemáticas superadas.')
if __name__=='__main__':main()
