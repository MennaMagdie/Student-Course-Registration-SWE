-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15),
  address VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(100) NOT NULL,
  instructor VARCHAR(100) NOT NULL,
  lecture_time VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE KEY unique_registration (student_id, course_id)
);

-- Create grades table
CREATE TABLE IF NOT EXISTS grades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  grade VARCHAR(2),
  exam_score INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Insert sample students
INSERT INTO students (name, email, phone, address, password) VALUES
('Ali Ahmed', 'ali@university.edu', '0501234567', 'Dubai, UAE', 'password123'),
('Fatima Khan', 'fatima@university.edu', '0509876543', 'Abu Dhabi, UAE', 'password456');

-- Insert sample courses
INSERT INTO courses (course_name, instructor, lecture_time) VALUES
('Database Systems', 'Dr. Johnson', 'Monday 10:00 AM'),
('Web Development', 'Prof. Smith', 'Wednesday 2:00 PM'),
('Data Structures', 'Dr. Williams', 'Tuesday 11:00 AM');

-- Insert sample grades
INSERT INTO grades (student_id, course_id, grade, exam_score) VALUES
(1, 1, 'A', 92),
(1, 2, 'B', 85),
(2, 1, 'A', 95),
(2, 3, 'B', 80);

-- Insert sample registrations
INSERT INTO registrations (student_id, course_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3);
