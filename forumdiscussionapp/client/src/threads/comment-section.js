import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  TextareaAutosize,
  Button,
  Modal,
  Box,
  TextField
} from '@mui/material';
import Responses from './Responses'; 
import useApi from '../home-page/Api';

function CommentSection({ threadId }) {
  const roleId = localStorage.getItem('roleId');
  const userId = localStorage.getItem('userId');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [selectedComment, setSelectedComment] = useState(null);
  const api = useApi();

  const fetchComments = useCallback(async () => {
    try {
      const response = await api.get(`/comments/comments/get/${threadId}`);
      const comments = response.data.comments;
      return Array.isArray(comments) ? comments : [comments];  
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error; 
    }
  }, [api, threadId]);

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
  }, [fetchComments, threadId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (threadId && newComment.trim() !== '') {
      try {
        await api.post(`/comments/comments/create/${threadId}`, {
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

  const handleEditComment = async (commentId) => {
    try {
      await api.put(`/comments/comments/update/${commentId}`, {
        content: editedContent,
      });

      loadComments();
      setEditingComment(null);
      setEditedContent('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/comments/delete/${commentId}`);

      loadComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <Box className="comment-section-container" sx={{ p: 2 }}>
      <Typography variant="h2">Comment Section</Typography>

      {fetchError && <p>{fetchError}</p>}

      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <Box className="comment-list" sx={{ mt: 2 }}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Box key={comment?.CommentID} className="comment-item" sx={{ mb: 2 }}>
                {editingComment === comment?.CommentID ? (
                  <Box>
                    <TextField
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <Button onClick={() => handleEditComment(comment?.CommentID)}>
                      Save
                    </Button>
                    <Button onClick={() => setEditingComment(null)}>
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <>
                    {comment?.CommentContent}
                    {(roleId === '2' || (roleId === '3' && userId === comment?.UserID)) && (
                      <Box sx={{ mt: 1 }}>
                        <Button onClick={() => { setEditingComment(comment?.CommentID); setEditedContent(comment?.CommentContent); }}>
                          Edit
                        </Button>
                        <Button onClick={() => handleDeleteComment(comment?.CommentID)}>Delete</Button>
                      </Box>
                    )}
                  </>
                )}
                <Button onClick={() => setSelectedComment(comment)}>View Responses</Button>
              </Box>
            ))
          ) : (
            <p>No comments to display</p>
          )}
        </Box>
      )}

      {(roleId === '2' || roleId === '3') && (
        <form onSubmit={handleCommentSubmit}>
          <TextareaAutosize
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="comment-input"
            sx={{ mt: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" className="submit-button" sx={{ mt: 2 }}>
            Submit Comment
          </Button>
        </form>
      )}

      {selectedComment && (
        <Responses
          commentId={selectedComment.CommentID}
          open={Boolean(selectedComment)}
          onClose={() => setSelectedComment(null)}
        />
      )}
    </Box>
  );
}

export default CommentSection;
