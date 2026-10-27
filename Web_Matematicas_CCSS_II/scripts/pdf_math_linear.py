"""Exact half-plane intersections and independent integer checks for reviewed LP exams."""
from fractions import Fraction as Q
from itertools import combinations
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]

def satisfies(point, constraints, closure=False):
    x,y=point
    return all(a*x+b*y<=c if closure or not strict else a*x+b*y<c for a,b,c,strict in constraints)

def vertices(constraints):
    result=set()
    for (a,b,c,_),(d,e,f,_) in combinations(constraints,2):
        determinant=a*e-b*d
        if determinant:
            point=(Q(c*e-b*f,determinant),Q(a*f-c*d,determinant))
            if satisfies(point,constraints,closure=True):result.add(point)
    return result

def expected_points(values):return {tuple(map(Q,point)) for point in values}

def objective(point,coefficients):return sum(x*y for x,y in zip(point,coefficients))

def check_linear_i():
    provenance=json.loads((ROOT/'content/latex/programacion-lineal-i/provenance.json').read_text(encoding='utf8'))
    answers=provenance['answers']
    region=[(-1,-4,-5,False),(-1,-2,-4,False),(7,5,35,False),(-1,0,0,False)]
    missions=[(2,1,24,False),(-2,-1,-20,True),(-1,0,-4,False),(2,-1,0,False)]
    batteries=[(-1,-1,-10,False),(-1,1,10,False),(3,2,120,False),(-1,0,0,False),(0,-1,0,False)]
    assert vertices(region)==expected_points(answers['region']['vertices'])
    assert vertices(missions)==expected_points(answers['missions']['closureVertices'])
    assert vertices(batteries)==expected_points(answers['batteries']['vertices'])
    excluded={p for p in vertices(missions) if not satisfies(p,missions)}
    assert excluded==expected_points(answers['missions']['excludedCorners'])
    # Check all pairwise intersections, then optimize over actual admissible corners.
    for constraints,coefficients,answer,sense in [
        (region,(2,1),answers['region'],'minimum'),
        (missions,(Q(3,5),Q(2,5)),answers['missions'],'maximum'),
        (batteries,(130,140),answers['batteries'],'maximum')]:
        values={p:objective(p,coefficients) for p in vertices(constraints) if satisfies(p,constraints)}
        best=(min if sense=='minimum' else max)(values.values())
        assert best==Q(answer[sense])
        assert [p for p,v in values.items() if v==best]==[tuple(map(Q,answer[sense+'Point']))]
    # Independent exhaustive enumeration: original monetary inequalities, not scaled vertex equations.
    integer_missions=[(x,y) for x in range(13) for y in range(25)
        if 2000000<200000*x+100000*y<=2400000 and x>=4 and 2*x<=y]
    assert len(integer_missions)==9
    assert max(integer_missions,key=lambda p:3*p[0]+2*p[1])==(4,16)
    integer_batteries=[(x,y) for x in range(41) for y in range(61)
        if x+y>=10 and y<=x+10 and 150*x+100*y<=6000]
    assert max(integer_batteries,key=lambda p:130*p[0]+140*p[1])==(20,30)
    # Open lower edge: arbitrarily close feasible points, but equality points excluded.
    for n in [10,1000,1000000]:
        assert satisfies((Q(4),Q(12)+Q(1,n)),missions)
        assert not satisfies((Q(4),Q(12)),missions)
        assert not satisfies((Q(4),Q(12)-Q(1,n)),missions)
    # Algebraic certificates apply to every continuous feasible point, not just samples.
    assert (Q(1,2)+Q(3,2),Q(1,2)*2)==(2,1)
    assert (Q(2,5)*2-Q(1,5),Q(2,5))==(Q(3,5),Q(2,5))
    assert Q(2,5)*24-Q(1,5)*4==Q(44,5)
    assert (54*3-32,54*2+32)==(130,140)
    assert 54*120+32*10==6800
    preserved=provenance['preserved']
    assert preserved['mandatoryExercises']==[1] and preserved['chooseOneOf']==[2,3]
    assert preserved['printedExercisePoints']==[5,5,5] and preserved['attemptedTotalPoints']==10
    assert preserved['expressionPointsIncludedPerExercise']==0.5
    assert preserved['attemptedExerciseMinutes']==50<=preserved['durationMinutes']==55
    return {'problemsReviewed':3,'problemsToAttempt':2,'passed':True,'closureVertexCounts':[4,4,4],
        'strictEdgeExcludedCorners':2,'integerMissionCases':len(integer_missions),'integerBatteryCases':len(integer_batteries),
        'minimumRegion':'2','maximumMissions':'44/5','maximumBatteries':'6800'}


def check_linear_ii():
    provenance=json.loads((ROOT/'content/latex/programacion-lineal-ii/provenance.json').read_text(encoding='utf8'))
    answers=provenance['answers']
    batteries=[(-1,-1,-10,False),(-1,1,10,False),(3,2,120,False),(-1,0,0,False),(0,-1,0,False)]
    region=[(-1,-4,-5,False),(-1,-2,-4,False),(7,5,35,False),(-1,0,0,False)]
    assert vertices(batteries)==expected_points(answers['batteries']['vertices'])
    assert vertices(region)==expected_points(answers['region']['vertices'])
    for constraints,coefficients,answer,sense in [
        (batteries,(130,140),answers['batteries'],'maximum'),
        (region,(2,1),answers['region'],'minimum')]:
        values={p:objective(p,coefficients) for p in vertices(constraints)}
        best=(max if sense=='maximum' else min)(values.values())
        assert best==Q(answer[sense])
        assert [p for p,value in values.items() if value==best]==[tuple(map(Q,answer[sense+'Point']))]
    integer_batteries=[(x,y) for x in range(41) for y in range(61)
        if x+y>=10 and y<=x+10 and 150*x+100*y<=6000]
    assert max(integer_batteries,key=lambda p:130*p[0]+140*p[1])==(20,30)
    # The missions exercise asks for formulation only: validate conversion and strictness, without optimizing.
    mission_cases=0
    for x in range(14):
        for y in range(26):
            raw=2000000<200000*x+100000*y<=2400000 and x>=4 and x<=Q(y,2)
            scaled=20<2*x+y<=24 and x>=4 and y>=2*x
            integer_version=21<=2*x+y<=24 and x>=4 and y>=2*x
            assert raw==scaled==integer_version
            mission_cases+=1
    assert not (200000*4+100000*12>2000000)
    assert answers['missions']['solvedInPdf'] is False
    assert list(map(Q,answers['missions']['objective']))==[Q(3,5),Q(2,5)]
    # Annex: validate all unit conversions and all integer combinations in an enclosing box.
    berries=answers['berries']
    assert Q('3.75')*1000==berries['blueberriesGrams']==3750
    assert Q(4)*1000==berries['raspberriesGrams']==4000
    assert list(map(Q,berries['revenueCoefficients']))==[Q('2.40'),Q('1.80')]
    berry_cases=0;berry_feasible=0
    for x in range(-2,53):
        for y in range(-2,53):
            raw=75*x+75*y<=3750 and 100*x+50*y<=4000 and x<=2*y and x>=0 and y>=0
            scaled=x+y<=50 and 2*x+y<=80 and x<=2*y and x>=0 and y>=0
            assert raw==scaled
            berry_cases+=1
            berry_feasible+=int(raw)
    assert berries['netProfitDataComplete'] is False and berries['solvedInPdf'] is False
    preserved=provenance['preserved']
    assert preserved['mandatoryExercises']==[1,2,3]
    assert preserved['points']==[4,3,3] and sum(preserved['points'])==10
    assert preserved['formulationOnly']==[2] and preserved['annexFormulationOnly'] is True
    assert sum(preserved['exerciseMinutes'])==preserved['durationMinutes']==55
    # Global algebraic bounds, independent of vertex evaluation.
    assert (54*3-32,54*2+32)==(130,140) and 54*120+32*10==6800
    assert (Q(1,2)+Q(3,2),Q(1,2)*2)==(2,1)
    return {'examProblems':3,'annexProblems':1,'passed':True,'formulationOnly':[2],
        'vertexCounts':[4,4],'integerBatteryCases':len(integer_batteries),'missionConversionCases':mission_cases,
        'berryConversionCases':berry_cases,'berryFeasibleIntegerCases':berry_feasible,
        'annexNetProfitDataComplete':False,'maximumBatteries':'6800','minimumRegion':'2'}
