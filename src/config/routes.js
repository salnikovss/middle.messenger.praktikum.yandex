import Chat from '../pages/Chat';
import ErrorPage from '../pages/ErrorPage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export const routeConsts = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  ERROR404: '/404',
  ERROR500: '/500',
  CHAT: '/chat',
};

export const routes = {
  [routeConsts.HOME]: SignIn,
  [routeConsts.CHAT]: Chat,
  [routeConsts.SIGNIN]: SignIn,
  [routeConsts.SIGNUP]: SignUp,
  [routeConsts.ERROR404]: ErrorPage.bind(ErrorPage, 404),
  [routeConsts.ERROR500]: ErrorPage.bind(ErrorPage, 500),
};
