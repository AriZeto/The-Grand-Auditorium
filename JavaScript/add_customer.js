// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputEmail = document.getElementById("input-email");
    let inputPhoneNumber = document.getElementById("input-phone-number");
    let inputAge = document.getElementById("input-age");
    let inputBirthdate = document.getElementById("input-birthdate");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let emailValue = inputEmail.value;
    let phoneNumberValue = inputPhoneNumber.value;
    let ageValue = inputAge.value;
    let birthdateValue = inputBirthdate.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        email: emailValue,
        phone_number: phoneNumberValue,
        age: ageValue,
        birthdate: birthdateValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.responseText);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputEmail.value = '';
            inputPhoneNumber.value = '';
            inputAge.value = '';
            inputBirthdate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from Customers table
addRowToTable = (data) => {

    // Get a reference to the current table on the page
    let currentTable = document.getElementById("customers-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Format the birthdate to display only the date portion (YYYY-MM-DD)
    let formattedBirthdate = new Date(newRow.birthdate).toISOString().split('T')[0];

    // Create a row and cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneNumberCell = document.createElement("TD");
    let ageCell = document.createElement("TD");
    let birthdateCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.customer_id;
    nameCell.innerText = newRow.name;
    emailCell.innerText = newRow.email;
    phoneNumberCell.innerText = newRow.phone_number;
    ageCell.innerText = newRow.age;
    birthdateCell.innerText = newRow.birthdate.slice(0, 10);

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.customer_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneNumberCell);
    row.appendChild(ageCell);
    row.appendChild(birthdateCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.customer_id);

    // Add the row to the table
    currentTable.appendChild(row);



 // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // Find drop down menu, create a new option, fill data in the option,
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("customerSelect");
    let option = document.createElement("option");
    option.text = newRow.name;
    option.value = newRow.customer_id;
    selectMenu.add(option);
    // End of new step 8 code.

}