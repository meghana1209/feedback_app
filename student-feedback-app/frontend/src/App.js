
import React, { useState, useEffect } from 'react';
import FeedbackPage from './pages/FeedbackPage';

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from backend API
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <FeedbackPage courses={courses} />
    </div>
  );
}

export default App;
