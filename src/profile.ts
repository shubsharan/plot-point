import { getUser } from '$utils/api';
import type { UserData } from '$utils/types';
import { getAuthToken } from '$utils/utils';

window.Webflow ||= [];
window.Webflow.push(() => {
  populateUserData();
});

const populateUserData = async () => {
  const authToken = getAuthToken();
  const user = (await getUser(authToken)) as UserData;

  if (user) {
    const name = document.querySelector<HTMLDivElement>('[data-element="name"]');
    const email = document.querySelector<HTMLDivElement>('[data-element="email"]');

    if (name) {
      name.textContent = user.name;
    }

    if (email) {
      email.textContent = user.email;
    }
  }
};
