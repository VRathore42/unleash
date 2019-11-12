$(document).ready(function () {
    function success(data) {
        var locations = [];
        var zommPos = {
            lat: 0,
            long: 0
        }
        for (var i = 0, len = data.length; i < len; i++) {
            var tempData = "";
            for (var j = 0, size = data[i].things.length; j < size; j++) {
                tempData += data[i].things[j].name + " : " + data[i].things[j].quantity + " ";
            }
            tempData += "DateTime: " + data[i].date.split('T')[0] + ' ' + data[i].date.split('T')[1].split('.')[0];
            locations.push({
                "latitude": data[i].latitude,
                "longitude": data[i].longitude,
                "text": tempData,
                "date": data[i].date
            })
            if(locations.length > 0) {
                zommPos.lat = locations[0].latitude;
                zommPos.long = locations[0].longitude;
                console.log(zommPos);
            }
        }
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: new google.maps.LatLng(zommPos.lat, zommPos.long),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            minZoom: 1
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i].latitude, locations[i].longitude),
                map: map
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i].text);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    };

    // var locations = [
    //     ['Test', -33.890542, 151.274856, 4],
    //     ['Coogee Beach', -33.923036, 151.259052, 5],
    //     ['Cronulla Beach', -34.028249, 151.157507, 3],
    //     ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    //     ['Maroubra Beach', -33.950198, 151.259302, 1]
    // ];

    // var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 10,
    //     center: new google.maps.LatLng(-33.92, 151.25),
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // });

    // var infowindow = new google.maps.InfoWindow();

    // var marker, i;

    // for (i = 0; i < locations.length; i++) {
    //     marker = new google.maps.Marker({
    //         position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    //         map: map
    //     });

    //     google.maps.event.addListener(marker, 'click', (function (marker, i) {
    //         return function () {
    //             infowindow.setContent(locations[i][0]);
    //             infowindow.open(map, marker);
    //         }
    //     })(marker, i));
    // }

    function init() {
        $.ajax({
            type: "GET",
            url: 'http://think42.net/api/v1/requirement',
            success: success,
            dataType: 'json'
        });
    }
    init();

});



