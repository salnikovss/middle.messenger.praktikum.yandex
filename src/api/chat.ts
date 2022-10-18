import Http from 'utils/Http';

import { APIError, ChatDTO, UserDTO } from './types';

type CreateRequestData = { title: string };
type DeleteRequestData = { chatId: number };
type AddUsersRequestData = { users: number[]; chatId: number };
type GetUsersRequestData = { id: number };

type ListResponseData = ChatDTO[] | APIError;
type CreateResponseData = { id: number } | APIError;
type DeleteResponseData = { userId: number; result: { id: number; title: string; avatar: string } } | APIError;
type AddUsersResponseData = never | APIError;
type GetUsersResponseData = UserDTO[] | APIError;

export const chatAPI = {
  list: () => Http.get<ListResponseData>('chats'),

  create: (data: CreateRequestData) => Http.post<CreateResponseData>('chats', { data }),

  delete: (data: DeleteRequestData) => Http.delete<DeleteResponseData>('chats', { data }),

  addUsers: (data: AddUsersRequestData) => Http.put<AddUsersResponseData>('chats/users', { data }),

  getUsers: (data: GetUsersRequestData) => Http.get<GetUsersResponseData>(`chats/${data.id}/users`, { data }),
};
