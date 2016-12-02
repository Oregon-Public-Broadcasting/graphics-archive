var map = L.map('map').setView([45.1, -123.5], 6);

// ESRI OPEN TILES
  L.esri.basemapLayer('DarkGray').addTo(map);
// LAYER OPTIONS
  // Topographic
  // Streets
  // National Geographic
  // Oceans
  // Gray
  // Dark Gray
  // Imagery
  // Shaded Relief


oregon_outline = {"type":"FeatureCollection","features":[
{"type":"Feature","id":"USA-OR","properties":{"fips":"41","name":"Oregon"},"geometry":{"type":"Polygon","coordinates":[[[-123.211348,46.174138],[-123.11824,46.185092],[-122.904639,46.08103],[-122.811531,45.960537],[-122.762239,45.659305],[-122.247407,45.549767],[-121.809251,45.708598],[-121.535404,45.725029],[-121.217742,45.670259],[-121.18488,45.604536],[-120.637186,45.746937],[-120.505739,45.697644],[-120.209985,45.725029],[-119.963522,45.823614],[-119.525367,45.911245],[-119.125551,45.933153],[-118.988627,45.998876],[-116.918344,45.993399],[-116.78142,45.823614],[-116.545912,45.752413],[-116.463758,45.61549],[-116.671881,45.319735],[-116.732128,45.144473],[-116.847143,45.02398],[-116.830713,44.930872],[-116.934774,44.782995],[-117.038836,44.750133],[-117.241483,44.394132],[-117.170283,44.257209],[-116.97859,44.240778],[-116.896436,44.158624],[-117.027882,43.830007],[-117.027882,42.000709],[-118.698349,41.989755],[-120.001861,41.995232],[-121.037003,41.995232],[-122.378853,42.011663],[-123.233256,42.006186],[-124.213628,42.000709],[-124.356029,42.115725],[-124.432706,42.438865],[-124.416275,42.663419],[-124.553198,42.838681],[-124.454613,43.002989],[-124.383413,43.271359],[-124.235536,43.55616],[-124.169813,43.8081],[-124.060274,44.657025],[-124.076705,44.772041],[-123.97812,45.144473],[-123.939781,45.659305],[-123.994551,45.944106],[-123.945258,46.113892],[-123.545441,46.261769],[-123.370179,46.146753],[-123.211348,46.174138]]]}}
]}

washington_outline = {"type":"FeatureCollection","features":[
{"type":"Feature","id":"USA-WA","properties":{"fips":"53","name":"Washington"},"geometry":{"type":"MultiPolygon","coordinates":[[[[-117.033359,49.000239],[-117.044313,47.762451],[-117.038836,46.426077],[-117.055267,46.343923],[-116.92382,46.168661],[-116.918344,45.993399],[-118.988627,45.998876],[-119.125551,45.933153],[-119.525367,45.911245],[-119.963522,45.823614],[-120.209985,45.725029],[-120.505739,45.697644],[-120.637186,45.746937],[-121.18488,45.604536],[-121.217742,45.670259],[-121.535404,45.725029],[-121.809251,45.708598],[-122.247407,45.549767],[-122.762239,45.659305],[-122.811531,45.960537],[-122.904639,46.08103],[-123.11824,46.185092],[-123.211348,46.174138],[-123.370179,46.146753],[-123.545441,46.261769],[-123.72618,46.300108],[-123.874058,46.239861],[-124.065751,46.327492],[-124.027412,46.464416],[-123.895966,46.535616],[-124.098612,46.74374],[-124.235536,47.285957],[-124.31769,47.357157],[-124.427229,47.740543],[-124.624399,47.88842],[-124.706553,48.184175],[-124.597014,48.381345],[-124.394367,48.288237],[-123.983597,48.162267],[-123.704273,48.167744],[-123.424949,48.118452],[-123.162056,48.167744],[-123.036086,48.080113],[-122.800578,48.08559],[-122.636269,47.866512],[-122.515777,47.882943],[-122.493869,47.587189],[-122.422669,47.318818],[-122.324084,47.346203],[-122.422669,47.576235],[-122.395284,47.800789],[-122.230976,48.030821],[-122.362422,48.123929],[-122.373376,48.288237],[-122.471961,48.468976],[-122.422669,48.600422],[-122.488392,48.753777],[-122.647223,48.775685],[-122.795101,48.8907],[-122.756762,49.000239],[-117.033359,49.000239]]]]}}
]}

var outline_style = {
  fillOpacity: 0.,
  color: 'white',
  opacity: .85,
  weight: 2
};

var state_outlines = new L.LayerGroup();
L.geoJson(oregon_outline, {
   style: outline_style,
}).addTo(state_outlines);

L.geoJson(washington_outline, {
   style: outline_style,
}).addTo(state_outlines);


var wind_arrows = L.icon({
    iconUrl: 'img/arrow.png',
    iconSize:     [70, 70], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var wind_layer = new L.LayerGroup();
L.marker([45.573478, -122.718143], {icon: wind_arrows}).addTo(wind_layer);
// L.marker([(45.574304, -122.716062)], {icon: wind_arrows}).addTo(wind_layer);
L.marker([45.574304, -122.716062], {icon: wind_arrows}).addTo(wind_layer);

L.marker([45.574515, -122.713959], {icon: wind_arrows}).addTo(wind_layer);

//
// var bluff_outline_style = {
//   fillOpacity: 0.,
//   color: 'white',
//   opacity: .85,
//   weight: 2,
//   dashArrya: "15, 10, 5"
//
// };
//
//
// var bluff_layer = new L.LayerGroup();
// L.geoJson(bluff, {
//    style: bluff_outline_style,
// }).addTo(bluff_layer);

// CENSUS TRACT PAGE
var tract_style = {
  fillOpacity: 0.25,
  color: 'red',
  opacity: .85,
  weight: 2
};

var tract_layer = new L.LayerGroup();
L.geoJson(tracts, {
   style: tract_style,
}).addTo(tract_layer);


var daimler_complaint_style = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.7
};

var daimler_complaint_layer = new L.LayerGroup();

L.geoJson(daimler_complaints, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, daimler_complaint_style);
    }
}).addTo(daimler_complaint_layer);

// DEQ INVESTIGATON PAGE

var sample_site = L.divIcon({
    // iconUrl: 'img/arrow.png',
    iconSize:     [20, 20], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76], // point from which the popup should open relative to the iconAnchor
    className: "sample_site"
});

var deq_sites = new L.LayerGroup();

L.marker([45.571114, -122.726684], {icon: sample_site}).addTo(deq_sites);
L.marker([45.573547, -122.721534], {icon: sample_site}).addTo(deq_sites);
L.marker([45.574478, -122.720461], {icon: sample_site}).addTo(deq_sites);
L.marker([45.575530, -122.717457], {icon: sample_site}).addTo(deq_sites);
L.marker([45.576761, -122.717328], {icon: sample_site}).addTo(deq_sites);
L.marker([45.577002, -122.715311], {icon: sample_site}).addTo(deq_sites);
L.marker([45.576341, -122.711191], {icon: sample_site}).addTo(deq_sites);
L.marker([45.566487, -122.699261], {icon: sample_site}).addTo(deq_sites);
L.marker([45.564504, -122.697630], {icon: sample_site}).addTo(deq_sites);
L.marker([45.564474, -122.694669], {icon: sample_site}).addTo(deq_sites);

// OPEN STREET MAP BASE TILE
  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

// MAP QUEST OPEN TILES
  // L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png').addTo(map);
  // L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png').addTo(map);

// STAMEN
  // L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png').addTo(map);
  // L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.png').addTo(map);
  // L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.png').addTo(map);


// var shadedrelief = new L.LayerGroup(),
//
// var options = {
//     minZoom: 0,
//     maxZoom: 19,
//     maxNativeZoom: 5,
// };


// Disable drag and zoom handlers.
  map.touchZoom.disable();
  // map.scrollWheelZoom.disable();

// Disable tap handler, if present.
  if (map.tap) map.tap.disable();


  var info = L.control({ collapsed: false, position: 'topleft' });
  var info_legend = L.control({ collapsed: false, position: 'bottomleft' });


  info_legend.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info_legend');
      this.update();
      return this._div;
  };

  info_legend.update = function (legendstuff) {
      this._div.innerHTML = '' +  (legendstuff ?
          ""
          : '');
  };


  info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
  };

  info.update = function (legendstuff) {
      this._div.innerHTML = '' +  (legendstuff ?
          ""
          : '<div id="stepDescription"><h1 style="line-height: 42px; font-weight: lighter;">You see something or smell something you think is toxic in your neighborhood. You file a complaint. <br/><b>Then what?</b></h1></div>');
  };

  info.addTo(map);

$(".leaflet-control-zoom").hide();

  // STEPPER

      var step = 0;

      $("#next").click(function() {
        if (step <= 14){
          step = ++step;
        }
        stepper(step);
      });

      $("#last").click(function() {
        if (step >= 1){
          step = --step;
        }
        stepper(step);
      });

    function stepper(){

      // var bgOpacity = 0.10;

      switch(step) {
            case 0: //

            	$("#last").attr("class", "inactive");

              $("#stepDescription").html('<h3>header?</h3>You see something or smell something you think is toxic in your neighborhood. You file a complaint. Then what?');


             break;

            case 1: //

            	$("#stepDescription").html("<h3>header?</h3>Citizens file thousands of air quality complaints every year in the Northwest. Many are about neighbors' backyard burning or chimney smoke. But many also complain about pollution from nearby industries.");
              // $("#visual-notes").html('Dots appear on map marking all of the many complaints');
              $("#last").attr("class", "active");

              info_legend.addTo(map);
              state_outlines.addTo(map);



              break;

            case 2: //
            	$("#stepDescription").html("<h3>header?</h3>Some draw more complaints than others. Since 2010, more than 100 regulated facilities have racked up 10 or more complaints.");

            // $("#visual-notes").html('Most dots disappear and larger markers appear for complaint clusters');


              break;

            case 3: //

            	$("#stepDescription").html("<h3>header?</h3>State regulators in Oregon have not linked any of these claims to violations, leaving many residents frustrated. Local regulators in Eugene and Washington state issued violations more consistently in these cases.");

              $("#visual-notes").html('Dots that have no enforcement action fade to gray, dots with enforcement action highlighted in brighter color');

              break;

            case 4: //

            	$("#stepDescription").html("<h3>header?</h3>Here's some examples: In Olympia, Washington, 235 complaints were filed about the smell from seafood processor Ocean Protein LLC. Olympic Clean Air issued violation notices and went to court to enforce new controls for the facility based on those complaints.");

              // $("#visual-notes").html('Most dots disappear and larger markers appear for our complaint clusters');

              map.removeLayer(state_outlines);
              map.setView([46.974257, -123.873110], 13)
              var shell_marker = L.marker([46.974257, -123.873110]).addTo(map);

              break;

            case 5: //

              $("#stepDescription").html("In Longview, 37 complaints were filed about dust from the Export Grain Terminal. Based on those, The Southwest Clean Air Agency issued eight violations to the company. ");

              // $("#visual-notes").html('zoom in on location');

              map.setView([46.102378, -122.933858], 13)

              var shell_marker = L.marker([46.102378, -122.933858]).addTo(map);


              break;

            case 6: //

                $("#stepDescription").html("More than 300 complaints were filed about the Shell oil refinery in Puget Sound. The Northwest Clean Air Agency has issued 24 violations there totally $267,000 in fines.");

                // $("#visual-notes").html('zoom in on location');


                map.setView([48.465687, -122.559920], 13)

                var shell_marker = L.marker([48.465687, -122.559920]).addTo(map);


                break;

            case 7: //

                  $("#stepDescription").html("It's not always easy to investigate odor complaints. In Seattle, 53 complaints have been filed about the Nucor steel mill. Nucor Steel neighbors say Puget Sound Clean Air has been responsive but have failed to document what they've experienced.");

                  // $("#visual-notes").html('zoom in on location');

                  map.setView([47.569899, -122.367046], 13)

                  var nucor_marker = L.marker([47.569899, -122.367046]).addTo(map);


                break;

            case 8: //

                  $("#stepDescription").html("Let's dig into one case where complaints have gone unsettled for decades: Daimler Trucks North America in North Portland.");

                  // $("#visual-notes").html('zoom in on location');

                  var daimler_marker = L.marker([45.573125, -122.71528])
                    .addTo(map)
                    .bindPopup('Daimler Trucks North America<br />Subject of 630 complaints to DEQ since 2010')
                    .openPopup();


                  // var vigor_marker = L.marker([45.564870, -122.719057]).addTo(map);

                  map.setView([45.573125, -122.71528], 15)
                  map.removeLayer(daimler_complaint_layer);

                break;

            case 9: //

                  $("#stepDescription").html("The truck making plant sits on Swan Island, an industrial district along the Willamette River. Complaints about strong, frequent solvent and paint smells date back decade. Neighbors have filed 544 just since 2010.");

                  // $("#visual-notes").html('dots appear for all the complaints');

                  map.removeLayer(wind_layer);
                  L.esri.basemapLayer('DarkGray').addTo(map);
                  daimler_complaint_layer.addTo(map);


                break;

            case 10: //

                  $("#stepDescription").html("Those neighbors sit above Swan Island on a bluff. Weather data shows that under certain conditions, emissions from the industrial area waft up into the neighborhood.");

                  $("#visual-notes").html('highlight the curve of the bluff, arrows appear showing wind direction');

                  // bluff_layer.addTo(map);

                  L.esri.basemapLayer('ShadedRelief', {maxNativeZoom: 13, maxZoom: 19}).setOpacity(.25).addTo(map);

                  wind_layer.addTo(map);

                  // shadedrelief.addTo(map);
                  map.removeLayer(tract_layer);



                break;

            case 11: //

                  $("#stepDescription").html("Neighbors are worried about more than an annoying odor. State modelling shows the census blocks directly above Swan Island don't meet health benchmarks for air quality.");

                  $("#visual-notes").html('highlight of census district outlines');

                  map.removeLayer(wind_layer);

                  tract_layer.addTo(map);
                  L.esri.basemapLayer('DarkGray').addTo(map);

                break;

            case 12: //

                  $("#stepDescription").html("It wasn't until last year the state launched an investigation into odor complaints. They detected odor 3% of the time and determined Daimler was <em>not</em> a nuisance.");

                  // $("#visual-notes").html('dots appear showing sample locations, large numbers appear on map showing # of observations, % of time odor detected');
                  map.removeLayer(tract_layer);
                  map.removeLayer(daimler_complaint_layer);

                  deq_sites.addTo(map);

                break;

            case 13: //

                  $("#stepDescription").html('But researchers at the nearby University of Portland did their own study, with far more data. They detected a more frequent problem (that red spot shows 20% occurencduring winter). They called the DEQ methodology "deeply flawed."');

                  $("#visual-notes").html('dots appear showing sample locations, heat map overlay of where odor detected and when');


                break;

            case 14: //

                  $("#stepDescription").html("At the request of an Oregon lawmaker, the state is now re-evaluting its determination that Daimler is not causing a nuisance to neighbors. The state has never enforced its nuisance rule, so even if it reverses that finding, there's no certainty of what will result.");

                  $("#visual-notes").html('show daimler dot, show complaint dots, maybe arrows and heat map');


                break;

            }
        }
