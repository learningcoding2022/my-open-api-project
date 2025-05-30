




const temperature = document.querySelector('#temperature');
//console.log('temperature')
const weatherCode = document.querySelector('#weather-code');
//console.log('weatherCode');

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

//fetching the min and max temp using asynch await
async function fetchTemp() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.2271&longitude=-80.8431&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FNew_York&wind_speed_unit=ms&temperature_unit=fahrenheit&precipitation_unit=inch');
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    console.log(data);

    const maxTemp = data.daily.temperature_2m_max[0];
    console.log('maxTemp');
    const minTemp = data.daily.temperature_2m_min[0];
    console.log('minTemp');

    temperature.innerHTML = `${maxTemp} | ${minTemp}`;

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

fetchTemp();

//fetching the weather code
async function fetchWeather() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.2271&longitude=-80.8431&daily=weather_code&timezone=America%2FNew_York&wind_speed_unit=ms&temperature_unit=fahrenheit&precipitation_unit=inch');
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    console.log(data);

    const weatherData = data.daily.weather_code[0];
    console.log('weatherData');

    const imageFilename = weatherImgMap[weatherData];
    const icon = document.getElementById("weatherIcon");
  
    if (imageFilename) {
      const fullPath = `img/${imageFilename}`;
      icon.src = fullPath;
      console.log(`Set weather icon: ${fullPath}`);
    }
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

fetchWeather();

