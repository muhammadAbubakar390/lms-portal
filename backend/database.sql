-- Run this script in your MySQL interface (e.g., MySQL Workbench, phpMyAdmin or CLI) to create the database and tables.

CREATE DATABASE IF NOT EXISTS lms_portal;
USE lms_portal;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('Student', 'Teacher', 'Admin') DEFAULT 'Student',
  profile_pic VARCHAR(500) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course_code VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(student_id, course_code)
);

CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(50) NOT NULL,
  course_name VARCHAR(255) NOT NULL,
  teacher_name VARCHAR(255),
  section VARCHAR(50),
  class_day VARCHAR(50),
  class_time VARCHAR(100),
  room VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default teacher account for testing (password is 'password123' hashed)
INSERT INTO users (username, email, password, role) 
VALUES ('Teacher', 'teacher@university.edu', '$2a$10$w6D8j8Xp4YtN9T.O4a3H.OO1P1b2vQyM9jR7.Gkx/4/A.u6n/L3tO', 'Teacher')
ON DUPLICATE KEY UPDATE id=id;

-- Insert a default admin account for testing (password is 'admin123' hashed)
INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@university.edu', '$2a$10$C82vO9.v2Zp9.K.zGxyPzOvPByU2oXW/.V./JtJmE6vR4gI7bS07O', 'Admin')
ON DUPLICATE KEY UPDATE id=id;
