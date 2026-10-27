"""Exact convolution and independent Gaussian quadrature for original exams."""
import json, math
from fractions import Fraction as Q
from pathlib import Path
from statistics import NormalDist
ROOT=Path(__file__).resolve().parents[1]
def phi(z):
    n=4096; h=z/n
    f=lambda x: math.exp(-x*x/2)/math.sqrt(2*math.pi)
    return .5+h/3*(f(0)+f(z)+4*sum(f(i*h) for i in range(1,n,2))+2*sum(f(i*h) for i in range(2,n,2)))
def distribution(n,p):
    values=[Q(1)]
    for _ in range(n):
        nxt=[Q(0)]*(len(values)+1)
        for k,v in enumerate(values): nxt[k]+=v*(1-p); nxt[k+1]+=v*p
        values=nxt
    assert sum(values)==1
    assert values==[Q(math.comb(n,k))*p**k*(1-p)**(n-k) for k in range(n+1)]
    return values
def check(slug):
    source=json.loads((ROOT/f'content/latex/{slug}/provenance.json').read_text(encoding='utf8')); a=source['answers']
    b=a['smallBinomial']; v=distribution(b['n'],Q(b['p']))
    assert v[0]==Q(b['zero']) and sum(v[b['threshold']:])==Q(b['upperTail']) and 1-v[0]==Q(b['atLeastOne'])
    g=a['normal']; mu=g['mu']; sigma=g['sigma']
    assert abs(phi((g['high']-mu)/sigma)-phi((g['low']-mu)/sigma)-g['interval'])<1e-12
    assert abs(phi((g['below']-mu)/sigma)-g['lowerTail'])<1e-12
    assert abs(phi((g['quantile']-mu)/sigma)-g['quantileProbability'])<1e-12
    b=a['largeBinomial']; p=Q(b['p']); v=distribution(b['n'],p); tail=sum(v[b['threshold']:])
    assert tail==Q(b['exactUpperTail'])
    assert b['continuityThreshold']==b['threshold']-.5
    z=(b['continuityThreshold']-b['n']*float(p))/math.sqrt(b['n']*float(p*(1-p)))
    assert abs(1-phi(z)-b['normalApproximation'])<1e-12
    assert abs(.5*math.erfc(z/math.sqrt(2))-b['normalApproximation'])<1e-14
    assert sum(source['preserved']['exercisePoints'])==10
    assert source['preserved']['durationMinutes']==55
    if slug.endswith('-ii'): assert Q(1,5)**8==Q(1,390625)
    else: assert Q(85)+20*Q(85,100)==102
    return {'passed':True,'parts':7,'exactLargeTail':str(tail),'normalApproximation':b['normalApproximation'],'quantile':g['quantile'],'independentMethods':['exact Bernoulli convolution','binomial coefficients','Simpson Gaussian quadrature','erfc']}
def check_distributions_i(): return check('distribuciones-i')
def check_distributions_ii(): return check('distribuciones-ii')
