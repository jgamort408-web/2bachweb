"""Validate every configured PDF pair and reconcile the complete original inventory."""
import hashlib,json,os,subprocess,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
WORK=ROOT.parent/'tmp/pdfs/lote-176/library'
def read(path):return json.loads(path.read_text(encoding='utf8'))
def checksum(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def main():
    WORK.mkdir(parents=True,exist_ok=True)
    registry=read(ROOT/'docs/pdf/registro-paquetes.json')
    assert registry['packages']==registry['reviewed']==30 and registry['pending']==0
    resources=read(ROOT/'config/resources.json')['resources']
    configs=sorted((ROOT/'config').glob('pdf-build*.json'))
    seen=set();source_ids=[];pairs=[]
    for path in configs:
        config=read(path);provenance=read(ROOT/config.get('sourceDirectory','content/latex/recuperacion-t1')/'provenance.json')
        pair=provenance['pairId'];stored=read(ROOT/config.get('report','docs/pdf/recuperacion-t1-build.json'))
        assert len(config['documents'])==2
        assert all(checksum(ROOT/item['path'])==item['sha256'] for item in stored['inputs']),f'Source changed: {pair}'
        result_path=WORK/(pair+'.json')
        completed=subprocess.run([sys.executable,str(ROOT/'scripts/check-pdfs.py'),'--config',str(path),'--directory',str(ROOT/'output/pdf'),'--report',str(result_path)],capture_output=True,encoding='utf8',env={**os.environ,'PYTHONIOENCODING':'utf-8'},timeout=120)
        if completed.returncode:raise RuntimeError(pair+': '+completed.stderr)
        result=read(result_path);assert result['mathematics']['passed']
        for specification,item in zip(config['documents'],result['documents']):
            assert specification['id']==item['id'] and item['id'] not in seen
            seen.add(item['id']);resource=next(r for r in resources if r['id']==item['id'])
            assert resource['path']==specification['output'] and resource['reviewStatus']=='reviewed'
            original=next(d for d in stored['documents'] if d['id']==item['id'])
            assert original['sha256']==item['sha256']
        source_ids.extend(s['sourceId'] for s in provenance['sources'])
        pairs.append({'pairId':pair,'config':str(path.relative_to(ROOT)).replace(chr(92),'/'),'sources':[s['sourceId'] for s in provenance['sources']],'mathematicsPassed':True,'documents':result['documents'],'releaseDate':config['releaseDate']})
        print('Verified: '+pair,flush=True)
    assert len(source_ids)==len(set(source_ids))==30
    assert set(source_ids)=={r['sourceId'] for r in registry['records']}
    assert seen=={r['id'] for r in resources}
    assert {p.stem for p in (ROOT/'output/pdf').glob('*.pdf')}==seen
    result={'schemaVersion':1,'updatedAt':max(p['releaseDate'] for p in pairs),'passed':True,'originalPackages':30,'pairs':len(pairs),'pdfs':len(seen),'pages':sum(d['pages'] for p in pairs for d in p['documents']),'allOriginalHashesVerified':True,'allReviewedSourceHashesVerified':True,'allMathematicsPassed':True,'pairsChecked':pairs}
    (ROOT/'docs/pdf/verificacion-biblioteca.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print(f"Library verified: {len(pairs)} pairs, {len(seen)} PDFs, {result['pages']} pages",flush=True)
if __name__=='__main__':main()
