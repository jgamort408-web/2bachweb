import {mountQuiz} from './quiz.js';
import {generateTotalPractice} from '../../../content/models/probability-total-practice.js';
const root=document.querySelector('[data-total-practice]');
if(root)mountQuiz(root,()=>{
 const seed=crypto.getRandomValues(new Uint32Array(1))[0];
 root.dataset.seed=String(seed);
 return generateTotalPractice(seed);
});
