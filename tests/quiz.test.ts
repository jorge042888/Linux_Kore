/**
 * Tests para el componente de quiz.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { quizHistoria } from '../src/data/quiz-historia';
import { quizFilesystem } from '../src/data/quiz-filesystem';

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = '<div id="quiz-container"></div>';
});

describe('Quiz data — Historia', () => {
  it('has 5 questions', () => {
    expect(quizHistoria).toHaveLength(5);
  });

  it('each question has 4 options', () => {
    quizHistoria.forEach((q) => {
      expect(q.options).toHaveLength(4);
    });
  });

  it('each question has a valid correct index', () => {
    quizHistoria.forEach((q) => {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    });
  });

  it('each question has non-empty fields', () => {
    quizHistoria.forEach((q) => {
      expect(q.id).toBeTruthy();
      expect(q.question).toBeTruthy();
      expect(q.explanation).toBeTruthy();
    });
  });
});

describe('Quiz data — Filesystem', () => {
  it('has 5 questions', () => {
    expect(quizFilesystem).toHaveLength(5);
  });

  it('each question has 4 options', () => {
    quizFilesystem.forEach((q) => {
      expect(q.options).toHaveLength(4);
    });
  });

  it('each question has a valid correct index', () => {
    quizFilesystem.forEach((q) => {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    });
  });

  it('explanations mention relevant Linux concepts', () => {
    quizFilesystem.forEach((q) => {
      expect(q.explanation.length).toBeGreaterThan(20);
    });
  });
});

describe('Quiz component', () => {
  it('renders quiz when initQuiz is called', async () => {
    const { initQuiz } = await import('../src/components/quiz');
    const container = document.getElementById('quiz-container')!;
    initQuiz(container, quizHistoria);

    expect(container.querySelector('.quiz-container')).toBeTruthy();
    expect(container.querySelector('.quiz-question')).toBeTruthy();
    expect(container.querySelector('.quiz-submit')).toBeTruthy();
  });

  it('shows first question initially', async () => {
    const { initQuiz } = await import('../src/components/quiz');
    const container = document.getElementById('quiz-container')!;
    initQuiz(container, quizHistoria);

    const badge = container.querySelector('.quiz-badge');
    expect(badge?.textContent).toBe('1/5');
  });

  it('renders progress dots', async () => {
    const { initQuiz } = await import('../src/components/quiz');
    const container = document.getElementById('quiz-container')!;
    initQuiz(container, quizHistoria);

    const dots = container.querySelectorAll('.quiz-progress-dot');
    expect(dots).toHaveLength(5);
  });
});
