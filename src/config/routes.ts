import Chat from 'pages/Chat';
import ErrorPage from 'pages/ErrorPage';
import Profile from 'pages/Profile';
import PasswordChange from 'pages/Profile/modules/PasswordChange';
import ProfileEdit from 'pages/Profile/modules/ProfileEdit';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';

export const routeConsts = {
  HOME: '/',
  LOGOUT: '/',
  PROFILE: '/profile',
  PROFILE_EDIT: '/settings',
  PROFILE_PASSWORD_CHANGE: '/profile/password-change',
  SIGNIN: '/signin',
  SIGNUP: '/sign-up',
  ERROR404: '/404',
  ERROR500: '/500',
  CHAT: '/messenger',
};

export const routes = {
  [routeConsts.HOME]: () => new Chat(),
  [routeConsts.CHAT]: () => new Chat(),
  [routeConsts.PROFILE]: () => new Profile(),
  [routeConsts.PROFILE_EDIT]: () => new ProfileEdit(),
  [routeConsts.PROFILE_PASSWORD_CHANGE]: () => new PasswordChange(),
  [routeConsts.SIGNIN]: () => new SignIn(),
  [routeConsts.SIGNUP]: () => new SignUp(),
  [routeConsts.ERROR404]: () => new ErrorPage({ code: 404 }),
  [routeConsts.ERROR500]: () => new ErrorPage({ code: 500 }),
};
