import EventBus, { IEventBus } from './EventBus';

export interface IComponentProps {
  [key: string]: unknown;
}

type ComponentMeta = {
  tagName: string;
  props: IComponentProps;
};

class Component<T extends IComponentProps = IComponentProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement | null = null;
  _meta: ComponentMeta;
  _eventBus: IEventBus;
  props;

  constructor(public tagName = 'div', props: T = {} as T) {
    this._eventBus = new EventBus();

    this._meta = {
      tagName,
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

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
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
    const block = this.render();
    // Это небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно компилировать не в строку (или делать это правильно),
    // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
    if (this._element) {
      this._element.innerHTML = block;
    }
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  render() {
    return '';
  }

  getContent() {
    return this.element ?? null;
  }

  _makePropsProxy(props: T) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    // const self = this;

    // Здесь вам предстоит реализовать метод
    return props;
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

// interface IPageProps extends IComponentProps {
//   test: number;
// }

// const page = new Component<IPageProps>('test', { test: 2 });

export default Component;
