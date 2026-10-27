import {mountQuiz} from './quiz.js';
import {generateCompoundPractice} from '../../../content/models/probability-compound-practice.js';
const root=document.querySelector('[data-compound-practice]');
if(root)mountQuiz(root,()=>{
 const seed=crypto.getRandomValues(new Uint32Array(1))[0];
 root.dataset.seed=String(seed);
 return generateCompoundPractice(seed);
});
