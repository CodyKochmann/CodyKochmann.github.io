function grep(theUrl){ /* reference link:http://stackoverflow.com/questions/247483/http-get-request-in-javascript*/
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}
function b64_eval(str){
    var code = b64_to_utf8(str); 
    eval(code);
}

var header_html = '<div id="website_header"></div>';
var header_db = {};
$('document').ready(function() {
    $('body').append(header_html);
    
    header_db = JSON.parse(grep(/*http://cody.pw/*/"json/header.json"));
    console.log(header_db);
    for(var i in header_db){
        var menu_item = header_db[i];
        var button_text = menu_item["title"];
        var dom_id = menu_item["dom_id"];
        $("#website_header").append("<p id='"+dom_id+"'>"+button_text+"</p>");
        for (x in menu_item["options"]){
            $("#website_header").append("<p style='position:absolute;' class='"+dom_id+"_option p_button' onclick='b64_eval(&#34;"+menu_item["options"][x]["callback"]+"&#34;)'>"+menu_item["options"][x]["text"]+"</p>");
        }
    }
});



