var map = L.map('map').setView([44.06, -121.31], 12);

// OPEN STREET MAP BASE TILE
L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    minZoom: 6,
    maxZoom: 12
}).addTo(map);

    $("#slider-range").slider({
      // range: true,
      value: 2007,
      min: 2007,
      max: 2015,
      step: 1,
      slide: function( event, ui ) {

          switch(ui.value) {
              case 2007:
                  rentalYears.clearLayers();
                  rentalYears.addData(bendRentals2007);
                  // $("selector2007").addClass("liSelected");
                  break;
              case 2008:
                  rentalYears.clearLayers();
                  rentalYears.addData(bendRentals2007);
                  rentalYears.addData(bendRentals2008);
                  break;
              case 2009:
                  rentalYears.clearLayers();
                  rentalYears.addData(bendRentals2007);
                  rentalYears.addData(bendRentals2008);
                  rentalYears.addData(bendRentals2009);
                  break;
              case 2010:
                  rentalYears.clearLayers();
                  rentalYears.addData(bendRentals2007);
                  rentalYears.addData(bendRentals2008);
                  rentalYears.addData(bendRentals2009);
                  rentalYears.addData(bendRentals2010);
                  break; 
              case 2011:
                  rentalYears.clearLayers();
                  rentalYears.addData(bendRentals2007);
                  rentalYears.addData(bendRentals2008);
                  rentalYears.addData(bendRentals2009);
                  rentalYears.addData(bendRentals2010);              
                  rentalYears.addData(bendRentals2011);
                  break;  
              case 2012:
                  rentalYears.clearLayers();
                  rentalYears.addData(bendRentals2007);
                  rentalYears.addData(bendRentals2008);
                  rentalYears.addData(bendRentals2009);
                  rentalYears.addData(bendRentals2010);              
                  rentalYears.addData(bendRentals2011);
                  rentalYears.addData(bendRentals2012);
                  break;
              case 2013:
                  rentalYears.clearLayers();
                  rentalYears.addData(bendRentals2007);
                  rentalYears.addData(bendRentals2008);
                  rentalYears.addData(bendRentals2009);
                  rentalYears.addData(bendRentals2010);              
                  rentalYears.addData(bendRentals2011);
                  rentalYears.addData(bendRentals2012);
                  rentalYears.addData(bendRentals2013);
                  break;  
              case 2014:
                  rentalYears.clearLayers();
                  rentalYears.addData(bendRentals2007);
                  rentalYears.addData(bendRentals2008);
                  rentalYears.addData(bendRentals2009);
                  rentalYears.addData(bendRentals2010);              
                  rentalYears.addData(bendRentals2011);
                  rentalYears.addData(bendRentals2012);
                  rentalYears.addData(bendRentals2013);
                  rentalYears.addData(bendRentals2014);
                  break; 
              case 2015:
                  rentalYears.clearLayers();
                  rentalYears.addData(bendRentals2007);
                  rentalYears.addData(bendRentals2008);
                  rentalYears.addData(bendRentals2009);
                  rentalYears.addData(bendRentals2010);              
                  rentalYears.addData(bendRentals2011);
                  rentalYears.addData(bendRentals2012);
                  rentalYears.addData(bendRentals2013);
                  rentalYears.addData(bendRentals2014);
                  rentalYears.addData(bendRentals2015);
             
                  break;                   
              // default:
          }
        $( "#yearbox" ).html( "" + ui.value + "" )
        // console.log(ui.value);
        }
      });

var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#268073",
    color: "#20575F",
    weight: 1,
    opacity: 0.5,
    fillOpacity: 0.3
};


function onEachFeature(feature, layer) {

      var rentalType;

        if (feature.properties.TYPE_CODE == "ABNB"){
            rentalType = "AirBnb";
        } else {
            rentalType = "vacation"
        };

      var popupContent = "This " + rentalType + " rental in the " + feature.properties.NEIGHBORHOOD + " neighborhood recieved a permit in "
          + feature.properties.PROJYEAR;

      if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
      }

      layer.bindPopup(popupContent);
    }

var rentalYears = L.geoJson(bendRentals2007, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
      },
      onEachFeature: onEachFeature
    }
    ).addTo(map);

// Disable drag and zoom handlers.
  map.touchZoom.disable();
  map.scrollWheelZoom.disable();
  map.dragging.disable();



// Disable tap handler, if present.
  if (map.tap) map.tap.disable();

