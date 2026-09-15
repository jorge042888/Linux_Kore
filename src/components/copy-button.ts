/**
 * Botón de copiar para bloques de código.
 * Agrega un botón flotante que copia el contenido al portapapeles.
 */
export function initCopyButtons(): void {
  const blocks = document.querySelectorAll<HTMLElement>('pre code');
  blocks.forEach(addCopyButton);
}

function addCopyButton(codeBlock: Element): void {
  const pre = codeBlock.closest('pre');
  if (!pre) return;

  pre.style.position = 'relative';

  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'Copiar';
  btn.setAttribute('aria-label', 'Copiar código al portapapeles');

  btn.addEventListener('click', async () => {
    const text = codeBlock.textContent || '';
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = '¡Copiado!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copiar';
        btn.classList.remove('copied');
      }, 2000);
    } catch {
      btn.textContent = 'Error';
      setTimeout(() => { btn.textContent = 'Copiar'; }, 2000);
    }
  });

  pre.appendChild(btn);
}
