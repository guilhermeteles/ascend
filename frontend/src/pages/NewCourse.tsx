import React, { useState } from 'react';
import { createCourse } from '../services/firestore';
import { auth } from '../firebaseConfig';

function NewCourse() {
  const [title, setTitle] = useState('');
  const userId = auth.currentUser?.uid || ''; // Get the user ID from Firebase Auth

  const handleCreateCourse = async () => {
    if (!title || !userId) {
      alert('Please provide a title and ensure you are logged in.');
      return;
    }
    await createCourse(title, userId);
    alert('Course created successfully!');
  };

  return (
    <div>
      <h1>Create New Course</h1>
      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreateCourse}>Create Course</button>
    </div>
  );
}

export default NewCourse;
