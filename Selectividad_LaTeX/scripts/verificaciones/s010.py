"""Comprobaciones reproducibles S010: fracciones, enumeración y métodos numéricos."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations, product
from statistics import NormalDist
import math,json

def main():
 r=Path(__file__).resolve().parents[2]
 v=[(F(0),F(2)),(F(3),F(1,2)),(F(5),F(0)),(F(0),F(7))]
 assert all(x+4*y>=5 and x+2*y>=4 and 7*x+5*y<=35 and x>=0 for x,y in v)
 vals=[2*x+y for x,y in v];assert min(vals)==2 and vals.count(F(2))==1
 M=[[8,-1,0],[-4,8,0],[-2,-2,5]];X=[1,3,1]
 assert [sum(a*b for a,b in zip(row,X)) for row in M]==[5,20,-3]
 assert 5*(8*8-4)==300
 assert 4+2*(-2)==-8-4*(-2) and -8-4*(-2)==-16+16
 primitive=lambda x:8*F(x)-F(2,3)*F(x)**3
 assert primitive(2)-primitive(-2)==F(64,3)
 h=lambda x:x**4+F(1,3)*x**3-2*x*x-x-5
 assert h(F(2))==F(11,3)
 # Vérification numérique de dérivées analytiques par différences centrées.
 f=lambda x:(5*x**3+4*x-2)**4*math.log(2*x**5-4*x**3+x)
 def df(x):
  p=5*x**3+4*x-2;q=2*x**5-4*x**3+x
  return 4*p**3*(15*x*x+4)*math.log(q)+p**4*(10*x**4-12*x*x+1)/q
 g=lambda x:math.exp(3*x*x-5*x)/(6*x*x+2)**3
 dg=lambda x:math.exp(3*x*x-5*x)*((6*x-5)*(6*x*x+2)-36*x)/(6*x*x+2)**4
 errs=[]
 for fun,der,points in [(f,df,[.1,.3,1.4,2.]),(g,dg,[-1.,0.,.5,1.5])]:
  for x in points:
   eps=1e-6;num=(fun(x+eps)-fun(x-eps))/(2*eps);err=abs(num-der(x))/max(1,abs(der(x)))
   assert err<1e-7,(x,err);errs.append(err)
 a,b,inter=F(65,100),F(55,100),F(35,100)
 assert a+b-inter==F(85,100) and (b-inter)/(1-a)==F(4,7)
 assert 1-a-b+inter==F(15,100) and a*b!=inter
 react=F(7,10)*F(15,100)+F(3,10)*F(8,10)
 assert react==F(345,1000) and F(24,100)/react==F(16,23)
 assert F(7,10)*F(85,100)==F(595,1000)
 assert [F(n,40) for n in [15000,16800,11400,6000]]==[375,420,285,150]
 assert sum([375,420,285,150])==1230
 moments=[]
 for samples,expected in [(list(combinations([1,3,5],2)),F(2,3)),(list(product([1,3,5],repeat=2)),F(4,3))]:
  means=[F(sum(t),2) for t in samples];mean=sum(means)/len(means)
  variance=sum((x-mean)**2 for x in means)/len(means)
  assert mean==3 and variance==expected
  moments.append({'muestras':samples,'medias':[str(x) for x in means],'media':str(mean),'varianza':str(variance)})
 z=NormalDist().inv_cdf(.975)
 # Cuantil separado mediante erfc y bisección, sin reutilizar inv_cdf.
 lo,hi=1.,3.
 for _ in range(100):
  mid=(lo+hi)/2
  if .5*math.erfc(mid/math.sqrt(2))>.025:lo=mid
  else:hi=mid
 z2=(lo+hi)/2;assert abs(z-z2)<1e-13
 error=z*math.sqrt(.24*.76/50);bound=4*z*z*.24*.76/.2**2
 assert math.ceil(bound)==71
 widths=[2*z*math.sqrt(.24*.76/n) for n in [70,71]]
 assert widths[0]>.2>=widths[1]
 result={'tanda':'S010','metodos':['fracciones exactas','sustitución matricial','enumeración exhaustiva de muestras','diferencias centradas','cuantil erfc por bisección'],
 'E1_valores_vertices':[str(t) for t in vals],'E1a':'Sólo formulación; no se calcula el óptimo.',
 'E3_area':'64/3','E4_error_relativo_maximo':max(errs),'E7_convenciones':moments,
 'E8_cuantil':z,'E8_intervalo':[.24-error,.24+error],'E8_cota_n':bound,'E8_anchos_70_71':widths,
 'segundo_revisor_distinto':False}
 out=r/'output/verificaciones/s010-matematica.json';out.parent.mkdir(parents=True,exist_ok=True)
 out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print('S010: todas las comprobaciones matemáticas superadas.')
if __name__=='__main__':main()
