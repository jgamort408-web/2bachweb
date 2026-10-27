import {mountQuiz} from './quiz.js';
import {generateBayesPractice} from '../../../content/models/probability-bayes-practice.js';
const root=document.querySelector('[data-bayes-practice]');
if(root)mountQuiz(root,()=>{
 const seed=crypto.getRandomValues(new Uint32Array(1))[0];
 root.dataset.seed=String(seed);
 return generateBayesPractice(seed);
});
