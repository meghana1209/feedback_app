# Student Feedback Web Application

## Overview
Full-stack web application for student feedback management. Students can sign up, log in, submit feedback, manage profiles. Admins can manage courses, users, and view analytics.

## Tech Stack
- Frontend: React (HTML, CSS, JS)
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT, bcrypt
- File Upload: Cloudinary (optional)

## Features
1. Authentication & Authorization (JWT, bcrypt, role-based)
2. Feedback Module (CRUD, CSV export)
3. Student Profile Management
4. Admin Dashboard (analytics, student management)
5. Course Management (CRUD)
6. Error handling, validation, responsive UI

## Setup Instructions

### Backend
1. `cd student-feedback-app/backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your values
4. Start server: `npm start`

### Frontend
1. `cd student-feedback-app/frontend`
2. `npm install`
3. Start React app: `npm start`

### MongoDB Setup
1. Create a MongoDB database (local or Atlas)
2. Add your connection string to `.env`

### Example .env file (backend)
```env
DB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Sample Test Login
- Signup as student via frontend
- Admin login: use an account with role 'admin'

## Deployment
- Ready for Render, Vercel, or Railway

## Incremental Commits
Each module is committed separately for clarity and maintainability.