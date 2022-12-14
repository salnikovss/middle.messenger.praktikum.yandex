import { API_ENDPOINTS } from 'config/app';
import Http from 'utils/Http';

import { APIError, UserDTO } from './types';

export type SigninRequestData = {
  login: string;
  password: string;
};

export type SignupRequestData = {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
};

type SigninResponseData = Record<string, never> | APIError;
type SignupResponseData = { id: number } | APIError;
type UserResponseData = UserDTO | APIError;

export const authAPI = {
  signin: (data: SigninRequestData) => Http.post<SigninResponseData>(API_ENDPOINTS.AUTH.SIGNIN, { data }),

  signup: (data: SignupRequestData) => Http.post<SignupResponseData>(API_ENDPOINTS.AUTH.SIGNUP, { data }),

  me: () => Http.get<UserResponseData>(API_ENDPOINTS.AUTH.ME),

  logout: () => Http.post(API_ENDPOINTS.AUTH.LOGOUT),
};
