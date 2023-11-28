import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextareaAutosize, Button } from '@mui/material';

function CommentSection({ threadId, role, userId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const courseId = localStorage.getItem('courseId');

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/comments/getCommentsByThread/${threadId}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [threadId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (threadId && role === 'student') {
      try {
        await axios.post(`http://localhost:8081/comments/addCommentToThread/${threadId}`, {
          content: newComment,
          userId,
          courseId,
        });

        // Reload comments after adding a new comment.
        setNewComment('');
        fetchComments();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleEditComment = async (commentId, updatedContent) => {
    try {
      await axios.put(`http://localhost:8081/comments/update/${commentId}`, {
        content: updatedContent,
      });

      // Reload comments after updating a comment.
      fetchComments();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8081/comments/delete/${commentId}`);
      // Reload comments after deleting a comment.
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comment-section-container">
      <Typography variant="h2">Comments</Typography>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            {comment.content}
            {role === 'student' && userId === comment.userId && (
              <>
                <Button onClick={() => handleEditComment(comment.id, prompt('Edit comment:', comment.content))}>
                  Edit
                </Button>
                <Button onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
              </>
            )}
          </li>
        ))}
      </ul>
      {role === 'student' && (
        <form onSubmit={handleCommentSubmit}>
          <TextareaAutosize
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="comment-input"
          />
          <Button type="submit" variant="contained" color="primary" className="submit-button">
            Submit Comment
          </Button>
        </form>
      )}
    </div>
  );
}

export default CommentSection;
