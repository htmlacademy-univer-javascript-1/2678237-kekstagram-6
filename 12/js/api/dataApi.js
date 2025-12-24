import ErrorApi from './errorApi.js';

const baseApiUrl = 'https://29.javascript.htmlacademy.pro/kekstagram';

const APIRoute = {
  GET: `${baseApiUrl}/data`,
  POST: `${baseApiUrl}/`,
};

const getPosts = async () => {
  try {
    const response = await fetch(APIRoute.GET);
    if (!response.ok) {
      throw new ErrorApi(`Ошибка сервера: ${response.status}`, response.status);
    }
    return response.json();
  } catch (e) {
    throw new ErrorApi('Ошибка загрузки постов', null);
  }
};

const sendNewPost = async (formData) => {
  try {
    const response = await fetch(APIRoute.POST, {
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

const sendForm = async (formData) => sendNewPost(formData);

export { getPosts, sendForm };
