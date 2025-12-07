const renderThumbnails = function(posts, openFullThumbnail) {
  const pictures = document.querySelector('.pictures');
  const templatePictureFragment = document.querySelector('#picture').content;
  const templatePicture = templatePictureFragment.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const thumbnail = templatePicture.cloneNode(true);
    const img = thumbnail.querySelector('.picture__img');
    const info = thumbnail.querySelector('.picture__info');
    const countComments = info.querySelector('.picture__comments');
    const pictureLikes = info.querySelector('.picture__likes');

    thumbnail.id = posts[i].id;
    img.src = posts[i].url;
    img.alt = posts[i].description;
    countComments.textContent = (posts[i].comments).length;
    pictureLikes.textContent = posts[i].likes;
    openFullThumbnail(thumbnail, post);

    fragment.appendChild(thumbnail);
  }

  pictures.appendChild(fragment);
};

export { renderThumbnails };
