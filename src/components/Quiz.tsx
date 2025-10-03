'use client';

import { useQuiz } from '@/context/QuizContext';
import QuizStart from './QuizStart';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';

export default function Quiz() {
  const { state } = useQuiz();

  if (!state.isQuizStarted) {
    return <QuizStart />;
  }

  if (state.isQuizCompleted) {
    return <QuizResults />;
  }

  return <QuizQuestion />;
}
