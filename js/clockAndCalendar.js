// Язык переметил сюда что бы все функции работали
let lengNow;
if (localStorage.getItem('lenguage') == null) {
  lengNow = 'en';
} else {
  lengNow = localStorage.getItem('lenguage');
}

const timeOnPage = document.querySelector('.time');
const dateOnPage = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');


function showTime() {
  const date = new Date();
  const curentTime = date.toLocaleTimeString();
  timeOnPage.textContent = curentTime;
  setTimeout(showTime, 1000);
  setTimeout(showDate, 1000);
  setTimeout(showGreeting, 1000);
}

function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
  let currentDate;
  if (lengNow == 'en') {
    currentDate = date.toLocaleDateString('en-US', options);
  } else {
    currentDate = date.toLocaleDateString('ru', options);
  }
  dateOnPage.textContent = currentDate;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 6 && hours < 12) {
    return 'morning';
  } else if (hours >= 12 && hours < 18) {
    return 'afternoon';
  } else if (hours >= 18 && hours < 24) {
    return 'evening';
  } else if (hours >= 0 && hours < 6) {
    return 'night';
  }
}

function getTimeOfDayRU() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 6 && hours < 12) {
    return 'утра';
  } else if (hours >= 12 && hours < 18) {
    return 'дня';
  } else if (hours >= 18 && hours < 24) {
    return 'вечера';
  } else if (hours >= 0 && hours < 6) {
    return 'ночи';
  }
}

function showGreeting() {
  if (lengNow == 'en') {
    const timeOfDay = getTimeOfDay();
    greeting.textContent = `Good ${timeOfDay}`;
    name.placeholder = '[Enter name]';
  } else {
    const timeOfDay = getTimeOfDayRU();
    greeting.textContent = `Доброго ${timeOfDay}`;
    name.placeholder = '[Введите имя]';
  }
}

function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('weather', city.value);
  localStorage.setItem('lenguage', lengNow);
  localStorage.setItem('bgAPI', bgAPI);
  localStorage.setItem('bgTag', bgTag);
  localStorage.setItem('countActive', countActive);
  if (toDayObj !== undefined) {
    localStorage.setItem('toDayObj', JSON.stringify(toDayObj));
  }
  if (doneObj !== undefined) {
    localStorage.setItem('doneObj', JSON.stringify(doneObj));
  }
}

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('weather')) {
    city.value = localStorage.getItem('weather');
    getWeather();
  } else {
    if (lengNow == 'en') {
      city.value = 'Minsk';
    } else {
      city.value = 'Минск';
    }
    getWeather();
  }
  lengNow = localStorage.getItem('lenguage');
}

window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)
showTime();
