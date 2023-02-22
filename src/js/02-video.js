//імпортуємо клас Player з бібліотеки Vimeo і бібліотеку lodash.throttle
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// За допомогою класу Player створюємо об'єкт player, який ініціалізується з id елементу iframe нашого відео
const player = new Player('vimeo-player');

// Задаємо час затримки для функції throttle у змінну THROTTLE_DELAY
const THROTTLE_DELAY = 1000; // milliseconds
const storageKey = 'videoplayer-current-time';

// Використовуючи метод on() класу Player, підписуємося на подію timeupdate
player.on('timeupdate', throttle(onPlayerTimeUpdate, THROTTLE_DELAY));

// Визначаємо функцію onPlayerTimeUpdate, яка викликається при кожному оновленні часу відтворення
function onPlayerTimeUpdate(event) {
  const time = Math.floor(event.seconds); // заокруглюємо цей час вниз до цілого числа
  localStorage.setItem(storageKey, time); // зберігаємо його у локальне сховище з ключем, визначеним у змінній storageKey
}

const savedTime = localStorage.getItem(storageKey);

if (savedTime) {
  player.setCurrentTime(savedTime);
}


