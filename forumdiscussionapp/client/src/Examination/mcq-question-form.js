import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useApi } from "../home-page/Api";

export function MCQQuestionForm({ onClose, onSave, courseId }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const { api } = useApi();
  const userId = localStorage.getItem("userId");

  const handleSaveQuestion = async () => {
    if (
      question &&
      options.every((opt) => opt !== "") &&
      correctAnswer !== ""
    ) {
      const mcqData = {
        question,
        options,
        correctAnswer,
        courseId,
        userId,
      };

      try {
        const response = await api.post("/mcqform/mcqform/save", mcqData);

        if (response.data.success) {
          onSave(mcqData);
          resetForm();
        } else {
          console.error("Error saving MCQ data:", response.data.error);
        }
      } catch (error) {
        console.error("Error saving MCQ data:", error);
      }
    }
  };

  const resetForm = () => {
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  return (
    <Box sx={{ p: 2, bgcolor: "background.paper" }}>
      <Typography variant="h4" gutterBottom>
        Create MCQ Question
      </Typography>
      <TextField
        label="Question"
        fullWidth
        variant="outlined"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Typography variant="h6" gutterBottom>
        Options:
      </Typography>
      <RadioGroup
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      >
        {options.map((opt, index) => (
          <FormControlLabel
            key={index}
            value={opt}
            control={<Radio />}
            label={
              <TextField
                label={`Option ${index + 1}`}
                fullWidth
                variant="outlined"
                value={opt}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                sx={{ mb: 2 }}
              />
            }
          />
        ))}
      </RadioGroup>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={handleSaveQuestion}
          variant="contained"
          color="primary"
        >
          Save Question
        </Button>
        <Button onClick={onClose} variant="contained" color="secondary">
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
