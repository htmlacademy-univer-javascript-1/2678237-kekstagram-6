import { renderThumbnails } from './renderThumbnails.js';
import { renderFullThumbnail} from './renderFullThumbnail.js';

const openFullThumbnail = function(thumbnail, post) {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderFullThumbnail(post);
  });
};

const initGallery = function(posts) {
  renderThumbnails(posts, openFullThumbnail);
};

export { initGallery };
