/**
 * Linux-Kore — Entry Point Global
 * Inicializa componentes y efectos visuales.
 */
import { initNav } from './components/nav';
import { initThemeToggle } from './components/theme-toggle';
import { initCopyButtons } from './components/copy-button';
import { initAccordions } from './components/accordion';
import { initSequentialNav } from './components/sequential-nav';
import { initProgress } from './components/progress';
import { initMatrixRain } from './effects/matrix-rain';
import { initScrollReveal } from './effects/scroll-reveal';
import { initAutoType } from './effects/typing';
import { initPageTransition } from './effects/page-transition';

function initApp(): void {
  // Components
  initNav();
  initThemeToggle();
  initCopyButtons();
  initAccordions();
  initSequentialNav();
  initProgress();

  // Effects
  initScrollReveal();
  initAutoType();
  initPageTransition();

  // Matrix rain (only on pages with canvas)
  const matrixCanvas = document.querySelector<HTMLCanvasElement>('#matrix-canvas');
  if (matrixCanvas) {
    initMatrixRain(matrixCanvas);
  }

  // Scroll progress bar
  const progressBar = document.querySelector<HTMLElement>('.scroll-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    });
  }
}

document.addEventListener('DOMContentLoaded', initApp);
