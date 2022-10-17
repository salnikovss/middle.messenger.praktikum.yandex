import Http from 'utils/Http';

import { APIError, ChatDTO } from './types';

type CreateRequestData = {
  title: string;
};

type ListResponseData = ChatDTO[] | APIError;

type CreateResponseData = { id: number } | APIError;

export const chatAPI = {
  list: () => Http.get<ListResponseData>('chats'),

  create: (data: CreateRequestData) => Http.post<CreateResponseData>('chats', { data }),
};
