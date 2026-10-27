"""Exact polynomial identities, automatic differentiation and quadrature for F004/F005."""
from pathlib import Path
from fractions import Fraction as Q
import json,math
from pdf_math_limits_derivatives import Dual,exponential
ROOT=Path(__file__).resolve().parents[1]
def simpson(f,a,b,n=2000):
    h=(b-a)/n;v=[f(a+i*h) for i in range(n+1)]
    return h/3*(v[0]+v[-1]+4*sum(v[1:-1:2])+2*sum(v[2:-1:2]))
def check_review():
    s=json.loads((ROOT/'content/latex/repaso-analisis/provenance.json').read_text(encoding='utf8'));a=s['answers']
    assert a['parameters']==[1,-2] and -a['parameters'][1]==2 and -1-a['parameters'][1]==a['parameters'][0]
    rational=lambda x:(x-2)/(x-1)
    assert rational(Q(2))==0 and a['tangent']==[1,-2] and a['normal']==[-1,2]
    fns=[(lambda x:((3*x*x-5)/(2*x+3))**3,lambda x:3*(3*x*x-5)**2*(6*x*x+18*x+10)/(2*x+3)**4),(lambda x:(x**3-4)/(x*x+4)**2,lambda x:(-x**4+12*x*x+16*x)/(x*x+4)**3),(lambda x:exponential(3*x*x-x+2),lambda x:(6*x-1)*math.exp(3*x*x-x+2))]
    for f,d in fns:
        for x in [-2.,-1.,0.,1.,2.]:assert math.isclose(f(Dual(x,1)).slope,d(x),rel_tol=1e-12,abs_tol=1e-12)
    for x in [-.9,-.2,.2,.9]:assert abs((1-math.sqrt(1-x*x))/(x*x)-1/(1+math.sqrt(1-x*x)))<1e-13
    for n in [10.,100.,1000.]:assert -1/(n*(1-1/n**2))<=n*math.log1p(-1/n**2)<=-1/n
    assert 100/(1+0)==100 and 100/(1+4)==20
    cubic=lambda x:x**3-3*x*x+2*x
    assert all(cubic(Q(x))==0 for x in [0,1,2])
    for sign in [-1,1]:
        x=1+sign/math.sqrt(3)
        assert abs(3*x*x-6*x+2)<1e-12 and abs(cubic(x)+sign*2/(3*math.sqrt(3)))<1e-12
    assert Q(2)**2/3==Q(4,3) and 4/(Q(2)+1)==Q(4,3)
    assert Q(4,3)!=Q(-4,9)
    assert a['temperatureRoots']==[2,10] and a['positiveHours']==8
    T=lambda t:-(t*t)+12*t-20
    assert T(1)==T(11)==-9 and T(6)==a['maximumTemperature']==16 and T(2)==T(10)==0
    for t in range(1,12):assert (T(t)>0)==(2<t<10)
    assert 8>6 and 16<20 and a['criteriaOnlyInSolutions']
    assert all(math.isclose(sum(points),10) for points in s['preserved']['exercisePoints'])
    assert s['preserved']['durationMinutes'] is None and s['preserved']['calculatorAllowed'] is None
    return {'passed':True,'separateExams':2,'derivativeEvaluations':15,'temperatureRoots':[2,10],'positiveHours':8,'vaccineConclusionConditionalOnOriginalSolutionCriteria':True}
def check_final():
    s=json.loads((ROOT/'content/latex/examen-final/provenance.json').read_text(encoding='utf8'));a=s['answers']
    aa,bb=a['parameters'];assert aa+bb==0 and 2*aa+bb==-1
    p=lambda x:-x*x+x+2
    assert p(Q(1))==2 and p(Q(-1))==0 and p(Q(1,2))==Q(9,4)
    assert (1-2*Q(1))==-4/(Q(1)+1)**2 and Q(-2)!=8/(Q(1)+1)**3
    pol=simpson(p,-1.,1.);rat=simpson(lambda x:4/(x+1),1.,2.)
    assert abs(pol-float(Q(a['areaPolynomial'])))<1e-12
    assert abs(rat-a['areaLogMultiplier']*math.log(1.5))<1e-12
    # Derive proposed primitives numerically on every component of their domains.
    for x in [-3.,-2.,2.,3.]:
        value=Dual(x,1);root=(5*value*value-7)**.5;derivative=(Q(2,5)*root).slope
        assert math.isclose(derivative,2*x/math.sqrt(5*x*x-7),rel_tol=1e-12)
    for x in [-4.,-2.,0.,1.5,3.]:
        h=1e-5;F=lambda t:math.log(abs(t**3-6*t+5))/3
        assert abs((F(x+h)-F(x-h))/(2*h)-(x*x-2)/(x**3-6*x+5))<1e-8
    assert -1*1+2==1 and a['rentabilityMaximum']==[5,9]
    for i in range(501):
        x=Q(1)+Q(i,100);R=x-2 if x<2 else -x*x+10*x-16
        assert R<=9 and (R>0)==(2<x<=6)
    v=lambda t:t**3/Q(3)-Q(5,2)*t*t+6*t+10
    assert v(Q(0))==10 and v(Q(2))==Q(44,3) and v(Q(4))==Q(46,3) and v(Q(6))==28
    assert 3000*(v(Q(4))-v(Q(2)))==a['stockGain']==2000
    assert 3000*(v(Q(6))-v(Q(0)))==a['stockOptimalGain']==54000
    # Critical endpoints bound v on each monotonic interval, respecting buy <= sell.
    values=[v(Q(t)) for t in [0,2,3,6]];assert min(values)==10 and max(values)==28
    assert sum(s['preserved']['exercisePoints'])==10 and sum(s['preserved']['suggestedMinutes'])==55
    return {'passed':True,'newSolution':True,'areaQuadrature':pol+rat,'areaExactApproximation':10/3+4*math.log(1.5),'stockGain':2000,'stockOptimalGain':54000,'annexNonAssessable':True}
