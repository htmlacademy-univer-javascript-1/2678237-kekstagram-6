import { getRandom, getRandomName, getRandomMessage } from '../utils/util.js';
import {
  MIN_LIKES,
  MAX_LIKES,
  COUNT_COMMENTS,
  NAMES,
  MESSAGES,
  DESCRIPTION,
  MIN_AVATAR_INDEX,
  MAX_AVATAR_INDEX
} from './constants.js';

function generatePosts(countPosts) {
  const posts = [];
  for (let i = 1; i <= countPosts; i++) {
    const post = {
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTION[getRandom(0, DESCRIPTION.length)],
      likes: getRandom(MIN_LIKES, MAX_LIKES),
      comments: generateComments(NAMES, MESSAGES, COUNT_COMMENTS),
    };
    posts.push(post);
  }

  return posts;
}

function generateComments(names, messages, count) {
  const comments = [];
  const countComments = getRandom(0, count);
  for (let i = 0; i < countComments; i++) {
    const randomAvatarIndex = getRandom(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX);
    const comment = {
      id: i,
      avatar: `img/avatar-${randomAvatarIndex}.svg`,
      message: getRandomMessage(messages),
      name: getRandomName(names),
    };
    comments.push(comment);
  }

  return comments;
}

export { generatePosts };
