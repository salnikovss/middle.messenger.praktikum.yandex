import renderDOM from 'core/renderDOM';
import { getScreenComponent, Screens } from 'core/Router';
import Store from 'core/Store';

import Route from './Route';

export default class Router {
  static __instance: Nullable<Router>;
  private routes: Record<string, (routeParams?: Record<string, unknown>) => void> = {};
  private isStarted = false;

  history = window.history;
  _currentRoute: Nullable<Route> = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  init(routes: RouteEntry[], store: Store<AppState>, elementId: string) {
    routes.forEach((route) => {
      this.use(route.path, (routeParams?: Record<string, unknown>) => {
        const isAuthorized = Boolean(store.getState().user);
        const currentScreen = Boolean(store.getState().screen);
        const additionalProps = {
          formError: null,
          isLoading: false,
          idParam: routeParams?.idParam as number,
        };

        if (isAuthorized || !route.shouldAuthorized) {
          store.dispatch({ ...additionalProps, screen: route.component });
          return;
        }

        if (!currentScreen) {
          store.dispatch({ ...additionalProps, screen: Screens.SignIn });
        }
      });
    });

    store.on('changed', (prevState: AppState, nextState: AppState) => {
      if (!prevState.appIsInitiated && nextState.appIsInitiated) {
        this.start();
      }

      if (prevState.screen !== nextState.screen) {
        const Page = getScreenComponent(nextState.screen);
        renderDOM(new Page({ idParam: nextState.idParam }), elementId);
        document.title = `${Page.componentName} / Messenger App`;
      }
    });
  }

  use(hash: string, callback: () => void) {
    this.routes[hash] = callback;
    return this;
  }

  start() {
    if (!this.isStarted) {
      window.onpopstate = ((event: PopStateEvent) => {
        this._onRoute((event.currentTarget as Window).location.pathname);
      }).bind(this);

      this._onRoute(window.location.pathname);
    }
  }

  private _onRoute(pathname: string) {
    const found = Object.entries(this.routes).some(([routePath, callback]) => {
      const hasIdParameter = routePath.includes(':id');
      if (hasIdParameter) {
        const routeWithoutIdParameter = routePath.replace(':id', '');
        const possibleIdParameter = parseInt(pathname.replace(routeWithoutIdParameter, ''));
        if (possibleIdParameter > 0) {
          callback({ idParam: Number(possibleIdParameter) });
          return true;
        }
      }

      if (routePath === pathname) {
        callback();
        return true;
      }
      return false;
    });

    if (!found && this.routes['*']) {
      this.routes['*']();
    }
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
}
