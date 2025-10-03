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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Question {state.currentQuestionIndex + 1} of {state.questions.length}
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`font-mono text-lg ${state.timeRemaining < 60 ? 'text-red-600' : 'text-gray-700'}`}>
                {formatTime(state.timeRemaining)}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((state.currentQuestionIndex + 1) / state.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedOption === index
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedOption === index
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedOption === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={state.currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
