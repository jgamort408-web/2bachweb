import {mountQuiz} from './quiz.js';
import {generateConditionalPractice} from '../../../content/models/probability-conditional-practice.js';
const root=document.querySelector('[data-conditional-practice]');
if(root)mountQuiz(root,()=>{
 const seed=crypto.getRandomValues(new Uint32Array(1))[0];
 root.dataset.seed=String(seed);
 return generateConditionalPractice(seed);
});
