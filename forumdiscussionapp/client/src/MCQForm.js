import React, { useState } from 'react';
import './mcqform.css';
import axios from 'axios'; 

const MCQForm = ({ onSave }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleSave = () => {
    if (question && options.every((opt) => opt !== '') && correctAnswer !== '') {

      const mcqData = {
        question,
        options,
        correctAnswer,
      };

      
      axios.post('/mcqform/mcqform/save', mcqData)
        .then((_response) => {
         
          onSave(mcqData); 
          setQuestion('');
          setOptions(['', '', '', '']);
          setCorrectAnswer('');
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
        type="number"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default MCQForm;
