const express = require('express');
const router = express.Router();
const { query } = require('../../backend/db');

// Handle the creation of MCQ questions by teachers
router.post('/mcqform/save', async (req, res) => {
  const { question, options, correctAnswer, userId, courseId } = req.body;

  try {
    const result = await query(
      'INSERT INTO MCQQuestions (Question, CorrectAnswer, CourseID, CreatedByUserID) VALUES (?, ?, ?, ?)',
      [question, correctAnswer, courseId, userId]
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

// Handle the saving of exam data
router.post('/mcqform/examsave', async (req, res) => {
  const { examTitle, questions, userId } = req.body;

  try {
    // Insert Exam record
    const examResult = await query(
      'INSERT INTO Exam (ExamName, CreatedByUserID) VALUES (?, ?)',
      [examTitle, userId]
    );

    if (examResult[0].affectedRows === 1) {
      const examId = examResult[0].insertId;

      // Iterate through questions and insert ExamQuestions records
      for (const [index, question] of questions.entries()) {
        const { mcqQuestionId } = question; 

        // Insert ExamQuestions record
        await query(
          'INSERT INTO ExamQuestions (ExamID, MCQQuestionID, QuestionOrder) VALUES (?, ?, ?)',
          [examId, mcqQuestionId, index + 1]
        );
      }

      // If you reach this point, all questions were inserted successfully
      res.json({ success: true });
    } else {
      console.error('Failed to create exam');
      res.status(500).json({ error: 'Failed to create exam' });
    }
  } catch (error) {
    console.error('Error saving exam data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get MCQ questions for a specific course
router.get('/mcqform/questions/:courseId', async (req, res) => {
  const { courseId } = req.params;

  try {
    const questions = await query(
      'SELECT * FROM MCQQuestions WHERE CourseID = ? AND IsDeleted = 0',
      [courseId]
    );

    res.json({ success: true, questions });
  } catch (error) {
    console.error('Error retrieving MCQ questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle the submission of MCQ answers by users
router.post('/mcqform/submitanswers', async (req, res) => {
  const { userId, answers } = req.body;

  try {
    // Iterate through submitted answers and insert into MCQAnswers table
    for (const answer of answers) {
      await query(
        'INSERT INTO MCQAnswers (MCQQuestionID, UserID, SelectedOption) VALUES (?, ?, ?)',
        [answer.mcqQuestionId, userId, answer.selectedOption]
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error submitting MCQ answers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get details of a specific exam
router.get('/mcqform/exam/:examId', async (req, res) => {
  const { examId } = req.params;

  try {
    const examDetails = await query(
      'SELECT * FROM Exam WHERE ExamID = ? AND IsDeleted = 0',
      [examId]
    );

    // Retrieve associated questions for the exam
    const questions = await query(
      'SELECT * FROM ExamQuestions JOIN MCQQuestions ON ExamQuestions.MCQQuestionID = MCQQuestions.MCQQuestionID WHERE ExamID = ?',
      [examId]
    );

    res.json({ success: true, examDetails, questions });
  } catch (error) {
    console.error('Error retrieving exam details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get exam results for a specific user
router.get('/mcqform/examresults/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const results = await query(
      'SELECT * FROM MCQAnswers JOIN MCQQuestions ON MCQAnswers.MCQQuestionID = MCQQuestions.MCQQuestionID WHERE UserID = ?',
      [userId]
    );

    res.json({ success: true, results });
  } catch (error) {
    console.error('Error retrieving exam results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update the order of questions in an exam
router.put('/mcqform/updateexamorder/:examId', async (req, res) => {
  const { examId } = req.params;
  const { updatedOrder } = req.body;

  try {
    // Update ExamQuestions records with the new order
    for (const [index, questionId] of updatedOrder.entries()) {
      await query(
        'UPDATE ExamQuestions SET QuestionOrder = ? WHERE ExamID = ? AND MCQQuestionID = ?',
        [index + 1, examId, questionId]
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating exam question order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Soft delete an exam
router.delete('/mcqform/deleteexam/:examId', async (req, res) => {
  const { examId } = req.params;

  try {
    // Soft delete the exam by setting IsDeleted to 1
    await query('UPDATE Exam SET IsDeleted = 1 WHERE ExamID = ?', [examId]);

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting exam:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Get all exams created by a specific user:
router.get('/mcqform/userexams/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const exams = await query(
      'SELECT * FROM Exam WHERE CreatedByUserID = ? AND IsDeleted = 0',
      [userId]
    );

    res.json({ success: true, exams });
  } catch (error) {
    console.error('Error retrieving user exams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Get details of a specific question with its options:
router.get('/mcqform/questiondetails/:questionId', async (req, res) => {
  const { questionId } = req.params;

  try {
    const questionDetails = await query(
      'SELECT * FROM MCQQuestions WHERE MCQQuestionID = ? AND IsDeleted = 0',
      [questionId]
    );

    const options = await query(
      'SELECT * FROM MCQOptions WHERE MCQQuestionID = ? AND IsDeleted = 0',
      [questionId]
    );

    res.json({ success: true, questionDetails, options });
  } catch (error) {
    console.error('Error retrieving question details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Update a specific question and its options:
router.put('/mcqform/updatequestion/:questionId', async (req, res) => {
  const { questionId } = req.params;
  const { question, options, correctAnswer } = req.body;

  try {
    // Update question
    await query(
      'UPDATE MCQQuestions SET Question = ?, CorrectAnswer = ? WHERE MCQQuestionID = ?',
      [question, correctAnswer, questionId]
    );

    // Update options
    for (const { optionId, option } of options) {
      await query(
        'UPDATE MCQOptions SET MCQOption = ? WHERE MCQOptionID = ?',
        [option, optionId]
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Get all users who attempted a specific exam:
router.get('/mcqform/examusers/:examId', async (req, res) => {
  const { examId } = req.params;

  try {
    const users = await query(
      'SELECT DISTINCT UserID FROM MCQAnswers WHERE MCQQuestionID IN (SELECT MCQQuestionID FROM ExamQuestions WHERE ExamID = ?)',
      [examId]
    );

    res.json({ success: true, users });
  } catch (error) {
    console.error('Error retrieving exam users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
