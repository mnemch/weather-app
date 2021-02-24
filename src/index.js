//current  time day
function currentDate(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[time.getDay()];
  let hour = (time.getHours() < 10 ? "0" : "") + time.getHours();
  let minutes = (time.getMinutes() < 10 ? "0" : "") + time.getMinutes();
  return `${day} ${hour}:${minutes}`;
}

//format for forecast
function formatHours(times) {
  let now = new Date(times);
  let hour = (now.getHours() < 10 ? "0" : "") + now.getHours();
  let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
  return `${hour}:${minutes}`;
}

// current time and wetaher parameters
let currDate = document.querySelector("#currtime");
let date = new Date();
currDate.innerHTML = currentDate(date);

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#degreesnumber");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//search forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
                <div class="col">
                    <img src="http://openweathermap.org/img/wn/${
                      forecast.weather[0].icon
                    }@2x.png"
                    alt=""
                    />
                    <br />
                    ${formatHours(forecast.dt * 1000)}
                    <br />
                    ${Math.round(forecast.main.temp_min)}°  ${Math.round(
      forecast.main.temp_max
    )}°
                </div>`;
  }
}

//search engine
function search(city) {
  let apikey = "eb1733f56daae1f8c299ea8db424ea64";
  let api = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${api}q=${city}&appid=${apikey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);

  let apifor = "https://api.openweathermap.org/data/2.5/forecast?";
  apiUrl = `${apifor}q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// location by https://openweathermap.org/api/
function Coordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let api = "https://api.openweathermap.org/data/2.5/weather?";
  let apikey = "eb1733f56daae1f8c299ea8db424ea64";
  let units = "metric";
  let apiUrl = `${api}lat=${lat}&lon=${lon}&appid=${apikey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);

  let apifor = "https://api.openweathermap.org/data/2.5/forecast?";
  apiUrl = `${apifor}lat=${lat}&lon=${lon}&appid=${apikey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
//
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#idformsearchcity");
  search(cityInputElement.value);
}

function mycurlocation() {
  navigator.geolocation.getCurrentPosition(Coordinates);
}
// F <=> C
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degreesnumber");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degreesnumber");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let currentLocationIcon = document.querySelector("#mycurrent-location");
currentLocationIcon.addEventListener("click", mycurlocation);
///mycurlocation();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
//The prime meridian
search("London");


// //map from google test
// var map;
// var geoJSON;
// var request;
// var gettingData = false;
// var openWeatherMapKey = "eb1733f56daae1f8c299ea8db424ea64";

// function initialize() {
//   var mapOptions = {
//     zoom: 4,
//     center: new google.maps.LatLng(50, -50)
//   };

//   map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
//   // Add interaction listeners to make weather requests
//   google.maps.event.addListener(map, "idle", checkIfDataRequested);

//   // Sets up and populates the info window with details
//   map.data.addListener("click", function (event) {
//     infowindow.setContent(
//       "<img src=" +
//         event.feature.getProperty("icon") +
//         ">" +
//         "<br /><strong>" +
//         event.feature.getProperty("city") +
//         "</strong>" +
//         "<br />" +
//         event.feature.getProperty("temperature") +
//         "&deg;C" +
//         "<br />" +
//         event.feature.getProperty("weather")
//     );
//     infowindow.setOptions({
//       position: {
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng()
//       },
//       pixelOffset: {
//         width: 0,
//         height: -15
//       }
//     });
//     infowindow.open(map);
//   });
// }

// var checkIfDataRequested = function () {
//   // Stop extra requests being sent
//   while (gettingData === true) {
//     request.abort();
//     gettingData = false;
//   }
//   getCoords();
// };

// // Get the coordinates from the Map bounds
// var getCoords = function () {
//   var bounds = map.getBounds();
//   var NE = bounds.getNorthEast();
//   var SW = bounds.getSouthWest();
//   getWeather(NE.lat(), NE.lng(), SW.lat(), SW.lng());
// };

// // Make the weather request
// var getWeather = function (northLat, eastLng, southLat, westLng) {
//   gettingData = true;
//   var requestString =
//     "http://api.openweathermap.org/data/2.5/box/city?bbox=" +
//     westLng +
//     "," +
//     northLat +
//     "," + //left top
//     eastLng +
//     "," +
//     southLat +
//     "," + //right bottom
//     map.getZoom() +
//     "&cluster=yes&format=json" +
//     "&APPID=" +
//     openWeatherMapKey;
//   request = new XMLHttpRequest();

//   request.onload = proccessResults;
//   request.open("get", requestString, true);
//   request.send();
// };

// // Take the JSON results and proccess them
// var proccessResults = function () {
//   console.log(this);
//   var results = JSON.parse(this.responseText);
//   if (results.list.length > 0) {
//     resetData();
//     for (var i = 0; i < results.list.length; i++) {
//       geoJSON.features.push(jsonToGeoJson(results.list[i]));
//     }
//     drawIcons(geoJSON);
//   }
// };

// var infowindow = new google.maps.InfoWindow();

// // For each result that comes back, convert the data to geoJSON
// var jsonToGeoJson = function (weatherItem) {
//   var feature = {
//     type: "Feature",
//     properties: {
//       city: weatherItem.name,
//       weather: weatherItem.weather[0].main,
//       temperature: weatherItem.main.temp,
//       min: weatherItem.main.temp_min,
//       max: weatherItem.main.temp_max,
//       humidity: weatherItem.main.humidity,
//       pressure: weatherItem.main.pressure,
//       windSpeed: weatherItem.wind.speed,
//       windDegrees: weatherItem.wind.deg,
//       windGust: weatherItem.wind.gust,
//       icon:
//         "http://openweathermap.org/img/w/" +
//         weatherItem.weather[0].icon +
//         ".png",
//       coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat]
//     },
//     geometry: {
//       type: "Point",
//       coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat]
//     }
//   };
//   // Set the custom marker icon
//   map.data.setStyle(function (feature) {
//     return {
//       icon: {
//         url: feature.getProperty("icon"),
//         anchor: new google.maps.Point(25, 25)
//       }
//     };
//   });

//   // returns object
//   return feature;
// };

// // Add the markers to the map
// var drawIcons = function (weather) {
//   map.data.addGeoJson(geoJSON);
//   // Set the flag to finished
//   gettingData = false;
// };

// // Clear data layer and geoJSON
// var resetData = function () {
//   geoJSON = {
//     type: "FeatureCollection",
//     features: []
//   };
//   map.data.forEach(function (feature) {
//     map.data.remove(feature);
//   });
// };

// google.maps.event.addDomListener(window, "load", initialize);

//laguage 
// function translateDescription(description) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("GET", "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=" + description, false);
//     xhttp.send();
//     var response = JSON.parse(xhttp.responseText);
//     return response[0][0][0];
// }

