import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import FeedbackPage from './pages/FeedbackPage';

function App() {
  const [isAuthenticated] = useState(true); // change to auth logic

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Welcome to Feedback App</h1>} />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <FeedbackPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
