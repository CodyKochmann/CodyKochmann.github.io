var header_html = '<div id="website_header"></div>';
var header_db = {};
$('document').ready(function() {
    $('body').append(header_html);

    /*$("#projects_button").click(function(event) {
        window.location = "http://cody.pw/projects/";
    });
    $("#snippets_button").click((function(){
        window.location = "http://cody.pw/snippets/"; 
    });
    $("#resume_button").click((function(){
        window.location = "http://cody.pw/resume/"; 
    });*/
    
$.getJSON( "http://cody.pw/json/header.json", function( data ) {
    header_db = data;
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + JSON.stringify(val) + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});

});



