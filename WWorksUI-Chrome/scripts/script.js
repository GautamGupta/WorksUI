// ==UserScript==
// @name                WWorksUI
// @description         Improved WaterlooWorks experience
// @author              Product Vision Club (productvisionclub.com)
// @version             0.2.2
// @include             https://waterlooworks.uwaterloo.ca*
// ==/UserScript==
//
// Fork of MarmoUI https://github.com/lishid/MarmoUI/
//

// Variables here are volatile. They are not usable from within the page, but only within this script
var global_css = '.orbisFooter a{color:#FFF}#postingsTable tr.isNew td{background-color:#FFFFE0}#postingsTable tr.isNew:hover td{background-color:#FFFACD}#postingsTable .table-col--max-width{max-width:250px}#postingsTable .table-col--max-width-sm{max-width:200px}';

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
    var PAGE = {
        JOBS:        {value: 0, link: "myAccount/co-op/coop-postings.htm"},
        LOGGED_OUT:  {value: 1, link: "notLoggedIn.htm"}
    };
    var current_page = -1;

    function applyChangesAll() {
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
        $(".orbisFooter .span6").append(" / <a href='https://github.com/ProductVisionClub/WWorksUI' target='_blank'>WWorksUI</a> by <a href='http://productvisionclub.com/' target='_blank'>Product Vision Club</a>");

        // Google analytics helps for statistics
        $("head").append("<script type='text/javascript'>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-6851149-15', 'auto');ga('send', 'pageview');</script>");
    }

    function applyChangesJobs() {
        function moveTableColumn(table, from, to) {
            var rows = $('tr', table);
            var cols;
            rows.each(function() {
                cols = $(this).children('th, td');
                cols.eq(from).detach().insertBefore(cols.eq(to));
            });
        }

        function shortenJobTitle() {
            $('#postingsTable tr').find('.table-col--max-width-jobs a').filter(function() {
                var href = $(this).attr('href');
                // Ellipsize job title if it's too long
                if ($(this).text().length > 42) {
                    $(this).html('<a href="' + href + '" title="' + $(this).text() + '">' + $(this).text().substring(0, 41) + '&hellip;' + '</a>');
                }
            });
        }

        function optimizeJobsTable() {
            // Shorten text where possible
            $('#postingsTable a.favourite:contains("Remove from shortlist")').text('Shortlisted');
            $('#postingsTable a.btn-primary:contains("APPLY")').text('Apply');
            $('#postingsTable th:contains("Views") a').text('# Views');
            $('#postingsTable th:contains("Applications") a').text('# Apps');

            // Move id and level columns to the end
            moveTableColumn($('#postingsTable'), 1, 12); // ID
            moveTableColumn($('#postingsTable'), 4, 12); // # Openings
            moveTableColumn($('#postingsTable'), 6, 12); // Level

            // Merge Organization & Division Column
            $('#postingsTable tr').find('th, td').filter(':nth-child(3)').append(function() {
                return '<br />' + $(this).next().remove().text();
            });

            // Add max-width to Title, Organization, Location
            $('#postingsTable tr').find('th, td').filter(':nth-child(2)').addClass('table-col--max-width-jobs');
            $('#postingsTable tr').find('th, td').filter(':nth-child(3)').addClass('table-col--max-width');
            $('#postingsTable tr').find('th, td').filter(':nth-child(4)').addClass('table-col--max-width-sm');
            shortenJobTitle();
        }

        $('body').addClass('page--jobs');
        optimizeJobsTable();
        $(document).ajaxStop(optimizeJobsTable); // pagination, sorting, etc result in ajax calls which undo the modifications
    }

    function applyChangesLoggedOut() {
        // The login page shown when session expires isn't the one we want
        window.location.replace("https://cas.uwaterloo.ca/cas/login?service=https://waterlooworks.uwaterloo.ca/waterloo.htm");
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
            applyChangesJobs();
            break;
        case PAGE.LOGGED_OUT.value:
            applyChangesLoggedOut();
            break;
    }
}

loadWWorksUI(runWWorksUI);

