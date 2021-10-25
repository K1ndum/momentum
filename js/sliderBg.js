const bgNum = (getRandomIntInclusive(1, 20) + '').padStart(2, '0');
let randomNum = bgNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const bgiApi = document.querySelector('.bgiApi');
const tags = document.querySelector('.tags');
let bgAPI;
let bgTag;
let startWay = false;
if (localStorage.getItem('bgAPI') == null) {
  bgAPI = 'github';
} else {
  bgAPI = localStorage.getItem('bgAPI');
}

if (localStorage.getItem('bgTag') == null) {
  bgTag = 'nature';
} else {
  bgTag = localStorage.getItem('bgTag');
}


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBg() {
  if (bgAPI == 'github') {
    const timeOfDay = getTimeOfDay();
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg`
    img.onload = () => {      
      document.body.style.backgroundImage = `url('${img.src}')`
    }; 
  } else if (bgAPI == 'unsplash') {
    getLinkToImageUnsplash();
  } else if (bgAPI == 'flickr') {
    getLinkToImageFlickr();
  }
}

async function getLinkToImageUnsplash() {
  const url = `https://api.unsplash.com/photos/random?query=${bgTag}&orientation=landscape&client_id=9nd-4ZLZCeit3pz8CPz2CMC2c9EsmcKo2oEqK-p-h0I`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src = data.urls.regular;
  img.onload = () => {      
    document.body.style.backgroundImage = `url('${img.src}')`
  }; 
}

async function getLinkToImageFlickr() {
  let number = getRandomIntInclusive(0, 10)
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a84752067750b759ad75c6f1ba74f074&tags=${bgTag}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src = data.photos.photo[number].url_l;
  img.onload = () => {      
    document.body.style.backgroundImage = `url('${img.src}')`
  }; 
}

function getAPI() {
  if (startWay == true) {
    bgAPI = bgiApi.value;
    bgTag = tags.value;
  } else {
    startWay = true;
    bgiApi.value = bgAPI;
    tags.value = bgTag;
  }
  if (bgAPI == 'github') {
    tags.disabled = 'disabled';
  } else {
    tags.disabled = '';
  }
  setBg();
}

getAPI();

function getSlideNext() {
  randomNum = (++randomNum + '').padStart(2, '0');
  if (+randomNum > 20) {
    randomNum = '01';
  }
  setBg();
}

function getSlidePrev() {
  randomNum = (--randomNum + '').padStart(2, '0');
  if (+randomNum < 1) {
    randomNum = '20';
  }
  setBg();
}

bgiApi.addEventListener('change', getAPI);
tags.addEventListener('change', getAPI);
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);