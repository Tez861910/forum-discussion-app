import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './comment-section.css';

function CommentSection({ roleId }) {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const userId = localStorage.getItem('userId');
  const courseId = localStorage.getItem('courseId');

  useEffect(() => {
    // Fetch the threads belonging to the student's courses.
    const fetchThreads = async () => {
      try {
        const threadsResponse = await axios.get(`http://localhost:8081/threads/getThreadsByCourse/${courseId}`);
        setThreads(threadsResponse.data.threads);
      } catch (threadsError) {
        console.error('Error fetching threads:', threadsError);
      }
    };

    fetchThreads();
  }, [courseId]);

  // Function to handle thread selection and load comments for the selected thread.
  const handleThreadSelection = async (threadId) => {
    setSelectedThread(threadId);
    try {
      const commentsResponse = await axios.get(`http://localhost:8081/comments/getCommentsByThread/${threadId}`);
      setComments(commentsResponse.data.comments);
      setNewComment('');
    } catch (commentsError) {
      console.error('Error fetching comments:', commentsError);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (selectedThread && roleId === 'student') {
      try {
        await axios.post(`http://localhost:8081/comments/addCommentToThread/${selectedThread}`, {
          content: newComment,
          userId,
          courseId,
        });
        console.log('Comment added successfully');

        // Reload comments after adding a new comment.
        handleThreadSelection(selectedThread);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <div className="comment-section-container">
      <h2>Comments</h2>
      <div className="thread-selection">
        <ul>
          {threads.map((thread) => (
            <li key={thread.id}>
              <button onClick={() => handleThreadSelection(thread.id)}>
                {thread.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedThread && (
        <div>
          <h3>Selected Thread: {threads.find((thread) => thread.id === selectedThread).title}</h3>
          <ul className="comment-list">
            {comments && comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                {comment.content}
              </li>
            ))}
          </ul>

          {roleId === 'student' && (
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="comment-input"
              />
              <button type="submit" className="submit-button">
                Submit Comment
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default CommentSection;
