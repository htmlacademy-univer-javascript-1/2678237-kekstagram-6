import { generatePosts } from './data.js';
import { COUNT_POSTS } from './constants.js';
import { initGallery } from './gallery.js';
import { initForm } from './form.js';

const posts = generatePosts(COUNT_POSTS);

initGallery(posts);
initForm();
