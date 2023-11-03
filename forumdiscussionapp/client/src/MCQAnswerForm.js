import React, { useState, useEffect } from 'react';
import './mcqanswerform.css';
import axios from 'axios';
import MCQSummary from './MCQSummary'; 

const MCQAnswerForm = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [answers, setAnswers] = useState([]); 

  const onAnswer = (answerData) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answerData.selectedOption;
    setAnswers(updatedAnswers);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const courseId = localStorage.getItem('courseId');
        if (!courseId) {
          console.error('Course ID not found in local storage');
          return;
        }

        const response = await axios.get(`http://localhost:8081/mcqanswerform/mcqanswerform/questions/get/${courseId}`);
        const mcqData = response.data;
        console.log('API Response:', mcqData);
        setQuestions(mcqData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching MCQ questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = () => {
    if (selectedOption !== '') {
      const answerData = {
        question: questions[currentQuestionIndex].Question,
        selectedOption,
        userId: localStorage.getItem('userId'),
      };

      axios
        .post('http://localhost:8081/mcqanswerform/mcqanswerform/submitanswers', answerData)
        .then(() => {
          onAnswer(answerData);
          if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          } else {
            setAllQuestionsAnswered(true);
          }
          setSelectedOption('');
        })
        .catch((error) => {
          console.error('Error submitting MCQ answer:', error);
        });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (allQuestionsAnswered) {
    return <MCQSummary questions={questions} answers={answers} />;
  }

  if (questions.length > 0 && currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div className="mcq-answer-form-container">
        <p>{currentQuestion.Question}</p>
        <form>
          {currentQuestion.options && currentQuestion.options.length > 0 ? (
            currentQuestion.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="mcqOption"
                  value={option.MCQOption}
                  checked={selectedOption === option.MCQOption}
                  onChange={() => setSelectedOption(option.MCQOption)}
                />
                {option.MCQOption}
              </label>
            ))
          ) : (
            <p>No MCQ options available for this question.</p>
          )}
        </form>
        <button onClick={handleAnswer}>Submit Answer</button>
      </div>
    );
  } else {
    return <p>No questions available or all questions answered.</p>;
  }
};

export default MCQAnswerForm;
