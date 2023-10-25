import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminComments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    axios.get('http://localhost:8081/admin/comments')
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  const createComment = () => {
    axios.post('http://localhost:8081/admin/comments', { content: newComment })
      .then(() => {
        // After creating a comment, refresh the list of comments
        fetchComments();
        setNewComment('');
      })
      .catch((error) => {
        console.error('Error creating comment:', error);
      });
  };

  const updateComment = (commentId, updatedContent) => {
    axios.put(`http://localhost:8081/admin/comments/${commentId}`, updatedContent)
      .then(() => {
        // After updating a comment, refresh the list of comments
        fetchComments();
        setSelectedCommentId(null); // Clear the selection
      })
      .catch((error) => {
        console.error('Error updating comment:', error);
      });
  };

  const deleteComment = (commentId) => {
    axios.delete(`http://localhost:8081/admin/comments/${commentId}`)
      .then(() => {
        // After deleting a comment, refresh the list of comments
        fetchComments();
        setSelectedCommentId(null); // Clear the selection
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };

  return (
    <div>
      <h2>Manage Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {selectedCommentId === comment.id ? (
              <div>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={() => updateComment(comment.id, { content: newComment })}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p>{comment.content}</p>
                <button onClick={() => setSelectedCommentId(comment.id)}>Edit</button>
              </div>
            )}
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Create New Comment</h3>
        <input
          type="text"
          placeholder="Content"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={createComment}>Create</button>
      </div>
    </div>
  );
}

export default AdminComments;

