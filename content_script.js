// Send the information back to the extension
( function() {
   var performance = {};
   
   for (property in window.webkitPerformance) {
      if (typeof property == "undefined") continue;
      
      performance[property] = {};
         
      for (sproperty in window.webkitPerformance[property]) {
         if (typeof sproperty == "undefined") continue;
         
         performance[property][sproperty] = 
            window.webkitPerformance[property][sproperty];
      }
   }
   
   chrome.extension.sendRequest(performance);
} ) ();

