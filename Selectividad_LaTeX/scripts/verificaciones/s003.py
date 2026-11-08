"""Comprobaciones separadas S003: aritmética exacta, vértices y cuantiles."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations
from statistics import NormalDist
from math import erfc,sqrt,floor,isclose
import json

def mm(a,b):return [[sum(x*y for x,y in zip(row,col)) for col in zip(*b)] for row in a]
def add(a,b):return [[x+y for x,y in zip(u,v)] for u,v in zip(a,b)]
A=[[1,0,-2],[-1,1,0]];B=[[1,-3],[-2,0]];C=[[7,-12,16],[-1,7,12]]
aat=mm(A,list(zip(*A)));assert aat==[[5,-1],[-1,2]]
m=add(aat,B);assert m[0][0]*m[1][1]-m[0][1]*m[1][0]==0
# Resolver BX=C-A por eliminación de filas, sin utilizar la inversa escrita.
aug=[[F(x) for x in B[i]+[C[i][j]-A[i][j] for j in range(3)]] for i in range(2)]
for j in range(2):
 d=aug[j][j];aug[j]=[x/d for x in aug[j]]
 for i in range(2):
  if i!=j:
   k=aug[i][j];aug[i]=[x-k*y for x,y in zip(aug[i],aug[j])]
X=[x[2:] for x in aug];assert X==[[0,-3,-6],[-2,3,-8]] and add(mm(B,X),A)==C
cost=lambda x:2*(2*x-1)**2+1
assert [cost(x) for x in [F(0),F(1,2),F(1),F(2)]]==[3,1,3,19]
assert all(cost(F(i,100))>=1 for i in range(201))
models=[F(1,4),F(2,5),F(7,20)];rates=[F(3,20),F(1,10),F(3,25)]
joints=[p*q for p,q in zip(models,rates)];av=sum(joints)
assert av==F(239,2000) and 1-rates[0]==F(17,20)
union=av+models[2]-joints[2];assert union==F(171,400)
assert sum(joints)+sum(p*(1-q) for p,q in zip(models,rates))==1
# Todas las intersecciones de fronteras; filtrado exacto de semiplanos.
constraints=[(3,5,45),(1,0,10),(0,1,6),(-2,1,0),(-1,0,0),(0,-1,0)]
vertices=set()
for (a,b,c),(d,e,f) in combinations(constraints,2):
 det=a*e-b*d
 if det:
  x=F(c*e-b*f,det);y=F(a*f-c*d,det)
  if all(i*x+j*y<=k for i,j,k in constraints):vertices.add((x,y))
assert vertices=={(0,0),(10,0),(10,3),(5,6),(3,6)}
best=max(vertices,key=lambda p:2*p[0]+4*p[1]);assert best==(5,6)
assert 2*best[0]+4*best[1]==34 and F(9,2)*7+F(15,2)*5==69
assert all(F(2,3)*(3*x+5*y)+F(2,3)*y==2*x+4*y for x,y in vertices)
# Diferenciación algebraica de coeficientes (orden creciente).
poly=[1,-3,0,1]
der=lambda p:[i*p[i] for i in range(1,len(p))]
ev=lambda p,x:sum(c*x**i for i,c in enumerate(p))
assert der(poly)==[-3,0,3] and der(der(poly))==[0,6]
assert [ev(poly,x) for x in [-1,1,0]]==[3,-1,1]
assert [ev(der(poly),x)>0 for x in [-2,0,2]]==[True,False,True]
pb=F(1,5)/F(4,5);pa=F(2,5)-pb+F(1,5)
assert pb==F(1,4) and pa==F(7,20) and pa*pb!=F(1,5)
atoms=[F(1,5),pa-F(1,5),pb-F(1,5),1-F(2,5)]
assert sum(atoms)==1 and sum(atoms[1:])==F(4,5)

def quantile(p):
 lo,hi=-10.,10.
 for _ in range(120):
  mid=(lo+hi)/2
  if .5*erfc(-mid/sqrt(2))<p:lo=mid
  else:hi=mid
 q=(lo+hi)/2;assert isclose(q,NormalDist().inv_cdf(p),abs_tol=1e-12)
 return NormalDist().inv_cdf(p)
z=quantile(.96);w=quantile(.99)
def sample(z,var,error):
 threshold=z*z*var/error**2;n=floor(threshold)+1
 e=lambda n:z*sqrt(var/n)
 assert e(n)<error and e(n-1)>=error
 return dict(umbral=threshold,n_minimo=n,error_n=e(n),error_anterior=e(n-1))
na=sample(w,36,2);nb=sample(z,.22*.78,.03)
assert na['n_minimo']==49 and nb['n_minimo']==585
result={'tanda':'S003','segundo_revisor_distinto':False,'A1':{'AAtraspuesta':aat,'X':[[int(x) for x in row] for row in X],'residuo_nulo':True},'A2':{'minimo_x':.5,'coste_minimo':1},'A3':{'averia':float(av),'no_averia_dado_A':.85,'union':float(union)},'A4':{'z92':z,'intervalo':[35-z*.75,35+z*.75],'z98':w,**na},'B1':{'vertices':sorted([[float(x),float(y)] for x,y in vertices]),'optimo':[5,6],'beneficio':34},'B2':{'coeficientes':poly,'maximo_x':-1,'minimo_x':1,'inflexion_x':0},'B3':{'P_A':float(pa),'P_B':float(pb),'independientes':False,'union_complementos':.8},'B4':{'intervalo':[.22-z*sqrt(.22*.78/50),.22+z*sqrt(.22*.78/50)],**nb}}
R=Path(__file__).resolve().parents[2];T=R/'output/verificaciones';T.mkdir(parents=True,exist_ok=True)
s=json.dumps(result,ensure_ascii=False,indent=2)+'\n';(T/'s003-matematica.json').write_text(s,encoding='utf-8');print(s)
