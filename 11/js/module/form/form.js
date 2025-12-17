import { pristine } from './validateForm.js';
import { applyImageScale, setPreviewImage, setEffectImage, updateEffectImage } from '../imageEditor/imageEditor.js';
import {
  DEFAULT_IMAGE_FORM,
  DEFAULT_SCALE_PHOTO, EFFECTS,
  MAX_SCALE_PHOTO,
  MIN_SCALE_PHOTO,
  STEP_SCALE_PHOTO,
  DEFAULT_CFG_UISLIDER
} from '../data/constants.js';

const formUploadImg = document.querySelector('#upload-select-image');
const uploadFile = formUploadImg.querySelector('#upload-file');
const submitButton = formUploadImg.querySelector('.img-upload__submit');

const scaleSmallerBtn = formUploadImg.querySelector('.scale__control--smaller');
const scaleBiggerBtn = formUploadImg.querySelector('.scale__control--bigger');
const scaleControlValue = formUploadImg.querySelector('.scale__control--value');

const stepSlider = formUploadImg.querySelector('.img-upload__effect-level');
const stepSliderInput = stepSlider.querySelector('.effect-level__value');
const effectsList = formUploadImg.querySelector('.effects__list');

const modalWindow = document.querySelector('.img-upload__overlay');
const closeModalBtn = modalWindow.querySelector('.img-upload__cancel');
const bodyDocument = document.querySelector('body');

noUiSlider.create(stepSlider, DEFAULT_CFG_UISLIDER);

const isValidSubmit = (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const changeImageScale = (percent) => {
  const currentScale = parseInt(scaleControlValue.value, 10);
  let newScale = currentScale + percent;

  if (newScale < MIN_SCALE_PHOTO) {
    newScale = MIN_SCALE_PHOTO;
  } else if (newScale > MAX_SCALE_PHOTO) {
    newScale = MAX_SCALE_PHOTO;
  }
  scaleControlValue.value = `${newScale}%`;
  applyImageScale(newScale);
};

const scaleSmallerHandler = () => changeImageScale(-STEP_SCALE_PHOTO);
const scaleBiggerHandler = () => changeImageScale(STEP_SCALE_PHOTO);

const updateUiSlider = (cfgEffect) => {
  stepSlider.noUiSlider.updateOptions({
    start: cfgEffect.max,
    step: cfgEffect.step,
    range: {
      min: cfgEffect.min,
      max: cfgEffect.max,
    }
  });
};

const changeImageEffects = (evt) => {
  const chooseEffects = evt.target.matches('input[type="radio"]');

  if (chooseEffects) {
    const effectValue = evt.target.value;

    if (!EFFECTS[effectValue]) {
      return;
    }

    if (effectValue === 'none') {
      stepSlider.classList.add('hidden');
    } else {
      stepSlider.classList.remove('hidden');
    }

    updateUiSlider(EFFECTS[effectValue]);
    setEffectImage(effectValue);
  }
};

const resetForm = () => {
  pristine.reset();
  formUploadImg.reset();
  stepSlider.noUiSlider.updateOptions(DEFAULT_CFG_UISLIDER);
  setPreviewImage(DEFAULT_IMAGE_FORM);
  changeImageScale(DEFAULT_SCALE_PHOTO);
};

const closeModal = () => {
  modalWindow.classList.add('hidden');
  bodyDocument.classList.remove('modal-open');

  formUploadImg.removeEventListener('submit', isValidSubmit);
  scaleSmallerBtn.removeEventListener('click', scaleSmallerHandler);
  scaleBiggerBtn.removeEventListener('click', scaleBiggerHandler);
  closeModalBtn.removeEventListener('click', closeModal);
  bodyDocument.removeEventListener('keydown', closeModal);

  resetForm();
};

const onKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    if (evt.target.closest('.text__hashtags') || evt.target.closest('.text__description')) {
      evt.target.blur();
      evt.stopPropagation();
      return;
    }

    evt.preventDefault();
    closeModal();
  }
};

const openModal = () => {
  modalWindow.classList.remove('hidden');
  bodyDocument.classList.add('modal-open');

  scaleControlValue.value = `${DEFAULT_SCALE_PHOTO}%`;

  const defaultEffect = effectsList.querySelector('input[type="radio"]:checked');

  if (defaultEffect.value === 'none') {
    stepSlider.classList.add('hidden');
  }

  stepSlider.noUiSlider.on('update', (values, handle) => {
    stepSliderInput.value = values[handle];
    updateEffectImage(values[handle]);
  });

  closeModalBtn.addEventListener('click', closeModal);
  bodyDocument.addEventListener('keydown', (evt) => {
    onKeyDown(evt);
  });

  scaleSmallerBtn.addEventListener('click', scaleSmallerHandler);

  scaleBiggerBtn.addEventListener('click', scaleBiggerHandler);

  effectsList.addEventListener('change', changeImageEffects);

  formUploadImg.addEventListener('submit', isValidSubmit);
};

const changeInputImage = (evt) => {
  const file = evt.target.files[0];

  if (file && file.type.startsWith('image/')) {
    const image = URL.createObjectURL(file);
    openModal();
    setPreviewImage(image);
  }
};

const initForm = () => {
  uploadFile.addEventListener('change', changeInputImage);
};

export { initForm };
