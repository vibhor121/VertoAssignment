import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/database';

interface Answer {
  questionId: number;
  selectedOption: number;
}

interface DbQuestion {
  id: number;
  text: string;
  options: string;
  correct_option: number;
}

export async function POST(request: NextRequest) {
  try {
    const { answers }: { answers: Answer[] } = await request.json();
    
    // Get all questions with correct answers
    const questions = db.prepare('SELECT * FROM questions ORDER BY id').all() as DbQuestion[];
    
    let score = 0;
    const results = answers.map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      const isCorrect = question && answer.selectedOption === question.correct_option;
      
      if (isCorrect) {
        score++;
      }
      
      return {
        questionId: answer.questionId,
        questionText: question?.text || '',
        selectedOption: answer.selectedOption,
        correctOption: question?.correct_option || -1,
        isCorrect,
        options: question?.options ? JSON.parse(question.options) : []
      };
    });
    
    const totalQuestions = answers.length; // Only count the questions that were actually asked
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return NextResponse.json({
      score,
      totalQuestions,
      percentage,
      results
    });
  } catch (error) {
    console.error('Error submitting answers:', error);
    return NextResponse.json({ error: 'Failed to submit answers' }, { status: 500 });
  }
}
