import { mountQuiz } from './quiz.js';
import { generateClassificationQuestions } from '../../../content/models/system-classification.js';
export function initializeSystemClassificationPractice(){
 const root=document.querySelector('[data-classification-practice]');
 if(root)mountQuiz(root,()=>{
  const seed=crypto.getRandomValues(new Uint32Array(1))[0];
  root.dataset.seed=String(seed);
  return generateClassificationQuestions(seed);
 });
}
