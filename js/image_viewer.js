// Generated by CoffeeScript 1.9.2
(function() {
  
/*
    ImageViewer v1.0 (5) by: Cody Kochmann - kochmanncody@gmail.com
*/

var gen_fingerprint = function(){ // in reference to: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  return('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);}));
}
var b64=function(){
    // small base64 object for easy encoding/decoding with b64.e and b64.d
    // b64.eval() evaluates base64 stored javascript 
    // by: Cody Kochmann
    this.e = function(a){return(window.btoa(unescape(encodeURIComponent(a))))};
    this.d = function(a){return(decodeURIComponent(escape(window.atob(a))))};
    this.eval = function(a){return(eval(decodeURIComponent(escape(window.atob(a)))))};
}
b64=new b64();

/* snippet for NightMode */
var NightMode = function(){
    var a = document.createElement("style");
    a.innerHTML = "*{background:rgba(200, 200, 200, .5) !important;border-color:rgba(200, 200, 200, .5) !important;color:#b4b4b4 !important}body{background:#000 !important}a{text-decoration:none !important;color:#118bd9 !important}button,input,textarea{background-color:rgba(100, 100, 100, .2) !important;color:#b4b4b4 !important}";
    a.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(a)
};
  var ensure_array, remove_duplicates;

  ensure_array = function(obj) {
    var e, workspace;
    workspace = obj;
    try {
      workspace.pop();
    } catch (_error) {
      e = _error;
      return [obj];
    }
    return obj;
  };

  remove_duplicates = function(input_array) {
    var i, j, len, workspace;
    workspace = [];
    for (j = 0, len = input_array.length; j < len; j++) {
      i = input_array[j];
      if (workspace.indexOf(i) === -1) {
        workspace.push(i);
      }
    }
    return workspace;
  };

  String.prototype.contains = function(search_string) {
    var need, search_array, tmp;
    search_array = ensure_array(search_string);
    need = search_array.length;
    while (search_array.length > 0) {
      tmp = search_array.pop();
      if (this.indexOf(tmp) !== -1) {
        need = need - 1;
      }
    }
    if (need <= 0) {
      return true;
    }
    return false;
  };

  String.prototype.replaceAll = function(old_s, new_s) {
    var tmp, workspace;
    ensure_array(old_s);
    workspace = this;
    while (old_s.length > 0) {
      tmp = old_s.pop();
      workspace = workspace.split(tmp).join(new_s);
    }
    return workspace;
  };

  window.all_links = function(special_requirement, requirements_optional) {
    var all_text, e, i, j, len, missing, result, t;
    if (special_requirement == null) {
      special_requirement = [];
    }
    if (requirements_optional == null) {
      requirements_optional = true;
    }
    all_text = document.head.innerHTML + document.body.innerHTML;
    all_text = all_text.replaceAll(['\n', ' ', '"', '<', '>', 'url=', ';'], "'").split("'");
    result = [];
    while (all_text.length > 0) {
      try {
        t = all_text.pop();
        if (t.contains(["://", "http"])) {
          if (special_requirement !== [] || special_requirement !== "") {
            missing = 0;
            for (j = 0, len = special_requirement.length; j < len; j++) {
              i = special_requirement[j];
              if (requirements_optional) {
                if (t.contains(i)) {
                  if (result.indexOf(t) === -1) {
                    result.push(t);
                  }
                }
              } else {
                if (t.contains(i) === false) {
                  missing += 1;
                }
              }
            }
            if (missing === 0) {
              result.push(t);
            }
          } else {
            if (result.indexOf(t) === -1) {
              result.push(t);
            }
          }
        }
      } catch (_error) {
        e = _error;
        i = 0;
      }
    }
    result = remove_duplicates(result);
    return result;
  };

  window.loaded_queue = [];

  window.loaded_height = 0;

  window.vertical_padding = parseInt(screen.width * 0.01);

  window.empty_queue = function() {
    var tmp;
    if (loaded_queue.length > 0) {
      tmp = loaded_queue.pop();
      tmp.style.height = "auto";
      tmp.style.width = "98%";
      tmp.style.top = (loaded_height + vertical_padding).toString() + "px";
      loaded_height += parseInt(tmp.getBoundingClientRect().height);
      document.body.style.height = loaded_height.toString() + "px";
      return true;
    }
  };

  setInterval(empty_queue, 100);

  window.image_loaded = function() {
    loaded_queue.push(this);
    return true;
  };

  window.image_failed = function() {
    this.style.height = "0";
    this.style.width = "0";
    return true;
  };

  window.show_links = function(link_array) {
    var i;
    if (link_array == null) {
      link_array = [];
    }
    document.body.innerHTML = "";
    document.body.style.height = "auto !important";
    document.body.style.width = "100% !important";
    document.body.style.background = "black !important";
    document.body.style.paddingBottom = "0.25in !important";
    NightMode();
    while (link_array.length > 0) {
      i = document.createElement("img");
      i.id = b64.e(gen_fingerprint());
      i.src = link_array.pop();
      i.style.height = "0px";
      i.style.position = "absolute";
      i.style.float = "left";
      i.style.width = screen.width.toString() + "px";
      i.style.margin = "1%";
      i.style.top = "0px";
      i.style.left = "0px";
      i.onerror = image_failed;
      i.onload = image_loaded;
      document.body.appendChild(i);
    }
    return true;
  };

  show_links(all_links([".jpg", ".gif", ".tiff", ".png", ".webm"]));

}).call(this);
