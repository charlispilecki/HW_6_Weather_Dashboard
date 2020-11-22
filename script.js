// City weather variables

var cityNameHeading = document.querySelector("#city-name")
var cityTemperatureP = document.querySelector("#temp")
var cityHumidityP = document.querySelector("#humid")
var cityWindSpeedP = document.querySelector("#wind")
var weatherIcon = document.querySelector("#weather-icon")

// 5-Day Forecast variables

// Date variables
var forecastDateOne = document.querySelector("#forecast-one-date")
var forecastDateTwo = document.querySelector("#forecast-two-date")
var forecastDateThree = document.querySelector("#forecast-three-date")
var forecastDateFour = document.querySelector("#forecast-four-date")
var forecastDateFive = document.querySelector("#forecast-five-date")
// Temperature variables
var forecastTempOne = document.querySelector("#forecast-one-temp")
var forecastTempTwo = document.querySelector("#forecast-two-temp")
var forecastTempThree = document.querySelector("#forecast-three-temp")
var forecastTempFour = document.querySelector("#forecast-four-temp")
var forecastTempFive = document.querySelector("#forecast-five-temp")
// Humidity variables
var forecastHumidityOne = document.querySelector("#forecast-one-humid")
var forecastHumidityTwo = document.querySelector("#forecast-two-humid")
var forecastHumidityThree = document.querySelector("#forecast-three-humid")
var forecastHumidityFour = document.querySelector("#forecast-four-humid")
var forecastHumidityFive = document.querySelector("#forecast-five-humid")
// Forecast Icon variables
var forecastDayOneIcon = document.querySelector("#forecast-one-icon")
var forecastDayTwoIcon = document.querySelector("#forecast-two-icon")
var forecastDayThreeIcon = document.querySelector("#forecast-three-icon")
var forecastDayFourIcon = document.querySelector("#forecast-four-icon")
var forecastDayFiveIcon = document.querySelector("#forecast-five-icon")

var searchButton = document.querySelector('#search-button')
var searchInput = document.querySelector('#search-input')
var searchedCitiesList = document.querySelector('#searched-cities')

// Get cities from local storage
var searchedCities = []
var storedCities = localStorage.getItem('searchedCities')
if (storedCities) {
    searchedCities = JSON.parse(storedCities)
}

// Default to last viewed city
var lastViewedCity = localStorage.getItem('lastViewedCity')
if (lastViewedCity) {
    showCityWeather(lastViewedCity)
}

renderSearchedCities()


searchButton.addEventListener('click', function (event) {
    event.preventDefault()

    var cityName = searchInput.value
    showCityWeather(cityName)
    searchInput.value = ''
})

// Cities in search history functionality
function showCityWeather(cityName) {

    cityName = cityName.toUpperCase()

    if (!searchedCities.includes(cityName)) {
        searchedCities.push(cityName)
        renderSearchedCities()
    }

    localStorage.setItem('lastViewedCity', cityName)
    localStorage.setItem('searchedCities', JSON.stringify(searchedCities))

    // AJAX functions for the APIs
    $.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=32a6bd8e1707690576a18bee7c728812&units=imperial`)
        .then(function (response)
        // need to pull the Temperature, Humidity, Wind Speed, and Icon
        {
            var weatherTemp = response.main.temp;
            var weatherHumid = response.main.humidity;
            var weatherWindSpeed = response.wind.speed;
            var NameofCity = response.name;
            var cityLat = response.coord.lat;
            var cityLong = response.coord.lon;
            var icon = response.weather[0].icon

            var date = new Date().toDateString()
            cityNameHeading.innerHTML = NameofCity + ` (${date})` 
            cityTemperatureP.innerHTML = weatherTemp;
            cityHumidityP.innerHTML = weatherHumid;
            cityWindSpeedP.innerHTML = weatherWindSpeed;

            weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`)

            // UVI API => pass coordinates from weather API to UVI API to get UV index
            $.get(`http://api.openweathermap.org/data/2.5/uvi?appid=32a6bd8e1707690576a18bee7c728812&lat=${cityLat}&lon=${cityLong}`)
                .then(function (response) {

                    var cityUVIndexP = document.querySelector("#uv")
                    
                    // UV Severity code
                    var uvSeverity;
                    if (response.value<=2){
                        uvSeverity = "uv-low"
                    } else if (response.value<=7){
                        uvSeverity = "uv-moderate"
                    } else{
                        uvSeverity = "uv-severe"
                    } 
                    cityUVIndexP.outerHTML = `<span id="uv" class="${uvSeverity}">${response.value}</span>`

                });

            // 5 day forcast 
            $.get(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=32a6bd8e1707690576a18bee7c728812&units=imperial`)
                .then(function (response) {

                    forecastDateOne.innerHTML = response.list[0].dt_txt.substring(0, 10)
                    forecastTempOne.innerHTML = "Temperature: " + response.list[0].main.temp
                    forecastHumidityOne.innerHTML = "Humidity: " + response.list[0].main.humidity + "%"
                    forecastDayOneIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`)

                    forecastDateTwo.innerHTML = response.list[8].dt_txt.substring(0, 10)
                    forecastTempTwo.innerHTML = "Temperature: " + response.list[8].main.temp
                    forecastHumidityTwo.innerHTML = "Humidity: " + response.list[8].main.humidity + "%"
                    forecastDayTwoIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.list[8].weather[0].icon}@2x.png`)

                    forecastDateThree.innerHTML = response.list[16].dt_txt.substring(0, 10)
                    forecastTempThree.innerHTML = "Temperature: " + response.list[16].main.temp
                    forecastHumidityThree.innerHTML = "Humidity: " + response.list[16].main.humidity + "%"
                    forecastDayThreeIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.list[16].weather[0].icon}@2x.png`)

                    forecastDateFour.innerHTML = response.list[24].dt_txt.substring(0, 10)
                    forecastTempFour.innerHTML = "Temperature: " + response.list[24].main.temp
                    forecastHumidityFour.innerHTML = "Humidity: " + response.list[24].main.humidity + "%"
                    forecastDayFourIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.list[24].weather[0].icon}@2x.png`)


                    forecastDateFive.innerHTML = response.list[36].dt_txt.substring(0, 10)
                    forecastTempFive.innerHTML = "Temperature: " + response.list[36].main.temp
                    forecastHumidityFive.innerHTML = "Humidity: " + response.list[36].main.humidity + "%"
                    forecastDayFiveIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.list[36].weather[0].icon}@2x.png`)

                });
        });

}

function renderSearchedCities() {
    searchedCitiesList.innerHTML = ''
    searchedCities.forEach(function(cityName) {
        searchedCitiesList.innerHTML += `
        <li onclick="showCityWeather('${cityName}')" class="list-group-item d-flex justify-content-between">
            <div>
                <h6 class="my-0">${cityName}</h6> 
            </div>
        </li>
    `
    })
}
