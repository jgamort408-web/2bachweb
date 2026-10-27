"""Independent numerical, combinatorial, geometric and algebraic checks for F009."""
import json,math
from pathlib import Path
from fractions import Fraction as Q
from statistics import NormalDist
from itertools import combinations
from pdf_math_distributions import phi
from pdf_math_limits_derivatives import Dual, exponential, logarithm
from pdf_math_matrices import matrix,multiply,identity,inverse
ROOT=Path(__file__).resolve().parents[1]

def quantile(probability):
    lo,hi=0.,4.
    for _ in range(45):
        mid=(lo+hi)/2
        if phi(mid)<probability:lo=mid
        else:hi=mid
    return (lo+hi)/2

def clip(poly,a,b,c):
    result=[]
    for start,end in zip(poly,poly[1:]+poly[:1]):
        ds=a*start[0]+b*start[1]-c;de=a*end[0]+b*end[1]-c
        if ds<=0:result.append(start)
        if (ds<0 and de>0) or (ds>0 and de<0):
            t=ds/(ds-de);result.append(tuple(x+t*(y-x) for x,y in zip(start,end)))
    return list(dict.fromkeys(result))

def check_recovery():
    s=json.loads((ROOT/'content/latex/recuperacion-inferencia/provenance.json').read_text(encoding='utf8'));a=s['answers']
    normal=NormalDist();checks=[]
    for key in ['patients','berries']:
        v=a[key];data=list(map(Q,v['data']));n=len(data);mu=sum(data)/n;sigma=math.sqrt(v['variance'])
        assert sum(data)==Q(v['sum']) and mu==Q(v['mean'])
        z=quantile((1+v['confidence'])/2)
        assert abs(z-normal.inv_cdf((1+v['confidence'])/2))<1e-11
        margin=z*sigma/math.sqrt(n)
        assert all(abs(x-y)<1e-10 for x,y in zip([float(mu)-margin,float(mu)+margin],v['interval']))
        c,E=(.9,.3) if key=='patients' else (.97,1.5)
        z=quantile((1+c)/2);size=v['sampleSize']
        assert z*sigma/math.sqrt(size)<=E and z*sigma/math.sqrt(size-1)>E
        if key=='berries':assert z*sigma/math.sqrt(size)<E
        checks.append({'exercise':key,'sum':str(sum(data)),'mean':str(mu),'sampleSize':size})
    assert (Q('6.04')+8)/2==Q(a['stars']['mean'])
    assert (8-Q('6.04'))/2==Q(a['stars']['margin'])
    assert Q('1.96')*3/7==Q(a['stars']['newMarginTable'])
    assert abs(normal.inv_cdf(.975)*3/6-.98)<.0001
    assert normal.inv_cdf(.99)>normal.inv_cdf(.975)
    counts=[0,0,0]
    for pair in combinations(range(90),2):counts[sum(k<60 for k in pair)]+=1
    assert sum(counts)==math.comb(90,2)==4005
    assert [Q(counts[2],4005),Q(counts[1]+counts[2],4005),Q(counts[1],4005)]==[Q(a['keys'][k]) for k in ['both','atLeastOne','exactlyOne']]
    assert Q(counts[2],4005)==Q(60,90)*Q(59,89)
    assert Q(counts[1],4005)==2*Q(60,90)*Q(30,89)
    cans=[(flavour,i<expired) for flavour,expired in [('cola',1800),('naranja',2400),('limon',3000)] for i in range(10000)]
    outside=[flavour for flavour,expired in cans if not expired]
    assert Q(sum(expired for _,expired in cans),len(cans))==Q(a['cans']['expiring'])
    assert Q(outside.count('cola'),len(outside))==Q(a['cans']['colaGivenNot'])
    boundaries=[(-1,-2,-7),(-4,1,-1),(2,-1,4),(3,2,20),(-1,0,0),(0,-1,0)]
    polygon=[(Q(0),Q(0)),(Q(20),Q(0)),(Q(20),Q(20)),(Q(0),Q(20))]
    for boundary in boundaries:polygon=clip(polygon,*boundary)
    expected={tuple(map(Q,v)) for v in a['linear']['vertices']}
    assert set(polygon)==expected
    objective=lambda p:2*p[0]+p[1]
    optimum=min(expected,key=objective)
    assert objective(optimum)==Q(a['linear']['minimum']) and optimum==tuple(map(Q,a['linear']['point']))
    assert sum(objective(v)==objective(optimum) for v in expected)==1
    for v,w in zip(polygon,polygon[1:]+polygon[:1]):
        for i in range(11):
            t=Q(i,10);x,y=[(1-t)*u+t*z for u,z in zip(v,w)]
            assert all(A*x+B*y<=C for A,B,C in boundaries) and 2*x+y>=5
    assert 10*20+7*30>=400 and 5*20+6*30>=280 and 20<=2*30
    A=a['analysis'];aa=Q(A['a']);bb=Q(A['b'])
    assert aa*8+bb*2+4==36 and 12*aa+bb==0 and 12*aa<0
    f=lambda x:4*x**3-3*x+4
    assert f(Q(-1,2))==Q(A['maximum'][1])==5 and f(Q(1,2))==Q(A['minimum'][1])==3
    for x in [Q(-2),Q(-1),Q(0),Q(1),Q(2)]:assert (12*x*x-3>0)==(abs(x)>Q(1,2))
    F=lambda x:x**4-Q(3,2)*x*x+4*x+A['primitiveConstant']
    assert F(Q(2))==10
    active=[(lambda x:(x*x-5)**2*exponential(3*x),lambda x:math.exp(3*x)*(x*x-5)*(4*x+3*(x*x-5)),[-2.,-1.,0.,1.,2.]),(lambda x:logarithm(x**3-5*x)/(1-x*x),lambda x:((3*x*x-5)/(x**3-5*x)*(1-x*x)+2*x*math.log(x**3-5*x))/(1-x*x)**2,[-2.,-1.5,-.5,2.5,3.])]
    for fun,derivative,points in active:
        for x in points:assert math.isclose(fun(Dual(x,1)).slope,derivative(x),rel_tol=1e-12,abs_tol=1e-12)
    for x in [-3.,-2.,-1.,-.5,0.,1.,2.,3.]:
        condition=(x**3-5*x>0 and x*x!=1)
        expected=(-math.sqrt(5)<x<-1 or -1<x<0 or x>math.sqrt(5))
        assert condition==expected
    n=1000;h=4/n;values=[-(-1+i*h)**2+2*(-1+i*h)+3 for i in range(n+1)]
    area=h/3*(values[0]+values[-1]+4*sum(values[1:-1:2])+2*sum(values[2:-1:2]))
    assert abs(area-float(Q(A['area'])))<1e-12
    ma=matrix([[1,2],[1,3]]);mb=matrix([[2,1],[0,-1]]);X=matrix(a['matrices']['X']);Y=matrix(a['matrices']['Y'])
    assert multiply(ma,X)==mb and multiply(mb,Y)==ma
    assert multiply(X,Y)==multiply(Y,X)==identity(2)
    assert inverse(ma)==matrix([[3,-2],[-1,1]]) and inverse(mb)==matrix([['1/2','1/2'],[0,-1]])
    assert len(s['preserved']['exercisePoints'])==9 and sum(s['preserved']['exercisePoints'])==22.5 and s['preserved']['selectionRule'] is None
    assert all(math.isclose(sum(parts),2.5) for parts in s['preserved']['partPoints'])
    return {'passed':True,'exercises':9,'parts':23,'inference':checks,'keyPairsEnumerated':4005,'cansEnumerated':30000,'vertices':[list(map(str,p)) for p in polygon],'linearMinimum':'5','extremaCorrected':True,'derivativeEvaluations':10,'areaQuadrature':area,'nominalPoints':22.5,'selectionRuleMissing':True}
