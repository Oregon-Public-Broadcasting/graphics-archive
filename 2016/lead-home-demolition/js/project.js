var map = L.map('map', { zoomControl:false}).setView([45.506377, -122.620770], 18);

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

// OPEN STREET MAP BASE TILE
  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

// MAP QUEST OPEN TILES
  // L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png').addTo(map);
  // L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png').addTo(map);

// STAMEN
  // L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png').addTo(map);
  // L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.png').addTo(map);
  // L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.png').addTo(map);

  // L.marker([45.506117, -122.619835]).addTo(map).bindPopup("Richmond Elementary").openPopup();
  // L.marker([45.506039, -122.62077]).addTo(map).bindPopup("Demolition site").openPopup();
  //

  var richmondLocation = new L.LatLng(45.506305, -122.619893);
  var demolitionLocation = new L.LatLng(45.506039, -122.62077);

  var richmondContent = '<p>Richmond Elementary</p>',
  richmondPopup = new L.popup();

  richmondPopup.setLatLng(richmondLocation);
  richmondPopup.setContent(richmondContent);

  var demolitionContent = '<p>Demolition site</p>',
  demolitionPopup = new L.popup();

  demolitionPopup.setLatLng(demolitionLocation);
  demolitionPopup.setContent(demolitionContent);

  map.addLayer(richmondPopup)
  map.addLayer(demolitionPopup);


// Disable drag and zoom handlers.
  map.touchZoom.disable();
  map.scrollWheelZoom.disable();
  map.touchZoom.disable();
  map.scrollWheelZoom.disable();
  map.doubleClickZoom.disable();
  map.dragging.disable();

// Disable tap handler, if present.
  if (map.tap) map.tap.disable();
