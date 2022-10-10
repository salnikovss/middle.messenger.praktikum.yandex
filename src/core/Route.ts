import Component, { ComponentConstructable } from './Component';
import renderDOM from './renderDOM';

type RouteProps = {
  initialProps?: Record<string, unknown>;
  rootQuery: string;
};

export default class Route {
  _pathname: string;
  _component: Nullable<Component>;
  _props: RouteProps;
  _componentClass: ComponentConstructable<Record<string, unknown>>;

  constructor(pathname: string, view: ComponentConstructable<Record<string, unknown>>, props: RouteProps) {
    this._pathname = pathname;
    this._componentClass = view;
    this._component = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._component) {
      this._component.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._component) {
      this._component = new this._componentClass(this._props.initialProps ?? {});
      renderDOM(this._component, this._props.rootQuery);
      return;
    }

    this._component.show();
  }
}
