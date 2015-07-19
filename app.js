$(document).ready(function(){
 	$('select').material_select();
 	
    $(".button-collapse").sideNav();
        
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
});

window.addEventListener("load", function() {
  
  //Will automatically send message with location when battery lvl is < 5
  (function () {
    
    var battery = navigator.battery;
       
    if (battery) {
        function setStatus () {
            
            var lvl = Math.round(battery.level * 100) ;
            if (lvl < 5){
                location();
            }
            
        }
        // Set initial status
        setStatus();
        
    }
})();
  
  function location() {
  var output = document.getElementById("out");
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  else{
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    var map = 'https://www.google.co.in/maps/place/'+latitude+','+longitude;
    var text= '<a href='+map+'>'+map+'</a>';
    //output.innerHTML = text;
    
    //var img = new Image();
    //img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=15&size=300x300&sensor=false";

    //output.appendChild(img);
    notif(map);
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  navigator.geolocation.getCurrentPosition(success, error);
  }
    
  }
  
  function notif(text) {
  var output1 = "Hi i am in emergency, help me. I am here " + text;
                        
  if (!"Notification" in window) {
    alert("Notification not supported");
  }
  else if (Notification.permission === "granted") {
    var notification = new Notification(output1);
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification(output1);
      }
    });
  }
    
    notification.onclick = function(){
    var navURL = new MozActivity(
   {
       name: "view",
       data: {
           type: "url",
           url: "https://www.google.co.in/maps/place/"
       }
   });
   navUrl.onsuccess = function () {
       // fired if appication is running foreground
   }
   navUrl.onerror = function () {
       // fired if application is running background
       navigator.mozApps.getSelf().onsuccess = function (){
           this.result.launch();
       }
   }
};
    
     msg(output1);
   }
  
  function msg(text){
window.open("sms:+918824128141?body="+text,'_self');
 }
  
  location();
  
});


