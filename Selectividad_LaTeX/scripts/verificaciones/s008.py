"""S008: verificación exacta por bloques, áreas y enumeración de muestras."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations,permutations,product
from statistics import NormalDist
from math import erfc,sqrt,floor,isclose,log,exp
import json
constraints=[(-1,-1,-10),(-1,1,10),(3,2,120),(-1,0,0),(0,-1,0)];vs=set()
for (a,b,c),(d,e,f) in combinations(constraints,2):
 det=a*e-b*d
 if det:
  x=F(c*e-b*f,det);y=F(a*f-c*d,det)
  if all(i*x+j*y<=k for i,j,k in constraints):vs.add((x,y))
assert vs=={(0,10),(10,0),(40,0),(20,30)}
gain=lambda p:130*p[0]+140*p[1]
assert max(vs,key=gain)==(20,30) and gain((20,30))==6800
for x,y in vs:assert gain((x,y))==54*(3*x+2*y)+32*(y-x)
ints=[(x,y) for x in range(41) for y in range(61) if all(a*x+b*y<=c for a,b,c in constraints)]
assert max(ints,key=gain)==(20,30)
def padd(a,b):return [(a[i] if i<len(a) else 0)+(b[i] if i<len(b) else 0) for i in range(max(len(a),len(b)))]
def pmul(a,b):
 out=[0]*(len(a)+len(b)-1)
 for i,x in enumerate(a):
  for j,y in enumerate(b):out[i+j]+=x*y
 return out
M=[[[1],[-1],[0,1]],[[0],[2],[-3]],[[0,1],[1],[1]]];dpoly=[0]
for perm in permutations(range(3)):
 sign=(-1)**sum(perm[i]>perm[j] for i in range(3) for j in range(i+1,3));v=[sign]
 for i in range(3):v=pmul(v,M[i][perm[i]])
 dpoly=padd(dpoly,v)
assert dpoly==[5,3,-2]
def mm(a,b):return [[sum(x*y for x,y in zip(row,col)) for col in zip(*b)] for row in a]
def add(a,b):return [[x+y for x,y in zip(u,v)] for u,v in zip(a,b)]
A=[[1,-1,2],[0,2,-3],[2,1,1]];I=[[int(i==j) for j in range(3)] for i in range(3)];aug=[[F(x) for x in row+I[i]] for i,row in enumerate(A)]
for j in range(3):
 q=aug[j][j];aug[j]=[x/q for x in aug[j]]
 for i in range(3):
  if i!=j:
   q=aug[i][j];aug[i]=[x-q*y for x,y in zip(aug[i],aug[j])]
inv=[row[3:] for row in aug];X=add(A,inv);assert mm(A,inv)==mm(inv,A)==I
assert mm(X,A)==add(mm(A,A),I)
assert X==[[F(8,3),0,F(5,3)],[-2,1,-2],[F(2,3),0,F(5,3)]]
der=lambda p:[i*p[i] for i in range(1,len(p))];ev=lambda p,x:sum(v*x**i for i,v in enumerate(p))
f=[0,4,-4,1];df=der(f);primitive=[0,0,2,F(-4,3),F(1,4)]
assert df==[4,-8,3] and der(primitive)==f
assert [ev(f,x) for x in [F(2,3),F(2),F(4,3)]]==[F(32,27),0,F(16,27)]
assert ev(primitive,2)-ev(primitive,0)==F(4,3)
assert all(ev(f,F(i,100))>=0 for i in range(201))
for x in [F(-3),F(-2),F(2),F(3)]:
 u=(x-1)/(x+1);du=F(2)/(x+1)**2;assert u>0 and du/u==F(2)/(x*x-1)
def nd(fun,x):
 h=1e-5;return (fun(x+h)-fun(x-h))/(2*h)
for x in [-2.,2.,3.]:assert isclose(nd(lambda t:log((t-1)/(t+1)),x),2/(x*x-1),rel_tol=1e-8)
for x in [-.8,0.,.7]:
 assert isclose(nd(lambda t:t**3*exp(2*t*t),x),x*x*(3+4*x*x)*exp(2*x*x),abs_tol=2e-8,rel_tol=1e-8)
h=[1,1,1];hp=[0,1,F(1,2),F(1,3)];area=ev(hp,0)-ev(hp,F(-1,2))
assert der(hp)==h and area==F(5,12) and ev(h,F(-1,2))==F(3,4)
weights=[F(3,5),F(3,10),F(1,10)];rates=[F(9,10),F(19,20),F(0)]
success=sum(x*y for x,y in zip(weights,rates));assert success==F(33,40) and weights[2]/(1-success)==F(4,7)
assert [3000*rates[0],1500*rates[1]]==[2700,1425]
joint=F(18,25)*F(16,25);union=F(11,20)+F(18,25)-joint;none=1-union
assert joint==F(288,625) and union==F(2023,2500) and none/F(9,20)==F(53,125)
population=[60,40,30,50,20];allocation=[F(v,5) for v in population]
assert sum(population)==200 and allocation==[12,8,6,10,4] and sum(allocation)==40
pop=[15,10,12,11,18];means=[sum(s,F(0))/3 for s in combinations(pop,3)]
assert len(means)==10 and sum(means)/10==F(66,5)
with_replacement=[sum(s,F(0))/3 for s in product(pop,repeat=3)];assert sum(with_replacement)/125==F(66,5)
def quantile(p):
 lo,hi=-10.,10.
 for _ in range(120):
  mid=(lo+hi)/2
  if .5*erfc(-mid/sqrt(2))<p:lo=mid
  else:hi=mid
 z=NormalDist().inv_cdf(p);assert isclose(z,(lo+hi)/2,abs_tol=1e-12);return z
z=quantile(.96);threshold=z*z*.2475/.05**2;n=floor(threshold)+1;err=lambda n:z*sqrt(.2475/n)
assert n==304 and err(303)>=.05 and err(304)<.05
res={'tanda':'S008','segundo_revisor_distinto':False,'E1':{'vertices':[[int(x),int(y)] for x,y in sorted(vs)],'optimo':[20,30],'beneficio':6800,'certificado_global':True,'optimo_entero':True},'E2':{'determinante_coeficientes':dpoly,'singulares':['-1','5/2'],'inversa_m2':[[str(v) for v in row] for row in inv],'X':[[str(v) for v in row] for row in X],'residuo_nulo':True},'E3':{'maximo':['2/3','32/27'],'minimo':[2,0],'inflexion':['4/3','16/27'],'primitiva_comprobada':True,'area':'4/3'},'E4':{'dominio_log':'(-infinito,-1) union (1,infinito)','derivadas_comprobadas':True,'vertice':['-1/2','3/4'],'corte_vertical':[0,1],'cortes_horizontales':[],'area':'5/12'},'E5':{'anticuerpos':float(success),'placebo_sin_anticuerpos':'4/7','recuentos':[2700,1425,500]},'E6':{'interseccion':float(joint),'union':float(union),'ninguno':float(none),'no_internet_dado_no_electronico':.424},'E7':{'N':200,'n':40,'afijacion':[int(v) for v in allocation],'a':15,'media_medias_sin_reposicion':13.2,'muestras_sin_reposicion':10,'media_medias_con_reposicion':13.2,'muestras_con_reposicion':125},'E8':{'z92':z,'proporcion':.45,'intervalo':[.45-err(100),.45+err(100)],'umbral_n':threshold,'n_minimo':n,'error_n':err(n),'error_anterior':err(n-1)}}
R=Path(__file__).resolve().parents[2];T=R/'output/verificaciones';T.mkdir(parents=True,exist_ok=True)
s=json.dumps(res,ensure_ascii=False,indent=2)+'\n';(T/'s008-matematica.json').write_text(s,encoding='utf-8');print(s)
