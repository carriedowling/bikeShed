$(document).ready(function () {

    var weatherKey = "3826993a4c01b00ab0b1726d989bb2cf";

    // $(".search").keyup("click", function (e) {
    //     if (e.which === 13) {
    //         // $(".input-field").empty();
    //         variable = $(this).attr("data-name");
    //         var zipcode = $(this).val().substring(0, 5);
    //         var url = "https://www.zipcodeapi.com/rest/" + zipKey + "/info.json/" + zipcode + "/radians";
    //         console.log(url);
    //
    //         // var latitude = this.lat;
    //         // var longitude = this.lng;
    //
    //         function generateTrailList() {
    //             for (var j = 0; j < 10; j++) {
    //                 // Make AJAX request
    //                 $.ajax({
    //                     url: url,
    //                     method: "GET"
    //                 });
    //
    //                 var newTrail = $("");
    //                 $("#example1").append(newTrail)
    //             };
    //         };
    //         generateTrailList();
    //     } if {
    //
    //     }
    // });


    $(".search").keyup("click", function (e) {
      if (e.which === 13) {

        // generates variable for zipcode
        var zipcode = $(this).val().substring(0, 5);

        var weatherURL = "api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherKey;
        console.log(weatherURL);

        function getWeatherData () {

          var promise = $.ajax({
            url: weatherURL,
            method: "GET"
          })

          promise.then(function(response) {
            $("#buttons-view").text(JSON.stringify(response, null, 2));

            console.log(response);
        }
      }
    }
});
