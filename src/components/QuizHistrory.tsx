import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, Trophy } from 'lucide-react';
import { formatDate, formatDuration } from '../lib/utils';
import { QuizAttempt } from '../types/quiz';
import { supabase } from '../lib/syperbase';


export const QuizHistory: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    const fetchAttempts = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('quiz_attempts')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (data) {
          setAttempts(data.map((attempt: QuizAttempt) => ({
            ...attempt,
            timestamp: new Date(attempt.created_at),
          })));
        }
      }
    };

    fetchAttempts();
  }, []);

  if (!attempts?.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Previous Attempts</h2>
      <div className="space-y-4">
        {attempts.map((attempt) => (
          <motion.div
            key={attempt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div
              onClick={() => setExpandedId(expandedId === attempt.id ? null : attempt.id)}
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Trophy className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Score: {attempt.score}/{attempt.totalQuestions * 10}
                  </p>
                  <p className="text-sm text-gray-500">{formatDate(attempt.timestamp)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{formatDuration(attempt.timeSpent)}</span>
                </div>
                {expandedId === attempt.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
            <AnimatePresence>
              {expandedId === attempt.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-2">Detailed Results</h3>
                    <div className="space-y-2">
                      {Object.entries(attempt.answers).map(([questionId, answer]) => {
                        const questionList: { id: string; text: string; correctAnswer: string }[] = []; // Replace with the actual list of questions
                        const question = questionList.find(q => q.id === questionId);
                        const isCorrect = question?.correctAnswer === answer;
                        return (
                          <div key={questionId} className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full mt-2 ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`} />
                            <div>
                              <p className="text-sm text-gray-700">{question?.text}</p>
                              <p className="text-sm text-gray-500">
                                Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{answer}</span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};