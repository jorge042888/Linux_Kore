/**
 * Sistema de progreso de estudio.
 * Guarda en localStorage qué subtemas ha completado el usuario.
 * Soporta exportar/importar como JSON.
 */

export interface ProgressData {
  completedSubtopics: string[];
  quizResults: Record<string, { score: number; total: number; timestamp: number }>;
  lastVisit: number;
}

const STORAGE_KEY = 'linux-kore-progress';

function getDefaultProgress(): ProgressData {
  return {
    completedSubtopics: [],
    quizResults: {},
    lastVisit: Date.now(),
  };
}

export function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    const data = JSON.parse(raw) as ProgressData;
    return { ...getDefaultProgress(), ...data };
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(data: ProgressData): void {
  data.lastVisit = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function markSubtopicComplete(subtopicId: string): ProgressData {
  const progress = loadProgress();
  if (!progress.completedSubtopics.includes(subtopicId)) {
    progress.completedSubtopics.push(subtopicId);
    saveProgress(progress);
  }
  return progress;
}

export function saveQuizResult(quizId: string, score: number, total: number): ProgressData {
  const progress = loadProgress();
  progress.quizResults[quizId] = { score, total, timestamp: Date.now() };
  saveProgress(progress);
  return progress;
}

export function exportProgress(): string {
  const progress = loadProgress();
  return JSON.stringify(progress, null, 2);
}

export function importProgress(json: string): boolean {
  try {
    const data = JSON.parse(json) as ProgressData;
    if (!data.completedSubtopics || !data.quizResults) return false;
    saveProgress(data);
    return true;
  } catch {
    return false;
  }
}

export function getProgressPercentage(totalSubtopics: number): number {
  const progress = loadProgress();
  if (totalSubtopics === 0) return 0;
  return Math.round((progress.completedSubtopics.length / totalSubtopics) * 100);
}

export function getTotalSubtopics(): number {
  // Import topics dynamically to avoid circular dependency
  return 19; // 5 topics × 4 subtopics each (minus 1 = 19)
}

export function initProgress(): void {
  const exportBtn = document.querySelector<HTMLButtonElement>('#export-progress');
  const importBtn = document.querySelector<HTMLButtonElement>('#import-progress');
  const importInput = document.querySelector<HTMLInputElement>('#import-progress');

  exportBtn?.addEventListener('click', () => {
    const json = exportProgress();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linux-kore-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  importBtn?.addEventListener('click', () => importInput?.click());

  importInput?.addEventListener('change', async () => {
    const file = importInput.files?.[0];
    if (!file) return;
    const text = await file.text();
    const ok = importProgress(text);
    if (ok) {
      window.location.reload();
    } else {
      alert('Archivo de progreso inválido.');
    }
  });
}
