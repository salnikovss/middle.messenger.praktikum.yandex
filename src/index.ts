import './index.scss';

import BackButtonWrapper from 'components/BackButtonWrapper';
import CenteredBox from 'components/CenteredBox';
import { default as ErrorComponent } from 'components/Error';
import Input from 'components/Input';
import Textarea from 'components/Textarea';
import { routeConsts } from 'config/routes';
import Router from 'core/Router';
import Chat from 'pages/Chat';
import ErrorPage from 'pages/ErrorPage';
import Profile from 'pages/Profile';
import PasswordChange from 'pages/Profile/modules/PasswordChange';
import ProfileEdit from 'pages/Profile/modules/ProfileEdit';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import { initApp } from 'services/initApp';

import Button from './components/Button';
import FormGroup from './components/FormGroup';
import Link from './components/Link';
import { registerComponent, Store } from './core';
import { defaultState } from './store';

function registerComponents() {
  registerComponent(Link);
  registerComponent(Textarea);
  registerComponent(Input);
  registerComponent(ErrorComponent);
  registerComponent(FormGroup);
  registerComponent(Button);
  registerComponent(CenteredBox);
  registerComponent(BackButtonWrapper);
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  registerComponents();

  window.router = new Router('#app');
  window.store = store;

  window.router
    .use(routeConsts.HOME, Chat)
    .use(routeConsts.CHAT, Chat)
    .use(routeConsts.PROFILE, Profile)
    .use(routeConsts.PROFILE_EDIT, ProfileEdit)
    .use(routeConsts.PROFILE_PASSWORD_CHANGE, PasswordChange)
    .use(routeConsts.SIGNIN, SignIn)
    .use(routeConsts.SIGNUP, SignUp)
    .use(routeConsts.ERROR404, ErrorPage, { code: 404 })
    .use(routeConsts.ERROR500, ErrorPage, { code: 500 })
    .start();

  store.dispatch(initApp);
});
