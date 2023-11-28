import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextareaAutosize, Button } from '@mui/material';

function CommentSection({ threadId, roleId, userId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [fetchError, setFetchError] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/comments/comments/get/${threadId}`);
      setComments(response.data.comments);
      setFetchError(null);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setFetchError('Error fetching comments');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [threadId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    console.log('Current threadId:', threadId);

    if (threadId && newComment.trim() !== '') {
      try {
        await axios.post(`http://localhost:8081/comments/comments/create/${threadId}`, {
          content: newComment,
          userId,
        });

        setNewComment('');
        fetchComments();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleEditComment = async (commentId, updatedContent) => {
    try {
      await axios.put(`http://localhost:8081/comments/comments/update/${commentId}`, {
        content: updatedContent,
      });

      fetchComments();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8081/comments/comments/delete/${commentId}`);

      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comment-section-container">
      <Typography variant="h2">Comments</Typography>

      {fetchError && <p>{fetchError}</p>}

      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            {comment.content}
            {(roleId === '2' || (roleId === '3' && userId === comment.userId)) && (
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

      {roleId === '2' || roleId === '3' ? (
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
      ) : null}
    </div>
  );
}

export default CommentSection;
