import Cookies from 'js-cookie';

import { signUp } from '$utils/api';
import { handleFormError } from '$utils/utils';

window.Webflow ||= [];
window.Webflow.push(() => {
  handleSignup();
});

const handleSignup = () => {
  const form = document.querySelector<HTMLFormElement>('[data-element="form"]');
  const nameInput = document.querySelector<HTMLInputElement>('[data-element="name-input"]');
  const emailInput = document.querySelector<HTMLInputElement>('[data-element="email-input"]');
  const passwordInput = document.querySelector<HTMLInputElement>('[data-element="password-input"]');
  const submitButton = document.querySelector<HTMLButtonElement>('[data-element="submit-button"]');

  if (!form || !nameInput || !emailInput || !passwordInput || !submitButton) {
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    submitButton.disabled = true;

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const response = await signUp(name, email, password);

    if (response.message) {
      handleFormError(response.message);
    } else {
      Cookies.set('authToken', response.authToken, { secure: true, sameSite: 'strict' });
      window.location.pathname = '/stories';
    }

    submitButton.disabled = false;
  });
};
