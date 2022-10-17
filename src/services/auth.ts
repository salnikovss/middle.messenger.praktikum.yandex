import { authAPI } from 'api/auth';
import type { Dispatch } from 'core';
import { apiHasError, transformUser } from 'utils';

import { routeConsts } from '../config/routes';

type LoginPayload = {
  login: string;
  password: string;
};

type RegisterPayload = {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
};

export const login = async (dispatch: Dispatch<AppState>, _state: AppState, action: LoginPayload) => {
  dispatch({ isLoading: true });

  const { response } = await authAPI.signin(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }

  dispatch(fetchUser);

  window.router.go(routeConsts.PROFILE);
};

export const register = async (dispatch: Dispatch<AppState>, _state: AppState, action: RegisterPayload) => {
  dispatch({ isLoading: true });

  const { response } = await authAPI.signup(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }

  dispatch(fetchUser);

  window.router.go(routeConsts.PROFILE);
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go(routeConsts.SIGNIN);
};

export const fetchUser = async (dispatch: Dispatch<AppState>) => {
  const { response: responseUser } = await authAPI.me();

  dispatch({ isLoading: false, formError: null });

  if (apiHasError(responseUser)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser) });
};
