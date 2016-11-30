  window.onload = function() { initializeTabletopObject() };

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1IF1AWq6L7XgmzkTar3PjiLDQB8yLx-PC6fS1ueQBUgI/pubhtml';

// Pull data from Google spreadsheet
// And push to our startUpLeaflet function
function initializeTabletopObject(dataSpreadsheet){
  Tabletop.init({
      key: public_spreadsheet_url,
      callback: startUpLeafet,
      simpleSheet: true,
      debug: false
    });
}

mapZoom = 18;
documentWidth = $( document ).width();

if (documentWidth < 560) {
  mapZoom = 17;

}

// Set Map View
var map = L.map('map', {
  zoomControl: false
}).setView([43.265505, -118.8431], mapZoom);

// ESRI OPEN TILES
  L.esri.basemapLayer('Imagery').addTo(map);

// LAYER OPTIONS
  // Topographic
  // Streets
  // National Geographic
  // Oceans
  // Gray
  // Dark Gray
  // Imagery
  // Shaded Relief


// https://github.com/csessig86/tabletop_to_leaflet

// This function gets our data from our spreadsheet
// Then gets it ready for Leaflet.
// It creates the marker, sets location
// And plots on it on our map
function startUpLeafet(tabletopData) {
  // Tabletop creates arrays out of our data
  // We'll loop through them and create markers for each
  for (var num = 0; num < tabletopData.length; num ++) {
    // Table columns
    var place = tabletopData[num].Title;
    // var submitter = tabletopData[num].submitter;
    var text = tabletopData[num].Description;
    var media = tabletopData[num].Media;

    // Pull in our lat, long information
    var dataLat = tabletopData[num].Lat;
    var dataLong = tabletopData[num].Lng;

    // Marker Style
    var mapIcon = L.icon({
        iconUrl: 'marker.png',
        // shadowUrl: 'leaf-shadow.png',

        iconSize:     [24, 24], // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-0, -14] // point from which the popup should open relative to the iconAnchor
    });

    // Add to our marker
    marker_location = new L.LatLng(dataLat, dataLong);
    // Create the marker
    layer = new L.Marker(marker_location, {icon: mapIcon});

    // Create the popup
    var popup = "<div class=popup_box id=" + num + ">";
      if (media) {
        popup += "<img src='" + media + "'><br />";
      }
    popup += "<h4>" + place + "</h4>";
    popup += "<p>" + text + "</p>";
    popup += "</div>";
    // Add to our marker
    layer.bindPopup(popup);

    // Add marker to our to map
    map.addLayer(layer);

    // console.log(tabletopData);

  }
};



// Disable drag and zoom handlers.
map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.keyboard.disable();

// Disable tap handler, if present.
if (map.tap) map.tap.disable();
