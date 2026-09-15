/**
 * Componente de navegación sidebar + bento grid population.
 */
import { topics, type Topic } from '../data/topics';
import { loadProgress, getProgressPercentage, getTotalSubtopics } from './progress';

export function initNav(): void {
  // Sidebar toggle (mobile)
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  toggle?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
  });

  // Close sidebar on link click (mobile)
  sidebar?.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => sidebar.classList.remove('open'));
  });

  // Populate bento grid
  populateBentoGrid();

  // Update progress UI
  updateProgressUI();
}

function populateBentoGrid(): void {
  const grid = document.getElementById('topics-grid');
  if (!grid) return;

  const progress = loadProgress();
  const sizes = ['card-large', 'card-tall', 'card-wide', '', '', 'card-tall', '', 'card-wide', ''];
  const colors = ['var(--neon-green)', 'var(--neon-cyan)', 'var(--neon-magenta)', 'var(--neon-green)', 'var(--neon-cyan)'];

  grid.innerHTML = topics.map((topic, i) => {
    const sizeClass = sizes[i % sizes.length];
    const color = colors[i % colors.length];
    const completed = topic.subtopics.filter((s) => progress.completedSubtopics.includes(s.id)).length;
    const total = topic.subtopics.length;
    const isComplete = completed === total;

    return `
      <a href="${topic.subtopics[0]?.page || '#'}" class="bento-card ${sizeClass}" style="--accent: ${color}">
        ${isComplete ? '<div class="bento-card-check">✓</div>' : ''}
        <div>
          <div class="bento-card-number">Módulo ${String(topic.number).padStart(2, '0')}</div>
          <div class="bento-card-title">${topic.title}</div>
          <div class="bento-card-desc">${topic.subtopics.length} subtemas${completed > 0 ? ` · ${completed}/${total} completados` : ''}</div>
        </div>
        <div class="bento-card-subtopics">
          ${topic.subtopics.map((s) => `<span class="bento-card-subtopic">${s.title.split(' ').slice(0, 3).join(' ')}</span>`).join('')}
        </div>
        <span class="bento-card-arrow">→</span>
      </a>
    `;
  }).join('');

  // Add 3D tilt effect on hover
  grid.querySelectorAll('.bento-card').forEach((card) => {
    const el = card as HTMLElement;
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mouse-x', `${x}%`);
      el.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

function updateProgressUI(): void {
  const total = getTotalSubtopics();
  const pct = getProgressPercentage(total);
  const progress = loadProgress();
  const completed = progress.completedSubtopics.length;

  // Ring
  const ringFill = document.getElementById('progress-ring-fill');
  if (ringFill) {
    const circumference = 2 * Math.PI * 54; // r=54
    const offset = circumference - (pct / 100) * circumference;
    ringFill.style.strokeDashoffset = offset.toString();
  }

  // Percentage text
  const pctText = document.getElementById('progress-percentage');
  if (pctText) pctText.textContent = `${pct}%`;

  // Bar
  const barFill = document.getElementById('progress-bar-fill');
  if (barFill) barFill.style.width = `${pct}%`;

  // Count
  const countEl = document.getElementById('progress-count');
  if (countEl) countEl.textContent = `${completed} / ${total}`;
}
