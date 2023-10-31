import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentSection({ roleId, courseId, threadId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await axios.get(`http://localhost:8081/threads/${threadId}/comments`);
        setComments(commentsResponse.data.comments);
      } catch (commentsError) {
        console.error('Error fetching comments:', commentsError);
      }
    };

    fetchComments();
  }, [threadId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

   
    if (roleId === 'student' && courseId !== threadId.courseId) {
      console.error('Only students assigned to this course can comment on this thread.');
      return;
    }

    try {
      await axios.post(`http://localhost:8081/threads/${threadId}/comments`, { content: newComment, userId, courseId });
      console.log('Comment added successfully'); 

     
      const commentsResponse = await axios.get(`http://localhost:8081/threads/${threadId}/comments`);
      setComments(commentsResponse.data.comments);

      setNewComment(''); 
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      {roleId === 'student' && courseId === threadId.courseId && (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Submit Comment</button>
        </form>
      )}
    </div>
  );
}

export default CommentSection;
