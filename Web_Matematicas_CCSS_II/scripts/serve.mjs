/** Servidor de desarrollo sin dependencias. No implementa autenticación ni backend. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, relative, extname, sep } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let path = resolve(root, `.${pathname}`);
    const location = relative(root, path);
    if (location.startsWith(`..${sep}`) || location === '..' || resolve(path) === sep) {
      response.writeHead(403).end();
      return;
    }
    if ((await stat(path)).isDirectory()) {
      if (!pathname.endsWith('/')) {
        response.writeHead(301, { Location: `${pathname}/` }).end();
        return;
      }
      path = resolve(path, 'index.html');
    }
    const data = await readFile(path);
    const immutableVendor = location.startsWith('assets' + sep + 'vendor' + sep);
    response.writeHead(200, {
      'Content-Type': types[extname(path)] || 'application/octet-stream',
      'Cache-Control': immutableVendor ? 'public, max-age=31536000, immutable' : 'no-store',
    });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    // La URL conserva la ruta solicitada: usa una página mínima para errores del servidor.
    response.end('<!doctype html><html lang="es"><meta charset="utf-8"><title>Página no encontrada</title><h1>Página no encontrada</h1><a href="/">Inicio</a></html>');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Proyecto disponible en http://127.0.0.1:${port}/`);
});
