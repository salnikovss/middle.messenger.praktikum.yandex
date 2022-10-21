export const DEBUG = true;
export const AVATAR_PREFIX = 'https://ya-praktikum.tech/api/v2/resources/';
export const WEBSOCKET_HOST = 'wss://ya-praktikum.tech/';

export const API_HOST = 'https://ya-praktikum.tech/api/v2/';
export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: 'auth/signin',
    SIGNUP: 'auth/signup',
    ME: 'auth/user',
    LOGOUT: 'auth/logout',
  },
  CHAT: {
    LIST: 'chats',
    CREATE: 'chats',
    DELETE: 'chats',
    ADD_USERS: 'chats/users',
    DELETE_USERS: 'chats/users',
    GET_USERS: (chatId: number) => `chats/${chatId}/users`,
    GET_TOKEN: (id: number) => `chats/token/${id}`,
  },
  USER: {
    UPDATE_PASSWORD: 'user/password',
    UPDATE_PROFILE: 'user/profile',
    UPDATE_PROFILE_AVATAR: 'user/profile/avatar',
    SEARCH: 'user/search',
  },
};
