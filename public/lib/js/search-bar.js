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

$(document).ready(function() {
  $( ".fav" ).click(function() {
    if ($(this).hasClass("favourite")) {
      $(this).css("color", "black");
      $(this).removeClass("favourite");
    }
    else {
      $(this).css("color", "#c6a30a");
      $(this).addClass("favourite");
      var city = $(this).parent().text();
      console.log("city : " + city);
      $.ajax({
        url: "/addfavourite/" + city,
        method: "POST",
        success: function(data) {
          console.log(data);
        }
      });
    }
  });

  $( ".deleteFav" ).click(function() {
    var city = $(this).parent().text();
    $(this).parent().css("display", "none");
    $.ajax({
      url: "/deletefavourite/" + city,
      method: "POST",
      success: function(data) {
        console.log(data);
      }
    });
  });

});

function search() {
  var input, filter, ul, li, a, i;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("places");
  li = ul.getElementsByClassName('city');
  
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByClassName("nameCity")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
