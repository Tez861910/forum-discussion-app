import React, { useState } from 'react';
import './mcqform.css';
import axios from 'axios';

const MCQForm = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const courseId = localStorage.getItem('courseId');
  const createdbyuserId = localStorage.getItem('userId');

  const onSave = (mcqData) => {
    // Define what you want to do with the saved data here
    console.log('MCQ Data Saved:', mcqData);
  };

  const handleSave = () => {
    if (question && options.every((opt) => opt !== '') && correctAnswer !== '') {
      const mcqData = {
        question,
        options,
        correctAnswer,
        courseId,
        createdbyuserId,
      };

      axios
        .post('http://localhost:8081/mcqform/mcqform/save', mcqData)
        .then((response) => {
          if (response.data.success) {
            // Call the onSave function with the saved data
            onSave(mcqData);

            // Reset the form fields
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
          } else {
            console.error('Error saving MCQ data:', response.data.error);
          }
        })
        .catch((error) => {
          console.error('Error saving MCQ data:', error);
        });
    }
  };

  return (
    <div className="mcq-form-container">
      <h3>Create MCQ Question</h3>
      <label>Question: </label>
      <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
      <br />
      <label>Options:</label>
      <ol>
        {options.map((opt, index) => (
          <li key={index}>
            <input
              type="text"
              value={opt}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
            />
          </li>
        ))}
      </ol>
      <label>Correct Answer: </label>
      <input
        type="text"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default MCQForm;
