import {mountQuiz} from './quiz.js';
import {generateEventsPractice} from '../../../content/models/probability-events-practice.js';
const root=document.querySelector('[data-events-practice]');
if(root)mountQuiz(root,()=>{
 const seed=crypto.getRandomValues(new Uint32Array(1))[0];
 root.dataset.seed=String(seed);
 return generateEventsPractice(seed);
});
