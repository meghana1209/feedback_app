// Navigation bar component
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ padding: '10px', background: '#333', color: '#fff' }}>
      <Link to="/" style={{ marginRight: '10px', color: '#fff' }}>Home</Link>
      <Link to="/feedback" style={{ color: '#fff' }}>Feedback</Link>
    </nav>
  );
};

export default NavBar;
