'use client';

import { useQuiz } from '@/context/QuizContext';
import { useState } from 'react';

export default function QuizQuestion() {
  const { state, dispatch } = useQuiz();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const currentAnswer = state.answers.find(
    answer => answer.questionId === currentQuestion.id
  );

  // Initialize selected option from existing answer
  useState(() => {
    if (currentAnswer) {
      setSelectedOption(currentAnswer.selectedOption);
    } else {
      setSelectedOption(null);
    }
  });

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    dispatch({
      type: 'SET_ANSWER',
      payload: {
        questionId: currentQuestion.id,
        selectedOption: optionIndex,
      },
    });
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      dispatch({ type: 'NEXT_QUESTION' });
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestionIndex > 0) {
      dispatch({ type: 'PREVIOUS_QUESTION' });
      setSelectedOption(null);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: state.answers }),
      });

      const results = await response.json();
      dispatch({ type: 'SUBMIT_QUIZ', payload: results });
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;
  const canProceed = selectedOption !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-700">
              Question {state.currentQuestionIndex + 1} of {state.questions.length}
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`font-mono text-xl font-bold ${state.timeRemaining < 60 ? 'text-red-600' : 'text-gray-800'}`}>
                {formatTime(state.timeRemaining)}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${((state.currentQuestionIndex + 1) / state.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 leading-relaxed">
            {currentQuestion.text}
          </h2>

          <div className="space-y-5">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedOption === index
                    ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 text-gray-900 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50 text-gray-800 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
                      selectedOption === index
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    {selectedOption === index && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-bold text-xl text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <button
            onClick={handlePrevious}
            disabled={state.currentQuestionIndex === 0}
            className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none"
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </span>
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed}
              className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submit Quiz
              </span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none"
            >
              <span className="flex items-center">
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
