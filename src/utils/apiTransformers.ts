import { ChatDTO, UserDTO } from 'api/types';
import { AVATAR_PREFIX } from 'config/app';

export const transformUser = (data: UserDTO): UserModel => {
  return {
    id: data.id,
    login: data.login,
    first_name: data.first_name,
    second_name: data.second_name,
    display_name: data.display_name,
    avatar: data.avatar && data.avatar.length > 0 ? AVATAR_PREFIX + data.avatar : '',
    phone: data.phone,
    email: data.email,
    role: data.role,
  };
};

export const transformChat = (data: ChatDTO): ChatModel => {
  return {
    id: data.id,
    title: data.title,
    avatar: data.avatar,
    unread_count: data.unread_count,
    last_message: data.last_message,

    messages: [],
    chatUsers: [],
  };
};
