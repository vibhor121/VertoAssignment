import { QuizProvider } from '@/context/QuizContext';
import Quiz from '@/components/Quiz';

export default function Home() {
  return (
    <QuizProvider>
      <Quiz />
    </QuizProvider>
  );
}
