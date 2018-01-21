//coordinate object
var coordinates = function (lats, longs, titles) {
    this.lats = lats;
    this.longs = longs;
    this.titles = titles;
}

//initializes empty array
function initArray() {
    var coordArray = [];
    return coordArray;
}

//pushes a new coordinate onto the list specified
function pushCoord(coordArr, lats, longs, titles) {
    var coord = new coordinates(lats, longs, titles);
    coordArr.push(coord);
}

//initialize map
var map, infoWindow, toilet_obj;
var coordList, markerList;


// Just wrapped the initMap function and the ones following it with the Angulur Controller.  Can only access the contents of the relation from the toilet database in the scope of the angular controller.  If accessed outside of its scope, it is undefined.  Since it was undefined, there was difficulty in finding its length.  We believe res.data["Data"] is an array at the moment.
// Richard is in the process of trying to post.

function initMap() {
    //initialize map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.0003729, lng: -122.06236639999997 },
        zoom: 20
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow = new google.maps.InfoWindow;
            infoWindow.setPosition(pos);
            infoWindow.setContent('Current Location.');
            infoWindow.open(map);

            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    infowindow = new google.maps.InfoWindow({
        content: document.getElementById('form')
    });
    messagewindow = new google.maps.InfoWindow({
        content: document.getElementById('message')
    });
    google.maps.event.addListener(map, 'click', function (event) {
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });


        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
    });
}


var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
//    $scope.loc_id = 123456;
    //$scope.name = toilet.name;
//    $scope.rating = "Clean";
//    $scope.notes = "I had an amazing experience";

    $http.get("/api/toilets").then(function (res) {
        //$scope.name = res.data["Data"][0].toilet_name;
        $scope.obj = res.data["Data"];
        toilet_obj = $scope.obj;
        coordList = initArray();
        
        // Initialize array of coordinates
        var itor = 0;
        while (toilet_obj[itor] != null) {
            var lat = toilet_obj[itor].toilet_lat;
            var lon = toilet_obj[itor].toilet_lon;
            var name = toilet_obj[itor].toilet_name;
            pushCoord(coordList, lat, lon, name);
            itor++;
        }
        
        // Initialize array of markers
        // Set all markers from database
        markerList = initArray();
        itor = 0;
        while (coordList[itor] != null) {
           var pos = new google.maps.LatLng((coordList[itor].lats),   (coordList[itor].longs));
            
            markerList[itor] = new google.maps.Marker({
                position: pos,
                title: coordList[itor].titles
            });
            markerList[itor].setMap(map);
            
            itor++;
        }
    });
});


function saveData() {
    var name = escape(document.getElementById('name').value);
    var address = escape(document.getElementById('address').value);
    var type = document.getElementById('type').value;
    var latlng = marker.getPosition();
    //post toilet
    //post entry
}

// Drops Random Marker
function dropRandMarker() {
    var randPos = new google.maps.LatLng(Math.random() * 170.0 - 85, Math.random() * 360.0 - 180);
    dropNewMarker(randPos);
}

// Drops a New Marker
function dropNewMarker(position) {
    map.setCenter(position);

    var marker = new google.maps.Marker({
        position: position,
        title: "Random Marker"
    });
    marker.setMap(map);
}

// Handles Location Error
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function newPinDrop(position) {
    system.log("newPinDrop");

    //infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var position = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        }, function () {
            console.log("Couldn't get location.");
        });
    } else {
        console.out("No geolocation supported, must consent.");
    }

    console.log("Test 2: Lat: " + position.lat + " Lng: " + position.lng);

    //var myLatlng = new google.maps.LatLng(position.lat,position.lng);
    var myLatlng = new google.maps.LatLng(100, 200); //<<<<<<this is what causes permission request
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
        title: "Current Location"
    });
    newMarker.setMap(map);
}

//var text = '{ "toilet_lat":"33.44", "toilet_lon":"-34", "name":"Uluru"}';
//var obj = JSON.parse(text);  

//var app = angular.module('myApp', []);
//app.controller('myCtrl', function ($scope) {
//    $scope.loc_id = 123456;
//    $scope.name = toilet.name;
//    $scope.rating = "Clean";
//    $scope.notes = "I had an amazing experience";
//});

//var app = angular.module('myApp', []);
//app.controller('myCtrl', function ($scope, $http) {
////    $scope.loc_id = 123456;
//    //$scope.name = toilet.name;
////    $scope.rating = "Clean";
////    $scope.notes = "I had an amazing experience";
//
//    $http.get("/api/toilets").then(function (res) {
//        $scope.name = res.data["Data"][0].toilet_name;
//    }); 
//});