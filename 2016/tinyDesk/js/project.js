 var width = $( "body" ).width();

// if it's a wide page, zoom it in further
if(width <= 620){
    ZoomLevel = 5
    CenterCoordinates = [46, -118]
    ZoomPosition = "topright"
}
else{
    ZoomLevel = 6
    CenterCoordinates = [46.5, -115]
    ZoomPosition = "topleft"
}

  var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  });

  var map = L.map('map', {
      scrollWheelZoom: false,
      zoomControl: false,
      center: CenterCoordinates,
      zoom: ZoomLevel
  });

map.addControl( L.control.zoom({position: ZoomPosition}) )
map.addLayer(layer);

  // function getColor(d) {
  //   if (d){
  //     return '#053061'
  //   } else {
  //     return '#bd0026'
  //   }
  // };
  //
  // function getSize(d) {
  //   if (d){
  //     return '7'
  //   } else {
  //     return '4'
  //   }
  // };


  function marker(feature) {
    return {
      radius: 4,
      color: '#053061',
      stroke: 0.5,
      opacity: 0.8,
      fillOpacity: 0.5
    }
  };

  var dataSet = L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, marker(feature));
      },
      onEachFeature: function (feature, layer) {
          layer.on('click', function (e) {
              // document.getElementById("date").innerHTML = feature.properties["Date - Detailed"];
              document.getElementById("title").innerHTML = feature.properties["Song Title"];
              document.getElementById("band").innerHTML = feature.properties["Band Name"];
              pymChild.sendHeight()

              if (feature.properties["YouTube Link"]){
                // Taking just the slug/video id off the full url so we can slip it into our embed code.
                videoslug = feature.properties["YouTube Link"].slice(-11)
                document.getElementById("video").innerHTML = '<div class="flex-video widescreen"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoslug /*feature.properties["Obama Video Link"]*/ + '" frameborder="0" allowfullscreen></iframe></div>'  ;
              } else {
                document.getElementById("video").innerHTML = ' ';
              }
              document.getElementById("description").innerHTML = feature.properties.Description;
          });
      }
  })
  .addTo(map);

// Disable drag and zoom handlers.
  // map.touchZoom.disable();
  // map.scrollWheelZoom.disable();

// Disable tap handler, if present.
  // if (map.tap) map.tap.disable();
