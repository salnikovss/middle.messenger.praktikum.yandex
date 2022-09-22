import { nanoid } from 'nanoid';

import EventBus, { IEventBus } from './EventBus';

export interface IComponentProps {
  events?: ComponentEvents;
  [key: string]: unknown;
}

export type ComponentMeta<T = unknown> = {
  props: T;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentEvents = Record<string, (...args: any) => void>;

class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);

  protected _element: HTMLElement | null = null;
  protected _meta: ComponentMeta;
  protected _eventBus: IEventBus;
  protected props: IComponentProps;
  protected children: Record<string, Component | Component[]> = {};

  constructor(propsAndChildren: IComponentProps = {}) {
    this._eventBus = new EventBus();

    const { props, children } = this._getChildren(propsAndChildren);

    this.children = children;

    this._meta = {
      props: propsAndChildren,
    };

    this.props = this._makePropsProxy(props);

    this._registerEvents(this._eventBus);
    this._eventBus.emit(Component.EVENTS.INIT);
  }

  _registerEvents(eventBus: IEventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._eventBus.emit(Component.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Component.EVENTS.FLOW_CDM);
  }

  componentDidMount(oldProps?: IComponentProps) {
    console.log('componentDidMount', oldProps);
  }

  _componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps) {
    // TODO: сделать deep сравнение.
    if (oldProps !== newProps) {
      return false; // поменять на true.
    }

    return false;
  }

  setProps = (nextProps: IComponentProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  _removeEvents() {
    const { events = {} } = this.props as IComponentProps;

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const { events = {} } = this.props as IComponentProps;

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.addEventListener(event, listener);
    });
  }

  // Must be overridden by the user in the final component
  render(): DocumentFragment {
    return new DocumentFragment();
  }

  compile(template: (context: Record<string, unknown>) => string, props: IComponentProps) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const components: Record<string, Component> = {};

    // Iterate over props and children, which were passed in the constructor
    Object.entries({ ...props, ...this.children }).forEach(([key, prop]) => {
      if (prop instanceof Component) {
        // console.log('key', key, prop);
        props[key] = `<div data-id="id-${prop.id}"></div>`;
        components[prop.id] = prop;
      } else if (Array.isArray(prop)) {
        props[key] = prop
          .filter((pr) => pr instanceof Component)
          .map((childProp) => {
            components[childProp.id] = childProp;
            return `<div data-id="id-${childProp.id}"></div>`;
          });
      }
    });

    // Object.entries(this.children).forEach(([key, child]) => {
    //   if (Array.isArray(child)) {
    //     console.log('key child', key, child);
    //     props[key] = child.map((ch) => `<div data-id="id-${ch.id}"></div>`);
    //     return;
    //   }
    //   props[key] = `<div data-id="id-${child.id}"></div>`;
    //   components[child.id] = child;
    // });

    const htmlString = template(props);
    fragment.innerHTML = htmlString;

    // console.log('components', components, 'this.children', this.children);

    Object.entries(components).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        props[key] = child.forEach((ch) => {
          const childStub = fragment.content.querySelector(`[data-id="id-${ch.id}"]`);
          if (!childStub) {
            return;
          }

          const content = ch.getContent();
          if (content) {
            childStub.replaceWith(content);
          }
        });

        return;
      }

      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
      if (!stub) {
        return;
      }

      const content = child.getContent();
      if (content) {
        stub.replaceWith(content);
      }
    });

    return fragment.content;
  }

  getContent() {
    return this.element ?? null;
  }

  _makePropsProxy(props: IComponentProps) {
    return new Proxy(props, {
      get: (target: IComponentProps, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: IComponentProps, prop: string, value: unknown) => {
        target[prop] = value;

        this._eventBus.emit(Component.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Permission denied');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
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

  _getChildren(propsAndChildren: IComponentProps) {
    const children: Record<string, Component | Component[]> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).map(([key, value]) => {
      if (value instanceof Component || (Array.isArray(value) && value.every((v) => v instanceof Component))) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    // console.log(props, children);

    return { props, children };
  }
}

export default Component;
