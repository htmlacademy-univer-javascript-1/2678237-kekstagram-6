import { EFFECTS } from '../data/constants.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = uploadOverlay.querySelector('.img-upload__preview');
const imgPreview = imgUploadPreview.querySelector('img');
const effectsPreview = uploadOverlay.querySelectorAll('.effects__preview');
let currentEffect = EFFECTS['none'];

const applyImageScale = (percent) => {
  const scale = percent / 100;
  imgPreview.style.transform = `scale(${scale})`;
  imgPreview.style.transition = 'transform 0.2s ease-in-out';
};

const setPreviewImage = (image) => {
  imgPreview.src = image;

  effectsPreview.forEach((effect) => {
    effect.style.backgroundImage = `url('${image}')`;
  });
};

const setEffectImage = (effect) => {
  const chooseEffect = EFFECTS[effect];
  const filterType = chooseEffect.filter;
  const filterUnit = chooseEffect.unit;
  const filterValue = chooseEffect.max;

  currentEffect = chooseEffect;

  if (effect === 'none') {
    imgPreview.style.filter = 'none';
  } else {
    imgPreview.style.filter = `${filterType}(${filterValue}${filterUnit})`;
  }
};

const updateEffectImage = (value) => {
  const filterType = currentEffect.filter;
  const filterUnit = currentEffect.unit;
  imgPreview.style.filter = `${filterType}(${value}${filterUnit})`;
};

export { applyImageScale, setPreviewImage, setEffectImage, updateEffectImage };
