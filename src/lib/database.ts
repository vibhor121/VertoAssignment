import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'quiz.db');
const db = new Database(dbPath);

// Create questions table
db.exec(`
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    options TEXT NOT NULL, -- JSON array of options
    correct_option INTEGER NOT NULL, -- index of correct option (0-based)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Seed data
const questions = [
  {
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct_option: 2
  },
  {
    text: "Which programming language is known for its use in web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    correct_option: 1
  },
  {
    text: "What is the largest planet in our solar system?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    correct_option: 2
  },
  {
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct_option: 2
  },
  {
    text: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correct_option: 2
  }
];

// Insert seed data if table is empty
const count = db.prepare('SELECT COUNT(*) as count FROM questions').get() as { count: number };
if (count.count === 0) {
  const insertQuestion = db.prepare(`
    INSERT INTO questions (text, options, correct_option)
    VALUES (?, ?, ?)
  `);
  
  questions.forEach(question => {
    insertQuestion.run(question.text, JSON.stringify(question.options), question.correct_option);
  });
}

export default db;
