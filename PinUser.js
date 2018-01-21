//this function sets the min on the map and sets the camera to it
/*function pinMe(latit, long) {
    var coords = {lat: latit, lng: long};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: coords
    });
    var marker = new google.maps.Marker({
        position: coords,
        map: map
    });
}
//this function gets the current position
function onPositionUpdate(position){
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    pinMe(lat, lng);
}
//this function is the main function. It calls all the functions either directly and/or indirectly
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onPositionUpdate);
}else{
    alert("geolocation is not currently available");
}
*/
//----------------------------------------new working multiple pins-----------------------------------------


//coordinate object
var coordinates = function(lats,longs){
     this.lats = lats;
     this.longs = longs;
}
//initializes empty array
function initArray(){
     var coordArray = [];
     return coordArray;
}
//pushes a new coordinate onto the list specified
function pushCoord(coordArr,lats,longs){
     var coord = new coordinates(lats,longs);
     coordArr.push(coord);
}

//initialize map
var map, infoWindow;
function initMap() {
    //initialize map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 20
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow = new google.maps.InfoWindow;
        infoWindow.setPosition(pos);
        infoWindow.setContent('You Are Here.');
        infoWindow.open(map);

        var coordList = initArray();
        var testCoord = new coordinates(10.1,25.0);
        
        coordList.push(testCoord);
        
        pushCoord(coordList,20.1,2.0);
        coordList.pop();
    
        map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

//initialize map
function oldInitMap() {
    system.log("initMap");

    //get my lat/long
    var myLatlng = new google.maps.LatLng(100,200);
    //create new map
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //create new location marker
    var newLocationMarker = new google.maps.Marker({
        position: myLatlng,
        title:"Current Location"
    });
    //add to new map
    newLocationMarker.setMap(map);

	//updates position and plugs it into a new marker that is set onto the map
    function onPositionUpdate(position){
        system.log("onPositionUpdate");
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        
        var myLatlng = new google.maps.LatLng(lat,lng);
        var mapOptions = {
            zoom: 4,
            center: myLatlng
        }
        var marker3 = new google.maps.Marker({
            position: myLatlng,
            title:"current location"
        });
        marker3.setMap(map);
    }
	//pulls current lat and long and plugs it into onPositionUpdate
	function pinCurrLoc(){
        system.log("pinCurrLoc");
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(onPositionUpdate);
        else
            alert("navigator.geolocation is not available");
	}
	pinCurrLoc();
}

function newPinDrop(position){
    system.log("newPinDrop");

    //infoWindow = new google.maps.InfoWindow;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var position = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        },function(){
            console.log("Couldn't get location.");
        });
    }else{
        console.out("No geolocation supported, must consent.");
    }

    console.log("Test 2: Lat: " + position.lat + " Lng: " + position.lng);
        
    //var myLatlng = new google.maps.LatLng(position.lat,position.lng);
    var myLatlng = new google.maps.LatLng(100,200); //<<<<<<this is what causes permission request
    //bad?
    var mapOptions = {
        zoom: 4,
        center: myLatlng
    }

    console.log("Test 3: Lat: " + position.lat + " Lng: " + position.lng);
        
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    ///bad?

    var newMarker = new google.maps.Marker({
        position: myLatlng,
        title:"Current Location"
    });
    newMarker.setMap(map);
}



