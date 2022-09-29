import './index.scss';

import BackButtonWrapper from 'components/BackButtonWrapper';
import CenteredBox from 'components/CenteredBox';
import { default as ErrorComponent } from 'components/Error';
import Input from 'components/Input';
import Textarea from 'components/Textarea';
import { routeConsts, routes } from 'config/routes';

import Button from './components/Button';
import FormGroup from './components/FormGroup';
import Link from './components/Link';
import { registerComponent } from './core';
import renderDOM from './core/renderDOM';

registerComponent(Link);
registerComponent(Textarea);
registerComponent(Input);
registerComponent(ErrorComponent);
registerComponent(FormGroup);
registerComponent(Button);
registerComponent(CenteredBox);
registerComponent(BackButtonWrapper);

const handleRoute = () => {
  const { pathname } = document.location;
  const page = routes[pathname] ?? routes[routeConsts.ERROR404];

  renderDOM(page(), 'app');
};

window.addEventListener('load', handleRoute);
