import Component from './Component';

export interface IComponentProps {
  events?: ComponentEvents;
  [key: string]: any;
}
// | {
//     events?: ComponentEvents;
//   }
// | Record<string, unknown | Component | Component[]>;

export type ComponentMeta<T = unknown> = {
  props: T;
};

export type ComponentEvents = Record<string, () => void>;
