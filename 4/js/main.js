const COUNT_POSTS = 25;

const NAMES = [
  "Александр",
  "Дмитрий",
  "Максим",
  "Артём",
  "Иван",
  "Анна",
  "Елена",
  "Ольга",
  "Наталья",
  "Светлана"
];

const MESSAGES = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

const DESCRIPTION = [
  "Золотой час над заснеженными горами",
  "Утренняя дымка в осеннем лесу",
  "Минималистичный городской пейзаж на рассвете",
  "Портрет в чёрно-белом стиле с мягким боке",
  "Девушка в красном платье на фоне заката",
  "Капли дождя на стекле крупным планом",
  "Ночная съёмка звёздного неба с млечным путём",
  "Уличная фотография: отражение в луже",
  "Тёплый свет ламп в уютном кафе",
  "Макросъёмка глаза с отражением города",
  "Лавандовые поля на закате, Прованс",
  "Дрон-съёмка: бесконечные волны океана"
];

function generatePosts() {
  const posts = [];
  for (let i = 1; i <= COUNT_POSTS; i++) {
    const post = {
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTION[getRandom(0, DESCRIPTION.length)],
      likes: getRandom(15, 200),
      comments: generateComments(),
    };
    posts.push(post);
  }

  return posts;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateComments(count = 30) {
  const comments = [];
  const countComments = getRandom(0, count);
  for (let i = 0; i < countComments; i++) {
    const randomAvatarIndex = getRandom(0, 6);
    const comment = {
      id: i,
      avatar: `img/avatar-${randomAvatarIndex}.svg`,
      message: getRandomMessage(),
      name: getRandomName(),
    };
    comments.push(comment);
  }

  return comments;
}

function getRandomName() {
  const randomNameIndex = Math.floor(Math.random() * NAMES.length);
  return NAMES[randomNameIndex];
}

function getRandomMessage(count = 2) {
  const countMessage = Math.floor(Math.random() * count) + 1;
  let message = '';
  for (let i = 0; i < countMessage; i++) {
    const randomMessageIndex = getRandom(0, MESSAGES.length);
    message += `${MESSAGES[randomMessageIndex]}`;
  }
  return message;
}
