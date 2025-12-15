import {MAX_VIEW_COMMENTS} from './constants.js';

const createComment = function (comment) {
  const commentBlock = document.createElement('li');
  const commentUserAvatarBlock = document.createElement('img');
  const textCommentBlock = document.createElement('p');

  commentBlock.classList.add('social__comment');
  commentUserAvatarBlock.classList.add('social__picture');
  commentUserAvatarBlock.src = comment.avatar;
  commentUserAvatarBlock.width = 35;
  commentUserAvatarBlock.height = 35;
  commentUserAvatarBlock.alt = comment.name;
  textCommentBlock.classList.add('social__text');
  textCommentBlock.textContent = comment.message;

  commentBlock.append(commentUserAvatarBlock);
  commentBlock.append(textCommentBlock);

  return commentBlock;
};

const viewComments = function (parentBlock, comments, countView) {
  const socialComments = parentBlock.querySelector('.social__comments');
  const socialCommentCount = parentBlock.querySelector('.social__comment-count');
  const commentsCount = socialCommentCount.querySelector('.comments-count');

  socialComments.innerHTML = '';
  commentsCount.textContent = comments.length;

  socialCommentCount.innerHTML = `${countView} из ${commentsCount.outerHTML} комментариев`;

  for (let i = 0; i < countView; i++) {
    const comment = comments[i];
    const commentBlock = createComment(comment);
    socialComments.append(commentBlock);
  }
};

const renderFullThumbnail = function (post) {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureBlock = bigPicture.querySelector('.big-picture__img');
  const bigPictureImg = bigPictureBlock.querySelector('img');
  const bodyDocument = document.querySelector('body');

  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socialCaption = bigPicture.querySelector('.social__caption');

  const closeButtonPicture = bigPicture.querySelector('.big-picture__cancel');
  const commentsLoaderButton = bigPicture.querySelector('.comments-loader');

  const comments = post.comments;
  const maxComments = comments.length;
  let showCountComments = Math.min(MAX_VIEW_COMMENTS, maxComments);

  const handleLoadMoreComments = () => {
    showCountComments += MAX_VIEW_COMMENTS;

    if (showCountComments >= maxComments) {
      showCountComments = maxComments;
      commentsLoaderButton.classList.add('hidden');
    }

    viewComments(bigPicture, comments, showCountComments);
  };

  const closeModal = () => {
    bigPicture.classList.add('hidden');
    bodyDocument.classList.remove('modal-open');
    commentsLoaderButton.classList.remove('hidden');
    document.removeEventListener('keydown', closeModal);
    closeButtonPicture.removeEventListener('click', closeModal);
    commentsLoaderButton.removeEventListener('click', handleLoadMoreComments);
  };

  const onKeyDown = (evt) => {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      closeModal();
    }
  };

  bodyDocument.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  bigPictureImg.src = post.url;
  bigPictureImg.alt = post.description;
  likesCount.textContent = post.likes;
  commentsCount.textContent = maxComments;
  socialCaption.textContent = post.description;

  if (maxComments <= MAX_VIEW_COMMENTS) {
    commentsLoaderButton.classList.add('hidden');
  }

  viewComments(bigPicture, comments, showCountComments);

  commentsLoaderButton.addEventListener('click', handleLoadMoreComments);
  document.addEventListener('keydown', onKeyDown);
  closeButtonPicture.addEventListener('click', closeModal);
};

export { renderFullThumbnail };
