function deleteSeats(seatID) {
    let link = '/delete-seat-ajax/';
    let data = {
      seat_id: seatID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(seatID);
      }
    });
  }
  
  function deleteRow(seatID){
      let table = document.getElementById("seats-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == seatID) {
              table.deleteRow(i);
              break;
         }
      }
  }