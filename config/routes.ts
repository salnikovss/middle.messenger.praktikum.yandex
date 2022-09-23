import Chat from '../src/pages/Chat';
import ErrorPage from '../src/pages/ErrorPage';
import Profile from '../src/pages/Profile';
import PasswordChange from '../src/pages/Profile/modules/PasswordChange';
import ProfileEdit from '../src/pages/Profile/modules/ProfileEdit';
import SignIn from '../src/pages/SignIn';
import SignUp from '../src/pages/SignUp';

export const routeConsts = {
  HOME: '/',
  LOGOUT: '/',
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
