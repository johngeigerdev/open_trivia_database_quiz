import { useState, useEffect } from 'react';

function QuestionDisplay({ questionData }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    useEffect(() => {
        //reset the answer and correctness state when questionData changes
        setUserAnswer('');
        setIsCorrect(null);
    }, [questionData]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('User Answer:', userAnswer);
        const normalizedUserAnswer = userAnswer.trim().toLowerCase();
        const normalizedCorrectAnswer = questionData.correct_answer.trim().toLowerCase();
        setIsCorrect(normalizedUserAnswer === normalizedCorrectAnswer)
    };

   // Combine correct + incorrect answers and shuffle them
   const allAnswers = [...questionData.incorrect_answers, questionData.correct_answer].sort(() => Math.random() - 0.5);


    return (
        <div>
            <h2 dangerouslySetInnerHTML={{ __html: questionData.question }} />
            <form onSubmit={handleSubmit}>
                <select
                    required 
                    id="answer"
                    name="answer"
                    value={userAnswer}
                    onChange = {(event) => setUserAnswer(event.target.value)}
                >
                    <option value = ''> Select and Answer</option>
                    {allAnswers.map((answer, index) => (
                        <option key={index} value={answer}>
                            {answer}
                        </option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>

            {isCorrect !== null && (
                <div style={{ color: isCorrect ? 'green' : 'red' }}>
                    {isCorrect ? 'Correct!' : `WRONG! The correct answer is: ${questionData.correct_answer}`}
                </div>
            )}
        </div>
    )
}

export default QuestionDisplay;