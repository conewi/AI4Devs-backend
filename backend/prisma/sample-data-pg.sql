-- This script provides sample data for testing the following endpoints:
-- GET /positions/:id/candidates
-- PUT /candidates/:id/stage

-- First, make sure all tables exist
-- You may need to create the database first: CREATE DATABASE LTIdb;

-- Create a company
DELETE FROM "Company" WHERE id = 1;
INSERT INTO "Company" (id, name) 
VALUES (1, 'LTI');

-- Create interview flow
DELETE FROM "InterviewFlow" WHERE id = 1;
INSERT INTO "InterviewFlow" (id, description) 
VALUES (1, 'Standard development interview process');

-- Create interview types
DELETE FROM "InterviewType" WHERE id IN (1, 2, 3, 4);
INSERT INTO "InterviewType" (id, name, description) 
VALUES 
(1, 'HR Interview', 'Assess overall fit'),
(2, 'Technical Interview', 'Assess technical skills'),
(3, 'Manager Interview', 'Assess cultural fit'),
(4, 'Final Decision', 'Final approval');

-- Create interview steps
DELETE FROM "InterviewStep" WHERE id IN (1, 2, 3, 4, 5);
INSERT INTO "InterviewStep" (id, "interviewFlowId", "interviewTypeId", name, "orderIndex") 
VALUES 
(1, 1, 1, 'Initial Screening', 1),
(2, 1, 2, 'Technical Interview', 2),
(3, 1, 3, 'Manager Interview', 3),
(4, 1, 4, 'Final Decision', 4),
(5, 1, 1, 'Offer', 5);

-- Create a position
DELETE FROM "Position" WHERE id = 1;
INSERT INTO "Position" (id, "companyId", "interviewFlowId", title, description, status, "isVisible", location, "jobDescription") 
VALUES 
(1, 1, 1, 'Software Engineer', 'Develop and maintain software applications', 'Open', true, 'Remote', 'Full-stack development');

-- Create candidates
DELETE FROM "Candidate" WHERE id IN (1, 2, 3, 4, 5);
INSERT INTO "Candidate" (id, "firstName", "lastName", email, phone, address) 
VALUES 
(1, 'John', 'Doe', 'john.doe@example.com', '1234567890', '123 Main St'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '0987654321', '456 Elm St'),
(3, 'Carlos', 'García', 'carlos.garcia@example.com', '1122334455', '789 Pine St'),
(4, 'Maria', 'Rodriguez', 'maria.rodriguez@example.com', '5566778899', '101 Oak St'),
(5, 'Alex', 'Chen', 'alex.chen@example.com', '3344556677', '202 Maple Ave');

-- Create employees
DELETE FROM "Employee" WHERE id IN (1, 2, 3);
INSERT INTO "Employee" (id, "companyId", name, email, role, "isActive") 
VALUES 
(1, 1, 'Alice Johnson', 'alice.johnson@lti.com', 'Interviewer', true),
(2, 1, 'Bob Miller', 'bob.miller@lti.com', 'Hiring Manager', true),
(3, 1, 'Elena Martinez', 'elena.martinez@lti.com', 'Technical Lead', true);

-- Create applications (with different stages)
DELETE FROM "Application" WHERE id IN (1, 2, 3, 4, 5);
INSERT INTO "Application" (id, "positionId", "candidateId", "applicationDate", "currentInterviewStep", notes) 
VALUES 
(1, 1, 1, '2023-11-15', 3, 'Strong candidate'),
(2, 1, 2, '2023-11-10', 2, 'Good technical background'),
(3, 1, 3, '2023-12-01', 1, 'New application'),
(4, 1, 4, '2023-10-20', 4, 'Final stage'),
(5, 1, 5, '2023-10-05', 5, 'Offer stage');

-- Create interviews with different scores
DELETE FROM "Interview" WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
INSERT INTO "Interview" (id, "applicationId", "interviewStepId", "employeeId", "interviewDate", result, score, notes) 
VALUES 
-- John Doe interviews
(1, 1, 1, 1, '2023-11-18', 'Passed', 8, 'Strong communication skills'),
(2, 1, 2, 3, '2023-11-25', 'Passed', 7, 'Good technical skills'),

-- Jane Smith interviews
(3, 2, 1, 1, '2023-11-12', 'Passed', 9, 'Excellent communication'),

-- Carlos García interviews
(4, 3, 1, 1, '2023-12-03', 'In Progress', NULL, 'Scheduled for screening'),

-- Maria Rodriguez interviews
(5, 4, 1, 1, '2023-10-22', 'Passed', 8, 'Good cultural fit'),
(6, 4, 2, 3, '2023-10-29', 'Passed', 9, 'Excellent frontend skills'),
(7, 4, 3, 2, '2023-11-05', 'Passed', 8, 'Team likes her'),

-- Alex Chen interviews
(8, 5, 1, 1, '2023-10-07', 'Passed', 9, 'Excellent communication'),
(9, 5, 2, 3, '2023-10-14', 'Passed', 10, 'Outstanding technical skills'),
(10, 5, 3, 2, '2023-10-21', 'Passed', 9, 'Leadership potential'),
(11, 5, 4, 2, '2023-10-28', 'Passed', 9, 'Recommended for hire');

-- For testing endpoints:
-- GET /positions/1/candidates will return all candidates for position 1 in different stages
-- PUT /candidates/1/stage can be used to update candidate 1's stage 