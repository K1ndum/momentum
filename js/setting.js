const setting = document.querySelector('.setting');
const settingsMenu = document.querySelector('.setting-menu');
const timeCheck = document.querySelector('.time-check');
const dateCheck = document.querySelector('.date-check');
const greetingCheck = document.querySelector('.greeting-check');
const quoteCheck = document.querySelector('.quote-check');
const weatherCheck = document.querySelector('.weather-check');
const audioCheck = document.querySelector('.audio-check');
const todoCheck = document.querySelector('.todo-check');
let settingList;

const CheckLinkBlock = {
  'time-check': 'time',
  'date-check': 'date',
  'greeting-check': 'greeting-container',
  'quote-check': 'qoute-conteiner',
  'weather-check': 'weather',
  'audio-check': 'player',
  'todo-check': 'toDoList'
}

if (localStorage.getItem('settingList') == null) {
  settingList = {
    'time-check': true,
    'date-check': true,
    'greeting-check': true,
    'quote-check': true,
    'weather-check': true,
    'audio-check': true,
    'todo-check': true
  }
} else {
  let objList = localStorage.getItem('settingList');
  settingList = JSON.parse(objList);
}

let isOpen = false;

function openSettings() {
  if (isOpen == false) {
    isOpen = true;
    settingsMenu.className = 'setting-menu';
    settingsMenu.classList.add('setting-menu-open');
  } else {
    isOpen = false;
    settingsMenu.className = 'setting-menu';
  }
}

function offBlock() {
  settingList[this.className] = this.checked;
  let block = CheckLinkBlock[`${this.className}`];
  let item = document.querySelector(`.${block}`)
  let linkWithItem = CheckLinkBlock[`${this.className}`]
  if (item.className == linkWithItem) {
    item.classList.add('offBlock');
  } else if (item.className == `${linkWithItem} offBlock`) {
    item.className = linkWithItem;
  }
  localStorage.setItem('settingList', JSON.stringify(settingList))
}

function updateSetting() {
  document.querySelectorAll('input[type=checkbox]').forEach(el => {
    el.checked = settingList[el.className];
    if(!settingList[el.className]) {
      let block = CheckLinkBlock[`${el.className}`];
      document.querySelector(`.${block}`).classList.add('offBlock');
    }
  })
}
updateSetting();


document.querySelectorAll('input[type=checkbox]').forEach(el => el.addEventListener('click', offBlock))
//timeCheck.addEventListener('click', offBlock);
setting.addEventListener('click', openSettings)