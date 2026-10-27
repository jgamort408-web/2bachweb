// Runs before the body is painted. With JavaScript disabled, the source HTML remains readable.
document.documentElement.classList.add('content-pending');
setTimeout(() => {
  if (!document.documentElement.classList.contains('content-pending')) return;
  const main = document.querySelector('main');
  if (!main) return;
  for (const child of main.children) child.hidden = true;
  const message = document.createElement('p'), retry = document.createElement('button');
  message.textContent = 'No se ha podido abrir el contenido. Vuelve a cargar la página.';
  message.setAttribute('role', 'status');
  retry.type = 'button'; retry.textContent = 'Volver a cargar';
  retry.addEventListener('click', () => location.reload());
  main.append(message, retry);
  document.documentElement.classList.remove('content-pending');
  document.documentElement.dataset.contentState = 'error';
}, 25000);
