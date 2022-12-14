import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';

import cloneDeep from '../utils/cloneDeep';
import isEqual from '../utils/isEqual';
import EventBus, { IEventBus } from './EventBus';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentEventHandler = (...args: any) => void;
export type ComponentEvents = Record<string, ComponentEventHandler>;
export type ComponentProps = {
  [key: string]: unknown;
  events?: ComponentEvents;
};
export type ComponentConstructable<T extends Record<string, unknown>> = {
  new (props: T): Component<T>;
  componentName?: string;
};

interface Component<T> {
  componentDidMount?(props: T): void;

  componentWillUnmount?(): void;

  render(): DocumentFragment | string;
}

abstract class Component<T extends ComponentProps = Record<string, unknown>> {
  static componentName: string;

  static EVENTS = {
    INIT: 'init',
    COMPONENT_DID_MOUNT: 'component-did-mount',
    COMPONENT_DID_UPDATE: 'component-did-update',
    COMPONENT_WILL_UNMOUNT: 'component-will-unmount',
    RENDER: 'render',
  };

  protected _element: Nullable<HTMLElement> = null;
  protected _eventBus: IEventBus;
  public readonly props: T;
  public id = nanoid(6);
  public refs: Record<string, Component<T>> = {};
  protected children: Record<string, Component<T>> = {};

  public constructor(props: T = {} as T) {
    const eventBus = new EventBus();

    this.props = this._makePropsProxy(props);

    this._eventBus = eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Component.EVENTS.INIT, this.props);
  }

  private _checkInDom() {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }

    this._eventBus.emit(Component.EVENTS.COMPONENT_WILL_UNMOUNT, this.props);
  }

  private _registerEvents(eventBus: IEventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.COMPONENT_DID_UPDATE, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.COMPONENT_DID_MOUNT, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.COMPONENT_WILL_UNMOUNT, this._componentWillUnmount.bind(this));
    eventBus.on(Component.EVENTS.RENDER, this._render.bind(this));
  }

  init() {
    this._eventBus.emit(Component.EVENTS.RENDER, this.props);
  }

  private _componentDidMount(props: T) {
    this._checkInDom();
    this.componentDidMount && this.componentDidMount(props);
  }

  _componentWillUnmount() {
    this._eventBus.destroy();
    this.componentWillUnmount && this.componentWillUnmount();
  }

  private _componentDidUpdate(oldProps: T, newProps: T) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this.children = {};
    this._render();
  }

  componentDidUpdate(oldProps: T, newProps: T): boolean {
    return !isEqual(oldProps, newProps);
  }

  setProps = (nextProps: Partial<T>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props as object, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this._compile();

    this._removeEvents();

    if (fragment.firstElementChild) {
      const newElement = fragment.firstElementChild;

      if (this._element) {
        this._element.replaceWith(newElement);
      }
      this._element = newElement as HTMLElement;
      this._addEvents();
    }
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({ ...this.props, children: this.children, refs: this.refs });

    // Replace stubs with components
    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      const content = component.getContent();
      stub.replaceWith(content);

      // Paste content to layout
      const layoutContent = content.querySelector('[data-slot="1"]') as HTMLElement;

      if (layoutContent && stubChilds.length) {
        layoutContent.replaceWith(...stubChilds);
      }
    });

    return fragment.content;
  }

  private _removeEvents() {
    if (this.props.events) {
      Object.entries(this.props.events).forEach(([event, listener]) => {
        this._element?.removeEventListener(event, listener);
      });
    }
  }

  private _addEvents() {
    if (this.props.events) {
      Object.entries(this.props.events).forEach(([event, listener]) => {
        this._element?.addEventListener(event, listener);
      });
    }
  }

  getContent(): HTMLElement {
    // Hack to call CDM only after adding to DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this._eventBus.emit(Component.EVENTS.COMPONENT_DID_MOUNT);
        }
      }, 100);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.element!;
  }

  private _makePropsProxy(props: T): T {
    return new Proxy<T>(props, {
      get: (target, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value) => {
        let oldProps;
        try {
          oldProps = cloneDeep(target);
        } catch (error) {
          oldProps = { ...target };
        }

        if (typeof target === 'object' && target[prop] !== value) {
          target[prop] = value;
          this._eventBus.emit(Component.EVENTS.COMPONENT_DID_UPDATE, oldProps, target);
        }
        return true;
      },
      deleteProperty: () => {
        throw new Error('Permission denied');
      },
    });
  }
}

export default Component;
