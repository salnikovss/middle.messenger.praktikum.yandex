import type { Dispatch } from 'core';
import apiHasError from 'utils/apiHasError';
import { transformChat, transformUser } from 'utils/apiTransformers';
import log from 'utils/log';

import { chatAPI } from '../api/chat';
import { ROUTE_PATHS } from '../config/routes';
import { initChat } from './messages';

type CreateChatPayload = {
  title: string;
};

type DeleteChatPayload = {
  chatId: number;
};

type AddUsersToChatPayload = {
  users: number[];
  chatId: number;
};

export const getChats = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true, formError: null });
  const { response } = await chatAPI.list();
  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }

  const chats = response.map((chat) => transformChat(chat));
  dispatch({ isLoading: false, chats });
};

export const createChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: CreateChatPayload,
  successCallback?: () => void
) => {
  dispatch({ isLoading: true, isChatsLoading: true, formError: null });

  const { response } = await chatAPI.create(action);

  if (apiHasError(response)) {
    log('Create chat error', response);
    dispatch({ isLoading: false, isChatsLoading: false, formError: response.reason });
    return;
  }

  const { response: chatsResponse } = await chatAPI.list();
  if (apiHasError(chatsResponse)) {
    log('Fetch chat list error', response);
    dispatch({ isLoading: false, isChatsLoading: false, formError: chatsResponse.reason });
    return;
  }

  const createdChatId = response?.id;
  if (createdChatId) {
    window.router.go(`${ROUTE_PATHS.CHAT}/${createdChatId}`);
  }

  const chats = state.chats;
  const newChat = chatsResponse.find((chat) => chat.id === createdChatId);
  if (newChat) {
    chats?.unshift(transformChat(newChat));
  }

  dispatch(initChat, {
    chatId: createdChatId,
    chats,
    isLoading: false,
    isChatsLoading: false,
    formSuccess: 'Чат создан',
  });

  if (typeof successCallback === 'function') {
    successCallback();
  }
};

export const deleteChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: DeleteChatPayload,
  successCallback?: () => void
) => {
  dispatch({ isLoading: true, isChatsLoading: true, formError: null, formSuccess: null });

  const { response } = await chatAPI.delete(action);

  if (apiHasError(response)) {
    log('Delete chat error', response);
    dispatch({ isLoading: false, isChatsLoading: false, formError: response.reason });
    return;
  }

  window.router.go(ROUTE_PATHS.CHAT);

  const chatToDelete = state.chats?.find((chat) => chat.id === action.chatId);
  if (chatToDelete && chatToDelete.socket instanceof WebSocket) {
    chatToDelete.socket.close(1000, 'Chat has been deleted');
  }

  const chats = state.chats?.filter((chat) => chat.id !== action.chatId);
  dispatch({ chats, isChatsLoading: false, formSuccess: 'Чат удален' });

  if (typeof successCallback === 'function') {
    successCallback();
  }
};

export const addUsersToChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: AddUsersToChatPayload,
  successCallback?: () => void
) => {
  dispatch({ isLoading: true, formError: null });

  const { response } = await chatAPI.addUsers(action);

  if (apiHasError(response)) {
    log('Add users to chat error', response);
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }

  const chats = state.chats;
  const chat = chats?.find((chat) => chat.id === action.chatId);
  if (chat) {
    const { response } = await chatAPI.getUsers({ chatId: chat.id });
    if (apiHasError(response)) {
      log('Get chat users error', response.reason);
    } else {
      chat.chatUsers = response.map((user) => transformUser(user));
    }
  }

  dispatch({ chats, isLoading: false, formSuccess: 'Пользователь добавлен в чат' });

  if (typeof successCallback === 'function') {
    successCallback();
  }
};

export const deleteUsersFromChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: AddUsersToChatPayload,
  successCallback?: () => void
) => {
  if (action.users.length === 0) {
    return;
  }

  dispatch({ isLoading: true, formError: null, formSuccess: null });

  const { response } = await chatAPI.deleteUsers(action);

  if (apiHasError(response)) {
    log('Add users to chat error', response);
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }

  const chats = state.chats;
  const chat = chats?.find((chat) => chat.id === action.chatId);
  if (chat) {
    chat.chatUsers = chat.chatUsers.filter((user) => !action.users.includes(user.id));
  }

  dispatch({ chats, isLoading: false, formSuccess: 'Пользователь удален из чата' });

  if (typeof successCallback === 'function') {
    successCallback();
  }
};
