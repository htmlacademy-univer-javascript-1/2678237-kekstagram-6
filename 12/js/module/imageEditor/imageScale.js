import {
  DEFAULT_SCALE_PHOTO,
  MAX_SCALE_PHOTO,
  MIN_SCALE_PHOTO,
  STEP_SCALE_PHOTO
} from '../data/constants.js';

const createScaleController = (form, imageEditor) => {
  const scaleSmallerBtn = form.querySelector('.scale__control--smaller');
  const scaleBiggerBtn = form.querySelector('.scale__control--bigger');
  const scaleControlValue = form.querySelector('.scale__control--value');

  const setImageScale = (percent) => {
    const newScale = Math.max(MIN_SCALE_PHOTO, Math.min(MAX_SCALE_PHOTO, percent));
    scaleControlValue.value = `${newScale}%`;
    imageEditor.applyImageScale(newScale);
  };

  const onDecreaseScale = () => {
    const currentScale = parseInt(scaleControlValue.value, 10);
    setImageScale(currentScale - MIN_SCALE_PHOTO);
  };

  const onIncreaseScale = () => {
    const currentScale = parseInt(scaleControlValue.value, 10);
    setImageScale(currentScale + STEP_SCALE_PHOTO);
  };

  const init = () => {
    setImageScale(DEFAULT_SCALE_PHOTO);
    scaleSmallerBtn.addEventListener('click', onDecreaseScale);
    scaleBiggerBtn.addEventListener('click', onIncreaseScale);
  };

  const destroy = () => {
    scaleSmallerBtn.removeEventListener('click', onDecreaseScale);
    scaleBiggerBtn.removeEventListener('click', onIncreaseScale);
    scaleControlValue.value = '';
  };

  return {
    init,
    setImageScale,
    destroy
  };
};

export { createScaleController };
