'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { QuizState, Question, Answer, QuizResponse } from '@/types/quiz';

type QuizAction =
  | { type: 'SET_QUESTIONS'; payload: Question[] }
  | { type: 'START_QUIZ' }
  | { type: 'SET_ANSWER'; payload: Answer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'SUBMIT_QUIZ'; payload: QuizResponse }
  | { type: 'RESET_QUIZ' }
  | { type: 'UPDATE_TIMER' };

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  isQuizStarted: false,
  isQuizCompleted: false,
  results: null,
  timeRemaining: 300, // 5 minutes in seconds
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'START_QUIZ':
      return { ...state, isQuizStarted: true, timeRemaining: 300 };
    case 'SET_ANSWER':
      const existingAnswerIndex = state.answers.findIndex(
        answer => answer.questionId === action.payload.questionId
      );
      const newAnswers = [...state.answers];
      if (existingAnswerIndex >= 0) {
        newAnswers[existingAnswerIndex] = action.payload;
      } else {
        newAnswers.push(action.payload);
      }
      return { ...state, answers: newAnswers };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.questions.length - 1
        ),
      };
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    case 'SUBMIT_QUIZ':
      return {
        ...state,
        isQuizCompleted: true,
        results: action.payload,
      };
    case 'RESET_QUIZ':
      return initialState;
    case 'UPDATE_TIMER':
      return { ...state, timeRemaining: Math.max(0, state.timeRemaining - 1) };
    default:
      return state;
  }
}

const QuizContext = createContext<{
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
} | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Timer effect
  useEffect(() => {
    if (state.isQuizStarted && !state.isQuizCompleted && state.timeRemaining > 0) {
      const timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state.isQuizStarted, state.isQuizCompleted, state.timeRemaining]);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
