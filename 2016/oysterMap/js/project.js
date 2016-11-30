var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

var OpenStreetMap_HOT = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
});
// http://c.tile.openstreetmap.fr/hot/13/1297/2878.png

var viewOffset = 0.2;

var map = L.map('map', {
    scrollWheelZoom: false,
    center: [47, -125],
    zoom: 7,
    zoomControl: false
});

if ( $(document).width() < 500 ) {
  map.setView([46, -121], 4);
  var viewOffset = 0;
}

map.addLayer(OpenStreetMap_HOT);
new L.Control.Zoom({ position: 'topright' }).addTo(map);

var geojsonMarkerOptions = {
    radius: 7,
    fillColor: "#f03b20",
    color: "#fff",
    weight: 1,
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};

// var smallIcon = new L.icon({
//     iconUrl: 'bookMarker.png',
//     iconSize:     [30, 41],
//     iconAnchor:   [15, 41],
// });

var oystersMarkers = L.geoJson(oysterData, {
        pointToLayer: function (feature, latlng) {
          // return L.marker(latlng, {
          //       icon: smallIcon
          // });
          return L.circleMarker(latlng, geojsonMarkerOptions);
      },
      onEachFeature: function (feature, layer) {
          layer.on('click', function (e) {

            $(".infoPane").removeClass("hide");
            $(".startSlide").addClass("hide");

            $("#oysterName").text(feature.properties.oysterName + " Oyster");
            $("#oysterSpecies").text(feature.properties.species);
            $("#oysterSalinity").text(feature.properties.salinity);
            $("#oysterSize").text(feature.properties.size);
            $("#place").text(feature.properties.place);
            $("#summary").text(feature.properties.summary);
            $("#flavorProfile").text(feature.properties.flavorProfile);
          });
      }

  }).addTo(map);

// var myLayer = omnivore.csv('oysterMap.csv', null, osyterData);

  // STEPPER

      var stepsNumber = oysterData.features.length;

      var step = 0;

      $("#go").on("click", function() {
        if (step <= stepsNumber){
          step = ++step;
        }
        stepper(step);
      });

      $(".next").on("click", function() {
        if (step <= stepsNumber){
          step = ++step;
        }
        stepper(step);
      });

      $(".last").on("click", function() {
        if (step >= 1){
          step = --step;
        }
        stepper(step);
      });

    function stepper(){

      if (step > 0) {

        var lon = oysterData.features[(step - 1)].geometry.coordinates[0];
        var lat = oysterData.features[(step - 1)].geometry.coordinates[1];
        var zoomLevel = oysterData.features[(step - 1)].properties.zoomLevel;

        $("#oysterName").text(oysterData.features[(step - 1)].properties.oysterName + " Oyster");
        // $("#image").text(oysterData.features[(step - 1)].properties.image);
        $("#place").text(oysterData.features[(step - 1)].properties.place);
        $("#summary").text(oysterData.features[(step - 1)].properties.summary);
        // $("#flavorProfile").text(oysterData.features[(step - 1)].properties.flavorProfile);
        $("#oysterSpecies").text(oysterData.features[(step - 1)].properties.species);
        $("#oysterSalinity").text(oysterData.features[(step - 1)].properties.salinity);
        $("#oysterSize").text(oysterData.features[(step - 1)].properties.size);

        // MAP ANIMATION
        map.setView([lat,lon], zoomLevel);
        // Calculate the offset
        var offset = map.getSize().x*viewOffset;
        // Then move the map
        map.panBy(new L.Point(-offset, 0), {animate: false});

      }

      switch(step) {
            case 0:
             $(".infoPane").addClass("hide");
             $(".startSlide").removeClass("hide");
             $(".last").addClass("inactive");
            //  $(".leaflet-marker-icon").css("opacity", "1");
             map.setView([47, -125], 7, {
                  pan: {animate: true, duration: 2},
                  zoom: {animate: true}
                });

             break;
            case 1:
              $(".last").removeClass("inactive");
              $(".infoPane").removeClass("hide");
              $(".startSlide").addClass("hide");
              // $(".leaflet-marker-icon").css("opacity", "1");
              break;
            case stepsNumber - 1:
              $(".next").removeClass("inactive");
              break;
            case stepsNumber:
              $(".next").addClass("inactive");
              break;
            }

            pymChild.sendHeight();

      };



  // Disable drag and zoom handlers.
  // map.dragging.disable();
  // map.touchZoom.disable();
  // map.doubleClickZoom.disable();
  // map.scrollWheelZoom.disable();

  // Disable tap handler, if present.
  if (map.tap) map.tap.disable();
