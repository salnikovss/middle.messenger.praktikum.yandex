import cloneDeep from '../utils/cloneDeep';
import isEqual from '../utils/isEqual';
import mergeDeep from '../utils/mergeDeep';
import EventBus from './EventBus';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dispatch<State> = (nextStateOrAction: Partial<State> | Action<State>, payload?: unknown) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<State> = (dispatch: Dispatch<State>, state: State, payload: any, ...rest: any[]) => void;

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
    payload?: T extends Action<State> ? Parameters<T>[2] : unknown,
    ...rest: unknown[]
  ): void {
    if (typeof nextStateOrAction === 'function') {
      if (Array.isArray(rest)) {
        nextStateOrAction(this.dispatch.bind(this), this.state, payload, ...rest);
      } else {
        nextStateOrAction(this.dispatch.bind(this), this.state, payload);
      }
    } else {
      this.set(cloneDeep({ ...this.state, ...nextStateOrAction }) as Partial<State>);
    }
  }
}
