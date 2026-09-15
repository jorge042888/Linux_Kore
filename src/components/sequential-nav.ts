/**
 * Navegación secuencial: botones Anterior/Siguiente + Breadcrumbs.
 * Lee el atributo data-prev y data-next de la página actual.
 */
export function initSequentialNav(): void {
  const container = document.querySelector<HTMLElement>('.sequential-nav');
  if (!container) return;

  const prevLink = container.querySelector<HTMLAnchorElement>('.seq-prev');
  const nextLink = container.querySelector<HTMLAnchorElement>('.seq-next');

  if (prevLink) {
    const prev = prevLink.getAttribute('href');
    if (!prev || prev === '#') prevLink.style.visibility = 'hidden';
  }

  if (nextLink) {
    const next = nextLink.getAttribute('href');
    if (!next || next === '#') nextLink.style.visibility = 'hidden';
  }
}
