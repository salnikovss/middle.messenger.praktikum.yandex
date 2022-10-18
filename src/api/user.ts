import Http from 'utils/Http';

import { APIError, UserDTO } from './types';

export type SigninRequestData = {
  login: string;
  password: string;
};

type UpdatePasswordRequestData = {
  oldPassword: string;
  newPassword: string;
};

type UpdateProfileRequestData = {
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  phone: string;
};

type SearchRequestData = {
  login: string;
};

type UpdateProfileAvatarRequestData = FormData;

type UpdatePasswordResponseData = never | APIError;
type UpdateProfileResponseData = UserDTO | APIError;
type UpdateProfileAvatarResponseData = UserDTO | APIError;
type SearchResponseData = UserDTO[] | APIError;

export const userAPI = {
  updatePassword: (data: UpdatePasswordRequestData) => {
    return Http.put<UpdatePasswordResponseData>('user/password', { data });
  },

  updateProfile: (data: UpdateProfileRequestData) => {
    return Http.put<UpdateProfileResponseData>('user/profile', { data });
  },

  updateProfileAvatar: (data: UpdateProfileAvatarRequestData) => {
    return Http.put<UpdateProfileAvatarResponseData>('user/profile/avatar', { data, headers: {} });
  },

  search: (data: SearchRequestData) => {
    return Http.post<SearchResponseData>('user/search', { data });
  },
};
