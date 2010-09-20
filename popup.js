function getPerformance(performance) {
   //console.log(performance);
   addNavigation(performance);
   var timing = performance.timing;
   
   var navigationStart = timing.navigationStart;

   var totalTime = performance.timing.loadEventEnd - navigationStart;
   var unloadTime = performance.timing.unloadEventEnd - navigationStart;

   var redirectTime = 0;
   if (performance.navigation.redirectCount > 0) {
      redirectTime = performance.timing.redirectEnd -
         performance.timing.redirectStart;
   }
   
   var fetchStart = performance.timing.fetchStart;
   
   var dnsTime = performance.navigation.domainLookupEnd -
      performance.navigation.domainLookupStart;
      
   var connectTime = performance.navigation.connectEnd -
      performance.navigation.connectStart;
      
   var requestTime = performance.navigation.requestEnd -
      performance.navigation.requestStart;
   
   var responseTime = performance.navigation.responseEnd -
      performance.navigation.responseStart;
   

   addTiming(timing, "Unload", "navigationStart", "unloadEventEnd", totalTime);
   addTiming(timing, "DNS", "domainLookupStart", "domainLookupEnd", totalTime);
   addTiming(timing, "Connect", "connectStart", "connectEnd", totalTime);
   if (performance.navigation.redirectCount > 0)
      addTiming(timing, "Redirect", "redirectStart", "redirectEnd", totalTime);

   addTiming(timing, "Request", "requestStart", "requestEnd", totalTime);
   addTiming(timing, "Response", "responseStart", "responseEnd", totalTime);
   addTiming(timing, "Load", "navigationStart", "loadEventEnd", totalTime);
}

function getPercent(item, total)
{
   console.log(item);
   console.log(total);
   console.log(Math.round(100.0 * item / total));
   return Math.round(100.0 * item / total);
}

function addNavigation(performance) {
   var NAVIGATION_TYPE = ["Navigated", "Reloaded", "Back/Forwarded"];
   document.getElementById("navigation").innerHTML =
      NAVIGATION_TYPE[performance.navigation.type] +
      " at " + new Date(performance.timing.navigationStart);
}

function addTiming(timing, name, start, end, total) {
   var delta = timing[end] - timing[start];
   
   var div = document.createElement("div");
   div.innerHTML = name + ": " + delta + " ms";
   document.body.appendChild(div);
   
   if (delta > 0) {
      var chart = document.getElementById("chart");

      var dt = document.createElement("dt");
      dt.innerHTML = name + " " + delta + " ms";
      var widthPercent = getPercent(delta, total);
      var startPercent = getPercent((timing[start]-timing.navigationStart), total);
      dt.style.width = widthPercent + '%';
      dt.style.marginLeft = (startPercent > 0 ? startPercent : 0) + '%';

      chart.appendChild(dt);     
   }
}

function addTimingDelta(timing, name, start, end) {
   var div = document.createElement("div");
   var delta = timing[end] - timing[start];
   div.innerHTML = name + ": " + delta + " ms";
   document.body.appendChild(div);
}

window.onload = function() { 
   var bg = chrome.extension.getBackgroundPage();
   bg.getPerformance(getPerformance);
}
