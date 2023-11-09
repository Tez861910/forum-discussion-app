import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Button, TextField, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './mcq-form.css'; 

const MCQForm = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const courseId = localStorage.getItem('courseId');
  const createdbyuserId = localStorage.getItem('userId');

  const navigate = useNavigate();

  const onSave = (mcqData) => {
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
            onSave(mcqData);

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

  const handleCancel = () => {
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="mcq-form-container">
      <Typography variant="h4" className="heading">
        Create MCQ Question
      </Typography>
      <TextField
        label="Question"
        fullWidth
        variant="outlined"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="input"
      />
      <Typography variant="h6" gutterBottom className="sub-heading">
        Options:
      </Typography>
      <List>
        {options.map((opt, index) => (
          <ListItem key={index} className="list-item">
            <TextField
              label={`Option ${index + 1}`}
              fullWidth
              variant="outlined"
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="input"
            />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Correct Answer"
        fullWidth
        variant="outlined"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        className="input"
      />
      <div className="button-container">
        <Button onClick={handleSave} className="button">
          Save
        </Button>
        <Button onClick={handleCancel} className="button">
          Cancel
        </Button>
        <Button onClick={handleBack} className="button">
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default MCQForm;
