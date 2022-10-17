import type { Dispatch } from 'core';
import apiHasError from 'utils/apiHasError';
import { transformChat } from 'utils/apiTransformers';
import log from 'utils/log';

import { chatAPI } from '../api/chat';
import { routeConsts } from '../config/routes';

type CreateChatPayload = {
  title: string;
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

export async function createChat(dispatch: Dispatch<AppState>, _state: AppState, action: CreateChatPayload) {
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
  dispatch({
    chats: chatsResponse,
  });
}