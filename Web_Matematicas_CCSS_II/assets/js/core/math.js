import { projectUrl } from './paths.js';

// Una instancia por documento (cada iframe tiene la suya); el navegador comparte
// la caché HTTP. Nunca se cargan dos copias del motor en el mismo documento.
const base = projectUrl('assets/vendor/mathjax-3.2.2/es5/');
const loadedScripts = new Map();
const pending = new Map();
const failedRoots = new Set();
let enginePromise;
let queue = Promise.resolve();
let scheduled = false;
let status;
let retryButton;
let message;
let onlineRetryAt = 0;
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const containsTex = (node) => /\\\(|\\\[|\$\$|\$[^$\n]+\$|\\begin\{/.test(node.textContent || '');

function showStatus(text, retry = false) {
  if (!status) {
    status = document.createElement('aside');
    status.className = 'math-status';
    status.setAttribute('aria-label', 'Estado de las fórmulas');
    message = document.createElement('span');
    message.setAttribute('role', 'status');
    retryButton = document.createElement('button');
    retryButton.type = 'button';
    retryButton.textContent = 'Reintentar fórmulas';
    retryButton.addEventListener('click', retryMath);
    status.append(message, ' ', retryButton);
    (document.querySelector('main') || document.body).prepend(status);
  }
  status.hidden = !text;
  message.textContent = text;
  retryButton.hidden = !retry;
}

async function fetchScript(url) {
  // Solo recursos de la copia local, nunca direcciones escritas por el alumno.
  if (!url.startsWith(base)) throw new Error('Componente matemático fuera del directorio permitido');
  for (let attempt = 0; attempt < 3; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    let code;
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        cache: attempt === 0 ? 'default' : 'reload',
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      code = await response.text();
      if (!code.trim() || /^\s*</.test(code)) throw new Error('El servidor no devolvió JavaScript');
    } catch (error) {
      if (attempt === 2) throw error;
      showStatus('La carga de fórmulas se está retrasando. Reintentando…');
      // Espera creciente con dispersión: evita sincronizar a toda una clase.
      await pause(600 * 2 ** attempt + Math.random() * 300);
      continue;
    } finally {
      clearTimeout(timeout);
    }
    // Se descarga por completo antes de ejecutarlo. Abortar una descarga lenta
    // no deja una etiqueta <script src> que pueda ejecutarse tarde y duplicarse.
    const objectUrl = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
    try {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.dataset.mathEngine = 'true';
        script.src = objectUrl;
        script.onload = () => { script.remove(); resolve(); };
        script.onerror = () => { script.remove(); reject(new Error('No se pudo ejecutar el motor de fórmulas')); };
        document.head.append(script);
      });
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
    return;
  }
}

function loadScript(url) {
  if (!loadedScripts.has(url)) loadedScripts.set(url, fetchScript(url));
  return loadedScripts.get(url);
}

function loadEngine() {
  if (enginePromise) return enginePromise;
  enginePromise = (async () => {
    showStatus('Preparando las fórmulas…');
    let rejectStartup;
    const startupFailure = new Promise((_, reject) => { rejectStartup = reject; });
    // El rechazo puede preceder a la finalización de la descarga principal.
    startupFailure.catch(() => {});
    window.MathJax = {
      loader: {
        paths: { mathjax: base.replace(/\/$/, '') },
        load: ['a11y/assistive-mml'],
        require: loadScript,
        failed: rejectStartup,
      },
      startup: { typeset: false },
      tex: {
        inlineMath: [['\\(', '\\)'], ['$', '$']],
        displayMath: [['\\[', '\\]'], ['$$', '$$']],
        processEscapes: true,
        macros: { sen: '\\operatorname{sen}', tg: '\\operatorname{tg}' },
      },
      svg: { fontCache: 'local' },
      options: { enableMenu: false, enableAssistiveMml: true },
    };
    await loadScript(`${base}tex-svg-full.js`);
    await Promise.race([window.MathJax.startup.promise, startupFailure]);
    if (!window.MathJax.typesetPromise) throw new Error('Motor de fórmulas incompleto');
    return window.MathJax;
  })();
  return enginePromise;
}

function serialize(work) {
  const job = queue.then(work);
  // Un error no bloquea el resto de la cola.
  queue = job.catch(() => {});
  return job;
}

async function processRoots(roots) {
  // También normalizar al recuperar errores: puede haber fallado un ámbito
  // completo y, después, un ejercicio contenido en él.
  const unique = [...new Set(roots)].filter((root) => root.isConnected);
  const connected = unique.filter((node) => !unique.some((other) => other !== node && other.contains(node)));
  if (!connected.length) return true;
  try {
    const engine = await loadEngine();
    await engine.typesetPromise(connected);
    for (const root of failedRoots) {
      if (!root.isConnected || connected.some((scope) => scope === root || scope.contains(root))) failedRoots.delete(root);
    }
    const invalid = connected.some((root) => root.querySelector('[data-mml-node="merror"]'));
    if (invalid) showStatus('Hay una fórmula con un error de escritura. El resto del contenido sigue disponible.');
    else if (!failedRoots.size) showStatus('');
    document.dispatchEvent(new CustomEvent('math:rendered', { detail: { roots: connected } }));
    return !invalid;
  } catch (error) {
    connected.forEach((root) => failedRoots.add(root));
    showStatus('No se han podido presentar todas las fórmulas. Puedes seguir leyendo y reintentarlo sin perder tus respuestas.', true);
    console.warn('[Fórmulas]', error.message);
    return false;
  }
}

/** Agrupa solicitudes del mismo ciclo y elimina ámbitos duplicados/anidados. */
export function renderMath(root = document.querySelector('main') || document.body) {
  if (!root || !containsTex(root)) return Promise.resolve(true);
  const result = new Promise((resolve) => {
    if (!pending.has(root)) pending.set(root, []);
    pending.get(root).push(resolve);
  });
  if (!scheduled) {
    scheduled = true;
    setTimeout(() => {
      scheduled = false;
      const entries = [...pending];
      pending.clear();
      const roots = entries.map(([node]) => node);
      const minimal = roots.filter((node) => !roots.some((other) => other !== node && other.contains(node)));
      serialize(() => processRoots(minimal)).then((ok) => entries.forEach(([, callbacks]) => callbacks.forEach((resolve) => resolve(ok))));
    }, 30);
  }
  return result;
}

/** Usar para sustituir un enunciado ya renderizado; conserva el registro interno. */
export function updateMath(root, mutate) {
  return serialize(async () => {
    if (!root.isConnected) return false;
    window.MathJax?.typesetClear?.([root]);
    mutate();
    return containsTex(root) ? processRoots([root]) : true;
  });
}

export function retryMath() {
  retryButton && (retryButton.disabled = true);
  return serialize(async () => {
    // Solo reiniciar una carga fallida, nunca una inicialización en curso.
    try { await enginePromise; } catch {
      enginePromise = undefined;
      loadedScripts.clear();
    }
    const roots = [...failedRoots].filter((root) => root.isConnected);
    failedRoots.clear();
    if (roots.length) await processRoots(roots);
  }).finally(() => { if (retryButton) retryButton.disabled = false; });
}

/** Detecta contenido nuevo, sin observar la salida interna de MathJax. */
export function observeMath(root = document.querySelector('main')) {
  if (!root) return () => {};
  renderMath(root);
  const ignored = 'mjx-container, .math-status, script, style, pre, code, textarea';
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      const parent = mutation.target.nodeType === 1 ? mutation.target : mutation.target.parentElement;
      if (!parent || parent.closest(ignored)) continue;
      const nodes = mutation.type === 'characterData' ? [mutation.target] : mutation.addedNodes;
      for (const node of nodes) {
        const element = node.nodeType === 1 ? node : node.parentElement;
        if (element && !element.closest(ignored) && containsTex(node)) renderMath(element);
      }
    }
  });
  observer.observe(root, { childList: true, subtree: true, characterData: true });
  const online = () => {
    if (failedRoots.size && Date.now() - onlineRetryAt > 10000) {
      onlineRetryAt = Date.now();
      retryMath();
    }
  };
  window.addEventListener('online', online);
  return () => { observer.disconnect(); window.removeEventListener('online', online); };
}
