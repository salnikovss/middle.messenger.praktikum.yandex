import { Store } from 'core';

export type ProfileProps = {
  user: UserModel;
  store: Store<AppState>;
  onLogout: () => void;
};
