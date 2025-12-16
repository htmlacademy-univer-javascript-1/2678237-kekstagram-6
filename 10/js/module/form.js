import { pristine } from './validateForm.js';

const formUploadImg = document.querySelector('#upload-select-image');
const uploadFile = formUploadImg.querySelector('#upload-file');
const submitButton = formUploadImg.querySelector('.img-upload__submit');
const modalWindow = document.querySelector('.img-upload__overlay');
const closeModalBtn = modalWindow.querySelector('.img-upload__cancel');
const bodyDocument = document.querySelector('body');

const closeModal = () => {
  uploadFile.value = '';
  modalWindow.classList.add('hidden');
  bodyDocument.classList.remove('modal-open');
  closeModalBtn.removeEventListener('click', closeModal);
  bodyDocument.removeEventListener('keydown', closeModal);
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

const openImageEditor = (image) => {
  const imgUploadPreview = formUploadImg.querySelector('.img-upload__preview');
  const imgPreview = imgUploadPreview.querySelector('img');

  modalWindow.classList.remove('hidden');
  bodyDocument.classList.add('modal-open');

  imgPreview.src = image;

  closeModalBtn.addEventListener('click', closeModal);
  bodyDocument.addEventListener('keydown', (evt) => {
    onKeyDown(evt, closeModal);
  });
};

const changeInputImage = (evt) => {
  const file = evt.target.files[0];

  if (file && file.type.startsWith('image/')) {
    const image = URL.createObjectURL(file);
    openImageEditor(image);
  }
};

const initForm = () => {
  uploadFile.addEventListener('change', changeInputImage);
  formUploadImg.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();

    if (!isValid) {
      evt.preventDefault();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Отправляю...';
  });
};

export { initForm };
