from pathlib import Path
from fractions import Fraction as F
from itertools import combinations
import json
R=Path(__file__).resolve().parents[2];T=R/'output/verificaciones';T.mkdir(parents=True,exist_ok=True)
# Restricciones a*x+b*y <= c; intersecciones exactas, no optimizador numérico.
limits=[(7,6,420),(2,1,80),(0,-1,-10),(1,-2,0),(-1,0,0)]
verts=set()
for (a,b,c),(d,e,f) in combinations(limits,2):
 det=a*e-b*d
 if not det:continue
 x,y=F(c*e-b*f,det),F(a*f-c*d,det)
 if all(A*x+B*y<=C for A,B,C in limits):verts.add((x,y))
assert verts=={(F(0),F(10)),(F(20),F(10)),(F(32),F(16)),(F(12),F(56)),(F(0),F(70))}
assert max((5*x+4*y,x,y) for x,y in verts)==(284,12,56)
assert F(3,5)*7+F(2,5)*2==5 and F(3,5)*6+F(2,5)==4
assert F(3,5)*420+F(2,5)*80==284
integer=[(5*x+4*y,x,y) for x in range(41) for y in range(71) if all(a*x+b*y<=c for a,b,c in limits)]
assert max(integer)==(284,12,56) and sum(v==284 for v,x,y in integer)==1
assert 70*12+60*56==4200 and 20*12+10*56==800 and 56>=10 and 12<=112
# Polinomios en orden ascendente: aritmética exacta independiente del TeX.
def deriv(p):return [i*p[i] for i in range(1,len(p))]
def at(p,x):return sum(c*x**i for i,c in enumerate(p))
p=[2,-9,0,1];dp=deriv(p);ddp=deriv(dp)
assert dp==[-9,0,3] and ddp==[0,6]
for x,k in [(-2,18),(2,-14)]:assert at(dp,x)==3 and at(p,x)==3*x+k
assert [at(dp,x)>0 for x in [-2,0,2]]==[True,False,True]
assert at(ddp,-1)<0<at(ddp,1) and at(p,0)==2
# Módulo x²-3, x³-9x+2 = -6x+2: ordenadas exactas de los extremos.
assert [p[0],p[1]+3*p[3]]==[2,-6]
primitive=[F(0),F(2),F(-9,2),F(0),F(1,4)]
assert deriv(primitive)==p
result={'S001':'comprobación matemática exacta','A1':{'vertices':[[str(x),str(y)] for x,y in sorted(verts)],'beneficio_maximo':284,'produccion':[12,56],'producciones_enteras_comprobadas':len(integer),'optimo_entero_unico':True,'certificado_cota':'(3/5)(7x+6y)+(2/5)(2x+y)<=284','recursos_comprobados':True},'A2':{'derivada':dp,'segunda_derivada':ddp,'tangencias':[-2,2],'rectas':['y=3x+18','y=3x-14'],'signos_monotonia':['+','-','+'],'signos_curvatura':['-','+'],'inflexion':[0,2],'primitiva_verificada_por_derivacion':True},'metodo':'Aritmética racional, intersecciones de restricciones, enumeración entera y operaciones sobre coeficientes; no usa los resultados impresos en un PDF como oráculo.'}
(T/'verificacion-matematica.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
