import { Screens } from 'core/Router';

export const ROUTE_PATHS: Record<string, string> = {
  HOME: '/',
  LOGOUT: '/',
  PROFILE: '/profile',
  PROFILE_EDIT: '/settings',
  PROFILE_PASSWORD_CHANGE: '/profile/password-change',
  SIGNIN: '/sign-in',
  SIGNUP: '/sign-up',
  ERROR404: '/404',
  ERROR500: '/500',
  CHAT: '/messenger',
};

export const ROUTES: RouteEntry[] = [
  {
    path: ROUTE_PATHS.HOME,
    component: Screens.Chat,
    shouldAuthorized: true,
  },
  {
    path: ROUTE_PATHS.SIGNUP,
    component: Screens.SignUp,
    shouldAuthorized: false,
  },
  {
    path: ROUTE_PATHS.SIGNIN,
    component: Screens.SignIn,
    shouldAuthorized: false,
  },
  {
    path: ROUTE_PATHS.CHAT,
    component: Screens.Chat,
    shouldAuthorized: true,
  },
  {
    path: ROUTE_PATHS.CHAT + '/:id',
    component: Screens.Chat,
    shouldAuthorized: true,
  },
  {
    path: ROUTE_PATHS.PROFILE,
    component: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: ROUTE_PATHS.PROFILE_PASSWORD_CHANGE,
    component: Screens.PasswordChange,
    shouldAuthorized: true,
  },
  {
    path: ROUTE_PATHS.PROFILE_EDIT,
    component: Screens.ProfileEdit,
    shouldAuthorized: true,
  },
  {
    path: ROUTE_PATHS.ERROR404,
    component: Screens.ErrorPage404,
    shouldAuthorized: true,
  },
  {
    path: ROUTE_PATHS.ERROR500,
    component: Screens.ErrorPage500,
    shouldAuthorized: true,
  },
  {
    path: '*',
    component: Screens.ErrorPage404,
    shouldAuthorized: false,
  },
];
