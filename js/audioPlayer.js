const playList = [
  {      
    title: 'Aqua Caelestis',
    src: '../assets/sounds/Aqua Caelestis.mp3',
    duration: '0:39'
  },  
  {      
    title: 'River Flows In You',
    src: '../assets/sounds/River Flows In You.mp3',
    duration: '1:36'
  },
  {      
    title: 'Summer Wind',
    src: '../assets/sounds/Summer Wind.mp3',
    duration: '1:50'
  },
  {      
    title: 'Ennio Morricone',
    src: '../assets/sounds/Ennio Morricone.mp3',
    duration: '1:37'
  }
]

const button = document.querySelector('.play');
const buttonNext = document.querySelector('.play-next');
const buttonPrev = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
const progressSong = document.querySelector('.progress-song');
const currentTimeSong = document.querySelector('.current-time');
const duretionTimeSong = document.querySelector('.duration-time');
const volume = document.querySelector('.volume');
const progressVolume = document.querySelector('.progress-volume');
const songName = document.querySelector('.song-name');

let isPlay = false;
let isMuted = false;
let playNum = 0;

const audio = new Audio();
audio.src = playList[playNum].src;
songName.textContent = playList[playNum].title;


function playAudio() {
  playListContainer.children[playNum].classList.add('item-active');
  if (isPlay) {
    audio.pause();
  } else {
    audio.play();
  }
  toggleBtn();
}

function toggleBtn() {
  button.classList.toggle('pause');
  isPlay == false ? isPlay = true : isPlay = false;
}

function playNext() {
  playListContainer.children[playNum].className = 'play-item';
  audio.pause();
  if(playNum >= playList.length-1){
    playNum = 0;
  } else {
    playNum++;
  }
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  playListContainer.children[playNum].classList.add('item-active');
  songName.textContent = playList[playNum].title;
  if (isPlay) {
    audio.play();
  } else {
    audio.pause();
  }
  setTimeout(() => {
    progressSong.value = 0;
  }, 0);
}

function playPrev() {
  playListContainer.children[playNum].className = 'play-item';
  audio.pause();
  if(playNum <= 0){
    playNum = playList.length-1;
    console.log(playNum)
  } else {
    playNum--;
  }
  audio.src = playList[playNum].src;
  audio.classList.add('item-active');
  audio.currentTime = 0;
  playListContainer.children[playNum].classList.add('item-active');
  songName.textContent = playList[playNum].title;
  if (isPlay) {
    audio.play();
  } else {
    audio.pause();
  }
  setTimeout(() => {
    progressSong.value = 0;
  }, 0);
}

function currentTimeAudio() {
  // переключает если закончился трэк
  if (audio.currentTime >= audio.duration) {
    playNext();
  }
  // отображение прогресса
  progressSong.value = (audio.currentTime/audio.duration)*100;
  // Текущее время
  let timeAudio = audio.currentTime;
  let minutes = Math.floor(timeAudio / 60);
  let seconds = Math.floor(timeAudio - minutes * 60);
  let minutesVal = minutes;
  let secondsVal = seconds;
  if(seconds < 10) {
  secondsVal = '0' + seconds;
  }
  currentTimeSong.textContent = `${minutesVal}:${secondsVal}`;
  duretionTimeSong.textContent = `/ ${playList[playNum].duration}`;
}

function rewindAudio(e) {
  let scrubTime = (e.offsetX / progressSong.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
}

function controlVolume() {
  audio.volume = progressVolume.value;
  if ( progressVolume.value == 0) {
    volume.style.backgroundImage = 'url("../assets/svg/volumeMuted.png")';
  } else {
    volume.style.backgroundImage = '';
  }
}

let beforeMuted;
function toggleVolume() {
  if (isMuted == false) {
    beforeMuted = audio.volume;
    console.log(beforeMuted)
    isMuted = true;
    audio.volume = 0;
    progressVolume.value = 0;
    controlVolume();
  } else {
    isMuted = false;
    audio.volume = beforeMuted;
    progressVolume.value = beforeMuted;
    controlVolume();
  }
}

playList.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playListContainer.append(li)
})
playListContainer.children[playNum].classList.add('item-active');

audio.addEventListener('timeupdate', currentTimeAudio);
progressSong.addEventListener('click', rewindAudio);
progressVolume.addEventListener('input', controlVolume);
button.addEventListener('click', playAudio);
volume.addEventListener('click', toggleVolume)
buttonNext.addEventListener('click', playNext);
buttonPrev.addEventListener('click', playPrev);

currentTimeAudio();
progressSong.value = 0;
