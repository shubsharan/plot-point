import Cookies from 'js-cookie';

import { getUser } from '$utils/api';
import { getAuthToken } from '$utils/utils';

window.Webflow ||= [];
window.Webflow.push(async () => {
  handleNavItems();
  handleLogout();
});

const handleNavItems = async () => {
  const authToken = getAuthToken();

  if (!authToken) {
    document.querySelectorAll('[data-cloak="logged-in"]').forEach((item) => {
      item.removeAttribute('data-cloak');
    });
    return;
  }

  const user = await getUser(authToken);

  if (!user) {
    console.log('No user found');
    document.querySelectorAll('[data-cloak="logged-in"]').forEach((item) => {
      item.removeAttribute('data-cloak');
    });
    return;
  }

  if ('message' in user) {
    console.log('Error message found: ', user.message);
    document.querySelectorAll('[data-cloak="logged-in"]').forEach((item) => {
      item.removeAttribute('data-cloak');
    });
    Cookies.remove('authToken');
    window.location.href = '/auth/login';
  } else {
    console.log('User found: ', user);
    const navName = document.querySelector<HTMLDivElement>('[data-element="nav-name"]');
    const navEmail = document.querySelector<HTMLDivElement>('[data-element="nav-email"]');

    if (navName) {
      navName.textContent = user.name;
    }

    if (navEmail) {
      navEmail.textContent = user.email;
    }

    document.querySelectorAll('[data-cloak="logged-out"]').forEach((item) => {
      item.removeAttribute('data-cloak');
    });
  }
};

const handleLogout = async () => {
  const logoutLink = document.querySelector<HTMLLinkElement>('[data-element="logout"]');

  if (!logoutLink) {
    return;
  }

  logoutLink.addEventListener('click', () => {
    Cookies.remove('authToken');
    document.location.href = '/auth/login';
  });
};
