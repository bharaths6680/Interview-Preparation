-- Create a new database
CREATE DATABASE SchoolDB;

-- Use the database
USE SchoolDB;

-- Create a table for Students
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    BirthDate DATE,
    GradeLevel INT
);

-- Create a table for Courses
CREATE TABLE Courses (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(100),
    TeacherName VARCHAR(100)
);

-- Create a table for Enrollments
CREATE TABLE Enrollments (
    EnrollmentID INT PRIMARY KEY,
    StudentID INT,
    CourseID INT,
    EnrollmentDate DATE,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);


-- Insert records into Students table
INSERT INTO Students (StudentID, FirstName, LastName, BirthDate, GradeLevel)
VALUES
(1, 'Alice', 'Johnson', '2005-09-15', 10),
(2, 'Bob', 'Smith', '2006-02-20', 9),
(3, 'Charlie', 'Davis', '2004-12-12', 11);

-- Insert records into Courses table
INSERT INTO Courses (CourseID, CourseName, TeacherName)
VALUES
(1, 'Mathematics', 'Mr. Clark'),
(2, 'Biology', 'Ms. Adams'),
(3, 'History', 'Mrs. Lee');

-- Insert records into Enrollments table
INSERT INTO Enrollments (EnrollmentID, StudentID, CourseID, EnrollmentDate)
VALUES
(1, 1, 1, '2023-01-10'),
(2, 1, 2, '2023-01-15'),
(3, 2, 3, '2023-02-01'),
(4, 3, 1, '2023-03-10');


-- Retrieve all students:
SELECT * FROM Students;

-- Get the names of students enrolled in Mathematics:
SELECT S.first_name, S.last_name from Students S
INNER JOIN Enrollments E ON E.StudentID = S.StudentID
INNER JOIN Courses C ON C.CourseID = E.CourseID
where C.CourseName = 'Mathematics';


--Find students born after 2005:
Select * from students WHERE BirthDate > '2005-01-01';