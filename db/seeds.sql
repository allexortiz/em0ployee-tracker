-- Insert initial data into the 'department' table
INSERT INTO department (name)
VALUES
  ("Coaching Staff"),
  ("Players"),
  ("Football Staff"),
  ("Hospitality"),
  ("Leadership");

-- Insert initial data into the 'role' table
INSERT INTO role (title, salary, department_id)
VALUES
  ("Forward", 80000.00, 2),
  ("Steward", 6000.00, 4),
  ("Kit Man", 20000.00, 3),
  ("Manager", 500000.00, 1),
  ("Owner", 900000.00, 5);

-- Insert initial data into the 'employee' table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Dominic", "Calvert-Lewin", 1, null),
  ("Farhad", "Moshiri", 5, 1),
  ("Sean", "Dyche", 4, 2),
  ("Jimmy", "Martin", 3, null),
  ("Jurgen", "Klopp", 2, null);