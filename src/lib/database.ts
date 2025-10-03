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

// Seed data - 50 diverse questions
const questions = [
  // Geography & World Knowledge
  {
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct_option: 2
  },
  {
    text: "Which is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correct_option: 2
  },
  {
    text: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "Liechtenstein", "San Marino"],
    correct_option: 1
  },
  {
    text: "Which continent is known as the 'Dark Continent'?",
    options: ["Asia", "Africa", "Antarctica", "South America"],
    correct_option: 1
  },
  {
    text: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
    correct_option: 1
  },

  // Science & Technology
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
    text: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correct_option: 2
  },
  {
    text: "What is the speed of light in vacuum?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correct_option: 0
  },
  {
    text: "Which gas makes up most of Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    correct_option: 2
  },
  {
    text: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correct_option: 2
  },
  {
    text: "Which planet is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct_option: 1
  },
  {
    text: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Computer Program Unit"],
    correct_option: 0
  },
  {
    text: "What is the pH of pure water?",
    options: ["6", "7", "8", "9"],
    correct_option: 1
  },
  {
    text: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
    correct_option: 1
  },

  // History & Culture
  {
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct_option: 2
  },
  {
    text: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correct_option: 1
  },
  {
    text: "Who was the first person to walk on the moon?",
    options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
    correct_option: 1
  },
  {
    text: "Which ancient wonder of the world was located in Egypt?",
    options: ["Hanging Gardens", "Colossus of Rhodes", "Great Pyramid", "Lighthouse of Alexandria"],
    correct_option: 2
  },
  {
    text: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    correct_option: 1
  },
  {
    text: "Which empire was ruled by Julius Caesar?",
    options: ["Greek", "Roman", "Persian", "Egyptian"],
    correct_option: 1
  },
  {
    text: "In which country was the Renaissance period most prominent?",
    options: ["France", "Germany", "Italy", "Spain"],
    correct_option: 2
  },
  {
    text: "Who discovered America in 1492?",
    options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Amerigo Vespucci"],
    correct_option: 1
  },
  {
    text: "Which war was fought between 1950-1953?",
    options: ["Vietnam War", "Korean War", "Cold War", "Gulf War"],
    correct_option: 1
  },
  {
    text: "Who composed 'The Four Seasons'?",
    options: ["Bach", "Mozart", "Vivaldi", "Beethoven"],
    correct_option: 2
  },

  // Sports & Entertainment
  {
    text: "How many players are on a basketball team on the court at one time?",
    options: ["4", "5", "6", "7"],
    correct_option: 1
  },
  {
    text: "Which sport is played at Wimbledon?",
    options: ["Golf", "Tennis", "Cricket", "Rugby"],
    correct_option: 1
  },
  {
    text: "In which year was the first FIFA World Cup held?",
    options: ["1928", "1930", "1932", "1934"],
    correct_option: 1
  },
  {
    text: "Which movie won the Academy Award for Best Picture in 1994?",
    options: ["Forrest Gump", "Pulp Fiction", "The Lion King", "Speed"],
    correct_option: 0
  },
  {
    text: "Who directed the movie 'Inception'?",
    options: ["Steven Spielberg", "Christopher Nolan", "Martin Scorsese", "Quentin Tarantino"],
    correct_option: 1
  },
  {
    text: "Which band released the album 'Abbey Road'?",
    options: ["The Rolling Stones", "The Beatles", "Led Zeppelin", "Pink Floyd"],
    correct_option: 1
  },
  {
    text: "How many rings are in the Olympic symbol?",
    options: ["4", "5", "6", "7"],
    correct_option: 1
  },
  {
    text: "Which country hosted the 2016 Summer Olympics?",
    options: ["Japan", "Brazil", "Russia", "China"],
    correct_option: 1
  },
  {
    text: "Who played Jack in the movie 'Titanic'?",
    options: ["Brad Pitt", "Tom Cruise", "Leonardo DiCaprio", "Matt Damon"],
    correct_option: 2
  },
  {
    text: "Which sport uses a shuttlecock?",
    options: ["Tennis", "Badminton", "Squash", "Table Tennis"],
    correct_option: 1
  },

  // Mathematics & Logic
  {
    text: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    correct_option: 1
  },
  {
    text: "What is the square root of 144?",
    options: ["11", "12", "13", "14"],
    correct_option: 1
  },
  {
    text: "If a triangle has angles of 60°, 60°, and 60°, what type of triangle is it?",
    options: ["Right", "Isosceles", "Equilateral", "Scalene"],
    correct_option: 2
  },
  {
    text: "What is the value of π (pi) to two decimal places?",
    options: ["3.14", "3.15", "3.16", "3.17"],
    correct_option: 0
  },
  {
    text: "What is 7 × 8?",
    options: ["54", "56", "58", "60"],
    correct_option: 1
  },
  {
    text: "What is the next number in the sequence: 2, 4, 8, 16, ?",
    options: ["24", "32", "28", "20"],
    correct_option: 1
  },
  {
    text: "What is the area of a circle with radius 5? (Use π = 3.14)",
    options: ["78.5", "31.4", "15.7", "62.8"],
    correct_option: 0
  },
  {
    text: "What is 2 to the power of 4?",
    options: ["8", "16", "32", "64"],
    correct_option: 1
  },
  {
    text: "What is the sum of angles in a triangle?",
    options: ["90°", "180°", "270°", "360°"],
    correct_option: 1
  },
  {
    text: "What is 0.5 expressed as a fraction?",
    options: ["1/4", "1/2", "1/3", "2/3"],
    correct_option: 1
  },

  // Literature & Language
  {
    text: "Which language has the most native speakers?",
    options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
    correct_option: 2
  },
  {
    text: "Who wrote '1984'?",
    options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
    correct_option: 1
  },
  {
    text: "What is the plural of 'mouse'?",
    options: ["Mouses", "Mice", "Mouse", "Mices"],
    correct_option: 1
  },
  {
    text: "Which novel begins with 'It was the best of times, it was the worst of times'?",
    options: ["Great Expectations", "A Tale of Two Cities", "Oliver Twist", "David Copperfield"],
    correct_option: 1
  },
  {
    text: "How many letters are in the English alphabet?",
    options: ["24", "25", "26", "27"],
    correct_option: 2
  },
  {
    text: "Who wrote 'The Great Gatsby'?",
    options: ["Ernest Hemingway", "F. Scott Fitzgerald", "Mark Twain", "John Steinbeck"],
    correct_option: 1
  },
  {
    text: "What is the study of word origins called?",
    options: ["Syntax", "Etymology", "Phonetics", "Semantics"],
    correct_option: 1
  },
  {
    text: "Which is the longest word in the English language?",
    options: ["Supercalifragilisticexpialidocious", "Pneumonoultramicroscopicsilicovolcanoconiosis", "Antidisestablishmentarianism", "Floccinaucinihilipilification"],
    correct_option: 1
  },
  {
    text: "Who wrote 'Pride and Prejudice'?",
    options: ["Charlotte Brontë", "Emily Brontë", "Jane Austen", "Virginia Woolf"],
    correct_option: 2
  },
  {
    text: "What is the opposite of 'synonym'?",
    options: ["Homonym", "Antonym", "Acronym", "Pseudonym"],
    correct_option: 1
  },

  // Food & Cooking
  {
    text: "Which country is known for inventing pizza?",
    options: ["France", "Italy", "Spain", "Greece"],
    correct_option: 1
  },
  {
    text: "What is the main ingredient in hummus?",
    options: ["Lentils", "Chickpeas", "Black beans", "Soybeans"],
    correct_option: 1
  },
  {
    text: "Which spice comes from the bark of a tree?",
    options: ["Pepper", "Cinnamon", "Ginger", "Turmeric"],
    correct_option: 1
  },
  {
    text: "What is the primary ingredient in traditional Japanese miso soup?",
    options: ["Seaweed", "Soybeans", "Rice", "Fish"],
    correct_option: 1
  },
  {
    text: "Which fruit is known as the 'king of fruits'?",
    options: ["Apple", "Mango", "Banana", "Orange"],
    correct_option: 1
  }
];

// Clear existing questions and insert new 50 questions
db.prepare('DELETE FROM questions').run();

const insertQuestion = db.prepare(`
  INSERT INTO questions (text, options, correct_option)
  VALUES (?, ?, ?)
`);

questions.forEach(question => {
  insertQuestion.run(question.text, JSON.stringify(question.options), question.correct_option);
});

export default db;
