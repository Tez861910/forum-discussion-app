import React, { useState } from 'react';
import axios from 'axios';
import { Typography,  Button, TextField, List, ListItem, } from '@mui/material';

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

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="mcq-form-container">
      <Typography variant="h3">Create MCQ Question</Typography>
      <TextField
        label="Question"
        fullWidth
        variant="outlined"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Typography variant="h6" gutterBottom>Options:</Typography>
      <List>
        {options.map((opt, index) => (
          <ListItem key={index}>
            <TextField
              label={`Option ${index + 1}`}
              fullWidth
              variant="outlined"
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
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
      />
      <Button onClick={handleSave} variant="contained" color="primary">
        Save
      </Button>
    </div>
  );
};

export default MCQForm;
