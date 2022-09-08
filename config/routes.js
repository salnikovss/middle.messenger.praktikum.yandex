import Chat from '../src/pages/Chat';
import ErrorPage from '../src/pages/ErrorPage';
import Profile from '../src/pages/Profile';
import SignIn from '../src/pages/SignIn';
import SignUp from '../src/pages/SignUp';

export const routeConsts = {
  HOME: '/',
  PROFILE: '/profile',
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
  [routeConsts.SIGNIN]: SignIn,
  [routeConsts.SIGNUP]: SignUp,
  [routeConsts.ERROR404]: ErrorPage.bind(ErrorPage, 404),
  [routeConsts.ERROR500]: ErrorPage.bind(ErrorPage, 500),
};
