import { userAPI } from 'api/user';
import { routeConsts } from 'config/routes';
import type { Dispatch } from 'core';
import { apiHasError, transformUser } from 'utils';

type UpdateProfilePayload = {
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  phone: string;
};

type UpdatePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export const updateProfile = async (dispatch: Dispatch<AppState>, _state: AppState, action: UpdateProfilePayload) => {
  dispatch({ isLoading: true });

  const { response } = await userAPI.updateProfile(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }

  dispatch({ user: transformUser(response) });

  window.router.go(routeConsts.PROFILE);
};

export const updatePassword = async (dispatch: Dispatch<AppState>, _state: AppState, action: UpdatePasswordPayload) => {
  dispatch({ isLoading: true });

  const { response } = await userAPI.updatePassword(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }

  window.router.go(routeConsts.PROFILE);
};
