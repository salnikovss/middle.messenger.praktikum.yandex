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

type UpdateProfileAvatarRequestData = FormData;

type UpdatePasswordResponseData = APIError;
type UpdateProfileResponseData = UserDTO | APIError;
type UpdateProfileAvatarResponseData = UserDTO | APIError;

export const userAPI = {
  updatePassword: (data: UpdatePasswordRequestData) => Http.put<UpdatePasswordResponseData>('user/password', { data }),

  updateProfile: (data: UpdateProfileRequestData) => Http.put<UpdateProfileResponseData>('user/profile', { data }),

  updateProfileAvatar: (data: UpdateProfileAvatarRequestData) =>
    Http.put<UpdateProfileAvatarResponseData>('user/profile', { data }),
};
