"""Independent quadrature and finite sampling checks for F011/F012."""
import json,math
from fractions import Fraction as Q
from pathlib import Path
from statistics import NormalDist
from pdf_math_recovery import quantile
ROOT=Path(__file__).resolve().parents[1]
def check(slug):
    s=json.loads((ROOT/f'content/latex/{slug}/provenance.json').read_text(encoding='utf8'));a=s['answers'];D=NormalDist()
    records=[]
    for kind in ['proportion','mean']:
        v=a[kind];n=v['n'];z=quantile((1+v['confidence'])/2)
        assert abs(z-D.inv_cdf((1+v['confidence'])/2))<1e-11
        if kind=='proportion':
            p=Q(v['successes'],n);mu=float(p)
            # Variance of an average of independent Bernoulli variables.
            single=sum((value-p)**2*weight for value,weight in [(Q(0),1-p),(Q(1),p)])
            assert single==p*(1-p)
            variance=float(single);se=math.sqrt(variance/n)
            assert v['successes']>=10 and n-v['successes']>=10
        else:
            mu=v['value'];variance=v['sigma']**2;se=v['sigma']/math.sqrt(n)
            if v['data'] is not None:
                assert sum(v['data'])==1620 and Q(sum(v['data']),n)==mu==180
        assert all(abs(x-y)<1e-9 for x,y in zip([mu-z*se,mu+z*se],v['interval']))
        zp=quantile((1+v['planningConfidence'])/2);bound=zp*zp*variance/v['error']**2
        assert abs(bound-v['bound'])<1e-8
        size=v['sampleSize'];margin=lambda count:zp*math.sqrt(variance/count)
        assert margin(size-1)>v['error']
        assert margin(size)<v['error'] if v['strict'] else margin(size)<=v['error']
        assert size==(math.floor(bound)+1 if v['strict'] else math.ceil(bound))
        records.append({'kind':kind,'bound':bound,'sampleSize':size,'previousMargin':margin(size-1),'margin':margin(size)})
    t=a['strata'];total=sum(t['populations']);fraction=Q(t['knownSample'],t['populations'][t['knownIndex']])
    assert total==12000 and fraction==Q(1,50)
    # One representative systematic sample in disjoint numbered strata checks counts;
    # it is not presented as the random selection actually performed by the source.
    allocation=[sum(i%50==0 for i in range(population)) for population in t['populations']]
    assert allocation==t['allocation'] and sum(allocation)==t['sampleSize']==240
    assert all(Q(n,N)==fraction for n,N in zip(allocation,t['populations']))
    assert sum(s['preserved']['exercisePoints'])==10
    assert all(sum(parts)==points for parts,points in zip(s['preserved']['partPoints'],s['preserved']['exercisePoints']))
    assert s['preserved']['durationMinutes']==55 and sum(s['preserved']['suggestedMinutes'])==50
    return {'passed':True,'exercises':3,'parts':6,'calculations':records,'allocation':allocation,'population':total,'sampleSize':240,'quantilesCheckedBy':'independent Gaussian quadrature and bisection'}
def check_inference_i():return check('inferencia-i')
def check_inference_ii():return check('inferencia-ii')
