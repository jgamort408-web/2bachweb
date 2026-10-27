// Isolated document: GeoGebra cannot interfere with the lesson's MathJax observer.
const report = (type) => {
  if (window.parent !== window) window.parent.postMessage({ type }, location.origin);
};
const loading = document.getElementById('loading');
const script = document.createElement('script');
script.src = 'https://www.geogebra.org/apps/deployggb.js';
script.async = true;
const fail = () => {
  loading.textContent = 'GeoGebra no está disponible. Vuelve a la lección para reintentar.';
  report('ccss-geogebra-error');
};
script.onerror = fail;
script.onload = () => {
  try {
    const applet = new window.GGBApplet({
      appName: 'graphing', width: 800, height: 600,
      showToolBar: true, showAlgebraInput: true, showMenuBar: false,
      showResetIcon: true, language: 'es', allowUpscale: false,
      scaleContainerClass: 'geogebra-scale', preventFocus: true,
      appletOnLoad: () => {
        loading.hidden = true;
        report('ccss-geogebra-ready');
      },
    }, true);
    applet.inject('ggb-element');
  } catch { fail(); }
};
document.head.append(script);
