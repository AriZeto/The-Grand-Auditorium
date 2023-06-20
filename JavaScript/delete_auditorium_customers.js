function deleteAuditoriumCustomers(auditoriumCustomerID) {
    let link = '/delete-auditorium-customers-ajax/';
    let data = {
        auditorium_customer_id: auditoriumCustomerID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(auditoriumCustomerID);
      }
    });
  }
  
  function deleteRow(auditoriumCustomerID){
      let table = document.getElementById("auditoriums_customers-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == auditoriumCustomerID) {
            table.deleteRow(i);
            console.log(table);
            break;
         }
      }
  }