import Http from 'utils/Http';

import { APIError, UserDTO } from './types';

type SigninRequestData = {
  login: string;
  password: string;
};

type SignupRequestData = {
  login: string;
  password: string;
};

type SigninResponseData = Record<string, never> | APIError;
type SignupResponseData = Record<string, never> | APIError;

export const authAPI = {
  signin: (data: SigninRequestData) => Http.post<SigninResponseData>('auth/signin', { data }),

  signup: (data: SignupRequestData) => Http.post<SignupResponseData>('auth/signup', { data }),

  me: () => Http.get<UserDTO | APIError>('auth/user'),

  logout: () => Http.post('auth/logout'),
};
