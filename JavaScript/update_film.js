// Get the objects we need to modify
let updateFilmForm = document.getElementById('update-film-form-ajax');

// Modify the objects we need
updateFilmForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFilmID = document.getElementById("filmSelect");
    let inputTitle = document.getElementById("input-title-update");
    let inputDescription = document.getElementById("input-description-update");
    let inputDirector = document.getElementById("input-director-update");
    let inputStudio = document.getElementById("input-studio-update");
    let inputYear = document.getElementById("input-year-update");
    let inputRuntime = document.getElementById("input-runtime-update");
    let inputShowTime = document.getElementById("input-showtime-update");
    let inputPrice = document.getElementById("input-price-update");
    let inputRating = document.getElementById("input-rating-update");

    // Get the values from the form fields
    let filmIDValue = inputFilmID.value;
    let titleValue = inputTitle.value;
    let descriptionValue = inputDescription.value;
    let directorValue = inputDirector.value;
    let studioValue = inputStudio.value;
    let yearValue = inputYear.value;
    let runtimeValue = inputRuntime.value;
    let showtimeValue = inputShowTime.value;
    let priceValue = inputPrice.value;
    let ratingValue = inputRating.value;

    
    // Check for NULL values
    if (!filmIDValue || !titleValue || !descriptionValue || !directorValue || !studioValue || !yearValue || !runtimeValue || !showtimeValue || !priceValue || !ratingValue) {
        console.log("Please fill in all the fields.");
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        film_id: filmIDValue,
        title: titleValue,
        description: descriptionValue,
        director: directorValue,
        studio: studioValue,
        year: yearValue,
        runtime: runtimeValue,
        showtime: showtimeValue,
        price: priceValue,
        rating: ratingValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-film-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            console.log('testing this.')
            console.log(xhttp.response)
            updateRow(xhttp.response, filmIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, filmID) {
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("films-table");
  
    for (let i = 0, row; row = table.rows[i]; i++) {
      // Iterate through rows
      // Rows would be accessed using the "row" variable assigned in the for loop
      if (table.rows[i].getAttribute("data-value") == filmID) {
  
        // Get the location of the row where we found the matching film ID
        updateRowIndex = table.getElementsByTagName("tr")[i]; // Assign the value here
        console.log(updateRowIndex);
  
        console.log(parsedData);
        let newData = parsedData[i-1]

        // Update the values in the cells with the updated data
        let cells = updateRowIndex.cells; 
        cells[1].innerHTML = newData.title;
        cells[2].innerHTML = newData.description;
        cells[3].innerHTML = newData.director;
        cells[4].innerHTML = newData.studio;
        cells[5].innerHTML = newData.year;
        cells[6].innerHTML = newData.runtime;
        cells[7].innerHTML = newData.showtime;
        cells[8].innerHTML = newData.price;
        cells[9].innerHTML = newData.rating;
        break;
      }
    }
  }