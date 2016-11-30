(function($, undefined) {
$(document).ready(function(){


var sharkString;
var sharkId;
var chartMarkerData;
var timeData =[];
var depthData = [];
var sharkMarkers = [];
  //chart options
   var highchart = {
        chart: {
           renderTo:'chart',
            type: 'spline'
        },
        title: {
            text: ''
        },
        xAxis: {
                type: 'datetime',
                min: timeData[0],
                max: timeData[timeData.length-1],
                labels: {
            formatter: function() { // only output a label on the days of interest
                if (this.value == timeData[0])
                    return this.value;
                else if (this.value == timeData[timeData.length-1])
                    return this.value;
                else if (this.value == timeData[6])
                    return this.value;
               else if (this.value == timeData[12])
                    return this.value;
               else if (this.value == timeData[18])
                    return this.value;
               else if (this.value == timeData[24])
                    return this.value;
               else if (this.value == timeData[30])
                    return this.value;
               else if (this.value == timeData[36])
                    return this.value;
               else if (this.value == timeData[42])
                    return this.value;
else if (this.value == timeData[48])
                    return this.value;
else if (this.value == timeData[54])
                    return this.value;
else if (this.value == timeData[60])
                    return this.value;
else if (this.value == timeData[66])
                    return this.value;
else if (this.value == timeData[72])
                    return this.value;
else if (this.value == timeData[78])
                    return this.value;
else if (this.value == timeData[84])
                    return this.value;
else if (this.value == timeData[90])
                    return this.value;
                else
                    return null;
            }
        }
        },
        yAxis: {
                min: 0,
                max: 300,
                reversed: true,
                title:{
                    text:'Depth (m)'
                }
        },
        legend: {
              enabled: false
        },
        tooltip: {
              pointFormat: '<b>{point.y} m</b>',
        },
        plotOptions: {
          series: {
            allowPointSelect: true,
            marker: {
                states: {
                    select: {
                        radius: 8,
                        fillColor: '#7BD8D8'
                    }
                }
            },
             point:{
                events: {
                    click: function (event) {
                         chartMarkerData = this.x;
                         leafletMarkerChange();
                     }
                 }
              }
          }
         },
        series: [{
            name: '',
            color:'#B5D0D0',
      }]
    };

   var chart = new Highcharts.Chart(highchart);

   var map = L.map('map',{scrollWheelZoom: false}).setView([47.58, -122.413780], 12);
     L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png', {
                  type: 'sat',
                  ext: 'jpg',
                  attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
         maxZoom: 18,
         minZoom:10
           }).addTo(map);
  //  L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
	// type: 'sat',
	// ext: 'jpg',
	// attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
	// subdomains: '1234',
  //      maxZoom: 18,
  //      minZoom:10
  //        }).addTo(map);

var myIcon = L.icon({
    iconUrl: 'img/sharkfin-marker.png',
    iconSize: [25,25]
});

var shark271 = L.marker( [47.603000,-122.465810], {icon: myIcon});
shark271.on('click',function(){
   addAll()
   map.removeLayer(sharkMarkers);
   map.setView([47.603000,-122.465810],13);
   sharkString = '271';
   changeChart();
   map.removeLayer(this);
   });

var shark273 = L.marker( [47.578600,-122.463720], {icon: myIcon});
shark273.on('click',function(){
   addAll()
   map.removeLayer(this);
   map.removeLayer(sharkMarkers);
   map.setView([47.578600,-122.463720],13);
   sharkString = '273';
   changeChart()
   });

var shark303 = L.marker( [47.575100,-122.463140], {icon: myIcon});
shark303.on('click',function(){
   addAll()
   map.removeLayer(this);
   map.removeLayer(sharkMarkers);
   map.setView( [47.575100,-122.463140],13);
   sharkString = '303';
   changeChart()
   });

var shark331 = L.marker( [47.556100,-122.481390], {icon: myIcon});
shark331.on('click',function(){
   addAll()
   map.removeLayer(sharkMarkers);
   map.removeLayer(this);
   map.setView([47.556100,-122.481390],13);
   sharkString = '331';
   changeChart();
   });

var shark784 = L.marker( [47.597400,-122.382950], {icon: myIcon});
shark784.on('click',function(){
   addAll()
   map.removeLayer(sharkMarkers);
   map.setView([47.597400,-122.382950],13);
   sharkString = '784';
   changeChart();
   map.removeLayer(this);
   });

var shark1871 = L.marker( [47.586700,-122.363210], {icon: myIcon});
shark1871.on('click',function(){
   addAll()
   map.removeLayer(sharkMarkers);
   map.removeLayer(this);
   map.setView([47.586700,-122.363210],13);
   sharkString = '1871';
   changeChart();
   });

var shark1902 = L.marker( [47.604000,-122.344020], {icon: myIcon});
shark1902.on('click',function(){
   addAll();
   map.removeLayer(sharkMarkers);
   map.setView([47.604000,-122.344020],13);
   sharkString = '1902';
   changeChart();
   map.removeLayer(this);
   });

var markers = L.layerGroup([shark1902,shark1871,shark784,shark331,shark303,shark273,shark271]);
map.addLayer(markers);

function addAll(){
map.addLayer(shark1902);
map.addLayer(shark1871);
map.addLayer(shark784);
map.addLayer(shark331);
map.addLayer(shark303);
map.addLayer(shark273);
map.addLayer(shark271);
}

$('.reset').click(function(){
    if (markerSelected){
       map.removeLayer(newSelectedMarker);
     }
   depthData = [];
   addAll();
   map.removeLayer(sharkMarkers);
   map.setView([47.58, -122.413780], 12);
   highchart.series[0].data = depthData;
   chart = new Highcharts.Chart(highchart);
});

$('.show-hide').click(function(){
    if (markerSelected){
       map.removeLayer(newSelectedMarker);
     }
   if(map.hasLayer(markers)) {
        map.removeLayer(markers);
    } else {
        map.addLayer(markers);
   }

});
var popupIsOpen=false;

map.on('popupopen', function (e) {
    var markerTime = e.popup._source.feature.properties['Time'] +"<br/>"+ e.popup._source.feature.properties['Date'] ;
    if (markerSelected){
       map.removeLayer(newSelectedMarker);
     }
    popupIsOpen = true;
    $(".leaflet-popup-close-button").click(function(){
       popupIsOpen = false;
   });
    for(var i =0; i< highchart.xAxis.categories.length; i++){
      if (highchart.xAxis.categories[i] == markerTime){
        var chartSelect = chart.series[0].data[i]
         chartSelect.select(true, false);
         chartSelect.radius = 25;
      }
   }
});

var newSelectedMarker;
var markerSelected = false;

function leafletMarkerChange(e){
    if (markerSelected){
       map.removeLayer(newSelectedMarker);
     }
    if (popupIsOpen){
       $(".leaflet-popup-close-button")[0].click();
       popupIsOpen=false;
     }
     sharkMarkers.eachLayer(function (layer) {
       if(layer.options.dateTime == highchart.xAxis.categories[chartMarkerData]){
         console.log(layer);
         var latlng = layer._latlng;
         selectedMarkerOptions = {
            radius: 12,
            fillColor: "#fff",
            color: "#000",
           weight: 1,
           opacity: 1,
           fillOpacity: 0.8
         };
          newSelectedMarker = L.circleMarker(latlng, selectedMarkerOptions);
          newSelectedMarker.addTo(map);
          markerSelected = true;
         //layer.options.fillColor = '#000'
        }
    });
}

var geojsonMarkerOptions = {
           radius: 7,
           fillColor: "#ff7800",
           color: "#000",
           weight: 1,
           opacity: 1,
           fillOpacity: 0.8
         };

function changeChart(){
    sharkId = shark[sharkString];
    timeData =[];
    depthData = [];
   //add markers on click
   sharkMarkers = L.geoJson(sharkId,{
      pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
      },
      onEachFeature: function (feature, layer) {
        var popupcontent = [];
        var timeProp;
        var dateProp;
        for (var prop in feature.properties) {
          if (prop == 'Time'){
             timeProp=feature.properties[prop];
             popupcontent.push('Time: '+feature.properties[prop]);
           }else if (prop == 'Depth'){
             popupcontent.push('Depth: '+feature.properties[prop]);
           }else if (prop == 'Date'){
             dateProp=feature.properties[prop];
           }
        layer.options.dateTime= timeProp+'<br/>'+dateProp;
        layer.bindPopup(popupcontent.join("<br />"));
        };
      }
   });
   sharkMarkers.addTo(map);

   //chart render
    for(var i = 0; i < sharkId['features'].length; i++){
       for (var prop in sharkId['features'][i].properties){
        var data = sharkId['features'][i].properties;
        if (prop == 'Time'){
           timeData.push(data['Time']+"<br/>"+data['Date']);
        }else if (prop == 'Depth'){
          depthData.push(data['Depth']);
        }
      }
    };

    highchart.xAxis.categories = timeData;
    highchart.series[0].data = depthData;
   chart = new Highcharts.Chart(highchart);
};

});
}(jQuery));
