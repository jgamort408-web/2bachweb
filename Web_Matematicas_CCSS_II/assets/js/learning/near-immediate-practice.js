import { mountQuiz } from './quiz.js';
import { generateNearImmediateQuestions } from '../../../content/models/near-immediate-integrals.js';
export function initializeNearImmediatePractice(){
 const root=document.querySelector('[data-near-immediate-practice]');
 if(root)mountQuiz(root,()=>generateNearImmediateQuestions(crypto.getRandomValues(new Uint32Array(1))[0]));
}
