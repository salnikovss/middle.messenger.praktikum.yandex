import './index.scss';

import BackButtonWrapper from 'components/BackButtonWrapper';
import Button from 'components/Button';
import CenteredBox from 'components/CenteredBox';
import ConfirmationModal from 'components/ConfirmationModal';
import { default as ErrorComponent } from 'components/Error';
import FileInput from 'components/FileInput';
import FormGroup from 'components/FormGroup';
import Input from 'components/Input';
import Link from 'components/Link';
import Modal from 'components/Modal/Modal';
import Textarea from 'components/Textarea';
import { ROUTES } from 'config/routes';
import { registerComponent, Store } from 'core';
import Router, { initRouter } from 'core/Router';
import { initApp } from 'services/initApp';
import { defaultState } from 'store';
import log from 'utils/log';

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

  initRouter(ROUTES, router, store, '#app');

  store.dispatch(initApp);
});
