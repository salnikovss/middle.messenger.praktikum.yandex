import './index.scss';

import BackButtonWrapper from 'components/BackButtonWrapper';
import CenteredBox from 'components/CenteredBox';
import { default as ErrorComponent } from 'components/Error';
import Input from 'components/Input';
import Textarea from 'components/Textarea';
import Router from 'core/Router';
import { initApp } from 'services/initApp';

import Button from './components/Button';
import FormGroup from './components/FormGroup';
import Link from './components/Link';
import { registerComponent, Store } from './core';
import { defaultState } from './store';
import initRouter from './utils/initRouter';

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
  const router = new Router();
  registerComponents();

  window.router = router;
  window.store = store;

  store.on('changed', (_prevState, nextState) => {
    console.log('%cstore updated', 'background: #222; color: #bada55', nextState);
  });

  initRouter(router, store, '#app');

  store.dispatch(initApp);
});
