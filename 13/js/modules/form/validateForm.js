import { MAX_LENGTH_DESCRIPTION, MAX_HASHTAGS, MAX_TAG_LENGTH, HASHTAG_REGEX } from '../data/constants.js';

const formUploadImg = document.querySelector('#upload-select-image');
const hashtagsField = formUploadImg.querySelector('.text__hashtags');
const descriptionField = formUploadImg.querySelector('.text__description');

const pristine = new Pristine(formUploadImg, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'input--invalid',
  successClass: 'input--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const getHashtags = (value) => value.trim().split(/\s+/);

const validateHashtagsCount = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = getHashtags(value);

  return hashtags.length <= MAX_HASHTAGS;
};

const validateHashtagsUnique = (value) => {
  const hashtags = getHashtags(value);
  const uniqueHashtag = new Set();
  let isUniqueHashtag = true;

  for (const hashtag of hashtags) {
    const tag = hashtag.toLowerCase();
    if (uniqueHashtag.has(tag)) {
      isUniqueHashtag = false;
      break;
    }
    uniqueHashtag.add(tag);
  }

  return isUniqueHashtag;
};

const validateHashtagsFormat = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = getHashtags(value);
  let isValidHashtag = true;

  for (const hashtag of hashtags) {
    if (!HASHTAG_REGEX.test(hashtag) || hashtag.length > MAX_TAG_LENGTH) {
      isValidHashtag = false;
      break;
    }
  }

  return isValidHashtag;
};

const validateDescription = (value) => value.length <= MAX_LENGTH_DESCRIPTION;

pristine.addValidator(
  hashtagsField,
  validateHashtagsFormat,
  'Неверный формат хэш-тегов',
  1,
  true
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsUnique,
  'Хэш-теги не уникальны',
  2,
  true
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  `От 0 до ${MAX_HASHTAGS} хэш-тегов`,
  3,
  true
);

pristine.addValidator(
  descriptionField,
  validateDescription,
  `От 0 до ${MAX_LENGTH_DESCRIPTION} символов`
);

export { pristine };
