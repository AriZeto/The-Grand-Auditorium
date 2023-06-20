// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerId = document.getElementById("customerSelect");
    let inputFullName = document.getElementById("input-name-update");
    let inputEmail = document.getElementById("input-email-update");
    let inputPhoneNumber = document.getElementById("input-phone-number-update");
    let inputAge = document.getElementById("input-age-update");
    let inputBirthdate = document.getElementById("input-birthdate-update");

    // Get the values from the form fields
    let customerIdValue = inputCustomerId.value;
    let fullNameValue = inputFullName.value;
    let emailValue = inputEmail.value;
    let phoneNumberValue = inputPhoneNumber.value;
    let ageValue = inputAge.value;
    let birthdateValue = inputBirthdate.value;

    // Check for NULL values
    if (!customerIdValue || !fullNameValue || !emailValue || !phoneNumberValue || !ageValue || !birthdateValue) {
        console.log("Please fill in all the fields.");
        return;
    }

    // Put our data we want to send in a JavaScript object
    let data = {
        customer_id: customerIdValue,
        name: fullNameValue,
        email: emailValue,
        phone_number: phoneNumberValue,
        age: ageValue,
        birthdate: birthdateValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {

          // Add the new data to the table
          updateRow(xhttp.response, customerIdValue);

      }
      else if (xhttp.readyState == 4 && xhttp.status != 200) {
          console.log("There was an error with the input.")
      }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));

})

function updateRow(data, customerId) {
  let parsedData = JSON.parse(data);
  
  let table = document.getElementById("customers-table");

  for (let i = 0, row; (row = table.rows[i]); i++) {
    // Iterate through rows
    // Rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == customerId) {

      // Get the location of the row where we found the matching customer ID
      updateRowIndex = table.getElementsByTagName("tr")[i]; // Assign the value here
      
      let newData = parsedData[i-1]
      // Update the values in the cells with the updated data
      let cells = updateRowIndex.cells; 
      cells[1].innerHTML = newData.name;
      cells[2].innerHTML = newData.email;
      cells[3].innerHTML = newData.phone_number;
      cells[4].innerHTML = newData.age;
      cells[5].innerHTML = newData.birthdate.slice(0, 10);
      break;
    }
  }
}