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

    //     } if {
    //
    //     }
    // });


  $(".search").keyup("click", function (e) {
    if (e.which === 13) {

      // generates variable for zipcode
      var zipcode = $(this).val().substring(0, 5);

      var weatherURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&APPID=" + weatherKey;
      console.log(weatherURL);

      function getWeatherData () {

        var promise = $.ajax({
          url: weatherURL,
          method: "GET"
        })

        promise.then(function(response) {
          $(".weather-content").text(JSON.stringify(response, null, 2));
          console.log(response);
        })
      }

      getWeatherData();
    }
  });
});
