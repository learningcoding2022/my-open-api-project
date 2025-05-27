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

    weatherCode.innerHTML = `${weatherData}`;

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

fetchWeather();

const temperature = document.querySelector('#temperature');
//console.log('temperature')
const weatherCode = document.querySelector('#weather-code');
//console.log('weatherCode');

temperature.innerText = `${repositories[i].temperature}`;
console.log('repositoryName');
