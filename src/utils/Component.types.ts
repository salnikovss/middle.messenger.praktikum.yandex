export interface IComponentProps {
  events?: ComponentEvents;
  [key: string]: unknown;
}

export type ComponentMeta<T> = {
  props: T;
};

export type ComponentEvents = Record<string, () => void>;
