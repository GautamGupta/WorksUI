// ==UserScript==
// @name                WWorksUI
// @description         Improved WaterlooWorks experience
// @author              Gautam Gupta (www.Gaut.am)
// @version             0.1
// @include             https://waterlooworks.uwaterloo.ca*
// ==/UserScript==
//
// Fork of MarmoUI https://github.com/lishid/MarmoUI/
//

// Variables here are volatile. They are not usable from within the page, but only within this script
var global_css = ".orbisFooter a{color: #FFF;}";

function loadWWorksUI(run) {
    function appendToHead(element) {
        document.getElementsByTagName("head")[0].appendChild(element);
    }

    function loadStyle() {
        var style = document.createElement("style");
        style.type = "text/css";
        if (style.styleSheet) style.styleSheet.cssText = global_css;
        else style.appendChild(document.createTextNode(global_css));
        appendToHead(style);
    }

    function loadScript(run) {
        // WW loads jQuery so we don't need to
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.textContent = "(" + run.toString() + ")()";
        document.body.appendChild(script);
    }

    loadStyle();
    loadScript(run);
}

function runWWorksUI() {
    // Script-wise global variables that we can use here
    var EMBED_DATA = {}; // Embedded data in base64 form

    var PAGE = {
        JOBS: {value: 0, link: "myAccount/co-op/coop-postings.htm"}
    };
    var current_page = -1; //By default, we'll assume it's the login page

    function applyChangesAll(current_page) {

        function modifyTitle(title) {
            title = title.split(" - ");
            title = title.slice(2);
            title = title.reverse();
            title.push("WaterlooWorks");
            return title.join(" - ");
        }
        
        // Change browser title
        document.title = modifyTitle(document.title);

        // Remove current time and replace by an actual footer
        $(".orbisFooter .span6").append(" / <a href='https://github.com/GautamGupta/WWorksUI' target='_blank'>WWorksUI</a> by <a href='http://gaut.am/' target='_blank'>Gautam Gupta</a>");

        // Google analytics helps for statistics
        $("body").append("<script type='text/javascript'>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-6851149-15', 'auto');ga('send', 'pageview');</script>");
    }

    // Find out which page we're on
    var path = $(location).attr("href");
    for (var page in PAGE) {
        if (path.indexOf(PAGE[page].link) >= 0) {
            current_page = PAGE[page].value;
        }
    }

    // Universial pages changes
    applyChangesAll(current_page);

    // Page specific changes
    switch (current_page) {
        case PAGE.JOBS.value:
            break;
    }
}

loadWWorksUI(runWWorksUI);
