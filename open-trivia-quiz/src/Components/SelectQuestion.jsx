import { useState } from 'react';
import DisplayQuestions from './DisplayQuestions';

function SelectQuestion() {
    const [user, setUser] = useState ('');
    const [question, setQuestion] = useState ('');
    const [error, setError] = useState ('');
    const [success, setSuccess] = useState (false);

    // handle user change
    const handleUserChange = (event) => {
        setUser(event.target.value);
    };
    //handle question selection
    const handleQuestionChange = (event) => {
        setBody(event.target.value);
    }

    //form validation
    const validateForm = () => {
        if (user.trim() === '' || question() === '') {
            alert('You must enter your name and select a question');
            return false;
        }
        setError('');
        return true;
    }
    //handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); //this prevents the default page reload on submit
        if (!validateForm()) {
            return; //if the form is not valid, return
        }
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10', {
                method: 'GET',
                user: user,
                question: question,
                // No need to use JSON.stringify here as the API call is a GET request and does not require a body.
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },

            });
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }

            const data = await response.json();
            console.log(data);

            setUser ('');  //reset user field
            setQuestion ('');  //reset question field
            //success message will return the new form
            setSuccess({DisplayQuestions: true});
        }  catch (error) {
            console.error('Error:', error);
            setError('Failed to fetch questions');
        }
    }
    
}

export default SelectQuestion;