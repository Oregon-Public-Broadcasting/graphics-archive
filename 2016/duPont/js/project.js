// window.onload = function() { init() };

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1i_xVxiKTgSkGBxgMQgxHprXH-RgKU3COVpJUFKQ9PZs/pubhtml';

$(document).ready( function() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   parseNumbers: true } );
});

function showInfo(data, tabletop) {
  // console.log(data);

  var source   = $("#slide").html();
  var template = Handlebars.compile(source);

  $.each( tabletop.sheets("Sheet1").all(), function(i, Graphic) {
    var html = template(Graphic);
    $("#content").append(html);
  });
}
