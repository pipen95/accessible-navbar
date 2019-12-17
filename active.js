$( document ).ready(function() {
  var $yourSidebar = $(".sidebar");
$(document).on("click.toggleNav touch.toggleNav", ".show", function(){ 
 $yourSidebar.toggleClass("open");
});

});