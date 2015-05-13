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
        for(var i in header_db){
            console.log(JSON.stringify(header_db[i]));
            var button_text = header_db[i]["title"];
            var dom_id = header_db[i]["dom_id"];
            $("#website_header").append("<p id='"+dom_id+"'>"+button_text+"</p>");
        }
    });



});



