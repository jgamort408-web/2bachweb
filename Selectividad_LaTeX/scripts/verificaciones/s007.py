"""S007: cálculo separado exacto y verificación de muestras, matriz y primitivas."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations
from statistics import NormalDist
from math import erfc,sqrt,floor,isclose
import json
constraints=[(-5,-2,-10),(-1,-1,-4),(-1,-3,-6),(-1,0,0),(0,-1,0)];verts=set()
for (a,b,c),(d,e,f) in combinations(constraints,2):
 det=a*e-b*d
 if det:
  x=F(c*e-b*f,det);y=F(a*f-c*d,det)
  if all(i*x+j*y<=k for i,j,k in constraints):verts.add((x,y))
assert verts=={(0,5),(F(2,3),F(10,3)),(3,1),(6,0)}
cost=lambda p:F(3,5)*p[0]+p[1]
assert min(verts,key=cost)==(3,1) and cost((3,1))==F(14,5)
# Enumeración entera sin cota artificial: un coste <2.8 exige x<14/3 e y<2.8.
ints=[(x,y) for x in range(5) for y in range(3) if all(a*x+b*y<=c for a,b,c in constraints)]
assert min(ints,key=cost)==(3,1)
for x,y in verts:assert cost((x,y))==F(2,5)*(x+y)+F(1,5)*(x+3*y)
fun=lambda x:x-(3*x-1)/(x+1)
for x in [F(-3),F(0),F(1),F(2,3)]:
 assert fun(x)==x-3+4/(x+1)
 assert 1-(3*(x+1)-(3*x-1))/(x+1)**2==1-4/(x+1)**2
assert 1-4/(F(2,3)+1)**2==F(-11,25)
assert fun(F(-3))==-8 and fun(F(1))==0
weights=[F(3,10),F(1,2),F(1,5)];rates=[F(3,5),F(4,5),F(7,10)]
j=[a*b for a,b in zip(weights,rates)];cure=sum(j)
assert cure==F(18,25) and j[0]/cure==F(1,4)
assert sum(a*(1-b) for a,b in zip(weights,rates))==1-cure
A=[[1,1,3],[1,2,-1],[1,-1,-1]];B=[[2],[3],[0]];I=[[int(i==j) for j in range(3)] for i in range(3)]
def mm(a,b):return [[sum(x*y for x,y in zip(row,col)) for col in zip(*b)] for row in a]
aug=[[F(v) for v in row+I[i]] for i,row in enumerate(A)]
det=F(1)
for k in range(3):
 d=aug[k][k];det*=d;aug[k]=[x/d for x in aug[k]]
 for i in range(3):
  if i!=k:
   v=aug[i][k];aug[i]=[x-v*y for x,y in zip(aug[i],aug[k])]
inv=[row[3:] for row in aug];assert det==-12 and mm(A,inv)==I and mm(inv,A)==I
x=mm(inv,B);assert x==[[1],[1],[0]] and mm(A,x)==B
poly=[1,3,-2,F(1,3)];der=lambda p:[i*p[i] for i in range(1,len(p))];ev=lambda p,x:sum(a*x**i for i,a in enumerate(p))
assert der(poly)==[3,-4,1] and der(der(poly))==[-4,2]
assert [ev(poly,F(i)) for i in [1,3,2]]==[F(7,3),1,F(5,3)]
assert [ev(der(poly),i)>0 for i in [0,2,4]]==[True,False,True]
primitive=[0,1,F(3,2),F(-2,3),F(1,12)];assert der(primitive)==poly
inter=F(2,5)*F(1,4);pa=inter+F(2,5);union=pa+F(2,5)-inter
assert inter==F(1,10) and pa==F(1,2) and union==F(4,5) and inter!=pa*F(2,5)
assert sum([inter,F(2,5),F(3,10),F(1,5)])==1
def q(p):
 lo,hi=-10.,10.
 for _ in range(120):
  m=(lo+hi)/2
  if .5*erfc(-m/sqrt(2))<p:lo=m
  else:hi=m
 z=NormalDist().inv_cdf(p);assert isclose(z,(lo+hi)/2,abs_tol=1e-12);return z
def sample(z,var,e):
 t=z*z*var/e**2;n=floor(t)+1;err=lambda n:z*sqrt(var/n)
 assert err(n)<e and err(n-1)>=e
 return {'umbral_n':t,'n_minimo':n,'error_n':err(n),'error_anterior':err(n-1)}
z97=q(.985);z95=q(.975);z98=q(.99);na=sample(z97,16,2.1);nb=sample(z98,.21,.1)
assert na['n_minimo']==18 and nb['n_minimo']==114
data=[15,120,50,40,5,46,52,48,10];assert len(data)==9 and sum(data)==386 and data[1]==120
mean=F(sum(data),9);error=z97*4/3
res={'tanda':'S007','segundo_revisor_distinto':False,'A1':{'vertices':[[str(x),str(y)] for x,y in sorted(verts)],'optimo':[3,1],'coste':2.8,'aportes':[17,20,6],'certificado_global':True,'optimo_entero_comprobado':True},'A2':{'dominio_excluye':-1,'pendiente':'-11/25','puntos_horizontales':[[-3,-8],[1,0]]},'A3':{'curacion':float(cure),'A_dado_curacion':.25},'A4':{'z97':z97,**na,'datos':data,'suma':386,'media':'386/9','media_decimal':float(mean),'error_n9':error,'intervalo':[float(mean)-error,float(mean)+error]},'B1':{'determinante':int(det),'inversa':[[str(v) for v in row] for row in inv],'X':[1,1,0],'ambos_productos_identidad':True},'B2':{'maximo':['1','7/3'],'minimo':[3,1],'inflexion':['2','5/3'],'pendiente_0':3,'primitiva_coeficientes':[str(v) for v in primitive],'primitiva_comprobada':True},'B3':{'interseccion':float(inter),'A':float(pa),'union':float(union),'independientes':False,'incompatibles':False},'B4':{'z95':z95,'z98':z98,'proporcion':.3,'intervalo':[.3-z95*sqrt(.21/320),.3+z95*sqrt(.21/320)],**nb},'incidencia_006':{'literal_preservado':'matrix','efecto_matematico':False,'estado_csv_modificado':False}}
R=Path(__file__).resolve().parents[2];T=R/'output/verificaciones';T.mkdir(parents=True,exist_ok=True)
s=json.dumps(res,ensure_ascii=False,indent=2)+'\n';(T/'s007-matematica.json').write_text(s,encoding='utf-8');print(s)
