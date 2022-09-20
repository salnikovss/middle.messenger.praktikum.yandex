import { nanoid } from 'nanoid';

import { ComponentMeta, IComponentProps } from './Component.types';
import EventBus, { IEventBus } from './EventBus';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
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

    const { props, children } = this.getChildren(propsAndChildren);

    this.children = children;

    this._meta = {
      props,
    };

    this.props = this._makePropsProxy(props);

    this._registerEvents(this._eventBus);
    this._eventBus.emit(Component.EVENTS.INIT);
  }

  _registerEvents(eventBus: IEventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps?: IComponentProps) {
    console.log('componentDidMount', oldProps);
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Component.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps) {
    console.log('_componentDidUpdate', oldProps, newProps);
  }

  componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps) {
    console.log('componentDidUpdate', oldProps, newProps);
    return true;
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

  // Переопределяется пользователем. Необходимо вернуть разметку
  render(): DocumentFragment {
    return new DocumentFragment();
  }

  compile(template: (context: Record<string, unknown>) => string, context: Record<string, unknown>) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map((ch) => `<div data-id="id-${ch.id}"></div>`);
        return;
      }
      context[key] = `<div data-id="id-${child.id}"></div>`;
    });

    const htmlString = template(context);
    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.forEach((ch) => {
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

        this._eventBus.emit(Component.EVENTS.FLOW_CDM, { ...target }, target);
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

  getChildren(propsAndChildren: IComponentProps) {
    const children: Record<string, Component | Component[]> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).map(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((v) => v instanceof Component)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  protected initChildren() {
    return;
  }
}

export default Component;
