import { renderThumbnails } from './renderThumbnails.js';
import { renderFullThumbnail } from './renderFullThumbnail.js';

const initFullThumbnail = function(thumbnail, post) {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderFullThumbnail(post);
  });
};

const clearGallery = () => {
  document.querySelectorAll('.picture:not(.img-filters__button)').forEach(
    (picture) => picture.remove()
  );
};

const renderGallery = function(posts) {
  renderThumbnails(posts, initFullThumbnail);
};

export { renderGallery, clearGallery };
