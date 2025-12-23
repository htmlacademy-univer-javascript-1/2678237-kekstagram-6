import { pristine } from './validateForm.js';
import { createImageEditor } from '../imageEditor/imageEditor.js';
import {
  DEFAULT_IMAGE_FORM,
  EFFECTS,
  DEFAULT_CONFIG_UISLIDER
} from '../data/constants.js';
import {createScaleController} from '../imageEditor/imageScale.js';

const formUploadImg = document.querySelector('#upload-select-image');
const uploadFile = formUploadImg.querySelector('#upload-file');
const submitButton = formUploadImg.querySelector('.img-upload__submit');

const stepSlider = formUploadImg.querySelector('.img-upload__effect-level');
const stepSliderInput = stepSlider.querySelector('.effect-level__value');
const effectsList = formUploadImg.querySelector('.effects__list');

const modalWindow = document.querySelector('.img-upload__overlay');
const closeModalBtn = modalWindow.querySelector('.img-upload__cancel');
const bodyDocument = document.querySelector('body');

let imageEditor = null;
let scaleController = null;

noUiSlider.create(stepSlider, DEFAULT_CONFIG_UISLIDER);

const isValidSubmit = (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

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
    imageEditor.setEffectImage(effectValue);
  }
};

const resetForm = () => {
  pristine.reset();
  formUploadImg.reset();
  stepSlider.noUiSlider.updateOptions(DEFAULT_CONFIG_UISLIDER);
  imageEditor.setPreviewImage(DEFAULT_IMAGE_FORM);
  scaleController.destroy();
  imageEditor = null;
  scaleController = null;
};

const closeModal = () => {
  modalWindow.classList.add('hidden');
  bodyDocument.classList.remove('modal-open');
  formUploadImg.removeEventListener('submit', isValidSubmit);
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

  imageEditor = createImageEditor();
  scaleController = createScaleController(formUploadImg, imageEditor);
  scaleController.init();

  const defaultEffect = effectsList.querySelector('input[type="radio"]:checked');

  if (defaultEffect.value === 'none') {
    stepSlider.classList.add('hidden');
  }

  stepSlider.noUiSlider.on('update', (values, handle) => {
    stepSliderInput.value = values[handle];
    imageEditor.updateEffectImage(values[handle]);
  });

  closeModalBtn.addEventListener('click', closeModal);
  bodyDocument.addEventListener('keydown', onKeyDown);
  effectsList.addEventListener('change', changeImageEffects);
  formUploadImg.addEventListener('submit', isValidSubmit);
};

const changeInputImage = (evt) => {
  const file = evt.target.files[0];

  if (file && file.type.startsWith('image/')) {
    const image = URL.createObjectURL(file);
    openModal();
    imageEditor.setPreviewImage(image);
  }
};

const initForm = () => {
  uploadFile.addEventListener('change', changeInputImage);
};

export { initForm };
