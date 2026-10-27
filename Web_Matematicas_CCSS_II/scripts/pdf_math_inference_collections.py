"""Reconcile original statements and independently check the extra expense problem."""
import json,re,zipfile,hashlib,math
from fractions import Fraction as Q
from pathlib import Path
from pdf_math_inference import check_inference_i,check_inference_ii
from pdf_math_recovery import quantile
ROOT=Path(__file__).resolve().parents[1]
def blocks(s):return re.split(r'\\question\[[\d.]+\]',s.split('\\begin{questions}',1)[1].split('\\end{questions}',1)[0])[1:]
def clean(s):
    s=re.sub(r'\\begin\{solution\}.*?\\end\{solution\}','',s,flags=re.S)
    s=re.sub(r'\\part\[[\d.]+\]',lambda _:r'\part',s)
    s=re.sub(r"\\textbf\{\(\d+'\)\}",'',s)
    return ''.join(s.split())
def read_original(provenance):
    source=provenance['sources'][0];path=ROOT.parent/source['zipPath']
    assert hashlib.sha256(path.read_bytes()).hexdigest()==source['zipSha256']
    with zipfile.ZipFile(path) as z:raw=z.read('main.tex')
    assert hashlib.sha256(raw).hexdigest()==source['texSha256']
    return blocks(raw.decode('utf8'))
def check(slug):
    s=json.loads((ROOT/f'content/latex/{slug}/provenance.json').read_text(encoding='utf8'));original=read_original(s)
    # The independent quadrature and sample-size checks are also applied to
    # all common problems. Reuse verified mathematics, not mismatched source attribution.
    verified=[check_inference_i(),check_inference_ii()]
    assert all(v['passed'] for v in verified)
    for item in s['correspondences']:
        base=json.loads((ROOT/f"content/latex/{item['reviewedPair']}/provenance.json").read_text(encoding='utf8'))
        assert clean(original[item['exercise']-1])==clean(read_original(base)[item['reviewedExercise']-1])
    preserved=s['preserved'];assert len(original)==len(preserved['exercisePoints'])
    assert sum(preserved['exercisePoints'])==preserved['nominalPoints']
    assert all(sum(parts)==point for parts,point in zip(preserved['partPoints'],preserved['exercisePoints']))
    assert preserved['durationMinutes']==55
    result={'passed':True,'originalStatementsMatched':len(s['correspondences']),'exercises':len(original),'parts':2*len(original),'nominalPoints':preserved['nominalPoints'],'commonInferenceVerified':True}
    if slug=='inferencia-general':
        v=s['answers']['expense'];center=(Q('24.47')+Q('26.43'))/2;error=(Q('26.43')-Q('24.47'))/2
        assert center==Q(v['printedMean']) and error==Q(v['printedMargin'])
        assert (Q('1.96')*6/error)**2==v['tableSampleSize']==144
        z=quantile(.975)
        candidates=[n for n in range(1,10001) if round(float(center)-z*6/math.sqrt(n),2)==24.47 and round(float(center)+z*6/math.sqrt(n),2)==26.43]
        assert candidates==v['compatibleRoundedSizes']==[143,144,145]
        # Halfwidth rounding bounds do not depend on assuming an exact center.
        widths=[n for n in range(1,10001) if .975<z*6/math.sqrt(n)<.985]
        assert widths==candidates
        assert abs(quantile(.985)*6/7-v['newMargin'])<1e-11
        assert Q('2.17')*6/7==Q('1.86')
        result.update(tableSampleSize=144,compatibleRoundedSizes=candidates,newMargin=v['newMargin'])
    else:
        assert preserved['nominalPoints']==18 and preserved['selectionRule'] is None
        result['selectionRuleMissing']=True
    return result
def check_inference_collection():return check('inferencia-recopilacion')
def check_inference_general():return check('inferencia-general')
