import { useState } from 'react';
import QuestionAnswerForm from './QuestionAnswerForm'; // Assuming this is your component

function SelectQuestion() {
    const [user, setUser] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [category, setCategory] = useState('');
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

    const categories = [
        { id: 9, name: "General Knowledge" },
        { id: 17, name: "Science & Nature" },
        { id: 21, name: "Sports" },
        { id: 23, name: "History" },
        { id: 22, name: "Geography" },
        { id: 24, name: "Politics" },
        { id: 20, name: "Mythology" },
        { id: 18, name: "Computers" },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user.trim() === '' || !category) {
            setError('Please enter your name and select a category');
            return;
        }
        try {
            const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
            const response = await fetch(url);
            const data = await response.json();
            setQuestions(data.results);
            setSuccess(true);
            setError('');
            setSelectedQuestionIndex(null); // Reset on new fetch
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to fetch questions');
        }
    };

    const handleQuestionSelect = (e) => {
        setSelectedQuestionIndex(parseInt(e.target.value));
    };

    return (
        <div>
            <h1>Open Trivia Quiz</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="user">Enter your name:</label>
                <input
                    type="text"
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Enter your name"
                />

                <label htmlFor="category">Select Category:</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="difficulty">Difficulty:</label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <button type="submit">Fetch Questions</button>
            </form>

            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>Questions fetched successfully!</div>}

            {questions.length > 0 && (
                <>
                    <label>Select a question:</label>
                    <select onChange={handleQuestionSelect} defaultValue="">
                        <option value="" disabled>Select a question</option>
                        {questions.map((q, index) => (
                            <option key={index} value={index}>
                                {q.question.length > 80
                                    ? q.question.slice(0, 80) + '...'
                                    : q.question}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {selectedQuestionIndex !== null && (
                <QuestionAnswerForm questionData={questions[selectedQuestionIndex]} />
            )}
        </div>
    );
}

export default SelectQuestion;