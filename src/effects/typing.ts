/**
 * Typing Effect — Types out text character by character.
 * Used for code blocks and hero titles.
 */
export function typeText(
  element: HTMLElement,
  text: string,
  speed: number = 40,
  callback?: () => void
): void {
  let i = 0;
  element.textContent = '';
  element.classList.add('typing-cursor');

  function type(): void {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed + Math.random() * 30);
    } else {
      element.classList.remove('typing-cursor');
      callback?.();
    }
  }

  type();
}

/**
 * Types code blocks with syntax-like coloring.
 */
export function typeCodeBlock(
  pre: HTMLElement,
  code: string,
  speed: number = 20,
  callback?: () => void
): void {
  const codeEl = pre.querySelector('code') || pre;
  let i = 0;
  codeEl.textContent = '';

  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  codeEl.appendChild(cursor);

  function type(): void {
    if (i < code.length) {
      cursor.before(document.createTextNode(code.charAt(i)));
      i++;
      // Faster for spaces and newlines
      const delay = code.charAt(i - 1) === ' ' ? speed * 0.5 :
                    code.charAt(i - 1) === '\n' ? speed * 2 :
                    speed + Math.random() * 15;
      setTimeout(type, delay);
    } else {
      cursor.remove();
      callback?.();
    }
  }

  type();
}

/**
 * Auto-types all elements with [data-type] attribute.
 */
export function initAutoType(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-type]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const text = el.getAttribute('data-type') || el.textContent || '';
          const speed = parseInt(el.getAttribute('data-type-speed') || '40');
          typeText(el, text, speed);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  elements.forEach((el) => observer.observe(el));
}
