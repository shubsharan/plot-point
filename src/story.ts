import { getUser } from '$utils/api';
import type { UserData } from '$utils/types';
import { getAuthToken } from '$utils/utils';

// Set state
const state = {
  user: null as UserData | null,
};

const setUser = (newUser: UserData) => {
  state.user = newUser;
};

// Initialize Webflow
window.Webflow ||= [];
window.Webflow.push(async () => {
  const authToken = getAuthToken();
  const user = await getUser(authToken);
  // check if user is not null and not an error
  if (user && !('message' in user)) {
    setUser(user);
    populateDropdown();
  }
});

const populateDropdown = () => {
  const { user } = state;
  if (!user) return;

  const { progress } = user.stories[0];

  const activeTab = document.querySelector<HTMLTextAreaElement>('[data-element="active-tab"]');
  const chapterOneLabel = document.querySelector<HTMLTextAreaElement>(
    '[data-element="dropdown-chapter-1"]'
  );
  const chapterTwoLabel = document.querySelector<HTMLTextAreaElement>(
    '[data-element="dropdown-chapter-2"]'
  );
  const chapterThreeLabel = document.querySelector<HTMLTextAreaElement>(
    '[data-element="dropdown-chapter-3"]'
  );
  const chapterFourLabel = document.querySelector<HTMLTextAreaElement>(
    '[data-element="dropdown-chapter-4"]'
  );
  const chapterOneIcon = document.querySelector<HTMLImageElement>(
    '[data-element="dropdown-chapter-1-icon"]'
  );
  const chapterTwoIcon = document.querySelector<HTMLImageElement>(
    '[data-element="dropdown-chapter-2-icon"]'
  );
  const chapterThreeIcon = document.querySelector<HTMLImageElement>(
    '[data-element="dropdown-chapter-3-icon"]'
  );
  const chapterFourIcon = document.querySelector<HTMLImageElement>(
    '[data-element="dropdown-chapter-4-icon"]'
  );

  if (
    !activeTab ||
    !chapterOneLabel ||
    !chapterTwoLabel ||
    !chapterThreeLabel ||
    !chapterFourLabel ||
    !chapterOneIcon ||
    !chapterTwoIcon ||
    !chapterThreeIcon ||
    !chapterFourIcon
  )
    return;

  console.log(progress);

  // Change active tab based on progress
  switch (progress) {
    case 1:
      activeTab.textContent = 'Chapter One';
      break;
    case 2:
      activeTab.textContent = 'Chapter Two';
      chapterTwoLabel.classList.remove('is-disabled');
      chapterTwoIcon.style.display = 'none';
    case 3:
      activeTab.textContent = 'Chapter Three';
      break;
    case 4:
      activeTab.textContent = 'Chapter Four';
    default:
      activeTab.textContent = 'Chapter One';
  }

  // Create dropdown items

  // Get the template
  const dropdownItemTemplate = document.querySelector<HTMLDivElement>(
    '[data-element="dropdown-item"]'
  );
  if (!dropdownItemTemplate) return;
  // Get the list
  const dropdownItemsList = dropdownItemTemplate.parentElement;
  if (!dropdownItemsList) return;
  // Remove the template
  dropdownItemTemplate.remove();
  // Create dropdown items
};
