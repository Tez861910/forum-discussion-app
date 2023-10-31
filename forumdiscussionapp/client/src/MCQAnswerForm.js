import React, { useState } from 'react';

const MCQAnswerForm = ({ question, options, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleAnswer = () => {
    if (selectedOption !== '') {
      onAnswer(selectedOption);
    }
  };

  return (
    <div>
      <h3>MCQ Question</h3>
      <p>{question}</p>
      <form>
        {options.map((opt, index) => (
          <label key={index}>
            <input
              type="radio"
              name="mcqOption"
              value={opt}
              checked={selectedOption === opt}
              onChange={() => setSelectedOption(opt)}
            />
            {opt}
          </label>
        ))}
      </form>
      <button onClick={handleAnswer}>Submit Answer</button>
    </div>
  );
};

export default MCQAnswerForm;
