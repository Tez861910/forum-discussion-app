import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile({ userId }) {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    

    if (storedUserId) {
      axios.get(`http://localhost:8081/users/users/get/${storedUserId}`)
        .then((response) => {
          setUserData(response.data.user);
          // Initialize the state variables with user data
          setNewName(response.data.user.UserName || '');
          setNewEmail(response.data.user.UserEmail || '');
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Make a PUT request to update the user's data
    axios.put(`http://localhost:8081/users/users/update/${userId}`, {
      name: newName,
      email: newEmail,
      password: newPassword,
    })
      .then(() => {
        setEditing(false);
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  return (
    <div>
      <h3>User Profile</h3>
      {editing ? (
        <>
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p>Name: {userData ? userData.UserName : 'N/A'}</p>
          <p>Email: {userData ? userData.UserEmail : 'N/A'}</p>
          <p>Course: {userData ? userData.CourseName : 'N/A'}</p>
          <p>Role: {userData ? userData.RoleName : 'N/A'}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
