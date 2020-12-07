function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[date.getMonth()];

  let currentdate = date.getDate();

  let year = date.getFullYear();

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

function search(city) {
  let apiKey = "fd8282cd066128b6757ea2360177d1d2";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  document.querySelector("#hour-zero").innerHTML = formatHours(response.data.list[0].dt * 1000);
  document.querySelector("#temp-zero").innerHTML = Math.round(response.data.list[0].main.temp);
  document.querySelector("#weather-icon-zero").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`);
  document.querySelector("#weather-icon-zero").setAttribute("alt", response.data.list[0].weather[0].description);

  document.querySelector("#hour-one").innerHTML = formatHours(response.data.list[1].dt * 1000);
  document.querySelector("#temp-one").innerHTML = Math.round(response.data.list[1].main.temp);
  document.querySelector("#weather-icon-one").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png`);
  document.querySelector("#weather-icon-one").setAttribute("alt", response.data.list[1].weather[0].description);

  document.querySelector("#hour-two").innerHTML = formatHours(response.data.list[2].dt * 1000);
  document.querySelector("#temp-two").innerHTML = Math.round(response.data.list[2].main.temp);
  document.querySelector("#weather-icon-two").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.list[2].weather[0].icon}@2x.png`);
  document.querySelector("#weather-icon-two").setAttribute("alt", response.data.list[2].weather[0].description);

  document.querySelector("#hour-three").innerHTML = formatHours(response.data.list[3].dt * 1000);
  document.querySelector("#temp-three").innerHTML = Math.round(response.data.list[3].main.temp);
  document.querySelector("#weather-icon-three").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.list[3].weather[0].icon}@2x.png`);
  document.querySelector("#weather-icon-three").setAttribute("alt", response.data.list[3].weather[0].description);

  document.querySelector("#hour-four").innerHTML = formatHours(response.data.list[4].dt * 1000);
  document.querySelector("#temp-four").innerHTML = Math.round(response.data.list[4].main.temp);
  document.querySelector("#weather-icon-four").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.list[4].weather[0].icon}@2x.png`);
  document.querySelector("#weather-icon-four").setAttribute("alt", response.data.list[4].weather[0].description);
}

function showTemperature(response) {
  fahrenheitTemperature = response.data.main.temp;

  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemperature);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
  document.querySelector("#current-time").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#weather-icon").setAttribute("alt", response.data.weather[0].description);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
} 
let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", searchCity);


function currentLocation(position) {
  let apiKey = "fd8282cd066128b6757ea2360177d1d2";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}
function showCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(currentLocation);
} 
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentLocation)


function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = (fahrenheitTemperature - 32) * 5/9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let fahrenheitTemperature = null;

search("New York")