var types = ["restaurant", "bar", "theater", "cinema", "park"];

window.addEventListener("load", function () {
    init_map();

    show_places_detail(1, types[0]);
    document.getElementById("element_1").addEventListener("click", function () {
        show_place(document.getElementById("location_1").innerHTML);
    });
    show_places_detail(2, types[1]);
    document.getElementById("element_2").addEventListener("click", function () {
        show_place(document.getElementById("location_2").innerHTML);
    });
    show_places_detail(3, types[2]);
    document.getElementById("element_3").addEventListener("click", function () {
        show_place(document.getElementById("location_3").innerHTML);
    });
    show_places_detail(4, types[3]);
    document.getElementById("element_4").addEventListener("click", function () {
        show_place(document.getElementById("location_4").innerHTML);
    });
    show_places_detail(5, types[4]);
    document.getElementById("element_5").addEventListener("click", function () {
        show_place(document.getElementById("location_5").innerHTML);
    });


    document.getElementById("rating_1").addEventListener("change", function () {
        var place_name = document.getElementById("place_name_1").innerHTML;
        var rating = document.getElementById("rating_1").value;
        set_rating(place_name, rating);
    });
    document.getElementById("rating_2").addEventListener("change", function () {
        var place_name = document.getElementById("place_name_2").innerHTML;
        var rating = document.getElementById("rating_2").value;
        set_rating(place_name, rating);
    });
    document.getElementById("rating_3").addEventListener("change", function () {
        var place_name = document.getElementById("place_name_3").innerHTML;
        var rating = document.getElementById("rating_3").value;
        set_rating(place_name, rating);
    });
    document.getElementById("rating_4").addEventListener("change", function () {
        var place_name = document.getElementById("place_name_4").innerHTML;
        var rating = document.getElementById("rating_4").value;
        set_rating(place_name, rating);
    });
    document.getElementById("rating_5").addEventListener("change", function () {
        var place_name = document.getElementById("place_name_5").innerHTML;
        var rating = document.getElementById("rating_5").value;
        set_rating(place_name, rating);
    });

});

// ----------- MAPY.CZ -------------------
function init_map() {
    var stred = SMap.Coords.fromWGS84(14.41, 50.08);
    var mapa = new SMap(JAK.gel("mapa"), stred, 11);
    mapa.addDefaultLayer(SMap.DEF_BASE).enable();
    mapa.addDefaultControls();
}

function show_place(coords) {
    coords = coords.split(', ');
    var lat = parseFloat(coords[0]);
    var lng = parseFloat(coords[1]);
    console.log(lat);
    console.log(lng);
    var mapa = new SMap(JAK.gel("mapa"), SMap.Coords.fromWGS84(lng, lat), 15);
    mapa.addDefaultLayer(SMap.DEF_BASE).enable();
    mapa.addDefaultControls();

    var layer = new SMap.Layer.Marker();
    mapa.addLayer(layer);
    layer.enable();

    var options = {};
    var marker = new SMap.Marker(SMap.Coords.fromWGS84(lng, lat), "myMarker", options);
    layer.addMarker(marker);
}


// ----------- BACKEND -------------------

function show_places_detail(i, id) {
    var data = "{}";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var response = JSON.parse(this.responseText);
            var lat = response["response"]["venues"][0]["location"]['lat'];
            var long = response["response"]["venues"][0]["location"]['lng'];
            document.getElementById("location_" + i).innerHTML = lat + ', ' + long;

            get_rating(i);

            //show_headquarters(i, production_company_id)
        }
    });

    xhr.open("GET", "http://127.0.0.1:5000/places/" + id);

    xhr.send(data);
}

function get_rating(i) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    var place_name = document.getElementById("place_name_" + i).innerHTML;
    var url = "http://127.0.0.1:5000/ratings/"+place_name+"/";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // var json = JSON.parse(xhr.responseText);
            document.getElementById("rating_"+i).value = (xhr.responseText ? 'on' : 'off');
        }
    };
    xhr.send();
}

function set_rating(name, rating){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    var url = "http://127.0.0.1:5000/ratings/"+name+"/";
    xhr.open("PUT", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Success");
        }
    };
    xhr.send();
}