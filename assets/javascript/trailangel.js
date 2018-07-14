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
        var trailDiv = $("<div class='card horizontal'>");

        var trailName = trail.name
        var realName = $("<h5 class='header'>").html("<i class='material-icons'>terrain</i> " + trailName);
        trailInfo.append(realName);

        var info = trail.summary
        var difficulty = trail.difficulty
        var trailInformation = $("<div class='card-content col l8'>").html("<p class='summary-text'>" + info + "</p>");
        trailDiv.append(trailInformation);
        trailInformation.append("<p class='difficulty'>Difficulty: " + difficulty + "</p>");

        var mainImage = trail.imgSmallMed
        var imgShow = $("<div class='card-image col l4'>" + "<img" + " src=" + mainImage + "></div>");

        trailInfo.append(trailDiv);
        trailDiv.append(imgShow);
      }
    });
  };

  function location() {
    var zipcode = $(".search").val().substring(0, 5);
    console.log(zipcode);
    var weatherKey = "3826993a4c01b00ab0b1726d989bb2cf";
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&APPID=" + weatherKey;
    console.log(weatherURL);

    $.ajax({
      url: weatherURL,
      method: "GET"

    }).then(function (response) {
      var weatherInfo = $("#weather-info");
      weatherInfo.empty();

      var latitude = response.coord.lat;
      var longitude = response.coord.lon;
      var fahrenheit = (response.main.temp - 273.15) * 1.80 + 32;
      var fRound = Math.round(fahrenheit)

      var weatherWidget = $("<h5 class='header'><i class='fas fa-sun'></i> " + response.name + " Weather Details</h5>" + "<div class='card'>"  + "<div class='card-content'><span class='card-title  grey-text text-darken-4'>Today's Forecast</span>" + "<h4 class='grey-text text-darken-4'>" + fRound + "°F</h4>" + "<br />" + "<p>" + response.weather[0].description + "</p></div>" + "</div");
      weatherInfo.html(weatherWidget);

      // var description = $("<p> Summary " + response.weather[0].description + "</p>");
      // weatherInfo.html(description);

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
