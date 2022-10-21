import { Component, ComponentConstructable } from 'core';
import { renderDOM } from 'core';

type RouteConfig = {
  initialProps?: Record<string, unknown>;
  rootQuery: string;
  needAuth: boolean;
};

export default class Route {
  private _component: Nullable<Component> = null;

  constructor(
    private _pathname: string,
    private _componentClass: ComponentConstructable<Record<string, unknown>>,
    public config: RouteConfig,
    public authRequired = false
  ) {}

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    this._component = new this._componentClass(this.config.initialProps ?? {});
    renderDOM(this._component, this.config.rootQuery);
  }
}
