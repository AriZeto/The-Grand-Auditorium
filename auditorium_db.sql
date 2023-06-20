/* Names: Ari Zeto, Tiffany Conn
Group number: Group 38
Course: CS340
Date: June 7, 2023 */

/* Description: This DDL file is dedicated to our Portfolio Project for CS340, The Grand Auditorium. 
Our database tracks customer records for this theater, making it easier to track and
allocate necessary records. The entities include Films, Customers, Auditoriums, Seats, and Auditorium Customers.
Additionally, these entitites have example data inserted into them. */

-- Disable commits and foreign key checks to minimize import errors
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- If any of the tables that we will be adding currently exist, drop them
DROP TABLE IF EXISTS Films;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Auditoriums;
DROP TABLE IF EXISTS Seats;
DROP TABLE IF EXISTS Auditoriums_Customers;

/* Definition of the tables. */
CREATE TABLE Films (
    film_id INT(11) AUTO_INCREMENT UNIQUE NOT NULL,
    title VARCHAR(145) NOT NULL,
    description VARCHAR(145) NOT NULL,
    director VARCHAR(145) NOT NULL,
    studio VARCHAR(145) NOT NULL,
    year INT NOT NULL,
    runtime INT(11) NOT NULL,
    showtime VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    rating VARCHAR(45) NOT NULL,
    PRIMARY KEY (film_id)
);

CREATE TABLE Customers (
    customer_id INT(11) AUTO_INCREMENT UNIQUE NOT NULL,
    name VARCHAR(145) NOT NULL,
    email VARCHAR(145) NOT NULL,
    phone_number VARCHAR(14) NOT NULL,
    age INT(11) NOT NULL,
    birthdate DATE NOT NULL,
    PRIMARY KEY (customer_id)
);

CREATE TABLE Auditoriums (
    auditorium_id INT(11) AUTO_INCREMENT UNIQUE NOT NULL,
    film_id INT(11) NOT NULL,
    room_name VARCHAR(145) NOT NULL,
    num_seat INT(11) NOT NULL,
    PRIMARY KEY (auditorium_id),
    FOREIGN KEY (film_id) REFERENCES Films(film_id) ON DELETE CASCADE
);

CREATE TABLE Seats (
    seat_id INT(11) AUTO_INCREMENT UNIQUE NOT NULL,
    auditorium_id INT(11) NOT NULL,
    customer_id INT(11) DEFAULT NULL, /* NULLABLE attribute */
    seat_row INT(11) NOT NULL,
    seat_num INT(11) NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (seat_id),
    FOREIGN KEY (auditorium_id) REFERENCES Auditoriums(auditorium_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE
);

CREATE TABLE Auditoriums_Customers (
    auditorium_customer_id INT(11) AUTO_INCREMENT UNIQUE NOT NULL,
    auditorium_id INT(11) NOT NULL,
    customer_id INT(11) NOT NULL,
    PRIMARY KEY (auditorium_customer_id),
    FOREIGN KEY (auditorium_id) REFERENCES Auditoriums(auditorium_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE
);


/* Definition of values */
INSERT INTO Films (film_id, title, description, director, studio, year, runtime, showtime, price, rating)
VALUES (1, 'Eternal Sunshine of the Spotless Mind', 'Drama/Romance/Sci-Fi', 'Michael Gondry', 'Focus Features', 2004, 108, '20:20', 10.0, 'R'),
(2, 'Good Will Hunting', 'Drama/Romance', 'Gus Van Sant', 'Miramax Films', 1997, 126, '18:00', 10.0, 'R'),
(3, 'Top Gun: Maverick', 'Action/Drama', 'Joseph Kosinski', 'Paramount', 2022, 130, '17:30', 14.99, 'PG-13'),
(4, 'Everything Everywhere All at Once', 'Action/Adventure/Comedy', 'Daniel Kwan/Daniel Scheinert', 'A24', 2022, 139, '21:30', 14.99, 'R');


INSERT INTO Auditoriums (auditorium_id, film_id, room_name, num_seat)
VALUES (1, 1, 'Room A', 100),
(2, 2, 'Room B', 75),
(3, 3, 'Room C', 120),
(4, 4, 'Room D', 90);


INSERT INTO Seats (auditorium_id, customer_id, seat_row, seat_num, date)
VALUES (1, NULL, 1, 1, '2023-05-09'),
(1, NULL, 1, 2, '2023-05-09'),
(1, NULL, 1, 3, '2023-05-09'),
(1, NULL, 2, 1, '2023-05-09');


INSERT INTO Customers (customer_id, name, email, phone_number, age, birthdate)
VALUES (1, 'Billy Thorne', 'billythorne@gmail.com', '424-111-2424', 30, '1993-12-05'),
(2, 'Jane Done', 'janedoe@gmail.com', '555-222-9999', 25, '1998-03-20'),
(3, 'Naomi Smith', 'naomismith@gmail.com', '888-123-6789', 40, '1983-04-12'),
(4, 'Peter Anderson', 'peteranderson@gmail.com', '333-454-5050', 20, '2003-02-22');

INSERT INTO Auditoriums_Customers (auditorium_customer_id, auditorium_id, customer_id)
VALUES (1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 3, 4);

-- Re-enable foreign key checks and commits
SET FOREIGN_KEY_CHECKS=1;
COMMIT;