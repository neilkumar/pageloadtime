// Send the information back to the extension
( function() {
   chrome.extension.sendRequest(JSON.stringify(window.webkitPerformance));
} ) ();

