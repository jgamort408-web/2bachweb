"""Exact feasibility, finite events and independent normal checks for F001."""
import json,math
from pathlib import Path
from fractions import Fraction as Q
from pdf_math_recovery import clip,quantile
ROOT=Path(__file__).resolve().parents[1]
def check_course_raise():
    s=json.loads((ROOT/'content/latex/subida-nota-curso/provenance.json').read_text(encoding='utf8'));a=s['answers']
    assert a['continuityParameter']==5 and a['continuityParameter']-4==1
    assert a['derivativesAtJoin']==[0,-1]
    f=lambda x:(x-2)**2 if x<2 else 1/(x-1)
    assert f(Q(1))==1 and f(Q(3,2))==Q(1,4)<f(Q(2))==1
    for h in [Q(-1,100),Q(1,100)]:
        derivative=((2+h)**2-4*(2+h)+5-1)/h if h<0 else (1/(1+h)-1)/h
        assert abs(derivative-(0 if h<0 else -1))<Q(2,100)
    constraints=[(1,2,100),(2,1,80),(0,1,46),(-1,0,0),(0,-1,0)]
    poly=[(Q(0),Q(0)),(Q(100),Q(0)),(Q(100),Q(100)),(Q(0),Q(100))]
    for edge in constraints:poly=clip(poly,*edge)
    assert set(poly)=={tuple(map(Q,v)) for v in a['cakeVertices']}
    objective=lambda x,y:10*x+12*y
    best=max((objective(x,y),x,y) for x,y in poly)
    assert best==(680,20,40) and a['cakeOptimum']==[20,40,680]
    integer=[(objective(x,y),x,y) for x in range(101) for y in range(47) if all(A*x+B*y<=C for A,B,C in constraints)]
    assert max(integer)==best and sum(v[0]==680 for v in integer)==1
    # Positive weighted resource bounds certify the continuous optimum too.
    u,v=Q(14,3),Q(8,3)
    assert u+2*v==10 and 2*u+v==12 and 100*u+80*v==680
    assert 17+2*46==109>100 and 2*50>80
    atoms=[(True,True)]+[(True,False)]*2+[(False,True)]*4+[(False,False)]*3
    probability=lambda p:Q(sum(p(x,y) for x,y in atoms),len(atoms))
    values=[probability(lambda x,y:x and y),probability(lambda x,y:x or y),probability(lambda x,y:not x or not y),probability(lambda x,y:x and not y)]
    assert values==list(map(Q,a['probabilities']))
    assert values[0]/probability(lambda x,y:y)==Q(1,5)
    data=list(map(Q,a['busData']));assert sum(data)==Q(a['busSum'])==Q(309,10)
    mu=sum(data)/len(data);assert mu==Q(a['busMean'])==Q(309,100)
    z=quantile(.985);E=z*2/math.sqrt(10)
    assert all(abs(x-y)<1e-10 for x,y in zip([float(mu)-E,float(mu)+E],a['busInterval']))
    z=quantile(.975);size=a['busSampleSize'];assert size==62
    assert z*2/math.sqrt(size)<.5<z*2/math.sqrt(size-1)
    required=lambda c:math.floor((quantile((1+c)/2)*4)**2)+1
    assert required(.950001)==required(.95)==62 and required(.99)>62
    assert sum(s['preserved']['exercisePoints'])==10 and s['preserved']['durationMinutes']==90
    assert not s['assets'] and s['preserved']['expressionPointsIncludedPerExercise']==.25
    return {'passed':True,'exercises':4,'integerCakePlans':len(integer),'cakeOptimum':[20,40,680],'dualBound':'680','busSum':'30.9','busMean':'3.09','busInterval':a['busInterval'],'busSampleSize':62,'M01CounterexampleVerified':True}
