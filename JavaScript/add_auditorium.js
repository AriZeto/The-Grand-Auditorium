// Get the objects we need to modify
let addAuditoriumForm = document.getElementById('add-auditorium-form-ajax');

// Modify the objects we need
addAuditoriumForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFilmId = document.getElementById("input-film-id");
    let inputRoomName = document.getElementById("input-room-name");
    let inputNumSeat = document.getElementById("input-num-seats");

    // Get the values from the form fields
    let filmIdValue = inputFilmId.value;
    let roomNameValue = inputRoomName.value;
    let numSeatValue = inputNumSeat.value;

    // Put our data we want to send in a javascript object
    let data = {
        film_id: filmIdValue,
        room_name: roomNameValue,
        num_seat: numSeatValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-auditorium-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFilmId.value = '';
            inputRoomName.value = '';
            inputNumSeat.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})



// Creates a single row from an Object representing a single record from Auditoriums table
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("auditoriums-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let filmIdCell = document.createElement("TD");
    let roomNameCell = document.createElement("TD");
    let numSeatCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.auditorium_id;
    filmIdCell.innerText= newRow.film_id;
    roomNameCell.innerText = newRow.room_name;
    numSeatCell.innerText = newRow.num_seat;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteAuditorium(newRow.auditorium_id);
    };


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(filmIdCell);
    row.appendChild(roomNameCell);
    row.appendChild(numSeatCell);
    row.appendChild(deleteCell);
    
    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.auditorium_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // Find drop down menu, create a new option, fill data in the option
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("auditoriumSelect");
    let option = document.createElement("option");
    option.text = `(id: ${newRow.auditorium_id}) ${newRow.room_name}`;
    option.value = newRow.auditorium_id;
    selectMenu.add(option);
    // End of new step 8 code.
}