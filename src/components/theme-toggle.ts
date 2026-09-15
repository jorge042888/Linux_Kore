/**
 * Toggle de tema oscuro / claro.
 * Persiste la preferencia en localStorage.
 */
type Theme = 'dark' | 'light';

const STORAGE_KEY = 'linux-kore-theme';

export function initThemeToggle(): void {
  const toggle = document.querySelector<HTMLButtonElement>('#theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved) applyTheme(saved);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') as Theme;
    const next: Theme = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    updateToggleIcon(next);
  });

  const current = document.documentElement.getAttribute('data-theme') as Theme;
  updateToggleIcon(current);
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}

function updateToggleIcon(theme: Theme): void {
  const toggle = document.querySelector<HTMLButtonElement>('#theme-toggle');
  if (!toggle) return;
  toggle.textContent = theme === 'dark' ? '☀' : '☾';
  toggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}
