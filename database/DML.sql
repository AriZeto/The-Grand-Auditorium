/* Names: Ari Zeto, Tiffany Conn
Group number: Group 38
Course: CS340
Date: June 7, 2023 */

/* Description: This DML file is dedicated to our Portfolio Project for CS340, The Grand Auditorium. */

---------------------------
-- Films --
---------------------------
-- Read
SELECT film_id, title, description, director, studio, year, runtime, showtime, price, rating 
	FROM Films

-- Create
-- add a new film
INSERT INTO Films (title, description, director, studio, year, runtime, showtime, price, rating) 
   VALUES (:titleInput, :descriptionInput, :directorInput, :studioInput, :yearInput, :runtimeInput, :showtimeInput, :priceInput, :ratingInput)


---------------------------
-- Auditoriums --
---------------------------
-- Read
SELECT Auditoriums.auditorium_id, Films.title AS film_name, room_name, num_seat 
	FROM Auditoriums
		INNER JOIN Films
        ON Auditoriums.film_id = Films.film_id;
   
-- Create
INSERT INTO Auditoriums (film_id, room_name, num_seat)
	VALUES (:film_idInput, :room_nameInput, :num_seatInput)


---------------------------
-- Seats --
---------------------------
-- Read
SELECT Seats.seat_id, Auditoriums.room_name AS auditorium_name, customer_id, seat_row, seat_num, date
	FROM Seats
		INNER JOIN Auditoriums
        ON Seats.auditorium_id = Auditoriums.auditorium_id

-- Create
INSERT INTO Seats (auditorium_id, customer_id, seat_row, seat_num, date)
	VALUES (:auditorium_idInput, :customer_idInput, :seat_rowInput, :seat_numInput, :dateInput)


---------------------------
-- Customers --
---------------------------
-- Read
SELECT customer_id, name, email, phone_number, age, birthdate
	FROM Customers    

-- Create
INSERT INTO Customers (name, email, phone_number, age, birthdate)
	VALUES (:nameInput, :emailInput, :phone_numberInput, :ageInput, :birthdateInput)

-- Update
UPDATE Customers
	SET name = :nameInput, email = :emailInput, phone_number = :phoneInput, age = :ageInput, birthdate = :birthdateInput
WHERE customer_id = :customer_idInput;

-- Delete
-- delete a customer
DELETE FROM Customers WHERE customer_id = :customer_idInput;


---------------------------
-- Auditoriums_Customers --
---------------------------
-- Read
SELECT Auditoriums_Customers.auditorium_customer_id, Auditoriums.room_name AS auditorium_name, customer_id
FROM Auditoriums_Customers
	INNER JOIN Auditoriums ON Auditoriums_Customers.auditorium_id = Auditoriums.auditorium_id
	INNER JOIN Customers ON Auditoriums_Customers.customer_id = Customers.customer_id;

-- Create
INSERT INTO Auditoriums_Customers (auditorium_id, customer_id)
	VALUES (:auditorium_idInput, :customer_idInput)
