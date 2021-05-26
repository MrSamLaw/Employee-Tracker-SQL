USE employeeDB;

INSERT INTO department (name)
VALUES ('Editorial'), ('Advertising'), ('Administration'), ('Printing');

INSERT INTO role (title, salary, department_id)
VALUES
('Photo Editor', 75000, 1),
('Managing Editor', 200000, 1),
('Layout Editor', 75000, 1),
('Editor in Chief', 250000, 1),
('Copy Editor', 90000, 1),
('Chief Advertiser', 180000, 2),
('Classifieds', 90000, 2),
('National Advitiser', 100000, 2),
('Advertising Sales', 125000, 2),
('General Manager', 400000, 3),
('General Counsel Lawyer', 300000, 3),
('Human Resources Coordinator', 150000, 3),
('Head Printer', 175000, 4),
('Assistant Printer', 125000, 4),
('Printer Maintainence', 80000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('John', 'Johnstone', 4, 2),
('Amanda', 'Hugnkiss', 10, null),
('Hugh', 'Richards', 11, 2),
('Tom', 'Doyle', 15, 5),
('Max', 'Power', 13, 2),
('Honey', 'Ryder', 2, 1),
('Holly', 'Goodhead', 12, 2);