"""Independent exact verification of the six imported linear programs."""
from fractions import Fraction as F
from itertools import combinations
models = [
 # All inequalities expressed as a*x+b*y <= c. Integer objective avoids rounding.
 ("muebles", [(10,20,120),(5,10,100),(-1,0,0),(0,-1,0)], (20,35), "max", [(0,0),(12,0),(0,6)], (12,0),240),
 ("dieta", [(-2,-4,-12),(-6,-2,-12),(-1,0,0),(0,-1,0)], (4,3), "min", [(0,6),(6,0),(F(6,5),F(12,5))], (F(6,5),F(12,5)),12),
 ("inversion", [(1,1,50),(1,0,30),(0,-1,-15),(-1,1,0),(-1,0,0)], (100,50), "max", [(15,15),(30,15),(30,20),(25,25)], (30,20),4000),
 ("drones", [(1,2,400),(3,2,900),(1,1,350),(0,-1,-50),(-2,1,0),(-1,0,0)], (120,150), "max", [(25,50),(80,160),(250,75),(F(800,3),50)], (250,75),41250),
 ("minerales", [(-1,-1,-100),(2,1,200),(2,-3,0),(-1,0,-20),(0,-1,0)], (40,30), "min", [(20,80),(20,160),(75,50),(60,40)], (20,80),3200),
 ("refineria", [(1,1,100),(3,2,240),(-1,0,-10),(0,1,70),(-1,1,20),(0,-1,0)], (10,20), "max", [(10,30),(40,60),(80,0),(10,0)], (40,60),1600),
]
samples=0
for name, cs, obj, direction, expected, optimum, value in models:
 feasible=lambda p:all(a*p[0]+b*p[1]<=c for a,b,c in cs)
 verts=set()
 for (a,b,c),(d,e,f) in combinations(cs,2):
  det=a*e-b*d
  if det:
   point=(F(c*e-b*f,det),F(a*f-c*d,det))
   if feasible(point):verts.add(point)
 assert verts==set(expected),(name,verts)
 values={v:obj[0]*v[0]+obj[1]*v[1] for v in verts}
 best=(max if direction=="max" else min)(values.values())
 assert best==value and [v for v,z in values.items() if z==best]==[optimum],(name,values)
 # Every segment between vertices is feasible and respects the chosen extreme.
 for u,v in combinations(verts,2):
  for n in range(21):
   t=F(n,20);point=(t*u[0]+(1-t)*v[0],t*u[1]+(1-t)*v[1])
   assert feasible(point)
   z=obj[0]*point[0]+obj[1]*point[1]
   assert z<=value if direction=="max" else z>=value
   samples+=1
 if name in ("muebles","drones"):
  # Integer products: continuous optimum is attainable without rounding.
  integer=[]
  for x in range(401):
   for y in range(201):
    if feasible((x,y)):integer.append((obj[0]*x+obj[1]*y,x,y))
  assert max(integer)==(value,*optimum)
 if name=="dieta":
  # Unbounded rays in nonnegative directions increase the objective.
  assert obj[0]>0 and obj[1]>0
  for v in verts:
   for d in [(1,0),(0,1)]:
    for t in [1,10,1000]:
     p=(v[0]+d[0]*t,v[1]+d[1]*t);assert feasible(p);assert obj[0]*p[0]+obj[1]*p[1]>=value
  assert (1+3,2+1)==obj # Sum of simplified nutrient inequalities gives Z>=12.
 if name=="drones":
  assert tuple(F(a+b,4) for a,b in zip(cs[0],cs[1]))==(1,1,325)
  assert obj[0]*F(800,3)+obj[1]*50==39500
 if name=="refineria":
  assert tuple(F(2,5)*a+F(1,5)*b for a,b in zip(cs[1],cs[4]))==(1,1,100)
  assert tuple(a+3*b for a,b in zip(cs[1],cs[4]))==(0,5,300)
  assert not feasible((F(100,3),70))
 print(name, "OK", "vertices:",len(verts),"optimum:",optimum,value)
print("Verified six exact models and",samples,"fractional segment samples.")
