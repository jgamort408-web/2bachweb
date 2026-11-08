"""S004: verificación separada exacta y numérica de todos los apartados."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations
from statistics import NormalDist
from math import erfc,sqrt,ceil,floor,log,exp,isclose
import json

constraints=[(-3,7,15),(1,-1,3),(-1,-3,-11)];vertices=set()
for (a,b,c),(d,e,f) in combinations(constraints,2):
 det=a*e-b*d;x=F(c*e-b*f,det);y=F(a*f-c*d,det)
 if all(i*x+j*y<=k for i,j,k in constraints):vertices.add((x,y))
assert vertices=={(2,3),(5,2),(9,6)}
vals={p:4*p[0]-p[1]-16 for p in vertices};assert min(vals.values())==-11 and max(vals.values())==14
assert min(vals,key=vals.get)==(2,3) and max(vals,key=vals.get)==(9,6)
# Regla del cociente logarítmico y cálculo separado por diferencias finitas.
for x in [F(-3,4),F(-1,3),F(0),F(2,3)]:
 u=(1-x)/(1+x);du=-F(2)/(1+x)**2
 assert du/(2*u)==1/(x*x-1)
def numeric_derivative(fun,x):
 h=1e-5;return (fun(x+h)-fun(x-h))/(2*h)
for x in [-.7,0.,.6]:assert isclose(numeric_derivative(lambda t:.5*log((1-t)/(1+t)),x),1/(x*x-1),rel_tol=1e-8,abs_tol=1e-8)
for x in [-1.2,-1.,0.,.7]:
 product=4*x*(x*x+1)*exp(2*x-1)+2*(x*x+1)**2*exp(2*x-1)
 factored=2*(x*x+1)*(x+1)**2*exp(2*x-1)
 assert isclose(product,factored,abs_tol=1e-12)
 assert isclose(numeric_derivative(lambda t:(t*t+1)**2*exp(2*t-1),x),factored,abs_tol=2e-7,rel_tol=1e-7)
for x in range(-5,8):assert x*x-6*x+8-(2*x-8)==(x-4)**2
assert 4*4-6*4+8==0 and 2*4-6==2
joint=F(17,100);union=1-F(58,100);sport=joint/F(1,2);diet=union-sport+joint
assert (union,sport,diet,joint/diet)==(F(21,50),F(17,50),F(1,4),F(17,25))
assert diet*sport!=joint and sum([joint,diet-joint,sport-joint,1-union])==1
def mm(a,b):return [[sum(x*y for x,y in zip(row,col)) for col in zip(*b)] for row in a]
def add(a,b):return [[x+y for x,y in zip(row,col)] for row,col in zip(a,b)]
A=[[3,-1],[-6,1]];B=[[2,0],[-2,2]];C=[[3],[1]];D=[[-2,2]]
ac=mm(A,C);bd=mm(B,list(zip(*D)));b2=mm(B,B);cd=mm(C,D)
assert add(ac,bd)==[[4],[-9]] and add(b2,cd)==[[-2,6],[-10,6]] and mm(D,C)==[[-4]]
M=add(A,[[1,0],[0,1]]);target=[[6,-6],[0,6]]
# Resolver por separado cada fila de XM=target mediante eliminación de Gauss.
X=[]
for rhs in target:
 aug=[[F(M[j][i]) for j in range(2)]+[F(rhs[i])] for i in range(2)]
 for j in range(2):
  d=aug[j][j];aug[j]=[x/d for x in aug[j]]
  for i in range(2):
   if i!=j:
    k=aug[i][j];aug[i]=[x-k*y for x,y in zip(aug[i],aug[j])]
 X.append([row[-1] for row in aug])
assert X==[[-12,-9],[18,12]] and mm(X,M)==target
a=F(3,3);b=2*a;assert a+b==3 and 2*a-b==0 and 2*a+2*b==6
for x in [F(-2),F(-1,2),F(1,2),F(1),F(2)]:assert 2*x-2/x**2==2*(x-1)*(x*x+x+1)/x**2
for x in [-2.,-.5,.5,2.]:assert isclose(numeric_derivative(lambda t:t**3/3+2*log(abs(t)),x),x*x+2/x,rel_tol=1e-8,abs_tol=1e-8)
inter=F(1,2)-F(3,10);pb=F(3,4)-F(1,2)+inter
assert inter==F(1,5) and pb==F(9,20) and F(3,10)/(1-pb)==F(6,11) and F(1,2)*pb!=inter
assert sum([inter,F(3,10),pb-inter,F(1,4)])==1

def quantile(p):
 lo,hi=-10.,10.
 for _ in range(120):
  mid=(lo+hi)/2
  if .5*erfc(-mid/sqrt(2))<p:lo=mid
  else:hi=mid
 q=NormalDist().inv_cdf(p);assert isclose(q,(lo+hi)/2,abs_tol=1e-12);return q
z90=quantile(.95);z80=quantile(.9);z975=quantile(.9875);z925=quantile(.9625)
threshold=(30*z80/5)**2;na=ceil(threshold);width=lambda n:30*z80/sqrt(n)
assert na==60 and width(59)>5 and width(60)<=5
assert ceil((6*1.28)**2)==59 and ceil((6*(1.28+(.9000-.8997)/(.9015-.8997)*.01))**2)==60
nbth=z925*z925*.25/.03**2;nb=floor(nbth)+1;err=lambda n:z925*.5/sqrt(n)
assert nb==881 and err(880)>=.03 and err(881)<.03
res={'tanda':'S004','segundo_revisor_distinto':False,'A1':{'vertices':sorted([[int(x),int(y)] for x,y in vertices]),'minimo':-11,'punto_minimo':[2,3],'maximo':14,'punto_maximo':[9,6]},'A2':{'dominio_f':[-1,1],'extremos_dominio_excluidos':True,'pendiente_tangente':2,'ordenada_tangente':-8,'comprobaciones_derivadas':True},'A3':{'union':float(union),'deporte':float(sport),'dieta':float(diet),'deporte_dado_dieta':float(joint/diet),'independientes':False},'A4':{'z90':z90,'intervalo':[175-3*z90,175+3*z90],'z80':z80,'umbral_n':threshold,'n_minimo':na,'amplitud_n_anterior':width(59),'amplitud_n':width(60),'n_por_redondeo_prematuro_1_28':59},'B1':{'suma_columnas':add(ac,bd),'B2_mas_CD':add(b2,cd),'X':[[int(x) for x in row] for row in X],'residuo_nulo':True},'B2':{'a':1,'b':2,'segunda_derivada_en_1':6,'primitiva_comprobada':True},'B3':{'interseccion':float(inter),'P_B':float(pb),'condicionada':'6/11','independientes':False,'incompatibles':False},'B4':{'z975':z975,'intervalo':[.45-z975*sqrt(.2475/5000),.45+z975*sqrt(.2475/5000)],'z925':z925,'umbral_n':nbth,'n_minimo':nb,'error_n_anterior':err(880),'error_n':err(881)}}
R=Path(__file__).resolve().parents[2];T=R/'output/verificaciones';T.mkdir(parents=True,exist_ok=True)
s=json.dumps(res,ensure_ascii=False,indent=2)+'\n';(T/'s004-matematica.json').write_text(s,encoding='utf-8');print(s)
