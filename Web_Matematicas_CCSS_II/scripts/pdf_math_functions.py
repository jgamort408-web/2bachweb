"""Independent exact and numerical checks for F006/F007 function exams."""
from fractions import Fraction as Q
from pathlib import Path
import json,math

ROOT=Path(__file__).resolve().parents[1]
def evaluate(coefficients,x):return sum(Q(a)*x**i for i,a in enumerate(coefficients))
def derivative(coefficients):return [Q(i)*Q(a) for i,a in enumerate(coefficients) if i]
def check_functions_variant():
    source=json.loads((ROOT/'content/latex/funciones-variante/provenance.json').read_text(encoding='utf8'))
    f=lambda x:(x+1)**2 if x<0 else (x-1)**2
    assert [f(Q(x)) for x in [-2,-1,0,1,2]]==[1,0,1,0,1]
    assert 2*(0+1)==2 and 2*(0-1)==-2
    assert f(Q(0))>(f(Q(-1))+f(Q(1)))/2
    for x in [Q(i,10) for i in range(-20,21)]:assert 0<=f(x)<=1
    rational=lambda x:1/((x-5)*(x-3))
    assert rational(Q(2))==Q(source['answers']['hole'][1])==Q(1,3)
    for x in [Q(-5),Q(0),Q(5,2),Q(4),Q(6)]:
        assert (x-2)/((x-5)*(x-3)*(x-2))==rational(x)
    delta=Q(1,1000000)
    for p,left,right in [(3,1,-1),(5,-1,1)]:
        assert rational(Q(p)-delta)*left>100000
        assert rational(Q(p)+delta)*right>100000
    for x in [Q(-1000000),Q(1000000)]:assert abs(rational(x))<Q(1,10**10)
    coefficients=[6,Q(-9,10),Q(3,100)]
    assert evaluate(coefficients,Q(10))==evaluate(coefficients,Q(20))==0
    for t in [Q(i,2) for i in range(1,48)]:
        assert evaluate(coefficients,t)==Q(3,100)*(t-10)*(t-20)
    assert evaluate(coefficients,Q(5))>0 and evaluate(coefficients,Q(15))<0 and evaluate(coefficients,Q(22))>0
    assert source['preserved']['exercisePoints']==[4,3,3]
    assert sum(source['preserved']['partPoints'])==10 and source['preserved']['durationMinutes']==55
    return {'passed':True,'examProblems':3,'hole':['2','1/3'],'verticalAsymptotes':[3,5],
        'stockCriticalPoints':[10,20],'globalConvexityRejected':True,'endpointConventionExplicit':True}

def check_functions_principal():
    source=json.loads((ROOT/'content/latex/funciones-principal/provenance.json').read_text(encoding='utf8'))
    cubic=[0,2,-3,1];prime=derivative(cubic);second=derivative(prime)
    assert prime==[2,-6,3] and second==[-6,6]
    assert [evaluate(cubic,Q(x)) for x in [0,1,2]]==[0,0,0]
    for sign in [-1,1]:
        x=1+sign/math.sqrt(3)
        assert abs(float(evaluate(prime,x)))<1e-12
        assert abs(float(evaluate(cubic,x))+sign*2*math.sqrt(3)/9)<1e-12
    assert Q(2)**2/3==Q(4)/(2+1)==Q(4,3)
    assert Q(2)*2/3==Q(4,3) and -Q(4)/(2+1)**2==Q(-4,9)
    rational=lambda x:1/((x-2)*(x-1))
    delta=Q(1,1000000)
    for p,left,right in [(1,1,-1),(2,-1,1)]:
        assert rational(Q(p)-delta)*left>100000
        assert rational(Q(p)+delta)*right>100000
    temperature=[-20,12,-1]
    assert evaluate(temperature,Q(1))==evaluate(temperature,Q(11))==-9
    assert evaluate(temperature,Q(6))==16
    assert evaluate(temperature,Q(2))==evaluate(temperature,Q(10))==0
    for t in [Q(i,10) for i in range(10,111)]:
        assert evaluate(temperature,t)==16-(t-6)**2
        assert (evaluate(temperature,t)>0)==(2<t<10)
        assert evaluate(temperature,t)<=16<20
    assert source['answers']['hoursAboveZero']==10-2==8>6
    assert source['answers']['powerCutInterpretation']['requiresAdditionalAssumptions'] is True
    # Dormant source variant preserved in annex, checked by polynomial differentiation and exact values.
    price=[10,6,Q(-5,2),Q(1,3)]
    assert derivative(price)==[6,-5,1]
    assert evaluate(price,Q(0))==10 and evaluate(price,Q(2))==Q(44,3)
    assert evaluate(price,Q(3))==Q(29,2) and evaluate(price,Q(4))==Q(46,3) and evaluate(price,Q(6))==28
    assert 3000*(evaluate(price,Q(4))-evaluate(price,Q(2)))==2000
    assert 3000*(28-10)==54000
    candidates=[(Q(t),evaluate(price,Q(t))) for t in [0,2,3,6]]
    assert min(candidates,key=lambda pair:pair[1])[0]==0
    assert max(candidates,key=lambda pair:pair[1])[0]==6
    assert source['preserved']['exercisePoints']==[2,3,2,3]
    assert sum(source['preserved']['partPoints'])==10 and source['preserved']['durationMinutes']==55
    return {'passed':True,'examProblems':4,'annexProblems':1,'piecewiseJoin':['2','4/3'],
        'verticalAsymptotes':[1,2],'temperatureMaximum':[6,16],'hoursAboveZero':8,
        'powerRestorationNotUniquelyIdentified':True,'annexGain':2000,'annexMaximumGain':54000}
