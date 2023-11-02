const express = require('express');
const router = express.Router();
const { query } = require('../db');

// Handle the retrieval of MCQ questions for students
router.get('/mcqanswerform/questions/get/:courseId', async (req, res) => {
  const courseId = req.params.courseId;

  try {
    // Use the query function to execute the SQL query
    const questions = await query(
      'SELECT Q.MCQQuestionID, Q.Question, Q.CorrectAnswer, O.OptionText ' +
      'FROM MCQQuestions Q ' +
      'INNER JOIN MCQOptions O ON Q.MCQQuestionID = O.MCQQuestionID ' +
      'WHERE Q.CourseID = ?',
      [courseId]
    );

    res.json(questions);
  } catch (error) {
    console.error('Error fetching MCQ questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle the submission of MCQ answers
router.post('/mcqanswerform/mcqanswerform/submitanswers', async (req, res) => {
  const { question, selectedOption, userId } = req.body;

  try {
    // Use the query function to insert the MCQ answer into the database
    const result = await query(
      'INSERT INTO MCQAnswers (MCQQuestionID, UserID, SelectedOption) ' +
      'SELECT Q.MCQQuestionID, ?, ? ' +
      'FROM MCQQuestions Q ' +
      'WHERE Q.Question = ?',
      [userId, selectedOption, question]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error submitting MCQ answer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
