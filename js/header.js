var header_html = '<div id="website_header"><p id="name">Cody Kochmann</p><p id="projects_button">Projects</p><p id="snippets_button">Snippets</p><p id="resume_button">Resume</p></div>';
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
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});
    
});



