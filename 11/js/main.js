import { generatePosts } from './module/data/data.js';
import { COUNT_POSTS } from './module/data/constants.js';
import { initGallery } from './module/gallery/gallery.js';
import { initForm } from './module/form/form.js';

const posts = generatePosts(COUNT_POSTS);

initGallery(posts);
initForm();
