import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextareaAutosize, Button } from '@mui/material';

function CommentSection({ threadId, role }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const userId = localStorage.getItem('userId');
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

  return (
    <div className="comment-section-container">
      <Typography variant="h2">Comments</Typography>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            {comment.content}
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
