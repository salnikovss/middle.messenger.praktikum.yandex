import { Store } from 'core';
import Router from 'core/Router';

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type Indexed = Record<string, any>;

  export type AppState = {
    appIsInitiated: boolean;
    screen: Nullable<Screens>;
    isLoading: boolean;
    isChatsLoading: boolean;
    formError: Nullable<string>;
    formSuccess: Nullable<string>;
    avatarFormError: Nullable<string>;
    user: Nullable<UserModel>;
    chats: Nullable<ChatModel[]>;
    idParam: Nullable<number>;
    foundUsers: Nullable<UserModel[]>;
  };

  export type RouteEntry = {
    path: string;
    component: string;
    shouldAuthorized: boolean;
  };

  interface Window {
    router: Router;
    store: Store;
  }
}
