import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admincomment.css';

function AdminComments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    axios.get('http://localhost:8081/comments/comments/get')
      .then((response) => {
        setComments(response.data);
        console.log('Comments fetched successfully');
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  const createComment = () => {
    axios.post('http://localhost:8081/comments/comments/create', { content: newComment })
      .then(() => {
      
        fetchComments();
        setNewComment('');
        console.log('Comment created successfully');
      })
      .catch((error) => {
        console.error('Error creating comment:', error);
      });
  };

  const updateComment = (commentId, updatedContent) => {
    axios.put(`http://localhost:8081/comments/comments/update/:id${commentId}`, updatedContent)
      .then(() => {
   
        fetchComments();
        setSelectedCommentId(null); 
        console.log('Comment updated successfully');
      })
      .catch((error) => {
        console.error('Error updating comment:', error);
      });
  };

  const deleteComment = (commentId) => {
    axios.delete(`http://localhost:8081/comments/comments/delete/:id${commentId}`)
      .then(() => {
      
        fetchComments();
        setSelectedCommentId(null);
        console.log('Comment deleted successfully');
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
