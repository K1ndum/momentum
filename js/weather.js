const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lengNow}&appid=2692b5a4855e0a8f947ad635931b6674&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod == '400' || data.cod == '404') {
    if (lengNow == 'en') {
      weatherError.textContent = 'Error! Which city dose not exist';
      city.placeholder = '[Enter city]';
    } else {
      weatherError.textContent = 'Ошибка! Такого города не существует';
      city.placeholder = '[Введите город]';
    }
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = ``;
    weatherDescription.textContent = '';
    wind.textContent = ``;
    humidity.textContent = ``;
  } else {
    weatherError.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (lengNow == 'en') {
      wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`;
    } else {
      wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
      humidity.textContent = `Влажноть: ${Math.floor(data.main.humidity)}%`;
    }
  }
}

city.addEventListener('change', getWeather)