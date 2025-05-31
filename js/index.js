document.addEventListener('DOMContentLoaded', () => {

const temperature = document.querySelector('#temperature');
const weatherCode = document.querySelector('#weather-code');
let latitude, longitude;

//weather code paired with corresponding image
const weatherImgMap = {
  "0": "sun.png",

  "1":"partly-sunny.png",
  "2":"partly-sunny.png",
  "3":"partly-sunny.png",

  "45":"fog.png",
  "48":"fog.png",

  "51":"drizzle.png",
  "53":"drizzle.png",
  "55":"drizzle.png",

  "56":"freezing-drizzle.png",
  "57":"freezing-drizzle.png",

  "61":"rain.png",
  "63":"rain.png",
  "65":"rain.png",

  "66":"freezing-rain.png",
  "67":"freezing-rain.png",

  "71":"snow.png",
  "73":"snow.png",
  "75":"snow.png",

  "77":"light-snow.png",

  "80":"freezing-rain.png",
  "81":"freezing-rain.png",
  "82":"freezing-rain.png",

  "85":"snow-shower.png",
  "86":"snow-shower.png",
  
  "95":"thunderstorm.png",

  "96":"severe-thunderstorm.png",
  "99":"severe-thunderstorm.png",

};

const weatherDescriptionMap = {
  "0": "Clear sky",

  "1":"Mainly clear, partly cloudy, and overcast",
  "2":"Mainly clear, partly cloudy, and overcast",
  "3":"Mainly clear, partly cloudy, and overcast",

  "45":"Fog",
  "48":"Fog",

  "51":"Drizzle: Light",
  "53":"Drizzle: Moderate",
  "55":"Drizzle: Dense",

  "56":"Freezing Drizzle: Light",
  "57":"Freezing Drizzle: Dense",

  "61":"Rain: Light",
  "63":"Rain: Moderate",
  "65":"Rain: Heavy",

  "66":"Freezing Rain: Light",
  "67":"Freezing Rain: Heavy",

  "71":"Snow: light",
  "73":"Snow: moderate",
  "75":"Snow: heavy",

  "77":"Flurries",

  "80":"Rain Showers: Light",
  "81":"Rain Showers: Moderate",
  "82":"Rain Showers: Heavy",

  "85":"Snow Shower: Light",
  "86":"Snow Shower: Heavy",
  
  "95":"Thunderstorm: Slight to Moderate",

  "96":"Thunderstorm: Slight Hail",
  "99":"Thunderstorm: Heavy Hail",

};

//ASYNC FUNCTIONS////////////////////////////////////////////////////
//FETCH TEMPERATURE
const locationForm = document.getElementById('add-location');
if (locationForm) {
locationForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const lat = event.target.latitude.value;
  const lon = event.target.longitude.value;

  latitude = lat;
  longitude = lon;

  //display location
  const displayLocation = document.createElement('div');
  displayLocation.innerHTML = `Your Latitude: ${lat} <br>Your Longitude: ${lon}`;
  const locationInput = document.getElementById('location-input-displayed');
  locationInput.innerHTML = '';
  locationInput.appendChild(displayLocation);

  fetchTemperature(lat, lon);

  locationForm.reset();

});
}

  //ASYNC FUNCTIONS///////////////////////////

  async function fetchTemperature(lat, lon) {
    try {
    const tempResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
    if (!tempResponse.ok) {
      throw new Error('Request failed');
    }
    const tempData = await tempResponse.json();
    const maxTemp = tempData.daily.temperature_2m_max[0];
    const minTemp = tempData.daily.temperature_2m_min[0];
    temperature.innerHTML = `${maxTemp} | ${minTemp}`;

  } catch (error) {
      console.error('An error occurred:', error);
  }
  }

  async function fetchWeatherCode(lat, lon) {
    try {
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code&timezone=auto`);
    if (!weatherResponse.ok) {
    throw new Error('Request failed');
    }
    const weatherData = await weatherResponse.json();
    const code = weatherData.daily.weather_code[0];
    const imageFilename = weatherImgMap[code];
    const icon = document.getElementById("weatherIcon");
    icon.alt = "Weather icon";

    weatherCode.textContent = weatherDescriptionMap[code];
  
    if (imageFilename) {
      const fullPath = `img/${imageFilename}`;
      icon.src = fullPath;
      console.log(`Set weather icon: ${fullPath}`);
    }
    
    } catch (error) {
      console.error('An error occurred:', error);
    }
    }

    const getWeatherButton = document.getElementById('get-weather');
    getWeatherButton.addEventListener('click', function () {
      if (!latitude || !longitude) {
        alert('Please enter a location first!');
        return;
      }

      const weatherIcon = document.getElementById("weatherIcon");

      if (weatherIcon.classList.contains('hidden')) {
        fetchWeatherCode(latitude, longitude);
        getWeatherButton.innerHTML = "close weather code";
        weatherIcon.classList.remove('hidden');
        weatherCode.classList.remove('hidden');
      } else {
        getWeatherButton.innerHTML = "My Weather Code";
        weatherIcon.classList.add('hidden');
        weatherCode.classList.add('hidden');
      }
  });

});
