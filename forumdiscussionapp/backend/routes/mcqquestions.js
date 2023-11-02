const express = require('express');
const router = express.Router();
const { query } = require('../db');

// Handle the creation of MCQ questions by teachers
router.post('/mcqform/save', async (req, res) => {
  const { question, options, correctAnswer, createdByUserId, courseId } = req.body;

  try {
    // Use the query function to execute the SQL query
    const result = await query(
      'INSERT INTO MCQQuestions (Question, CorrectAnswer, CourseID, CreatedByUserID) VALUES (?, ?, ?, ?)',
      [question, correctAnswer, courseId, createdByUserId]
    );

    const questionId = result.insertId;

    // Insert MCQ options
    for (const option of options) {
      await query(
        'INSERT INTO MCQOptions (MCQQuestionID, OptionText) VALUES (?, ?)',
        [questionId, option]
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error creating MCQ question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
