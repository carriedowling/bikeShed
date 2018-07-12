$(document).ready(function () {

  document.getElementById("trail-info").style.visibility = "hidden";

  function display() {
      document.getElementById("trail-info").style.visibility = "visible";
  }

  function generateTrailList(latitude, longitude) {
    var reiKey = "200310371-802af0835c009e8175dda821c7b48241";
    var reiURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=10&key=" + reiKey;


    $.ajax({
      url: reiURL,
      method: "GET"
    }).then(function (response) {
      var trailInfo = $("#trail-info");
      trailInfo.empty();
      console.log(latitude);
      console.log(longitude);
      console.log(response.trails);

      for (var i = 0; i < response.trails.length; i++) {
        var trail = response.trails[i];
        var trailDiv = $("<div class='trailInfoDiv'>");

        var trailName = trail.name
        var realName = $("<h2>").text(trailName);
        trailDiv.append(realName);

        var info = trail.summary
        var trailInformation = $("<p>").text(info);
        trailDiv.append(trailInformation);

        var mainImage = trail.imgSmallMed
        $("<img class='trailImg'>").attr({
          src: mainImage
        });

        trailInfo.append(trailDiv)

      }
    });
  };

  function location() {
    var zipcode = $(".search").val().substring(0, 5);
    console.log(zipcode);
    var weatherKey = "3826993a4c01b00ab0b1726d989bb2cf";
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&APPID=" + weatherKey;

    $.ajax({
      url: weatherURL,
      method: "GET"

    }).then(function (response) {
      var weatherInfo = $("#weather-info");
      weatherInfo.empty();

      var latitude = response.coord.lat;
      var longitude = response.coord.lon;

      var main = $("<h2>" + response.name + " Weather Details</h2>");
      weatherInfo.append(main);

      var description = $("<p> Summary " + response.weather[0].description + "</p>");
      weatherInfo.append(description);


      generateTrailList(latitude, longitude);
    });
  }

  $(".search").keyup("click", function (e) {
    e.preventDefault();
    if (e.which === 13) {
      location();
      display();
    }
  });
});
