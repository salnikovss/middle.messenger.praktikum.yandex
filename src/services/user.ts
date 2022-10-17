import { userAPI } from 'api/user';
import { routeConsts } from 'config/routes';
import type { Dispatch } from 'core';
import { apiHasError, transformUser } from 'utils';

import { fetchUser } from './auth';

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

type UpdateProfileAvatarPayload = {
  file: File;
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

export const updateProfileAvatar = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: UpdateProfileAvatarPayload
) => {
  const formData = new FormData();
  formData.append('avatar', action.file);

  dispatch({ isLoading: true });

  const { response } = await userAPI.updateProfileAvatar(formData);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, avatarFormError: response.reason });
    return;
  }

  dispatch(fetchUser);

  window.router.go(routeConsts.PROFILE);
};
