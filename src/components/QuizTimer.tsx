import React, { useEffect } from 'react';
import { useQuizStore } from '../strore/quizStore';
export const QuizTimer: React.FC = () => {
  const { timeRemaining, updateTimer } = useQuizStore();

  useEffect(() => {
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [updateTimer]);

  const percentage = (timeRemaining / 30) * 100;

  return (
    <div className="relative w-12 h-12">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#e5e7eb"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke={timeRemaining <= 5 ? '#ef4444' : '#3b82f6'}
          strokeWidth="4"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 20}`}
          strokeDashoffset={`${((100 - percentage) / 100) * (2 * Math.PI * 20)}`}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-semibold">
        {timeRemaining}
      </div>
    </div>
  );
};