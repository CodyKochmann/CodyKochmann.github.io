function grep(theUrl){ /* reference link:http://stackoverflow.com/questions/247483/http-get-request-in-javascript*/
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var header_html = '<div id="website_header"></div>';
var header_db = {};
$('document').ready(function() {
    $('body').append(header_html);
    
    header_db = JSON.parse(grep("http://cody.pw/json/header.json"));
    console.log(header_db);
    for(var i in header_db){
        var menu_item = header_db[i];
        var button_text = menu_item["title"];
        var dom_id = menu_item["dom_id"];
        $("#website_header").append("<p id='"+dom_id+"'>"+button_text+"</p>");
    }
    for(var i in header_db){
        var menu_item = header_db[i];
        var button_text = menu_item["title"];
        var dom_id = menu_item["dom_id"];
        for (var x in menu_item["options"]){
            var option = menu_item["options"][x];
            console.log(option)
            $("#website_header").append("<p class='"+dom_id+"_option'>"+option+"</p>");
        }
    }
});



