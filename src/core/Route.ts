import Component, { ComponentConstructable } from './Component';
import renderDOM from './renderDOM';

type RouteProps = {
  initialProps?: Record<string, unknown>;
  rootQuery: string;
};

export default class Route {
  private _component: Nullable<Component> = null;

  constructor(
    private _pathname: string,
    private _componentClass: ComponentConstructable<Record<string, unknown>>,
    private _props: RouteProps,
    public authRequired = false
  ) {}

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
    // if (!this._component) {
    this._component = new this._componentClass(this._props.initialProps ?? {});
    // } else {
    //   this._component.show();
    // }

    renderDOM(this._component, this._props.rootQuery);
  }
}
