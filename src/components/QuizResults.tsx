import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw } from 'lucide-react';
import { useQuizStore } from '../strore/quizStore';
export const QuizResults: React.FC = () => {
  const { score, questions, resetQuiz } = useQuizStore();
  const totalPoints = questions.reduce((sum: number, q: { points: number; }) => sum + q.points, 0);
  const percentage = (score / totalPoints) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg"
    >
      <div className="text-center">
        <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
          <Trophy className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-gray-600 mb-6">Here's how you did:</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Score</p>
          <p className="text-2xl font-bold">{score} / {totalPoints} points</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Percentage</p>
          <p className="text-2xl font-bold">{Math.round(percentage)}%</p>
        </div>
      </div>

      <button
        onClick={resetQuiz}
        className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
      >
        <RotateCcw className="w-5 h-5" />
        Try Again
      </button>
    </motion.div>
  );
};