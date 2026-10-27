"""Automatic differentiation and exact algebra checks independent of the printed solutions."""
from fractions import Fraction as Q
from pathlib import Path
import json,math
ROOT=Path(__file__).resolve().parents[1]

class Dual:
    def __init__(self,value,slope=0):self.value=float(value);self.slope=float(slope)
    @staticmethod
    def of(value):return value if isinstance(value,Dual) else Dual(value)
    def __add__(self,other):
        other=self.of(other);return Dual(self.value+other.value,self.slope+other.slope)
    __radd__=__add__
    def __neg__(self):return Dual(-self.value,-self.slope)
    def __sub__(self,other):return self+-self.of(other)
    def __rsub__(self,other):return self.of(other)+-self
    def __mul__(self,other):
        other=self.of(other);return Dual(self.value*other.value,self.slope*other.value+self.value*other.slope)
    __rmul__=__mul__
    def __pow__(self,p):return Dual(self.value**p,p*self.value**(p-1)*self.slope)
    def __truediv__(self,other):return self*self.of(other)**-1
    def __rtruediv__(self,other):return self.of(other)*self**-1

def unary(x,function,prime):
    x=Dual.of(x);return Dual(function(x.value),prime(x.value)*x.slope)
def sine(x):return unary(x,math.sin,math.cos)
def cosine(x):return unary(x,math.cos,lambda t:-math.sin(t))
def exponential(x):return unary(x,math.exp,math.exp)
def logarithm(x):return unary(x,math.log,lambda t:1/t)

def check_limits_derivatives():
    source=json.loads((ROOT/'content/latex/limites-derivadas/provenance.json').read_text(encoding='utf8'))
    answer=source['answers']
    active=[
        (lambda x:((3*x*x-5)/(2*x+3))**3,lambda x:3*(3*x*x-5)**2*(6*x*x+18*x+10)/(2*x+3)**4,[-2,-1,0,1,2]),
        (lambda x:sine(x)**2,lambda x:2*math.sin(x)*math.cos(x),[-2,-1,0,1,2]),
        (lambda x:(x**3-4)/(x*x+4)**2,lambda x:(-x**4+12*x*x+16*x)/(x*x+4)**3,[-2,-1,0,1,2]),
        (lambda x:exponential(3*x*x-x+2),lambda x:(6*x-1)*math.exp(3*x*x-x+2),[-1,0,1,2]),
        (lambda x:cosine(x*x+2*x),lambda x:-(2*x+2)*math.sin(x*x+2*x),[-2,-1,0,1,2]),
        (lambda x:x*x/(1+2*logarithm(x))**0.5,lambda x:x*(1+4*math.log(x))/(1+2*math.log(x))**1.5,[.7,1,2,4])]
    alternate=[
        (lambda x:((x*x+2)/(4*x+2))**2,lambda x:2*(x*x+2)*(4*x*x+4*x-8)/(4*x+2)**3,[-2,-1,0,1,2]),
        (lambda x:sine(x)**2,lambda x:2*math.sin(x)*math.cos(x),[-2,-1,0,1,2]),
        (lambda x:(2-x*x)/(x*x+1)**3,lambda x:(4*x**3-14*x)/(x*x+1)**4,[-2,-1,0,1,2]),
        (lambda x:exponential(x*x+2*x-1),lambda x:(2*x+2)*math.exp(x*x+2*x-1),[-2,-1,0,1,2]),
        (lambda x:cosine(x*x+3*x),lambda x:-(2*x+3)*math.sin(x*x+3*x),[-2,-1,0,1,2]),
        (lambda x:x/(1+x)**0.5,lambda x:(x+2)/(2*(1+x)**1.5),[-.5,0,1,2,4])]
    cases=0
    for function,expected,points in active+alternate:
        for point in points:
            result=function(Dual(point,1)).slope;value=expected(point)
            assert abs(result-value)<=1e-9*max(1,abs(value)), (point,result,value)
            cases+=1
    a=Q(answer['parameters']['a']);b=Q(answer['parameters']['b'])
    assert a==1 and b==-2 and -b==2 and -1-b==a
    rational=lambda x:(x+b)/(x-1)
    assert rational(Q(2))==0
    assert Q(answer['tangent']['slope'])==1 and Q(answer['tangent']['intercept'])==-2
    assert Q(answer['normal']['slope'])==-1 and Q(answer['normal']['intercept'])==2
    assert Q(answer['tangent']['slope'])*Q(answer['normal']['slope'])==-1
    for h in [Q(-1,10000),Q(1,10000)]:
        assert abs((rational(2+h)-rational(Q(2)))/h-1)<=Q(1,9999)
    # Algebraic identities for active and commented removable limits.
    for x in [Q(1),Q(2),Q(3),Q(5),Q(6)]:
        if x!=4:assert 7/(x-4)-(4*x+12)/(x*x-4*x)==3/x
        if x!=3:assert 6/(x-3)-(3*x+9)/(x*x-3*x)==3/x
    assert 3/Q(4)==Q(3,4) and 3/Q(3)==1
    assert abs(1/(1+math.sqrt(1-1e-6))-.5)<1e-6
    assert abs((5e6+7)/math.sqrt(2e12+3)-5/math.sqrt(2))<1e-5
    assert abs(math.exp(1e6*math.log1p(-1e-12))-1)<2e-6
    assert abs(math.exp((-1e6+2/(-1e6))*math.log1p(-2e-6))-math.exp(2))<2e-5
    assert 3**100-100**5>10**40 and math.exp(100)/100**5>1e30 and 2**100-100**4>10**25
    delta=Q(1,1000000)
    for pole,other in [(Q(1),Q(2)),(Q(2),Q(3))]:
        assert 1/((-delta)*(pole-delta-other))>100000
        assert 1/(delta*(pole+delta-other))<-100000
    # Exact distances, units, positivity and absence of a finite zero.
    distance=lambda t:Q(100)/(t*t+1)
    assert distance(Q(0))==answer['rocket']['initialThousandsKm']==100
    assert distance(Q(2))==answer['rocket']['afterTwoHoursThousandsKm']==20
    for t in [Q(0),Q(2),Q(100),Q(1000000)]:assert distance(t)>0
    assert distance(Q(1000000))<Q(1,10**9)
    assert answer['rocket']['reachesZeroAtFiniteTime'] is False
    preserved=source['preserved']
    assert sum(map(Q,preserved['exercisePoints']))==10
    assert sum(map(Q,preserved['firstExerciseParts']))==Q('3.2')
    assert preserved['derivativesToChoose']==preserved['limitsToChoose']==4
    assert preserved['derivativesOffered']==preserved['limitsOffered']==6
    assert Q(preserved['pointsPerSelectedItem'])*4==Q('2.4') and preserved['durationMinutes']==55
    return {'passed':True,'activeDerivatives':6,'annexDerivatives':6,'automaticDifferentiationCases':cases,
        'activeLimits':6,'annexLimits':6,'parameters':['1','-2'],'rocketDistancesKm':[100000,20000],
        'finiteLandingClaimRejected':True,'firstFourGradingRulePreserved':True}
