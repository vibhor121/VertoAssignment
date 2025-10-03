import { NextResponse } from 'next/server';
import db from '@/lib/database';

interface DbQuestion {
  id: number;
  text: string;
  options: string;
}

export async function GET() {
  try {
    const questions = db.prepare('SELECT id, text, options FROM questions ORDER BY id').all() as DbQuestion[];
    
    // Parse options JSON and remove correct answers for security
    const questionsWithoutAnswers = questions.map((q) => ({
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
