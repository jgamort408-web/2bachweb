import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const files = (await readdir(new URL('../tests/', import.meta.url)))
  .filter(name => name.endsWith('.test.mjs'))
  .sort()
  .map(name => 'tests/' + name);
if (!files.length) throw new Error('No se encontraron pruebas unitarias.');

// Sin shell: los espacios o tildes de las rutas no se interpretan como comandos.
const child = spawn(process.execPath, ['--test', ...files], { cwd: root, stdio: 'inherit' });
child.on('error', error => { console.error(error); process.exitCode = 1; });
child.on('exit', (code, signal) => { process.exitCode = signal ? 1 : (code ?? 1); });
