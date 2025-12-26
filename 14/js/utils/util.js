function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomName(names) {
  const randomNameIndex = Math.floor(Math.random() * names.length);
  return names[randomNameIndex];
}

function getRandomMessage(messages, count = 2) {
  const countMessage = Math.floor(Math.random() * count) + 1;
  let message = '';
  for (let i = 0; i < countMessage; i++) {
    const randomMessageIndex = getRandom(0, messages.length);
    message += `${messages[randomMessageIndex]}`;
  }
  return message;
}

const sortingPost = (postA, postB) => postB.comments.length - postA.comments.length;

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandom, getRandomName, getRandomMessage, sortingPost, debounce };
