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


## Deployment Instructions

### Render (Backend)
1. Create a new Web Service on Render
2. Connect your GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables from `.env`
6. Set MongoDB URI (use Render's managed MongoDB or Atlas)

### Vercel (Frontend)
1. Import your repo in Vercel
2. Set build command: `npm install && npm run build`
3. Set output directory: `build`
4. Configure environment variables if needed

### Railway (Full Stack)
1. Create a new project in Railway
2. Add backend and frontend as separate services
3. Set up environment variables
4. Deploy MongoDB plugin or connect to Atlas

### Notes
- Ensure CORS is configured for production
- Update API URLs in frontend for deployment
- For Cloudinary, add credentials to `.env` and integrate in profile image upload

## Incremental Commits
Each module is committed separately for clarity and maintainability.