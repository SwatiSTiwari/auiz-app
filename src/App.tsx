import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizProgress } from './components/QuizProgress';
import { QuizResults } from './components/QuizResults';
import { QuizHistory } from './components/QuizHistrory';
import { useQuizStore } from './strore/quizStore';
import { useEffect } from 'react';

const questions = [
  {
    id: '1',
    text: 'Which planet is closest to the Sun?',
    type: 'multiple-choice' as const,
    options: ['Venus', 'Mercury', 'Earth', 'Mars'],
    correctAnswer: 'Mercury',
    points: 10,
    timeLimit: 30,
  },
  {
    id: '2',
    text: 'Which data structure organizes items in a First-In, First-Out (FIFO) manner?',
    type: 'multiple-choice' as const,
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    correctAnswer: 'Queue',
    points: 10,
    timeLimit: 30,
  },
  {
    id: '3',
    text: 'Which of the following is primarily used for structuring web pages?',
    type: 'multiple-choice' as const,
    options: ['Python', 'Java', 'HTML', 'C++'],
    correctAnswer: 'HTML',
    points: 10,
    timeLimit: 30,
  },
  {
    id: '4',
    text: 'Which chemical symbol stands for Gold?',
    type: 'multiple-choice' as const,
    options: ['Au', 'Gd', 'Ag', 'Pt'],
    correctAnswer: 'Au',
    points: 10,
    timeLimit: 30,
  },
  {
    id: '5',
    text: 'Which of these processes is not typically involved in refining petroleum?',
    type: 'multiple-choice' as const,
    options: ['Fractional distillation', 'Cracking', 'Polymerization', 'Filtration'],
    correctAnswer: 'Filtration',
    points: 10,
    timeLimit: 30,
  },
  {
    id: '6',
    text: 'What is the value of 12 + 28?',
    type: 'integer' as const,
    correctAnswer: '40',
    points: 10,
    timeLimit: 30,
  },
  {
    id: '7',
    text: 'How many states are there in the United States?',
    type: 'integer' as const,
    correctAnswer: '50',
    points: 10,
    timeLimit: 30,
  },
  {
    id: '8',
    text: 'In which year was the Declaration of Independence signed?',
    type: 'integer' as const,
    correctAnswer: '1776',
    points: 10,
    timeLimit: 30,
  },
  {
    id: '9',
    text: 'What is the value of pi rounded to the nearest integer?',
    type: 'integer' as const,
    correctAnswer: '3',
    points: 10,
    timeLimit: 30,
  },
  {
    id: '10',
    text: 'If a car travels at 60 mph for 2 hours, how many miles does it travel?',
    type: 'integer' as const,
    correctAnswer: '120',
    points: 10,
    timeLimit: 30,
  },
];

function App() {
  const { initializeQuiz, isComplete } = useQuizStore();

  useEffect(() => {
    return initializeQuiz(questions);
  }, [initializeQuiz]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Platform</h1>
          <p className="text-gray-600">Test your knowledge!</p>
        </header>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <QuizProgress />
                <QuizQuestion />
              </motion.div>
            )}
            
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <QuizResults />
                <QuizHistory />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;