"""Independent exact elimination and substitution checks for reviewed systems exams."""
from fractions import Fraction as Q
from itertools import permutations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def reduced(matrix):
    rows = [[Q(value) for value in row] for row in matrix]
    pivot_row = 0
    pivots = []
    for column in range(len(rows[0])):
        selected = next((i for i in range(pivot_row, len(rows)) if rows[i][column]), None)
        if selected is None:
            continue
        rows[pivot_row], rows[selected] = rows[selected], rows[pivot_row]
        pivot = rows[pivot_row][column]
        rows[pivot_row] = [value / pivot for value in rows[pivot_row]]
        for i in range(len(rows)):
            if i != pivot_row:
                factor = rows[i][column]
                rows[i] = [value - factor * reference for value, reference in zip(rows[i], rows[pivot_row])]
        pivots.append(column)
        pivot_row += 1
        if pivot_row == len(rows):
            break
    return rows, pivots

def determinant(matrix):
    total = Q(0)
    for permutation in permutations(range(3)):
        inversions = sum(permutation[i] > permutation[j] for i in range(3) for j in range(i+1,3))
        product = Q(-1 if inversions % 2 else 1)
        for i in range(3):
            product *= matrix[i][permutation[i]]
        total += product
    return total

def verify_solution(matrix, rhs, expected):
    expected = list(map(Q, expected))
    assert [sum(Q(a)*x for a,x in zip(row,expected)) for row in matrix] == list(map(Q,rhs))
    result, pivots = reduced([list(row)+[value] for row,value in zip(matrix,rhs)])
    assert pivots == [0,1,2]
    assert [row[-1] for row in result] == expected

def check_sels_i():
    source = json.loads((ROOT/'content/latex/sistemas-sels-i/provenance.json').read_text(encoding='utf8'))
    answers = source['answers']
    verify_solution([[1,2,3],[0,4,5],[0,0,1]], [7,8,2], answers['triangular'])
    verify_solution([[1,1,1],[120,90,40],[1,1,-3]], [400,36400,0], answers['tablets'])
    assert all(value>=0 and int(value)==value for value in answers['tablets'])
    values = sorted(set([Q(i,1) for i in range(-20,21)]+[Q(i,7) for i in range(-20,21)]+[Q(999,1000),Q(1001,1000)]))
    for parameter in values:
        matrix = [[1,1,1],[2,parameter,3],[3,2,4]]
        rhs = [2,5,parameter]
        assert determinant(matrix) == parameter-1
        rank = len(reduced(matrix)[1])
        augmented_rank = len(reduced([row+[value] for row,value in zip(matrix,rhs)])[1])
        if parameter==1:
            assert [rank,augmented_rank] == answers['singularRanks'] == [2,3]
        else:
            assert rank==augmented_rank==3
            # Independent elimination is checked against a rational closed form.
            candidate=[(-parameter**2+11*parameter-22)/(parameter-1),
                       (7-parameter)/(parameter-1),
                       (parameter**2-8*parameter+13)/(parameter-1)]
            verify_solution(matrix,rhs,candidate)
    verify_solution([[1,1,1],[2,0,3],[3,2,4]], [2,5,0], answers['lambdaZero'])
    assert sum(source['preserved']['points'])==10
    assert sum(source['preserved']['exerciseMinutes'])==source['preserved']['durationMinutes']==55
    return {'parts':4,'passed':True,'exactParameterCases':len(values),'singularRanks':[2,3],
            'triangular':['2','-1/2','2'],'tablets':[180,120,100],'lambdaZero':[22,-7,-13]}


def check_sels_ii():
    source = json.loads((ROOT/'content/latex/sistemas-sels-ii/provenance.json').read_text(encoding='utf8'))
    answers = source['answers']
    verify_solution([[2,1,-1],[0,3,5],[0,0,1]], [4,7,1], answers['triangular'])
    verify_solution([[1,1,1],[10,15,20],[1,-2,2]], [150,2450,0], answers['shipments'])
    assert all(value>=0 and int(value)==value for value in answers['shipments'])
    assert answers['shipments'][1]>=answers['shipments'][2]
    values = sorted(set([Q(i,1) for i in range(-20,21)]+[Q(i,7) for i in range(-20,21)]+[Q(4999,1000),Q(5001,1000)]))
    for parameter in values:
        matrix = [[1,1,1],[2,3,parameter],[4,5,7]]
        rhs = [3,6,10]
        assert determinant(matrix) == 5-parameter
        rank = len(reduced(matrix)[1])
        augmented_rank = len(reduced([row+[value] for row,value in zip(matrix,rhs)])[1])
        if parameter==5:
            assert [rank,augmented_rank] == answers['singularRanks'] == [2,3]
        else:
            assert rank==augmented_rank==3
            candidate=[(21-5*parameter)/(5-parameter),2*(parameter-2)/(5-parameter),-2/(5-parameter)]
            verify_solution(matrix,rhs,candidate)
    verify_solution([[1,1,1],[2,3,0],[4,5,7]], [3,6,10], answers['lambdaZero'])
    assert sum(source['preserved']['points'])==10
    assert sum(source['preserved']['exerciseMinutes'])==source['preserved']['durationMinutes']==55
    return {'parts':4,'passed':True,'exactParameterCases':len(values),'singularRanks':[2,3],
            'triangular':['13/6','2/3','1'],'shipments':[20,70,60],'lambdaZero':['21/5','-4/5','-2/5']}
