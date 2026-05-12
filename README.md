ahlan ahlan

# University Student Registration System - Setup Guide

This is a simple university student-course registration website built with Node.js, Express.js, and MySQL.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server running
- A code editor (VS Code recommended)

## Installation & Setup Steps

### Step 1: Install Node.js Dependencies

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

This will install:
- express (web framework)
- mysql2 (database driver)
- cors (cross-origin requests)
- express-session (session management)

### Step 2: Create MySQL Database

1. Open MySQL command line or MySQL Workbench
2. Run the following command to create a new database:

```sql
CREATE DATABASE university_db;
```

3. Select the database:

```sql
USE university_db;
```

4. Copy and paste the entire contents of `database.sql` file and execute it

This will create all tables (students, courses, registrations, grades) and insert sample data.

### Step 3: Verify Database Connection

The backend is configured to connect to:
- Host: localhost
- User: root
- Password: (empty)
- Database: university_db

If your MySQL setup is different, edit `backend/db.js` with your connection details.

### Step 4: Start the Backend Server

From the backend folder:

```bash
npm start
```

You should see:
```
Server running on http://localhost:3000
Make sure MySQL is running and database is imported!
```

**Keep this terminal open while testing!**

### Step 5: Access the Frontend

Open a web browser and go to:

```
http://localhost:3000
```

## Test Login Credentials

**Admin Account:**
- Email: admin@university.edu
- Password: admin123
- Access: http://localhost:3000/admin-login.html

**Student 1:**
- Email: ali@university.edu
- Password: password123

**Student 2:**
- Email: fatima@university.edu
- Password: password456

## Features to Test

### Student Features:
1. **Login** - Use above credentials
2. **View Dashboard** - See personal info, registered courses, grades
3. **Register Courses** - Go to "Register Courses" and enroll in available courses
4. **View Registered Courses** - See courses you're enrolled in on dashboard
5. **View Grades** - See your grades on the dashboard
6. **View Personal Information** - Displayed on dashboard
7. **Sign Up** - Create new student account at signup.html

### Admin Features:
Go to: `http://localhost:3000/admin-login.html`
Login with: admin@university.edu / admin123

Then access admin panel at: `http://localhost:3000/admin.html`

Features:
1. **Add Student** - Add new student to database
2. **Delete Course** - Remove a course (see all courses in table)
3. **Add Course** - Create new course
4. **Upload Grade** - Assign grades to students

## Project Structure

```
project/
├── backend/
│   ├── server.js          (Main Express server)
│   ├── db.js              (Database connection)
│   ├── auth.js            (Login routes)
│   ├── student.js         (Student routes)
│   ├── admin.js           (Admin routes)
│   └── package.json       (Dependencies)
│
├── frontend/
│   ├── login.html         (Login page)
│   ├── dashboard.html     (Student dashboard)
│   ├── register-courses.html  (Course registration)
│   ├── admin.html         (Admin panel)
│   ├── style.css          (Styling)
│   └── script.js          (Shared JavaScript)
│
└── database.sql           (Database schema & sample data)
```

## Backend API Routes

### Student Authentication
- `POST /login` - Student login with email and password
- `POST /logout` - Student logout
- `POST /signup` - Register new student account
- `GET /check-session` - Check if logged in

### Admin Authentication
- `POST /admin-login` - Admin login with email and password
- `POST /admin-logout` - Admin logout

### Student Routes
- `GET /courses` - Get all available courses
- `POST /register-course` - Register for a course
- `GET /student-courses/:id` - Get student's registered courses
- `GET /grades/:id` - Get student's grades
- `GET /student-info/:id` - Get student information

### Admin Routes
- `POST /add-student` - Add new student
- `DELETE /delete-student/:id` - Delete student
- `POST /add-course` - Add new course
- `DELETE /delete-course/:id` - Delete course
- `POST /upload-grade` - Upload/update grades

## Database Schema

### Admins Table
- id (auto-increment)
- name
- email (unique)
- password
- created_at

### Students Table
- id (auto-increment)
- name
- email (unique)
- phone
- address
- password
- created_at

### Courses Table
- id (auto-increment)
- course_name
- instructor
- lecture_time
- created_at

### Registrations Table
- id (auto-increment)
- student_id (foreign key)
- course_id (foreign key)
- registered_at

### Grades Table
- id (auto-increment)
- student_id (foreign key)
- course_id (foreign key)
- grade
- exam_score
- created_at

## Troubleshooting

### "Cannot find module 'express'"
Solution: Make sure you ran `npm install` in the backend folder

### "Connection refused" error
Solution: Make sure MySQL server is running and database 'university_db' exists

### Port 3000 already in use
Solution: Change PORT in backend/server.js or kill process using port 3000

### CORS errors
Solution: Ensure backend is running on http://localhost:3000

## Notes

- This is a beginner-friendly project for learning purposes
- Passwords are stored as plain text (for simplicity only - never do this in production!)
- Uses simple session-based authentication (no JWT)
- Minimal CSS for easy understanding
- All code is intentionally simple and readable

## Important Files to Remember

1. **backend/server.js** - Start point for backend
2. **database.sql** - Run this in MySQL
3. **frontend/login.html** - First page users see
4. **backend/db.js** - Database connection settings
