"""S014: fracciones, matrices, enumeración y cuantiles por métodos separados."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations,product
from statistics import NormalDist
import math,json
def main():
 r=Path(__file__).resolve().parents[2]
 D=[[3,15,2],[2,12,5],[1,16,7]];A=[[65,78],[85,83],[104,106]]
 costs=[[sum(D[i][k]*A[k][j] for k in range(3)) for j in range(2)] for i in range(3)]
 assert costs==[[1678,1691],[1670,1682],[2153,2148]]
 det=3*(12*7-5*16)-15*(2*7-5)+2*(2*16-12);assert det==-83
 lines=[(1,2,13),(1,-1,4),(-1,2,7),(-1,-1,-5)];vertices=set()
 for a,b in combinations(lines,2):
  d=a[0]*b[1]-a[1]*b[0]
  if not d:continue
  x=F(a[2]*b[1]-a[1]*b[2],d);y=F(a[0]*b[2]-a[2]*b[0],d)
  if all(c*x+e*y<=f for c,e,f in lines):vertices.add((x,y))
 assert vertices=={(1,4),(F(9,2),F(1,2)),(7,3),(3,5)}
 assert sorted(x+y for x,y in vertices)==[5,5,8,10]
 for t in [F(i,100) for i in range(101)]:
  x=1+F(7,2)*t;y=4-F(7,2)*t
  assert x+y==5 and all(c*x+e*y<=f for c,e,f in lines)
 # Condiciones laterales de la función B3 y ausencia de singularidad en x=1.
 a,b=F(2),F(-2);assert 2-a==a+b==0 and -a==b==-2
 assert a+b*math.exp(1)<0
 prim=lambda x:-F(x)**3/3+3*F(x)**2-8*F(x)
 assert prim(3)-prim(2)==F(2,3)
 assert -2+2==-(2**2)+6*2-8==0
 assert -(4**2)+6*4-8==0 and F(4-3,4)==F(1,4)
 assert -1!=6-2*2
 # Urna: retirar la primera bola y añadir seis del otro color, 15 bolas.
 branches=[]
 for first,pfirst in [('R',F(6,10)),('A',F(4,10))]:
  red=6-(first=='R')+6*(first=='A');blue=4-(first=='A')+6*(first=='R')
  assert red+blue==15
  branches.append({'primera':first,'rojas':red,'azules':blue,'RR_o_AR':pfirst*F(red,15),'RA_o_AA':pfirst*F(blue,15)})
 pR2=sum(v['RR_o_AR'] for v in branches);pA2=1-pR2
 assert pR2==F(13,25) and branches[1]['RA_o_AA']/pA2==F(1,6)
 assert sum(v['RR_o_AR']+v['RA_o_AA'] for v in branches)==1
 defect=F(4,5)*F(5,100)+F(1,5)*F(2,100)
 assert 1-defect==F(956,1000) and F(4,5)*F(5,100)/defect==F(10,11)
 allocations=[F(n)*F(36,3000) for n in [15000,5000,3000,2000]]
 assert allocations==[180,60,36,24] and sum(allocations)==300
 moments=[]
 for name,samples,var in [('sin_reemplazo',list(combinations([2,4,6],2)),F(2,3)),('con_reemplazo',list(product([2,4,6],repeat=2)),F(4,3))]:
  means=[F(sum(t),2) for t in samples];mean=sum(means)/len(means);variance=sum((x-mean)**2 for x in means)/len(means)
  assert mean==4 and variance==var
  moments.append({'convencion':name,'muestras':samples,'medias':[str(x) for x in means],'media':str(mean),'varianza':str(variance),'desviacion':math.sqrt(variance)})
 def q(p):
  lo,hi=0.,5.
  for _ in range(100):
   mid=(lo+hi)/2
   if .5*math.erfc(-mid/math.sqrt(2))<p:lo=mid
   else:hi=mid
  z=NormalDist().inv_cdf(p);assert abs(z-(lo+hi)/2)<1e-13;return z
 data=list(map(F,['8','9.2','10','8.5','12','9','11.3','7','8.5','8.3','7.6','9','9.4','10.5','8.9','6.8']))
 assert sum(data)==144 and sum(data)/16==9
 z=q(.9875);error=z*2/math.sqrt(16);z90=q(.95);bound=(2*z90/.3)**2;assert math.ceil(bound)==121
 errors=[z90*2/math.sqrt(n) for n in [120,121]];assert errors[0]>.3>=errors[1]
 assert math.ceil((2*1.645/.3)**2)==121
 result={'tanda':'S014','metodos':['productos y determinantes exactos','todas las intersecciones','sustitución en segmento de mínimos','primitivas por ramas','árbol con composición actualizada','enumeración de muestras','cuantiles por erfc y bisección'],
 'E1_costes':costs,'E1_detD':det,'E2_minimo':5,'E2_segmento':[[1,4],['9/2','1/2']],'E2_maximo':10,'E2_punto_maximo':[7,3],
 'E3_parametros':[2,-2],'E4_integral':'2/3','E5_roja_segunda':str(pR2),'E5_azul_primera_dada_azul_segunda':'1/6','E6_no_defecto':'239/250','E6_Bayes':'10/11',
 'E7_afijacion':[int(x) for x in allocations],'E7_convenciones':moments,'E8_suma':144,'E8_media':9,'E8_desviacion':2,'E8_cuantil':z,'E8_intervalo':[9-error,9+error],'E8_cota_n':bound,'E8_errores_120_121':errors,'E8_minimo':121,'segundo_revisor_distinto':False}
 out=r/'output/verificaciones/s014-matematica.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print('S014: todas las comprobaciones matemáticas superadas.')
if __name__=='__main__':main()
