import ErrorApi from './errorApi.js';

const baseApiUrl = 'https://29.javascript.htmlacademy.pro/kekstagram';

const APIRoute = {
  GET_POSTS: `${baseApiUrl}/data`,
  SEND_POST: `${baseApiUrl}/`,
};

const getPosts = async () => {
  try {
    const response = await fetch(APIRoute.GET_POSTS);
    if (!response.ok) {
      throw new ErrorApi(`Ошибка сервера: ${response.status}`, response.status);
    }
    return response.json();
  } catch (e) {
    throw new ErrorApi('Ошибка загрузки постов', null);
  }
};

const sendForm = async (formData) => {
  try {
    const response = await fetch(APIRoute.SEND_POST, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new ErrorApi(`Ошибка сервера: ${response.status}`, response.status);
    }
    return response.json();
  } catch (e) {
    throw new ErrorApi(`Не удалось отправить данные: ${e.message}`, null);
  }
};

export { getPosts, sendForm };
