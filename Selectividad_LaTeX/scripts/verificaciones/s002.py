"""Comprobación reproducible S002: fracciones, matrices, polinomios y Normal."""
from pathlib import Path
from fractions import Fraction as F
from statistics import NormalDist
from math import sqrt,erfc,ceil
import json
R=Path(__file__).resolve().parents[2];T=R/'output/verificaciones';T.mkdir(parents=True,exist_ok=True)
joints=[F(65,100)*F(75,100),F(65,100)*F(25,100),F(35,100)*F(15,100),F(35,100)*F(85,100)]
assert sum(joints)==1 and joints[0]+joints[2]==F(27,50)
assert joints[3]/(joints[1]+joints[3])==F(119,184)
def cdf(x):return .5*erfc(-x/sqrt(2))
def bisect_quantile(p):
 lo,hi=0.,8.
 for _ in range(110):
  m=(lo+hi)/2
  if cdf(m)<p:lo=m
  else:hi=m
 return (lo+hi)/2
def z(p):
 q=NormalDist().inv_cdf(p);assert abs(q-bisect_quantile(p))<1e-12;assert abs(cdf(q)-p)<1e-14
 return q
za=z(.985);ea=za*sqrt(.45*.55/300);ka=za**2*.45*.55/.02**2;na=int(ka)+1
assert na==2914 and za*sqrt(.45*.55/(na-1))>.02>za*sqrt(.45*.55/na)
A=[[F(x) for x in row] for row in [[1,-2,0],[-2,2,-1],[0,1,1]]]
I=[[F(i==j) for j in range(3)] for i in range(3)]
def mul(a,b):return [[sum(x*y for x,y in zip(row,col)) for col in zip(*b)] for row in a]
def det(a):
 if len(a)==1:return a[0][0]
 return sum((-1)**j*a[0][j]*det([row[:j]+row[j+1:] for row in a[1:]]) for j in range(len(a)))
def inverse(a):
 n=len(a);m=[row[:]+I[i][:] for i,row in enumerate(a)]
 for j in range(n):
  k=next(i for i in range(j,n) if m[i][j]);m[j],m[k]=m[k],m[j];pivot=m[j][j];m[j]=[x/pivot for x in m[j]]
  for i in range(n):
   if i!=j:
    factor=m[i][j];m[i]=[x-factor*y for x,y in zip(m[i],m[j])]
 return [row[n:] for row in m]
inv=inverse(A);expected=[[F(x) for x in r] for r in [[-3,-2,-2],[-2,-1,-1],[2,1,2]]]
assert det(A)==-1 and inv==expected and mul(A,inv)==mul(inv,A)==I
X=[[F(-4),F(-4),F(-3)],[F(-4),F(-1,2),F(-2)],[F(3),F(2),F(7,2)]]
square=mul(A,A);prod=mul(X,A)
assert all(2*prod[i][j]-square[i][j]-3*I[i][j]==0 for i in range(3) for j in range(3))
assert all(X[i][j]==(A[i][j]+3*inv[i][j])/2 for i in range(3) for j in range(3))
# Derivación racional por operaciones con coeficientes; contraste con fórmulas impresas.
def trim(p):
 while len(p)>1 and p[-1]==0:p.pop()
 return p
def pmul(a,b):
 p=[F(0)]*(len(a)+len(b)-1)
 for i,x in enumerate(a):
  for j,y in enumerate(b):p[i+j]+=x*y
 return trim(p)
def sub(a,b):return trim([(a[i] if i<len(a) else 0)-(b[i] if i<len(b) else 0) for i in range(max(len(a),len(b)))])
def deriv(a):return [i*a[i] for i in range(1,len(a))] or [F(0)]
def rd(n,d):return sub(pmul(deriv(n),d),pmul(n,deriv(d))),pmul(d,d)
d=[F(-1),F(1)];n1,d1=rd([F(1)],d);n2,d2=rd(n1,d1)
assert n1==[-1] and d1==[1,-2,1]
assert pmul(n2,pmul(pmul(d,d),d))==pmul([F(2)],d2)
for h in [F(-1,10),F(-1,100),F(-1,1000)]:assert (1/(h-1)+1)/h==1/(h-1)
assert deriv([F(-2),0,F(1)])==[0,2] and deriv([0,2])==[2]
assert F(1,-1)==-1 and -1!=0 and -1!=-2
for x in [F(-10),F(-1),F(-1,100)]:assert -1/(x-1)**2<0 and 2/(x-1)**3<0 and 1/(x-1)>-1
u=1-F(18,100);inter=F(69,100)+F(35,100)-u
assert u==F(41,50) and inter==F(11,50) and inter/F(69,100)==F(22,69) and F(69,100)-inter==F(47,100)
assert sum([F(22,100),F(47,100),F(13,100),F(18,100)])==1
sample=[10,17,8,27,6,9,32,5,21];assert sum(sample)==135 and F(sum(sample),len(sample))==15
zb=z(.96);eb=zb*8/3;zc=z(.9775);kb=(zc*8/1.5)**2;nb=int(kb)+1
assert nb==115 and zc*8/sqrt(114)>1.5>zc*8/sqrt(115)
assert ceil((2.01*8/1.5)**2)==115 # percentil de tabla conservador.
result={'tanda':'S002','metodo':'Fracciones exactas; eliminación de Gauss frente a cofactores; residuo matricial; derivación racional; percentiles Normal contrastados con bisección de CDF erfc.',
'A3':{'hotel':'27/50','rural_dado_apartamento':'119/184','tabla_conjunta':[str(x) for x in joints]},
'A4':{'proporcion':.45,'percentil':za,'intervalo':[.45-ea,.45+ea],'umbral_n':ka,'n_minimo':na,'error_anterior':za*sqrt(.45*.55/2913),'error_minimo':za*sqrt(.45*.55/2914)},
'B1':{'determinante':str(det(A)),'inversa':[[str(x) for x in row] for row in inv],'X':[[str(x) for x in row] for row in X],'residuo_nulo':True},
'B2':{'dominio':'R','a_continuidad':-1,'derivadas_laterales':[-1,0],'a_apartado_b':-2,'limites_laterales_b':[-1,-2],'signos_primera':['-','+'],'signos_segunda':['-','+'],'inflexion':False},
'B3':{'union':'41/50','interseccion':'11/50','peliculas_dadas_series':'22/69','solo_series':'47/100'},
'B4':{'suma':135,'media':15,'percentil_92':zb,'intervalo_92':[15-eb,15+eb],'percentil_95_5':zc,'umbral_n':kb,'n_minimo':nb,'error_114':zc*8/sqrt(114),'error_115':zc*8/sqrt(115)}}
(T/'s002-matematica.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('S002: comprobaciones exactas y numéricas superadas; mínimos2914 y115 verificados a ambos lados.')
