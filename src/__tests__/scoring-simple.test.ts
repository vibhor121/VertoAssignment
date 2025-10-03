// Simple scoring logic test without complex mocking
describe('Quiz Scoring Logic', () => {
  // Mock scoring function
  const calculateScore = (answers: Array<{questionId: number, selectedOption: number}>, questions: Array<{id: number, correct_option: number}>) => {
    let score = 0;
    const results = answers.map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      const isCorrect = question && answer.selectedOption === question.correct_option;
      
      if (isCorrect) {
        score++;
      }
      
      return {
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        correctOption: question?.correct_option || -1,
        isCorrect,
      };
    });
    
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return {
      score,
      totalQuestions,
      percentage,
      results
    };
  };

  const mockQuestions = [
    { id: 1, correct_option: 2 },
    { id: 2, correct_option: 1 },
    { id: 3, correct_option: 2 }
  ];

  it('should calculate correct score for all correct answers', () => {
    const answers = [
      { questionId: 1, selectedOption: 2 },
      { questionId: 2, selectedOption: 1 },
      { questionId: 3, selectedOption: 2 }
    ];

    const result = calculateScore(answers, mockQuestions);

    expect(result.score).toBe(3);
    expect(result.totalQuestions).toBe(3);
    expect(result.percentage).toBe(100);
    expect(result.results).toHaveLength(3);
    expect(result.results.every(r => r.isCorrect)).toBe(true);
  });

  it('should calculate correct score for mixed answers', () => {
    const answers = [
      { questionId: 1, selectedOption: 2 }, // correct
      { questionId: 2, selectedOption: 0 }, // incorrect
      { questionId: 3, selectedOption: 2 }  // correct
    ];

    const result = calculateScore(answers, mockQuestions);

    expect(result.score).toBe(2);
    expect(result.totalQuestions).toBe(3);
    expect(result.percentage).toBe(67);
    expect(result.results).toHaveLength(3);
    expect(result.results[0].isCorrect).toBe(true);
    expect(result.results[1].isCorrect).toBe(false);
    expect(result.results[2].isCorrect).toBe(true);
  });

  it('should calculate correct score for all incorrect answers', () => {
    const answers = [
      { questionId: 1, selectedOption: 0 },
      { questionId: 2, selectedOption: 0 },
      { questionId: 3, selectedOption: 0 }
    ];

    const result = calculateScore(answers, mockQuestions);

    expect(result.score).toBe(0);
    expect(result.totalQuestions).toBe(3);
    expect(result.percentage).toBe(0);
    expect(result.results).toHaveLength(3);
    expect(result.results.every(r => !r.isCorrect)).toBe(true);
  });

  it('should handle partial answers', () => {
    const answers = [
      { questionId: 1, selectedOption: 2 },
      { questionId: 3, selectedOption: 2 }
      // Missing answer for question 2
    ];

    const result = calculateScore(answers, mockQuestions);

    expect(result.score).toBe(2);
    expect(result.totalQuestions).toBe(3);
    expect(result.percentage).toBe(67);
    expect(result.results).toHaveLength(2);
  });
});
