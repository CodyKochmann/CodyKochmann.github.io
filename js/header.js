var grep = function(theUrl) { /* reference link:http://stackoverflow.com/questions/247483/http-get-request-in-javascript*/
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

var inject_css = function(a) {
    var b = document.createElement("style");
    b.innerHTML = a;
    b.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(b)
}

inject_css(grep("css/header.css"));
//inject_css(grep("css/bug_reporter.css"));

var b64=function(){
    // small base64 object for easy encoding/decoding with b64.e and b64.d
    // by: Cody Kochmann
    this.e = function(a){return(window.btoa(unescape(encodeURIComponent(a))))};
    this.d = function(a){return(decodeURIComponent(escape(window.atob(a))))};
    this.eval = function(a){return(eval(decodeURIComponent(escape(window.atob(a)))))};
}
b64=new b64();

var header_db = {};
$('document').ready(function() {
    $('body').append('<div id="website_header"></div>');

    header_db = JSON.parse(grep( /*http://cody.pw/*/ "json/header.json"));
    console.log(header_db);
    for (var i in header_db) {
        var menu_item = header_db[i];
        var button_text = menu_item["title"];
        var dom_id = menu_item["dom_id"];
        $("#website_header").append("<p id='" + dom_id + "'>" + button_text + "</p>");
        for (x in menu_item["options"]) {
            $("#website_header").append("<p style='position:relative;' class='" + dom_id + "_option p_button' onclick='b64.eval(&#34;" + menu_item["options"][x]["callback"] + "&#34;)'>" + menu_item["options"][x]["text"] + "</p>");
        }
    }
});

var bug_rep = function() {
    $("body").append("<div id='bug_report'></div>");
    var new_html = grep("http://192.168.1.66:8080/bug_reporter");
    $("#bug_report").append(new_html);
    alert(new_html);
    setInterval(function() {
        try{
            if (document.getElementById('message_box').value.length > 0) {
                document.getElementById('submit_button').style.display = "block";
            } else {
                document.getElementById('submit_button').style.display = "none";
            }
        }catch(e){
            false;
        }
    }, 1000);

}
