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

export async function createChat(
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: CreateChatPayload,
  successCallback?: () => void
) {
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

  // TODO: websocket
  // dispatch(connectOneChat.bind(this), {
  //   chatId: createdChatId,
  //   chats: chatsResponse,
  // });
  dispatch({ chats: chatsResponse, isChatsLoading: false });

  if (typeof successCallback === 'function') {
    successCallback();
  }
}

export async function deleteChat(dispatch: Dispatch<AppState>, _state: AppState, action: DeleteChatPayload) {
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

  dispatch({ chats: chatsResponse, isChatsLoading: false });
}
