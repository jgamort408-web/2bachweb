"""S009: potencias, región, áreas, dados y precisión del tamaño muestral."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations,product
from statistics import NormalDist
from math import erfc,sqrt,floor,isclose
import json
def mm(a,b):return [[sum(x*y for x,y in zip(row,col)) for col in zip(*b)] for row in a]
def mp(a,n):
 p=[[1,0],[0,1]]
 for _ in range(n):p=mm(p,a)
 return p
A=[[1,0],[-1,1]];At=list(map(list,zip(*A)));I=[[1,0],[0,1]];inv=[[1,0],[1,1]]
assert mp(A,40)==[[1,0],[-40,1]] and mp(At,30)==[[1,-30],[0,1]] and mm(A,inv)==mm(inv,A)==I
assert mp([[A[i][j]+inv[i][j] for j in range(2)] for i in range(2)],2)==[[4,0],[0,4]]
M=[[2,-1],[0,2]];X=[[0,F(-1,2)],[0,0]];assert mm(M,X)==[[0,-1],[0,0]]
cons=[(-5,3,9),(1,1,11),(6,1,36),(-1,-2,-6)];vs=set()
for (a,b,c),(d,e,f) in combinations(cons,2):
 det=a*e-b*d;x=F(c*e-b*f,det);y=F(a*f-c*d,det)
 if all(i*x+j*y<=k for i,j,k in cons):vs.add((x,y))
assert vs=={(0,3),(3,8),(5,6),(6,0)}
obj=lambda p:10*p[0]-6*p[1];assert max(vs,key=obj)==(6,0) and max(map(obj,vs))==60 and min(map(obj,vs))==-18
for i in range(101):
 t=F(i,100);x,y=3*t,3+5*t;assert all(a*x+b*y<=c for a,b,c in cons) and obj((x,y))==-18
assert sum(a*5+b*7>c for a,b,c in cons)==2
ev=lambda p,x:sum(c*x**i for i,c in enumerate(p));der=lambda p:[i*p[i] for i in range(1,len(p))]
middle=[4,0,-3];line=[-1,2];midp=[0,4,0,-1];linep=[0,-1,1]
assert F(1,-1)==-1 and ev(middle,-1)==1
assert ev(middle,1)==ev(line,1)==1 and ev(der(middle),1)==-6 and ev(der(line),1)==2
assert der(midp)==middle and der(linep)==line
part1=ev(midp,1)-ev(midp,0);part2=ev(linep,3)-ev(linep,1);assert (part1,part2)==(3,6)
cost=[10,-6,1];assert ev(cost,3)==1 and ev(cost,4)==2 and ev(der(cost),4)==2
for x in range(7):assert ev(cost,x)-(2*x-6)==(x-4)**2
counts=[1000,600,400];rates=[F(21,50),F(1,5),F(1,2)];women=[n*p for n,p in zip(counts,rates)]
assert women==[420,120,200] and sum(women)/2000==F(37,100)
assert F(480,1260)==F(8,21)
dice=list(product(range(1,7),repeat=2));win=[v for v in dice if sum(v)>=9];assert len(dice)==36 and len(win)==10
pa=F(len(win),36);pb=1-pa;gv=pb*F(3,9);red=pa*F(4,9)+pb*F(6,9)
assert pa==F(5,18) and gv==F(13,54) and red==F(49,81)
assert pa*F(5,9)+pb*F(3,9)==1-red
def q(p):
 lo,hi=-10.,10.
 for _ in range(120):
  mid=(lo+hi)/2
  if .5*erfc(-mid/sqrt(2))<p:lo=mid
  else:hi=mid
 z=NormalDist().inv_cdf(p);assert isclose(z,(lo+hi)/2,abs_tol=1e-12);return z
z95=q(.975);z90=q(.95)
def sample(z):
 t=z*z*.1275/.01**2;n=floor(t)+1;e=lambda n:z*sqrt(.1275/n)
 assert e(n)<.01 and e(n-1)>=.01
 return {'z':z,'umbral_n':t,'n_minimo':n,'error_n':e(n),'error_anterior':e(n-1)}
precise=sample(z95);table=sample(1.96);assert precise['n_minimo']==4898 and table['n_minimo']==4899
assert 1.96*sqrt(.1275/4898)>.01 and z95*sqrt(.1275/4898)<.01
mean=F(63744,64);assert mean==996 and sqrt(256)/sqrt(64)==2
tail=.5*erfc(2/sqrt(2));assert isclose(tail,NormalDist().cdf(-2),abs_tol=1e-14)
ci=[996-2*z90,996+2*z90];assert ci[1]<1000
res={'tanda':'S009','segundo_revisor_distinto':False,'E1':{'A40':mp(A,40),'At30':mp(At,30),'suma_cuadrada':[[4,0],[0,4]],'X':[['0','-1/2'],['0','0']],'residuo_nulo':True},'E2':{'vertices':[[int(x),int(y)] for x,y in sorted(vs)],'maximo':60,'punto_maximo':[6,0],'minimo':-18,'segmento_minimo':[[0,3],[3,8]],'punto_5_7_factible':False},'E3':{'dominio':'R','salto_en_menos_1':[-1,1],'continua_en_1':True,'derivadas_en_1':[-6,2],'areas_por_tramos':[3,6],'area_total':9},'E4':{'minimo_x':3,'coste_miles':1,'produccion_kg':3000,'coste_euros':1000,'tangente':[2,-6],'diferencia_cuadrado':True},'E5':{'mujeres':[int(v) for v in women],'probabilidad_mujer':.37,'bombero_dado_hombre':'8/21'},'E6':{'convencion':'dos dados de seis caras equilibrados e independientes','pares_totales':36,'pares_suma_ge9':10,'P_A':'5/18','verde_B':'13/54','roja':'49/81'},'E7':{'proporcion':.15,'intervalo':[.15-z95*sqrt(.1275/1000),.15+z95*sqrt(.1275/1000)],'cuantil_preciso':precise,'cuantil_tabulado':table,'redondeo_cambia_minimo':True},'E8':{'sigma':16,'error_tipico':2,'prob_media_menor_996':tail,'media_muestral':996,'z90':z90,'intervalo':ci,'mil_fuera_por_encima':True}}
R=Path(__file__).resolve().parents[2];T=R/'output/verificaciones';T.mkdir(parents=True,exist_ok=True)
s=json.dumps(res,ensure_ascii=False,indent=2)+'\n';(T/'s009-matematica.json').write_text(s,encoding='utf-8');print(s)
