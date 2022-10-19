import type { Dispatch } from 'core';
import apiHasError from 'utils/apiHasError';
import { transformChat } from 'utils/apiTransformers';
import log from 'utils/log';

import { chatAPI } from '../api/chat';
import { routeConsts } from '../config/routes';

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
  _state: AppState,
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
    window.router.go(`${routeConsts.CHAT}/${createdChatId}`);
  }

  // TODO: connect to websocket

  const chats = chatsResponse.map((chat) => transformChat(chat));
  dispatch({ chats, isLoading: false, isChatsLoading: false, formSuccess: 'Чат создан' });

  if (typeof successCallback === 'function') {
    successCallback();
  }
};

export const deleteChat = async (dispatch: Dispatch<AppState>, _state: AppState, action: DeleteChatPayload) => {
  dispatch({ isLoading: true, isChatsLoading: true, formError: null });

  const { response } = await chatAPI.delete(action);

  if (apiHasError(response)) {
    log('Delete chat error', response);
    dispatch({ isLoading: false, isChatsLoading: false, formError: response.reason });
    return;
  }

  const { response: chatsResponse } = await chatAPI.list();
  if (apiHasError(chatsResponse)) {
    log('Fetch chat list error', response);
    dispatch({ isLoading: false, isChatsLoading: false, formError: chatsResponse.reason });
    return;
  }

  window.router.go(routeConsts.CHAT);

  const chats = chatsResponse.map((chat) => transformChat(chat));
  dispatch({ chats, isChatsLoading: false, formSuccess: 'Чат удален' });
};

export const addUsersToChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
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

  dispatch({ isLoading: false, formSuccess: 'Чат создан' });

  if (typeof successCallback === 'function') {
    successCallback();
  }
};

export const deleteUsersFromChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: AddUsersToChatPayload,
  successCallback?: () => void
) => {
  dispatch({ isLoading: true, formError: null });

  const { response } = await chatAPI.deleteUsers(action);

  if (apiHasError(response)) {
    log('Add users to chat error', response);
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }

  dispatch({ isLoading: false, formSuccess: 'Чат создан' });

  if (typeof successCallback === 'function') {
    successCallback();
  }
};
