/**
 * Componente acordeón para contenido colapsable.
 * Usa ARIA attributes para accesibilidad.
 */
export function initAccordions(): void {
  const triggers = document.querySelectorAll<HTMLElement>('[data-accordion-trigger]');
  triggers.forEach((trigger) => {
    const targetId = trigger.getAttribute('aria-controls');
    const panel = targetId ? document.getElementById(targetId) : null;
    if (!panel) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isExpanded));
      panel.hidden = isExpanded;
      panel.classList.toggle('accordion-open', !isExpanded);
    });

    trigger.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });
}
