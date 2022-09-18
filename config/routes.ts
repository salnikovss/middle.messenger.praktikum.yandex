import Chat from '../src/pages/Chat';
import ErrorPage from '../src/pages/ErrorPage';
import Profile from '../src/pages/Profile';
import PasswordChange from '../src/pages/Profile/modules/PasswordChange';
import ProfileEdit from '../src/pages/Profile/modules/ProfileEdit';
import SignIn from '../src/pages/SignIn';
import SignUp from '../src/pages/SignUp';

export const routeConsts = {
  HOME: '/',
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_PASSWORD_CHANGE: '/profile/password-change',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  ERROR404: '/404',
  ERROR500: '/500',
  CHAT: '/chat',
};

export const routes = {
  [routeConsts.HOME]: Chat,
  [routeConsts.CHAT]: Chat,
  [routeConsts.PROFILE]: Profile,
  [routeConsts.PROFILE_EDIT]: ProfileEdit,
  [routeConsts.PROFILE_PASSWORD_CHANGE]: PasswordChange,
  [routeConsts.SIGNIN]: SignIn,
  [routeConsts.SIGNUP]: SignUp,
  [routeConsts.ERROR404]: ErrorPage.bind(ErrorPage, 404),
  [routeConsts.ERROR500]: ErrorPage.bind(ErrorPage, 500),
};
