$(document).ready(function () {

  getLatLongOnLoad();

  document.getElementById("trail-info").style.visibility = "hidden";

  $("#resetBtn").on("click", function ()  {
    window.location.reload();
  });

  function display() {
    document.getElementById("trail-info").style.visibility = "visible";
  }

  // runs weather api integration and accesses lat/long for REI Hiking API t
  function getLatLongOnLoad() {
    var array = [80003, 68114, 75001, 10010, 90001, 88901, 84044, 64030, 21030, 80524, 26505, 15601, 23059, 90210, 98115, 94127, 83002, 27605]
    var randomZipcode = array[Math.floor(Math.random() * array.length)];
    var weatherKey = "3826993a4c01b00ab0b1726d989bb2cf";
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + randomZipcode + ",us&APPID=" + weatherKey;

    $.ajax({
      url: weatherURL,
      method: "GET"

    }).then(function (response) {
      var latitude = response.coord.lat;
      var longitude = response.coord.lon;
      featuredTrail(latitude, longitude);
    })
  };

  // shows a random feature trail
  function featuredTrail(latitude, longitude) {
    var reiKey = "200310371-802af0835c009e8175dda821c7b48241";
    var reiURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=10&key=" + reiKey;

    $.ajax({
      url: reiURL,
      method: "GET"
    }).then(function (response) {
      var featureTrailInfo = $("#trail-info");
      var featureTrail = response.trails[Math.floor(Math.random() * response.trails.length)];

      // if the trail's difficulty is undefined it will replace value with N/A
      if (featureTrail.difficulty === "undefined" || undefined) {
        Object.assign({difficulty: "N/A"}, featureTrail.difficulty);
      }

      var featureTrailDiv = $("<div class='card horizontal'>");

      var test = $("<h5 class='header'>Featured Trail <br><br></h5>").append("<i class='material-icons'>terrain</i> " + featureTrail.name);
      featureTrailInfo.append(test);
      var featureTrailInformation = $("<div class='card-content col l8'  id='new'>").html("<p class='trail-location'>" + featureTrail.location + "</p>" + "<p class='difficulty'>Difficulty: " + featureTrail.difficulty + " | Rating: " + featureTrail.stars + "/5" + " | Distance (mi): " + featureTrail.length + " mi.</p>");
      featureTrailDiv.append(featureTrailInformation);
      featureTrailInformation.append("<p class='summary-text'>" + featureTrail.summary + "</p>");

      var featureImage = featureTrail.imgSmallMed
      featureImage = $("<div class='card-image col l4'>" + "<img" + " src=" + featureImage + "></div>");
      featureTrailDiv.append(featureImage);

      featureTrailInfo.append(featureTrailDiv);
      document.getElementById("trail-info").style.visibility = "visible";
    })
  };

  // generates 10 trails from lat and long from weather api
  function generateTrailList(latitude, longitude) {
    var reiKey = "200310371-802af0835c009e8175dda821c7b48241";
    var reiURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=10&key=" + reiKey;


    $.ajax({
      url: reiURL,
      method: "GET"
    }).then(function (response) {
      var trailInfo = $("#trail-info");
      trailInfo.empty();

      for (var i = 0; i < response.trails.length; i++) {
        var trail = response.trails[i];
        var trailDiv = $("<div class='card horizontal'>");

        var trailName = trail.name;
        var realName = $("<h5 class='header'>").html("<i class='material-icons'>terrain</i> " + trailName);
        trailInfo.append(realName);

        var info = trail.summary;
        var location = trail.location;
        var rating = trail.stars;
        var trailDist = trail.length;
        var difficulty = trail.difficulty
        var trailInformation = $("<div class='card-content col l8'>").html("<p class='trail-location'>" + location + "</p>" + "<p class='difficulty'>Difficulty: " + difficulty + " | Rating: " + rating + "/5" + " | Distance (mi): " + trailDist + " mi.</p>");
        trailDiv.append(trailInformation);
        trailInformation.append("<p class='summary-text'>" + info + "</p>");

        var mainImage = trail.imgSmallMed
        var imgShow = $("<div class='card-image col l4'>" + "<img" + " src=" + mainImage + "></div>");

        trailInfo.append(trailDiv);
        trailDiv.append(imgShow);
      }
    });
  };

  // function runs the weather api integration through zipcode
  function location() {

    // condition that runs mobile search for zipcode when search class is hidden
    if (screen.width < 992){
        var zipcode = $(".mobile-search").val().substring(0, 5);
      } else {
        var zipcode = $(".search").val().substring(0, 5);
    }

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
      var highTemp = ((response.main.temp_max - 273.15) * 1.80 + 32);
      var lowTemp = (response.main.temp_min - 273.15) * 1.80 + 32;
      var fRound = Math.round(fahrenheit);
      var highRound = Math.round(highTemp);
      var lowRound = Math.round(lowTemp);

      var weatherWidget = $("<h5 class='header'><i class='fas fa-sun'></i> " + response.name + " Weather Details</h5>" + "<div class='card'>" + "<div class='card-content'><span class='card-title  grey-text text-darken-4'>Today's Forecast</span>" + "<h4 class='grey-text text-darken-4'>" + fRound + "°F</h4>" + "<br />"
      + "<table>" + "<thead><tr>" + "<th>Description</th>" + "<th>High/Low</th>" + "<th>Wind</th>" + "<th>Humidity</th>" + "</tr></thead>"
      + "<tbody><tr>" + "<td>" + response.weather[0].description + "</td>"
      + "<td>" + highRound + "°F / " + lowRound + "°F" + "</td>"
      + "<td>" + response.wind.speed + " MPH" + "</td>"
      + "<td>" + response.main.humidity + "%" + "</td>" + "</tr></tobdy></table></div>" + "</div");

      weatherInfo.html(weatherWidget);

      generateTrailList(latitude, longitude);
    });
  }

  // event listeners that searches on enter for classes search or mobile-search
  $(".search").keyup("click", function (e) {
    e.preventDefault();
    if (e.which === 13) {
      location();
      display();
    }
  });

  $(".mobile-search").keypress("click", function (e) {
   // e.preventDefault();
   if (e.which === 13) {
     location();
     display();
   }
  });

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBzcyUbCKn2kB7h61IlYaGoPfPb_vUGxTw",
    authDomain: "trailangel-47083.firebaseapp.com",
    databaseURL: "https://trailangel-47083.firebaseio.com",
    projectId: "trailangel-47083",
    storageBucket: "trailangel-47083.appspot.com",
    messagingSenderId: "1005396031636"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $(".search").keyup("click", function (e) {
    e.preventDefault();
    if (e.which === 13) {
      var dataZip = $(".search").val().substring(0, 5);

      database.ref().push({
        dataZip: dataZip,
      })
    }
    database.ref().on("child_added", function (snapshot) {
      dataZip = snapshot.val().dataZip;
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  });
});
