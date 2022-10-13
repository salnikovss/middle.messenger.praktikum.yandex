import { UserDTO } from 'api/types';

export const transformUser = (data: UserDTO): UserModel => {
  return {
    id: data.id,
    login: data.login,
    first_name: data.first_name,
    second_name: data.second_name,
    display_name: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};
