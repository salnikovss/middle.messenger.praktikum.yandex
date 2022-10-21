import Http from 'utils/Http';

import { API_ENDPOINTS } from '../config/app';
import { APIError, ChatDTO, UserDTO } from './types';

type CreateRequestData = { title: string };
type DeleteRequestData = { chatId: number };
type AddUsersRequestData = { users: number[]; chatId: number };
type DeleteUsersRequestData = { users: number[]; chatId: number };
type GetUsersRequestData = { chatId: number };
type GetTokenRequestData = { id: number };

type ListResponseData = ChatDTO[] | APIError;
type CreateResponseData = { id: number } | APIError;
type DeleteResponseData = { userId: number; result: { id: number; title: string; avatar: string } } | APIError;
type AddUsersResponseData = never | APIError;
type DeleteUsersResponseData = never | APIError;
type GetUsersResponseData = UserDTO[] | APIError;
type GetTokenResponseData = { token: string } | APIError;

export const chatAPI = {
  list: () => Http.get<ListResponseData>(API_ENDPOINTS.CHAT.LIST),

  create: (data: CreateRequestData) => Http.post<CreateResponseData>(API_ENDPOINTS.CHAT.CREATE, { data }),

  delete: (data: DeleteRequestData) => Http.delete<DeleteResponseData>(API_ENDPOINTS.CHAT.DELETE, { data }),

  addUsers: (data: AddUsersRequestData) => Http['post']<AddUsersResponseData>(API_ENDPOINTS.CHAT.ADD_USERS, { data }),

  deleteUsers: (data: DeleteUsersRequestData) =>
    Http.delete<DeleteUsersResponseData>(API_ENDPOINTS.CHAT.DELETE_USERS, { data }),

  getUsers: (data: GetUsersRequestData) => Http.get<GetUsersResponseData>(API_ENDPOINTS.CHAT.GET_USERS(data.chatId)),

  getToken: (data: GetTokenRequestData) => Http.post<GetTokenResponseData>(API_ENDPOINTS.CHAT.GET_TOKEN(data.id)),
};
