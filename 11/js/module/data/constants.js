const COUNT_POSTS = 25;
const COUNT_COMMENTS = 30;

const MIN_AVATAR_INDEX = 1;
const MAX_AVATAR_INDEX = 6;

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const NAMES = [
  'Александр',
  'Дмитрий',
  'Максим',
  'Артём',
  'Иван',
  'Анна',
  'Елена',
  'Ольга',
  'Наталья',
  'Светлана'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Золотой час над заснеженными горами',
  'Утренняя дымка в осеннем лесу',
  'Минималистичный городской пейзаж на рассвете',
  'Портрет в чёрно-белом стиле с мягким боке',
  'Девушка в красном платье на фоне заката',
  'Капли дождя на стекле крупным планом',
  'Ночная съёмка звёздного неба с млечным путём',
  'Уличная фотография: отражение в луже',
  'Тёплый свет ламп в уютном кафе',
  'Макросъёмка глаза с отражением города',
  'Лавандовые поля на закате, Прованс',
  'Дрон-съёмка: бесконечные волны океана'
];

const MAX_VIEW_COMMENTS = 5;

const MAX_LENGTH_DESCRIPTION = 140;
const MAX_HASHTAGS = 5;
const MAX_TAG_LENGTH = 20;
const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]+$/;
const MIN_SCALE_PHOTO = 25;
const MAX_SCALE_PHOTO = 100;
const STEP_SCALE_PHOTO = 25;
const DEFAULT_SCALE_PHOTO = 100;
const DEFAULT_IMAGE_FORM = 'img/upload-default-image.jpg';

const EFFECTS = {
  none: {
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const DEFAULT_CFG_UISLIDER = {
  start: EFFECTS.none.min,
  step: EFFECTS.none.step,
  range: {
    'min': EFFECTS.none.min,
    'max': EFFECTS.none.max,
  }
};

export {
  COUNT_POSTS,
  COUNT_COMMENTS,
  MIN_AVATAR_INDEX,
  MAX_AVATAR_INDEX,
  MIN_LIKES,
  MAX_LIKES,
  NAMES,
  MESSAGES,
  DESCRIPTION,
  MAX_VIEW_COMMENTS,
  MAX_LENGTH_DESCRIPTION,
  MAX_HASHTAGS,
  MAX_TAG_LENGTH,
  HASHTAG_REGEX,
  MIN_SCALE_PHOTO,
  MAX_SCALE_PHOTO,
  STEP_SCALE_PHOTO,
  DEFAULT_SCALE_PHOTO,
  DEFAULT_IMAGE_FORM,
  EFFECTS,
  DEFAULT_CFG_UISLIDER
};

