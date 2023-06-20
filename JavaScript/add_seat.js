// Get the objects we need to modify
let addSeatForm = document.getElementById('add-seat-form-ajax');

// Modify the objects we need
addSeatForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputAuditoriumId = document.getElementById("input-auditorium-id");
    let inputCustomerId = document.getElementById("input-customer-id");
    let inputSeatRow = document.getElementById("input-seat-row");
    let inputSeatNum = document.getElementById("input-seat-num");
    let inputDate = document.getElementById("input-date");

    // Get the values from the form fields
    let auditoriumIdValue = inputAuditoriumId.value;
    let customerIdValue = inputCustomerId.value;
    let seatRowValue = inputSeatRow.value;
    let seatNumValue = inputSeatNum.value;
    let dateValue = inputDate.value;


    


    // If not Customer ID, set to 0 to indicate NULL.
    // if (!customerIdValue.length){
    //     customerIdValue = '0';
    // }
    // console.log( customerIdValue)

    // Put our data we want to send in a JavaScript object
    let data = {
        auditorium_id: auditoriumIdValue,
        customer_id: customerIdValue,
        seat_row: seatRowValue,
        seat_num: seatNumValue,
        date: dateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-seat-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputAuditoriumId.value = '';
            inputCustomerId.value = '';
            inputSeatRow.value = '';
            inputSeatNum.value = '';
            inputDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from Seats table
addRowToTable = (data) => {

    // Get a reference to the current table on the page
    let currentTable = document.getElementById("seats-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let seatIdCell = document.createElement("TD");
    let auditoriumIdCell = document.createElement("TD");
    let customerIdCell = document.createElement("TD");
    let seatRowCell = document.createElement("TD");
    let seatNumCell = document.createElement("TD");
    let dateCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    seatIdCell.innerText = newRow.seat_id;
    auditoriumIdCell.innerText = newRow.auditorium_id;
    // Show "NULL" on table when customer id is null
    customerIdCell.innerText = newRow.customer_id ?? 'NULL';
    seatRowCell.innerText = newRow.seat_row;
    seatNumCell.innerText = newRow.seat_num;
    dateCell.innerText = newRow.date.slice(0, 10);

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteSeats(newRow.seat_id);
    };

    // Add the cells to the row 
    row.appendChild(seatIdCell);
    row.appendChild(auditoriumIdCell);
    row.appendChild(customerIdCell);
    row.appendChild(seatRowCell);
    row.appendChild(seatNumCell);
    row.appendChild(dateCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.seat_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

 // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // Find drop down menu, create a new option, fill data in the option
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("seatSelect");
    let option = document.createElement("option");
    option.text = `(seat_id: ${newRow.seat_id}) Seat number: ${newRow.seat_num}`
    option.value = newRow.seat_id;
    selectMenu.add(option);
    // End of new step 8 code.


}



