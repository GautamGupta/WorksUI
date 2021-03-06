// ==UserScript==
// @name                WorksUI
// @description         Improved WaterlooWorks experience
// @author              Gautam Gupta (gaut.am)
// @version             0.4
// @include             https://waterlooworks.uwaterloo.ca*
// ==/UserScript==
//
// Fork of MarmoUI https://github.com/lishid/MarmoUI/
//

// Variables here are volatile. They are not usable from within the page, but only within this script
var global_css = '.orbisFooter a{color:#FFF}#postingsTable .table-col--max-width{max-width:250px}#postingsTable .table-col--max-width-sm{max-width:200px}';

function loadWorksUI(run) {
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

function runWorksUI() {
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
        $(".orbisFooter .span6").append(" / <a href='https://github.com/GautamGupta/WorksUI' target='_blank'>WorksUI</a>");

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
            $('#postingsTable tr').find('.table-col--max-width-jobs a').each(function() {
                var text = $(this).text().trim();
                var href = $(this).attr('href');
                // Ellipsize job title if it's too long
                if (text.length > 33) {
                    $(this).html('<a href="' + href + '" title="' + text + '">' + text.substring(0, 32) + '&hellip;' + '</a>');
                }
            });
        }

        function duplicatePaginationBar() {
            $('#postingsTablePlaceholder .orbis-posting-actions').clone().insertAfter('#postingsTableDiv');
        }

        function optimizeJobsTable() {
            // Shorten text where possible
            $('#postingsTable a.favourite:contains("Remove from shortlist")').text('Shortlisted');
            $('#postingsTable a.btn-primary:contains("APPLY")').text('Apply');
            $('#postingsTable th:contains("Views") a').text('# Views');
            $('#postingsTable th:contains("Applications") a').text('# Apps');
            $('#postingsTable th:contains("Openings") a').text('# Openings');

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

            // Pagination also at the bottom of the page
            duplicatePaginationBar();
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

loadWorksUI(runWorksUI);

