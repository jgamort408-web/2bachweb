"""S015: vértices, matrices y fracciones exactas, con cuantiles separados."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations
from statistics import NormalDist
import math,json
def main():
 r=Path(__file__).resolve().parents[2]
 lines=[(2,1,120),(1,1,70),(1,2,110),(-1,0,0),(0,-1,0)];vertices=set()
 for a,b in combinations(lines,2):
  d=a[0]*b[1]-a[1]*b[0]
  if not d:continue
  x=F(a[2]*b[1]-a[1]*b[2],d);y=F(a[0]*b[2]-a[2]*b[0],d)
  if all(c*x+e*y<=f for c,e,f in lines):vertices.add((x,y))
 assert vertices=={(0,0),(60,0),(50,20),(30,40),(0,55)}
 assert max(6*x+5*y for x,y in vertices)==400
 feasible=[(x,y) for x in range(61) for y in range(56) if 2*x+y<=120 and x+y<=70 and x+2*y<=110]
 assert [(x,y) for x,y in feasible if 6*x+5*y==400]==[(50,20)]
 assert all(6*x+5*y==(2*x+y)+4*(x+y)<=400 for x,y in feasible)
 assert 40+40>70 and 40+2*40>110
 def mul(a,b):return [[sum(a[i][k]*b[k][j] for k in range(len(b))) for j in range(len(b[0]))] for i in range(len(a))]
 def det(a):return a[0][0]*(a[1][1]*a[2][2]-a[1][2]*a[2][1])-a[0][1]*(a[1][0]*a[2][2]-a[1][2]*a[2][0])+a[0][2]*(a[1][0]*a[2][1]-a[1][1]*a[2][0])
 for a in [-4,-3,0,1,2,5]:assert det([[2,1,-1],[a,-1,-1],[3,0,-2*a]])==2*(a+3)*(a-1)
 A2=[[2,1,-1],[2,-1,-1],[3,0,-4]];numerator=[[4,4,-2],[5,-5,0],[3,3,-4]]
 assert mul(A2,numerator)==[[10,0,0],[0,10,0],[0,0,10]] and det(A2)==10
 A0=[[2,1,-1],[0,-1,-1],[3,0,0]];B=[[1,-1],[2,0],[1,-2]];Bt=list(map(list,zip(*B)))
 BBt=mul(B,Bt);assert BBt==[[2,2,3],[2,4,2],[3,2,5]]
 M=[[BBt[i][j]+int(i==j) for j in range(3)] for i in range(3)]
 X=mul(M,A0);assert X==[[15,1,-5],[10,-3,-7],[24,1,-5]] and det(A0)==-6
 # A0^{-1} por Gauss para comprobar la ecuación en su forma original.
 aug=[[F(v) for v in row]+[F(i==j) for j in range(3)] for i,row in enumerate(A0)]
 for j in range(3):
  k=next(k for k in range(j,3) if aug[k][j]);aug[j],aug[k]=aug[k],aug[j];v=aug[j][j];aug[j]=[x/v for x in aug[j]]
  for i in range(3):
   if i!=j:
    v=aug[i][j];aug[i]=[x-v*y for x,y in zip(aug[i],aug[j])]
 left=mul(X,[row[3:] for row in aug]);assert [[left[i][j]-BBt[i][j] for j in range(3)] for i in range(3)]==[[1,0,0],[0,1,0],[0,0,1]]
 assert 4*(-1)+2*2==0 and 4*(-1)+2==-2
 primitive=lambda x:-F(x)**3/3+3*F(x)**2-5*F(x)
 assert primitive(4)==F(20,3) and primitive(2)==F(-2,3) and primitive(4)-primitive(2)==F(22,3)
 assert 2*0+1==1/(1-0)**2 and 2==2/(1-0)**3
 assert 2*(-1)+1<0 and 2*0+1>0 and 2/(1-F(1,2))**3>0 and 2/(1-F(2))**3<0
 both=F(60,90)*F(59,89);none=F(30,90)*F(29,89);one=2*F(60,90)*F(30,89)
 assert both==F(118,267) and 1-none==F(238,267) and one==F(40,89) and both+none+one==1
 assert F(math.comb(60,1)*math.comb(30,1),math.comb(90,2))==one
 assert F(1800+2400+3000,30000)==F(24,100) and F(8200,22800)==F(41,114)
 def q(p):
  lo,hi=0.,5.
  for _ in range(100):
   mid=(lo+hi)/2
   if .5*math.erfc(-mid/math.sqrt(2))<p:lo=mid
   else:hi=mid
  z=NormalDist().inv_cdf(p);assert abs(z-(lo+hi)/2)<1e-13;return z
 data=list(map(F,['12.3','10','9.1','11','10.5','11.8','9.9','11.5','10.9','13']))
 assert sum(data)==110 and sum(data)/10==11
 z=q(.985);e=z*3/math.sqrt(10);bound=(z*3/1.5)**2;assert math.floor(bound)+1==19
 errors=[z*3/math.sqrt(n) for n in [18,19]];assert errors[0]>=1.5>errors[1]
 assert math.floor((2.17*3/1.5)**2)+1==19
 center=(F('6.04')+8)/2;half=(8-F('6.04'))/2;assert center==F('7.02') and half==F('.98')
 z95=q(.975);error49=z95*3/7
 assert abs(z95*3/6-float(half))<.0001
 assert F('1.96')*3/7==F('.84') and F('.84')/half==F(6,7)
 assert q(.995)*3/7>error49
 result={'tanda':'S015','metodos':['intersecciones y producción entera','determinantes y productos exactos','Gauss para comprobar ecuación original','primitivas y extremos exactos','fracciones y combinaciones sin reposición','cuantiles por erfc/bisección'],
 'E1_optimo':[50,20],'E1_maximo':400,'E2_inversa_numerador':numerator,'E2_X':X,'E3_parametros':[-1,2],'E3_area':'22/3',
 'E5_ambas':str(both),'E5_alguna':str(1-none),'E5_exactamente_una':str(one),'E6_total':'6/25','E6_Bayes':'41/114',
 'E7_media':11,'E7_intervalo':[11-e,11+e],'E7_cota_n':bound,'E7_errores_18_19':errors,'E7_minimo':19,
 'E8_centro_impreso':str(center),'E8_semiamplitud_impresa':str(half),'E8_error49_tabla':'21/25','E8_error49_preciso':error49,'segundo_revisor_distinto':False}
 out=r/'output/verificaciones/s015-matematica.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print('S015: todas las comprobaciones matemáticas superadas.')
if __name__=='__main__':main()
