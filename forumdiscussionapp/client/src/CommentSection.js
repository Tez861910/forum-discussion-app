import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentSection({ userRole, assignedCourse, threadId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch the comments for the thread
    axios.get(`http://localhost:8081/threads/${threadId}/comments`)
      .then((commentsResponse) => {
        setComments(commentsResponse.data);
      })
      .catch((commentsError) => {
        console.error('Error fetching comments:', commentsError);
      });
  }, [threadId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    // Check if the user is a student assigned to the course of the thread
    if (userRole === 'student' && assignedCourse !== threadId.courseId) {
      console.error('Only students assigned to this course can comment on this thread.');
      return;
    }

    try {
      await axios.post(`http://localhost:8081/threads/${threadId}/comments`, { content: newComment });
      // Refresh comments after adding a new one
      const commentsResponse = await axios.get(`http://localhost:8081/threads/${threadId}/comments`);
      setComments(commentsResponse.data);
      setNewComment(''); // Clear the new comment input
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
      {userRole === 'student' && assignedCourse === threadId.courseId && (
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
