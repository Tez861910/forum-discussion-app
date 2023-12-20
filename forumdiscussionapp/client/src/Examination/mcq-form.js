import React, { useState, useEffect } from 'react';
import { Typography, Button, List, ListItem, Dialog, DialogTitle, DialogContent, Box } from '@mui/material';
import ExamForm from './exam-form'; 
import useApi from '../home-page/Api';

function MCQForm({ selectedCourse: courseId }) {
  const [showExamForm, setShowExamForm] = useState(false);
  const [exams, setExams] = useState([]);
  const { api } = useApi();

  const fetchExams = async () => {
    try {
      const response = await api.get('/exams');  
      if (response.data.success) {
        setExams(response.data.exams);
      } else {
        console.error('Error fetching exams:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);  

  const handleCreateExam = () => {
    setShowExamForm(true);
  };

  const handleCloseExamForm = () => {
    setShowExamForm(false);
    fetchExams();  
  };

  const handleExamClick = (examId) => {
    
    console.log(`Clicked on exam with ID: ${examId}`);
  };

  const handleDeleteExam = async (examId) => {
    // Handle deleting an exam
    try {
      const response = await api.delete(`/mcqform/mcqform/deleteexam/${examId}`);
      if (response.data.success) {
        fetchExams(); 
      } else {
        console.error('Error deleting exam:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
        Exam Management
      </Typography>
      <Button onClick={handleCreateExam} variant="contained" color="primary" sx={{ mb: 2 }}>
        Create Exam
      </Button>
      <List>
        {exams.length > 0 ? (
          exams.map((exam) => (
            <ListItem key={exam.examId} disablePadding>
              <Button onClick={() => handleExamClick(exam.examId)} sx={{ mr: 1 }}>
                {exam.examTitle}
              </Button>
              <Button onClick={() => handleDeleteExam(exam.examId)} color="secondary">
                Delete
              </Button>
            </ListItem>
          ))
        ) : (
          <ListItem>No exams to show</ListItem>
        )}
      </List>

      {/* Exam Form Modal */}
      <Dialog open={showExamForm} onClose={handleCloseExamForm}>
        <DialogTitle>Create New Exam</DialogTitle>
        <DialogContent>
          <ExamForm onClose={handleCloseExamForm} courseId={courseId} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default MCQForm;