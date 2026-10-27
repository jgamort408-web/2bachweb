"""Independent exact matrix algebra for newly authored solutions to F014/F015."""
from fractions import Fraction as Q
from itertools import permutations
from pathlib import Path
import json
from pdf_math_systems import reduced

ROOT=Path(__file__).resolve().parents[1]

def matrix(values):return [list(map(Q,row)) for row in values]

def shape(a):
    if not a or not a[0] or any(len(row)!=len(a[0]) for row in a):raise ValueError('Matriz irregular')
    return len(a),len(a[0])

def transpose(a):return [list(row) for row in zip(*a)]

def multiply(a,b):
    rows,inner=shape(a);right,columns=shape(b)
    if inner!=right:raise ValueError('Producto incompatible')
    return [[sum(Q(a[i][k])*Q(b[k][j]) for k in range(inner)) for j in range(columns)] for i in range(rows)]

def add(a,b):
    if shape(a)!=shape(b):raise ValueError('Suma incompatible')
    return [[Q(x)+Q(y) for x,y in zip(ar,br)] for ar,br in zip(a,b)]

def scale(a,value):return [[Q(value)*Q(x) for x in row] for row in a]

def identity(n):return [[Q(int(i==j)) for j in range(n)] for i in range(n)]

def determinant(a):
    rows,columns=shape(a)
    if rows!=columns:raise ValueError('Determinante no definido')
    total=Q(0)
    for permutation in permutations(range(rows)):
        inversions=sum(permutation[i]>permutation[j] for i in range(rows) for j in range(i+1,rows))
        product=Q(-1 if inversions%2 else 1)
        for i in range(rows):product*=Q(a[i][permutation[i]])
        total+=product
    return total

def inverse(a):
    n,m=shape(a)
    if n!=m:raise ValueError('Inversa no definida')
    result,pivots=reduced([row+unit for row,unit in zip(matrix(a),identity(n))])
    assert pivots==list(range(n)), 'Matriz singular'
    return [row[n:] for row in result]

def power(a,n):
    size,columns=shape(a)
    assert size==columns and n>=0
    result=identity(size);base=matrix(a)
    while n:
        if n%2:result=multiply(result,base)
        base=multiply(base,base);n//=2
    return result

def assert_undefined(operation):
    try:operation()
    except ValueError:return
    raise AssertionError('Se ha aceptado una operación no definida')

def check_matrices(slug):
    source=json.loads((ROOT/'content/latex'/slug/'provenance.json').read_text(encoding='utf8'))
    answer=source['answers']
    if slug=='matrices-i':
        a=[[0,1,-1],[2,-1,0]];b=[[2,0],[-2,1],[0,1]];c=[[1,2],[2,-3]]
        coefficient=add(multiply(a,b),scale(c,-1));rhs=transpose(c)
        assert coefficient==matrix(answer['M'])
        oa=[[3,-1],[-6,1]];ob=[[2,0],[-2,2]];oc=[[3],[1]];od=[[-2,2]]
        rectangular=transpose(od)
    else:
        coefficient=[[1,1,3],[1,2,-1],[1,-1,-1]];rhs=[[2],[3],[0]]
        oa=[[1,-1],[0,1]];ob=[[2,0],[-1,2]];oc=[[0],[1]];od=[[-1,2]]
        rectangular=oc
    assert determinant(coefficient)==Q(answer['determinant'])
    inv=inverse(coefficient)
    assert inv==matrix(answer['inverse'])
    assert multiply(coefficient,inv)==multiply(inv,coefficient)==identity(len(coefficient))
    solution=multiply(inv,rhs)
    assert solution==matrix(answer['X']) and multiply(coefficient,solution)==matrix(rhs)
    # Inverse by minors/adjugate is independent of the row-reduction algorithm.
    n=len(coefficient)
    cofactors=[[(-1)**(i+j)*determinant([[coefficient[r][s] for s in range(n) if s!=j] for r in range(n) if r!=i])
                for j in range(n)] for i in range(n)]
    assert scale(transpose(cofactors),1/determinant(coefficient))==inv
    operations=answer['operations']
    assert_undefined(lambda:add(oa,multiply(ob,oc)))
    assert add(multiply(oa,oc),multiply(ob,transpose(od)))==matrix(operations['column'])
    assert add(multiply(ob,ob),multiply(oc,od))==matrix(operations['square'])
    assert determinant(scale(oa,5))==25*determinant(oa)==Q(operations['scaledDeterminant'])
    assert_undefined(lambda:determinant(rectangular))
    if slug=='matrices-i':
        original=[[1,5,6],[0,1,7],[0,0,1]]
        nilpotent=add(identity(3),scale(original,-1))
        zero=[[Q(0)]*3 for _ in range(3)]
        assert multiply(nilpotent,nilpotent)==matrix(answer['nilpotentSquare'])
        assert power(nilpotent,3)==zero and power(nilpotent,2)!=zero
        assert power(nilpotent,answer['powerExponent'])==zero and answer['powerExponent']==2025
    else:
        a=Q(answer['parameters']['a']);b=Q(answer['parameters']['b'])
        lhs=multiply([[2,-1],[3,-1]],[[a],[-b]])
        rhs=multiply([[1,2],[b,-1]],[[3],[0]])
        assert lhs==rhs==[[Q(3)],[Q(27,7)]]
        result,pivots=reduced([[2,1,3],[3,-2,0]])
        assert pivots==[0,1] and [row[-1] for row in result]==[a,b]
        assert determinant([[2,1],[3,-2]])==-7
    preserved=source['preserved']
    assert preserved['exercisePoints']==[5,2.5,2.5] and sum(preserved['exercisePoints'])==10
    assert preserved['firstExerciseParts']==[3,2] and preserved['durationMinutes']==55
    assert preserved['operationsOffered']==5 and preserved['operationsToChoose']==4
    return {'passed':True,'examProblems':3,'operationsReviewed':5,'operationsToChoose':4,
            'inverseMethods':['row-reduction','adjugate'],'twoSidedInverseChecked':True,
            'originalEquationResidualZero':True,'undefinedOperationsChecked':2,
            'lastExercise':'nilpotent exponent 2025' if slug=='matrices-i' else 'parameters 6/7 and 9/7'}

def check_matrices_i():return check_matrices('matrices-i')
def check_matrices_ii():return check_matrices('matrices-ii')


def check_matrices_iii():
    source=json.loads((ROOT/'content/latex/matrices-iii/provenance.json').read_text(encoding='utf8'))
    answer=source['answers']
    a=[[0,-1],[1,0]];b=[[1,1],[1,1]];c=[[2,1],[3,2]]
    coefficient=add(a,b);inv=inverse(coefficient)
    assert coefficient==matrix(answer['coefficient']) and determinant(coefficient)==1
    assert inv==matrix(answer['inverse'])
    assert multiply(coefficient,inv)==multiply(inv,coefficient)==identity(2)
    # Independent 2x2 adjugate formula, in addition to rational row reduction.
    adjugate=[[coefficient[1][1],-coefficient[0][1]],[-coefficient[1][0],coefficient[0][0]]]
    assert scale(adjugate,1/determinant(coefficient))==inv
    x=multiply(inv,c)
    assert x==matrix(answer['X'])
    assert add(multiply(a,x),multiply(b,x))==matrix(c)
    assert multiply(a,a)==scale(identity(2),-1)
    assert power(a,4)==matrix(answer['powers']['fourth'])==identity(2)
    assert power(a,80)==matrix(answer['powers']['eightieth'])==identity(2)
    # Sequential multiplication independently checks binary powering and the four-step cycle.
    repeated=identity(2)
    for exponent in range(81):
        assert repeated==power(a,exponent)==power(a,exponent%4)
        repeated=multiply(repeated,a)
    oa=[[2,-1],[-4,1]];ob=[[2,3],[2,-2]];oc=[[-2],[-1]];od=[[0,3]]
    assert_undefined(lambda:multiply(oa,transpose(oc)))
    assert shape(multiply(ob,transpose(od)))==(2,1)
    operations=answer['operations']
    assert multiply(add(oa,ob),oc)==matrix(operations['column'])
    assert add(multiply(ob,ob),multiply(oc,od))==matrix(operations['square'])
    assert determinant(scale(oa,-2))==4*determinant(oa)==Q(operations['scaledDeterminant'])
    gram=multiply(transpose(oc),oc)
    assert gram==matrix(operations['gramMatrix']) and shape(gram)==(1,1)
    assert determinant(gram)==Q(operations['gramDeterminant'])==5
    p=answer['parameters'];parameter_a=Q(p['a']);parameter_b=Q(p['b'])
    original=[[parameter_a,parameter_b],[2,1]]
    assert multiply([[0,1],[1,0]],original)==original
    # Exact reduction of the entrywise equations independently gives a=2,b=1.
    result,pivots=reduced([[1,0,2],[0,1,1],[-1,0,-2],[0,-1,-1]])
    assert pivots==[0,1] and [result[0][-1],result[1][-1]]==[parameter_a,parameter_b]
    assert determinant(original)==0
    preserved=source['preserved']
    assert preserved['exercisePoints']==[5,2.5,2.5] and sum(preserved['exercisePoints'])==10
    assert preserved['firstExerciseParts']==[3,2] and preserved['durationMinutes']==55
    assert preserved['operationsOffered']==5 and preserved['operationsToChoose']==4
    assert preserved['powerExponents']==[4,80]
    return {'passed':True,'examProblems':3,'operationsReviewed':5,'operationsToChoose':4,
        'inverseMethods':['row-reduction','adjugate'],'twoSidedInverseChecked':True,
        'originalEquationResidualZero':True,'powerCases':81,'gramDeterminant':'5','parameters':['2','1']}
