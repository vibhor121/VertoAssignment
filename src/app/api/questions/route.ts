import { NextResponse } from 'next/server';
import db from '@/lib/database';

interface DbQuestion {
  id: number;
  text: string;
  options: string;
}

export async function GET() {
  try {
    // Get all questions from database
    const allQuestions = db.prepare('SELECT id, text, options FROM questions').all() as DbQuestion[];
    
    // Randomly select 5 questions
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 5);
    
    // Parse options JSON and remove correct answers for security
    const questionsWithoutAnswers = selectedQuestions.map((q) => ({
      id: q.id,
      text: q.text,
      options: JSON.parse(q.options)
    }));
    
    return NextResponse.json(questionsWithoutAnswers);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
