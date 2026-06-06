CREATE DATABASE college_events;
USE college_events;

CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    role VARCHAR(20)
);

CREATE TABLE events(
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    venue VARCHAR(100) NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE registrations(
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    event_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

INSERT INTO users (name, username, password, role) VALUES
('Admin', 'admin', 'inspirante2026', 'admin'),

('Asha Rao', 'asha.rao', 'student123', 'student'),
('Ravi Shetty', 'ravi.shetty', 'student123', 'student'),
('Meera Nair', 'meera.nair', 'student123', 'student'),
('Kiran Bhat', 'kiran.bhat', 'student123', 'student'),
('Divya Kamath', 'divya.kamath', 'student123', 'student'),
('Suresh Pai', 'suresh.pai', 'student123', 'student'),
('Ananya Hegde', 'ananya.hegde', 'student123', 'student'),
('Rohan Shenoy', 'rohan.shenoy', 'student123', 'student'),
('Nisha Prabhu', 'nisha.prabhu', 'student123', 'student'),
('Tejas Mallya', 'tejas.mallya', 'student123', 'student'),
('Priya Bangera', 'priya.bangera', 'student123', 'student');

INSERT INTO events (event_name, event_date, venue, capacity) VALUES
('Tech Symposium 2026', '2026-07-10', 'Main Auditorium', 120),

('Hackathon', '2026-07-15', 'Lab Block C', 40),

('Cultural Fest', '2026-07-20', 'Open Amphitheatre', 300),

('Workshop: React Basics', '2026-07-22', 'Seminar Hall 2', 30),

('Placement Prep Talk', '2026-07-25', 'Main Auditorium', 200);