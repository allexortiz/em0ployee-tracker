INSERT INTO department (name)
VALUES ("Coaching Staff"), ("Players"), ("Football Staff"), ("Hospitality"), ("Leadership");

INSERT INTO role (title, salary, department_id)
VALUE ("Forward", 80000.00, 2), ("Steward", 6000.00, 4), ("Kit Man", 20000.00, 3), ("Manager", 500000.00, 1), ("Owner", 900000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Dominic", "Calvert-Lewin", 1, 3), ("Farhad", "Moshiri", 5, 1), ("Sean", "Dyche", 4, 2), ("Jimmy", "Martin", 3, 2), ("Jurgen", "Klopp", 2, 2);