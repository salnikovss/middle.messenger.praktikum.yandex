import { ComponentConstructable } from 'core';
import Handlebars, { HelperOptions } from 'handlebars';

export default function registerComponent<Props extends Record<string, unknown>>(
  Component: ComponentConstructable<Props>
) {
  Handlebars.registerHelper(
    Component.componentName || Component.name,
    function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
      if (!data.root.children) {
        data.root.children = {};
      }

      if (!data.root.refs) {
        data.root.refs = {};
      }

      const { children, refs } = data.root;

      // Fix to pass variables inside blocks manually substituting the value
      Object.keys(hash).forEach((key: keyof Props) => {
        if (this[key] && typeof this[key] === 'string') {
          hash[key] = hash[key].replace(new RegExp(`{{${key as string}}}`, 'i'), this[key]);
        }
      });

      const component = new Component(hash);

      children[component.id] = component;

      if (ref) {
        refs[ref] = component;
      }

      const contents = fn ? fn(this) : '';

      return `<div data-id="${component.id}">${contents}</div>`;
    }
  );
}
