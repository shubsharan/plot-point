import Cookies from 'js-cookie';

import { getUser } from './api';

export const handleFormError = (message: string) => {
  const errorMessage = document.querySelector<HTMLDivElement>('[data-element="error-message"]');
  const errorText = document.querySelector<HTMLTextAreaElement>('[data-element="error-text"]');

  if (!errorMessage || !errorText) {
    return;
  }

  errorText.textContent = message;
  errorMessage.style.display = 'block';
};

export const getAuthToken = () => {
  return Cookies.get('authToken') as string;
};

export const checkForUser = async () => {
  const authToken = getAuthToken();

  if (!authToken) {
    return;
  }

  const user = await getUser(authToken);

  if (!user) {
    console.log('No user found');
    return;
  }

  if ('message' in user) {
    console.log('Error: ', user.message);
    return;
  }

  return user;
};
