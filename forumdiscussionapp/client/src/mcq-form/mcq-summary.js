import React from 'react';

const MCQSummary = ({ questions, answers }) => {
  return (
    <div className="mcq-summary-container">
      <h2>Summary of Answers</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <div className='flex'>
            <div className="flex">
            <strong>Question {index + 1}:</strong> {question.Question}
            </div>
            <div className="flex">
            <strong>Correct Answer:</strong> {question.CorrectAnswer}
            </div>
            <div className="flex">
            <strong>Your Answer:</strong> {answers[index] || 'Not answered'}
            </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MCQSummary;
