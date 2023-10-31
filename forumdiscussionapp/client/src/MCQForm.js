import React, { useState } from 'react';

const MCQForm = ({ onSave }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleSave = () => {
    
    if (question && options.every((opt) => opt !== '') && correctAnswer !== '') {
      onSave({ question, options, correctAnswer });
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
    }
  };

  return (
    <div>
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
