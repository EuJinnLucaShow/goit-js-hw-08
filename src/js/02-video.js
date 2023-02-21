import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

const THROTTLE_DELAY = 1000; // milliseconds
const storageKey = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlayerTimeUpdate, THROTTLE_DELAY));

function onPlayerTimeUpdate(event) {
  const time = Math.floor(event.seconds);
  localStorage.setItem(storageKey, time);
}

const savedTime = localStorage.getItem(storageKey);

if (savedTime) {
  player.setCurrentTime(savedTime);
}


