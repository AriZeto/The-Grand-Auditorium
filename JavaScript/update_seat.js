// Get the objects we need to modify
let updateSeatsForm = document.getElementById('update-seats-form-ajax');

// Modify the objects we need
updateSeatsForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSeatID = document.getElementById("seatSelect");
    let inputAuditoriumID = document.getElementById("input-auditorium-update");
    let inputCustomerID = document.getElementById("input-customer-update");
    let inputSeatRow = document.getElementById("input-row-update");
    let inputSeatNum = document.getElementById("input-num-update");


    // Get the values from the form fields
    let seatIDValue = inputSeatID.value;
    let auditoriumIDValue = inputAuditoriumID.value;
    let customerIDValue = inputCustomerID.value;
    let seatRowValue = inputSeatRow.value;
    let seatNumValue = inputSeatNum.value;
    
    // Check for NULL values
    if (!seatIDValue || !auditoriumIDValue || !seatRowValue || !seatNumValue) {
        console.log("Please fill in all the fields.");
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        seat_id: seatIDValue,
        auditorium_id: auditoriumIDValue,
        customer_id: customerIDValue,
        seat_row: seatRowValue,
        seat_num: seatNumValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-seat-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            console.log(xhttp.response)
            updateRow(xhttp.response, seatIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, seatID) {
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("seats-table");
  
    for (let i = 0, row; row = table.rows[i]; i++) {
      // Iterate through rows
      // Rows would be accessed using the "row" variable assigned in the for loop
      if (table.rows[i].getAttribute("data-value") == seatID) {
  
        // Get the location of the row where we found the matching ID
        updateRowIndex = table.getElementsByTagName("tr")[i]; // Assign the value here

        let newData = parsedData[i-1]

        // Update the values in the cells with the updated data
        let cells = updateRowIndex.cells; 
        cells[1].innerHTML = newData.auditorium_id;
        // Show "NULL" on table when customer id is null
        cells[2].innerHTML = newData.customer_id ?? 'NULL';
        cells[3].innerHTML = newData.seat_row;
        cells[4].innerHTML = newData.seat_num;
        break;
      }
    }
  }