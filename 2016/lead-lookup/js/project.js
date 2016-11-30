$(document).ready(function(){
  $.getJSON("data.json",function(obj) {
     $.each(obj,function(key,value){
         var option = $('<option />').val(value.School).text(value.School);
         $("#school_choices").append(option);

      $('#school_search').on('change', function(){
          var school = $(this).val();
          if (school == value.School) {
          // if (school.contains(value.School)) {

          $("#schoolName").html(value.School);
          $("#schoolDistrict").html(value["School District"]);
          $("#schoolDescription").html("")
          $("#schoolMitigation").html("")

          if (typeof(value.locationsTested) == "number") {
            $("#schoolDescription").html("<p>" + value.School + " tested <strong>" + value.locationsTested + "</strong> water fixtures from " + value.testDate + " and <strong>" + value.locationsOver + "</strong> of those fixtures tested above the EPA approved 20 ppb for&nbsp;lead.</p>");
          }

          if (value.locationsTested == "ND") {
            $("#schoolDescription").html("<p>Currently, " + value.School + " has not tested for lead in the water.</p>");
          }

          if (value.mitigated == "TRUE") {
            $("#schoolMitigation").html("<p>Since the previous tests, all fixtures that tested above the EPA limit have added a filter or been replaced.")
          }

          if (typeof(value.mitigated) == "string" && value.mitigated != "TRUE") {
            $("#schoolMitigation").html("<p>Since the previous tests, most fixtures that tested above the EPA limit have added a filter or been replaced. The remaining location to be fixed is a " + value.mitigated + ".")
          }

          if (value.note) {
            $("#schoolMitigation").html("<p>" + value.note + "<p>")
          }

          // Street view may be too complicated due to direction of camera

          // $("#street-view ").css("display", "block");
          //
          // if (value.Lat && value.Lng) {
          //   panorama = new google.maps.StreetViewPanorama(
          //       document.getElementById('street-view'),
          //       {
          //         position: {lat: value.Lat, lng: value.Lng},
          //         pov: {heading: 357, pitch: 0},
          //         zoom: 1,
          //         addressControl: false,
          //         linksControl: false,
          //         panControl: false,
          //         enableCloseButton: false,
          //         imageDateControl: false,
          //         fullscreenControl: false
          //       });
          // } else {
          //   $("#street-view ").css("display", "none");
          // }


          // Generate a leaflet map if lat and lng are provided
          $("#map").css("display", "block");
          if (value.Lat && value.Lng) {
            map.setView([value.Lat,value.Lng], 13);
            L.marker([value.Lat,value.Lng]).bindPopup(value.School).addTo(map);
          } else {
            $("#map").css("display", "none");
          }

          // Update iframe height on parent page
          pymChild.sendHeight();

        }

      });
    });
  });
});


// Convert Number Into Word
var units = new Array ("none", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen");
var tens = new Array ("twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety");
function num(it) {
    var theword = "";
    var started;
    if (it>999) return "Lots";
    if (it==0) return units[0];
    for (var i = 9; i >= 1; i--){
        if (it>=i*100) {
            theword += units[i];
            started = 1;
            theword += " hundred";
            if (it!=i*100) theword += " and ";
            it -= i*100;
            i=0;
        }
    };
    for (var i = 9; i >= 2; i--){
        if (it>=i*10) {
            theword += (started?tens[i-2].toLowerCase():tens[i-2]);
            started = 1;
            if (it!=i*10) theword += "-";
            it -= i*10;
            i=0
        }
    };
    for (var i=1; i < 20; i++) {
        if (it==i) {
            theword += (started?units[i].toLowerCase():units[i]);
        }
    };
    return theword;
}
