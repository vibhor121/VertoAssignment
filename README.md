# Quiz Application

A full-stack quiz application built with Next.js, featuring a modern UI and comprehensive functionality.

## Features

### Core Features
- **Backend:**
  - SQLite database with pre-seeded quiz questions
  - API endpoint to fetch questions (without correct answers)
  - API endpoint to submit answers and calculate scores
  - Secure scoring logic that doesn't expose correct answers

- **Frontend:**
  - Start page with quiz information
  - Question-by-question navigation with Next/Previous buttons
  - Submit functionality on the final question
  - Results page showing detailed score breakdown

### Bonus Features ✨
- **Timer:** 5-minute countdown timer for the quiz
- **Detailed Results:** Shows which questions were answered correctly/incorrectly
- **Test Cases:** Comprehensive backend tests for scoring logic
- **Modern UI:** Beautiful, responsive design with Tailwind CSS
- **State Management:** React Context for managing quiz state

## Technology Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** SQLite with better-sqlite3
- **Testing:** Jest
- **State Management:** React Context API

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd verto
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
npm test
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── questions/route.ts    # Fetch questions endpoint
│   │   └── submit/route.ts       # Submit answers endpoint
│   └── page.tsx                  # Main application page
├── components/
│   ├── Quiz.tsx                  # Main quiz orchestrator
│   ├── QuizStart.tsx             # Start page component
│   ├── QuizQuestion.tsx          # Question display component
│   └── QuizResults.tsx           # Results display component
├── context/
│   └── QuizContext.tsx           # React Context for state management
├── lib/
│   └── database.ts               # Database setup and configuration
├── types/
│   └── quiz.ts                   # TypeScript type definitions
└── __tests__/
    └── scoring-simple.test.ts    # Backend scoring logic tests
```

## API Endpoints

### GET /api/questions
Fetches all quiz questions without exposing correct answers.

**Response:**
```json
[
  {
    "id": 1,
    "text": "What is the capital of France?",
    "options": ["London", "Berlin", "Paris", "Madrid"]
  }
]
```

### POST /api/submit
Submits user answers and returns scoring results.

**Request:**
```json
{
  "answers": [
    {
      "questionId": 1,
      "selectedOption": 2
    }
  ]
}
```

**Response:**
```json
{
  "score": 1,
  "totalQuestions": 5,
  "percentage": 20,
  "results": [
    {
      "questionId": 1,
      "questionText": "What is the capital of France?",
      "selectedOption": 2,
      "correctOption": 2,
      "isCorrect": true,
      "options": ["London", "Berlin", "Paris", "Madrid"]
    }
  ]
}
```

## Database Schema

The application uses SQLite with the following schema:

```sql
CREATE TABLE questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  options TEXT NOT NULL, -- JSON array of options
  correct_option INTEGER NOT NULL, -- index of correct option (0-based)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Features in Detail

### Timer Functionality
- 5-minute countdown timer
- Visual warning when time is running low
- Timer stops when quiz is completed

### Navigation
- Previous/Next buttons for question navigation
- Progress bar showing current question position
- Submit button appears only on the final question

### Results Display
- Overall score and percentage
- Detailed breakdown of each question
- Visual indicators for correct/incorrect answers
- Option to restart the quiz

### State Management
- React Context API for global state
- Persistent answers during navigation
- Automatic timer management
- Quiz flow state tracking

## Testing

The application includes comprehensive tests for the scoring logic:

- All correct answers scenario
- Mixed correct/incorrect answers
- All incorrect answers scenario
- Partial answers handling

Run tests with:
```bash
npm test
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.