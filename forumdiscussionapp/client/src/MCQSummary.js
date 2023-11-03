import React from 'react';

const MCQSummary = ({ questions, answers }) => {
  return (
    <div className="mcq-summary-container">
      <h2>Summary of Answers</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <strong>Question {index + 1}:</strong> {question.Question}
            <br />
            <strong>Correct Answer:</strong> {question.CorrectAnswer}
            <br />
            <strong>Your Answer:</strong> {answers[index] || 'Not answered'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MCQSummary;
