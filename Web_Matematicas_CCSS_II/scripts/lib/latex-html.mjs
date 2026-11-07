/**
 * Conversión del subconjunto de LaTeX del banco de Selectividad (P08) a HTML para MathJax.
 *
 * Las fórmulas se conservan tal cual (\( … \) en línea y \[ … \] en bloque) para que MathJax las presente.
 * El texto admite párrafos, listas (enumerate e itemize con las etiquetas del banco), negrita, cursiva,
 * subrayado, superíndice, los símbolos de texto del banco, entornos center/minipage/samepage y figuras con
 * pie. Cualquier otra orden o entorno detiene la conversión con un error que nombra el ejercicio: así un
 * cambio en el banco no se publica a medias.
 */

const escapeHtml = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Órdenes de texto sin argumento.
const SYMBOLS = {
  textquestiondown: '¿', textexclamdown: '¡', texteuro: '€', textordmasculine: 'º', textordfeminine: 'ª',
  textunderscore: '_', ldots: '…', dots: '…', quad: ' ', qquad: '  ', ',': ' ',
  '%': '%', '&': '&amp;', '#': '#', _: '_', '{': '{', '}': '}', ' ': ' ', '\n': ' '
};
const IGNORED = new Set(['noindent', 'nopagebreak', 'small', 'footnotesize', 'normalsize', 'centering', 'medskip',
  'smallskip', 'bigskip', 'hfill', 'linewidth']);
const WRAPPERS = { textbf: 'strong', textit: 'em', emph: 'em', textsuperscript: 'sup' };
const MATH_ENVIRONMENTS = new Set(['pmatrix', 'vmatrix', 'cases', 'array', 'aligned', 'gathered']);
// Etiquetas de enumerate del banco: contador de CSS y signos que lo acompañan.
const COUNTERS = { alph: ['a', 'lower-alpha'], arabic: ['1', 'decimal'], roman: ['i', 'lower-roman'] };

/** Retira los comentarios de LaTeX (líneas o finales de línea con % sin escapar). */
export function stripComments(source) {
  return source.replace(/\r\n?/g, '\n').split('\n')
    .map(line => line.replace(/(^|[^\\])%.*$/, '$1'))
    .join('\n');
}

/** Ajustes dentro de las fórmulas para órdenes de LaTeX que MathJax no conoce. */
export function adaptMath(tex) {
  return tex
    .replace(/\\textquestiondown(\{\})?/g, '¿').replace(/\\texteuro(\{\})?/g, '€')
    .replace(/\\makebox\[[^\]]*\]\{([^{}]*)\}/g, '$1')
    .replace(/\\nopagebreak/g, '');
}

/** \bordermatrix{&A&B\cr f1&1&2\cr …} pasa a una tabla con etiquetas y paréntesis, sin depender del motor. */
export function replaceBordermatrix(tex) {
  let out = '', index = 0;
  for (;;) {
    const start = tex.indexOf('\\bordermatrix{', index);
    if (start < 0) return out + tex.slice(index);
    const open = start + '\\bordermatrix'.length;
    const close = matchBrace(tex, open);
    const rows = tex.slice(open + 1, close).split('\\cr').map(row => row.trim()).filter(Boolean).map(row => row.split('&'));
    const [header, ...body] = rows;
    const columns = header.length - 1;
    const head = header.slice(1).join(' & ');
    const labels = body.map(row => row[0].trim()).join(' \\\\ ');
    const cells = body.map(row => row.slice(1).join(' & ')).join(' \\\\ ');
    out += tex.slice(index, start)
      + `\\begin{array}{r@{}c} & \\begin{array}{${'c'.repeat(columns)}} ${head} \\end{array} \\\\ `
      + `\\begin{array}{r} ${labels} \\end{array} & \\left(\\begin{array}{${'c'.repeat(columns)}} ${cells} \\end{array}\\right) \\end{array}`;
    index = close + 1;
  }
}

function matchBrace(text, open) {
  if (text[open] !== '{') throw new Error('Se esperaba una llave en la posición ' + open);
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === '\\') { i++; continue; }
    if (text[i] === '{') depth++;
    else if (text[i] === '}' && --depth === 0) return i;
  }
  throw new Error('Llave sin cerrar');
}

function matchBracket(text, open) {
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === '\\') { i++; continue; }
    if (text[i] === '{') depth++;
    else if (text[i] === '}') depth--;
    else if (text[i] === ']' && depth === 0) return i;
  }
  throw new Error('Corchete sin cerrar');
}

function findEnd(text, from, env) {
  const begin = '\\begin{' + env + '}', end = '\\end{' + env + '}';
  let depth = 1, i = from;
  for (;;) {
    const nextEnd = text.indexOf(end, i);
    if (nextEnd < 0) throw new Error('Falta \\end{' + env + '}');
    const nextBegin = text.indexOf(begin, i);
    if (nextBegin >= 0 && nextBegin < nextEnd) { depth++; i = nextBegin + begin.length; continue; }
    if (--depth === 0) return nextEnd;
    i = nextEnd + end.length;
  }
}

function findMathEnd(text, from, close) {
  for (let i = from; i < text.length; i++) {
    if (text.startsWith(close, i) && (close !== '$' || text[i - 1] !== '\\')) return i;
    if (text[i] === '\\' && close === '$') i++;
  }
  throw new Error('Fórmula sin cerrar (' + close + ')');
}

function listClass(options) {
  const match = /label=([^,\]]*)/.exec(options || '');
  if (!match) return { type: '1', className: 'mc-sel__list--decimal-dot' };
  const label = /^(.*?)\\(alph|arabic|roman)\*(.*)$/.exec(match[1].trim());
  if (!label) throw new Error('Etiqueta de lista no admitida: ' + match[1]);
  const [, before, counter, after] = label;
  const sign = { ')': 'paren', '.': 'dot' }[after];
  if (before || !sign) throw new Error('Etiqueta de lista no admitida: ' + match[1]);
  return { type: COUNTERS[counter][0], className: `mc-sel__list--${COUNTERS[counter][1]}-${sign}` };
}

/** Divide el cuerpo de una lista en sus \item de primer nivel. */
function splitItems(body) {
  const items = [];
  let depth = 0, current = null;
  for (let i = 0; i < body.length; i++) {
    if (body.startsWith('\\begin{', i)) depth++;
    else if (body.startsWith('\\end{', i)) depth--;
    else if (depth === 0 && body.startsWith('\\item', i) && !/[a-zA-Z]/.test(body[i + 5] ?? '')) {
      if (current !== null) items.push(current);
      current = ''; i += 4; continue;
    }
    if (current === null) {
      if (body[i].trim()) throw new Error('Texto antes del primer \\item');
    } else current += body[i];
  }
  if (current !== null) items.push(current);
  return items;
}

function render(text, context, inline = false) {
  const blocks = [];
  let paragraph = '';
  const flush = () => {
    // Solo espacios de LaTeX: los espacios finos, de cuadratín y duros de la conversión se conservan.
    const content = paragraph.replace(/[ \t\n]+/g, ' ').replace(/^ | $/g, '');
    if (content) blocks.push(`<p>${content}</p>`);
    paragraph = '';
  };
  const block = html => {
    if (inline) throw new Error('Bloque dentro de un texto en línea');
    flush(); blocks.push(html);
  };
  const display = tex => block(`<div class="math-scroll">\\[${escapeHtml(context.math(tex.trim()))}\\]</div>`);
  let i = 0;
  while (i < text.length) {
    const rest = text.slice(i);
    if (rest.startsWith('\\[')) {
      const end = findMathEnd(text, i + 2, '\\]');
      display(text.slice(i + 2, end)); i = end + 2; continue;
    }
    if (rest.startsWith('$$')) {
      const end = findMathEnd(text, i + 2, '$$');
      display(text.slice(i + 2, end)); i = end + 2; continue;
    }
    if (rest.startsWith('\\(') || rest[0] === '$') {
      const [open, close] = rest[0] === '$' ? ['$', '$'] : ['\\(', '\\)'];
      const end = findMathEnd(text, i + open.length, close);
      paragraph += `\\(${escapeHtml(context.math(text.slice(i + open.length, end).trim()))}\\)`;
      i = end + close.length; continue;
    }
    if (rest.startsWith('\\begin{')) {
      const nameEnd = text.indexOf('}', i);
      const env = text.slice(i + 7, nameEnd);
      let cursor = nameEnd + 1, options = '';
      if (text[cursor] === '[') { const close = matchBracket(text, cursor + 1); options = text.slice(cursor + 1, close); cursor = close + 1; }
      if (env === 'minipage' && text[cursor] === '{') cursor = matchBrace(text, cursor) + 1;
      const end = findEnd(text, cursor, env);
      const body = text.slice(cursor, end);
      i = end + env.length + 6;
      if (env === 'enumerate' || env === 'itemize') {
        const items = splitItems(body).map(item => {
          const html = render(item, context);
          return `<li>${/^<p>((?:(?!<\/?p>).)*)<\/p>$/s.test(html) ? html.slice(3, -4) : html}</li>`;
        }).join('');
        if (env === 'itemize') block(`<ul class="mc-sel__list">${items}</ul>`);
        else { const { type, className } = listClass(options); block(`<ol class="mc-sel__list ${className}" type="${type}">${items}</ol>`); }
      } else if (env === 'center') {
        const figure = /\\includegraphics(\[[^\]]*\])?\{([^}]*)\}/.exec(body);
        if (figure) {
          const caption = render(body.slice(0, figure.index) + body.slice(figure.index + figure[0].length), context);
          block(context.figure(figure[2], caption.replace(/^<p>|<\/p>$/g, '')));
        } else block(`<div class="mc-sel__center">${render(body, context)}</div>`);
      } else if (env === 'minipage' || env === 'samepage') {
        flush(); const html = render(body, context); if (html) block(html);
      } else if (MATH_ENVIRONMENTS.has(env)) {
        display(`\\begin{${env}}${options ? '[' + options + ']' : ''}${body}\\end{${env}}`);
      } else throw new Error('Entorno no admitido: ' + env);
      continue;
    }
    if (/^\n[ \t]*\n/.test(rest)) { flush(); i += /^\n[ \t]*\n\s*/.exec(rest)[0].length; continue; }
    if (rest.startsWith('\\\\')) {
      i += 2;
      if (text[i] === '[') i = matchBracket(text, i + 1) + 1;
      paragraph += '<br>'; continue;
    }
    if (rest[0] === '\\') {
      const name = /^\\([a-zA-Z]+|[^a-zA-Z])/.exec(rest)[1];
      i += name.length + 1;
      const letters = /^[a-zA-Z]/.test(name);
      if (letters && text.startsWith('{}', i) && (SYMBOLS[name] || IGNORED.has(name))) i += 2;
      if (name === 'par') { flush(); continue; }
      if (Object.hasOwn(SYMBOLS, name)) { paragraph += SYMBOLS[name]; continue; }
      if (IGNORED.has(name)) { continue; }
      if (Object.hasOwn(WRAPPERS, name) || name === 'underline') {
        const close = matchBrace(text, i);
        const inner = render(text.slice(i + 1, close), context, true);
        i = close + 1;
        paragraph += name === 'underline' ? `<span class="mc-sel__underline">${inner}</span>` : `<${WRAPPERS[name]}>${inner}</${WRAPPERS[name]}>`;
        continue;
      }
      if (name === 'boxed') {
        // amsmath define \boxed con su propio modo matemático: en el texto equivale a una fórmula recuadrada.
        const close = matchBrace(text, i);
        paragraph += `\\(${escapeHtml(context.math('\\boxed{\\displaystyle ' + text.slice(i + 1, close).trim() + '}'))}\\)`;
        i = close + 1; continue;
      }
      if (name === 'includegraphics') {
        if (text[i] === '[') i = matchBracket(text, i + 1) + 1;
        const close = matchBrace(text, i);
        block(context.figure(text.slice(i + 1, close), ''));
        i = close + 1; continue;
      }
      throw new Error('Orden no admitida fuera de las fórmulas: \\' + name);
    }
    if (rest.startsWith('---')) { paragraph += '—'; i += 3; continue; }
    if (rest.startsWith('--')) { paragraph += '–'; i += 2; continue; }
    const char = text[i];
    if (char === '{' || char === '}') { i++; continue; }
    if (char === '~') { paragraph += ' '; i++; continue; }
    if ('&^_#'.includes(char)) throw new Error('Carácter especial de LaTeX sin escapar en el texto: ' + char);
    paragraph += escapeHtml(char);
    i++;
  }
  flush();
  if (inline) return blocks.map(html => html.slice(3, -4)).join(' ');
  return blocks.join('\n');
}

/**
 * Convierte un archivo del banco. `figure(path, captionHtml)` devuelve el HTML de una figura; si no se
 * proporciona, las figuras detienen la conversión.
 */
export function latexToHtml(source, { id = 'fragmento', figure } = {}) {
  const context = {
    math: tex => adaptMath(replaceBordermatrix(tex)),
    figure: figure ?? (() => { throw new Error('Figura sin conversor'); })
  };
  try {
    return render(stripComments(source).trim(), context);
  } catch (error) {
    throw new Error(`${id}: ${error.message}`);
  }
}

/** Texto plano para la búsqueda: sin etiquetas ni fórmulas. */
export function plainText(html) {
  return html.replace(/\\\(.*?\\\)|\\\[.*?\\\]/gs, ' ').replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
}
