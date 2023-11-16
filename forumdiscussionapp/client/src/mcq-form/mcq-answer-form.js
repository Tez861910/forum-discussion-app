import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MCQSummary from './mcq-summary';
import { Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

const MCQAnswerForm = ({ courseId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/mcqanswerform/mcqanswerform/questions/get/${courseId}`);
        setQuestions(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching MCQ questions:', error);
      }
    };

    fetchQuestions();
  }, [courseId]);

  const handleAnswer = () => {
    const selectedQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedQuestion.CorrectAnswer === selectedOption;

    const answer = {
      question: selectedQuestion.Question,
      selectedOption: selectedOption,
      isCorrect: isCorrect,
    };

    setAnswers([...answers, answer]);

    if (currentQuestionIndex === questions.length - 1) {
      setAllQuestionsAnswered(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    }
  };

  return (
    <div className="mcq-answer-form-container">
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : allQuestionsAnswered ? (
        <MCQSummary questions={questions} answers={answers} />
      ) : questions.length > 0 && currentQuestionIndex < questions.length ? (
        <div>
          <Typography variant="h3">{questions[currentQuestionIndex].Question}</Typography>
          <FormControl component="fieldset">
            <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              {questions[currentQuestionIndex].options && questions[currentQuestionIndex].options.length > 0 ? (
                questions[currentQuestionIndex].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option.MCQOption}
                    control={<Radio />}
                    label={option.MCQOption}
                  />
                ))
              ) : (
                <Typography>No MCQ options available for this question.</Typography>
              )}
            </RadioGroup>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleAnswer}>
            Submit Answer
          </Button>
        </div>
      ) : (
        <Typography>No questions available or all questions answered.</Typography>
      )}
    </div>
  );
};

export default MCQAnswerForm;
