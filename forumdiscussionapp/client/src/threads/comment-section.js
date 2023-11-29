import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Typography, TextareaAutosize, Button } from '@mui/material';

const fetchComments = async (threadId) => {
  try {
    const response = await axios.get(`http://localhost:8081/comments/comments/get/${threadId}`);
    return response.data.comments || [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error; 
  }
};

function CommentSection({ threadId, roleId, userId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const comments = await fetchComments(threadId);
      setComments(comments);
      setFetchError(null);
    } catch (error) {
      console.error('Error loading comments:', error);
      setFetchError('Error loading comments');
    }
    setIsLoading(false);
  }, [threadId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (threadId && newComment.trim() !== '') {
      try {
        await axios.post(`http://localhost:8081/comments/comments/create/${threadId}`, {
          CommentContent: newComment,
          userId,
        });

        setNewComment('');
        loadComments();
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

      loadComments();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8081/comments/comments/delete/${commentId}`);

      loadComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comment-section-container">
      <Typography variant="h2">Comments</Typography>

      {fetchError && <p>{fetchError}</p>}

      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <ul className="comment-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment.CommentID} className="comment-item">
                {comment.CommentContent}
                {(roleId === '2' || (roleId === '3' && userId === comment.UserID)) && (
                  <>
                    <Button onClick={() => handleEditComment(comment.CommentID, prompt('Edit comment:', comment.CommentContent))}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteComment(comment.CommentID)}>Delete</Button>
                  </>
                )}
              </li>
            ))
          ) : (
            <p>No comments to display</p>
          )}
        </ul>
      )}

      {(roleId === '2' || roleId === '3') && (
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
