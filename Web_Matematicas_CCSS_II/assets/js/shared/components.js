import { projectUrl } from '../core/paths.js';

/** Los fragmentos contienen únicamente HTML local de confianza. */
export async function loadComponent(targetId, relativePath) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const response = await fetch(projectUrl(relativePath));
  if (!response.ok) throw new Error(`No se pudo cargar ${relativePath}: ${response.status}`);
  target.innerHTML = await response.text();

  target.querySelectorAll('[data-project-path]').forEach((link) => {
    link.href = projectUrl(link.dataset.projectPath);
  });
}
