// Get the objects we need to modify
let updateAuditoriumsForm = document.getElementById('update-auditoriums-form-ajax');

// Modify the objects we need
updateAuditoriumsForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputAuditoriumID = document.getElementById("auditoriumSelect");
    let inputFilmID = document.getElementById("input-film-update");
    let inputRoomName = document.getElementById("input-room-update");
    let inputNumSeat = document.getElementById("input-num-update");


    // Get the values from the form fields
    let auditoriumIDValue = inputAuditoriumID.value;
    let filmIDValue = inputFilmID.value;
    let roomNameValue = inputRoomName.value;
    let numSeatValue = inputNumSeat.value;
    
    // Check for NULL values
    if (!auditoriumIDValue || !filmIDValue || !roomNameValue || !numSeatValue) {
        console.log("Please fill in all the fields.");
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        auditorium_id: auditoriumIDValue,
        film_id: filmIDValue,
        room_name: roomNameValue,
        num_seat: numSeatValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-auditorium-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            console.log(xhttp.response)
            updateRow(xhttp.response, auditoriumIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, auditoriumID) {
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("auditoriums-table");
  
    for (let i = 0, row; row = table.rows[i]; i++) {
      // Iterate through rows
      // Rows would be accessed using the "row" variable assigned in the for loop
      if (table.rows[i].getAttribute("data-value") == auditoriumID) {
  
        // Get the location of the row where we found the matching auditorium ID
        updateRowIndex = table.getElementsByTagName("tr")[i]; // Assign the value here

        let newData = parsedData[i-1]

        // Update the values in the cells with the updated data
        let cells = updateRowIndex.cells; 
        cells[1].innerHTML = newData.film_id;
        cells[2].innerHTML = newData.room_name;
        cells[3].innerHTML = newData.num_seat;
        break;
      }
    }
  }