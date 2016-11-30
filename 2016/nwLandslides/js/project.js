

var map = L.map('map').setView([45.863, -120.932], 7);


// ESRI OPEN TILES
L.esri.basemapLayer('Topographic').addTo(map);

// LAYER OPTIONS
  // Topographic
  // Streets
  // National Geographic
  // Oceans
  // Gray
  // Dark Gray
  // Imagery
  // Shaded Relief

// OPEN STREET MAP BASE TILE
  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

// MAP QUEST OPEN TILES
  // L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png').addTo(map);
  // L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png').addTo(map);

// STAMEN
  // L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png').addTo(map);
  // L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.png').addTo(map);
  // L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.png').addTo(map);


/*********** MAPBOX ****************/
// var map = L.mapbox.map('map', 'tonyschick.hm73fp53', {
//     legendControl: {
//         // any of the valid control positions:
//         // http://leafletjs.com/reference.html#control-positions
//         position: 'bottomright'
//     }
// })
// .setView([45.863, -120.932], 7)
// .addControl(L.mapbox.geocoderControl('tonyschick.hm73fp53'))
// .addControl(L.mapbox.shareControl());

// map.legendControl.addLegend(document.getElementById('legend-content').innerHTML);

// //map.control.attribution.addAttribution( 'EarthFix')

L.control.layers(
  {},
  {
  '1982 USGS landslide overview': L.mapbox.tileLayer('tonyschick.usgs_landslides'),
    'LIDAR coverage': L.mapbox.tileLayer('tonyschick.landslide-lidar'),
    'Hazard-specific studies': L.mapbox.tileLayer('tonyschick.hazard_studies'),
    'Landslide Deposits': L.mapbox.tileLayer('tonyschick.landslide_deposits').addTo(map)
}, {collapsed: false}).addTo(map);
/*********** END MAPBOX ****************/



// L.geoJson(  GEOGRAPHY ).addTo(map);

// Disable drag and zoom handlers.
  map.touchZoom.disable();
  map.scrollWheelZoom.disable();

// Disable tap handler, if present.
  if (map.tap) map.tap.disable();