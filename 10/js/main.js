import { generatePosts } from './module/data.js';
import { COUNT_POSTS } from './module/constants.js';
import { initGallery } from './module/gallery.js';
import { initForm } from './module/form.js';

const posts = generatePosts(COUNT_POSTS);

initGallery(posts);
initForm();
