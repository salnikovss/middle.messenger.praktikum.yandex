type Listeners = {
  [key: string]: Array<() => void>;
};

export interface IEventBus {
  _listeners: Listeners;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(event: string, callback: (...args: any) => void): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  off(event: string, callback: (...args: any) => void): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, ...args: any): void;
}

class EventBus implements IEventBus {
  _listeners: Listeners = {};

  // constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(event: string, callback: (...args: any) => void): void {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  off(event: string, callback: (...args: any) => void): void {
    if (!this._listeners[event]) {
      return;
    }

    this._listeners[event] = this._listeners[event].filter((listener) => listener !== callback);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, ...args: any): void {
    if (!this._listeners[event] || this._listeners[event].length === 0) {
      return;
    }

    this._listeners[event].forEach((listener) => {
      listener.apply(listener, args);
    });
  }
}

export default EventBus;
