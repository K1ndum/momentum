const en = document.querySelectorAll('.leng')[0];
const ru = document.querySelectorAll('.leng')[1];
const textSetting = document.querySelectorAll('.textSetting');
const textShow = document.querySelector('.show');
const textCustomize = document.querySelector('.customize');
const textSettingRU = {
  0: 'Задний фон',
  1: 'Теги',
  2: 'Язык',
  3: 'Время',
  4: 'Дата',
  5: 'Приветствие',
  6: 'Цитата дня',
  7: 'Погода',
  8: 'Аудио плеер',
  9: 'Список дел (Todo)',
}
const textSettingEN = {
  0: 'Bg-images from',
  1: 'tags',
  2: 'Language',
  3: 'Time',
  4: 'Date',
  5: 'Greeting',
  6: 'Quote Of The Day',
  7: 'Weather',
  8: 'Audio Player',
  9: 'Todo List',
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
    for (let i = 0; i <= 9; i++) {
      textSetting[i].textContent = textSettingEN[i];
    }
    textShow.textContent = 'show';
    textCustomize.textContent = 'Customize your dashboard';
  } else {
    for (let i = 0; i <= 9; i++) {
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
changeLengSetting();

en.addEventListener('click', changeLenguage);
ru.addEventListener('click', changeLenguage);

