window.onload = function() { init() };

// Publish your Google spreadsheet
// Copy public link below to make it public_spreadsheet_url, replacing the example

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/18ukR-2Cj-dUehWmH_zFSW6zTiZWNgKOcR5SpW1DyqUQ/pubhtml';

$(document).ready( function() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   parseNumbers: true } );
});

function showInfo(data, tabletop) {
  var source   = $("#slide").html();
  var template = Handlebars.compile(source);
  $.each( tabletop.sheets("Sheet1").all(), function(i, Graphic) {
    var html = template(Graphic);
    $("#timeline").append(html);
  });
  pymChild.sendHeight();
}

var pymChild = new pym.Child();
