import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Button, TextField, List, ListItem, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './mcq-form.css';

const MCQForm = ({ courseId }) => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const onSave = (mcqData) => {
    console.log('MCQ Data Saved:', mcqData);
    // You can perform additional actions after saving, if needed
  };

  const handleSave = async () => {
    if (question && options.every((opt) => opt !== '') && correctAnswer !== '') {
      const mcqData = {
        question,
        options,
        correctAnswer,
        courseId,
      };

      try {
        const response = await axios.post('http://localhost:8081/mcqform/mcqform/save', mcqData);

        if (response.data.success) {
          onSave(mcqData);
          // Assuming there's a route to the created MCQ, you can redirect there
          navigate(`/mcq/${response.data.mcqId}`);
        } else {
          console.error('Error saving MCQ data:', response.data.error);
        }
      } catch (error) {
        console.error('Error saving MCQ data:', error);
      }
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
      <FormControl component="fieldset" className="form-control">
        <Typography variant="h6" gutterBottom className="sub-heading">
          Correct Answer:
        </Typography>
        <RadioGroup
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          row
        >
          {options.map((opt, index) => (
            <FormControlLabel
              key={index}
              value={opt}
              control={<Radio />}
              label={`Option ${index + 1}`}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <div className="button-container">
        <Button onClick={handleSave} className="button" variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={handleCancel} className="button" variant="contained" color="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default MCQForm;
