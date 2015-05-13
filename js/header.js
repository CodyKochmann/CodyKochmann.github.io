var header_html = '<div id="website_header"><p id="name">Cody Kochmann</p><p id="projects_button">Projects</p><p id="snippets_button">Snippets</p><p id="resume_button">Resume</p></div>';
$('document').ready(function() {
    $('body').append(header_html);
    var projects = $("#projects_button");
    var snippets = $("#snippets_button");
    var resume = $("#resume_button");

    projects.click(function(event) {
        window.location = "http://cody.pw/projects/";
    });
    snippets.click((function(){
        window.location = "http://cody.pw/snippets/"; 
    });
    resume.click((function(){
        window.location = "http://cody.pw/resume/"; 
    });
    
});
