import { getRandom, sortingPost, debounce } from '../../utils/util.js';
import { renderGallery, clearGallery } from '../gallery/gallery.js';
import { COUNT_RANDOM_POSTS, TYPE_FILTER } from '../data/constants.js';

const getRandomPosts = (copy) => {
  const result = [];
  for (let i = 0; i < COUNT_RANDOM_POSTS && copy.length; i++) {
    const rndIndex = getRandom(0, copy.length - 1);
    result.push(copy.splice(rndIndex, 1)[0]);
  }
  return result;
};

const usePostsFilters = (posts, typeFilter) => {
  const copy = posts.slice();
  switch (typeFilter) {
    case TYPE_FILTER.RANDOM:
      return getRandomPosts(copy);
    case TYPE_FILTER.DISCUSSED:
      return copy.sort(sortingPost);
    case TYPE_FILTER.DEFAULT:
    default:
      return copy;
  }
};

const initFilters = (posts) => {
  const originalPosts = posts.slice();

  const filtersContainer = document.querySelector('.img-filters');
  filtersContainer.classList.remove('img-filters--inactive');

  const buttons = filtersContainer.querySelectorAll('.img-filters__button');

  const reRender = debounce((typeFilter) => {
    clearGallery();
    const filteredPosts = usePostsFilters(originalPosts, typeFilter);
    renderGallery(filteredPosts);
  });

  buttons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      buttons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');

      reRender(evt.target.id);
    });
  });

  renderGallery(originalPosts);
};

export { initFilters };
