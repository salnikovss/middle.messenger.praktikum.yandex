import Handlebars, { HelperOptions } from 'handlebars';

import Component from './Component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ComponentConstructable<Props = any> {
  new (props: Props): Component;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
export default function registerComponent<Props extends any>(name: string, Component: ComponentConstructable<Props>) {
  Handlebars.registerHelper(name, function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
    if (!data.root.children) {
      data.root.children = {};
    }

    if (!data.root.refs) {
      data.root.refs = {};
    }

    const { children, refs } = data.root;

    /**
     * Костыль для того, чтобы передавать переменные
     * внутрь блоков вручную подменяя значение
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Object.keys(hash) as any).forEach((key: keyof Props) => {
      if (this[key] && typeof this[key] === 'string') {
        hash[key] = hash[key].replace(new RegExp(`{{${key as string}}}`, 'i'), this[key]);
      }
    });

    const component = new Component(hash);

    children[component.id] = component;

    if (ref) {
      refs[ref] = component.getContent();
    }

    const contents = fn ? fn(this) : '';

    return `<div data-id="${component.id}">${contents}</div>`;
  });
}
