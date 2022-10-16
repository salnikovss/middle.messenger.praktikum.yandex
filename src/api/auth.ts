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

export const authAPI = {
  signin: (data: SigninRequestData) => Http.post<SigninResponseData>('auth/signin', { data }),

  signup: (data: SignupRequestData) => Http.post<SignupResponseData>('auth/signup', { data }),

  me: () => Http.get<UserDTO | APIError>('auth/user'),

  logout: () => Http.post('auth/logout'),
};
