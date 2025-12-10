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

export { getRandom, getRandomName, getRandomMessage };
