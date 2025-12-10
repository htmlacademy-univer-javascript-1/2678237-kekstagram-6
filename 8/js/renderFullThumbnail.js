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

const viewComments = function (parentBlock, comments) {
  const socialComments = parentBlock.querySelector('.social__comments');
  const socialCommentCount = parentBlock.querySelector('.social__comment-count');
  const commentsLoader = parentBlock.querySelector('.comments-loader');

  socialComments.innerHTML = '';
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  comments.forEach((comment) => {
    const commentBlock = createComment(comment);
    socialComments.append(commentBlock);
  });
};

const renderFullThumbnail = function (post) {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureBlock = bigPicture.querySelector('.big-picture__img');
  const bigPictureImg = bigPictureBlock.querySelector('img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const closeButtonPicture = bigPicture.querySelector('.big-picture__cancel');
  const bodyDocument = document.querySelector('body');
  const comments = post.comments;

  const closeModal = () => {
    bigPicture.classList.add('hidden');
    bodyDocument.classList.remove('modal-open');
    document.removeEventListener('keydown', closeModal);
  };

  const onKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  };

  bodyDocument.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  bigPictureImg.src = post.url;
  bigPictureImg.alt = post.description;
  likesCount.textContent = post.likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = post.description;

  viewComments(bigPicture, comments);

  document.addEventListener('keydown', onKeyDown);
  closeButtonPicture.addEventListener('click', closeModal);
};

export { renderFullThumbnail };
