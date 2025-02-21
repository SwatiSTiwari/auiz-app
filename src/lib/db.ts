import { QuizAttempt } from '../types/quiz';
import { supabase } from './syperbase';

export const saveQuizAttempt = async (attempt: Omit<QuizAttempt, 'id' | 'timestamp'>) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: user.id,
        score: attempt.score,
        total_questions: attempt.totalQuestions,
        time_spent: attempt.timeSpent,
        answers: attempt.answers,
      });

    if (error) {
      console.error('Error saving quiz attempt:', error);
      throw error;
    }

    return data;
  }
};

export const getQuizAttempts = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching quiz attempts:', error);
      throw error;
    }

    return data;
  }

  return [];
};