-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS FocusQuestDB;
USE FocusQuestDB;

-- 2. Users Table (Base class data)
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Student', 'Administrator') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Students Table (Extends User)
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    total_xp INT DEFAULT 0,
    total_points INT DEFAULT 0,
    FOREIGN KEY (student_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 4. Characters Table (Composition: 1 student has 1 character)
CREATE TABLE Characters (
    character_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT UNIQUE NOT NULL,
    char_level INT DEFAULT 1,
    current_xp INT DEFAULT 0,
    xp_boost DECIMAL(3, 2) DEFAULT 1.00,
    xp_damage INT DEFAULT 0,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE
);

-- 5. SiteManager Table (Aggregation)
CREATE TABLE SiteLists (
    list_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    site_url VARCHAR(255) NOT NULL,
    site_type ENUM('Productive', 'Distractive') NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE
);

-- 6. Rewards Table
CREATE TABLE Rewards (
    reward_id INT AUTO_INCREMENT PRIMARY KEY,
    reward_name VARCHAR(100) NOT NULL,
    point_cost INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 7. Student Rewards (Tracking unlocked rewards and history)
CREATE TABLE StudentRewards (
    unlock_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    reward_id INT NOT NULL,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (reward_id) REFERENCES Rewards(reward_id)
);

-- Insert an Administrator
INSERT INTO Users (username, email, password_hash, role) 
VALUES ('Admin_Abdi', 'admin@focusquest.com', 'hash123', 'Administrator');

-- Insert a Student
INSERT INTO Users (username, email, password_hash, role) 
VALUES ('Student_User', 'student@taylors.edu', 'hash456', 'Student');

-- Link User to Student table (Assume user_id is 2)
INSERT INTO Students (student_id, total_xp, total_points) 
VALUES (2, 500, 100);

-- Create Character for the Student
INSERT INTO Characters (student_id, char_level, current_xp) 
VALUES (2, 5, 120);

-- Add initial Rewards
INSERT INTO Rewards (reward_name, point_cost) 
VALUES ('New Avatar Skin', 50), ('XP Booster 2x', 150);

INSERT INTO Users (username, email, password_hash, role) 
VALUES ('Student_User', 'different_email@test.com', 'hash789', 'Student');
-- EXPECTED ERROR: Duplicate entry 'Student_User' for key 'username'

INSERT INTO Characters (student_id, char_level) 
VALUES (999, 1);
-- EXPECTED ERROR: Cannot add or update a child row (Foreign key constraint fails)

INSERT INTO Characters (student_id, char_level) 
VALUES (2, 1);
-- EXPECTED ERROR: Duplicate entry '2' for key 'student_id'