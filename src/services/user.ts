import { userAPI } from 'api/user';
import { routeConsts } from 'config/routes';
import type { Dispatch } from 'core';
import apiHasError from 'utils/apiHasError';
import { transformUser } from 'utils/apiTransformers';
import log from 'utils/log';

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

type SearchUserByLoginPayload = {
  login: string;
};

export const updateProfile = async (dispatch: Dispatch<AppState>, _state: AppState, action: UpdateProfilePayload) => {
  dispatch({ isLoading: true, formSuccess: null, formError: null });

  const { response } = await userAPI.updateProfile(action);

  if (apiHasError(response)) {
    log('Update profile', response);
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }

  dispatch({ user: transformUser(response), formSuccess: 'Профиль успешно обновлен' });

  window.router.go(routeConsts.PROFILE);
};

export const updatePassword = async (dispatch: Dispatch<AppState>, _state: AppState, action: UpdatePasswordPayload) => {
  dispatch({ isLoading: true, formSuccess: null, formError: null });

  const { response } = await userAPI.updatePassword(action);

  if (apiHasError(response)) {
    log('Update password error', response);
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

  dispatch({ isLoading: true, formSuccess: null, formError: null });

  const { response } = await userAPI.updateProfileAvatar(formData);

  if (apiHasError(response)) {
    log('Update profile avatar error', response);
    dispatch({ isLoading: false, avatarFormError: response.reason });
    return;
  }

  dispatch(fetchUser, { redirectTo: null });
};

export const searchUsersByLogin = async (action: SearchUserByLoginPayload): Promise<UserModel[]> => {
  return new Promise((resolve, reject) => {
    return userAPI.search(action).then(({ response }) => {
      if (apiHasError(response)) {
        log('Search user error', response);
        reject(response.reason);
      } else {
        const foundUsers = response.map((user) => transformUser(user));
        resolve(foundUsers);
      }
    });

    // const { response } = await userAPI.search(action);
    // if (apiHasError(response)) {
    //   log('Search user error', response);
    //   reject(response.reason);
    // } else {
    //   const foundUsers = response.map((user) => transformUser(user));
    //   resolve(foundUsers);
    // }
  });
};
