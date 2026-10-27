"""Finite equiprobable enumeration independently verifies event and Bayes results."""
import json, math
from fractions import Fraction as Q
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def table(pa,pb,pab):
    atoms=[pab,pa-pab,pb-pab,1-pa-pb+pab]
    assert all(x>=0 for x in atoms) and sum(atoms)==1
    size=math.lcm(*(x.denominator for x in atoms))
    sample=[]
    for atom,flags in zip(atoms,[(True,True),(True,False),(False,True),(False,False)]):sample.extend([flags]*int(atom*size))
    assert len(sample)==size
    probability=lambda predicate:Q(sum(predicate(*s) for s in sample),size)
    assert probability(lambda a,b:a)==pa and probability(lambda a,b:b)==pb
    return probability

def check(slug):
    s=json.loads((ROOT/f'content/latex/{slug}/provenance.json').read_text(encoding='utf8')); a=s['answers']
    pa,pb,an,da,db,dab,N,H,M,ph,pm,pdry,ra,rb=map(Q,s['parameters'])
    event=table(pa,pb,pa-an)
    joint=event(lambda a,b:a and b); other=event(lambda a,b:not a and b)
    assert [joint,other,joint/pb]==list(map(Q,a['events']))
    assert (joint==pa*pb)==a['independent']
    diary=table(da,db,dab)
    assert [diary(lambda a,b:not(a or b)),diary(lambda a,b:a and not b)/(1-db)]==list(map(Q,a['newspapers']))
    hp=H*ph;mp=M*pm
    assert all(x.denominator==1 for x in [N,H,M,hp,mp]) and H+M==N
    people=[('H',i<int(hp)) for i in range(int(H))]+[('M',i<int(mp)) for i in range(int(M))]
    passed=[sex for sex,success in people if success]
    assert [hp,mp,Q(len(passed),int(N)),Q(passed.count('M'),len(passed))]==list(map(Q,a['students']))
    assert H/N*ph+M/N*pm==Q(len(passed),int(N))
    # Enumerate the joint distribution after constructing the two branch products.
    reserve=(1-pdry)*ra+pdry*rb
    dryer=table(1-pdry,reserve,(1-pdry)*ra)
    assert [dryer(lambda a,r:not r),dryer(lambda a,r:a and r)/reserve]==list(map(Q,a['dryers']))
    assert s['preserved']['mandatoryPoints']+s['preserved']['optionalChosen']*s['preserved']['optionalPoints'][0]==10
    assert s['preserved']['durationMinutes']==55
    assert len(s['preserved']['optionalPoints'])==3
    if slug=='probabilidad-i': assert f'{float(mp/(hp+mp)):.4f}'=='0.7313'
    return {'passed':True,'exercises':4,'parts':10,'independent':a['independent'],'enumerationMethods':['finite equiprobable event atoms','individual student enumeration','joint dryer probabilities'],'answers':a}
def check_probability_i():return check('probabilidad-i')
def check_probability_ii():return check('probabilidad-ii')
