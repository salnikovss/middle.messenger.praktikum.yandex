import cloneDeep from '../utils/cloneDeep';
import isEqual from '../utils/isEqual';
import mergeDeep from '../utils/mergeDeep';
import EventBus from './EventBus';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dispatch<State> = (nextStateOrAction: Partial<State> | Action<State>, payload?: any) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<State> = (dispatch: Dispatch<State>, state: State, payload: any) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class Store<State extends Record<string, any>> extends EventBus {
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }

  public getState() {
    return this.state;
  }

  public set(nextState: Partial<State>) {
    if (isEqual(this.state, nextState)) {
      return;
    }

    const prevState = cloneDeep(this.state);

    this.state = mergeDeep(this.state, nextState) as State;

    this.emit('changed', prevState, nextState);
  }

  dispatch<T extends Partial<State> | Action<State>>(
    nextStateOrAction: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: T extends Action<State> ? Parameters<T>[2] : any
  ) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set({ ...this.state, ...nextStateOrAction });
    }
  }
}
