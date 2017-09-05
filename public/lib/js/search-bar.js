/** $(document).ready(function () {
  $( ".search-bar" ).autocomplete({
    source: function( request, response ) {
      $.ajax( {
        url: "/cities",
        type: "POST",
        dataType: "json",
        success: function( data ) {
          response( data );
        }
      });
    },
    response: function(event, ui) {
      
    }
  });
}); **/

function login(showhide){
  if(showhide == "show"){
    document.getElementById('popupbox').style.visibility="visible";
  }else if(showhide == "hide"){
    document.getElementById('popupbox').style.visibility="hidden"; 
  }
}