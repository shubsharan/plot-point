import { cloneNode } from '@finsweet/ts-utils';

import { getAllGenres, getAllLocations, getAllStories, getUser } from '$utils/api';
import type { GenreData, LocationData, StoryData, UserData } from '$utils/types';
import { getAuthToken } from '$utils/utils';

// Create state object
const state = {
  user: null as UserData | null,
  stories: null as Array<StoryData> | null,
  locations: null as Array<LocationData> | null,
  genres: null as Array<GenreData> | null,
  filters: {
    genres: null as Array<string> | null,
    locations: null as Array<string> | null,
  },
};

// Create set functions
const setUser = (newUser: UserData | null) => {
  state.user = newUser;
};
const setStories = (newStories: Array<StoryData> | null) => {
  state.stories = newStories;
};
const setLocations = (newLocations: Array<LocationData> | null) => {
  state.locations = newLocations;
};
const setGenres = (newGenres: Array<GenreData> | null) => {
  state.genres = newGenres;
};
const setFilters = (newFilters: {
  genres: Array<GenreData> | null;
  locations: Array<LocationData> | null;
}) => {
  state.filters = newFilters;
};

// Initialize Webflow
window.Webflow ||= [];
window.Webflow.push(async () => {
  setLocations(await getAllLocations());
  setGenres(await getAllGenres());

  // populateLocationFilterItems();
  // populateGenreFilterItems();

  populateStoryCards();
});

const populateStoryCards = async () => {
  const stories = await getAllStories();

  if (stories) {
    // Get the template
    const itemTemplate = document.querySelector<HTMLDivElement>('[data-element="story-item"]');
    if (!itemTemplate) return;

    // Get the list
    const itemsList = itemTemplate.parentElement;
    if (!itemsList) return;

    // Remove the template from the DOM
    itemTemplate.remove();

    // Loop through the stories object and populate the template
    for (const story of stories) {
      const storyCard = createStoryCard(story, itemTemplate);
      if (!storyCard) return;
      itemsList.appendChild(storyCard);
    }
  }
};

const createStoryCard = (story: StoryData, itemTemplate: HTMLDivElement, user?: UserData) => {
  const item = cloneNode(itemTemplate);

  // Populate story data
  const name = item.querySelector<HTMLTextAreaElement>('[data-element="name"]');
  const description = item.querySelector<HTMLTextAreaElement>('[data-element="description"]');
  const genreTagTemplate = item.querySelector<HTMLDivElement>('[data-element="genre-tag"]');
  const chapter = item.querySelector<HTMLDivElement>('[data-element="chapter"]');
  const progressPercentage = item.querySelector<HTMLDivElement>(
    '[data-element="progress-percentage"]'
  );
  const progressBar = item.querySelector<HTMLDivElement>('[data-element="progress-bar"]');

  if (name) {
    name.textContent = story.name;
  }

  if (description) {
    description.textContent = story.description;
  }

  if (genreTagTemplate) {
    const genreTagList = genreTagTemplate.parentElement;
    if (!genreTagList) return;

    genreTagTemplate.remove();

    for (const genre of story.genres) {
      const genreTagItem = cloneNode(genreTagTemplate) as HTMLDivElement;
      const genreTagLabel = genreTagItem.querySelector<HTMLTextAreaElement>(
        '[data-element="genre-tag-label"]'
      );
      if (genreTagLabel) {
        genreTagLabel.textContent = genre.name.toString();
      }

      genreTagList.appendChild(genreTagItem);
    }
  }

  // if (chapter && progressPercentage && progressBar) {
  //   // find the user's progress for this story
  //   const userStory = user.stories.find((s) => s.story_id === story.id);
  //   if (userStory) {
  //     // split userStory.progress by '/' and divide the two numbers to get the percentage
  //     const progress = userStory.progress.split('/');
  //     const percentage = (parseInt(progress[0]) / parseInt(progress[1])) * 100;

  //     chapter.textContent = `Chapter ${progress[0]}`;
  //     progressPercentage.textContent = `${percentage}%`;
  //     progressBar.style.width = `${percentage}%`;
  //   }
  // }

  // // Check if user is subscribed to story

  // const progressTracker = item.querySelector<HTMLDivElement>('[data-element="progress-tracker"]');
  // const continueButton = item.querySelector<HTMLButtonElement>('[data-element="continue-button"]');
  // const startButton = item.querySelector<HTMLButtonElement>('[data-element="start-button"]');

  // if (progressTracker && continueButton && startButton && startButton.parentElement) {
  //   for (const userStory of user.stories) {
  //     if (userStory.story_id === story.id) {
  //       progressTracker.removeAttribute('data-cloak');
  //       startButton.parentElement.remove();
  //     }
  //   }

  //   // Add event listener
  //   continueButton.addEventListener('click', () => {
  //     const url = new URL(window.location.href);
  //     const redirect_url = url;
  //     const userStory = user.stories.find((s) => s.story_id === story.id);
  //     const progress = Number(userStory?.progress.split('/')[0]);
  //     console.log(progress);

  //     redirect_url.pathname = `/story`;
  //     redirect_url.searchParams.set('id', String(story.id));
  //     redirect_url.searchParams.set('name', story.name);
  //     redirect_url.searchParams.set('progress', String(progress ? progress : 0));

  //     console.log(redirect_url.toString());
  //     // go to redirect_url
  //     window.location.href = redirect_url.toString();
  //   });
  // }

  item.removeAttribute('data-cloak');
  return item;
};

// const populateLocationFilterItems = () => {
//   // Get the template
//   const locationFilterItemTemplate = document.querySelector<HTMLDivElement>(
//     '[data-element="location-filter-item"]'
//   );
//   if (!locationFilterItemTemplate) return;

//   // Get the list
//   const locationFilterList = locationFilterItemTemplate.parentElement;
//   if (!locationFilterList) return;

//   // Remove the template from the DOM
//   locationFilterItemTemplate.remove();

//   // Loop through the location filters object and populate the template
//   if (!state.locations) return;

//   for (const location of state.locations) {
//     const filterItem = createLocationFilterItems(location, locationFilterItemTemplate);
//     if (!filterItem) return;
//     locationFilterList.appendChild(filterItem);
//   }
// };

// const createLocationFilterItems = (location: LocationData, itemTemplate: HTMLDivElement) => {
//   const item = cloneNode(itemTemplate);
//   const label = item.querySelector<HTMLTextAreaElement>('[data-element="location-filter-label"]');
//   if (!label) return;

//   label.textContent = location.name;
//   item.removeAttribute('data-cloak');

//   return item;
// };

// const populateGenreFilterItems = () => {
//   // Get the template
//   const genreFilterItemTemplate = document.querySelector<HTMLDivElement>(
//     '[data-element="genre-filter-item"]'
//   );
//   if (!genreFilterItemTemplate) return;

//   // Get the list
//   const genreFilterLst = genreFilterItemTemplate.parentElement;
//   if (!genreFilterLst) return;

//   // Remove the template from the DOM
//   genreFilterItemTemplate.remove();

//   // Loop through the genre filters object and populate the template
//   if (!state.genres) return;

//   for (const genre of state.genres) {
//     const filterItem = createGenreFilterItem(genre, genreFilterItemTemplate);
//     if (!filterItem) return;
//     genreFilterLst.appendChild(filterItem);
//   }
// };

// const createGenreFilterItem = (genre: GenreData, itemTemplate: HTMLDivElement) => {
//   const item = cloneNode(itemTemplate);
//   const label = item.querySelector<HTMLTextAreaElement>('[data-element="genre-filter-label"]');
//   if (!label) return;

//   label.textContent = genre.name;
//   item.removeAttribute('data-cloak');
//   return item;
// };
