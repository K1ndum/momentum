const en = document.querySelectorAll('.leng')[0];
const ru = document.querySelectorAll('.leng')[1];
const textSetting = document.querySelectorAll('.textSetting');
const textShow = document.querySelector('.show');
const textCustomize = document.querySelector('.customize');
const textSettingRU = {
  0: 'Язык',
  1: 'Время',
  2: 'Дата',
  3: 'Приветствие',
  4: 'Цитата дня',
  5: 'Погода',
  6: 'Аудио плеер',
  7: 'Список дел (Todo)',
}
const textSettingEN = {
  0: 'Language',
  1: 'Time',
  2: 'Date',
  3: 'Greeting',
  4: 'Quote Of The Day',
  5: 'Weather',
  6: 'Audio Player',
  7: 'Todo List',
}

function changeLenguage() {
  if (this.className == 'leng') {
    lengNow = this.textContent;
    document.querySelectorAll('.leng').forEach(el => el.className = 'leng');
    this.classList.add('active-leng');
    showGreeting();
    showDate();
    getWeather();
    changeLengSetting();
    getQuotes();
    if (lengNow == 'en' && city.value == 'Минск') {
      city.value = 'Minsk'
    } else if (lengNow == 'ru' && city.value == 'Minsk'){
      city.value = 'Минск'
    }
  }
}

function changeLengSetting() {
  if (lengNow == 'en') {
    for (let i = 0; i <= 7; i++) {
      textSetting[i].textContent = textSettingEN[i];
    }
    textShow.textContent = 'show';
    textCustomize.textContent = 'Customize your dashboard';
  } else {
    for (let i = 0; i <= 7; i++) {
      textSetting[i].textContent = textSettingRU[i];
    }
    textShow.textContent = 'Отображение';
    textCustomize.textContent = 'Настройте свою панель управления';
  }
} 

function changeLenguageUpdate() {
  document.querySelectorAll('.leng').forEach(el => el.className = 'leng');
  if (document.querySelectorAll('.leng')[0].textContent == lengNow) {
    document.querySelectorAll('.leng')[0].classList.add('active-leng');
  } else {
    document.querySelectorAll('.leng')[1].classList.add('active-leng');
  }
}

changeLenguageUpdate();

en.addEventListener('click', changeLenguage);
ru.addEventListener('click', changeLenguage);

