//making sure js is connecting
const heading = document.querySelector('h1');
console.log(heading);
heading.addEventListener('click', function() {
    heading.style.color = 'teal';
});

//fetching the data from the weather app using asynch await
async function fetchData() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.2271&longitude=-80.8431&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FNew_York');
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

fetchData();

