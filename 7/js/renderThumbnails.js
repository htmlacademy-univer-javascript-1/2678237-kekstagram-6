const pictures = document.querySelector('.pictures');
const templatePictureFragment = document.querySelector('#picture').content;
const templatePicture = templatePictureFragment.querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderThumbnails = function(posts) {
  for (let i = 0; i < posts.length; i++) {
    const thumbnail = templatePicture.cloneNode(true);
    const img = thumbnail.children[0];
    const info = thumbnail.children[1];
    const countComments = info.children[0];
    const pictureLikes = info.children[1];

    thumbnail.id = posts[i].id;
    img.src = posts[i].url;
    countComments.textContent = (posts[i].comments).length;
    pictureLikes.textContent = posts[i].likes;

    fragment.appendChild(thumbnail);
  }

  pictures.appendChild(fragment);
};

export { renderThumbnails };
