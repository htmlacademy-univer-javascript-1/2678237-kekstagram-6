import { TIMEOUT_ANIMATION } from '../data/constants.js';

const errorFragment = document.querySelector('#error').content;
const successFragment = document.querySelector('#success').content;
const loadingFragment = document.querySelector('#messages').content;

const errorTemplate = errorFragment.querySelector('.error');
const successTemplate = successFragment.querySelector('.success');
const loadingTemplate = loadingFragment.querySelector('.img-upload__message');

const showFailureMessage = (message) => {
  const failureBlock = errorTemplate.cloneNode(true);
  const failureBtn = failureBlock.querySelector('.error__button');
  const errorTitle = failureBlock.querySelector('.error__title');
  const errorInner = failureBlock.querySelector('.error__inner');

  errorTitle.textContent = message;
  failureBtn.textContent = 'Повторить снова';

  const closeMessage = () => {
    failureBtn.removeEventListener('click', closeMessage);
    document.removeEventListener('click', closeMessage);
    document.removeEventListener('keydown', closeMessage);
    failureBlock.remove();
  };

  const onKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onDocumentClick = (evt) => {
    if (!errorInner.contains(evt.target)) {
      closeMessage();
    }
  };

  document.body.append(failureBlock);
  failureBtn.addEventListener('click', closeMessage);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onKeyDown);
};

const showSuccessMessage = (message) => {
  const successBlock = successTemplate.cloneNode(true);
  const successBtn = successBlock.querySelector('.success__button');
  const successTitle = successBlock.querySelector('.success__title');
  const successInner = successBlock.querySelector('.success__inner');

  successTitle.textContent = message;

  const closeMessage = () => {
    successBtn.removeEventListener('click', closeMessage);
    document.removeEventListener('click', closeMessage);
    document.removeEventListener('keydown', closeMessage);
    successBlock.remove();
  };

  const onKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onDocumentClick = (evt) => {
    if (!successInner.contains(evt.target)) {
      closeMessage();
    }
  };

  document.body.append(successBlock);
  successBtn.addEventListener('click', closeMessage);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onKeyDown);
};

const showAlertMessage = (message, type = 'info') => {
  const alertBlock = document.createElement('div');
  const titleAlert = document.createElement('p');

  alertBlock.append(titleAlert);
  alertBlock.classList.add('alert', `alert--${type}`, `data-${type}`);
  titleAlert.textContent = message;

  document.body.append(alertBlock);

  requestAnimationFrame(() => {
    alertBlock.classList.add('alert-show');
  });

  setTimeout(() => {
    alertBlock.classList.remove('alert-show');
    alertBlock.addEventListener('transitionend', () => {
      alertBlock.remove();
    }, { once: true });
  }, TIMEOUT_ANIMATION);
};

const showLoadingMessage = () => {
  const loadingBlock = loadingTemplate.cloneNode(true);
  document.body.appendChild(loadingBlock);
  document.body.classList.add('modal-open');
};

const hideLoadingMessage = () => {
  const loadingBlock = document.querySelector('.img-upload__message');
  if (loadingBlock) {
    loadingBlock.remove();
  }
  document.body.classList.remove('modal-open');
};

export {
  showSuccessMessage,
  showFailureMessage,
  showAlertMessage,
  showLoadingMessage,
  hideLoadingMessage
};
