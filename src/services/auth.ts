import { authAPI } from 'api/auth';
import type { Dispatch } from 'core';
import { apiHasError, transformUser } from 'utils';

import { routeConsts } from '../config/routes';

type LoginPayload = {
  login: string;
  password: string;
};

export const login = async (dispatch: Dispatch<AppState>, state: AppState, action: LoginPayload) => {
  dispatch({ isLoading: true });

  const response = await authAPI.signin(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const { response: responseUser } = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserModel) });

  window.router.go(routeConsts.PROFILE);
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go(routeConsts.SIGNIN);
};
