/**
 * Componente de autoevaluación (quiz) con opción múltiple.
 * Muestra preguntas una por una con feedback inmediato.
 */

import type { QuizQuestion } from '../data/quiz-historia';
import { saveQuizResult } from './progress';

interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: (number | null)[];
  submitted: boolean;
}

export function initQuiz(container: HTMLElement, questions: QuizQuestion[]): void {
  const quizId = container.getAttribute('data-quiz-id') || 'quiz';
  const state: QuizState = {
    questions,
    currentIndex: 0,
    answers: new Array(questions.length).fill(null),
    submitted: false,
  };

  renderQuiz(container, state, quizId);
}

function renderQuiz(container: HTMLElement, state: QuizState, quizId: string): void {
  const q = state.questions[state.currentIndex];
  const answered = state.answers[state.currentIndex] !== null;

  container.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-header">
        <h3>Autoevaluación</h3>
        <span class="quiz-badge">${state.currentIndex + 1}/${state.questions.length}</span>
      </div>

      <div class="quiz-progress-dots">
        ${state.questions
          .map((_, i) => {
            let cls = 'quiz-progress-dot';
            if (state.answers[i] !== null) {
              cls += state.answers[i] === state.questions[i].correctIndex ? ' correct-dot' : ' incorrect-dot';
            }
            return `<div class="${cls}"></div>`;
          })
          .join('')}
      </div>

      <div class="quiz-question">
        <h4><span class="question-number">P${state.currentIndex + 1}.</span> ${q.question}</h4>
        <div class="quiz-options" role="radiogroup" aria-label="Opciones de respuesta">
          ${q.options
            .map(
              (opt, i) => `
            <label class="quiz-option ${answered ? (i === q.correctIndex ? 'correct' : (i === state.answers[state.currentIndex] ? 'incorrect' : '')) : ''}"
                   role="radio" aria-checked="${state.answers[state.currentIndex] === i}"
                   tabindex="0">
              <input type="radio" name="quiz-${state.currentIndex}" value="${i}"
                     ${state.answers[state.currentIndex] === i ? 'checked' : ''}
                     ${answered ? 'disabled' : ''} />
              <span>${opt}</span>
            </label>
          `
            )
            .join('')}
        </div>
        <div class="quiz-feedback ${answered ? 'show' : ''} ${answered ? (state.answers[state.currentIndex] === q.correctIndex ? 'correct' : 'incorrect') : ''}" role="alert">
          ${answered
            ? state.answers[state.currentIndex] === q.correctIndex
              ? '✓ ¡Correcto! ' + q.explanation
              : '✗ Incorrecto. ' + q.explanation
            : ''}
        </div>
      </div>

      ${answered && state.currentIndex < state.questions.length - 1
        ? '<button class="quiz-submit" data-action="next">Siguiente pregunta →</button>'
        : answered && state.currentIndex === state.questions.length - 1
          ? '<button class="quiz-submit" data-action="finish">Ver resultado</button>'
          : '<button class="quiz-submit" data-action="check" disabled>Selecciona una opción</button>'
      }

      ${state.currentIndex > 0 && !answered
        ? '<button class="quiz-submit" data-action="prev" style="background: var(--surface-2); color: var(--text-primary); margin-top: 0.5rem;">← Pregunta anterior</button>'
        : ''}
    </div>
  `;

  // Event listeners
  const options = container.querySelectorAll<HTMLElement>('.quiz-option');
  options.forEach((opt, i) => {
    const handler = () => {
      if (answered) return;
      state.answers[state.currentIndex] = i;
      renderQuiz(container, state, quizId);
    };
    opt.addEventListener('click', handler);
    opt.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  });

  const submitBtn = container.querySelector<HTMLButtonElement>('.quiz-submit');
  submitBtn?.addEventListener('click', () => {
    const action = submitBtn.getAttribute('data-action');
    if (action === 'next') {
      state.currentIndex++;
      renderQuiz(container, state, quizId);
    } else if (action === 'prev') {
      state.currentIndex--;
      renderQuiz(container, state, quizId);
    } else if (action === 'finish') {
      showResult(container, state, quizId);
    }
  });
}

function showResult(container: HTMLElement, state: QuizState, quizId: string): void {
  let correct = 0;
  for (let i = 0; i < state.answers.length; i++) {
    if (state.answers[i] === state.questions[i].correctIndex) {
      correct++;
    }
  }
  const total = state.questions.length;

  saveQuizResult(quizId, correct, total);

  const pct = Math.round((correct / total) * 100);
  const message = pct >= 80
    ? '¡Excelente! Dominas este tema.'
    : pct >= 60
      ? '¡Bien! Puedes repasar los temas que fallaste.'
      : 'Te recomendamos repasar el contenido e intentar de nuevo.';

  container.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-header">
        <h3>Resultado</h3>
      </div>
      <div class="quiz-result">
        <div class="score">${correct}/${total}</div>
        <div class="score-label">${pct}% de aciertos — ${message}</div>
      </div>
      <div class="quiz-progress-dots" style="justify-content: center; margin-top: 1.5rem;">
        ${state.questions
          .map((q, i) => {
            const isCorrect = state.answers[i] === q.correctIndex;
            return `<div class="quiz-progress-dot ${isCorrect ? 'correct-dot' : 'incorrect-dot'}" title="${isCorrect ? 'Correcto' : 'Incorrecto'}"></div>`;
          })
          .join('')}
      </div>
      <button class="quiz-submit" data-action="retry" style="margin-top: 1.5rem;">Reintentar quiz</button>
    </div>
  `;

  container.querySelector('[data-action="retry"]')?.addEventListener('click', () => {
    state.currentIndex = 0;
    state.answers = new Array(state.questions.length).fill(null);
    renderQuiz(container, state, quizId);
  });
}
