// Shared data contracts. No DOM, storage, authentication or network side effects.
export class ContractError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ContractError';
    this.code = 'invalid-data';
  }
}

export function requireValue(condition, message) {
  if (!condition) throw new ContractError(message);
}

export function record(value, label, allowedKeys) {
  requireValue(value !== null && typeof value === 'object' && !Array.isArray(value)
    && [Object.prototype, null].includes(Object.getPrototypeOf(value)), label + ': objeto esperado');
  for (const key of Object.keys(value)) {
    requireValue(value[key] !== undefined, label + ': campo sin valor ' + key);
  }
  if (allowedKeys) {
    for (const key of Object.keys(value)) {
      requireValue(allowedKeys.includes(key), label + ': campo desconocido ' + key);
    }
  }
}

export function stableId(value, label) {
  requireValue(typeof value === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9:_-]{0,199}$/.test(value),
    label + ': identificador inválido');
}

export function textValue(value, label) {
  requireValue(typeof value === 'string' && value.trim().length > 0, label + ': texto obligatorio');
}

export function projectPath(value, label) {
  textValue(value, label);
  requireValue(!/[:\\?#%]/.test(value) && !value.startsWith('/')
    && value.split('/').every(part => part && part !== '.' && part !== '..'),
  label + ': debe ser una ruta relativa del proyecto');
}

export function immutableCopy(value) {
  const copy = JSON.parse(JSON.stringify(value));
  function freeze(item) {
    if (item && typeof item === 'object') {
      Object.values(item).forEach(freeze);
      Object.freeze(item);
    }
    return item;
  }
  return freeze(copy);
}
