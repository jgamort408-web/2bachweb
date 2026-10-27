import {mountQuiz} from './quiz.js';
import {generatePropertiesPractice} from '../../../content/models/probability-properties-practice.js';
const root=document.querySelector('[data-properties-practice]');
if(root)mountQuiz(root,()=>{
 const seed=crypto.getRandomValues(new Uint32Array(1))[0];
 root.dataset.seed=String(seed);
 return generatePropertiesPractice(seed);
});
