import { useState } from 'react';

function QuestionDisplay({ questionData }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    const handleAnswerChange = (event) => {
        setUserAnswer(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('User Answer:', userAnswer);
        const normalizedUserAnswer = userAnswer.trim().toLowerCase();
        const normalizedCorrectAnswer = questionData.correct_answer.trim().toLowerCase();
        if (normalizedUserAnswer === normalizedCorrectAnswer) {
            setIsCorrect(true);
        }
    };

    return (
        <div>
            <h2 dangerouslySetInnerHTML={{ __html: questionData.question }} />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userAnswer}
                    onChange = {handleAnswerChange}
                    placeholder = "Enter your answer"
                />
                <button type="submit">Submit</button>
            </form>

            {isCorrect !== null && (
                <div style={{ color: isCorrect ? 'green' : 'red' }}>
                    {isCorrect ? 'Correct!' : `WRONG! The correct answer was: ${questionData.correct_answer}`}
                </div>
            )}
        </div>
    )
}

export default QuestionDisplay;