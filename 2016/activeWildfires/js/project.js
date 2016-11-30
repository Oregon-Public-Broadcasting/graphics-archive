// window.onload = function() {

    var mapWidth = $(document).width();
    var date = new Date();
    var m = date.getMonth();
    var d = date.getDate();
    var y = date.getFullYear();
    var yesterday =  (y) + "-" + (m) + "-0" + (29);

    // console.log(yesterday);
    $("#yesterday").html(yesterday);

    var map = L.map("map", {
        center: [45.3, -120],
        zoom: 6,
        maxZoom: 11,
        minZoom:5
    });

    if (mapWidth <= 640) {
      map.setZoom(5);
    };

    var topographic = L.esri.basemapLayer('Topographic');

    var template =
        "//map1{s}.vis.earthdata.nasa.gov/wmts-webmerc/" +
        "{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg";

    var satelliteImagery = L.tileLayer(template, {
        layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
        tileMatrixSet: "GoogleMapsCompatible_Level9",
        maxZoom: 9,
        time: yesterday,
        tileSize: 256,
        subdomains: "abc",
        noWrap: true,
        continuousWorld: true,
        bounds: [
            [-85.0511287776, -179.999999975],
            [85.0511287776, 179.999999975]
        ]
    });


    var labels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png');

    var satellite = L.layerGroup([satelliteImagery, labels]);

        map.addLayer(satellite);
        map.addLayer(labels);

    map.on('zoomend', function(e) {
        if (map.getZoom() == 9) {
              map.addLayer(satellite);
              map.addLayer(labels);
              map.removeLayer(topographic);
            }
         if (map.getZoom() >= 10) {
            map.addLayer(topographic);
            map.removeLayer(satellite);
            map.removeLayer(labels);
        }
    });

    function getRadius(A){
  		var radius = Math.sqrt( A / Math.PI );
  		return Math.round(radius * 10) / 100;
  	};

    function getOpactiy(d) {
      return d > 25  ? '0.25' :
             d > 50  ? '0.50' :
             d > 75  ? '0.75' :
                       '0.90' ;
    };

    function fireMarker(feature) {
      return {
        radius: getRadius(feature.properties.ACRES) + 1,
        fill: '#bd0026',
        color: "#bd0026",
        stroke: 1,
        opacity: (100 - n(feature.properties.PERCENTCON)) / 100 + 0.2,
        fillOpacity: (100 - n(feature.properties.PERCENTCON)) /100

      }
    };

    var currentFires = L.geoJson(fires, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, fireMarker(feature));
        },
        onEachFeature: function (feature, layer) {
             layer.bindPopup(
                   feature.properties.INCIDENTNA
                 + '</strong><br/>Reported Size: <strong>' + numberWithCommas(feature.properties.ACRES)
                 + ' Acres</strong><br/>'  + feature.properties.PERCENTCON + '% Contained'
              );
         }
    })
    .addTo(map);



function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function n(n){
    return n > 9 ? "" + n: "0" + n;
}


// // Disable drag and zoom handlers.
  // map.touchZoom.disable();
  // map.scrollWheelZoom.disable();

// // Disable tap handler, if present.
  // if (map.tap) map.tap.disable();
