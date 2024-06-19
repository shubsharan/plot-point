import type { UserData } from './types';

const baseUrl = 'https://xcpv-kw4b-l7gt.n7c.xano.io/api:fnb4BOaw';
const authUrl = 'https://xcpv-kw4b-l7gt.n7c.xano.io/api:y0nt9N9U';

/**
 * Signs up a user
 * @param input - The user's name, email, and password
 * @returns authToken
 */
export const signUp = async (name: string, phone: string, password: string) => {
  try {
    const response = await fetch(`${authUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return e;
    }
  }
};

/**
 * Gets the current user
 * @param authToken
 * @returns user data
 */
export const getUser = async (authToken: string) => {
  try {
    const response = await fetch(`${authUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    return data as UserData;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return e;
    }
  }
};

/**
 * Logs in a user
 * @param email
 * @param password
 * @returns authToken
 */
export const login = async (phone: string, password: string) => {
  try {
    const response = await fetch(`${authUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return e;
    }
  }
};

/**
 * Get all stories
 * @returns all stories
 */
export const getAllStories = async () => {
  try {
    const response = await fetch(`${baseUrl}/story`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return e;
    }
  }
};

/**
 * Get all locations
 * @returns all locations
 */
export const getAllLocations = async () => {
  try {
    const response = await fetch(`${baseUrl}/location`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return e;
    }
  }
};

/**
 * Get all genres
 * @returns all locations
 */
export const getAllGenres = async () => {
  try {
    const response = await fetch(`${baseUrl}/genre`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return e;
    }
  }
};
