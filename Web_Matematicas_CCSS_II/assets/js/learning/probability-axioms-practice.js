import {mountQuiz} from './quiz.js';
import {generateAxiomsPractice} from '../../../content/models/probability-axioms-practice.js';
const root=document.querySelector('[data-axioms-practice]');
if(root)mountQuiz(root,()=>{
 const seed=crypto.getRandomValues(new Uint32Array(1))[0];
 root.dataset.seed=String(seed);
 return generateAxiomsPractice(seed);
});
