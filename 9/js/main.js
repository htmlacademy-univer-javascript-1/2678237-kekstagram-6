import { generatePosts } from './data.js';
import { COUNT_POSTS } from './constants.js';
import { initGallery } from './gallery.js';

const posts = generatePosts(COUNT_POSTS);

initGallery(posts);
