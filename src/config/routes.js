import { pageError } from '../pages/error';
import { pageSignIn } from '../pages/signin';
import { pageSignUp } from '../pages/signup';

export const routeConsts = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  ERROR404: '/404',
  ERROR500: '/500',
};

export const routes = {
  [routeConsts.HOME]: pageSignIn,
  [routeConsts.SIGNIN]: pageSignIn,
  [routeConsts.SIGNUP]: pageSignUp,
  [routeConsts.ERROR404]: pageError.bind(pageError, 404),
  [routeConsts.ERROR500]: pageError.bind(pageError, 500),
};
