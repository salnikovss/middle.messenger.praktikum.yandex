import Component, { ComponentConstructable } from 'core/Component';

import Router from './Router';

enum Screens {
  Home = 'Home',
  Page1 = 'Page1',
  Page2 = 'Page2',
  ErrorPage404 = 'ErrorPage404',
}

const ROUTES: { path: string; component: Screens }[] = [
  { path: '/', component: Screens.Home },
  { path: '/page1', component: Screens.Page1 },
  { path: '/page2', component: Screens.Page2 },
  { path: '*', component: Screens.ErrorPage404 },
];

class Home extends Component {
  static componentName: 'Home';
  render() {
    return `<div class="page">Home</div>`;
  }
}
class ErrorPage404 extends Component {
  static componentName: 'ErrorPage404';
  render() {
    return `<div class="page">ErrorPage404</div>`;
  }
}
class Page1 extends Component {
  static componentName: 'Page1';
  render() {
    return `<div class="page">Page1</div>`;
  }
}
class Page2 extends Component {
  static componentName: 'Page2';
  render() {
    return `<div class="page">Page2</div>`;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const map: Record<Screens, ComponentConstructable<any>> = {
  [Screens.Home]: Home,
  [Screens.Page1]: Page1,
  [Screens.Page2]: Page2,
  [Screens.ErrorPage404]: ErrorPage404,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getScreenComponent = (screen: Screens): ComponentConstructable<any> => {
  return map[screen];
};

describe('Router', () => {
  let router: Router;
  let currentScreen: Nullable<Screens>;
  let currentComponent: Nullable<Component>;

  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    currentScreen = null;
    currentComponent = null;
    router = new Router();
    ROUTES.forEach((route) => {
      router.use(route.path, () => {
        if (currentScreen !== route.component) {
          const pageComponent = getScreenComponent(route.component);
          currentComponent = new pageComponent({});
          currentScreen = route.component;
        }
      });
    });
    router.start();
  });

  test('Router Back functionality', () => {
    return new Promise((resolve) => {
      router.go('/page1');
      router.go('/');
      router.go('/page2');
      router.back();

      window.addEventListener('popstate', () => {
        expect(currentScreen).toBe(Screens.Home);
        resolve(true);
      });
    });
  });

  test('Page components should be updated during navigation', () => {
    router.go('/page1');
    expect(currentComponent).toBeInstanceOf(Page1);

    router.go('/page2');
    expect(currentComponent).toBeInstanceOf(Page2);
  });

  test('Page not found', () => {
    router.go('/nonexistingpage');
    expect(currentComponent).toBeInstanceOf(ErrorPage404);
  });

  test('Current screen property should be updated during navigation', () => {
    router.go('/page1');
    expect(currentScreen).toBe(Screens.Page1);

    router.go('/');
    expect(currentScreen).toBe(Screens.Home);
  });
});
