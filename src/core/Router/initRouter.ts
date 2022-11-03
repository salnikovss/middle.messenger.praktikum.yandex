import { getScreenComponent, Screens } from 'core/Router';
import Store from 'core/Store';

import renderDOM from '../renderDOM';
import Router from './Router';

export default function initRouter(routes: RouteEntry[], router: Router, store: Store<AppState>, elementId: string) {
  routes.forEach((route) => {
    router.use(route.path, (routeParams?: Record<string, unknown>) => {
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
      router.start();
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({ idParam: nextState.idParam }), elementId);
      document.title = `${Page.componentName} / Messenger App`;
    }
  });
}
