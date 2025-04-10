import { useState } from 'react';
import QuestionDisplay from './QuestionDisplay'; // Importing the QuestionDisplay component
import { decode } from 'html-entities'; // Importing the decode function from html-entities to decode HTML entities in the question text
// This component allows the user to select a trivia question type and fetch questions from the Open Trivia Database API without special HTML symbols

function SelectQuestionType() {
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
        // Below is validating that the user input is not empty and that a category is selected
        
        try {
            const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
            const response = await fetch(url);
            const data = await response.json();
            setQuestions(data.results);
            setSuccess(true);
            setError('');
            //these 4 lines below are resetting the form back to blank/default after the form is submitted
            setSelectedQuestionIndex(null);
            setCategory('');
            setDifficulty('easy'); 
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to fetch questions');
        }
    };

    const handleQuestionSelect = (event) => {
        setSelectedQuestionIndex(parseInt(event.target.value));  //parseInt here is converting the string value of the index to an integer
    };
    
    //this resets the form after they click the 'start over' button
    const handleReset = () => {
        setUser('');
        setDifficulty('easy')
        setCategory('');
        setQuestions([]);
        setError('');
        setSuccess(false);
        setSelectedQuestionIndex(null);
    };


    return (
        <div>
            <h1>Open Trivia Quiz</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="user">Enter your name:</label>
                <input
                    required // This ensures the field must be filled and eliminates the need for a seperate validation code
                    type="text"
                    id="user"
                    value={user}
                    onChange={(event) => setUser(event.target.value)}
                    placeholder="Enter your name"
                />

                <label htmlFor="category">Select Category:</label>
                <select
                    required //ensures this is filled
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
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
                    onChange={(event) => setDifficulty(event.target.value)}
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
                                {/* the below line 'truncates' the questions to 80 characters and adds '...' if the question is longer than 80 characters */}
                                {decode(q.question.length > 80 ? q.question.slice(0, 80) + '...' : q.question)} 
                                {/* the 'decode' here is going to get all of those &#039; symols converted to the correct symbols */}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {/* Button to reset going into it's own check to ensure it only shows if a question selected */}
            {selectedQuestionIndex !== null && (
                <button onClick={handleReset}>Start Over</button>
            )}

            {selectedQuestionIndex !== null && (
                <QuestionDisplay questionData={questions[selectedQuestionIndex]}
                user={user} // this is passing the user data as a prop to the QuestionDisplay component
                />  //once the question is selected, it pass the questionData prop to the QuestionDisplay component
                //we need to do this so that the user name is available in the QuestionDisplay.jsx component to display their name when 
                //stating if they got the question right or not
            )}
        </div>
    );
}

export default SelectQuestionType;