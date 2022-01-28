/* POPULATES DATABASE */
-- Populate department table
INSERT INTO department (name)
VALUES 
('Marketing'),
('Finance'),
('Operations Management'),
('Human Resource'),
('IT');

-- Populate role table
INSERT INTO role (title, salary, department_id)
VALUES 
('Chief Marketing Officer', 247250, 1),
('Market Research Analyst', 65810, 1),
('Public Relations Specialist', 52039, 1),
('Financial Branch Manager', 68035, 2),
('Financial Analyst', 88814, 2),
('Financial Examiner', 62938, 2),
('Operations Manager', 107670, 3),
('Operations Analyst', 61457, 3),
('Operations Officer', 79931, 3),
('HR Director', 160483, 4),
('Recruiter', 74750, 4),
('HR Coordinator', 61000, 4),
('IT Operations Manager', 106548, 5),
('Software Engineer', 108249, 5),
('Full Stack Web Developer', 106132, 5);







