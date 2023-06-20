// App.js
/*
    SETUP
*/


// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Static files
app.use(express.static('public'))

PORT        = 6599;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/
// app.js 

// {{!-- BROWSE/READ step for all of the entities(Films, Customers, Auditoriums, Seats, Auditoriums_Customers) --}}

// Index page
app.get('/index', function(req, res) 
    {
    res.render('index');
    });
  


// Films table
app.get('/films', function(req, res) {
    let query = "SELECT film_id, title, description, director, studio, year, runtime, showtime, price, rating FROM Films;";
    
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
        }
    
        res.render('films', { data: rows });
    });
    });
      

// Customers table
app.get('/customers', function(req, res) {
    let query = "SELECT customer_id, name, email, phone_number, age, DATE_FORMAT(birthdate, '%Y-%m-%d') AS birthdate FROM Customers;";
  
    db.pool.query(query, function(error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
  
      res.render('customers', { data: rows });
    });
});

                                                           
// Auditoriums table
app.get('/auditoriums', function(req, res) {
    // Declare Query 1 to fetch films
    let query1 = "SELECT film_id, title FROM Films;";

    //let query2 = " SELECT room_name FROM Auditoriums;";
    
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
    
        // Save the films
        let films = rows;
        
        // Fetch the Auditoriums data
        let query2 = "SELECT auditorium_id, film_id, room_name, num_seat FROM Auditoriums;";
        db.pool.query(query2, function(error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            
            // Render the 'auditoriums' view and pass the data and films to the template
            //let auditoriums = rows;
            res.render('auditoriums', { data: rows, films: films });
        });
    });
});


// Seats table
app.get('/seats', function(req, res) {
    // Declare Query 1 to fetch auditoriums
    let query1 = "SELECT auditorium_id, room_name FROM Auditoriums;";
  
    // Declare Query 2 to fetch customers
    let query2 = "SELECT customer_id, name FROM Customers;";
  
    // Run the 1st query to fetch auditoriums
    db.pool.query(query1, function(error1, auditoriumRows, fields1) {
      if (error1) {
        console.log(error1);
        res.sendStatus(500);
        return;
      }
  
      // Save the auditoriums
      let auditoriums = auditoriumRows;
  
      // Run the second query to fetch customers
      db.pool.query(query2, function(error2, customerRows, fields2) {
        if (error2) {
          console.log(error2);
          res.sendStatus(500);
          return;
        }
  
        // Save the customers
        let customers = customerRows;
  
        // Fetch all seats with related information
        let query3 = "SELECT seat_id, auditorium_id, customer_id, seat_row, seat_num, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM Seats;";
  
        db.pool.query(query3, function(error3, seatRows, fields3) {
          if (error3) {
            console.log(error3);
            res.sendStatus(500);
            return;
          }
  
          res.render('seats', { data: seatRows, auditoriums: auditoriums, customers: customers });
        });
      });
    });
  });
  

// Auditoriums_Customers table
app.get('/auditoriums_customers', function(req, res) 
    {  
      // Declare Query 1 to fetch auditoriums
    let query1 = "SELECT auditorium_id, room_name FROM Auditoriums;";
  
    // Declare Query 2 to fetch customers
    let query2 = "SELECT customer_id, name FROM Customers;";
  
    // Run the 1st query to fetch auditoriums
    db.pool.query(query1, function(error1, auditoriumRows, fields1) {
      if (error1) {
        console.log(error1);
        res.sendStatus(500);
        return;
      }
  
      // Save the auditoriums
      let auditoriums = auditoriumRows;
  
      // Run the second query to fetch customers
      db.pool.query(query2, function(error2, customerRows, fields2) {
        if (error2) {
          console.log(error2);
          res.sendStatus(500);
          return;
        }
  
        // Save the customers
        let customers = customerRows;
  
        let query3 = "SELECT * FROM Auditoriums_Customers;";    // Define our query

        db.pool.query(query3, function(error3, rows, fields){    // Execute the query
          if (error3) {
            console.log(error3);
            res.sendStatus(500);
            return;
          }
          res.render('auditoriums_customers', {data: rows, auditoriums: auditoriums, customers: customers}); 
        })                                                      
    });                                                        
  });
});





// {{!-- ADD/INSERT/CREATE step for all of the entities(Films, Customers, Auditoriums, Seats, Auditoriums_Customers) --}}

// Add Films AJAX route
app.post('/add-film-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query = `INSERT INTO Films (title, description, director, studio, year, runtime, showtime, price, rating) VALUES ('${data.title}', '${data.description}', '${data.director}', '${data.studio}', ${data.year}, ${data.runtime}, '${data.showtime}', ${data.price}, '${data.rating}')`;
    db.pool.query(query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Films
            let selectQuery = `SELECT * FROM Films;`;
            db.pool.query(selectQuery, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Add Customers AJAX route
app.post('/add-customer-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (name, email, phone_number, age, birthdate) VALUES ('${data.name}', '${data.email}', '${data.phone_number}', ${data.age}, '${data.birthdate}')`;
    db.pool.query(query1, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Customers`;
            db.pool.query(query2, function(error, rows, fields) {
                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});


// Add Auditoriums AJAX route
app.post('/add-auditorium-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO Auditoriums (film_id, room_name, num_seat) VALUES (${data.film_id}, '${data.room_name}', ${data.num_seat})`;

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Auditoriums
            query2 = `SELECT * FROM Auditoriums`;

            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


// Add Seats AJAX route
app.post('/add-seat-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    if (!data.customer_id) {
      query1 = `INSERT INTO Seats (auditorium_id, seat_row, seat_num, date) VALUES (${data.auditorium_id}, ${data.seat_row}, ${data.seat_num}, '${data.date}')`;
    }
    // Create the query and run it on the database
    else {
      query1 = `INSERT INTO Seats (auditorium_id, customer_id, seat_row, seat_num, date) VALUES (${data.auditorium_id}, ${data.customer_id}, ${data.seat_row}, ${data.seat_num}, '${data.date}')`;
    }
      db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            console.log('test')
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Seats
            query2 = `SELECT * FROM Seats;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


// Add Auditoriums_Customers AJAX route
app.post('/add-auditorium-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO Auditoriums_Customers (auditorium_id, customer_id) VALUES (${data.auditoriumId}, ${data.customerId})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Auditoriums_Customers
            query2 = `SELECT * FROM Auditoriums_Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});



// {{!-- DELETE step for all of the entities(Films, Customers, Auditoriums, Seats, Auditoriums_Customers) --}}

// Delete Customers table
  app.delete('/delete-customer-ajax/', function(req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.customer_id);
    let deleteCustomer = `DELETE FROM Customers WHERE customer_id = ?`;
  
    // Run the query
    db.pool.query(deleteCustomer, [customerID], function(error, rows, fields) {
      if (error) {
        // Log the error to the terminal and send an HTTP response 400 indicating a bad request.
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    });
  });
  

  // Delete Films table
  app.delete('/delete-film-ajax/', function(req,res,next){
    let data = req.body;
    let filmID = parseInt(data.film_id);
    let deleteFilm= `DELETE FROM Films WHERE film_id = ?`;

       // Run the query
       db.pool.query(deleteFilm, [filmID], function(error, rows, fields) {
        if (error) {
          // Log the error to the terminal and send an HTTP response 400 indicating a bad request.
          console.log(error);
          res.sendStatus(400);
        } else {
          res.sendStatus(204);
        }
      });
    });


  // Delete item from Auditorium
  app.delete('/delete-auditorium-ajax/', function(req,res,next){
    let data = req.body;
    let auditoriumID = parseInt(data.auditorium_id);
    let deleteAuditorium = `DELETE FROM Auditoriums WHERE auditorium_id = ?`;

    // Run the query
    db.pool.query(deleteAuditorium, [auditoriumID], function(error, rows, fields) {
      if (error) {
        // Log the error to the terminal and send an HTTP response 400 indicating a bad request.
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    });
  });
  
  // Delete item from Seats
  app.delete('/delete-seat-ajax/', function(req, res, next) {
    let data = req.body;
    let seatID = parseInt(data.seat_id);
    let deleteSeats = `DELETE FROM Seats WHERE seat_id = ?`;
  
    // Run the query
    db.pool.query(deleteSeats, [seatID], function(error, rows, fields) {
      if (error) {
        // Log the error to the terminal and send an HTTP response 400 indicating a bad request.
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    });
  });

    // Delete item from Auditoriums Customers
    app.delete('/delete-auditorium-customers-ajax/', function(req, res, next) {
      let data = req.body;
      let auditoriumCustomerID = parseInt(data.auditorium_customer_id);
      let deleteAuditoriumCustomers = `DELETE FROM Auditoriums_Customers WHERE auditorium_customer_id = ?`;
    
      // Run the query
      db.pool.query(deleteAuditoriumCustomers, [auditoriumCustomerID], function(error, rows, fields) {
        if (error) {
          // Log the error to the terminal and send an HTTP response 400 indicating a bad request.
          console.log(error);
          res.sendStatus(400);
        } else {
          res.sendStatus(204);
        }
      });
    });


 // {{!-- UPDATE step for Customers --}}   
// Update Customers table
app.put('/put-customer-ajax', function(req, res, next) {
    let data = req.body;
  
    let customerId = parseInt(data.customer_id);
    let name = data.name;
    let email = data.email;
    let phoneNumber = data.phone_number;
    let age = parseInt(data.age);
    let birthdate = data.birthdate;
  
    let queryUpdateCustomer = `UPDATE Customers SET name = ?, email = ?, phone_number = ?, age = ?, birthdate = ? WHERE customer_id = ?`;
  
    // Run the query to update the customer
    db.pool.query(queryUpdateCustomer, [name, email, phoneNumber, age, birthdate, customerId], function(error, rows, fields) {
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      } else {
        let selectQuery = `SELECT * FROM Customers;`;
        db.pool.query(selectQuery, function(error, rows, fields){

            // If there was an error on the second query, send a 400
            if (error) {
                
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            // If all went well, send the results of the query back.
            else
            {
                res.send(rows);
            }
        })
      }
    });
  });


  app.put('/put-film-ajax', function(req,res,next){
    let data = req.body;
  
    let filmID = parseInt(data.film_id);
    let title = data.title;
    let description = data.description;
    let director = data.director;
    let studio = data.studio;
    let year = data.year;
    let runtime = data.runtime;
    let showtime = data.showtime;
    let price = data.price;
    let rating = data.rating;

  
    let queryUpdateFilm = `UPDATE Films SET title = ?, description = ?, director = ?, studio = ?, year = ?, runtime = ?, showtime = ?, price = ?, rating =? WHERE film_id = ?`;

    // Run the 1st query
    db.pool.query(queryUpdateFilm, [title, description, director, studio, year, runtime, showtime, price, rating, filmID], function(error, rows, fields){
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      }
      else
      {
        let selectQuery = `SELECT * FROM Films;`;
        db.pool.query(selectQuery, function(error, rows, fields){

            // If there was an error on the second query, send a 400
            if (error) {
                
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            // If all went well, send the results of the query back.
            else
            {
                res.send(rows);
            }
        })
      }
    });
  });

  app.put('/put-auditorium-ajax', function(req,res,next){
    let data = req.body;
  
    let auditoriumID = parseInt(data.auditorium_id);
    let filmID = parseInt(data.film_id);
    let roomName = data.room_name;
    let numSeat = parseInt(data.num_seat);

  
    let queryUpdateAuditorium = `UPDATE Auditoriums SET film_id = ?, room_name = ?, num_seat = ? WHERE auditorium_id = ?`;

    // Run the 1st query
    db.pool.query(queryUpdateAuditorium, [filmID, roomName, numSeat, auditoriumID], function(error, rows, fields){
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      }
      else
      {
        let selectQuery = `SELECT * FROM Auditoriums;`;
        db.pool.query(selectQuery, function(error, rows, fields){

            // If there was an error on the second query, send a 400
            if (error) {
                
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            // If all went well, send the results of the query back.
            else
            {
                res.send(rows);
            }
        })
      }
    });
  });

  app.put('/put-seat-ajax', function(req,res,next){
    let data = req.body;
  
    let seatID = parseInt(data.seat_id);
    let auditoriumID = parseInt(data.auditorium_id);
    let customerID = data.customer_id;
    let seatRow = parseInt(data.seat_row);
    let seatNum = parseInt(data.seat_num);

    if (customerID === '' || !customerID) {
      customerID = null;
    }
    
    let queryUpdateSeats = `UPDATE Seats SET auditorium_id = ?, customer_id = ?, seat_row = ?, seat_num = ? WHERE seat_id = ?`;

    // Run the 1st query
    db.pool.query(queryUpdateSeats, [auditoriumID, customerID, seatRow, seatNum, seatID], function(error, rows, fields){
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      }
      else
      {
        let selectQuery = `SELECT * FROM Seats;`;
        db.pool.query(selectQuery, function(error, rows, fields){

            // If there was an error on the second query, send a 400
            if (error) {
                
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            // If all went well, send the results of the query back.
            else
            {
              res.send(rows);
            }
        })
      }
    });
  });

  app.put('/put-auditorium-customer-ajax', function(req,res,next){
    let data = req.body;
  
    let auditoriumCustomerID = parseInt(data.auditorium_customer_id);
    let auditoriumID = parseInt(data.auditorium_id);
    let customerID = parseInt(data.customer_id);

  
    let queryUpdateAuditoriumCustomers = `UPDATE Auditoriums_Customers SET auditorium_id = ?, customer_id = ? WHERE auditorium_customer_id = ?`;

    // Run the 1st query
    db.pool.query(queryUpdateAuditoriumCustomers, [auditoriumID, customerID, auditoriumCustomerID], function(error, rows, fields){
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      }
      else
      {
        let selectQuery = `SELECT * FROM Auditoriums_Customers;`;
        db.pool.query(selectQuery, function(error, rows, fields){

            // If there was an error on the second query, send a 400
            if (error) {
                
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            // If all went well, send the results of the query back.
            else
            {
              res.send(rows);
            }
        })
      }
    });
  });

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});