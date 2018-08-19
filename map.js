var map;
var center = {
    lat: 34.7,
    lng: 135.51
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
	center: center,
	zoom: 8
    });

    map.addListener('click', function(e) { // add click event
	if (true) { // mode = 1
	    addMarker(e.latLng);
	}
    });

    addMarker(center);
}

function addMarker(lat_lng) {
    var marker = new google.maps.Marker({
	position: lat_lng,
	map: map
    });

    var info_window = new google.maps.InfoWindow({ // add info_window
	content: '<div class="map">test</div>'
    });
    marker.addListener('click', function() { // when marker is clicked
	if (info_window.getMap() == null) {
	    info_window.open(map, marker);
	}else {
	    info_window.close(map, marker);
	}
    });
}
