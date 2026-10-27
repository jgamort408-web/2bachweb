/** La raíz se calcula desde este módulo: funciona también en /nombre-repositorio/. */
export const projectRoot = new URL('../../../', import.meta.url);

export function projectUrl(relativePath = '') {
  return new URL(relativePath, projectRoot).href;
}
