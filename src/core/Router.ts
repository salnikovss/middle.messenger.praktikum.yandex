import Route from './Route';

export default class Router {
  static __instance: Nullable<Router>;
  // routes: Route[] = [];
  private routes: Record<string, () => void> = {};
  private isStarted = false;

  history = window.history;
  _currentRoute: Nullable<Route> = null;
  // _rootQuery!: string;

  constructor() {
    // constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    // this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(hash: string, callback: () => void) {
    this.routes[hash] = callback;
    return this;
  }

  // use_(
  //   pathname: string,
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   component: ComponentConstructable<Record<string, any>>,
  //   props: Record<string, unknown> = {},
  //   needAuth = true
  // ) {
  //   const route = new Route(pathname, component, { initialProps: props, rootQuery: this._rootQuery, needAuth });

  //   this.routes.push(route);

  //   return this;
  // }

  start() {
    if (!this.isStarted) {
      window.onpopstate = ((event: PopStateEvent) => {
        this._onRoute((event.currentTarget as Window).location.pathname);
      }).bind(this);

      this._onRoute(window.location.pathname);
    }
  }

  _onRoute(pathname: string) {
    // const { pathname } = window.location;

    // const route = this.getRoute(pathname);

    // if (!route) {
    //   return;
    // }
    const found = Object.entries(this.routes).some(([routePath, callback]) => {
      if (routePath === pathname) {
        callback();
        return true;
      }
      return false;
    });

    if (!found && this.routes['*']) {
      this.routes['*']();
    }

    // if (this._currentRoute && this._currentRoute !== route) {
    //   this._currentRoute.leave();
    // }

    // this._currentRoute = route;
    // route.render();
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

  // getRoute(pathname: string) {
  //   return this.routes.find((route) => route.match(pathname));
  // }
}
