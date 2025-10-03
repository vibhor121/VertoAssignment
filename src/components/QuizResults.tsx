'use client';

import { useQuiz } from '@/context/QuizContext';

export default function QuizResults() {
  const { state, dispatch } = useQuiz();

  if (!state.results) {
    return null;
  }

  const { score, totalQuestions, percentage, results } = state.results;

  const handleRestart = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100';
    if (percentage >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent! Outstanding performance!';
    if (percentage >= 80) return 'Great job! Well done!';
    if (percentage >= 70) return 'Good work! Keep it up!';
    if (percentage >= 60) return 'Not bad! Room for improvement.';
    if (percentage >= 40) return 'Keep studying! You can do better next time.';
    return 'Keep studying! You can do better next time.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Results Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-8">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Quiz Complete!
            </h1>
            <p className={`text-xl ${getScoreColor(percentage)} font-semibold mb-2`}>
              {getScoreMessage(percentage)}
            </p>
            <div className="text-sm text-gray-500">
              You answered {score} out of {totalQuestions} questions correctly
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200 transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-700 mb-2">{score}</div>
              <div className="text-sm font-medium text-green-600">Correct Answers</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-xl p-6 border border-red-200 transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-red-700 mb-2">{totalQuestions - score}</div>
              <div className="text-sm font-medium text-red-600">Incorrect Answers</div>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Take Quiz Again
            </span>
          </button>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8 text-center">
            Detailed Results
          </h2>
          <div className="space-y-6">
            {results.map((result, index) => (
              <div
                key={result.questionId}
                className={`border-l-4 p-6 rounded-r-xl shadow-md transition-all duration-200 hover:shadow-lg ${
                  result.isCorrect 
                    ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50' 
                    : 'border-red-500 bg-gradient-to-r from-red-50 to-rose-50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">
                    Question {index + 1}
                  </h3>
                  <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    result.isCorrect
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {result.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </div>
                </div>
                
                <p className="text-gray-800 mb-6 text-lg leading-relaxed">{result.questionText}</p>
                
                <div className="space-y-3">
                  {result.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-4 rounded-xl transition-all duration-200 ${
                        optionIndex === result.correctOption
                          ? 'bg-green-200 text-green-900 font-semibold border-2 border-green-300'
                          : optionIndex === result.selectedOption && !result.isCorrect
                          ? 'bg-red-200 text-red-900 font-semibold border-2 border-red-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 ${
                          optionIndex === result.correctOption
                            ? 'bg-green-500 text-white'
                            : optionIndex === result.selectedOption && !result.isCorrect
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + optionIndex)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {optionIndex === result.correctOption && (
                          <span className="ml-3 text-green-600 text-xl">✓</span>
                        )}
                        {optionIndex === result.selectedOption && !result.isCorrect && (
                          <span className="ml-3 text-red-600 text-xl">✗</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
