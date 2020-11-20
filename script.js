var cityName = "Austin"

var cityNameHeading = document.querySelector("#city-name")
var cityTemperatureP = document.querySelector("#temp")
var cityHumidityP = document.querySelector("#humid")
var cityWindSpeedP = document.querySelector("#wind")
var cityUVIndexP = document.querySelector("#uv")
$.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=32a6bd8e1707690576a18bee7c728812`)
.then(function(response)
// need to pull the Temperature, Humidity, and Wind Speed
 {var weatherTemp = response.main.temp;
  var weatherHumid = response.main.humidity;
  var weatherWindSpeed = response.wind.speed;
  var NameofCity = response.name;
  var cityLat = response.coord.lat;
  var cityLong = response.coord.lon;

  cityNameHeading.innerHTML = NameofCity;
  cityTemperatureP.innerHTML = weatherTemp;
  cityHumidityP.innerHTML = weatherHumid;
  cityWindSpeedP.innerHTML = weatherWindSpeed;
  

    console.log(response);


    // UVI API => pass coordinates from weather API to UVI API to get UV index
    $.get(`http://api.openweathermap.org/data/2.5/uvi?appid=32a6bd8e1707690576a18bee7c728812&lat=${cityLat}&lon=${cityLong}`)
    .then(function(response){
        cityUVIndexP.innerHTML = response.value

    });

    // 5 day forcast 
    $.ajax({}).then(function(response){

    });
});