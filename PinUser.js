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


function initMap() {
	var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
	var mapOptions = {
		zoom: 1,
		center: myLatlng
	}
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var marker = new google.maps.Marker({
		position: myLatlng,
		title:"mark 1"
	});

	// To add the marker to the map, call setMap();
	marker.setMap(map);

	var myLatlng = new google.maps.LatLng(0.0,0.0);

	var marker2 = new google.maps.Marker({
		position: myLatlng,
		title:"mark 2"
	});

	// To add the marker to the map, call setMap();
	marker2.setMap(map);

	//updates position and plugs it into a new marker that is set onto the map
    function onPositionUpdate(position){
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
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(onPositionUpdate);
        else
            alert("navigator.geolocation is not available");
	}
	pinCurrLoc();
}