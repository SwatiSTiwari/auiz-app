import { create } from 'zustand';
import { QuizState, Questions } from '../types/quiz';
import { saveQuizAttempt } from '../lib/db';

interface QuizStore extends QuizState {
  initializeQuiz: (questions: Questions[]) => void;
  answerQuestion: (questionId: string, answer: string) => void;
  updateTimer: () => void;
  completeQuiz: () => Promise<void>;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set, get) => {
    return ({
        currentQuestionIndex: 0,
        questions: [],
        answers: {},
        timeRemaining: 30,
        isComplete: false,
        score: 0,

        initializeQuiz: (questions) => {
            const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
            set({
                questions: shuffledQuestions,
                currentQuestionIndex: 0,
                answers: {},
                timeRemaining: 30,
                isComplete: false,
                score: 0,
            });
        },

        answerQuestion: (questionId, answer) => {
            const { answers, questions, currentQuestionIndex } = get();
            const newAnswers = { ...answers, [questionId]: answer };

            set({
                answers: newAnswers,
                currentQuestionIndex: currentQuestionIndex + 1,
                timeRemaining: 30,
            });

            if (currentQuestionIndex + 1 >= questions.length) {
                get().completeQuiz();
            }
        },

        updateTimer: () => {
            const { timeRemaining, currentQuestionIndex, questions } = get();
            if (timeRemaining > 0) {
                set({ timeRemaining: timeRemaining - 1 });
            } else if (currentQuestionIndex < questions.length) {
                get().answerQuestion(questions[currentQuestionIndex].id, '');
            }
        },

        completeQuiz: async () => {
            const { questions, answers } = get();
            let score = 0;

            questions.forEach((question: Questions) => {
                if (answers[question.id] === question.correctAnswer) {
                    score += question.points;
                }
            });

            await saveQuizAttempt({
                score,
                totalQuestions: questions.length,
                timeSpent: questions.length * 30 - get().timeRemaining,
                answers,
                created_at: ''
            });

            set({ isComplete: true, score });
        },

        resetQuiz: () => {
            const { questions } = get();
            get().initializeQuiz(questions);
        },
    });
});