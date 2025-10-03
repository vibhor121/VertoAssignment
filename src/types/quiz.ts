export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface Answer {
  questionId: number;
  selectedOption: number;
}

export interface QuizResult {
  questionId: number;
  questionText: string;
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
  options: string[];
}

export interface QuizResponse {
  score: number;
  totalQuestions: number;
  percentage: number;
  results: QuizResult[];
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  isQuizStarted: boolean;
  isQuizCompleted: boolean;
  results: QuizResponse | null;
  timeRemaining: number;
}
