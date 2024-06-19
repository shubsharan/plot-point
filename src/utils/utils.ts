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

export const toRadians = (degrees: number) => {
  return degrees * Math.PI / 180;
}

export const toDegrees = (radians: number) => {
  return radians * 180 / Math.PI;
}

export const calculateBearing = (startLat: number, startLng: number, destLat: number, destLng: number) => {
  startLat = toRadians(startLat);
  startLng = toRadians(startLng);
  destLat = toRadians(destLat);
  destLng = toRadians(destLng);

  let y = Math.sin(destLng - startLng) * Math.cos(destLat);
  let x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  let brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  return (brng + 360) % 360;
}

export const getCompassBearing = (alpha: number, beta: number, gamma: number) => {
  let compass = -(alpha + beta * gamma / 90);
  compass -= Math.floor(compass / 360) * 360;
}