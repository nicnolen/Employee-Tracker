/* POPULATES DATABASE */
-- Populate department table
INSERT INTO department (name)
VALUES 
('Marketing'),
('Finance'),
('Operations Management'),
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
('IT Operations Manager', 106548, 4),
('Software Engineer', 108249, 4),
('Full Stack Web Developer', 106132, 4);


-- Populate the employees table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Fred', 'Wilson', 1, null),
('Carter', 'Madison', 3, 1),
('Matthew', 'Palmer', 2, 1),
('Robert', 'Randolf', 2, 1),
('James', 'Alden', 4, null),
('George','Merrill', 5, 5),
('Paul', 'Stevens', 6, 5),
('Kennith', 'Milford', 6, 5),
('Jennifer', 'Ellis', 7, null),
('Rebecca', 'Sanford', 8, 9),
('Scott', 'Buford', 9, 9),
('Johnathan', 'Carmine', 9, 9),
('Joseph', 'Hoyt', 10, null),
('Donald', 'Nelson', 11, 13),
('Justin', 'Ellisworth', 12, 13),
('Gary', 'Emerson', 11, 13);





