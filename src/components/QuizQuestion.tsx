import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuizTimer } from './QuizTimer';
import { useQuizStore } from '../strore/quizStore';

export const QuizQuestion: React.FC = () => {
  const { questions, currentQuestionIndex, answerQuestion } = useQuizStore();
  const [integerAnswer, setIntegerAnswer] = useState('');
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestion.type === 'integer') {
      answerQuestion(currentQuestion.id, integerAnswer);
      setIntegerAnswer('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full bg-white rounded-lg shadow-md p-6 mt-8"
    >
      <div className="flex justify-between items-center mb-8">
        <QuizTimer />
      </div>

      <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>

      {currentQuestion.type === 'multiple-choice' && (
        <div className="space-y-4">
          {currentQuestion.options!.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => answerQuestion(currentQuestion.id, option)}
              className="w-full p-4 text-left bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span>{' '}
              {option}
            </motion.button>
          ))}
        </div>
      )}

      {currentQuestion.type === 'integer' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="number"
              value={integerAnswer}
              onChange={(e) => setIntegerAnswer(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your answer"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          >
            Submit Answer
          </button>
        </form>
      )}
    </motion.div>
  );
};