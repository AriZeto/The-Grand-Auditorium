function deleteFilm(filmID) {
    let link = '/delete-film-ajax/';
    let data = {
      film_id: filmID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(filmID);
      }
    });
  }
  
  function deleteRow(filmID){
      let table = document.getElementById("films-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == filmID) {
              table.deleteRow(i);
              break;
         }
      }
  }