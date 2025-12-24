import { initGallery } from './modules/gallery/gallery.js';
import { initForm } from './modules/form/form.js';
import { getPosts } from './api/dataApi.js';
import { showAlertMessage } from './modules/notify/message.js';
import ErrorApi from './api/errorApi.js';

const renderLoadPosts = async () => {
  try {
    const posts = await getPosts();
    initGallery(posts);
    showAlertMessage('Посты успешно загружены!', 'success');
  } catch (err) {
    if (err instanceof ErrorApi) {
      showAlertMessage(err.message, 'error');
    } else {
      showAlertMessage('Произошла неизвестная ошибка', 'error');
    }
  }
};

const app = () => {
  initForm();
  renderLoadPosts();
};

document.addEventListener('DOMContentLoaded', app);
