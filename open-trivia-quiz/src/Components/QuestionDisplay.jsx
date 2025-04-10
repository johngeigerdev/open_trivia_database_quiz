import { useState, useEffect } from 'react';
import { decode } from 'html-entities'

function QuestionDisplay({ questionData, user }) {
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



   // Combine correct + incorrect answers and shuffle them so they are displayed randomly
   const allAnswers = [...questionData.incorrect_answers, questionData.correct_answer].sort(() => Math.random() - 0.5);


    return (
        <div>
            <h2 dangerouslySetInnerHTML={{ __html: questionData.question }} />
            <form onSubmit={handleSubmit}>
                <select
                    required
                    disabled = {isCorrect !== null} // This locks the user's choice in when they click submit, they can't change it afterwards
                    id="answer"
                    name="answer"
                    value={userAnswer}
                    onChange = {(event) => setUserAnswer(event.target.value)}
                >
                    <option value = ''> Select an Answer</option>
                    {allAnswers.map((answer, index) => (
                        <option key={index} value={answer}>
                            {answer}
                        </option>
                    ))}
                </select>
                <button type="submit" disabled={isCorrect !== null}>Submit</button>
            </form>

            {isCorrect !== null && (
                <>
                    <p>
                    {isCorrect ?
                        `Great job ${user}! That is correct!` :
                        `Sorry ${user}, that is incorrect!`
                    }
                </p>
                {!isCorrect && (
                    <p>
                        The correct answer was: <strong>{decode(questionData.correct_answer)}</strong>.
                    </p>
                )}
                </>
                
            )}
        </div>
    )
}

export default QuestionDisplay;