import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import { mountQuiz } from '../../../assets/js/learning/quiz.js';
import { generateDetectiveSession } from './generator.js';

const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {

mountQuiz(document.querySelector('[data-game]'), () =>
  generateDetectiveSession(crypto.getRandomValues(new Uint32Array(1))[0]));
}
