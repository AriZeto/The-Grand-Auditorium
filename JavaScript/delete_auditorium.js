function deleteAuditorium(auditoriumID) {
    let link = '/delete-auditorium-ajax/';
    let data = {
      auditorium_id: auditoriumID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(auditoriumID);
      }
    });
  }
  
  function deleteRow(auditoriumID){
      let table = document.getElementById("auditoriums-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == auditoriumID) {
              table.deleteRow(i);
              break;
         }
      }
  }