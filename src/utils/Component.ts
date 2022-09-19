import { ComponentEvents, ComponentMeta, IComponentProps } from './Component.types';
import EventBus, { IEventBus } from './EventBus';

class Component<T extends IComponentProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement | null = null;
  _meta: ComponentMeta<T>;
  _eventBus: IEventBus;
  props;

  constructor(props: T = {} as T) {
    this._eventBus = new EventBus();

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

  componentDidMount(oldProps?: T) {
    console.log('componentDidMount', oldProps);
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Component.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: T, newProps: T) {
    console.log('_componentDidUpdate', oldProps, newProps);
  }

  componentDidUpdate(oldProps: T, newProps: T) {
    console.log('componentDidUpdate', oldProps, newProps);
    return true;
  }

  setProps = (nextProps: T) => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: ComponentEvents | undefined = (this.props as any).events;

    if (events) {
      Object.entries(events).forEach(([event, listener]) => {
        this._element?.removeEventListener(event, listener);
      });
    }
  }

  _addEvents() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: ComponentEvents | undefined = (this.props as any).events;

    if (events) {
      Object.entries(events).forEach(([event, listener]) => {
        this._element?.addEventListener(event, listener);
        // console.log(event, listener, this._element);
      });
    }
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  render(): DocumentFragment {
    return new DocumentFragment();
  }

  compile(template: (context: Record<string, unknown>) => string, context: Record<string, unknown>) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const htmlString = template(context);
    fragment.innerHTML = htmlString;

    return fragment.content;
  }

  getContent() {
    return this.element ?? null;
  }

  _makePropsProxy(props: T) {
    return new Proxy(props as unknown as object, {
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
}

export default Component;
