-- DROP existing tables if testing multiple times
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS submissions;
DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submissions table
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    problem_name VARCHAR(100) NOT NULL,
    language_id INT NOT NULL,
    source_code TEXT NOT NULL,
    result TEXT,
    success BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scores table
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    problem_name VARCHAR(100) NOT NULL,
    score FLOAT DEFAULT 0,
    attempts INT DEFAULT 0,
    UNIQUE(user_id, problem_name)
);

-- Insert a default user (username: testuser, password is bcrypt of 'test123')
INSERT INTO users (username, email, password, role)
VALUES ('testuser', 'test@example.com', '$2b$10$y2DsAKU4bmcKXoU7hSR43eRp9cBeM5RYq5wbdkRTatD0bRvKkAq5O', 'user');
