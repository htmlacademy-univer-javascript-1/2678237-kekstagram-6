const openImageEditor = (form, image) => {
  const imgUploadPreview = form.querySelector('.img-upload__preview');
  const imgPreview = imgUploadPreview.querySelector('img');
  imgPreview.src = image;
};

export { openImageEditor };
