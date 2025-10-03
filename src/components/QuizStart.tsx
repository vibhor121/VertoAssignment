'use client';

import { useQuiz } from '@/context/QuizContext';
import { useEffect } from 'react';

export default function QuizStart() {
  const { state, dispatch } = useQuiz();

  useEffect(() => {
    // Fetch questions when component mounts
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        const questions = await response.json();
        dispatch({ type: 'SET_QUESTIONS', payload: questions });
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    fetchQuestions();
  }, [dispatch]);

  const handleStartQuiz = () => {
    dispatch({ type: 'START_QUIZ' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Challenge</h1>
          <p className="text-gray-600">Test your knowledge with our interactive quiz!</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Quiz Details:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• {state.questions.length} questions total</li>
            <li>• 5 minutes time limit</li>
            <li>• Multiple choice format</li>
            <li>• Instant results</li>
          </ul>
        </div>

        <button
          onClick={handleStartQuiz}
          disabled={state.questions.length === 0}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {state.questions.length === 0 ? 'Loading Questions...' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
}
