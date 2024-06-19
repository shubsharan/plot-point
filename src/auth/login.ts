import Cookies from 'js-cookie';

import { login } from '$utils/api';
import { handleFormError } from '$utils/utils';

window.Webflow ||= [];
window.Webflow.push(async () => {
  handleLogin();
});

const handleLogin = () => {
  const form = document.querySelector<HTMLFormElement>('[data-element="form"]');
  const phoneInput = document.querySelector<HTMLInputElement>('[data-element="phone-input"]');
  const passwordInput = document.querySelector<HTMLInputElement>('[data-element="password-input"]');
  const submitButton = document.querySelector<HTMLButtonElement>('[data-element="submit-button"]');

  if (!form || !phoneInput || !passwordInput || !submitButton) {
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    submitButton.disabled = true;

    const phone = phoneInput.value;
    const password = passwordInput.value;

    const response = await login(phone, password);
    console.log(response);

    if (response.message) {
      handleFormError(response.message);
    } else {
      Cookies.set('authToken', response.authToken, { secure: true, sameSite: 'strict' });
      window.location.pathname = '/profile';
    }

    submitButton.disabled = false;
  });
};
