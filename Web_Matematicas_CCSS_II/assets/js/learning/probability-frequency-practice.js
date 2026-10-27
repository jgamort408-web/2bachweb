import {mountQuiz} from './quiz.js';
import {generateFrequencyPractice} from '../../../content/models/probability-frequency-practice.js';
const root=document.querySelector('[data-frequency-practice]');
if(root)mountQuiz(root,()=>{
 const seed=crypto.getRandomValues(new Uint32Array(1))[0];
 root.dataset.seed=String(seed);
 return generateFrequencyPractice(seed);
});
