import React, { useState, useEffect } from 'react';
import './mcqanswerform.css';
import axios from 'axios';

const MCQAnswerForm = ({ onAnswer, userRole, userId, enrolledCourses }) => {
  const isStudent = userRole === 'Student';

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (isStudent) {
      // Create an array of course IDs from enrolledCourses
      const courseIds = enrolledCourses.map(course => course.CourseID);

      // Fetch MCQ questions for the enrolled courses
      axios.get(`/mcqanswerform/mcqanswerform/questions/get/${courseIds.join(',')}`)
        .then((response) => {
          const mcqData = response.data;
          setQuestions(mcqData);
          // Start with the first question
          setCurrentQuestionIndex(0);
        })
        .catch((error) => {
          console.error('Error fetching MCQ questions:', error);
        });
    }
  }, [isStudent, enrolledCourses]);

  const handleAnswer = () => {
    if (isStudent && selectedOption !== '') {
      const answerData = {
        question: questions[currentQuestionIndex].Question,
        selectedOption: selectedOption,
        userId: userId,
      };

      // Submit the answer to the backend
      axios.post('/mcqanswerform/mcqanswerform/submitanswers', answerData)
        .then(() => {
          onAnswer(answerData);
          // Move to the next question
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          // If you reach the end of questions, you can reset or handle it as needed
        })
        .catch((error) => {
          console.error('Error submitting MCQ answer:', error);
        });
    }
  };

  if (isStudent && questions.length > 0 && currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div className="mcq-answer-form-container">
        <p>{currentQuestion.Question}</p>
        <form>
          {currentQuestion.options.map((opt, index) => (
            <label key={index}>
              <input
                type="radio"
                name="mcqOption"
                value={opt.OptionText}
                checked={selectedOption === opt.OptionText}
                onChange={() => setSelectedOption(opt.OptionText)}
              />
              {opt.OptionText}
            </label>
          ))}
        </form>
        <button onClick={handleAnswer}>Submit Answer</button>
      </div>
    );
  } else {
    // Handle when there are no questions left or other scenarios
    return <p>No questions available.</p>;
  }
};

export default MCQAnswerForm;
