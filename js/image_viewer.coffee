`
/*
    ImageViewer v1.0 by: Cody Kochmann - kochmanncody@gmail.com
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
    a.innerHTML = "*{background:rgba(200, 200, 200, .5) !important;border-color:rgba(200, 200, 200, .5) !important;color:#b4b4b4 !important}body{background:#000 !important}img{opacity:.75 !important}a{text-decoration:none !important;color:#118bd9 !important}button,input,textarea{background-color:rgba(100, 100, 100, .2) !important;color:#b4b4b4 !important}";
    a.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(a)
}`

ensure_array = (obj) ->
  workspace = obj
  try
    workspace.pop()
  catch e
    return([obj])
  obj  

remove_duplicates = (input_array) ->
  workspace=[]
  for i in input_array
    if workspace.indexOf(i) is -1
      workspace.push(i)
  workspace

String.prototype.contains = (search_string) ->
  search_array = ensure_array search_string
  need=search_array.length
  while search_array.length>0
    tmp=search_array.pop()
    if this.indexOf(tmp)!=-1
      need=need-1
  if need<=0
    return true
  false

String.prototype.replaceAll = (old_s,new_s) ->
  ensure_array(old_s)
  workspace = this
  while old_s.length>0
    tmp=old_s.pop()
    workspace=workspace.split(tmp).join(new_s)
  workspace

window.all_links = (special_requirement=[],requirements_optional=true) ->
  all_text = document.head.innerHTML + document.body.innerHTML
  all_text = all_text.replaceAll(['\n',' ','"','<','>','url=',';'],"'").split("'")
  result = []
  while(all_text.length>0)
    try
      t=all_text.pop()
      if t.contains(["://","http"])
        if special_requirement!=[] or special_requirement != ""
          missing=0
          for i in special_requirement
            if requirements_optional
              if t.contains(i)
                if result.indexOf(t) == -1
                  result.push t
            else
              if t.contains(i)==false
                missing+=1
          if missing == 0
            result.push t
        else
          if result.indexOf(t)==-1
            result.push t
    catch e
      i=0
  result=remove_duplicates(result)
  result

window.loaded_queue = []
window.loaded_height = 0
window.empty_queue = () ->
  if loaded_queue.length>0
    tmp = loaded_queue.pop()
    tmp.style.height="auto"
    tmp.style.width="98%"
    tmp.style.top=loaded_height.toString()+"px"
    loaded_height+=parseInt(tmp.getBoundingClientRect().height)
    true

setInterval empty_queue, 100

window.image_loaded = () ->
  loaded_queue.push(this)
  true

window.image_failed = () ->
  this.style.height="0"
  this.style.width="0"
  true  

window.show_links = (link_array=[]) ->
  document.body.innerHTML=""
  document.body.style.height="auto !important"
  document.body.style.width="100% !important"
  document.body.style.background="black !important"
  document.body.style.paddingBottom="0.25in !important"
  NightMode()
  while link_array.length > 0
    i = document.createElement("img")
    i.id = b64.e(gen_fingerprint())
    i.src = link_array.pop()
    i.style.height="0px"
    i.style.position="absolute"
    i.style.float="left"
    i.style.width=screen.width.toString()+"px"
    i.style.margin="1%"
    i.style.top="0px"
    i.style.left="0px"
    i.onerror=image_failed
    i.onload=image_loaded
    document.body.appendChild i
  true

show_links(all_links([".jpg",".gif",".tiff",".png",".webm"]))
