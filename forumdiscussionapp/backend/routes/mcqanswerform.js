const express = require('express');
const router = express.Router();
const { query } = require('../db'); 

// Handle the retrieval of MCQ questions for students
router.get('/mcqanswerform/questions/get/:courseId', async (req, res) => {
  const courseId = req.params.courseId;

  try {
    // Use the query function to execute the SQL query
    const questions = await query(
      'SELECT MCQQuestionID, Question, CorrectAnswer ' +
      'FROM MCQQuestions ' +
      'WHERE CourseID = ?',
      [courseId]
    );

    // Retrieve options for each question
    for (const question of questions) {
      question.options = await query(
        'SELECT MCQOption FROM MCQOptions WHERE MCQQuestionID = ?',
        [question.MCQQuestionID]
      );
    }

    res.json(questions);
  } catch (error) {
    console.error('Error fetching MCQ questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle the submission of MCQ answers
router.post('/mcqanswerform/submitanswers', async (req, res) => {
  const { question, selectedOption, userId } = req.body;

  try {
    // Use the query function to insert the MCQ answer into the database
  const result = await query(
    'INSERT INTO MCQAnswers (MCQQuestionID, UserID, SelectedOption) ' +
    'SELECT MCQQuestions.MCQQuestionID, ?, ? ' +
    'FROM MCQQuestions ' +
    'INNER JOIN MCQOptions ON MCQQuestions.MCQQuestionID = MCQOptions.MCQQuestionID ' +
    'WHERE MCQQuestions.Question = ? AND MCQOptions.MCQOption = ?',
    [userId, selectedOption, question, selectedOption]
  );

    res.json({ success: true });
  } catch (error) {
    console.error('Error submitting MCQ answer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

