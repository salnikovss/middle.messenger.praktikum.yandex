import './index.scss';

import { default as ErrorComponent } from 'components/Error';
import { routeConsts, routes } from 'config/routes';

import { BackButtonWrapper } from './components/BackButtonWrapper/BackButtonWrapper';
import Button from './components/Button';
import { CenteredBox } from './components/CenteredBox/CenteredBox';
import Form from './components/Form';
import FormGroup from './components/FormGroup';
import { Input } from './components/Input/Input';
import Link from './components/Link';
import { registerComponent } from './core';
import renderDOM from './core/renderDOM';

registerComponent(Link);
registerComponent(Input);
registerComponent(ErrorComponent);
registerComponent(FormGroup);
registerComponent(Button);
registerComponent(Form);
registerComponent(CenteredBox);
registerComponent(BackButtonWrapper);

const handleRoute = () => {
  const { pathname } = document.location;
  const page = routes[pathname] ?? routes[routeConsts.ERROR404];

  renderDOM(page(), 'app');
};

window.addEventListener('load', handleRoute);
