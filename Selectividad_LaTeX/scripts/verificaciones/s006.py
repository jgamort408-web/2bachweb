"""S006: verificación separada; incluye límites de inferencia por redondeo."""
from pathlib import Path
from fractions import Fraction as F
from statistics import NormalDist
from math import erfc,sqrt,floor,isclose
import json
verts=[(1,0),(0,1),(-1,0),(0,-1)]
assert [3*x+2*y+7 for x,y in verts]==[10,9,4,5]
assert [x+y+6 for x,y in verts]==[7,7,5,5]
for i in range(101):
 t=F(i,100);x,y=-t,t-1;assert abs(x)+abs(y)==1 and x+y+6==5
def mm(a,b):return [[sum(x*y for x,y in zip(row,col)) for col in zip(*b)] for row in a]
def sub(a,b):return [[x-y for x,y in zip(row,col)] for row,col in zip(a,b)]
I=[[1,0],[0,1]]
# Resolver por Gauss las columnas sin usar la inversa indicada en la solución.
def solve(m,rhs):
 n=len(m);aug=[[F(v) for v in m[i]+rhs[i]] for i in range(n)]
 for j in range(n):
  pivot=next(i for i in range(j,n) if aug[i][j]);aug[j],aug[pivot]=aug[pivot],aug[j]
  d=aug[j][j];aug[j]=[x/d for x in aug[j]]
  for i in range(n):
   if i!=j:
    k=aug[i][j];aug[i]=[x-k*y for x,y in zip(aug[i],aug[j])]
 return [row[n:] for row in aug]
A=[[5,-2],[3,1]];B=[[-1,3],[2,-1]];M=sub(A,list(zip(*A)));X=solve(M,B)
assert X==[[F(2,5),F(-1,5)],[F(1,5),F(-3,5)]] and mm(M,X)==B
poly=[1,-1,-1,1];ev=lambda p,x:sum(c*x**i for i,c in enumerate(p));der=lambda p:[i*p[i] for i in range(1,len(p))]
assert der(poly)==[-1,-2,3] and der(der(poly))==[-2,6]
assert ev(der(poly),0)==-1 and ev(der(poly),1)==0
assert [ev(poly,x) for x in [F(-1,3),F(1),F(1,3)]]==[F(32,27),0,F(16,27)]
assert [ev(der(poly),x)>0 for x in [-1,0,2]]==[True,False,True]
weights=[F(3,5),F(3,10),F(1,10)];rates=[F(4,5),F(7,10),F(2,5)]
j=[x*y for x,y in zip(weights,rates)];two=sum(j);one=1-two
assert two==F(73,100) and j[0]/two==F(48,73) and weights[2]*(1-rates[2])/one==F(2,9)
A=[[0,1,-1],[2,-1,0]];B=[[2,0],[-2,1],[0,1]];C=[[1,2],[2,-3]]
ab=mm(A,B);m=sub(ab,C);inv=solve(m,I);x=solve(m,C)
assert ab==[[-2,0],[6,-1]] and m==[[-3,-2],[4,2]]
assert inv==[[1,1],[-2,F(-3,2)]] and mm(m,inv)==I and mm(inv,m)==I
assert x==[[3,-1],[-5,F(1,2)]] and sub(mm(ab,x),mm(C,x))==C
D=[10000,-7200,2100,-200];dd=der(D)
assert ev(D,F(1,2))==6900 and [ev(D,x) for x in [0,3,4]]==[10000,1900,2000]
assert dd==[-7200,4200,-600]
for i in range(401):
 t=F(i,100);assert ev(D,t)-1900==200*(t-3)**2*(F(9,2)-t)>=0
assert ev(dd,2)<0 and ev(dd,F(7,2))>0 and ev(dd,3)==ev(dd,4)==0
weights=[F(7,20),F(2,5),F(1,4)];rates=[F(3,20),F(9,20),F(1,5)];h=sum(x*y for x,y in zip(weights,rates))
assert h==F(113,400) and weights[2]*(1-rates[2])/(1-h)==F(80,287)
assert sum(x*(1-y) for x,y in zip(weights,rates))==1-h
def q(p):
 lo,hi=-10.,10.
 for _ in range(120):
  mid=(lo+hi)/2
  if .5*erfc(-mid/sqrt(2))<p:lo=mid
  else:hi=mid
 z=NormalDist().inv_cdf(p);assert isclose(z,(lo+hi)/2,abs_tol=1e-12);return z
z90=q(.95);p=F(4,15);threshold=z90*z90*float(p*(1-p))/.1**2;n=floor(threshold)+1
err=lambda n:z90*sqrt(float(p*(1-p))/n)
assert n==53 and err(n)<.1 and err(n-1)>=.1
z985=q(.9925);z966=q(.983);candidates=[]
for k in range(1,1000):
 e=z985*150/sqrt(k)
 if round(18500-e,1)==18475.7 and round(18500+e,1)==18524.3:candidates.append(k)
assert candidates==[225,226] and isclose((2.43*150/24.3)**2,225)
res={'tanda':'S006','segundo_revisor_distinto':False,'A1':{'max_F':10,'punto':[1,0],'min_G':5,'segmento_completo':[[-1,0],[0,-1]],'X':[[str(v) for v in row] for row in X]},'A2':{'a':-1,'b':-1,'maximo':['-1/3','32/27'],'minimo':[1,0],'inflexion':['1/3','16/27']},'A3':{'dos_litros':.73,'naranja_dado_dos':'48/73','melocoton_dado_uno':'2/9'},'A4':{'z90':z90,'proporcion':'4/15','intervalo':[float(p)-err(60),float(p)+err(60)],'umbral_n':threshold,'n_minimo':n,'error_n':err(n),'error_anterior':err(n-1)},'B1':{'AB':ab,'M':m,'X':[[str(v) for v in row] for row in x],'residuo_nulo':True},'B2':{'D_0_5':6900,'precio_minimo':3,'demanda_minima':1900,'extremos_dominio':[10000,2000],'factorizacion_exacta':True},'B3':{'hospitalizacion':float(h),'C_sin_hospitalizacion':'80/287'},'B4':{'media_desde_limites':18500,'error_desde_limites':24.3,'z985_preciso':z985,'n_al_tratar_limites_como_exactos':(z985*150/24.3)**2,'n_con_z_tabulado_2_43':225,'tamanos_compatibles_limites_redondeados':candidates,'n_unico_deducible_sin_convencion':False,'errores_precisos':[z985*150/sqrt(k) for k in candidates],'z966':z966,'error_n100':z966*15}}
R=Path(__file__).resolve().parents[2];T=R/'output/verificaciones';T.mkdir(parents=True,exist_ok=True)
s=json.dumps(res,ensure_ascii=False,indent=2)+'\n';(T/'s006-matematica.json').write_text(s,encoding='utf-8');print(s)
