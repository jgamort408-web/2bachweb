import { mountQuiz } from './quiz.js';
import { generateImmediateQuestions } from '../../../content/models/immediate-integrals.js';
export function initializeImmediatePractice(){
 const root=document.querySelector('[data-immediate-practice]');
 if(root) mountQuiz(root,()=>generateImmediateQuestions(crypto.getRandomValues(new Uint32Array(1))[0]));
}
