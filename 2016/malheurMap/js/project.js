var width = $( "body" ).width();

var mapZoom = 17;
var documentWidth = $( document ).width();
// var iconSize = 20;
// var iconSizeHalf = iconSize/2;
var lat = 43.264942;
var lon = -118.84;

if (documentWidth < 560) {
  var mapZoom = 16;
 //  var iconSize = 16;
   var lat = 43.264942;
   var lon = -118.842;
}

// Set Map View
var map = L.map('map', {
  zoomControl: false
}).setView([lat, lon], mapZoom);

// ESRI OPEN TILES
  L.esri.basemapLayer('Imagery').addTo(map);

 function marker(feature) {
   return {
     radius: 7,
     color: "#444",
     fillColor: "#fff",
     stroke: 3,
     opacity: 1,
     fillOpacity: 0.7
   }
 };


 var dataSet = L.geoJson(data, {
     pointToLayer: function (feature, latlng) {
         return L.circleMarker(latlng, marker(feature));
     },
     onEachFeature: function (feature, layer) {
         layer.on('click', function (e) {
             if (feature.properties.Media){
               document.getElementById("photo").src = feature.properties.Media;
               document.getElementById("photo").style.display = 'inherit';
             } else {
               document.getElementById("photo").style.display = 'none';
             }
               document.getElementById("title").innerHTML = feature.properties.Title;
               document.getElementById("description").innerHTML = feature.properties.Description;
             if (feature.properties.Link){
               document.getElementById("readForMore").style.display = 'inherit';
               document.getElementById("storyLink").setAttribute('href', feature.properties.Link);
             } else {
               document.getElementById("readForMore").style.display = 'none';
             }
             pymChild.sendHeight();

         });
     }
 })
 .addTo(map);

 // Disable drag and zoom handlers.
 map.dragging.disable();
 map.touchZoom.disable();
 map.doubleClickZoom.disable();
 map.scrollWheelZoom.disable();
 map.keyboard.disable();

 // Disable tap handler, if present.
 if (map.tap) map.tap.disable();
