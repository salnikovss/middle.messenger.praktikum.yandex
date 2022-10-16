import { ComponentConstructable } from 'core/Component';
import Chat from 'pages/Chat';
import Profile from 'pages/Profile';
import PasswordChange from 'pages/Profile/modules/PasswordChange';
import ProfileEdit from 'pages/Profile/modules/ProfileEdit';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';

import { ErrorPage404, ErrorPage500 } from '../pages/ErrorPage/ErrorPage';

export enum Screens {
  Chat = 'Chat',
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  Profile = 'Profile',
  ProfileEdit = 'ProfileEdit',
  PasswordChange = 'PasswordChange',
  ErrorPage404 = 'ErrorPage500',
  ErrorPage500 = 'ErrorPage404',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const map: Record<Screens, ComponentConstructable<any>> = {
  [Screens.Chat]: Chat,
  [Screens.SignIn]: SignIn,
  [Screens.SignUp]: SignUp,
  [Screens.Profile]: Profile,
  [Screens.ProfileEdit]: ProfileEdit,
  [Screens.PasswordChange]: PasswordChange,
  [Screens.ErrorPage404]: ErrorPage404,
  [Screens.ErrorPage500]: ErrorPage500,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getScreenComponent = (screen: Screens): ComponentConstructable<any> => {
  return map[screen];
};
