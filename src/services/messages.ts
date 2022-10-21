import { WEBSOCKET_HOST } from 'config/app';
import { Dispatch } from 'core';
import { MessageType } from 'pages/Chat/components/Message';
import { transformUser } from 'utils/apiTransformers';
import log from 'utils/log';
import openWebSocketConnection from 'utils/webSocketHelpers';

import { chatAPI } from '../api/chat';
import apiHasError from '../utils/apiHasError';

type InitChatSocketPayload = {
  chatId: number;
  token: string;
};

type SendMessagePayload = {
  chatId: number;
  message: string;
  messageType?: MessageType;
};

type InitChatPayload = {
  chatId: number;
  chats: ChatModel[];
  dispatchParams?: Record<string, undefined>;
};

type MarkAsReadPayload = {
  chatId: number;
};

export const initChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  { chatId, dispatchParams, chats }: InitChatPayload
) => {
  const { user } = state;
  const chat = chats?.find((chat) => chat.id === chatId);

  if (!user || !chat) {
    return;
  }

  const { response: tokenResponse } = await chatAPI.getToken({ id: chatId });
  if (apiHasError(tokenResponse)) {
    log(`Get chat ws token error. Chat id: ${chatId}`, tokenResponse);
    return;
  }
  chat.token = tokenResponse.token;

  const socket = await initChatSocket(dispatch, state, { token: chat.token, chatId });
  chat.socket = socket;

  dispatch({ chats, ...dispatchParams });
};

export const initAllChats = async (dispatch: Dispatch<AppState>, state: AppState) => {
  const { chats, user } = state;
  if (!chats || !user) {
    return;
  }

  const updatedChats = await Promise.all(
    chats.map(async (chat) => {
      if (!chat.token) {
        const { response } = await chatAPI.getToken({ id: chat.id });
        if (apiHasError(response)) {
          log(`Get chat ws token error. Chat id: ${chat.id}`, response);
        } else {
          chat.token = response.token;
        }
      }

      if (!chat.chatUsers) {
        const { response: getUsersResponse } = await chatAPI.getUsers({ chatId: chat.id });
        if (apiHasError(getUsersResponse)) {
          log('Get chat users error', getUsersResponse.reason);
        } else {
          chat.chatUsers = getUsersResponse.map((user) => transformUser(user));
        }
      }

      if (!chat.socket) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const socket = await initChatSocket(dispatch, state, { token: chat.token!, chatId: chat.id });
        chat.socket = socket;
      }

      return chat;
    })
  );

  dispatch({ chats: updatedChats });
};

export const initChatSocket = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  { chatId, token }: InitChatSocketPayload
): Promise<WebSocket> => {
  const socket = await openWebSocketConnection(`${WEBSOCKET_HOST}/ws/chats/${state.user?.id}/${chatId}/${token}`);

  socket.send(JSON.stringify({ content: '0', type: 'get old' }));

  socket.addEventListener('message', ({ data }) => {
    if (!data) {
      return;
    }

    const messageOrMessages = JSON.parse(data) as MessageModel | MessageModel[];
    const messages = Array.isArray(messageOrMessages) ? messageOrMessages : [messageOrMessages];
    let dispatchChats = false;

    messages.sort((a, b) => +new Date(a.time) - +new Date(b.time));

    if (!state.chats) {
      return;
    }

    const chats = state.chats;
    const currentChatId = state.idParam;

    for (const message of messages) {
      if (![MessageType.TEXT, MessageType.FILE].includes(message.type)) {
        continue;
      }
      const chat = chats.find((chat) => chat.id === chatId);

      if (!chat) {
        continue;
      }
      dispatchChats = true;

      message.user = chat.chatUsers?.find((user) => user.id === message.user_id);
      message.from_me = state.user?.id === message.user_id;
      chat.messages.push(message);
      chat.last_message = {
        ...chat.last_message,
        time: message.time,
        content: message.content,
        from_me: message.from_me,
      };
      if (!message.from_me && currentChatId !== chat.id && !message.is_read) {
        chat.unread_count++;
      }
    }

    if (dispatchChats) {
      dispatch({ chats });
    }
  });
  return socket;
};

export const sendMessage = (
  _dispatch: Dispatch<AppState>,
  state: AppState,
  { chatId, message, messageType }: SendMessagePayload
) => {
  const chat = state.chats?.find((chat) => chat.id === chatId);
  if (chat) {
    chat.socket?.send(JSON.stringify({ content: message, type: messageType || MessageType.TEXT }));
  }
};

export const markAsRead = (_dispatch: Dispatch<AppState>, state: AppState, { chatId }: MarkAsReadPayload) => {
  const chat = state.chats?.find((chat) => chat.id === chatId);
  if (chat) {
    chat.unread_count = 0;
  }
};
