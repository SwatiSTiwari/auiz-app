import React from 'react';
import { useQuizStore } from '../strore/quizStore';
export const QuizProgress: React.FC = () => {
  const { currentQuestionIndex, questions } = useQuizStore();
  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};