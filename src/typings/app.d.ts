import { Store } from 'core';
import Router from 'core/Router';

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type Indexed = { [key: string]: any };

  export type AppState = {
    appIsInitiated: boolean;
    screen: Screens | null;
    isLoading: boolean;
    loginFormError: string | null;
    user: User | null;
  };

  interface Window {
    router: Router;
    store: Store;
  }
}

export {};
