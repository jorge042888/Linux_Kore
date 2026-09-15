/**
 * Tests para el sistema de progreso.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  loadProgress,
  saveProgress,
  markSubtopicComplete,
  saveQuizResult,
  exportProgress,
  importProgress,
  getProgressPercentage,
  type ProgressData,
} from '../src/components/progress';

const STORAGE_KEY = 'linux-kore-progress';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

describe('loadProgress', () => {
  it('returns default progress when no data exists', () => {
    const progress = loadProgress();
    expect(progress.completedSubtopics).toEqual([]);
    expect(progress.quizResults).toEqual({});
    expect(progress.lastVisit).toBeGreaterThan(0);
  });

  it('returns saved progress when data exists', () => {
    const data: ProgressData = {
      completedSubtopics: ['1-1', '2-3'],
      quizResults: { 'q1': { score: 3, total: 5, timestamp: Date.now() } },
      lastVisit: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    const progress = loadProgress();
    expect(progress.completedSubtopics).toEqual(['1-1', '2-3']);
    expect(progress.quizResults['q1'].score).toBe(3);
  });
});

describe('markSubtopicComplete', () => {
  it('adds subtopic to completed list', () => {
    const progress = markSubtopicComplete('1-1');
    expect(progress.completedSubtopics).toContain('1-1');
  });

  it('does not duplicate subtopics', () => {
    markSubtopicComplete('1-1');
    const progress = markSubtopicComplete('1-1');
    expect(progress.completedSubtopics.filter((s) => s === '1-1')).toHaveLength(1);
  });

  it('persists to localStorage', () => {
    markSubtopicComplete('2-3');
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    expect(stored.completedSubtopics).toContain('2-3');
  });
});

describe('saveQuizResult', () => {
  it('saves quiz result with score and total', () => {
    const progress = saveQuizResult('quiz-historia', 4, 5);
    expect(progress.quizResults['quiz-historia']).toEqual(
      expect.objectContaining({ score: 4, total: 5 })
    );
    expect(progress.quizResults['quiz-historia'].timestamp).toBeGreaterThan(0);
  });
});

describe('exportProgress / importProgress', () => {
  it('export returns valid JSON string', () => {
    markSubtopicComplete('1-1');
    const json = exportProgress();
    const parsed = JSON.parse(json);
    expect(parsed.completedSubtopics).toContain('1-1');
  });

  it('import restores progress from JSON', () => {
    const data: ProgressData = {
      completedSubtopics: ['1-1', '5-4'],
      quizResults: {},
      lastVisit: Date.now(),
    };
    const json = JSON.stringify(data);
    const ok = importProgress(json);
    expect(ok).toBe(true);

    const progress = loadProgress();
    expect(progress.completedSubtopics).toEqual(['1-1', '5-4']);
  });

  it('import rejects invalid JSON', () => {
    const ok = importProgress('not valid json');
    expect(ok).toBe(false);
  });

  it('import rejects JSON without required fields', () => {
    const ok = importProgress('{"foo": "bar"}');
    expect(ok).toBe(false);
  });
});

describe('getProgressPercentage', () => {
  it('returns 0 when no subtopics completed', () => {
    const pct = getProgressPercentage(19);
    expect(pct).toBe(0);
  });

  it('calculates correct percentage', () => {
    markSubtopicComplete('1-1');
    markSubtopicComplete('1-2');
    const pct = getProgressPercentage(19);
    expect(Math.round(pct)).toBe(11); // 2/19 ≈ 10.5%
  });

  it('returns 100 when all completed', () => {
    for (let i = 0; i < 19; i++) {
      markSubtopicComplete(`sub-${i}`);
    }
    const pct = getProgressPercentage(19);
    expect(pct).toBe(100);
  });

  it('returns 0 for total 0', () => {
    const pct = getProgressPercentage(0);
    expect(pct).toBe(0);
  });
});
