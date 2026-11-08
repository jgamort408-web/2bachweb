"""S005: comprobaciones separadas con fracciones exactas y cuantiles contrastados."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations
from statistics import NormalDist
from math import erfc,sqrt,floor,isclose,exp
import json

# Intersecciones y certificado global para una región no acotada.
constraints=[(-2,-1,-2),(-1,-2,-2),(-1,0,0),(0,-1,0)];vertices=set()
for (a,b,c),(d,e,f) in combinations(constraints,2):
 det=a*e-b*d
 if det:
  x=F(c*e-b*f,det);y=F(a*f-c*d,det)
  if all(i*x+j*y<=k for i,j,k in constraints):vertices.add((x,y))
assert vertices=={(0,2),(F(2,3),F(2,3)),(2,0)}
assert min(x+y for x,y in vertices)==F(4,3)
assert 2*F(2,3)+F(2,3)==2
# Signos de las derivadas, incluidos puntos de la unión no derivable.
f=lambda x:x*x+2*x if x<1 else -x*x+4*x
assert [f(F(x)) for x in [-2,-1,1,2,4]]==[0,-1,3,4,0]
assert 2*1+2==4 and -2*1+4==2
assert 3-4==-1
assert [2*x+2 for x in [F(-3,2),F(0)]]==[-1,2]
assert [-2*x+4 for x in [F(3,2),F(3)]]==[1,-2]
assert all(-1<=f(F(i,100))<=4 for i in range(-200,401))
counts=[250,150,100];rates=[F(7,10),F(17,25),F(73,100)]
passed=[n*p for n,p in zip(counts,rates)];assert passed==[175,102,73]
assert sum(passed)==350 and (500-sum(passed))/500==F(3,10)
assert passed[0]/sum(passed)==F(1,2) and (counts[2]-passed[2])/500==F(27,500)
def mm(a,b):return [[sum(x*y for x,y in zip(row,col)) for col in zip(*b)] for row in a]
A=[[F(-1,2),5],[F(-1,4),F(1,2)]];B=[[1,-1],[2,1]];C=[[1,0,-1],[0,-1,1],[-1,1,0]]
aa=mm(A,A);a4=mm(aa,aa);bb=mm(B,B);X=[[bb[i][j]+int(i==j) for j in range(2)] for i in range(2)]
assert aa==[[-1,0],[0,-1]] and a4==[[1,0],[0,1]] and X==[[0,-2],[4,0]] and mm(a4,X)==X
assert mm(C,[[1],[1],[1]])==[[0],[0],[0]]
# Límites de cocientes incrementales en 0 y parámetros de la cúbica.
for h in [-1e-3,-1e-5]:assert isclose(((h*h+4*h+1)-1)/h,h+4,abs_tol=1e-10)
assert isclose((exp(-1e-6)-1)/1e-6,-1,abs_tol=1e-6)
b=F(3,2);c=F(5,2);assert 3-2*b==0 and -1+b+c==3 and -6+2*b==-3
pold=F(7,10);own=pold*F(3,5)+(1-pold)*F(23,100)
assert own==F(489,1000) and pold*F(2,5)/(1-own)==F(280,511)
union=own+(1-pold)-(1-pold)*F(23,100);assert union==F(18,25)
assert sum([F(42,100),F(28,100),F(69,1000),F(231,1000)])==1
def q(p):
 lo,hi=-10.,10.
 for _ in range(120):
  mid=(lo+hi)/2
  if .5*erfc(-mid/sqrt(2))<p:lo=mid
  else:hi=mid
 z=NormalDist().inv_cdf(p);assert isclose(z,(lo+hi)/2,abs_tol=1e-12);return z
def sample(z,var,error):
 threshold=z*z*var/error**2;n=floor(threshold)+1;e=lambda n:z*sqrt(var/n)
 assert e(n)<error and e(n-1)>=error
 return {'umbral_n':threshold,'n_minimo':n,'error_n':e(n),'error_n_anterior':e(n-1)}
z97=q(.985);z94=q(.97);z99=q(.995);z95=q(.975)
na=sample(z94,.16*.84,.05);nb=sample(z95,2000**2,500);assert na['n_minimo']==191 and nb['n_minimo']==62
data=[9500,10000,8500,10500,16500,10000,12000,14000,17000];assert len(data)==9 and sum(data)==108000 and sum(data)/9==12000
res={'tanda':'S005','segundo_revisor_distinto':False,'A1':{'vertices':[[str(x),str(y)] for x,y in sorted(vertices)],'optimo':['2/3','2/3'],'coste':'4/3','calcio':2,'hierro':2,'certificado_global':True},'A2':{'a_continuidad':-1,'derivadas_laterales':[4,2],'minimo_interior':[-1,-1],'maximo_interior':[2,4],'extremos_unilaterales_separados':True},'A3':{'no_superar':.30,'A_dado_aprobado':.5,'C_y_no_superar':.054,'aprobados':[int(x) for x in passed]},'A4':{'z97':z97,'intervalo':[.16-z97*sqrt(.1344/125),.16+z97*sqrt(.1344/125)],'z94':z94,**na},'B1':{'A_cuadrada':[[-1,0],[0,-1]],'A_cuarta':a4,'X':X,'C_singular':True},'B2':{'limites_y_valor_0':[1,1,1],'derivadas_laterales':[4,-1],'b':'3/2','c':'5/2','segunda_derivada_en_menos_1':-3},'B3':{'propietario':float(own),'mayor_dado_no_propietario':'280/511','union':float(union)},'B4':{'datos':data,'suma':108000,'media':12000,'z99':z99,'intervalo':[12000-z99*2000/3,12000+z99*2000/3],'z95':z95,**nb}}
R=Path(__file__).resolve().parents[2];T=R/'output/verificaciones';T.mkdir(parents=True,exist_ok=True)
# Convertir los enteros racionales de A cuarta antes de serializar.
res['B1']['A_cuarta']=[[int(x) for x in row] for row in a4]
s=json.dumps(res,ensure_ascii=False,indent=2)+'\n';(T/'s005-matematica.json').write_text(s,encoding='utf-8');print(s)
