INSERT INTO admins (name, email, password) VALUES 
('Dr Sama', 'sama@university.edu', '123');
('Dr Menna', 'menna@university.edu', '1');

-- Insert sample students
INSERT INTO students (student_id, name, email, phone, address, password) VALUES
('STU-003', 'Asmaa', 'asm@university.edu', '010398271', 'Alex, Egypt', '145'),
('STU-004', 'Nardine', 'nardine@university.edu', '011382813', 'Alex, Egypt', '145');

-- Insert sample courses
INSERT INTO courses (course_name, instructor, lecture_time) VALUES
('Net Centric', 'Dr. Ahmed Kosba', 'Tuesday 10:00 AM'),
('Computer Vision', 'Dr. Marwan Torki', 'Tuesday 4:00 PM'),
('Software Engineering', 'Dr. Yousry Taha', 'Sunday 5:30 PM');

-- Insert sample grades
INSERT INTO grades (student_id, course_id, grade, exam_score) VALUES
(3, 3, 'A', 94),
(3, 5, 'D', 72),
(4, 1, 'A', 95),
(4, 3, 'B', 80);

-- Insert sample registrations
INSERT INTO registrations (student_id, course_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3);