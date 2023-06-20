// Get the objects we need to modify
let updateAuditoriumCustomersForm = document.getElementById('update-auditorium-customer-form-ajax');

// Modify the objects we need
updateAuditoriumCustomersForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputAuditoriumCustomerID = document.getElementById("auditoriumCustomerSelect");
    let inputAuditoriumID = document.getElementById("input-auditorium-update");
    let inputCustomerID = document.getElementById("input-customer-update");

    // Get the values from the form fields
    let auditoriumCustomerIDValue = inputAuditoriumCustomerID.value;
    let auditoriumIDValue = inputAuditoriumID.value;
    let customerIDValue = inputCustomerID.value;
    
    // Check for NULL values
    if (!auditoriumCustomerIDValue || !auditoriumIDValue || !customerIDValue) {
        console.log("Please fill in all the fields.");
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        auditorium_customer_id: auditoriumCustomerIDValue,
        auditorium_id: auditoriumIDValue,
        customer_id: customerIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-auditorium-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, auditoriumCustomerIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, auditoriumCustomerID) {
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("auditoriums_customers-table");
  
    for (let i = 0, row; row = table.rows[i]; i++) {
      // Iterate through rows
      // Rows would be accessed using the "row" variable assigned in the for loop
      if (table.rows[i].getAttribute("data-value") == auditoriumCustomerID) {
  
        // Get the location of the row where we found the matching ID
        updateRowIndex = table.getElementsByTagName("tr")[i]; // Assign the value here

        let newData = parsedData[i-1]

        // Update the values in the cells with the updated data
        let cells = updateRowIndex.cells; 
        cells[1].innerHTML = newData.auditorium_id;
        cells[2].innerHTML = newData.customer_id;
        break;
      }
    }
  }