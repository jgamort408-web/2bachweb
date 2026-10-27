"""Reconcile all 30 original packages with reviewed provenance, catalog and PDF reports."""
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORKSPACE = ROOT.parent

def checksum(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    inventory = (WORKSPACE/'INVENTARIO_Y_DIAGNOSTICO_MATERIALES.md').read_text(encoding='utf8')
    sources = re.findall(r'^#### (F\d{3}) · (.+\.zip)\s*$',inventory,re.M)
    assert len(sources)==30 and len({sid for sid,_ in sources})==30, 'Inventario original incompleto o duplicado'
    resources = json.loads((ROOT/'config/resources.json').read_text(encoding='utf8'))['resources']
    reviewed = {}
    review_dates = []
    for provenance_path in sorted((ROOT/'content/latex').glob('*/provenance.json')):
        provenance = json.loads(provenance_path.read_text(encoding='utf8'))
        review_dates.append(provenance['reviewedAt'])
        pair = provenance['pairId']
        report_path = ROOT/'docs/pdf'/(pair+'-build.json')
        report = json.loads(report_path.read_text(encoding='utf8'))
        documents = []
        for document in report['documents']:
            resource = next(r for r in resources if r['id']==document['id'])
            assert resource['reviewStatus']=='reviewed'
            assert checksum(ROOT/resource['path'])==document['sha256'], 'PDF modificado sin actualizar informe'
            documents.append(resource['id'])
        assert len(documents)==2
        for source in provenance['sources']:
            assert source['sourceId'] not in reviewed
            reviewed[source['sourceId']] = {'pairId':pair,'provenance':str(provenance_path.relative_to(ROOT)).replace('\\','/'),
                'report':str(report_path.relative_to(ROOT)).replace('\\','/'),'resources':documents,'expectedHash':source['zipSha256']}
    records=[]
    for sid,title in sources:
        path=WORKSPACE/'Materiales y Recursos y Exámenes'/title
        fingerprint=checksum(path)
        record={'sourceId':sid,'zipPath':str(path.relative_to(WORKSPACE)).replace('\\','/'),'zipSha256':fingerprint,'status':'pending'}
        if sid in reviewed:
            detail=reviewed[sid].copy()
            assert detail.pop('expectedHash')==fingerprint, 'ZIP revisado modificado'
            record.update(status='reviewed',**detail)
        records.append(record)
    assert set(reviewed).issubset({sid for sid,_ in sources})
    result={'schemaVersion':1,'updatedAt':max(review_dates),'packages':30,'reviewed':len(reviewed),
            'pending':30-len(reviewed),'reviewedResources':len(resources),'records':records}
    output=ROOT/'docs/pdf/registro-paquetes.json'
    output.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print(f"Paquetes: 30; revisados: {len(reviewed)}; pendientes: {30-len(reviewed)}")

if __name__=='__main__':
    main()
