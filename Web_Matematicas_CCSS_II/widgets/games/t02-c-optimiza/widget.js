import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import { mountQuiz } from '../../../assets/js/learning/quiz.js';
import { generateOptimizeSession } from './generator.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const root=document.querySelector('[data-game]');
let seed;
mountQuiz(root,()=>{
  let next=crypto.getRandomValues(new Uint32Array(1))[0];
  if(next===seed)next=(next+1)>>>0;
  seed=next;root.dataset.seed=seed;
  return generateOptimizeSession(seed);
});
}
