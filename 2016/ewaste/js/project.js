// window.onload = function() { init() };
//
// var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1zBDS54s1LXdJYPIzkuvTBTJ_F13TR738bv7H5JitoHA/pubhtml';
//
// $(document).ready( function() {
//   Tabletop.init( { key: public_spreadsheet_url,
//                    callback: showInfo,
//                    parseNumbers: true } );
// });
//
// function showInfo(data, tabletop) {
//   console.log(data);
//
//   var source   = $("#slide").html();
//   var template = Handlebars.compile(source);
//
//   $.each( tabletop.sheets("ca552287").all(), function(i, Graphic) {
//     var html = template(Graphic);
//     $("#ca552287content").append(html);
//   });
//
//   $.each( tabletop.sheets("OR356028").all(), function(i, contentData) {
//     var html = template(contentData);
//     $("#or356028content").append(html);
//   });
//
//   $.each( tabletop.sheets("OR349759").all(), function(i, contentData) {
//     var html = template(contentData);
//     $("#or349759content").append(html);
//   });
//
//   $.each( tabletop.sheets("ma352894").all(), function(i, contentData) {
//     var html = template(contentData);
//     $("#ma352894content").append(html);
//   });
//
//   $.each( tabletop.sheets("nj616173").all(), function(i, contentData) {
//     var html = template(contentData);
//     $("#nj616173content").append(html);
//   });
//
//   // $('.mapDiv').each(function(){
//   //     var place = $(this).attr("id");
//   //     var lat = $(this).attr('data-lat')
//   //     var lon = $(this).attr('data-lon')
//   //     var map = L.map(place, {
//   //       zoomControl: false
//   //     }).setView([lat,lon], 16);
//   //     L.tileLayer(
//   //         'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//   //         maxZoom: 18,
//   //         }).addTo(map);
//   //         // Disable drag and zoom handlers.
//   //         map.dragging.disable();
//   //         map.touchZoom.disable();
//   //         map.doubleClickZoom.disable();
//   //         map.scrollWheelZoom.disable();
//   //         map.keyboard.disable();
//   //         // Disable tap handler, if present.
//   //         if (map.tap) map.tap.disable();
//   //         // var labels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png');
//   //         // var labels = L.tileLayer('http://c.tile.stamen.com/toner-labels/{z}/{x}/{y}.png');
//   //         // map.addLayer(labels);
//   // })
//   // $(".leaflet-bottom").remove();
//
//
// }
//
// var pymChild = new pym.Child();
