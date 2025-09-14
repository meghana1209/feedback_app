
import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

function FeedbackPage({ courses }) {
  return (
    <div>
      <h1>Course Feedback</h1>
      <FeedbackForm courses={courses} />
    </div>
  );
}

export default FeedbackPage;
