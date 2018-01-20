function onPositionUpdate(position){
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    pinMe(lat, lng);
}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onPositionUpdate);
}else{
    alert("geolocation is not currently available");
}

function pinMe(latit, long) {
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
