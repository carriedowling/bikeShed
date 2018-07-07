$(document).ready(function () {
    var clientKey = "s794b1fFTGLgGcoHNJftFag8W0iWGQDNHdavDk7znxDuEJsLJsHdigzHxpcY05ZP";

    $(".search").keyup("click", function (e) {
        if (e.which === 13) {
            // $(".input-field").empty();
            variable = $(this).attr("data-name");
            var zipcode = $(this).val().substring(0, 5);
            var url = "https://www.zipcodeapi.com/rest/" + clientKey + "/info.json/" + zipcode + "/radians";
            console.log(url);

            // var latitude = this.lat;
            // var longitude = this.lng;

            function generateTrailList() {
                for (var j = 0; j < 10; j++) {
                    // Make AJAX request
                    $.ajax({
                        url: url,
                        method: "GET"
                    });

                    var newTrail = $("");
                    $("#example1").append(newTrail)
                };
            };
            generateTrailList();
        }
    });
});
