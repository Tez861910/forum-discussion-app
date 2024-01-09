import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { MCQQuestionForm } from "./mcq-question-form";
import { useApi } from "../home-page/Api";

export function ExamForm({ onClose, courseId, fetchExams }) {
  const [examTitle, setExamTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const { api } = useApi();
  const userId = localStorage.getItem("userId");

  const handleSaveExam = async () => {
    if (
      examTitle &&
      questions.every(
        (question) =>
          question.question && question.options.every((opt) => opt !== "")
      )
    ) {
      const examData = {
        examTitle,
        questions,
        userId,
      };

      try {
        const response = await api.post("/exams/exams/create", examData);

        if (response.data.success) {
          fetchExams();
          onClose();
        } else {
          console.error("Error saving exam data:", response.data.error);
        }
      } catch (error) {
        console.error("Error saving exam data:", error);
      }
    }
  };

  const handleAddQuestion = () => {
    setShowQuestionForm(true);
  };

  const handleCloseQuestionForm = () => {
    setShowQuestionForm(false);
  };

  const handleQuestionSave = (questionData) => {
    setQuestions([...questions, questionData]);
    handleCloseQuestionForm();
  };

  const resetForm = () => {
    setExamTitle("");
    setQuestions([]);
  };

  return (
    <Box sx={{ p: 2, bgcolor: "background.paper" }}>
      <Typography variant="h4" gutterBottom>
        Exam Details
      </Typography>
      <TextField
        label="Exam Title"
        fullWidth
        variant="outlined"
        value={examTitle}
        onChange={(e) => setExamTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Typography variant="h6" gutterBottom>
        Exam Questions:
      </Typography>
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <Box key={index} mb={2}>
            <Typography variant="body1">{`${index + 1}. ${
              question.question
            }`}</Typography>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
            </ul>
          </Box>
        ))
      ) : (
        <Typography variant="body1">No questions added</Typography>
      )}
      <Button
        onClick={handleAddQuestion}
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
      >
        Add Question
      </Button>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleSaveExam} variant="contained" color="primary">
          Save Exam
        </Button>
        <Button onClick={onClose} variant="contained" color="secondary">
          Cancel
        </Button>
      </Box>

      {/* MCQ Question Form Modal */}
      <Dialog open={showQuestionForm} onClose={handleCloseQuestionForm}>
        <DialogTitle>Create New Question</DialogTitle>
        <DialogContent>
          <MCQQuestionForm
            onClose={handleCloseQuestionForm}
            onSave={handleQuestionSave}
            courseId={courseId}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
