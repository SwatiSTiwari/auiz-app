export interface Question {
    id: string;
    text: string;
    type: 'multiple-choice' | 'integer';
    options?: string[];
    correctAnswer: string;
    points: number;
    timeLimit: number;
  }
  
  export interface QuizAttempt {
    created_at: string | number | Date;
    id: string;
    timestamp: Date;
    score: number;
    totalQuestions: number;
    timeSpent: number;
    answers: Record<string, string>;
  }
  
  export interface QuizState {
    currentQuestionIndex: number;
    questions: Question[];
    answers: Record<string, string>;
    timeRemaining: number;
    isComplete: boolean;
    score: number;
  }