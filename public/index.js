var map;
var center = {
    lat: 34.7,
    lng: 135.51
};
var markers = [];
var info_windows = [];
var json_data = [
    {
	metadata : {
	    id : "po",
	    pass : "po"
	},
	content : {
	    "nova" : {
		type : "0",
		cost : "100円",
		note : "test",
		images : "http://static.asiawebdirect.com/m/bangkok/portals/vietnam/homepage/hanoi/pagePropertiesOgImage/teaser_006.jpg.jpg",
		lat : center.lat,
		lng : center.lng
	    },
	    "hanoi station" : {
		type : "1",
		cost : "0円",
		note : "test1",
		images : "http://static.asiawebdirect.com/m/bangkok/portals/vietnam/homepage/hanoi/pagePropertiesOgImage/teaser_006.jpg.jpg",
		lat : center.lat + 0.3,
		lng : center.lng - 0.2
	    },
	    "hanoi" : {
		type : "2",
		cost : "1000円",
		note : "test1",
		images : "http://static.asiawebdirect.com/m/bangkok/portals/vietnam/homepage/hanoi/pagePropertiesOgImage/teaser_006.jpg.jpg",
		lat : center.lat + 0.2,
		lng : center.lng - 0.2
	    },
	    "hanoi2" : {
		type : "2",
		cost : "1000円",
		note : "test1",
		images : "http://static.asiawebdirect.com/m/bangkok/portals/vietnam/homepage/hanoi/pagePropertiesOgImage/teaser_006.jpg.jpg",
		lat : center.lat + 0.25,
		lng : center.lng + 0.2
	    },
	    "hanoi3" : {
		type : "2",
		cost : "1000円",
		note : "test1",
		images : "http://static.asiawebdirect.com/m/bangkok/portals/vietnam/homepage/hanoi/pagePropertiesOgImage/teaser_006.jpg.jpg",
		lat : center.lat - 0.2,
		lng : center.lng + 0.2
	    }	    
	}
    }
];

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

    for (var name in json_data[0].content) {
	addMarker(name,
		  json_data[0].content[name].type,
		  json_data[0].content[name].cost,
		  json_data[0].content[name].note,
		  json_data[0].content[name].images,
		  {lat: json_data[0].content[name].lat,
		   lng: json_data[0].content[name].lng}
		 );
    }

    map.addListener('click', function(e) { // add click event
	if (mode == Mode.AddSpots) { // add spot
	    addMarkerEasily(e.latLng);
	}
    });
}

function addMarker(name, type, cost, note, images, lat_lng) {
    var marker = new google.maps.Marker({
	position: lat_lng,
	map: map
    });

    var symbol = {
	fillOpacity: 0.8,
	path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
	scale: 4,
	strokeColor: "#000000",
	strokeWeight: 1.0
    };
    if (type == "0") {
	symbol.fillColor = "blue";
    } else if (type == "1") {
	symbol.fillColor = "red";		
    } else {
	symbol.fillColor = "lightgreen";				
    }
    marker.setIcon(symbol);
    markers.push(marker);

    var info_window = new google.maps.InfoWindow({ // add info_window
	content: "<h3>" + name + "</h3><img src=" + images + " style='width: 100%'/><br>費用:" + cost + "<br>備考:" + note,
	maxWidth: 250
    });
    marker.addListener('click', function() { // when marker is clicked
	if (mode == Mode.EditSpots) { // edit spot
	    var [type, name, cost, note, images] = inputInfo();
	    if (type == "0") {
		symbol.fillColor = "blue";
	    } else if (type == "1") {
		symbol.fillColor = "red";		
	    } else {
		symbol.fillColor = "lightgreen";				
	    }
	    marker.setIcon(symbol);	    
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

function addMarkerEasily(lat_lng) {
    var [name, type, cost, note, images] = inputInfo();
    addMarker(name, type, cost, note, images, lat_lng);

    json_data[0].content[name] = {
	type : type,
	cost : cost,
	note : note,
	images : images,
	lat : lat_lng.lat(),
	lng : lat_lng.lng()
    };
}

function changeMode(m) {
    mode = m;
}

function inputInfo() {
    type = window.prompt("0:ホテル\n1:駅、バス停\n2:観光所", "");
    name = window.prompt("名前", "");
    cost = window.prompt("費用", "0円");
    note = window.prompt("備考", "");        
    images = window.prompt("写真(複数選択可)", "");
    return [type, name, cost, note, images];
}


/*
$(".demo").toggleButton({
    radio: false,
    selectable: 3
})
*/

function getHotel() {
    var hotel = "";
    for (var name in json_data[0].content) {
	if (json_data[0].content[name].type == "0") {
            hotel += "・" + name + "<br>"
	}
    }
    return hotel;
}

function getStation() {
    var station = "";
    for (var name in json_data[0].content) {
	if (json_data[0].content[name].type == "1") {
            station += "・" + name + "<br>"
	}
    }
    return station;
}

function getSightseeing() {
    var sightseeing = "";
    for (var name in json_data[0].content) {
	if (json_data[0].content[name].type == "2") {
            sightseeing += "・" + name + "<br>"
	}
    }
    return sightseeing;
}

exports.getJsonData = function() {
    　return json_data;
};
