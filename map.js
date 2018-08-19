var map;
var center = {
    lat: 34.7,
    lng: 135.51
};
var markers = [];
var info_windows = [];

// mode
var mode = 0;
var Mode = {
    None: 0,
    AddSpots : 1,
    EditSpots : 2,
    DeleteSpots : 3,
    CalcWay : 4
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
	center: center,
	zoom: 8
    });

    map.addListener('click', function(e) { // add click event
	if (mode == Mode.AddSpots) { // add spot
	    addMarker(e.latLng);
	}
    });
}

function addMarker(lat_lng) {
    var marker = new google.maps.Marker({
	position: lat_lng,
	map: map
    });
    markers.push(marker);

    var [name, cost, note, images] = inputInfo();

    var info_window = new google.maps.InfoWindow({ // add info_window
	content: name + '<br>' + cost + '<br>' + note
    });
    marker.addListener('click', function() { // when marker is clicked
	if (mode == Mode.EditSpots) { // edit spot
	    var [name, cost, note, images] = inputInfo();
	    info_window.setContent(name + '<br>' + cost + '<br>' + note);
	    
	    return;
	} else if (mode == Mode.DeleteSpots) {// delete spot
	    if (confirm("このスポットを削除しますか")) {
		var delete_idx;
		for (var i = 0; i < markers.length; i += 1){
		    if (markers[i] == marker) {
			delete_idx = i;
			break;
		    }
		}
		// delete marker
		marker.setMap(null);
		markers.splice(delete_idx, 1);

		// delete info_window
		info_window.setMap(null);	    
		info_windows.splice(delete_idx, 1);	    
	    }
	    
	    return;
	}
	
	if (info_window.getMap() == null) {
	    info_window.open(map, marker);
	}else {
	    info_window.close(map, marker);
	}
    });
    info_windows.push(info_window);
}

function changeMode(m) {
    mode = m;
}

function inputInfo() {
    name = window.prompt("名前", "");
    cost = window.prompt("費用", "0円");
    note = window.prompt("備考", "");        
    images = window.prompt("写真(複数選択可)", "");
    return [name, cost, note, images];
}
