import { generatePosts } from './data.js';
import { COUNT_POSTS } from './constants.js';
import { renderThumbnails } from './renderThumbnails.js';

const posts = generatePosts(COUNT_POSTS);

renderThumbnails(posts);
