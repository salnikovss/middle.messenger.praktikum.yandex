import './index.scss';
import './helpers/handlebar-helpers';

import { routeConsts, routes } from '../config/routes';
import { BackButtonWrapper } from './components/BackButtonWrapper/BackButtonWrapper';
import Button from './components/Button';
import { CenteredBox } from './components/CenteredBox/CenteredBox';
import Form from './components/Form';
import FormGroup from './components/FormGroup';
import { Input } from './components/Input/Input';
import Link from './components/Link';
import { registerComponent } from './core';
import renderDOM from './core/renderDOM';

registerComponent('Link', Link);
registerComponent('Input', Input);
registerComponent('FormGroup', FormGroup);
registerComponent('Button', Button);
registerComponent('Form', Form);
registerComponent('CenteredBox', CenteredBox);
registerComponent('BackButtonWrapper', BackButtonWrapper);

const handleRoute = () => {
  const { pathname } = document.location;
  const page = routes[pathname] ?? routes[routeConsts.ERROR404];

  renderDOM(page(), 'app');
};

window.addEventListener('load', handleRoute);
