// Get the objects we need to modify
let addFilmForm = document.getElementById('add-film-form-ajax');

// Modify the objects we need
addFilmForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("input-title");
    let inputDescription = document.getElementById("input-description");
    let inputDirector = document.getElementById("input-director");
    let inputStudio = document.getElementById("input-studio");
    let inputYear = document.getElementById("input-year");
    let inputRuntime = document.getElementById("input-runtime");
    let inputShowtime = document.getElementById("input-showtime");
    let inputPrice = document.getElementById("input-price");
    let inputRating = document.getElementById("input-rating");

    // Get the values from the form fields
    let titleValue = inputTitle.value;
    let descriptionValue = inputDescription.value;
    let directorValue = inputDirector.value;
    let studioValue = inputStudio.value;
    let yearValue = inputYear.value;
    let runtimeValue = inputRuntime.value;
    let showtimeValue = inputShowtime.value;
    let priceValue = inputPrice.value;
    let ratingValue = inputRating.value;

    // Put our data we want to send in a javascript object
    let data = {
        title: titleValue,
        description: descriptionValue,
        director: directorValue,
        studio: studioValue,
        year: yearValue,
        runtime: runtimeValue,
        showtime: showtimeValue,
        price: priceValue,
        rating: ratingValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-film-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTitle.value = '';
            inputDescription.value = '';
            inputDirector.value = '';
            inputStudio.value = '';
            inputYear.value = '';
            inputRuntime.value = '';
            inputShowtime.value = '';
            inputPrice.value = '';
            inputRating.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from Films table
addRowToTable = (data) => {

    // Get a reference to the current table on the page
    let currentTable = document.getElementById("filmsTableBody");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");
    let directorCell = document.createElement("TD");
    let studioCell = document.createElement("TD");
    let yearCell = document.createElement("TD");
    let runtimeCell = document.createElement("TD");
    let showtimeCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let ratingCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.film_id;
    titleCell.innerText = newRow.title;
    descriptionCell.innerText = newRow.description;
    directorCell.innerText = newRow.director;
    studioCell.innerText = newRow.studio;
    yearCell.innerText = newRow.year;
    runtimeCell.innerText = newRow.runtime;
    showtimeCell.innerText = newRow.showtime;
    priceCell.innerText = newRow.price;
    ratingCell.innerText = newRow.rating;


    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteFilm(newRow.film_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(descriptionCell);
    row.appendChild(directorCell);
    row.appendChild(studioCell);
    row.appendChild(yearCell);
    row.appendChild(runtimeCell);
    row.appendChild(showtimeCell);
    row.appendChild(priceCell);
    row.appendChild(ratingCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.film_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

 // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // Find drop down menu, create a new option, fill data in the option (film title, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("filmSelect");
    let option = document.createElement("option");
    option.text = newRow.title;
    option.value = newRow.film_id;
    selectMenu.add(option);
    // End of new step 8 code.
}