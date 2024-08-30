const chosenLocation = document.getElementById("location");
const submitBtn = document.getElementById("search-btn");
const displayTemp = document.getElementById("display-temp");
const displayLocation = document.getElementById("display-location");
const displayDesc = document.getElementById("display-desc");
const maxTemp = document.getElementById("max-temp");
const maxTempTmr = document.getElementById("tmr-max-temp");

const apiURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiSevenDayURL = 'https://api.openweathermap.org/data/2.5/forecast';
const apiKey = '41c646cfa77dcc3d9e477b16f4d2465e';

submitBtn.addEventListener('click', () => {
    const location = chosenLocation.value;
    if (location){
        fetchWeather(location);
        fetchSevenDayWeather(location);
    }
});

function fetchWeather(location){
    const url = `${apiURL}?q=${location}&appid=${apiKey}&units=imperial`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayLocation.textContent = data.name;
            displayTemp.textContent = `${Math.round(data.main.temp)}°`;
            displayDesc.textContent = data.weather[0].description;
            maxTemp.textContent = `H: ${Math.round(data.main.temp_max)}° L: ${Math.round(data.main.temp_min)}°`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function fetchSevenDayWeather(location){
    const sevenDayURL = `${apiSevenDayURL}?q=${location}&appid=${apiKey}&units=imperial`;

    fetch(sevenDayURL)
        .then(response => response.json())
        .then(data => {
            maxTempTmr.textContent = `Tomorrow: H: ${Math.round(data.list[1].main.temp_max)}° L: ${Math.round(data.list[1].main.temp_min)}°`;
        })
        .catch(error => {
            console.error('Error fetching forecast data: ', error);
        });
}
