import { routeConsts } from 'config/routes';
import { renderDOM, Store } from 'core';
import Router from 'core/Router';

import { getScreenComponent, Screens } from './screenList';

const routes = [
  {
    path: routeConsts.HOME,
    component: Screens.SignIn,
    shouldAuthorized: false,
  },
  {
    path: routeConsts.SIGNUP,
    component: Screens.SignUp,
    shouldAuthorized: false,
  },
  {
    path: routeConsts.SIGNIN,
    component: Screens.SignIn,
    shouldAuthorized: false,
  },
  {
    path: routeConsts.CHAT,
    component: Screens.Chat,
    shouldAuthorized: true,
  },
  {
    path: routeConsts.CHAT + '/:id',
    component: Screens.Chat,
    shouldAuthorized: true,
  },
  {
    path: routeConsts.PROFILE,
    component: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: routeConsts.PROFILE_PASSWORD_CHANGE,
    component: Screens.PasswordChange,
    shouldAuthorized: true,
  },
  {
    path: routeConsts.PROFILE_EDIT,
    component: Screens.ProfileEdit,
    shouldAuthorized: true,
  },
  {
    path: routeConsts.ERROR404,
    component: Screens.ErrorPage404,
    shouldAuthorized: true,
  },
  {
    path: routeConsts.ERROR500,
    component: Screens.ErrorPage500,
    shouldAuthorized: true,
  },
  {
    path: '*',
    component: Screens.SignUp,
    shouldAuthorized: false,
  },
];

export default function initRouter(router: Router, store: Store<AppState>, elementId: string) {
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
