/**
 * Terminal simulador interactivo.
 * Simula un shell con un filesystem falso en memoria.
 * Comandos: ls, cd, pwd, cat, mkdir, touch, rm, whoami, clear, help
 */

import { fakeFS, type FSEntry, type CurrentDir } from '../data/terminal-filesystem';

type CommandHandler = (args: string[]) => string;

interface TerminalState {
  cwd: CurrentDir;
  history: string[];
  historyIndex: number;
  homePath: string[];
}

function resolveNode(pathParts: string[]): FSEntry | null {
  let current = fakeFS;
  for (const part of pathParts) {
    if (!current.children) return null;
    const child = current.children[part];
    if (!child) return null;
    current = child;
  }
  return current;
}

function parsePath(input: string, state: TerminalState): string[] {
  let parts: string[];

  if (input.startsWith('/')) {
    parts = input.split('/').filter(Boolean);
  } else if (input === '~' || input.startsWith('~/')) {
    const rest = input.slice(1).replace(/^\//, '');
    parts = [...state.homePath, ...rest.split('/').filter(Boolean)];
  } else {
    parts = [...state.cwd.path, ...input.split('/').filter(Boolean)];
  }

  // Resolver .. y .
  const resolved: string[] = [];
  for (const p of parts) {
    if (p === '..') {
      resolved.pop();
    } else if (p !== '.') {
      resolved.push(p);
    }
  }
  return resolved;
}

function getCwdPrompt(state: TerminalState): string {
  const path = state.cwd.path.join('/');
  return path === '' ? '~' : path.replace(new RegExp(`^${state.homePath.join('/')}`), '~');
}

export function createTerminal(container: HTMLElement): void {
  const state: TerminalState = {
    cwd: { path: [], node: fakeFS },
    history: [],
    historyIndex: -1,
    homePath: ['home', 'usuario'],
  };

  const body = container.querySelector<HTMLElement>('.terminal-body');
  if (!body) return;

  const outputDiv = document.createElement('div');
  outputDiv.className = 'terminal-output';
  outputDiv.setAttribute('role', 'log');
  outputDiv.setAttribute('aria-live', 'polite');
  outputDiv.setAttribute('aria-label', 'Salida del terminal');

  const inputLine = document.createElement('div');
  inputLine.className = 'terminal-input-line';

  const promptSpan = document.createElement('span');
  promptSpan.className = 'terminal-prompt';
  promptSpan.innerHTML = buildPromptHTML(state);

  const input = document.createElement('input');
  input.className = 'terminal-input';
  input.type = 'text';
  input.setAttribute('aria-label', 'Comando del terminal');
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('spellcheck', 'false');

  inputLine.appendChild(promptSpan);
  inputLine.appendChild(input);

  body.appendChild(outputDiv);
  body.appendChild(inputLine);

  // Welcome message
  appendOutput(outputDiv, 'Terminal Linux-Kore v1.0 — Escribe "help" para ver los comandos disponibles.\n');

  const commands = buildCommands(state, outputDiv, input, promptSpan);

  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      if (cmd) {
        state.history.push(cmd);
        state.historyIndex = state.history.length;
        appendOutput(outputDiv, `\x1b[32m${getCwdPrompt(state)}\x1b[0m $ ${cmd}\n`);
        executeCommand(cmd, commands, outputDiv);
      }
      input.value = '';
      promptSpan.innerHTML = buildPromptHTML(state);
      body.scrollTop = body.scrollHeight;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (state.historyIndex > 0) {
        state.historyIndex--;
        input.value = state.history[state.historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        input.value = state.history[state.historyIndex] || '';
      } else {
        state.historyIndex = state.history.length;
        input.value = '';
      }
    }
  });

  // Focus on click
  body.addEventListener('click', () => input.focus());
  input.focus();
}

function buildPromptHTML(state: TerminalState): string {
  const path = getCwdPrompt(state);
  return `<span class="user">root@linux-kore</span><span class="separator">:</span><span class="path">${path}</span><span class="dollar">$</span> `;
}

function appendOutput(outputDiv: HTMLElement, text: string): void {
  // Basic ANSI color replacement for terminal output
  const colored = text
    .replace(/\x1b\[34m(.*?)\x1b\[0m/g, '<span class="dir">$1</span>')
    .replace(/\x1b\[36m(.*?)\x1b\[0m/g, '<span class="symlink">$1</span>')
    .replace(/\x1b\[32m(.*?)\x1b\[0m/g, '<span class="success">$1</span>')
    .replace(/\x1b\[31m(.*?)\x1b\[0m/g, '<span class="error">$1</span>');
  const span = document.createElement('span');
  span.innerHTML = colored;
  outputDiv.appendChild(span);
}

function executeCommand(raw: string, commands: Record<string, CommandHandler>, outputDiv: HTMLElement): void {
  const parts = raw.split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  if (commands[cmd]) {
    const result = commands[cmd](args);
    if (result) appendOutput(outputDiv, result + '\n');
  } else {
    appendOutput(outputDiv, `\x1b[31mbash: ${cmd}: orden no encontrada\x1b[0m\n`);
  }
}

function buildCommands(
  state: TerminalState,
  outputDiv: HTMLElement,
  input: HTMLInputElement,
  promptSpan: HTMLSpanElement
): Record<string, CommandHandler> {
  return {
    ls: (args: string[]) => {
      const showAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
      const showLong = args.includes('-l') || args.includes('-la') || args.includes('-al');
      const target = args.find((a) => !a.startsWith('-')) || '.';
      const pathParts = target === '.' ? state.cwd.path : parsePath(target, state);
      const node = resolveNode(pathParts);
      if (!node) return `\x1b[31mls: no se puede acceder a '${target}': No existe el archivo o el directorio`;
      if (!node.children) return `\x1b[31mls: '${target}' no es un directorio`;

      const entries = Object.values(node.children);
      const filtered = showAll ? entries : entries.filter((e) => !e.name.startsWith('.'));

      if (showLong) {
        const lines = filtered.map((e) => {
          const perm = e.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--';
          const size = e.type === 'file' ? (e.content?.length || 0).toString().padStart(6) : '  4096';
          const name = e.type === 'dir' ? `\x1b[34m${e.name}/\x1b[0m` : e.name;
          return `${perm} 1 root root ${size} ${name}`;
        });
        return lines.join('\n') + '\n';
      }

      const names = filtered.map((e) => {
        if (e.type === 'dir') return `\x1b[34m${e.name}/\x1b[0m`;
        return e.name;
      });
      return names.join('  ') + '\n';
    },

    cd: (args: string[]) => {
      const target = args[0] || '~';
      const pathParts = parsePath(target, state);
      const node = resolveNode(pathParts);
      if (!node) return `\x1b[31mcd: ${target}: No existe el archivo o el directorio`;
      if (node.type !== 'dir') return `\x1b[31mcd: ${target}: No es un directorio`;
      state.cwd = { path: pathParts, node };
      promptSpan.innerHTML = buildPromptHTML(state);
      return '';
    },

    pwd: () => {
      return '/' + state.cwd.path.join('/');
    },

    cat: (args: string[]) => {
      if (args.length === 0) return '\x1b[31mcat: falta un operando';
      return args
        .map((arg) => {
          const pathParts = parsePath(arg, state);
          const node = resolveNode(pathParts);
          if (!node) return `\x1b[31mcat: ${arg}: No existe el archivo o el directorio`;
          if (node.type === 'dir') return `\x1b[31mcat: ${arg}: Es un directorio`;
          return node.content || '';
        })
        .join('\n');
    },

    mkdir: (args: string[]) => {
      if (args.length === 0) return '\x1b[31mmkdir: falta un operando';
      const dirName = args[0];
      if (state.cwd.node.children?.[dirName]) {
        return `\x1b[31mmkdir: no se puede crear el directorio '${dirName}': El archivo ya existe`;
      }
      if (!state.cwd.node.children) state.cwd.node.children = {};
      state.cwd.node.children[dirName] = { type: 'dir', name: dirName, children: {} };
      return '';
    },

    touch: (args: string[]) => {
      if (args.length === 0) return '\x1b[31mtouch: falta un operando';
      const fileName = args[0];
      if (!state.cwd.node.children) state.cwd.node.children = {};
      if (!state.cwd.node.children[fileName]) {
        state.cwd.node.children[fileName] = { type: 'file', name: fileName, content: '' };
      }
      return '';
    },

    rm: (args: string[]) => {
      if (args.length === 0) return '\x1b[31mrm: falta un operando';
      const target = args.find((a) => !a.startsWith('-')) || '';
      if (!target) return '\x1b[31mrm: falta un operando';
      const pathParts = parsePath(target, state);

      // Encontrar el padre
      if (pathParts.length === 0) return '\x1b[31mrm: no se puede eliminar \'/\'';
      const parentPath = pathParts.slice(0, -1);
      const fileName = pathParts[pathParts.length - 1];
      const parent = resolveNode(parentPath);
      if (!parent?.children?.[fileName]) {
        return `\x1b[31mrm: no se puede eliminar '${target}': No existe el archivo o el directorio`;
      }
      const targetNode = parent.children[fileName];
      if (targetNode.type === 'dir' && !args.includes('-r')) {
        return `\x1b[31mrm: no se puede eliminar '${target}': Es un directorio (use -r)`;
      }
      delete parent.children[fileName];
      return '';
    },

    whoami: () => 'root',

    clear: () => {
      outputDiv.innerHTML = '';
      return '';
    },

    help: () => {
      return [
        'Comandos disponibles:',
        '  ls [-la] [dir]    Listar archivos y directorios',
        '  cd [dir]          Cambiar directorio',
        '  pwd               Mostrar directorio actual',
        '  cat <archivo>     Mo contenido de un archivo',
        '  mkdir <dir>       Crear directorio',
        '  touch <archivo>  Crear archivo vacío',
        '  rm [-r] <archivo> Eliminar archivo o directorio',
        '  whoami            Mostrar usuario actual',
        '  clear             Limpiar pantalla',
        '  help              Mostrar esta ayuda',
        '',
        'Atajos: ↑↓ para historial, ~ para home',
      ].join('\n');
    },
  };
}

export function initTerminal(): void {
  const containers = document.querySelectorAll<HTMLElement>('.terminal-container[data-interactive]');
  containers.forEach((container) => createTerminal(container));
}
