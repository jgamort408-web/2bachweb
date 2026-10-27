import {mountQuiz} from './quiz.js';
import {generateLaplaceQuestions} from '../../../content/models/probability-laplace-practice.js';
const root=document.querySelector('[data-laplace-practice]');
if(root)mountQuiz(root,()=>{
 const seed=crypto.getRandomValues(new Uint32Array(1))[0];
 root.dataset.seed=String(seed);
 return generateLaplaceQuestions(seed);
});
