// window.onload = function() { init() };

// Publish your Google spreadsheet
// Copy public link below to make it public_spreadsheet_url, replacing the example

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1PF9ZErqtGUfZQ6Bj_zKfeLhAy36oQgtVirZ8mFMYKT4/pubhtml';

$(document).ready( function() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   parseNumbers: true } );
});

var pymChild = new pym.Child();
