const express = require('express');
const router = express.Router();
const { query } = require('../db');

// Handle the creation of MCQ questions by teachers
router.post('/mcq-form/save', async (req, res) => {
  const { question, options, correctAnswer, createdbyuserId, courseId } = req.body;

  try {
    const result = await query(
      'INSERT INTO MCQQuestions (Question, CorrectAnswer, CourseID, CreatedByUserID) VALUES (?, ?, ?, ?)',
      [question, correctAnswer, courseId, createdbyuserId]
    );

    if (result[0].affectedRows === 1) {
      const questionId = result[0].insertId;
      console.log('Question ID:', questionId);

      // Insert MCQ options
      for (const option of options) {
        console.log('Inserting option:', option);
        try {
          await query(
            'INSERT INTO MCQOptions (MCQQuestionID, MCQOption) VALUES (?, ?)',
            [questionId, option]
          );
          console.log('Successfully inserted MCQ option:', option);
        } catch (optionInsertError) {
          console.error('Error inserting MCQ option:', optionInsertError);
        }
      }

      // If you reach this point, all options were inserted successfully
      res.json({ success: true });
    } else {
      console.error('Failed to create MCQ question');
      res.status(500).json({ error: 'Failed to create MCQ question' });
    }
  } catch (error) {
    console.error('Error creating MCQ question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
