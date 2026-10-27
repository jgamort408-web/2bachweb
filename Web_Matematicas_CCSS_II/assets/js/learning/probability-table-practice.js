import {mountQuiz} from './quiz.js';
import {generateTablePractice} from '../../../content/models/probability-table-practice.js';
const root=document.querySelector('[data-table-practice]');
if(root)mountQuiz(root,()=>{
 const seed=crypto.getRandomValues(new Uint32Array(1))[0];
 root.dataset.seed=String(seed);
 return generateTablePractice(seed);
});
