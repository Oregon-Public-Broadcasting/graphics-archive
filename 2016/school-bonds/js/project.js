var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1_SGw53Fu80oTmM_5s_tzevlHc6iKWGD8cfsn0Ldww3M/pubhtml';

$(document).ready( function() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   parseNumbers: true } );
});


function showInfo(data, tabletop) {

  console.log(data);

  var source   = $("#dataTemp").html();
  var template = Handlebars.compile(source);

  $.each( tabletop.sheets("All Schools").all(), function(i, Graphic) {
    var html = template(Graphic);
    $("#dataTable").append(html);
    pymChild.sendHeight()
  });

}
