import { WEBSOCKETHOST } from 'config/app';
import { Dispatch } from 'core';
import { MessageType } from 'pages/Chat/components/Message';
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

export const initAllChats = async (dispatch: Dispatch<AppState>, state: AppState) => {
  const { chats, user } = state;
  if (!chats || !user) {
    return;
  }

  const chatsWithTokens = await Promise.all(
    chats.map((chat) => {
      return chatAPI.getToken({ id: chat.id }).then(({ response }) => {
        if (apiHasError(response)) {
          log(`Get chat ws token error. Chat id: ${chat.id}`, response);
          return chat;
        }

        chat.token = response.token;
        return chat;
      });
    })
  );

  const chatsWithSockets = await Promise.all(
    chatsWithTokens.map((chat) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return initChatSocket(dispatch, state, { token: chat.token!, chatId: chat.id }).then((socket) => {
        chat.socket = socket;
        return chat;
      });
    })
  );

  dispatch({ chats: chatsWithSockets });
};

export const initChatSocket = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  payload: InitChatSocketPayload
): Promise<WebSocket> => {
  const socket = await openWebSocketConnection(
    `${WEBSOCKETHOST}/ws/chats/${state.user?.id}/${payload.chatId}/${payload.token}`
  );

  socket.send(JSON.stringify({ content: '0', type: 'get old' }));

  socket.addEventListener('message', ({ data }) => {
    if (!data) {
      return;
    }

    const messageOrMessages = JSON.parse(data) as MessageModel | MessageModel[];
    const messages = Array.isArray(messageOrMessages) ? messageOrMessages : [messageOrMessages];
    let dispatchChats = false;

    for (const message of messages) {
      if (message.type === MessageType.PONG) {
        continue;
      }
      dispatchChats = true;
      const chat = state.chats?.find((chat) => chat.id === payload.chatId);

      if (!chat) {
        return;
      }

      message.from_me = state.user?.id === message.user_id;
      chat.messages.push(message);
    }

    if (dispatchChats) {
      dispatch({ chats: state.chats });
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
