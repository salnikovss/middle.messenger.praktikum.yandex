import { authAPI } from 'api/auth';
import { chatAPI } from 'api/chat';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import apiHasError from 'utils/apiHasError';
import { transformChat, transformUser } from 'utils/apiTransformers';

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const { response } = await authAPI.me();

    if (apiHasError(response)) {
      return;
    }

    const { response: chatsResponse } = await chatAPI.list();
    const chats = !apiHasError(chatsResponse) ? chatsResponse.map((chat) => transformChat(chat)) : null;

    dispatch({
      user: transformUser(response as unknown as UserDTO),
      chats,
    });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInitiated: true });
  }
}
