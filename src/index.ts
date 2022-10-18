import './index.scss';

import BackButtonWrapper from 'components/BackButtonWrapper';
import CenteredBox from 'components/CenteredBox';
import ConfirmationModal from 'components/ConfirmationModal';
import { default as ErrorComponent } from 'components/Error';
import FileInput from 'components/FileInput';
import Input from 'components/Input';
import Textarea from 'components/Textarea';
import Router from 'core/Router';
import { initApp } from 'services/initApp';
import log from 'utils/log';

import Button from './components/Button';
import FormGroup from './components/FormGroup';
import Link from './components/Link';
import Modal from './components/Modal/Modal';
import { registerComponent, Store } from './core';
import { defaultState } from './store';
import initRouter from './utils/initRouter';

function registerComponents() {
  registerComponent(Link);
  registerComponent(Textarea);
  registerComponent(Input);
  registerComponent(FileInput);
  registerComponent(ErrorComponent);
  registerComponent(FormGroup);
  registerComponent(Button);
  registerComponent(CenteredBox);
  registerComponent(BackButtonWrapper);
  registerComponent(Modal);
  registerComponent(ConfirmationModal);
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router();
  registerComponents();

  window.router = router;
  window.store = store;

  store.on('changed', (_prevState, nextState) => {
    log('%cstore updated', 'background: #222; color: #bada55', nextState);
  });

  initRouter(router, store, '#app');

  store.dispatch(initApp);
});
