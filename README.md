# WorksUI

Improved WaterlooWorks experience. Fork of [MarmoUI](https://github.com/lishid/MarmoUI).

## Features

 * Better/optimal table layout to view job postings
   - Trim long job titles
   - Move id, # openings, and level to end of the table
   - Merge organization and division columns
   - Rename "Remove from shortlist" button to "Shortlisted" to save space
   - Rename columns to shorten column width where apt
   - Duplicate pagination at the bottom of the jobs table
 * Redirect to login page if the session expires
 * Better browser titles

## Installation

### Google Chrome
 * Open [WorksUI plugin](https://chrome.google.com/webstore/detail/worksui/pifacaonomblmikddmennhodpjncoclp) in Chrome Web Store and click "Add to Chrome"
 * Alternatively, download [`script.js`](https://raw.githubusercontent.com/GautamGupta/WorksUI/master/WorksUI-Chrome/scripts/script.js) (Right-click link -> Save Link As...)
    - Go to Tools -> Extensions (or type in `chrome://extensions` in the url bar)
    - Drag and drop `script.js` from where you downloaded it into the extensions page

### Mozilla Firefox
 * Download and install GreaseMonkey from [Greasemonkey in Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
 * Download and install [`script.js`](https://raw.githubusercontent.com/GautamGupta/WorksUI/master/WorksUI-Chrome/scripts/script.js)
 * Wait for the popup and click on "Install" button

### Apple Safari
 * Download and install GreaseKit from [Safari Add-ons](http://safariaddons.com/en-US/safari/addon/43)
 * Download and install [`script.js`](https://raw.githubusercontent.com/GautamGupta/WorksUI/master/WorksUI-Chrome/scripts/script.js)

### Opera
 * Follow the directions [here](http://www.opera.com/docs/userjs/using/#writingscripts) to setup the userscript folder
 * Put [`script.js`](https://raw.githubusercontent.com/GautamGupta/WorksUI/master/WorksUI-Chrome/scripts/script.js) in the userscript folder
 * Go to `opera:config` and search for `javascript`
 * Enable "User JavaScript on HTTPS" in "User Prefs" section

## Contributors

 * [GautamGupta](https://github.com/GautamGupta)
 * [PranavA](https://github.com/pranavanand123)

Please feel free to create a pull request to contribute.
