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
    return 'Keep studying! You can do better next time.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Results Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
            <p className={`text-lg ${getScoreColor(percentage)} font-semibold`}>
              {getScoreMessage(percentage)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">{score}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">{totalQuestions - score}</div>
              <div className="text-sm text-gray-600">Incorrect Answers</div>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Take Quiz Again
          </button>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Results</h2>
          <div className="space-y-6">
            {results.map((result, index) => (
              <div
                key={result.questionId}
                className={`border-l-4 p-4 rounded-r-lg ${
                  result.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">
                    Question {index + 1}
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.isCorrect
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.isCorrect ? 'Correct' : 'Incorrect'}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{result.questionText}</p>
                
                <div className="space-y-2">
                  {result.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-3 rounded-lg ${
                        optionIndex === result.correctOption
                          ? 'bg-green-200 text-green-900 font-medium'
                          : optionIndex === result.selectedOption && !result.isCorrect
                          ? 'bg-red-200 text-red-900 font-medium'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm font-medium mr-3">
                          {String.fromCharCode(65 + optionIndex)}
                        </span>
                        {option}
                        {optionIndex === result.correctOption && (
                          <span className="ml-2 text-green-600">✓</span>
                        )}
                        {optionIndex === result.selectedOption && !result.isCorrect && (
                          <span className="ml-2 text-red-600">✗</span>
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
