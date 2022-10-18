import Http from 'utils/Http';

import { APIError, ChatDTO } from './types';

type CreateRequestData = {
  title: string;
};

type DeleteRequestData = {
  chatId: number;
};

type ListResponseData = ChatDTO[] | APIError;

type CreateResponseData = { id: number } | APIError;

type DeleteResponseData =
  | {
      userId: number;
      result: {
        id: number;
        title: string;
        avatar: string;
      };
    }
  | APIError;

export const chatAPI = {
  list: () => Http.get<ListResponseData>('chats'),

  create: (data: CreateRequestData) => Http.post<CreateResponseData>('chats', { data }),

  delete: (data: DeleteRequestData) => Http.delete<DeleteResponseData>('chats', { data }),
};
