import { mountQuiz } from './quiz.js';
import { generateIntegrationMethodQuestions } from '../../../content/models/integration-methods.js';
export function initializeIntegrationMethodsPractice(){
 const root=document.querySelector('[data-integration-methods-practice]');
 if(root)mountQuiz(root,()=>generateIntegrationMethodQuestions(crypto.getRandomValues(new Uint32Array(1))[0]));
}
