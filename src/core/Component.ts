import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import log from 'utils/log';

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

export default class Component<T extends ComponentProps = Record<string, unknown>> {
  static componentName: string;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
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

  private _registerEvents(eventBus: IEventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._eventBus.emit(Component.EVENTS.FLOW_RENDER, this.props);
  }

  private _componentDidMount(props: T) {
    this.componentDidMount(props);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidMount(_props: T) {}

  _componentWillUnmount() {
    this._eventBus.destroy();
    this.componentWillUnmount();
  }

  componentWillUnmount() {}

  private _componentDidUpdate(oldProps: T, newProps: T) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this.children = {};
    this._render();
  }

  componentDidUpdate(oldProps: T, newProps: T): boolean {
    const hasChanges = !isEqual(oldProps, newProps);

    if (hasChanges) {
      log(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        `%c${this.constructor.componentName} componentDidUpdate`,
        'background: #222; color: #00ff60',
        oldProps,
        newProps
      );
    }

    return hasChanges;
  }

  setProps = (nextProps: Partial<ComponentProps>) => {
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

  // Must be overridden by the user in the final component
  render(): DocumentFragment | string {
    return new DocumentFragment();
  }

  getContent(): HTMLElement {
    // Hack to call CDM only after adding to DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this._eventBus.emit(Component.EVENTS.FLOW_CDM);
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
        const oldProps = { ...target };
        if (typeof target === 'object') {
          target[prop] = value;
        }

        this._eventBus.emit(Component.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Permission denied');
      },
    });
  }

  show() {
    const el = this.getContent();
    if (el) {
      el.style.display = 'block';
    }
  }

  hide() {
    const el = this.getContent();
    if (el) {
      el.style.display = 'none';
    }
  }
}
